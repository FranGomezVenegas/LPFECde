define(["../../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../../node_modules/pwa-helpers/connect-mixin.js","../../../../store.js","../../../../../node_modules/@polymer/iron-collapse/iron-collapse.js","../../../../../node_modules/@polymer/iron-selector/iron-selector.js"],function(_polymerElement,_connectMixin,_store,_ironCollapse,_ironSelector){"use strict";class NotificationsPane extends(0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement){static get properties(){return{horizontal:{type:Boolean},opened:{type:Boolean,value:!1,reflectToAttribute:!0},noAnimation:{type:Boolean},notifications:Number}}stateChanged(state){if(null!=state.notifications){this.numNotifications=state.notifications.totalNotifications;this.notifications=state.notifications.notifications}}_sortNotifications(a,b){//console.log(a[0], b[0]);
if(a[0]===b[0])return 0;return a[0]<b[0]?1:-1}toggle(){this.$.NOTIFPANE.toggle()}_getTextSOP(opened,numNotif){return opened?"Notificaciones (Cerrar) "+numNotif:"Notificaciones (Abrir) "+numNotif}textColor(diagnoses){switch(diagnoses){case"CORRECT":return"textBlue";case"ERROR":return"textRed";case"LABPLANET_TRUE":return"textBlue";case"LABPLANET_FALSE":return"textRed";default:return"textNormal";}}static get template(){return _polymerElement.html`
            <style>
                p.textRed {
                    color:red;
                }
                p.textNormal{
                    color:red;
                }
                p.textBlue {
                    color:blue;
                }                
                p.textGrey {
                    color:grey;
                }                
            </style>
            <vaadin-button id="trigger" hidden="{{opened}}" on-click="toggle" aria-expanded\$="[[opened]]" aria-controls="collapse">[[_getTextSOP(opened, numNotifications)]]</vaadin-button>
            <vaadin-button id="trigger" hidden="{{!opened}}" on-click="toggle" aria-expanded\$="[[opened]]" aria-controls="collapse">[[_getTextSOP(opened, numNotifications)]]</vaadin-button>
            <iron-collapse id="NOTIFPANE" opened="{{opened}}" horizontal="[[horizontal]]" no-animation="[[noAnimation]]" tabindex="1">
                <template is="dom-repeat" items="{{notifications}}" sort="_sortNotifications" as="currNotif">                      
                    <p class$="{{textColor(currNotif.1.diagnostic)}}"> {{currNotif.0}} : {{currNotif.1.notificationName}} {{currNotif.1.label_en}} </p>
                </template> 
            </iron-collapse>
        `}}customElements.define("notifications-pane",NotificationsPane)});