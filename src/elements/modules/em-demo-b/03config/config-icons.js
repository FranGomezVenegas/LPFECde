export const sampleStatusIconsUrl='./images/sampleStatus/';

export const auditDrillDownIcon=sampleStatusIconsUrl+'sampleUnreceived.png';

export const sampleStatusUNDEFINED='';
export const sampleStatusLOGGED='sampleUnreceived.png';
export const sampleStatusRECEIVED='sampleInProgress.png';
export const sampleStatusINCOMPLETE='sampleInProgress.png';
export const sampleStatusCOMPLETE='sampleComplete.png';
export const sampleStatusCANCELED='sampleCanceled.png';
export const sampleStatusREVIEWED='sampleReviewed.png';

export const sampleAnalysisStatusUNDEFINED='sampleUnreceived.png';
export const sampleAnalysisStatusLOGGED='sampleUnreceived.png';

export const sampleAnalysisResultStatusUNDEFINED='sampleUnreceived.png';
export const sampleAnalysisResultStatusLOGGED='sampleUnreceived.png';

export const sampleAnalysisResultSpecIN='sampleUnreceived.png';

export const SampleIcons = (superClass) => class extends superClass {
    getSampleStatusIcon(fldValue){
        switch(fldValue){
            case 'LOGGED':
                return sampleStatusIconsUrl+sampleStatusLOGGED;   
            case 'RECEIVED':
                    return sampleStatusIconsUrl+sampleStatusRECEIVED; 
            case 'INCOMPLETE':
                return sampleStatusIconsUrl+sampleStatusINCOMPLETE;                           
            case 'COMPLETE':
                return sampleStatusIconsUrl+sampleStatusCOMPLETE; 
            case 'REVIEWED':
                    return sampleStatusIconsUrl+sampleStatusREVIEWED;                 
            case 'CANCELED':
                    return sampleStatusIconsUrl+sampleStatusCANCELED;                         
            default: 
                return sampleStatusIconsUrl+sampleStatusUNDEFINED; 
        }
        //console.log('config-icons', 'getSampleStatusIcon', 'fldName', fldName);        
    }

    getSampleAnalysisStatusIcon(fldValue){
        switch(fldValue){
/*            case 'LOGGED':
                return sampleStatusIconsUrl+sampleAnalysisStatusLOGGED;   
            case 'RECEIVED':
                    return sampleStatusIconsUrl+sampleAnalysisStatusRECEIVED; 
            case 'INCOMPLETE':
                return sampleStatusIconsUrl+sampleAnalysisStatusINCOMPLETE;                           
            case 'COMPLETE':
                return sampleStatusIconsUrl+sampleAnalysisStatusCOMPLETE; 
            case 'REVIEWED':
                    return sampleStatusIconsUrl+sampleAnalysisStatusREVIEWED;                 
            case 'CANCELED':
                    return sampleStatusIconsUrl+sampleAnalysisStatusCANCELED;  */                       
            default: 
                return sampleStatusIconsUrl+sampleAnalysisStatusUNDEFINED; 
        }
        //console.log('config-icons', 'getSampleStatusIcon', 'fldName', fldName);        
    }

    getSampleAnalysisResultStatusIcon(fldValue){
        switch(fldValue){
/*            case 'LOGGED':
                return sampleStatusIconsUrl+sampleAnalysisResultStatusLOGGED;   
            case 'RECEIVED':
                    return sampleStatusIconsUrl+sampleAnalysisResultStatusRECEIVED; 
            case 'INCOMPLETE':
                return sampleStatusIconsUrl+sampleAnalysisResultStatusINCOMPLETE;                           
            case 'COMPLETE':
                return sampleStatusIconsUrl+sampleAnalysisResultStatusCOMPLETE; 
            case 'REVIEWED':
                    return sampleStatusIconsUrl+sampleAnalysisResultStatusREVIEWED;                 
            case 'CANCELED':
                    return sampleStatusIconsUrl+sampleAnalysisResultStatusCANCELED;  */                       
            default: 
                return sampleStatusIconsUrl+sampleAnalysisResultStatusUNDEFINED; 
        }
        //console.log('config-icons', 'getSampleStatusIcon', 'fldName', fldName);        
    }

    getSampleCustodianStatusIcon(fldValue){
        switch(fldValue){
/*            case 'LOGGED':
                return sampleStatusIconsUrl+sampleAnalysisResultStatusLOGGED;   
            case 'RECEIVED':
                    return sampleStatusIconsUrl+sampleAnalysisResultStatusRECEIVED; 
            case 'INCOMPLETE':
                return sampleStatusIconsUrl+sampleAnalysisResultStatusINCOMPLETE;                           
            case 'COMPLETE':
                return sampleStatusIconsUrl+sampleAnalysisResultStatusCOMPLETE; 
            case 'REVIEWED':
                    return sampleStatusIconsUrl+sampleAnalysisResultStatusREVIEWED;                 
            case 'CANCELED':
                    return sampleStatusIconsUrl+sampleAnalysisResultStatusCANCELED;  */                       
            default: 
                return sampleStatusIconsUrl+sampleAnalysisResultStatusUNDEFINED; 
        }
        //console.log('config-icons', 'getSampleStatusIcon', 'fldName', fldName);        
    }
        
    
}