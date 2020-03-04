import{PolymerElement,html}from"../../../../node_modules/@polymer/polymer/polymer-element.js";import{connect}from"../../../../node_modules/pwa-helpers/connect-mixin.js";import{store}from"../../../store.js";import{FieldsMethods}from"../../app/app-functions/fields-methods.js";import"../../../../node_modules/@polymer/paper-checkbox/paper-checkbox.js";import"../../../config/styles/form-fields-style.js";class FieldBoolean extends FieldsMethods(connect(store)(PolymerElement)){static get properties(){return{value:{type:Date,value:!1,notify:!0}}}stateChanged(state){this.selectedLanguage=state.app.user.appLanguage}static get template(){return html`
    <style include="form-fields-style"></style>
    <span>
      <br><paper-checkbox [[name]] class="formFieldBoolean" checked="{{value}}" aligned="center" disabled="{{field.read_only}}">{{labelValue(selectedLanguage, field)}}  
      </paper-checkbox>
      </span>      
    `}}customElements.define("field-boolean",FieldBoolean);