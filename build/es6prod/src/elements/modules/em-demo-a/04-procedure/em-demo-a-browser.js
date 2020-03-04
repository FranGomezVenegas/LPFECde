define(["../../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../../node_modules/pwa-helpers/connect-mixin.js","../../../../store.js","../../../../../node_modules/@polymer/paper-tabs/paper-tabs.js","../../../../../node_modules/@polymer/paper-tabs/paper-tab.js","../../../../../node_modules/@polymer/iron-pages/iron-pages.js","../03config/config-process.js","../01moduleFunctionality/frontend-env-monit.js","./browser-tabs/em-demo-a-br-sample.js","./browser-tabs/em-demo-a-br-incubator.js","./browser-tabs/em-demo-a-br-batch.js"],function(_polymerElement,_connectMixin,_store,_paperTabs,_paperTab,_ironPages,_configProcess,_frontendEnvMonit,_emDemoABrSample,_emDemoABrIncubator,_emDemoABrBatch){"use strict";//import '../../internalComponents/pdf-browser-viewer';
//import {setSelectedProgram} from '../02Redux/em-demo-a_actions.js';
class emDemoABrowser extends(0,_frontendEnvMonit.FrontendEnvMonit)((0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement)){stateChanged(state){this.finalToken=state.app.user.finalToken;if(null!=state.tabs.tabs){this.appOpenTabs=state.tabs.tabs}if(null!=state.app.user.appProcedureList.procedures){this.procedure=state.app.user.appProcedureList.procedures[2]}this.selectedLanguage=state.app.user.appLanguage}static get properties(){return{schemaPrefix:{type:String,value:_configProcess.schema_name},thisTabName:{type:String,value:"em-demo-a-browser"},appOpenTabs:{type:String,observer:"onFinalTokenFilled"},finalToken:{type:String},programsList:{type:Array,notify:!0,bubble:!0,value:_configProcess.browserMain_programSelection},programs:Object,tabs:{type:Object,value:_configProcess.em_browser_tabs},currentTab:[],currentSubTab:{type:String,value:_configProcess.browserHome_defaultTab//currentTab: {type:Object, value:'home'},
},procedure:Array,selectedLanguage:String}}static get template(){return _polymerElement.html`
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
        `}onFinalTokenFilled(){}tabSelected(e){var meIndex=e.currentTarget.tabIndex,curTab=[];//console.log('tabSelected', 'selected tab', e); 
//this.currentTab = 'home';
curTab.tabName="home";//e.currentTarget.name;
curTab.name="home";//e.currentTarget.name;
curTab.currTabEsignRequired=!1;//this.tabs[meIndex].tabEsignRequired;
curTab.currTabConfirmUserRequired=!1;//this.tabs[meIndex].tabConfirmUserRequired;
this.currentTab=curTab;return}_labelValue(langApp,lblEn,lblEs){if("en"==langApp)return lblEn;if("es"==langApp)return lblEs;return lblEn}}customElements.define("em-demo-a-browser",emDemoABrowser)});