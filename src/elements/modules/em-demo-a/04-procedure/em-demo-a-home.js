import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../../store.js';
import {FrontendEnvMonitSample} from '../01moduleFunctionality/frontend-env-monit-sample.js';
//import '../../internalComponents/pdf-browser-viewer';
import {schema_name, programHome_sampleSummaryGaugeOptions, programHome_sampleSummaryPieOptions,
    programHome_lastResults_infoGrouped
//    , sampleReception_sampleFieldToRetrieve, sampleReception_sampleFieldToDisplay
} from '../03config/config-process.js';

class emDemoAHome extends FrontendEnvMonitSample(connect(store)(PolymerElement)) {
    stateChanged(state) {
        this.finalToken = state.app.user.finalToken; 
        if (state.emDemoA!=null){
            this.sampleStatCounterByStage=state.emDemoA.sampleStatsCounterByStage;
            //this.sampleStatsLastNresults=state.emDemoA.sampleStatsLastNresults;
            this.sampleStatsLastNresultsGrouped=[];            
            if (state.emDemoA.sampleStatsLastNresults!=null){
                if (this.sampleStatsLastNresultsInfoGrouped.grouped){
                    
                    var i;
                    var j;
                    if (state.emDemoA.sampleStatsLastNresults.length>0){
                        var sampleStatsLastResults=[];
                        sampleStatsLastResults=state.emDemoA.sampleStatsLastNresults;
                        for (i = 0; i < sampleStatsLastResults.length; i++) {
                            var sampleStatsLastResultsDetail=[];
                            sampleStatsLastResultsDetail=sampleStatsLastResults[i];
                            this.sampleStatsLastNresults=[["A", "B"]];
                            for (j = 0; j < sampleStatsLastResultsDetail.sample_results.length; j++) {
                                this.sampleStatsLastNresults.push([j, Number(sampleStatsLastResultsDetail.sample_results[j].raw_value)]);
                            }
                            if (this.sampleStatsLastNresults.length>0){
                                this.sampleStatsLastNresultsGrouped.push([this.sampleStatsLastNresults]);}
                        }
                    }                                        
                }else{
                    var i;
                    for (i = 0; i < state.emDemoA.sampleStatsLastNresults.length; i++) {
                        this.sampleStatsLastNresults.push([i, Number(state.emDemoA.sampleStatsLastNresults[i].raw_value)]);
                    }
                }
                console.log('grouped data');
            }
            console.log('this.sampleStatsLastNresults', this.sampleStatsLastNresults);            
            this.gaugeSampleSummary=[["Label", "Value"]];
            if (this.sampleStatCounterByStage!=null){
                var i;
                for (i = 0; i < this.sampleStatCounterByStage.length; i++) {
                    this.gaugeSampleSummary.push([this.sampleStatCounterByStage[i].current_stage, 
                        this.sampleStatCounterByStage[i].COUNTER]);
                }
                if (this.sampleSummaryChartType=='pie'){this.sampleSummaryChartOptions=programHome_sampleSummaryPieOptions;}
                if (this.sampleSummaryChartType=='gauge'){this.sampleSummaryChartOptions=programHome_sampleSummaryGaugeOptions;}
                this.sampleSummaryChartOptions="";
//console.log('sampleSummaryChartOptions', this.sampleSummaryChartOptions);
            }            
        }        
        this.schemaPrefix=schema_name;
    }        
    static get properties() {
        return {
            finalToken: String,
            schemaPrefix: {type: String, observer:'onFinalTokenFilled'},   
            sampleSummaryChartType: {type: String, value: 'pie'},  
            selectedProgram:{type: Object},
            sampleSummaryChartData:{type: Array}, sampleSummaryChartOptions:{type: Object, value: ''},
            sampleStatsLastNresults: {type: Array},
            sampleStatsLastNresultsGrouped: {type: Array},
            sampleStatsLastNresultsInfoGrouped: {type:Object, value:programHome_lastResults_infoGrouped},
            sampleStatCounterByStage: {type: Array, value: [["A", "B"],[20, 45]]}
            
        }
    }
    static get template() {
        return html`
        <div style="display: flex;">
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
        `;
    }
    onFinalTokenFilled(){
        //console.log('em-demo-a-home');
        var data=[];
        data.stagesToInclude="Sampling|Incubation|PlateReading|MicroorganismIdentification|END"; //END not included???
        data.stagesToExclude="Samplingzz|PlateReading";
        data.schemaPrefix=this.schemaPrefix; data.finalToken=this.finalToken;
        data.grouped=this.sampleStatsLastNresultsInfoGrouped.grouped;
        this.getSampleStatsCounterByStage(data);
        this.getSampleStatsLastNresults(data);
    }
    openStageTab(){
        console.log('em-demo-a-home >> openStageTab');
    }

}
customElements.define('em-demo-a-home', emDemoAHome);