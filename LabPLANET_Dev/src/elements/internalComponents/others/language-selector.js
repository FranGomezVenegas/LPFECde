import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import { connect } from 'pwa-helpers/connect-mixin';
import '@polymer/paper-icon-button/paper-icon-button';
import '@material/mwc-switch/mwc-switch';

import { store } from '../../../store';
import { setAppLanguage } from '../../app/Redux/actions/app_actions';
import { default_language} from '../../../config/app-config';

class languageSelector extends connect(store)(PolymerElement) {
    static get properties() {
        return {
            selectedLanguage: {type: String, value: default_language, observer:'setDefaultLanguage'},
        }
    }
    stateChanged(state) {
        //console.log('stateChanged sample-reception', state);
        this.selectedLanguage = state.app.user.appLanguage;        
    }  

    static get template() {
        return html`                
            <paper-icon-button on-click="pressed" 
                src="https://banner2.kisspng.com/20180320/hde/kisspng-flag-of-spain-flag-of-the-united-states-national-f-spain-flags-icon-png-5ab0b60cb326e6.1242812115215303807338.jpg" 
                value="es" alt="Castellano" title="Castellano"></paper-icon-button>
            
            <mwc-formfield label="" name="langSwitch" >
                <mwc-switch id="appLanguageSelector" checked on-click="switchLanguage"></mwc-switch>
            </mwc-formfield>    
            
            <paper-icon-button on-click="pressed" 
                src="http://www.johnsonmackenzie.ltd.uk/wp-content/uploads/2015/01/united_kingdom_640.png" 
                value="en" alt="English" title="English"></paper-icon-button>
        `;
    }

    pressed(e) {        
        var newLanguage = e.target.getAttribute('value');
        this.getCheckerValue();
        if (this.selectedLanguage==newLanguage){return;}       
        store.dispatch(setAppLanguage(newLanguage));      
    }
    switchLanguage(){
        if (this.selectedLanguage=="en"){
            this.selectedLanguage="es";
            store.dispatch(setAppLanguage(this.selectedLanguage));            
            return;}        
        this.selectedLanguage="en";
        this.getCheckerValue();
        store.dispatch(setAppLanguage(this.selectedLanguage));        
    }
    setDefaultLanguage(){
        store.dispatch(setAppLanguage(this.selectedLanguage)); 
        this.getCheckerValue();
    }
    getCheckerValue(){
        if (this.selectedLanguage=="es"){
            this.$.appLanguageSelector.checked=false;
        return;}
        this.$.appLanguageSelector.checked=true;                    
    }
}
customElements.define('language-selector', languageSelector);