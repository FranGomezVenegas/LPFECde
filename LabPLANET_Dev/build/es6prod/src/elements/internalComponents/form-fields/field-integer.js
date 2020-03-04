define(["../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../node_modules/pwa-helpers/connect-mixin.js","../../../store.js","../../../../node_modules/@polymer/paper-checkbox/paper-checkbox.js","../../app/app-functions/fields-methods.js"],function(_polymerElement,_connectMixin,_store,_paperCheckbox,_fieldsMethods){"use strict";class FieldInteger extends(0,_fieldsMethods.FieldsMethods)((0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement)){static get properties(){return{value:{type:Number,notify:!0}}}stateChanged(state){this.selectedLanguage=state.app.user.appLanguage}static get template(){return _polymerElement.html`    
    <h3>{{labelValue(selectedLanguage, field)}} {{value}} </h3>      
        
    <template is="dom-if" if="{{!field.read_only}}">
      <p>
        <vaadin-button on-click="decrementar"><iron-icon icon="remove"></iron-icon></vaadin-button>
        <vaadin-button on-click="incrementar"><iron-icon icon="add"></iron-icon></vaadin-button>
      </p>
    </template>
    `}incrementar(){if(null==this.field.value){this.field.value=1;this.value=1;return}if(null==this.field.maxValue){this.field.value++;this.value++;return}if(this.field.value<this.field.maxValue){this.field.value++;this.value++}}decrementar(){if(null==this.field.value){this.field.value=0;this.value=0;return}if(null==this.field.maxValue){this.field.value--;this.value--;return}if(this.field.minValue<this.field.value){this.field.value--;this.value--}}}customElements.define("field-integer",FieldInteger)});