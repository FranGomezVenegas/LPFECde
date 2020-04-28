import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import '@polymer/iron-selector/iron-selector';
import '@polymer/iron-collapse/iron-collapse';
import '../../../../config/styles/app-procedure-list-shared-style.js';

import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../../store';
import {isTabOpenable} from '../../../../config/app-config';
import {ProcedureList} from '../../mixin/app-procedurelist-api';
import {addTab,setCurrentTab} from '../../Redux/actions/tabs_actions';
import {proceduresListPaneTitle} from '../../../../config/app-config';
import {FieldsMethods} from '../../../app/app-functions/fields-methods';


class AppProceduresList extends FieldsMethods(ProcedureList(connect(store)(PolymerElement))) {
    static get properties() {
        return {
            finalToken: {type: String, observer: 'onFinalTokenFilled'},
            procedureList: {type: Object, notify:true},
            horizontal: {type: Boolean},
            opened: {type: Boolean, value: true, reflectToAttribute: true},
            noAnimation: {type: Boolean}, 
            selectedLanguage: {type: String},    
            paneTitle: { type: Object, value: proceduresListPaneTitle}, 
            titleValue: String, titleIcon: String,
            fieldTitlePendingSOP:{type: Object, value:{label_en:'You have pending SOPs', label_es:'Tienes PNTs pendientes'}}
        }
    }
    stateChanged(state) {
        this.selectedLanguage=state.app.user.appLanguage;
        this.getText();
        //this.$.collapse.value=this.getText(this.opened);
//        console.log('app-procedures-list.js >> stateChanged', 'Begin');
        if (this.finalToken != state.app.user.finalToken){ 
                this.finalToken = state.app.user.finalToken;}
        if (this.selectedLanguage != state.app.user.appLanguage){ 
            this.selectedLanguage = state.app.user.appLanguage;}
        if (this.procedureList != state.app.user.appProcedureList){ 
                this.procedureList= state.app.user.appProcedureList;}
//        console.log('app-procedures-list.js >> stateChanged', 'End'
//            , this.finalToken, this.selectedLanguage, this.procedureList);
    }   

    toggle() {
        //console.log('app-procedures-list >> toggle');
        if (!this.procedureList){
            this.getProcedureList({finalToken:this.finalToken});                     
            return;
        }
        if (this.procedureList.length==0){
            this.getProcedureList({finalToken:this.finalToken});      
            return;               
        }        
        this.$.collapse.toggle();
        this.getText();
    }   
    getText() {
        if (this.opened){
            this.titleValue=this.labelValue(this.selectedLanguage, this.paneTitle.open);  
            this.titleIcon=this.paneTitle.open.icon_name;          
            return;
        }
        this.titleValue=this.labelValue(this.selectedLanguage, this.paneTitle.closed); 
        this.titleIcon=this.paneTitle.closed.icon_name;                   
    }
    static get template() {
        return html`      
        <style include="shared-style-app-procedure-list"></style>
        <style>
        iron-icon{
            color:cornflowerblue;
        }               
        div.title{
            display:flex;
        }
        </style>
        <div id="title" class="title">
            <iron-icon icon="[[titleIcon]]" on-click="toggle"></iron-icon>
            <vaadin-button id="triggerProcedures" on-click="toggle" aria-expanded\$="[[opened]]" aria-controls="collapse">[[titleValue]]</vaadin-button>
        </div>   
        <iron-collapse id="collapse" hidden="{{!opened}}" opened="{{opened}}" horizontal="[[horizontal]]" no-animation="[[noAnimation]]" tabindex="0">
            
            <template is="dom-repeat" items="{{procedureList.procedures}}" as="currprocedure">   
                <div class="title">
                    <template is="dom-repeat"  items="{{currprocedure.icons_up}}" as="currentfield">                    
                        <field-controller style="padding-top: 0px; padding-bottom: 0px;" id="{{currentfield.name}}" on-field-button-clicked="crearTab" tab-index="{{index}}" field="{{currentfield}}" procedure="{{currprocedure}}"></field-controller>            
                    </template>            
                </div>         

                <template is="dom-repeat"  items="{{currprocedure.definition}}" as="currentfield">                    
                    <field-controller title="{{fieldTitlePendingSOP}}" style="padding-top: 0px; padding-bottom: 0px;" id="{{currentfield.name}}" on-field-tree-list-clicked="crearTab" tab-index="{{index}}" field="{{currentfield}}" procedure="{{currprocedure}}"></field-controller>            
                </template>            

                <div class="title">
                    <template is="dom-repeat"  items="{{currprocedure.icons_down}}" as="currentfield">                    
                        <field-controller style="padding-top: 0px; padding-bottom: 0px;" id="{{currentfield.name}}" on-field-button-clicked="crearTab" tab-index="{{index}}" field="{{currentfield}}" procedure="{{currprocedure}}"></field-controller>            
                    </template>            
                </div>         
            </template> 

        </iron-collapse>   
        `;
    }
    crearTab(e) {
        if (!isTabOpenable){
            if ((e.detail.procEvent.sops_passed==null) || (e.detail.procEvent.sops_passed==false)){
                this.dispatchEvent(new CustomEvent('toast-error', {
                    bubbles: true,
                    composed: true,
                    detail: 'No está cualificado para abrir esta pantalla, revise los PNTs asociados.'
                }));     
                return;
            }
        }
        var esignRequired = false;
        if (!e.detail.procEvent.esign_required){esignRequired = false;
        }else{esignRequired=e.detail.procEvent.esign_required;}

        var confirmUserRequired = false;
        if (!e.detail.procEvent.confirm_required){confirmUserRequired = false;
        }else{confirmUserRequired=e.detail.procEvent.confirm_required;}
//console.log('e.detail.procEvent', e.detail.procEvent);
        e.stopPropagation();
        store.dispatch(addTab({
          lp_frontend_page_name: e.detail.procEvent.lp_frontend_page_name,  
          tabName: e.detail.procedure.name + '-' + e.detail.procEvent.lp_frontend_page_name,
          tabLabel_en: e.detail.procedure.label_en + '-' + e.detail.procEvent.label_en,
          tabLabel_es: e.detail.procedure.label_es + '-' + e.detail.procEvent.label_es,
          sop_list: e.detail.procEvent.sops.sop_list, 
          sops: e.detail.procEvent.sops, 
          sops_passed: e.detail.procEvent.sops_passed,
          procedure: e.detail.procedure, 
          tabEsignRequired: esignRequired, tabConfirmUserRequired: confirmUserRequired
        }));
        var curTab = [];
        curTab.tabName = e.detail.procedure.name+'-'+e.detail.procEvent.lp_frontend_page_name;
        curTab.sops= e.detail.procEvent.sops, 
        curTab.currTabEsignRequired=esignRequired;
        curTab.currTabConfirmUserRequired=confirmUserRequired;
//console.log('setCurrentTab', 'curTab', curTab);
        store.dispatch(setCurrentTab(curTab));    

        //store.dispatch(setCurrentTab(e.detail.procedure.name+'-'+e.detail.procEvent.name));        
    }
    onFinalTokenFilled(){
        return;
//        console.log('app-procedures-list.js >> onFinalTokenFilled', this.finalToken);
        this.getProcedureList({
            finalToken:this.finalToken
          });            
    }    
}
customElements.define('app-procedures-list', AppProceduresList);