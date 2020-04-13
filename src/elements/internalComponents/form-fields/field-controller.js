import {PolymerElement, html} from '@polymer/polymer/polymer-element';

import '@polymer/polymer/lib/elements/dom-if';
import './field-boolean';
import './field-list';
import './field-date';
import './field-text';
import './field-text-area';
import './field-textconfirmuser';
import './field-logo-circle';
import './field-avatar';
import './field-google-fonts';
import './field-tree-list';
import './field-button';
import './field-title';
import './field-button-group';
import './field-integer';
import './field-icon-button';

class FieldController extends PolymerElement {
  static get properties() {
    return {
      field: {type: Object,observer: 'fieldChange', notify: true},
      selectedLanguage: {type: String,notify: true},        
      iAm: {type: Object,
        value: function() {
          return {
            boolean: false,            date: false,            list: false,           text: false,      textArea: false, 
            logoCircle: false,         avatar: false,          googleFonts: false,    treeList: false,  iconButton: false,
            button: false,              buttonGroup: false,    integer: false,        badge: false            
          }
        }
      }
    }

  }
  resetIAms(){
    this.set('iAm.boolean', false);   this.set('iAm.date', false);        this.set('iAm.list', false);        this.set('iAm.text', false); this.set('iAm.textArea', false);
    this.set('iAm.logoCircle', false);this.set('iAm.avatar', false);      this.set('iAm.googleFonts', false); this.set('iAm.treeList', false); this.set('iAm.iconButton', false);
    this.set('iAm.button', false);    this.set('iAm.buttonGroup', false); this.set('iAm.integer', false);     this.set('iAm.badge', false);    
  }
  static get template() {
    return html`
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
      <template is="dom-if" if="{{iAm.textArea}}">
        <field-text-area type="{{field.type}}" field="{{field}}" value="{{field.value}}" ></field-text-area>
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
        <field-icon-button procedure="[[procedure]]" type="{{field.type}}" field="{{field}}" value="{{field.value}}" ></field-icon-button>
      </template>
      </div>
    `;
  }
  listChange(newList) {
    this.field-list
  }
  fieldChange(newField) {
    this.resetIAms();
    switch(newField.type) {
      case 'boolean':
        this.set('iAm.boolean', true);
        break;
      case 'list':
        this.set('iAm.list', true);
        //this.set('iAm.text', false);
        break;
      case 'date':
        this.set('iAm.date', true);
        break;
      case 'text':
        this.set('iAm.text', true);
        break;
      case 'text-area':
        this.set('iAm.textArea', true);
        break;    
      case 'password':
        this.set('iAm.text', true);
        break;    
      case 'logo-circle':
        this.set('iAm.logoCircle', true);
        break;        
      case 'avatar':
        this.set('iAm.avatar', true);
        break; 
      case 'google-fonts':
        this.set('iAm.googleFonts', true);
        break;       
      case 'tree-list':
        this.set('iAm.treeList', true);
        break;     
      case 'button':
        this.set('iAm.button', true);
        break;                                        
      case 'title':
        this.set('iAm.title', true);
        break;                                        
      case 'button-group':
        this.set('iAm.buttonGroup', true);
        break;        
      case 'integer':
        this.set('iAm.integer', true);
        break;                                         
      case 'badge':
        this.set('iAm.badge', true);
        break; 
      case 'textconfirmuser':
        this.set('iAm.textconfirmuser', true);
        break;    
      case 'icon-button':
        this.set('iAm.iconButton', true);
        break;    
    }    
  }
}
customElements.define('field-controller', FieldController);