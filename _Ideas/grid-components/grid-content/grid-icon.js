import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-icon-button/paper-icon-button';

class GridIcon extends PolymerElement {
    static get properties() {
        return {            
            source: {type:String, value:'./images/certificado.png'},
        }
    }

    static get template() {
        return html`
 
        <!-- <paper-icon-button icon="{{source}}"></paper-icon-button>         -->
            <img aligned="center" alt="LabPLANET" height="80" width="100" src="{{source}}">   
        `;
    }

}

customElements.define('grid-icon', GridIcon);