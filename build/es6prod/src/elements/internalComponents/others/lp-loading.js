define(["../../../../node_modules/lit-element/lit-element.js","../../../store.js","../../../../node_modules/pwa-helpers/connect-mixin.js","../../../../node_modules/dile-spinner/dile-spinner-modal.js"],function(_litElement,_store,_connectMixin,_dileSpinnerModal){"use strict";class LpLoading extends(0,_connectMixin.connect)(_store.store)(_litElement.LitElement){static get styles(){return _litElement.css`
      :host {
        display: block;
        --dile-spinner-color: #a1fdd0;
        --dile-spinner-modal-box-color: var(--paper-light-blue-500);        
      }
    `}static get properties(){return{loading:{type:Boolean}}}constructor(){super();this.loading=!1}render(){return _litElement.html`
      <dile-spinner-modal ?active=${this.loading}></dile-spinner-modal>        
    `}stateChanged(state){this.loading=state.app.user.loading}}customElements.define("lp-loading",LpLoading)});