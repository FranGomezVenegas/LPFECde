export const default_language="es";

export const isTabOpenable=true;

export const sopPaneIconAndBadge_iconGreen='./images/spc_sops_green.png';
export const sopPaneIconAndBadge_iconRed='./images/sop_red_animation.gif';

export const sopUserAllSop_fieldToRetrieve='procedure|sop_id|brief_summary|sop_name|status|file_link';
export const sopUserPendingSop_fieldToRetrieve='procedure|sop_id|brief_summary|sop_name|status|file_link';
export const sopUserProcedureSop_fieldToRetrieve='procedure|sop_id|brief_summary|sop_name|sop_version|sop_revision|current_status|file_link';

export const sopMySops_buttons=[
	{
	  "name": "sopMarkAsCompleted",
	  "label_en": "Mark Completed", "label_es": "Marcar Completado",
	  "type": "icon-button",
	  "icon_name": "icons:restore-page", "icon_color": "aqua",
	  "esign_required": false,
	  "read_only": false,
	}
];
export const sopMyPendingSops_buttons=[
	{
	  "name": "sopMarkAsCompleted",
	  "label_en": "Mark Completed", "label_es": "Marcar Completado",
	  "type": "icon-button",
	  "icon_name": "icons:restore-page", "icon_color": "aqua",
	  "esign_required": false,
	  "read_only": false,
	}
];

export const appConfirmUserOrEsign_notCorrectMessage={
    "message_en":"Validation fault. All attempts consumed.",
    "message_es":"Validación fallada, Todos los intentos consumidos",
}
export const appLogOut_logOutMessage={
  "closedSession":{
    "message_en":"Session closed",
    "message_es":"Sesión cerrada",
  },
}
export const appLogin_authenticationMessage={
  "connectedSuccess":{
    "message_en":"Valid user, please proceed selecting the role",
    "message_es":"Usuario válido, por favor escoja rol",
  },
  "connectedFails":{
    "message_en":"I guess there is no user with those credentials",
    "message_es":"Me temo que el usuario o la contraseña no son correctos.",    
  }
}
export const appLogin_ribbonField=[{"label_en": "Draft", "label_es": "Provisional",}];
export const appLogin_formFields=[
    {
      "name": "title",
      "label_en": "Welcome to the new Planet", "label_es": "Bienvenido al nuevo Planeta",
      "type": "title",
      "size": 'h2',
      "style": "color: #0085ffe6;",
      "read_only": true
    },             
    {
      "name": "User",
      "label_en": "User", "label_es": "Usuario",
      "type": "text",
      "password": "false",
      "value": "",
      "read_only": false
    },    
    {
      "name": "password",
      "label_en": "Password", "label_es": "Contraseña",
      "type": "password",
      "password": "true",
      "value": "",
      "read_only": false,
      "showDisplayPasswordType": "Button"
    },
    {
      "name": "buttonAccess",
      "label_en": "Access", "label_es": "Entrar",
      "type": "button",              
      "value": "",
      "read_only": false
    },            
    {
      "name": "userRole",
      "label_en": "Role", "label_es": "Rol",
      "type": "list",
      "value": "Admin",
      "read_only": true,
      "items" : [{
        "keyName":"Analyst",                        
        "keyValue_en":"Analyst", "keyValue_es":"valor1"              
      }]
    },                        
  ];
export const appEsign_formFields=[
    {
      "name": "buttonAccept",
      "label_en": "Validate", "label_es": "Validar",
      "type": "button",              
      "value": "",
      "read_only": false
    }, 
    {
      "name": "buttonCancel",
      "label_en": "Cancel", "label_es": "Cancelar",
      "type": "button",              
      "value": "",
      "read_only": false
    }, 	
];
export const appConfirmUser_formFields=[
    {
      "name": "userToCheck",
      "label_en": "User", "label_es": "Usuario",
      "type": "textconfirmuser",
      "password": "false",
      "value": "labplanet",
      "read_only": false
    },    
    {
      "name": "pwToCheck",
      "label_en": "Current Password", "label_es": "Contraseña Actual",
      "type": "password",
      "password": "true",
      "value": "",
      "read_only": false,
      "showDisplayPasswordType": "Button"
    },
  {
    "name": "confirmUserNote",
    "label_en": "Note", "label_es": "Nota",
    "type": "text",
    "password": "false",
    "value": "",
    "read_only": false
  }
];

export const appHeader_ribbonField=[{"label_en": "Draft", "label_es": "Provisional", "color": "aqua"}];
export const appHeader_personFieldsName='';//'first_name|last_name|photo';
export const appHeader_fieldsLeft=[
  {
	"name": "labplanet_logo",
	"source": "./images/app-login/labplanet.png",
	"aligned": "center",
	"label_en": "User", "label_es": "Usuario",
	"type": "logo-circle",
	"password": "False",
	"value": "labplanet",
	"float": "left",
	"read_only": true
  } ,  
  {
	"name": "customer_logo",
	"source": "./images/homeLab.png",
	"aligned": "center",
	"label_en": "User", "label_es": "Usuario",
	"type": "logo-circle",
	"password": "False",
	"value": "labplanet",
	"read_only": true
  } 
];
export const appHeader_fieldsCenter=[
{
	"name": "labplanet_title",
	"source": "./images/app-login/labplanet.png",
	"aligned": "center",
	"label_en": "LabPLANET, New Lab Solutions era", "label_es": "LabPLANET, Nueva era para tu Lab",
	"type": "google-fonts",
	"font_family": "Annie Use Your Telescope",
	"font_size": '42px',
	"margin-top": '0px',
	"margin-bottom": '0px',
	"color": '#4285f4',
	"password": "False",
	"value": "labplanet",
	"float": "left",
	"read_only": true
  }, 
  {
	"name": "user_info",
	"aligned": "center",
	"label_en": ", Welcome", "label_es": ", Bienvenido",
	"type": "google-fonts",
	"font_family": "Annie Use Your Telescope",
	"font_size": '16px',
	"password": "false",
	"value": "labplanet",
	"float": "left",
	"read_only": true
  },                   
  {
	"name": "session_data",                    
	"aligned": "center",
	"label_en": "session data", "label_es": "datos de sesión",
	"type": "google-fonts",
	"font_family": "Annie Use Your Telescope",
	"font_size": '16px',
	"password": "False",
	"value": "labplanet",
	"float": "left",
	"read_only": true
  },
  {
	"name": "environment_info",                    
	"aligned": "center",
	"label_en": "Draft environment for customer HomeLab", "label_es": "Ambiente de desarrollo para el cliente HomeLab",
	"type": "google-fonts",
	"font_family": "Annie Use Your Telescope",
	"font_size": '16px',
	"password": "False",
	"value": "labplanet",
	"float": "left",
	"read_only": true
  }
];
export const appHeader_fieldsRight=[
  {
	"name": "user_avatar",
	"source": "./images/avatar/personNoFace.jpg",
	"aligned": "center",
	"label_en": "User", "label_es": "Usuario",
	"type": "avatar",
	"password": "False",
	"value": "labplanet",
	"read_only": true
  } 
];
export const changeUserPasswordForm=[
{
  "name": "Password",
  "label_en": "New Password", "label_es": "Nueva Contraseña",
  "type": "password",
  "password": "true",
  "value": "",
  "read_only": false,
  "showDisplayPasswordType": "Button"
},
{
  "name": "USER_CHANGE_PSWD",
  "label_en": "Confirm", "label_es": "Confirmar",
  "type": "icon-button",
  "icon_name": "icons:restore-page", "icon_color": "aqua",
  "confirmuser_required": true,
  "read_only": false,
}];
export const changeUserEsignForm=[
{
  "name": "Esign",
  "label_en": "New Esign", "label_es": "Nueva Firma Electrónica",
  "type": "password",
  "password": "true",
  "value": "",
  "read_only": false,
  "showDisplayPasswordType": "Button"
},
{
  "name": "USER_CHANGE_ESIGN",
  "label_en": "Confirm", "label_es": "Confirmar",
  "type": "icon-button",
  "icon_name": "icons:restore-page", "icon_color": "aqua",
  "esign_required": true,
  "read_only": false,  
}];
export const saveOpenTabsForm=[
  {
    "name": "SET_DEFAULT_TABS_ON_LOGIN",
    "label_en": "Save Open Tabs", "label_es": "Guardar Pestañas Actuales",
    "type": "button",
    "icon_name": "icons:restore-page", "icon_color": "aqua",
    "esign_required": false,
    "read_only": false,  
  }];  
export const dialog_buttons=[
	{
	  "name": "closeDialog",
	  "label_en": "Close Dialog", "label_es": "Cerrar Ventana",
	  "type": "icon-button",
	  "icon_name": "icons:restore-page", "icon_color": "aqua",
	  "esign_required": false,
	  "read_only": false,
	}
];	
export const pendingSOPTab={
  lp_frontend_page_name: 'sop/my-pending-sops.js',        
  tabName: 'sop-myPendingSops',
  tabLabel_en: 'My Pending SOPs',
  tabLabel_es: 'Mis PNT Pendientes',
  procedure:'sop',
  tabEsignRequired: false, tabConfirmUserRequired: false
}
export const userMySOPTab={
  lp_frontend_page_name: 'sop/my-sops.js',
  tabName: 'sop-allMySops',
  tabLabel_en: 'All My SOPs',
  tabLabel_es: 'Mis PNTs',
  procedure:'sop',
  tabEsignRequired: false, tabConfirmUserRequired: false
}
export const userProfileHome={
  lp_frontend_page_name: 'user-profile/user-profile.js',        
  tabName: 'user-profile',
  tabLabel_en: 'User Profile',
  tabLabel_es: 'Perfil de Usuario',
  procedure:'user',
  tabEsignRequired: false, tabConfirmUserRequired: true
}
export const appNewIncident_formFields=[
  {
    "name": "Title",
    "label_en": "Title", "label_es": "Titulo",
    "type": "text",
    "password": "false",
    "value": "",
    "read_only": false
  },    
  {
    "name": "Detail",
    "label_en": "Detail", "label_es": "Detalle",
    "type": "text-area",
    "password": "false",
    "numRows": "10",
    "numCols": "100",
    "value": "Hola Soporte, Estoy teniendo un problema y me gustaría que me ayudárais",
    "placeholder": '',
    "read_only": false
  },    
  {
    "name": "NEW_INCIDENT",
    "label_en": "Access", "label_es": "Entrar",
    "type": "button",              
    "value": "",
    "read_only": false
  },              
];
export const incidents_userOpenIncidentsFieldToDisplay=[
  {name: 'id', label_en:'Id', label_es: 'Id', sort:true, filter:false, width:'10%'}
//, {name: 'status', label_en:'Status', label_es: 'Estado', sort:false, filter:true, width:'22%'}
, {name: 'date_last_update', label_en:'Last Update', label_es: 'Último cambio', sort:false, filter:true, width:'22%'}
, {name: 'date_creation', label_en:'Creation', label_es: 'Creación', sort:false, filter:true, width:'22%'}
, {name: 'item_title', label_en:'Title', label_es: 'Título', sort:false, filter:true, width:'20%'}
, {name: 'item_detail', label_en:'Detail', label_es: 'Detalle', sort:false, filter:true, width:'30%'}];
export const incidents_userOpenIncidentsButtons=[
  {
    "name": "CONFIRM_INCIDENT",
    "label_en": "Confirm", "label_es": "Confirmar",
    "type": "button",
    "icon_name": "icons:assignment-return",
    "read_only": false,
  },
  {
    "name": "ADD_NOTE_INCIDENT",
    "label_en": "Add Note", "label_es": "Añadir Nota",
    "type": "button",
    "icon_name": "icons:assignment-return",
    "read_only": false,
  },
  {
    "name": "CLOSE_INCIDENT",
    "label_en": "Close it!", "label_es": "¡Zanjarla!",
    "type": "button",
    "icon_name": "icons:assignment-return",
    "read_only": false,
  },
  {
    "name": "REOPEN_INCIDENT",
    "label_en": "ReOpen it!", "label_es": "¡Reabrirla!",
    "type": "button",
    "icon_name": "icons:assignment-return",
    "read_only": false,
  },    
];

export const cancelDialogButton={
  "name": "CANCEL_DIALOG_BUTTON",
  "label_en": "Cancel", "label_es": "Cancelar",
  "type": "button",
  "icon_name": "icons:next-week",
  "read_only": false,
}
export const confirmDialogButton={
"name": "ACCEPT_DIALOG_BUTTON",
"label_en": "Accept", "label_es": "Aceptar",
"type": "button",
"icon_name": "icons:next-week",
"read_only": false,
}
export const closeDialogButton={
"name": "CLOSE_DIALOG_BUTTON",
"label_en": "Close", "label_es": "Cerrar",
"type": "button",
"icon_name": "icons:next-week",
"read_only": false,
}
export const notificationsPaneTitle={
  open:
  {
    "label_en": "Notifications", "label_es": "Notificaciones",
    "icon_name": "vaadin:chevron-circle-up"
  }, 
  closed:
  {
    "label_en": "Notifications", "label_es": "Notificaciones",
    "icon_name": "vaadin:chevron-circle-down"
  },   
};
export const proceduresListPaneTitle={
  open:
  {
    "label_en": "Procedures", "label_es": "Procesos",
    "icon_name": "vaadin:chevron-circle-up"
  }, 
  closed:
  {
    "label_en": "Procedures", "label_es": "Procesos",
    "icon_name": "vaadin:chevron-circle-down"
  },   
};
