define(["exports","./em-demo-a_actions.js"],function(_exports,_emDemoA_actions){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.default=void 0;function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){keys.push.apply(keys,Object.getOwnPropertySymbols(object))}if(enumerableOnly)keys=keys.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable});return keys}function _objectSpread(target){for(var i=1,source;i<arguments.length;i++){source=null!=arguments[i]?arguments[i]:{};if(i%2){ownKeys(source,!0).forEach(function(key){babelHelpers.defineProperty(target,key,source[key])})}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source))}else{ownKeys(source).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))})}}return target}const INITIAL_STATE={programs:[],selectedProgram:[],selectedProgramCorrectiveActions:[],selectedSamplingPoint:[],allIncubators:[],selectedIncubator:[],allActiveBatches:[],selectedBatch:[],allProgramsUnreceivedSamples:[],microorganismList:[],activeProductionLots:[],allSamplesStageSampling:[],allSamplesStageIncubation1:[],allSamplesStageIncubation2:[],allSamplesStagePlateReading:[],allSamplesStageMicroorganism:[],sampleTemplates:[],unReceivedSamples:[],receivedSamplesInSession:[],forResultsSamples:[],forRevisionSamples:[],analysisList:[],givenSampleAnalysisList:[],givenSampleAnalysisResultEntryList:[],forResultsSamplesCustodian:[],forResultsSamplesCandidate:[],cocSampleHistory:[],cocUsersList:[],sampleAudit:[],sampleBrowserSamplesList:[],browserSelectedSample:[],browserSelectedIncubator:[],browserSelectedBatch:[],sampleStatsCounterByStage:[],sampleStatsLastNresults:[]},EmDemoAReducer=(state=INITIAL_STATE,action)=>{switch(action.type){case _emDemoA_actions.PROGRAMS://console.log('em-demo-a_reducers.programs', action);
return _objectSpread({},state,{programs:action.DATA});case _emDemoA_actions.SELECTED_PROGRAM://console.log('em-demo-a_reducers.programs', action);
return _objectSpread({},state,{selectedProgram:action.DATA});case _emDemoA_actions.SELECTED_SAMPLING_POINT://console.log('em-demo-a_reducers.programs', action);
return _objectSpread({},state,{selectedSamplingPoint:action.DATA});case _emDemoA_actions.GET_ALL_INCUBATORS://console.log('em-demo-a_reducers.programs', action);
return _objectSpread({},state,{allIncubators:action.DATA});case _emDemoA_actions.SET_SELECTED_INCUBATOR://console.log('em-demo-a_reducers.programs', action);
return _objectSpread({},state,{selectedIncubator:action.DATA});case _emDemoA_actions.GET_ACTIVE_BATCHES:/*        var selBatchName=state.selectedBatch.name;
        //console.log('em-demo-a_reducers.programs', action);
        var found = action.DATA.find(function(selBatchName) {
            console.log('em-demo-a_reducers >> GET_ACTIVE_BATCHES >> tab reducer find', selBatchName, action.DATA);
            return index == action.DATA.index;
          });      
        //console.log('tab reducer', action, state, found);
        if (found != undefined){
          return {
            ...state,
            selectedBatch: action.DATA[index],
            allActiveBatches: action.DATA,    
        }
        }else{ */return _objectSpread({},state,{allActiveBatches:action.DATA//} 
});case _emDemoA_actions.SET_SELECTED_BATCH://console.log('em-demo-a_reducers.programs', action);
return _objectSpread({},state,{selectedBatch:action.DATA});case _emDemoA_actions.SELECTED_PROGRAM_CORRECTIVE_ACTION_LIST://console.log('em-demo-a_reducers.SELECTED_PROGRAM_CORRECTIVE_ACTION_LIST', action);
return _objectSpread({},state,{selectedProgramCorrectiveActions:action.DATA});case _emDemoA_actions.ACTIVE_PRODUCTION_LOTS:return _objectSpread({},state,{activeProductionLots:action.DATA});case _emDemoA_actions.ALL_PROGRAMS_UNRECEIVED_SAMPLES://console.log('em-demo-a_reducers.programs', action);
return _objectSpread({},state,{allProgramsUnreceivedSamples:action.DATA});case _emDemoA_actions.ALL_SAMPLES_STAGE_SAMPLING://console.log('em-demo-a_reducers.programs', action);
return _objectSpread({},state,{allSamplesStageSampling:action.DATA});case _emDemoA_actions.ALL_SAMPLES_STAGE_INCUBATION1://console.log('em-demo-a_reducers.programs', action);
return _objectSpread({},state,{allSamplesStageIncubation1:action.DATA});case _emDemoA_actions.ALL_SAMPLES_STAGE_INCUBATION2://console.log('em-demo-a_reducers.programs', action);
return _objectSpread({},state,{allSamplesStageIncubation2:action.DATA});case _emDemoA_actions.ALL_SAMPLES_STAGE_PLATEREADING://console.log('em-demo-a_reducers.programs', action);
return _objectSpread({},state,{allSamplesStagePlateReading:action.DATA});case _emDemoA_actions.ALL_SAMPLES_STAGE_MICROORGANISM://console.log('em-demo-a_reducers.programs', action);
return _objectSpread({},state,{allSamplesStageMicroorganism:action.DATA});case _emDemoA_actions.MICROORGANISM_LIST://console.log('em-demo-a_reducers.programs', action);
return _objectSpread({},state,{microorganismList:action.DATA});case _emDemoA_actions.OBJECT_BROWSER_ADD://console.log('em-demo-a_reducers.programs', action);
return _objectSpread({},state,{sampleBrowserSamplesList:[...state.sampleBrowserSamplesList,action.DATA]});case _emDemoA_actions.SELECT_BROWSER_SAMPLE_OBJECT://console.log('em-demo-a_reducers.programs', action);
return _objectSpread({},state,{browserSelectedSample:action.DATA});case _emDemoA_actions.SELECT_BROWSER_INCUBATOR_OBJECT://console.log('em-demo-a_reducers.programs', action);
return _objectSpread({},state,{browserSelectedIncubator:action.DATA});case _emDemoA_actions.SELECT_BROWSER_BATCH_OBJECT://console.log('em-demo-a_reducers.programs', action);
return _objectSpread({},state,{browserSelectedBatch:action.DATA});case _emDemoA_actions.SAMPLE_TEMPLATES://console.log('process-us_reducers.sampleTemplates', action);
return _objectSpread({},state,{sampleTemplates:action.DATA});case _emDemoA_actions.UNRECEIVED_SAMPLES_LIST://console.log('process-us_reducers.sampleTemplates', action);
return _objectSpread({},state,{unReceivedSamples:action.DATA});case _emDemoA_actions.RECEIVED_SAMPLES_IN_SESSION://console.log('process-us_reducers.sampleTemplates', action);
return _objectSpread({},state,{//tabIndex: state.tabIndex + 1,
receivedSamplesInSession:[...state.receivedSamplesInSession,action.data]});case _emDemoA_actions.FOR_RESULTS_SAMPLES_LIST://console.log('process-us_reducers.sampleTemplates', action);
return _objectSpread({},state,{forResultsSamples:action.DATA});case _emDemoA_actions.FOR_RESULTS_SAMPLES_CUSTODIAN_LIST://console.log('process-us_reducers.sampleTemplates', action);
return _objectSpread({},state,{forResultsSamplesCustodian:action.DATA});case _emDemoA_actions.FOR_RESULTS_SAMPLES_CANDIDATE_LIST://console.log('process-us_reducers.sampleTemplates', action);
return _objectSpread({},state,{forResultsSamplesCandidate:action.DATA});case _emDemoA_actions.FOR_REVISION_SAMPLES_LIST://console.log('process-us_reducers.sampleTemplates', action);
return _objectSpread({},state,{forRevisionSamples:action.DATA});case _emDemoA_actions.ANALYSIS_LIST://    console.log('process-us_reducers.sampleTemplates', action);
return _objectSpread({},state,{analysisList:action.DATA});case _emDemoA_actions.GIVEN_SAMPLE_ANALYSIS_LIST://    console.log('process-us_reducers.GIVEN_SAMPLE_ANALYSIS_LIST', action);
return _objectSpread({},state,{givenSampleAnalysisList:action.DATA});case _emDemoA_actions.GIVEN_SAMPLE_ANALYSIS_RESULT_LIST://    console.log('process-us_reducers.GIVEN_SAMPLE_ANALYSIS_RESULT_LIST', action);
return _objectSpread({},state,{givenSampleAnalysisResultEntryList:action.DATA});case _emDemoA_actions.COC_SAMPLE_HISTORY://    console.log('process-us_reducers.COC_SAMPLE_HISTORY', action);
return _objectSpread({},state,{cocSampleHistory:action.DATA});case _emDemoA_actions.COC_USERS_LIST://    console.log('process-us_reducers.COC_SAMPLE_HISTORY', action);
return _objectSpread({},state,{cocUsersList:action.DATA});case _emDemoA_actions.GET_SAMPLE_AUDIT://    console.log('process-us_reducers.COC_SAMPLE_HISTORY', action);
return _objectSpread({},state,{sampleAudit:action.DATA});case _emDemoA_actions.SAMPLE_STATS_COUNTER_BY_STAGE://    console.log('process-us_reducers.COC_SAMPLE_HISTORY', action);
return _objectSpread({},state,{sampleStatsCounterByStage:action.DATA});case _emDemoA_actions.SAMPLE_STATS_LAST_N_RESULTS://    console.log('process-us_reducers.COC_SAMPLE_HISTORY', action);
return _objectSpread({},state,{sampleStatsLastNresults:action.DATA});default:return state;}};var _default=EmDemoAReducer;_exports.default=_default});