
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.PersonScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  department: 'department',
  position: 'position',
  pcReference: 'pcReference',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.LaptopScalarFieldEnum = {
  id: 'id',
  brand: 'brand',
  model: 'model',
  price: 'price',
  priceType: 'priceType',
  processor: 'processor',
  ram: 'ram',
  storage: 'storage',
  batteryLife: 'batteryLife',
  performanceScore: 'performanceScore',
  notes: 'notes',
  images: 'images',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.LaptopProfileScalarFieldEnum = {
  laptopId: 'laptopId',
  profile: 'profile'
};

exports.Prisma.LaptopOSScalarFieldEnum = {
  laptopId: 'laptopId',
  os: 'os'
};

exports.Prisma.AccessoryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  type: 'type',
  brand: 'brand',
  price: 'price',
  priceType: 'priceType',
  image: 'image',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PackageScalarFieldEnum = {
  id: 'id',
  name: 'name',
  laptopId: 'laptopId',
  status: 'status',
  priceType: 'priceType',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  assignedTo: 'assignedTo'
};

exports.Prisma.PackageAccessoryScalarFieldEnum = {
  packageId: 'packageId',
  accessoryId: 'accessoryId'
};

exports.Prisma.PackageAssignmentScalarFieldEnum = {
  id: 'id',
  packageId: 'packageId',
  personId: 'personId',
  pcReference: 'pcReference',
  assignedAt: 'assignedAt'
};

exports.Prisma.ToolScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  category: 'category',
  downloadUrl: 'downloadUrl',
  installationNotes: 'installationNotes',
  isRequired: 'isRequired',
  icon: 'icon',
  popularity: 'popularity',
  usageCount: 'usageCount',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ToolAlternativeScalarFieldEnum = {
  toolId: 'toolId',
  alternative: 'alternative'
};

exports.Prisma.ToolkitScalarFieldEnum = {
  id: 'id',
  profileName: 'profileName',
  description: 'description',
  operatingSystem: 'operatingSystem',
  icon: 'icon',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ToolkitToolScalarFieldEnum = {
  toolkitId: 'toolkitId',
  toolId: 'toolId'
};

exports.Prisma.SurveyResponseScalarFieldEnum = {
  id: 'id',
  submittedAt: 'submittedAt',
  name: 'name',
  email: 'email',
  position: 'position',
  primaryRole: 'primaryRole',
  developmentPercentage: 'developmentPercentage',
  primaryOS: 'primaryOS',
  experienceWithOtherOS: 'experienceWithOtherOS',
  preferredOS: 'preferredOS',
  osPreferenceReason: 'osPreferenceReason',
  programmingLanguages: 'programmingLanguages',
  otherLanguages: 'otherLanguages',
  developmentType: 'developmentType',
  otherDevelopmentType: 'otherDevelopmentType',
  resourceIntensiveEnvironments: 'resourceIntensiveEnvironments',
  multipleEnvironments: 'multipleEnvironments',
  terminalImportance: 'terminalImportance',
  clientPresentationFrequency: 'clientPresentationFrequency',
  largeDataModels: 'largeDataModels',
  specializedSoftware: 'specializedSoftware',
  specializedSoftwareList: 'specializedSoftwareList',
  batteryLifeImportance: 'batteryLifeImportance',
  remoteWorkFrequency: 'remoteWorkFrequency',
  selectedTools: 'selectedTools',
  otherTools: 'otherTools',
  simultaneousApplications: 'simultaneousApplications',
  multipleWorkspaces: 'multipleWorkspaces',
  typicalBrowserTabs: 'typicalBrowserTabs',
  externalDisplays: 'externalDisplays',
  resourceIntensiveApps: 'resourceIntensiveApps',
  resourceIntensiveAppsList: 'resourceIntensiveAppsList',
  matchedToolkitId: 'matchedToolkitId',
  matchScore: 'matchScore'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  Person: 'Person',
  Laptop: 'Laptop',
  LaptopProfile: 'LaptopProfile',
  LaptopOS: 'LaptopOS',
  Accessory: 'Accessory',
  Package: 'Package',
  PackageAccessory: 'PackageAccessory',
  PackageAssignment: 'PackageAssignment',
  Tool: 'Tool',
  ToolAlternative: 'ToolAlternative',
  Toolkit: 'Toolkit',
  ToolkitTool: 'ToolkitTool',
  SurveyResponse: 'SurveyResponse'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
