import{PolymerElement,html}from"../../../../../../node_modules/@polymer/polymer/polymer-element.js";import"../../../../../../node_modules/@polymer/paper-button/paper-button.js";import"./shared-styles.js";import"../../../../internalComponents/grid-components/vaadingrid-singleselect.js";//import '../../../../internalComponents/grid-components/vaadingrid-multiselect';
//import '../../../../app/module-functionality/sample/sample-elements.js';
import"../../../../internalComponents/form-fields/field-icon-button.js";import{dialog_buttons}from"../../../../../config/app-config.js";import{schema_name,sampleCustodian_cocSampleHistoryButtons}from"../../03config/config-process.js";import{SampleIcons}from"../../03config/config-icons.js";/**
 * `list-modal-coc-samplehistory` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */class ListModalCocSamplehistory extends SampleIcons(PolymerElement){static get properties(){return{dialogButtons:{type:Array,value:dialog_buttons},listRows:{type:Array,value:[{code:"LOD",method_name:"LOD Method",method_version:1}]},listHeader:Array,schemaPrefix:{type:String,value:schema_name},buttons:{type:Array,value:sampleCustodian_cocSampleHistoryButtons},selectedObject:Array}}static get template(){return html`
  
        <style include="shared-styles">
        /* The Modal (background) */
        .modal2 {
            display: none; /* Hidden by default */
            position: fixed; /* Stay in place */
            z-index: 1; /* Sit on top */
            padding-top: 100px; /* Location of the box */
            left: 0;
            top: 0;
            width: 100%; /* Full width */
            height: 100%; /* Full height */
            overflow: auto; /* Enable scroll if needed */
            background-color: rgb(0,0,0); /* Fallback color */
            background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
        }
        
        /* Modal Content */
        .modal-content {
            background-color: #fefefe;
            margin: auto;
            padding: 20px;
            border: 1px solid #888;
            width: 450px;
        }        
        .bgimg {
            background-image: url('./images/app-login/login-hexagon-background.png');   
            background-repeat: no-repeat;
            background-size: cover;             
            /* width: 90%;        */
        }         
        /* The Close Button */
        .close {
            color: #aaaaaa;
            float: right;
            font-size: 58px;
            font-weight: bold;
        }        
        .close:hover,
        .close:focus {
            color: #000;
            text-decoration: none;
            cursor: pointer;
        }
        .closed {
            display: none
        }

        p {color: #032bbc;font-size: 20px;}         
        </style>
        <div class="modal-content bgimg">              
            <div>
                <paper-button style="font-size: 20px; color: #4285f4;" name="cancel" dialog-dismiss on-click="dialogCanceled">Cancel</paper-button>
                <paper-button style="font-size: 20px; color: #4285f4;" name="confirm" dialog-confirm autofocus on-click="dialogConfirmed">Accept</paper-button>
            </div>            
            <div name="Buttons1" class="buttonGroup">
                <template is="dom-repeat" items="{{buttons}}" as="currentfield">       
                    <field-controller id="{{currentfield.name}}"  field="{{currentfield}}"
                    on-field-button-clicked="fieldButtonClicked" on-field-list-value-changed="onListChange"> 
                    </field-controller>
                </template>  
            </div>    
             <div>                
                <template is="dom-if" if="{{tableListRowsEmpty(listRows)}}">
                <p>No hay cambios de custodia para esta muestra.</p>
                </template>
                <template is="dom-if" if="{{!tableListRowsEmpty(listRows)}}">
                        <vaadingrid-singleselect id="mygridid" headerfields="{{listHeader}}" rowcontainer="{{listRows}}"            
                            selected-object="{{selectedObject}}"></vaadingrid-singleselect>
                </template>
            </div>     
            
        </div>        
        `}fieldButtonClicked(e){console.log("optionPressed",e.detail.buttonName,"selectedSampleAnalysis",this.selectedObject);//console.log('optionPressed', e.detail.buttonName, 'selectedSample', this.selectedObject);                
if(null==this.selectedObject){this.dispatchEvent(new CustomEvent("toast-error",{bubbles:!0,composed:!0,detail:"Please select one sample analysis first"}));return}var datas=[];datas.schemaPrefix=this.schemaPrefix;datas.actionName=e.detail.buttonName;datas.selectedObject=this.selectedObject;var tabInfo={currTabEsignRequired:this.currTabEsignRequired,currTabConfirmUserRequired:this.currTabConfirmUserRequired};datas.tabInfo=tabInfo;//        datas.sampleResults_analysisListFieldsToRetrieve=sampleResults_analysisListFieldsToRetrieve;
switch(e.detail.buttonName){case"testAssignment":var actionName="TESTASSIGNMENT";this.$.myElements.actionTrigger(actionName,datas);break;/*            var paramsUrl="actionName="+actionName+"&finalToken="+this.finalToken+"&schemaPrefix="+this.schemaPrefix
            +"&testId="+"141"+"&newAnalyst="+"2";
            var datas = [];
            datas.schemaPrefix=this.schemaPrefix; datas.actionName=actionName; datas.paramsUrl=paramsUrl;   
            this.sampleAPI(datas);
            break;  */default:break;}return}dialogConfirmed(){//console.log('clicked', this.$.mygrid.getSelectedRows());        
this.value="confirmed";this.dispatchEvent(new CustomEvent("dialog-button-clicked",{bubbles:!0,composed:!0,detail:{buttonName:this.name,value:this.value,dialogState:"confirmed",selectedItems:this.$.mygridid.selectedItems}}));this.$.mygridid.selectedItems=[]}dialogCanceled(){//console.log('clicked', this.value);
this.value="confirmed";this.dispatchEvent(new CustomEvent("dialog-button-clicked",{bubbles:!0,composed:!0,detail:{buttonName:this.name,value:this.value,dialogState:"canceled"}}))}tableListRowsEmpty(content){console.log("tableListRowsEmpty",content.length,0==content.length);if(0==content.length){return!0}return!1}}customElements.define("list-modal-coc-samplehistory",ListModalCocSamplehistory);