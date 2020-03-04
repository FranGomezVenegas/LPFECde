import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import '@polymer/paper-button/paper-button';
import './shared-styles.js';
import '@vaadin/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import '@vaadin/vaadin-grid/vaadin-grid-filter'; 
import '@vaadin/vaadin-grid/vaadin-grid-filter-column'; 

class ListModalAddsampleanalysis extends PolymerElement {
    static get properties() {
        return {
            listRows: {
                type:Array
                ,
                value: [
                {code: 'LOD', method_name: 'LOD Method', method_version: 1}]
            },
        }
    }
/*        <script>
    // Customize the "Address" column's renderer
    document.querySelector('#addresscolumn').renderer = (root, grid, rowData) => {
      root.textContent = `${rowData.item.address.street}, ${rowData.item.address.city}`;
    };

    // Populate the grid with data
    const grid = document.querySelector('vaadin-grid');
    fetch('https://demo.vaadin.com/demo-data/1.0/people?count=200')
      .then(res => res.json())
      .then(json => grid.items = json.result);
  </script>        
*/    
    static get template() {
        return html`
  
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
            width: 450px;
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
        
        `;
    } 
    actionOnSel(){
        //console.log('actionOnSel');
    }   
    dialogConfirmed(){
        //console.log('clicked', this.$.mygrid.getSelectedRows());        
        this.value='confirmed';
        this.dispatchEvent(new CustomEvent('dialog-button-clicked', {
            bubbles: true,
            composed: true,
            detail: {
            'buttonName': this.name,
            'value': this.value,
            'dialogState': 'confirmed',
            'selectedItems': this.$.mygridid.selectedItems   
            }
        })); 
        this.$.mygridid.selectedItems=[];  
    }        
    dialogCanceled(){
        //console.log('clicked', this.value);
        this.value='confirmed';
        this.dispatchEvent(new CustomEvent('dialog-button-clicked', {
            bubbles: true,
            composed: true,
            detail: {
            'buttonName': this.name,
            'value': this.value,
            'dialogState': 'canceled'
            }
        }));    
    }
    /*ready(){
        this.addEventListener('toast-error', (e) => this.toastError(e) );
    } */       
}

customElements.define('list-modal-addsampleanalysis', ListModalAddsampleanalysis);