import {
getAllProgramsUnreceivedSamples as allProgramsUnreceivedSamples_em_demo_a   
, getAllSamplesStageSampling as getAllSamplesStageSampling_em_demo_a   
, getAllSamplesStageIncubation1 as getAllSamplesStageIncubation1_em_demo_a   
, getAllSamplesStageIncubation2 as getAllSamplesStageIncubation2_em_demo_a   
, getAllSamplesStagePlateReading as getAllSamplesStagePlateReading_em_demo_a   
, getAllSamplesStageMicroorganism as getAllSamplesStageMicroorganism_em_demo_a   
, getMicroorganismList as getMicroorganismList_em_demo_a
, getBrowserSampleData as getBrowserSampleData_em_demo_a, getBrowserIncubatorData as getBrowserIncubatorData_em_demo_a, getBrowserBatchData as getBrowserBatchData_em_demo_a

, getSampleAudit as getSampleAudit_em_demo_a

, sampleTemplates as sampleTemplates_em_demo_a, unReceivedSamples as unReceivedSamples_em_demo_a
, forResultsSamples as forResultsSamples_em_demo_a, givenCocSampleHistory as givenCocSampleHistory_em_demo_a
, getGivenCocUsersList as getGivenCocUsersList_em_demo_a
, forResultsSamplesCustodian as forResultsSamplesCustodian_em_demo_a, forResultsSamplesCandidate as forResultsSamplesCandidate_em_demo_a
    , forRevisionSamples as forRevisionSamples_em_demo_a
, analysisAllList as analysisAllList_em_demo_a, givenSampleAnalysisList as givenSampleAnalysisList_em_demo_a
, getGivenSampleAnalysisResultEntry as getGivenSampleAnalysisResultEntry_em_demo_a

, getSampleStatsCounterByStage as getSampleStatsCounterByStage_em_demo_a
, getSampleStatsLastNresults as getSampleStatsLastNresults_em_demo_a

} from '../02Redux/em-demo-a_actions';

import {sample_templates} from '../03config/sample-templates';

import {backendUrl, frontEndEnvMonitSampleUrl} from '../../../../config/api-config'
import {store} from '../../../../store';
import {openEsignDialog} from '../../../app/Redux/actions/esign-actions.js';
import {openConfirmUserDialog} from '../../../app/Redux/actions/confirmuser-actions.js';
import {AuthenticationApi} from '../../../app/mixin/authentication-api.js';
/**
 * @mixinFunction
 * @polymer
 */
export const FrontendEnvMonitSample = (superClass) => class extends superClass {

getAllProgramsUnreceivedSamples(data) {
    var apiUrl=backendUrl+frontEndEnvMonitSampleUrl; 
//    console.log('getUnreceivedSamples', apiUrl, data.schemaPrefix);
    if (!data.finalToken){return;}
    if (!data.schemaPrefix){return;}
    axios.get(apiUrl, {        
        params: {
            'schemaPrefix':data.schemaPrefix, 'actionName':data.actionName, 
            'finalToken':data.finalToken, sampleFieldToRetrieve:data.sampleFieldToRetrieve
            ,whereFieldsName: data.whereFieldsName, whereFieldsValue: data.whereFieldsValue
            ,sortFieldsName:data.sortFieldsName
        }
    })
    .then( response => {
        if(response.status == 200) {
            //console.log('axios response', data.schemaPrefix, response.data);
            store.dispatch(allProgramsUnreceivedSamples_em_demo_a(response.data));
            if (data.callBackFunction){data.callBackFunction();}
            return;
        }
        if (data.callBackFunctionError){data.callBackFunctionError();}
        /*this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on '+apiUrl+' although the connectivity with the API ended with success! Status: '+response.status
            })); */        
        })
    .catch(function (error) {
        if (data.callBackFunctionError){data.callBackFunctionError();}
        console.log('axios error catch', 'error', error);
        /*console.log(error.message);
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on authentication'+error.message
            }));           */
        })
    .then(function () {
        });
}    
setAuditReviewed(e){
    if (e.detail.buttonDefinition && e.detail.buttonDefinition.esign_required){    
        store.dispatch(openEsignDialog(
        this.setAuditReviewedAPI.bind(this)        
        ));  
        return;       
    }
    //if (this.currTabConfirmUserRequired){
    if (e.detail.buttonDefinition && e.detail.buttonDefinition.confirmuser_required){              
        store.dispatch(openConfirmUserDialog(
        this.setAuditReviewedAPI.bind(this)        
        )); 
        return;
    }
    this.setAuditReviewedAPI();
}
setAuditReviewedAPI(e){
    console.log('frontend-env-monit-sample >> setAuditReviewedAPI >> e.detail = ', 'e.detail');      
    
    //if (e.detail.buttonName!="signSampleAudit"){return;}
    var actionName="SAMPLEAUDIT_SET_AUDIT_ID_REVIEWED";
    var row = [];   
    row.actionName=actionName;     
    row.schemaPrefix=this.schemaPrefix;
    row.audit_id=this.selectedObject.audit_id;
    row.sample_id=this.selectedObject.sample_id;
    row.finalToken=this.finalToken;
    var tabInfo={
        currTabEsignRequired: false, //e.detail.buttonDefinition.esign_required,
        currTabConfirmUserRequired: false}; //e.detail.buttonDefinition.confirmuser_required};    
    //this.$.myElements.actionTrigger(actionName, row, e.detail.buttonDefinition);      
    this.sampleActionTriggerAPI(this.schemaPrefix, this.finalToken, actionName, row, tabInfo, undefined);
    //this.sampleActionTriggerAPI(this.schemaPrefix, this.finalToken, actionName, row, tabInfo, null);      
}
addAdhocMicroorganism(e){   
    console.log('addAdhocMiocroorganism action not implemented yet', this.adhocFormFields);
    var actionName="ADD_SAMPLE_MICROORGANISM";
    var row = [];   
    row.actionName=actionName;     
    row.schemaPrefix=this.schemaPrefix;
    row.selectedObject=this.selectedObject;
    row.sample_id=this.selectedObject.sample_id;
    row.microorganismName=this.adhocFormFields[0].value;
    if (this.refreshWindow){
        row.callBackFunction=this.refreshWindow.bind(this); }    
    this.adhocFormFields[0].value='';
    row.finalToken=this.finalToken;
//console.log('row', row, 'this.selectedObject', this.selectedObject);
    //row.eSignToVerify="Mala";
    var tabInfo={
        currTabEsignRequired: e.detail.buttonDefinition.esign_required,
        currTabConfirmUserRequired: e.detail.buttonDefinition.confirmuser_required};
//console.log('em-demo-a-frontend-env-monit-sample >> sampleLogButtonClicked >> row = ', row);      
    //this.$.myElements.actionTrigger(actionName, row, e.detail.buttonDefinition);      
    this.sampleActionTriggerAPI(this.schemaPrefix, this.finalToken, actionName, row, tabInfo, this.callBackFunctionEnvMonitElem);    
}    
addMicroorganism(e){   
    console.log('addMicroorganism', 'e.detail', e.detail, 'this.$.mygridid.selectedItems', this.$.mygridid.selectedItems);
    var actionName="ADD_SAMPLE_MICROORGANISM";
    var row = [];   
    var microorganismName=""; 
    var i, len;            
    var selectedItems = this.$.mygridid.selectedItems;
    for (i = 0, len = selectedItems.length, microorganismName=''; i < len; i++) { 
        if (microorganismName.length>0){microorganismName=microorganismName+"|"}
        microorganismName = microorganismName+selectedItems[i].name;
    }
    if (this.refreshWindow){
        row.callBackFunction=this.refreshWindow.bind(this); }        
    row.actionName=actionName;     
    row.schemaPrefix=this.schemaPrefix;
    row.selectedObject=this.selectedObject;
    row.sample_id=this.selectedObject.sample_id;
    row.microorganismName=microorganismName;
    row.finalToken=this.finalToken;

console.log('row', row, 'this.selectedObject', this.selectedObject);
    //row.eSignToVerify="Mala";
    var tabInfo={
        currTabEsignRequired: e.detail.buttonDefinition.esign_required,
        currTabConfirmUserRequired: e.detail.buttonDefinition.confirmuser_required};
//console.log('em-demo-a-frontend-env-monit-sample >> sampleLogButtonClicked >> row = ', row);      
    //this.$.myElements.actionTrigger(actionName, row, e.detail.buttonDefinition);      
    this.sampleActionTriggerAPI(this.schemaPrefix, this.finalToken, actionName, row, tabInfo, this.callBackFunctionEnvMonitElem);    

}    


sampleLogButtonClicked(e){      
    if (e.detail.buttonName!="logSample"){
        // this.dispatchEvent(new CustomEvent('toast-error', {
        //     bubbles: true,
        //     composed: true,
        //     detail: 'For sample login, the button name should be logSample, this button name is '+e.detail.buttonName
        //     }));           
        return;
    }
    var locationName="";
    //console.log('sampleLogButtonClicked', e.detail.name, this.selectedSamplingPoint);
    var numSamplesToLog = 1; //this.sampleTemplatesList[1].value;
    if (numSamplesToLog==0){
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,
            composed: true,
            detail: 'Nothing to log when the number is set to '+numSamplesToLog
            }));                        
        return;            
    }
    var iField;
    var fieldsStringNames='';
    var fieldsStringValues='';
    var fieldType;        
    for (iField = 0; iField < this.selectedSamplingPoint.length; iField++) {
        if (String(this.selectedSamplingPoint[iField].value).length>0){
            if (this.selectedSamplingPoint[iField].name=="location_name"){
                locationName=this.selectedSamplingPoint[iField].value;}
            fieldType = this.selectedSamplingPoint[iField].dbType;
            if (!fieldType){fieldType = ">>>";} //this.selectedSamplingPoint[iField].type;}
            switch (fieldType) {
                case 'date':
                case 'Date':
                    if (fieldsStringValues.length>0) {
                        fieldsStringNames=fieldsStringNames+'|';
                        fieldsStringValues=fieldsStringValues+'|';
                    }
                    fieldsStringNames=fieldsStringNames+this.selectedSamplingPoint[iField].name;
                    fieldsStringValues=fieldsStringValues+this.selectedSamplingPoint[iField].value+'*Date';
                    break;
                case 'string':
                case 'text':
                case 'Text':
                case 'String':
                    if (fieldsStringValues.length>0) {
                        fieldsStringNames=fieldsStringNames+'|';
                        fieldsStringValues=fieldsStringValues+'|';
                    }
                    fieldsStringNames=fieldsStringNames+this.selectedSamplingPoint[iField].name;
                    fieldsStringValues=fieldsStringValues+this.selectedSamplingPoint[iField].value+'*String';
                    break;
                case 'Boolean':
                    if (fieldsStringValues.length>0) {
                        fieldsStringNames=fieldsStringNames+'|';
                        fieldsStringValues=fieldsStringValues+'|';}
                        fieldsStringNames=fieldsStringNames+this.selectedSamplingPoint[iField].name;
                        fieldsStringValues=fieldsStringValues+this.selectedSamplingPoint[iField].value+'*Boolean';
                    break;   
                case 'integer':
                case 'Integer':
                    if (fieldsStringValues.length>0) {
                        fieldsStringNames=fieldsStringNames+'|';
                        fieldsStringValues=fieldsStringValues+'|';}
                        fieldsStringNames=fieldsStringNames+this.selectedSamplingPoint[iField].name;
                        fieldsStringValues=fieldsStringValues+this.selectedSamplingPoint[iField].value+'*Integer';
                    break;                           
                case 'Button':
                    break;
                case '>>>':
                    break;
                default:
                    this.dispatchEvent(new CustomEvent('toast-error', {
                        bubbles: true,
                        composed: true,
                        detail: 'The field type '+fieldType+ ' is not implemented yet in onButonClicked then this field is discarded'
                        }));                        
                    break;
                }
        }
    }   
    var actionName="LOGSAMPLE";
    var row = [];   
    row.actionName=actionName;     
    row.schemaPrefix=this.schemaPrefix;
    row.programName=this.selectedProgram.name;
    row.sampleTemplate=this.selectedProgram.sample_config_code;//this.selectedSampleTemplate; 
    row.sampleTemplateVersion=this.selectedProgram.sample_config_code_version;
    row.finalToken=this.finalToken;
    row.locationName=locationName;
    row.fieldName=fieldsStringNames; row.fieldValue=fieldsStringValues; row.numSamplesToLog=1;
    //row.eSignToVerify="Mala";
    var tabInfo={
        currTabEsignRequired: e.detail.buttonDefinition.esign_required,
        currTabConfirmUserRequired: e.detail.buttonDefinition.confirmuser_required};
//console.log('em-demo-a-frontend-env-monit-sample >> sampleLogButtonClicked >> row = ', row);      
    //this.$.myElements.actionTrigger(actionName, row, e.detail.buttonDefinition);      
    this.sampleActionTriggerAPI(this.schemaPrefix, this.finalToken, actionName, row, tabInfo, undefined);
    //this.sampleActionTriggerAPI(this.schemaPrefix, this.finalToken, actionName, row, tabInfo, null);    
    this.$.pointCard.close();
}        


fieldButtonClicked(e) {
//    console.log('frontend-env-monit-sample >> fieldButtonClicked ', 
//        'e.detail.buttonName', e.detail.buttonName, 'this.selectedObject', this.selectedObject, 'e.detail.buttonDefinition', e.detail.buttonDefinition);
    if (this.selectedObject==null){
        this.dispatchEvent(new CustomEvent('toast-error', {bubbles: true, composed: true,
            detail: 'Please select one sample first '}));    
        return;
    }    
    var datas = [];
    datas.actionName=e.detail.buttonName;
    datas.selectedObject=this.selectedObject;
    if (this.refreshWindow){
        datas.callBackFunction=this.refreshWindow.bind(this); }
    var tabInfo={
        currTabEsignRequired: e.detail.buttonDefinition.esign_required,
        currTabConfirmUserRequired: e.detail.buttonDefinition.confirmuser_required};    
    this.$.myElementsSample.sampleActionTrigger(e.detail.buttonName, datas, e.detail.buttonDefinition);                     
}   
incubatorFieldButtonClicked(e) {
//    console.log('frontend-env-monit-sample >> fieldButtonClicked ', 
//        'e.detail.buttonName', e.detail.buttonName, 'this.selectedObject', this.selectedObject, 'e.detail.buttonDefinition', e.detail.buttonDefinition);
    if (this.selectedObject==null){
        this.dispatchEvent(new CustomEvent('toast-error', {bubbles: true, composed: true,
            detail: 'Please select one sample first '}));    
        return;
    }    
    var datas = [];
    datas.actionName=e.detail.buttonName;
    datas.selectedObject=this.selectedObject;
    if (this.refreshWindow){
        datas.callBackFunction=this.refreshWindow.bind(this); }
    var tabInfo={
        currTabEsignRequired: e.detail.buttonDefinition.esign_required,
        currTabConfirmUserRequired: e.detail.buttonDefinition.confirmuser_required};    
    this.$.myElements.actionTrigger(e.detail.buttonName, datas, e.detail.buttonDefinition);                     
}   

getSampleTemplates(data) {
    //console.log(sample_templates);
    store.dispatch(sampleTemplates_em_demo_a(sample_templates));
    if (data.callBackFunction){data.callBackFunction();}
    return;
    var apiUrl=backendUrl+frontEndEnvMonitSampleUrl; 
//    console.log('getSampleTemplates', apiUrl, data.schemaPrefix);
    if (!data.schemaPrefix){return;}
    if (!data.finalToken){return;}
    axios.get(apiUrl, {        
        params: {
            'schemaPrefix':data.schemaPrefix, 'actionName':data.actionName, 
            'finalToken':data.finalToken
        }
    })
    .then( response => {
        if(response.status == 200) {
//            console.log('frontend-sample >> getSampleTemplates', response.data);
            store.dispatch(sampleTemplates_em_demo_a(response.data));
            if (data.callBackFunction){data.callBackFunction();}
            return;
        }
        if (data.callBackFunctionError){data.callBackFunctionError();}
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on '+apiUrl+' although the connectivity with the API ended with success! Status: '+response.status
          }));         
        })
    .catch(function (error) {
        if (data.callBackFunctionError){data.callBackFunctionError();}
        console.log(error.message);
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on authentication'+error.message
          }));           
        })
    .then(function () {
        });
}
getUnreceivedSamples(data) {
    var apiUrl=backendUrl+frontEndEnvMonitSampleUrl; 
//    console.log('getUnreceivedSamples', apiUrl, data.schemaPrefix);
    if (!data.finalToken){return;}
    if (!data.schemaPrefix){return;}
    axios.get(apiUrl, {        
        params: {
            'schemaPrefix':data.schemaPrefix, 'actionName':data.actionName, 
            'finalToken':data.finalToken, sampleFieldToRetrieve:data.sampleFieldToRetrieve
            ,whereFieldsName: data.whereFieldsName, whereFieldsValue: data.whereFieldsValue
            ,sortFieldsName:data.sortFieldsName
        }
    })
    .then( response => {
        if(response.status == 200) {
//            console.log(data.schemaPrefix, response.data);
            switch(data.schemaPrefix){
                case 'process-us':
                    store.dispatch(unReceivedSamples_em_demo_a(response.data));
                    break;
                case 'process-eu':
                    store.dispatch(unReceivedSamples_process_eu(response.data));
                    break;
            }
            if (data.callBackFunction){data.callBackFunction();}
            return;
        }
        if (data.callBackFunctionError){data.callBackFunctionError();}
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on '+apiUrl+' although the connectivity with the API ended with success! Status: '+response.status
          }));         
        })
    .catch(function (error) {
        if (data.callBackFunctionError){data.callBackFunctionError();}
        console.log(error.message);
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on authentication'+error.message
          }));           
        })
    .then(function () {
        });
}
getSamplesForResults(data) {
    var apiUrl=backendUrl+frontEndEnvMonitSampleUrl; 
//    console.log('getSamplesInProgress', apiUrl, data);
    if (!data.finalToken){return;}
    if (!data.schemaPrefix){return;}
    axios.get(apiUrl, {        
        params: {
            'schemaPrefix':data.schemaPrefix, 'actionName':data.actionName, 
            'finalToken':data.finalToken, 'sampleFieldToRetrieve':data.sampleFieldToRetrieve,
            'whereFieldsName': data.samplesWhereFieldsName, 
            'whereFieldsValue': data.samplesWhereFieldsValue, 'sortFieldsName':data.samplesTabSortFields,
            'addSampleAnalysis': data.addSampleAnalysis, 'addSampleAnalysisFieldToRetrieve': data.addSampleAnalysisFieldToRetrieve,
            'addSampleAnalysisResult': data.addSampleAnalysisResult, 'addSampleAnalysisResultFieldToRetrieve': data.addSampleAnalysisResultFieldToRetrieve, 
        }
    })
    .then( response => {
        if(response.status == 200) {
//            console.log(response.data);
            store.dispatch(forResultsSamples_em_demo_a(response.data));
            if (data.callBackFunction){data.callBackFunction();}
            return;
        }
        if (data.callBackFunctionError){data.callBackFunctionError();}
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on '+apiUrl+' although the connectivity with the API ended with success! Status: '+response.status
          }));         
        })
    .catch(function (error) {
        if (data.callBackFunctionError){data.callBackFunctionError();}
        console.log(error.message);
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on authentication'+error.message
          }));           
        })
    .then(function () {
        });
}
getSamplesForResultsCustodian(data) {
    var apiUrl=backendUrl+frontEndEnvMonitSampleUrl; 
//    console.log('getSamplesInProgress', apiUrl, data);
    if (!data.finalToken){return;}
    if (!data.schemaPrefix){return;}
    axios.get(apiUrl, {        
        params: {
            'schemaPrefix':data.schemaPrefix, 'actionName':data.actionName, 
            'finalToken':data.finalToken, 'sampleFieldToRetrieve':data.sampleFieldToRetrieve,
            'whereFieldsName': data.samplesWhereFieldsName, 
            'whereFieldsValue': data.samplesWhereFieldsValue, 'sortFieldsName':data.samplesTabSortFields
        }
    })
    .then( response => {
        if(response.status == 200) {
//            console.log(response.data);
            store.dispatch(forResultsSamplesCustodian_em_demo_a(response.data));
            if (data.callBackFunction){data.callBackFunction();}
            return;
        }
        if (data.callBackFunctionError){data.callBackFunctionError();}
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on '+apiUrl+' although the connectivity with the API ended with success! Status: '+response.status
          }));         
        })
    .catch(function (error) {
        if (data.callBackFunctionError){data.callBackFunctionError();}
        console.log(error.message);
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on authentication'+error.message
          }));           
        })
    .then(function () {
        });
}
getSamplesForResultsCandidate(data) {
    var apiUrl=backendUrl+frontEndEnvMonitSampleUrl; 
//    console.log('getSamplesInProgress', apiUrl, data);
    if (!data.finalToken){return;}
    if (!data.schemaPrefix){return;}
    axios.get(apiUrl, {        
        params: {
            'schemaPrefix':data.schemaPrefix, 'actionName':data.actionName, 
            'finalToken':data.finalToken, 'sampleFieldToRetrieve':data.sampleFieldToRetrieve,
            'whereFieldsName': data.samplesWhereFieldsName, 
            'whereFieldsValue': data.samplesWhereFieldsValue, 'sortFieldsName':data.samplesTabSortFields
        }
    })
    .then( response => {
        if(response.status == 200) {
//            console.log(response.data);
            store.dispatch(forResultsSamplesCandidate_em_demo_a(response.data));
            if (data.callBackFunction){data.callBackFunction();}
            return;
        }
        if (data.callBackFunctionError){data.callBackFunctionError();}
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on '+apiUrl+' although the connectivity with the API ended with success! Status: '+response.status
          }));         
        })
    .catch(function (error) {
        if (data.callBackFunctionError){data.callBackFunctionError();}
        console.log(error.message);
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on authentication'+error.message
          }));           
        })
    .then(function () {
        });
}
givenCocSampleHistory(data) {
    var apiUrl=backendUrl+frontEndEnvMonitSampleUrl; 
//    console.log('getSamplesInProgress', apiUrl, data);
    if (!data.finalToken){return;}
    if (!data.schemaPrefix){return;}
    axios.get(apiUrl, {        
        params: {
            'schemaPrefix':data.schemaPrefix, 'actionName':data.actionName, 
            'finalToken':data.finalToken, 'sampleId':data.sample_id,
             'sampleFieldToRetrieve':data.sampleFieldToRetrieve,
            'whereFieldsName': data.samplesWhereFieldsName, 
            'whereFieldsValue': data.samplesWhereFieldsValue, 'sortFieldsName':data.samplesTabSortFields
        }
    })
    .then( response => {
        if(response.status == 200) {
//            console.log(response.data);
            store.dispatch(givenCocSampleHistory_em_demo_a(response.data));
            if (data.callBackFunction){data.callBackFunction();}
            return;
        }
        if (data.callBackFunctionError){data.callBackFunctionError();}
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on '+apiUrl+' although the connectivity with the API ended with success! Status: '+response.status
          }));         
        })
    .catch(function (error) {
        if (data.callBackFunctionError){data.callBackFunctionError();}
        console.log(error.message);
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on authentication'+error.message
          }));           
        })
    .then(function () {
        });
}
getGivenCocUsersList(data) {
    var apiUrl=backendUrl+frontEndEnvMonitSampleUrl; 
//    console.log('getSamplesInProgress', apiUrl, data);
    if (!data.finalToken){return;}
    if (!data.schemaPrefix){return;}
    axios.get(apiUrl, {        
        params: {
            'schemaPrefix':data.schemaPrefix, 'actionName':data.actionName, 
            'finalToken':data.finalToken, 'sampleId':data.sample_id,
             'sampleFieldToRetrieve':data.sampleFieldToRetrieve,
            'whereFieldsName': data.samplesWhereFieldsName, 
            'whereFieldsValue': data.samplesWhereFieldsValue, 'sortFieldsName':data.samplesTabSortFields
        }
    })
    .then( response => {
        if(response.status == 200) {
//            console.log(response.data);
            store.dispatch(getGivenCocUsersList_em_demo_a(response.data));
            if (data.callBackFunction){data.callBackFunction();}
            return;
        }
        if (data.callBackFunctionError){data.callBackFunctionError();}
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on '+apiUrl+' although the connectivity with the API ended with success! Status: '+response.status
          }));         
        })
    .catch(function (error) {
        if (data.callBackFunctionError){data.callBackFunctionError();}
        console.log(error.message);
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on authentication'+error.message
          }));           
        })
    .then(function () {
        });
}
getSamplesForRevision(data) {
    var apiUrl=backendUrl+frontEndEnvMonitSampleUrl; 
//    console.log('getSamplesInProgress', apiUrl, data);
    if (!data.finalToken){return;}
    if (!data.schemaPrefix){return;}
    axios.get(apiUrl, {        
        params: {
            'schemaPrefix':data.schemaPrefix, 'actionName':data.actionName, 
            'finalToken':data.finalToken, 'sampleFieldToRetrieve':data.sampleFieldToRetrieve,
            'whereFieldsName': data.samplesWhereFieldsName, 
            'whereFieldsValue': data.samplesWhereFieldsValue, 'sortFieldsName':data.samplesTabSortFields
        }
    })
    .then( response => {
        if(response.status == 200) {
//            console.log(response.data);
            store.dispatch(forRevisionSamples_em_demo_a(response.data));
            if (data.callBackFunction){data.callBackFunction();}
            return;
        }
        if (data.callBackFunctionError){data.callBackFunctionError();}
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on '+apiUrl+' although the connectivity with the API ended with success! Status: '+response.status
          }));         
        })
    .catch(function (error) {
        if (data.callBackFunctionError){data.callBackFunctionError();}
        console.log(error.message);
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on authentication'+error.message
          }));           
        })
    .then(function () {
        });
}
getAnalysisList(data) {
    var apiUrl=backendUrl+frontEndEnvMonitSampleUrl; 
    //console.log('getAnalysisList', apiUrl, data);
    if (!data.finalToken){return;}
    if (!data.schemaPrefix){return;}
    axios.get(apiUrl, {        
        params: {
            'schemaPrefix':data.schemaPrefix, 'actionName':data.actionName, 
            'finalToken':data.finalToken, 'sampleId':data.sampleId,
            'sampleAnalysisFieldToRetrieve': data.sampleAnalysisFieldToRetrieve
        }
    })
    .then( response => {
        if(response.status == 200) {
            //console.log(response.data);
            store.dispatch(analysisAllList_em_demo_a(response.data));
            if (data.callBackFunction){data.callBackFunction();}
            return;
        }
        if (data.callBackFunctionError){data.callBackFunctionError();}
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on '+apiUrl+' although the connectivity with the API ended with success! Status: '+response.status
          }));         
        })
    .catch(function (error) {
        if (data.callBackFunctionError){data.callBackFunctionError();}
        //console.log(error.message);
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on authentication'+error.message
          }));           
        })
    .then(function () {
        });
}
getGivenSampleAnalysisList(data) {
    var apiUrl=backendUrl+frontEndEnvMonitSampleUrl; 
//    console.log('getGivenSampleAnalysisList', apiUrl, data);
    if (!data.finalToken){return;}
    if (!data.schemaPrefix){return;}
    axios.get(apiUrl, {        
        params: {
            'schemaPrefix':data.schemaPrefix, 'actionName':data.actionName, 
            'finalToken':data.finalToken, 'sampleId':data.sampleId,
            'sampleAnalysisFieldToRetrieve': data.sampleAnalysisFieldToRetrieve
        }
    })
    .then( response => {
        if(response.status == 200) {
//            console.log(response.data);
            store.dispatch(givenSampleAnalysisList_em_demo_a(response.data));
            if (data.callBackFunction){data.callBackFunction();}
            return;
        }
        if (data.callBackFunctionError){data.callBackFunctionError();}
        // this.dispatchEvent(new CustomEvent('toast-error', {
        //     bubbles: true,        composed: true,
        //     detail: 'Error on '+apiUrl+' although the connectivity with the API ended with success! Status: '+response.status
        //   }));         
        })
    .catch(function (error) {
        if (data.callBackFunctionError){data.callBackFunctionError();}
        console.log(error.message);
        // this.dispatchEvent(new CustomEvent('toast-error', {
        //     bubbles: true,        composed: true,
        //     detail: 'Error on authentication'+error.message
        //   }));           
        })
    .then(function () {
        });
}
getGivenSampleAnalysisResultEntry(data) {
    var apiUrl=backendUrl+frontEndEnvMonitSampleUrl; 
//    console.log('getGivenSampleAnalysisResultEntry', apiUrl, data);
    if (!data.finalToken){return;}
    if (!data.schemaPrefix){return;}
    axios.get(apiUrl, {        
        params: {
            'schemaPrefix':data.schemaPrefix, 'finalToken':data.finalToken, 'actionName':data.actionName, 
            'sampleId':data.sampleId, 'sampleAnalysisResultFieldToRetrieve': data.resultFieldToRetrieve,  'sortFieldsName': data.sortFieldsName,             
        }
    })
    .then( response => {
        if(response.status == 200) {
//            console.log(response.data);
            store.dispatch(getGivenSampleAnalysisResultEntry_em_demo_a(response.data));
            if (data.callBackFunction){data.callBackFunction();}
            return;
        }
        if (data.callBackFunctionError){data.callBackFunctionError();}
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on '+apiUrl+' although the connectivity with the API ended with success! Status: '+response.status
          }));         
        })
    .catch(function (error) {
        if (data.callBackFunctionError){data.callBackFunctionError();}
        console.log(error.message);
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on authentication'+error.message
          }));           
        })
    .then(function () {
        });
}
getAllSamplesStageSampling(data) {
    var apiUrl=backendUrl+frontEndEnvMonitSampleUrl; 
//    console.log('getSamplesInProgress', apiUrl, data);
    if (!data.finalToken){return;}
    if (!data.schemaPrefix){return;}
    axios.get(apiUrl, {        
        params: {
            'schemaPrefix':data.schemaPrefix, 'actionName':data.actionName, 
            'finalToken':data.finalToken, 'sampleFieldToRetrieve':data.sampleFieldToRetrieve,
            'whereFieldsName': data.samplesWhereFieldsName, 
            'whereFieldsValue': data.samplesWhereFieldsValue, 'sortFieldsName':data.samplesTabSortFields
        }
    })
    .then( response => {
        if(response.status == 200) {
//            console.log(response.data);
            store.dispatch(getAllSamplesStageSampling_em_demo_a(response.data));
            if (data.callBackFunction){data.callBackFunction();}
            return;
        }
        if (data.callBackFunctionError){data.callBackFunctionError();}
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on '+apiUrl+' although the connectivity with the API ended with success! Status: '+response.status
          }));         
        })
    .catch(function (error) {
        if (data.callBackFunctionError){data.callBackFunctionError();}
        console.log(error.message);
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on authentication'+error.message
          }));           
        })
    .then(function () {
        });
}
getAllSamplesStageIncubation1(data) {
    var apiUrl=backendUrl+frontEndEnvMonitSampleUrl; 
    //console.log('getAllSamplesStageIncubation1', apiUrl, data);
    if (!data.finalToken){return;}
    if (!data.schemaPrefix){return;}
    axios.get(apiUrl, {        
        params: {
            'schemaPrefix':data.schemaPrefix, 'actionName':data.actionName, 
            'finalToken':data.finalToken, 'sampleFieldToRetrieve':data.sampleFieldToRetrieve,
            'whereFieldsName': data.samplesWhereFieldsName, 
            'whereFieldsValue': data.samplesWhereFieldsValue, 'sortFieldsName':data.samplesTabSortFields
        }
    })
    .then( response => {
        if(response.status == 200) {
            //console.log(response.data);
            store.dispatch(getAllSamplesStageIncubation1_em_demo_a(response.data));
            if (data.callBackFunction){data.callBackFunction();}
            return;
        }
        if (data.callBackFunctionError){data.callBackFunctionError();}
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on '+apiUrl+' although the connectivity with the API ended with success! Status: '+response.status
          }));         
        })
    .catch(function (error) {
        if (data.callBackFunctionError){data.callBackFunctionError();}
        //console.log(error.message);
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on authentication'+error.message
          }));           
        })
    .then(function () {
        });
}
getAllSamplesStageIncubation2(data) {
    var apiUrl=backendUrl+frontEndEnvMonitSampleUrl; 
    //console.log('getAllSamplesStageIncubation2', apiUrl, data);
    if (!data.finalToken){return;}
    if (!data.schemaPrefix){return;}
    axios.get(apiUrl, {        
        params: {
            'schemaPrefix':data.schemaPrefix, 'actionName':data.actionName, 
            'finalToken':data.finalToken, 'sampleFieldToRetrieve':data.sampleFieldToRetrieve,
            'whereFieldsName': data.samplesWhereFieldsName, 
            'whereFieldsValue': data.samplesWhereFieldsValue, 'sortFieldsName':data.samplesTabSortFields
        }
    })
    .then( response => {
        if(response.status == 200) {
            //console.log(response.data);
            store.dispatch(getAllSamplesStageIncubation2_em_demo_a(response.data));
            if (data.callBackFunction){data.callBackFunction();}
            return;
        }
        if (data.callBackFunctionError){data.callBackFunctionError();}
            this.dispatchEvent(new CustomEvent('toast-error', {
                bubbles: true,        composed: true,
                detail: 'Error on '+apiUrl+' although the connectivity with the API ended with success! Status: '+response.status
            }));         
        })
    .catch(function (error) {
        if (data.callBackFunctionError){data.callBackFunctionError();}
        //console.log(error.message);
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on authentication'+error.message
          }));           
        })
    .then(function () {
        });
}
getAllSamplesStagePlateReading(data) {
    var apiUrl=backendUrl+frontEndEnvMonitSampleUrl; 
//    console.log('getSamplesInProgress', apiUrl, data);
    if (!data.finalToken){return;}
    if (!data.schemaPrefix){return;}
    axios.get(apiUrl, {        
        params: {
            'schemaPrefix':data.schemaPrefix, 'actionName':data.actionName, 
            'finalToken':data.finalToken, 'sampleFieldToRetrieve':data.sampleFieldToRetrieve,
            'whereFieldsName': data.samplesWhereFieldsName, 
            'whereFieldsValue': data.samplesWhereFieldsValue, 'sortFieldsName':data.samplesTabSortFields
        }
    })
    .then( response => {
        if(response.status == 200) {
//            console.log(response.data);
            store.dispatch(getAllSamplesStagePlateReading_em_demo_a(response.data));
            if (data.callBackFunction){data.callBackFunction();}
            return;
        }
        if (data.callBackFunctionError){data.callBackFunctionError();}
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on '+apiUrl+' although the connectivity with the API ended with success! Status: '+response.status
          }));         
        })
    .catch(function (error) {
        if (data.callBackFunctionError){data.callBackFunctionError();}
        //console.log(error.message);
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on authentication'+error.message
          }));           
        })
    .then(function () {
        });
}
getAllSamplesStageMicroorganism(data) {
    var apiUrl=backendUrl+frontEndEnvMonitSampleUrl; 
//    console.log('getSamplesInProgress', apiUrl, data);
    if (!data.finalToken){return;}
    if (!data.schemaPrefix){return;}
    axios.get(apiUrl, {        
        params: {
            'schemaPrefix':data.schemaPrefix, 'actionName':data.actionName, 
            'finalToken':data.finalToken, 'sampleFieldToRetrieve':data.sampleFieldToRetrieve,
            'whereFieldsName': data.samplesWhereFieldsName, 
            'whereFieldsValue': data.samplesWhereFieldsValue, 'sortFieldsName':data.samplesTabSortFields
        }
    })
    .then( response => {
        if(response.status == 200) {
//            console.log(response.data);
            store.dispatch(getAllSamplesStageMicroorganism_em_demo_a(response.data));
            if (data.callBackFunction){data.callBackFunction();}
            return;
        }
        if (data.callBackFunctionError){data.callBackFunctionError();}
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on '+apiUrl+' although the connectivity with the API ended with success! Status: '+response.status
          }));         
        })
    .catch(function (error) {
        if (data.callBackFunctionError){data.callBackFunctionError();}
        //console.log(error.message);
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on authentication'+error.message
          }));           
        })
    .then(function () {
        });
}
getMicroorganismList(data) {
    var apiUrl=backendUrl+frontEndEnvMonitSampleUrl; 
    //console.log('getAnalysisList', apiUrl, data);
    if (!data.finalToken){return;}
    if (!data.schemaPrefix){return;}
    axios.get(apiUrl, {        
        params: {
            'schemaPrefix':data.schemaPrefix, 'actionName':data.actionName, 
            'finalToken':data.finalToken, 'sampleId':data.sampleId,
            'sampleAnalysisFieldToRetrieve': data.sampleAnalysisFieldToRetrieve
        }
    })
    .then( response => {
        if(response.status == 200) {
            //console.log(response.data);
            store.dispatch(getMicroorganismList_em_demo_a(response.data));
            if (data.callBackFunction){data.callBackFunction();}
            return;
        }
        if (data.callBackFunctionError){data.callBackFunctionError();}
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on '+apiUrl+' although the connectivity with the API ended with success! Status: '+response.status
          }));         
        })
    .catch(function (error) {
        if (data.callBackFunctionError){data.callBackFunctionError();}
        //console.log(error.message);
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on authentication'+error.message
          }));           
        })
    .then(function () {
        });
}

getBrowserSelectedSampleData(data) {
    var apiUrl=backendUrl+frontEndEnvMonitSampleUrl; 
    //console.log('getSelectedObjectBrowserData', apiUrl, data);
    if (!data.finalToken){return;}
    if (!data.schemaPrefix){return;}
    axios.get(apiUrl, {        
        params: {
            'actionName': 'GET_SAMPLE_STAGES_SUMMARY_REPORT', 'schemaPrefix':data.schemaPrefix, 'finalToken':data.finalToken, 
            'sampleId':data.sampleId, 'sampleFieldToRetrieve': data.browserSampleFieldToRetrieve, 'sampleFieldsToDisplay': data.browserSampleFieldsToDisplay
        }
    })
    .then( response => {
        if(response.status == 200) {
            //console.log(response.data);
            store.dispatch(getBrowserSampleData_em_demo_a(response.data));
            if (data.callBackFunction){data.callBackFunction();}
            return;
        }
        if (data.callBackFunctionError){data.callBackFunctionError();}
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on '+apiUrl+' although the connectivity with the API ended with success! Status: '+response.status
          }));         
        })
    .catch(function (error) {
        if (data.callBackFunctionError){data.callBackFunctionError();}
        //console.log(error.message);
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on authentication'+error.message
          }));           
        })
    .then(function () {
        });
}

getBrowserSelectedIncubatorData(data) {
    var apiUrl=backendUrl+frontEndEnvMonitSampleUrl; 
    console.log('getBrowserSelectedIncubatorData', apiUrl, data);
    if (!data.finalToken){return;}
    if (!data.schemaPrefix){return;}
    axios.get(apiUrl, {        
        params: {
            'actionName': 'GET_INCUBATOR_REPORT', 'schemaPrefix':data.schemaPrefix, 'finalToken':data.finalToken, 
            'incubatorName':data.incubName, 'incubatorFieldToRetrieve': data.browserIncubatorFieldToRetrieve, 'incubatorFieldsToDisplay': data.browserIncubatorFieldsToDisplay,
            'startDate':data.startDate, 'endDate':data.endDate
        }
    })
    .then( response => {
        if(response.status == 200) {
            //console.log(response.data);
            store.dispatch(getBrowserIncubatorData_em_demo_a(response.data));
            if (data.callBackFunction){data.callBackFunction();}
            return;
        }
        if (data.callBackFunctionError){data.callBackFunctionError();}
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on '+apiUrl+' although the connectivity with the API ended with success! Status: '+response.status
          }));         
        })
    .catch(function (error) {
        if (data.callBackFunctionError){data.callBackFunctionError();}
        //console.log(error.message);
/*        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on authentication'+error.message
          }));           */
        })
    .then(function () {
        });
}

getBrowserSelectedBatchData(data) {
    var apiUrl=backendUrl+frontEndEnvMonitSampleUrl; 
    //console.log('getSelectedObjectBrowserData', apiUrl, data);
    if (!data.finalToken){return;}
    if (!data.schemaPrefix){return;}
    axios.get(apiUrl, {        
        params: {
            'actionName': 'GET_BATCH_REPORT', 'schemaPrefix':data.schemaPrefix, 'finalToken':data.finalToken, 
            'batchName':data.BatchName, 'batchFieldToRetrieve': data.browserBatchFieldToRetrieve, 'batchFieldsToDisplay': data.browserBatchFieldsToDisplay
        }
    })
    .then( response => {
        if(response.status == 200) {
            //console.log(response.data);            
            store.dispatch(getBrowserBatchData_em_demo_a(response.data));
            if (data.callBackFunction){data.callBackFunction();}
            return;
        }
        if (data.callBackFunctionError){data.callBackFunctionError();}
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on '+apiUrl+' although the connectivity with the API ended with success! Status: '+response.status
          }));         
        })
    .catch(function (error) {
        if (data.callBackFunctionError){data.callBackFunctionError();}
        //console.log(error.message);
/*        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on authentication'+error.message
          }));           */
        })
    .then(function () {
        });
}

getSampleAudit(data) {
    var apiUrl=backendUrl+frontEndEnvMonitSampleUrl; 
    //console.log('getAnalysisList', apiUrl, data);
    if (!data.finalToken){return;}
    if (!data.schemaPrefix){return;}
    axios.get(apiUrl, {        
        params: {
            'schemaPrefix':data.schemaPrefix, 'actionName':data.actionName, 
            'finalToken':data.finalToken, 'sampleId':data.sampleId,
            'sampleAuditFieldToRetrieve': data.sampleAuditFieldToRetrieve
        }
    })
    .then( response => {
        if(response.status == 200) {
            //console.log(response.data);
            store.dispatch(getSampleAudit_em_demo_a(response.data));
            if (data.callBackFunction){data.callBackFunction();}
            return;
        }
        if (data.callBackFunctionError){data.callBackFunctionError();}
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on '+apiUrl+' although the connectivity with the API ended with success! Status: '+response.status
          }));         
        })
    .catch(function (error) {
        if (data.callBackFunctionError){data.callBackFunctionError();}
        //console.log(error.message);
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on authentication'+error.message
          }));           
        })
    .then(function () {
        });
}

getSampleStatsCounterByStage(data) {
    var apiUrl=backendUrl+frontEndEnvMonitSampleUrl; 
    //console.log('getAnalysisList', apiUrl, data);
    if (!data.finalToken){return;}
    if (!data.schemaPrefix){return;}
    axios.get(apiUrl, {        
        params: {
            'schemaPrefix':data.schemaPrefix, 'actionName':'STATS_SAMPLES_PER_STAGE', 
            'finalToken':data.finalToken, 'programName':data.programName,
            'stagesToInclude':data.stagesToInclude,
            'stagesToExclude': data.stagesToExclude
    
            //'sampleAuditFieldToRetrieve': data.sampleAuditFieldToRetrieve
        }
    })
    .then( response => {
        if(response.status == 200) {
            //console.log(response.data);
            store.dispatch(getSampleStatsCounterByStage_em_demo_a(response.data));
            if (data.callBackFunction){data.callBackFunction();}
            return;
        }
        if (data.callBackFunctionError){data.callBackFunctionError();}
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on '+apiUrl+' although the connectivity with the API ended with success! Status: '+response.status
          }));         
        })
    .catch(function (error) {
        if (data.callBackFunctionError){data.callBackFunctionError();}
        //console.log(error.message);
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on authentication'+error.message
          }));           
        })
    .then(function () {
        });
}
getSampleStatsLastNresults(data) {
    var apiUrl=backendUrl+frontEndEnvMonitSampleUrl; 
    //console.log('getAnalysisList', apiUrl, data);
    if (!data.finalToken){return;}
    if (!data.schemaPrefix){return;}
    axios.get(apiUrl, {        
        params: {
            'schemaPrefix':data.schemaPrefix, 'actionName':'STATS_PROGRAM_LAST_RESULTS', 
            'finalToken':data.finalToken, 'programName':data.programName,
            'totalObjects': data.totalObjects, 'grouped':data.grouped
        }
    })
    .then( response => {
        if(response.status == 200) {
            //console.log(response.data);
            store.dispatch(getSampleStatsLastNresults_em_demo_a(response.data));
            if (data.callBackFunction){data.callBackFunction();}
            return;
        }
        if (data.callBackFunctionError){data.callBackFunctionError();}
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on '+apiUrl+' although the connectivity with the API ended with success! Status: '+response.status
          }));         
        })
    .catch(function (error) {
        if (data.callBackFunctionError){data.callBackFunctionError();}
        //console.log(error.message);
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on authentication'+error.message
          }));           
        })
    .then(function () {
        });
}

}