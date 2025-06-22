"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveInterfaceFile = saveInterfaceFile;
const fs = __importStar(require("fs/promises"));
const DEFAULT_FILE_NAME = 'interface.json';
const DEFAULT_PATH = './interfaces/';
/**
 *  function to save the interface file.
 * @param fileContent
 * @param params
 * @param params.fileName - The name of the file to save. Defaults to 'interface.json'.
 * @param params.filePath - The path where the file will be saved. Defaults to './interfaces/'.
 */
function saveInterfaceFile(fileContent, params) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const fileName = (_a = params === null || params === void 0 ? void 0 : params.fileName) !== null && _a !== void 0 ? _a : DEFAULT_FILE_NAME;
        const filePath = (_b = params === null || params === void 0 ? void 0 : params.filePath) !== null && _b !== void 0 ? _b : DEFAULT_PATH;
        const fullPath = `${filePath}${fileName}`;
        try {
            yield fs.mkdir(filePath, { recursive: true }); // Ensure the directory exists
            yield fs.writeFile(fullPath, fileContent, 'utf8'); // Write the file content
        }
        catch (error) {
            console.error(`Error creating directory ${filePath}:`, error);
            throw error;
        }
    });
}
