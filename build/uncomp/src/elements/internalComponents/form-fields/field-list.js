import{PolymerElement,html}from"../../../../node_modules/@polymer/polymer/polymer-element.js";import{connect}from"../../../../node_modules/pwa-helpers/connect-mixin.js";import{store}from"../../../store.js";import"../../../../node_modules/@polymer/paper-dropdown-menu/paper-dropdown-menu.js";import"../../../../node_modules/@polymer/paper-item/paper-item.js";import"../../../../node_modules/@polymer/paper-listbox/paper-listbox.js";import"../../../../node_modules/@polymer/polymer/lib/elements/dom-repeat.js";import{FieldsMethods}from"../../app/app-functions/fields-methods.js";class FieldList extends FieldsMethods(connect(store)(PolymerElement)){static get observers(){return["changeListValueObserver(field.value)"]}stateChanged(state){this.selectedLanguage=state.app.user.appLanguage}changeListValueObserver(newVal){var findSeparator=newVal.search("-");//console.log('changeListValueObserver', 'newVal', newVal, 'this.field', this.field, 'findSeparator', findSeparator);
if(-1<findSeparator){var newValStr=newVal.substring(0,findSeparator),indexVal=newVal.substring(findSeparator+1,newVal.length);indexVal=indexVal.trim();var newValInt=parseInt(indexVal,10)}else{var newValStr=newVal,newValInt=-1}var newValNoIndex="spec";//console.log('changeListValueObserver', 'newValStr', newValStr, 'newValInt', newValInt, 'indexVal', indexVal);    
this.dispatchEvent(new CustomEvent("field-list-value-changed",{bubbles:!0,composed:!0,detail:{name:this.field.name,value_no_index:newValNoIndex,value:newValStr,//newVal,
index:newValInt//index,
//'thisindex': this.field.index
}}));this.value=newVal}static get properties(){return{field:{type:Object,notify:!0},value:{type:String,notify:!0},index:Number,fieldIndex:Number}}changeList(newList){this.set("field.items",newList)}static get template(){return html`      
        <paper-dropdown-menu  width="200px" label="{{labelValue(selectedLanguage, field)}}" name="{{field.name}}"  no-animations required disabled="{{field.read_only}}">
        <paper-listbox class="dropdown-content" slot="dropdown-content" selected="{{field.value}}" attr-for-selected="item-name">
          <template is="dom-repeat" items="[[field.items]]">
            <paper-item  field-index="{{index}}" index="{{index}}" item-name="[[item.keyName]]-{{index}}">
            {{labelListValue(selectedLanguage, item)}}
            </paper-item>
          </template>
        </paper-listbox>
      </paper-dropdown-menu>         
    `}}customElements.define("field-list",FieldList);