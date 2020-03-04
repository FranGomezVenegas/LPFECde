/**
 * @mixinFunction
 * @polymer
 */
export const ApiMessage = (superClass) => class extends superClass {

    errorMessage(errorStructure) {  
        return errorStructure.error_code;
    }
}