define(["../../../../node_modules/@polymer/polymer/polymer-element.js","../../../config/styles/form-fields-style.js"],function(_polymerElement,_formFieldsStyle){"use strict";class FieldAvatar extends _polymerElement.PolymerElement{static get template(){return _polymerElement.html`            
            <style include="form-fields-style"></style>
            <img class="formFieldAvatar" src="{{field.source}}" aligned="center"  height="80" width="80"> 
        `}}customElements.define("field-avatar",FieldAvatar)});