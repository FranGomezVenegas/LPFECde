import{PolymerElement,html}from"../../../../node_modules/@polymer/polymer/polymer-element.js";import{connect}from"../../../../node_modules/pwa-helpers/connect-mixin.js";import{store}from"../../../store.js";import{FieldsMethods}from"../../app/app-functions/fields-methods.js";import"../../../config/styles/form-fields-style.js";class FieldGoogleFonts extends FieldsMethods(connect(store)(PolymerElement)){stateChanged(state){this.selectedLanguage=state.app.user.appLanguage}static get template(){return html`
        <style include="form-fields-style"></style>
        <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Annie Use Your Telescope' type='text/css'>
        <div>
            <p class="formFieldGoogleFonts" style="font-family:{{field.font_family}};font-size:{{field.font_size}};">{{labelValue(selectedLanguage, field)}}</p>
        </div>
        `}}customElements.define("field-google-fonts",FieldGoogleFonts);