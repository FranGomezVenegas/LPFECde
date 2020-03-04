import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import '@polymer/paper-button/paper-button';
import './../dialogs/shared-styles';
import '../form-fields/field-button';
import {ApiSample} from '../../modules/process-us/01moduleFunctionality/api-sample';
import './../../../config/styles/div-style.js'; 
/**
 * `card-form` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class CardForm extends ApiSample(PolymerElement) {
    static get properties() {
        return {
            dialogButtons: { type: Array},
            schemaPrefix: {type:String},
            buttons: {type: Array},
            formFields: Array,
//            selectedObject: {type: Object, notify: true}
            buttonCancel: {type: Object,
                value:{
                name: "Cancel",
                label_en: "Cancel", "label_es": "Cancelar",
                type: "button",
                confirmuser_required: false,
                read_only: false,}
            }  
        }
    }
    static get template() {
        return html`  
        <style include="div-style"></style>
        <div class="internalComponentCardFormMainDiv internalComponentCardFormMainDivBgimg">
            <div>
                <field-button name="cancel" field="[[buttonCancel]]" dialog-dismiss on-click="dialogCanceled">Cancel</field-button>
                <paper-button name="confirm" dialog-confirm autofocus on-click="dialogConfirmed">Accept</paper-button>
            </div>
            <div name="Buttons1" class="buttonGroup">
                <template is="dom-repeat" items="{{buttons}}" as="currentfield">                       
                    <field-controller id="{{currentfield.name}}"  field="{{currentfield}}"
                    on-field-button-clicked="fieldButtonClicked" on-field-list-value-changed="onListChange"> 
                    </field-controller>
                </template>  
            </div>    
            <template is="dom-repeat" items="{{formFields}}" as="currentfield">      
                 <!-- <p> Curr Fld={{currentfield.name}} / {{currentfield.type}} </p>  -->
                 <field-controller on-keydown="keyPressed" on-field-button-clicked="cardFormdButtonClicked" on-field-list-value-changed="onListChange" id="{{currentfield.name}}"  field="{{currentfield}}">
                </field-controller> 
            </template>       
  
        </div>            
        `;
    } 

    cardFormdButtonClicked(e) {
        console.log('card-form, button clicked!. Button action=', e.detail.buttonName);
        this.dispatchEvent(new CustomEvent('field-button-clicked', {
            bubbles: true,
            composed: true,
            detail: {'buttonName': e.detail.buttonName,'value': e.detail, 'buttonDefinition':e}
        }));    
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
        default:
            break;
        }
        return;
    }  */  
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

customElements.define('card-form', CardForm);