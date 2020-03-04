/**
 * @mixinFunction
 * @polymer
 */export const NotificationObj=superClass=>class extends superClass{};export function diagnosticToNotification(respData,data){var notifObj=[];notifObj.notificationName=data.schemaPrefix+"."+data.actionName;notifObj.label_en=respData.error_value_en;notifObj.label_es=respData.error_value_es;notifObj.diagnostic=respData.diagnostic;//console.log('diagnosticToNotification', 'notifObj', notifObj);
return notifObj}