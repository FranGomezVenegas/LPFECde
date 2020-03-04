import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import './shared-styles.js';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../store.js';

/**
 * `sample-reception` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class SampleReception extends connect(store)(PolymerElement) {
    static get properties() {
        return {
            finalToken: String,
            schemaName: {
                type: String,
                value: "sample-A"
              },   
              dbUserName: {
                type: String,
                value: "labplanet"
              },          
              dbUserPassword: {
                type: String,
                value: "LabPlanet"
              },          
              userName: {
                type: String,
                value: "1"
              },          
              userRole: {
                type: String,
                value: "Admin"
              }, 
              selectedSample: {
                type: Number,
                value: 8115
              },       
              producto: {
                type: Object,
                value: {          
                  nombre: "CHOCOLOCO",
                  precio: 150,
                  id: 10
                }        
              },
              allUnreceivedSamples: {
                type: Array//,
                //observer: 'sampleChecked'
              }        
        }
    }

    static get template() {
        return html`
            <style include="shared-styles">
--            <style>
            :host {
                display: block;
    
                padding: 10px;
            }
            </style>        

            <iron-ajax id="ajaxAllunReceivedSamples"
            auto
            url="http://localhost:8080/LabPLANETAPI/LabPLANETAPI/unReceivedSamples"
            handle-as="json"
            contentType="application/json"
            last-response="{{allUnreceivedSamples}}"
            ></iron-ajax>  

            <iron-ajax id="ajaxReceiveSample"
            url="http://localhost:8080/LabPLANETAPI/moduleSample/sampleAPI"
            --?schemaPrefix={{schemaName}}&actionName=RECEIVESAMPLE&dbUserName={{dbUserName}}&dbUserPassword={{dbUserPassword}}&userName={{userName}}&userRole={{userRole}}&sampleId={{selectedSample}}"      
            handle-as="json"
            --method="put"
            contentType="application/json"
            on-response="ajaxReceiveSampleResponse"
            on-error="ajaxReceiveSampleError"
            last-response="{{ajaxReceiveSampleAPIResponse}}"
            ></iron-ajax>              

            <div class="card">
            <form name="myForm">
            <s-table id="myTable">
            <thead>
              <tr>
                <th>·</th>    <th>Id</th>    <th>Template</th>      <th>Notes</th>
              </tr>
            </thead>      
            <!-- <paper-button class="button" on-click="Submit" >Submit</paper-button> -->
            <tbody is="s-tbody">
              <template is="dom-repeat" items="[[allUnreceivedSamples]]">
                <tr is="s-tr" multi>
                <!--<td><paper-checkbox" id="id_[[item.sample_id]]" value="[[item.sample_id]]" on-tap="itemChecked"></paper-checkbox></td> -->
                  <td><input type="checkbox" name="id_[[item.sample_id]]" value="[[item.sample_id]]" unchecked on-click="itemChecked"></td>
                  <td>[[item.id]]</td>    <td>[[item.sample_id]]</td>    <td>[[item.sample_config_code]]</td>  
                  <td>[[item.sampling_comment]]</td>        
                </tr>
              </template> 
            </tbody>
              
            </s-table>
            </form>
            </div>      
        `;
    }

    Submit() {    
        this.$.ajaxReceiveSample.generateRequest();    
        
    }
    itemChecked(e) {
        console.log(e.target.getAttribute('value'), 'finalToken= '+this.finalToken);
        this.selectedSample= e.target.getAttribute('value');
        e.target.unchecked;   
        if (this.finalToken==null){            
            this.dispatchEvent(new CustomEvent('ajax-receive-sample-error', {
                detail: {
                    // aquí mandaría los datos de login al padre que es quien lo gestiona
                }
                }));
            return;
        }
        this.$.ajaxReceiveSample.set( 
            'params', { 
                "actionName": 'receiveSample'
              , "finalToken": this.finalToken
               });     

        this.$.ajaxReceiveSample.generateRequest();                
    }

    ajaxReceiveSampleResponse() {
        this.dispatchEvent(new CustomEvent('toast', {
            bubbles: true,
            composed: true,
            detail: 'Sample'+this.selectedSample+' was logged '
              })); 
        this.$.ajaxAllunReceivedSamples.generateRequest();   

    }      

    ajaxReceiveSampleError() {
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,
            composed: true,
            detail: 'Sample'+this.selectedSample+' was not logged due to .... '
              })); 
        this.$.ajaxAllunReceivedSamples.generateRequest(); 
    }      

    stateChanged(state) {
        //console.log('stateChanged sample-reception', state);
        this.finalToken = state.app.user.finalToken;        
    }    
}

customElements.define('sample-reception', SampleReception);