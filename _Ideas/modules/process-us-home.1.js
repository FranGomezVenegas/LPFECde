import {PolymerElement, html} from '@polymer/polymer/polymer-element';

import '../../internalComponents/pdf-browser-viewer';

/**
 * `process-us-home` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class processUsHome extends PolymerElement {
    static get properties() {
        return {
            
        }
    }

    static get template() {
        return html`
        <style>
        *{
            margin:0;
            padding:0;
          }
          body{
            font-family:arial,sans-serif;
            font-size:100%;
            margin:3em;
            background:#666;
            color:#fff;
          }
          h2,p{
            font-size:100%;
            font-weight:normal;
          }
          ul,li{
            list-style:none;
          }
          ul{
            overflow:hidden;
            padding:3em;
          }
          ul li a{
            text-decoration:none;
            color:#000;
            background:#ffc;
            display:block;
            height:10em;
            width:10em;
            padding:1em;
            -moz-box-shadow:5px 5px 7px rgba(33,33,33,1);
            -webkit-box-shadow: 5px 5px 7px rgba(33,33,33,.7);
            box-shadow: 5px 5px 7px rgba(33,33,33,.7);
            -moz-transition:-moz-transform .15s linear;
            -o-transition:-o-transform .15s linear;
            -webkit-transition:-webkit-transform .15s linear;
          }
          ul li{
            margin:1em;
            float:left;
          }
          ul li h2{
            font-size:140%;
            font-weight:bold;
            padding-bottom:10px;
          }
          ul li p{
            font-family:"Reenie Beanie",arial,sans-serif;
            font-size:180%;
          }
          ul li a{
            -webkit-transform: rotate(-6deg);
            -o-transform: rotate(-6deg);
            -moz-transform:rotate(-6deg);
          }
          ul li:nth-child(even) a{
            -o-transform:rotate(4deg);
            -webkit-transform:rotate(4deg);
            -moz-transform:rotate(4deg);
            position:relative;
            top:5px;
            background:#cfc;
          }
          ul li:nth-child(3n) a{
            -o-transform:rotate(-3deg);
            -webkit-transform:rotate(-3deg);
            -moz-transform:rotate(-3deg);
            position:relative;
            top:-5px;
            background:#ccf;
          }
          ul li:nth-child(5n) a{
            -o-transform:rotate(5deg);
            -webkit-transform:rotate(5deg);
            -moz-transform:rotate(5deg);
            position:relative;
            top:-10px;
          }
          ul li a:hover,ul li a:focus{
            box-shadow:10px 10px 7px rgba(0,0,0,.7);
            -moz-box-shadow:10px 10px 7px rgba(0,0,0,.7);
            -webkit-box-shadow: 10px 10px 7px rgba(0,0,0,.7);
            -webkit-transform: scale(1.25);
            -moz-transform: scale(1.25);
            -o-transform: scale(1.25);
            position:relative;
            z-index:5;
          }
          ol{text-align:center;}
          ol li{display:inline;padding-right:1em;}
          ol li a{color:#fff;}
          
        </style>
        <ul>
        <li>
          <a href="#">
            <h2>Title #1</h2>
            <p>Text Content #1</p>
          </a>
        </li>
        <li>
          <a href="#">
            <h2>Title #2</h2>
            <p>Text Content #2</p>
          </a>
        </li>
        <li>
          <a href="#">
            <h2>Title #3</h2>
            <p>Text Content #3</p>
          </a>
        </li>
        <li>
          <a href="#">
            <h2>Title #4</h2>
            <p>Text Content #4</p>
          </a>
        </li>
        <li>
          <a href="#">
            <h2>Title #5</h2>
            <p>Text Content #5</p>
          </a>
        </li>
        <li>
          <a href="#">
            <h2>Title #6</h2>
            <p>Text Content #6</p>
          </a>
        </li>
        <li>
          <a href="#">
            <h2>Title #2</h2>
            <p>Text Content #2</p>
          </a>
        </li>
        <li>
          <a href="#">
            <h2>Title #7</h2>
            <p>Text Content #7</p>
          </a>
        </li>
        <li>
          <a href="#">
            <h2>Title #8</h2>
            <p>Text Content #8</p>
          </a>
        </li>
      </ul>
    
        Under Development
            <pdf-browser-viewer pdf-url="example.pdf"></pdf-browser-viewer>
<!--            <pdf-element src="example.pdf" width=800 height=600></pdf-element>
            <script type="module" src="pdf-element.js"></script>-->

        `;
    }

    /**
     * Instance of the element is created/upgraded. Use: initializing state,
     * set up event listeners, create shadow dom.
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * Use for one-time configuration of your component after local
     * DOM is initialized.
     */
    ready() {
        super.ready();
    }
}

customElements.define('process-us-home', processUsHome);