import{LitElement,html,css}from"../../../../../node_modules/lit-element/lit-element.js";import{store}from"../../../../store.js";import{connect}from"../../../../../node_modules/pwa-helpers/connect-mixin.js";import{appProcedureListFake}from"../03config/fakejson.js";import"../../../internalComponents/form-fields/field-controller.js";import"./components/procedures-list.js";class ProcedureManagement extends connect(store)(LitElement){static get styles(){return css`
      :host {
        display: block;
      }
    `}static get properties(){return{apiProceduresList:{type:Array}}}firstUpdated(){}constructor(){super();this.apiProceduresList=appProcedureListFake}render(){return html`
    <div>
      <procedures-list></procedures-list>
    </div>    
    `}stateChanged(state){}}customElements.define("procedure-management",ProcedureManagement);