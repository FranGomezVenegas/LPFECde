import {getPrograms as programs_em_demo_a, setSelectedProgram as selectedProgram_em_demo_a,
    selectedProgramCorrectiveActionList as selectedProgramCorrectiveActionList_em_demo_a,
    setSelectedSamplingPoint as selectedSamplingPoint_em_demo_a,  
    getActiveProductionLots as getActiveProductionLots_em_demo_a      
    , getAllIncubators as getAllIncubators_em_demo_a  
    , getActiveBatches as getActiveBatches_em_demo_a  

} from '../02Redux/em-demo-a_actions';

import {backendUrl, frontEndEnvMonitUrl, frontEndEnvMonitIncubationUrl, frontEndEnvMonitIncubBatchUrl} from '../../../../config/api-config'
import {store} from '../../../../store';

/**
 * @mixinFunction
 * @polymer
 */
export const FrontendEnvMonit = (superClass) => class extends superClass {

    getPrograms(data) {
        var apiUrl=backendUrl+frontEndEnvMonitUrl; 
        //console.log('getSampleTemplates', apiUrl, data.schemaPrefix);
        if (!data.schemaPrefix){return;}
        if (!data.finalToken){return;}
        axios.get(apiUrl, {        
            params: {
                'schemaPrefix':data.schemaPrefix, 'actionName':'PROGRAMS_LIST', 
                'finalToken':data.finalToken
            }
        })
        .then( response => {
            if(response.status == 200) {
                //console.log('FrontendEnvMonit >> getPrograms', response.data);
                store.dispatch(programs_em_demo_a(response.data.programsList));
                if (data.callBackFunction){data.callBackFunction();}
                return;
            }
            if (data.callBackFunctionError){data.callBackFunctionError();}
            /*this.dispatchEvent(new CustomEvent('toast-error', {
                bubbles: true,        composed: true,
                detail: 'Error on '+apiUrl+' although the connectivity with the API ended with success! Status: '+response.status
              }));         */
            })
        .catch(function (error) {
            if (data.callBackFunctionError){data.callBackFunctionError();}
            console.log(error.message);
            /*this.dispatchEvent(new CustomEvent('toast-error', {
                bubbles: true,        composed: true,
                detail: 'Error on authentication'+error.message
              }));           */
            })
        .then(function () {
            });
    }
    setSelectedProgram(data){
        store.dispatch(selectedProgram_em_demo_a(response.data));
        if (data.callBackFunction){data.callBackFunction();}
        return;        
    }
    setSelectedSamplingPoint(data){
        store.dispatch(selectedSamplingPoint_em_demo_a(response.data));
        if (data.callBackFunction){data.callBackFunction();}
        return;        
    }    
    getSelectedProgramCorrectiveAction(data) {
        var apiUrl=backendUrl+frontEndEnvMonitUrl; 
        //console.log('getSampleTemplates', apiUrl, data.schemaPrefix);
        if (!data.schemaPrefix){return;}
        if (!data.finalToken){return;}
        axios.get(apiUrl, {        
            params: {
                'schemaPrefix':data.schemaPrefix, 'actionName':'PROGRAM_CORRECTIVE_ACTION_LIST', 
                'finalToken':data.finalToken, 'programName':data.programName
            }
        })
        .then( response => {
            if(response.status == 200) {
                //console.log('FrontendEnvMonit >> getSelectedProgramCorrectiveAction', response.data);
                store.dispatch(selectedProgramCorrectiveActionList_em_demo_a(response.data));
                if (data.callBackFunction){data.callBackFunction();}
                return;
            }
            if (data.callBackFunctionError){data.callBackFunctionError();}
            /*this.dispatchEvent(new CustomEvent('toast-error', {
                bubbles: true,        composed: true,
                detail: 'Error on '+apiUrl+' although the connectivity with the API ended with success! Status: '+response.status
              }));         */
            })
        .catch(function (error) {
            if (data.callBackFunctionError){data.callBackFunctionError();}
            console.log(error.message);
            /*this.dispatchEvent(new CustomEvent('toast-error', {
                bubbles: true,        composed: true,
                detail: 'Error on authentication'+error.message
              }));           */
            })
        .then(function () {
            });
    }  
    getActiveProductionLotsList(data) {
        var apiUrl=backendUrl+frontEndEnvMonitUrl; 
        //console.log('getAnalysisList', apiUrl, data);
        if (!data.finalToken){return;}
        if (!data.schemaPrefix){return;}
        axios.get(apiUrl, {        
            params: {
                'schemaPrefix':data.schemaPrefix, 'actionName':data.actionName, 
                'finalToken':data.finalToken, 
                //'sampleAnalysisFieldToRetrieve': data.sampleAnalysisFieldToRetrieve
            }
        })
        .then( response => {
            if(response.status == 200) {
                //console.log(response.data);
                store.dispatch(getActiveProductionLots_em_demo_a(response.data));
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
    getAllIncubators(data) {
        var apiUrl=backendUrl+frontEndEnvMonitIncubationUrl; 
        console.log('getAllIncubators', apiUrl, data);
        if (!data.finalToken){return;}
        if (!data.schemaPrefix){return;}
        axios.get(apiUrl, {        
            params: {
                'schemaPrefix':data.schemaPrefix, 'actionName':'INCUBATORS_LIST', 
                'finalToken':data.finalToken//, 'sampleFieldToRetrieve':data.sampleFieldToRetrieve,
                //'whereFieldsName': data.samplesWhereFieldsName, 
                //'whereFieldsValue': data.samplesWhereFieldsValue, 'sortFieldsName':data.samplesTabSortFields
            }
        })
        .then( response => {
            if(response.status == 200) {
                console.log(response.data);
                store.dispatch(getAllIncubators_em_demo_a(response.data));
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
    getActiveBatches(data) {
        var apiUrl=backendUrl+frontEndEnvMonitIncubBatchUrl; 
        //console.log('getActiveBatches', apiUrl, data);
        if (!data.finalToken){return;}
        if (!data.schemaPrefix){return;}
        axios.get(apiUrl, {        
            params: {
                'schemaPrefix':data.schemaPrefix, 'actionName':'ACTIVE_BATCH_LIST', 
                'finalToken':data.finalToken//, 'sampleFieldToRetrieve':data.sampleFieldToRetrieve,
                //'whereFieldsName': data.samplesWhereFieldsName, 
                //'whereFieldsValue': data.samplesWhereFieldsValue, 'sortFieldsName':data.samplesTabSortFields
            }
        })
        .then( response => {
            if(response.status == 200) {
                //console.log(response.data);
                store.dispatch(getActiveBatches_em_demo_a(response.data));
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
            //console.log(error.message);
            // this.dispatchEvent(new CustomEvent('toast-error', {
            //     bubbles: true,        composed: true,
            //     detail: 'Error on authentication'+error.message
            //   }));           
            })
        .then(function () {
            });
    }    

    prodLotFieldButtonClicked(e) {
        //console.log('frontend-env-monit-sample >> prodLotFieldButtonClicked ', 
        //    'e.detail.buttonName', e.detail.buttonName, 'this.selectedObject', this.selectedObject, 'e.detail.buttonDefinition', e.detail.buttonDefinition);
        // if (this.selectedObject==null){
        //     this.dispatchEvent(new CustomEvent('toast-error', {bubbles: true, composed: true,
        //         detail: 'Please select one production lot first '}));    
        //     return;
        // }    
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
    fieldButtonClicked(e) {
        //console.log('frontend-env-monit >> fieldButtonClicked ', 
        //    'e.detail.buttonName', e.detail.buttonName, 'datas', datas, 'e.detail.buttonDefinition', e.detail.buttonDefinition);
        // if (this.selectedObject==null){
        //     this.dispatchEvent(new CustomEvent('toast-error', {bubbles: true, composed: true,
        //         detail: 'Please select one sample first '}));    
        //     return;
        // }    
        var datas = [];
        datas.actionName=e.detail.buttonName;
        datas.selectedObject=this.selectedObject;
        if (this.refreshWindow){
            datas.callBackFunction=this.refreshWindow.bind(this); }            
        this.$.myElements.actionTrigger(e.detail.buttonName, datas, e.detail.buttonDefinition);                     
    }

}