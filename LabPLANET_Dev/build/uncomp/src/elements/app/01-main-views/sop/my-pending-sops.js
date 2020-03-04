import{PolymerElement,html}from"../../../../../node_modules/@polymer/polymer/polymer-element.js";import{connect}from"../../../../../node_modules/pwa-helpers/connect-mixin.js";import{store}from"../../../../store.js";import{FrontendSopUser}from"../../mixin/frontend-sopuser.js";import{ApiSopUser}from"../../mixin/api-sopuser.js";import{sopUserPendingSop_fieldToRetrieve}from"../../../../config/app-config.js";import{sopMyPendingSops_buttons}from"../../../../config/app-config.js";import"./pdf-link.js";import"../../../../config/styles/cards-style.js";class MyPendingSops extends ApiSopUser(FrontendSopUser(connect(store)(PolymerElement))){static get properties(){return{finalToken:{type:String,observer:"onFinalTokenFilled"},allMyPendingSops:Object,dialogButtons:{type:Array,value:sopMyPendingSops_buttons}}}stateChanged(state){this.finalToken=state.app.user.finalToken;this.allMyPendingSops=state.SOPS.userPendingSop}onFinalTokenFilled(){//        console.log('MY_PENDING_SOPS >> onFinalTokenFilled', this.finalToken);
var actionName="MY_PENDING_SOPS",paramsUrl="actionName="+actionName+"&finalToken="+this.finalToken+"&sopFieldsToRetrieve="+sopUserPendingSop_fieldToRetrieve,datas=[];datas.finalToken=this.finalToken;datas.actionName=actionName;datas.paramsUrl=paramsUrl;this.frontEndSopUserAPI(datas)}static get template(){return html`
            <style include="cards-style"></style>
            <template is="dom-repeat" items="[[allMyPendingSops]]" as="procedures">  
                <div class="cardPendingSops"> 
                    <h2><p><b>{{procedures.procedure_name}}   </b></p></h2>
                    <template is="dom-repeat" items="[[procedures.pending_sops]]">  
                        <p><pdf-link align="center" file-link="[[item.file_link]]"></pdf-link></p>
                        <p><b>Procedure:</b> {{item.procedure}}<p></p>
                        <p><b>SOP Name:</b> {{item.sop_name}}</p>
                        <p><b>Summary:</b> {{item.brief_summary}}</p>
                        <p><b>My Certification Status:</b> {{item.status}}</p> 
                        <div name="Buttons1" class="buttonGroup">
                            <template is="dom-repeat" items="{{dialogButtons}}" as="currentfield">       
                                <field-controller id="{{currentfield.name}}"  field="{{currentfield}}" value="{{item}}"
                                on-field-button-clicked="fieldButtonClickedForSops" on-field-list-value-changed="onListChange"
                                selected-Object="[[item]]"> 
                                </field-controller>
                            </template>  
                        </div>                                                       
                    </template>
                </div>
            </template>            
        `}}customElements.define("my-pending-sops",MyPendingSops);