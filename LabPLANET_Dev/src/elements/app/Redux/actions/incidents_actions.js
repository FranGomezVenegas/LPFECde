export const USER_OPEN_INCIDENTS = 'USER_OPEN_INCIDENTS';


export function userOpenIncidents(data) {
  //  console.log('process-us_actions.sampleTemplates', data);
    return {
      type: USER_OPEN_INCIDENTS,
      DATA: data
    }
}
