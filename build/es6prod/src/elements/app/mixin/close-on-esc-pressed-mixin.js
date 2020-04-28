define(["exports"],function(_exports){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.CloseOnEscPressed=void 0;/*
Mixin para permitir detectar pulsaciones de la tecla escape, a fin de cerrar los componentes cuando se pulsa.

Necesita que el componente tenga un método llamado close().

Necesita que el componente tenga una propiedad opened.
*/const CloseOnEscPressed=SuperClass=>class extends SuperClass{constructor(){super();this.closeOnEscHandler=this.escClose.bind(this)}connectedCallback(){super.connectedCallback();window.addEventListener("keydown",this.closeOnEscHandler)}disconnectedCallback(){super.disconnectedCallback();window.removeEventListener("keydown",this.closeOnEscHandler)}escClose(e){if("Escape"===e.key){// && this.opened) {
//console.log('escClose', this);
//this.close();  
}}};_exports.CloseOnEscPressed=CloseOnEscPressed});