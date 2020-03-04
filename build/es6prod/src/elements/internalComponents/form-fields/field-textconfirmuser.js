define(["../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../node_modules/pwa-helpers/connect-mixin.js","../../../store.js","../../../../node_modules/@vaadin/vaadin-text-field/vaadin-text-field.js","../../../../node_modules/@vaadin/vaadin-text-field/vaadin-password-field.js","../../app/app-functions/fields-methods.js"],function(_polymerElement,_connectMixin,_store,_vaadinTextField,_vaadinPasswordField,_fieldsMethods){"use strict";//import '@polymer/paper-input/paper-input';
class FieldTextconfirmuser extends(0,_fieldsMethods.FieldsMethods)((0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement)){static get properties(){return{field:{type:Object,observer:"fieldChange",notify:!0},type:{type:String,notify:!0},value:{type:String,notify:!0},fieldClass:String,numConfirmations:Number,readOnly:{type:Boolean,value:!1},iAm:{type:Object,value:function(){return{button:!1,checkBox:!1}}}}}stateChanged(state){this.selectedLanguage=state.app.user.appLanguage;this.numConfirmations=state.confirmUserDialog.numConfirmations;//console.log('field-textconfirmuser >> numConfirmations', this.numConfirmations);
if(0<this.numConfirmations){this.readOnly=!0;this.fieldClass="paperInput";this.$.userToCheck.value=state.app.user.userDB;//this.$.userToCheck.readOnly=true;
this.$.userToCheck.backgroundColor="rgba("+[0,0,0,.12].join(",")+")";//'rgba(' + '0' + ',' + '0' + ',' + '0' + ',' + '0.12' + ')'; //rgba(0, 0, 0, 0.12);      
}else{this.$.userToCheck.value="";//this.$.userToCheck.readOnly=false;
this.readOnly=!1;this.fieldClass="paperInputLocked"}//this.$.pwToCheck.value='';              
}textClass(langApp){if("en"==langApp){this.fieldClass="x-field.myCustomFieldRed";return}this.fieldClass="x-field.myCustomFieldBlue";return}textType(){return"false"==this.field.password}textTypePassword(){return"true"==this.field.password}textTypeConfidential(){return"confidential"==this.field.password}fieldChange(newField){switch(newField.showDisplayPasswordType){case"Button":this.set("iAm.button",!0);break;case"CheckBox":this.set("iAm.checkBox",!0);break;}}static get template(){return _polymerElement.html`    
    <style>
      paperInput {
        color: #0085ffe6;
      }
      paperInputLocked {
        color:rgba(0,0,0,0.12);
      }      
      .required {
        color: #ffff;
      }
      .btn {
          position: absolute;
          font-family: 'FontAwesome';
          top: 0;
          left: 10px;
          content: "\f005";
      }
      .input {
          padding: 12px 20px;
          margin: 8px 0;
          display: inline-block;
          border: 1px solid #ccc;
          border-radius: 16px;
          box-sizing: border-box;
          color: Red;
      }    
      .x-field.myCustomFieldRed input {
          color: Red;
      }
      .x-field.myCustomFieldBlue input {
          color: Blue;
      }        
    </style>
    <paper-input class$="{{fieldClass}}" type="{{field.type}}" id="userToCheck" 
      required label="{{labelValue(selectedLanguage, field)}}" value="{{value}}" 
      auto-validate="{{field.required}}" 
      readonly="{{readOnly}}"></paper-input>
    `}}customElements.define("field-textconfirmuser",FieldTextconfirmuser)});