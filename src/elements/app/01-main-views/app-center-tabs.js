import {PolymerElement} from '@polymer/polymer/polymer-element';
import {html} from '@polymer/polymer/lib/utils/html-tag';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../store';
import '@polymer/paper-tabs/paper-tabs';
import '@polymer/paper-tabs/paper-tab';
import '@polymer/iron-pages/iron-pages';
import '@polymer/paper-icon-button/paper-icon-button';

import {setCurrentTab, closeTab } from '../Redux/actions/tabs_actions';
import {FieldsMethods} from '../app-functions/fields-methods';  
import './../01-main-views/sop/procedure-sops';
import './../../../config/styles/paper-tab-style.js';  
import './../../modules/em-demo-a/04-procedure/em-demo-a-programs';
import {Appapi} from '../mixin/api-app.js';
import '../mixin/app-elements';
import {saveOpenTabsForm} from '../../../config/app-config.js';
class AppCenterTabs extends Appapi(FieldsMethods(connect(store)(PolymerElement))) {
    static get properties() {
        return {
            tabs: []
            ,currentTab: []
            ,currTabEsignRequired: Boolean, currTabConfirmUserRequired: Boolean
            ,selectedLanguage: String,
            saveOpenTabsForm:{type:Array, value:saveOpenTabsForm},
        }
    }
    static get template() {
        return html`
        <style include="paper-tab-style"></style>
        <app-elements id="appelement"></app-elements>
        <paper-tabs class="appCenterTabs"selected="{{currentTab}}" attr-for-selected="name" noink scrollable>            
            <paper-tab class="appCenterTabsTabItem"  on-click="saveDefaultTabsOnLogin" name="[[tab.tabName]]" 
                esign-required="false" confirmuser-required="false"
                tab-index="{{index}}">
            <br>
            <paper-icon-button icon="save" icon-tab-index="[[index]]" icon-tab-name="[[tab.tabName]]" on-click="saveDefaultTabsOnLogin"></paper-icon-button>
            </paper-tab>                

            </paper-icon-button>
            <template is="dom-repeat" items="[[tabs]]" as="tab">                                                               
                <paper-tab class="appCenterTabsTabItem"  esign-required="[[tab.esign_required]]" 
                    confirmuser-required="[[tab.confirmUser_required]]" on-click="tabSelected" name="[[tab.tabName]]" 
                    tab-index="{{index}}">{{tabLabelValue(selectedLanguage, tab)}}
                    <br>
                    <paper-icon-button icon="clear" icon-tab-index="[[index]]" icon-tab-name="[[tab.tabName]]" on-click="closeTab"></paper-icon-button>
                </paper-tab>                
            </template>            
        </paper-tabs>
        <procedure-sops></procedure-sops>            
        <iron-pages selected="[[currentTab]]" attr-for-selected="name" hide-immediately>
            <my-sops tab-index="{{tabIndex}}" name="sop-allMySops"> </my-sops>
            <my-pending-sops tab-index="{{tabIndex}}" name="sop-myPendingSops"> </my-pending-sops>
            <user-profile tab-index="{{tabIndex}}" name="user-profile"> </user-profile>
            <new-incident tab-index="{{tabIndex}}" name="new-incident"> </new-incident>

            <process-us-home tab-index="{{tabIndex}}" name="process-us-home"></process-us-home>            
            <process-us-sample-login tab-index="{{tabIndex}}" name="process-us-sample-login"></process-us-sample-login>
            <process-us-sample-reception tab-index="{{tabIndex}}" name="process-us-sample-reception"></process-us-sample-reception> 
            <process-us-sample-results tab-index="{{tabIndex}}" name="process-us-sample-results"></process-us-sample-results>
            <process-us-sample-revision tab-index="{{tabIndex}}" name="process-us-sample-revision"></process-us-sample-revision>
            <process-us-sample-custodian tab-index="{{tabIndex}}" name="process-us-sample-custodian"></process-us-sample-custodian>
            
            <pr-eu-home tab-index="{{tabIndex}}" name="pr-eu-home"></pr-eu-home>            
            <pr-eu-sample-login tab-index="{{tabIndex}}" name="pr-eu-sample-login"></pr-eu-sample-login>
            <pr-eu-sample-reception tab-index="{{tabIndex}}" name="pr-eu-sample-reception"></pr-eu-sample-reception> 
            <pr-eu-sample-results tab-index="{{tabIndex}}" name="pr-eu-sample-results"></pr-eu-sample-results>
            <pr-eu-sample-revision tab-index="{{tabIndex}}" name="pr-eu-sample-revision"></pr-eu-sample-revision>
            <pr-eu-sample-custodian tab-index="{{tabIndex}}" name="pr-eu-sample-custodian"></pr-eu-sample-custodian>

            <em-demo-a-home tab-index="{{tabIndex}}" name="em-demo-a-home"></em-demo-a-home>            
            <em-demo-a-programs tab-index="{{tabIndex}}" name="em-demo-a-programs"></em-demo-a-programs> 
            <em-demo-a-sample-login tab-index="{{tabIndex}}" name="em-demo-a-sample-login"></em-demo-a-sample-login>   
            <em-demo-a-sample-reception tab-index="{{tabIndex}}" name="em-demo-a-sample-reception"></em-demo-a-sample-reception>   
            <em-demo-a-sample-results tab-index="{{tabIndex}}" name="em-demo-a-sample-results"></em-demo-a-sample-results>   
            <em-demo-a-results-calendar tab-index="{{tabIndex}}" name="em-demo-a-results-calendar"></em-demo-a-results-calendar>           
            <em-demo-a-sample-revision tab-index="{{tabIndex}}" name="em-demo-a-sample-revision"></em-demo-a-sample-revision>
            <em-demo-a-sample-custodian tab-index="{{tabIndex}}" name="em-demo-a-sample-custodian"></em-demo-a-sample-custodian>
            <em-demo-a-sample-sampling tab-index="{{tabIndex}}" name="em-demo-a-sample-sampling"></em-demo-a-sample-sampling>
            <em-demo-a-sample-incubation tab-index="{{tabIndex}}" name="em-demo-a-sample-incubation"></em-demo-a-sample-incubation>
            <em-demo-a-sample-incub-incubator tab-index="{{tabIndex}}" name="em-demo-a-sample-incub-incubator"></em-demo-a-sample-incub-incubator>
            <em-demo-a-sample-incub-batch tab-index="{{tabIndex}}" name="em-demo-a-sample-incub-batch"></em-demo-a-sample-incub-batch>
            <em-demo-a-sample-plate-reading tab-index="{{tabIndex}}" name="em-demo-a-sample-plate-reading"></em-demo-a-sample-plate-reading>
            <em-demo-a-sample-microorganism tab-index="{{tabIndex}}" name="em-demo-a-sample-microorganism"></em-demo-a-sample-microorganism>
            <em-demo-a-production-lot tab-index="{{tabIndex}}" name="em-demo-a-production-lot"></em-demo-a-production-lot>
            <em-demo-a-person-sampling tab-index="{{tabIndex}}" name="em-demo-a-person-sampling"></em-demo-a-person-sampling>
            <em-demo-a-person-plate-reading tab-index="{{tabIndex}}" name="em-demo-a-person-plate-reading"></em-demo-a-person-plate-reading>
            <em-demo-a-person-microorganism tab-index="{{tabIndex}}" name="em-demo-a-person-microorganism"></em-demo-a-person-microorganism>
            <em-demo-a-sample-browser tab-index="{{tabIndex}}" name="em-demo-a-sample-browser"></em-demo-a-sample-browser>
            <em-demo-a-browser tab-index="{{tabIndex}}" name="em-demo-a-browser"></em-demo-a-browser>

            <em-demo-b-home tab-index="{{tabIndex}}" name="em-demo-b-home"></em-demo-b-home>            


        </iron-pages>
        `;
    }
    saveDefaultTabsOnLogin(){
        var tabsString='';
        var i;
        for (i = 0; i < this.tabs.length; i++) { 
            tabsString=tabsString+'lp_frontend_page_name:'+this.tabs[i].lp_frontend_page_name+'*';
            tabsString=tabsString+'tabName:'+this.tabs[i].tabName+'*';
            tabsString=tabsString+'tabLabel_en:'+this.tabs[i].tabLabel_en+'*';
            tabsString=tabsString+'tabLabel_es:'+this.tabs[i].tabLabel_es+'*';
            if (this.tabs[i].procedure.name!=undefined){
                tabsString=tabsString+'procedure:'+this.tabs[i].procedure.name+'*';
                tabsString=tabsString+'tabType:'+'tab'+'*';
            }else{
                tabsString=tabsString+'procedure:'+this.tabs[i].procedure+'*';
                tabsString=tabsString+'tabType:'+'systab'+'*';
            }
            tabsString=tabsString+'tabEsignRequired:'+this.tabs[i].tabEsignRequired+'*';
            tabsString=tabsString+'tabConfirmUserRequired:'+this.tabs[i].tabConfirmUserRequired;
            if (i+1<this.tabs.length){tabsString=tabsString+'|'}
        }
        console.log('saveOpenTabs', tabsString);        

        var selectedRow=[];
        selectedRow.tabsString=tabsString;
        
        this.$.appelement.appActionTrigger(saveOpenTabsForm[0].name, selectedRow, saveOpenTabsForm[0]);
    }
    stateChanged(state) {
        this.selectedLanguage=state.app.user.appLanguage;
        this.tabs = state.tabs.tabs;
        this.currentTab = state.tabs.currentTab;
        this.tabIndex = state.tabs.tabIndex;
        this.currTabEsignRequired = state.tabs.currTabEsignRequired;
        this.currTabConfirmUserRequired = state.tabs.currTabConfirmUserRequired;
    } 

    tabSelected(e){
        return;
        var meIndex = e.currentTarget.tabIndex;
        var curTab = [];
        curTab.tabName = e.currentTarget.name;
        if (this.tabs.length==0){
            curTab.tabName='';
            curTab.sop_list = "";
            curTab.currTabEsignRequired=false;
            curTab.currTabConfirmUserRequired=false;
            store.dispatch(setCurrentTab(curTab));  
        }else{
            return;
            curTab.tabName=this.tabs[meIndex];
            if (this.tabs[meIndex].tabEsignRequired=undefined){
                curTab.currTabEsignRequired=false;
            }else{
                curTab.currTabEsignRequired=this.tabs[meIndex].tabEsignRequired;
            }
            if (this.tabs[meIndex].tabEsignRequired=undefined){
                curTab.currTabConfirmUserRequired=false;
            }else{
                curTab.currTabConfirmUserRequired=this.tabs[meIndex].tabConfirmUserRequired;
            }
            curTab.sop_list = this.tabs[meIndex].procedure.sop_list;
            store.dispatch(setCurrentTab(curTab));  
        }
    }    
    closeTab(e){
        store.dispatch(closeTab(e.currentTarget.iconTabName, e.currentTarget.iconTabIndex));        
    }
}
customElements.define('app-center-tabs', AppCenterTabs);