import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import '@polymer/paper-button/paper-button';
import './shared-styles.js';
//import '../../../../internalComponents/grid-components/vaadingrid-singleselectrunaction';
//import '../../../../internalComponents/grid-components/vaadingrid-singleselect.js';
//import '../../../../internalComponents/grid-components/vaadingrid-multiselect';
//import '../../../../app/module-functionality/sample/sample-elements.js';
import '@vaadin/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import '@vaadin/vaadin-grid/vaadin-grid-filter'; 
import '@vaadin/vaadin-grid/vaadin-grid-filter-column'; 

import '../../../../internalComponents/form-fields/field-icon-button.js';

import {dialog_buttons} from '../../../../../config/app-config.js';
import {schema_name, sampleCustodian_cocUsersListButtons} from '../../03config/config-process.js';
import {FrontendSample} from '../../01moduleFunctionality/frontend-sample';
/**
 * `list-modal-coc-users` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class ListModalCocUsers extends FrontendSample(PolymerElement) {
    static get properties() {
        return {
            dialogButtons: { type: Array, value: dialog_buttons},
            listRows: {type:Array,value: [
                {code: 'LOD', method_name: 'LOD Method', method_version: 1}]
            },
            listHeader: Array,
            schemaPrefix: {type:String, value: schema_name},
            buttons: {type: Array, value: sampleCustodian_cocUsersListButtons},            
            selectedObject: {type: Object, notify: true}
        }
    }
    static get template() {
        return html`
  
        <style>
        /* The Modal (background) */
        .modal2 {
            display: none; /* Hidden by default */
            position: absolute; /* Stay in place */
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
        
        .modal-content {
            background-color: #fefefe;
            margin: none;
            padding: 20px;
            width: 450px;
            position: absolute;
        }        
        .bgimg {
            background-image: url('./images/app-login/login-hexagon-background.png');   
            background-repeat: no-repeat;
            background-size: cover;     
                margin-top:0px; margin-left:0px;margin-bottom:0px;margin-right:0px;
                display: inline-block;                    
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
        </style>
        <div class="modal-content bgimg">
            <div>
                <paper-button name="cancel" dialog-dismiss on-click="dialogCanceled">Cancel</paper-button>
                <paper-button name="confirm" dialog-confirm autofocus on-click="dialogConfirmed">Accept</paper-button>
            </div>
            <div name="Buttons1" class="buttonGroup">
                <template is="dom-repeat" items="{{buttons}}" as="currentfield">       
                    <field-controller id="{{currentfield.name}}"  field="{{currentfield}}"
                    on-field-button-clicked="fieldButtonClicked" on-field-list-value-changed="onListChange"> 
                    </field-controller>
                </template>  
            </div>    

            <vaadin-grid id="mygridid" items="{{listRows}}">  
                <vaadin-grid-selection-column  auto-select on-selected-object-changed="itemSelected"></vaadin-grid-selection-column>
                <template is="dom-repeat" items="{{listHeader}}" as="fld">        
                    <vaadin-grid-column resizable path="{{fld.name}}" header="{{fld.label_en}}"></vaadin-grid-column>
                </template>
            </vaadin-grid>          
<!--                            
            <vaadingrid-singleselectrunaction id="mygridid" headerfields="{{listHeader}}" 
                rowcontainer="{{listRows}}" selected-object="{{selectedObject}}"
                on-selected-object-changed="itemSelected">
            </vaadingrid-singleselectrunaction>

            <vaadingrid-singleselect id="mygridid" headerfields="{{listHeader}}" rowcontainer="{{listRows}}"            
            on-selected-object-changed="itemSelected" selected-object="{{selectedObject}}"></vaadingrid-singleselect>
    
            <vaadin-grid id="mygridid" items="{{listRows}}">  
            <vaadin-grid-selection-column  auto-select></vaadin-grid-selection-column>
            <template is="dom-repeat" items="{{listHeader}}" as="fld">        
                <vaadin-grid-column resizable path="{{fld.name}}" header="{{fld.label_en}}"></vaadin-grid-column>
            </template>
            </vaadin-grid>      
-->
        </div>    
        
        `;
    } 


/*    fieldButtonClicked(e) {
        console.log('optionPressed', e.detail.buttonName, 'selectedSampleAnalysis', this.selectedObject);                
        //console.log('optionPressed', e.detail.buttonName, 'selectedSample', this.selectedObject);                
        if (this.selectedObject==null){
            this.dispatchEvent(new CustomEvent('toast-error', {bubbles: true, composed: true,
                detail: 'Please select one sample analysis first'}));    
            return;
        }           
        var datas = [];
        datas.schemaPrefix=this.schemaPrefix; datas.actionName=e.detail.buttonName;
        datas.selectedObject=this.selectedObject;
        var tabInfo={
            currTabEsignRequired: this.currTabEsignRequired,
            currTabConfirmUserRequired: this.currTabConfirmUserRequired};
        datas.tabInfo=tabInfo;            
//        datas.sampleResults_analysisListFieldsToRetrieve=sampleResults_analysisListFieldsToRetrieve;
        switch (e.detail.buttonName) {        
        case 'testAssignment':
            var actionName='TESTASSIGNMENT';
            this.$.myElements.actionTrigger(actionName, datas);
            break;
            // var paramsUrl="actionName="+actionName+"&finalToken="+this.finalToken+"&schemaPrefix="+this.schemaPrefix
            // +"&testId="+"141"+"&newAnalyst="+"2";
            // var datas = [];
            // datas.schemaPrefix=this.schemaPrefix; datas.actionName=actionName; datas.paramsUrl=paramsUrl;   
            // this.sampleAPI(datas);
            // break;  
        default:
            break;
        }
        return;
    }  
*/      
    dialogConfirmed(){
        console.log('dialogConfirmed', 'this.selectedObject', this.selectedObject);        
        this.value='confirmed';
        this.dispatchEvent(new CustomEvent('dialog-button-clicked', {
            bubbles: true,
            composed: true,
            detail: {
            'buttonName': this.name,
            'value': this.value,
            'dialogState': 'confirmed',
            'selectedItems': this.$.mygridid.selectedItems   
            }
        })); 
        this.$.mygridid.selectedItems=[];  
    }        
    dialogCanceled(){
        //console.log('clicked', this.value);
        this.value='confirmed';
        this.dispatchEvent(new CustomEvent('dialog-button-clicked', {
            bubbles: true,
            composed: true,
            detail: {
            'buttonName': this.name,
            'value': this.value,
            'dialogState': 'canceled'
            }
        }));    
    }
    /*ready(){
        this.addEventListener('toast-error', (e) => this.toastError(e) );
    } */       
}

customElements.define('list-modal-coc-users', ListModalCocUsers);