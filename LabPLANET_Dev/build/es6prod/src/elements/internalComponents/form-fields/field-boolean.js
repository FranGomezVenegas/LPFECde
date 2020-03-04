define(["../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../node_modules/pwa-helpers/connect-mixin.js","../../../store.js","../../app/app-functions/fields-methods.js","../../../../node_modules/@polymer/paper-checkbox/paper-checkbox.js","../../../config/styles/form-fields-style.js"],function(_polymerElement,_connectMixin,_store,_fieldsMethods,_paperCheckbox,_formFieldsStyle){"use strict";class FieldBoolean extends(0,_fieldsMethods.FieldsMethods)((0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement)){static get properties(){return{value:{type:Date,value:!1,notify:!0}}}stateChanged(state){this.selectedLanguage=state.app.user.appLanguage}static get template(){return _polymerElement.html`
    <style include="form-fields-style"></style>
    <span>
      <br><paper-checkbox [[name]] class="formFieldBoolean" checked="{{value}}" aligned="center" disabled="{{field.read_only}}">{{labelValue(selectedLanguage, field)}}  
      </paper-checkbox>
      </span>      
    `}}customElements.define("field-boolean",FieldBoolean)});