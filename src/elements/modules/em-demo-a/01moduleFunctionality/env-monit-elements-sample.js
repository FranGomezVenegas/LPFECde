import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../../store.js';

import '@polymer/paper-dialog/paper-dialog';
import '../04-procedure/dialogs/em-demo-a-simple-modal-dialog.js';
import '../../../internalComponents/dialogs/esign-dialog.js';
import '../../../internalComponents/dialogs/confirmuser-dialog.js';

import {AuthenticationApi} from '../../../app/mixin/authentication-api.js';
import {EmDemoAapiEnvMonit} from './api-env-monit';
//import '../../internalComponents/dialogs/em-demo-a-simple-modal-dialog.js';

import {FrontendEnvMonitSample} from './frontend-env-monit-sample.js';
import {openEsignDialog} from '../../../app/Redux/actions/esign-actions.js';
import {openConfirmUserDialog} from '../../../app/Redux/actions/confirmuser-actions.js';

import {schema_name,
    sampleCustodian_cocUsersListFieldToRetrieve, sampleCustodian_cocUsersListFieldToDisplay, sampleCustodian_cocUsersListFieldToSort,
    sampleCustodian_cocSampleHistoryFieldToRetrieve, sampleCustodian_cocSampleHistoryFieldToDisplay, sampleCustodian_cocSampleHistoryFieldToSort,
    sampleResults_analysisListFieldsToRetrieve, sampleResults_analysisListToDisplay,
    sampleResults_sampleAnalysisListToDisplay, sampleResults_sampleAnalysisListFieldsToRetrieve,
    sampleResults_sampleAnalysisResultEntryFieldsToRetrieve, sampleResults_sampleAnalysisResultEntryFieldsToDisplay, sampleResults_sampleAnalysisResultEntryFieldToSort
    ,microorganismList_fieldsToDisplay,
    sampleAudit_fieldsToRetrieve, sampleAudit_listToDisplay, sampleAudit_fieldToSort, sampleAudit_buttons
} from '../03config/config-process.js';    

class EnvMonitElementsSample extends EmDemoAapiEnvMonit(AuthenticationApi(FrontendEnvMonitSample(connect(store)(PolymerElement)))) {
    static get properties() {
        return {
            schemaPrefix: {type: String, value: schema_name}, 
            finalToken: String,
            backEndData: Object,
            buttonName: String,
            analysisListToDisplay: String, 
            givenSampleAnalysisToDisplay: {type: String, value: sampleResults_sampleAnalysisListToDisplay},
            givenSampleAnalysisEnterResultToDisplay:String,
            cocUsersListFieldToDisplay: String,
            cocSampleHistoryFieldToDisplay: String,            
            currTabConfirmUserRequired: Boolean, 
            currTabEsignRequired: Boolean,
            fieldsDialogAddComment:{type: Array, notify: true, bubble: true, value: [
                {
                    "name": "Comment",
                    "label_en": "Add Comment", "label_es": "Añade comentario",
                    "type": "text",
                    "password": "false",
                    "read_only": false,
                    "value": ''
                }
            ]
            },
            fieldsDialogSetSamplingDate:{type: Array,notify: true,bubble: true,
                value: [
                    {
                        "name": "SamplingDate",
                        "label_en": "Sampling Date", "label_es": "Fecha de Muestreo",
                        "type": "date",                    
                        "read_only": false,
                    }
                ]
            }, 
            microorganismListToDisplay:{type: Array, value:microorganismList_fieldsToDisplay},
            sampleAuditListToDisplay:{type: Array, value:sampleAudit_listToDisplay},
            sampleAuditFieldsToRetrieve:{type: String, value:sampleAudit_fieldsToRetrieve},
            sampleAuditButtons:{type: Array, value:sampleAudit_buttons},
            activeIncubatorsList:{type: Array},
            incubatorName:{type: String},
            selectedBatch:{type: Object},
            callBackFunctionEnvMonitElem: Object,
        }
    }
    static get template() {
        return html`
        <style>
        paper-dialog{
            top:100px; left:80px; height:0px; width:0px; z-index: 100;  position: fixed;  
            /* height: 100vh; */
            width: 100vw;
            -webkit-transition: opacity 0.3s ease-in;
        }
        </style>
        <esign-dialog></esign-dialog>
        <confirmuser-dialog></confirmuser-dialog>

        <paper-dialog id="addComment">
            <em-demo-a-simple-modal-dialog action-name="" dialog-elements="{{fieldsDialogAddComment}}" on-dialog-button-clicked="dialogClosedAddComment"> </em-demo-a-simple-modal-dialog>
        </paper-dialog>
        <paper-dialog id="changeSamplingDate">
            <em-demo-a-simple-modal-dialog dialog-elements="{{fieldsDialogSetSamplingDate}}" on-dialog-button-clicked="dialogClosedChangeSamplingDate"> </em-demo-a-simple-modal-dialog>
        </paper-dialog>
        <paper-dialog id="testAssignment">
            <em-demo-a-list-modal-coc-users list-header="{{cocUsersListFieldToDisplay}}" list-rows="{{cocUsersList}}" dialog-elements="{{fieldsDialogEnterResult}}" on-dialog-button-clicked="dialogClosedCoCUsersList"> </em-demo-a-list-modal-coc-users>        
            <!-- <em-demo-a-simple-modal-dialog dialog-elements="{{fieldsDialogSetSamplingDate}}" on-dialog-button-clicked="dialogClosedChangeSamplingDate"> </em-demo-a-simple-modal-dialog> -->
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

        <paper-dialog id="microorganismList">
          <em-demo-a-list-modal-microorganism list-header="{{microorganismListToDisplay}}" 
              list-rows="{{microorganismList}}" selected-object="[[backEndData.selectedObject]]" final-token="[[finalToken]]" 
              on-dialog-button-clicked="dialogClosedMicroorganismList"> 
          </em-demo-a-list-modal-microorganism>
        </paper-dialog>    

        <paper-dialog id="sampleAudit">
          <em-demo-a-list-modal-sample-audit list-header="{{sampleAuditListToDisplay}}" buttons="{{sampleAuditButtons}}" 
              list-rows="{{sampleAuditList}}" dialog-elements="{{fieldsDialogAddComment}}" 
              > 
          </em-demo-a-list-modal-sample-audit>
        </paper-dialog>  
                        
        `;
    }
    
    stateChanged(state) {        
        this.finalToken = state.app.user.finalToken; 
        if (state.emDemoA!=null){            
            this.forResultsSamples= state.emDemoA.forResultsSamples;
            this.analysisList=state.emDemoA.analysisList;            
            this.givenSampleAnalysisList=state.emDemoA.givenSampleAnalysisList;
            this.givenSampleAnalysisResultEntryList=state.emDemoA.givenSampleAnalysisResultEntryList;
            this.cocSampleHistory=state.emDemoA.cocSampleHistory;
            this.cocUsersList=state.emDemoA.cocUsersList;     
            this.microorganismList=state.emDemoA.microorganismList; 
            this.sampleAuditList=state.emDemoA.sampleAudit; 
            this.activeIncubatorsList=state.emDemoA.allIncubators;
            if (state.emDemoA.selectedIncubator!=null){
                this.incubatorName=state.emDemoA.selectedIncubator.name;}
            if (state.emDemoA.selectedBatch!=null){
                this.selectedBatch=state.emDemoA.selectedBatch;}
        }     
        this.currTabEsignRequired=state.tabs.currTabEsignRequired;
        this.currTabConfirmUserRequired=state.tabs.currTabConfirmUserRequired;        
    }

    sampleActionTrigger(buttonName, backEndData, buttonDefinition){
        this.buttonName=buttonName;
        this.backEndData=backEndData;        
    console.log('env-monit-elements-sample >> actionTrigger >> backEndData', backEndData, 'this.backEndData', this.backEndData, 'buttonDefinition', buttonDefinition);  
        //if (this.currTabEsignRequired){
        if (buttonDefinition && buttonDefinition.esign_required){    
            store.dispatch(openEsignDialog(
            this.sampleActionTriggerNext.bind(this),
            this.sampleActionTriggerAbort.bind(this)
            ));  
            return;       
        }
        //if (this.currTabConfirmUserRequired){
        if (buttonDefinition && buttonDefinition.confirmuser_required){              
            store.dispatch(openConfirmUserDialog(
            this.sampleActionTriggerNext.bind(this),
            this.sampleActionTriggerAbort.bind(this)
            )); 
            return;
        }
        this.sampleActionTriggerNext();
    }    
    sampleActionTriggerAbort(){
        this.dispatchEvent(new CustomEvent('toast-message', {
            bubbles: true,        composed: true,
            detail: 'Va a ser que por mis loginCancelar no continuas! :)'
        }));    
        this.loading=false;  
    }
    sampleActionTriggerNext(){
        var buttonName = this.buttonName;
        var backEndData = this.backEndData;        
        var datas = [];
            datas.schemaPrefix=this.schemaPrefix; this.backEndData.actionName=buttonName; 
            datas.finalToken=this.finalToken;
            datas.sample_id=+this.backEndData.selectedObject.sample_id; 
            datas.sampleId=+this.backEndData.selectedObject.sample_id;
        var actionName= buttonName.toUpperCase();
        //console.log('env-monit-elements-sample >> actionTriggerNext >> backEndData', backEndData, 'this.backEndData', this.backEndData, 'buttonName', buttonName);                    
        switch (buttonName.toUpperCase()) {
        case 'SAMPLINGCOMMENTADD':
            this.$.addComment.actionName='SAMPLINGCOMMENTADD';
            this.$.addComment.open();
            break;
        case 'CHANGESAMPLINGDATE':
            this.$.changeSamplingDate.open();
            break;  
        case 'ADDSAMPLETOBATCH':
            this.backEndData=backEndData;
            datas.callBackFunction=this.callBackFunctionEnvMonitElem;
            this.sampleActionTriggerAPI(this.schemaPrefix, this.finalToken, buttonName, datas, datas.tabInfo, this.callBackFunctionEnvMonitElem);    
            break;    
        case 'INCUBATIONSTART':
        case 'INCUBATIONEND':
        case 'INCUBATION2START':
        case 'INCUBATION2END':
            datas.incubatorName=this.incubatorName;
        case 'SETSAMPLINGDATE':
        case 'SAMPLINGCOMMENTREMOVE':
        case 'SAMPLESTAGE_MOVETONEXT':
        case 'SAMPLESTAGE_MOVETOPREVIOUS':                            
            this.backEndData=backEndData;
            this.sampleActionTriggerAPI(this.schemaPrefix, this.finalToken, buttonName, datas, datas.tabInfo, this.callBackFunctionEnvMonitElem);
            break;  
        case 'ADDSAMPLEANALYSIS':
            import('../04-procedure/dialogs/em-demo-a-list-modal-addsampleanalysis.js');
            this.analysisListToDisplay=sampleResults_analysisListToDisplay;
            var actionName='ANALYSIS_ALL_LIST';
            var paramsUrl='actionName='+actionName+'&finalToken='+this.finalToken+'&schemaPrefix='+this.schemaPrefix
            +'&fieldToRetrieve='+this.analysisListToDisplay;
            datas.actionName=actionName;           
            datas.fieldToRetrieve=sampleResults_analysisListFieldsToRetrieve; datas.paramsUrl=paramsUrl; 
            //datas.callBackFunction=this.openAddSampleAnalysisDialog.bind(this);
            this.getAnalysisList(datas);
            this.$.addSampleAnalysis.open();
            break; 
        case 'CHANGEOFCUSTODYSTARTCHANGE':
            import('../04-procedure/dialogs/em-demo-a-list-modal-coc-users.js');
            this.cocUsersListFieldToDisplay=sampleCustodian_cocUsersListFieldToDisplay;
            var actionName='CHANGEOFCUSTODY_USERS_LIST';
            var paramsUrl='actionName='+actionName+'&finalToken='+this.finalToken+'&schemaPrefix='+this.schemaPrefix
            +'&fieldToRetrieve='+this.cocUsersListFieldToDisplay;
            datas.actionName=actionName;        
            datas.fieldToRetrieve=sampleCustodian_cocUsersListFieldToRetrieve; datas.paramsUrl=paramsUrl;
            //datas.callBackFunction=this.openAddSampleAnalysisDialog.bind(this);
            this.getGivenCocUsersList(datas);
//console.log('ChangeOfCustodyHistory >> this.cocUsersList', this.cocUsersList, 'this.cocUsersListFieldToDisplay', this.cocUsersListFieldToDisplay);
            this.$.chainOfCustodyStartChange.open();
            break; 
        case 'CHANGEOFCUSTODYHISTORY':
            import('../04-procedure/dialogs/em-demo-a-list-modal-coc-samplehistory.js');
            var actionName='CHANGEOFCUSTODY_SAMPLE_HISTORY';
            var paramsUrl='actionName='+actionName+'&finalToken='+this.finalToken+'&schemaPrefix='+this.schemaPrefix
            +'&fieldToRetrieve='+this.analysisListToDisplay;
            datas.actionName=actionName;           
            datas.fieldToRetrieve=sampleCustodian_cocSampleHistoryFieldToRetrieve; datas.paramsUrl=paramsUrl;
            this.cocSampleHistoryFieldToDisplay=sampleCustodian_cocSampleHistoryFieldToDisplay;
            //datas.callBackFunction=this.openAddSampleAnalysisDialog.bind(this);
            this.givenCocSampleHistory(datas);
//console.log('ChangeOfCustodyHistory >> this.cocSampleHistory', this.cocSampleHistory, 'this.cocSampleHistoryFieldToDisplay', this.cocSampleHistoryFieldToDisplay);
            this.$.chainOfCustodyHistory.open();
            break; 
        case 'COC_CONFIRMCHANGE':                    
            this.$.addComment.actionName=buttonName;
            this.$.addComment.open();
            break; 
            this.backEndData=backEndData;
            this.sampleActionTriggerAPI(this.schemaPrefix, this.finalToken, buttonName, datas, datas.tabInfo, this.callBackFunctionEnvMonitElem);
            break;              
        case 'COC_ABORTCHANGE': 
            this.$.addComment.actionName=buttonName;
            this.$.addComment.open();
            break;                
        case 'ADDSAMPLEANALYSIS':
            this.analysisListToDisplay=sampleResults_analysisListToDisplay;
            var actionName='ANALYSIS_ALL_LIST';
            var paramsUrl='actionName='+actionName+'&finalToken='+this.finalToken+'&schemaPrefix='+this.schemaPrefix
            +'&fieldToRetrieve='+this.analysisListToDisplay;
            datas.actionName=actionName;           
            datas.fieldToRetrieve=sampleResults_analysisListFieldsToRetrieve; datas.paramsUrl=paramsUrl; 
            //datas.callBackFunction=this.openAddSampleAnalysisDialog.bind(this);
            this.getAnalysisList(datas);
            this.$.addSampleAnalysis.open();
            break;
        case 'GIVENSAMPLEANALYSISLIST':
            import('../04-procedure/dialogs/em-demo-a-list-modal-sampleanalysis.js');
            var actionName='GET_SAMPLE_ANALYSIS_LIST';
            this.givenSampleAnalysisToDisplay=sampleResults_sampleAnalysisListToDisplay;  
            console.log('givenSampleAnalysisToDisplay', this.givenSampleAnalysisToDisplay);       
            datas.actionName=actionName;
            datas.sampleAnalysisFieldToRetrieve=sampleResults_sampleAnalysisListFieldsToRetrieve; 
            datas.sortFieldsName=this.sampleResults_sampleAnalysisListFieldToSort;
            datas.paramsUrl=backEndData.paramsUrl;  
            //datas.callBackFunction=this.openAddSampleAnalysisDialog.bind(this);
            this.getGivenSampleAnalysisList(datas);
            this.$.givenSampleAnalysisList.open();
            break;
        case 'GIVENSAMPLEENTERRESULT':
            import('../04-procedure/dialogs/em-demo-a-list-modal-enterresults.js');
            var actionName='GET_SAMPLE_ANALYSIS_RESULT_LIST';
            datas.actionName=actionName;
            datas.resultFieldToRetrieve=sampleResults_sampleAnalysisResultEntryFieldsToRetrieve; 
            this.givenSampleAnalysisEnterResultToDisplay=sampleResults_sampleAnalysisResultEntryFieldsToDisplay;         
            datas.sortFieldsName=sampleResults_sampleAnalysisResultEntryFieldToSort;  
            datas.paramsUrl=backEndData.paramsUrl;  
            //datas.callBackFunction=this.openAddSampleAnalysisDialog.bind(this);
            this.getGivenSampleAnalysisResultEntry(datas);
            this.$.givenSampleEnterResult.open();
            break; 
        case 'TESTASSIGNMENT':
            console.log('env-monit-elements-sample > TestAssignment');
            import('../04-procedure/dialogs/em-demo-a-list-modal-coc-users.js');
            this.cocUsersListFieldToDisplay=sampleCustodian_cocUsersListFieldToDisplay;
            var actionName='TESTASSIGNMENT';
            var paramsUrl='actionName='+actionName+'&finalToken='+this.finalToken+'&schemaPrefix='+this.schemaPrefix
            +'&fieldToRetrieve='+this.cocUsersListFieldToDisplay;
            datas.actionName=actionName;        
            datas.fieldToRetrieve=sampleCustodian_cocUsersListFieldToRetrieve; datas.paramsUrl=paramsUrl;
            //datas.callBackFunction=this.openAddSampleAnalysisDialog.bind(this);
            this.getGivenCocUsersList(datas);
//console.log('ChangeOfCustodyHistory >> this.cocUsersList', this.cocUsersList, 'this.cocUsersListFieldToDisplay', this.cocUsersListFieldToDisplay);
            this.$.chainOfCustodyStartChange.open();
            break; 
        case 'ADDMICROORGANISM': 
            import('../04-procedure/dialogs/em-demo-a-list-modal-microorganism.js');
            this.microorganismListToDisplay=microorganismList_fieldsToDisplay;
            var actionName='GET_MICROORGANISM_LIST';
            var paramsUrl='actionName='+actionName+'&finalToken='+this.finalToken+'&schemaPrefix='+this.schemaPrefix
            +'&fieldToRetrieve='+this.microorganismListToDisplay;
            datas.actionName=actionName;           
            datas.fieldToRetrieve=this.microorganismListToDisplay; datas.paramsUrl=paramsUrl; 
            //datas.callBackFunction=this.openAddSampleAnalysisDialog.bind(this);
            this.getMicroorganismList(datas);            
            this.$.microorganismList.open();
            break; 
        case 'SAMPLE_AUDIT': 
            import('../04-procedure/dialogs/em-demo-a-list-modal-sample-audit.js');
            this.sampleAudit_fieldsToRetrieve=sampleAudit_fieldsToRetrieve;
            var actionName='GET_SAMPLE_AUDIT';
            var paramsUrl='actionName='+actionName+'&finalToken='+this.finalToken+'&schemaPrefix='+this.schemaPrefix
            +'&sampleAuditFieldToRetrieve='+this.sampleAudit_fieldsToRetrieve;
            datas.actionName=actionName;           
            datas.sampleAuditFieldToRetrieve=this.sampleAudit_fieldsToRetrieve; datas.paramsUrl=paramsUrl; 
            //datas.callBackFunction=this.openAddSampleAnalysisDialog.bind(this);
            this.getSampleAudit(datas);
            this.$.sampleAudit.open();
            break; 
        case 'EM_BATCH_INCUB_ADD_SMP': 
        case 'EM_BATCH_INCUB_REMOVE_SMP': 
            var paramsUrl='actionName='+actionName+'&finalToken='+this.finalToken+'&schemaPrefix='+this.schemaPrefix
            +'&batchName='+this.selectedBatch.name+'&batchtemplateId='+this.selectedBatch.incub_batch_config_id+'&batchtemplateVersion='+this.selectedBatch.incub_batch_config_version;
            datas.actionName=actionName; datas.paramsUrl=paramsUrl; datas.selectedBatch=this.selectedBatch;
            this.sampleActionTriggerAPI(this.schemaPrefix, this.finalToken, actionName, datas, datas.tabInfo, this.callBackFunctionEnvMonitElem);
            break;    
        default:
            console.log('Action '+buttonName+' is not declared in env-monit-elements.sample.js >> sampleActionTriggerNext');
            break;
        }
        return;            
    }
    dialogClosedCoCUsersList(e){
        var datas = [];
        var buttonName = "COC_STARTCHANGE"
        if (e.detail.dialogState!='confirmed'){return;}
        datas.schemaPrefix=this.schemaPrefix; this.backEndData.actionName=buttonName;//actionName; //datas.paramsUrl=paramsUrl;
        datas.sample_id=this.backEndData.selectedObject.sample_id;
        datas.user_name=e.detail.selectedItems[e.detail.selectedItems.length-1].user_name;
        datas.person_name=e.detail.selectedItems[e.detail.selectedItems.length-1].person_name;
        console.log('dialogClosedCoCUsersList', datas);
        this.sampleActionTriggerAPI(this.schemaPrefix, this.finalToken, buttonName, datas, datas.tabInfo, this.callBackFunctionEnvMonitElem);
        return;                  
    }
    dialogClosedAddComment(e){   
        //console.log('dialogClosedAddComment >> this.$.addComment.actionName', this.$.addComment.actionName);    
        var buttonName = this.$.addComment.actionName;

        if (e.detail.dialogState=='confirmed'){
            var datas = [];
            datas.schemaPrefix=this.schemaPrefix; datas.sample_id=this.backEndData.selectedObject.sample_id;
            switch (buttonName) {
                case 'SAMPLINGCOMMENTADD':            
                    //var actionName='SAMPLINGCOMMENTADD';
                    this.backEndData.actionName=buttonName;//actionName; //datas.paramsUrl=paramsUrl;
                    datas.sample_comment=this.fieldsDialogAddComment[0].value;
                    // datas.callBackFunction=this.refreshTable.bind(this);
                    this.sampleActionTriggerAPI(this.schemaPrefix, this.finalToken, buttonName, datas, datas.tabInfo, this.callBackFunctionEnvMonitElem);
                case 'COC_CONFIRMCHANGE':
                    //var actionName='COC_ABORTCHANGE';
                    datas.schemaPrefix=this.schemaPrefix; this.backEndData.actionName=buttonName;//actionName; //datas.paramsUrl=paramsUrl;
                      datas.confirmChangeComment=this.fieldsDialogAddComment[0].value;
                    this.sampleActionTriggerAPI(this.schemaPrefix, this.finalToken, buttonName, datas, datas.tabInfo, this.callBackFunctionEnvMonitElem);
                    break;                  
                case 'COC_ABORTCHANGE':
                    //var actionName='COC_ABORTCHANGE';
                    datas.schemaPrefix=this.schemaPrefix; this.backEndData.actionName=buttonName;//actionName; //datas.paramsUrl=paramsUrl;
                      datas.cancelChangeComment=this.fieldsDialogAddComment[0].value;
                    this.sampleActionTriggerAPI(this.schemaPrefix, this.finalToken, buttonName, datas, datas.tabInfo, this.callBackFunctionEnvMonitElem);
                    break;                  
                default:
                    break;
            }    
        }
    }
    dialogClosedChangeSamplingDate(e){
        console.log("dialogClosedChangeSamplingDate", e.detail, this.fieldsDialogSetSamplingDate);
        if (e.detail.dialogState=='confirmed'){
            var actionName='CHANGESAMPLINGDATE';
            var datas = [];
            datas.schemaPrefix=this.schemaPrefix; this.backEndData.actionName=actionName; //datas.paramsUrl=paramsUrl;
            datas.sample_id=this.backEndData.selectedObject.sample_id;  
            datas.newDate=this.fieldsDialogSetSamplingDate[0].value;
            // datas.callBackFunction=this.refreshTable.bind(this);
            this.sampleActionTriggerAPI(this.schemaPrefix, this.finalToken, actionName, datas, datas.tabInfo, this.callBackFunctionEnvMonitElem);
        }
    }    
    dialogClosedAddSampleAnalysis(e){
        if (e.detail.dialogState=='confirmed'){
            var analysisName="", methodName = ""; 
            var methodVersion=0;
            var i, len;            
            var selectedItems = e.detail.selectedItems;
            for (i = 0, len = selectedItems.length, analysisName='', methodName='', methodVersion=0; i < len; i++) { 
                analysisName = selectedItems[i].code+'*String';
                methodName = selectedItems[i].method_name+'*String';
                methodVersion = selectedItems[i].method_version+'*Integer';
                var actionName='SAMPLEANALYSISADD';
                var datas = [];                
                datas.schemaPrefix=this.schemaPrefix; datas.actionName=actionName;// datas.paramsUrl=paramsUrl;   
                datas.sample_id=this.backEndData.selectedObject.sample_id; 
                datas.fieldName='analysis|method_name|method_version';
                datas.fieldValue=analysisName+'|'+methodName+'|'+methodVersion;
//console.log('dialogClosedAddSampleAnalysis', actionName);                
                this.sampleActionTriggerAPI(this.schemaPrefix, this.finalToken, actionName, datas, datas.tabInfo, this.callBackFunctionEnvMonitElem);
                //datas.selectedObject=this.backEndData.selectedObject;
                //this.sampleActionTrigger(actionName, datas, datas.tabInfo);
            }            
        }
    } 
    dialogClosedMicroorganismList(e){
        return;
        if (e.detail.dialogState=='confirmed'){
            var microorganismName=""; 
            var i, len;            
            var selectedItems = e.detail.selectedItems;
            for (i = 0, len = selectedItems.length, microorganismName=''; i < len; i++) { 
                if (microorganismName.length>0){microorganismName=microorganismName+"|"}
                microorganismName = microorganismName+selectedItems[i].name;
            }
            console.log('selectedItems',e.detail.selectedItems,'microorganismName', microorganismName); 
                var actionName='ADD_SAMPLE_MICROORGANISM';
                var datas = [];                
                datas.schemaPrefix=this.schemaPrefix; datas.actionName=actionName;// datas.paramsUrl=paramsUrl;   
                datas.sample_id=this.backEndData.selectedObject.sample_id; 
                datas.microorganismName=microorganismName;
//console.log('dialogClosedAddSampleAnalysis', actionName);                
                this.sampleActionTriggerAPI(this.schemaPrefix, this.finalToken, actionName, datas, datas.tabInfo, this.callBackFunctionEnvMonitElem);
            //}            
        }
    } 

    dialogClosedTestAssignment(e){
        console.log("dialogClosedTestAssignment", e.detail, this.fieldsDialogTestAssignment);
        if (e.detail.dialogState=='confirmed'){
            var actionName='TESTASSIGNMENT';
            var datas = [];
            datas.schemaPrefix=this.schemaPrefix; this.backEndData.actionName=actionName; //datas.paramsUrl=paramsUrl;
            datas.sample_id=+this.backEndData.selectedObject.sample_id;  datas.sample_comment=this.fieldsDialogAddComment[0].value;
            // datas.callBackFunction=this.refreshTable.bind(this);
            this.sampleActionTriggerAPI(this.schemaPrefix, this.finalToken, actionName, datas, datas.tabInfo, this.callBackFunctionEnvMonitElem);
        }
    }  

}
customElements.define('env-monit-elements-sample', EnvMonitElementsSample);