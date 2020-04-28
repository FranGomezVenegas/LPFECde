import{PolymerElement,html}from"../../../../../../node_modules/@polymer/polymer/polymer-element.js";import{connect}from"../../../../../../node_modules/pwa-helpers/connect-mixin.js";import{store}from"../../../../../store.js";import"../../../../internalComponents/cards/card-form.js";import"../../../../../../node_modules/@polymer/paper-dialog/paper-dialog.js";import"../../../../internalComponents/grid-components/vaadingrid-singleselect.js";import"../../01moduleFunctionality/env-monit-elements.js";import{EmDemoAapiEnvMonit}from"../../01moduleFunctionality/api-env-monit.js";import{FrontendEnvMonit}from"../../01moduleFunctionality/frontend-env-monit.js";import{schema_name,progCorrectiveActionButtons,progCorrectiveActionTableHeaderFields}from"../../03config/config-process.js";//import {setselectedProgramCorrectiveActions} from '../../02Redux/em-demo-a_actions.js';
import{FieldsMethods}from"../../../../app/app-functions/fields-methods.js";class EmDemoAProgCorrectiveActions extends FieldsMethods(EmDemoAapiEnvMonit(FrontendEnvMonit(connect(store)(PolymerElement)))){static get properties(){return{schemaPrefix:{type:String,value:schema_name},selectedPointCardForm:{type:Object},//, value:appLogin_formFields},
selectedProgram:{type:Object,observer:"onFinalTokenFilled"},selectedProgramCorrectiveActions:{type:Object},progProintsCardFormButtons:{type:Object,value:progCorrectiveActionButtons},selectedObject:{type:Object,notify:!0},programCorrectiveActionTableHeaderFields:{type:Array,value:progCorrectiveActionTableHeaderFields},callBackRefreshWindow:Object,selectedLanguage:String,tableTitle:{type:Object,value:{label_en:"Pending Corrective Actions",label_es:"Acciones Correctivas Pendientes"}}}}static get template(){return html`
            <style>
            vaadin-button {
                top: 0;
                left: 0;
                transition: all .15s linear 0s;
                position: relative;
                display: inline-block;
                padding: 15px 25px;
                background-color: $yellow;
                
                text-transform: uppercase;
                color: $brown;
                font-family: arial;
                letter-spacing: 1px;
                
                box-shadow: -6px 6px 0 $brown;
                text-decoration: none;
                
                &:hover {
                  top: 3px;
                  left: -3px;
                  box-shadow: -3px 3px 0 $brown;
                  
                  &::after {
                    top: 1px;
                    left: -2px;
                    width: $angle-o;
                    height: $angle-o;
                  }
                  
                  &::before {
                    bottom: -2px;
                    right: 1px;
                    width: $angle-o;
                    height: $angle-o;
                  }
                } }           
                div.parentMap{
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                    background-color: blue;
                }
                .programsList {
                    display: none;
                    width: 200px;
                    height: 100px;
                    margin: 1em;
                }  
                .programDefinition {
                    display: inline-block;
                    width: 1200px;
                    height: 300px;
                    margin: 1em;
                }    
                .card {
                    margin: 24px;
                    padding: 16px;
                    color: #757575;
                    border-radius: 5px;
                    background-color: #fff;
                    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
                }   
                p.tableTitle{
                    margin-top: 0px;
                    margin-bottom: 3px;    
                    color: #4285f4;
                    font-size:30px;
                }        
            </style>
            <env-monit-elements id="myElements" call-back-function-env-monit-elem="{{callBackRefreshWindow}}"></env-monit-elements>
            <div name="Buttons1" class="buttonGroup">
                <p class="tableTitle">{{labelValue(selectedLanguage, tableTitle)}}</p>
                <template is="dom-repeat" items="{{progProintsCardFormButtons}}" as="currentfield">       
                    <field-controller id="{{currentfield.name}}"  field="{{currentfield}}"
                    on-field-button-clicked="fieldButtonClicked" on-field-list-value-changed="onListChange"> 
                    </field-controller>
                </template>  
            </div>            
            <div style="display:flex">
                <vaadingrid-singleselect style="width:100%;" id="mygridid" headerfields="{{programCorrectiveActionTableHeaderFields}}" 
                    rowcontainer="{{selectedProgramCorrectiveActions}}" selected-object="{{selectedObject}}"
                    ></vaadingrid-singleselect>
            </div>

            <paper-dialog id="pointCard">
                <card-form form-fields="{{selectedProgramCorrectiveActions}}" buttons="{{cardFormButtons}}" 
                on-field-button-clicked="sampleLogButtonClicked"
                on-dialog-button-clicked="dialogClosedpointCard"> </card-form>
            </paper-dialog>

        `}mapClick(e){console.log("mapClick","click",this.source);var posicXInit=e.offsetX,posicYInit=e.offsetY;console.log("posicXInit",posicXInit,"posicYInit",posicYInit);//this.shadowRoot.getElementById(e.currentTarget.posicIndex+'content').style.zIndex=1000;                       
}itemSelected(){console.log("itemSelected xssss")}/*    pointClicked(e){
        //this.selectedPointCardForm=e.currentTarget.cardForm;
        if (!e.detail.value){return;}
        //console.log('em-demo-a-prog-corrective-actions >> pointClicked', 'this.selectedObject', this.selectedObject, 'this.selectedProgramCorrectiveActions', this.selectedProgramCorrectiveActions );        
        store.dispatch(setselectedProgramCorrectiveActions(e.detail.value.card_info));
        this.$.pointCard.open();
    }*/refreshWindow(){this.onFinalTokenFilled()}onFinalTokenFilled(){this.callBackRefreshWindow=this.refreshWindow.bind(this);//console.log('em-demo-a-programs', 'onFinalTokenFilled');
if(null==this.selectedProgram.name)return;this.getSelectedProgramCorrectiveAction({finalToken:this.finalToken,schemaPrefix:this.schemaPrefix,programName:this.selectedProgram.name})}stateChanged(state){this.selectedLanguage=state.app.user.appLanguage;this.finalToken=state.app.user.finalToken;if(null!=state.emDemoA){this.selectedProgramCorrectiveActions=state.emDemoA.selectedProgramCorrectiveActions;this.selectedProgram=state.emDemoA.selectedProgram;//this.unReceivedSamples= state.processUs.unReceivedSamples;
}this.schemaPrefix=schema_name}}customElements.define("em-demo-a-prog-corrective-actions",EmDemoAProgCorrectiveActions);