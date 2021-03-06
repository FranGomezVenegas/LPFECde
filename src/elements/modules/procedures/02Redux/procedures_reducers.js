import {
    GET_PROCEDURE_DEFINITION
} from './procedures_actions.js';

const INITIAL_STATE = {

    procedures: []
    , selectedProcedureName: ''
    , selectedProcedure: []

}

const EmDemoAReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {    
    case GET_PROCEDURE_DEFINITION:
        console.log('procedures_reducers.programs', action);
        return {
            ...state,    
            selectedProcedureName: action.DATA.name,    
            selectedProcedure: action.DATA,
        }
    default:
      return state;  
    }   
}

export default EmDemoAReducer;


