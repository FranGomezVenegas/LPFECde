import{PolymerElement,html}from"../../../../../node_modules/@polymer/polymer/polymer-element.js";import{connect}from"../../../../../node_modules/pwa-helpers/connect-mixin.js";import{store}from"../../../../store.js";import"../../../../../node_modules/@polymer/paper-badge/paper-badge.js";import{setCurrentTab,addSystemTab}from"../../Redux/actions/tabs_actions.js";import{sopPaneIconAndBadge_iconGreen,sopPaneIconAndBadge_iconRed,pendingSOPTab,userMySOPTab}from"../../../../config/app-config.js";import"../../../../config/styles/paper-badge-style.js";import"../../../../config/styles/paper-button-style.js";import"../../../../config/styles/div-style.js";import"../../../../config/styles/img-style.js";/**
 * `LowerCaseDashedName` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */class SopIconandbadge extends connect(store)(PolymerElement){static get properties(){return{contAllUserSOPs:{type:Number,value:0},contPendingUserSOPs:{type:Number,value:0},iconNameRed:{type:String,value:sopPaneIconAndBadge_iconRed},iconNameGreen:{type:String,value:sopPaneIconAndBadge_iconGreen},iconName:String,showPendingSOP:Boolean}}static get template(){return html`
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
this.showPendingSOP=!0;this.iconName=this.iconNameRed}}pendingSOPClicked(){store.dispatch(addSystemTab(pendingSOPTab));var curTab=[];curTab.tabName="sop-myPendingSops";store.dispatch(setCurrentTab(curTab))}AllUserSOPClicked(){store.dispatch(addSystemTab(userMySOPTab));var curTab=[];curTab.tabName="sop-allMySops";store.dispatch(setCurrentTab(curTab))}}customElements.define("sop-iconandbadge",SopIconandbadge);