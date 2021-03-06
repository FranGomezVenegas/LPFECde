import{PolymerElement,html}from"../../../../node_modules/@polymer/polymer/polymer-element.js";import"../../../../node_modules/@vaadin/vaadin-checkbox/vaadin-checkbox.js";import"../../../../node_modules/@vaadin/vaadin-item/vaadin-item.js";/**
 * `todo-item` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */class TodoItem extends PolymerElement{static get properties(){return{todo:{type:Object},itemClass:{type:String,computed:"itemClassCompute(todo)"}}}static get template(){return html`
      <style>
        :host {
          display: block;
        }
        div {
          display: inline-block;
        }
        .completed {
          text-decoration: line-through;
        }
      </style>
      <vaadin-item on-click="cambiarEstado">
        <vaadin-checkbox checked="[[todo.completed]]">
          [[todo.id]]: <span class$="[[itemClass]]">[[todo.text]]</span>
        </vaadin-checkbox>
      </vaadin-item>
    `}cambiarEstado(){//console.log('cambiar estado en todo-item', this.index)
this.dispatchEvent(new CustomEvent("cambia-estado",{bubbles:!0,composed:!0,detail:{id:this.todo.id}}))}itemClassCompute(todo){if(todo.completed){return"completed"}return""}}customElements.define("todo-item",TodoItem);