import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../../store.js';
import {FrontendSopUser} from '../../mixin/frontend-sopuser.js';
import {sopUserProcedureSop_fieldToRetrieve} from '../../../../config/app-config.js';
import './pdf-link.js';
import '@polymer/polymer/lib/elements/dom-if';
import '../../../internalComponents/form-fields/field-badge.js';
import '@polymer/paper-dialog/paper-dialog';
import '../../../internalComponents/dialogs/simple-modal-dialog.js';
import {sopPaneIconAndBadge_iconGreen, sopPaneIconAndBadge_iconRed} from '../../../../config/app-config';
import './../../../../config/styles/cards-style';

class ProcedureSops extends FrontendSopUser(connect(store)(PolymerElement)) {
    static get properties() {
        return {
            procEventSops: {type: Array, value:[]},
            appLoginFormBackground:{type:String, value:'./images/hexagon-white-blue-light.jpg'},
            iconNameRed: {type: String, value: sopPaneIconAndBadge_iconRed},
            iconNameGreen: {type: String, value: sopPaneIconAndBadge_iconGreen},            
        }
    }
    stateChanged(state) {        
        if (state.tabs.currentTab_sops!=undefined){
            this.procEventSops = state.tabs.currentTab_sops.sop_list;
            if (state.tabs.currentTab_sops.sops_passed==undefined){this.contPendingUserSOPs=0; this.showPendingSOP=false; this.iconName=this.iconNameGreen;}
            if (state.tabs.currentTab_sops.sops_passed){this.contPendingUserSOPs=0; this.showPendingSOP=false; this.iconName=this.iconNameGreen;}
            else{this.contPendingUserSOPs = state.tabs.currentTab_sops.sops_passed; this.showPendingSOP=true; this.iconName=this.iconNameRed;}
        }
    }
   
    static get template() {
        return html`
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

            
        `;
    }
    
    isEmptyProcSops(){
        //console.log('isEmptyProcSops', 'this.procEventSops', this.procEventSops.length);
        if (this.procEventSops==undefined) {return true;}
        if (this.procEventSops.length==0){return true;}
        return false;
    }
    openSopList(){
        console.log('openSopList', this.procEventSops);
        this.$.procedureSopList.open();
    }
}
customElements.define('procedure-sops', ProcedureSops);