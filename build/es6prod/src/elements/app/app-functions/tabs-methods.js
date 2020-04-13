define(["exports"],function(_exports){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.isTabOpn=isTabOpn;_exports.tabsMethods=void 0;//import { connect } from 'pwa-helpers/connect-mixin';
//import {store} from '../../../../store';
/**
 * @mixinFunction
 * @polymer
 */function isTabOpn(tabsList,tabName){var isOpen=tabsList.find(function(curTab){//console.log('tab reducer find in ', curTab.tabName, ' the value ', tabName);
return tabName==curTab.tabName});//console.log('is open='+isOpen, 'tabName=', tabName); 
if(!isOpen)return!1;//var isOpen= tabsList.indexOf(tabName);
//if (isOpen==-1) return false;
return!0}const tabsMethods=superClass=>class extends superClass{void(){return 0}static isTabOpen(tabName){return tabName}};_exports.tabsMethods=tabsMethods});