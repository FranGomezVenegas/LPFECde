import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '../../internalComponents/pdf-browser-viewer';

/**
 * `module-a-home` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class ModuleAHome extends PolymerElement {
    static get properties() {
        return {
            
        }
    }

    static get template() {
        return html`
            <pdf-browser-viewer pdf-url="example.pdf"></pdf-browser-viewer>
<!--            <pdf-element src="example.pdf" width=800 height=600></pdf-element>
            <script type="module" src="pdf-element.js"></script>-->

        `;
    }

    /**
     * Instance of the element is created/upgraded. Use: initializing state,
     * set up event listeners, create shadow dom.
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * Use for one-time configuration of your component after local
     * DOM is initialized.
     */
    ready() {
        super.ready();
    }
}

customElements.define('module-a-home', ModuleAHome);