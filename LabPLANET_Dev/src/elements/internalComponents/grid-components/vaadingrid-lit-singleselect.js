import {LitElement, html} from 'lit-element';
import {render} from 'lit-html';

// import custom theme for the grid
//import './grid-custom-theme.js';

import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-filter-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-filter.js';
import '@vaadin/vaadin-grid/vaadin-grid-sorter.js'
import '@vaadin/vaadin-checkbox/vaadin-checkbox.js';

class vaadingridLitSingleSelect extends LitElement {

  static get properties() {
    return {
      rowcontainer: {
        //hasChanged: () => true // see https://github.com/Polymer/lit-element/issues/107#issuecomment-416376381     
      }
    }
  }
  
  constructor() {
    super();
    this._boundToggleDetailsRenderer = this.toggleDetailsRenderer.bind(this); // need this to invoke class methods in renderers
  }
  
  firstUpdated() {
    super.firstUpdated();
    
    // fetch('https://demo.vaadin.com/demo-data/1.0/people?count=200')
    //   .then(r => r.json())
    //   .then(data => {
    //     this.rowcontainer = data.result;
    //   });
  }

  render() {
    return html`
      <style>
        .address {
          white-space: normal;
        }

        vaadin-grid-filter {
          display: flex;
        }

        vaadin-text-field {
          max-width: 100%;
        }
      </style>

      <vaadin-grid .items="${this.rowcontainer}" .rowDetailsRenderer="${this.rowDetailsRenderer}">
        <vaadin-grid-column width="50px" flex-grow="0" header="#" .renderer="${this.indexRenderer}"></vaadin-grid-column>
        <vaadin-grid-filter-column path="firstName" header="First name"></vaadin-grid-filter-column>
        <vaadin-grid-sort-column path="lastName" header="Last name"></vaadin-grid-sort-column>
        <vaadin-grid-column width="150px" header="Address" .renderer="${this.addressRenderer}"></vaadin-grid-column>
        <vaadin-grid-column width="150px" path="email" .headerRenderer="${this.emailHeaderRenderer}"></vaadin-grid-column>
        <vaadin-grid-column .renderer="${this._boundToggleDetailsRenderer}"></vaadin-grid-column>
      </vaadin-grid>
    `;
  }
  
  indexRenderer(root, column, rowData) {
    return;
    render(
      html`
        <div>${rowData.index}</div>
      `, 
      root
    );
  }
  
  addressRenderer(root, column, rowData) {
    return;
    render(
      html`
        <span class="address">${rowData.item.address.street}, ${rowData.item.address.city}</span>
      `, 
      root
    );
  }
  
  emailHeaderRenderer(root) {
    return;
    render(
      html`
        <vaadin-grid-sorter path="email">Email</vaadin-grid-sorter>
        <vaadin-grid-filter path="email">
          <vaadin-text-field 
            slot="filter" 
            focus-target 
            theme="small"
            @value-changed="${(e) => e.target.parentNode.value = e.detail.value}"
          ></vaadin-text-field>
        </vaadin-grid-filter>
      `,
      root
    );
  }
  
  get grid() {
    return this.shadowRoot.querySelector('vaadin-grid');
  }
  
  _toggleDetails(value, item) {
    if (value) {
      this.grid.openItemDetails(item);
    } else {
      this.grid.closeItemDetails(item);
    }
  }
  
  toggleDetailsRenderer(root, column, rowData) {
    // only render the checkbox once, to avoid re-creating during subsequent calls
    if (!root.firstElementChild) {
      render(
        html`
          <vaadin-checkbox 
            @checked-changed="${e => this._toggleDetails(e.detail.value, root.item)}"
          >
            Show Details
          </vaadin-checkbox>
        `, 
        root
      );
    }
    // store the item to avoid grid virtual scrolling reusing DOM nodes to mess it up
    root.item = rowData.item;
    root.firstElementChild.checked = this.grid.detailsOpenedItems.indexOf(root.item) > -1;
  }
  
  rowDetailsRenderer(root, column, rowData) {
    render(
      html`
        Hi! My name is ${rowData.item.firstName}!
      `, 
      root
    );    
  }
};

customElements.define('vaadingrid-lit-singleselect', vaadingridLitSingleSelect);