import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../../../store.js';

import '@mpachnis/mp-calendar/mp-calendar.js';
import {programProgConfigCalendar_progConfigCalendarTableHeaderFields } from '../../03config/config-process.js';
class EmDemoAProgConfigcalendar extends connect(store)(PolymerElement) {
    stateChanged(state) {
        this.selectedLanguage = state.app.user.appLanguage; 
        if (state.emDemoA.selectedProgram!=null){
            //this.selectedProgram=state.emDemoA.selectedProgram;
            //console.log('state.emDemoA.selectedProgram.config_scheduled_calendar',state.emDemoA.selectedProgram.config_scheduled_calendar);
            this.events=state.emDemoA.selectedProgram.config_scheduled_calendar;
        }
      }       
    static get properties() {
        return {
            selectedLanguage: {type:String, observer:'labelsLang'},
            monthsLabels:{type:Array},
            daysLabels:{type:Array},
            startDayNumber:{type:String},
            events: {type: Object, value:
                [{"title":"E01","content":"Muestreo ...","date":"2020-02-20","category":"blue", "color": "#000"},]},
            progConfigCalendarTableHeaderFields:{type: Object, value:programProgConfigCalendar_progConfigCalendarTableHeaderFields},
            weekDaysDisabled: {type: Object, value:["Sunday", "Saturday"]},
        }
    }
    static get template() {
        return html`
        <mp-calendar id="Jan" show-days-in-month="42" first-day-of-week="[[startDayNumber]]" day-labels="[[daysLabels]]" month-labels="[[monthsLabels]]" 
            disable-prev-days="true" disable-next-days="true" theme="light-blue" disabled-days="[[weekDaysDisabled]]" events-object="[[events]]"></mp-calendar> 

        <vaadingrid-singleselect style="width:750px;" id="mygridid" headerfields="{{progConfigCalendarTableHeaderFields}}" 
            rowcontainer="{{events}}" selected-object="{{selectedObject}}"
            on-selected-object-changed="pointClicked"></vaadingrid-singleselect>
         
        `;
    }
    pointClicked(){
        //This does nothing, remove if so
    }
    labelsLang(){
        if (this.selectedLanguage=="es"){
            this.monthsLabels=["Enero", "Febrero","Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
            this.daysLabels=["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
            this.startDayNumber="1";
            return;
        }else{
            this.monthsLabels=["January", "February","March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            this.daysLabels=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            this.startDayNumber="0";
            return;
        }

    }
}

customElements.define('em-demo-a-prog-configcalendar', EmDemoAProgConfigcalendar);