define(["require","../../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../../node_modules/pwa-helpers/connect-mixin.js","../../../../store.js","../../../../../node_modules/@polymer/paper-dialog/paper-dialog.js","../../../internalComponents/dialogs/simple-modal-dialog.js","../../../internalComponents/dialogs/esign-dialog.js","../../../internalComponents/dialogs/confirmuser-dialog.js","../../../app/mixin/authentication-api.js","./api-env-monit.js","./frontend-env-monit.js","../../../app/Redux/actions/esign-actions.js","../../../app/Redux/actions/confirmuser-actions.js","../../../../config/app-config.js","../03config/config-process.js"],function(_require,_polymerElement,_connectMixin,_store,_paperDialog,_simpleModalDialog,_esignDialog,_confirmuserDialog,_authenticationApi,_apiEnvMonit,_frontendEnvMonit,_esignActions,_confirmuserActions,_appConfig,_configProcess){"use strict";_require=babelHelpers.interopRequireWildcard(_require);//import '../../internalComponents/dialogs/simple-modal-dialog.js';
class EnvMonitElements extends(0,_apiEnvMonit.EmDemoAapiEnvMonit)((0,_authenticationApi.AuthenticationApi)((0,_frontendEnvMonit.FrontendEnvMonit)((0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement)))){static get properties(){return{callBackFunctionEnvMonitElem:Object,schemaPrefix:{type:String,value:_configProcess.schema_name},finalToken:String,backEndData:Object,actionName:String,buttonName:String,analysisListToDisplay:String,givenSampleAnalysisToDisplay:{type:String,value:_configProcess.sampleResults_sampleAnalysisListToDisplay},givenSampleAnalysisEnterResultToDisplay:String,cocUsersListFieldToDisplay:String,cocSampleHistoryFieldToDisplay:String,currTabConfirmUserRequired:Boolean,currTabEsignRequired:Boolean,fieldsDialogAddComment:{type:Array,notify:!0,bubble:!0,value:[{name:"Comment",label_en:"Add Comment",label_es:"A\xF1ade comentario",type:"text",password:"false",read_only:!1,value:""}]},fieldsDialogSetSamplingDate:{type:Array,notify:!0,bubble:!0,value:[{name:"SamplingDate",label_en:"Sampling Date",label_es:"Fecha de Muestreo",type:"date",read_only:!1}]},incubatorsListFieldsToDisplay:{type:Object,value:_configProcess.sampleIncubation_incubBatch_incubatorsFieldToDisplay},selectedBatch:{type:Object},newBatchFormFields:{type:Array,value:_configProcess.sampleIncubation_incubBatch_newBatchFormFields},validationNotCorrectMessage:{type:Object,value:_appConfig.appConfirmUserOrEsign_notCorrectMessage},selectedLanguage:{type:String}}}static get template(){return _polymerElement.html`
        <style>
        paper-dialog{
            top:100px; height:0px; width:0px;
        }
        </style>
        <esign-dialog></esign-dialog>
        <confirmuser-dialog></confirmuser-dialog>

        <paper-dialog id="addComment">
            <simple-modal-dialog action-name="" dialog-elements="{{fieldsDialogAddComment}}" on-dialog-button-clicked="dialogClosedAddComment"> </simple-modal-dialog>
        </paper-dialog>
        <paper-dialog id="setSamplingDate">
            <simple-modal-dialog dialog-elements="{{fieldsDialogSetSamplingDate}}" on-dialog-button-clicked="dialogClosedSetSamplingDate"> </simple-modal-dialog>
        </paper-dialog>
        <paper-dialog id="testAssignment">
            <em-demo-a-list-modal-coc-users list-header="{{cocUsersListFieldToDisplay}}" list-rows="{{cocUsersList}}" dialog-elements="{{fieldsDialogEnterResult}}" on-dialog-button-clicked="dialogClosedCoCUsersList"> </em-demo-a-list-modal-coc-users>        
            <!-- <simple-modal-dialog dialog-elements="{{fieldsDialogSetSamplingDate}}" on-dialog-button-clicked="dialogClosedSetSamplingDate"> </simple-modal-dialog> -->
        </paper-dialog>        

        <paper-dialog id="addSampleAnalysis">
          <em-demo-a-list-modal-addsampleanalysis list-header="{{analysisListToDisplay}}" 
              list-rows="{{analysisList}}" dialog-elements="{{fieldsDialogAddComment}}" 
              on-dialog-button-clicked="dialogClosedAddSampleAnalysis"> 
          </em-demo-a-list-modal-addsampleanalysis>
        </paper-dialog>    

        <paper-dialog id="givenSampleAnalysisList">
            <em-demo-a-list-modal-sampleanalysis list-header="{{givenSampleAnalysisToDisplay}}" list-rows="{{givenSampleAnalysisList}}" dialog-elements="{{fieldsDialogAddComment}}" 
            on-dialog-button-clicked="dialogClosedAddSampleAnalysis"> </em-demo-a-list-modal-sampleanalysis>
        </paper-dialog>    
        
        <paper-dialog id="givenSampleEnterResult">
            <em-demo-a-list-modal-enterresults final-token="[[finalToken]]" schema-prefix="[[schemaPrefix]]" 
            list-header="{{givenSampleAnalysisEnterResultToDisplay}}" list-rows="{{givenSampleAnalysisResultEntryList}}" 
            dialog-elements="{{fieldsDialogEnterResult}}" 
            on-dialog-button-clicked="dialogClosedEnterResult"> </em-demo-a-list-modal-enterresults>
        </paper-dialog>    

        <paper-dialog id="chainOfCustodyStartChange">
            <em-demo-a-list-modal-coc-users list-header="{{cocUsersListFieldToDisplay}}" list-rows="{{cocUsersList}}" dialog-elements="{{fieldsDialogEnterResult}}" on-dialog-button-clicked="dialogClosedCoCUsersList"> </em-demo-a-list-modal-coc-users>        
        </paper-dialog>  

        <paper-dialog id="chainOfCustodyHistory">
            <em-demo-a-list-modal-coc-samplehistory list-header="{{cocSampleHistoryFieldToDisplay}}" list-rows="{{cocSampleHistory}}" dialog-elements="{{fieldsDialogEnterResult}}" on-dialog-button-clicked="dialogClosedCoCSampleHistory"> </em-demo-a-list-modal-coc-samplehistory>        
        </paper-dialog>  

        <paper-dialog id="incubatorsList">
            <em-demo-a-list-modal-batchassignincubator list-header="{{incubatorsListFieldsToDisplay}}" list-rows="{{activeIncubatorsList}}" dialog-elements="{{fieldsDialogAddComment}}" 
            on-dialog-button-clicked="dialogClosedBatchAssignIncubator"> </em-demo-a-list-modal-batchassignincubator>
        </paper-dialog>    

        <paper-dialog id="prodLotBrowser">
            <em-demo-a-list-modal-prodlotbrowser list-header="{{incubatorsListFieldsToDisplay}}" list-rows="{{activeIncubatorsList}}" dialog-elements="{{fieldsDialogAddComment}}" 
            on-dialog-button-clicked="dialogClosedProdLotBrowser" action-name="{{actionName}}"> </em-demo-a-list-modal-prodlotbrowser>
        </paper-dialog>    
        <paper-dialog id="batchBrowser">
            <em-demo-a-list-modal-prodlotbrowser adhoc-form-fields="{{newBatchFormFields}}" list-header="{{incubatorsListFieldsToDisplay}}" list-rows="{{activeIncubatorsList}}" 
            on-dialog-button-clicked="dialogClosedBatchBrowser" action-name="{{actionName}}"> </em-demo-a-list-modal-prodlotbrowser>
        </paper-dialog>   
        
        <paper-dialog id="incubatorAddTempReading">
            <em-demo-a-list-modal-prodlotbrowser list-header="{{incubatorsListFieldsToDisplay}}" list-rows="{{activeIncubatorsList}}" 
            on-dialog-button-clicked="dialogClosedIncubatorAddTempReading" action-name="{{actionName}}"> </em-demo-a-list-modal-prodlotbrowser>
        </paper-dialog>   

                
        `}stateChanged(state){this.selectedLanguage=state.app.user.appLanguage;this.finalToken=state.app.user.finalToken;if(null!=state.emDemoA){this.forResultsSamples=state.emDemoA.forResultsSamples;this.analysisList=state.emDemoA.analysisList;this.givenSampleAnalysisList=state.emDemoA.givenSampleAnalysisList;this.givenSampleAnalysisResultEntryList=state.emDemoA.givenSampleAnalysisResultEntryList;this.cocSampleHistory=state.emDemoA.cocSampleHistory;this.cocUsersList=state.emDemoA.cocUsersList;this.activeIncubatorsList=state.emDemoA.allIncubators;if(null!=state.emDemoA.selectedIncubator){this.incubatorName=state.emDemoA.selectedIncubator.name}if(null!=state.emDemoA.selectedBatch){this.selectedBatch=state.emDemoA.selectedBatch}}this.currTabEsignRequired=state.tabs.currTabEsignRequired;this.currTabConfirmUserRequired=state.tabs.currTabConfirmUserRequired}actionTrigger(buttonName,backEndData,buttonDefinition){this.buttonName=buttonName;this.backEndData=backEndData;//    console.log('env-monit-elements >> actionTrigger >> backEndData', backEndData, 'this.backEndData', this.backEndData, 'buttonDefinition', buttonDefinition);  
//if (this.currTabEsignRequired){
if(buttonDefinition&&buttonDefinition.esign_required){_store.store.dispatch((0,_esignActions.openEsignDialog)(this.actionTriggerNext.bind(this),this.actionTriggerAbort.bind(this)));return}//if (this.currTabConfirmUserRequired){
if(buttonDefinition&&buttonDefinition.confirmuser_required){_store.store.dispatch((0,_confirmuserActions.openConfirmUserDialog)(this.actionTriggerNext.bind(this),this.actionTriggerAbort.bind(this)));return}this.actionTriggerNext()}actionTriggerAbort(){this.loading=!1}actionTriggerNext(){var buttonName=this.buttonName,backEndData=this.backEndData,datas=[];datas.schemaPrefix=this.schemaPrefix;this.backEndData.actionName=buttonName;datas.finalToken=this.finalToken;if(null!=this.backEndData.selectedObject){if(null!=this.backEndData.selectedObject.program_name){datas.program_name=this.backEndData.selectedObject.program_name}datas.id=this.backEndData.selectedObject.id;datas.selectedObject=this.backEndData.selectedObject}var actionName=buttonName.toUpperCase();this.actionName=actionName;console.log("env-monit-elements >> actionTriggerNext >> backEndData",backEndData,"this.backEndData",this.backEndData,"buttonName",buttonName);switch(buttonName.toUpperCase()){case"CORRECTIVE_ACTION_COMPLETE":this.backEndData=backEndData;this.programActionTriggerAPI(this.schemaPrefix,this.finalToken,buttonName,datas,datas.tabInfo,datas.callBackFunction);break;// Lo dejo a modo de ejemplo para cuando una acción requiere abrir un dialogo emergente
// case 'ADDSAMPLEANALYSIS':
//     import('../04-procedure/dialogs/em-demo-a-list-modal-addsampleanalysis.js');
//     this.analysisListToDisplay=sampleResults_analysisListToDisplay;
//     var actionName='ANALYSIS_ALL_LIST';
//     var paramsUrl='actionName='+actionName+'&finalToken='+this.finalToken+'&schemaPrefix='+this.schemaPrefix
//     +'&fieldToRetrieve='+this.analysisListToDisplay;
//     datas.actionName=actionName;           
//     datas.fieldToRetrieve=sampleResults_analysisListFieldsToRetrieve; datas.paramsUrl=paramsUrl; 
//     //datas.callBackFunction=this.openAddSampleAnalysisDialog.bind(this);
//     this.getAnalysisList(datas);
//     this.$.addSampleAnalysis.open();
//     break; 
case"INCUBATORSLIST":if(!this.selectedIncubator){dispatchEvent(new CustomEvent("toast-error",{bubbles:!0,composed:!0,detail:"Please select one batch first."}));return}new Promise((res,rej)=>_require.default(["../04-procedure/dialogs/em-demo-a-list-modal-batchassignincubator.js"],res,rej));this.getAllIncubators({finalToken:this.finalToken,schemaPrefix:this.schemaPrefix});this.$.incubatorsList.open();break;case"EM_BATCH_INCUB_CREATE":console.log("EM_BATCH_INCUB_CREATE clicked");new Promise((res,rej)=>_require.default(["../04-procedure/dialogs/em-demo-a-list-modal-prodlotbrowser.js"],res,rej));this.$.batchBrowser.open();break;case"EM_BATCH_ASSIGN_INCUB":new Promise((res,rej)=>_require.default(["../04-procedure/dialogs/em-demo-a-list-modal-batchassignincubator.js"],res,rej));this.getAllIncubators({finalToken:this.finalToken,schemaPrefix:this.schemaPrefix});this.$.incubatorsList.open();break;case"EM_BATCH_INCUB_START":case"EM_BATCH_INCUB_END":var paramsUrl="actionName="+actionName+"&finalToken="+this.finalToken+"&schemaPrefix="+this.schemaPrefix+"&batchName="+this.selectedBatch.name+"&batchtemplateId="+this.selectedBatch.incub_batch_config_id+"&batchtemplateVersion="+this.selectedBatch.incub_batch_config_version;datas.actionName=actionName;datas.paramsUrl=paramsUrl;datas.selectedBatch=this.selectedBatch;if(this.refreshWindow!=void 0){datas.callBackFunction=this.refreshWindow.bind(this)}this.batchActionTriggerAPI(this.schemaPrefix,this.finalToken,actionName,datas,datas.tabInfo,datas.callBackFunction);break;case"EM_NEW_PRODUCTION_LOT":case"EM_ACTIVATE_PRODUCTION_LOT":new Promise((res,rej)=>_require.default(["../04-procedure/dialogs/em-demo-a-list-modal-prodlotbrowser.js"],res,rej));this.$.prodLotBrowser.open();//console.log(actionName + "recognized in env-monit-elements >> actionTriggerNext but not implemented yet");
break;case"EM_INCUBATION_ADD_TEMP_READING":new Promise((res,rej)=>_require.default(["../04-procedure/dialogs/em-demo-a-list-modal-prodlotbrowser.js"],res,rej));this.$.incubatorAddTempReading.open();//console.log(actionName + "recognized in env-monit-elements >> actionTriggerNext but not implemented yet");
break;case"EM_DEACTIVATE_PRODUCTION_LOT":var paramsUrl="actionName="+actionName+"&finalToken="+this.finalToken+"&schemaPrefix="+this.schemaPrefix+"&lotName="+datas.selectedObject.lot_name;datas.actionName=actionName;datas.paramsUrl=paramsUrl;datas.selectedProdLot=datas.selectedObject.lot_name;if(this.refreshWindow!=void 0){datas.callBackFunction=this.refreshWindow.bind(this)}this.prodLotActionTriggerAPI(this.schemaPrefix,this.finalToken,actionName,datas,datas.tabInfo,datas.callBackFunction);//console.log(actionName + "recognized in env-monit-elements >> actionTriggerNext but not implemented yet");
break;default:console.log("Action "+buttonName.toUpperCase()+" not recognized in env-monit-elements >> actionTriggerNext");break;}return}// Lo dejo a modo de ejemplo para cuando una acción requiere abrir un dialogo emergente
// dialogClosedAddSampleAnalysis(e){
//     if (e.detail.dialogState=='confirmed'){
//         var analysisName="", methodName = ""; 
//         var methodVersion=0;
//         var i, len;            
//         var selectedItems = e.detail.selectedItems;
//         for (i = 0, len = selectedItems.length, analysisName='', methodName='', methodVersion=0; i < len; i++) { 
//             analysisName = selectedItems[i].code+'*String';
//             methodName = selectedItems[i].method_name+'*String';
//             methodVersion = selectedItems[i].method_version+'*Integer';
//             var actionName='SAMPLEANALYSISADD';
//             var datas = [];                
//             datas.schemaPrefix=this.schemaPrefix; datas.actionName=actionName;// datas.paramsUrl=paramsUrl;   
//             datas.sample_id=this.backEndData.selectedObject.sample_id; 
//             datas.fieldName='analysis|method_name|method_version';
//             datas.fieldValue=analysisName+'|'+methodName+'|'+methodVersion;
//             this.sampleActionTriggerAPI(this.schemaPrefix, this.finalToken, actionName, datas, datas.tabInfo, undefined);
//         }            
//     }
// } 
dialogClosedBatchAssignIncubator(e){//console.log("dialogClosedBatchAssignIncubator triggered", e.detail, this.fieldsDialogSetSamplingDate);
if("confirmed"==e.detail.dialogState){var selectedItems=e.detail.selectedItems,incubName=selectedItems[0].name,actionName="EM_BATCH_ASSIGN_INCUB",datas=[];datas.selectedBatch=this.selectedBatch;datas.schemaPrefix=this.schemaPrefix;datas.actionName=actionName;// datas.paramsUrl=paramsUrl;   
datas.incubName=incubName;datas.batchName=this.selectedBatch.name;//this.backEndData.selectedObject.sample_id; 
if(this.callBackFunctionEnvMonitElem!=void 0){datas.callBackFunction=this.callBackFunctionEnvMonitElem;//.bind(this); //this.refreshWindow.bind(this);
}this.batchActionTriggerAPI(this.schemaPrefix,this.finalToken,actionName,datas,datas.tabInfo,datas.callBackFunction);//datas.selectedObject=this.backEndData.selectedObject;
//this.sampleActionTrigger(actionName, datas, datas.tabInfo);                        
}return}dialogClosedBatchBrowser(e){console.log("dialogClosedBatchBrowser triggered",e.detail,e.detail.value);if("confirmed"==e.detail.dialogState){var actionName=e.detail.actionName,datas=[],selectedBatch=[];selectedBatch.name=e.detail.value;datas.selectedBatch=selectedBatch;datas.schemaPrefix=this.schemaPrefix;datas.actionName=e.detail.actionName;// datas.paramsUrl=paramsUrl;                
if(this.refreshWindow!=void 0){datas.callBackFunction=this.refreshWindow.bind(this)}this.batchActionTriggerAPI(this.schemaPrefix,this.finalToken,actionName,datas,datas.tabInfo,datas.callBackFunction);//datas.selectedObject=this.backEndData.selectedObject;
//this.sampleActionTrigger(actionName, datas, datas.tabInfo);                        
}return}dialogClosedProdLotBrowser(e){//console.log("dialogClosedProdLotBrowser triggered", e.detail, this.fieldsDialogSetSamplingDate);
if("confirmed"==e.detail.dialogState){var actionName=e.detail.actionName,datas=[];datas.selectedProdLot=e.detail.value;datas.schemaPrefix=this.schemaPrefix;datas.actionName=e.detail.actionName;// datas.paramsUrl=paramsUrl;  
if(this.refreshWindow!=void 0){datas.callBackFunction=this.refreshWindow.bind(this)}this.prodLotActionTriggerAPI(this.schemaPrefix,this.finalToken,actionName,datas,datas.tabInfo,datas.callBackFunction);//datas.selectedObject=this.backEndData.selectedObject;
//this.sampleActionTrigger(actionName, datas, datas.tabInfo);                        
}return}dialogClosedIncubatorAddTempReading(e){console.log("dialogClosedIncubatorAddTempReading triggered",e.detail,this.fieldsDialogSetSamplingDate);if("confirmed"==e.detail.dialogState){var actionName=e.detail.actionName,datas=[];// paramsUrl=paramsUrl+"&incubatorName="+selectedRow.selectedIncubator.name;    
//paramsUrl=paramsUrl+"&temperature="+selectedRow.selectedIncubator.temperature;  
datas.selectedProdLot=e.detail.value;datas.schemaPrefix=this.schemaPrefix;datas.actionName=e.detail.actionName;// datas.paramsUrl=paramsUrl;  
if(this.callBackFunctionEnvMonitElem!=void 0){datas.callBackFunction=this.callBackFunctionEnvMonitElem.bind(this)}datas.temperature=e.detail.value;datas.selectedIncubator=this.backEndData.selectedObject;this.incubationTriggerAPI(this.schemaPrefix,this.finalToken,actionName,datas,datas.tabInfo,datas.callBackFunction);//datas.selectedObject=this.backEndData.selectedObject;
//this.sampleActionTrigger(actionName, datas, datas.tabInfo);                        
}return}}customElements.define("env-monit-elements",EnvMonitElements)});