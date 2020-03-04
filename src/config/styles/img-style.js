const documentContainer = document.createElement('div');
documentContainer.setAttribute('style', 'display: none;');

documentContainer.innerHTML = `
  <dom-module id="img-style">
    <template>
      <style>
        img.sopIconAndBadge {
          position: relative;
          aligned:center;
          height:80px;
          width:80px;
        }
        img.appLoginLogoOnTop{
          alt:LabPLANET;
          height:80px;
          width:100px;
        }
      </style>
    </template>
  </dom-module>`;

document.head.appendChild(documentContainer);