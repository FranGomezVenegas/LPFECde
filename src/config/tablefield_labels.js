export const configUserSop=[
    {'name':'procedure', 'label_en':'Procedure', 'label_es':'Proceso'},
    {'name':'sop_name', 'label_en':'SOP Name', 'label_es':'Nombre del PNT'},
    {'name':'brief_summary', 'label_en':'Summary', 'label_es':'Resumen'},    
];
// export const configTableIncubator=[
// ];
// export const dataTableBatch=
// [
// ];

export const tableFieldLabel = (superClass) => class extends superClass {
    getTableFieldLabel(schema, table, fieldName, language){
        var constName=schema+'Table'+table;
        switch(constName.toUpperCase()){
            case 'CONFIGUSERSOP':
                var tableObj = configUserSop;
                break;
            // case 'CONFIGTABLEINCUBATOR':
            //     var tableObj =configTableIncubator;
            //     break;
            // case 'DATATABLEBATCH':
            //     var tableObj = dataTableBatch;
            //     break;
            default: 
                return fieldName; 
        }
        var found = tableObj.findIndex(function(field) {                    
            return fieldName==field.name;
          });      
        if (found == -1){
            return fieldName;
        }
        if (language=="es") return tableObj[found].label_es;
        return tableObj[found].label_en;
    }
    valueTranslation(schema, table, value, language){
        var translatedValue=this.getTableFieldLabel(schema, table, '*value_'+value, language);
        if (translatedValue=='*value_'+value) return value;
        return translatedValue;
    }   
    stageTitle(schema, table, stage, language){
        return this.getTableFieldLabel(schema, table, '*sample_stage_'+stage.current_stage+'_title', language);
    }
}
