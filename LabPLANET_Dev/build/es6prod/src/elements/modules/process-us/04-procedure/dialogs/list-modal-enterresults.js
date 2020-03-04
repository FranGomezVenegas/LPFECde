define(["../../../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../../../node_modules/@polymer/paper-button/paper-button.js","./shared-styles.js","../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid.js","../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-selection-column.js","../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-sort-column.js","../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-filter.js","../../../../../../node_modules/@polymer/paper-dialog/paper-dialog.js","../../../../../../node_modules/@polymer/paper-input/paper-input.js"],function(_polymerElement,_paperButton,_sharedStyles,_vaadinGrid,_vaadinGridSelectionColumn,_vaadinGridSortColumn,_vaadinGridFilter,_paperDialog,_paperInput){"use strict";class ListModalEnterresults extends _polymerElement.PolymerElement{static get properties(){return{finalToken:String,schemaPrefix:String,fieldCol1:{type:String,value:"item.result_id"}}}static get template(){return _polymerElement.html`
  
        <style include="shared-styles">
        /* The Modal (background) */
        .modal2 {
            display: none; /* Hidden by default */
            position: fixed; /* Stay in place */
            z-index: 1; /* Sit on top */
            padding-top: 100px; /* Location of the box */
            left: 0;
            top: 0;
            width: 100%; /* Full width */
            height: 100%; /* Full height */
            overflow: auto; /* Enable scroll if needed */
            background-color: rgb(0,0,0); /* Fallback color */
            background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
        }
        
        .modal-content {
            background-color: #fefefe;
            margin: auto;
            padding: 20px;
            border: 1px solid #888;
            width: 650px;
            left:350px;
        }        
        .bgimg {
            background-image: url('./images/app-login/login-hexagon-background.png');   
            background-repeat: no-repeat;
            background-size: cover;             
            /* width: 90%;        */
        }        
        /* The Close Button */
        .close {
            color: #aaaaaa;
            float: right;
            font-size: 58px;
            font-weight: bold;
        }
        
        .close:hover,
        .close:focus {
            color: #000;
            text-decoration: none;
            cursor: pointer;
        }
        .closed {
            display: none
        }   
        vaadin-grid {
            width:645px;
        } 
        .resultBlue {
            --paper-input-input-color: blue;
            color: blue;
        }       
        </style>

        <div class="modal-content bgimg">
        <template is="dom-repeat" items="{{dialogButtons}}" as="currentfield">       
          <field-controller on-keydown="keyPressed" on-field-button-clicked="dialogConfirmed" on-field-list-value-changed="onListChange" id="{{currentfield.name}}"  field="{{currentfield}}"></field-controller>
        </template>           
        <div>
            <vaadin-grid id="mygridid" items="{{listRows}}">  
            <!-- <vaadin-grid-selection-column name="check"  auto-select></vaadin-grid-selection-column> -->

            <template name="sampleAnalysis" class="row-details">
                <div class="details">
                Spec Eval: {{item.spec_eval}} Detail: {{item.spec_eval_detail}}
                </div> 
            </template>
            <vaadin-grid-column style="width: 30px;">
                        <template style="width: 51px;" class="header">{{labelValue(selectedLanguage, fld)}}</template>
                        <template>
                            <vaadin-checkbox aria-label$="Ver Detalle" unchecked checked="{{detailsOpened}}">
                                <img style="height:24px; width: 24px;" src="{{getSampleStatusIcon(item.status)}}"> 
                            </vaadin-checkbox>
                        </template>
                    </vaadin-grid-column>
                    
                <template is="dom-repeat" items="{{listHeader}}" as="fld">               
                    <template is="dom-if" if="{{!fld.hidden}}">
                        <template is="dom-if" if="{{!fld.editable}}">
                            <vaadin-grid-column resizable path="{{fld.name}}" header="{{fld.label_en}}"></vaadin-grid-column>
                        </template>
                        <template is="dom-if" if="{{fld.editable}}">
                        <template is="dom-if" param-type="{{fld.param_type}}" if="{{editableIsInteger}}">
                            <vaadin-grid-column resizable >          
                                <template class="header">{{fld.label_en}}</template>
                                <template>
                                    <paper-input style="{{resultClass}}" type="{{fld.param_type}}" on-change="enterResult" type="text" 
                                        row-index="{{item.index}}" index="{{index}}" id="{{index}}" required value="{{item.raw_value}}" 
                                        readonly$="[[!fld.editable]]"></paper-input>
                                </template>
                            </vaadin-grid-column>                     
                        </template>
                        </template>
                    </template>
                </template>               
            </vaadin-grid>                   
        </div>        
        `}resultClass(){return"resultBlue"}editableIsInteger(e){console.log("editableIsInteger",e);//this.$.mygridid.__data.items[e.currentTarget.id].param_type);
if("INTEGER"==fld){return!0}if("FLOAT"==fld){return!0}return!0}enterResult(e){console.log("enterResult",e.currentTarget.id,e.currentTarget.value,this.$.mygridid.__data.items[e.currentTarget.id].result_id);this.$.mygridid.__data.items[e.currentTarget.id].raw_value=e.currentTarget.value;let resultId=this.$.mygridid.__data.items[e.currentTarget.id].result_id,rawValue=e.currentTarget.value;console.log(resultId,rawValue);var actionName="ENTERRESULT",paramsUrl="actionName="+actionName+"&finalToken="+this.finalToken+"&schemaPrefix="+this.schemaPrefix+"&resultId="+resultId+"&rawValueResult="+rawValue,datas=[];datas.schemaPrefix=this.schemaPrefix;datas.actionName=actionName;datas.paramsUrl=paramsUrl;//        console.log('process-us-sample-reception >> itemSelected >> this.SampleAPI', paramsUrl, datas);            
this.sampleAPI(datas)}isEditable(fld){//console.log('isEditable', fld);
if("1raw_value"==fld){return!0}return!1}actionOnSel(){console.log("actionOnSel")}dialogConfirmed(e){console.log("clicked",this.$.mygridid.selectedItems);this.value="confirmed";this.dispatchEvent(new CustomEvent("dialog-button-clicked",{bubbles:!0,composed:!0,detail:{buttonName:this.name,value:this.value,dialogState:"confirmed",selectedItems:this.$.mygridid.selectedItems}}));this.$.mygridid.selectedItems=[]}dialogCanceled(){//console.log('clicked', this.value);
this.value="confirmed";this.dispatchEvent(new CustomEvent("dialog-button-clicked",{bubbles:!0,composed:!0,detail:{buttonName:this.name,value:this.value,dialogState:"canceled"}}))}ready(){super.ready();this.$.mygridid.clearCache();this.$.mygridid.selectedIdems=null}}customElements.define("list-modal-enterresults",ListModalEnterresults)});