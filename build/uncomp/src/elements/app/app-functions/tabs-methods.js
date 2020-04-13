//import { connect } from 'pwa-helpers/connect-mixin';
//import {store} from '../../../../store';
/**
 * @mixinFunction
 * @polymer
 */function isTabOpn(tabsList,tabName){var isOpen=tabsList.find(function(curTab){//console.log('tab reducer find in ', curTab.tabName, ' the value ', tabName);
return tabName==curTab.tabName});//console.log('is open='+isOpen, 'tabName=', tabName); 
if(!isOpen)return!1;//var isOpen= tabsList.indexOf(tabName);
//if (isOpen==-1) return false;
return!0}export{isTabOpn};export const tabsMethods=superClass=>class extends superClass{void(){return 0}static isTabOpen(tabName){return tabName}};