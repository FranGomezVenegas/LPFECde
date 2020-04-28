define(["../../../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../../../node_modules/pwa-helpers/connect-mixin.js","../../../../../store.js","../../../../app/app-functions/fields-methods.js","../../03config/config-process.js"],function(_polymerElement,_connectMixin,_store,_fieldsMethods,_configProcess){"use strict";class EmDemoAProgLimits extends(0,_fieldsMethods.FieldsMethods)((0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement)){stateChanged(state){this.finalToken=state.app.user.finalToken;this.selectedLanguage=state.app.user.appLanguage;if(null!=state.emDemoA){this.selectedProgram=state.emDemoA.selectedProgram;if(null!=state.emDemoA.selectedProgram&&null!=state.emDemoA.selectedProgram.spec_definition){this.selProgSpecInfo=state.emDemoA.selectedProgram.spec_definition.spec;this.selProgSpecLimits=state.emDemoA.selectedProgram.spec_definition.spec_limits}}}static get properties(){return{selectedLanguage:String,selectedProgram:{type:Object},selProgSpecInfo:{type:Object},selProgSpecLimits:{type:Object},programLimitsTab_sectionsTitle:{type:Object,value:_configProcess.programLimitsTab_sectionsTitle},tableTitle:{type:Object,value:{name:"tableTitle",label_en:"Program limits list",label_es:"Lista de rangos l\xEDmite para el programa"}}}}static get template(){return _polymerElement.html`
        <style>
            div.wrapper{display:flex;}
            p {color: #032bbc;}
            p.title{
                color: #018786; font-size: 30px;
            }
            li {margin: 5px;
                color: #032bbc;}
            p.tableTitle{
                margin-top: 0px;
                margin-bottom: 3px;
                color: #4285f4;
                font-size:30px;
            }                
        </style>
        <div>
            <p class="tableTitle">{{labelValue(selectedLanguage, tableTitle)}}  {{selectedProgram.name}}</p>
        </div>
        <div class="wrapper">
            <div>
                <p class=title>{{labelValue(selectedLanguage, programLimitsTab_sectionsTitle.analysis)}}</p>
                <template is="dom-repeat" items="{{selProgSpecInfo.analysis_list}}" as="analysis">                    
                    <p>
                        {{analysis}}
                    </p>
                </template>        
            </div>
            <div>
                <p class=title>{{labelValue(selectedLanguage, programLimitsTab_sectionsTitle.variations)}}</p>
                <template is="dom-repeat" items="{{selProgSpecInfo.variation_names_list}}" as="variation">                    
                    <p>
                        {{variation}}
                    </p>
                </template>        
            </div>
            <div>
            <p class=title>{{labelValue(selectedLanguage, programLimitsTab_sectionsTitle.limits)}}</p>
                <template is="dom-repeat" items="{{selProgSpecLimits}}" as="limit">
                <p>
                    {{limit.variation_name}}-{{limit.analysis}}-{{limit.method_name}}-{{limit.method_version}}-{{limit.parameter}}-{{limit.method_name}}-{{limit.spec_rule_with_detail}}
                </p>
                </template>
            </div>
        </div>
        `}}customElements.define("em-demo-a-prog-limits",EmDemoAProgLimits)});