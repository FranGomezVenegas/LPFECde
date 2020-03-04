import {schema_name} from '../03config/config-process';
var schemaName=schema_name.replace('-','_');

export const SAMPLE_TEMPLATES = 'SAMPLE_TEMPLATES'+schemaName;
export const UNRECEIVED_SAMPLES_LIST = 'UNRECEIVED_SAMPLES_LIST'+schemaName;
export const RECEIVED_SAMPLES_IN_SESSION = 'COC_USERS_LIST'+schemaName;
export const FOR_REVISION_SAMPLES_LIST = 'FOR_REVISION_SAMPLES_LIST'+schemaName;
export const FOR_RESULTS_SAMPLES_LIST = 'FOR_RESULTS_SAMPLES_LIST'+schemaName;
export const FOR_RESULTS_SAMPLES_CUSTODIAN_LIST = 'FOR_RESULTS_SAMPLES_CUSTODIAN_LIST'+schemaName;
export const FOR_RESULTS_SAMPLES_CANDIDATE_LIST = 'FOR_RESULTS_SAMPLES_CANDIDATE_LIST'+schemaName;
export const ANALYSIS_LIST = 'ANALYSIS_LIST'+schemaName;
export const GIVEN_SAMPLE_ANALYSIS_LIST = 'GIVEN_SAMPLE_ANALYSIS_LIST'+schemaName;
export const GIVEN_SAMPLE_ANALYSIS_RESULT_LIST = 'GIVEN_SAMPLE_ANALYSIS_RESULT_LIST'+schemaName;
export const COC_SAMPLE_HISTORY = 'COC_SAMPLE_HISTORY'+schemaName;
export const COC_USERS_LIST = 'COC_USERS_LIST'+schemaName;

export function getGivenCocUsersList(data) {
  //  console.log('process-us_actions.sampleTemplates', data);
    return {
      type: COC_USERS_LIST,
      DATA: data
    }
  }
export function getGivenSampleAnalysisResultEntry(data) {
  //  console.log('process-us_actions.sampleTemplates', data);
    return {
      type: GIVEN_SAMPLE_ANALYSIS_RESULT_LIST,
      DATA: data
    }
  }
export function givenSampleAnalysisList(data) {
  //  console.log('process-us_actions.sampleTemplates', data);
    return {
      type: GIVEN_SAMPLE_ANALYSIS_LIST,
      DATA: data
    }
  }
  
export function analysisAllList(data) {
//  console.log('process-us_actions.sampleTemplates', data);
  return {
    type: ANALYSIS_LIST,
    DATA: data
  }
}
  
export function sampleTemplates(data) {
//  console.log('process-us_actions.sampleTemplates', data);
  return {
    type: SAMPLE_TEMPLATES,
    DATA: data
  }
}

export function unReceivedSamples(data) {
//    console.log('process-us_actions.sampleTemplates', data);
    return {
      type: UNRECEIVED_SAMPLES_LIST,
      DATA: data
    }
  }

export function receivedSamplesInSession(data) {
//    console.log('process-us_actions.sampleTemplates', data);
    return {
      type: RECEIVED_SAMPLES_IN_SESSION,
      DATA: data
    }
  }
  

  export function forResultsSamples(data) {
//      console.log('Redux.Actions >> process-us_actions.forResultsSamples', data);
    return {
      type: FOR_RESULTS_SAMPLES_LIST,
      DATA: data
    }
  }
  export function forResultsSamplesCustodian(data) {
//      console.log('Redux.Actions >> process-us_actions.forResultsSamples', data);
    return {
      type: FOR_RESULTS_SAMPLES_CUSTODIAN_LIST,
      DATA: data
    }
  }
  export function forResultsSamplesCandidate(data) {
//      console.log('Redux.Actions >> process-us_actions.forResultsSamples', data);
    return {
      type: FOR_RESULTS_SAMPLES_CANDIDATE_LIST,
      DATA: data
    }
  }    
  export function givenCocSampleHistory(data) {
//        console.log('Redux.Actions >> process-us_actions.forResultsSamples', data);
        return {
          type: COC_SAMPLE_HISTORY,
          DATA: data
        }
      }    
    
  
  export function forRevisionSamples(data) {
//  console.log('process-us_actions.forRevisionSamples', data);
    return {
      type: FOR_REVISION_SAMPLES_LIST,
      DATA: data
    }
  }