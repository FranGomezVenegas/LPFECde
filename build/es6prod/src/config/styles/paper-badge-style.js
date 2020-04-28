const documentContainer=document.createElement("div");documentContainer.setAttribute("style","display: none;");documentContainer.innerHTML=`
  <dom-module id="paper-badge-style">
    <template>
      <style>
        paper-badge.pendingSop{
            top:  40px;
            left: 65px;
            --paper-badge-background: var(--google-red-500);
        }
        paper-badge.allUserSop{
            top:  60px;
            left: 65px;
            --paper-badge-background: var(--google-blue-700);
        }
      </style>
    </template>
  </dom-module>`;document.head.appendChild(documentContainer);