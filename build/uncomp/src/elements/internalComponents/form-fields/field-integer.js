import{PolymerElement,html}from"../../../../node_modules/@polymer/polymer/polymer-element.js";import{connect}from"../../../../node_modules/pwa-helpers/connect-mixin.js";import{store}from"../../../store.js";import"../../../../node_modules/@polymer/paper-checkbox/paper-checkbox.js";import{FieldsMethods}from"../../app/app-functions/fields-methods.js";class FieldInteger extends FieldsMethods(connect(store)(PolymerElement)){static get properties(){return{value:{type:Number,notify:!0}}}stateChanged(state){this.selectedLanguage=state.app.user.appLanguage}static get template(){return html`    
    <h3>{{labelValue(selectedLanguage, field)}} {{value}} </h3>      
        
    <template is="dom-if" if="{{!field.read_only}}">
      <p>
        <vaadin-button on-click="decrementar"><iron-icon icon="remove"></iron-icon></vaadin-button>
        <vaadin-button on-click="incrementar"><iron-icon icon="add"></iron-icon></vaadin-button>
      </p>
    </template>
    `}incrementar(){if(null==this.field.value){this.field.value=1;this.value=1;return}if(null==this.field.maxValue){this.field.value++;this.value++;return}if(this.field.value<this.field.maxValue){this.field.value++;this.value++}}decrementar(){if(null==this.field.value){this.field.value=0;this.value=0;return}if(null==this.field.maxValue){this.field.value--;this.value--;return}if(this.field.minValue<this.field.value){this.field.value--;this.value--}}}customElements.define("field-integer",FieldInteger);