const documentContainer = document.createElement('div');
documentContainer.setAttribute('style', 'display: none;');

documentContainer.innerHTML = `
  <dom-module id="paper-tab-style">
    <template>
      <style>
        paper-tabs.appCenterTabs{
          --paper-tabs-selection-bar-color:#0f9d58;            
        }
        paper-tab.appCenterTabsTabItem {
          color: #a1fdd0; /* var(--paper-light-blue-50); */ 
          background-color: var(--paper-light-blue-500); 
          padding-left: 2px;
          padding-right: 0px;
          height: 35px;
        } 
      </style>
    </template>
  </dom-module>`;

document.head.appendChild(documentContainer);