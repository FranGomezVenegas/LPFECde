define(["../../../../node_modules/@polymer/polymer/polymer-element.js","./procedure-list/app-procedures-list.js","./sop/sops-tree-pane.js","./sop/sop-iconandbadge.js","./notifications/notifications-pane.js"],function(_polymerElement,_appProceduresList,_sopsTreePane,_sopIconandbadge,_notificationsPane){"use strict";class AppLeftPane extends _polymerElement.PolymerElement{static get template(){return _polymerElement.html`
        <sop-iconandbadge></sop-iconandbadge>
        <app-procedures-list></app-procedures-list>            
        <notifications-pane></notifications-pane>            
        `}}customElements.define("app-left-pane",AppLeftPane)});