import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../store';
import {FieldsMethods} from '../../app/app-functions/fields-methods';
import './../../../config/styles/form-fields-style'
class FieldTitle extends FieldsMethods(connect(store)(PolymerElement)) {
  stateChanged(state) {
    this.selectedLanguage = state.app.user.appLanguage;        
  }   
  static get template() {
    return html`    
      <style include="form-fields-style"></style>
      <h2 class="formFieldTitle">{{labelValue(selectedLanguage, field)}}<h2>    
    `;
  }
}
customElements.define('field-title', FieldTitle);