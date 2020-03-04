import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../../store.js';
import '@polymer/paper-tabs/paper-tabs';
import '@polymer/paper-tabs/paper-tab';
import '@polymer/iron-pages/iron-pages';
import {isTabOpn} from '../03config/config-process';

//import '../../internalComponents/pdf-browser-viewer';
import {schema_name, em_browser_tabs, browserMain_programSelection, browserHome_defaultTab
//    , sampleReception_sampleFieldToRetrieve, sampleReception_sampleFieldToDisplay
} from '../03config/config-process.js';

import {FrontendEnvMonit} from '../01moduleFunctionality/frontend-env-monit.js';

//import {setSelectedProgram} from '../02Redux/em-demo-a_actions.js';

import './browser-tabs/em-demo-a-br-sample.js';
import './browser-tabs/em-demo-a-br-incubator.js';
import './browser-tabs/em-demo-a-br-batch.js';

class emDemoABrowser extends FrontendEnvMonit(connect(store)(PolymerElement)) {
    stateChanged(state) {
        this.finalToken = state.app.user.finalToken;
        if (state.tabs.tabs!=null){
            this.appOpenTabs=state.tabs.tabs;
        }
        if (state.app.user.appProcedureList.procedures!=null){  
            this.procedure=state.app.user.appProcedureList.procedures[2];    
        }
        this.selectedLanguage=state.app.user.appLanguage;
    }        
    
    static get properties() {
        return {            
            schemaPrefix: {type:String, value:schema_name},
            thisTabName: {type:String, value:'em-demo-a-browser'},
            appOpenTabs: {type: String, observer:'onFinalTokenFilled'},
            finalToken: {type: String},  
            programsList: {
                type: Array,
                notify: true,
                bubble: true,
                value: browserMain_programSelection
            },                        
            programs: Object,
            tabs: {type:Object, value:em_browser_tabs}
            ,currentTab: []
            , currentSubTab: {type: String, value: browserHome_defaultTab}
             //currentTab: {type:Object, value:'home'},
            ,procedure: Array
            ,selectedLanguage: String            
        }
    }
    static get template() {
        return html`
        <style>
        div {            
            width: 80%;
            height: 80%;
        }
            .wrapper{
                display: flex;
            }
            .programsList {
                margin-top:0px; margin-left:0px;margin-bottom:0px;margin-right:0px;
                /* display: inline-block; */
                width: 500px;
                height: 100px;
                margin: 1em;
            }  
            .programTabs {
                margin-top:0px; margin-left:0px;margin-bottom:0px;margin-right:0px;
                /* display: inline-block; */
                top: 170px;
                width: 1200px;
                height: 300px;
                margin: 1em;
            } 
            paper-tab.tabItem {
                color: var(--paper-light-blue-50);
                background-color: var(--paper-light-blue-500);
            }                                              
        </style>
        <div class="wrapper">
            <vaadin-button on-click="refresh"><iron-icon icon="refresh"></iron-icon></vaadin-button> 

            <div id="program_definition" class="programTabs">        
                <paper-tabs selected="{{currentSubTab}}" attr-for-selected="name" noink scrollable>
                    <template is="dom-repeat" items="[[tabs]]" as="tab">                
                        <paper-tab class="tabItem"  esign-required="[[tab.esign_required]]" 
                            confirmuser-required="[[tab.confirmUser_required]]" 
                            on-click="tabSelected" name="[[tab.tabName]]" tab-name="[[tab.tabName]]"
                            tab-index="{{index}}">{{_labelValue(selectedLanguage, tab.tabLabel_en, tab.tabLabel_es)}} 
                        </paper-tab>                
                    </template>
                </paper-tabs>
                <iron-pages selected="[[currentSubTab]]" attr-for-selected="name">                
                    <em-demo-a-br-sample name="em-demo-a-br-sample"> </em-demo-a-br-sample>  
                    <em-demo-a-br-incubator name="em-demo-a-br-incubator"> </em-demo-a-br-incubator>  
                    <em-demo-a-br-batch name="em-demo-a-br-batch"> </em-demo-a-br-batch>  
                </iron-pages>
            </div> 
        </div> 
        `;
    }
    onFinalTokenFilled(){
    }  

    tabSelected(e){
        var meIndex = e.currentTarget.tabIndex;
        //console.log('tabSelected', 'selected tab', e); 
        //this.currentTab = 'home';
        var curTab = [];
        curTab.tabName = 'home'; //e.currentTarget.name;
        curTab.name = 'home';  //e.currentTarget.name;
        curTab.currTabEsignRequired=false; //this.tabs[meIndex].tabEsignRequired;
        curTab.currTabConfirmUserRequired=false; //this.tabs[meIndex].tabConfirmUserRequired;
        this.currentTab=curTab;
        return;        
    }
    _labelValue(langApp, lblEn, lblEs) {     
        if (langApp=="en") return lblEn;    
        if (langApp=="es") return lblEs;
        return lblEn;
    }  
}
customElements.define('em-demo-a-browser', emDemoABrowser);
