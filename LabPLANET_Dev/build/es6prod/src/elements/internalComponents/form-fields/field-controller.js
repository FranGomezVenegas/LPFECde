define(["../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../node_modules/@polymer/polymer/lib/elements/dom-if.js","./field-boolean.js","./field-list.js","./field-date.js","./field-text.js","./field-textconfirmuser.js","./field-logo-circle.js","./field-avatar.js","./field-google-fonts.js","./field-tree-list.js","./field-button.js","./field-title.js","./field-button-group.js","./field-integer.js","./field-icon-button.js"],function(_polymerElement,_domIf,_fieldBoolean,_fieldList,_fieldDate,_fieldText,_fieldTextconfirmuser,_fieldLogoCircle,_fieldAvatar,_fieldGoogleFonts,_fieldTreeList,_fieldButton,_fieldTitle,_fieldButtonGroup,_fieldInteger,_fieldIconButton){"use strict";class FieldController extends _polymerElement.PolymerElement{static get properties(){return{field:{type:Object,observer:"fieldChange",notify:!0},selectedLanguage:{type:String,notify:!0},iAm:{type:Object,value:function(){return{boolean:!1,date:!1,list:!1,text:!1,logoCircle:!1,avatar:!1,googleFonts:!1,treeList:!1,button:!1,buttonGroup:!1,integer:!1,badge:!1,iconButton:!1}}}}}static get template(){return _polymerElement.html`
      <div class="card">      
      <template is="dom-if" if="{{iAm.boolean}}" >
        <field-boolean field="[[field]]" value="{{field.value}}" ></field-boolean>
      </template>
      <template is="dom-if" if="{{iAm.date}}">
      <field-date field="[[field]]" value="{{field.value}}" ></field-date>
      </template>
      <template is="dom-if" if="{{iAm.list}}">
        <field-list id="fieldlist" field="[[field]]" value="{{field.value}}" ></field-list>
      </template>
      <template is="dom-if" if="{{iAm.text}}">
        <field-text type="{{field.type}}" field="{{field}}" value="{{field.value}}" ></field-text>
      </template>
      <template is="dom-if" if="{{iAm.logoCircle}}">
        <field-logo-circle field="[[field]]" value="{{field.value}}" ></field-logo-circle>
      </template>  
      <template is="dom-if" if="{{iAm.avatar}}">
        <field-avatar field="[[field]]" value="{{field.value}}" ></field-avatar>
      </template>      
      <template is="dom-if" if="{{iAm.googleFonts}}">
        <field-google-fonts field="[[field]]" value="{{field.value}}"></field-google-fonts>
      </template>      
      <template is="dom-if" if="{{iAm.treeList}}">
        <field-tree-list procedure="[[procedure]]" field="[[field]]" value="{{field.value}}"></field-tree-list>
      </template>         
      <template is="dom-if" if="{{iAm.button}}">
        <field-button field="{{field}}" value="{{field.value}}"></field-button>
      </template>        
      <template is="dom-if" if="{{iAm.title}}">
        <field-title field="{{field}}" value="{{field.value}}"></field-title>
      </template>        
      <template is="dom-if" if="{{iAm.buttonGroup}}">
        <field-button-group field="{{field}}" value="{{field.value}}"></field-button-group>
      </template>  
      <template is="dom-if" if="{{iAm.integer}}">      
        <field-integer field="{{field}}" value="{{field.value}}"></field-integer>
      </template>                    
      <template is="dom-if" if="{{iAm.badge}}">      
        <field-badge field="{{field}}" value="{{field.value}}"></field-badge>
      </template>    
      <template is="dom-if" if="{{iAm.textconfirmuser}}">
        <field-textconfirmuser type="{{field.type}}" field="{{field}}" value="{{field.value}}" ></field-textconfirmuser>
      </template>
      <template is="dom-if" if="{{iAm.iconButton}}">
        <field-icon-button type="{{field.type}}" field="{{field}}" value="{{field.value}}" ></field-icon-button>
      </template>
      </div>
    `}listChange(newList){this.field-list}fieldChange(newField){switch(newField.type){case"boolean":this.set("iAm.boolean",!0);break;case"list":this.set("iAm.list",!0);break;case"date":this.set("iAm.date",!0);break;case"text":this.set("iAm.text",!0);break;case"password":this.set("iAm.text",!0);break;case"logo-circle":this.set("iAm.logoCircle",!0);break;case"avatar":this.set("iAm.avatar",!0);break;case"google-fonts":this.set("iAm.googleFonts",!0);break;case"tree-list":this.set("iAm.treeList",!0);break;case"button":this.set("iAm.button",!0);break;case"title":this.set("iAm.title",!0);break;case"button-group":this.set("iAm.buttonGroup",!0);break;case"integer":this.set("iAm.integer",!0);break;case"badge":this.set("iAm.badge",!0);break;case"textconfirmuser":this.set("iAm.textconfirmuser",!0);break;case"icon-button":this.set("iAm.iconButton",!0);break;}}}customElements.define("field-controller",FieldController)});