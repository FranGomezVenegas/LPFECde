import{PolymerElement,html}from"../../../../../node_modules/@polymer/polymer/polymer-element.js";import{connect}from"../../../../../node_modules/pwa-helpers/connect-mixin.js";import{store}from"../../../../store.js";import{FrontendSopUser}from"../../mixin/frontend-sopuser.js";import{ApiSopUser}from"../../mixin/api-sopuser.js";import{sopUserAllSop_fieldToRetrieve}from"../../../../config/app-config.js";import{sopMySops_buttons}from"../../../../config/app-config.js";import"../../../internalComponents/form-fields/field-controller.js";import"./pdf-link.js";import"../../../../config/styles/cards-style.js";import"../../../../config/styles/div-style.js";class MySops extends ApiSopUser(FrontendSopUser(connect(store)(PolymerElement))){static get properties(){return{finalToken:{type:String,observer:"onFinalTokenFilled"},allMySops:Array,dialogButtons:{type:Array,value:sopMySops_buttons}}}stateChanged(state){this.finalToken=state.app.user.finalToken;this.allMySops=state.SOPS.userAllSop;//console.log('my-sops', 'this.allMySops', this.allMySops);
}onFinalTokenFilled(){var actionName="ALL_MY_SOPS",paramsUrl="actionName="+actionName+"&finalToken="+this.finalToken+"&sopFieldsToRetrieve="+sopUserAllSop_fieldToRetrieve,datas=[];datas.finalToken=this.finalToken;datas.actionName=actionName;datas.paramsUrl=paramsUrl;this.frontEndSopUserAPI(datas);//console.log('ALL_MY_SOPS >> onFinalTokenFilled > datas', datas);
}static get template(){return html`
            <style include="cards-style"></style>
            <style include="div-style"></style>
            <!-- allMySops.length: {{allMySops.0.length}} allMySops.my_sops.length: {{allMySops.0.my_sops.length}} -->
            <div class="wrapperMySops">
            <template is="dom-repeat" items="[[allMySops.0.my_sops]]">              
                <div class="cardMySops"> 
                    <p><pdf-link align="center" file-link="[[item.file_link]]"></pdf-link></p>
                    <p><b>Procedure:</b> {{item.procedure}}<p></p>
                    <p><b>SOP Name:</b> {{item.sop_name}}</p>
                    <p><b>Summary:</b> {{item.brief_summary}}</p>
                    <p><b>My Certification Status:</b> 
                            <paper-icon-button style="{{certificationStatusStyleDefinition(item)}}" icon="{{certificationStatus(item)}}" 
                            title="{{item.status)}}"
                            disabled="{{field.read_only}}" value="{{field.name}}" ></paper-icon-button>
                    </p>
                    <template is="dom-if" if="{{displayCompleteButton(item)}}">                          
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
            </div>
        `}displayCompleteButton(item){//console.log(item);
switch(item.status){case"PASS":return!1;case"NOTPASS":return!0;default:return!1;}}certificationStatus(item){//console.log('certificationStatus', item);
switch(item.status){case"PASS":return"icons:bookmark";case"NOTPASS":return"icons:watch-later";default:return"icons:warning";}//return "icons:warning"; "icons:bookmark";"xf046@FontAwesome";
}certificationStatusStyleDefinition(item){switch(item.status){case"PASS":return"color:green;";case"NOTPASS":return"color:red;";default:return"color:red;";}}}customElements.define("my-sops",MySops);