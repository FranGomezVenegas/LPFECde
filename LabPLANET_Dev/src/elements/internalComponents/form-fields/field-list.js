import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../store';

import '@polymer/paper-dropdown-menu/paper-dropdown-menu';
import '@polymer/paper-item/paper-item';
import '@polymer/paper-listbox/paper-listbox';
import '@polymer/polymer/lib/elements/dom-repeat';

import {FieldsMethods} from '../../app/app-functions/fields-methods';

class FieldList extends FieldsMethods(connect(store)(PolymerElement)) {
  static get observers() {
    return [
      'changeListValueObserver(field.value)'
    ];
  }
  stateChanged(state) {    
    this.selectedLanguage = state.app.user.appLanguage;        
  }     
  changeListValueObserver(newVal) {
    
    var findSeparator = newVal.search("-");
    //console.log('changeListValueObserver', 'newVal', newVal, 'this.field', this.field, 'findSeparator', findSeparator);
    if (findSeparator>-1){
      var newValStr=newVal.substring(0, findSeparator);
      var indexVal = newVal.substring(findSeparator+1, newVal.length);
      indexVal = indexVal.trim();
      var newValInt = parseInt(indexVal, 10);
    }else{
      var newValStr=newVal;
      var newValInt = -1;
    }
    var newValNoIndex="spec";
    //console.log('changeListValueObserver', 'newValStr', newValStr, 'newValInt', newValInt, 'indexVal', indexVal);    
    this.dispatchEvent(new CustomEvent('field-list-value-changed', {
      bubbles: true,
      composed: true,
      detail: {
        'name': this.field.name,
        'value_no_index': newValNoIndex,
        'value': newValStr, //newVal,
        'index': newValInt, //index,
        //'thisindex': this.field.index
      }
    }));
    this.value=newVal;
  }
  static get properties() {
    return {
      field: {        type: Object,        notify: true      },
      value: {        type: String,        notify: true      },
      index: Number, fieldIndex: Number      
    }
  }
  changeList(newList) {
    this.set('field.items', newList);
  }

  static get template() {
    return html`      
        <paper-dropdown-menu  width="200px" label="{{labelValue(selectedLanguage, field)}}" name="{{field.name}}"  no-animations required disabled="{{field.read_only}}">
        <paper-listbox class="dropdown-content" slot="dropdown-content" selected="{{field.value}}" attr-for-selected="item-name">
          <template is="dom-repeat" items="[[field.items]]">
            <paper-item  field-index="{{index}}" index="{{index}}" item-name="[[item.keyName]]-{{index}}">
            {{labelListValue(selectedLanguage, item)}}
            </paper-item>
          </template>
        </paper-listbox>
      </paper-dropdown-menu>         
    `;
  }
}
customElements.define('field-list', FieldList);