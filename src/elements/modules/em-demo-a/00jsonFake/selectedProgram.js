export const selectedProgram=
    {                    
      "name": "Programa1",
      "type": "tree-list",
      "label_en": "Program1", "label_es": "Programa1",
      "map_image": "./images/clean-room-example.png",
      "sample_config_code": "program_smp_template", "sample_config_code_version": 1,
      "sample_points" : [
        {
           "name":"SP1"                        
          ,"description_en":"SP1 English"
          ,"description_es":"SP Spanish"  
          ,"map_icon": "./images/app-login/labplanet.png"            
          ,"map_icon_h": "30", "map_icon_w": "34"
          ,"map_icon_top": "470px" ,"map_icon_left": "150px"
          , card_info:[
            {"name":"program", "value": "Programa1", "label_en": "Program:", 
              "label_es": "Programa:", "type": "text", "password": "false"}
          , {"name":"sampling_point", "value": "SP1", "label_en": "Sampling Point:", "label_es": "Punto de muestreo:", "type": "text", "password": "false"}
          , {"name":"samples_in_progress", "value": "5", "label_en": "Sampling in progress:", "label_es": "Puntos en proceso:", "type": "text", "password": "false"}
          , {"name":"total_samples", "value": "25", "label_en": "Total Samples:", "label_es": "Muestras Totales:", "type": "text", "password": "false"}
          , {"name":"total_samples2", "value": "252", "label_en": "Total Samples2:", "label_es": "Muestras Totales2:", "type": "text", "password": "false"}
          ]
        }
        ,{
          "name":"SP2"                        
         ,"description_en":"SP2 English"
         ,"description_es":"SP Spanish"  
         ,"map_icon": "./images/pdf-icon.png"            
         ,"map_icon_h": "30", "map_icon_w": "30"
         ,"map_icon_top": "270px" ,"map_icon_left": "150px"
         , card_info:[
          {"name":"program", "value": "Programa1", "label_en": "Program:", "label_es": "Programa:", "type": "text", "password": "false"}
        , {"name":"sampling_point", "value": "SP2", "label_en": "Sampling Point:", "label_es": "Punto de muestreo:", "type": "text", "password": "false"}
        , {"name":"samples_in_progress", "value": "10", "label_en": "Sampling Point:", "label_es": "Punto de muestreo:", "type": "text", "password": "false"}
        , {"name":"total_samples", "value": "100", "label_en": "Total Samples:", "label_es": "Muestras Totales:", "type": "text", "password": "false"}
        ]

       }

        
      ]
    };