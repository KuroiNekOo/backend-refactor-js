
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

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  password: 'password',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CompanyScalarFieldEnum = {
  id: 'id',
  name: 'name',
  level: 'level',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserCompanyScalarFieldEnum = {
  userId: 'userId',
  companyId: 'companyId',
  status: 'status',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BankAccountScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  companyId: 'companyId',
  ownerType: 'ownerType',
  bankAccountTypeId: 'bankAccountTypeId',
  isDefault: 'isDefault',
  balance: 'balance',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BankAccountTypeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  limit: 'limit',
  interestRate: 'interestRate'
};

exports.Prisma.TransactionScalarFieldEnum = {
  id: 'id',
  senderId: 'senderId',
  receiverId: 'receiverId',
  amount: 'amount',
  status: 'status',
  inProgress: 'inProgress',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RoleScalarFieldEnum = {
  id: 'id',
  name: 'name',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserRoleScalarFieldEnum = {
  userId: 'userId',
  roleId: 'roleId',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PermissionScalarFieldEnum = {
  id: 'id',
  name: 'name',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserPermissionScalarFieldEnum = {
  userId: 'userId',
  permissionId: 'permissionId',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RolePermissionScalarFieldEnum = {
  roleId: 'roleId',
  permissionId: 'permissionId',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.DriveScalarFieldEnum = {
  id: 'id',
  name: 'name',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.DrivePurchaseScalarFieldEnum = {
  id: 'id',
  driveId: 'driveId',
  userId: 'userId',
  content: 'content',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.DrivePurchaseItemBlockScalarFieldEnum = {
  drivePurchaseId: 'drivePurchaseId',
  itemBlockId: 'itemBlockId',
  quantity: 'quantity',
  content: 'content',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ContainerScalarFieldEnum = {
  id: 'id',
  name: 'name',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ContainersContentScalarFieldEnum = {
  id: 'id',
  containerId: 'containerId',
  companyId: 'companyId',
  content: 'content',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ItemBlockScalarFieldEnum = {
  id: 'id',
  minecraftId: 'minecraftId',
  content: 'content',
  isInDrive: 'isInDrive',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MarketPriceScalarFieldEnum = {
  id: 'id',
  itemBlockId: 'itemBlockId',
  price: 'price',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MarketPriceHistoryScalarFieldEnum = {
  id: 'id',
  marketPriceId: 'marketPriceId',
  price: 'price',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SettingsPriceScalarFieldEnum = {
  id: 'id',
  value: 'value',
  description: 'description',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ContainerHistoryScalarFieldEnum = {
  id: 'id',
  containerId: 'containerId',
  companyId: 'companyId',
  content: 'content',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ChunkScalarFieldEnum = {
  id: 'id',
  x: 'x',
  z: 'z',
  xPrime: 'xPrime',
  zPrime: 'zPrime',
  height: 'height',
  depth: 'depth',
  worldId: 'worldId',
  defaultPrice: 'defaultPrice',
  status: 'status',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  endDate: 'endDate'
};

exports.Prisma.ChunkSoldScalarFieldEnum = {
  chunkId: 'chunkId',
  companyId: 'companyId',
  price: 'price',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.WorldScalarFieldEnum = {
  id: 'id',
  name: 'name',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.UserOrderByRelevanceFieldEnum = {
  id: 'id',
  name: 'name',
  password: 'password'
};

exports.Prisma.CompanyOrderByRelevanceFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.UserCompanyOrderByRelevanceFieldEnum = {
  userId: 'userId',
  companyId: 'companyId'
};

exports.Prisma.BankAccountOrderByRelevanceFieldEnum = {
  id: 'id',
  userId: 'userId',
  companyId: 'companyId'
};

exports.Prisma.TransactionOrderByRelevanceFieldEnum = {
  senderId: 'senderId',
  receiverId: 'receiverId'
};

exports.Prisma.RoleOrderByRelevanceFieldEnum = {
  name: 'name'
};

exports.Prisma.UserRoleOrderByRelevanceFieldEnum = {
  userId: 'userId'
};

exports.Prisma.PermissionOrderByRelevanceFieldEnum = {
  name: 'name'
};

exports.Prisma.UserPermissionOrderByRelevanceFieldEnum = {
  userId: 'userId'
};

exports.Prisma.DriveOrderByRelevanceFieldEnum = {
  name: 'name'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.DrivePurchaseOrderByRelevanceFieldEnum = {
  userId: 'userId'
};

exports.Prisma.ContainerOrderByRelevanceFieldEnum = {
  name: 'name'
};

exports.Prisma.ContainersContentOrderByRelevanceFieldEnum = {
  companyId: 'companyId'
};

exports.Prisma.ItemBlockOrderByRelevanceFieldEnum = {
  minecraftId: 'minecraftId'
};

exports.Prisma.SettingsPriceOrderByRelevanceFieldEnum = {
  id: 'id',
  description: 'description'
};

exports.Prisma.ContainerHistoryOrderByRelevanceFieldEnum = {
  companyId: 'companyId'
};

exports.Prisma.ChunkSoldOrderByRelevanceFieldEnum = {
  companyId: 'companyId'
};

exports.Prisma.WorldOrderByRelevanceFieldEnum = {
  name: 'name'
};
exports.UserCompanyStatus = exports.$Enums.UserCompanyStatus = {
  OWNER: 'OWNER',
  EMPLOYEE: 'EMPLOYEE'
};

exports.BankAccountOwnerTypes = exports.$Enums.BankAccountOwnerTypes = {
  USER: 'USER',
  COMPANY: 'COMPANY'
};

exports.BankAccountTypes = exports.$Enums.BankAccountTypes = {
  STANDARD: 'STANDARD',
  PREMIUM: 'PREMIUM'
};

exports.TransactionStatus = exports.$Enums.TransactionStatus = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
};

exports.ChunkStatus = exports.$Enums.ChunkStatus = {
  SOLD: 'SOLD',
  ON_SALE: 'ON_SALE',
  EXPIRED: 'EXPIRED'
};

exports.Prisma.ModelName = {
  User: 'User',
  Company: 'Company',
  UserCompany: 'UserCompany',
  BankAccount: 'BankAccount',
  BankAccountType: 'BankAccountType',
  Transaction: 'Transaction',
  Role: 'Role',
  UserRole: 'UserRole',
  Permission: 'Permission',
  UserPermission: 'UserPermission',
  RolePermission: 'RolePermission',
  Drive: 'Drive',
  DrivePurchase: 'DrivePurchase',
  DrivePurchaseItemBlock: 'DrivePurchaseItemBlock',
  Container: 'Container',
  ContainersContent: 'ContainersContent',
  ItemBlock: 'ItemBlock',
  MarketPrice: 'MarketPrice',
  MarketPriceHistory: 'MarketPriceHistory',
  SettingsPrice: 'SettingsPrice',
  ContainerHistory: 'ContainerHistory',
  Chunk: 'Chunk',
  ChunkSold: 'ChunkSold',
  World: 'World'
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
