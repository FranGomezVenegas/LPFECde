import{PolymerElement,html}from"../../../../node_modules/@polymer/polymer/polymer-element.js";/**
 * `todo-stats` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */class TodoStats extends PolymerElement{static get properties(){return{todos:{type:Array,observer:"_completeCount"},completedTodos:Number}}static get template(){return html`
      <p>Tenemos [[todos.length]] tareas cargadas</p>
      <p>De las cuales [[completedTodos]] tareas están completadas</p>

    `}_completeCount(todos){let count=0;todos.map(function(todo){if(todo.completed){count++}});this.completedTodos=count}/**
   * Instance of the element is created/upgraded. Use: initializing state,
   * set up event listeners, create shadow dom.
   * @constructor
   */constructor(){super()}/**
   * Use for one-time configuration of your component after local
   * DOM is initialized.
   */ready(){super.ready()}}customElements.define("todo-stats",TodoStats);