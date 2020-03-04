const documentContainer=document.createElement("div");documentContainer.setAttribute("style","display: none;");documentContainer.innerHTML=`
  <dom-module id="paper-badge-style">
    <template>
      <style>
        paper-badge.sopIconAndBadgePendingSop{
            position: fixed;
            top: 105px;
            left: 45px;
            --paper-badge-background: var(--google-red-500);
        }
        paper-badge.sopIconAndBadgeAllUserSop{
            position: fixed;
            top: 125px;
            left: 45px;
            --paper-badge-background: var(--google-blue-700);
        }

      </style>
    </template>
  </dom-module>`;document.head.appendChild(documentContainer);