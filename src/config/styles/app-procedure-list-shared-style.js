const documentContainer = document.createElement('div');
documentContainer.setAttribute('style', 'display: none;');

documentContainer.innerHTML = `
  <dom-module id="shared-style-app-procedure-list">
    <template>
      <style>
        .collapse-content {
          padding: 15px;
          border: 1px solid #dedede;
        }
        iron-collapse {
            border: 1px solid #dedede;
            border-top: none;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            @apply --shadow-elevation-2dp;
        }        
      </style>
    </template>
  </dom-module>`;

document.head.appendChild(documentContainer);