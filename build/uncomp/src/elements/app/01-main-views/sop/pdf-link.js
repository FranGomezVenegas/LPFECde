import{PolymerElement,html}from"../../../../../node_modules/@polymer/polymer/polymer-element.js";import"../../../../config/styles/svg-icons.js";class PdfLink extends PolymerElement{static get properties(){return{}}static get template(){return html`
        <style include="svg-icons"></style>
        <vaadin-button value="{{fileLink}}" on-click="openPDF">
            <svg class="pdfIcon">
                <path d="M 20 2 H 8 c -1.1 0 -2 0.9 -2 2 v 12 c 0 1.1 0.9 2 2 2 h 12 c 1.1 0 2 -0.9 2 -2 V 4 c 0 -1.1 -0.9 -2 -2 -2 Z m -8.5 7.5 c 0 0.83 -0.67 1.5 -1.5 1.5 H 9 v 2 H 7.5 V 7 H 10 c 0.83 0 1.5 0.67 1.5 1.5 v 1 Z m 5 2 c 0 0.83 -0.67 1.5 -1.5 1.5 h -2.5 V 7 H 15 c 0.83 0 1.5 0.67 1.5 1.5 v 3 Z m 4 -3 H 19 v 1 h 1.5 V 11 H 19 v 2 h -1.5 V 7 h 3 v 1.5 Z M 9 9.5 h 1 v -1 H 9 v 1 Z M 4 6 H 2 v 14 c 0 1.1 0.9 2 2 2 h 14 v -2 H 4 V 6 Z m 10 5.5 h 1 v -3 h -1 v 3 Z" />
                Sorry, your browser does not support inline SVG.
            </svg>
        </vaadin-button>
        `}openPDF(e){var fileLink=e.target.value;if(null==fileLink){this.dispatchEvent(new CustomEvent("toast-error",{bubbles:!0,composed:!0,detail:"Este PNT no tiene PDF asociado"}));return}if(""==fileLink){this.dispatchEvent(new CustomEvent("toast-error",{bubbles:!0,composed:!0,detail:"Este PNT no tiene PDF asociado"}));return}//console.log('openPDF', fileLink);
//var pdf = e.detail.value; //'http://www.bib.uia.mx/tesis/pdf/014828/014828.pdf';//MyPdf.pdf;
//var pdf = fileLink;
window.open(fileLink)}}customElements.define("pdf-link",PdfLink);