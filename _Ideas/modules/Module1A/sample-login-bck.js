import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import '../../internalComponents/form-fields/field-controller';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../../store.js';
/**
 * `sample-login-bck` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class SampleLoginBck extends connect(store)(PolymerElement) {
    static get properties() {
        return {
            selectedSampleTemplateStructure: Array,
            sampleTemplates: Array,
            currenttemplate: Array,
            selectedSampleTemplate: {
                type: String,
                value: 'Begin',
                notify:true
            },
            selectedLanguage: {
                type: String,
                notify: true
            },
            formTemplate: String,
            displayForm: {
                type: Boolean,
                value: false,
                notify: true
            },
            sampleTemplatesList: {
                type: Array,
                notify: true,
                bubble: true,
                value: [
                  {                    
                    "name": "sampleTemplatesList",
                    "label_en": "Templates", "label_es": "Plantillas",
                    "type": "list",
                    "value": "",
                    "read_only": false,
                    "items" : [{
                        "keyName":"",                        
                        "keyValue_en":"", "keyValue_es":""              
                    }]
                  }]
            },
            templateNewStructure: {
                type: Object,
                notify: true, bubble: true,
                value: {
                    Template1: {
                        version: 1, label_en: "Template 1", label_es: "Plantilla 1", schemaPrefix: "module1",
                        definition: {
                            "ButtonOne": {
                                name: "buttonOne", label_en:"Button 1", label_es:"Boton 1", type:"button"
                            },
                            SamplingComment: {
                                name: "SamplingComment", label_en:"Comment", label_es:"Comentario", type:"text", password: "False", value:"hello"
                            }                          
                        }
                    },
                    Template2: {
                        version: 1, label_en: "Template 2", label_es: "Plantilla 2", schemaPrefix: "module2",
                        definition: {
                            "ButtonOne": {
                                name: "buttonTwo", label_en:"Button 2", label_es:"Boton 2", type:"button"
                            },
                            SamplingComment: {
                                name: "SamplingComment", label_en:"Comment", label_es:"Comentario", type:"text", password: "False", value:"hello2"
                            }                          
                        }
                    }					
                }
            }
        }
    }
    _displayForm(){
        return this.displayForm;
    }
    onListChange(e) {
        console.log('onListChange', e.detail);
        if (e.detail.name=="sampleTemplatesList"){ 
          //this.selectedSampleTemplate(e.detail.value);
          this.selectedSampleTemplate=e.detail.value;
          console.log('Z', this.sampleTemplates[1].definition);
          this.set('selectedSampleTemplateStructure', this.sampleTemplates[1].definition.fields); 
          //this.selectedSampleTemplateStructure=this.sampleTemplates[1].definition.fields;
          //this.selectedSampleTemplateStructure=
          console.log('Z', this.selectedSampleTemplateStructure);
        }       
    }
    _isThisTemplate(first, second){
        return first==second;
    }
    static get template() {
        return html`
            <style type="text/css">
            :host {
            display: flex;
            }  
            .container {

            }
            .containerGradient {
                padding: 15px;
                --display: flex;
                width: 320px;
                box-shadow: var(--shadow-elevation-2dp_-_box-shadow);
                background: #032bbc; /* Old browsers */
                background: -moz-linear-gradient(45deg, #032bbc 0%, #2989d8 5%, #b3cfe5 15%, #ffffff 25%, #ffffff 75%, #b3cfe5 85%, #2989d8 95%, #032bbc 100%, #207cca 100%); /* FF3.6-15 */
                background: -webkit-linear-gradient(45deg, #032bbc 0%,#2989d8 5%,#b3cfe5 15%,#ffffff 25%,#ffffff 75%,#b3cfe5 85%,#2989d8 95%,#032bbc 100%,#207cca 100%); /* Chrome10-25,Safari5.1-6 */
                background: linear-gradient(45deg, #032bbc 0%,#2989d8 5%,#b3cfe5 15%,#ffffff 25%,#ffffff 75%,#b3cfe5 85%,#2989d8 95%,#032bbc 100%,#207cca 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
                filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#032bbc', endColorstr='#207cca',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
                }
            #mainnav .iron-selected {
                color: #69a;
                font-weight: bold;
                text-transform: uppercase;
              }
            </style>      
            <iron-ajax id="ajaxSampleTemplates"
            url="http://localhost:3000/templateHeader"
            auto
            handle-as="json"
            loading="{{loading}}"
            on-response="SampleTemplatesResponse"
            on-error="SampleTemplatesError"
            last-response="{{sampleTemplates}}"
            ></iron-ajax> 

            <iron-ajax id="ajaxLogNewSample"
            url="http://localhost:8080/LabPLANETAPI/moduleSample/sampleAPI?schemaPrefix=module1-A&actionName=LOGSAMPLE&dbUserName=labplanet&dbUserPassword=LabPlanet&sampleTemplate=template1&userName=1&userRole=analyst&sampleTemplateVersion=1&fieldName=sampling_comment&fieldValue=hola*String"            
            handle-as="json"
            loading="{{loading}}"
            on-response="SampleTemplatesResponse"
            on-error="SampleTemplatesError"
            last-response="{{actionLog}}"
            ></iron-ajax>             
Module1A
            <template is="dom-repeat" items="{{templateNewStructure.value}}" as="currTemplate">
              {{currTemplate.definition.name}}
            </template>
<!--            <div name="sampleTemplatesList" class="container"> 
                <template is="dom-repeat" items="{{sampleTemplatesList}}" as="currentfield">
                    <field-controller on-field-list-value-changed="onListChange" name="{{sampleTemplatesList}}{{currentfield.name}}" selected-language="{{selectedLanguage}}" field="{{currentfield}}" value="{{selectedSampleTemplate}}"></field-controller>
                </template>
            </div>                
            
            <template is="dom-repeat"  items="{{sampleTemplates}}" as="currenttemplate">
              <template is="dom-if" if="{{_isThisTemplate(selectedSampleTemplate, currenttemplate.name)}}">
-->              
              <!-- {{selectedSampleTemplate}} {{currenttemplate.name}}               
                <div name="sampleLoginForm" class="containerGradient">
<!--                        <template is="dom-repeat"  items="{{currenttemplate.definition.fields}}" as="currentStructure">   -->
<vaadin-button name="Create" value="{{currenttemplate.definition}}" on-click="{{logNewSample(currenttemplate.definition)}}">New</vaadin-button>                        
                            <template is="dom-repeat"  items="{{currentStructure.fields}}" as="currentfield">   
<!--                                <p>rrr {{currentfield.name}}</p>     -->
                                <field-controller  on-field-button-clicked="fieldButtonClicked" on-field-list-value-changed="onListChange" id="{{currentfield.name}}" selected-language="{{selectedLanguage}}" field="{{currentfield}}"></field-controller>
                            </template>   
                            
<!--                        </template>  -->
                        
                        <paper-spinner-lite alt="log New Sample" width="6px" active="[[loading]]"></paper-spinner-lite>                            
<!--                    </nav> -->
<!--                </div>
                </template>
            </template>
-->
            <template>
            <paper-button raised onclick="modalAlert.toggle()">modal alert</paper-button>
            <simple-dialog id="modalAlert" modal role="alertdialog">
              <h2>Alert</h2>
              <paper-dropdown-menu-light label="Draft to discard">
                <!--
                  support hybrid mode: 
                  paper-dropdown-menu-light 1.x distributes via <content select=".dropdown-content">
                  paper-dropdown-menu-light 2.x distributes via <slot name="dropdown-content">
                -->
                <paper-listbox class="dropdown-content" slot="dropdown-content">
                  <paper-item>Draft 1</paper-item>
                  <paper-item>Draft 2</paper-item>
                  <paper-item>Draft 3</paper-item>
                  <paper-item>Draft 4</paper-item>
                </paper-listbox>
              </paper-dropdown-menu-light>
              <div class="buttons">
                <paper-button onclick="modalDetails.toggle()">More details</paper-button>
                <paper-button dialog-dismiss>Cancel</paper-button>
                <paper-button dialog-confirm autofocus>Discard</paper-button>
              </div>
            </simple-dialog>
            <simple-dialog id="modalDetails" modal>
              <h2>Details</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <div class="buttons">
                <paper-button dialog-confirm autofocus>OK</paper-button>
              </div>
            </simple-dialog>
          </template>
                      
        `;
    }

    /**
     * Instance of the element is created/upgraded. Use: initializing state,
     * set up event listeners, create shadow dom.
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * Use for one-time configuration of your component after local
     * DOM is initialized.
     */
    ready() {
        super.ready();
    }
    SampleTemplatesResponse() {
        //console.log('SampleTemplatesResponse', this.sampleTemplatesList[0].items.length);                
        var i;
        for (i = 0; i < this.sampleTemplates.length; i++) { 
            //console.log(this.sampleTemplates[i].name);
          if (i == 0) {
            //console.log('before', this.sampleTemplatesList[0].items[0].keyName);
            this.set('sampleTemplatesList.0.items.0.keyName', this.sampleTemplates[i].name); 
            this.set('sampleTemplatesList.0.items.0.keyValue_en', this.sampleTemplates[i].name); 
            this.set('sampleTemplatesList.0.items.0.keyValue_es', this.sampleTemplates[i].name); 
            //console.log('after', this.sampleTemplatesList[0].items[0].keyName);
          }else {
            this.push('sampleTemplatesList.0.items', {
                    keyName: this.sampleTemplates[i].name, 
                    keyValue_es: this.sampleTemplates[i].name,  
                    keyValue_en: this.sampleTemplates[i].name}
                    );     
          }
        }        
    }
    SampleTemplatesError() {
        //console.log('SampleTemplatesError', this.sampleTemplates);
    }

    logNewSample(formFields) {
        //console.log(this.currenttemplate, formFields);
        this.dispatchEvent(new CustomEvent('toast-message', {
            bubbles: true,
            composed: true,
            detail: 'New sample will be logged ...'
          }));  
          console.log('load e-sign');
          import('../../internalComponents/e-sign.js');  
    }
    fieldButtonClicked(e) {       
        //console.log('fieldButtonClicked', e.detail.buttonName);
        if (e.detail.buttonName=="buttonAccess"){ 
            this.dispatchEvent(new CustomEvent('toast-message', {
                bubbles: true,
                composed: true,
                detail: 'New sample will be logged ddddd...'
              }));  
           //   this.fields[3].value // Reset button value to be clickable back again.        
       //   this.login();
        }       
      }    
    stateChanged(state) {        
        this.selectedLanguage = state.app.user.appLanguage;        
        //console.log('stateChanged conneted element', this.selectedLanguage);
      }     
}

customElements.define('sample-login-bck', SampleLoginBck);