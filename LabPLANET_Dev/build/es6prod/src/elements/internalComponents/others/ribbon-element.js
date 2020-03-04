define(["../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../node_modules/pwa-helpers/connect-mixin.js","../../../store.js","../../app/app-functions/fields-methods.js"],function(_polymerElement,_connectMixin,_store,_fieldsMethods){"use strict";class RibbonElement extends(0,_fieldsMethods.FieldsMethods)((0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement)){static get properties(){return{field:{type:Object,notify:!0}}}static get template(){return _polymerElement.html`

        <style>
            .draft-ribbon {
                pointer-events: none;
                position: absolute;
                top: -2px;
                left: -2px;
                height: 60px;
                width: 60px;
                overflow: hidden;
            }
            .draft-ribbon .draft-ribbon-text {
                position: absolute;
                top: 20px;
                left: -29px;
                width: 100px;
                height: 20px;
                line-height: 20px;
                font-size: .515em;
                text-transform: uppercase;
                text-align: center;
<!--                color: darkred;
                background-color: #fd5e60;; -->
                -webkit-transform: rotate(-45deg);
                -moz-transform: rotate(-45deg);
                -ms-transform: rotate(-45deg);
                -o-transform: rotate(-45deg);
                transform: rotate(-45deg);
                -webkit-box-shadow: 0 1px 3px 0 rgba(0,0,0,.2);
                -moz-box-shadow: 0 1px 3px 0 rgba(0,0,0,.2);
                box-shadow: 0 1px 3px 0 rgba(0,0,0,.2);
            }            
        </style>        
        <div name="ribbon" class="draft-ribbon" style="{{styleDefinition()}}">
            <div class="draft-ribbon-text">{{labelValue(selectedLanguage, field)}}</div> 
        </div>                 
        `}styleDefinition(){//if (this.field.read_only){return 'color:var(--lumo-disabled-text-color);'}
var color=!this.field.icon_color?"color: darkred;":"color:"+this.field.text_color+";",bkGroundColor=!this.field.icon_color?"background-color: #fd5e60;;":"background-color:"+this.field.background_color+";";return color;//+' '+bkGroundColor;
}stateChanged(state){this.selectedLanguage=state.app.user.appLanguage}}customElements.define("ribbon-element",RibbonElement)});