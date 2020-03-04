define(["../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../node_modules/pwa-helpers/connect-mixin.js","../../../store.js","../../app/app-functions/fields-methods.js","../../../config/styles/form-fields-style.js"],function(_polymerElement,_connectMixin,_store,_fieldsMethods,_formFieldsStyle){"use strict";class FieldGoogleFonts extends(0,_fieldsMethods.FieldsMethods)((0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement)){stateChanged(state){this.selectedLanguage=state.app.user.appLanguage}static get template(){return _polymerElement.html`
        <style include="form-fields-style"></style>
        <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Annie Use Your Telescope' type='text/css'>
        <div>
            <p class="formFieldGoogleFonts" style="font-family:{{field.font_family}};font-size:{{field.font_size}};">{{labelValue(selectedLanguage, field)}}</p>
        </div>
        `}}customElements.define("field-google-fonts",FieldGoogleFonts)});