define(["../../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../../node_modules/pwa-helpers/connect-mixin.js","../../../../store.js","../../../internalComponents/others/ribbon-element.js","../../../internalComponents/form-fields/field-controller.js","../01moduleFunctionality/frontend-sample.js","../03config/config-process.js"],function(_polymerElement,_connectMixin,_store,_ribbonElement,_fieldController,_frontendSample,_configProcess){"use strict";class processUsSampleLogin extends(0,_frontendSample.FrontendSample)((0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement)){stateChanged(state){//console.log('state', state); 
this.selectedLanguage=state.app.user.appLanguage;this.currTabEsignRequired=state.tabs.currTabEsignRequired;this.currTabConfirmUserRequired=state.tabs.currTabConfirmUserRequired;// this.dispatchEvent(new CustomEvent('toast-message', {
//     bubbles: true,
//     composed: true,
//     detail: 'currTabEsignRequired'+this.currTabEsignRequired
// }));
this.schemaPrefix=_configProcess.schema_name;this.finalToken=state.app.user.finalToken;if(null!=state.processUs){this.sampleTemplates=state.processUs.sampleTemplates;//console.log('stateChanged', 'templates', this.sampleTemplates);
}}static get properties(){return{schemaPrefix:{type:String,value:_configProcess.schema_name},finalToken:{type:String,observer:"onFinalTokenFilled"},currTabEsignRequired:{type:Boolean},currTabConfirmUserRequired:{type:Boolean},sampleLoginRibbonField:{type:Object,value:_configProcess.sampleLogin_ribbonField},sampleTemplateFields:Array,sampleTemplates:{type:Array,notify:!0,observer:"fillSampleTemplateList"},currenttemplate:Array,selectedSampleTemplateIndex:Number,selectedSampleTemplate:{type:String,value:"Begin",notify:!0},formTemplate:String,displayForm:{type:Boolean,value:!1,notify:!0},sampleTemplatesList:{type:Array,notify:!0,bubble:!0,value:_configProcess.sampleLogin_formFields}}}onListChange(e){// console.log('onListChange', 'template definition', this.sampleTemplates);
// if (e.detail.name=="userRole"){ 
//     this.doLogin(e.detail.value);}
console.log("onListChange","e.detail.value",e.detail.value,"template definition",this.sampleTemplates);//let sampleTemplateFields = this.sampleTemplatesList[1].definition;
if("sampleTemplatesList"==e.detail.name){this.selectedSampleTemplateIndex=e.detail.index;let sampleTemplatesFieldsLocal=this.sampleTemplates[e.detail.index].definition[0].fields;this.selectedSampleTemplate=e.detail.value;this.sampleTemplatesFields=sampleTemplatesFieldsLocal}return}static get template(){return _polymerElement.html`
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
            <!-- <procedure-sops></procedure-sops> -->
            <div name="sampleTemplatesList" class="container"> 
                <template is="dom-repeat" index="{{index}}" items="{{sampleTemplatesList}}" as="currentfield">
                    <field-controller on-field-list-value-changed="onListChange" 
                        name="{{sampleTemplatesList}}{{currentfield.name}}" 
                        field="{{currentfield}}" value="{{selectedSampleTemplate}}">
                    </field-controller>
                </template>    
                <template>     
                <field-controller  
                    name="numSamples" 
                    field="{{sumSamplesFld}}" value="{{numSamples}}">
                </field-controller> 
                </template>                      
            </div>   
            
            <div id="form">             
                <template is="dom-repeat" items="{{sampleTemplatesFields}}" as="currentfield">                
                    <field-controller on-field-button-clicked="SampleLogButtonClicked" on-field-list-value-changed="onListChange" name="{{sampleTemplatesList}}{{currentfield.name}}" 
                      field="{{currentfield}}" value="{{selectedSampleTemplate}}"></field-controller> 
                </template>
            </div>          
            <ribbon-element field="{{sampleLoginRibbonField.0}}"></ribbon-element>              
            <paper-spinner-lite alt="log New Sample" width="6px" active="[[loading]]"></paper-spinner-lite>                            
            <esign-dialog></esign-dialog>
        `}fillSampleTemplateList(){if(1==this.sampleTemplates.length){this.sampleTemplatesFields=this.sampleTemplates[0].definition[0].fields}if(null==this.sampleTemplates){return}var i;for(i=0;i<this.sampleTemplates.length;i++){//console.log(this.sampleTemplates[i].name);
if(0==i){//console.log('before', this.sampleTemplatesList[0].items[0].keyName);
this.set("sampleTemplatesList.0.items.0.keyName",this.sampleTemplates[i].name);this.set("sampleTemplatesList.0.items.0.keyValue_en",this.sampleTemplates[i].name);this.set("sampleTemplatesList.0.items.0.keyValue_es",this.sampleTemplates[i].name);//console.log('after', this.sampleTemplatesList[0].items[0].keyName);
}else{this.push("sampleTemplatesList.0.items",{keyName:this.sampleTemplates[i].name,keyValue_es:this.sampleTemplates[i].name,keyValue_en:this.sampleTemplates[i].name})}}}onFinalTokenFilled(){this.getSampleTemplates({finalToken:this.finalToken,schemaPrefix:this.schemaPrefix,actionName:"GET_SAMPLETEMPLATES"})}}customElements.define("process-us-sample-login",processUsSampleLogin)});