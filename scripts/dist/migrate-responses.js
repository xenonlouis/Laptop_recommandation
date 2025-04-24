"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var rest_1 = require("@octokit/rest");
var prisma_1 = require("../lib/generated/prisma");
var dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
var prisma = new prisma_1.PrismaClient();
// --- GitHub Configuration --- 
var GITHUB_TOKEN = process.env.GITHUB_TOKEN;
var REPO_OWNER = 'xenonlouis'; // Replace if needed
var REPO_NAME = 'Laptop_Survey'; // Replace if needed
var FILE_PATH = 'data/survey-responses.json'; // Path to the JSON file in your repo
// ---------------------------
function migrate() {
    return __awaiter(this, void 0, void 0, function () {
        var octokit, githubResponses, fileData, content, error_1, dataToCreate, result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Starting migration from GitHub JSON to Database...');
                    if (!GITHUB_TOKEN) {
                        console.error('Error: GITHUB_TOKEN environment variable is not set.');
                        process.exit(1);
                    }
                    octokit = new rest_1.Octokit({ auth: GITHUB_TOKEN });
                    githubResponses = [];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    console.log("Fetching ".concat(FILE_PATH, " from ").concat(REPO_OWNER, "/").concat(REPO_NAME, "..."));
                    return [4 /*yield*/, octokit.repos.getContent({
                            owner: REPO_OWNER,
                            repo: REPO_NAME,
                            path: FILE_PATH,
                        })];
                case 2:
                    fileData = (_a.sent()).data;
                    if ('content' in fileData) {
                        content = Buffer.from(fileData.content, 'base64').toString('utf-8');
                        githubResponses = JSON.parse(content);
                        console.log("Successfully fetched and parsed ".concat(githubResponses.length, " responses from GitHub."));
                    }
                    else {
                        console.error('Error: Could not retrieve file content from GitHub response.');
                        process.exit(1);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    if (error_1.status === 404) {
                        console.log('GitHub file not found. No data to migrate.');
                        process.exit(0);
                    }
                    console.error('Error fetching data from GitHub:', error_1.message);
                    process.exit(1);
                    return [3 /*break*/, 4];
                case 4:
                    if (githubResponses.length === 0) {
                        console.log('No responses found in GitHub file. Migration finished.');
                        process.exit(0);
                    }
                    dataToCreate = githubResponses.map(function (resp) {
                        var _a, _b, _c, _d;
                        // Ensure defaults for potentially missing optional fields or arrays
                        return {
                            // Explicitly map fields from JSON to Schema, handling potential null/undefined
                            name: resp.name || '',
                            email: (resp.email || '').toLowerCase(), // Ensure lowercase for unique constraint
                            position: resp.position || '',
                            primaryRole: resp.primaryRole || null,
                            developmentPercentage: (_a = resp.developmentPercentage) !== null && _a !== void 0 ? _a : null, // Use nullish coalescing
                            primaryOS: resp.primaryOS || null,
                            experienceWithOtherOS: resp.experienceWithOtherOS || [],
                            preferredOS: resp.preferredOS || null,
                            osPreferenceReason: resp.osPreferenceReason || null,
                            programmingLanguages: resp.programmingLanguages || [],
                            otherLanguages: resp.otherLanguages || null,
                            developmentType: resp.developmentType || [],
                            otherDevelopmentType: resp.otherDevelopmentType || null,
                            resourceIntensiveEnvironments: resp.resourceIntensiveEnvironments || false,
                            multipleEnvironments: resp.multipleEnvironments || false,
                            terminalImportance: (_b = resp.terminalImportance) !== null && _b !== void 0 ? _b : null,
                            clientPresentationFrequency: resp.clientPresentationFrequency || null,
                            largeDataModels: resp.largeDataModels || false,
                            specializedSoftware: resp.specializedSoftware || false,
                            specializedSoftwareList: resp.specializedSoftwareList || null,
                            batteryLifeImportance: (_c = resp.batteryLifeImportance) !== null && _c !== void 0 ? _c : null,
                            remoteWorkFrequency: resp.remoteWorkFrequency || null,
                            selectedTools: resp.selectedTools || [],
                            otherTools: resp.otherTools || null,
                            simultaneousApplications: resp.simultaneousApplications || null,
                            multipleWorkspaces: resp.multipleWorkspaces || false,
                            typicalBrowserTabs: resp.typicalBrowserTabs || null,
                            externalDisplays: resp.externalDisplays || null,
                            resourceIntensiveApps: resp.resourceIntensiveApps || false,
                            resourceIntensiveAppsList: resp.resourceIntensiveAppsList || null,
                            matchedToolkitId: resp.matchedToolkitId || null,
                            matchScore: (_d = resp.matchScore) !== null && _d !== void 0 ? _d : null,
                            // NOTE: We do NOT include id or submittedAt. Prisma handles those.
                            // NOTE: We explicitly DO NOT include fields like 'department' if they are not in the schema
                        };
                        // Filter out any records with missing essential data like email if necessary
                    }).filter(function (item) { return item.email; });
                    console.log("Prepared ".concat(dataToCreate.length, " valid records for database insertion."));
                    if (dataToCreate.length === 0) {
                        console.log('No valid records to insert after transformation. Migration finished.');
                        process.exit(0);
                    }
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, 8, 10]);
                    console.log('Attempting to insert records into the database...');
                    return [4 /*yield*/, prisma.surveyResponse.createMany({
                            data: dataToCreate,
                            skipDuplicates: true, // Skip if a response with the same unique email already exists
                        })];
                case 6:
                    result = _a.sent();
                    console.log("Successfully inserted ".concat(result.count, " new records into the database."));
                    if (result.count < dataToCreate.length) {
                        console.log("".concat(dataToCreate.length - result.count, " records were skipped (likely duplicates)."));
                    }
                    return [3 /*break*/, 10];
                case 7:
                    error_2 = _a.sent();
                    console.error('Error inserting data into database:', error_2);
                    process.exit(1);
                    return [3 /*break*/, 10];
                case 8: return [4 /*yield*/, prisma.$disconnect()];
                case 9:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 10:
                    console.log('Migration completed successfully!');
                    return [2 /*return*/];
            }
        });
    });
}
// Call the migrate function and handle potential errors
migrate().catch(function (e) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.error("Migration script failed:", e);
                return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                process.exit(1);
                return [2 /*return*/];
        }
    });
}); });
