define(["../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../node_modules/@polymer/paper-spinner/paper-spinner.js","../../../../node_modules/pwa-helpers/connect-mixin.js","../../../actions/posts_actions","../../../reducers/posts_reducers","../../../store.js"],function(_polymerElement,_paperSpinner,_connectMixin,_posts_actions,_posts_reducers,_store){"use strict";_posts_reducers=babelHelpers.interopRequireDefault(_posts_reducers);_store.store.addReducers({post:_posts_reducers.default});/**
 * `post-list` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */class PostList extends(0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement){static get properties(){return{_loading:{type:Boolean,value:!1},_posts:Array}}static get template(){return _polymerElement.html`
    <style>
    h1 {
      @apply --paper-font-headline;
    }
    .postlist {
      max-height: 400px;
      overflow: auto;
    }
    </style>
    <h1>post list</h1>
    <paper-spinner active="[[_loading]]"></paper-spinner>
    <div class="postlist">
    <template is="dom-repeat" items="[[_posts]]" as="post">
      <p>[[post.title]]</p>
    </template>
    </div>
    `}/**
   * Use for one-time configuration of your component after local
   * DOM is initialized.
   */ready(){super.ready();_store.store.dispatch((0,_posts_actions.getPosts)())}stateChanged(state){console.log("stateChanged post-list",state);this._loading=state.post.loading;this._posts=state.post.posts}}customElements.define("post-list",PostList)});