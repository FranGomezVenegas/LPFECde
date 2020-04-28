import {formValue_confidentialMaskDefault, formValue_confidentialMask_en, formValue_confidentialMask_es} 
    from '../../../config/labels-messages';
/**
 * @mixinFunction
 * @polymer
 */

export const FieldsMethods = (superClass) => class extends superClass {
    todayYYYYMMDD() {
        var d = new Date();
        
        var month = '' + (d.getMonth() + 1);
        var day = '' + d.getDate();
        var year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    labelValue(langApp, field) {  
        //console.log("field-methods.js", "labelValue", "langApp="+langApp, 'fields=', field);
        if (!langApp && !field){
            console.log("methods.js", "labelValue with no langApp or field recognized", 'field=', field, 'langApp=', langApp ); return '';}

        if (langApp=="en"){
            if (field.label_en){return field.label_en;}
            if (field.message_en){return field.message_en;}
            console.log("methods.js", "labelValue with no label_en recognized", 'field=', field, 'langApp=', langApp );            
            return '';
        }
        if (langApp=="es"){
            if (field.label_es){return field.label_es;}
            if (field.message_es){return field.message_es;}
            console.log("methods.js", "labelValue with no label_es recognized", 'field=', field, 'langApp=', langApp );            
            return '';
        } 
        return field.label_en;
    }  
    tabLabelValue(langApp, field) {  
        //        console.log("methods.js", "labelValue", "langApp="+langApp, field);
                if (!langApp && !field){
                    console.log("methods.js", "labelValue with no langApp recognized", 'field=', field, 'langApp=', langApp ); return '';}
        
                if (langApp=="en"){
                    if (!field.tabLabel_en){
                        //console.log("methods.js", "labelValue with no label_en recognized", 'field=', field, 'langApp=', langApp ); 
                        return field.name;}            
                    return field.tabLabel_en;}
                if (langApp=="es"){
                    if (!field.tabLabel_es){
                        //console.log("methods.js", "labelValue with no label_es recognized", 'field=', field, 'langApp=', langApp ); 
                        return field.name;}            
                    return field.tabLabel_es;
                } 
                return field.tabLabel_en;
            }      
    labelListValue(langApp, item) {   
        //console.log("_labelListValue", langApp, valEng, valSp);
        if (langApp=="en") return item.keyValue_en;    
        if (langApp=="es") return item.keyValue_es;
        return this.field.keyValue_en;    
    }  
    confidentialMaskValue(langApp) {
//        console.log('confidentialMaskValue', langApp);
        if (langApp=="en") return formValue_confidentialMask_en; //'$CONFIDENTIAL$';    
        if (langApp=="es") return formValue_confidentialMask_es; //'$CONFIDENCIAL$';
        return formValue_confidentialMaskDefault; //'********';    
    }
    resetValue(){
        this.field.value='';
        this.value='';
    }
}