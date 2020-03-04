import{PolymerElement,html}from"../../../../node_modules/@polymer/polymer/polymer-element.js";import{connect}from"../../../../node_modules/pwa-helpers/connect-mixin.js";import"../../../../node_modules/@polymer/paper-icon-button/paper-icon-button.js";import"../../../../node_modules/@material/mwc-switch/mwc-switch.js";import{store}from"../../../store.js";import{setAppLanguage}from"../../app/Redux/actions/app_actions.js";import{default_language}from"../../../config/app-config.js";class languageSelector extends connect(store)(PolymerElement){static get properties(){return{selectedLanguage:{type:String,value:default_language,observer:"setDefaultLanguage"}}}stateChanged(state){//console.log('stateChanged sample-reception', state);
this.selectedLanguage=state.app.user.appLanguage}static get template(){return html`                
            <paper-icon-button on-click="pressed" 
                src="https://banner2.kisspng.com/20180320/hde/kisspng-flag-of-spain-flag-of-the-united-states-national-f-spain-flags-icon-png-5ab0b60cb326e6.1242812115215303807338.jpg" 
                value="es" alt="Castellano" title="Castellano"></paper-icon-button>
            
            <mwc-formfield label="" name="langSwitch" >
                <mwc-switch id="appLanguageSelector" checked on-click="switchLanguage"></mwc-switch>
            </mwc-formfield>    
            
            <paper-icon-button on-click="pressed" 
                src="http://www.johnsonmackenzie.ltd.uk/wp-content/uploads/2015/01/united_kingdom_640.png" 
                value="en" alt="English" title="English"></paper-icon-button>
        `}pressed(e){var newLanguage=e.target.getAttribute("value");this.getCheckerValue();if(this.selectedLanguage==newLanguage){return}store.dispatch(setAppLanguage(newLanguage))}switchLanguage(){if("en"==this.selectedLanguage){this.selectedLanguage="es";store.dispatch(setAppLanguage(this.selectedLanguage));return}this.selectedLanguage="en";this.getCheckerValue();store.dispatch(setAppLanguage(this.selectedLanguage))}setDefaultLanguage(){store.dispatch(setAppLanguage(this.selectedLanguage));this.getCheckerValue()}getCheckerValue(){if("es"==this.selectedLanguage){this.$.appLanguageSelector.checked=!1;return}this.$.appLanguageSelector.checked=!0}}customElements.define("language-selector",languageSelector);