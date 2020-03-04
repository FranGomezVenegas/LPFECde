define(["exports"],function(_exports){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.ApiMessage=void 0;/**
 * @mixinFunction
 * @polymer
 */const ApiMessage=superClass=>class extends superClass{errorMessage(errorStructure){return errorStructure.error_code}};_exports.ApiMessage=ApiMessage});