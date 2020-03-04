/*
* Action types
*/
export const INCREASE_COUNTER = 'INCREASE_COUNTER';
export const DECREASE_COUNTER = 'DECREASE_COUNTER';

/*
* Action creators
*/
export const increaseCounter = () => {
  return {
    type: INCREASE_COUNTER
  }
}

export const decreaseCounter = () => {
  return {
    type: DECREASE_COUNTER
  }
}