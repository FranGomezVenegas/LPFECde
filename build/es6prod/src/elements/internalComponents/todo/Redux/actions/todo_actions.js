define(["exports"],function(_exports){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.addTodo=addTodo;_exports.toggleTodo=toggleTodo;_exports.setVisibilityFilter=setVisibilityFilter;_exports.VisibilityFilters=_exports.SET_VISIBILITY_FILTER=_exports.TOGGLE_TODO=_exports.ADD_TODO=void 0;/*
* Action types
*/const ADD_TODO="ADD_TODO";_exports.ADD_TODO=ADD_TODO;const TOGGLE_TODO="TOGGLE_TODO";_exports.TOGGLE_TODO=TOGGLE_TODO;const SET_VISIBILITY_FILTER="SET_VISIBILITY_FILTER";/*
 * otras constantes
 */_exports.SET_VISIBILITY_FILTER=SET_VISIBILITY_FILTER;const VisibilityFilters={SHOW_ALL:"SHOW_ALL",SHOW_COMPLETED:"SHOW_COMPLETED",SHOW_ACTIVE:"SHOW_ACTIVE"/*
* Action creators
*/};_exports.VisibilityFilters=VisibilityFilters;function addTodo(text){return{type:ADD_TODO,text}}function toggleTodo(id){return{type:TOGGLE_TODO,id}}function setVisibilityFilter(filter){return{type:SET_VISIBILITY_FILTER,filter}}});