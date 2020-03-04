import {
  SAMPLE_TEMPLATES, UNRECEIVED_SAMPLES_LIST, RECEIVED_SAMPLES_IN_SESSION, FOR_RESULTS_SAMPLES_LIST, FOR_REVISION_SAMPLES_LIST
  ,ANALYSIS_LIST, GIVEN_SAMPLE_ANALYSIS_LIST, GIVEN_SAMPLE_ANALYSIS_RESULT_LIST
  ,FOR_RESULTS_SAMPLES_CUSTODIAN_LIST, FOR_RESULTS_SAMPLES_CANDIDATE_LIST, COC_SAMPLE_HISTORY, COC_USERS_LIST
} from './process-us_actions.js';

const INITIAL_STATE = {
   sampleTemplates: []
  ,unReceivedSamples: []
  ,receivedSamplesInSession: []
  ,forResultsSamples: [] 
  ,forRevisionSamples: []
  ,analysisList: []  
  ,givenSampleAnalysisList: []  
  ,givenSampleAnalysisResultEntryList: []  
  ,forResultsSamplesCustodian: []     
  ,forResultsSamplesCandidate: [] 
  ,cocSampleHistory: []
  ,cocUsersList: []
}

const processUsReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SAMPLE_TEMPLATES:
    //console.log('process-us_reducers.sampleTemplates', action);
    return {
        ...state,        
        sampleTemplates: action.DATA,
    }
    case UNRECEIVED_SAMPLES_LIST:
    //console.log('process-us_reducers.sampleTemplates', action);
    return {
        ...state,        
        unReceivedSamples: action.DATA,
    }   
    case RECEIVED_SAMPLES_IN_SESSION:
    //console.log('process-us_reducers.sampleTemplates', action);
    return {
        ...state,        
        //tabIndex: state.tabIndex + 1,
        receivedSamplesInSession: [
          ...state.receivedSamplesInSession,
          action.data           
        ]        
    }        
    case FOR_RESULTS_SAMPLES_LIST:
    //console.log('process-us_reducers.sampleTemplates', action);
    return {
        ...state,        
        forResultsSamples: action.DATA,
    }    
    case FOR_RESULTS_SAMPLES_CUSTODIAN_LIST:
    //console.log('process-us_reducers.sampleTemplates', action);
    return {
        ...state,        
        forResultsSamplesCustodian: action.DATA,
    }    
    case FOR_RESULTS_SAMPLES_CANDIDATE_LIST:
    //console.log('process-us_reducers.sampleTemplates', action);
    return {
        ...state,        
        forResultsSamplesCandidate: action.DATA,
    }    
    case FOR_REVISION_SAMPLES_LIST:
    //console.log('process-us_reducers.sampleTemplates', action);
    return {
        ...state,        
        forRevisionSamples: action.DATA,
    }    
    case ANALYSIS_LIST:
//    console.log('process-us_reducers.sampleTemplates', action);
    return {
        ...state,        
        analysisList: action.DATA,
    }
    case GIVEN_SAMPLE_ANALYSIS_LIST:
//    console.log('process-us_reducers.GIVEN_SAMPLE_ANALYSIS_LIST', action);
    return {
        ...state,        
        givenSampleAnalysisList: action.DATA,
    }    
    case GIVEN_SAMPLE_ANALYSIS_RESULT_LIST:
//    console.log('process-us_reducers.GIVEN_SAMPLE_ANALYSIS_RESULT_LIST', action);
    return {
        ...state,        
        givenSampleAnalysisResultEntryList: action.DATA,
    }    
    case COC_SAMPLE_HISTORY:
//    console.log('process-us_reducers.COC_SAMPLE_HISTORY', action);
    return {
        ...state,        
        cocSampleHistory: action.DATA,
    }
    case COC_USERS_LIST:
//    console.log('process-us_reducers.COC_SAMPLE_HISTORY', action);
    return {
        ...state,        
        cocUsersList: action.DATA,
    }
                 
    default:
      return state;
  }
}

export default processUsReducer;

