function isTabOpn(tabsList, tabName){
  var isOpen = tabsList.find(function(curTab) {
    //console.log('tab reducer find in ', curTab.tabName, ' the value ', tabName);
    return tabName == curTab.tabName;
  });  
  //console.log('is open='+isOpen, 'tabName=', tabName); 
  if (!isOpen) return false;
  //var isOpen= tabsList.indexOf(tabName);
  //if (isOpen==-1) return false;
  return true;}

export  {isTabOpn};
export const schema_name='em-demo-a';
export const personal_smp_template='prog_pers_template';
export const prodLotActiveOnCreate='true';

export const shifts=[
  {keyName:"M1", keyValue_en:"M1", keyValue_es:"M1"},
  {keyName:"M2", keyValue_en:"M2", keyValue_es:"M2"}
];

export const incubationMode='SAMPLE_AND_INCUBATOR';
// SAMPLE_AND_DATE,SAMPLE_AND_INCUBATOR

export const em_programs_tabs2=[]
export const em_programs_tabs=[
  {procedure: schema_name
    ,tabConfirmUserRequired: false
    ,tabEsignRequired: false
    ,tabLabel_en: "Home"
    ,tabLabel_es: "Inicio"
    ,tabName: "home"  
    ,tabIndex:1
  } ,
  {procedure: schema_name
    ,tabConfirmUserRequired: false
    ,tabEsignRequired: false
    ,tabLabel_en: "Config Calendar"
    ,tabLabel_es: "Calendario Config"
    ,tabName: schema_name+"-configcalendar"  
    ,tabIndex:1
  } ,
  {procedure: schema_name
    ,tabConfirmUserRequired: false
    ,tabEsignRequired: false
    ,tabLabel_en: "Parameter Limits"
    ,tabLabel_es: "Límites"
    ,tabName: schema_name+"-limits"  
    ,tabIndex:1
  } ,    
  {procedure: schema_name
    ,tabConfirmUserRequired: false
    ,tabEsignRequired: false
    ,tabLabel_en: "Sampling Points"
    ,tabLabel_es: "Puntos de Muestreo"
    ,tabName: schema_name+"-sampling-points"  
    ,tabIndex:0
  },  
  {procedure: schema_name
    ,tabConfirmUserRequired: false
    ,tabEsignRequired: false
    ,tabLabel_en: "Sampling Points Map"
    ,tabLabel_es: "Puntos de Muestreo Mapa"
    ,tabName: schema_name+"-sampling-points-map"  
    ,tabIndex:0
  },          
  {procedure: schema_name
    ,tabConfirmUserRequired: false
    ,tabEsignRequired: false
    ,tabLabel_en: "Corrective Actions"
    ,tabLabel_es: "Acciones Correctivas"
    ,tabName: schema_name+"-corrective-actions"  
    ,tabIndex:0
  },          
]
export const progProintsCardFormButtons=[
  {
    "name": "logSample",
    "label_en": "new Sample", "label_es": "Nueva Muestra",
    "type": "button",
    "read_only": false,
  },  
  {
    "name": "logSample",
    "label_en": "new Sampl22e", "label_es": "Nueva Muestra",
    "type": "button",
    "read_only": true,
  },     
]
export const progProintsMapCardFormButtons=[
  {
    "name": "logSample",
    "label_en": "new Sample", "label_es": "Nueva Muestra",
    "type": "button",
    "read_only": false,
  },  
  {
    "name": "logSample",
    "label_en": "new Sampl22e", "label_es": "Nueva Muestra",
    "type": "button",
    "read_only": true,
  },     
]
export const programMain_programSelection=
[
    {                    
      "name": "programsList",
      "label_en": "Programs", "label_es": "Programas",
      "type": "list",
      "value": "",
      "read_only": false,
      "items" : [{
          "keyName":"",                        
          "keyValue_en":"", "keyValue_es":""              
      }]
    },
]

export const sampleLogin_ribbonField=[{"label_en": "Draft", "label_es": "Provisional",}];
export const sampleLogin_formFields=
[
    {                    
      "name": "sampleTemplatesList",
      "label_en": "Templates", "label_es": "Plantillas",
      "type": "list",
      "value": "",
      "read_only": false,
      "items" : [{
          "keyName":"",                        
          "keyValue_en":"", "keyValue_es":""              
      }]
    },
    {                    
      "name": "numSamples",
      "label_en": "How Many Samples To Log?", "label_es": "¿Cuántas?",
      "type": "integer",
      "value": 1,
      "minValue": 0,
      "maxValue": 10000,
      "read_only": false
    }
];
export const sampleReception_sampleFieldToRetrieve='sample_id|status|status_previous|sampling_comment|sample_config_code|program_name|location_name|spec_code|spec_variation_name';
export const sampleReception_sampleFieldToDisplay=[
    {name: 'status', label_en:'status', label_es: 'Estado', sort:false, filter:true}
  , {name: 'sample_id', label_en:'Sample ID', label_es: 'ID Muestra', sort:true, filter:false}
  , {name: 'program_name', label_en:'Project', label_es: 'Programa', sort:false, filter:true}
  , {name: 'location_name', label_en:'Location', label_es: 'Ubicación', sort:false, filter:true}
  , {name: 'sampling_date', label_en:'sampling Date', label_es: 'ID Fecha de Muestreo', sort:false, filter:true}
  , {name: 'sampling_comment', label_en:'sampling Comment', label_es: 'Comentario Muestreo', sort:false, filter:true}
  , {name: 'spec_code', label_en:'Spec', label_es: 'Especificación', sort:false, filter:true}
  , {name: 'spec_variation_name', label_en:'Variation', label_es: 'Variación', sort:false, filter:true}
  , {name: 'sample_config_code', label_en:'Configuration', label_es: 'Configuración', sort:false, filter:true}];
export const sampleReception_samplesWhereFieldsName='';
export const sampleReception_samplesWhereFieldsValue='';
export const sampleReception_sampleFieldToSort='sample_id desc';

export const sampleResults_sampleFieldToRetrieve='sample_id|status|sampling_date|sampling_comment|sample_config_code';
export const sampleResults_sampleFieldToDisplay=[
  {name: 'status', label_en:'status', label_es: 'Estado', sort:false, filter:true}
, {name: 'sample_id', label_en:'Sample ID', label_es: 'ID Muestra', sort:true, filter:false}
, {name: 'sampling_date', label_en:'sampling Date', label_es: 'ID Fecha de Muestreo', sort:false, filter:true}
, {name: 'sampling_comment', label_en:'sampling Comment', label_es: 'Comentario Muestreo', sort:false, filter:true}
, {name: 'sample_config_code', label_en:'Configuration', label_es: 'Configuración', sort:false, filter:true}];
export const sampleResults_samplesWhereFieldsName='status in-';
export const sampleResults_samplesWhereFieldsValue='RECEIVED-INCOMPLETE-COMPLETE*String';
export const sampleResults_sampleFieldToSort='sample_id desc';

export const sampleResults_analysisListFieldsToRetrieve='code|method_name|method_version';
export const sampleResults_analysisListToDisplay=[
   {name:'code', label_en:'Code', label_es:'Código'}
  ,{name:'method_name', label_en:'Analytical Method', label_es:'Método Analítico'}
  ,{name:'method_version', label_en:'Version', label_es:'Versión'}];  
export const sampleResults_analysisListFieldToSort='sample_id desc';

export const sampleResults_sampleAnalysisListFieldsToRetrieve='test_id|analysis|method_name|method_version|status';
export const sampleResults_sampleAnalysisListToDisplay=[
   {name:'test_id', label_en:'ID', label_es:'ID'}
  ,{name:'analysis', label_en:'Analysis', label_es:'Análisis'}
  ,{name:'method_name', label_en:'Method', label_es:'Método'}
  ,{name:'status', label_en:'Status', label_es:'Estado'}];
export const sampleResults_sampleAnalysisListFieldToSort='test_id desc';
export const sampleResults_givenSampleAnalysisListDialog_buttons=[
  {
      "name": "cancelTest",
      "label_en": "Cancel", "label_es": "Cancelar",
      "type": "button",
      "read_only": false,
  },  
  {
      "name": "uncancelResult",
      "label_en": "Uncancel", "label_es": "Descancelar",
      "type": "button",
      "read_only": false,
  },  
  {
      "name": "testAssignment",
      "label_en": "Test Assignment", "label_es": "Asignar Ensayo",
      "type": "button",
      "read_only": false,
  }
];  

export const sampleResults_sampleAnalysisResultEntryFieldsToRetrieve='result_id|analysis|method_name|method_version|param_name|param_type|raw_value|uom|spec_eval|spec_eval_detail|status';
export const sampleResults_sampleAnalysisResultEntryFieldsToDisplay=[
  {name:'spec_eval', label_en:'spec_eval', label_es:'Eval Espec', editable: false, hidden:false}
 ,{name:'result_id', label_en:'Result Id', label_es:'Id Resultado', editable: false, hidden:false}
 ,{name:'analysis', label_en:'Analysis', label_es:'Análísis', editable: false, hidden:false}
 ,{name:'param_name', label_en:'Parameter', label_es:'Parámetro', editable: false, hidden:false}
 ,{name:'raw_value', label_en:'Value', label_es:'Valor', editable: true, hidden:false}
 ,{name:'uom', label_en:'Measurement', label_es:'Medida', editable: false, hidden:false}
 ,{name:'param_type', label_en:'param_type', label_es:'param_type', editable: false, hidden:true}];
export const sampleResults_sampleAnalysisResultEntryFieldToSort='test_id|result_id';
export const sampleResults_buttons=[
	{
	  "name": "givenSampleAnalysisList",
	  "label_en": "Sample Analysis", "label_es": "Análisis de la Muestra",
	  "type": "icon-button",
	  "icon_name": "icons:description",
	  "esign_required": false,
	  "read_only": false,
	},  
	{
	  "name": "addSampleAnalysis",
	  "label_en": "Add Analysis", "label_es": "Añadir Análisis",
	  "type": "icon-button",
	  "icon_name": "icons:add-box", "icon_color": "aqua",
    "confirmuser_required": true,
    "esign_required": false,
	  "read_only": false,
	},  
	{
	  "name": "givenSampleEnterResult",
	  "label_en": "Enter Result", "label_es": "Entrar Resultado",
	  "type": "icon-button",
	  "icon_name": "icons:receipt",
	  "read_only": false,
	},
	{
	"name": "IncubationStart",
	"label_en": "Start Incubation", "label_es": "Iniciar incubación",
	"type": "button",
	"read_only": true,
	},             
	{
	"name": "IncubationEnd",
	"label_en": "Complete Incubation", "label_es": "Completar incubación",
	"type": "button",
	"read_only": true,
  }, 
  {
    "name": "setSamplingDate",
    "label_en": "Set Sampling Date", "label_es": "Asignar Fecha de Muestreo",
  "type": "icon-button",
  "icon_name": "icons:date-range",
    "read_only": false,
  }, 
	{
	  "name": "SAMPLINGCOMMENTADD",
	  "label_en": "Add Sampling Comment", "label_es": "Anexar observacion durante el Muestreo",
	  "type": "icon-button",
	  "icon_name": "icons:note-add",
	  "read_only": false,
	},
  {
    "name": "SAMPLINGCOMMENTREMOVE",
    "label_en": "Remove Sampling Comment", "label_es": "Borrar observacio durante el Muestreo",
    "type": "button",
    "read_only": false,
  },     
  {
    "name": "TestAssignment",
    "label_en": "Test Assignment", "label_es": "Asignación Ensayo",
    "type": "button",
    "read_only": true,
  },  	                                                                               
];

export const sampleRevision_sampleFieldToRetrieve='sample_id|status|status_previous|sampling_comment|sample_config_code';
export const sampleRevision_sampleFieldToDisplay=['sample_id', 'status', 'status_previous', 'sampling_comment', 'sample_config_code'];
export const sampleRevision_sampleFieldToSort='sample_id desc';

export const sampleCustodian_cocUsersListFieldToRetrieve='user_name';
export const sampleCustodian_cocUsersListFieldToDisplay=[
  {name: 'user_name', label_en:'Candidate', label_es: 'Candidato', sort:true, filter:false}
//, {name: 'person_name', label_en:'Custodian', label_es: 'Custodio', sort:false, filter:true}
//, {name: 'custodian_candidate', label_en:'Candidate', label_es: 'Candidato', sort:false, filter:true}
//, {name: 'status', label_en:'status', label_es: 'Estado', sort:false, filter:true}
];
export const sampleCustodian_cocUsersListWhereFieldsName='';
export const sampleCustodian_cocUsersListWhereFieldsValue='';
export const sampleCustodian_cocUsersListFieldToSort='';
export const sampleCustodian_cocUsersListButtons=[
  
];

export const sampleCustodian_cocSampleHistoryFieldToRetrieve='sample_id';
export const sampleCustodian_cocSampleHistoryFieldToDisplay=[
  {name: 'sample_id', label_en:'Sample ID', label_es: 'ID Muestra', sort:true, filter:false}
, {name: 'custodian_name', label_en:'Custodian', label_es: 'Custodio', sort:false, filter:true}
, {name: 'candidate_name', label_en:'Candidate', label_es: 'Candidato', sort:false, filter:true}
, {name: 'status', label_en:'status', label_es: 'Estado', sort:false, filter:true}
];
export const sampleCustodian_cocSampleHistoryWhereFieldsName='';
export const sampleCustodian_cocSampleHistoryWhereFieldsValue='';
export const sampleCustodian_cocSampleHistoryFieldToSort='';
export const sampleCustodian_cocSampleHistoryButtons=[
  {name: 'sample_id', label_en:'Sample ID', label_es: 'ID Muestra', sort:true, filter:false}
];


export const sampleCustodian_sampleFieldToRetrieveCustodian='sample_id|status|sampling_date|sampling_comment|sample_config_code';
export const sampleCustodian_sampleFieldToDisplayCustodian=[
  {name: 'sample_id', label_en:'Sample ID', label_es: 'ID Muestra', sort:true, filter:false}
, {name: 'status', label_en:'status', label_es: 'Estado', sort:false, filter:true}
, {name: 'sampling_date', label_en:'sampling Date', label_es: 'ID Fecha de Muestreo', sort:false, filter:true}
, {name: 'sampling_comment', label_en:'sampling Comment', label_es: 'Comentario Muestreo', sort:false, filter:true}
, {name: 'sample_config_code', label_en:'Configuration', label_es: 'Configuración', sort:false, filter:true}];
export const sampleCustodian_samplesWhereFieldsNameCustodian='status in-|custodian';
export const sampleCustodian_samplesWhereFieldsValueCustodian='RECEIVED-INCOMPLETE-COMPLETE*String|TOKEN_internalUserID*String';
export const sampleCustodian_sampleFieldToSortCustodian='sample_id desc';
export const sampleCustodian_buttonsCustodian=[
  {
      "name": "ChangeOfCustodyStartChange",
      "label_en": "Custody Change", "label_es": "Cambiar Custodia",
      "type": "button",
      "read_only": false,
  }, 
  {
    "name": "ChangeOfCustodyHistory",
    "label_en": "Custody History", "label_es": "Histórico Custodia",
    "type": "button",
    "read_only": false,
  },   
];

export const sampleCustodian_sampleFieldToRetrieveCandidate='sample_id|status|sampling_date|sampling_comment|sample_config_code';
export const sampleCustodian_sampleFieldToDisplayCandidate=[
  {name: 'sample_id', label_en:'Sample ID', label_es: 'ID Muestra', sort:true, filter:false}
, {name: 'status', label_en:'status', label_es: 'Estado', sort:false, filter:true}
, {name: 'sampling_date', label_en:'sampling Date', label_es: 'ID Fecha de Muestreo', sort:false, filter:true}
, {name: 'sampling_comment', label_en:'sampling Comment', label_es: 'Comentario Muestreo', sort:false, filter:true}
, {name: 'sample_config_code', label_en:'Configuration', label_es: 'Configuración', sort:false, filter:true}];
export const sampleCustodian_samplesWhereFieldsNameCandidate='status in-|custodian_candidate';
export const sampleCustodian_samplesWhereFieldsValueCandidate='RECEIVED-INCOMPLETE-COMPLETE*String|TOKEN_internalUserID*String';
export const sampleCustodian_sampleFieldToSortCandidate='sample_id desc';
export const sampleCustodian_buttonsCandidate=[
  {
      "name": "COC_CONFIRMCHANGE",
      "label_en": "Accept CoC", "label_es": "Aceptar CoC",
      "type": "button",
      "read_only": false,
  }, 
  {
    "name": "COC_ABORTCHANGE",
    "label_en": "Reject CoC", "label_es": "Rechazar CoC",
    "type": "button",
    "confirmuser_required": false,
    "read_only": false,
  },   
];

export const sampleSampling_sampleFieldToRetrieve='sample_id|current_stage|status|status_previous|sampling_date|sampling_comment|sample_config_code|program_name|location_name|spec_code|spec_variation_name';
export const sampleSampling_sampleFieldToDisplay=[
  , {name: 'sample_id', label_en:'Sample ID', label_es: 'ID Muestra', sort:true, filter:false, width:'20%'}
  , {name: 'program_name', label_en:'Project', label_es: 'Programa', sort:false, filter:true, width:'30%'}
  , {name: 'location_name', label_en:'Location', label_es: 'Ubicación', sort:false, filter:true, width:'30%'}
  , {name: 'sampling_date', label_en:'sampling Date', label_es: 'ID Fecha de Muestreo', sort:false, filter:true, width:'30%'}
  , {name: 'sampling_comment', label_en:'sampling Comment', label_es: 'Comentario Muestreo', sort:false, filter:true, width:'40%'}
  , {name: 'spec_code', label_en:'Spec', label_es: 'Especificación', sort:false, filter:true, width:'30%'}
  , {name: 'spec_variation_name', label_en:'Variation', label_es: 'Variación', sort:false, filter:true, width:'40%'}];
export const sampleSampling_samplesWhereFieldsName='current_stage|sample_config_code not in*';
export const sampleSampling_samplesWhereFieldsValue='Sampling|'+personal_smp_template;
export const sampleSampling_sampleFieldToSort='sample_id desc';
export const sampleSampling_buttons=[
  {
    "name": "SAMPLE_AUDIT",
    "label_en": "Sample Audit", "label_es": "Auditoría",
    "type": "button",
    "icon_name": "icons:next-week",
    "read_only": false,
    "confirmuser_required": false,
    "esign_required": true,    
  },   
  {
    "name": "SAMPLESTAGE_MOVETOPREVIOUS",
    "label_en": "Previous", "label_es": "Anterior",
    "type": "icon-button",
    "icon_name": "icons:assignment-return",
    "read_only": false,
  },             
  {
    "name": "SAMPLESTAGE_MOVETONEXT",
    "label_en": "Next", "label_es": "Siguiente",
    "type": "icon-button",
    "icon_name": "icons:next-week",
    "read_only": false,
  },             
  {
    "name": "setSamplingDate",
    "label_en": "Set Sampling Date", "label_es": "Asignar Fecha de Muestreo",
  "type": "icon-button",
  "icon_name": "icons:date-range",
    "read_only": false,
  }, 
	{
	  "name": "SAMPLINGCOMMENTADD",
	  "label_en": "Add Sampling Comment", "label_es": "Anexar observacion durante el Muestreo",
	  "type": "icon-button",
	  "icon_name": "icons:note-add",
	  "read_only": false,
	},
  {
    "name": "SAMPLINGCOMMENTREMOVE",
    "label_en": "Remove Sampling Comment", "label_es": "Borrar observacio durante el Muestreo",
    "type": "button",
    "read_only": false,
  },     
]
export const sampleIncubation1_sampleFieldToRetrieve='sample_id|current_stage|status|sampling_date|sampling_comment|sample_config_code';
export const sampleIncubation1_sampleFieldToDisplay=[
  {name: 'sample_id', label_en:'Sample ID', label_es: 'ID Muestra', sort:true, filter:false}
, {name: 'status', label_en:'status', label_es: 'Estado', sort:false, filter:true}
, {name: 'sampling_date', label_en:'sampling Date', label_es: 'ID Fecha de Muestreo', sort:false, filter:true}
, {name: 'sampling_comment', label_en:'sampling Comment', label_es: 'Comentario Muestreo', sort:false, filter:true}
, {name: 'sample_config_code', label_en:'Configuration', label_es: 'Configuración', sort:false, filter:true}];
export const sampleIncubation1_samplesWhereFieldsName='current_stage|incubation_passed';
export const sampleIncubation1_samplesWhereFieldsValue='Incubation|false';
export const sampleIncubation1_sampleFieldToSort='sample_id desc';
export const sampleIncubation1_buttons=[
  {
    "name": "SAMPLE_AUDIT",
    "label_en": "Sample Audit", "label_es": "Auditoría",
    "type": "button",
    "icon_name": "icons:next-week",
    "read_only": false,
  },             
  {
    "name": "IncubationStart",
    "label_en": "Start Incubation", "label_es": "Iniciar incubación",
    "type": "button",
    "read_only": false,
  },             
    {
    "name": "IncubationEnd",
    "label_en": "Complete Incubation", "label_es": "Completar incubación",
    "type": "button",
    "read_only": false,
  },   
  {
    "name": "MiBotón",
    "label_en": "Button", "label_es": "Mi Botón",
    "type": "button",
    "read_only": false,
  },   
];
export const sampleIncubation2_sampleFieldToRetrieve='sample_id|current_stage|status|incubation_start|incubation_end|sampling_date|sampling_comment|sample_config_code';
export const sampleIncubation2_sampleFieldToDisplay=[
  {name: 'sample_id', label_en:'Sample ID', label_es: 'ID Muestra', sort:true, filter:false}
, {name: 'status', label_en:'status', label_es: 'Estado', sort:false, filter:true}
, {name: 'sampling_date', label_en:'sampling Date', label_es: 'ID Fecha de Muestreo', sort:false, filter:true}
, {name: 'incubation_start', label_en:'incubation 1 start', label_es: 'Inicio 1a Incubacion', sort:false, filter:true}
, {name: 'incubation_end', label_en:'incubation 1 end', label_es: 'Fin 1a Incubacion', sort:false, filter:true}];
export const sampleIncubation2_samplesWhereFieldsName='current_stage|incubation_passed|incubation2_passed';
export const sampleIncubation2_samplesWhereFieldsValue='Incubation|true|false';
export const sampleIncubation2_sampleFieldToSort='sample_id desc';
export const sampleIncubation2_buttons=[
  {
    "name": "SAMPLESTAGE_MOVETOPREVIOUS",
    "label_en": "Previous", "label_es": "Anterior",
    "type": "icon-button",
    "icon_name": "icons:assignment-return",
    "read_only": false,
  },
  {
    "name": "SAMPLESTAGE_MOVETONEXT",
    "label_en": "Next", "label_es": "Siguiente",
    "type": "icon-button",
    "icon_name": "icons:next-week",
    "read_only": false,
  },             
  {
    "name": "SAMPLE_AUDIT",
    "label_en": "Sample Audit", "label_es": "Auditoría",
    "type": "button",
    "icon_name": "icons:next-week",
    "read_only": false,
  },                  
  {
    "name": "Incubation2Start",
    "label_en": "Start Incubation", "label_es": "Iniciar incubación",
    "type": "button",
    "read_only": false,
  },             
  {
    "name": "Incubation2End",
    "label_en": "Complete Incubation", "label_es": "Completar incubación",
    "type": "button",
    "read_only": false,
  }, 
];

export const sampleIncubation1_incubBatch_sampleFieldToRetrieve='sample_id|current_stage|status|sampling_date|sampling_comment|sample_config_code|incubation_batch';
export const sampleIncubation1_incubBatch_sampleFieldToDisplay=[
  {name: 'sample_id', label_en:'Sample ID', label_es: 'ID Muestra', sort:true, filter:false, width:'20%'}
, {name: 'incubation_batch', label_en:'Batch', label_es: 'Tanda', sort:true, filter:false, width:'30%'}
, {name: 'sampling_date', label_en:'sampling Date', label_es: 'ID Fecha de Muestreo', sort:false, filter:true, width:'30%'}
, {name: 'sampling_comment', label_en:'sampling Comment', label_es: 'Comentario Muestreo', sort:false, filter:true, width:'40%'}
];
export const sampleIncubation1_incubBatch_samplesWhereFieldsName='current_stage|incubation_passed';
export const sampleIncubation1_incubBatch_samplesWhereFieldsValue='Incubation|false';
export const sampleIncubation1_incubBatch_sampleFieldToSort='sample_id desc';
export const sampleIncubation1_incubBatch_buttons=[
  {
    "name": "SAMPLE_AUDIT",
    "label_en": "Sample Audit", "label_es": "Auditoría",
    "type": "button",
    "icon_name": "icons:next-week",
    "read_only": false,
  },             
  {
    "name": "EM_BATCH_INCUB_ADD_SMP",
    "label_en": "Add To Batch", "label_es": "Añadir a Tanda",
    "type": "button",
    "read_only": false,
  },             
    {
    "name": "EM_BATCH_INCUB_REMOVE_SMP",
    "label_en": "Remove from Batch", "label_es": "Quitar de Tanda",
    "type": "button",
    "read_only": false,
  },   
];
export const sampleIncubation2_incubBatch_sampleFieldToRetrieve='sample_id|current_stage|status|incubation2_batch|incubation2_start|incubation_start|incubation_end|sampling_date|sampling_comment|sample_config_code';
export const sampleIncubation2_incubBatch_sampleFieldToDisplay=[
  {name: 'sample_id', label_en:'Sample ID', label_es: 'ID Muestra', sort:true, filter:false, width:'20%'}
  , {name: 'incubation2_batch', label_en:'Batch', label_es: 'Tanda', sort:false, filter:false, width:'30%'}
  , {name: 'incubation2_start', label_en:'incubation 2 start', label_es: 'Inicio 2a Incubacion', sort:false, filter:true, width:'20%'}
, {name: 'sampling_date', label_en:'sampling Date', label_es: 'ID Fecha de Muestreo', sort:false, filter:true, width:'30%'}
, {name: 'incubation_incubator', label_en:'Incubator incub 1', label_es: 'Incubadora 1a Incubacion', sort:false, filter:true, width:'30%'}
, {name: 'incubation_start', label_en:'incubation 1 start', label_es: 'Inicio 1a Incubacion', sort:false, filter:true, width:'30%'}
, {name: 'incubation_end', label_en:'incubation 1 end', label_es: 'Fin 1a Incubacion', sort:false, filter:true, width:'30%'}];
export const sampleIncubation2_incubBatch_samplesWhereFieldsName='current_stage|incubation_passed';
export const sampleIncubation2_incubBatch_samplesWhereFieldsValue='Incubation|true';
export const sampleIncubation2_incubBatch_sampleFieldToSort='sample_id desc';
export const sampleIncubation2_incubBatch_buttons=[
  {
    "name": "SAMPLE_AUDIT",
    "label_en": "Sample Audit", "label_es": "Auditoría",
    "type": "button",
    "icon_name": "icons:next-week",
    "read_only": false,
  },                  
  {
    "name": "EM_BATCH_INCUB_ADD_SMP",
    "label_en": "Add To Batch", "label_es": "Añadir a Tanda",
    "type": "button",
    "read_only": false,
  },             
    {
    "name": "EM_BATCH_INCUB_REMOVE_SMP",
    "label_en": "Remove from Batch", "label_es": "Quitar de Tanda",
    "type": "button",
    "read_only": false,
  },   
  {
    "name": "SAMPLESTAGE_MOVETOPREVIOUS",
    "label_en": "Previous", "label_es": "Anterior",
    "type": "icon-button",
    "icon_name": "icons:assignment-return",
    "read_only": false,
  },
  {
    "name": "SAMPLESTAGE_MOVETONEXT",
    "label_en": "Next", "label_es": "Siguiente",
    "type": "icon-button",
    "icon_name": "icons:next-week",
    "read_only": false,
  },             
];
export const sampleIncubation_incubBatch_activeBatchFieldToDisplay=[
  {name: 'name', label_en:'Name', label_es: 'Nombre', sort:true, filter:false, width:'30%'}
, {name: 'incubation_incubator', label_en:'Incubator', label_es: 'Incubadora', sort:false, filter:true, width:'30%'}
, {name: 'NUM_SAMPLES', label_en:'Num Samples', label_es: 'Nº Muestras', sort:false, filter:true, width:'20%'}
, {name: 'incubation_start', label_en:'Start Date', label_es: 'Fecha Inicio', sort:false, filter:true, width:'30%'}
, {name: 'type', label_en:'Type', label_es: 'Tipo', sort:false, filter:true, width:'30%'}];
export const sampleIncubation_incubBatch_activeBatchButtons=[
  {
    "name": "EM_BATCH_INCUB_CREATE",
    "label_en": "New Batch", "label_es": "Crear Tanda",
    "type": "button",
    "icon_name": "icons:assignment-return",
    "read_only": false,
  },
  {
    "name": "EM_BATCH_ASSIGN_INCUB",
    "label_en": "Assign Incubator", "label_es": "Asignar incubadora",
    "type": "button",
    "icon_name": "icons:assignment-return",
    "read_only": false,
  },
  {
    "name": "EM_BATCH_INCUB_START",
    "label_en": "Start Incubation", "label_es": "Empezar incubación",
    "type": "button",
    "icon_name": "icons:assignment-return",
    "read_only": false,
  },
  {
    "name": "EM_BATCH_INCUB_END",
    "label_en": "End Incubation", "label_es": "Terminar incubación",
    "type": "button",
    "icon_name": "icons:assignment-return",
    "read_only": false,
  },    
];
export const sampleIncubation_incubBatch_incubatorsFieldToDisplay=[
  {name: 'name', label_en:'Name', label_es: 'Nombre', sort:true, filter:false}
, {name: 'description', label_en:'description', label_es: 'descripción', sort:false, filter:true}
];
export const sampleIncubation_incubBatch_newBatchFormFields=[
  {
    "name": "migroorganism_freetext",
    "label_en": "New", "label_es": "Nuevo",
    "type": "text",
    "password": "false",
    "value": "",
    "read_only": false
  }, 
];
export const samplePlateReading_sampleFieldToRetrieve='sample_id|program_name|location_name|current_stage|status|sampling_date|sampling_comment|incubation_batch|incubation_incubator|incubation_start|incubation_end|incubation2_batch|incubation2_incubator|incubation2_start|incubation2_end|sample_config_code';
export const samplePlateReading_sampleFieldToDisplay=[
  {name: 'sample_id', label_en:'Sample ID', label_es: 'ID Muestra', sort:true, filter:false, width:'5%'},
  , {name: 'program_name', label_en:'Project', label_es: 'Programa', width:'20px', sort:false, filter:true, width:'6%'}
  , {name: 'location_name', label_en:'Location', label_es: 'Ubicación', width:'30px', sort:false, filter:true, width:'6%'}
, {name: 'sampling_date', label_en:'sampling Date', label_es: 'ID Fecha de Muestreo', sort:false, filter:true, width:'6%' }
, {name: 'incubation_batch', label_en:'Batch incub 1', label_es: 'Tanda 1a Incubacion', sort:false, filter:true, width:'6%'}
, {name: 'incubation_incubator', label_en:'Incubator incub 1', label_es: 'Incubadora 1a Incubacion', sort:false, filter:true, width:'6%'}
, {name: 'incubation_start', label_en:'incubation 1 start', label_es: 'Inicio 1a Incubacion', sort:false, filter:true, width:'6%'}
, {name: 'incubation_end', label_en:'incubation 1 end', label_es: 'Fin 1a Incubacion', sort:false, filter:true, width:'6%'}
, {name: 'incubation2_batch', label_en:'Batch incub 2', label_es: 'Tanda 2a Incubacion', sort:false, filter:true, width:'6%'}
, {name: 'incubation2_incubator', label_en:'Incubator incub 2', label_es: 'Incubadora 2a Incubacion', sort:false, filter:true, width:'6%'}
, {name: 'incubation2_start', label_en:'incubation 2 start', label_es: 'Inicio 2a Incubacion', sort:false, filter:true, width:'6%'}
, {name: 'incubation2_end', label_en:'incubation 2 end', label_es: 'Fin 2a Incubacion', sort:false, filter:true, width:'6%'}];

export const samplePlateReading_samplesWhereFieldsName='current_stage|sample_config_code not in*';
export const samplePlateReading_samplesWhereFieldsValue='PlateReading|'+personal_smp_template;
export const samplePlateReading_sampleFieldToSort='sample_id desc';
export const samplePlateReading_buttons=[          
  {
    "name": "SAMPLESTAGE_MOVETOPREVIOUS",
    "label_en": "Previous", "label_es": "Anterior",
    "type": "icon-button",
    "icon_name": "icons:assignment-return",
    "read_only": false,
  },             
  {
    "name": "SAMPLESTAGE_MOVETONEXT",
    "label_en": "Next", "label_es": "Siguiente",
    "type": "icon-button",
    "icon_name": "icons:next-week",
    "read_only": false,
  },   
  {
    "name": "SAMPLE_AUDIT",
    "label_en": "Sample Audit", "label_es": "Auditoría",
    "type": "button",
    "icon_name": "icons:next-week",
    "read_only": false,
  },   
  // {
	//   "name": "givenSampleAnalysisList",
	//   "label_en": "Sample Analysis", "label_es": "Análisis de la Muestra",
	//   "type": "icon-button",
	//   "icon_name": "icons:description",
	//   "esign_required": false,
	//   "read_only": false,
	// },  
	{
	  "name": "addSampleAnalysis",
	  "label_en": "Add Analysis", "label_es": "Añadir Análisis",
	  "type": "zicon-button",
	  "icon_name": "icons:add-box", "icon_color": "aqua",
    "confirmuser_required": false,
    "esign_required": false,
	  "read_only": false,
	},  
	{
	  "name": "givenSampleEnterResult",
	  "label_en": "Enter Result", "label_es": "Entrar Resultado",
	  "type": "icon-button",
	  "icon_name": "icons:receipt",
	  "read_only": false,
  },
];

export const microorganism_allowAddNotOnTheList=true;
export const microorganism_allowAddNotOnTheList_formFields=[
  {
    "name": "migroorganism_freetext",
    "label_en": "New", "label_es": "Nuevo",
    "type": "text",
    "password": "false",
    "value": "",
    "read_only": false
  },    
  {
    "name": "buttonNewAdhocMicroorganism",
    "label_en": "Add Adhoc", "label_es": "Añadir Nuevo",
    "type": "button",              
    "value": "",
    "read_only": false
  },        
  {
    "name": "buttonNewMicroorganism",
    "label_en": "Add", "label_es": "Añadir",
    "type": "button",              
    "value": "",
    "read_only": false
  },           
];
export const microorganismList_fieldsToDisplay=[
  {name: 'name', label_en:'name', label_es: 'Nombre', sort:false, filter:true}
]
export const sampleMicroorganism_sampleFieldToRetrieve='sample_id|current_stage|status|status_previous|sampling_comment|sample_config_code|program_name|location_name|spec_code|spec_variation_name';
export const sampleMicroorganism_sampleFieldToDisplay=[
  , {name: 'sample_id', label_en:'Sample ID', label_es: 'ID Muestra', width:'12px', sort:true, filter:false, width:'20%'}
  , {name: 'program_name', label_en:'Project', label_es: 'Programa', width:'20px', sort:false, filter:true, width:'30%'}
  , {name: 'location_name', label_en:'Location', label_es: 'Ubicación', width:'30px', sort:false, filter:true, width:'30%'}
  , {name: 'sampling_date', label_en:'sampling Date', label_es: 'ID Fecha de Muestreo', width:'20px', sort:false, filter:true, width:'30%'}
  , {name: 'raw_value', label_en:'Reading Result', label_es: 'Recuento', width:'20px', sort:false, filter:true, width:'20%'}
  , {name: 'microorganism_count', label_en:'# Organism Ident.', label_es: 'Num. MicroOrg. Detectados', width:'20px', sort:false, filter:true, width:'20%'}
  , {name: 'microorganism_list', label_en:'Microorganisms', label_es: 'Microorganismos', width:'20px', sort:false, filter:true, width:'40%'}
]
export const sampleMicroorganism_samplesWhereFieldsName='current_stage|sample_config_code not in*';
export const sampleMicroorganism_samplesWhereFieldsValue='MicroorganismIdentification|'+personal_smp_template;
export const sampleMicroorganism_sampleFieldToSort='sample_id desc';
export const sampleMicroorganism_buttons=[          
  {
    "name": "SAMPLESTAGE_MOVETOPREVIOUS",
    "label_en": "Previous", "label_es": "Anterior",
    "type": "icon-button",
    "icon_name": "icons:assignment-return",
    "read_only": false,
  }, 
  {
    "name": "SAMPLESTAGE_MOVETONEXT",
    "label_en": "Next", "label_es": "Siguiente",
    "type": "icon-button",
    "icon_name": "icons:next-week",
    "read_only": false,
  },    
  {
    "name": "SAMPLE_AUDIT",
    "label_en": "Sample Audit", "label_es": "Auditoría",
    "type": "button",
    "icon_name": "icons:next-week",
    "read_only": false,
  },               
	{
	  "name": "addMicroorganism",
	  "label_en": "Add Microorganism", "label_es": "Añadir Microorganismo",
	  "type": "icon-button",
	  "icon_name": "icons:add-box", "icon_color": "aqua",
    "confirmuser_required": false,
    "esign_required": false,
	  "read_only": false,
	},  
	{
	  "name": "givenSampleAnalysisList",
	  "label_en": "Sample Analysis", "label_es": "Análisis de la Muestra",
	  "type": "zicon-button",
	  "icon_name": "icons:description",
	  "esign_required": false,
	  "read_only": false,
	},  
	{
	  "name": "givenSampleEnterResult",
	  "label_en": "Enter Result", "label_es": "Entrar Resultado",
	  "type": "zicon-button",
	  "icon_name": "icons:receipt",
	  "read_only": false,
	},	                                                                             
];

export const personSampling_sampleFieldToRetrieve='sample_id|current_stage|status|status_previous|sampling_date|sampling_comment|sample_config_code|program_name|location_name|spec_code|spec_variation_name';
export const personSampling_sampleFieldToDisplay=[
    {name: 'status', label_en:'status', label_es: 'Estado', sort:false, filter:true}
  , {name: 'sample_id', label_en:'Sample ID', label_es: 'ID Muestra', sort:true, filter:false}
  , {name: 'program_name', label_en:'Project', label_es: 'Programa', sort:false, filter:true}
  , {name: 'location_name', label_en:'Location', label_es: 'Ubicación', sort:false, filter:true}
  , {name: 'sampling_date', label_en:'sampling Date', label_es: 'ID Fecha de Muestreo', sort:false, filter:true}
  , {name: 'sampling_comment', label_en:'sampling Comment', label_es: 'Comentario Muestreo', sort:false, filter:true}
  , {name: 'spec_code', label_en:'Spec', label_es: 'Especificación', sort:false, filter:true}
  , {name: 'spec_variation_name', label_en:'Variation', label_es: 'Variación', sort:false, filter:true}
  , {name: 'sample_config_code', label_en:'Configuration', label_es: 'Configuración', sort:false, filter:true}];
export const personSampling_samplesWhereFieldsName='current_stage|sample_config_code';
export const personSampling_samplesWhereFieldsValue='Sampling|'+personal_smp_template;
export const personSampling_sampleFieldToSort='sample_id desc';
export const personSampling_buttons=[
  {
    "name": "SAMPLE_AUDIT",
    "label_en": "Sample Audit", "label_es": "Auditoría",
    "type": "button",
    "icon_name": "icons:next-week",
    "read_only": false,
    "confirmuser_required": false,
    "esign_required": true,    
  },   
  {
    "name": "SAMPLESTAGE_MOVETOPREVIOUS",
    "label_en": "Previous", "label_es": "Anterior",
    "type": "icon-button",
    "icon_name": "icons:assignment-return",
    "read_only": false,
  },             
  {
    "name": "SAMPLESTAGE_MOVETONEXT",
    "label_en": "Next", "label_es": "Siguiente",
    "type": "icon-button",
    "icon_name": "icons:next-week",
    "read_only": false,
  },             
  {
    "name": "setSamplingDate",
    "label_en": "Set Sampling Date", "label_es": "Asignar Fecha de Muestreo",
  "type": "icon-button",
  "icon_name": "icons:date-range",
    "read_only": false,
  }, 
	{
	  "name": "SAMPLINGCOMMENTADD",
	  "label_en": "Add Sampling Comment", "label_es": "Anexar observacion durante el Muestreo",
	  "type": "icon-button",
	  "icon_name": "icons:note-add",
	  "read_only": false,
	},
  {
    "name": "SAMPLINGCOMMENTREMOVE",
    "label_en": "Remove Sampling Comment", "label_es": "Borrar observacio durante el Muestreo",
    "type": "button",
    "read_only": false,
  },     
]
export const personPlateReading_sampleFieldToRetrieve='sample_id|current_stage|status|sampling_date|sampling_comment|sample_config_code';
export const personPlateReading_sampleFieldToDisplay=[
  {name: 'sample_id', label_en:'Sample ID', label_es: 'ID Muestra', sort:true, filter:false}
, {name: 'status', label_en:'status', label_es: 'Estado', sort:false, filter:true}
, {name: 'sampling_date', label_en:'sampling Date', label_es: 'ID Fecha de Muestreo', sort:false, filter:true}
, {name: 'sampling_comment', label_en:'sampling Comment', label_es: 'Comentario Muestreo', sort:false, filter:true}
, {name: 'sample_config_code', label_en:'Configuration', label_es: 'Configuración', sort:false, filter:true}];
 export const personPlateReading_samplesWhereFieldsName='current_stage|sample_config_code';
 export const personPlateReading_samplesWhereFieldsValue='PlateReading|'+personal_smp_template;
export const personPlateReading_sampleFieldToSort='sample_id desc';
export const personPlateReading_buttons=[          
  {
    "name": "SAMPLESTAGE_MOVETOPREVIOUS",
    "label_en": "Previous", "label_es": "Anterior",
    "type": "icon-button",
    "icon_name": "icons:assignment-return",
    "read_only": false,
  },             
  {
    "name": "SAMPLESTAGE_MOVETONEXT",
    "label_en": "Next", "label_es": "Siguiente",
    "type": "icon-button",
    "icon_name": "icons:next-week",
    "read_only": false,
  },   
  {
    "name": "SAMPLE_AUDIT",
    "label_en": "Sample Audit", "label_es": "Auditoría",
    "type": "button",
    "icon_name": "icons:next-week",
    "read_only": false,
  },   
  {
	  "name": "givenSampleAnalysisList",
	  "label_en": "Sample Analysis", "label_es": "Análisis de la Muestra",
	  "type": "icon-button",
	  "icon_name": "icons:description",
	  "esign_required": false,
	  "read_only": false,
	},  
	{
	  "name": "addSampleAnalysis",
	  "label_en": "Add Analysis", "label_es": "Añadir Análisis",
	  "type": "icon-button",
	  "icon_name": "icons:add-box", "icon_color": "aqua",
    "confirmuser_required": false,
    "esign_required": false,
	  "read_only": false,
	},  
	{
	  "name": "givenSampleEnterResult",
	  "label_en": "Enter Result", "label_es": "Entrar Resultado",
	  "type": "icon-button",
	  "icon_name": "icons:receipt",
	  "read_only": false,
	},
	{
	"name": "IncubationStart",
	"label_en": "Start Incubation", "label_es": "Iniciar incubación",
	"type": "button",
	"read_only": true,
	},             
	{
	"name": "IncubationEnd",
	"label_en": "Complete Incubation", "label_es": "Completar incubación",
	"type": "button",
	"read_only": true,
  }, 
  {
    "name": "TestAssignment",
    "label_en": "Test Assignment", "label_es": "Asignación Ensayo",
    "type": "button",
    "read_only": true,
  },  	                                                                               
];
export const personMicroorganism_sampleFieldToRetrieve='sample_id|current_stage|status|status_previous|sampling_comment|sample_config_code|program_name|location_name|spec_code|spec_variation_name';
export const personMicroorganism_sampleFieldToDisplay=[
    {name: 'status', label_en:'status', label_es: 'Estado', width:'20px', sort:false, filter:true}
  , {name: 'sample_id', label_en:'Sample ID', label_es: 'ID Muestra', width:'12px', sort:true, filter:false}
  , {name: 'program_name', label_en:'Project', label_es: 'Programa', width:'20px', sort:false, filter:true}
  , {name: 'location_name', label_en:'Location', label_es: 'Ubicación', width:'30px', sort:false, filter:true}
  , {name: 'sampling_date', label_en:'sampling Date', label_es: 'ID Fecha de Muestreo', width:'20px', sort:false, filter:true}
  , {name: 'raw_value', label_en:'Reading Result', label_es: 'Recuento', width:'20px', sort:false, filter:true}
  , {name: 'microorganism_count', label_en:'# Organism Ident.', label_es: 'Num. MicroOrg. Detectados', width:'20px', sort:false, filter:true}
  , {name: 'microorganism_list', label_en:'Microorganisms', label_es: 'Microorganismos', width:'20px', sort:false, filter:true}
]
export const personMicroorganism_samplesWhereFieldsName='current_stage|sample_config_code';
export const personMicroorganism_samplesWhereFieldsValue='MicroorganismIdentification|'+personal_smp_template;
export const personMicroorganism_sampleFieldToSort='sample_id desc';
export const personMicroorganism_buttons=[          
  {
    "name": "SAMPLESTAGE_MOVETOPREVIOUS",
    "label_en": "Previous", "label_es": "Anterior",
    "type": "icon-button",
    "icon_name": "icons:assignment-return",
    "read_only": false,
  }, 
  {
    "name": "SAMPLESTAGE_MOVETONEXT",
    "label_en": "Next", "label_es": "Siguiente",
    "type": "icon-button",
    "icon_name": "icons:next-week",
    "read_only": false,
  },    
  {
    "name": "SAMPLE_AUDIT",
    "label_en": "Sample Audit", "label_es": "Auditoría",
    "type": "button",
    "icon_name": "icons:next-week",
    "read_only": false,
  },               
	{
	  "name": "addMicroorganism",
	  "label_en": "Add Microorganism", "label_es": "Añadir Microorganismo",
	  "type": "icon-button",
	  "icon_name": "icons:add-box", "icon_color": "aqua",
    "confirmuser_required": false,
    "esign_required": false,
	  "read_only": false,
	},  
	{
	  "name": "givenSampleAnalysisList",
	  "label_en": "Sample Analysis", "label_es": "Análisis de la Muestra",
	  "type": "icon-button",
	  "icon_name": "icons:description",
	  "esign_required": false,
	  "read_only": false,
	},  
	{
	  "name": "givenSampleEnterResult",
	  "label_en": "Enter Result", "label_es": "Entrar Resultado",
	  "type": "icon-button",
	  "icon_name": "icons:receipt",
	  "read_only": false,
	},
	{
	"name": "IncubationStart",
	"label_en": "Start Incubation", "label_es": "Iniciar incubación",
	"type": "button",
	"read_only": true,
	},             
	{
	"name": "IncubationEnd",
	"label_en": "Complete Incubation", "label_es": "Completar incubación",
	"type": "button",
	"read_only": true,
  }, 
  {
    "name": "setSamplingDate",
    "label_en": "Set Sampling Date", "label_es": "Asignar Fecha de Muestreo",
  "type": "icon-button",
  "icon_name": "icons:date-range",
    "read_only": false,
  }, 
	{
	  "name": "SAMPLINGCOMMENTADD",
	  "label_en": "Add Sampling Comment", "label_es": "Anexar observacion durante el Muestreo",
	  "type": "icon-button",
	  "icon_name": "icons:note-add",
	  "read_only": false,
	},
  {
    "name": "SAMPLINGCOMMENTREMOVE",
    "label_en": "Remove Sampling Comment", "label_es": "Borrar observacio durante el Muestreo",
    "type": "button",
    "read_only": false,
  },     
  {
    "name": "TestAssignment",
    "label_en": "Test Assignment", "label_es": "Asignación Ensayo",
    "type": "button",
    "read_only": true,
  },  	                                                                               
];
export const programHome_defaultTab = "points";
export const programHome_sampleSummaryGaugeOptions={"width": 400, "height": 120, "redFrom": 90, "redTo": 100, "yellowFrom":75,
                                                    "yellowTo": 90, "minorTicks": 5};
export const programHome_sampleSummaryPieOptions={"title": "Samples Progress"};

export const programHome_lastResults_infoGrouped={
  'grouped':true,
}

export const programProgConfigCalendar_progConfigCalendarTableHeaderFields=[
  {name: 'area', label_en:'Area', label_es: 'Area', sort:false, filter:true, is_icon:true}
, {name: 'location_name', label_en:'Location', label_es: 'Ubicación', sort:false, filter:true}
, {name: 'spec_code', label_en:'Spec', label_es: 'Especificación', sort:false, filter:true}
, {name: 'spec_variation_name', label_en:'Variation', label_es: 'Variación', sort:false, filter:true}
, {name: 'spec_analysis_variation', label_en:'Analysis Variation', label_es: 'Análisis de Variación', sort:false, filter:true}
];


export const programProgPoints_samplePointsTableHeaderFields=[
  {name: 'area', label_en:'Area', label_es: 'Area', sort:false, filter:true, is_icon:true}
, {name: 'location_name', label_en:'Location', label_es: 'Ubicación', sort:false, filter:true}
, {name: 'spec_code', label_en:'Spec', label_es: 'Especificación', sort:false, filter:true}
, {name: 'spec_variation_name', label_en:'Variation', label_es: 'Variación', sort:false, filter:true}
, {name: 'spec_analysis_variation', label_en:'Analysis Variation', label_es: 'Análisis de Variación', sort:false, filter:true}
];

export const programProgPoints_samplePointsMapTableHeaderFields=[
    {name: 'program_name', label_en:'Project', label_es: 'Programa', sort:false, filter:true, is_icon:true}
  , {name: 'location_name', label_en:'Location', label_es: 'Ubicación', sort:false, filter:true}
  , {name: 'description_en', label_en:'description_en', label_es: 'description_en', sort:false, filter:true}
];

export const progCorrectiveActionButtons=[
  {
      "name": "CORRECTIVE_ACTION_COMPLETE",
      "label_en": "Complete", "label_es": "Concluir",
      "type": "button",
      "read_only": false,
  },  
];
export const progCorrectiveActionTableHeaderFields=[
, {name: 'status', label_en:'Status', label_es: 'Estado', sort:false, filter:true}
, {name: 'result_id', label_en:'Result', label_es: 'Resultado', sort:false, filter:true}
, {name: 'created_on', label_en:'Creation', label_es: 'Creada', sort:true, filter:false}
, {name: 'program_name', label_en:'Program', label_es: 'Programa', sort:false, filter:true}
, {name: 'location_name', label_en:'Location', label_es: 'Ubicación', sort:false, filter:true}
, {name: 'method_name', label_en:'Method', label_es: 'Método', sort:false, filter:true}
, {name: 'spec_eval_detail', label_en:'Problem Detail', label_es: 'Detalle del Problema', sort:false, filter:true}
, {name: 'spec_rule_with_detail', label_en:'Spec Rule', label_es: 'Especificación', sort:false, filter:true}
];

export const sampleAudit_fieldsToRetrieve='';
export const sampleAudit_listToDisplay=[
   {name:'audit_id', label_en:'ID', label_es:'ID'}
  ,{name:'action_name', label_en:'Action', label_es:'Acción'}
  ,{name:'fields_updated', label_en:'Fields Updated', label_es:'Campos Modificados'}
  ,{name:'reviewed', label_en:'Reviewed', label_es:'Revisado'}
  ,{name:'reviewed_on', label_en:'Revision Date', label_es:'Fecha Revisión'}
  ];
export const sampleAudit_fieldToSort='test_id desc';
export const sampleAudit_buttons=[
  {
      "name": "signSampleAudit",
      "label_en": "Sign", "label_es": "Firmar",
      "type": "button",
      "read_only": false,
      "confirmuser_required": false,
  },    
];
export const productionLot_FieldToRetrieve='sample_id|current_stage|status|status_previous|sampling_comment|sample_config_code|program_name|location_name|spec_code|spec_variation_name';
export const productionLot_FieldToDisplay=[
    {name: 'lot_name', label_en:'Name', label_es: 'Nombre', width:'20px', sort:false, filter:true}
  , {name: 'created_on', label_en:'Created On', label_es: 'F. Creación', width:'12px', sort:true, filter:false}
  , {name: 'created_by', label_en:'Created By', label_es: 'Creador', width:'20px', sort:false, filter:true}
  , {name: 'closed_on', label_en:'Closed On', label_es: 'F. Cierre', width:'12px', sort:true, filter:false}
  , {name: 'closed_by', label_en:'Closed By', label_es: 'Cerrado Por', width:'20px', sort:false, filter:true}
]
export const productionLot_WhereFieldsName='current_stage|sample_config_code';
export const productionLot_WhereFieldsValue='MicroorganismIdentification|'+personal_smp_template;
export const productionLot_FieldToSort='sample_id desc';
export const productionLot_buttons=[          
  {
    "name": "EM_NEW_PRODUCTION_LOT",
    "label_en": "New", "label_es": "Nuevo",
    "type": "icon-button",
    "icon_name": "newspaper-plus",
    "read_only": false,
  }, 
  {
    "name": "EM_DEACTIVATE_PRODUCTION_LOT",
    "label_en": "Deactivate", "label_es": "Desactivar",
    "type": "icon-button",
    "icon_name": "alarm-off",
    "read_only": false,
  }, 
  {
    "name": "EM_ACTIVATE_PRODUCTION_LOT",
    "label_en": "Deactivate", "label_es": "Desactivar",
    "type": "icon-button",
    "icon_name": "alarm-plus",
    "read_only": false,
  }, 
];
export const browserSampleFieldToRetrieve='ALL';
export const browserSampleFieldsToDisplay='current_stage|program_name|location_name|product_lot|shift';

export const browserIncubatorFieldToRetrieve='current_stage';
export const browserIncubatorFieldsToDisplay='ALL';
export const browserIncubator_buttons=[          
  {
    "name": "EM_INCUBATION_ADD_TEMP_READING",
    "label_en": "New Temp Reading", "label_es": "Nueva lectura de Temperatura",
    "type": "icon-button",
    "icon_name": "icons:add-box",
    "read_only": false,
  }
];
export const browserBatchFieldToRetrieve='ALL';
export const browserBatchFieldsToDisplay='name|active|completed|incubation_incubator|incubation_start|incubation_end';


export const browserHome_defaultTab = "sample";
export const browserMain_programSelection=
[
    {                    
      "name": "programsList",
      "label_en": "Programs", "label_es": "Programas",
      "type": "list",
      "value": "",
      "read_only": false,
      "items" : [{
          "keyName":"",                        
          "keyValue_en":"", "keyValue_es":""              
      }]
    },
]
export const em_browser_tabs=[
  {procedure: schema_name
    ,tabConfirmUserRequired: false
    ,tabEsignRequired: false
    ,tabLabel_en: "Sample"
    ,tabLabel_es: "Muestra"
    ,tabName: schema_name+"-br-sample"  
    ,tabIndex:1
  } ,
  {procedure: schema_name
    ,tabConfirmUserRequired: false
    ,tabEsignRequired: false
    ,tabLabel_en: "Incubator"
    ,tabLabel_es: "Incubadora"
    ,tabName: schema_name+"-br-incubator"  
    ,tabIndex:1
  } ,
  {procedure: schema_name
    ,tabConfirmUserRequired: false
    ,tabEsignRequired: false
    ,tabLabel_en: "Batch"
    ,tabLabel_es: "Tanda"
    ,tabName: schema_name+"-br-batch"  
    ,tabIndex:1
  } ,    
]
