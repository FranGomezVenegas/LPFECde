import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import './shared-styles.js';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../store.js';

/**
 * `module-a-sample-reception` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */

class moduleASampleReception extends connect(store)(PolymerElement) {
    static get properties() {
        return {
            finalToken: String,
            schemaPrefix: {
                type: String,
                value: "module1-A"
            },   
            selectedSample: {
                type: Number,
                value: 8115
            },       
            allUnreceivedSamples: {
                type: Array//,
                //observer: 'sampleChecked'
            }        
        }
    }
    stateChanged(state) {
        
        this.finalToken = state.app.user.finalToken; 
        this.schemaPrefix = state.tabs.tabs[this.tabIndex-1].procedure.schemaPrefix;    
        //console.log('stateChanged module-a-sample-reception', state,this.schemaPrefix);   
    }        
    _ajaxAllunReceivedSamplesgetParams(schemaPrefix, actionName, finalToken) {
        return {schemaPrefix:schemaPrefix, actionName:actionName, finalToken:finalToken};
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
            url="http://localhost:8080/LabPLANETAPI/frontEnd/sampleAPIfrontEnd"            
            params='{{_ajaxAllunReceivedSamplesgetParams(schemaPrefix, "UNRECEIVESAMPLES_LIST", finalToken)}}'            
            handle-as="json"
            contentType="application/json"
            last-response="{{allUnreceivedSamples}}"
            ></iron-ajax>  

            <iron-ajax id="ajaxReceiveSample"
            url="http://localhost:8080/LabPLANETAPI/moduleSample/sampleAPI"
            handle-as="json"
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
                <th>·</th>    <th>Id</th>    <th>Template</th>
              </tr>
            </thead>      
            <!-- <paper-button class="button" on-click="Submit" >Submit</paper-button> -->
            <tbody is="s-tbody">
              <template is="dom-repeat" items="[[allUnreceivedSamples]]">
                <tr is="s-tr" multi>
                <!--<td><paper-checkbox" id="id_[[item.sample_id]]" value="[[item.sample_id]]" on-tap="itemChecked"></paper-checkbox></td> -->
                  <td><input type="checkbox" name="id_[[item.sample_id]]" value="[[item.sample_id]]" unchecked on-click="itemChecked"></td>
                  <td>[[item.id]]</td>    <td>[[item.sample_id]]</td>    <td>[[item.sample_config_code]]</td>  
                        
                </tr>
              </template> 
            </tbody>
              
            </s-table>
            </form>
            </div>      
        `;
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
              "actionName": 'receiveSample',
              "finalToken": this.finalToken,
              "sampleId": this.selectedSample,
              "schemaPrefix": this.schemaPrefix
               });     
        this.$.ajaxReceiveSample.generateRequest();                
    }

    ajaxReceiveSampleResponse() {
        this.dispatchEvent(new CustomEvent('toast-message', {
            bubbles: true,
            composed: true,
            detail: 'Sample '+this.selectedSample+' was logged '
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
}

customElements.define('module-a-sample-reception', moduleASampleReception);