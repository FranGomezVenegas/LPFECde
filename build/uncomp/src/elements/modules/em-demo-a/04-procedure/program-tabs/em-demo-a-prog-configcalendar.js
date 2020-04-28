import{PolymerElement,html}from"../../../../../../node_modules/@polymer/polymer/polymer-element.js";import{connect}from"../../../../../../node_modules/pwa-helpers/connect-mixin.js";import{store}from"../../../../../store.js";import{FieldsMethods}from"../../../../app/app-functions/fields-methods.js";import"../../../../../../node_modules/@mpachnis/mp-calendar/mp-calendar.js";import{programProgConfigCalendar_progConfigCalendarTableHeaderFields}from"../../03config/config-process.js";class EmDemoAProgConfigcalendar extends FieldsMethods(connect(store)(PolymerElement)){stateChanged(state){this.selectedLanguage=state.app.user.appLanguage;if(null!=state.emDemoA.selectedProgram){this.selectedProgram=state.emDemoA.selectedProgram;//console.log('state.emDemoA.selectedProgram.config_scheduled_calendar',state.emDemoA.selectedProgram.config_scheduled_calendar);
this.events=state.emDemoA.selectedProgram.config_scheduled_calendar}}static get properties(){return{selectedLanguage:{type:String,observer:"labelsLang"},monthsLabels:{type:Array},daysLabels:{type:Array},startDayNumber:{type:String},events:{type:Object,value:[{title:"E01",content:"Muestreo ...",date:"2020-02-20",category:"blue",color:"#000"}]},progConfigCalendarTableHeaderFields:{type:Object,value:programProgConfigCalendar_progConfigCalendarTableHeaderFields},weekDaysDisabled:{type:Object,value:["Sunday","Saturday"]},tableTitle:{type:Object,value:{label_en:"Scheduled program locations",label_es:"Tabla de ubicaciones programadas para el programa"}},selectedProgram:{type:Object}}}static get template(){return html`
        <style>
            p.tableTitle{
                margin-top: 0px;
                margin-bottom: 3px;
                color: #4285f4;
                font-size:30px;
            }        
        </style>    
        <mp-calendar id="Jan" show-days-in-month="42" first-day-of-week="[[startDayNumber]]" day-labels="[[daysLabels]]" month-labels="[[monthsLabels]]" 
            disable-prev-days="true" disable-next-days="true" theme="light-blue" disabled-days="[[weekDaysDisabled]]" events-object="[[events]]"></mp-calendar> 
        <div>
            <p class="tableTitle">{{labelValue(selectedLanguage, tableTitle)}} {{selectedProgram.name}}</p>
        </div>
        <div>
        <vaadingrid-singleselect style="width:750px;" id="mygridid" headerfields="{{progConfigCalendarTableHeaderFields}}" 
            rowcontainer="{{events}}" selected-object="{{selectedObject}}"
            on-selected-object-changed="pointClicked"></vaadingrid-singleselect>
        </div>
        `}pointClicked(){//This does nothing, remove if so
}labelsLang(){if("es"==this.selectedLanguage){this.monthsLabels=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];this.daysLabels=["Domingo","Lunes","Martes","Mi\xE9rcoles","Jueves","Viernes","S\xE1bado"];this.startDayNumber="1";return}else{this.monthsLabels=["January","February","March","April","May","June","July","August","September","October","November","December"];this.daysLabels=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];this.startDayNumber="0";return}}}customElements.define("em-demo-a-prog-configcalendar",EmDemoAProgConfigcalendar);