import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../../store.js';
import {schema_name, sampleReception_sampleFieldToRetrieve, sampleReception_sampleFieldToDisplay} 
    from '../03config/config-process.js';

class processUsHome extends connect(store)(PolymerElement) {
    stateChanged(state) {
        this.finalToken = state.app.user.finalToken; 
        if (state.processUs!=null){
            //this.unReceivedSamples= state.processUs.unReceivedSamples;
        }
        this.schemaPrefix=schema_name;
    }        
    static get properties() {
        return {
        }
    }
    static get template() {        
        return html`
        <style>
            p {color: #032bbc;}
            li {margin: 5px;
                color: #032bbc;}
        </style>
        <div class="card">
        <p style="color: #018786; font-size: 30px;">Bienvenido al procesamiento de muestras para EEUU !!! </p>
        <p></p>
        <p>Este proceso está enfocado en el ciclo de vida de las muestras, el ciclo de vida básico consiste en:
        <li> Registrar muestra</li>
        <li> Recibir muestra</li>
        <li> Entrar Resultados</li>
        <li> Revisar Muestra</li>        
        </p>
        <p>Este proceso está definido de tal manera que una muestra pertenece, en calidad de custodio, a quien la registre
        y por lo tanto sólo el custodio podrá ver una muestra. Puedes iniciar el proceso de cambio de custodia de una muestra en la opción "Custodia"
        </p>
        <p>Recuerda que los SOPs o PNTs deben guiarte en el uso de la aplicación</p>
        
        </div>
        `;
    }
    constructor() {
        super();
        console.log('vamos a cargar process-us-home');
    }    
}
customElements.define('process-us-home', processUsHome);