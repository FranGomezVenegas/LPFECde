import {USER_OPEN_INCIDENTS} from '../actions/incidents_actions';

const INITIAL_STATE = {
    userOpenIncident: [],
}

const sopReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case USER_OPEN_INCIDENTS:
//        console.log('sopReducer >> ', action.type, action);
        return {
            ...state,        
            userOpenIncident: action.DATA,
        }
    default:
      return state;
  }
}

export default sopReducer;

