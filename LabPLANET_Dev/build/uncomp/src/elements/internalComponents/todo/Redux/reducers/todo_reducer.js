import{combineReducers}from"../../../../../../node_modules/redux/es/redux.js";import{ADD_TODO,TOGGLE_TODO,SET_VISIBILITY_FILTER}from"../actions/todo_actions.js";/*
* Reducer para las TODO
*/function todos(state=[],action){switch(action.type){case ADD_TODO:return[...state,{text:action.text,completed:!1,id:state?state.length+1:1}];case TOGGLE_TODO:return state.map(todo=>{if(todo.id===action.id){return Object.assign({},todo,{completed:!todo.completed})}return todo});default:return state;}}/*
* Reducer para el filtro de visibilidad
*/function visibilityFilter(state="SHOW_ALL",action){switch(action.type){case SET_VISIBILITY_FILTER:return action.filter;default:return state;}}export const todo=combineReducers({visibilityFilter,todos});