define(["../../../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../../../node_modules/pwa-helpers/connect-mixin.js","../../../../../store.js","../../03config/config-process.js"],function(_polymerElement,_connectMixin,_store,_configProcess){"use strict";//import '../../internalComponents/pdf-browser-viewer';
class EmDemoAProgLimits extends(0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement){stateChanged(state){this.finalToken=state.app.user.finalToken;if(null!=state.emDemoA){this.selectedProgram=state.emDemoA.selectedProgram;if(null!=state.emDemoA.selectedProgram&&null!=state.emDemoA.selectedProgram.spec_definition){this.selProgSpecInfo=state.emDemoA.selectedProgram.spec_definition.spec;this.selProgSpecLimits=state.emDemoA.selectedProgram.spec_definition.spec_limits}}}static get properties(){return{selectedProgram:{type:Object},selProgSpecInfo:{type:Object},selProgSpecLimits:{type:Object}}}static get template(){return _polymerElement.html`
        <style>
            div.wrapper{display:flex;}
            p {color: #032bbc;}
            p.title{
                color: #018786; font-size: 30px;
            }
            li {margin: 5px;
                color: #032bbc;}
        </style>
        <div class="wrapper">
            <div>
                <p class=title>Análisis</p>
                <template is="dom-repeat" items="{{selProgSpecInfo.analysis_list}}" as="analysis">                    
                    <p>
                        {{analysis}}
                    </p>
                </template>        
            </div>
            <div>
                <p class=title>Variaciones</p>
                <template is="dom-repeat" items="{{selProgSpecInfo.variation_names_list}}" as="variation">                    
                    <p>
                        {{variation}}
                    </p>
                </template>        
            </div>
            <div>
            <p class=title>Limites</p>
                <template is="dom-repeat" items="{{selProgSpecLimits}}" as="limit">
                <p>
                    {{limit.variation_name}}-{{limit.analysis}}-{{limit.method_name}}-{{limit.method_version}}-{{limit.parameter}}-{{limit.method_name}}-{{limit.spec_rule_with_detail}}
                </p>
                </template>
            </div>
        </div>
        `}}customElements.define("em-demo-a-prog-limits",EmDemoAProgLimits)});