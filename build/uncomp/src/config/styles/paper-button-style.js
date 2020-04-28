const documentContainer=document.createElement("div");documentContainer.setAttribute("style","display: none;");documentContainer.innerHTML=`
  <dom-module id="paper-button-style">
    <template>
      <style>
        paper-button.sopIconAndBadgePendingSop{
          position: relative;
          height: 20px;
          width: 20px;
        }        
        paper-button.sopIconAndBadgeAllUserSop{
          position: fixed;
          top: 5px;
          left: 45px;
          --paper-badge-background: var(--google-blue-700);
        }      
      </style>
    </template>
  </dom-module>`;document.head.appendChild(documentContainer);