import {
  DO_LOADING,
  SAVE_POST_LIST
} from '../actions/posts_actions.js'

const INITIAL_STATE = {
  posts: [],
  loading: false
};

const postsReducer = (state = INITIAL_STATE, action) => {
  // console.log('postReducer', state, action);
  switch(action.type) {
    case SAVE_POST_LIST:
      return {
        posts: [...action.posts],
        loading: false
      }
    case DO_LOADING:
      return {
        posts: [...state.posts],
        loading: true
      }
    default:
      return state
  }
}

export default postsReducer;