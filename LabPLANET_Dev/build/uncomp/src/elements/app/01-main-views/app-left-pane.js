import{PolymerElement,html}from"../../../../node_modules/@polymer/polymer/polymer-element.js";import"./procedure-list/app-procedures-list.js";import"./sop/sops-tree-pane.js";import"./sop/sop-iconandbadge.js";import"./notifications/notifications-pane.js";class AppLeftPane extends PolymerElement{static get template(){return html`
        <sop-iconandbadge></sop-iconandbadge>
        <app-procedures-list></app-procedures-list>            
        <notifications-pane></notifications-pane>            
        `}}customElements.define("app-left-pane",AppLeftPane);