import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../store.js';

import '@polymer/paper-dialog/paper-dialog';
import '../../internalComponents/dialogs/simple-modal-dialog.js';
import '../../internalComponents/dialogs/esign-dialog.js';
import '../../internalComponents/dialogs/confirmuser-dialog.js';
import {ApiIncidents} from './api-incidents';
import {AuthenticationApi} from '../../app/mixin/authentication-api.js';

//import '../../internalComponents/dialogs/simple-modal-dialog.js';

import {openEsignDialog} from '../../app/Redux/actions/esign-actions.js';
import {openConfirmUserDialog} from '../../app/Redux/actions/confirmuser-actions.js';
import {appConfirmUserOrEsign_notCorrectMessage} from '../../../config/app-config';


// import {schema_name, sampleIncubation_incubBatch_incubatorsFieldToDisplay,
//     sampleCustodian_cocUsersListFieldToRetrieve, sampleCustodian_cocUsersListFieldToDisplay, sampleCustodian_cocUsersListFieldToSort,
//     sampleCustodian_cocSampleHistoryFieldToRetrieve, sampleCustodian_cocSampleHistoryFieldToDisplay, sampleCustodian_cocSampleHistoryFieldToSort,
//     sampleResults_analysisListFieldsToRetrieve, sampleResults_analysisListToDisplay,
//     sampleResults_sampleAnalysisListToDisplay, sampleResults_sampleAnalysisListFieldsToRetrieve,
//     sampleResults_sampleAnalysisResultEntryFieldsToRetrieve, sampleResults_sampleAnalysisResultEntryFieldsToDisplay, sampleResults_sampleAnalysisResultEntryFieldToSort,
//     sampleIncubation_incubBatch_newBatchFormFields
// } from '../03config/config-process.js';    

class FrontendIncidentsElements extends ApiIncidents(AuthenticationApi(connect(store)(PolymerElement))) {
    static get properties() {
        return {            
            callBackFunctionIncidentElem: Object,
            finalToken: String,
            backEndData: Object,
            actionName: String,
            buttonName: String,
            analysisListToDisplay: String, 
            givenSampleAnalysisToDisplay: {type: String},//, value: sampleResults_sampleAnalysisListToDisplay},
            givenSampleAnalysisEnterResultToDisplay:String,
            cocUsersListFieldToDisplay: String,
            cocSampleHistoryFieldToDisplay: String,            
            currTabConfirmUserRequired: Boolean, 
            currTabEsignRequired: Boolean,
            confirmIncidentFormFields:{type: Array, notify: true, bubble: true, value: [
                {
                    "name": "Comment",
                    "label_en": "Add Comment", "label_es": "Añade comentario",
                    "type": "text-area",
                    "password": "false",
                    "read_only": false,
                    "value": ''
                }
            ]
            },
            selectedIncident:{type: Object},        
            incidentDialogFormFields:{type: Array},//, value:sampleIncubation_incubBatch_newBatchFormFields},    
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

        <paper-dialog id="incidentActionBrowser">
            <simple-modal-dialog style="width:410px;" dialog adhoc-form-fields="{{incidentDialogFormFields}}" list-header="" list-rows="" 
            on-dialog-button-clicked="dialogClosedincidentActionBrowser" action-name="{{actionName}}"> </simple-modal-dialog>
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
            if (state.emDemoA.selectedIncident!=null){
                this.selectedIncident=state.emDemoA.selectedIncident;}                      
        }     
        this.currTabEsignRequired=state.tabs.currTabEsignRequired;
        this.currTabConfirmUserRequired=state.tabs.currTabConfirmUserRequired;        
    }

    actionTrigger(buttonName, backEndData, buttonDefinition){
        this.buttonName=buttonName;
        this.backEndData=backEndData;        
    //console.log('frontend-incidents-elements >> actionTrigger >> backEndData', backEndData, 'this.backEndData', this.backEndData, 'buttonDefinition', buttonDefinition);  
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
        datas.finalToken=this.finalToken;
        if (this.backEndData.selectedObject!=null){
            if (this.backEndData.selectedObject.program_name!=null){
                datas.program_name=this.backEndData.selectedObject.program_name;}
            datas.id=this.backEndData.selectedObject.id
            datas.selectedObject=this.backEndData.selectedObject;
        }
        var actionName= buttonName.toUpperCase();
        this.actionName=actionName;
        datas.actionName=buttonName.toUpperCase();
        console.log('frontend-incidents-elements >> actionTriggerNext >> backEndData', backEndData, 'this.backEndData', this.backEndData, 'buttonName', buttonName);                    
        switch (buttonName.toUpperCase()) {
        case 'CORRECTIVE_ACTION_COMPLETE':            
            this.backEndData=backEndData;
            this.programActionTriggerAPI(this.schemaPrefix, this.finalToken, buttonName, datas, datas.tabInfo, datas.callBackFunction);
            break;  
        case 'NEW_INCIDENT':
            var datas = [];
            datas.paramUrl='';
            datas.paramsUrl="actionName="+actionName;
            datas.paramsUrl=datas.paramsUrl+"&finalToken="+this.finalToken;
            datas.paramsUrl=datas.paramsUrl+"&incidentTitle="+backEndData.incidentTitle;
            datas.paramsUrl=datas.paramsUrl+"&incidentDetail="+backEndData.incidentDetail;
            this.incidentsEndPoint(datas);            
            console.log('NEW INCIDENT TRIGGERED!');
            return;
        case 'CONFIRM_INCIDENT':
        case 'ADD_NOTE_INCIDENT':
        case 'CLOSE_INCIDENT':
        case 'REOPEN_INCIDENT':            
            console.log(buttonName.toUpperCase()+' clicked');
            this.incidentDialogFormFields=this.confirmIncidentFormFields;
            import('../../internalComponents/dialogs/simple-modal-dialog.js');
            this.$.incidentActionBrowser.open();                    
            break;
        default:
            console.log('Action '+buttonName.toUpperCase()+" not recognized in frontend-incidents-elements >> actionTriggerNext");
            break;
        }
        return;            
    }    
    dialogClosedincidentActionBrowser(e){
        console.log("dialogClosedincidentActionBrowser triggered", e.detail, e.detail.value);
        if (e.detail.dialogState=='confirmed'){
            var datas = [];
            datas.paramUrl='';
            datas.paramsUrl="actionName="+e.target.actionName;
            datas.paramsUrl=datas.paramsUrl+"&finalToken="+this.finalToken;
            datas.paramsUrl=datas.paramsUrl+"&incidentId="+this.selectedIncident.id;
            datas.paramsUrl=datas.paramsUrl+"&note="+this.incidentDialogFormFields[0].value;    
            if (this.refreshWindow!=undefined){
                datas.callBackFunction=this.refreshWindow.bind(this);}
            if (this.callBackFunctionIncidentElem!=undefined){                
                datas.callBackFunction=this.callBackFunctionIncidentElem.bind(this);}            
            this.incidentsEndPoint(datas);      
        }
        this.$.incidentActionBrowser.close();  
        return;
    }  
}
customElements.define('frontend-incidents-elements', FrontendIncidentsElements);