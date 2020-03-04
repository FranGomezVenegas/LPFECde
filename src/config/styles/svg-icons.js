const documentContainer = document.createElement('div');
documentContainer.setAttribute('style', 'display: none;');

documentContainer.innerHTML = `
  <dom-module id="svg-icons">
    <template>
      <style>
        .pdfIcon{
          height:24px;
          width:24px;
          color:red; 
          fill:#03a9f4;
        }
      </style>
    </template>
  </dom-module>`;

document.head.appendChild(documentContainer);