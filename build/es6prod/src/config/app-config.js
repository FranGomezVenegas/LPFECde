define(["exports"],function(_exports){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.userMySOPTab=_exports.pendingSOPTab=_exports.dialog_buttons=_exports.appHeader_fieldsRight=_exports.appHeader_fieldsCenter=_exports.appHeader_fieldsLeft=_exports.appHeader_personFieldsName=_exports.appHeader_ribbonField=_exports.appConfirmUser_formFields=_exports.appEsign_formFields=_exports.appLogin_formFields=_exports.appLogin_ribbonField=_exports.sopMyPendingSops_buttons=_exports.sopMySops_buttons=_exports.sopUserProcedureSop_fieldToRetrieve=_exports.sopUserPendingSop_fieldToRetrieve=_exports.sopUserAllSop_fieldToRetrieve=_exports.sopPaneIconAndBadge_iconRed=_exports.sopPaneIconAndBadge_iconGreen=_exports.isTabOpenable=_exports.default_language=void 0;const default_language="es";_exports.default_language=default_language;const isTabOpenable=!0;_exports.isTabOpenable=isTabOpenable;const sopPaneIconAndBadge_iconGreen="./images/spc_sops_green.png";_exports.sopPaneIconAndBadge_iconGreen=sopPaneIconAndBadge_iconGreen;const sopPaneIconAndBadge_iconRed="./images/sop_red_animation.gif";_exports.sopPaneIconAndBadge_iconRed=sopPaneIconAndBadge_iconRed;const sopUserAllSop_fieldToRetrieve="procedure|sop_id|brief_summary|sop_name|status|file_link";_exports.sopUserAllSop_fieldToRetrieve=sopUserAllSop_fieldToRetrieve;const sopUserPendingSop_fieldToRetrieve="procedure|sop_id|brief_summary|sop_name|status|file_link";_exports.sopUserPendingSop_fieldToRetrieve=sopUserPendingSop_fieldToRetrieve;const sopUserProcedureSop_fieldToRetrieve="procedure|sop_id|brief_summary|sop_name|sop_version|sop_revision|current_status|file_link";_exports.sopUserProcedureSop_fieldToRetrieve=sopUserProcedureSop_fieldToRetrieve;const sopMySops_buttons=[{name:"sopMarkAsCompleted",label_en:"Mark Completed",label_es:"Marcar Completado",type:"icon-button",icon_name:"icons:restore-page",icon_color:"aqua",esign_required:!1,read_only:!1}];_exports.sopMySops_buttons=sopMySops_buttons;const sopMyPendingSops_buttons=[{name:"sopMarkAsCompleted",label_en:"Mark Completed",label_es:"Marcar Completado",type:"icon-button",icon_name:"icons:restore-page",icon_color:"aqua",esign_required:!1,read_only:!1}];_exports.sopMyPendingSops_buttons=sopMyPendingSops_buttons;const appLogin_ribbonField=[{label_en:"Draft",label_es:"Provisional"}];_exports.appLogin_ribbonField=appLogin_ribbonField;const appLogin_formFields=[{name:"title",label_en:"Welcome to the new Planet",label_es:"Bienvenido al nuevo Planeta",type:"title",size:"h2",style:"color: #0085ffe6;",read_only:!0},{name:"User",label_en:"User",label_es:"Usuario",type:"text",password:"false",value:"",read_only:!1},{name:"Password",label_en:"Password",label_es:"Contrase\xF1a",type:"password",password:"true",value:"",read_only:!1,showDisplayPasswordType:"Button"},{name:"buttonAccess",label_en:"Access",label_es:"Entrar",type:"button",value:"",read_only:!1},{name:"userRole",label_en:"Role",label_es:"Rol",type:"list",value:"Admin",read_only:!0,items:[{keyName:"Analyst",keyValue_en:"Analyst",keyValue_es:"valor1"}]}];_exports.appLogin_formFields=appLogin_formFields;const appEsign_formFields=[{name:"buttonAccept",label_en:"Validate",label_es:"Validar",type:"button",value:"",read_only:!1},{name:"buttonCancel",label_en:"Cancel",label_es:"Cancelar",type:"button",value:"",read_only:!1}];_exports.appEsign_formFields=appEsign_formFields;const appConfirmUser_formFields=[{name:"userToCheck",label_en:"User",label_es:"Usuario",type:"textconfirmuser",password:"false",value:"labplanet",read_only:!1},{name:"pwToCheck",label_en:"Password",label_es:"Contrase\xF1a",type:"password",password:"true",value:"avecesllegaelmomento",read_only:!1,showDisplayPasswordType:"Button"},{name:"confirmUserNote",label_en:"Note",label_es:"Nota",type:"text",password:"false",value:"",read_only:!1}];_exports.appConfirmUser_formFields=appConfirmUser_formFields;const appHeader_ribbonField=[{label_en:"Draft",label_es:"Provisional",color:"aqua"}];_exports.appHeader_ribbonField=appHeader_ribbonField;const appHeader_personFieldsName="";//'first_name|last_name|photo';
_exports.appHeader_personFieldsName=appHeader_personFieldsName;const appHeader_fieldsLeft=[{name:"labplanet_logo",source:"./images/app-login/labplanet.png",aligned:"center",label_en:"User",label_es:"Usuario",type:"logo-circle",password:"False",value:"labplanet",float:"left",read_only:!0},{name:"customer_logo",source:"./images/homeLab.png",aligned:"center",label_en:"User",label_es:"Usuario",type:"logo-circle",password:"False",value:"labplanet",read_only:!0}];_exports.appHeader_fieldsLeft=appHeader_fieldsLeft;const appHeader_fieldsCenter=[{name:"labplanet_title",source:"./images/app-login/labplanet.png",aligned:"center",label_en:"LabPLANET, New Lab Solutions era",label_es:"LabPLANET, Nueva era para tu Lab",type:"google-fonts",font_family:"Annie Use Your Telescope",font_size:"50px","margin-top":"0px","margin-bottom":"0px",color:"#4285f4",password:"False",value:"labplanet",float:"left",read_only:!0},{name:"user_info",aligned:"center",label_en:", Welcome",label_es:", Bienvenido",type:"google-fonts",font_family:"Annie Use Your Telescope",font_size:"14px",password:"False",value:"labplanet",float:"left",read_only:!0},{name:"session_data",aligned:"center",label_en:"session data",label_es:"datos de sesi\xF3n",type:"google-fonts",font_family:"Annie Use Your Telescope",font_size:"14px",password:"False",value:"labplanet",float:"left",read_only:!0},{name:"environment_info",aligned:"center",label_en:"Draft environment for customer HomeLab",label_es:"Ambiente de desarrollo para el cliente HomeLab",type:"google-fonts",font_family:"Annie Use Your Telescope",font_size:"14px",password:"False",value:"labplanet",float:"left",read_only:!0}];_exports.appHeader_fieldsCenter=appHeader_fieldsCenter;const appHeader_fieldsRight=[{name:"user_avatar",source:"./images/avatar/personNoFace.jpg",aligned:"center",label_en:"User",label_es:"Usuario",type:"avatar",password:"False",value:"labplanet",read_only:!0}];_exports.appHeader_fieldsRight=appHeader_fieldsRight;const dialog_buttons=[{name:"closeDialog",label_en:"Close Dialog",label_es:"Cerrar Ventana",type:"icon-button",icon_name:"icons:restore-page",icon_color:"aqua",esign_required:!1,read_only:!1}];_exports.dialog_buttons=dialog_buttons;const pendingSOPTab={lp_frontend_page_name:"sop/my-pending-sops.js",tabName:"sop-myPendingSops",tabLabel_en:"My Pending SOPs",tabLabel_es:"Mis PNT Pendientes",procedure:"sop",tabEsignRequired:!1,tabConfirmUserRequired:!1};_exports.pendingSOPTab=pendingSOPTab;const userMySOPTab={lp_frontend_page_name:"sop/my-sops.js",tabName:"sop-allMySops",tabLabel_en:"All My SOPs",tabLabel_es:"Mis PNTs",procedure:"sop",tabEsignRequired:!1,tabConfirmUserRequired:!1};_exports.userMySOPTab=userMySOPTab});