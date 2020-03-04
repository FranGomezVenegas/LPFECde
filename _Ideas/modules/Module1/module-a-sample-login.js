import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import '../../internalComponents/form-fields/field-controller';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../../store.js';


/**
 * `module-a-sample-login` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class ModuleASampleLogin extends connect(store)(PolymerElement) {
    stateChanged(state) {        
        this.selectedLanguage = state.app.user.appLanguage;
        this.finalToken = state.app.user.finalToken;    
        this.schemaPrefix = state.tabs.tabs[this.tabIndex-1].procedure.schemaPrefix;    
            
    }    
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
            }
        }
    }
    onListChange(e) {
        //let sampleTemplateFields = this.sampleTemplatesList[1].definition;
        
        console.log('onListChange', e.detail, e.detail.value, this.sampleTemplatesList, sampleTemplateFields);
        return;
        if (e.detail.name=="sampleTemplatesList"){ 
          //this.selectedSampleTemplate(e.detail.value);
          this.selectedSampleTemplate=e.detail.value;
          console.log('Z', this.sampleTemplates[1].definition);
         // this.set('selectedSampleTemplateStructure', this.sampleTemplates[1].definition.fields); 
          //this.selectedSampleTemplateStructure=this.sampleTemplates[1].definition.fields;
          //this.selectedSampleTemplateStructure=
          //console.log('Z', this.selectedSampleTemplateStructure);
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
Module1 {{schemaPrefix}}-{{selectedSampleTemplate}}
            <div name="sampleTemplatesList" class="container"> 
                <template is="dom-repeat" items="{{sampleTemplatesList}}" as="currentfield">
                    <field-controller on-field-list-value-changed="onListChange" name="{{sampleTemplatesList}}{{currentfield.name}}" field="{{currentfield}}" value="{{selectedSampleTemplate}}"></field-controller>
                </template>
            </div>   
            
            <div id="form" 
            <template is="dom-repeat" items="{{sampleTemplatesList}}" as="currentfield">
            {{currentfield.name}}
            <!-- <field-controller on-field-list-value-changed="onListChange" name="{{sampleTemplatesList}}{{currentfield.name}}" field="{{currentfield}}" value="{{selectedSampleTemplate}}"></field-controller> -->
            </template>
            
      

                        
            <paper-spinner-lite alt="log New Sample" width="6px" active="[[loading]]"></paper-spinner-lite>                            

        `;
    }


    SampleTemplatesResponse() {
        console.log('SampleTemplatesResponse', this.sampleTemplatesList[0].items.length);                
        var i;
        for (i = 0; i < this.sampleTemplates.length; i++) { 
            console.log(this.sampleTemplates[i].name);
          if (i == 0) {
            console.log('before', this.sampleTemplatesList[0].items[0].keyName);
            this.set('sampleTemplatesList.0.items.0.keyName', this.sampleTemplates[i].name); 
            this.set('sampleTemplatesList.0.items.0.keyValue_en', this.sampleTemplates[i].name); 
            this.set('sampleTemplatesList.0.items.0.keyValue_es', this.sampleTemplates[i].name); 
            console.log('after', this.sampleTemplatesList[0].items[0].keyName);
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
        console.log('SampleTemplatesError', this.sampleTemplates);
    }
    logNewSample() {
        console.log(this.currenttemplate);
        this.dispatchEvent(new CustomEvent('toast-message', {
            bubbles: true,
            composed: true,
            detail: 'New sample will be logged ...'
          }));  
          console.log('load e-sign');
          import('../../internalComponents/e-sign.js');
    }
}

customElements.define('module-a-sample-login', ModuleASampleLogin);