import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../../store.js';

import '@polymer/paper-dialog/paper-dialog';
import '../../../internalComponents/dialogs/simple-modal-dialog.js';
import '../../../internalComponents/dialogs/esign-dialog.js';
import '../../../internalComponents/dialogs/confirmuser-dialog.js';

import {AuthenticationApi} from '../../../app/mixin/authentication-api.js';
import {ApiSample} from './api-sample';
//import '../../internalComponents/dialogs/simple-modal-dialog.js';

import {FrontendSample} from './frontend-sample.js';
import {openEsignDialog} from '../../../app/Redux/actions/esign-actions.js';
import {openConfirmUserDialog} from '../../../app/Redux/actions/confirmuser-actions.js';
import {appConfirmUserOrEsign_notCorrectMessage} from '../../../../config/app-config';
import {schema_name,
    sampleCustodian_cocUsersListFieldToRetrieve, sampleCustodian_cocUsersListFieldToDisplay, sampleCustodian_cocUsersListFieldToSort,
    sampleCustodian_cocSampleHistoryFieldToRetrieve, sampleCustodian_cocSampleHistoryFieldToDisplay, sampleCustodian_cocSampleHistoryFieldToSort,
    sampleResults_analysisListFieldsToRetrieve, sampleResults_analysisListToDisplay,
    sampleResults_sampleAnalysisListToDisplay, sampleResults_sampleAnalysisListFieldsToRetrieve,
    sampleResults_sampleAnalysisResultEntryFieldsToRetrieve, sampleResults_sampleAnalysisResultEntryFieldsToDisplay, sampleResults_sampleAnalysisResultEntryFieldToSort
} from '../03config/config-process.js';    

class SampleElements extends ApiSample(AuthenticationApi(FrontendSample(connect(store)(PolymerElement)))) {
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
            validationNotCorrectMessage: {type: Object, value: appConfirmUserOrEsign_notCorrectMessage},
            selectedLanguage:{ type: String},                       
        }
    }
    static get template() {
        return html`
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
            <list-modal-coc-users list-header="{{cocUsersListFieldToDisplay}}" list-rows="{{cocUsersList}}" dialog-elements="{{fieldsDialogEnterResult}}" on-dialog-button-clicked="dialogClosedCoCUsersList"> </list-modal-coc-users>        
            <!-- <simple-modal-dialog dialog-elements="{{fieldsDialogSetSamplingDate}}" on-dialog-button-clicked="dialogClosedSetSamplingDate"> </simple-modal-dialog> -->
        </paper-dialog>        

        <paper-dialog id="addSampleAnalysis">
          <list-modal-addsampleanalysis list-header="{{analysisListToDisplay}}" 
              list-rows="{{analysisList}}" dialog-elements="{{fieldsDialogAddComment}}" 
              on-dialog-button-clicked="dialogClosedAddSampleAnalysis"> 
          </list-modal-addsampleanalysis>
        </paper-dialog>    

        <paper-dialog id="givenSampleAnalysisList">
            <list-modal-sampleanalysis list-header="{{givenSampleAnalysisToDisplay}}" list-rows="{{givenSampleAnalysisList}}" dialog-elements="{{fieldsDialogAddComment}}" 
            on-dialog-button-clicked="dialogClosedAddSampleAnalysis"> </list-modal-sampleanalysis>
        </paper-dialog>    
        
        <paper-dialog id="givenSampleEnterResult">
            <list-modal-enterresults final-token="[[finalToken]]" schema-prefix="[[schemaPrefix]]" 
            list-header="{{givenSampleAnalysisEnterResultToDisplay}}" list-rows="{{givenSampleAnalysisResultEntryList}}" 
            dialog-elements="{{fieldsDialogEnterResult}}" 
            on-dialog-button-clicked="dialogClosedEnterResult"> </list-modal-enterresults>
        </paper-dialog>    

        <paper-dialog id="chainOfCustodyStartChange">
            <list-modal-coc-users list-header="{{cocUsersListFieldToDisplay}}" list-rows="{{cocUsersList}}" dialog-elements="{{fieldsDialogEnterResult}}" on-dialog-button-clicked="dialogClosedCoCUsersList"> </list-modal-coc-users>        
        </paper-dialog>  

        <paper-dialog id="chainOfCustodyHistory">
            <list-modal-coc-samplehistory list-header="{{cocSampleHistoryFieldToDisplay}}" list-rows="{{cocSampleHistory}}" dialog-elements="{{fieldsDialogEnterResult}}" on-dialog-button-clicked="dialogClosedCoCSampleHistory"> </list-modal-coc-samplehistory>        
        </paper-dialog>  

        `;
    }
    
    stateChanged(state) {      
        this.selectedLanguage = state.app.user.appLanguage;       
        this.finalToken = state.app.user.finalToken; 
        if (state.processUs!=null){            
            this.forResultsSamples= state.processUs.forResultsSamples;
            this.analysisList=state.processUs.analysisList;            
            this.givenSampleAnalysisList=state.processUs.givenSampleAnalysisList;
            this.givenSampleAnalysisResultEntryList=state.processUs.givenSampleAnalysisResultEntryList;
            this.cocSampleHistory=state.processUs.cocSampleHistory;
            this.cocUsersList=state.processUs.cocUsersList;            
        }     
        this.currTabEsignRequired=state.tabs.currTabEsignRequired;
        this.currTabConfirmUserRequired=state.tabs.currTabConfirmUserRequired;        
    }

    actionTrigger(buttonName, backEndData, buttonDefinition){
        this.buttonName=buttonName;
        this.backEndData=backEndData;        
//    console.log('sample-elements >> actionTrigger >> backEndData', backEndData, 'this.backEndData', this.backEndData, 'buttonDefinition', buttonDefinition);  
        //if (this.currTabEsignRequired){
        if (buttonDefinition && buttonDefinition.esign_required){    
            store.dispatch(openEsignDialog(
            this.actionTriggerNext.bind(this),
            this.actionTriggerAbort.bind(this)
            ));  
            return;       
        }
        //if (this.currTabConfirmUserRequired){
        if (buttonDefinition && buttonDefinition.confirmuser_required){              
            store.dispatch(openConfirmUserDialog(
            this.actionTriggerNext.bind(this),
            this.actionTriggerAbort.bind(this)
            )); 
            return;
        }
        this.actionTriggerNext();
    }    
    actionTriggerAbort(){
        this.loading=false;  
    }
    actionTriggerNext(){
        var buttonName = this.buttonName;
        var backEndData = this.backEndData;        
        var datas = [];
            datas.schemaPrefix=this.schemaPrefix; this.backEndData.actionName=buttonName; 
            datas.finalToken=this.finalToken;
            datas.sample_id=+this.backEndData.selectedObject.sample_id; 
            datas.sampleId=+this.backEndData.selectedObject.sample_id;
        var actionName= buttonName.toUpperCase();
        console.log('sample-elements >> actionTriggerNext >> backEndData', backEndData, 'this.backEndData', this.backEndData, 'buttonName', buttonName);                    
        switch (buttonName.toUpperCase()) {
        case 'SAMPLINGCOMMENTADD':
            this.$.addComment.actionName='SAMPLINGCOMMENTADD';
            this.$.addComment.open();
            break;
        case 'SETSAMPLINGDATE':
            this.$.setSamplingDate.open();
            break;  
        case 'SAMPLINGCOMMENTREMOVE':
        case 'INCUBATIONSTART':
        case 'INCUBATIONEND':            
            this.backEndData=backEndData;
            this.sampleActionTrigger(this.schemaPrefix, this.finalToken, buttonName, datas, datas.tabInfo, undefined);
            break;  
        case 'ADDSAMPLEANALYSIS':
            import('../04-procedure/dialogs/list-modal-addsampleanalysis.js');
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
            import('../04-procedure/dialogs/list-modal-coc-users.js');
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
            import('../04-procedure/dialogs/list-modal-coc-samplehistory.js');
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
            this.sampleActionTrigger(this.schemaPrefix, this.finalToken, buttonName, datas, datas.tabInfo, undefined);
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
            import('../04-procedure/dialogs/list-modal-sampleanalysis.js');
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
            import('../04-procedure/dialogs/list-modal-enterresults.js');
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
            console.log('sample-elements > TestAssignment');
            import('../04-procedure/dialogs/list-modal-coc-users.js');
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
        default:
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
        this.sampleActionTrigger(this.schemaPrefix, this.finalToken, buttonName, datas, datas.tabInfo, undefined);
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
                    this.sampleActionTrigger(this.schemaPrefix, this.finalToken, buttonName, datas, datas.tabInfo, undefined);
                case 'COC_CONFIRMCHANGE':
                    //var actionName='COC_ABORTCHANGE';
                    datas.schemaPrefix=this.schemaPrefix; this.backEndData.actionName=buttonName;//actionName; //datas.paramsUrl=paramsUrl;
                      datas.confirmChangeComment=this.fieldsDialogAddComment[0].value;
                    this.sampleActionTrigger(this.schemaPrefix, this.finalToken, buttonName, datas, datas.tabInfo, undefined);
                    break;                  
                case 'COC_ABORTCHANGE':
                    //var actionName='COC_ABORTCHANGE';
                    datas.schemaPrefix=this.schemaPrefix; this.backEndData.actionName=buttonName;//actionName; //datas.paramsUrl=paramsUrl;
                      datas.cancelChangeComment=this.fieldsDialogAddComment[0].value;
                    this.sampleActionTrigger(this.schemaPrefix, this.finalToken, buttonName, datas, datas.tabInfo, undefined);
                    break;                  
                default:
                    break;
            }    
        }
    }
    dialogClosedSetSamplingDate(e){
        console.log("dialogClosedSetSamplingDate", e.detail, this.fieldsDialogSetSamplingDate);
        if (e.detail.dialogState=='confirmed'){
            var actionName='CHANGESAMPLINGDATE';
            var datas = [];
            datas.schemaPrefix=this.schemaPrefix; this.backEndData.actionName=actionName; //datas.paramsUrl=paramsUrl;
            datas.sample_id=this.backEndData.selectedObject.sample_id;  
            datas.newDate=this.fieldsDialogSetSamplingDate[0].value;
            // datas.callBackFunction=this.refreshTable.bind(this);
            this.sampleActionTrigger(this.schemaPrefix, this.finalToken, actionName, datas, datas.tabInfo, undefined);
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
                this.sampleActionTrigger(this.schemaPrefix, this.finalToken, actionName, datas, datas.tabInfo, undefined);
            }            
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
            this.sampleActionTrigger(this.schemaPrefix, this.finalToken, actionName, datas, datas.tabInfo, undefined);
        }
    }     
}
customElements.define('sample-elements', SampleElements);