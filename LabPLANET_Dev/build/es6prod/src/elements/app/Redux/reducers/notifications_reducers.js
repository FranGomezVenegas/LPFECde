define(["exports","../actions/notifications_actions.js"],function(_exports,_notifications_actions){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.default=void 0;function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){keys.push.apply(keys,Object.getOwnPropertySymbols(object))}if(enumerableOnly)keys=keys.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable});return keys}function _objectSpread(target){for(var i=1,source;i<arguments.length;i++){source=null!=arguments[i]?arguments[i]:{};if(i%2){ownKeys(source,!0).forEach(function(key){babelHelpers.defineProperty(target,key,source[key])})}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source))}else{ownKeys(source).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))})}}return target}const InitialNotificationState={notifications:[],totalNotifications:0},notificationsReducer=(state=InitialNotificationState,action)=>{switch(action.type){case _notifications_actions.ADD_NOTIFICATION://console.log('tab reducer', action);
return _objectSpread({},state,{totalNotifications:state.totalNotifications+1,notifications:[...state.notifications,[state.totalNotifications,action.notifObj]//,            notifId=state.totalNotifications            
]});case _notifications_actions.DO_LOGOUT_NOTIFICATION:return{notifications:[],totalNotifications:0};default:return state;}};var _default=notificationsReducer;_exports.default=_default});