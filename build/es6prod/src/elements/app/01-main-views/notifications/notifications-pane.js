define(["../../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../../node_modules/pwa-helpers/connect-mixin.js","../../../../store.js","../../../../../node_modules/@polymer/iron-collapse/iron-collapse.js","../../../../../node_modules/@polymer/iron-selector/iron-selector.js","../../app-functions/fields-methods.js","../../../../config/app-config.js"],function(_polymerElement,_connectMixin,_store,_ironCollapse,_ironSelector,_fieldsMethods,_appConfig){"use strict";//import '@vaadin/vaadin-icons/vaadin-icons'
class NotificationsPane extends(0,_fieldsMethods.FieldsMethods)((0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement)){static get properties(){return{language:{type:String,observer:"getTextSOP"},horizontal:{type:Boolean},opened:{type:Boolean,value:!1,reflectToAttribute:!0},noAnimation:{type:Boolean},notifications:Number,paneTitle:{type:Object,value:_appConfig.notificationsPaneTitle},titleValue:String,titleIcon:String}}stateChanged(state){this.language=state.app.user.appLanguage;if(null!=state.notifications){this.numNotifications=state.notifications.totalNotifications;this.notifications=state.notifications.notifications}this.getTextSOP()}_sortNotifications(a,b){//console.log(a[0], b[0]);
if(a[0]===b[0])return 0;return a[0]<b[0]?1:-1}toggle(){this.$.NOTIFPANE.toggle();this.getTextSOP()}getTextSOP(){if(this.opened){this.titleValue=this.labelValue(this.language,this.paneTitle.open)+" "+this.numNotifications;this.titleIcon=this.paneTitle.open.icon_name;return}this.titleValue=this.labelValue(this.language,this.paneTitle.closed)+" "+this.numNotifications;this.titleIcon=this.paneTitle.closed.icon_name}textColor(diagnoses){switch(diagnoses){case"CORRECT":return"textBlue";case"ERROR":return"textRed";case"LABPLANET_TRUE":return"textBlue";case"LABPLANET_FALSE":return"textRed";default:return"textNormal";}}static get template(){return _polymerElement.html`
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
                iron-icon{
                    color:cornflowerblue;
                }               
                div.title{
                    display:flex;
                }
            </style>
            <div id="title" class="title">
                <iron-icon icon="[[titleIcon]]" on-click="toggle"></iron-icon>
                <vaadin-button id="trigger" on-click="toggle" aria-expanded\$="[[opened]]" aria-controls="collapse">[[titleValue]]</vaadin-button>            
            </div>
            <iron-collapse id="NOTIFPANE" opened="{{opened}}" horizontal="[[horizontal]]" no-animation="[[noAnimation]]" tabindex="1">
                <template is="dom-repeat" items="{{notifications}}" sort="_sortNotifications" as="currNotif">                      
                    <p class$="{{textColor(currNotif.1.diagnostic)}}"> {{currNotif.1.category}} : {{labelValue(language, currNotif.1)}} </p>
                </template> 
            </iron-collapse>
        `}}customElements.define("notifications-pane",NotificationsPane)});