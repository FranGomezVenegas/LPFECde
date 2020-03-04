import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import './shared-styles.js';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../store.js';

//import { doLogin } from './Redux/actions/app_actions';


/**
 * `sample-login` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class sampleLogin extends connect(store)(PolymerElement) {
  static get properties() {
    return {
      finalToken: {
        type: String,
        notify: true
      },
      text: String,
      loading: {
        type: Boolean,
        value: false
      },
      userName: String,
      password: String,
      authenticationToken: Array,  
      userRoles: Array,  


/*            name: "templatesList",
            label_en: "Templates",
            label_es: "Plantillas",
            type: "list",
            value: "",
            read_only: false,
            values: [  
              {
                "keyName":"Template 1",                        
                "keyValue_en":"Template 1", "keyValue_es":"Plantilla 1"              
              },
              {
                "keyName":"Template 2",                        
                "keyValue_en":"Template 2", "keyValue_es":"Plantilla 2"              
              }
            ]
*/            
      templates: {
          type: Array,          notify: true,          bubble: true,
          structure: [
              {
                "name": "userRole",
                "label_en": "Role", "label_es": "Rol",
                "type": "list",
                "value": "Admin",
                "read_only": true,
                "items" : [{
                  "keyName":"Analyst",                        
                  "keyValue_en":"Analyst", "keyValue_es":"valor1"              
                }]
              }            
          ]
      },
      selectedTemplate: {
        type: String, value: "Template 1"
      },
      templateIndex: Number,
      sampleTemplate: {
          type: Array,          notify: true,          bubble: true,
          value: [
            {   
            "name": "Template 1",
            "version": 1,
            "fields": [
                {
                  "name": "SamplingComment",
                  "label_en": "Comment", "label_es": "Comentario",
                  "type": "text",
                  "password": "False",
                  "value": "labplanet",
                  "read_only": false
                },    
                {
                  "name": "fecha",
                  "label_en": "Date", "label_es": "Fecha",
                  "type": "date",
                  "password": "False",
                  "value": "01/05/2018",
                  "read_only": false
                },
                {
                  "name": "buttonLog",
                  "label_en": "Log", "label_es": "Crear",
                  "type": "button",              
                  "value": "",
                  "read_only": false
                },            
                {
                  "name": "userRole",
                  "label_en": "Role", "label_es": "Rol",
                  "type": "list",
                  "value": "Admin",
                  "read_only": false,
                  "items" : [{
                    "keyName":"Analyst",                        
                    "keyValue_en":"Analyst", "keyValue_es":"valor1"              
                  }]
                }
            ] 
          } , 
          {   
            "name": "Template 2"      ,
            "fields": [
                {
                  "name": "SamplingComment",
                  "label_en": "Comment2", "label_es": "Comentario2",
                  "type": "text",
                  "password": "False",
                  "value": "labplanet2",
                  "read_only": false
                },    
                {
                  "name": "fecha",
                  "label_en": "Date", "label_es": "Fecha",
                  "type": "date",
                  "password": "False",
                  "value": "01/05/2018",
                  "read_only": false
                },
                {
                  "name": "buttonLog",
                  "label_en": "Log", "label_es": "Crear",
                  "type": "button",              
                  "value": "",
                  "read_only": false
                }
            ] 
          }                                    
          ]
        },
        menuItems: {
          type: Array,
          value() {
            return [
              {name: 'Pizza', ordered: 0},
              {name: 'Pasta', ordered: 0},
              {name: 'Toast', ordered: 0}
            ];
          }
        }        
    }
  }
  static get template() {
    return html`
    <style >
       .draft-ribbon {
        pointer-events: none;
        position: absolute;
        top: -2px;
        left: -2px;
        height: 60px;
        width: 60px;
        overflow: hidden;
       }
        .draft-ribbon .draft-ribbon-text {
          position: absolute;
          top: 12px;
          left: -29px;
          width: 100px;
          height: 20px;
          line-height: 20px;
          font-size: .715em;
          color: darkred;
          text-transform: uppercase;
          text-align: center;
          background-color: #fd5e60;;
          -webkit-transform: rotate(-45deg);
          -moz-transform: rotate(-45deg);
          -ms-transform: rotate(-45deg);
          -o-transform: rotate(-45deg);
          transform: rotate(-45deg);
          -webkit-box-shadow: 0 1px 3px 0 rgba(0,0,0,.2);
          -moz-box-shadow: 0 1px 3px 0 rgba(0,0,0,.2);
          box-shadow: 0 1px 3px 0 rgba(0,0,0,.2);
        }
      .bgimg {
          background-image: url('./images/app-login/login-hexagon-background.png');   
          width: 320px;       
      }             
      </style>

  <div class="container bgimg">    
    <template is="dom-repeat" id="templates" items="{{sampleTemplate}}">
    <!-- filter="{{computeFilter(searchString)}}" > -->
      <b>template# {{index}}</b>
      <div>Name: <span>{{item.name}}</span></div>
      <div>Version: <span>{{item.version}}</span></div>      
      <template is="dom-repeat" items="{{item.fields}}" index-as="report_no">
        <field-controller index="{{index}}" on-field-button-clicked="fieldButtonClicked" 
          on-field-list-value-changed="onListChange" name="{{report.name}}" 
          field="{{item}}" value="{{item.value}}"></field-controller>
      </template>
      <br />
    </template>
  </div>
  <div class="draft-ribbon" style=""><div class="draft-ribbon-text">draft</div></div>
  <template is="dom-repeat" id="menu" items="{{menuItems}}">
  <div>
    <span>{{item.name}}</span>
    <span>{{item.ordered}}</span>
    <button on-click="order">Order</button>
  </div>
</template>
  <paper-spinner-lite alt="Authenticating user and password" width="6px" active="[[loading]]"></paper-spinner-lite>

    `;
  }
  order(e) {
    //console.log(e.model.item);
    e.model.set('item.ordered', e.model.item.ordered+1);
  }
  fieldButtonClicked(e) {    
    //console.log('fieldButtonClicked', e.model.template, e.detail);
    if (e.detail.buttonName=="buttonLog"){ 
      //console.log(this.template, this.report);
//        this.fields[3].value // Reset button value to be clickable back again.        
//        this.login();
    }       
  }  
  computeFilter(string) {
    if (!string) {
      // set filter to null to disable filtering
      return null;
    } else {
      // return a filter function for the current search string
      string = string.toLowerCase();
      return function(template) {
        var name = template.name.toLowerCase();
        var value = template.value.toLowerCase();
        return (name.indexOf(string) != -1 ||
                value.indexOf(string) != -1);
      };
    }
  }      


    onListChange(e) {    
      //console.log('onListChange', e.detail);
      if (e.detail.name=="userRole"){ 
        this.doLogin(e.detail.value);
      }       
    }
    doLogin(userRole) {
      this.$.ajaxFinalToken.set( 
        'params', { 
            "actionName": 'finaltoken'  , "myToken": this.authenticationToken.myToken , 'userRole': userRole });        
      this.$.ajaxFinalToken.generateRequest();        
    }  
  }

customElements.define('sample-login', sampleLogin);