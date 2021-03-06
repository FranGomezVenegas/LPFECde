export const appProcedureListFake={"procedures":[
{"label_es":"Proceso para USA","name":"process-us","schemaPrefix":"process-us",
    "definition":[
        {"lp_frontend_page_name": "home", "mode":"readonly","label_es":"Proceso EEUU, Inicio","sop":null,"sops_passed":true,"name":"Home","branch_level":"level1","sops":{"sop_total":0,"sop_total_completed":0,"sop_total_not_completed":0,"sop_list":"NO_SOPS"},"label_en":"Process US-Home","type":"tree-list","esign_required":null},
        {"lp_frontend_page_name": "sample-login", "mode":"edit","label_es":"Registrar Muestras",
            //"sop":"LOG SAMPLE|RECEIVING SAMPLES","sops_passed":false,"name":"logSample","branch_level":"level2",
            "sops":{"sops_passed":false, "sop_total":2,"sop_total_completed":1,"sop_total_not_completed":1,
                "sop_list":[{"sop_name":"LOG SAMPLE","sop_link":"https://www.azre.gov/Aud/Documents/Sample_Log.pdf", "sop_completed":false, "status": "NOT PASS"},
                            {"sop_name":"RECEIVING SAMPLES","sop_link": "https://training.gov.au/TrainingComponentFiles/MSL09/MSL953001A_R1.pdf","sop_completed":true, "status": "PASS"}]
            },
            "label_en":"Log Samples","type":"tree-list","esign_required":true},
        {"lp_frontend_page_name": "sample-reception", "mode":"edit","label_es":"Recepcion de Muestras","sop":"RECEIVING SAMPLES","sops_passed":true,"name":"receiveSample","branch_level":"level2","sops":{"sop_total":1,"sop_total_completed":1,"sop_total_not_completed":0,"sop_list":{"1":{"sop_name":"RECEIVING SAMPLES","sop_completed":true}}},"label_en":"Receive Sample","type":"tree-list","esign_required":null},
        {"lp_frontend_page_name": "sample-results", "mode":"edit","label_es":"Entrar Resultados",
            //"sop":null,"sops_passed":true,"name":"sampleResults","branch_level":"level2",
            "sops":{"sops_passed":true, "sop_total":1,"sop_total_completed":1,"sop_total_not_completed":0,
            "sop_list":[{"sop_name":"LOG SAMPLE","sop_link":"https://www.azre.gov/Aud/Documents/Sample_Log.pdf", "sop_completed":true, "status": "PASS"}]},
            "label_en":"Enter Results","type":"tree-list","esign_required":null},
        {"lp_frontend_page_name": "sample-revision", "mode":"edit","label_es":"Revisar Muestras","sop":null,"sops_passed":true,"name":"sampleRevision","branch_level":"level2","sops":{"sop_total":0,"sop_total_completed":0,"sop_total_not_completed":0,"sop_list":"NO_SOPS"},"label_en":"Revision","type":"tree-list","esign_required":null},
        {"lp_frontend_page_name": "sample-custodian", "mode":"edit","label_es":"Custodia","sop":null,"sops_passed":true,"name":"sampleCustodian","branch_level":"level2","sops":{"sop_total":0,"sop_total_completed":0,"sop_total_not_completed":0,"sop_list":"NO_SOPS"},"label_en":"Custodian","type":"tree-list","esign_required":null}],"label_en":"Process for US","version":1},{"label_es":"Proceso UE","name":"process-eu","schemaPrefix":"process-eu","label_en":"Process EU","version":1},
{"label_es":"DemoA EM","name":"em-demo-a","schemaPrefix":"em-demo-a","label_en":"DemoA EM","SopCertification":"Disabled","version":1,
    "definition":[
        {"lp_frontend_page_name": "home", "mode":"readonly","label_es":"Demo Monitoreo Inicio","sop":null,"sops_passed":true,"name":"Home","branch_level":"level1","sops":{"sop_total":0,"sop_total_completed":0,"sop_total_not_completed":0,"sop_list":"NO_SOPS"},"label_en":"EM Demo Home","type":"tree-list","esign_required":false},        
        {"lp_frontend_page_name": "programs", "mode":"readonly","label_es":"Programas","sop":null,"sops_passed":true,"name":"Programs","branch_level":"level2","sops":{"sop_total":0,"sop_total_completed":0,"sop_total_not_completed":0,"sop_list":"NO_SOPS"},"label_en":"Programs","type":"tree-list","esign_required":false},
        {"lp_frontend_page_name": "sample-reception", "mode":"edit","label_es":"Recepcion de Muestras","sop":"RECEIVING SAMPLES","sops_passed":true,"name":"receiveSample","branch_level":"level2","sops":{"sop_total":1,"sop_total_completed":1,"sop_total_not_completed":0,"sop_list":{"1":{"sop_name":"RECEIVING SAMPLES","sop_completed":true}}},"label_en":"Receive Sample","type":"tree-list","esign_required":null},
        {"lp_frontend_page_name": "sample-reception222", "mode":"readonly","label_es":"Puntos","sop":null,"sops_passed":true,"name":"Progpoints","branch_level":"level2","sops":{"sop_total":0,"sop_total_completed":0,"sop_total_not_completed":0,"sop_list":"NO_SOPS"},"label_en":"Points","type":"tree-list","esign_required":false},
        {"lp_frontend_page_name": "results-calendar", "mode":"readonly","label_es":"Calendario Resultados","sop":null,"sops_passed":true,"name":"Resultscalendar","branch_level":"level2","sops":{"sop_total":0,"sop_total_completed":0,"sop_total_not_completed":0,"sop_list":"NO_SOPS"},"label_en":"resultsCalendar","type":"tree-list","esign_required":false}
    ]
}]};    



               