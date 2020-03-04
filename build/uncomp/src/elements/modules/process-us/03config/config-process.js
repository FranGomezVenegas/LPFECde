export const schema_name="process-us";export const sampleLogin_ribbonField=[{label_en:schema_name,label_es:schema_name}];export const sampleLogin_formFields=[{name:"sampleTemplatesList",label_en:"Templates",label_es:"Plantillas",type:"list",value:"",read_only:!1,items:[{keyName:"",keyValue_en:"",keyValue_es:""}]},{name:"numSamples",label_en:"How Many Samples To Log?",label_es:"\xBFCu\xE1ntas?",type:"integer",value:1,minValue:0,maxValue:1e4,read_only:!1}];export const sampleReception_sampleFieldToRetrieve="sample_id|status|sampling_comment|spec_code|spec_variation_name|sample_config_code";export const sampleReception_sampleFieldToDisplay=[{name:"sample_id",label_en:"Sample ID",label_es:"ID Muestra",sort:!0,filter:!1},{name:"status",label_en:"status",label_es:"Estado",sort:!1,filter:!0//, {name: 'sampling_date', label_en:'sampling Date', label_es: 'ID Fecha de Muestreo', sort:false, filter:true}
},{name:"sampling_comment",label_en:"sampling Comment",label_es:"Comentario Muestreo",sort:!1,filter:!0},{name:"spec_code",label_en:"Spec",label_es:"Especificaci\xF3n",sort:!1,filter:!0},{name:"spec_variation_name",label_en:"Variation",label_es:"Variaci\xF3n",sort:!1,filter:!0},{name:"sample_config_code",label_en:"Configuration",label_es:"Configuraci\xF3n",sort:!1,filter:!0}];export const sampleReception_samplesWhereFieldsName="custodian";export const sampleReception_samplesWhereFieldsValue="TOKEN_internalUserID*String";export const sampleReception_sampleFieldToSort="sample_id desc";export const sampleResults_sampleFieldToRetrieve="sample_id|status|sampling_date|sampling_comment|sample_config_code";export const sampleResults_sampleFieldToDisplay=[{name:"status",label_en:"status",label_es:"Estado",sort:!1,filter:!0},{name:"sample_id",label_en:"Sample ID",label_es:"ID Muestra",sort:!0,filter:!1},{name:"sampling_date",label_en:"sampling Date",label_es:"ID Fecha de Muestreo",sort:!1,filter:!0},{name:"sampling_comment",label_en:"sampling Comment",label_es:"Comentario Muestreo",sort:!1,filter:!0},{name:"sample_config_code",label_en:"Configuration",label_es:"Configuraci\xF3n",sort:!1,filter:!0}];export const sampleResults_samplesWhereFieldsName="status in-|custodian";export const sampleResults_samplesWhereFieldsValue="RECEIVED-INCOMPLETE-COMPLETE*String|TOKEN_internalUserID*String";export const sampleResults_sampleFieldToSort="sample_id desc";export const sampleResults_analysisListFieldsToRetrieve="code|method_name|method_version";export const sampleResults_analysisListToDisplay=[{name:"code",label_en:"Code",label_es:"C\xF3digo"},{name:"method_name",label_en:"Analytical Method",label_es:"M\xE9todo Anal\xEDtico"},{name:"method_version",label_en:"Version",label_es:"Versi\xF3n"}];export const sampleResults_analysisListFieldToSort="sample_id desc";export const sampleResults_sampleAnalysisListFieldsToRetrieve="test_id|analysis|method_name|method_version|status";export const sampleResults_sampleAnalysisListToDisplay=[{name:"test_id",label_en:"ID",label_es:"ID"},{name:"analysis",label_en:"Analysis",label_es:"An\xE1lisis"},{name:"method_name",label_en:"Method",label_es:"M\xE9todo"},{name:"status",label_en:"Status",label_es:"Estado"}];export const sampleResults_sampleAnalysisListFieldToSort="test_id desc";export const sampleResults_givenSampleAnalysisListDialog_buttons=[{name:"cancelTest",label_en:"Cancel",label_es:"Cancelar",type:"button",read_only:!1},{name:"uncancelResult",label_en:"Uncancel",label_es:"Descancelar",type:"button",read_only:!1},{name:"testAssignment",label_en:"Test Assignment",label_es:"Asignar Ensayo",type:"button",read_only:!1}];export const sampleResults_sampleAnalysisResultEntryFieldsToRetrieve="result_id|analysis|method_name|method_version|param_name|param_type|raw_value|uom|spec_eval|spec_eval_detail|status";export const sampleResults_sampleAnalysisResultEntryFieldsToDisplay=[{name:"spec_eval",label_en:"spec_eval",label_es:"Eval Espec",editable:!1,hidden:!1},{name:"result_id",label_en:"Result Id",label_es:"Id Resultado",editable:!1,hidden:!1},{name:"analysis",label_en:"Analysis",label_es:"An\xE1l\xEDsis",editable:!1,hidden:!1},{name:"param_name",label_en:"Parameter",label_es:"Par\xE1metro",editable:!1,hidden:!1},{name:"raw_value",label_en:"Value",label_es:"Valor",editable:!0,hidden:!1},{name:"uom",label_en:"Measurement",label_es:"Medida",editable:!1,hidden:!1},{name:"param_type",label_en:"param_type",label_es:"param_type",editable:!1,hidden:!0}];export const sampleResults_sampleAnalysisResultEntryFieldToSort="test_id|result_id";export const sampleResults_buttons=[{name:"givenSampleAnalysisList",label_en:"Sample Analysis",label_es:"An\xE1lisis de la Muestra",type:"icon-button",icon_name:"icons:description",confirmuser_required:!0,esign_required:!1,read_only:!1},{name:"addSampleAnalysis",label_en:"Add Analysis",label_es:"A\xF1adir An\xE1lisis",type:"icon-button",icon_name:"icons:add-box",icon_color:"aqua",confirmuser_required:!1,esign_required:!0,read_only:!1},{name:"givenSampleEnterResult",label_en:"Enter Result",label_es:"Entrar Resultado",type:"icon-button",icon_name:"icons:receipt",read_only:!1},{name:"IncubationStart",label_en:"Start Incubation",label_es:"Iniciar incubaci\xF3n",type:"button",read_only:!0},{name:"IncubationEnd",label_en:"Complete Incubation",label_es:"Completar incubaci\xF3n",type:"button",read_only:!0},{name:"setSamplingDate",label_en:"Set Sampling Date",label_es:"Asignar Fecha de Muestreo",type:"icon-button",icon_name:"icons:date-range",read_only:!1},{name:"SAMPLINGCOMMENTADD",label_en:"Add Sampling Comment",label_es:"Anexar observacion durante el Muestreo",type:"icon-button",icon_name:"icons:note-add",read_only:!1},{name:"SAMPLINGCOMMENTREMOVE",label_en:"Remove Sampling Comment",label_es:"Borrar observacio durante el Muestreo",type:"button",read_only:!1},{name:"TestAssignment",label_en:"Test Assignment",label_es:"Asignaci\xF3n Ensayo",type:"button",read_only:!0}];export const sampleRevision_sampleFieldToRetrieve="sample_id|status|status_previous|sampling_comment|sample_config_code";export const sampleRevision_sampleFieldToDisplay=[{name:"sample_id",label_en:"sample_id",label_es:"ID Muestra"},{name:"status",label_en:"status",label_es:"Estado"},{name:"status_previous",label_en:"status previous",label_es:"Estado Previo"},{name:"sampling_comment",label_en:"sampling Comment",label_es:"Comentario Muestreo"},{name:"sample_config_code",label_en:"Template",label_es:"Plantilla"}];export const sampleRevision_sampleFieldToSort="sample_id desc";export const sampleRevision_sampleWhereFieldsName="status in-|custodian";export const sampleRevision_sampleWhereFieldsValue="COMPLETE-CANCELED*String|TOKEN_internalUserID*String";export const sampleRevision_buttons=[{name:"reviewResult",label_en:"Review",label_es:"Revisar",type:"button",read_only:!1},{name:"addSampleAnalysis",label_en:"Add Analysis",label_es:"A\xF1adir An\xE1lisis",type:"button",read_only:!1},{name:"unreviewResult",label_en:"Unreview",label_es:"Revocar Revisi\xF3n",type:"button",read_only:!1},{name:"cancelResult",label_en:"Cancel",label_es:"Cancelar",type:"button",read_only:!1},{name:"uncancelResult",label_en:"Uncancel",label_es:"Descancelar",type:"button",read_only:!1}];export const sampleCustodian_cocUsersListFieldToRetrieve="user_name";export const sampleCustodian_cocUsersListFieldToDisplay=[{name:"user_name",label_en:"Candidate",label_es:"Candidato",sort:!0,filter:!1//, {name: 'person_name', label_en:'Custodian', label_es: 'Custodio', sort:false, filter:true}
//, {name: 'custodian_candidate', label_en:'Candidate', label_es: 'Candidato', sort:false, filter:true}
//, {name: 'status', label_en:'status', label_es: 'Estado', sort:false, filter:true}
}];export const sampleCustodian_cocUsersListWhereFieldsName="";export const sampleCustodian_cocUsersListWhereFieldsValue="";export const sampleCustodian_cocUsersListFieldToSort="";export const sampleCustodian_cocUsersListButtons=[];export const sampleCustodian_cocSampleHistoryFieldToRetrieve="sample_id";export const sampleCustodian_cocSampleHistoryFieldToDisplay=[{name:"sample_id",label_en:"Sample ID",label_es:"ID Muestra",sort:!0,filter:!1},{name:"custodian_name",label_en:"Custodian",label_es:"Custodio",sort:!1,filter:!0},{name:"candidate_name",label_en:"Candidate",label_es:"Candidato",sort:!1,filter:!0},{name:"status",label_en:"status",label_es:"Estado",sort:!1,filter:!0}];export const sampleCustodian_cocSampleHistoryWhereFieldsName="";export const sampleCustodian_cocSampleHistoryWhereFieldsValue="";export const sampleCustodian_cocSampleHistoryFieldToSort="";export const sampleCustodian_cocSampleHistoryButtons=[{name:"sample_id",label_en:"Sample ID",label_es:"ID Muestra",sort:!0,filter:!1}];export const sampleCustodian_sampleFieldToRetrieveCustodian="sample_id|status|sampling_date|sampling_comment|sample_config_code";export const sampleCustodian_sampleFieldToDisplayCustodian=[{name:"sample_id",label_en:"Sample ID",label_es:"ID Muestra",sort:!0,filter:!1},{name:"status",label_en:"status",label_es:"Estado",sort:!1,filter:!0},{name:"sampling_date",label_en:"sampling Date",label_es:"ID Fecha de Muestreo",sort:!1,filter:!0},{name:"sampling_comment",label_en:"sampling Comment",label_es:"Comentario Muestreo",sort:!1,filter:!0},{name:"sample_config_code",label_en:"Configuration",label_es:"Configuraci\xF3n",sort:!1,filter:!0}];export const sampleCustodian_samplesWhereFieldsNameCustodian="status in-|custodian";export const sampleCustodian_samplesWhereFieldsValueCustodian="RECEIVED-INCOMPLETE-COMPLETE*String|TOKEN_internalUserID*String";export const sampleCustodian_sampleFieldToSortCustodian="sample_id desc";export const sampleCustodian_buttonsCustodian=[{name:"ChangeOfCustodyStartChange",label_en:"Custody Change",label_es:"Cambiar Custodia",type:"button",read_only:!1},{name:"ChangeOfCustodyHistory",label_en:"Custody History",label_es:"Hist\xF3rico Custodia",type:"button",read_only:!1}];export const sampleCustodian_sampleFieldToRetrieveCandidate="sample_id|status|sampling_date|sampling_comment|sample_config_code";export const sampleCustodian_sampleFieldToDisplayCandidate=[{name:"sample_id",label_en:"Sample ID",label_es:"ID Muestra",sort:!0,filter:!1},{name:"status",label_en:"status",label_es:"Estado",sort:!1,filter:!0},{name:"sampling_date",label_en:"sampling Date",label_es:"ID Fecha de Muestreo",sort:!1,filter:!0},{name:"sampling_comment",label_en:"sampling Comment",label_es:"Comentario Muestreo",sort:!1,filter:!0},{name:"sample_config_code",label_en:"Configuration",label_es:"Configuraci\xF3n",sort:!1,filter:!0}];export const sampleCustodian_samplesWhereFieldsNameCandidate="status in-|custodian_candidate";export const sampleCustodian_samplesWhereFieldsValueCandidate="RECEIVED-INCOMPLETE-COMPLETE*String|TOKEN_internalUserID*String";export const sampleCustodian_sampleFieldToSortCandidate="sample_id desc";export const sampleCustodian_buttonsCandidate=[{name:"COC_CONFIRMCHANGE",label_en:"Accept CoC",label_es:"Aceptar CoC",type:"button",read_only:!1},{name:"COC_ABORTCHANGE",label_en:"Reject CoC",label_es:"Rechazar CoC",type:"button",confirmuser_required:!1,read_only:!1}];