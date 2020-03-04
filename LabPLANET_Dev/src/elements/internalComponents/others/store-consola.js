import {html, PolymerElement} from '@polymer/polymer/polymer-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../store';

class storeConsola extends connect(store)(PolymerElement) {
    static get properties() {
        return {
            userName: String            
        }
    }
    static get template() {
        return html`
            <!-- <template is="dom-if" if="{{showMostrarStoreButton()}}"> -->
            <vaadin-button on-click="mostrarStore">Log store en consola</vaadin-button>
            <!-- </template>  -->
        `;
    }
    showMostrarStoreButton(){
        if (this.userName=='labplanet'){return true;}
        //if (this.userName=='fgomez'){return true;}
        return false;
    }
    mostrarStore() {
        console.log(store.getState());
    }
    stateChanged(state) {
        this.loggedIn = state.app.user.loggedIn;
        this.userName = state.app.user.userDB;
    }      
}
customElements.define('store-consola', storeConsola);