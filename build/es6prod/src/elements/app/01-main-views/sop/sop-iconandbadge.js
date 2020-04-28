define(["../../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../../node_modules/pwa-helpers/connect-mixin.js","../../../../store.js","../../../../../node_modules/@polymer/paper-badge/paper-badge.js","../../Redux/actions/tabs_actions.js","../../../../config/app-config.js","../../../../config/styles/paper-badge-style.js","../../../../config/styles/paper-button-style.js","../../../../config/styles/div-style.js","../../../../config/styles/img-style.js"],function(_polymerElement,_connectMixin,_store,_paperBadge,_tabs_actions,_appConfig,_paperBadgeStyle,_paperButtonStyle,_divStyle,_imgStyle){"use strict";/**
 * `LowerCaseDashedName` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */class SopIconandbadge extends(0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement){static get properties(){return{contAllUserSOPs:{type:Number,value:0},contPendingUserSOPs:{type:Number,value:0},iconNameRed:{type:String,value:_appConfig.sopPaneIconAndBadge_iconRed},iconNameGreen:{type:String,value:_appConfig.sopPaneIconAndBadge_iconGreen},iconName:String,showPendingSOP:Boolean}}static get template(){return _polymerElement.html`
        <style include="paper-badge-style"></style> <!-- <style include="div-style"></style> -->
        <style include="img-style"></style> <style include="paper-button-style"></style> 
        <style>
            :host{
                display: flex;
                position: relative;
            }
            #sopIconAndBadgeDIV{ 
                display:flex; 
            }
            
        </style>
            <div class="sopIconAndBadgeDIV">                
                <img class="sopIconAndBadge" src="{{iconName}}">
                <template is="dom-if" if="{{showPendingSOP}}">
                    <paper-badge for="btn" class="pendingSop" on-click="pendingSOPClicked" label="{{contPendingUserSOPs}}"></paper-badge>
                </template>
                <paper-badge for="btn2" class="allUserSop"  on-click="AllUserSOPClicked" label="{{contAllUserSOPs}}"></paper-badge>
            </div>
        `}stateChanged(state){if(!state.SOPS.userAllSop){this.contAllUserSOPs=0}else{if(0==state.SOPS.userAllSop.length){this.contAllUserSOPs=0}else{if(!state.SOPS.userAllSop[0].my_sops){this.contAllUserSOPs=0}else{this.contAllUserSOPs=state.SOPS.userAllSop[0].my_sops.length}}}if(state.SOPS.userPendingSop==void 0){this.contPendingUserSOPs=0;this.showPendingSOP=!1;this.iconName=this.iconNameGreen;return}if(0==state.SOPS.userPendingSop.length){this.contPendingUserSOPs=0;this.showPendingSOP=!1;this.iconName=this.iconNameGreen}else{var pendingUserSOPs=0,i;for(i=0;i<state.SOPS.userPendingSop.length;i++){var pendingProcedureSOPs=pendingUserSOPs+state.SOPS.userPendingSop[i].pending_sops.length;pendingUserSOPs=pendingUserSOPs+pendingProcedureSOPs;//console.log('sop-iconandbadge >> stateChanged', 'pendingProcedureSOPs', pendingProcedureSOPs, 'pendingUserSOPs', pendingUserSOPs);
}this.contPendingUserSOPs=pendingUserSOPs;//state.SOPS.userPendingSop[0].pending_sops.length; 
this.showPendingSOP=!0;this.iconName=this.iconNameRed}}pendingSOPClicked(){_store.store.dispatch((0,_tabs_actions.addSystemTab)(_appConfig.pendingSOPTab));var curTab=[];curTab.tabName="sop-myPendingSops";_store.store.dispatch((0,_tabs_actions.setCurrentTab)(curTab))}AllUserSOPClicked(){_store.store.dispatch((0,_tabs_actions.addSystemTab)(_appConfig.userMySOPTab));var curTab=[];curTab.tabName="sop-allMySops";_store.store.dispatch((0,_tabs_actions.setCurrentTab)(curTab))}}customElements.define("sop-iconandbadge",SopIconandbadge)});