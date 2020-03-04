/*
* Action types
*/
export const SAVE_POST_LIST = 'SAVE_POST_LIST';
export const DO_LOADING = 'DO_LOADING'

/*
* Action creators
*/
export const getPosts = () => (dispatch) => {
  dispatch(doLoading());

  axios.get('https://jsonplaceholder.typicode.com/posts')
    .then((res) => {
      console.log('axios response', res);
      dispatch(savePostList(res.data))
    })
}

const doLoading = () => {
  return {
    type: DO_LOADING
  } 
}

const savePostList = (data) => {
  return {
    type: SAVE_POST_LIST,
    posts: data
  }
}