define(["../../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../../node_modules/pwa-helpers/connect-mixin.js","../../../../store.js","../01moduleFunctionality/frontend-env-monit-sample.js","../03config/config-process.js"],function(_polymerElement,_connectMixin,_store,_frontendEnvMonitSample,_configProcess){"use strict";//import '../../internalComponents/pdf-browser-viewer';
class emDemoBHome extends(0,_frontendEnvMonitSample.FrontendEnvMonitSample)((0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement)){stateChanged(state){this.finalToken=state.app.user.finalToken;if(null!=state.emDemoA){this.sampleStatCounterByStage=state.emDemoA.sampleStatsCounterByStage;//this.sampleStatsLastNresults=state.emDemoA.sampleStatsLastNresults;
this.sampleStatsLastNresultsGrouped=[];if(null!=state.emDemoA.sampleStatsLastNresults){if(this.sampleStatsLastNresultsInfoGrouped.grouped){var i,j;if(0<state.emDemoA.sampleStatsLastNresults.length){var sampleStatsLastResults=[];sampleStatsLastResults=state.emDemoA.sampleStatsLastNresults;for(i=0;i<sampleStatsLastResults.length;i++){var sampleStatsLastResultsDetail=[];sampleStatsLastResultsDetail=sampleStatsLastResults[i];this.sampleStatsLastNresults=[["A","B"]];for(j=0;j<sampleStatsLastResultsDetail.sample_results.length;j++){this.sampleStatsLastNresults.push([j,+sampleStatsLastResultsDetail.sample_results[j].raw_value])}if(0<this.sampleStatsLastNresults.length){this.sampleStatsLastNresultsGrouped.push([this.sampleStatsLastNresults])}}}}else{var i;for(i=0;i<state.emDemoA.sampleStatsLastNresults.length;i++){this.sampleStatsLastNresults.push([i,+state.emDemoA.sampleStatsLastNresults[i].raw_value])}}//console.log('grouped data');
}//console.log('this.sampleStatsLastNresults', this.sampleStatsLastNresults);            
this.gaugeSampleSummary=[["Label","Value"]];if(null!=this.sampleStatCounterByStage){var i;for(i=0;i<this.sampleStatCounterByStage.length;i++){this.gaugeSampleSummary.push([this.sampleStatCounterByStage[i].current_stage,this.sampleStatCounterByStage[i].COUNTER])}if("pie"==this.sampleSummaryChartType){this.sampleSummaryChartOptions=_configProcess.programHome_sampleSummaryPieOptions}if("gauge"==this.sampleSummaryChartType){this.sampleSummaryChartOptions=_configProcess.programHome_sampleSummaryGaugeOptions}this.sampleSummaryChartOptions="";//console.log('sampleSummaryChartOptions', this.sampleSummaryChartOptions);
}}this.schemaPrefix=_configProcess.schema_name}static get properties(){return{finalToken:String,schemaPrefix:{type:String,observer:"onFinalTokenFilled"},sampleSummaryChartType:{type:String,value:"pie"},selectedProgram:{type:Object},sampleSummaryChartData:{type:Array},sampleSummaryChartOptions:{type:Object,value:""},sampleStatsLastNresults:{type:Array},sampleStatsLastNresultsGrouped:{type:Array},sampleStatsLastNresultsInfoGrouped:{type:Object,value:_configProcess.programHome_lastResults_infoGrouped},sampleStatCounterByStage:{type:Array,value:[["A","B"],[20,45]]}}}static get template(){return _polymerElement.html`
        <div style="display: flex;">
        soy em-demo-b-home del proceso em-demo-b !!
            <google-chart width=500px" title="{{gaugeSampleSummary.0.}}" on-click="{{openStageTab}}" type="pie" data="{{gaugeSampleSummary}}" options="{{sampleSummaryChartOptions}}"></google-chart>
            
            <div class="card">
                <template is="dom-if" if="[[!sampleStatsLastNresultsInfoGrouped.grouped]]">
                    <google-chart width=300px" type="line" data="{{sampleStatsLastNresults}}"></google-chart>
                </template>
                <template is="dom-if" if="[[sampleStatsLastNresultsInfoGrouped.grouped]]">
                    <template is="dom-repeat" items="{{sampleStatsLastNresultsGrouped[index]}}" as="item"> 
                        {{item.variation_name}}-{{item.analysis}}-{{item.rule_variables}}
                        {{item.sample_results.lenth}} 
                        {{item.sample_results.raw_value}}
                        <!-- <google-chart width=300px" type="line" data="{{item.sample_results}}"></google-chart> -->
                    </template>
                </template>
            </div> 
        </div>
        `}onFinalTokenFilled(){//console.log('em-demo-b-home');
var data=[];data.stagesToInclude="Sampling|Incubation|PlateReading|MicroorganismIdentification|END";//END not included???
data.stagesToExclude="Samplingzz|PlateReading";data.schemaPrefix=this.schemaPrefix;data.finalToken=this.finalToken;data.grouped=this.sampleStatsLastNresultsInfoGrouped.grouped;this.getSampleStatsCounterByStage(data);this.getSampleStatsLastNresults(data)}openStageTab(){console.log("em-demo-b-home >> openStageTab")}}customElements.define("em-demo-b-home",emDemoBHome)});