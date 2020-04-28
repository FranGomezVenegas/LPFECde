define(["../../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../../node_modules/@polymer/iron-selector/iron-selector.js","../../../../../node_modules/@polymer/iron-collapse/iron-collapse.js","../../../../config/styles/app-procedure-list-shared-style.js","../../../../../node_modules/pwa-helpers/connect-mixin.js","../../../../store.js","../../../../config/app-config.js","../../mixin/app-procedurelist-api.js","../../Redux/actions/tabs_actions.js","../../app-functions/fields-methods.js"],function(_polymerElement,_ironSelector,_ironCollapse,_appProcedureListSharedStyle,_connectMixin,_store,_appConfig,_appProcedurelistApi,_tabs_actions,_fieldsMethods){"use strict";class AppProceduresList extends(0,_fieldsMethods.FieldsMethods)((0,_appProcedurelistApi.ProcedureList)((0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement))){static get properties(){return{finalToken:{type:String,observer:"onFinalTokenFilled"},procedureList:{type:Object,notify:!0},horizontal:{type:Boolean},opened:{type:Boolean,value:!0,reflectToAttribute:!0},noAnimation:{type:Boolean},selectedLanguage:{type:String},paneTitle:{type:Object,value:_appConfig.proceduresListPaneTitle},titleValue:String,titleIcon:String,fieldTitlePendingSOP:{type:Object,value:{label_en:"You have pending SOPs",label_es:"Tienes PNTs pendientes"}}}}stateChanged(state){this.selectedLanguage=state.app.user.appLanguage;this.getText();//this.$.collapse.value=this.getText(this.opened);
//        console.log('app-procedures-list.js >> stateChanged', 'Begin');
if(this.finalToken!=state.app.user.finalToken){this.finalToken=state.app.user.finalToken}if(this.selectedLanguage!=state.app.user.appLanguage){this.selectedLanguage=state.app.user.appLanguage}if(this.procedureList!=state.app.user.appProcedureList){this.procedureList=state.app.user.appProcedureList}//        console.log('app-procedures-list.js >> stateChanged', 'End'
//            , this.finalToken, this.selectedLanguage, this.procedureList);
}toggle(){//console.log('app-procedures-list >> toggle');
if(!this.procedureList){this.getProcedureList({finalToken:this.finalToken});return}if(0==this.procedureList.length){this.getProcedureList({finalToken:this.finalToken});return}this.$.collapse.toggle();this.getText()}getText(){if(this.opened){this.titleValue=this.labelValue(this.selectedLanguage,this.paneTitle.open);this.titleIcon=this.paneTitle.open.icon_name;return}this.titleValue=this.labelValue(this.selectedLanguage,this.paneTitle.closed);this.titleIcon=this.paneTitle.closed.icon_name}static get template(){return _polymerElement.html`      
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
        `}crearTab(e){if(!_appConfig.isTabOpenable){if(null==e.detail.procEvent.sops_passed||!1==e.detail.procEvent.sops_passed){this.dispatchEvent(new CustomEvent("toast-error",{bubbles:!0,composed:!0,detail:"No est\xE1 cualificado para abrir esta pantalla, revise los PNTs asociados."}));return}}var esignRequired=!1;if(!e.detail.procEvent.esign_required){esignRequired=!1}else{esignRequired=e.detail.procEvent.esign_required}var confirmUserRequired=!1;if(!e.detail.procEvent.confirm_required){confirmUserRequired=!1}else{confirmUserRequired=e.detail.procEvent.confirm_required}//console.log('e.detail.procEvent', e.detail.procEvent);
e.stopPropagation();_store.store.dispatch((0,_tabs_actions.addTab)({lp_frontend_page_name:e.detail.procEvent.lp_frontend_page_name,tabName:e.detail.procedure.name+"-"+e.detail.procEvent.lp_frontend_page_name,tabLabel_en:e.detail.procedure.label_en+"-"+e.detail.procEvent.label_en,tabLabel_es:e.detail.procedure.label_es+"-"+e.detail.procEvent.label_es,sop_list:e.detail.procEvent.sops.sop_list,sops:e.detail.procEvent.sops,sops_passed:e.detail.procEvent.sops_passed,procedure:e.detail.procedure,tabEsignRequired:esignRequired,tabConfirmUserRequired:confirmUserRequired}));var curTab=[];curTab.tabName=e.detail.procedure.name+"-"+e.detail.procEvent.lp_frontend_page_name;curTab.sops=e.detail.procEvent.sops,curTab.currTabEsignRequired=esignRequired;curTab.currTabConfirmUserRequired=confirmUserRequired;//console.log('setCurrentTab', 'curTab', curTab);
_store.store.dispatch((0,_tabs_actions.setCurrentTab)(curTab));//store.dispatch(setCurrentTab(e.detail.procedure.name+'-'+e.detail.procEvent.name));        
}onFinalTokenFilled(){return;//        console.log('app-procedures-list.js >> onFinalTokenFilled', this.finalToken);
this.getProcedureList({finalToken:this.finalToken})}}customElements.define("app-procedures-list",AppProceduresList)});