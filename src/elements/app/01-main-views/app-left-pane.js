import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import './procedure-list/app-procedures-list';
import './sop/sops-tree-pane';
import './sop/sop-iconandbadge';
import './notifications/notifications-pane';

class AppLeftPane extends PolymerElement {
    static get template() {
        return html`
        <sop-iconandbadge></sop-iconandbadge>
        <app-procedures-list></app-procedures-list>            
        <notifications-pane></notifications-pane>            
        `;
    }
}
customElements.define('app-left-pane', AppLeftPane);