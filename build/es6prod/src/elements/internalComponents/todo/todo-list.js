define(["../../../../node_modules/@polymer/polymer/polymer-element.js"],function(_polymerElement){"use strict";/**
 * `todo-list` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */class TodoList extends _polymerElement.PolymerElement{static get properties(){return{todos:Array}}static get template(){return _polymerElement.html`
    <style>
    .sin-todos {
      padding: 10px 15px;
      margin: 15px 0;
      background-color: #f5f5f5;
      color: #a99;
      border: 1px solid #f5dfdf;
      border-radius: 3px;
      font-size: 0.85em;
    }
    h1 {
      @apply --paper-font-headline;
    }
    </style>
    <h1>Todo list</h1>

    <template is="dom-repeat" items="[[todos]]">
      <todo-item 
        todo="[[item]]" 
      ></todo-item>
    </template>
    <template is="dom-if" if="[[!todos.length]]">
      <p class="sin-todos">No tengo todos</p>
    </template>
    `}}customElements.define("todo-list",TodoList)});