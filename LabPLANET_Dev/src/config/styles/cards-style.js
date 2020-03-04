const documentContainer = document.createElement('div');
documentContainer.setAttribute('style', 'display: none;');

documentContainer.innerHTML = `
  <dom-module id="cards-style">
    <template>
      <style>
        .cardPendingSops {
            margin: 24px;
            padding: 16px;
            color: #757575;
            border-radius: 5px;
            background-image: url('./images/hexagon-white-blue-light.jpg');
            background-repeat: no-repeat;
            background-size: cover;                  
            background-color: #fff;
            box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
        }
        .cardMySops {
            margin: 24px;
            padding: 16px;
            color: #757575;
            border-radius: 5px;
            background-image: url('./images/hexagon-white-blue-light.jpg');
            background-repeat: no-repeat;
            background-size: cover;                  
            background-color: #fff;
            box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
          }     
          .cardProcedureSops {
            margin: 24px;
            padding: 16px;
            color: #757575;
            border-radius: 5px;
            background-color: #fff;
            box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
          }             
      </style>
    </template>
  </dom-module>`;

document.head.appendChild(documentContainer);