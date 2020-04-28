define(["../../../../../../node_modules/lit-element/lit-element.js","../../../../../store.js","../../../../../../node_modules/pwa-helpers/connect-mixin.js","../../03config/fakejson.js"],function(_litElement,_store,_connectMixin,_fakejson){"use strict";class ProceduresList extends(0,_connectMixin.connect)(_store.store)(_litElement.LitElement){static get styles(){return _litElement.css`
      :host {
        display: block;
      }
    `}static get properties(){return{}}constructor(){super()}render(){return _litElement.html`
      <p>${_fakejson.appProcedureListFake.map(item=>_litElement.html`
      ${item.name}
      <field-controller id="${item.name}" .field=${item} @field-list-value-changed=${this.onListChange}></field-controller>`)}</p>
    `}stateChanged(state){}onListChange(e){var selProcedure=e.detail.value;selProcedure=selProcedure.replace("__","");console.log("onListChange",e.detail.value,selProcedure)}}customElements.define("procedures-list",ProceduresList)});