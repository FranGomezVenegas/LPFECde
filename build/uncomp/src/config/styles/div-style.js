const documentContainer=document.createElement("div");documentContainer.setAttribute("style","display: none;");documentContainer.innerHTML=`
  <dom-module id="div-style">
    <template>
      <style>
        div.wrapperMySops{
            display: flex;
        }
        div.sopIconAndBadge {
            position: relative; 
            width:80px;
            height:80px;
        }
        div.tabsContent{height: 35px;}
        div.tabItem{ float: left; height: 35px; color:#0f9d58;}     
        div.closeTabItem{ float: right;} 
        
        div.appHeaderSplit {
          height: 100%;
          width: 15%; 80%; 
          position: fixed;
          z-index: 1;
          top: 0px;
          overflow-x: hidden;
          padding-top: 0px;            
        }      
        div.appHeaderLeft {
          display: flex;
          z-index: 1;
          top: 0%;
          left: 10px;
          -- background: #032bbc; /* Old browsers */
          -- background: -moz-linear-gradient(top, #032bbc 0%, #2989d8 5%, #b3cfe5 15%, #ffffff 37%, #ffffff 54%, #032bbc 88%, #207cca 88%, #207cca 88%, #032bbc 88%, #207cca 91%, #032bbc 93%, #2989d8 96%, #b3cfe5 100%, #b3cfe5 101%); /* FF3.6-15 */
          -- background: -webkit-linear-gradient(top, #032bbc 0%,#2989d8 5%,#b3cfe5 15%,#ffffff 37%,#ffffff 54%,#032bbc 88%,#207cca 88%,#207cca 88%,#032bbc 88%,#207cca 91%,#032bbc 93%,#2989d8 96%,#b3cfe5 100%,#b3cfe5 101%); /* Chrome10-25,Safari5.1-6 */
          -- background: linear-gradient(to bottom, #032bbc 0%,#2989d8 5%,#b3cfe5 15%,#ffffff 37%,#ffffff 54%,#032bbc 88%,#207cca 88%,#207cca 88%,#032bbc 88%,#207cca 91%,#032bbc 93%,#2989d8 96%,#b3cfe5 100%,#b3cfe5 101%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
          -- filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#032bbc', endColorstr='#b3cfe5',GradientType=0 ); /* IE6-9 */
        }
        div.appHeaderLeftIcon {
          display: flex;
          z-index: 1;
          top: 0%;
          left: 60px;
          -- background: #032bbc; /* Old browsers */
          -- background: -moz-linear-gradient(top, #032bbc 0%, #2989d8 5%, #b3cfe5 15%, #ffffff 37%, #ffffff 54%, #032bbc 88%, #207cca 88%, #207cca 88%, #032bbc 88%, #207cca 91%, #032bbc 93%, #2989d8 96%, #b3cfe5 100%, #b3cfe5 101%); /* FF3.6-15 */
          -- background: -webkit-linear-gradient(top, #032bbc 0%,#2989d8 5%,#b3cfe5 15%,#ffffff 37%,#ffffff 54%,#032bbc 88%,#207cca 88%,#207cca 88%,#032bbc 88%,#207cca 91%,#032bbc 93%,#2989d8 96%,#b3cfe5 100%,#b3cfe5 101%); /* Chrome10-25,Safari5.1-6 */
          -- background: linear-gradient(to bottom, #032bbc 0%,#2989d8 5%,#b3cfe5 15%,#ffffff 37%,#ffffff 54%,#032bbc 88%,#207cca 88%,#207cca 88%,#032bbc 88%,#207cca 91%,#032bbc 93%,#2989d8 96%,#b3cfe5 100%,#b3cfe5 101%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
          -- filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#032bbc', endColorstr='#b3cfe5',GradientType=0 ); /* IE6-9 */
        }        
        div.appHeaderCenter {
          top: 0%;
          left: 15%; 
          width: 50%;
          height: 100%;    
          position:relative;
        }
        div.appHeaderRight {
          top: 0%;
          left: 65%; 
          width: 100%;
          height: 100%; 
          display: flex; 
        }  
        #appLoginMainDiv {
          margin-top: 25px;
          font-size: 21px;
          text-align: center;
          animation: fadein 2s;
          -moz-animation: fadein 2s; /* Firefox */
          -webkit-animation: fadein 2s; /* Safari and Chrome */
          -o-animation: fadein 2s; /* Opera */
        }
        @keyframes fadein {
            from {
                opacity:0;
            }
            to {
                opacity:1;
            }
        }
        @-moz-keyframes fadein { /* Firefox */
            from {
                opacity:0;
            }
            to {
                opacity:1;
            }
        }
        @-webkit-keyframes fadein { /* Safari and Chrome */
            from {
                opacity:0;
            }
            to {
                opacity:1;
            }
        }
        @-o-keyframes fadein { /* Opera */
            from {
                opacity:0;
            }
            to {
                opacity: 1;
            }
        }         
        div.appLoginForm{
          overflow: hidden; text-align:center; width: 320px;
        }
        div.internalComponentCardFormMainDiv {
          background-color: #fefefe;
          margin: auto;
          padding: 20px;
          border: 1px solid #888;
          width: 80%;
        }          
        div.internalComponentCardFormMainDivBgimg {
          background-image: url('./images/hexagon-white-blue-light.jpg'), url('./images/app-login/LabPLANET_Atom54x42.png'); 
          background-repeat: no-repeat, no-repeat;  
          width: inherit, inherit;  
          height: inherit, inherit;     
        } 
        div.confirmUserDialogModalMain {
          position: fixed;
          left: 0;
          top: 0;
          height: 100vh;
          width: 100vw;
          z-index: 100;     
          background-color: rgba(30,30,30, 0.8);
          display: flex;
          transition: opacity 0.3s ease-in;
          -webkit-transition: opacity 0.3s ease-in;
        }
        div.confirmUserDialogModalDialog {
          position: fixed;
          top: 50%;
          left: 50%;
          padding: 25px;
          transform: translate(-50%, -50%);
          width: var(--modal-width, 500px);
          max-width: var(--modal-max-width, 80%);
          height: var(--modal-height, 300px);
          max-height: 100%;
          z-index: 1001;
          background-color: #fff;
          transition: opacity 0.3s ease-in;
          -webkit-transition: opacity 0.3s ease-in;
          box-shadow: 6px 6px 16px #000;
          border-radius: var(--modal-border-radius, 10px);
          background-image: url('./images/app-login/login-hexagon-background.png');
          width: 400px; 
        }
        div.esignDialogModalMain {
          position: fixed;
          left: 0;
          top: 0;
          height: 100vh;
          width: 100vw;
          z-index: 100;     
          background-color: rgba(30,30,30, 0.8);
          display: flex;
          transition: opacity 0.3s ease-in;
          -webkit-transition: opacity 0.3s ease-in;
        }
        div.esignDialogModalDialog {
          position: fixed;
          top: 50%;
          left: 50%;
          padding: 25px;
          transform: translate(-50%, -50%);
          width: var(--modal-width, 500px);
          max-width: var(--modal-max-width, 80%);
          height: var(--modal-height, 300px);
          max-height: 100%;
          z-index: 1001;
          background-color: #fff;
          transition: opacity 0.3s ease-in;
          -webkit-transition: opacity 0.3s ease-in;
          box-shadow: 6px 6px 16px #000;
          border-radius: var(--modal-border-radius, 10px);
          background-image: url('./images/app-login/login-hexagon-background.png');
          width: 400px; 
        }                         
      </style>
    </template>
  </dom-module>`;document.head.appendChild(documentContainer);