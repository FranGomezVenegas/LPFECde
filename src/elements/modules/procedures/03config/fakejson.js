export const appProcedureListFake=[
  {
    "name": "proceduresList",
    "label_en": "Procedures", "label_es": "Procesos",
    "type": "list",
    "value": "",
    "read_only": false,
    "items" : [
      {"keyName":"em__demo__a",                        
      "keyValue_en":"Demo-A", "keyValue_es":"Demo-A"},
      {"keyName":"process__us",                        
      "keyValue_en":"US Process", "keyValue_es":"Proceso EEUU"},
      {"keyName":"process__eu",                        
      "keyValue_en":"EU Process", "keyValue_es":"Proceso EU"},
    ],
  }
];
export const procedures=[
  {
    'name': 'emdemoa',
    'definition': {
      users:[{name:'yo'}, {name:'tu'}],
      roles:[{name:'coordinator'}, {name:'admin'}],
    }
  },
  {
    'name': 'processus',
    'definition': {
      users:[{name:'nosotros'}, {name:'vosotros'}],
      roles:[{name:'coordinator'}, {name:'admin'}],
    }
  }  
];