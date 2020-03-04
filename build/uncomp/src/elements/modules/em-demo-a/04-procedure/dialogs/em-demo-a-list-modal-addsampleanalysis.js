import{PolymerElement,html}from"../../../../../../node_modules/@polymer/polymer/polymer-element.js";import"../../../../../../node_modules/@polymer/paper-button/paper-button.js";import"../../03config/css/Theme01/modal-dialogs.js";import"../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid.js";import"../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-selection-column.js";import"../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-sort-column.js";import"../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-filter.js";import"../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-filter-column.js";class emDemoAListModalAddsampleanalysis extends PolymerElement{static get properties(){return{listRows:{type:Array,value:[{code:"LOD",method_name:"LOD Method",method_version:1}]}}}static get template(){return html`  
        <style include="modal-dialogs">
            .modal-content {
                width: 450px;
            } 
        </style>        

        <div class="modal-content bgimg">
            <div>
                <paper-button name="cancel" dialog-dismiss on-click="dialogCanceled">Cancel</paper-button>
                <paper-button name="confirm" dialog-confirm autofocus on-click="dialogConfirmed">Accept</paper-button>
            </div>
        <div>
            <vaadin-grid id="mygridid" items="{{listRows}}">  
                <vaadin-grid-selection-column  auto-select></vaadin-grid-selection-column>
                <template is="dom-repeat" items="{{listHeader}}" as="fld">        
                    <vaadin-grid-column resizable path="{{fld.name}}" header="{{fld.label_en}}"></vaadin-grid-column>
                </template>
            </vaadin-grid>      
        </div>  
        </div>  
        `}actionOnSel(){//console.log('actionOnSel');
}dialogConfirmed(){//console.log('clicked', this.$.mygrid.getSelectedRows());        
this.value="confirmed";this.dispatchEvent(new CustomEvent("dialog-button-clicked",{bubbles:!0,composed:!0,detail:{buttonName:this.name,value:this.value,dialogState:"confirmed",selectedItems:this.$.mygridid.selectedItems}}));this.$.mygridid.selectedItems=[]}dialogCanceled(){//console.log('clicked', this.value);
this.value="confirmed";this.dispatchEvent(new CustomEvent("dialog-button-clicked",{bubbles:!0,composed:!0,detail:{buttonName:this.name,value:this.value,dialogState:"canceled"}}))}}customElements.define("em-demo-a-list-modal-addsampleanalysis",emDemoAListModalAddsampleanalysis);