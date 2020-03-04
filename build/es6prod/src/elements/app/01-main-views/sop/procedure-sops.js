define(["../../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../../node_modules/pwa-helpers/connect-mixin.js","../../../../store.js","../../mixin/frontend-sopuser.js","../../../../config/app-config.js","./pdf-link.js","../../../../../node_modules/@polymer/polymer/lib/elements/dom-if.js","../../../internalComponents/form-fields/field-badge.js","../../../../../node_modules/@polymer/paper-dialog/paper-dialog.js","../../../internalComponents/dialogs/simple-modal-dialog.js","../../../../config/styles/cards-style.js"],function(_polymerElement,_connectMixin,_store,_frontendSopuser,_appConfig,_pdfLink,_domIf,_fieldBadge,_paperDialog,_simpleModalDialog,_cardsStyle){"use strict";class ProcedureSops extends(0,_frontendSopuser.FrontendSopUser)((0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement)){static get properties(){return{procEventSops:{type:Array,value:[]},appLoginFormBackground:{type:String,value:"./images/hexagon-white-blue-light.jpg"},iconNameRed:{type:String,value:_appConfig.sopPaneIconAndBadge_iconRed},iconNameGreen:{type:String,value:_appConfig.sopPaneIconAndBadge_iconGreen}}}stateChanged(state){if(state.tabs.currentTab_sops!=void 0){this.procEventSops=state.tabs.currentTab_sops.sop_list;if(state.tabs.currentTab_sops.sops_passed==void 0){this.contPendingUserSOPs=0;this.showPendingSOP=!1;this.iconName=this.iconNameGreen}if(state.tabs.currentTab_sops.sops_passed){this.contPendingUserSOPs=0;this.showPendingSOP=!1;this.iconName=this.iconNameGreen}else{this.contPendingUserSOPs=state.tabs.currentTab_sops.sops_passed;this.showPendingSOP=!0;this.iconName=this.iconNameRed}}}static get template(){return _polymerElement.html`
            <style include="cards-style"></style>
 
            <template is="dom-if" if="{{isEmptyProcSops()}}">
                <div class="sop" width="40" height="40">                
                    <img src="{{iconName}}" on-click="openSopList" aligned="center" alt="Avatar" class="avatar" height="40" width="40">
                </div>
            </template>

            <paper-dialog id="procedureSopList">
            
            <div scrollable style="overflow: hidden; margin-top: 0px; margin-bottom: 0px; text-align:center; width: 320px; background-image: url({{appLoginFormBackground}});">
               
                <template is="dom-repeat" items="[[procEventSops]]" as="item">  

                    <div class="cardProcedureSops"> 
                        <p>
                            <pdf-link file-link="[[item.sop_link]]"></pdf-link>
                            <!-- <iron-icon>src="pdf-icon.png"</iron-icon> -->
                            <b>SOP Name: {{item.sop_name}}</b>
                            My Certification Status: {{item.status}}                              
                        </p>                        
                    </div>
                </template> 
            </div>   
            </paper-dialog>

            
        `}isEmptyProcSops(){//console.log('isEmptyProcSops', 'this.procEventSops', this.procEventSops.length);
if(this.procEventSops==void 0){return!0}if(0==this.procEventSops.length){return!0}return!1}openSopList(){console.log("openSopList",this.procEventSops);this.$.procedureSopList.open()}}customElements.define("procedure-sops",ProcedureSops)});