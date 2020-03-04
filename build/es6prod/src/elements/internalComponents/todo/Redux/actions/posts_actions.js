define(["exports"],function(_exports){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.getPosts=_exports.DO_LOADING=_exports.SAVE_POST_LIST=void 0;/*
* Action types
*/const SAVE_POST_LIST="SAVE_POST_LIST";_exports.SAVE_POST_LIST=SAVE_POST_LIST;const DO_LOADING="DO_LOADING";/*
* Action creators
*/_exports.DO_LOADING=DO_LOADING;const getPosts=()=>dispatch=>{dispatch(doLoading());axios.get("https://jsonplaceholder.typicode.com/posts").then(res=>{console.log("axios response",res);dispatch(savePostList(res.data))})};_exports.getPosts=getPosts;const doLoading=()=>{return{type:DO_LOADING}},savePostList=data=>{return{type:SAVE_POST_LIST,posts:data}}});