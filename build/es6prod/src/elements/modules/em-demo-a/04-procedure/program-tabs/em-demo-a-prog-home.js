define(["../../../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../../../node_modules/pwa-helpers/connect-mixin.js","../../../../../store.js","../../../../../../node_modules/@google-web-components/google-chart/google-chart.js","../../03config/config-process.js","../../../../app/app-functions/tabs-methods.js"],function(_polymerElement,_connectMixin,_store,_googleChart,_configProcess,_tabsMethods){"use strict";//import '../../internalComponents/pdf-browser-viewer';
class EmDemoAProgHome extends(0,_tabsMethods.tabsMethods)((0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement)){stateChanged(state){this.schemaPrefix=_configProcess.schema_name;this.finalToken=state.app.user.finalToken;if(null!=state.emDemoA){this.selectedProgram=state.emDemoA.selectedProgram;this.gaugeSampleSummary=[["Label","Value"]];if(null!=state.emDemoA.selectedProgram){if(null!=this.selectedProgram.samples_summary_by_stage){var i;for(i=0;i<this.selectedProgram.samples_summary_by_stage.length;i++){this.gaugeSampleSummary.push([this.selectedProgram.samples_summary_by_stage[i].current_stage,this.selectedProgram.samples_summary_by_stage[i].COUNTER])}this.sampleSummaryChartOptions="";if("pie"==this.sampleSummaryChartType){this.sampleSummaryChartOptions=_configProcess.programHome_sampleSummaryPieOptions}if("gauge"==this.sampleSummaryChartType){this.sampleSummaryChartOptions=_configProcess.programHome_sampleSummaryGaugeOptions}}}//console.log('this.gaugeSampleSummary', this.gaugeSampleSummary);
}//console.log('isTabOpen', this.isTabOpen('x'));
var openTabs=state.tabs.tabs,tabOne=this.tabOne,tabIsOpen=!1;tabIsOpen=openTabs.find(function(currTab){//console.log('tab reducer find', tabOne, currTab.tabName);
return tabOne==currTab.tabName});if(!tabIsOpen){this.tabOneIsOpen=!1}else{this.tabOneIsOpen=!0}var tabTwo=this.tabTwo;tabIsOpen=openTabs.find(function(currTab){//console.log('tab reducer find', tabTwo, currTab.tabName);
return tabTwo==currTab.tabName});if(!tabIsOpen){this.tabTwoIsOpen=!1}else{this.tabTwoIsOpen=!0}//this.tabTwoIsOpen=this.openTabs.find(this.tabTwo);
}static get properties(){return{sampleSummaryChartType:{type:String,value:"gauge"},selectedProgram:{type:Object},sampleSummaryChartData:{type:Array},sampleSummaryChartOptions:{type:Array,value:""},openTabs:{type:Array},tabOne:{type:String,value:"xxx"},tabOneIsOpen:{type:Boolean},tabTwo:{type:String,value:"em-demo-a-sample-sampling"},tabTwoIsOpen:{type:Boolean},data:{type:Array,value:[["A","B"],[20,45],[31,66],[50,80],[77,50],[68,15]]}}}static get template(){return _polymerElement.html`
        <h1>Home</h1>
        <p>Tabs Opened: {{openTabs.length}}</p>
        <p>Tab {{tabOne}} is open? {{tabOneIsOpen}}</p>
        <p>Tab {{tabTwo}} is open? {{tabTwoIsOpen}}</p>
        <google-chart title="Hola gauge" type="pie" data="{{gaugeSampleSummary}}" options="{{sampleSummaryChartOptions}}">
        </google-chart>
        <div class="card">
        hola
        <google-chart type="md-scatter" data="{{data}}"></google-chart>
        </div>

        `}}customElements.define("em-demo-a-prog-home",EmDemoAProgHome)});