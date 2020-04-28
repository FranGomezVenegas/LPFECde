import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../../../store.js';
import '@google-web-components/google-chart';
//import '../../internalComponents/pdf-browser-viewer';
import {schema_name, programHome_sampleSummaryGaugeOptions, programHome_sampleSummaryPieOptions
//    , sampleReception_sampleFieldToRetrieve, sampleReception_sampleFieldToDisplay
} from '../../03config/config-process.js';
import {tabsMethods} from '../../../../app/app-functions/tabs-methods';
import {FieldsMethods} from '../../../../app/app-functions/fields-methods';
class EmDemoAProgHome extends FieldsMethods(tabsMethods(connect(store)(PolymerElement))) {
    stateChanged(state) {
        this.selectedLanguage = state.app.user.appLanguage; 
        this.schemaPrefix=schema_name;
        this.finalToken = state.app.user.finalToken; 
        if (state.emDemoA!=null){
            this.selectedProgram=state.emDemoA.selectedProgram;
            this.gaugeSampleSummary=[["Label", "Value"]];
            if (state.emDemoA.selectedProgram!=null){
                if (this.selectedProgram.samples_summary_by_stage!=null){
                    var i;
                    for (i = 0; i < this.selectedProgram.samples_summary_by_stage.length; i++) {
                        this.gaugeSampleSummary.push([this.selectedProgram.samples_summary_by_stage[i].current_stage, 
                            this.selectedProgram.samples_summary_by_stage[i].COUNTER]);}
                    this.sampleSummaryChartOptions="";
                    if (this.sampleSummaryChartType=="pie"){this.sampleSummaryChartOptions=programHome_sampleSummaryPieOptions;}
                    if (this.sampleSummaryChartType=="gauge"){this.sampleSummaryChartOptions=programHome_sampleSummaryGaugeOptions;}                    
                }
            }
//console.log('this.gaugeSampleSummary', this.gaugeSampleSummary);

        }
        //console.log('isTabOpen', this.isTabOpen('x'));
        var openTabs=state.tabs.tabs;
        var tabOne=this.tabOne;
        var tabIsOpen=false;
        tabIsOpen=openTabs.find(function(currTab) {
            //console.log('tab reducer find', tabOne, currTab.tabName);
            return tabOne == currTab.tabName;
        });
        if (!tabIsOpen){this.tabOneIsOpen=false;}
        else{this.tabOneIsOpen=true;}
        var tabTwo=this.tabTwo;
        tabIsOpen=openTabs.find(function(currTab) {
            //console.log('tab reducer find', tabTwo, currTab.tabName);
            return tabTwo == currTab.tabName;
        });
        if (!tabIsOpen){this.tabTwoIsOpen=false;}
        else{this.tabTwoIsOpen=true;}
        //this.tabTwoIsOpen=this.openTabs.find(this.tabTwo);
    }        
    static get properties() {
        return {
            selectedLanguage: {type:String},
            sampleSummaryChartType: {type: String, value: 'gauge'},    
            selectedProgram:{type: Object},
            sampleSummaryChartData:{type: Array}, sampleSummaryChartOptions:{type: Array, value: ''},
            openTabs: {type: Array},
            tabOne: {type: String, value: 'xxx'}, tabOneIsOpen: {type: Boolean},
            tabTwo: {type: String, value: 'em-demo-a-sample-sampling'}, tabTwoIsOpen: {type: Boolean},
            data: {type: Array,
                value: [["A", "B"],
                [20, 45],
                [31, 66],
                [50, 80],
                [77, 50],
                [68, 15]]
            },
            tableTitle:{type: Object, value:{label_en:'Home page for the program', label_es:'Página de inicio para el programa'}},
        }
    }
    static get template() {
        return html`
        <style>
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

<!--        <h1>Home</h1>
        <p>Tabs Opened: {{openTabs.length}}</p>
        <p>Tab {{tabOne}} is open? {{tabOneIsOpen}}</p>
        <p>Tab {{tabTwo}} is open? {{tabTwoIsOpen}}</p> -->
        <google-chart title="Hola gauge" type="pie" data="{{gaugeSampleSummary}}" options="{{sampleSummaryChartOptions}}">
        </google-chart>
        <div class="card">
        hola
        <google-chart type="md-scatter" data="{{data}}"></google-chart>
        </div>

        `;
    }
}
customElements.define('em-demo-a-prog-home', EmDemoAProgHome);