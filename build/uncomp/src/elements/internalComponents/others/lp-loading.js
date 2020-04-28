import{LitElement,html,css}from"../../../../node_modules/lit-element/lit-element.js";import{store}from"../../../store.js";import{connect}from"../../../../node_modules/pwa-helpers/connect-mixin.js";import"../../../../node_modules/dile-spinner/dile-spinner-modal.js";class LpLoading extends connect(store)(LitElement){static get styles(){return css`
      :host {
        display: block;
        --dile-spinner-color: #a1fdd0;
        --dile-spinner-modal-box-color: var(--paper-light-blue-500);        
      }
    `}static get properties(){return{loading:{type:Boolean}}}constructor(){super();this.loading=!1}render(){return html`
      <dile-spinner-modal ?active=${this.loading}></dile-spinner-modal>        
    `}stateChanged(state){this.loading=state.app.user.loading}}customElements.define("lp-loading",LpLoading);