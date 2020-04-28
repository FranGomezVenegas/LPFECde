import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import './../../../config/styles/form-fields-style';

class FieldAvatar extends PolymerElement {
    static get properties() {
        return {
          field: {        type: Object,        notify: true      },
          value: {        type: String,        notify: true              },
          selectedLanguage: String
        }
    }    
    static get template() {
        return html`            
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
        `;
    }
    clicked(){        
        this.dispatchEvent(new CustomEvent('avatar-item-clicked', {
          bubbles: true,
          composed: true,
          detail: {'avatarName': this.field.name,'value': this.value, 'avatarDefinition': this.field}
        }));    
      }    
}
customElements.define('field-avatar', FieldAvatar);