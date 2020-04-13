import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../../store.js';

import '@polymer/paper-dialog/paper-dialog';
import '../../../internalComponents/dialogs/simple-modal-dialog.js';
import '../../../internalComponents/dialogs/esign-dialog.js';
import '../../../internalComponents/dialogs/confirmuser-dialog.js';

import {AuthenticationApi} from '../../../app/mixin/authentication-api.js';
import {EmDemoAapiEnvMonit} from './api-env-monit';
//import '../../internalComponents/dialogs/simple-modal-dialog.js';

import {FrontendEnvMonit} from './frontend-env-monit.js';
import {openEsignDialog} from '../../../app/Redux/actions/esign-actions.js';
import {openConfirmUserDialog} from '../../../app/Redux/actions/confirmuser-actions.js';
import {appConfirmUserOrEsign_notCorrectMessage} from '../../../../config/app-config';

import {schema_name, sampleIncubation_incubBatch_incubatorsFieldToDisplay,
    sampleCustodian_cocUsersListFieldToRetrieve, sampleCustodian_cocUsersListFieldToDisplay, sampleCustodian_cocUsersListFieldToSort,
    sampleCustodian_cocSampleHistoryFieldToRetrieve, sampleCustodian_cocSampleHistoryFieldToDisplay, sampleCustodian_cocSampleHistoryFieldToSort,
    sampleResults_analysisListFieldsToRetrieve, sampleResults_analysisListToDisplay,
    sampleResults_sampleAnalysisListToDisplay, sampleResults_sampleAnalysisListFieldsToRetrieve,
    sampleResults_sampleAnalysisResultEntryFieldsToRetrieve, sampleResults_sampleAnalysisResultEntryFieldsToDisplay, sampleResults_sampleAnalysisResultEntryFieldToSort,
    sampleIncubation_incubBatch_newBatchFormFields
} from '../03config/config-process.js';    

class EnvMonitElements extends EmDemoAapiEnvMonit(AuthenticationApi(FrontendEnvMonit(connect(store)(PolymerElement)))) {
    static get properties() {
        return {            
            callBackFunctionEnvMonitElem: Object,
            schemaPrefix: {type: String, value: schema_name}, 
            finalToken: String,
            backEndData: Object,
            actionName: String,
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
            incubatorsListFieldsToDisplay: {type: Object, value:sampleIncubation_incubBatch_incubatorsFieldToDisplay}, 
            selectedBatch:{type: Object},        
            newBatchFormFields:{type: Array, value:sampleIncubation_incubBatch_newBatchFormFields},  
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

                
        `;
    }
    
    stateChanged(state) {        
        this.selectedLanguage = state.app.user.appLanguage;  
        this.finalToken = state.app.user.finalToken; 
        if (state.emDemoA!=null){            
            this.forResultsSamples= state.emDemoA.forResultsSamples;
            this.analysisList=state.emDemoA.analysisList;            
            this.givenSampleAnalysisList=state.emDemoA.givenSampleAnalysisList;
            this.givenSampleAnalysisResultEntryList=state.emDemoA.givenSampleAnalysisResultEntryList;
            this.cocSampleHistory=state.emDemoA.cocSampleHistory;
            this.cocUsersList=state.emDemoA.cocUsersList;  
            this.activeIncubatorsList=state.emDemoA.allIncubators;
            if (state.emDemoA.selectedIncubator!=null){
                this.incubatorName=state.emDemoA.selectedIncubator.name;}
            if (state.emDemoA.selectedBatch!=null){
                this.selectedBatch=state.emDemoA.selectedBatch;}                      
        }     
        this.currTabEsignRequired=state.tabs.currTabEsignRequired;
        this.currTabConfirmUserRequired=state.tabs.currTabConfirmUserRequired;        
    }

    actionTrigger(buttonName, backEndData, buttonDefinition){
        this.buttonName=buttonName;
        this.backEndData=backEndData;        
//    console.log('env-monit-elements >> actionTrigger >> backEndData', backEndData, 'this.backEndData', this.backEndData, 'buttonDefinition', buttonDefinition);  
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
        var message=''; 
        switch(this.selectedLanguage){
            case 'es': message=this.validationNotCorrectMessage.message_es; break; //message=response.data.message_es; break;            
            default: message=this.validationNotCorrectMessage.message_en; break; //message=response.data.message_en; break;
        }     
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: message
        }));   
        this.loading=false;  
    }
    actionTriggerNext(){
        var buttonName = this.buttonName;
        var backEndData = this.backEndData;        
        var datas = [];
        datas.schemaPrefix=this.schemaPrefix; this.backEndData.actionName=buttonName; 
        datas.finalToken=this.finalToken;
        if (this.backEndData.selectedObject!=null){
            if (this.backEndData.selectedObject.program_name!=null){
                datas.program_name=this.backEndData.selectedObject.program_name;}
            datas.id=this.backEndData.selectedObject.id
            datas.selectedObject=this.backEndData.selectedObject;
        }
        var actionName= buttonName.toUpperCase();
        this.actionName=actionName;
        console.log('env-monit-elements >> actionTriggerNext >> backEndData', backEndData, 'this.backEndData', this.backEndData, 'buttonName', buttonName);                    
        switch (buttonName.toUpperCase()) {
        case 'CORRECTIVE_ACTION_COMPLETE':            
            this.backEndData=backEndData;
            this.programActionTriggerAPI(this.schemaPrefix, this.finalToken, buttonName, datas, datas.tabInfo, datas.callBackFunction);
            break;  
        // Lo dejo a modo de ejemplo para cuando una acción requiere abrir un dialogo emergente
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
        case 'INCUBATORSLIST':
            if (!this.selectedIncubator){
                dispatchEvent(new CustomEvent('toast-error', {
                    bubbles: true,
                    composed: true,
                    detail: 'Please select one batch first.'
                }));                  
                return;
            }
            import('../04-procedure/dialogs/em-demo-a-list-modal-batchassignincubator.js');
            this.getAllIncubators({finalToken:this.finalToken, schemaPrefix:this.schemaPrefix});       
            this.$.incubatorsList.open();
            break; 
        case 'EM_BATCH_INCUB_CREATE':
            console.log('EM_BATCH_INCUB_CREATE clicked');
            import('../04-procedure/dialogs/em-demo-a-list-modal-prodlotbrowser.js');
            this.$.batchBrowser.open();                    
            break;
        case 'EM_BATCH_ASSIGN_INCUB':
            import('../04-procedure/dialogs/em-demo-a-list-modal-batchassignincubator.js');
            this.getAllIncubators({finalToken:this.finalToken, schemaPrefix:this.schemaPrefix});       
            this.$.incubatorsList.open();    
            break;
        case 'EM_BATCH_INCUB_START':            
        case 'EM_BATCH_INCUB_END':  
            var paramsUrl='actionName='+actionName+'&finalToken='+this.finalToken+'&schemaPrefix='+this.schemaPrefix
            +'&batchName='+this.selectedBatch.name+'&batchtemplateId='+this.selectedBatch.incub_batch_config_id+'&batchtemplateVersion='+this.selectedBatch.incub_batch_config_version;
            datas.actionName=actionName; datas.paramsUrl=paramsUrl; datas.selectedBatch=this.selectedBatch;
            if (this.refreshWindow!=undefined){
                datas.callBackFunction=this.refreshWindow.bind(this);}
            this.batchActionTriggerAPI(this.schemaPrefix, this.finalToken, actionName, datas, datas.tabInfo, datas.callBackFunction);
            break;    
        case 'EM_NEW_PRODUCTION_LOT':
        case 'EM_ACTIVATE_PRODUCTION_LOT':
            import('../04-procedure/dialogs/em-demo-a-list-modal-prodlotbrowser.js');
            this.$.prodLotBrowser.open();                    
            //console.log(actionName + "recognized in env-monit-elements >> actionTriggerNext but not implemented yet");
            break;
        case 'EM_INCUBATION_ADD_TEMP_READING':
            import('../04-procedure/dialogs/em-demo-a-list-modal-prodlotbrowser.js');
            this.$.incubatorAddTempReading.open();                    
            //console.log(actionName + "recognized in env-monit-elements >> actionTriggerNext but not implemented yet");
            break;
        case 'EM_DEACTIVATE_PRODUCTION_LOT':
            var paramsUrl='actionName='+actionName+'&finalToken='+this.finalToken+'&schemaPrefix='+this.schemaPrefix
            +'&lotName='+datas.selectedObject.lot_name;
            datas.actionName=actionName; datas.paramsUrl=paramsUrl; datas.selectedProdLot=datas.selectedObject.lot_name;
            if (this.refreshWindow!=undefined){
                datas.callBackFunction=this.refreshWindow.bind(this);}
            this.prodLotActionTriggerAPI(this.schemaPrefix, this.finalToken, actionName, datas, datas.tabInfo, datas.callBackFunction);    
            //console.log(actionName + "recognized in env-monit-elements >> actionTriggerNext but not implemented yet");
            break;
        default:
            console.log('Action '+buttonName.toUpperCase()+" not recognized in env-monit-elements >> actionTriggerNext");
            break;
        }
        return;            
    }
    // Lo dejo a modo de ejemplo para cuando una acción requiere abrir un dialogo emergente
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
    dialogClosedBatchAssignIncubator(e){
        //console.log("dialogClosedBatchAssignIncubator triggered", e.detail, this.fieldsDialogSetSamplingDate);
        if (e.detail.dialogState=='confirmed'){
            var selectedItems = e.detail.selectedItems;
            var incubName = selectedItems[0].name;
            var actionName='EM_BATCH_ASSIGN_INCUB';
            var datas = [];              
            datas.selectedBatch=this.selectedBatch;
            datas.schemaPrefix=this.schemaPrefix; datas.actionName=actionName;// datas.paramsUrl=paramsUrl;   
            datas.incubName=incubName; datas.batchName=this.selectedBatch.name; //this.backEndData.selectedObject.sample_id; 
            if (this.callBackFunctionEnvMonitElem!=undefined){  
                datas.callBackFunction=this.callBackFunctionEnvMonitElem; //.bind(this); //this.refreshWindow.bind(this);
            }
            this.batchActionTriggerAPI(this.schemaPrefix, this.finalToken, actionName, datas, datas.tabInfo, datas.callBackFunction);
            //datas.selectedObject=this.backEndData.selectedObject;
            //this.sampleActionTrigger(actionName, datas, datas.tabInfo);                        
        }
        this.$.incubatorsList.close();
        return;
    }       
    dialogClosedBatchBrowser(e){
        console.log("dialogClosedBatchBrowser triggered", e.detail, e.detail.value);
        if (e.detail.dialogState=='confirmed'){
            var actionName=e.detail.actionName;
            var datas = [];              
            var selectedBatch = [];    
            selectedBatch.name=e.detail.value;          
            datas.selectedBatch=selectedBatch;
            datas.schemaPrefix=this.schemaPrefix; datas.actionName=e.detail.actionName;// datas.paramsUrl=paramsUrl;                
            if (this.refreshWindow!=undefined){
                datas.callBackFunction=this.refreshWindow.bind(this);}
            this.batchActionTriggerAPI(this.schemaPrefix, this.finalToken, actionName, datas, datas.tabInfo, datas.callBackFunction);
            //datas.selectedObject=this.backEndData.selectedObject;
            //this.sampleActionTrigger(actionName, datas, datas.tabInfo);                        
        }
        this.$.batchBrowser.close();
        return;
    }  
    dialogClosedProdLotBrowser(e){
        //console.log("dialogClosedProdLotBrowser triggered", e.detail, this.fieldsDialogSetSamplingDate);
        if (e.detail.dialogState=='confirmed'){
            var actionName=e.detail.actionName;
            var datas = [];              
            datas.selectedProdLot=e.detail.value;
            datas.schemaPrefix=this.schemaPrefix; datas.actionName=e.detail.actionName;// datas.paramsUrl=paramsUrl;  
            if (this.refreshWindow!=undefined){   
                datas.callBackFunction=this.refreshWindow.bind(this);}
            this.prodLotActionTriggerAPI(this.schemaPrefix, this.finalToken, actionName, datas, datas.tabInfo, datas.callBackFunction);
            //datas.selectedObject=this.backEndData.selectedObject;
            //this.sampleActionTrigger(actionName, datas, datas.tabInfo);                        
        }
        this.$.prodLotBrowser.close();
        return;
    }   
    dialogClosedIncubatorAddTempReading(e){
        console.log("dialogClosedIncubatorAddTempReading triggered", e.detail, this.fieldsDialogSetSamplingDate);
        if (e.detail.dialogState=='confirmed'){
            var actionName=e.detail.actionName;
            var datas = [];          

           // paramsUrl=paramsUrl+"&incubatorName="+selectedRow.selectedIncubator.name;    
            //paramsUrl=paramsUrl+"&temperature="+selectedRow.selectedIncubator.temperature;  

            datas.selectedProdLot=e.detail.value;
            datas.schemaPrefix=this.schemaPrefix; datas.actionName=e.detail.actionName;// datas.paramsUrl=paramsUrl;  
            if (this.callBackFunctionEnvMonitElem!=undefined){   
                datas.callBackFunction=this.callBackFunctionEnvMonitElem.bind(this);  }
            datas.temperature=e.detail.value;        
            datas.selectedIncubator=this.backEndData.selectedObject;
            this.incubationTriggerAPI(this.schemaPrefix, this.finalToken, actionName, datas, datas.tabInfo, datas.callBackFunction);
            //datas.selectedObject=this.backEndData.selectedObject;
            //this.sampleActionTrigger(actionName, datas, datas.tabInfo);                        
        }
        this.$.incubatorAddTempReading.close();
        return;
    }          

}
customElements.define('env-monit-elements', EnvMonitElements);