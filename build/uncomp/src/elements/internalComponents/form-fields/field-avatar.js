import{PolymerElement,html}from"../../../../node_modules/@polymer/polymer/polymer-element.js";import"../../../config/styles/form-fields-style.js";class FieldAvatar extends PolymerElement{static get template(){return html`            
            <style include="form-fields-style"></style>
            <img class="formFieldAvatar" src="{{field.source}}" aligned="center"  height="80" width="80"> 
        `}}customElements.define("field-avatar",FieldAvatar);