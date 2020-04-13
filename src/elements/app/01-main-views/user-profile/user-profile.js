import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../../store.js';
import {AuthenticationApi} from '../../mixin/authentication-api';
import {changeUserPasswordForm, changeUserEsignForm, saveOpenTabsForm} from '../../../../config/app-config.js';
import {Appapi} from '../../mixin/api-app.js';
import { schema_name } from '../../../modules/process-us/03config/config-process.js';
import '../../mixin/app-elements';
import './../../../../config/styles/cards-style';
/**
 * `user-profile` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class UserProfile extends Appapi(AuthenticationApi(connect(store)(PolymerElement))){
    stateChanged(state) {
        console.log('user-Profile.js >> stateChanged >> this.userInfo', this.userInfo);
        this.finalToken = state.app.user.finalToken; 
        this.userInfo = state.app.user;
        this.tabsOpen= state.tabs.tabs 
    }        
    static get properties() {
        return {
            schemaPrefix:{type: String, value:schema_name},
            finalToken: {type: String},  
            userInfo:{type:Object},
            tabsOpen:{type:Object},
            changeUserPasswordForm:{type:Array, value:changeUserPasswordForm}, changeUserEsignForm:{type:Array, value:changeUserEsignForm}, saveOpenTabsForm:{type:Array, value:saveOpenTabsForm},
        }
    }

    static get template() {
        return html`
        <style include="cards-style"></style>
        <style>
            #wraxxxpper
                {
                width:800px;
                background-color:#f2f2e8;
                position:relative;
                left:50%;
                margin-left:-400px;
                border-radius: 10px;
                -moz-border-radius: 10px;
                padding:5px;
                }
            #topBar
                {
                width:780px;
                border: 1px solid;
                border-color: #dbd9ca;
                border-radius: 10px;
                -moz-border-radius: 10px;
                margin:5px;
                padding:5px;
                }
            #central
                {
                width:780px;
                border: 1px solid;
                border-color: #dbd9ca;
                border-radius: 10px;
                -moz-border-radius: 10px;
                margin:5px;
                margin-top:20px;
                padding:5px;
                }  
        </style>      
        <style include="cards-style"></style>  
        <app-elements id="appelement"></app-elements>
        <div id="topBar">
            <div id="central"> 
                <p>{{userInfo.userDB}} </p>
                <div class="card">
                    <div id="changePw" style="display:flex;">
                    <template is="dom-repeat" items="{{changeUserPasswordForm}}" as="currentfield">       
                        <field-controller on-keydown="keyPressedChangePassword" on-field-button-clicked="changePassword" on-field-list-value-changed="onListChange" id="{{currentfield.name}}"  field="{{currentfield}}"></field-controller>
                    </template>       
                    </div>
                    <div id="changeEsign" style="display:flex;">
                    <template is="dom-repeat" items="{{changeUserEsignForm}}" as="currentfield">       
                        <field-controller on-keydown="keyPressedChangeEsign" on-field-button-clicked="changeEsign" on-field-list-value-changed="onListChange" id="{{currentfield.name}}"  field="{{currentfield}}"></field-controller>
                    </template>                                
                    </div>
                    <div id="changeEsign" style="display:flex;">
                    <template is="dom-repeat" items="{{saveOpenTabsForm}}" as="currentfield">       
                        <field-controller on-keydown="keyPressed" on-field-button-clicked="saveOpenTabs" on-field-list-value-changed="onListChange" id="{{currentfield.name}}"  field="{{currentfield}}"></field-controller>
                    </template>                                
                    </div>
                </div>
            </div>
        </div>
        `;
    }
    keyPressedChangePassword(e){
        //console.log('key pressed');
        if(e.key=="Enter") {
          this.changePassword();
          return;
        }   
    }      
    keyPressedChangeEsign(e){
        //console.log('key pressed');
        if(e.key=="Enter") {
          this.changeEsign();
          return;
        }   
    }  
    changePassword(e){
        var selectedRow=[];
        selectedRow.newPassword=changeUserPasswordForm[0].value;
        this.$.appelement.appActionTrigger(changeUserPasswordForm[1].name, selectedRow, changeUserPasswordForm[1]);
    }
    changeEsign(e){
        var selectedRow=[];
        selectedRow.newEsign=changeUserEsignForm[0].value;
        this.$.appelement.appActionTrigger(changeUserEsignForm[1].name, selectedRow, changeUserEsignForm[1]);
    }    
    saveOpenTabs(e){
        var tabsString='';
        var i;
        for (i = 0; i < this.tabsOpen.length; i++) { 
            tabsString=tabsString+'lp_frontend_page_name:'+this.tabsOpen[i].lp_frontend_page_name+'*';
            tabsString=tabsString+'tabName:'+this.tabsOpen[i].tabName+'*';
            tabsString=tabsString+'tabLabel_en:'+this.tabsOpen[i].tabLabel_en+'*';
            tabsString=tabsString+'tabLabel_es:'+this.tabsOpen[i].tabLabel_es+'*';
            if (this.tabsOpen[i].procedure.name!=undefined){
                tabsString=tabsString+'procedure:'+this.tabsOpen[i].procedure.name+'*';
                tabsString=tabsString+'tabType:'+'tab'+'*';
            }else{
                tabsString=tabsString+'procedure:'+this.tabsOpen[i].procedure+'*';
                tabsString=tabsString+'tabType:'+'systab'+'*';
            }
            tabsString=tabsString+'tabEsignRequired:'+this.tabsOpen[i].tabEsignRequired+'*';
            tabsString=tabsString+'tabConfirmUserRequired:'+this.tabsOpen[i].tabConfirmUserRequired;
            if (i+1<this.tabsOpen.length){tabsString=tabsString+'|'}
        }
        console.log('saveOpenTabs', tabsString);        

        var selectedRow=[];
        selectedRow.tabsString=tabsString;
        
        this.$.appelement.appActionTrigger(saveOpenTabsForm[0].name, selectedRow, saveOpenTabsForm[0]);
    }
}
customElements.define('user-profile', UserProfile);