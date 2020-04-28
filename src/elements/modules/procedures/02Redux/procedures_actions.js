export const GET_PROCEDURE_DEFINITION = 'GET_PROCEDURE_DEFINITION';

export function getProcedureDefinition(data) {
  //console.log('em-demo-a_actions.getPrograms', data);
  return {
    type: GET_PROCEDURE_DEFINITION,
    DATA: data
  }
}

