define(["../../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../../node_modules/pwa-helpers/connect-mixin.js","../../../../store.js","../../../../../node_modules/@polymer/paper-badge/paper-badge.js","../../Redux/actions/tabs_actions.js","../../../../config/app-config.js","../../../../config/styles/paper-badge-style.js","../../../../config/styles/paper-button-style.js","../../../../config/styles/div-style.js","../../../../config/styles/img-style.js"],function(_polymerElement,_connectMixin,_store,_paperBadge,_tabs_actions,_appConfig,_paperBadgeStyle,_paperButtonStyle,_divStyle,_imgStyle){"use strict";/**
 * `LowerCaseDashedName` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */class SopIconandbadge extends(0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement){static get properties(){return{contAllUserSOPs:{type:Number,value:0},contPendingUserSOPs:{type:Number,value:0},iconNameRed:{type:String,value:_appConfig.sopPaneIconAndBadge_iconRed},iconNameGreen:{type:String,value:_appConfig.sopPaneIconAndBadge_iconGreen},iconName:String,showPendingSOP:Boolean}}static get template(){return _polymerElement.html`
        <style include="paper-badge-style"></style> <style include="div-style"></style>
        <style include="img-style"></style><style include="paper-button-style"></style>
        <div>
            <div class="sopIconAndBadge">                
                <img class="sopIconAndBadge" src="{{iconName}}">
                <template is="dom-if" if="[[showPendingSOP]]">
                    <paper-button id="btn" class="sopIconAndBadgePendingSop"></paper-button>
                        <paper-badge for="btn" class="sopIconAndBadgePendingSop" on-click="pendingSOPClicked" label="{{contPendingUserSOPs}}">                            
                        </paper-badge>
                </template>
                <paper-button id="btn2" class="sopIconAndBadgePendingSop"></paper-button>
                    <paper-badge for="btn2" class="sopIconAndBadgeAllUserSop" on-click="AllUserSOPClicked" label="{{contAllUserSOPs}}">                        
                    </paper-badge>
            </div>
        </div>
        `}stateChanged(state){if(!state.SOPS.userAllSop){this.contAllUserSOPs=0}else{if(0==state.SOPS.userAllSop.length){this.contAllUserSOPs=0}else{if(!state.SOPS.userAllSop[0].my_sops){this.contAllUserSOPs=0}else{this.contAllUserSOPs=state.SOPS.userAllSop[0].my_sops.length}}}if(state.SOPS.userPendingSop==void 0){this.contPendingUserSOPs=0;this.showPendingSOP=!1;this.iconName=this.iconNameGreen}if(0==state.SOPS.userPendingSop.length){this.contPendingUserSOPs=0;this.showPendingSOP=!1;this.iconName=this.iconNameGreen}else{this.contPendingUserSOPs=state.SOPS.userPendingSop.length;this.showPendingSOP=!0;this.iconName=this.iconNameRed}}pendingSOPClicked(){_store.store.dispatch((0,_tabs_actions.addSystemTab)(_appConfig.pendingSOPTab));var curTab=[];curTab.tabName="sop-myPendingSops";_store.store.dispatch((0,_tabs_actions.setCurrentTab)(curTab))}AllUserSOPClicked(){_store.store.dispatch((0,_tabs_actions.addSystemTab)(_appConfig.userMySOPTab));var curTab=[];curTab.tabName="sop-allMySops";_store.store.dispatch((0,_tabs_actions.setCurrentTab)(curTab))}}customElements.define("sop-iconandbadge",SopIconandbadge)});