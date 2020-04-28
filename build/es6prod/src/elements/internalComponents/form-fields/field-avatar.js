define(["../../../../node_modules/@polymer/polymer/polymer-element.js","../../../config/styles/form-fields-style.js"],function(_polymerElement,_formFieldsStyle){"use strict";class FieldAvatar extends _polymerElement.PolymerElement{static get properties(){return{field:{type:Object,notify:!0},value:{type:String,notify:!0},selectedLanguage:String}}static get template(){return _polymerElement.html`            
            <style include="form-fields-style">
              button {
                background: transparent;
                border: none !important;
                font-size:0;
              }
            </style>
            <!-- <vaadin-button on-click="clicked"  class="button" value="{{field.name}}"> -->
              <img class="formFieldAvatar"  on-click="clicked" src="{{field.source}}" aligned="center"  height="50" width="50"> 
              <!-- </vaadin-button> -->
        `}clicked(){this.dispatchEvent(new CustomEvent("avatar-item-clicked",{bubbles:!0,composed:!0,detail:{avatarName:this.field.name,value:this.value,avatarDefinition:this.field}}))}}customElements.define("field-avatar",FieldAvatar)});