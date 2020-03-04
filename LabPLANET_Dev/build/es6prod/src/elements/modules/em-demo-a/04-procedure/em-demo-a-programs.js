define(["../../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../../node_modules/pwa-helpers/connect-mixin.js","../../../../store.js","../../../../../node_modules/@polymer/paper-tabs/paper-tabs.js","../../../../../node_modules/@polymer/paper-tabs/paper-tab.js","../../../../../node_modules/@polymer/iron-pages/iron-pages.js","../03config/config-process.js","../01moduleFunctionality/frontend-env-monit.js","../02Redux/em-demo-a_actions.js","./program-tabs/em-demo-a-prog-home.js","./program-tabs/em-demo-a-prog-configcalendar.js","./program-tabs/em-demo-a-prog-limits.js","./program-tabs/em-demo-a-prog-points.js","./program-tabs/em-demo-a-prog-points-map.js","./program-tabs/em-demo-a-prog-corrective-actions.js"],function(_polymerElement,_connectMixin,_store,_paperTabs,_paperTab,_ironPages,_configProcess,_frontendEnvMonit,_emDemoA_actions,_emDemoAProgHome,_emDemoAProgConfigcalendar,_emDemoAProgLimits,_emDemoAProgPoints,_emDemoAProgPointsMap,_emDemoAProgCorrectiveActions){"use strict";//import '../../internalComponents/pdf-browser-viewer';
class emDemoAPrograms extends(0,_frontendEnvMonit.FrontendEnvMonit)((0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement)){stateChanged(state){this.finalToken=state.app.user.finalToken;if(null!=state.tabs.tabs){this.appOpenTabs=state.tabs.tabs}if(null!=state.emDemoA){this.programs=state.emDemoA.programs;if(null!=this.programs){this.fillProgramsList()}}if(null!=state.app.user.appProcedureList.procedures){this.procedure=state.app.user.appProcedureList.procedures[2]}this.selectedLanguage=state.app.user.appLanguage}static get properties(){return{schemaPrefix:{type:String,value:_configProcess.schema_name},thisTabName:{type:String,value:"em-demo-a-programs"},appOpenTabs:{type:String,observer:"onFinalTokenFilled"},finalToken:{type:String},programsList:{type:Array,notify:!0,bubble:!0,value:_configProcess.programMain_programSelection},programs:Object,tabs:{type:Object,value:_configProcess.em_programs_tabs},currentTab:[],currentSubTab:{type:String,value:_configProcess.programHome_defaultTab//currentTab: {type:Object, value:'home'},
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

            <div id="programs" class="programsList"> 
                <template is="dom-repeat" index="{{index}}" items="{{programsList}}" as="currentfield">
                <field-controller on-field-list-value-changed="programSelected" 
                    name="{{currentfield.name}}" 
                    field="{{currentfield}}" value="{{selectedSampleTemplate}}"
                    style="width:100px;">
                </field-controller>
                </template>          
            </div>
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
                    <em-demo-a-prog-home name="home"> </em-demo-a-prog-home>  
                    <em-demo-a-prog-configcalendar name="em-demo-a-configcalendar"> </em-demo-a-prog-configcalendar>                  
                    <em-demo-a-prog-limits name="em-demo-a-limits"> </em-demo-a-prog-limits>                  
                    <em-demo-a-prog-points-map name="em-demo-a-sampling-points-map"> </em-demo-a-prog-points-map>
                    <em-demo-a-prog-points name="em-demo-a-sampling-points"> </em-demo-a-prog-points>
                    <em-demo-a-prog-corrective-actions name="em-demo-a-corrective-actions"> </em-demo-a-prog-corrective-actions>
                </iron-pages>
            </div>
        </div>
        `}onFinalTokenFilled(){//console.log('em-demo-a-programs', 'onFinalTokenFilled', 'isTabOpn=', this.thisTabName);
if((0,_configProcess.isTabOpn)(this.appOpenTabs,this.thisTabName)){this.getActivePrograms();//   var actionName='GET_ACTIVE_PRODUCTION_LOTS';
//   var paramsUrl='actionName='+actionName+'&finalToken='+this.finalToken+'&schemaPrefix='+this.schemaPrefix
//   +'&fieldToRetrieve='+this.microorganismListToDisplay;
//   datas.actionName=actionName;           
//   datas.paramsUrl=paramsUrl; 
this.getActiveProductionLotsList({finalToken:this.finalToken,schemaPrefix:this.schemaPrefix,actionName:"GET_ACTIVE_PRODUCTION_LOTS"})}}refresh(){this.getActivePrograms()}getActivePrograms(){this.getPrograms({finalToken:this.finalToken,schemaPrefix:this.schemaPrefix,actionName:"GET_PROGRAMS"})}programSelected(e){if("programsList"==e.detail.name){this.selectedSampleTemplateIndex=e.detail.index;// let sampleTemplatesFieldsLocal = this.sampleTemplates[e.detail.index].definition[0].fields;
// this.selectedSampleTemplate=e.detail.value;
// this.sampleTemplatesFields=sampleTemplatesFieldsLocal;
//console.log('programSelected:', this.programs[e.detail.index]);
_store.store.dispatch((0,_emDemoA_actions.setSelectedProgram)(this.programs[e.detail.index]));//console.log('em-demo-a-programas, programSelected', this.$.programSelected.value, 'e', e);
}}tabSelected(e){var meIndex=e.currentTarget.tabIndex,curTab=[];//console.log('tabSelected', 'selected tab', e); 
//this.currentTab = 'home';
curTab.tabName="home";//e.currentTarget.name;
curTab.name="home";//e.currentTarget.name;
curTab.currTabEsignRequired=!1;//this.tabs[meIndex].tabEsignRequired;
curTab.currTabConfirmUserRequired=!1;//this.tabs[meIndex].tabConfirmUserRequired;
this.currentTab=curTab;return}_labelValue(langApp,lblEn,lblEs){if("en"==langApp)return lblEn;if("es"==langApp)return lblEs;return lblEn}fillProgramsList(){// console.log('fillProgramsList', 'this.programsList.length', this.programsList.length, 'this.programs', this.programs
//     , 'this.programs.length', this.programs.length);
if(null==this.programs){return}//if (this.programsList[0].items.length+1==this.programs.length){return;}
var i;this.set("programsList.0.items",[]);for(i=0;i<this.programs.length;i++){//console.log(this.programs[i].name);
//   if (i == 0) {            
//     this.set('programsList.0.items.0.keyName', '');//this.programs[i].name); 
//     this.set('programsList.0.items.0.keyValue_en', '');//this.programs[i].description_en); 
//     this.set('programsList.0.items.0.keyValue_es', '');//this.programs[i].description_es); 
//     //console.log('after', this.sampleTemplatesList[0].items[0].keyName);
//   }else {
this.push("programsList.0.items",{keyName:this.programs[i].name,keyValue_es:this.programs[i].description_en,keyValue_en:this.programs[i].description_es});//   }
}}}customElements.define("em-demo-a-programs",emDemoAPrograms)});