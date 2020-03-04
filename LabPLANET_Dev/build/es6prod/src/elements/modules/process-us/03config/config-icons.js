define(["exports"],function(_exports){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.SampleIcons=_exports.sampleAnalysisResultStatusLOGGED=_exports.sampleAnalysisResultStatusUNDEFINED=_exports.sampleAnalysisStatusLOGGED=_exports.sampleAnalysisStatusUNDEFINED=_exports.sampleStatusREVIEWED=_exports.sampleStatusCANCELED=_exports.sampleStatusCOMPLETE=_exports.sampleStatusINCOMPLETE=_exports.sampleStatusRECEIVED=_exports.sampleStatusLOGGED=_exports.sampleStatusUNDEFINED=_exports.sampleStatusIconsUrl=_exports.auditDrillDownIcon=void 0;const auditDrillDownIcon="sampleUnreceived.png";_exports.auditDrillDownIcon=auditDrillDownIcon;const sampleStatusIconsUrl="./images/sampleStatus/";_exports.sampleStatusIconsUrl=sampleStatusIconsUrl;const sampleStatusUNDEFINED="";_exports.sampleStatusUNDEFINED=sampleStatusUNDEFINED;const sampleStatusLOGGED="sampleUnreceived.png";_exports.sampleStatusLOGGED=sampleStatusLOGGED;const sampleStatusRECEIVED="sampleInProgress.png";_exports.sampleStatusRECEIVED=sampleStatusRECEIVED;const sampleStatusINCOMPLETE="sampleInProgress.png";_exports.sampleStatusINCOMPLETE=sampleStatusINCOMPLETE;const sampleStatusCOMPLETE="sampleComplete.png";_exports.sampleStatusCOMPLETE=sampleStatusCOMPLETE;const sampleStatusCANCELED="sampleCanceled.png";_exports.sampleStatusCANCELED=sampleStatusCANCELED;const sampleStatusREVIEWED="sampleReviewed.png";_exports.sampleStatusREVIEWED=sampleStatusREVIEWED;const sampleAnalysisStatusUNDEFINED="sampleUnreceived.png";_exports.sampleAnalysisStatusUNDEFINED=sampleAnalysisStatusUNDEFINED;const sampleAnalysisStatusLOGGED="sampleUnreceived.png";_exports.sampleAnalysisStatusLOGGED=sampleAnalysisStatusLOGGED;const sampleAnalysisResultStatusUNDEFINED="sampleUnreceived.png";_exports.sampleAnalysisResultStatusUNDEFINED=sampleAnalysisResultStatusUNDEFINED;const sampleAnalysisResultStatusLOGGED="sampleUnreceived.png";_exports.sampleAnalysisResultStatusLOGGED=sampleAnalysisResultStatusLOGGED;const SampleIcons=superClass=>class extends superClass{getSampleStatusIcon(fldValue){switch(fldValue){case"LOGGED":return sampleStatusIconsUrl+sampleStatusLOGGED;case"RECEIVED":return sampleStatusIconsUrl+sampleStatusRECEIVED;case"INCOMPLETE":return sampleStatusIconsUrl+sampleStatusINCOMPLETE;case"COMPLETE":return sampleStatusIconsUrl+sampleStatusCOMPLETE;case"REVIEWED":return sampleStatusIconsUrl+sampleStatusREVIEWED;case"CANCELED":return sampleStatusIconsUrl+sampleStatusCANCELED;default:return sampleStatusIconsUrl+sampleStatusUNDEFINED;}//console.log('config-icons', 'getSampleStatusIcon', 'fldName', fldName);        
}getSampleAnalysisStatusIcon(fldValue){switch(fldValue){/*            case 'LOGGED':
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
                    return sampleStatusIconsUrl+sampleAnalysisStatusCANCELED;  */default:return sampleStatusIconsUrl+sampleAnalysisStatusUNDEFINED;}//console.log('config-icons', 'getSampleStatusIcon', 'fldName', fldName);        
}getSampleAnalysisResultStatusIcon(fldValue){switch(fldValue){/*            case 'LOGGED':
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
                    return sampleStatusIconsUrl+sampleAnalysisResultStatusCANCELED;  */default:return sampleStatusIconsUrl+sampleAnalysisResultStatusUNDEFINED;}//console.log('config-icons', 'getSampleStatusIcon', 'fldName', fldName);        
}getSampleCustodianStatusIcon(fldValue){switch(fldValue){/*            case 'LOGGED':
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
                    return sampleStatusIconsUrl+sampleAnalysisResultStatusCANCELED;  */default:return sampleStatusIconsUrl+sampleAnalysisResultStatusUNDEFINED;}//console.log('config-icons', 'getSampleStatusIcon', 'fldName', fldName);        
}};_exports.SampleIcons=SampleIcons});