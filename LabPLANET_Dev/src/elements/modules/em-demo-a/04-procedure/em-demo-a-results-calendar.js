import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../../store.js';
import '@google-web-components/google-chart';

 import {schema_name
// //    , sampleReception_sampleFieldToRetrieve, sampleReception_sampleFieldToDisplay
 } from '../03config/config-process.js';

class EmDemoAResultsCalendar extends connect(store)(PolymerElement) { //connect(store)(PolymerElement) {
    // stateChanged(state) {
    //     this.finalToken = state.app.user.finalToken; 
    //     if (state.emDemoA!=null){
    //         this.unReceivedSamples= state.processUs.unReceivedSamples;
    //     }
    //     this.schemaPrefix=schema_name;
    // }        
    static get properties() {
        return {
            schemaPrefix: {type:String, value:schema_name},
            selectedProgram:{type: Object, observer:'onFinalTokenFilled'},            
            data: {type: Array,
                value: [["A", "B"],
                 [20, 45],
                 [31, 66],
                 [50, 80],
                 [77, 50],
                 [68, 15]]
            },              
            options: {type: Object, value: function(){
                return {width: 2000,
                        height: 1320,
                        redFrom: 4,
                        redTo: 5,
                        yellowFrom:1,
                        yellowTo: 3,
                        minorTicks: 5,
                    title: "Grado A",
                    calendar: {
                        dayOfWeekLabel: {
                          fontName: 'Times-Roman',
                          fontSize: 12,
                          color: '#1a8763',
                          bold: true,
                          italic: true,
                        },
                        dayOfWeekRightSpace: 10,
                        daysOfWeek: 'DLMXJVS',
                      },
                    monthOutlineColor: {
                        stroke: '#981b48',
                        strokeOpacity: 0.8,
                        strokeWidth: 2
                    },
                    unusedMonthOutlineColor: {
                        stroke: '#bc5679',
                        strokeOpacity: 0.8,
                        strokeWidth: 1
                    },
                    underMonthSpace: 16,                                          
                };
            }
            },
            datas: {type:Array,value:[
                {year:2019, month:3, day: 1, value:0},
                {year:2019, month:3, day:2, value:1},
                {year:2019, month:3, day:3, value:2},
                {year:2019, month:3, day:4, value:3},
                {year:2019, month:3, day:5, value:4},
                {year:2019, month:3, day:6, value:5},
                {year:2019, month:3, day:7, value:6},
                {year:2019, month:10, day:1, value:-10},
            ]},
            rows: {type: Array, value: function(){
                var i;
                var datesArr=[];
                for (i = 0; i < this.datas.length; i++) { 
                    console.log('i', i, this.datas[i].year);
                    var newElement=[];
                    newElement[0]=new Date(this.datas[i].year, this.datas[i].month, this.datas[i].day);
                    newElement[1]=this.datas[i].value
                    datesArr[i]=newElement;                    
                }
                console.log('datesArr', datesArr);
                return datesArr;
            }},        
            cols: {type: Array, value: function(){
                return [{ type: 'date', id: 'Date' }, { type: 'number', id: 'Won/Loss' }]
            }}         
        }   
    }
    static get template() {
        return html`

        <!-- <google-chart
        type="combo"
        options='{"seriesType": "line", "series": {"2": {"type": "line"}}}'
        data='[["Day", "Resultado", "Limite", "Control"],
               ["2019/03/31", 2, 5, 3],
               ["2019/04/01", 0, 5, 3],
               ["2019/04/02", 0, 5, 3],
               ["2019/04/03", 0, 5, 3],
               ["2019/04/04", 0, 5, 3],
               ["2019/06/29", 0, 5, 3]
        ]'>
      </google-chart> -->
      
        <google-chart options="{{options}}" 
            type="calendar"  cols="[[cols]]" rows="[[rows]]" id="calendar_basic" >
        </google-chart>    


                  
            
        `;
    }
    onFinalTokenFilled(){
        //console.log('em-demo-a-programs', 'onFinalTokenFilled');
        this.getSelectedProgramDataCalendar({
            finalToken:this.finalToken, schemaPrefix:this.schemaPrefix, programName: this.selectedProgram.name
        });  
    }
}
//data="{{data}}"
customElements.define('em-demo-a-results-calendar', EmDemoAResultsCalendar);