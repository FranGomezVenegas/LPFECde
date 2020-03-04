import{PolymerElement,html}from"../../../../node_modules/@polymer/polymer/polymer-element.js";import"../../../../node_modules/@vaadin/vaadin-radio-button/vaadin-radio-button.js";import"../../../../node_modules/@vaadin/vaadin-radio-button/vaadin-radio-group.js";/**
 * `imperative-link` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */class ImperativeLink extends PolymerElement{static get properties(){return{target:String}}static get template(){return html`
    <style>
    vaadin-radio-button {
      display: block;
      margin-bottom: 10px;
    }
    h1 {
      @apply --paper-font-headline;
    }
    </style>
    <h1>Selecciona tu sección y navega</h1>

    <vaadin-radio-group value="{{target}}">
      
        <vaadin-radio-button value="todos">
          Definir TODOS
        </vaadin-radio-button>
      
      
        <vaadin-radio-button value="stats">
          Ver estadísticas
        </vaadin-radio-button>
      
    </vaadin-radio-group>
    <p>Selección: [[target]]</p>
    <vaadin-button on-click="navegar">Navegar imperativamente</vaadin-button>

    `}navegar(){if(!this.target){return!1}let newLocation;if("todos"==this.target){newLocation="/"}else{newLocation="/estadisticas"}this.doNavigation(newLocation)}doNavigation(newLocation){window.history.pushState({},"",newLocation);this.dispatchEvent(new CustomEvent("navigate",{bubbles:!0,composed:!0,detail:{location:newLocation}}))}}customElements.define("imperative-link",ImperativeLink);