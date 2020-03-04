import { sampleTemplates as sampleTemplates_process_us, unReceivedSamples as unReceivedSamples_process_us
, forResultsSamples as forResultsSamples_process_us, givenCocSampleHistory as givenCocSampleHistory_process_us
, getGivenCocUsersList as getGivenCocUsersList_process_us
, forResultsSamplesCustodian as forResultsSamplesCustodian_process_us, forResultsSamplesCandidate as forResultsSamplesCandidate_process_us
    , forRevisionSamples as forRevisionSamples_process_us
, analysisAllList as analysisAllList_process_us, givenSampleAnalysisList as givenSampleAnalysisList_process_us
, getGivenSampleAnalysisResultEntry as getGivenSampleAnalysisResultEntry_process_us
} from '../02Redux/process-us_actions';

import {sample_templates} from '../03config/sample-templates';


import {backendUrl, frontEndSampleUrl} from '../../../../config/api-config'
import {store} from '../../../../store';

/**
 * @mixinFunction
 * @polymer
 */
export const FrontendSample = (superClass) => class extends superClass {

    SampleLogButtonClicked(e){            
        console.log(e.detail.name, this.sampleTemplatesFields, this.sampleTemplatesList[1].value);
        var numSamplesToLog = this.sampleTemplatesList[1].value;
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
        for (iField = 0; iField < this.sampleTemplatesFields.length; iField++) {
            if (String(this.sampleTemplatesFields[iField].value).length>0){
                fieldType = this.sampleTemplatesFields[iField].dbType;
                switch (fieldType) {
                    case 'date':
                    case 'Date':
                        if (fieldsStringValues.length>0) {
                            fieldsStringNames=fieldsStringNames+'|';
                            fieldsStringValues=fieldsStringValues+'|';
                        }
                        fieldsStringNames=fieldsStringNames+this.sampleTemplatesFields[iField].name;
                        fieldsStringValues=fieldsStringValues+this.sampleTemplatesFields[iField].value+'*Date';
                        break;
                    case 'string':
                    case 'String':
                        if (fieldsStringValues.length>0) {
                            fieldsStringNames=fieldsStringNames+'|';
                            fieldsStringValues=fieldsStringValues+'|';
                        }
                        fieldsStringNames=fieldsStringNames+this.sampleTemplatesFields[iField].name;
                        fieldsStringValues=fieldsStringValues+this.sampleTemplatesFields[iField].value+'*String';
                        break;
                    case 'Boolean':
                        if (fieldsStringValues.length>0) {
                            fieldsStringNames=fieldsStringNames+'|';
                            fieldsStringValues=fieldsStringValues+'|';}
                            fieldsStringNames=fieldsStringNames+this.sampleTemplatesFields[iField].name;
                            fieldsStringValues=fieldsStringValues+this.sampleTemplatesFields[iField].value+'*Boolean';
                        break;   
                    case 'integer':
                    case 'Integer':
                        if (fieldsStringValues.length>0) {
                            fieldsStringNames=fieldsStringNames+'|';
                            fieldsStringValues=fieldsStringValues+'|';}
                            fieldsStringNames=fieldsStringNames+this.sampleTemplatesFields[iField].name;
                            fieldsStringValues=fieldsStringValues+this.sampleTemplatesFields[iField].value+'*Integer';
                        break;                           
                    case 'Button':
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
        row.sampleTemplate=this.selectedSampleTemplate; row.sampleTemplateVersion="1";
        row.fieldName=fieldsStringNames; row.fieldValue=fieldsStringValues; row.numSamplesToLog=numSamplesToLog;
        //row.eSignToVerify="Mala";
        var tabInfo={
            currTabEsignRequired: this.currTabEsignRequired,
            currTabConfirmUserRequired: this.currTabConfirmUserRequired};
//console.log('process-us-sample-login >> onButtonClicked >> tabInfo = ', tabInfo);            
        this.sampleActionTrigger(this.schemaPrefix, this.finalToken, actionName, row, tabInfo, null);    
    }
        
    fieldButtonClicked(e) {
        console.log('process-us-sample-custodian >> fieldButtonClicked ', 
            'e.detail.buttonName', e.detail.buttonName, 'datas', datas, 'e.detail.buttonDefinition', e.detail.buttonDefinition);
        if (this.selectedObject==null){
            this.dispatchEvent(new CustomEvent('toast-error', {bubbles: true, composed: true,
                detail: 'Please select one sample first '}));    
            return;
        }    
        var datas = [];
        datas.actionName=e.detail.buttonName;
        datas.selectedObject=this.selectedObject;
        
        this.$.myElements.actionTrigger(e.detail.buttonName, datas, e.detail.buttonDefinition);                     
    }

    
    
getSampleTemplates(data) {
    //console.log(sample_templates);
    store.dispatch(sampleTemplates_process_us(sample_templates));
    if (data.callBackFunction){data.callBackFunction();}
    return;
    var apiUrl=backendUrl+frontEndSampleUrl; 
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
            store.dispatch(sampleTemplates_process_us(response.data));
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
    var apiUrl=backendUrl+frontEndSampleUrl; 
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
                    store.dispatch(unReceivedSamples_process_us(response.data));
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
    var apiUrl=backendUrl+frontEndSampleUrl; 
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
            store.dispatch(forResultsSamples_process_us(response.data));
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
    var apiUrl=backendUrl+frontEndSampleUrl; 
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
            store.dispatch(forResultsSamplesCustodian_process_us(response.data));
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
    var apiUrl=backendUrl+frontEndSampleUrl; 
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
            store.dispatch(forResultsSamplesCandidate_process_us(response.data));
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
    var apiUrl=backendUrl+frontEndSampleUrl; 
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
            store.dispatch(givenCocSampleHistory_process_us(response.data));
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
    var apiUrl=backendUrl+frontEndSampleUrl; 
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
            store.dispatch(getGivenCocUsersList_process_us(response.data));
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
    var apiUrl=backendUrl+frontEndSampleUrl; 
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
            store.dispatch(forRevisionSamples_process_us(response.data));
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
    var apiUrl=backendUrl+frontEndSampleUrl; 
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
            store.dispatch(analysisAllList_process_us(response.data));
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
    var apiUrl=backendUrl+frontEndSampleUrl; 
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
            store.dispatch(givenSampleAnalysisList_process_us(response.data));
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
    var apiUrl=backendUrl+frontEndSampleUrl; 
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
            store.dispatch(getGivenSampleAnalysisResultEntry_process_us(response.data));
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

}