import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../../store';
import '@polymer/paper-badge';

import {setCurrentTab, addSystemTab } from '../../Redux/actions/tabs_actions';
import {sopPaneIconAndBadge_iconGreen, sopPaneIconAndBadge_iconRed, pendingSOPTab, userMySOPTab} from '../../../../config/app-config';
import './../../../../config/styles/paper-badge-style.js';
import './../../../../config/styles/paper-button-style.js';
import './../../../../config/styles/div-style.js';
import './../../../../config/styles/img-style.js';
/**
 * `LowerCaseDashedName` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class SopIconandbadge extends (connect(store)(PolymerElement)) {
    static get properties() {
        return {
            contAllUserSOPs: {type: Number, value:0 },
            contPendingUserSOPs: {type: Number, value:0 },
            iconNameRed: {type: String, value: sopPaneIconAndBadge_iconRed},
            iconNameGreen: {type: String, value: sopPaneIconAndBadge_iconGreen},
            iconName: String, showPendingSOP: Boolean,
        }
    }
    static get template() {
        return html`
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
        `;
    }
    stateChanged(state) {    
        if (!state.SOPS.userAllSop){this.contAllUserSOPs=0;}         
        else{
            if (state.SOPS.userAllSop.length==0){this.contAllUserSOPs=0;}         
            else{
                if (!state.SOPS.userAllSop[0].my_sops){this.contAllUserSOPs=0;}
                else{this.contAllUserSOPs = state.SOPS.userAllSop[0].my_sops.length;}
            }
        }            
        if (state.SOPS.userPendingSop==undefined){this.contPendingUserSOPs=0; this.showPendingSOP=false; this.iconName=this.iconNameGreen;}
        if (state.SOPS.userPendingSop.length==0){this.contPendingUserSOPs=0; this.showPendingSOP=false; this.iconName=this.iconNameGreen;}
        else{this.contPendingUserSOPs = state.SOPS.userPendingSop.length; this.showPendingSOP=true; this.iconName=this.iconNameRed;}
    }   
    pendingSOPClicked(){
        store.dispatch(addSystemTab(pendingSOPTab));
        var curTab = [];
        curTab.tabName ='sop-myPendingSops';
        store.dispatch(setCurrentTab(curTab));            
    }
    AllUserSOPClicked(){
        store.dispatch(addSystemTab(userMySOPTab));
        var curTab = [];
        curTab.tabName ='sop-allMySops';
        store.dispatch(setCurrentTab(curTab));            
    }    
}
customElements.define('sop-iconandbadge', SopIconandbadge);