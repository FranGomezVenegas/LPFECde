import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../store';
import {FieldsMethods} from '../../app/app-functions/fields-methods';
import '@polymer/paper-icon-button/paper-icon-button';

class FieldIconButton extends FieldsMethods(connect(store)(PolymerElement)) {
  static get properties() {
    return {
      field: {        type: Object,        notify: true      },
      value: {        type: String,        notify: true              },
      selectedLanguage: String
    }
  }
  stateChanged(state) {
    this.selectedLanguage = state.app.user.appLanguage;        
  }   
  static get template() {
    return html`  
    <paper-icon-button style="{{styleDefinition()}}" icon="{{field.icon_name}}" title="{{labelValue(selectedLanguage, field)}}"
      on-click="clicked"  disabled="{{field.read_only}}" value="{{field.name}}" ></paper-icon-button>
    `;
  }  

  styleDefinition(){
    if (this.field.read_only){return 'color:var(--lumo-disabled-text-color);'}
    return !this.field.icon_color ? 'color:cornflowerblue;': 'color:'+this.field.icon_color+';'; 
  }
  clicked(){
    var proc=[];
    if (this.procedure){
      proc=this.procedure;
      var procLabelEn="";
      if (this.procedure.label_en){procLabelEn=this.procedure.label_en;}
  
    }
    var fieldLabelEn="";
    if (this.field.label_en){fieldLabelEn=this.field.label_en;}
    this.dispatchEvent(new CustomEvent('field-button-clicked', {
      bubbles: true,
      composed: true,
      detail: {'buttonName': this.field.name,'value': this.value, 'buttonDefinition': this.field,
      'procEvent': this.field,'procedure': proc, 'tabName_en': procLabelEn+'-'+fieldLabelEn}
    }));    
  }
}
customElements.define('field-icon-button', FieldIconButton);