import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-spinner/paper-spinner.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

import {
  getPosts
} from '../../../actions/posts_actions';
import postsReducer from '../../../reducers/posts_reducers';

import { store } from '../../../store.js';
store.addReducers({
  post: postsReducer
});

/**
 * `post-list` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class PostList extends connect(store)(PolymerElement) {
  static get properties() {
    return {
      _loading: {
        type: Boolean,
        value: false
      },
      _posts: Array
    }
  }

  static get template() {
    return html`
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
    `;
  }

  /**
   * Use for one-time configuration of your component after local
   * DOM is initialized.
   */
  ready() {
    super.ready();
    store.dispatch(getPosts());
  }

  stateChanged(state) {
    console.log('stateChanged post-list', state);
    this._loading = state.post.loading;
    this._posts = state.post.posts;
  }
}

customElements.define('post-list', PostList);