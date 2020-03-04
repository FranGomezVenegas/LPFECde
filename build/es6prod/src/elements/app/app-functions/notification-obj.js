define(["exports"],function(_exports){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.diagnosticToNotification=diagnosticToNotification;_exports.NotificationObj=void 0;/**
 * @mixinFunction
 * @polymer
 */const NotificationObj=superClass=>class extends superClass{};_exports.NotificationObj=NotificationObj;function diagnosticToNotification(respData,data){var notifObj=[];notifObj.notificationName=data.schemaPrefix+"."+data.actionName;notifObj.label_en=respData.error_value_en;notifObj.label_es=respData.error_value_es;notifObj.diagnostic=respData.diagnostic;//console.log('diagnosticToNotification', 'notifObj', notifObj);
return notifObj}});