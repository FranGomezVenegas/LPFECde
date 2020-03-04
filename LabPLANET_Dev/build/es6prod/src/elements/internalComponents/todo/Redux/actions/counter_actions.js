define(["exports"],function(_exports){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.decreaseCounter=_exports.increaseCounter=_exports.DECREASE_COUNTER=_exports.INCREASE_COUNTER=void 0;/*
* Action types
*/const INCREASE_COUNTER="INCREASE_COUNTER";_exports.INCREASE_COUNTER=INCREASE_COUNTER;const DECREASE_COUNTER="DECREASE_COUNTER";/*
* Action creators
*/_exports.DECREASE_COUNTER=DECREASE_COUNTER;const increaseCounter=()=>{return{type:INCREASE_COUNTER}};_exports.increaseCounter=increaseCounter;const decreaseCounter=()=>{return{type:DECREASE_COUNTER}};_exports.decreaseCounter=decreaseCounter});