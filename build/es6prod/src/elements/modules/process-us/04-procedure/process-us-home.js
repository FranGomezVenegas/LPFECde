define(["../../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../../node_modules/pwa-helpers/connect-mixin.js","../../../../store.js","../03config/config-process.js"],function(_polymerElement,_connectMixin,_store,_configProcess){"use strict";class processUsHome extends(0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement){stateChanged(state){this.finalToken=state.app.user.finalToken;if(null!=state.processUs){//this.unReceivedSamples= state.processUs.unReceivedSamples;
}this.schemaPrefix=_configProcess.schema_name}static get properties(){return{}}static get template(){return _polymerElement.html`
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
        `}constructor(){super();console.log("vamos a cargar process-us-home")}}customElements.define("process-us-home",processUsHome)});