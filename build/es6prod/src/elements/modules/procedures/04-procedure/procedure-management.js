define(["../../../../../node_modules/lit-element/lit-element.js","../../../../store.js","../../../../../node_modules/pwa-helpers/connect-mixin.js","../03config/fakejson.js","../../../internalComponents/form-fields/field-controller.js","./components/procedures-list.js"],function(_litElement,_store,_connectMixin,_fakejson,_fieldController,_proceduresList){"use strict";class ProcedureManagement extends(0,_connectMixin.connect)(_store.store)(_litElement.LitElement){static get styles(){return _litElement.css`
      :host {
        display: block;
      }
    `}static get properties(){return{apiProceduresList:{type:Array}}}firstUpdated(){}constructor(){super();this.apiProceduresList=_fakejson.appProcedureListFake}render(){return _litElement.html`
    <div>
      <procedures-list></procedures-list>
    </div>    
    `}stateChanged(state){}}customElements.define("procedure-management",ProcedureManagement)});