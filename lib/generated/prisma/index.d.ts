
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Person
 * 
 */
export type Person = $Result.DefaultSelection<Prisma.$PersonPayload>
/**
 * Model Laptop
 * 
 */
export type Laptop = $Result.DefaultSelection<Prisma.$LaptopPayload>
/**
 * Model LaptopProfile
 * 
 */
export type LaptopProfile = $Result.DefaultSelection<Prisma.$LaptopProfilePayload>
/**
 * Model LaptopOS
 * 
 */
export type LaptopOS = $Result.DefaultSelection<Prisma.$LaptopOSPayload>
/**
 * Model Accessory
 * 
 */
export type Accessory = $Result.DefaultSelection<Prisma.$AccessoryPayload>
/**
 * Model Package
 * 
 */
export type Package = $Result.DefaultSelection<Prisma.$PackagePayload>
/**
 * Model PackageAccessory
 * 
 */
export type PackageAccessory = $Result.DefaultSelection<Prisma.$PackageAccessoryPayload>
/**
 * Model PackageAssignment
 * 
 */
export type PackageAssignment = $Result.DefaultSelection<Prisma.$PackageAssignmentPayload>
/**
 * Model Tool
 * 
 */
export type Tool = $Result.DefaultSelection<Prisma.$ToolPayload>
/**
 * Model ToolAlternative
 * 
 */
export type ToolAlternative = $Result.DefaultSelection<Prisma.$ToolAlternativePayload>
/**
 * Model Toolkit
 * 
 */
export type Toolkit = $Result.DefaultSelection<Prisma.$ToolkitPayload>
/**
 * Model ToolkitTool
 * 
 */
export type ToolkitTool = $Result.DefaultSelection<Prisma.$ToolkitToolPayload>
/**
 * Model SurveyResponse
 * 
 */
export type SurveyResponse = $Result.DefaultSelection<Prisma.$SurveyResponsePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more People
 * const people = await prisma.person.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more People
   * const people = await prisma.person.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.person`: Exposes CRUD operations for the **Person** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more People
    * const people = await prisma.person.findMany()
    * ```
    */
  get person(): Prisma.PersonDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.laptop`: Exposes CRUD operations for the **Laptop** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Laptops
    * const laptops = await prisma.laptop.findMany()
    * ```
    */
  get laptop(): Prisma.LaptopDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.laptopProfile`: Exposes CRUD operations for the **LaptopProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LaptopProfiles
    * const laptopProfiles = await prisma.laptopProfile.findMany()
    * ```
    */
  get laptopProfile(): Prisma.LaptopProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.laptopOS`: Exposes CRUD operations for the **LaptopOS** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LaptopOS
    * const laptopOS = await prisma.laptopOS.findMany()
    * ```
    */
  get laptopOS(): Prisma.LaptopOSDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.accessory`: Exposes CRUD operations for the **Accessory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accessories
    * const accessories = await prisma.accessory.findMany()
    * ```
    */
  get accessory(): Prisma.AccessoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.package`: Exposes CRUD operations for the **Package** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Packages
    * const packages = await prisma.package.findMany()
    * ```
    */
  get package(): Prisma.PackageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.packageAccessory`: Exposes CRUD operations for the **PackageAccessory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PackageAccessories
    * const packageAccessories = await prisma.packageAccessory.findMany()
    * ```
    */
  get packageAccessory(): Prisma.PackageAccessoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.packageAssignment`: Exposes CRUD operations for the **PackageAssignment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PackageAssignments
    * const packageAssignments = await prisma.packageAssignment.findMany()
    * ```
    */
  get packageAssignment(): Prisma.PackageAssignmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tool`: Exposes CRUD operations for the **Tool** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tools
    * const tools = await prisma.tool.findMany()
    * ```
    */
  get tool(): Prisma.ToolDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.toolAlternative`: Exposes CRUD operations for the **ToolAlternative** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ToolAlternatives
    * const toolAlternatives = await prisma.toolAlternative.findMany()
    * ```
    */
  get toolAlternative(): Prisma.ToolAlternativeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.toolkit`: Exposes CRUD operations for the **Toolkit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Toolkits
    * const toolkits = await prisma.toolkit.findMany()
    * ```
    */
  get toolkit(): Prisma.ToolkitDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.toolkitTool`: Exposes CRUD operations for the **ToolkitTool** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ToolkitTools
    * const toolkitTools = await prisma.toolkitTool.findMany()
    * ```
    */
  get toolkitTool(): Prisma.ToolkitToolDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.surveyResponse`: Exposes CRUD operations for the **SurveyResponse** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SurveyResponses
    * const surveyResponses = await prisma.surveyResponse.findMany()
    * ```
    */
  get surveyResponse(): Prisma.SurveyResponseDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
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

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "person" | "laptop" | "laptopProfile" | "laptopOS" | "accessory" | "package" | "packageAccessory" | "packageAssignment" | "tool" | "toolAlternative" | "toolkit" | "toolkitTool" | "surveyResponse"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Person: {
        payload: Prisma.$PersonPayload<ExtArgs>
        fields: Prisma.PersonFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PersonFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PersonFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>
          }
          findFirst: {
            args: Prisma.PersonFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PersonFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>
          }
          findMany: {
            args: Prisma.PersonFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>[]
          }
          create: {
            args: Prisma.PersonCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>
          }
          createMany: {
            args: Prisma.PersonCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PersonCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>[]
          }
          delete: {
            args: Prisma.PersonDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>
          }
          update: {
            args: Prisma.PersonUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>
          }
          deleteMany: {
            args: Prisma.PersonDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PersonUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PersonUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>[]
          }
          upsert: {
            args: Prisma.PersonUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>
          }
          aggregate: {
            args: Prisma.PersonAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePerson>
          }
          groupBy: {
            args: Prisma.PersonGroupByArgs<ExtArgs>
            result: $Utils.Optional<PersonGroupByOutputType>[]
          }
          count: {
            args: Prisma.PersonCountArgs<ExtArgs>
            result: $Utils.Optional<PersonCountAggregateOutputType> | number
          }
        }
      }
      Laptop: {
        payload: Prisma.$LaptopPayload<ExtArgs>
        fields: Prisma.LaptopFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LaptopFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaptopPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LaptopFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaptopPayload>
          }
          findFirst: {
            args: Prisma.LaptopFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaptopPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LaptopFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaptopPayload>
          }
          findMany: {
            args: Prisma.LaptopFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaptopPayload>[]
          }
          create: {
            args: Prisma.LaptopCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaptopPayload>
          }
          createMany: {
            args: Prisma.LaptopCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LaptopCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaptopPayload>[]
          }
          delete: {
            args: Prisma.LaptopDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaptopPayload>
          }
          update: {
            args: Prisma.LaptopUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaptopPayload>
          }
          deleteMany: {
            args: Prisma.LaptopDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LaptopUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LaptopUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaptopPayload>[]
          }
          upsert: {
            args: Prisma.LaptopUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaptopPayload>
          }
          aggregate: {
            args: Prisma.LaptopAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLaptop>
          }
          groupBy: {
            args: Prisma.LaptopGroupByArgs<ExtArgs>
            result: $Utils.Optional<LaptopGroupByOutputType>[]
          }
          count: {
            args: Prisma.LaptopCountArgs<ExtArgs>
            result: $Utils.Optional<LaptopCountAggregateOutputType> | number
          }
        }
      }
      LaptopProfile: {
        payload: Prisma.$LaptopProfilePayload<ExtArgs>
        fields: Prisma.LaptopProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LaptopProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaptopProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LaptopProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaptopProfilePayload>
          }
          findFirst: {
            args: Prisma.LaptopProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaptopProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LaptopProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaptopProfilePayload>
          }
          findMany: {
            args: Prisma.LaptopProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaptopProfilePayload>[]
          }
          create: {
            args: Prisma.LaptopProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaptopProfilePayload>
          }
          createMany: {
            args: Prisma.LaptopProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LaptopProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaptopProfilePayload>[]
          }
          delete: {
            args: Prisma.LaptopProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaptopProfilePayload>
          }
          update: {
            args: Prisma.LaptopProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaptopProfilePayload>
          }
          deleteMany: {
            args: Prisma.LaptopProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LaptopProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LaptopProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaptopProfilePayload>[]
          }
          upsert: {
            args: Prisma.LaptopProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaptopProfilePayload>
          }
          aggregate: {
            args: Prisma.LaptopProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLaptopProfile>
          }
          groupBy: {
            args: Prisma.LaptopProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<LaptopProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.LaptopProfileCountArgs<ExtArgs>
            result: $Utils.Optional<LaptopProfileCountAggregateOutputType> | number
          }
        }
      }
      LaptopOS: {
        payload: Prisma.$LaptopOSPayload<ExtArgs>
        fields: Prisma.LaptopOSFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LaptopOSFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaptopOSPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LaptopOSFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaptopOSPayload>
          }
          findFirst: {
            args: Prisma.LaptopOSFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaptopOSPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LaptopOSFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaptopOSPayload>
          }
          findMany: {
            args: Prisma.LaptopOSFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaptopOSPayload>[]
          }
          create: {
            args: Prisma.LaptopOSCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaptopOSPayload>
          }
          createMany: {
            args: Prisma.LaptopOSCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LaptopOSCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaptopOSPayload>[]
          }
          delete: {
            args: Prisma.LaptopOSDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaptopOSPayload>
          }
          update: {
            args: Prisma.LaptopOSUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaptopOSPayload>
          }
          deleteMany: {
            args: Prisma.LaptopOSDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LaptopOSUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LaptopOSUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaptopOSPayload>[]
          }
          upsert: {
            args: Prisma.LaptopOSUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaptopOSPayload>
          }
          aggregate: {
            args: Prisma.LaptopOSAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLaptopOS>
          }
          groupBy: {
            args: Prisma.LaptopOSGroupByArgs<ExtArgs>
            result: $Utils.Optional<LaptopOSGroupByOutputType>[]
          }
          count: {
            args: Prisma.LaptopOSCountArgs<ExtArgs>
            result: $Utils.Optional<LaptopOSCountAggregateOutputType> | number
          }
        }
      }
      Accessory: {
        payload: Prisma.$AccessoryPayload<ExtArgs>
        fields: Prisma.AccessoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccessoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccessoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessoryPayload>
          }
          findFirst: {
            args: Prisma.AccessoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccessoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessoryPayload>
          }
          findMany: {
            args: Prisma.AccessoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessoryPayload>[]
          }
          create: {
            args: Prisma.AccessoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessoryPayload>
          }
          createMany: {
            args: Prisma.AccessoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccessoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessoryPayload>[]
          }
          delete: {
            args: Prisma.AccessoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessoryPayload>
          }
          update: {
            args: Prisma.AccessoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessoryPayload>
          }
          deleteMany: {
            args: Prisma.AccessoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccessoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccessoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessoryPayload>[]
          }
          upsert: {
            args: Prisma.AccessoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessoryPayload>
          }
          aggregate: {
            args: Prisma.AccessoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccessory>
          }
          groupBy: {
            args: Prisma.AccessoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccessoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccessoryCountArgs<ExtArgs>
            result: $Utils.Optional<AccessoryCountAggregateOutputType> | number
          }
        }
      }
      Package: {
        payload: Prisma.$PackagePayload<ExtArgs>
        fields: Prisma.PackageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PackageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PackageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>
          }
          findFirst: {
            args: Prisma.PackageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PackageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>
          }
          findMany: {
            args: Prisma.PackageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>[]
          }
          create: {
            args: Prisma.PackageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>
          }
          createMany: {
            args: Prisma.PackageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PackageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>[]
          }
          delete: {
            args: Prisma.PackageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>
          }
          update: {
            args: Prisma.PackageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>
          }
          deleteMany: {
            args: Prisma.PackageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PackageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PackageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>[]
          }
          upsert: {
            args: Prisma.PackageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>
          }
          aggregate: {
            args: Prisma.PackageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePackage>
          }
          groupBy: {
            args: Prisma.PackageGroupByArgs<ExtArgs>
            result: $Utils.Optional<PackageGroupByOutputType>[]
          }
          count: {
            args: Prisma.PackageCountArgs<ExtArgs>
            result: $Utils.Optional<PackageCountAggregateOutputType> | number
          }
        }
      }
      PackageAccessory: {
        payload: Prisma.$PackageAccessoryPayload<ExtArgs>
        fields: Prisma.PackageAccessoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PackageAccessoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageAccessoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PackageAccessoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageAccessoryPayload>
          }
          findFirst: {
            args: Prisma.PackageAccessoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageAccessoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PackageAccessoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageAccessoryPayload>
          }
          findMany: {
            args: Prisma.PackageAccessoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageAccessoryPayload>[]
          }
          create: {
            args: Prisma.PackageAccessoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageAccessoryPayload>
          }
          createMany: {
            args: Prisma.PackageAccessoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PackageAccessoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageAccessoryPayload>[]
          }
          delete: {
            args: Prisma.PackageAccessoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageAccessoryPayload>
          }
          update: {
            args: Prisma.PackageAccessoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageAccessoryPayload>
          }
          deleteMany: {
            args: Prisma.PackageAccessoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PackageAccessoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PackageAccessoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageAccessoryPayload>[]
          }
          upsert: {
            args: Prisma.PackageAccessoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageAccessoryPayload>
          }
          aggregate: {
            args: Prisma.PackageAccessoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePackageAccessory>
          }
          groupBy: {
            args: Prisma.PackageAccessoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<PackageAccessoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.PackageAccessoryCountArgs<ExtArgs>
            result: $Utils.Optional<PackageAccessoryCountAggregateOutputType> | number
          }
        }
      }
      PackageAssignment: {
        payload: Prisma.$PackageAssignmentPayload<ExtArgs>
        fields: Prisma.PackageAssignmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PackageAssignmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageAssignmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PackageAssignmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageAssignmentPayload>
          }
          findFirst: {
            args: Prisma.PackageAssignmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageAssignmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PackageAssignmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageAssignmentPayload>
          }
          findMany: {
            args: Prisma.PackageAssignmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageAssignmentPayload>[]
          }
          create: {
            args: Prisma.PackageAssignmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageAssignmentPayload>
          }
          createMany: {
            args: Prisma.PackageAssignmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PackageAssignmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageAssignmentPayload>[]
          }
          delete: {
            args: Prisma.PackageAssignmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageAssignmentPayload>
          }
          update: {
            args: Prisma.PackageAssignmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageAssignmentPayload>
          }
          deleteMany: {
            args: Prisma.PackageAssignmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PackageAssignmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PackageAssignmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageAssignmentPayload>[]
          }
          upsert: {
            args: Prisma.PackageAssignmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageAssignmentPayload>
          }
          aggregate: {
            args: Prisma.PackageAssignmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePackageAssignment>
          }
          groupBy: {
            args: Prisma.PackageAssignmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PackageAssignmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PackageAssignmentCountArgs<ExtArgs>
            result: $Utils.Optional<PackageAssignmentCountAggregateOutputType> | number
          }
        }
      }
      Tool: {
        payload: Prisma.$ToolPayload<ExtArgs>
        fields: Prisma.ToolFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ToolFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ToolFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolPayload>
          }
          findFirst: {
            args: Prisma.ToolFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ToolFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolPayload>
          }
          findMany: {
            args: Prisma.ToolFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolPayload>[]
          }
          create: {
            args: Prisma.ToolCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolPayload>
          }
          createMany: {
            args: Prisma.ToolCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ToolCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolPayload>[]
          }
          delete: {
            args: Prisma.ToolDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolPayload>
          }
          update: {
            args: Prisma.ToolUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolPayload>
          }
          deleteMany: {
            args: Prisma.ToolDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ToolUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ToolUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolPayload>[]
          }
          upsert: {
            args: Prisma.ToolUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolPayload>
          }
          aggregate: {
            args: Prisma.ToolAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTool>
          }
          groupBy: {
            args: Prisma.ToolGroupByArgs<ExtArgs>
            result: $Utils.Optional<ToolGroupByOutputType>[]
          }
          count: {
            args: Prisma.ToolCountArgs<ExtArgs>
            result: $Utils.Optional<ToolCountAggregateOutputType> | number
          }
        }
      }
      ToolAlternative: {
        payload: Prisma.$ToolAlternativePayload<ExtArgs>
        fields: Prisma.ToolAlternativeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ToolAlternativeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolAlternativePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ToolAlternativeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolAlternativePayload>
          }
          findFirst: {
            args: Prisma.ToolAlternativeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolAlternativePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ToolAlternativeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolAlternativePayload>
          }
          findMany: {
            args: Prisma.ToolAlternativeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolAlternativePayload>[]
          }
          create: {
            args: Prisma.ToolAlternativeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolAlternativePayload>
          }
          createMany: {
            args: Prisma.ToolAlternativeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ToolAlternativeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolAlternativePayload>[]
          }
          delete: {
            args: Prisma.ToolAlternativeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolAlternativePayload>
          }
          update: {
            args: Prisma.ToolAlternativeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolAlternativePayload>
          }
          deleteMany: {
            args: Prisma.ToolAlternativeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ToolAlternativeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ToolAlternativeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolAlternativePayload>[]
          }
          upsert: {
            args: Prisma.ToolAlternativeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolAlternativePayload>
          }
          aggregate: {
            args: Prisma.ToolAlternativeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateToolAlternative>
          }
          groupBy: {
            args: Prisma.ToolAlternativeGroupByArgs<ExtArgs>
            result: $Utils.Optional<ToolAlternativeGroupByOutputType>[]
          }
          count: {
            args: Prisma.ToolAlternativeCountArgs<ExtArgs>
            result: $Utils.Optional<ToolAlternativeCountAggregateOutputType> | number
          }
        }
      }
      Toolkit: {
        payload: Prisma.$ToolkitPayload<ExtArgs>
        fields: Prisma.ToolkitFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ToolkitFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolkitPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ToolkitFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolkitPayload>
          }
          findFirst: {
            args: Prisma.ToolkitFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolkitPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ToolkitFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolkitPayload>
          }
          findMany: {
            args: Prisma.ToolkitFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolkitPayload>[]
          }
          create: {
            args: Prisma.ToolkitCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolkitPayload>
          }
          createMany: {
            args: Prisma.ToolkitCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ToolkitCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolkitPayload>[]
          }
          delete: {
            args: Prisma.ToolkitDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolkitPayload>
          }
          update: {
            args: Prisma.ToolkitUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolkitPayload>
          }
          deleteMany: {
            args: Prisma.ToolkitDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ToolkitUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ToolkitUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolkitPayload>[]
          }
          upsert: {
            args: Prisma.ToolkitUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolkitPayload>
          }
          aggregate: {
            args: Prisma.ToolkitAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateToolkit>
          }
          groupBy: {
            args: Prisma.ToolkitGroupByArgs<ExtArgs>
            result: $Utils.Optional<ToolkitGroupByOutputType>[]
          }
          count: {
            args: Prisma.ToolkitCountArgs<ExtArgs>
            result: $Utils.Optional<ToolkitCountAggregateOutputType> | number
          }
        }
      }
      ToolkitTool: {
        payload: Prisma.$ToolkitToolPayload<ExtArgs>
        fields: Prisma.ToolkitToolFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ToolkitToolFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolkitToolPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ToolkitToolFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolkitToolPayload>
          }
          findFirst: {
            args: Prisma.ToolkitToolFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolkitToolPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ToolkitToolFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolkitToolPayload>
          }
          findMany: {
            args: Prisma.ToolkitToolFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolkitToolPayload>[]
          }
          create: {
            args: Prisma.ToolkitToolCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolkitToolPayload>
          }
          createMany: {
            args: Prisma.ToolkitToolCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ToolkitToolCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolkitToolPayload>[]
          }
          delete: {
            args: Prisma.ToolkitToolDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolkitToolPayload>
          }
          update: {
            args: Prisma.ToolkitToolUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolkitToolPayload>
          }
          deleteMany: {
            args: Prisma.ToolkitToolDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ToolkitToolUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ToolkitToolUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolkitToolPayload>[]
          }
          upsert: {
            args: Prisma.ToolkitToolUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolkitToolPayload>
          }
          aggregate: {
            args: Prisma.ToolkitToolAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateToolkitTool>
          }
          groupBy: {
            args: Prisma.ToolkitToolGroupByArgs<ExtArgs>
            result: $Utils.Optional<ToolkitToolGroupByOutputType>[]
          }
          count: {
            args: Prisma.ToolkitToolCountArgs<ExtArgs>
            result: $Utils.Optional<ToolkitToolCountAggregateOutputType> | number
          }
        }
      }
      SurveyResponse: {
        payload: Prisma.$SurveyResponsePayload<ExtArgs>
        fields: Prisma.SurveyResponseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SurveyResponseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyResponsePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SurveyResponseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyResponsePayload>
          }
          findFirst: {
            args: Prisma.SurveyResponseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyResponsePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SurveyResponseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyResponsePayload>
          }
          findMany: {
            args: Prisma.SurveyResponseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyResponsePayload>[]
          }
          create: {
            args: Prisma.SurveyResponseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyResponsePayload>
          }
          createMany: {
            args: Prisma.SurveyResponseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SurveyResponseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyResponsePayload>[]
          }
          delete: {
            args: Prisma.SurveyResponseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyResponsePayload>
          }
          update: {
            args: Prisma.SurveyResponseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyResponsePayload>
          }
          deleteMany: {
            args: Prisma.SurveyResponseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SurveyResponseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SurveyResponseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyResponsePayload>[]
          }
          upsert: {
            args: Prisma.SurveyResponseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyResponsePayload>
          }
          aggregate: {
            args: Prisma.SurveyResponseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSurveyResponse>
          }
          groupBy: {
            args: Prisma.SurveyResponseGroupByArgs<ExtArgs>
            result: $Utils.Optional<SurveyResponseGroupByOutputType>[]
          }
          count: {
            args: Prisma.SurveyResponseCountArgs<ExtArgs>
            result: $Utils.Optional<SurveyResponseCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    person?: PersonOmit
    laptop?: LaptopOmit
    laptopProfile?: LaptopProfileOmit
    laptopOS?: LaptopOSOmit
    accessory?: AccessoryOmit
    package?: PackageOmit
    packageAccessory?: PackageAccessoryOmit
    packageAssignment?: PackageAssignmentOmit
    tool?: ToolOmit
    toolAlternative?: ToolAlternativeOmit
    toolkit?: ToolkitOmit
    toolkitTool?: ToolkitToolOmit
    surveyResponse?: SurveyResponseOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type PersonCountOutputType
   */

  export type PersonCountOutputType = {
    packageAssignments: number
  }

  export type PersonCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    packageAssignments?: boolean | PersonCountOutputTypeCountPackageAssignmentsArgs
  }

  // Custom InputTypes
  /**
   * PersonCountOutputType without action
   */
  export type PersonCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonCountOutputType
     */
    select?: PersonCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PersonCountOutputType without action
   */
  export type PersonCountOutputTypeCountPackageAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PackageAssignmentWhereInput
  }


  /**
   * Count Type LaptopCountOutputType
   */

  export type LaptopCountOutputType = {
    supportedProfiles: number
    supportedOS: number
    packages: number
  }

  export type LaptopCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    supportedProfiles?: boolean | LaptopCountOutputTypeCountSupportedProfilesArgs
    supportedOS?: boolean | LaptopCountOutputTypeCountSupportedOSArgs
    packages?: boolean | LaptopCountOutputTypeCountPackagesArgs
  }

  // Custom InputTypes
  /**
   * LaptopCountOutputType without action
   */
  export type LaptopCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaptopCountOutputType
     */
    select?: LaptopCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LaptopCountOutputType without action
   */
  export type LaptopCountOutputTypeCountSupportedProfilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LaptopProfileWhereInput
  }

  /**
   * LaptopCountOutputType without action
   */
  export type LaptopCountOutputTypeCountSupportedOSArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LaptopOSWhereInput
  }

  /**
   * LaptopCountOutputType without action
   */
  export type LaptopCountOutputTypeCountPackagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PackageWhereInput
  }


  /**
   * Count Type AccessoryCountOutputType
   */

  export type AccessoryCountOutputType = {
    packageAccessories: number
  }

  export type AccessoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    packageAccessories?: boolean | AccessoryCountOutputTypeCountPackageAccessoriesArgs
  }

  // Custom InputTypes
  /**
   * AccessoryCountOutputType without action
   */
  export type AccessoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessoryCountOutputType
     */
    select?: AccessoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AccessoryCountOutputType without action
   */
  export type AccessoryCountOutputTypeCountPackageAccessoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PackageAccessoryWhereInput
  }


  /**
   * Count Type PackageCountOutputType
   */

  export type PackageCountOutputType = {
    accessories: number
    assignments: number
  }

  export type PackageCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accessories?: boolean | PackageCountOutputTypeCountAccessoriesArgs
    assignments?: boolean | PackageCountOutputTypeCountAssignmentsArgs
  }

  // Custom InputTypes
  /**
   * PackageCountOutputType without action
   */
  export type PackageCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageCountOutputType
     */
    select?: PackageCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PackageCountOutputType without action
   */
  export type PackageCountOutputTypeCountAccessoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PackageAccessoryWhereInput
  }

  /**
   * PackageCountOutputType without action
   */
  export type PackageCountOutputTypeCountAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PackageAssignmentWhereInput
  }


  /**
   * Count Type ToolCountOutputType
   */

  export type ToolCountOutputType = {
    alternatives: number
    toolkits: number
  }

  export type ToolCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alternatives?: boolean | ToolCountOutputTypeCountAlternativesArgs
    toolkits?: boolean | ToolCountOutputTypeCountToolkitsArgs
  }

  // Custom InputTypes
  /**
   * ToolCountOutputType without action
   */
  export type ToolCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToolCountOutputType
     */
    select?: ToolCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ToolCountOutputType without action
   */
  export type ToolCountOutputTypeCountAlternativesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ToolAlternativeWhereInput
  }

  /**
   * ToolCountOutputType without action
   */
  export type ToolCountOutputTypeCountToolkitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ToolkitToolWhereInput
  }


  /**
   * Count Type ToolkitCountOutputType
   */

  export type ToolkitCountOutputType = {
    tools: number
    surveyMatches: number
  }

  export type ToolkitCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tools?: boolean | ToolkitCountOutputTypeCountToolsArgs
    surveyMatches?: boolean | ToolkitCountOutputTypeCountSurveyMatchesArgs
  }

  // Custom InputTypes
  /**
   * ToolkitCountOutputType without action
   */
  export type ToolkitCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToolkitCountOutputType
     */
    select?: ToolkitCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ToolkitCountOutputType without action
   */
  export type ToolkitCountOutputTypeCountToolsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ToolkitToolWhereInput
  }

  /**
   * ToolkitCountOutputType without action
   */
  export type ToolkitCountOutputTypeCountSurveyMatchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SurveyResponseWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Person
   */

  export type AggregatePerson = {
    _count: PersonCountAggregateOutputType | null
    _min: PersonMinAggregateOutputType | null
    _max: PersonMaxAggregateOutputType | null
  }

  export type PersonMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    department: string | null
    position: string | null
    pcReference: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PersonMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    department: string | null
    position: string | null
    pcReference: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PersonCountAggregateOutputType = {
    id: number
    name: number
    email: number
    department: number
    position: number
    pcReference: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PersonMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    department?: true
    position?: true
    pcReference?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PersonMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    department?: true
    position?: true
    pcReference?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PersonCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    department?: true
    position?: true
    pcReference?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PersonAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Person to aggregate.
     */
    where?: PersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of People to fetch.
     */
    orderBy?: PersonOrderByWithRelationInput | PersonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` People from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` People.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned People
    **/
    _count?: true | PersonCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PersonMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PersonMaxAggregateInputType
  }

  export type GetPersonAggregateType<T extends PersonAggregateArgs> = {
        [P in keyof T & keyof AggregatePerson]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePerson[P]>
      : GetScalarType<T[P], AggregatePerson[P]>
  }




  export type PersonGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PersonWhereInput
    orderBy?: PersonOrderByWithAggregationInput | PersonOrderByWithAggregationInput[]
    by: PersonScalarFieldEnum[] | PersonScalarFieldEnum
    having?: PersonScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PersonCountAggregateInputType | true
    _min?: PersonMinAggregateInputType
    _max?: PersonMaxAggregateInputType
  }

  export type PersonGroupByOutputType = {
    id: string
    name: string
    email: string | null
    department: string | null
    position: string | null
    pcReference: string | null
    createdAt: Date
    updatedAt: Date
    _count: PersonCountAggregateOutputType | null
    _min: PersonMinAggregateOutputType | null
    _max: PersonMaxAggregateOutputType | null
  }

  type GetPersonGroupByPayload<T extends PersonGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PersonGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PersonGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PersonGroupByOutputType[P]>
            : GetScalarType<T[P], PersonGroupByOutputType[P]>
        }
      >
    >


  export type PersonSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    department?: boolean
    position?: boolean
    pcReference?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    packageAssignments?: boolean | Person$packageAssignmentsArgs<ExtArgs>
    _count?: boolean | PersonCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["person"]>

  export type PersonSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    department?: boolean
    position?: boolean
    pcReference?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["person"]>

  export type PersonSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    department?: boolean
    position?: boolean
    pcReference?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["person"]>

  export type PersonSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    department?: boolean
    position?: boolean
    pcReference?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PersonOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "department" | "position" | "pcReference" | "createdAt" | "updatedAt", ExtArgs["result"]["person"]>
  export type PersonInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    packageAssignments?: boolean | Person$packageAssignmentsArgs<ExtArgs>
    _count?: boolean | PersonCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PersonIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PersonIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PersonPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Person"
    objects: {
      packageAssignments: Prisma.$PackageAssignmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string | null
      department: string | null
      position: string | null
      pcReference: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["person"]>
    composites: {}
  }

  type PersonGetPayload<S extends boolean | null | undefined | PersonDefaultArgs> = $Result.GetResult<Prisma.$PersonPayload, S>

  type PersonCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PersonFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PersonCountAggregateInputType | true
    }

  export interface PersonDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Person'], meta: { name: 'Person' } }
    /**
     * Find zero or one Person that matches the filter.
     * @param {PersonFindUniqueArgs} args - Arguments to find a Person
     * @example
     * // Get one Person
     * const person = await prisma.person.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PersonFindUniqueArgs>(args: SelectSubset<T, PersonFindUniqueArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Person that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PersonFindUniqueOrThrowArgs} args - Arguments to find a Person
     * @example
     * // Get one Person
     * const person = await prisma.person.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PersonFindUniqueOrThrowArgs>(args: SelectSubset<T, PersonFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Person that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonFindFirstArgs} args - Arguments to find a Person
     * @example
     * // Get one Person
     * const person = await prisma.person.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PersonFindFirstArgs>(args?: SelectSubset<T, PersonFindFirstArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Person that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonFindFirstOrThrowArgs} args - Arguments to find a Person
     * @example
     * // Get one Person
     * const person = await prisma.person.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PersonFindFirstOrThrowArgs>(args?: SelectSubset<T, PersonFindFirstOrThrowArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more People that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all People
     * const people = await prisma.person.findMany()
     * 
     * // Get first 10 People
     * const people = await prisma.person.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const personWithIdOnly = await prisma.person.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PersonFindManyArgs>(args?: SelectSubset<T, PersonFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Person.
     * @param {PersonCreateArgs} args - Arguments to create a Person.
     * @example
     * // Create one Person
     * const Person = await prisma.person.create({
     *   data: {
     *     // ... data to create a Person
     *   }
     * })
     * 
     */
    create<T extends PersonCreateArgs>(args: SelectSubset<T, PersonCreateArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many People.
     * @param {PersonCreateManyArgs} args - Arguments to create many People.
     * @example
     * // Create many People
     * const person = await prisma.person.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PersonCreateManyArgs>(args?: SelectSubset<T, PersonCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many People and returns the data saved in the database.
     * @param {PersonCreateManyAndReturnArgs} args - Arguments to create many People.
     * @example
     * // Create many People
     * const person = await prisma.person.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many People and only return the `id`
     * const personWithIdOnly = await prisma.person.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PersonCreateManyAndReturnArgs>(args?: SelectSubset<T, PersonCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Person.
     * @param {PersonDeleteArgs} args - Arguments to delete one Person.
     * @example
     * // Delete one Person
     * const Person = await prisma.person.delete({
     *   where: {
     *     // ... filter to delete one Person
     *   }
     * })
     * 
     */
    delete<T extends PersonDeleteArgs>(args: SelectSubset<T, PersonDeleteArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Person.
     * @param {PersonUpdateArgs} args - Arguments to update one Person.
     * @example
     * // Update one Person
     * const person = await prisma.person.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PersonUpdateArgs>(args: SelectSubset<T, PersonUpdateArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more People.
     * @param {PersonDeleteManyArgs} args - Arguments to filter People to delete.
     * @example
     * // Delete a few People
     * const { count } = await prisma.person.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PersonDeleteManyArgs>(args?: SelectSubset<T, PersonDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more People.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many People
     * const person = await prisma.person.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PersonUpdateManyArgs>(args: SelectSubset<T, PersonUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more People and returns the data updated in the database.
     * @param {PersonUpdateManyAndReturnArgs} args - Arguments to update many People.
     * @example
     * // Update many People
     * const person = await prisma.person.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more People and only return the `id`
     * const personWithIdOnly = await prisma.person.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PersonUpdateManyAndReturnArgs>(args: SelectSubset<T, PersonUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Person.
     * @param {PersonUpsertArgs} args - Arguments to update or create a Person.
     * @example
     * // Update or create a Person
     * const person = await prisma.person.upsert({
     *   create: {
     *     // ... data to create a Person
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Person we want to update
     *   }
     * })
     */
    upsert<T extends PersonUpsertArgs>(args: SelectSubset<T, PersonUpsertArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of People.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonCountArgs} args - Arguments to filter People to count.
     * @example
     * // Count the number of People
     * const count = await prisma.person.count({
     *   where: {
     *     // ... the filter for the People we want to count
     *   }
     * })
    **/
    count<T extends PersonCountArgs>(
      args?: Subset<T, PersonCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PersonCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Person.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PersonAggregateArgs>(args: Subset<T, PersonAggregateArgs>): Prisma.PrismaPromise<GetPersonAggregateType<T>>

    /**
     * Group by Person.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PersonGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PersonGroupByArgs['orderBy'] }
        : { orderBy?: PersonGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PersonGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPersonGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Person model
   */
  readonly fields: PersonFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Person.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PersonClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    packageAssignments<T extends Person$packageAssignmentsArgs<ExtArgs> = {}>(args?: Subset<T, Person$packageAssignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PackageAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Person model
   */
  interface PersonFieldRefs {
    readonly id: FieldRef<"Person", 'String'>
    readonly name: FieldRef<"Person", 'String'>
    readonly email: FieldRef<"Person", 'String'>
    readonly department: FieldRef<"Person", 'String'>
    readonly position: FieldRef<"Person", 'String'>
    readonly pcReference: FieldRef<"Person", 'String'>
    readonly createdAt: FieldRef<"Person", 'DateTime'>
    readonly updatedAt: FieldRef<"Person", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Person findUnique
   */
  export type PersonFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * Filter, which Person to fetch.
     */
    where: PersonWhereUniqueInput
  }

  /**
   * Person findUniqueOrThrow
   */
  export type PersonFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * Filter, which Person to fetch.
     */
    where: PersonWhereUniqueInput
  }

  /**
   * Person findFirst
   */
  export type PersonFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * Filter, which Person to fetch.
     */
    where?: PersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of People to fetch.
     */
    orderBy?: PersonOrderByWithRelationInput | PersonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for People.
     */
    cursor?: PersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` People from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` People.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of People.
     */
    distinct?: PersonScalarFieldEnum | PersonScalarFieldEnum[]
  }

  /**
   * Person findFirstOrThrow
   */
  export type PersonFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * Filter, which Person to fetch.
     */
    where?: PersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of People to fetch.
     */
    orderBy?: PersonOrderByWithRelationInput | PersonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for People.
     */
    cursor?: PersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` People from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` People.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of People.
     */
    distinct?: PersonScalarFieldEnum | PersonScalarFieldEnum[]
  }

  /**
   * Person findMany
   */
  export type PersonFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * Filter, which People to fetch.
     */
    where?: PersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of People to fetch.
     */
    orderBy?: PersonOrderByWithRelationInput | PersonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing People.
     */
    cursor?: PersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` People from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` People.
     */
    skip?: number
    distinct?: PersonScalarFieldEnum | PersonScalarFieldEnum[]
  }

  /**
   * Person create
   */
  export type PersonCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * The data needed to create a Person.
     */
    data: XOR<PersonCreateInput, PersonUncheckedCreateInput>
  }

  /**
   * Person createMany
   */
  export type PersonCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many People.
     */
    data: PersonCreateManyInput | PersonCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Person createManyAndReturn
   */
  export type PersonCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * The data used to create many People.
     */
    data: PersonCreateManyInput | PersonCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Person update
   */
  export type PersonUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * The data needed to update a Person.
     */
    data: XOR<PersonUpdateInput, PersonUncheckedUpdateInput>
    /**
     * Choose, which Person to update.
     */
    where: PersonWhereUniqueInput
  }

  /**
   * Person updateMany
   */
  export type PersonUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update People.
     */
    data: XOR<PersonUpdateManyMutationInput, PersonUncheckedUpdateManyInput>
    /**
     * Filter which People to update
     */
    where?: PersonWhereInput
    /**
     * Limit how many People to update.
     */
    limit?: number
  }

  /**
   * Person updateManyAndReturn
   */
  export type PersonUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * The data used to update People.
     */
    data: XOR<PersonUpdateManyMutationInput, PersonUncheckedUpdateManyInput>
    /**
     * Filter which People to update
     */
    where?: PersonWhereInput
    /**
     * Limit how many People to update.
     */
    limit?: number
  }

  /**
   * Person upsert
   */
  export type PersonUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * The filter to search for the Person to update in case it exists.
     */
    where: PersonWhereUniqueInput
    /**
     * In case the Person found by the `where` argument doesn't exist, create a new Person with this data.
     */
    create: XOR<PersonCreateInput, PersonUncheckedCreateInput>
    /**
     * In case the Person was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PersonUpdateInput, PersonUncheckedUpdateInput>
  }

  /**
   * Person delete
   */
  export type PersonDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * Filter which Person to delete.
     */
    where: PersonWhereUniqueInput
  }

  /**
   * Person deleteMany
   */
  export type PersonDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which People to delete
     */
    where?: PersonWhereInput
    /**
     * Limit how many People to delete.
     */
    limit?: number
  }

  /**
   * Person.packageAssignments
   */
  export type Person$packageAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAssignment
     */
    select?: PackageAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PackageAssignment
     */
    omit?: PackageAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageAssignmentInclude<ExtArgs> | null
    where?: PackageAssignmentWhereInput
    orderBy?: PackageAssignmentOrderByWithRelationInput | PackageAssignmentOrderByWithRelationInput[]
    cursor?: PackageAssignmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PackageAssignmentScalarFieldEnum | PackageAssignmentScalarFieldEnum[]
  }

  /**
   * Person without action
   */
  export type PersonDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
  }


  /**
   * Model Laptop
   */

  export type AggregateLaptop = {
    _count: LaptopCountAggregateOutputType | null
    _avg: LaptopAvgAggregateOutputType | null
    _sum: LaptopSumAggregateOutputType | null
    _min: LaptopMinAggregateOutputType | null
    _max: LaptopMaxAggregateOutputType | null
  }

  export type LaptopAvgAggregateOutputType = {
    price: Decimal | null
    batteryLife: Decimal | null
    performanceScore: Decimal | null
  }

  export type LaptopSumAggregateOutputType = {
    price: Decimal | null
    batteryLife: Decimal | null
    performanceScore: Decimal | null
  }

  export type LaptopMinAggregateOutputType = {
    id: string | null
    brand: string | null
    model: string | null
    price: Decimal | null
    priceType: string | null
    processor: string | null
    ram: string | null
    storage: string | null
    batteryLife: Decimal | null
    performanceScore: Decimal | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LaptopMaxAggregateOutputType = {
    id: string | null
    brand: string | null
    model: string | null
    price: Decimal | null
    priceType: string | null
    processor: string | null
    ram: string | null
    storage: string | null
    batteryLife: Decimal | null
    performanceScore: Decimal | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LaptopCountAggregateOutputType = {
    id: number
    brand: number
    model: number
    price: number
    priceType: number
    processor: number
    ram: number
    storage: number
    batteryLife: number
    performanceScore: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LaptopAvgAggregateInputType = {
    price?: true
    batteryLife?: true
    performanceScore?: true
  }

  export type LaptopSumAggregateInputType = {
    price?: true
    batteryLife?: true
    performanceScore?: true
  }

  export type LaptopMinAggregateInputType = {
    id?: true
    brand?: true
    model?: true
    price?: true
    priceType?: true
    processor?: true
    ram?: true
    storage?: true
    batteryLife?: true
    performanceScore?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LaptopMaxAggregateInputType = {
    id?: true
    brand?: true
    model?: true
    price?: true
    priceType?: true
    processor?: true
    ram?: true
    storage?: true
    batteryLife?: true
    performanceScore?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LaptopCountAggregateInputType = {
    id?: true
    brand?: true
    model?: true
    price?: true
    priceType?: true
    processor?: true
    ram?: true
    storage?: true
    batteryLife?: true
    performanceScore?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LaptopAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Laptop to aggregate.
     */
    where?: LaptopWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Laptops to fetch.
     */
    orderBy?: LaptopOrderByWithRelationInput | LaptopOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LaptopWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Laptops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Laptops.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Laptops
    **/
    _count?: true | LaptopCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LaptopAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LaptopSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LaptopMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LaptopMaxAggregateInputType
  }

  export type GetLaptopAggregateType<T extends LaptopAggregateArgs> = {
        [P in keyof T & keyof AggregateLaptop]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLaptop[P]>
      : GetScalarType<T[P], AggregateLaptop[P]>
  }




  export type LaptopGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LaptopWhereInput
    orderBy?: LaptopOrderByWithAggregationInput | LaptopOrderByWithAggregationInput[]
    by: LaptopScalarFieldEnum[] | LaptopScalarFieldEnum
    having?: LaptopScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LaptopCountAggregateInputType | true
    _avg?: LaptopAvgAggregateInputType
    _sum?: LaptopSumAggregateInputType
    _min?: LaptopMinAggregateInputType
    _max?: LaptopMaxAggregateInputType
  }

  export type LaptopGroupByOutputType = {
    id: string
    brand: string
    model: string
    price: Decimal
    priceType: string
    processor: string
    ram: string
    storage: string
    batteryLife: Decimal
    performanceScore: Decimal
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: LaptopCountAggregateOutputType | null
    _avg: LaptopAvgAggregateOutputType | null
    _sum: LaptopSumAggregateOutputType | null
    _min: LaptopMinAggregateOutputType | null
    _max: LaptopMaxAggregateOutputType | null
  }

  type GetLaptopGroupByPayload<T extends LaptopGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LaptopGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LaptopGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LaptopGroupByOutputType[P]>
            : GetScalarType<T[P], LaptopGroupByOutputType[P]>
        }
      >
    >


  export type LaptopSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    brand?: boolean
    model?: boolean
    price?: boolean
    priceType?: boolean
    processor?: boolean
    ram?: boolean
    storage?: boolean
    batteryLife?: boolean
    performanceScore?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    supportedProfiles?: boolean | Laptop$supportedProfilesArgs<ExtArgs>
    supportedOS?: boolean | Laptop$supportedOSArgs<ExtArgs>
    packages?: boolean | Laptop$packagesArgs<ExtArgs>
    _count?: boolean | LaptopCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["laptop"]>

  export type LaptopSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    brand?: boolean
    model?: boolean
    price?: boolean
    priceType?: boolean
    processor?: boolean
    ram?: boolean
    storage?: boolean
    batteryLife?: boolean
    performanceScore?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["laptop"]>

  export type LaptopSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    brand?: boolean
    model?: boolean
    price?: boolean
    priceType?: boolean
    processor?: boolean
    ram?: boolean
    storage?: boolean
    batteryLife?: boolean
    performanceScore?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["laptop"]>

  export type LaptopSelectScalar = {
    id?: boolean
    brand?: boolean
    model?: boolean
    price?: boolean
    priceType?: boolean
    processor?: boolean
    ram?: boolean
    storage?: boolean
    batteryLife?: boolean
    performanceScore?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LaptopOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "brand" | "model" | "price" | "priceType" | "processor" | "ram" | "storage" | "batteryLife" | "performanceScore" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["laptop"]>
  export type LaptopInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    supportedProfiles?: boolean | Laptop$supportedProfilesArgs<ExtArgs>
    supportedOS?: boolean | Laptop$supportedOSArgs<ExtArgs>
    packages?: boolean | Laptop$packagesArgs<ExtArgs>
    _count?: boolean | LaptopCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LaptopIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type LaptopIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $LaptopPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Laptop"
    objects: {
      supportedProfiles: Prisma.$LaptopProfilePayload<ExtArgs>[]
      supportedOS: Prisma.$LaptopOSPayload<ExtArgs>[]
      packages: Prisma.$PackagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      brand: string
      model: string
      price: Prisma.Decimal
      priceType: string
      processor: string
      ram: string
      storage: string
      batteryLife: Prisma.Decimal
      performanceScore: Prisma.Decimal
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["laptop"]>
    composites: {}
  }

  type LaptopGetPayload<S extends boolean | null | undefined | LaptopDefaultArgs> = $Result.GetResult<Prisma.$LaptopPayload, S>

  type LaptopCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LaptopFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LaptopCountAggregateInputType | true
    }

  export interface LaptopDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Laptop'], meta: { name: 'Laptop' } }
    /**
     * Find zero or one Laptop that matches the filter.
     * @param {LaptopFindUniqueArgs} args - Arguments to find a Laptop
     * @example
     * // Get one Laptop
     * const laptop = await prisma.laptop.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LaptopFindUniqueArgs>(args: SelectSubset<T, LaptopFindUniqueArgs<ExtArgs>>): Prisma__LaptopClient<$Result.GetResult<Prisma.$LaptopPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Laptop that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LaptopFindUniqueOrThrowArgs} args - Arguments to find a Laptop
     * @example
     * // Get one Laptop
     * const laptop = await prisma.laptop.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LaptopFindUniqueOrThrowArgs>(args: SelectSubset<T, LaptopFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LaptopClient<$Result.GetResult<Prisma.$LaptopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Laptop that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LaptopFindFirstArgs} args - Arguments to find a Laptop
     * @example
     * // Get one Laptop
     * const laptop = await prisma.laptop.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LaptopFindFirstArgs>(args?: SelectSubset<T, LaptopFindFirstArgs<ExtArgs>>): Prisma__LaptopClient<$Result.GetResult<Prisma.$LaptopPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Laptop that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LaptopFindFirstOrThrowArgs} args - Arguments to find a Laptop
     * @example
     * // Get one Laptop
     * const laptop = await prisma.laptop.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LaptopFindFirstOrThrowArgs>(args?: SelectSubset<T, LaptopFindFirstOrThrowArgs<ExtArgs>>): Prisma__LaptopClient<$Result.GetResult<Prisma.$LaptopPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Laptops that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LaptopFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Laptops
     * const laptops = await prisma.laptop.findMany()
     * 
     * // Get first 10 Laptops
     * const laptops = await prisma.laptop.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const laptopWithIdOnly = await prisma.laptop.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LaptopFindManyArgs>(args?: SelectSubset<T, LaptopFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LaptopPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Laptop.
     * @param {LaptopCreateArgs} args - Arguments to create a Laptop.
     * @example
     * // Create one Laptop
     * const Laptop = await prisma.laptop.create({
     *   data: {
     *     // ... data to create a Laptop
     *   }
     * })
     * 
     */
    create<T extends LaptopCreateArgs>(args: SelectSubset<T, LaptopCreateArgs<ExtArgs>>): Prisma__LaptopClient<$Result.GetResult<Prisma.$LaptopPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Laptops.
     * @param {LaptopCreateManyArgs} args - Arguments to create many Laptops.
     * @example
     * // Create many Laptops
     * const laptop = await prisma.laptop.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LaptopCreateManyArgs>(args?: SelectSubset<T, LaptopCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Laptops and returns the data saved in the database.
     * @param {LaptopCreateManyAndReturnArgs} args - Arguments to create many Laptops.
     * @example
     * // Create many Laptops
     * const laptop = await prisma.laptop.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Laptops and only return the `id`
     * const laptopWithIdOnly = await prisma.laptop.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LaptopCreateManyAndReturnArgs>(args?: SelectSubset<T, LaptopCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LaptopPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Laptop.
     * @param {LaptopDeleteArgs} args - Arguments to delete one Laptop.
     * @example
     * // Delete one Laptop
     * const Laptop = await prisma.laptop.delete({
     *   where: {
     *     // ... filter to delete one Laptop
     *   }
     * })
     * 
     */
    delete<T extends LaptopDeleteArgs>(args: SelectSubset<T, LaptopDeleteArgs<ExtArgs>>): Prisma__LaptopClient<$Result.GetResult<Prisma.$LaptopPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Laptop.
     * @param {LaptopUpdateArgs} args - Arguments to update one Laptop.
     * @example
     * // Update one Laptop
     * const laptop = await prisma.laptop.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LaptopUpdateArgs>(args: SelectSubset<T, LaptopUpdateArgs<ExtArgs>>): Prisma__LaptopClient<$Result.GetResult<Prisma.$LaptopPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Laptops.
     * @param {LaptopDeleteManyArgs} args - Arguments to filter Laptops to delete.
     * @example
     * // Delete a few Laptops
     * const { count } = await prisma.laptop.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LaptopDeleteManyArgs>(args?: SelectSubset<T, LaptopDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Laptops.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LaptopUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Laptops
     * const laptop = await prisma.laptop.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LaptopUpdateManyArgs>(args: SelectSubset<T, LaptopUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Laptops and returns the data updated in the database.
     * @param {LaptopUpdateManyAndReturnArgs} args - Arguments to update many Laptops.
     * @example
     * // Update many Laptops
     * const laptop = await prisma.laptop.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Laptops and only return the `id`
     * const laptopWithIdOnly = await prisma.laptop.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LaptopUpdateManyAndReturnArgs>(args: SelectSubset<T, LaptopUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LaptopPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Laptop.
     * @param {LaptopUpsertArgs} args - Arguments to update or create a Laptop.
     * @example
     * // Update or create a Laptop
     * const laptop = await prisma.laptop.upsert({
     *   create: {
     *     // ... data to create a Laptop
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Laptop we want to update
     *   }
     * })
     */
    upsert<T extends LaptopUpsertArgs>(args: SelectSubset<T, LaptopUpsertArgs<ExtArgs>>): Prisma__LaptopClient<$Result.GetResult<Prisma.$LaptopPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Laptops.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LaptopCountArgs} args - Arguments to filter Laptops to count.
     * @example
     * // Count the number of Laptops
     * const count = await prisma.laptop.count({
     *   where: {
     *     // ... the filter for the Laptops we want to count
     *   }
     * })
    **/
    count<T extends LaptopCountArgs>(
      args?: Subset<T, LaptopCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LaptopCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Laptop.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LaptopAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LaptopAggregateArgs>(args: Subset<T, LaptopAggregateArgs>): Prisma.PrismaPromise<GetLaptopAggregateType<T>>

    /**
     * Group by Laptop.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LaptopGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LaptopGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LaptopGroupByArgs['orderBy'] }
        : { orderBy?: LaptopGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LaptopGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLaptopGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Laptop model
   */
  readonly fields: LaptopFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Laptop.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LaptopClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    supportedProfiles<T extends Laptop$supportedProfilesArgs<ExtArgs> = {}>(args?: Subset<T, Laptop$supportedProfilesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LaptopProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    supportedOS<T extends Laptop$supportedOSArgs<ExtArgs> = {}>(args?: Subset<T, Laptop$supportedOSArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LaptopOSPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    packages<T extends Laptop$packagesArgs<ExtArgs> = {}>(args?: Subset<T, Laptop$packagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Laptop model
   */
  interface LaptopFieldRefs {
    readonly id: FieldRef<"Laptop", 'String'>
    readonly brand: FieldRef<"Laptop", 'String'>
    readonly model: FieldRef<"Laptop", 'String'>
    readonly price: FieldRef<"Laptop", 'Decimal'>
    readonly priceType: FieldRef<"Laptop", 'String'>
    readonly processor: FieldRef<"Laptop", 'String'>
    readonly ram: FieldRef<"Laptop", 'String'>
    readonly storage: FieldRef<"Laptop", 'String'>
    readonly batteryLife: FieldRef<"Laptop", 'Decimal'>
    readonly performanceScore: FieldRef<"Laptop", 'Decimal'>
    readonly notes: FieldRef<"Laptop", 'String'>
    readonly createdAt: FieldRef<"Laptop", 'DateTime'>
    readonly updatedAt: FieldRef<"Laptop", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Laptop findUnique
   */
  export type LaptopFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Laptop
     */
    select?: LaptopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Laptop
     */
    omit?: LaptopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaptopInclude<ExtArgs> | null
    /**
     * Filter, which Laptop to fetch.
     */
    where: LaptopWhereUniqueInput
  }

  /**
   * Laptop findUniqueOrThrow
   */
  export type LaptopFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Laptop
     */
    select?: LaptopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Laptop
     */
    omit?: LaptopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaptopInclude<ExtArgs> | null
    /**
     * Filter, which Laptop to fetch.
     */
    where: LaptopWhereUniqueInput
  }

  /**
   * Laptop findFirst
   */
  export type LaptopFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Laptop
     */
    select?: LaptopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Laptop
     */
    omit?: LaptopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaptopInclude<ExtArgs> | null
    /**
     * Filter, which Laptop to fetch.
     */
    where?: LaptopWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Laptops to fetch.
     */
    orderBy?: LaptopOrderByWithRelationInput | LaptopOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Laptops.
     */
    cursor?: LaptopWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Laptops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Laptops.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Laptops.
     */
    distinct?: LaptopScalarFieldEnum | LaptopScalarFieldEnum[]
  }

  /**
   * Laptop findFirstOrThrow
   */
  export type LaptopFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Laptop
     */
    select?: LaptopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Laptop
     */
    omit?: LaptopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaptopInclude<ExtArgs> | null
    /**
     * Filter, which Laptop to fetch.
     */
    where?: LaptopWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Laptops to fetch.
     */
    orderBy?: LaptopOrderByWithRelationInput | LaptopOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Laptops.
     */
    cursor?: LaptopWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Laptops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Laptops.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Laptops.
     */
    distinct?: LaptopScalarFieldEnum | LaptopScalarFieldEnum[]
  }

  /**
   * Laptop findMany
   */
  export type LaptopFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Laptop
     */
    select?: LaptopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Laptop
     */
    omit?: LaptopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaptopInclude<ExtArgs> | null
    /**
     * Filter, which Laptops to fetch.
     */
    where?: LaptopWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Laptops to fetch.
     */
    orderBy?: LaptopOrderByWithRelationInput | LaptopOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Laptops.
     */
    cursor?: LaptopWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Laptops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Laptops.
     */
    skip?: number
    distinct?: LaptopScalarFieldEnum | LaptopScalarFieldEnum[]
  }

  /**
   * Laptop create
   */
  export type LaptopCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Laptop
     */
    select?: LaptopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Laptop
     */
    omit?: LaptopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaptopInclude<ExtArgs> | null
    /**
     * The data needed to create a Laptop.
     */
    data: XOR<LaptopCreateInput, LaptopUncheckedCreateInput>
  }

  /**
   * Laptop createMany
   */
  export type LaptopCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Laptops.
     */
    data: LaptopCreateManyInput | LaptopCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Laptop createManyAndReturn
   */
  export type LaptopCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Laptop
     */
    select?: LaptopSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Laptop
     */
    omit?: LaptopOmit<ExtArgs> | null
    /**
     * The data used to create many Laptops.
     */
    data: LaptopCreateManyInput | LaptopCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Laptop update
   */
  export type LaptopUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Laptop
     */
    select?: LaptopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Laptop
     */
    omit?: LaptopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaptopInclude<ExtArgs> | null
    /**
     * The data needed to update a Laptop.
     */
    data: XOR<LaptopUpdateInput, LaptopUncheckedUpdateInput>
    /**
     * Choose, which Laptop to update.
     */
    where: LaptopWhereUniqueInput
  }

  /**
   * Laptop updateMany
   */
  export type LaptopUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Laptops.
     */
    data: XOR<LaptopUpdateManyMutationInput, LaptopUncheckedUpdateManyInput>
    /**
     * Filter which Laptops to update
     */
    where?: LaptopWhereInput
    /**
     * Limit how many Laptops to update.
     */
    limit?: number
  }

  /**
   * Laptop updateManyAndReturn
   */
  export type LaptopUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Laptop
     */
    select?: LaptopSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Laptop
     */
    omit?: LaptopOmit<ExtArgs> | null
    /**
     * The data used to update Laptops.
     */
    data: XOR<LaptopUpdateManyMutationInput, LaptopUncheckedUpdateManyInput>
    /**
     * Filter which Laptops to update
     */
    where?: LaptopWhereInput
    /**
     * Limit how many Laptops to update.
     */
    limit?: number
  }

  /**
   * Laptop upsert
   */
  export type LaptopUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Laptop
     */
    select?: LaptopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Laptop
     */
    omit?: LaptopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaptopInclude<ExtArgs> | null
    /**
     * The filter to search for the Laptop to update in case it exists.
     */
    where: LaptopWhereUniqueInput
    /**
     * In case the Laptop found by the `where` argument doesn't exist, create a new Laptop with this data.
     */
    create: XOR<LaptopCreateInput, LaptopUncheckedCreateInput>
    /**
     * In case the Laptop was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LaptopUpdateInput, LaptopUncheckedUpdateInput>
  }

  /**
   * Laptop delete
   */
  export type LaptopDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Laptop
     */
    select?: LaptopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Laptop
     */
    omit?: LaptopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaptopInclude<ExtArgs> | null
    /**
     * Filter which Laptop to delete.
     */
    where: LaptopWhereUniqueInput
  }

  /**
   * Laptop deleteMany
   */
  export type LaptopDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Laptops to delete
     */
    where?: LaptopWhereInput
    /**
     * Limit how many Laptops to delete.
     */
    limit?: number
  }

  /**
   * Laptop.supportedProfiles
   */
  export type Laptop$supportedProfilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaptopProfile
     */
    select?: LaptopProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaptopProfile
     */
    omit?: LaptopProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaptopProfileInclude<ExtArgs> | null
    where?: LaptopProfileWhereInput
    orderBy?: LaptopProfileOrderByWithRelationInput | LaptopProfileOrderByWithRelationInput[]
    cursor?: LaptopProfileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LaptopProfileScalarFieldEnum | LaptopProfileScalarFieldEnum[]
  }

  /**
   * Laptop.supportedOS
   */
  export type Laptop$supportedOSArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaptopOS
     */
    select?: LaptopOSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaptopOS
     */
    omit?: LaptopOSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaptopOSInclude<ExtArgs> | null
    where?: LaptopOSWhereInput
    orderBy?: LaptopOSOrderByWithRelationInput | LaptopOSOrderByWithRelationInput[]
    cursor?: LaptopOSWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LaptopOSScalarFieldEnum | LaptopOSScalarFieldEnum[]
  }

  /**
   * Laptop.packages
   */
  export type Laptop$packagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageInclude<ExtArgs> | null
    where?: PackageWhereInput
    orderBy?: PackageOrderByWithRelationInput | PackageOrderByWithRelationInput[]
    cursor?: PackageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PackageScalarFieldEnum | PackageScalarFieldEnum[]
  }

  /**
   * Laptop without action
   */
  export type LaptopDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Laptop
     */
    select?: LaptopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Laptop
     */
    omit?: LaptopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaptopInclude<ExtArgs> | null
  }


  /**
   * Model LaptopProfile
   */

  export type AggregateLaptopProfile = {
    _count: LaptopProfileCountAggregateOutputType | null
    _min: LaptopProfileMinAggregateOutputType | null
    _max: LaptopProfileMaxAggregateOutputType | null
  }

  export type LaptopProfileMinAggregateOutputType = {
    laptopId: string | null
    profile: string | null
  }

  export type LaptopProfileMaxAggregateOutputType = {
    laptopId: string | null
    profile: string | null
  }

  export type LaptopProfileCountAggregateOutputType = {
    laptopId: number
    profile: number
    _all: number
  }


  export type LaptopProfileMinAggregateInputType = {
    laptopId?: true
    profile?: true
  }

  export type LaptopProfileMaxAggregateInputType = {
    laptopId?: true
    profile?: true
  }

  export type LaptopProfileCountAggregateInputType = {
    laptopId?: true
    profile?: true
    _all?: true
  }

  export type LaptopProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LaptopProfile to aggregate.
     */
    where?: LaptopProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LaptopProfiles to fetch.
     */
    orderBy?: LaptopProfileOrderByWithRelationInput | LaptopProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LaptopProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LaptopProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LaptopProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LaptopProfiles
    **/
    _count?: true | LaptopProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LaptopProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LaptopProfileMaxAggregateInputType
  }

  export type GetLaptopProfileAggregateType<T extends LaptopProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateLaptopProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLaptopProfile[P]>
      : GetScalarType<T[P], AggregateLaptopProfile[P]>
  }




  export type LaptopProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LaptopProfileWhereInput
    orderBy?: LaptopProfileOrderByWithAggregationInput | LaptopProfileOrderByWithAggregationInput[]
    by: LaptopProfileScalarFieldEnum[] | LaptopProfileScalarFieldEnum
    having?: LaptopProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LaptopProfileCountAggregateInputType | true
    _min?: LaptopProfileMinAggregateInputType
    _max?: LaptopProfileMaxAggregateInputType
  }

  export type LaptopProfileGroupByOutputType = {
    laptopId: string
    profile: string
    _count: LaptopProfileCountAggregateOutputType | null
    _min: LaptopProfileMinAggregateOutputType | null
    _max: LaptopProfileMaxAggregateOutputType | null
  }

  type GetLaptopProfileGroupByPayload<T extends LaptopProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LaptopProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LaptopProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LaptopProfileGroupByOutputType[P]>
            : GetScalarType<T[P], LaptopProfileGroupByOutputType[P]>
        }
      >
    >


  export type LaptopProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    laptopId?: boolean
    profile?: boolean
    laptop?: boolean | LaptopDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["laptopProfile"]>

  export type LaptopProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    laptopId?: boolean
    profile?: boolean
    laptop?: boolean | LaptopDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["laptopProfile"]>

  export type LaptopProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    laptopId?: boolean
    profile?: boolean
    laptop?: boolean | LaptopDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["laptopProfile"]>

  export type LaptopProfileSelectScalar = {
    laptopId?: boolean
    profile?: boolean
  }

  export type LaptopProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"laptopId" | "profile", ExtArgs["result"]["laptopProfile"]>
  export type LaptopProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    laptop?: boolean | LaptopDefaultArgs<ExtArgs>
  }
  export type LaptopProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    laptop?: boolean | LaptopDefaultArgs<ExtArgs>
  }
  export type LaptopProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    laptop?: boolean | LaptopDefaultArgs<ExtArgs>
  }

  export type $LaptopProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LaptopProfile"
    objects: {
      laptop: Prisma.$LaptopPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      laptopId: string
      profile: string
    }, ExtArgs["result"]["laptopProfile"]>
    composites: {}
  }

  type LaptopProfileGetPayload<S extends boolean | null | undefined | LaptopProfileDefaultArgs> = $Result.GetResult<Prisma.$LaptopProfilePayload, S>

  type LaptopProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LaptopProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LaptopProfileCountAggregateInputType | true
    }

  export interface LaptopProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LaptopProfile'], meta: { name: 'LaptopProfile' } }
    /**
     * Find zero or one LaptopProfile that matches the filter.
     * @param {LaptopProfileFindUniqueArgs} args - Arguments to find a LaptopProfile
     * @example
     * // Get one LaptopProfile
     * const laptopProfile = await prisma.laptopProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LaptopProfileFindUniqueArgs>(args: SelectSubset<T, LaptopProfileFindUniqueArgs<ExtArgs>>): Prisma__LaptopProfileClient<$Result.GetResult<Prisma.$LaptopProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LaptopProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LaptopProfileFindUniqueOrThrowArgs} args - Arguments to find a LaptopProfile
     * @example
     * // Get one LaptopProfile
     * const laptopProfile = await prisma.laptopProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LaptopProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, LaptopProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LaptopProfileClient<$Result.GetResult<Prisma.$LaptopProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LaptopProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LaptopProfileFindFirstArgs} args - Arguments to find a LaptopProfile
     * @example
     * // Get one LaptopProfile
     * const laptopProfile = await prisma.laptopProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LaptopProfileFindFirstArgs>(args?: SelectSubset<T, LaptopProfileFindFirstArgs<ExtArgs>>): Prisma__LaptopProfileClient<$Result.GetResult<Prisma.$LaptopProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LaptopProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LaptopProfileFindFirstOrThrowArgs} args - Arguments to find a LaptopProfile
     * @example
     * // Get one LaptopProfile
     * const laptopProfile = await prisma.laptopProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LaptopProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, LaptopProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__LaptopProfileClient<$Result.GetResult<Prisma.$LaptopProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LaptopProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LaptopProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LaptopProfiles
     * const laptopProfiles = await prisma.laptopProfile.findMany()
     * 
     * // Get first 10 LaptopProfiles
     * const laptopProfiles = await prisma.laptopProfile.findMany({ take: 10 })
     * 
     * // Only select the `laptopId`
     * const laptopProfileWithLaptopIdOnly = await prisma.laptopProfile.findMany({ select: { laptopId: true } })
     * 
     */
    findMany<T extends LaptopProfileFindManyArgs>(args?: SelectSubset<T, LaptopProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LaptopProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LaptopProfile.
     * @param {LaptopProfileCreateArgs} args - Arguments to create a LaptopProfile.
     * @example
     * // Create one LaptopProfile
     * const LaptopProfile = await prisma.laptopProfile.create({
     *   data: {
     *     // ... data to create a LaptopProfile
     *   }
     * })
     * 
     */
    create<T extends LaptopProfileCreateArgs>(args: SelectSubset<T, LaptopProfileCreateArgs<ExtArgs>>): Prisma__LaptopProfileClient<$Result.GetResult<Prisma.$LaptopProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LaptopProfiles.
     * @param {LaptopProfileCreateManyArgs} args - Arguments to create many LaptopProfiles.
     * @example
     * // Create many LaptopProfiles
     * const laptopProfile = await prisma.laptopProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LaptopProfileCreateManyArgs>(args?: SelectSubset<T, LaptopProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LaptopProfiles and returns the data saved in the database.
     * @param {LaptopProfileCreateManyAndReturnArgs} args - Arguments to create many LaptopProfiles.
     * @example
     * // Create many LaptopProfiles
     * const laptopProfile = await prisma.laptopProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LaptopProfiles and only return the `laptopId`
     * const laptopProfileWithLaptopIdOnly = await prisma.laptopProfile.createManyAndReturn({
     *   select: { laptopId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LaptopProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, LaptopProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LaptopProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LaptopProfile.
     * @param {LaptopProfileDeleteArgs} args - Arguments to delete one LaptopProfile.
     * @example
     * // Delete one LaptopProfile
     * const LaptopProfile = await prisma.laptopProfile.delete({
     *   where: {
     *     // ... filter to delete one LaptopProfile
     *   }
     * })
     * 
     */
    delete<T extends LaptopProfileDeleteArgs>(args: SelectSubset<T, LaptopProfileDeleteArgs<ExtArgs>>): Prisma__LaptopProfileClient<$Result.GetResult<Prisma.$LaptopProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LaptopProfile.
     * @param {LaptopProfileUpdateArgs} args - Arguments to update one LaptopProfile.
     * @example
     * // Update one LaptopProfile
     * const laptopProfile = await prisma.laptopProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LaptopProfileUpdateArgs>(args: SelectSubset<T, LaptopProfileUpdateArgs<ExtArgs>>): Prisma__LaptopProfileClient<$Result.GetResult<Prisma.$LaptopProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LaptopProfiles.
     * @param {LaptopProfileDeleteManyArgs} args - Arguments to filter LaptopProfiles to delete.
     * @example
     * // Delete a few LaptopProfiles
     * const { count } = await prisma.laptopProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LaptopProfileDeleteManyArgs>(args?: SelectSubset<T, LaptopProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LaptopProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LaptopProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LaptopProfiles
     * const laptopProfile = await prisma.laptopProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LaptopProfileUpdateManyArgs>(args: SelectSubset<T, LaptopProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LaptopProfiles and returns the data updated in the database.
     * @param {LaptopProfileUpdateManyAndReturnArgs} args - Arguments to update many LaptopProfiles.
     * @example
     * // Update many LaptopProfiles
     * const laptopProfile = await prisma.laptopProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LaptopProfiles and only return the `laptopId`
     * const laptopProfileWithLaptopIdOnly = await prisma.laptopProfile.updateManyAndReturn({
     *   select: { laptopId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LaptopProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, LaptopProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LaptopProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LaptopProfile.
     * @param {LaptopProfileUpsertArgs} args - Arguments to update or create a LaptopProfile.
     * @example
     * // Update or create a LaptopProfile
     * const laptopProfile = await prisma.laptopProfile.upsert({
     *   create: {
     *     // ... data to create a LaptopProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LaptopProfile we want to update
     *   }
     * })
     */
    upsert<T extends LaptopProfileUpsertArgs>(args: SelectSubset<T, LaptopProfileUpsertArgs<ExtArgs>>): Prisma__LaptopProfileClient<$Result.GetResult<Prisma.$LaptopProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LaptopProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LaptopProfileCountArgs} args - Arguments to filter LaptopProfiles to count.
     * @example
     * // Count the number of LaptopProfiles
     * const count = await prisma.laptopProfile.count({
     *   where: {
     *     // ... the filter for the LaptopProfiles we want to count
     *   }
     * })
    **/
    count<T extends LaptopProfileCountArgs>(
      args?: Subset<T, LaptopProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LaptopProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LaptopProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LaptopProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LaptopProfileAggregateArgs>(args: Subset<T, LaptopProfileAggregateArgs>): Prisma.PrismaPromise<GetLaptopProfileAggregateType<T>>

    /**
     * Group by LaptopProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LaptopProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LaptopProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LaptopProfileGroupByArgs['orderBy'] }
        : { orderBy?: LaptopProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LaptopProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLaptopProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LaptopProfile model
   */
  readonly fields: LaptopProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LaptopProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LaptopProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    laptop<T extends LaptopDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LaptopDefaultArgs<ExtArgs>>): Prisma__LaptopClient<$Result.GetResult<Prisma.$LaptopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LaptopProfile model
   */
  interface LaptopProfileFieldRefs {
    readonly laptopId: FieldRef<"LaptopProfile", 'String'>
    readonly profile: FieldRef<"LaptopProfile", 'String'>
  }
    

  // Custom InputTypes
  /**
   * LaptopProfile findUnique
   */
  export type LaptopProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaptopProfile
     */
    select?: LaptopProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaptopProfile
     */
    omit?: LaptopProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaptopProfileInclude<ExtArgs> | null
    /**
     * Filter, which LaptopProfile to fetch.
     */
    where: LaptopProfileWhereUniqueInput
  }

  /**
   * LaptopProfile findUniqueOrThrow
   */
  export type LaptopProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaptopProfile
     */
    select?: LaptopProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaptopProfile
     */
    omit?: LaptopProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaptopProfileInclude<ExtArgs> | null
    /**
     * Filter, which LaptopProfile to fetch.
     */
    where: LaptopProfileWhereUniqueInput
  }

  /**
   * LaptopProfile findFirst
   */
  export type LaptopProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaptopProfile
     */
    select?: LaptopProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaptopProfile
     */
    omit?: LaptopProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaptopProfileInclude<ExtArgs> | null
    /**
     * Filter, which LaptopProfile to fetch.
     */
    where?: LaptopProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LaptopProfiles to fetch.
     */
    orderBy?: LaptopProfileOrderByWithRelationInput | LaptopProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LaptopProfiles.
     */
    cursor?: LaptopProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LaptopProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LaptopProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LaptopProfiles.
     */
    distinct?: LaptopProfileScalarFieldEnum | LaptopProfileScalarFieldEnum[]
  }

  /**
   * LaptopProfile findFirstOrThrow
   */
  export type LaptopProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaptopProfile
     */
    select?: LaptopProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaptopProfile
     */
    omit?: LaptopProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaptopProfileInclude<ExtArgs> | null
    /**
     * Filter, which LaptopProfile to fetch.
     */
    where?: LaptopProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LaptopProfiles to fetch.
     */
    orderBy?: LaptopProfileOrderByWithRelationInput | LaptopProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LaptopProfiles.
     */
    cursor?: LaptopProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LaptopProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LaptopProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LaptopProfiles.
     */
    distinct?: LaptopProfileScalarFieldEnum | LaptopProfileScalarFieldEnum[]
  }

  /**
   * LaptopProfile findMany
   */
  export type LaptopProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaptopProfile
     */
    select?: LaptopProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaptopProfile
     */
    omit?: LaptopProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaptopProfileInclude<ExtArgs> | null
    /**
     * Filter, which LaptopProfiles to fetch.
     */
    where?: LaptopProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LaptopProfiles to fetch.
     */
    orderBy?: LaptopProfileOrderByWithRelationInput | LaptopProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LaptopProfiles.
     */
    cursor?: LaptopProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LaptopProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LaptopProfiles.
     */
    skip?: number
    distinct?: LaptopProfileScalarFieldEnum | LaptopProfileScalarFieldEnum[]
  }

  /**
   * LaptopProfile create
   */
  export type LaptopProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaptopProfile
     */
    select?: LaptopProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaptopProfile
     */
    omit?: LaptopProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaptopProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a LaptopProfile.
     */
    data: XOR<LaptopProfileCreateInput, LaptopProfileUncheckedCreateInput>
  }

  /**
   * LaptopProfile createMany
   */
  export type LaptopProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LaptopProfiles.
     */
    data: LaptopProfileCreateManyInput | LaptopProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LaptopProfile createManyAndReturn
   */
  export type LaptopProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaptopProfile
     */
    select?: LaptopProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LaptopProfile
     */
    omit?: LaptopProfileOmit<ExtArgs> | null
    /**
     * The data used to create many LaptopProfiles.
     */
    data: LaptopProfileCreateManyInput | LaptopProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaptopProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LaptopProfile update
   */
  export type LaptopProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaptopProfile
     */
    select?: LaptopProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaptopProfile
     */
    omit?: LaptopProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaptopProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a LaptopProfile.
     */
    data: XOR<LaptopProfileUpdateInput, LaptopProfileUncheckedUpdateInput>
    /**
     * Choose, which LaptopProfile to update.
     */
    where: LaptopProfileWhereUniqueInput
  }

  /**
   * LaptopProfile updateMany
   */
  export type LaptopProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LaptopProfiles.
     */
    data: XOR<LaptopProfileUpdateManyMutationInput, LaptopProfileUncheckedUpdateManyInput>
    /**
     * Filter which LaptopProfiles to update
     */
    where?: LaptopProfileWhereInput
    /**
     * Limit how many LaptopProfiles to update.
     */
    limit?: number
  }

  /**
   * LaptopProfile updateManyAndReturn
   */
  export type LaptopProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaptopProfile
     */
    select?: LaptopProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LaptopProfile
     */
    omit?: LaptopProfileOmit<ExtArgs> | null
    /**
     * The data used to update LaptopProfiles.
     */
    data: XOR<LaptopProfileUpdateManyMutationInput, LaptopProfileUncheckedUpdateManyInput>
    /**
     * Filter which LaptopProfiles to update
     */
    where?: LaptopProfileWhereInput
    /**
     * Limit how many LaptopProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaptopProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LaptopProfile upsert
   */
  export type LaptopProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaptopProfile
     */
    select?: LaptopProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaptopProfile
     */
    omit?: LaptopProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaptopProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the LaptopProfile to update in case it exists.
     */
    where: LaptopProfileWhereUniqueInput
    /**
     * In case the LaptopProfile found by the `where` argument doesn't exist, create a new LaptopProfile with this data.
     */
    create: XOR<LaptopProfileCreateInput, LaptopProfileUncheckedCreateInput>
    /**
     * In case the LaptopProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LaptopProfileUpdateInput, LaptopProfileUncheckedUpdateInput>
  }

  /**
   * LaptopProfile delete
   */
  export type LaptopProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaptopProfile
     */
    select?: LaptopProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaptopProfile
     */
    omit?: LaptopProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaptopProfileInclude<ExtArgs> | null
    /**
     * Filter which LaptopProfile to delete.
     */
    where: LaptopProfileWhereUniqueInput
  }

  /**
   * LaptopProfile deleteMany
   */
  export type LaptopProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LaptopProfiles to delete
     */
    where?: LaptopProfileWhereInput
    /**
     * Limit how many LaptopProfiles to delete.
     */
    limit?: number
  }

  /**
   * LaptopProfile without action
   */
  export type LaptopProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaptopProfile
     */
    select?: LaptopProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaptopProfile
     */
    omit?: LaptopProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaptopProfileInclude<ExtArgs> | null
  }


  /**
   * Model LaptopOS
   */

  export type AggregateLaptopOS = {
    _count: LaptopOSCountAggregateOutputType | null
    _min: LaptopOSMinAggregateOutputType | null
    _max: LaptopOSMaxAggregateOutputType | null
  }

  export type LaptopOSMinAggregateOutputType = {
    laptopId: string | null
    os: string | null
  }

  export type LaptopOSMaxAggregateOutputType = {
    laptopId: string | null
    os: string | null
  }

  export type LaptopOSCountAggregateOutputType = {
    laptopId: number
    os: number
    _all: number
  }


  export type LaptopOSMinAggregateInputType = {
    laptopId?: true
    os?: true
  }

  export type LaptopOSMaxAggregateInputType = {
    laptopId?: true
    os?: true
  }

  export type LaptopOSCountAggregateInputType = {
    laptopId?: true
    os?: true
    _all?: true
  }

  export type LaptopOSAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LaptopOS to aggregate.
     */
    where?: LaptopOSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LaptopOS to fetch.
     */
    orderBy?: LaptopOSOrderByWithRelationInput | LaptopOSOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LaptopOSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LaptopOS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LaptopOS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LaptopOS
    **/
    _count?: true | LaptopOSCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LaptopOSMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LaptopOSMaxAggregateInputType
  }

  export type GetLaptopOSAggregateType<T extends LaptopOSAggregateArgs> = {
        [P in keyof T & keyof AggregateLaptopOS]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLaptopOS[P]>
      : GetScalarType<T[P], AggregateLaptopOS[P]>
  }




  export type LaptopOSGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LaptopOSWhereInput
    orderBy?: LaptopOSOrderByWithAggregationInput | LaptopOSOrderByWithAggregationInput[]
    by: LaptopOSScalarFieldEnum[] | LaptopOSScalarFieldEnum
    having?: LaptopOSScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LaptopOSCountAggregateInputType | true
    _min?: LaptopOSMinAggregateInputType
    _max?: LaptopOSMaxAggregateInputType
  }

  export type LaptopOSGroupByOutputType = {
    laptopId: string
    os: string
    _count: LaptopOSCountAggregateOutputType | null
    _min: LaptopOSMinAggregateOutputType | null
    _max: LaptopOSMaxAggregateOutputType | null
  }

  type GetLaptopOSGroupByPayload<T extends LaptopOSGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LaptopOSGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LaptopOSGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LaptopOSGroupByOutputType[P]>
            : GetScalarType<T[P], LaptopOSGroupByOutputType[P]>
        }
      >
    >


  export type LaptopOSSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    laptopId?: boolean
    os?: boolean
    laptop?: boolean | LaptopDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["laptopOS"]>

  export type LaptopOSSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    laptopId?: boolean
    os?: boolean
    laptop?: boolean | LaptopDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["laptopOS"]>

  export type LaptopOSSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    laptopId?: boolean
    os?: boolean
    laptop?: boolean | LaptopDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["laptopOS"]>

  export type LaptopOSSelectScalar = {
    laptopId?: boolean
    os?: boolean
  }

  export type LaptopOSOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"laptopId" | "os", ExtArgs["result"]["laptopOS"]>
  export type LaptopOSInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    laptop?: boolean | LaptopDefaultArgs<ExtArgs>
  }
  export type LaptopOSIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    laptop?: boolean | LaptopDefaultArgs<ExtArgs>
  }
  export type LaptopOSIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    laptop?: boolean | LaptopDefaultArgs<ExtArgs>
  }

  export type $LaptopOSPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LaptopOS"
    objects: {
      laptop: Prisma.$LaptopPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      laptopId: string
      os: string
    }, ExtArgs["result"]["laptopOS"]>
    composites: {}
  }

  type LaptopOSGetPayload<S extends boolean | null | undefined | LaptopOSDefaultArgs> = $Result.GetResult<Prisma.$LaptopOSPayload, S>

  type LaptopOSCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LaptopOSFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LaptopOSCountAggregateInputType | true
    }

  export interface LaptopOSDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LaptopOS'], meta: { name: 'LaptopOS' } }
    /**
     * Find zero or one LaptopOS that matches the filter.
     * @param {LaptopOSFindUniqueArgs} args - Arguments to find a LaptopOS
     * @example
     * // Get one LaptopOS
     * const laptopOS = await prisma.laptopOS.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LaptopOSFindUniqueArgs>(args: SelectSubset<T, LaptopOSFindUniqueArgs<ExtArgs>>): Prisma__LaptopOSClient<$Result.GetResult<Prisma.$LaptopOSPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LaptopOS that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LaptopOSFindUniqueOrThrowArgs} args - Arguments to find a LaptopOS
     * @example
     * // Get one LaptopOS
     * const laptopOS = await prisma.laptopOS.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LaptopOSFindUniqueOrThrowArgs>(args: SelectSubset<T, LaptopOSFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LaptopOSClient<$Result.GetResult<Prisma.$LaptopOSPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LaptopOS that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LaptopOSFindFirstArgs} args - Arguments to find a LaptopOS
     * @example
     * // Get one LaptopOS
     * const laptopOS = await prisma.laptopOS.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LaptopOSFindFirstArgs>(args?: SelectSubset<T, LaptopOSFindFirstArgs<ExtArgs>>): Prisma__LaptopOSClient<$Result.GetResult<Prisma.$LaptopOSPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LaptopOS that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LaptopOSFindFirstOrThrowArgs} args - Arguments to find a LaptopOS
     * @example
     * // Get one LaptopOS
     * const laptopOS = await prisma.laptopOS.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LaptopOSFindFirstOrThrowArgs>(args?: SelectSubset<T, LaptopOSFindFirstOrThrowArgs<ExtArgs>>): Prisma__LaptopOSClient<$Result.GetResult<Prisma.$LaptopOSPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LaptopOS that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LaptopOSFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LaptopOS
     * const laptopOS = await prisma.laptopOS.findMany()
     * 
     * // Get first 10 LaptopOS
     * const laptopOS = await prisma.laptopOS.findMany({ take: 10 })
     * 
     * // Only select the `laptopId`
     * const laptopOSWithLaptopIdOnly = await prisma.laptopOS.findMany({ select: { laptopId: true } })
     * 
     */
    findMany<T extends LaptopOSFindManyArgs>(args?: SelectSubset<T, LaptopOSFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LaptopOSPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LaptopOS.
     * @param {LaptopOSCreateArgs} args - Arguments to create a LaptopOS.
     * @example
     * // Create one LaptopOS
     * const LaptopOS = await prisma.laptopOS.create({
     *   data: {
     *     // ... data to create a LaptopOS
     *   }
     * })
     * 
     */
    create<T extends LaptopOSCreateArgs>(args: SelectSubset<T, LaptopOSCreateArgs<ExtArgs>>): Prisma__LaptopOSClient<$Result.GetResult<Prisma.$LaptopOSPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LaptopOS.
     * @param {LaptopOSCreateManyArgs} args - Arguments to create many LaptopOS.
     * @example
     * // Create many LaptopOS
     * const laptopOS = await prisma.laptopOS.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LaptopOSCreateManyArgs>(args?: SelectSubset<T, LaptopOSCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LaptopOS and returns the data saved in the database.
     * @param {LaptopOSCreateManyAndReturnArgs} args - Arguments to create many LaptopOS.
     * @example
     * // Create many LaptopOS
     * const laptopOS = await prisma.laptopOS.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LaptopOS and only return the `laptopId`
     * const laptopOSWithLaptopIdOnly = await prisma.laptopOS.createManyAndReturn({
     *   select: { laptopId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LaptopOSCreateManyAndReturnArgs>(args?: SelectSubset<T, LaptopOSCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LaptopOSPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LaptopOS.
     * @param {LaptopOSDeleteArgs} args - Arguments to delete one LaptopOS.
     * @example
     * // Delete one LaptopOS
     * const LaptopOS = await prisma.laptopOS.delete({
     *   where: {
     *     // ... filter to delete one LaptopOS
     *   }
     * })
     * 
     */
    delete<T extends LaptopOSDeleteArgs>(args: SelectSubset<T, LaptopOSDeleteArgs<ExtArgs>>): Prisma__LaptopOSClient<$Result.GetResult<Prisma.$LaptopOSPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LaptopOS.
     * @param {LaptopOSUpdateArgs} args - Arguments to update one LaptopOS.
     * @example
     * // Update one LaptopOS
     * const laptopOS = await prisma.laptopOS.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LaptopOSUpdateArgs>(args: SelectSubset<T, LaptopOSUpdateArgs<ExtArgs>>): Prisma__LaptopOSClient<$Result.GetResult<Prisma.$LaptopOSPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LaptopOS.
     * @param {LaptopOSDeleteManyArgs} args - Arguments to filter LaptopOS to delete.
     * @example
     * // Delete a few LaptopOS
     * const { count } = await prisma.laptopOS.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LaptopOSDeleteManyArgs>(args?: SelectSubset<T, LaptopOSDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LaptopOS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LaptopOSUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LaptopOS
     * const laptopOS = await prisma.laptopOS.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LaptopOSUpdateManyArgs>(args: SelectSubset<T, LaptopOSUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LaptopOS and returns the data updated in the database.
     * @param {LaptopOSUpdateManyAndReturnArgs} args - Arguments to update many LaptopOS.
     * @example
     * // Update many LaptopOS
     * const laptopOS = await prisma.laptopOS.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LaptopOS and only return the `laptopId`
     * const laptopOSWithLaptopIdOnly = await prisma.laptopOS.updateManyAndReturn({
     *   select: { laptopId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LaptopOSUpdateManyAndReturnArgs>(args: SelectSubset<T, LaptopOSUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LaptopOSPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LaptopOS.
     * @param {LaptopOSUpsertArgs} args - Arguments to update or create a LaptopOS.
     * @example
     * // Update or create a LaptopOS
     * const laptopOS = await prisma.laptopOS.upsert({
     *   create: {
     *     // ... data to create a LaptopOS
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LaptopOS we want to update
     *   }
     * })
     */
    upsert<T extends LaptopOSUpsertArgs>(args: SelectSubset<T, LaptopOSUpsertArgs<ExtArgs>>): Prisma__LaptopOSClient<$Result.GetResult<Prisma.$LaptopOSPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LaptopOS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LaptopOSCountArgs} args - Arguments to filter LaptopOS to count.
     * @example
     * // Count the number of LaptopOS
     * const count = await prisma.laptopOS.count({
     *   where: {
     *     // ... the filter for the LaptopOS we want to count
     *   }
     * })
    **/
    count<T extends LaptopOSCountArgs>(
      args?: Subset<T, LaptopOSCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LaptopOSCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LaptopOS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LaptopOSAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LaptopOSAggregateArgs>(args: Subset<T, LaptopOSAggregateArgs>): Prisma.PrismaPromise<GetLaptopOSAggregateType<T>>

    /**
     * Group by LaptopOS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LaptopOSGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LaptopOSGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LaptopOSGroupByArgs['orderBy'] }
        : { orderBy?: LaptopOSGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LaptopOSGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLaptopOSGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LaptopOS model
   */
  readonly fields: LaptopOSFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LaptopOS.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LaptopOSClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    laptop<T extends LaptopDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LaptopDefaultArgs<ExtArgs>>): Prisma__LaptopClient<$Result.GetResult<Prisma.$LaptopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LaptopOS model
   */
  interface LaptopOSFieldRefs {
    readonly laptopId: FieldRef<"LaptopOS", 'String'>
    readonly os: FieldRef<"LaptopOS", 'String'>
  }
    

  // Custom InputTypes
  /**
   * LaptopOS findUnique
   */
  export type LaptopOSFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaptopOS
     */
    select?: LaptopOSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaptopOS
     */
    omit?: LaptopOSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaptopOSInclude<ExtArgs> | null
    /**
     * Filter, which LaptopOS to fetch.
     */
    where: LaptopOSWhereUniqueInput
  }

  /**
   * LaptopOS findUniqueOrThrow
   */
  export type LaptopOSFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaptopOS
     */
    select?: LaptopOSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaptopOS
     */
    omit?: LaptopOSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaptopOSInclude<ExtArgs> | null
    /**
     * Filter, which LaptopOS to fetch.
     */
    where: LaptopOSWhereUniqueInput
  }

  /**
   * LaptopOS findFirst
   */
  export type LaptopOSFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaptopOS
     */
    select?: LaptopOSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaptopOS
     */
    omit?: LaptopOSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaptopOSInclude<ExtArgs> | null
    /**
     * Filter, which LaptopOS to fetch.
     */
    where?: LaptopOSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LaptopOS to fetch.
     */
    orderBy?: LaptopOSOrderByWithRelationInput | LaptopOSOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LaptopOS.
     */
    cursor?: LaptopOSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LaptopOS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LaptopOS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LaptopOS.
     */
    distinct?: LaptopOSScalarFieldEnum | LaptopOSScalarFieldEnum[]
  }

  /**
   * LaptopOS findFirstOrThrow
   */
  export type LaptopOSFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaptopOS
     */
    select?: LaptopOSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaptopOS
     */
    omit?: LaptopOSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaptopOSInclude<ExtArgs> | null
    /**
     * Filter, which LaptopOS to fetch.
     */
    where?: LaptopOSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LaptopOS to fetch.
     */
    orderBy?: LaptopOSOrderByWithRelationInput | LaptopOSOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LaptopOS.
     */
    cursor?: LaptopOSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LaptopOS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LaptopOS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LaptopOS.
     */
    distinct?: LaptopOSScalarFieldEnum | LaptopOSScalarFieldEnum[]
  }

  /**
   * LaptopOS findMany
   */
  export type LaptopOSFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaptopOS
     */
    select?: LaptopOSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaptopOS
     */
    omit?: LaptopOSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaptopOSInclude<ExtArgs> | null
    /**
     * Filter, which LaptopOS to fetch.
     */
    where?: LaptopOSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LaptopOS to fetch.
     */
    orderBy?: LaptopOSOrderByWithRelationInput | LaptopOSOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LaptopOS.
     */
    cursor?: LaptopOSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LaptopOS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LaptopOS.
     */
    skip?: number
    distinct?: LaptopOSScalarFieldEnum | LaptopOSScalarFieldEnum[]
  }

  /**
   * LaptopOS create
   */
  export type LaptopOSCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaptopOS
     */
    select?: LaptopOSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaptopOS
     */
    omit?: LaptopOSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaptopOSInclude<ExtArgs> | null
    /**
     * The data needed to create a LaptopOS.
     */
    data: XOR<LaptopOSCreateInput, LaptopOSUncheckedCreateInput>
  }

  /**
   * LaptopOS createMany
   */
  export type LaptopOSCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LaptopOS.
     */
    data: LaptopOSCreateManyInput | LaptopOSCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LaptopOS createManyAndReturn
   */
  export type LaptopOSCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaptopOS
     */
    select?: LaptopOSSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LaptopOS
     */
    omit?: LaptopOSOmit<ExtArgs> | null
    /**
     * The data used to create many LaptopOS.
     */
    data: LaptopOSCreateManyInput | LaptopOSCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaptopOSIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LaptopOS update
   */
  export type LaptopOSUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaptopOS
     */
    select?: LaptopOSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaptopOS
     */
    omit?: LaptopOSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaptopOSInclude<ExtArgs> | null
    /**
     * The data needed to update a LaptopOS.
     */
    data: XOR<LaptopOSUpdateInput, LaptopOSUncheckedUpdateInput>
    /**
     * Choose, which LaptopOS to update.
     */
    where: LaptopOSWhereUniqueInput
  }

  /**
   * LaptopOS updateMany
   */
  export type LaptopOSUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LaptopOS.
     */
    data: XOR<LaptopOSUpdateManyMutationInput, LaptopOSUncheckedUpdateManyInput>
    /**
     * Filter which LaptopOS to update
     */
    where?: LaptopOSWhereInput
    /**
     * Limit how many LaptopOS to update.
     */
    limit?: number
  }

  /**
   * LaptopOS updateManyAndReturn
   */
  export type LaptopOSUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaptopOS
     */
    select?: LaptopOSSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LaptopOS
     */
    omit?: LaptopOSOmit<ExtArgs> | null
    /**
     * The data used to update LaptopOS.
     */
    data: XOR<LaptopOSUpdateManyMutationInput, LaptopOSUncheckedUpdateManyInput>
    /**
     * Filter which LaptopOS to update
     */
    where?: LaptopOSWhereInput
    /**
     * Limit how many LaptopOS to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaptopOSIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LaptopOS upsert
   */
  export type LaptopOSUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaptopOS
     */
    select?: LaptopOSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaptopOS
     */
    omit?: LaptopOSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaptopOSInclude<ExtArgs> | null
    /**
     * The filter to search for the LaptopOS to update in case it exists.
     */
    where: LaptopOSWhereUniqueInput
    /**
     * In case the LaptopOS found by the `where` argument doesn't exist, create a new LaptopOS with this data.
     */
    create: XOR<LaptopOSCreateInput, LaptopOSUncheckedCreateInput>
    /**
     * In case the LaptopOS was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LaptopOSUpdateInput, LaptopOSUncheckedUpdateInput>
  }

  /**
   * LaptopOS delete
   */
  export type LaptopOSDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaptopOS
     */
    select?: LaptopOSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaptopOS
     */
    omit?: LaptopOSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaptopOSInclude<ExtArgs> | null
    /**
     * Filter which LaptopOS to delete.
     */
    where: LaptopOSWhereUniqueInput
  }

  /**
   * LaptopOS deleteMany
   */
  export type LaptopOSDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LaptopOS to delete
     */
    where?: LaptopOSWhereInput
    /**
     * Limit how many LaptopOS to delete.
     */
    limit?: number
  }

  /**
   * LaptopOS without action
   */
  export type LaptopOSDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaptopOS
     */
    select?: LaptopOSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LaptopOS
     */
    omit?: LaptopOSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaptopOSInclude<ExtArgs> | null
  }


  /**
   * Model Accessory
   */

  export type AggregateAccessory = {
    _count: AccessoryCountAggregateOutputType | null
    _avg: AccessoryAvgAggregateOutputType | null
    _sum: AccessorySumAggregateOutputType | null
    _min: AccessoryMinAggregateOutputType | null
    _max: AccessoryMaxAggregateOutputType | null
  }

  export type AccessoryAvgAggregateOutputType = {
    price: Decimal | null
  }

  export type AccessorySumAggregateOutputType = {
    price: Decimal | null
  }

  export type AccessoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    type: string | null
    brand: string | null
    price: Decimal | null
    priceType: string | null
    image: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccessoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    type: string | null
    brand: string | null
    price: Decimal | null
    priceType: string | null
    image: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccessoryCountAggregateOutputType = {
    id: number
    name: number
    type: number
    brand: number
    price: number
    priceType: number
    image: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccessoryAvgAggregateInputType = {
    price?: true
  }

  export type AccessorySumAggregateInputType = {
    price?: true
  }

  export type AccessoryMinAggregateInputType = {
    id?: true
    name?: true
    type?: true
    brand?: true
    price?: true
    priceType?: true
    image?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccessoryMaxAggregateInputType = {
    id?: true
    name?: true
    type?: true
    brand?: true
    price?: true
    priceType?: true
    image?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccessoryCountAggregateInputType = {
    id?: true
    name?: true
    type?: true
    brand?: true
    price?: true
    priceType?: true
    image?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccessoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accessory to aggregate.
     */
    where?: AccessoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accessories to fetch.
     */
    orderBy?: AccessoryOrderByWithRelationInput | AccessoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccessoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accessories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accessories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accessories
    **/
    _count?: true | AccessoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccessoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccessorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccessoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccessoryMaxAggregateInputType
  }

  export type GetAccessoryAggregateType<T extends AccessoryAggregateArgs> = {
        [P in keyof T & keyof AggregateAccessory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccessory[P]>
      : GetScalarType<T[P], AggregateAccessory[P]>
  }




  export type AccessoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccessoryWhereInput
    orderBy?: AccessoryOrderByWithAggregationInput | AccessoryOrderByWithAggregationInput[]
    by: AccessoryScalarFieldEnum[] | AccessoryScalarFieldEnum
    having?: AccessoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccessoryCountAggregateInputType | true
    _avg?: AccessoryAvgAggregateInputType
    _sum?: AccessorySumAggregateInputType
    _min?: AccessoryMinAggregateInputType
    _max?: AccessoryMaxAggregateInputType
  }

  export type AccessoryGroupByOutputType = {
    id: string
    name: string
    type: string
    brand: string
    price: Decimal
    priceType: string
    image: string | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: AccessoryCountAggregateOutputType | null
    _avg: AccessoryAvgAggregateOutputType | null
    _sum: AccessorySumAggregateOutputType | null
    _min: AccessoryMinAggregateOutputType | null
    _max: AccessoryMaxAggregateOutputType | null
  }

  type GetAccessoryGroupByPayload<T extends AccessoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccessoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccessoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccessoryGroupByOutputType[P]>
            : GetScalarType<T[P], AccessoryGroupByOutputType[P]>
        }
      >
    >


  export type AccessorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    brand?: boolean
    price?: boolean
    priceType?: boolean
    image?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    packageAccessories?: boolean | Accessory$packageAccessoriesArgs<ExtArgs>
    _count?: boolean | AccessoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["accessory"]>

  export type AccessorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    brand?: boolean
    price?: boolean
    priceType?: boolean
    image?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["accessory"]>

  export type AccessorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    brand?: boolean
    price?: boolean
    priceType?: boolean
    image?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["accessory"]>

  export type AccessorySelectScalar = {
    id?: boolean
    name?: boolean
    type?: boolean
    brand?: boolean
    price?: boolean
    priceType?: boolean
    image?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AccessoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "type" | "brand" | "price" | "priceType" | "image" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["accessory"]>
  export type AccessoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    packageAccessories?: boolean | Accessory$packageAccessoriesArgs<ExtArgs>
    _count?: boolean | AccessoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AccessoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AccessoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AccessoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Accessory"
    objects: {
      packageAccessories: Prisma.$PackageAccessoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      type: string
      brand: string
      price: Prisma.Decimal
      priceType: string
      image: string | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["accessory"]>
    composites: {}
  }

  type AccessoryGetPayload<S extends boolean | null | undefined | AccessoryDefaultArgs> = $Result.GetResult<Prisma.$AccessoryPayload, S>

  type AccessoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccessoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccessoryCountAggregateInputType | true
    }

  export interface AccessoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Accessory'], meta: { name: 'Accessory' } }
    /**
     * Find zero or one Accessory that matches the filter.
     * @param {AccessoryFindUniqueArgs} args - Arguments to find a Accessory
     * @example
     * // Get one Accessory
     * const accessory = await prisma.accessory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccessoryFindUniqueArgs>(args: SelectSubset<T, AccessoryFindUniqueArgs<ExtArgs>>): Prisma__AccessoryClient<$Result.GetResult<Prisma.$AccessoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Accessory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccessoryFindUniqueOrThrowArgs} args - Arguments to find a Accessory
     * @example
     * // Get one Accessory
     * const accessory = await prisma.accessory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccessoryFindUniqueOrThrowArgs>(args: SelectSubset<T, AccessoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccessoryClient<$Result.GetResult<Prisma.$AccessoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Accessory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessoryFindFirstArgs} args - Arguments to find a Accessory
     * @example
     * // Get one Accessory
     * const accessory = await prisma.accessory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccessoryFindFirstArgs>(args?: SelectSubset<T, AccessoryFindFirstArgs<ExtArgs>>): Prisma__AccessoryClient<$Result.GetResult<Prisma.$AccessoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Accessory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessoryFindFirstOrThrowArgs} args - Arguments to find a Accessory
     * @example
     * // Get one Accessory
     * const accessory = await prisma.accessory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccessoryFindFirstOrThrowArgs>(args?: SelectSubset<T, AccessoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccessoryClient<$Result.GetResult<Prisma.$AccessoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accessories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accessories
     * const accessories = await prisma.accessory.findMany()
     * 
     * // Get first 10 Accessories
     * const accessories = await prisma.accessory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accessoryWithIdOnly = await prisma.accessory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccessoryFindManyArgs>(args?: SelectSubset<T, AccessoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccessoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Accessory.
     * @param {AccessoryCreateArgs} args - Arguments to create a Accessory.
     * @example
     * // Create one Accessory
     * const Accessory = await prisma.accessory.create({
     *   data: {
     *     // ... data to create a Accessory
     *   }
     * })
     * 
     */
    create<T extends AccessoryCreateArgs>(args: SelectSubset<T, AccessoryCreateArgs<ExtArgs>>): Prisma__AccessoryClient<$Result.GetResult<Prisma.$AccessoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accessories.
     * @param {AccessoryCreateManyArgs} args - Arguments to create many Accessories.
     * @example
     * // Create many Accessories
     * const accessory = await prisma.accessory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccessoryCreateManyArgs>(args?: SelectSubset<T, AccessoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accessories and returns the data saved in the database.
     * @param {AccessoryCreateManyAndReturnArgs} args - Arguments to create many Accessories.
     * @example
     * // Create many Accessories
     * const accessory = await prisma.accessory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accessories and only return the `id`
     * const accessoryWithIdOnly = await prisma.accessory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccessoryCreateManyAndReturnArgs>(args?: SelectSubset<T, AccessoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccessoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Accessory.
     * @param {AccessoryDeleteArgs} args - Arguments to delete one Accessory.
     * @example
     * // Delete one Accessory
     * const Accessory = await prisma.accessory.delete({
     *   where: {
     *     // ... filter to delete one Accessory
     *   }
     * })
     * 
     */
    delete<T extends AccessoryDeleteArgs>(args: SelectSubset<T, AccessoryDeleteArgs<ExtArgs>>): Prisma__AccessoryClient<$Result.GetResult<Prisma.$AccessoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Accessory.
     * @param {AccessoryUpdateArgs} args - Arguments to update one Accessory.
     * @example
     * // Update one Accessory
     * const accessory = await prisma.accessory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccessoryUpdateArgs>(args: SelectSubset<T, AccessoryUpdateArgs<ExtArgs>>): Prisma__AccessoryClient<$Result.GetResult<Prisma.$AccessoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accessories.
     * @param {AccessoryDeleteManyArgs} args - Arguments to filter Accessories to delete.
     * @example
     * // Delete a few Accessories
     * const { count } = await prisma.accessory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccessoryDeleteManyArgs>(args?: SelectSubset<T, AccessoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accessories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accessories
     * const accessory = await prisma.accessory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccessoryUpdateManyArgs>(args: SelectSubset<T, AccessoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accessories and returns the data updated in the database.
     * @param {AccessoryUpdateManyAndReturnArgs} args - Arguments to update many Accessories.
     * @example
     * // Update many Accessories
     * const accessory = await prisma.accessory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accessories and only return the `id`
     * const accessoryWithIdOnly = await prisma.accessory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccessoryUpdateManyAndReturnArgs>(args: SelectSubset<T, AccessoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccessoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Accessory.
     * @param {AccessoryUpsertArgs} args - Arguments to update or create a Accessory.
     * @example
     * // Update or create a Accessory
     * const accessory = await prisma.accessory.upsert({
     *   create: {
     *     // ... data to create a Accessory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Accessory we want to update
     *   }
     * })
     */
    upsert<T extends AccessoryUpsertArgs>(args: SelectSubset<T, AccessoryUpsertArgs<ExtArgs>>): Prisma__AccessoryClient<$Result.GetResult<Prisma.$AccessoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accessories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessoryCountArgs} args - Arguments to filter Accessories to count.
     * @example
     * // Count the number of Accessories
     * const count = await prisma.accessory.count({
     *   where: {
     *     // ... the filter for the Accessories we want to count
     *   }
     * })
    **/
    count<T extends AccessoryCountArgs>(
      args?: Subset<T, AccessoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccessoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Accessory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccessoryAggregateArgs>(args: Subset<T, AccessoryAggregateArgs>): Prisma.PrismaPromise<GetAccessoryAggregateType<T>>

    /**
     * Group by Accessory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccessoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccessoryGroupByArgs['orderBy'] }
        : { orderBy?: AccessoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccessoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccessoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Accessory model
   */
  readonly fields: AccessoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Accessory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccessoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    packageAccessories<T extends Accessory$packageAccessoriesArgs<ExtArgs> = {}>(args?: Subset<T, Accessory$packageAccessoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PackageAccessoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Accessory model
   */
  interface AccessoryFieldRefs {
    readonly id: FieldRef<"Accessory", 'String'>
    readonly name: FieldRef<"Accessory", 'String'>
    readonly type: FieldRef<"Accessory", 'String'>
    readonly brand: FieldRef<"Accessory", 'String'>
    readonly price: FieldRef<"Accessory", 'Decimal'>
    readonly priceType: FieldRef<"Accessory", 'String'>
    readonly image: FieldRef<"Accessory", 'String'>
    readonly notes: FieldRef<"Accessory", 'String'>
    readonly createdAt: FieldRef<"Accessory", 'DateTime'>
    readonly updatedAt: FieldRef<"Accessory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Accessory findUnique
   */
  export type AccessoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Accessory
     */
    select?: AccessorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Accessory
     */
    omit?: AccessoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessoryInclude<ExtArgs> | null
    /**
     * Filter, which Accessory to fetch.
     */
    where: AccessoryWhereUniqueInput
  }

  /**
   * Accessory findUniqueOrThrow
   */
  export type AccessoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Accessory
     */
    select?: AccessorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Accessory
     */
    omit?: AccessoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessoryInclude<ExtArgs> | null
    /**
     * Filter, which Accessory to fetch.
     */
    where: AccessoryWhereUniqueInput
  }

  /**
   * Accessory findFirst
   */
  export type AccessoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Accessory
     */
    select?: AccessorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Accessory
     */
    omit?: AccessoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessoryInclude<ExtArgs> | null
    /**
     * Filter, which Accessory to fetch.
     */
    where?: AccessoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accessories to fetch.
     */
    orderBy?: AccessoryOrderByWithRelationInput | AccessoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accessories.
     */
    cursor?: AccessoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accessories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accessories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accessories.
     */
    distinct?: AccessoryScalarFieldEnum | AccessoryScalarFieldEnum[]
  }

  /**
   * Accessory findFirstOrThrow
   */
  export type AccessoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Accessory
     */
    select?: AccessorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Accessory
     */
    omit?: AccessoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessoryInclude<ExtArgs> | null
    /**
     * Filter, which Accessory to fetch.
     */
    where?: AccessoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accessories to fetch.
     */
    orderBy?: AccessoryOrderByWithRelationInput | AccessoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accessories.
     */
    cursor?: AccessoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accessories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accessories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accessories.
     */
    distinct?: AccessoryScalarFieldEnum | AccessoryScalarFieldEnum[]
  }

  /**
   * Accessory findMany
   */
  export type AccessoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Accessory
     */
    select?: AccessorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Accessory
     */
    omit?: AccessoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessoryInclude<ExtArgs> | null
    /**
     * Filter, which Accessories to fetch.
     */
    where?: AccessoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accessories to fetch.
     */
    orderBy?: AccessoryOrderByWithRelationInput | AccessoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accessories.
     */
    cursor?: AccessoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accessories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accessories.
     */
    skip?: number
    distinct?: AccessoryScalarFieldEnum | AccessoryScalarFieldEnum[]
  }

  /**
   * Accessory create
   */
  export type AccessoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Accessory
     */
    select?: AccessorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Accessory
     */
    omit?: AccessoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Accessory.
     */
    data: XOR<AccessoryCreateInput, AccessoryUncheckedCreateInput>
  }

  /**
   * Accessory createMany
   */
  export type AccessoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accessories.
     */
    data: AccessoryCreateManyInput | AccessoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Accessory createManyAndReturn
   */
  export type AccessoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Accessory
     */
    select?: AccessorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Accessory
     */
    omit?: AccessoryOmit<ExtArgs> | null
    /**
     * The data used to create many Accessories.
     */
    data: AccessoryCreateManyInput | AccessoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Accessory update
   */
  export type AccessoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Accessory
     */
    select?: AccessorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Accessory
     */
    omit?: AccessoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Accessory.
     */
    data: XOR<AccessoryUpdateInput, AccessoryUncheckedUpdateInput>
    /**
     * Choose, which Accessory to update.
     */
    where: AccessoryWhereUniqueInput
  }

  /**
   * Accessory updateMany
   */
  export type AccessoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accessories.
     */
    data: XOR<AccessoryUpdateManyMutationInput, AccessoryUncheckedUpdateManyInput>
    /**
     * Filter which Accessories to update
     */
    where?: AccessoryWhereInput
    /**
     * Limit how many Accessories to update.
     */
    limit?: number
  }

  /**
   * Accessory updateManyAndReturn
   */
  export type AccessoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Accessory
     */
    select?: AccessorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Accessory
     */
    omit?: AccessoryOmit<ExtArgs> | null
    /**
     * The data used to update Accessories.
     */
    data: XOR<AccessoryUpdateManyMutationInput, AccessoryUncheckedUpdateManyInput>
    /**
     * Filter which Accessories to update
     */
    where?: AccessoryWhereInput
    /**
     * Limit how many Accessories to update.
     */
    limit?: number
  }

  /**
   * Accessory upsert
   */
  export type AccessoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Accessory
     */
    select?: AccessorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Accessory
     */
    omit?: AccessoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Accessory to update in case it exists.
     */
    where: AccessoryWhereUniqueInput
    /**
     * In case the Accessory found by the `where` argument doesn't exist, create a new Accessory with this data.
     */
    create: XOR<AccessoryCreateInput, AccessoryUncheckedCreateInput>
    /**
     * In case the Accessory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccessoryUpdateInput, AccessoryUncheckedUpdateInput>
  }

  /**
   * Accessory delete
   */
  export type AccessoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Accessory
     */
    select?: AccessorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Accessory
     */
    omit?: AccessoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessoryInclude<ExtArgs> | null
    /**
     * Filter which Accessory to delete.
     */
    where: AccessoryWhereUniqueInput
  }

  /**
   * Accessory deleteMany
   */
  export type AccessoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accessories to delete
     */
    where?: AccessoryWhereInput
    /**
     * Limit how many Accessories to delete.
     */
    limit?: number
  }

  /**
   * Accessory.packageAccessories
   */
  export type Accessory$packageAccessoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAccessory
     */
    select?: PackageAccessorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PackageAccessory
     */
    omit?: PackageAccessoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageAccessoryInclude<ExtArgs> | null
    where?: PackageAccessoryWhereInput
    orderBy?: PackageAccessoryOrderByWithRelationInput | PackageAccessoryOrderByWithRelationInput[]
    cursor?: PackageAccessoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PackageAccessoryScalarFieldEnum | PackageAccessoryScalarFieldEnum[]
  }

  /**
   * Accessory without action
   */
  export type AccessoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Accessory
     */
    select?: AccessorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Accessory
     */
    omit?: AccessoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessoryInclude<ExtArgs> | null
  }


  /**
   * Model Package
   */

  export type AggregatePackage = {
    _count: PackageCountAggregateOutputType | null
    _min: PackageMinAggregateOutputType | null
    _max: PackageMaxAggregateOutputType | null
  }

  export type PackageMinAggregateOutputType = {
    id: string | null
    name: string | null
    laptopId: string | null
    status: string | null
    priceType: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
    assignedTo: string | null
  }

  export type PackageMaxAggregateOutputType = {
    id: string | null
    name: string | null
    laptopId: string | null
    status: string | null
    priceType: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
    assignedTo: string | null
  }

  export type PackageCountAggregateOutputType = {
    id: number
    name: number
    laptopId: number
    status: number
    priceType: number
    notes: number
    createdAt: number
    updatedAt: number
    assignedTo: number
    _all: number
  }


  export type PackageMinAggregateInputType = {
    id?: true
    name?: true
    laptopId?: true
    status?: true
    priceType?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    assignedTo?: true
  }

  export type PackageMaxAggregateInputType = {
    id?: true
    name?: true
    laptopId?: true
    status?: true
    priceType?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    assignedTo?: true
  }

  export type PackageCountAggregateInputType = {
    id?: true
    name?: true
    laptopId?: true
    status?: true
    priceType?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    assignedTo?: true
    _all?: true
  }

  export type PackageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Package to aggregate.
     */
    where?: PackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Packages to fetch.
     */
    orderBy?: PackageOrderByWithRelationInput | PackageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Packages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Packages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Packages
    **/
    _count?: true | PackageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PackageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PackageMaxAggregateInputType
  }

  export type GetPackageAggregateType<T extends PackageAggregateArgs> = {
        [P in keyof T & keyof AggregatePackage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePackage[P]>
      : GetScalarType<T[P], AggregatePackage[P]>
  }




  export type PackageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PackageWhereInput
    orderBy?: PackageOrderByWithAggregationInput | PackageOrderByWithAggregationInput[]
    by: PackageScalarFieldEnum[] | PackageScalarFieldEnum
    having?: PackageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PackageCountAggregateInputType | true
    _min?: PackageMinAggregateInputType
    _max?: PackageMaxAggregateInputType
  }

  export type PackageGroupByOutputType = {
    id: string
    name: string
    laptopId: string
    status: string
    priceType: string
    notes: string | null
    createdAt: Date
    updatedAt: Date
    assignedTo: string | null
    _count: PackageCountAggregateOutputType | null
    _min: PackageMinAggregateOutputType | null
    _max: PackageMaxAggregateOutputType | null
  }

  type GetPackageGroupByPayload<T extends PackageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PackageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PackageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PackageGroupByOutputType[P]>
            : GetScalarType<T[P], PackageGroupByOutputType[P]>
        }
      >
    >


  export type PackageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    laptopId?: boolean
    status?: boolean
    priceType?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assignedTo?: boolean
    laptop?: boolean | LaptopDefaultArgs<ExtArgs>
    accessories?: boolean | Package$accessoriesArgs<ExtArgs>
    assignments?: boolean | Package$assignmentsArgs<ExtArgs>
    _count?: boolean | PackageCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["package"]>

  export type PackageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    laptopId?: boolean
    status?: boolean
    priceType?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assignedTo?: boolean
    laptop?: boolean | LaptopDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["package"]>

  export type PackageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    laptopId?: boolean
    status?: boolean
    priceType?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assignedTo?: boolean
    laptop?: boolean | LaptopDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["package"]>

  export type PackageSelectScalar = {
    id?: boolean
    name?: boolean
    laptopId?: boolean
    status?: boolean
    priceType?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assignedTo?: boolean
  }

  export type PackageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "laptopId" | "status" | "priceType" | "notes" | "createdAt" | "updatedAt" | "assignedTo", ExtArgs["result"]["package"]>
  export type PackageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    laptop?: boolean | LaptopDefaultArgs<ExtArgs>
    accessories?: boolean | Package$accessoriesArgs<ExtArgs>
    assignments?: boolean | Package$assignmentsArgs<ExtArgs>
    _count?: boolean | PackageCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PackageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    laptop?: boolean | LaptopDefaultArgs<ExtArgs>
  }
  export type PackageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    laptop?: boolean | LaptopDefaultArgs<ExtArgs>
  }

  export type $PackagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Package"
    objects: {
      laptop: Prisma.$LaptopPayload<ExtArgs>
      accessories: Prisma.$PackageAccessoryPayload<ExtArgs>[]
      assignments: Prisma.$PackageAssignmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      laptopId: string
      status: string
      priceType: string
      notes: string | null
      createdAt: Date
      updatedAt: Date
      assignedTo: string | null
    }, ExtArgs["result"]["package"]>
    composites: {}
  }

  type PackageGetPayload<S extends boolean | null | undefined | PackageDefaultArgs> = $Result.GetResult<Prisma.$PackagePayload, S>

  type PackageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PackageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PackageCountAggregateInputType | true
    }

  export interface PackageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Package'], meta: { name: 'Package' } }
    /**
     * Find zero or one Package that matches the filter.
     * @param {PackageFindUniqueArgs} args - Arguments to find a Package
     * @example
     * // Get one Package
     * const package = await prisma.package.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PackageFindUniqueArgs>(args: SelectSubset<T, PackageFindUniqueArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Package that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PackageFindUniqueOrThrowArgs} args - Arguments to find a Package
     * @example
     * // Get one Package
     * const package = await prisma.package.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PackageFindUniqueOrThrowArgs>(args: SelectSubset<T, PackageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Package that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageFindFirstArgs} args - Arguments to find a Package
     * @example
     * // Get one Package
     * const package = await prisma.package.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PackageFindFirstArgs>(args?: SelectSubset<T, PackageFindFirstArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Package that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageFindFirstOrThrowArgs} args - Arguments to find a Package
     * @example
     * // Get one Package
     * const package = await prisma.package.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PackageFindFirstOrThrowArgs>(args?: SelectSubset<T, PackageFindFirstOrThrowArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Packages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Packages
     * const packages = await prisma.package.findMany()
     * 
     * // Get first 10 Packages
     * const packages = await prisma.package.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const packageWithIdOnly = await prisma.package.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PackageFindManyArgs>(args?: SelectSubset<T, PackageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Package.
     * @param {PackageCreateArgs} args - Arguments to create a Package.
     * @example
     * // Create one Package
     * const Package = await prisma.package.create({
     *   data: {
     *     // ... data to create a Package
     *   }
     * })
     * 
     */
    create<T extends PackageCreateArgs>(args: SelectSubset<T, PackageCreateArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Packages.
     * @param {PackageCreateManyArgs} args - Arguments to create many Packages.
     * @example
     * // Create many Packages
     * const package = await prisma.package.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PackageCreateManyArgs>(args?: SelectSubset<T, PackageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Packages and returns the data saved in the database.
     * @param {PackageCreateManyAndReturnArgs} args - Arguments to create many Packages.
     * @example
     * // Create many Packages
     * const package = await prisma.package.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Packages and only return the `id`
     * const packageWithIdOnly = await prisma.package.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PackageCreateManyAndReturnArgs>(args?: SelectSubset<T, PackageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Package.
     * @param {PackageDeleteArgs} args - Arguments to delete one Package.
     * @example
     * // Delete one Package
     * const Package = await prisma.package.delete({
     *   where: {
     *     // ... filter to delete one Package
     *   }
     * })
     * 
     */
    delete<T extends PackageDeleteArgs>(args: SelectSubset<T, PackageDeleteArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Package.
     * @param {PackageUpdateArgs} args - Arguments to update one Package.
     * @example
     * // Update one Package
     * const package = await prisma.package.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PackageUpdateArgs>(args: SelectSubset<T, PackageUpdateArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Packages.
     * @param {PackageDeleteManyArgs} args - Arguments to filter Packages to delete.
     * @example
     * // Delete a few Packages
     * const { count } = await prisma.package.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PackageDeleteManyArgs>(args?: SelectSubset<T, PackageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Packages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Packages
     * const package = await prisma.package.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PackageUpdateManyArgs>(args: SelectSubset<T, PackageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Packages and returns the data updated in the database.
     * @param {PackageUpdateManyAndReturnArgs} args - Arguments to update many Packages.
     * @example
     * // Update many Packages
     * const package = await prisma.package.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Packages and only return the `id`
     * const packageWithIdOnly = await prisma.package.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PackageUpdateManyAndReturnArgs>(args: SelectSubset<T, PackageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Package.
     * @param {PackageUpsertArgs} args - Arguments to update or create a Package.
     * @example
     * // Update or create a Package
     * const package = await prisma.package.upsert({
     *   create: {
     *     // ... data to create a Package
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Package we want to update
     *   }
     * })
     */
    upsert<T extends PackageUpsertArgs>(args: SelectSubset<T, PackageUpsertArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Packages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageCountArgs} args - Arguments to filter Packages to count.
     * @example
     * // Count the number of Packages
     * const count = await prisma.package.count({
     *   where: {
     *     // ... the filter for the Packages we want to count
     *   }
     * })
    **/
    count<T extends PackageCountArgs>(
      args?: Subset<T, PackageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PackageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Package.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PackageAggregateArgs>(args: Subset<T, PackageAggregateArgs>): Prisma.PrismaPromise<GetPackageAggregateType<T>>

    /**
     * Group by Package.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PackageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PackageGroupByArgs['orderBy'] }
        : { orderBy?: PackageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PackageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPackageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Package model
   */
  readonly fields: PackageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Package.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PackageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    laptop<T extends LaptopDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LaptopDefaultArgs<ExtArgs>>): Prisma__LaptopClient<$Result.GetResult<Prisma.$LaptopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    accessories<T extends Package$accessoriesArgs<ExtArgs> = {}>(args?: Subset<T, Package$accessoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PackageAccessoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    assignments<T extends Package$assignmentsArgs<ExtArgs> = {}>(args?: Subset<T, Package$assignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PackageAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Package model
   */
  interface PackageFieldRefs {
    readonly id: FieldRef<"Package", 'String'>
    readonly name: FieldRef<"Package", 'String'>
    readonly laptopId: FieldRef<"Package", 'String'>
    readonly status: FieldRef<"Package", 'String'>
    readonly priceType: FieldRef<"Package", 'String'>
    readonly notes: FieldRef<"Package", 'String'>
    readonly createdAt: FieldRef<"Package", 'DateTime'>
    readonly updatedAt: FieldRef<"Package", 'DateTime'>
    readonly assignedTo: FieldRef<"Package", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Package findUnique
   */
  export type PackageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageInclude<ExtArgs> | null
    /**
     * Filter, which Package to fetch.
     */
    where: PackageWhereUniqueInput
  }

  /**
   * Package findUniqueOrThrow
   */
  export type PackageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageInclude<ExtArgs> | null
    /**
     * Filter, which Package to fetch.
     */
    where: PackageWhereUniqueInput
  }

  /**
   * Package findFirst
   */
  export type PackageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageInclude<ExtArgs> | null
    /**
     * Filter, which Package to fetch.
     */
    where?: PackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Packages to fetch.
     */
    orderBy?: PackageOrderByWithRelationInput | PackageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Packages.
     */
    cursor?: PackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Packages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Packages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Packages.
     */
    distinct?: PackageScalarFieldEnum | PackageScalarFieldEnum[]
  }

  /**
   * Package findFirstOrThrow
   */
  export type PackageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageInclude<ExtArgs> | null
    /**
     * Filter, which Package to fetch.
     */
    where?: PackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Packages to fetch.
     */
    orderBy?: PackageOrderByWithRelationInput | PackageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Packages.
     */
    cursor?: PackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Packages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Packages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Packages.
     */
    distinct?: PackageScalarFieldEnum | PackageScalarFieldEnum[]
  }

  /**
   * Package findMany
   */
  export type PackageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageInclude<ExtArgs> | null
    /**
     * Filter, which Packages to fetch.
     */
    where?: PackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Packages to fetch.
     */
    orderBy?: PackageOrderByWithRelationInput | PackageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Packages.
     */
    cursor?: PackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Packages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Packages.
     */
    skip?: number
    distinct?: PackageScalarFieldEnum | PackageScalarFieldEnum[]
  }

  /**
   * Package create
   */
  export type PackageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageInclude<ExtArgs> | null
    /**
     * The data needed to create a Package.
     */
    data: XOR<PackageCreateInput, PackageUncheckedCreateInput>
  }

  /**
   * Package createMany
   */
  export type PackageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Packages.
     */
    data: PackageCreateManyInput | PackageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Package createManyAndReturn
   */
  export type PackageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * The data used to create many Packages.
     */
    data: PackageCreateManyInput | PackageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Package update
   */
  export type PackageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageInclude<ExtArgs> | null
    /**
     * The data needed to update a Package.
     */
    data: XOR<PackageUpdateInput, PackageUncheckedUpdateInput>
    /**
     * Choose, which Package to update.
     */
    where: PackageWhereUniqueInput
  }

  /**
   * Package updateMany
   */
  export type PackageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Packages.
     */
    data: XOR<PackageUpdateManyMutationInput, PackageUncheckedUpdateManyInput>
    /**
     * Filter which Packages to update
     */
    where?: PackageWhereInput
    /**
     * Limit how many Packages to update.
     */
    limit?: number
  }

  /**
   * Package updateManyAndReturn
   */
  export type PackageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * The data used to update Packages.
     */
    data: XOR<PackageUpdateManyMutationInput, PackageUncheckedUpdateManyInput>
    /**
     * Filter which Packages to update
     */
    where?: PackageWhereInput
    /**
     * Limit how many Packages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Package upsert
   */
  export type PackageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageInclude<ExtArgs> | null
    /**
     * The filter to search for the Package to update in case it exists.
     */
    where: PackageWhereUniqueInput
    /**
     * In case the Package found by the `where` argument doesn't exist, create a new Package with this data.
     */
    create: XOR<PackageCreateInput, PackageUncheckedCreateInput>
    /**
     * In case the Package was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PackageUpdateInput, PackageUncheckedUpdateInput>
  }

  /**
   * Package delete
   */
  export type PackageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageInclude<ExtArgs> | null
    /**
     * Filter which Package to delete.
     */
    where: PackageWhereUniqueInput
  }

  /**
   * Package deleteMany
   */
  export type PackageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Packages to delete
     */
    where?: PackageWhereInput
    /**
     * Limit how many Packages to delete.
     */
    limit?: number
  }

  /**
   * Package.accessories
   */
  export type Package$accessoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAccessory
     */
    select?: PackageAccessorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PackageAccessory
     */
    omit?: PackageAccessoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageAccessoryInclude<ExtArgs> | null
    where?: PackageAccessoryWhereInput
    orderBy?: PackageAccessoryOrderByWithRelationInput | PackageAccessoryOrderByWithRelationInput[]
    cursor?: PackageAccessoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PackageAccessoryScalarFieldEnum | PackageAccessoryScalarFieldEnum[]
  }

  /**
   * Package.assignments
   */
  export type Package$assignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAssignment
     */
    select?: PackageAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PackageAssignment
     */
    omit?: PackageAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageAssignmentInclude<ExtArgs> | null
    where?: PackageAssignmentWhereInput
    orderBy?: PackageAssignmentOrderByWithRelationInput | PackageAssignmentOrderByWithRelationInput[]
    cursor?: PackageAssignmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PackageAssignmentScalarFieldEnum | PackageAssignmentScalarFieldEnum[]
  }

  /**
   * Package without action
   */
  export type PackageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageInclude<ExtArgs> | null
  }


  /**
   * Model PackageAccessory
   */

  export type AggregatePackageAccessory = {
    _count: PackageAccessoryCountAggregateOutputType | null
    _min: PackageAccessoryMinAggregateOutputType | null
    _max: PackageAccessoryMaxAggregateOutputType | null
  }

  export type PackageAccessoryMinAggregateOutputType = {
    packageId: string | null
    accessoryId: string | null
  }

  export type PackageAccessoryMaxAggregateOutputType = {
    packageId: string | null
    accessoryId: string | null
  }

  export type PackageAccessoryCountAggregateOutputType = {
    packageId: number
    accessoryId: number
    _all: number
  }


  export type PackageAccessoryMinAggregateInputType = {
    packageId?: true
    accessoryId?: true
  }

  export type PackageAccessoryMaxAggregateInputType = {
    packageId?: true
    accessoryId?: true
  }

  export type PackageAccessoryCountAggregateInputType = {
    packageId?: true
    accessoryId?: true
    _all?: true
  }

  export type PackageAccessoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PackageAccessory to aggregate.
     */
    where?: PackageAccessoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PackageAccessories to fetch.
     */
    orderBy?: PackageAccessoryOrderByWithRelationInput | PackageAccessoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PackageAccessoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PackageAccessories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PackageAccessories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PackageAccessories
    **/
    _count?: true | PackageAccessoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PackageAccessoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PackageAccessoryMaxAggregateInputType
  }

  export type GetPackageAccessoryAggregateType<T extends PackageAccessoryAggregateArgs> = {
        [P in keyof T & keyof AggregatePackageAccessory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePackageAccessory[P]>
      : GetScalarType<T[P], AggregatePackageAccessory[P]>
  }




  export type PackageAccessoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PackageAccessoryWhereInput
    orderBy?: PackageAccessoryOrderByWithAggregationInput | PackageAccessoryOrderByWithAggregationInput[]
    by: PackageAccessoryScalarFieldEnum[] | PackageAccessoryScalarFieldEnum
    having?: PackageAccessoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PackageAccessoryCountAggregateInputType | true
    _min?: PackageAccessoryMinAggregateInputType
    _max?: PackageAccessoryMaxAggregateInputType
  }

  export type PackageAccessoryGroupByOutputType = {
    packageId: string
    accessoryId: string
    _count: PackageAccessoryCountAggregateOutputType | null
    _min: PackageAccessoryMinAggregateOutputType | null
    _max: PackageAccessoryMaxAggregateOutputType | null
  }

  type GetPackageAccessoryGroupByPayload<T extends PackageAccessoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PackageAccessoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PackageAccessoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PackageAccessoryGroupByOutputType[P]>
            : GetScalarType<T[P], PackageAccessoryGroupByOutputType[P]>
        }
      >
    >


  export type PackageAccessorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    packageId?: boolean
    accessoryId?: boolean
    package?: boolean | PackageDefaultArgs<ExtArgs>
    accessory?: boolean | AccessoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["packageAccessory"]>

  export type PackageAccessorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    packageId?: boolean
    accessoryId?: boolean
    package?: boolean | PackageDefaultArgs<ExtArgs>
    accessory?: boolean | AccessoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["packageAccessory"]>

  export type PackageAccessorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    packageId?: boolean
    accessoryId?: boolean
    package?: boolean | PackageDefaultArgs<ExtArgs>
    accessory?: boolean | AccessoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["packageAccessory"]>

  export type PackageAccessorySelectScalar = {
    packageId?: boolean
    accessoryId?: boolean
  }

  export type PackageAccessoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"packageId" | "accessoryId", ExtArgs["result"]["packageAccessory"]>
  export type PackageAccessoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    package?: boolean | PackageDefaultArgs<ExtArgs>
    accessory?: boolean | AccessoryDefaultArgs<ExtArgs>
  }
  export type PackageAccessoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    package?: boolean | PackageDefaultArgs<ExtArgs>
    accessory?: boolean | AccessoryDefaultArgs<ExtArgs>
  }
  export type PackageAccessoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    package?: boolean | PackageDefaultArgs<ExtArgs>
    accessory?: boolean | AccessoryDefaultArgs<ExtArgs>
  }

  export type $PackageAccessoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PackageAccessory"
    objects: {
      package: Prisma.$PackagePayload<ExtArgs>
      accessory: Prisma.$AccessoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      packageId: string
      accessoryId: string
    }, ExtArgs["result"]["packageAccessory"]>
    composites: {}
  }

  type PackageAccessoryGetPayload<S extends boolean | null | undefined | PackageAccessoryDefaultArgs> = $Result.GetResult<Prisma.$PackageAccessoryPayload, S>

  type PackageAccessoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PackageAccessoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PackageAccessoryCountAggregateInputType | true
    }

  export interface PackageAccessoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PackageAccessory'], meta: { name: 'PackageAccessory' } }
    /**
     * Find zero or one PackageAccessory that matches the filter.
     * @param {PackageAccessoryFindUniqueArgs} args - Arguments to find a PackageAccessory
     * @example
     * // Get one PackageAccessory
     * const packageAccessory = await prisma.packageAccessory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PackageAccessoryFindUniqueArgs>(args: SelectSubset<T, PackageAccessoryFindUniqueArgs<ExtArgs>>): Prisma__PackageAccessoryClient<$Result.GetResult<Prisma.$PackageAccessoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PackageAccessory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PackageAccessoryFindUniqueOrThrowArgs} args - Arguments to find a PackageAccessory
     * @example
     * // Get one PackageAccessory
     * const packageAccessory = await prisma.packageAccessory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PackageAccessoryFindUniqueOrThrowArgs>(args: SelectSubset<T, PackageAccessoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PackageAccessoryClient<$Result.GetResult<Prisma.$PackageAccessoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PackageAccessory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageAccessoryFindFirstArgs} args - Arguments to find a PackageAccessory
     * @example
     * // Get one PackageAccessory
     * const packageAccessory = await prisma.packageAccessory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PackageAccessoryFindFirstArgs>(args?: SelectSubset<T, PackageAccessoryFindFirstArgs<ExtArgs>>): Prisma__PackageAccessoryClient<$Result.GetResult<Prisma.$PackageAccessoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PackageAccessory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageAccessoryFindFirstOrThrowArgs} args - Arguments to find a PackageAccessory
     * @example
     * // Get one PackageAccessory
     * const packageAccessory = await prisma.packageAccessory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PackageAccessoryFindFirstOrThrowArgs>(args?: SelectSubset<T, PackageAccessoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__PackageAccessoryClient<$Result.GetResult<Prisma.$PackageAccessoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PackageAccessories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageAccessoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PackageAccessories
     * const packageAccessories = await prisma.packageAccessory.findMany()
     * 
     * // Get first 10 PackageAccessories
     * const packageAccessories = await prisma.packageAccessory.findMany({ take: 10 })
     * 
     * // Only select the `packageId`
     * const packageAccessoryWithPackageIdOnly = await prisma.packageAccessory.findMany({ select: { packageId: true } })
     * 
     */
    findMany<T extends PackageAccessoryFindManyArgs>(args?: SelectSubset<T, PackageAccessoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PackageAccessoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PackageAccessory.
     * @param {PackageAccessoryCreateArgs} args - Arguments to create a PackageAccessory.
     * @example
     * // Create one PackageAccessory
     * const PackageAccessory = await prisma.packageAccessory.create({
     *   data: {
     *     // ... data to create a PackageAccessory
     *   }
     * })
     * 
     */
    create<T extends PackageAccessoryCreateArgs>(args: SelectSubset<T, PackageAccessoryCreateArgs<ExtArgs>>): Prisma__PackageAccessoryClient<$Result.GetResult<Prisma.$PackageAccessoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PackageAccessories.
     * @param {PackageAccessoryCreateManyArgs} args - Arguments to create many PackageAccessories.
     * @example
     * // Create many PackageAccessories
     * const packageAccessory = await prisma.packageAccessory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PackageAccessoryCreateManyArgs>(args?: SelectSubset<T, PackageAccessoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PackageAccessories and returns the data saved in the database.
     * @param {PackageAccessoryCreateManyAndReturnArgs} args - Arguments to create many PackageAccessories.
     * @example
     * // Create many PackageAccessories
     * const packageAccessory = await prisma.packageAccessory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PackageAccessories and only return the `packageId`
     * const packageAccessoryWithPackageIdOnly = await prisma.packageAccessory.createManyAndReturn({
     *   select: { packageId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PackageAccessoryCreateManyAndReturnArgs>(args?: SelectSubset<T, PackageAccessoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PackageAccessoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PackageAccessory.
     * @param {PackageAccessoryDeleteArgs} args - Arguments to delete one PackageAccessory.
     * @example
     * // Delete one PackageAccessory
     * const PackageAccessory = await prisma.packageAccessory.delete({
     *   where: {
     *     // ... filter to delete one PackageAccessory
     *   }
     * })
     * 
     */
    delete<T extends PackageAccessoryDeleteArgs>(args: SelectSubset<T, PackageAccessoryDeleteArgs<ExtArgs>>): Prisma__PackageAccessoryClient<$Result.GetResult<Prisma.$PackageAccessoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PackageAccessory.
     * @param {PackageAccessoryUpdateArgs} args - Arguments to update one PackageAccessory.
     * @example
     * // Update one PackageAccessory
     * const packageAccessory = await prisma.packageAccessory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PackageAccessoryUpdateArgs>(args: SelectSubset<T, PackageAccessoryUpdateArgs<ExtArgs>>): Prisma__PackageAccessoryClient<$Result.GetResult<Prisma.$PackageAccessoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PackageAccessories.
     * @param {PackageAccessoryDeleteManyArgs} args - Arguments to filter PackageAccessories to delete.
     * @example
     * // Delete a few PackageAccessories
     * const { count } = await prisma.packageAccessory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PackageAccessoryDeleteManyArgs>(args?: SelectSubset<T, PackageAccessoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PackageAccessories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageAccessoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PackageAccessories
     * const packageAccessory = await prisma.packageAccessory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PackageAccessoryUpdateManyArgs>(args: SelectSubset<T, PackageAccessoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PackageAccessories and returns the data updated in the database.
     * @param {PackageAccessoryUpdateManyAndReturnArgs} args - Arguments to update many PackageAccessories.
     * @example
     * // Update many PackageAccessories
     * const packageAccessory = await prisma.packageAccessory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PackageAccessories and only return the `packageId`
     * const packageAccessoryWithPackageIdOnly = await prisma.packageAccessory.updateManyAndReturn({
     *   select: { packageId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PackageAccessoryUpdateManyAndReturnArgs>(args: SelectSubset<T, PackageAccessoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PackageAccessoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PackageAccessory.
     * @param {PackageAccessoryUpsertArgs} args - Arguments to update or create a PackageAccessory.
     * @example
     * // Update or create a PackageAccessory
     * const packageAccessory = await prisma.packageAccessory.upsert({
     *   create: {
     *     // ... data to create a PackageAccessory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PackageAccessory we want to update
     *   }
     * })
     */
    upsert<T extends PackageAccessoryUpsertArgs>(args: SelectSubset<T, PackageAccessoryUpsertArgs<ExtArgs>>): Prisma__PackageAccessoryClient<$Result.GetResult<Prisma.$PackageAccessoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PackageAccessories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageAccessoryCountArgs} args - Arguments to filter PackageAccessories to count.
     * @example
     * // Count the number of PackageAccessories
     * const count = await prisma.packageAccessory.count({
     *   where: {
     *     // ... the filter for the PackageAccessories we want to count
     *   }
     * })
    **/
    count<T extends PackageAccessoryCountArgs>(
      args?: Subset<T, PackageAccessoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PackageAccessoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PackageAccessory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageAccessoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PackageAccessoryAggregateArgs>(args: Subset<T, PackageAccessoryAggregateArgs>): Prisma.PrismaPromise<GetPackageAccessoryAggregateType<T>>

    /**
     * Group by PackageAccessory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageAccessoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PackageAccessoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PackageAccessoryGroupByArgs['orderBy'] }
        : { orderBy?: PackageAccessoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PackageAccessoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPackageAccessoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PackageAccessory model
   */
  readonly fields: PackageAccessoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PackageAccessory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PackageAccessoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    package<T extends PackageDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PackageDefaultArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    accessory<T extends AccessoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AccessoryDefaultArgs<ExtArgs>>): Prisma__AccessoryClient<$Result.GetResult<Prisma.$AccessoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PackageAccessory model
   */
  interface PackageAccessoryFieldRefs {
    readonly packageId: FieldRef<"PackageAccessory", 'String'>
    readonly accessoryId: FieldRef<"PackageAccessory", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PackageAccessory findUnique
   */
  export type PackageAccessoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAccessory
     */
    select?: PackageAccessorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PackageAccessory
     */
    omit?: PackageAccessoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageAccessoryInclude<ExtArgs> | null
    /**
     * Filter, which PackageAccessory to fetch.
     */
    where: PackageAccessoryWhereUniqueInput
  }

  /**
   * PackageAccessory findUniqueOrThrow
   */
  export type PackageAccessoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAccessory
     */
    select?: PackageAccessorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PackageAccessory
     */
    omit?: PackageAccessoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageAccessoryInclude<ExtArgs> | null
    /**
     * Filter, which PackageAccessory to fetch.
     */
    where: PackageAccessoryWhereUniqueInput
  }

  /**
   * PackageAccessory findFirst
   */
  export type PackageAccessoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAccessory
     */
    select?: PackageAccessorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PackageAccessory
     */
    omit?: PackageAccessoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageAccessoryInclude<ExtArgs> | null
    /**
     * Filter, which PackageAccessory to fetch.
     */
    where?: PackageAccessoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PackageAccessories to fetch.
     */
    orderBy?: PackageAccessoryOrderByWithRelationInput | PackageAccessoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PackageAccessories.
     */
    cursor?: PackageAccessoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PackageAccessories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PackageAccessories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PackageAccessories.
     */
    distinct?: PackageAccessoryScalarFieldEnum | PackageAccessoryScalarFieldEnum[]
  }

  /**
   * PackageAccessory findFirstOrThrow
   */
  export type PackageAccessoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAccessory
     */
    select?: PackageAccessorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PackageAccessory
     */
    omit?: PackageAccessoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageAccessoryInclude<ExtArgs> | null
    /**
     * Filter, which PackageAccessory to fetch.
     */
    where?: PackageAccessoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PackageAccessories to fetch.
     */
    orderBy?: PackageAccessoryOrderByWithRelationInput | PackageAccessoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PackageAccessories.
     */
    cursor?: PackageAccessoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PackageAccessories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PackageAccessories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PackageAccessories.
     */
    distinct?: PackageAccessoryScalarFieldEnum | PackageAccessoryScalarFieldEnum[]
  }

  /**
   * PackageAccessory findMany
   */
  export type PackageAccessoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAccessory
     */
    select?: PackageAccessorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PackageAccessory
     */
    omit?: PackageAccessoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageAccessoryInclude<ExtArgs> | null
    /**
     * Filter, which PackageAccessories to fetch.
     */
    where?: PackageAccessoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PackageAccessories to fetch.
     */
    orderBy?: PackageAccessoryOrderByWithRelationInput | PackageAccessoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PackageAccessories.
     */
    cursor?: PackageAccessoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PackageAccessories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PackageAccessories.
     */
    skip?: number
    distinct?: PackageAccessoryScalarFieldEnum | PackageAccessoryScalarFieldEnum[]
  }

  /**
   * PackageAccessory create
   */
  export type PackageAccessoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAccessory
     */
    select?: PackageAccessorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PackageAccessory
     */
    omit?: PackageAccessoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageAccessoryInclude<ExtArgs> | null
    /**
     * The data needed to create a PackageAccessory.
     */
    data: XOR<PackageAccessoryCreateInput, PackageAccessoryUncheckedCreateInput>
  }

  /**
   * PackageAccessory createMany
   */
  export type PackageAccessoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PackageAccessories.
     */
    data: PackageAccessoryCreateManyInput | PackageAccessoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PackageAccessory createManyAndReturn
   */
  export type PackageAccessoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAccessory
     */
    select?: PackageAccessorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PackageAccessory
     */
    omit?: PackageAccessoryOmit<ExtArgs> | null
    /**
     * The data used to create many PackageAccessories.
     */
    data: PackageAccessoryCreateManyInput | PackageAccessoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageAccessoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PackageAccessory update
   */
  export type PackageAccessoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAccessory
     */
    select?: PackageAccessorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PackageAccessory
     */
    omit?: PackageAccessoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageAccessoryInclude<ExtArgs> | null
    /**
     * The data needed to update a PackageAccessory.
     */
    data: XOR<PackageAccessoryUpdateInput, PackageAccessoryUncheckedUpdateInput>
    /**
     * Choose, which PackageAccessory to update.
     */
    where: PackageAccessoryWhereUniqueInput
  }

  /**
   * PackageAccessory updateMany
   */
  export type PackageAccessoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PackageAccessories.
     */
    data: XOR<PackageAccessoryUpdateManyMutationInput, PackageAccessoryUncheckedUpdateManyInput>
    /**
     * Filter which PackageAccessories to update
     */
    where?: PackageAccessoryWhereInput
    /**
     * Limit how many PackageAccessories to update.
     */
    limit?: number
  }

  /**
   * PackageAccessory updateManyAndReturn
   */
  export type PackageAccessoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAccessory
     */
    select?: PackageAccessorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PackageAccessory
     */
    omit?: PackageAccessoryOmit<ExtArgs> | null
    /**
     * The data used to update PackageAccessories.
     */
    data: XOR<PackageAccessoryUpdateManyMutationInput, PackageAccessoryUncheckedUpdateManyInput>
    /**
     * Filter which PackageAccessories to update
     */
    where?: PackageAccessoryWhereInput
    /**
     * Limit how many PackageAccessories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageAccessoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PackageAccessory upsert
   */
  export type PackageAccessoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAccessory
     */
    select?: PackageAccessorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PackageAccessory
     */
    omit?: PackageAccessoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageAccessoryInclude<ExtArgs> | null
    /**
     * The filter to search for the PackageAccessory to update in case it exists.
     */
    where: PackageAccessoryWhereUniqueInput
    /**
     * In case the PackageAccessory found by the `where` argument doesn't exist, create a new PackageAccessory with this data.
     */
    create: XOR<PackageAccessoryCreateInput, PackageAccessoryUncheckedCreateInput>
    /**
     * In case the PackageAccessory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PackageAccessoryUpdateInput, PackageAccessoryUncheckedUpdateInput>
  }

  /**
   * PackageAccessory delete
   */
  export type PackageAccessoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAccessory
     */
    select?: PackageAccessorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PackageAccessory
     */
    omit?: PackageAccessoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageAccessoryInclude<ExtArgs> | null
    /**
     * Filter which PackageAccessory to delete.
     */
    where: PackageAccessoryWhereUniqueInput
  }

  /**
   * PackageAccessory deleteMany
   */
  export type PackageAccessoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PackageAccessories to delete
     */
    where?: PackageAccessoryWhereInput
    /**
     * Limit how many PackageAccessories to delete.
     */
    limit?: number
  }

  /**
   * PackageAccessory without action
   */
  export type PackageAccessoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAccessory
     */
    select?: PackageAccessorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PackageAccessory
     */
    omit?: PackageAccessoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageAccessoryInclude<ExtArgs> | null
  }


  /**
   * Model PackageAssignment
   */

  export type AggregatePackageAssignment = {
    _count: PackageAssignmentCountAggregateOutputType | null
    _min: PackageAssignmentMinAggregateOutputType | null
    _max: PackageAssignmentMaxAggregateOutputType | null
  }

  export type PackageAssignmentMinAggregateOutputType = {
    id: string | null
    packageId: string | null
    personId: string | null
    pcReference: string | null
    assignedAt: Date | null
  }

  export type PackageAssignmentMaxAggregateOutputType = {
    id: string | null
    packageId: string | null
    personId: string | null
    pcReference: string | null
    assignedAt: Date | null
  }

  export type PackageAssignmentCountAggregateOutputType = {
    id: number
    packageId: number
    personId: number
    pcReference: number
    assignedAt: number
    _all: number
  }


  export type PackageAssignmentMinAggregateInputType = {
    id?: true
    packageId?: true
    personId?: true
    pcReference?: true
    assignedAt?: true
  }

  export type PackageAssignmentMaxAggregateInputType = {
    id?: true
    packageId?: true
    personId?: true
    pcReference?: true
    assignedAt?: true
  }

  export type PackageAssignmentCountAggregateInputType = {
    id?: true
    packageId?: true
    personId?: true
    pcReference?: true
    assignedAt?: true
    _all?: true
  }

  export type PackageAssignmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PackageAssignment to aggregate.
     */
    where?: PackageAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PackageAssignments to fetch.
     */
    orderBy?: PackageAssignmentOrderByWithRelationInput | PackageAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PackageAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PackageAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PackageAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PackageAssignments
    **/
    _count?: true | PackageAssignmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PackageAssignmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PackageAssignmentMaxAggregateInputType
  }

  export type GetPackageAssignmentAggregateType<T extends PackageAssignmentAggregateArgs> = {
        [P in keyof T & keyof AggregatePackageAssignment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePackageAssignment[P]>
      : GetScalarType<T[P], AggregatePackageAssignment[P]>
  }




  export type PackageAssignmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PackageAssignmentWhereInput
    orderBy?: PackageAssignmentOrderByWithAggregationInput | PackageAssignmentOrderByWithAggregationInput[]
    by: PackageAssignmentScalarFieldEnum[] | PackageAssignmentScalarFieldEnum
    having?: PackageAssignmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PackageAssignmentCountAggregateInputType | true
    _min?: PackageAssignmentMinAggregateInputType
    _max?: PackageAssignmentMaxAggregateInputType
  }

  export type PackageAssignmentGroupByOutputType = {
    id: string
    packageId: string
    personId: string
    pcReference: string | null
    assignedAt: Date
    _count: PackageAssignmentCountAggregateOutputType | null
    _min: PackageAssignmentMinAggregateOutputType | null
    _max: PackageAssignmentMaxAggregateOutputType | null
  }

  type GetPackageAssignmentGroupByPayload<T extends PackageAssignmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PackageAssignmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PackageAssignmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PackageAssignmentGroupByOutputType[P]>
            : GetScalarType<T[P], PackageAssignmentGroupByOutputType[P]>
        }
      >
    >


  export type PackageAssignmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    packageId?: boolean
    personId?: boolean
    pcReference?: boolean
    assignedAt?: boolean
    package?: boolean | PackageDefaultArgs<ExtArgs>
    person?: boolean | PersonDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["packageAssignment"]>

  export type PackageAssignmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    packageId?: boolean
    personId?: boolean
    pcReference?: boolean
    assignedAt?: boolean
    package?: boolean | PackageDefaultArgs<ExtArgs>
    person?: boolean | PersonDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["packageAssignment"]>

  export type PackageAssignmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    packageId?: boolean
    personId?: boolean
    pcReference?: boolean
    assignedAt?: boolean
    package?: boolean | PackageDefaultArgs<ExtArgs>
    person?: boolean | PersonDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["packageAssignment"]>

  export type PackageAssignmentSelectScalar = {
    id?: boolean
    packageId?: boolean
    personId?: boolean
    pcReference?: boolean
    assignedAt?: boolean
  }

  export type PackageAssignmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "packageId" | "personId" | "pcReference" | "assignedAt", ExtArgs["result"]["packageAssignment"]>
  export type PackageAssignmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    package?: boolean | PackageDefaultArgs<ExtArgs>
    person?: boolean | PersonDefaultArgs<ExtArgs>
  }
  export type PackageAssignmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    package?: boolean | PackageDefaultArgs<ExtArgs>
    person?: boolean | PersonDefaultArgs<ExtArgs>
  }
  export type PackageAssignmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    package?: boolean | PackageDefaultArgs<ExtArgs>
    person?: boolean | PersonDefaultArgs<ExtArgs>
  }

  export type $PackageAssignmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PackageAssignment"
    objects: {
      package: Prisma.$PackagePayload<ExtArgs>
      person: Prisma.$PersonPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      packageId: string
      personId: string
      pcReference: string | null
      assignedAt: Date
    }, ExtArgs["result"]["packageAssignment"]>
    composites: {}
  }

  type PackageAssignmentGetPayload<S extends boolean | null | undefined | PackageAssignmentDefaultArgs> = $Result.GetResult<Prisma.$PackageAssignmentPayload, S>

  type PackageAssignmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PackageAssignmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PackageAssignmentCountAggregateInputType | true
    }

  export interface PackageAssignmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PackageAssignment'], meta: { name: 'PackageAssignment' } }
    /**
     * Find zero or one PackageAssignment that matches the filter.
     * @param {PackageAssignmentFindUniqueArgs} args - Arguments to find a PackageAssignment
     * @example
     * // Get one PackageAssignment
     * const packageAssignment = await prisma.packageAssignment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PackageAssignmentFindUniqueArgs>(args: SelectSubset<T, PackageAssignmentFindUniqueArgs<ExtArgs>>): Prisma__PackageAssignmentClient<$Result.GetResult<Prisma.$PackageAssignmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PackageAssignment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PackageAssignmentFindUniqueOrThrowArgs} args - Arguments to find a PackageAssignment
     * @example
     * // Get one PackageAssignment
     * const packageAssignment = await prisma.packageAssignment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PackageAssignmentFindUniqueOrThrowArgs>(args: SelectSubset<T, PackageAssignmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PackageAssignmentClient<$Result.GetResult<Prisma.$PackageAssignmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PackageAssignment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageAssignmentFindFirstArgs} args - Arguments to find a PackageAssignment
     * @example
     * // Get one PackageAssignment
     * const packageAssignment = await prisma.packageAssignment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PackageAssignmentFindFirstArgs>(args?: SelectSubset<T, PackageAssignmentFindFirstArgs<ExtArgs>>): Prisma__PackageAssignmentClient<$Result.GetResult<Prisma.$PackageAssignmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PackageAssignment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageAssignmentFindFirstOrThrowArgs} args - Arguments to find a PackageAssignment
     * @example
     * // Get one PackageAssignment
     * const packageAssignment = await prisma.packageAssignment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PackageAssignmentFindFirstOrThrowArgs>(args?: SelectSubset<T, PackageAssignmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PackageAssignmentClient<$Result.GetResult<Prisma.$PackageAssignmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PackageAssignments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageAssignmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PackageAssignments
     * const packageAssignments = await prisma.packageAssignment.findMany()
     * 
     * // Get first 10 PackageAssignments
     * const packageAssignments = await prisma.packageAssignment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const packageAssignmentWithIdOnly = await prisma.packageAssignment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PackageAssignmentFindManyArgs>(args?: SelectSubset<T, PackageAssignmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PackageAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PackageAssignment.
     * @param {PackageAssignmentCreateArgs} args - Arguments to create a PackageAssignment.
     * @example
     * // Create one PackageAssignment
     * const PackageAssignment = await prisma.packageAssignment.create({
     *   data: {
     *     // ... data to create a PackageAssignment
     *   }
     * })
     * 
     */
    create<T extends PackageAssignmentCreateArgs>(args: SelectSubset<T, PackageAssignmentCreateArgs<ExtArgs>>): Prisma__PackageAssignmentClient<$Result.GetResult<Prisma.$PackageAssignmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PackageAssignments.
     * @param {PackageAssignmentCreateManyArgs} args - Arguments to create many PackageAssignments.
     * @example
     * // Create many PackageAssignments
     * const packageAssignment = await prisma.packageAssignment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PackageAssignmentCreateManyArgs>(args?: SelectSubset<T, PackageAssignmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PackageAssignments and returns the data saved in the database.
     * @param {PackageAssignmentCreateManyAndReturnArgs} args - Arguments to create many PackageAssignments.
     * @example
     * // Create many PackageAssignments
     * const packageAssignment = await prisma.packageAssignment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PackageAssignments and only return the `id`
     * const packageAssignmentWithIdOnly = await prisma.packageAssignment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PackageAssignmentCreateManyAndReturnArgs>(args?: SelectSubset<T, PackageAssignmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PackageAssignmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PackageAssignment.
     * @param {PackageAssignmentDeleteArgs} args - Arguments to delete one PackageAssignment.
     * @example
     * // Delete one PackageAssignment
     * const PackageAssignment = await prisma.packageAssignment.delete({
     *   where: {
     *     // ... filter to delete one PackageAssignment
     *   }
     * })
     * 
     */
    delete<T extends PackageAssignmentDeleteArgs>(args: SelectSubset<T, PackageAssignmentDeleteArgs<ExtArgs>>): Prisma__PackageAssignmentClient<$Result.GetResult<Prisma.$PackageAssignmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PackageAssignment.
     * @param {PackageAssignmentUpdateArgs} args - Arguments to update one PackageAssignment.
     * @example
     * // Update one PackageAssignment
     * const packageAssignment = await prisma.packageAssignment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PackageAssignmentUpdateArgs>(args: SelectSubset<T, PackageAssignmentUpdateArgs<ExtArgs>>): Prisma__PackageAssignmentClient<$Result.GetResult<Prisma.$PackageAssignmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PackageAssignments.
     * @param {PackageAssignmentDeleteManyArgs} args - Arguments to filter PackageAssignments to delete.
     * @example
     * // Delete a few PackageAssignments
     * const { count } = await prisma.packageAssignment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PackageAssignmentDeleteManyArgs>(args?: SelectSubset<T, PackageAssignmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PackageAssignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageAssignmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PackageAssignments
     * const packageAssignment = await prisma.packageAssignment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PackageAssignmentUpdateManyArgs>(args: SelectSubset<T, PackageAssignmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PackageAssignments and returns the data updated in the database.
     * @param {PackageAssignmentUpdateManyAndReturnArgs} args - Arguments to update many PackageAssignments.
     * @example
     * // Update many PackageAssignments
     * const packageAssignment = await prisma.packageAssignment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PackageAssignments and only return the `id`
     * const packageAssignmentWithIdOnly = await prisma.packageAssignment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PackageAssignmentUpdateManyAndReturnArgs>(args: SelectSubset<T, PackageAssignmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PackageAssignmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PackageAssignment.
     * @param {PackageAssignmentUpsertArgs} args - Arguments to update or create a PackageAssignment.
     * @example
     * // Update or create a PackageAssignment
     * const packageAssignment = await prisma.packageAssignment.upsert({
     *   create: {
     *     // ... data to create a PackageAssignment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PackageAssignment we want to update
     *   }
     * })
     */
    upsert<T extends PackageAssignmentUpsertArgs>(args: SelectSubset<T, PackageAssignmentUpsertArgs<ExtArgs>>): Prisma__PackageAssignmentClient<$Result.GetResult<Prisma.$PackageAssignmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PackageAssignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageAssignmentCountArgs} args - Arguments to filter PackageAssignments to count.
     * @example
     * // Count the number of PackageAssignments
     * const count = await prisma.packageAssignment.count({
     *   where: {
     *     // ... the filter for the PackageAssignments we want to count
     *   }
     * })
    **/
    count<T extends PackageAssignmentCountArgs>(
      args?: Subset<T, PackageAssignmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PackageAssignmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PackageAssignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageAssignmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PackageAssignmentAggregateArgs>(args: Subset<T, PackageAssignmentAggregateArgs>): Prisma.PrismaPromise<GetPackageAssignmentAggregateType<T>>

    /**
     * Group by PackageAssignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageAssignmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PackageAssignmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PackageAssignmentGroupByArgs['orderBy'] }
        : { orderBy?: PackageAssignmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PackageAssignmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPackageAssignmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PackageAssignment model
   */
  readonly fields: PackageAssignmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PackageAssignment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PackageAssignmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    package<T extends PackageDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PackageDefaultArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    person<T extends PersonDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PersonDefaultArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PackageAssignment model
   */
  interface PackageAssignmentFieldRefs {
    readonly id: FieldRef<"PackageAssignment", 'String'>
    readonly packageId: FieldRef<"PackageAssignment", 'String'>
    readonly personId: FieldRef<"PackageAssignment", 'String'>
    readonly pcReference: FieldRef<"PackageAssignment", 'String'>
    readonly assignedAt: FieldRef<"PackageAssignment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PackageAssignment findUnique
   */
  export type PackageAssignmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAssignment
     */
    select?: PackageAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PackageAssignment
     */
    omit?: PackageAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which PackageAssignment to fetch.
     */
    where: PackageAssignmentWhereUniqueInput
  }

  /**
   * PackageAssignment findUniqueOrThrow
   */
  export type PackageAssignmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAssignment
     */
    select?: PackageAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PackageAssignment
     */
    omit?: PackageAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which PackageAssignment to fetch.
     */
    where: PackageAssignmentWhereUniqueInput
  }

  /**
   * PackageAssignment findFirst
   */
  export type PackageAssignmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAssignment
     */
    select?: PackageAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PackageAssignment
     */
    omit?: PackageAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which PackageAssignment to fetch.
     */
    where?: PackageAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PackageAssignments to fetch.
     */
    orderBy?: PackageAssignmentOrderByWithRelationInput | PackageAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PackageAssignments.
     */
    cursor?: PackageAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PackageAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PackageAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PackageAssignments.
     */
    distinct?: PackageAssignmentScalarFieldEnum | PackageAssignmentScalarFieldEnum[]
  }

  /**
   * PackageAssignment findFirstOrThrow
   */
  export type PackageAssignmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAssignment
     */
    select?: PackageAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PackageAssignment
     */
    omit?: PackageAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which PackageAssignment to fetch.
     */
    where?: PackageAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PackageAssignments to fetch.
     */
    orderBy?: PackageAssignmentOrderByWithRelationInput | PackageAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PackageAssignments.
     */
    cursor?: PackageAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PackageAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PackageAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PackageAssignments.
     */
    distinct?: PackageAssignmentScalarFieldEnum | PackageAssignmentScalarFieldEnum[]
  }

  /**
   * PackageAssignment findMany
   */
  export type PackageAssignmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAssignment
     */
    select?: PackageAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PackageAssignment
     */
    omit?: PackageAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which PackageAssignments to fetch.
     */
    where?: PackageAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PackageAssignments to fetch.
     */
    orderBy?: PackageAssignmentOrderByWithRelationInput | PackageAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PackageAssignments.
     */
    cursor?: PackageAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PackageAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PackageAssignments.
     */
    skip?: number
    distinct?: PackageAssignmentScalarFieldEnum | PackageAssignmentScalarFieldEnum[]
  }

  /**
   * PackageAssignment create
   */
  export type PackageAssignmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAssignment
     */
    select?: PackageAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PackageAssignment
     */
    omit?: PackageAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageAssignmentInclude<ExtArgs> | null
    /**
     * The data needed to create a PackageAssignment.
     */
    data: XOR<PackageAssignmentCreateInput, PackageAssignmentUncheckedCreateInput>
  }

  /**
   * PackageAssignment createMany
   */
  export type PackageAssignmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PackageAssignments.
     */
    data: PackageAssignmentCreateManyInput | PackageAssignmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PackageAssignment createManyAndReturn
   */
  export type PackageAssignmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAssignment
     */
    select?: PackageAssignmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PackageAssignment
     */
    omit?: PackageAssignmentOmit<ExtArgs> | null
    /**
     * The data used to create many PackageAssignments.
     */
    data: PackageAssignmentCreateManyInput | PackageAssignmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageAssignmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PackageAssignment update
   */
  export type PackageAssignmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAssignment
     */
    select?: PackageAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PackageAssignment
     */
    omit?: PackageAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageAssignmentInclude<ExtArgs> | null
    /**
     * The data needed to update a PackageAssignment.
     */
    data: XOR<PackageAssignmentUpdateInput, PackageAssignmentUncheckedUpdateInput>
    /**
     * Choose, which PackageAssignment to update.
     */
    where: PackageAssignmentWhereUniqueInput
  }

  /**
   * PackageAssignment updateMany
   */
  export type PackageAssignmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PackageAssignments.
     */
    data: XOR<PackageAssignmentUpdateManyMutationInput, PackageAssignmentUncheckedUpdateManyInput>
    /**
     * Filter which PackageAssignments to update
     */
    where?: PackageAssignmentWhereInput
    /**
     * Limit how many PackageAssignments to update.
     */
    limit?: number
  }

  /**
   * PackageAssignment updateManyAndReturn
   */
  export type PackageAssignmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAssignment
     */
    select?: PackageAssignmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PackageAssignment
     */
    omit?: PackageAssignmentOmit<ExtArgs> | null
    /**
     * The data used to update PackageAssignments.
     */
    data: XOR<PackageAssignmentUpdateManyMutationInput, PackageAssignmentUncheckedUpdateManyInput>
    /**
     * Filter which PackageAssignments to update
     */
    where?: PackageAssignmentWhereInput
    /**
     * Limit how many PackageAssignments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageAssignmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PackageAssignment upsert
   */
  export type PackageAssignmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAssignment
     */
    select?: PackageAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PackageAssignment
     */
    omit?: PackageAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageAssignmentInclude<ExtArgs> | null
    /**
     * The filter to search for the PackageAssignment to update in case it exists.
     */
    where: PackageAssignmentWhereUniqueInput
    /**
     * In case the PackageAssignment found by the `where` argument doesn't exist, create a new PackageAssignment with this data.
     */
    create: XOR<PackageAssignmentCreateInput, PackageAssignmentUncheckedCreateInput>
    /**
     * In case the PackageAssignment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PackageAssignmentUpdateInput, PackageAssignmentUncheckedUpdateInput>
  }

  /**
   * PackageAssignment delete
   */
  export type PackageAssignmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAssignment
     */
    select?: PackageAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PackageAssignment
     */
    omit?: PackageAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageAssignmentInclude<ExtArgs> | null
    /**
     * Filter which PackageAssignment to delete.
     */
    where: PackageAssignmentWhereUniqueInput
  }

  /**
   * PackageAssignment deleteMany
   */
  export type PackageAssignmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PackageAssignments to delete
     */
    where?: PackageAssignmentWhereInput
    /**
     * Limit how many PackageAssignments to delete.
     */
    limit?: number
  }

  /**
   * PackageAssignment without action
   */
  export type PackageAssignmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAssignment
     */
    select?: PackageAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PackageAssignment
     */
    omit?: PackageAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageAssignmentInclude<ExtArgs> | null
  }


  /**
   * Model Tool
   */

  export type AggregateTool = {
    _count: ToolCountAggregateOutputType | null
    _avg: ToolAvgAggregateOutputType | null
    _sum: ToolSumAggregateOutputType | null
    _min: ToolMinAggregateOutputType | null
    _max: ToolMaxAggregateOutputType | null
  }

  export type ToolAvgAggregateOutputType = {
    popularity: number | null
    usageCount: number | null
  }

  export type ToolSumAggregateOutputType = {
    popularity: number | null
    usageCount: number | null
  }

  export type ToolMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    category: string | null
    downloadUrl: string | null
    installationNotes: string | null
    isRequired: boolean | null
    icon: string | null
    popularity: number | null
    usageCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ToolMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    category: string | null
    downloadUrl: string | null
    installationNotes: string | null
    isRequired: boolean | null
    icon: string | null
    popularity: number | null
    usageCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ToolCountAggregateOutputType = {
    id: number
    name: number
    description: number
    category: number
    downloadUrl: number
    installationNotes: number
    isRequired: number
    icon: number
    popularity: number
    usageCount: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ToolAvgAggregateInputType = {
    popularity?: true
    usageCount?: true
  }

  export type ToolSumAggregateInputType = {
    popularity?: true
    usageCount?: true
  }

  export type ToolMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    category?: true
    downloadUrl?: true
    installationNotes?: true
    isRequired?: true
    icon?: true
    popularity?: true
    usageCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ToolMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    category?: true
    downloadUrl?: true
    installationNotes?: true
    isRequired?: true
    icon?: true
    popularity?: true
    usageCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ToolCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    category?: true
    downloadUrl?: true
    installationNotes?: true
    isRequired?: true
    icon?: true
    popularity?: true
    usageCount?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ToolAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tool to aggregate.
     */
    where?: ToolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tools to fetch.
     */
    orderBy?: ToolOrderByWithRelationInput | ToolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ToolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tools
    **/
    _count?: true | ToolCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ToolAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ToolSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ToolMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ToolMaxAggregateInputType
  }

  export type GetToolAggregateType<T extends ToolAggregateArgs> = {
        [P in keyof T & keyof AggregateTool]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTool[P]>
      : GetScalarType<T[P], AggregateTool[P]>
  }




  export type ToolGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ToolWhereInput
    orderBy?: ToolOrderByWithAggregationInput | ToolOrderByWithAggregationInput[]
    by: ToolScalarFieldEnum[] | ToolScalarFieldEnum
    having?: ToolScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ToolCountAggregateInputType | true
    _avg?: ToolAvgAggregateInputType
    _sum?: ToolSumAggregateInputType
    _min?: ToolMinAggregateInputType
    _max?: ToolMaxAggregateInputType
  }

  export type ToolGroupByOutputType = {
    id: string
    name: string
    description: string | null
    category: string
    downloadUrl: string | null
    installationNotes: string | null
    isRequired: boolean
    icon: string | null
    popularity: number | null
    usageCount: number
    createdAt: Date
    updatedAt: Date
    _count: ToolCountAggregateOutputType | null
    _avg: ToolAvgAggregateOutputType | null
    _sum: ToolSumAggregateOutputType | null
    _min: ToolMinAggregateOutputType | null
    _max: ToolMaxAggregateOutputType | null
  }

  type GetToolGroupByPayload<T extends ToolGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ToolGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ToolGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ToolGroupByOutputType[P]>
            : GetScalarType<T[P], ToolGroupByOutputType[P]>
        }
      >
    >


  export type ToolSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    category?: boolean
    downloadUrl?: boolean
    installationNotes?: boolean
    isRequired?: boolean
    icon?: boolean
    popularity?: boolean
    usageCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    alternatives?: boolean | Tool$alternativesArgs<ExtArgs>
    toolkits?: boolean | Tool$toolkitsArgs<ExtArgs>
    _count?: boolean | ToolCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tool"]>

  export type ToolSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    category?: boolean
    downloadUrl?: boolean
    installationNotes?: boolean
    isRequired?: boolean
    icon?: boolean
    popularity?: boolean
    usageCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["tool"]>

  export type ToolSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    category?: boolean
    downloadUrl?: boolean
    installationNotes?: boolean
    isRequired?: boolean
    icon?: boolean
    popularity?: boolean
    usageCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["tool"]>

  export type ToolSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    category?: boolean
    downloadUrl?: boolean
    installationNotes?: boolean
    isRequired?: boolean
    icon?: boolean
    popularity?: boolean
    usageCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ToolOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "category" | "downloadUrl" | "installationNotes" | "isRequired" | "icon" | "popularity" | "usageCount" | "createdAt" | "updatedAt", ExtArgs["result"]["tool"]>
  export type ToolInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alternatives?: boolean | Tool$alternativesArgs<ExtArgs>
    toolkits?: boolean | Tool$toolkitsArgs<ExtArgs>
    _count?: boolean | ToolCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ToolIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ToolIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ToolPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tool"
    objects: {
      alternatives: Prisma.$ToolAlternativePayload<ExtArgs>[]
      toolkits: Prisma.$ToolkitToolPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      category: string
      downloadUrl: string | null
      installationNotes: string | null
      isRequired: boolean
      icon: string | null
      popularity: number | null
      usageCount: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["tool"]>
    composites: {}
  }

  type ToolGetPayload<S extends boolean | null | undefined | ToolDefaultArgs> = $Result.GetResult<Prisma.$ToolPayload, S>

  type ToolCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ToolFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ToolCountAggregateInputType | true
    }

  export interface ToolDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tool'], meta: { name: 'Tool' } }
    /**
     * Find zero or one Tool that matches the filter.
     * @param {ToolFindUniqueArgs} args - Arguments to find a Tool
     * @example
     * // Get one Tool
     * const tool = await prisma.tool.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ToolFindUniqueArgs>(args: SelectSubset<T, ToolFindUniqueArgs<ExtArgs>>): Prisma__ToolClient<$Result.GetResult<Prisma.$ToolPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tool that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ToolFindUniqueOrThrowArgs} args - Arguments to find a Tool
     * @example
     * // Get one Tool
     * const tool = await prisma.tool.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ToolFindUniqueOrThrowArgs>(args: SelectSubset<T, ToolFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ToolClient<$Result.GetResult<Prisma.$ToolPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tool that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToolFindFirstArgs} args - Arguments to find a Tool
     * @example
     * // Get one Tool
     * const tool = await prisma.tool.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ToolFindFirstArgs>(args?: SelectSubset<T, ToolFindFirstArgs<ExtArgs>>): Prisma__ToolClient<$Result.GetResult<Prisma.$ToolPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tool that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToolFindFirstOrThrowArgs} args - Arguments to find a Tool
     * @example
     * // Get one Tool
     * const tool = await prisma.tool.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ToolFindFirstOrThrowArgs>(args?: SelectSubset<T, ToolFindFirstOrThrowArgs<ExtArgs>>): Prisma__ToolClient<$Result.GetResult<Prisma.$ToolPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tools that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToolFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tools
     * const tools = await prisma.tool.findMany()
     * 
     * // Get first 10 Tools
     * const tools = await prisma.tool.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const toolWithIdOnly = await prisma.tool.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ToolFindManyArgs>(args?: SelectSubset<T, ToolFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ToolPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tool.
     * @param {ToolCreateArgs} args - Arguments to create a Tool.
     * @example
     * // Create one Tool
     * const Tool = await prisma.tool.create({
     *   data: {
     *     // ... data to create a Tool
     *   }
     * })
     * 
     */
    create<T extends ToolCreateArgs>(args: SelectSubset<T, ToolCreateArgs<ExtArgs>>): Prisma__ToolClient<$Result.GetResult<Prisma.$ToolPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tools.
     * @param {ToolCreateManyArgs} args - Arguments to create many Tools.
     * @example
     * // Create many Tools
     * const tool = await prisma.tool.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ToolCreateManyArgs>(args?: SelectSubset<T, ToolCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tools and returns the data saved in the database.
     * @param {ToolCreateManyAndReturnArgs} args - Arguments to create many Tools.
     * @example
     * // Create many Tools
     * const tool = await prisma.tool.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tools and only return the `id`
     * const toolWithIdOnly = await prisma.tool.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ToolCreateManyAndReturnArgs>(args?: SelectSubset<T, ToolCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ToolPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tool.
     * @param {ToolDeleteArgs} args - Arguments to delete one Tool.
     * @example
     * // Delete one Tool
     * const Tool = await prisma.tool.delete({
     *   where: {
     *     // ... filter to delete one Tool
     *   }
     * })
     * 
     */
    delete<T extends ToolDeleteArgs>(args: SelectSubset<T, ToolDeleteArgs<ExtArgs>>): Prisma__ToolClient<$Result.GetResult<Prisma.$ToolPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tool.
     * @param {ToolUpdateArgs} args - Arguments to update one Tool.
     * @example
     * // Update one Tool
     * const tool = await prisma.tool.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ToolUpdateArgs>(args: SelectSubset<T, ToolUpdateArgs<ExtArgs>>): Prisma__ToolClient<$Result.GetResult<Prisma.$ToolPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tools.
     * @param {ToolDeleteManyArgs} args - Arguments to filter Tools to delete.
     * @example
     * // Delete a few Tools
     * const { count } = await prisma.tool.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ToolDeleteManyArgs>(args?: SelectSubset<T, ToolDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tools.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToolUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tools
     * const tool = await prisma.tool.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ToolUpdateManyArgs>(args: SelectSubset<T, ToolUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tools and returns the data updated in the database.
     * @param {ToolUpdateManyAndReturnArgs} args - Arguments to update many Tools.
     * @example
     * // Update many Tools
     * const tool = await prisma.tool.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tools and only return the `id`
     * const toolWithIdOnly = await prisma.tool.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ToolUpdateManyAndReturnArgs>(args: SelectSubset<T, ToolUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ToolPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tool.
     * @param {ToolUpsertArgs} args - Arguments to update or create a Tool.
     * @example
     * // Update or create a Tool
     * const tool = await prisma.tool.upsert({
     *   create: {
     *     // ... data to create a Tool
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tool we want to update
     *   }
     * })
     */
    upsert<T extends ToolUpsertArgs>(args: SelectSubset<T, ToolUpsertArgs<ExtArgs>>): Prisma__ToolClient<$Result.GetResult<Prisma.$ToolPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tools.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToolCountArgs} args - Arguments to filter Tools to count.
     * @example
     * // Count the number of Tools
     * const count = await prisma.tool.count({
     *   where: {
     *     // ... the filter for the Tools we want to count
     *   }
     * })
    **/
    count<T extends ToolCountArgs>(
      args?: Subset<T, ToolCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ToolCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tool.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToolAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ToolAggregateArgs>(args: Subset<T, ToolAggregateArgs>): Prisma.PrismaPromise<GetToolAggregateType<T>>

    /**
     * Group by Tool.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToolGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ToolGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ToolGroupByArgs['orderBy'] }
        : { orderBy?: ToolGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ToolGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetToolGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tool model
   */
  readonly fields: ToolFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tool.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ToolClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    alternatives<T extends Tool$alternativesArgs<ExtArgs> = {}>(args?: Subset<T, Tool$alternativesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ToolAlternativePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    toolkits<T extends Tool$toolkitsArgs<ExtArgs> = {}>(args?: Subset<T, Tool$toolkitsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ToolkitToolPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tool model
   */
  interface ToolFieldRefs {
    readonly id: FieldRef<"Tool", 'String'>
    readonly name: FieldRef<"Tool", 'String'>
    readonly description: FieldRef<"Tool", 'String'>
    readonly category: FieldRef<"Tool", 'String'>
    readonly downloadUrl: FieldRef<"Tool", 'String'>
    readonly installationNotes: FieldRef<"Tool", 'String'>
    readonly isRequired: FieldRef<"Tool", 'Boolean'>
    readonly icon: FieldRef<"Tool", 'String'>
    readonly popularity: FieldRef<"Tool", 'Int'>
    readonly usageCount: FieldRef<"Tool", 'Int'>
    readonly createdAt: FieldRef<"Tool", 'DateTime'>
    readonly updatedAt: FieldRef<"Tool", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Tool findUnique
   */
  export type ToolFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tool
     */
    select?: ToolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tool
     */
    omit?: ToolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolInclude<ExtArgs> | null
    /**
     * Filter, which Tool to fetch.
     */
    where: ToolWhereUniqueInput
  }

  /**
   * Tool findUniqueOrThrow
   */
  export type ToolFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tool
     */
    select?: ToolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tool
     */
    omit?: ToolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolInclude<ExtArgs> | null
    /**
     * Filter, which Tool to fetch.
     */
    where: ToolWhereUniqueInput
  }

  /**
   * Tool findFirst
   */
  export type ToolFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tool
     */
    select?: ToolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tool
     */
    omit?: ToolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolInclude<ExtArgs> | null
    /**
     * Filter, which Tool to fetch.
     */
    where?: ToolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tools to fetch.
     */
    orderBy?: ToolOrderByWithRelationInput | ToolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tools.
     */
    cursor?: ToolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tools.
     */
    distinct?: ToolScalarFieldEnum | ToolScalarFieldEnum[]
  }

  /**
   * Tool findFirstOrThrow
   */
  export type ToolFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tool
     */
    select?: ToolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tool
     */
    omit?: ToolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolInclude<ExtArgs> | null
    /**
     * Filter, which Tool to fetch.
     */
    where?: ToolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tools to fetch.
     */
    orderBy?: ToolOrderByWithRelationInput | ToolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tools.
     */
    cursor?: ToolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tools.
     */
    distinct?: ToolScalarFieldEnum | ToolScalarFieldEnum[]
  }

  /**
   * Tool findMany
   */
  export type ToolFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tool
     */
    select?: ToolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tool
     */
    omit?: ToolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolInclude<ExtArgs> | null
    /**
     * Filter, which Tools to fetch.
     */
    where?: ToolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tools to fetch.
     */
    orderBy?: ToolOrderByWithRelationInput | ToolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tools.
     */
    cursor?: ToolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tools.
     */
    skip?: number
    distinct?: ToolScalarFieldEnum | ToolScalarFieldEnum[]
  }

  /**
   * Tool create
   */
  export type ToolCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tool
     */
    select?: ToolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tool
     */
    omit?: ToolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolInclude<ExtArgs> | null
    /**
     * The data needed to create a Tool.
     */
    data: XOR<ToolCreateInput, ToolUncheckedCreateInput>
  }

  /**
   * Tool createMany
   */
  export type ToolCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tools.
     */
    data: ToolCreateManyInput | ToolCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tool createManyAndReturn
   */
  export type ToolCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tool
     */
    select?: ToolSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tool
     */
    omit?: ToolOmit<ExtArgs> | null
    /**
     * The data used to create many Tools.
     */
    data: ToolCreateManyInput | ToolCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tool update
   */
  export type ToolUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tool
     */
    select?: ToolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tool
     */
    omit?: ToolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolInclude<ExtArgs> | null
    /**
     * The data needed to update a Tool.
     */
    data: XOR<ToolUpdateInput, ToolUncheckedUpdateInput>
    /**
     * Choose, which Tool to update.
     */
    where: ToolWhereUniqueInput
  }

  /**
   * Tool updateMany
   */
  export type ToolUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tools.
     */
    data: XOR<ToolUpdateManyMutationInput, ToolUncheckedUpdateManyInput>
    /**
     * Filter which Tools to update
     */
    where?: ToolWhereInput
    /**
     * Limit how many Tools to update.
     */
    limit?: number
  }

  /**
   * Tool updateManyAndReturn
   */
  export type ToolUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tool
     */
    select?: ToolSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tool
     */
    omit?: ToolOmit<ExtArgs> | null
    /**
     * The data used to update Tools.
     */
    data: XOR<ToolUpdateManyMutationInput, ToolUncheckedUpdateManyInput>
    /**
     * Filter which Tools to update
     */
    where?: ToolWhereInput
    /**
     * Limit how many Tools to update.
     */
    limit?: number
  }

  /**
   * Tool upsert
   */
  export type ToolUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tool
     */
    select?: ToolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tool
     */
    omit?: ToolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolInclude<ExtArgs> | null
    /**
     * The filter to search for the Tool to update in case it exists.
     */
    where: ToolWhereUniqueInput
    /**
     * In case the Tool found by the `where` argument doesn't exist, create a new Tool with this data.
     */
    create: XOR<ToolCreateInput, ToolUncheckedCreateInput>
    /**
     * In case the Tool was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ToolUpdateInput, ToolUncheckedUpdateInput>
  }

  /**
   * Tool delete
   */
  export type ToolDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tool
     */
    select?: ToolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tool
     */
    omit?: ToolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolInclude<ExtArgs> | null
    /**
     * Filter which Tool to delete.
     */
    where: ToolWhereUniqueInput
  }

  /**
   * Tool deleteMany
   */
  export type ToolDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tools to delete
     */
    where?: ToolWhereInput
    /**
     * Limit how many Tools to delete.
     */
    limit?: number
  }

  /**
   * Tool.alternatives
   */
  export type Tool$alternativesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToolAlternative
     */
    select?: ToolAlternativeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToolAlternative
     */
    omit?: ToolAlternativeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolAlternativeInclude<ExtArgs> | null
    where?: ToolAlternativeWhereInput
    orderBy?: ToolAlternativeOrderByWithRelationInput | ToolAlternativeOrderByWithRelationInput[]
    cursor?: ToolAlternativeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ToolAlternativeScalarFieldEnum | ToolAlternativeScalarFieldEnum[]
  }

  /**
   * Tool.toolkits
   */
  export type Tool$toolkitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToolkitTool
     */
    select?: ToolkitToolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToolkitTool
     */
    omit?: ToolkitToolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolkitToolInclude<ExtArgs> | null
    where?: ToolkitToolWhereInput
    orderBy?: ToolkitToolOrderByWithRelationInput | ToolkitToolOrderByWithRelationInput[]
    cursor?: ToolkitToolWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ToolkitToolScalarFieldEnum | ToolkitToolScalarFieldEnum[]
  }

  /**
   * Tool without action
   */
  export type ToolDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tool
     */
    select?: ToolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tool
     */
    omit?: ToolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolInclude<ExtArgs> | null
  }


  /**
   * Model ToolAlternative
   */

  export type AggregateToolAlternative = {
    _count: ToolAlternativeCountAggregateOutputType | null
    _min: ToolAlternativeMinAggregateOutputType | null
    _max: ToolAlternativeMaxAggregateOutputType | null
  }

  export type ToolAlternativeMinAggregateOutputType = {
    toolId: string | null
    alternative: string | null
  }

  export type ToolAlternativeMaxAggregateOutputType = {
    toolId: string | null
    alternative: string | null
  }

  export type ToolAlternativeCountAggregateOutputType = {
    toolId: number
    alternative: number
    _all: number
  }


  export type ToolAlternativeMinAggregateInputType = {
    toolId?: true
    alternative?: true
  }

  export type ToolAlternativeMaxAggregateInputType = {
    toolId?: true
    alternative?: true
  }

  export type ToolAlternativeCountAggregateInputType = {
    toolId?: true
    alternative?: true
    _all?: true
  }

  export type ToolAlternativeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ToolAlternative to aggregate.
     */
    where?: ToolAlternativeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ToolAlternatives to fetch.
     */
    orderBy?: ToolAlternativeOrderByWithRelationInput | ToolAlternativeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ToolAlternativeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ToolAlternatives from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ToolAlternatives.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ToolAlternatives
    **/
    _count?: true | ToolAlternativeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ToolAlternativeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ToolAlternativeMaxAggregateInputType
  }

  export type GetToolAlternativeAggregateType<T extends ToolAlternativeAggregateArgs> = {
        [P in keyof T & keyof AggregateToolAlternative]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateToolAlternative[P]>
      : GetScalarType<T[P], AggregateToolAlternative[P]>
  }




  export type ToolAlternativeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ToolAlternativeWhereInput
    orderBy?: ToolAlternativeOrderByWithAggregationInput | ToolAlternativeOrderByWithAggregationInput[]
    by: ToolAlternativeScalarFieldEnum[] | ToolAlternativeScalarFieldEnum
    having?: ToolAlternativeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ToolAlternativeCountAggregateInputType | true
    _min?: ToolAlternativeMinAggregateInputType
    _max?: ToolAlternativeMaxAggregateInputType
  }

  export type ToolAlternativeGroupByOutputType = {
    toolId: string
    alternative: string
    _count: ToolAlternativeCountAggregateOutputType | null
    _min: ToolAlternativeMinAggregateOutputType | null
    _max: ToolAlternativeMaxAggregateOutputType | null
  }

  type GetToolAlternativeGroupByPayload<T extends ToolAlternativeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ToolAlternativeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ToolAlternativeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ToolAlternativeGroupByOutputType[P]>
            : GetScalarType<T[P], ToolAlternativeGroupByOutputType[P]>
        }
      >
    >


  export type ToolAlternativeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    toolId?: boolean
    alternative?: boolean
    tool?: boolean | ToolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["toolAlternative"]>

  export type ToolAlternativeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    toolId?: boolean
    alternative?: boolean
    tool?: boolean | ToolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["toolAlternative"]>

  export type ToolAlternativeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    toolId?: boolean
    alternative?: boolean
    tool?: boolean | ToolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["toolAlternative"]>

  export type ToolAlternativeSelectScalar = {
    toolId?: boolean
    alternative?: boolean
  }

  export type ToolAlternativeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"toolId" | "alternative", ExtArgs["result"]["toolAlternative"]>
  export type ToolAlternativeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tool?: boolean | ToolDefaultArgs<ExtArgs>
  }
  export type ToolAlternativeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tool?: boolean | ToolDefaultArgs<ExtArgs>
  }
  export type ToolAlternativeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tool?: boolean | ToolDefaultArgs<ExtArgs>
  }

  export type $ToolAlternativePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ToolAlternative"
    objects: {
      tool: Prisma.$ToolPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      toolId: string
      alternative: string
    }, ExtArgs["result"]["toolAlternative"]>
    composites: {}
  }

  type ToolAlternativeGetPayload<S extends boolean | null | undefined | ToolAlternativeDefaultArgs> = $Result.GetResult<Prisma.$ToolAlternativePayload, S>

  type ToolAlternativeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ToolAlternativeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ToolAlternativeCountAggregateInputType | true
    }

  export interface ToolAlternativeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ToolAlternative'], meta: { name: 'ToolAlternative' } }
    /**
     * Find zero or one ToolAlternative that matches the filter.
     * @param {ToolAlternativeFindUniqueArgs} args - Arguments to find a ToolAlternative
     * @example
     * // Get one ToolAlternative
     * const toolAlternative = await prisma.toolAlternative.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ToolAlternativeFindUniqueArgs>(args: SelectSubset<T, ToolAlternativeFindUniqueArgs<ExtArgs>>): Prisma__ToolAlternativeClient<$Result.GetResult<Prisma.$ToolAlternativePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ToolAlternative that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ToolAlternativeFindUniqueOrThrowArgs} args - Arguments to find a ToolAlternative
     * @example
     * // Get one ToolAlternative
     * const toolAlternative = await prisma.toolAlternative.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ToolAlternativeFindUniqueOrThrowArgs>(args: SelectSubset<T, ToolAlternativeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ToolAlternativeClient<$Result.GetResult<Prisma.$ToolAlternativePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ToolAlternative that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToolAlternativeFindFirstArgs} args - Arguments to find a ToolAlternative
     * @example
     * // Get one ToolAlternative
     * const toolAlternative = await prisma.toolAlternative.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ToolAlternativeFindFirstArgs>(args?: SelectSubset<T, ToolAlternativeFindFirstArgs<ExtArgs>>): Prisma__ToolAlternativeClient<$Result.GetResult<Prisma.$ToolAlternativePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ToolAlternative that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToolAlternativeFindFirstOrThrowArgs} args - Arguments to find a ToolAlternative
     * @example
     * // Get one ToolAlternative
     * const toolAlternative = await prisma.toolAlternative.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ToolAlternativeFindFirstOrThrowArgs>(args?: SelectSubset<T, ToolAlternativeFindFirstOrThrowArgs<ExtArgs>>): Prisma__ToolAlternativeClient<$Result.GetResult<Prisma.$ToolAlternativePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ToolAlternatives that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToolAlternativeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ToolAlternatives
     * const toolAlternatives = await prisma.toolAlternative.findMany()
     * 
     * // Get first 10 ToolAlternatives
     * const toolAlternatives = await prisma.toolAlternative.findMany({ take: 10 })
     * 
     * // Only select the `toolId`
     * const toolAlternativeWithToolIdOnly = await prisma.toolAlternative.findMany({ select: { toolId: true } })
     * 
     */
    findMany<T extends ToolAlternativeFindManyArgs>(args?: SelectSubset<T, ToolAlternativeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ToolAlternativePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ToolAlternative.
     * @param {ToolAlternativeCreateArgs} args - Arguments to create a ToolAlternative.
     * @example
     * // Create one ToolAlternative
     * const ToolAlternative = await prisma.toolAlternative.create({
     *   data: {
     *     // ... data to create a ToolAlternative
     *   }
     * })
     * 
     */
    create<T extends ToolAlternativeCreateArgs>(args: SelectSubset<T, ToolAlternativeCreateArgs<ExtArgs>>): Prisma__ToolAlternativeClient<$Result.GetResult<Prisma.$ToolAlternativePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ToolAlternatives.
     * @param {ToolAlternativeCreateManyArgs} args - Arguments to create many ToolAlternatives.
     * @example
     * // Create many ToolAlternatives
     * const toolAlternative = await prisma.toolAlternative.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ToolAlternativeCreateManyArgs>(args?: SelectSubset<T, ToolAlternativeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ToolAlternatives and returns the data saved in the database.
     * @param {ToolAlternativeCreateManyAndReturnArgs} args - Arguments to create many ToolAlternatives.
     * @example
     * // Create many ToolAlternatives
     * const toolAlternative = await prisma.toolAlternative.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ToolAlternatives and only return the `toolId`
     * const toolAlternativeWithToolIdOnly = await prisma.toolAlternative.createManyAndReturn({
     *   select: { toolId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ToolAlternativeCreateManyAndReturnArgs>(args?: SelectSubset<T, ToolAlternativeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ToolAlternativePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ToolAlternative.
     * @param {ToolAlternativeDeleteArgs} args - Arguments to delete one ToolAlternative.
     * @example
     * // Delete one ToolAlternative
     * const ToolAlternative = await prisma.toolAlternative.delete({
     *   where: {
     *     // ... filter to delete one ToolAlternative
     *   }
     * })
     * 
     */
    delete<T extends ToolAlternativeDeleteArgs>(args: SelectSubset<T, ToolAlternativeDeleteArgs<ExtArgs>>): Prisma__ToolAlternativeClient<$Result.GetResult<Prisma.$ToolAlternativePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ToolAlternative.
     * @param {ToolAlternativeUpdateArgs} args - Arguments to update one ToolAlternative.
     * @example
     * // Update one ToolAlternative
     * const toolAlternative = await prisma.toolAlternative.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ToolAlternativeUpdateArgs>(args: SelectSubset<T, ToolAlternativeUpdateArgs<ExtArgs>>): Prisma__ToolAlternativeClient<$Result.GetResult<Prisma.$ToolAlternativePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ToolAlternatives.
     * @param {ToolAlternativeDeleteManyArgs} args - Arguments to filter ToolAlternatives to delete.
     * @example
     * // Delete a few ToolAlternatives
     * const { count } = await prisma.toolAlternative.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ToolAlternativeDeleteManyArgs>(args?: SelectSubset<T, ToolAlternativeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ToolAlternatives.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToolAlternativeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ToolAlternatives
     * const toolAlternative = await prisma.toolAlternative.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ToolAlternativeUpdateManyArgs>(args: SelectSubset<T, ToolAlternativeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ToolAlternatives and returns the data updated in the database.
     * @param {ToolAlternativeUpdateManyAndReturnArgs} args - Arguments to update many ToolAlternatives.
     * @example
     * // Update many ToolAlternatives
     * const toolAlternative = await prisma.toolAlternative.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ToolAlternatives and only return the `toolId`
     * const toolAlternativeWithToolIdOnly = await prisma.toolAlternative.updateManyAndReturn({
     *   select: { toolId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ToolAlternativeUpdateManyAndReturnArgs>(args: SelectSubset<T, ToolAlternativeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ToolAlternativePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ToolAlternative.
     * @param {ToolAlternativeUpsertArgs} args - Arguments to update or create a ToolAlternative.
     * @example
     * // Update or create a ToolAlternative
     * const toolAlternative = await prisma.toolAlternative.upsert({
     *   create: {
     *     // ... data to create a ToolAlternative
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ToolAlternative we want to update
     *   }
     * })
     */
    upsert<T extends ToolAlternativeUpsertArgs>(args: SelectSubset<T, ToolAlternativeUpsertArgs<ExtArgs>>): Prisma__ToolAlternativeClient<$Result.GetResult<Prisma.$ToolAlternativePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ToolAlternatives.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToolAlternativeCountArgs} args - Arguments to filter ToolAlternatives to count.
     * @example
     * // Count the number of ToolAlternatives
     * const count = await prisma.toolAlternative.count({
     *   where: {
     *     // ... the filter for the ToolAlternatives we want to count
     *   }
     * })
    **/
    count<T extends ToolAlternativeCountArgs>(
      args?: Subset<T, ToolAlternativeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ToolAlternativeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ToolAlternative.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToolAlternativeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ToolAlternativeAggregateArgs>(args: Subset<T, ToolAlternativeAggregateArgs>): Prisma.PrismaPromise<GetToolAlternativeAggregateType<T>>

    /**
     * Group by ToolAlternative.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToolAlternativeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ToolAlternativeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ToolAlternativeGroupByArgs['orderBy'] }
        : { orderBy?: ToolAlternativeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ToolAlternativeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetToolAlternativeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ToolAlternative model
   */
  readonly fields: ToolAlternativeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ToolAlternative.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ToolAlternativeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tool<T extends ToolDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ToolDefaultArgs<ExtArgs>>): Prisma__ToolClient<$Result.GetResult<Prisma.$ToolPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ToolAlternative model
   */
  interface ToolAlternativeFieldRefs {
    readonly toolId: FieldRef<"ToolAlternative", 'String'>
    readonly alternative: FieldRef<"ToolAlternative", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ToolAlternative findUnique
   */
  export type ToolAlternativeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToolAlternative
     */
    select?: ToolAlternativeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToolAlternative
     */
    omit?: ToolAlternativeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolAlternativeInclude<ExtArgs> | null
    /**
     * Filter, which ToolAlternative to fetch.
     */
    where: ToolAlternativeWhereUniqueInput
  }

  /**
   * ToolAlternative findUniqueOrThrow
   */
  export type ToolAlternativeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToolAlternative
     */
    select?: ToolAlternativeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToolAlternative
     */
    omit?: ToolAlternativeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolAlternativeInclude<ExtArgs> | null
    /**
     * Filter, which ToolAlternative to fetch.
     */
    where: ToolAlternativeWhereUniqueInput
  }

  /**
   * ToolAlternative findFirst
   */
  export type ToolAlternativeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToolAlternative
     */
    select?: ToolAlternativeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToolAlternative
     */
    omit?: ToolAlternativeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolAlternativeInclude<ExtArgs> | null
    /**
     * Filter, which ToolAlternative to fetch.
     */
    where?: ToolAlternativeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ToolAlternatives to fetch.
     */
    orderBy?: ToolAlternativeOrderByWithRelationInput | ToolAlternativeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ToolAlternatives.
     */
    cursor?: ToolAlternativeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ToolAlternatives from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ToolAlternatives.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ToolAlternatives.
     */
    distinct?: ToolAlternativeScalarFieldEnum | ToolAlternativeScalarFieldEnum[]
  }

  /**
   * ToolAlternative findFirstOrThrow
   */
  export type ToolAlternativeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToolAlternative
     */
    select?: ToolAlternativeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToolAlternative
     */
    omit?: ToolAlternativeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolAlternativeInclude<ExtArgs> | null
    /**
     * Filter, which ToolAlternative to fetch.
     */
    where?: ToolAlternativeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ToolAlternatives to fetch.
     */
    orderBy?: ToolAlternativeOrderByWithRelationInput | ToolAlternativeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ToolAlternatives.
     */
    cursor?: ToolAlternativeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ToolAlternatives from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ToolAlternatives.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ToolAlternatives.
     */
    distinct?: ToolAlternativeScalarFieldEnum | ToolAlternativeScalarFieldEnum[]
  }

  /**
   * ToolAlternative findMany
   */
  export type ToolAlternativeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToolAlternative
     */
    select?: ToolAlternativeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToolAlternative
     */
    omit?: ToolAlternativeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolAlternativeInclude<ExtArgs> | null
    /**
     * Filter, which ToolAlternatives to fetch.
     */
    where?: ToolAlternativeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ToolAlternatives to fetch.
     */
    orderBy?: ToolAlternativeOrderByWithRelationInput | ToolAlternativeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ToolAlternatives.
     */
    cursor?: ToolAlternativeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ToolAlternatives from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ToolAlternatives.
     */
    skip?: number
    distinct?: ToolAlternativeScalarFieldEnum | ToolAlternativeScalarFieldEnum[]
  }

  /**
   * ToolAlternative create
   */
  export type ToolAlternativeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToolAlternative
     */
    select?: ToolAlternativeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToolAlternative
     */
    omit?: ToolAlternativeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolAlternativeInclude<ExtArgs> | null
    /**
     * The data needed to create a ToolAlternative.
     */
    data: XOR<ToolAlternativeCreateInput, ToolAlternativeUncheckedCreateInput>
  }

  /**
   * ToolAlternative createMany
   */
  export type ToolAlternativeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ToolAlternatives.
     */
    data: ToolAlternativeCreateManyInput | ToolAlternativeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ToolAlternative createManyAndReturn
   */
  export type ToolAlternativeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToolAlternative
     */
    select?: ToolAlternativeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ToolAlternative
     */
    omit?: ToolAlternativeOmit<ExtArgs> | null
    /**
     * The data used to create many ToolAlternatives.
     */
    data: ToolAlternativeCreateManyInput | ToolAlternativeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolAlternativeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ToolAlternative update
   */
  export type ToolAlternativeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToolAlternative
     */
    select?: ToolAlternativeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToolAlternative
     */
    omit?: ToolAlternativeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolAlternativeInclude<ExtArgs> | null
    /**
     * The data needed to update a ToolAlternative.
     */
    data: XOR<ToolAlternativeUpdateInput, ToolAlternativeUncheckedUpdateInput>
    /**
     * Choose, which ToolAlternative to update.
     */
    where: ToolAlternativeWhereUniqueInput
  }

  /**
   * ToolAlternative updateMany
   */
  export type ToolAlternativeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ToolAlternatives.
     */
    data: XOR<ToolAlternativeUpdateManyMutationInput, ToolAlternativeUncheckedUpdateManyInput>
    /**
     * Filter which ToolAlternatives to update
     */
    where?: ToolAlternativeWhereInput
    /**
     * Limit how many ToolAlternatives to update.
     */
    limit?: number
  }

  /**
   * ToolAlternative updateManyAndReturn
   */
  export type ToolAlternativeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToolAlternative
     */
    select?: ToolAlternativeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ToolAlternative
     */
    omit?: ToolAlternativeOmit<ExtArgs> | null
    /**
     * The data used to update ToolAlternatives.
     */
    data: XOR<ToolAlternativeUpdateManyMutationInput, ToolAlternativeUncheckedUpdateManyInput>
    /**
     * Filter which ToolAlternatives to update
     */
    where?: ToolAlternativeWhereInput
    /**
     * Limit how many ToolAlternatives to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolAlternativeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ToolAlternative upsert
   */
  export type ToolAlternativeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToolAlternative
     */
    select?: ToolAlternativeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToolAlternative
     */
    omit?: ToolAlternativeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolAlternativeInclude<ExtArgs> | null
    /**
     * The filter to search for the ToolAlternative to update in case it exists.
     */
    where: ToolAlternativeWhereUniqueInput
    /**
     * In case the ToolAlternative found by the `where` argument doesn't exist, create a new ToolAlternative with this data.
     */
    create: XOR<ToolAlternativeCreateInput, ToolAlternativeUncheckedCreateInput>
    /**
     * In case the ToolAlternative was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ToolAlternativeUpdateInput, ToolAlternativeUncheckedUpdateInput>
  }

  /**
   * ToolAlternative delete
   */
  export type ToolAlternativeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToolAlternative
     */
    select?: ToolAlternativeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToolAlternative
     */
    omit?: ToolAlternativeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolAlternativeInclude<ExtArgs> | null
    /**
     * Filter which ToolAlternative to delete.
     */
    where: ToolAlternativeWhereUniqueInput
  }

  /**
   * ToolAlternative deleteMany
   */
  export type ToolAlternativeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ToolAlternatives to delete
     */
    where?: ToolAlternativeWhereInput
    /**
     * Limit how many ToolAlternatives to delete.
     */
    limit?: number
  }

  /**
   * ToolAlternative without action
   */
  export type ToolAlternativeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToolAlternative
     */
    select?: ToolAlternativeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToolAlternative
     */
    omit?: ToolAlternativeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolAlternativeInclude<ExtArgs> | null
  }


  /**
   * Model Toolkit
   */

  export type AggregateToolkit = {
    _count: ToolkitCountAggregateOutputType | null
    _min: ToolkitMinAggregateOutputType | null
    _max: ToolkitMaxAggregateOutputType | null
  }

  export type ToolkitMinAggregateOutputType = {
    id: string | null
    profileName: string | null
    description: string | null
    operatingSystem: string | null
    icon: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ToolkitMaxAggregateOutputType = {
    id: string | null
    profileName: string | null
    description: string | null
    operatingSystem: string | null
    icon: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ToolkitCountAggregateOutputType = {
    id: number
    profileName: number
    description: number
    operatingSystem: number
    icon: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ToolkitMinAggregateInputType = {
    id?: true
    profileName?: true
    description?: true
    operatingSystem?: true
    icon?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ToolkitMaxAggregateInputType = {
    id?: true
    profileName?: true
    description?: true
    operatingSystem?: true
    icon?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ToolkitCountAggregateInputType = {
    id?: true
    profileName?: true
    description?: true
    operatingSystem?: true
    icon?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ToolkitAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Toolkit to aggregate.
     */
    where?: ToolkitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Toolkits to fetch.
     */
    orderBy?: ToolkitOrderByWithRelationInput | ToolkitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ToolkitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Toolkits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Toolkits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Toolkits
    **/
    _count?: true | ToolkitCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ToolkitMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ToolkitMaxAggregateInputType
  }

  export type GetToolkitAggregateType<T extends ToolkitAggregateArgs> = {
        [P in keyof T & keyof AggregateToolkit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateToolkit[P]>
      : GetScalarType<T[P], AggregateToolkit[P]>
  }




  export type ToolkitGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ToolkitWhereInput
    orderBy?: ToolkitOrderByWithAggregationInput | ToolkitOrderByWithAggregationInput[]
    by: ToolkitScalarFieldEnum[] | ToolkitScalarFieldEnum
    having?: ToolkitScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ToolkitCountAggregateInputType | true
    _min?: ToolkitMinAggregateInputType
    _max?: ToolkitMaxAggregateInputType
  }

  export type ToolkitGroupByOutputType = {
    id: string
    profileName: string
    description: string | null
    operatingSystem: string
    icon: string | null
    createdAt: Date
    updatedAt: Date
    _count: ToolkitCountAggregateOutputType | null
    _min: ToolkitMinAggregateOutputType | null
    _max: ToolkitMaxAggregateOutputType | null
  }

  type GetToolkitGroupByPayload<T extends ToolkitGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ToolkitGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ToolkitGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ToolkitGroupByOutputType[P]>
            : GetScalarType<T[P], ToolkitGroupByOutputType[P]>
        }
      >
    >


  export type ToolkitSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileName?: boolean
    description?: boolean
    operatingSystem?: boolean
    icon?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tools?: boolean | Toolkit$toolsArgs<ExtArgs>
    surveyMatches?: boolean | Toolkit$surveyMatchesArgs<ExtArgs>
    _count?: boolean | ToolkitCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["toolkit"]>

  export type ToolkitSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileName?: boolean
    description?: boolean
    operatingSystem?: boolean
    icon?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["toolkit"]>

  export type ToolkitSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileName?: boolean
    description?: boolean
    operatingSystem?: boolean
    icon?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["toolkit"]>

  export type ToolkitSelectScalar = {
    id?: boolean
    profileName?: boolean
    description?: boolean
    operatingSystem?: boolean
    icon?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ToolkitOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "profileName" | "description" | "operatingSystem" | "icon" | "createdAt" | "updatedAt", ExtArgs["result"]["toolkit"]>
  export type ToolkitInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tools?: boolean | Toolkit$toolsArgs<ExtArgs>
    surveyMatches?: boolean | Toolkit$surveyMatchesArgs<ExtArgs>
    _count?: boolean | ToolkitCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ToolkitIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ToolkitIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ToolkitPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Toolkit"
    objects: {
      tools: Prisma.$ToolkitToolPayload<ExtArgs>[]
      surveyMatches: Prisma.$SurveyResponsePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      profileName: string
      description: string | null
      operatingSystem: string
      icon: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["toolkit"]>
    composites: {}
  }

  type ToolkitGetPayload<S extends boolean | null | undefined | ToolkitDefaultArgs> = $Result.GetResult<Prisma.$ToolkitPayload, S>

  type ToolkitCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ToolkitFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ToolkitCountAggregateInputType | true
    }

  export interface ToolkitDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Toolkit'], meta: { name: 'Toolkit' } }
    /**
     * Find zero or one Toolkit that matches the filter.
     * @param {ToolkitFindUniqueArgs} args - Arguments to find a Toolkit
     * @example
     * // Get one Toolkit
     * const toolkit = await prisma.toolkit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ToolkitFindUniqueArgs>(args: SelectSubset<T, ToolkitFindUniqueArgs<ExtArgs>>): Prisma__ToolkitClient<$Result.GetResult<Prisma.$ToolkitPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Toolkit that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ToolkitFindUniqueOrThrowArgs} args - Arguments to find a Toolkit
     * @example
     * // Get one Toolkit
     * const toolkit = await prisma.toolkit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ToolkitFindUniqueOrThrowArgs>(args: SelectSubset<T, ToolkitFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ToolkitClient<$Result.GetResult<Prisma.$ToolkitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Toolkit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToolkitFindFirstArgs} args - Arguments to find a Toolkit
     * @example
     * // Get one Toolkit
     * const toolkit = await prisma.toolkit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ToolkitFindFirstArgs>(args?: SelectSubset<T, ToolkitFindFirstArgs<ExtArgs>>): Prisma__ToolkitClient<$Result.GetResult<Prisma.$ToolkitPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Toolkit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToolkitFindFirstOrThrowArgs} args - Arguments to find a Toolkit
     * @example
     * // Get one Toolkit
     * const toolkit = await prisma.toolkit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ToolkitFindFirstOrThrowArgs>(args?: SelectSubset<T, ToolkitFindFirstOrThrowArgs<ExtArgs>>): Prisma__ToolkitClient<$Result.GetResult<Prisma.$ToolkitPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Toolkits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToolkitFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Toolkits
     * const toolkits = await prisma.toolkit.findMany()
     * 
     * // Get first 10 Toolkits
     * const toolkits = await prisma.toolkit.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const toolkitWithIdOnly = await prisma.toolkit.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ToolkitFindManyArgs>(args?: SelectSubset<T, ToolkitFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ToolkitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Toolkit.
     * @param {ToolkitCreateArgs} args - Arguments to create a Toolkit.
     * @example
     * // Create one Toolkit
     * const Toolkit = await prisma.toolkit.create({
     *   data: {
     *     // ... data to create a Toolkit
     *   }
     * })
     * 
     */
    create<T extends ToolkitCreateArgs>(args: SelectSubset<T, ToolkitCreateArgs<ExtArgs>>): Prisma__ToolkitClient<$Result.GetResult<Prisma.$ToolkitPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Toolkits.
     * @param {ToolkitCreateManyArgs} args - Arguments to create many Toolkits.
     * @example
     * // Create many Toolkits
     * const toolkit = await prisma.toolkit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ToolkitCreateManyArgs>(args?: SelectSubset<T, ToolkitCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Toolkits and returns the data saved in the database.
     * @param {ToolkitCreateManyAndReturnArgs} args - Arguments to create many Toolkits.
     * @example
     * // Create many Toolkits
     * const toolkit = await prisma.toolkit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Toolkits and only return the `id`
     * const toolkitWithIdOnly = await prisma.toolkit.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ToolkitCreateManyAndReturnArgs>(args?: SelectSubset<T, ToolkitCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ToolkitPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Toolkit.
     * @param {ToolkitDeleteArgs} args - Arguments to delete one Toolkit.
     * @example
     * // Delete one Toolkit
     * const Toolkit = await prisma.toolkit.delete({
     *   where: {
     *     // ... filter to delete one Toolkit
     *   }
     * })
     * 
     */
    delete<T extends ToolkitDeleteArgs>(args: SelectSubset<T, ToolkitDeleteArgs<ExtArgs>>): Prisma__ToolkitClient<$Result.GetResult<Prisma.$ToolkitPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Toolkit.
     * @param {ToolkitUpdateArgs} args - Arguments to update one Toolkit.
     * @example
     * // Update one Toolkit
     * const toolkit = await prisma.toolkit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ToolkitUpdateArgs>(args: SelectSubset<T, ToolkitUpdateArgs<ExtArgs>>): Prisma__ToolkitClient<$Result.GetResult<Prisma.$ToolkitPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Toolkits.
     * @param {ToolkitDeleteManyArgs} args - Arguments to filter Toolkits to delete.
     * @example
     * // Delete a few Toolkits
     * const { count } = await prisma.toolkit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ToolkitDeleteManyArgs>(args?: SelectSubset<T, ToolkitDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Toolkits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToolkitUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Toolkits
     * const toolkit = await prisma.toolkit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ToolkitUpdateManyArgs>(args: SelectSubset<T, ToolkitUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Toolkits and returns the data updated in the database.
     * @param {ToolkitUpdateManyAndReturnArgs} args - Arguments to update many Toolkits.
     * @example
     * // Update many Toolkits
     * const toolkit = await prisma.toolkit.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Toolkits and only return the `id`
     * const toolkitWithIdOnly = await prisma.toolkit.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ToolkitUpdateManyAndReturnArgs>(args: SelectSubset<T, ToolkitUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ToolkitPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Toolkit.
     * @param {ToolkitUpsertArgs} args - Arguments to update or create a Toolkit.
     * @example
     * // Update or create a Toolkit
     * const toolkit = await prisma.toolkit.upsert({
     *   create: {
     *     // ... data to create a Toolkit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Toolkit we want to update
     *   }
     * })
     */
    upsert<T extends ToolkitUpsertArgs>(args: SelectSubset<T, ToolkitUpsertArgs<ExtArgs>>): Prisma__ToolkitClient<$Result.GetResult<Prisma.$ToolkitPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Toolkits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToolkitCountArgs} args - Arguments to filter Toolkits to count.
     * @example
     * // Count the number of Toolkits
     * const count = await prisma.toolkit.count({
     *   where: {
     *     // ... the filter for the Toolkits we want to count
     *   }
     * })
    **/
    count<T extends ToolkitCountArgs>(
      args?: Subset<T, ToolkitCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ToolkitCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Toolkit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToolkitAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ToolkitAggregateArgs>(args: Subset<T, ToolkitAggregateArgs>): Prisma.PrismaPromise<GetToolkitAggregateType<T>>

    /**
     * Group by Toolkit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToolkitGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ToolkitGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ToolkitGroupByArgs['orderBy'] }
        : { orderBy?: ToolkitGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ToolkitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetToolkitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Toolkit model
   */
  readonly fields: ToolkitFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Toolkit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ToolkitClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tools<T extends Toolkit$toolsArgs<ExtArgs> = {}>(args?: Subset<T, Toolkit$toolsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ToolkitToolPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    surveyMatches<T extends Toolkit$surveyMatchesArgs<ExtArgs> = {}>(args?: Subset<T, Toolkit$surveyMatchesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SurveyResponsePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Toolkit model
   */
  interface ToolkitFieldRefs {
    readonly id: FieldRef<"Toolkit", 'String'>
    readonly profileName: FieldRef<"Toolkit", 'String'>
    readonly description: FieldRef<"Toolkit", 'String'>
    readonly operatingSystem: FieldRef<"Toolkit", 'String'>
    readonly icon: FieldRef<"Toolkit", 'String'>
    readonly createdAt: FieldRef<"Toolkit", 'DateTime'>
    readonly updatedAt: FieldRef<"Toolkit", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Toolkit findUnique
   */
  export type ToolkitFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Toolkit
     */
    select?: ToolkitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Toolkit
     */
    omit?: ToolkitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolkitInclude<ExtArgs> | null
    /**
     * Filter, which Toolkit to fetch.
     */
    where: ToolkitWhereUniqueInput
  }

  /**
   * Toolkit findUniqueOrThrow
   */
  export type ToolkitFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Toolkit
     */
    select?: ToolkitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Toolkit
     */
    omit?: ToolkitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolkitInclude<ExtArgs> | null
    /**
     * Filter, which Toolkit to fetch.
     */
    where: ToolkitWhereUniqueInput
  }

  /**
   * Toolkit findFirst
   */
  export type ToolkitFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Toolkit
     */
    select?: ToolkitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Toolkit
     */
    omit?: ToolkitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolkitInclude<ExtArgs> | null
    /**
     * Filter, which Toolkit to fetch.
     */
    where?: ToolkitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Toolkits to fetch.
     */
    orderBy?: ToolkitOrderByWithRelationInput | ToolkitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Toolkits.
     */
    cursor?: ToolkitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Toolkits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Toolkits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Toolkits.
     */
    distinct?: ToolkitScalarFieldEnum | ToolkitScalarFieldEnum[]
  }

  /**
   * Toolkit findFirstOrThrow
   */
  export type ToolkitFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Toolkit
     */
    select?: ToolkitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Toolkit
     */
    omit?: ToolkitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolkitInclude<ExtArgs> | null
    /**
     * Filter, which Toolkit to fetch.
     */
    where?: ToolkitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Toolkits to fetch.
     */
    orderBy?: ToolkitOrderByWithRelationInput | ToolkitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Toolkits.
     */
    cursor?: ToolkitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Toolkits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Toolkits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Toolkits.
     */
    distinct?: ToolkitScalarFieldEnum | ToolkitScalarFieldEnum[]
  }

  /**
   * Toolkit findMany
   */
  export type ToolkitFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Toolkit
     */
    select?: ToolkitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Toolkit
     */
    omit?: ToolkitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolkitInclude<ExtArgs> | null
    /**
     * Filter, which Toolkits to fetch.
     */
    where?: ToolkitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Toolkits to fetch.
     */
    orderBy?: ToolkitOrderByWithRelationInput | ToolkitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Toolkits.
     */
    cursor?: ToolkitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Toolkits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Toolkits.
     */
    skip?: number
    distinct?: ToolkitScalarFieldEnum | ToolkitScalarFieldEnum[]
  }

  /**
   * Toolkit create
   */
  export type ToolkitCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Toolkit
     */
    select?: ToolkitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Toolkit
     */
    omit?: ToolkitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolkitInclude<ExtArgs> | null
    /**
     * The data needed to create a Toolkit.
     */
    data: XOR<ToolkitCreateInput, ToolkitUncheckedCreateInput>
  }

  /**
   * Toolkit createMany
   */
  export type ToolkitCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Toolkits.
     */
    data: ToolkitCreateManyInput | ToolkitCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Toolkit createManyAndReturn
   */
  export type ToolkitCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Toolkit
     */
    select?: ToolkitSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Toolkit
     */
    omit?: ToolkitOmit<ExtArgs> | null
    /**
     * The data used to create many Toolkits.
     */
    data: ToolkitCreateManyInput | ToolkitCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Toolkit update
   */
  export type ToolkitUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Toolkit
     */
    select?: ToolkitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Toolkit
     */
    omit?: ToolkitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolkitInclude<ExtArgs> | null
    /**
     * The data needed to update a Toolkit.
     */
    data: XOR<ToolkitUpdateInput, ToolkitUncheckedUpdateInput>
    /**
     * Choose, which Toolkit to update.
     */
    where: ToolkitWhereUniqueInput
  }

  /**
   * Toolkit updateMany
   */
  export type ToolkitUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Toolkits.
     */
    data: XOR<ToolkitUpdateManyMutationInput, ToolkitUncheckedUpdateManyInput>
    /**
     * Filter which Toolkits to update
     */
    where?: ToolkitWhereInput
    /**
     * Limit how many Toolkits to update.
     */
    limit?: number
  }

  /**
   * Toolkit updateManyAndReturn
   */
  export type ToolkitUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Toolkit
     */
    select?: ToolkitSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Toolkit
     */
    omit?: ToolkitOmit<ExtArgs> | null
    /**
     * The data used to update Toolkits.
     */
    data: XOR<ToolkitUpdateManyMutationInput, ToolkitUncheckedUpdateManyInput>
    /**
     * Filter which Toolkits to update
     */
    where?: ToolkitWhereInput
    /**
     * Limit how many Toolkits to update.
     */
    limit?: number
  }

  /**
   * Toolkit upsert
   */
  export type ToolkitUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Toolkit
     */
    select?: ToolkitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Toolkit
     */
    omit?: ToolkitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolkitInclude<ExtArgs> | null
    /**
     * The filter to search for the Toolkit to update in case it exists.
     */
    where: ToolkitWhereUniqueInput
    /**
     * In case the Toolkit found by the `where` argument doesn't exist, create a new Toolkit with this data.
     */
    create: XOR<ToolkitCreateInput, ToolkitUncheckedCreateInput>
    /**
     * In case the Toolkit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ToolkitUpdateInput, ToolkitUncheckedUpdateInput>
  }

  /**
   * Toolkit delete
   */
  export type ToolkitDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Toolkit
     */
    select?: ToolkitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Toolkit
     */
    omit?: ToolkitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolkitInclude<ExtArgs> | null
    /**
     * Filter which Toolkit to delete.
     */
    where: ToolkitWhereUniqueInput
  }

  /**
   * Toolkit deleteMany
   */
  export type ToolkitDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Toolkits to delete
     */
    where?: ToolkitWhereInput
    /**
     * Limit how many Toolkits to delete.
     */
    limit?: number
  }

  /**
   * Toolkit.tools
   */
  export type Toolkit$toolsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToolkitTool
     */
    select?: ToolkitToolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToolkitTool
     */
    omit?: ToolkitToolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolkitToolInclude<ExtArgs> | null
    where?: ToolkitToolWhereInput
    orderBy?: ToolkitToolOrderByWithRelationInput | ToolkitToolOrderByWithRelationInput[]
    cursor?: ToolkitToolWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ToolkitToolScalarFieldEnum | ToolkitToolScalarFieldEnum[]
  }

  /**
   * Toolkit.surveyMatches
   */
  export type Toolkit$surveyMatchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyResponse
     */
    select?: SurveyResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyResponse
     */
    omit?: SurveyResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyResponseInclude<ExtArgs> | null
    where?: SurveyResponseWhereInput
    orderBy?: SurveyResponseOrderByWithRelationInput | SurveyResponseOrderByWithRelationInput[]
    cursor?: SurveyResponseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SurveyResponseScalarFieldEnum | SurveyResponseScalarFieldEnum[]
  }

  /**
   * Toolkit without action
   */
  export type ToolkitDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Toolkit
     */
    select?: ToolkitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Toolkit
     */
    omit?: ToolkitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolkitInclude<ExtArgs> | null
  }


  /**
   * Model ToolkitTool
   */

  export type AggregateToolkitTool = {
    _count: ToolkitToolCountAggregateOutputType | null
    _min: ToolkitToolMinAggregateOutputType | null
    _max: ToolkitToolMaxAggregateOutputType | null
  }

  export type ToolkitToolMinAggregateOutputType = {
    toolkitId: string | null
    toolId: string | null
  }

  export type ToolkitToolMaxAggregateOutputType = {
    toolkitId: string | null
    toolId: string | null
  }

  export type ToolkitToolCountAggregateOutputType = {
    toolkitId: number
    toolId: number
    _all: number
  }


  export type ToolkitToolMinAggregateInputType = {
    toolkitId?: true
    toolId?: true
  }

  export type ToolkitToolMaxAggregateInputType = {
    toolkitId?: true
    toolId?: true
  }

  export type ToolkitToolCountAggregateInputType = {
    toolkitId?: true
    toolId?: true
    _all?: true
  }

  export type ToolkitToolAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ToolkitTool to aggregate.
     */
    where?: ToolkitToolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ToolkitTools to fetch.
     */
    orderBy?: ToolkitToolOrderByWithRelationInput | ToolkitToolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ToolkitToolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ToolkitTools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ToolkitTools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ToolkitTools
    **/
    _count?: true | ToolkitToolCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ToolkitToolMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ToolkitToolMaxAggregateInputType
  }

  export type GetToolkitToolAggregateType<T extends ToolkitToolAggregateArgs> = {
        [P in keyof T & keyof AggregateToolkitTool]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateToolkitTool[P]>
      : GetScalarType<T[P], AggregateToolkitTool[P]>
  }




  export type ToolkitToolGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ToolkitToolWhereInput
    orderBy?: ToolkitToolOrderByWithAggregationInput | ToolkitToolOrderByWithAggregationInput[]
    by: ToolkitToolScalarFieldEnum[] | ToolkitToolScalarFieldEnum
    having?: ToolkitToolScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ToolkitToolCountAggregateInputType | true
    _min?: ToolkitToolMinAggregateInputType
    _max?: ToolkitToolMaxAggregateInputType
  }

  export type ToolkitToolGroupByOutputType = {
    toolkitId: string
    toolId: string
    _count: ToolkitToolCountAggregateOutputType | null
    _min: ToolkitToolMinAggregateOutputType | null
    _max: ToolkitToolMaxAggregateOutputType | null
  }

  type GetToolkitToolGroupByPayload<T extends ToolkitToolGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ToolkitToolGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ToolkitToolGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ToolkitToolGroupByOutputType[P]>
            : GetScalarType<T[P], ToolkitToolGroupByOutputType[P]>
        }
      >
    >


  export type ToolkitToolSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    toolkitId?: boolean
    toolId?: boolean
    toolkit?: boolean | ToolkitDefaultArgs<ExtArgs>
    tool?: boolean | ToolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["toolkitTool"]>

  export type ToolkitToolSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    toolkitId?: boolean
    toolId?: boolean
    toolkit?: boolean | ToolkitDefaultArgs<ExtArgs>
    tool?: boolean | ToolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["toolkitTool"]>

  export type ToolkitToolSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    toolkitId?: boolean
    toolId?: boolean
    toolkit?: boolean | ToolkitDefaultArgs<ExtArgs>
    tool?: boolean | ToolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["toolkitTool"]>

  export type ToolkitToolSelectScalar = {
    toolkitId?: boolean
    toolId?: boolean
  }

  export type ToolkitToolOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"toolkitId" | "toolId", ExtArgs["result"]["toolkitTool"]>
  export type ToolkitToolInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    toolkit?: boolean | ToolkitDefaultArgs<ExtArgs>
    tool?: boolean | ToolDefaultArgs<ExtArgs>
  }
  export type ToolkitToolIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    toolkit?: boolean | ToolkitDefaultArgs<ExtArgs>
    tool?: boolean | ToolDefaultArgs<ExtArgs>
  }
  export type ToolkitToolIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    toolkit?: boolean | ToolkitDefaultArgs<ExtArgs>
    tool?: boolean | ToolDefaultArgs<ExtArgs>
  }

  export type $ToolkitToolPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ToolkitTool"
    objects: {
      toolkit: Prisma.$ToolkitPayload<ExtArgs>
      tool: Prisma.$ToolPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      toolkitId: string
      toolId: string
    }, ExtArgs["result"]["toolkitTool"]>
    composites: {}
  }

  type ToolkitToolGetPayload<S extends boolean | null | undefined | ToolkitToolDefaultArgs> = $Result.GetResult<Prisma.$ToolkitToolPayload, S>

  type ToolkitToolCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ToolkitToolFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ToolkitToolCountAggregateInputType | true
    }

  export interface ToolkitToolDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ToolkitTool'], meta: { name: 'ToolkitTool' } }
    /**
     * Find zero or one ToolkitTool that matches the filter.
     * @param {ToolkitToolFindUniqueArgs} args - Arguments to find a ToolkitTool
     * @example
     * // Get one ToolkitTool
     * const toolkitTool = await prisma.toolkitTool.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ToolkitToolFindUniqueArgs>(args: SelectSubset<T, ToolkitToolFindUniqueArgs<ExtArgs>>): Prisma__ToolkitToolClient<$Result.GetResult<Prisma.$ToolkitToolPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ToolkitTool that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ToolkitToolFindUniqueOrThrowArgs} args - Arguments to find a ToolkitTool
     * @example
     * // Get one ToolkitTool
     * const toolkitTool = await prisma.toolkitTool.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ToolkitToolFindUniqueOrThrowArgs>(args: SelectSubset<T, ToolkitToolFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ToolkitToolClient<$Result.GetResult<Prisma.$ToolkitToolPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ToolkitTool that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToolkitToolFindFirstArgs} args - Arguments to find a ToolkitTool
     * @example
     * // Get one ToolkitTool
     * const toolkitTool = await prisma.toolkitTool.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ToolkitToolFindFirstArgs>(args?: SelectSubset<T, ToolkitToolFindFirstArgs<ExtArgs>>): Prisma__ToolkitToolClient<$Result.GetResult<Prisma.$ToolkitToolPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ToolkitTool that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToolkitToolFindFirstOrThrowArgs} args - Arguments to find a ToolkitTool
     * @example
     * // Get one ToolkitTool
     * const toolkitTool = await prisma.toolkitTool.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ToolkitToolFindFirstOrThrowArgs>(args?: SelectSubset<T, ToolkitToolFindFirstOrThrowArgs<ExtArgs>>): Prisma__ToolkitToolClient<$Result.GetResult<Prisma.$ToolkitToolPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ToolkitTools that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToolkitToolFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ToolkitTools
     * const toolkitTools = await prisma.toolkitTool.findMany()
     * 
     * // Get first 10 ToolkitTools
     * const toolkitTools = await prisma.toolkitTool.findMany({ take: 10 })
     * 
     * // Only select the `toolkitId`
     * const toolkitToolWithToolkitIdOnly = await prisma.toolkitTool.findMany({ select: { toolkitId: true } })
     * 
     */
    findMany<T extends ToolkitToolFindManyArgs>(args?: SelectSubset<T, ToolkitToolFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ToolkitToolPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ToolkitTool.
     * @param {ToolkitToolCreateArgs} args - Arguments to create a ToolkitTool.
     * @example
     * // Create one ToolkitTool
     * const ToolkitTool = await prisma.toolkitTool.create({
     *   data: {
     *     // ... data to create a ToolkitTool
     *   }
     * })
     * 
     */
    create<T extends ToolkitToolCreateArgs>(args: SelectSubset<T, ToolkitToolCreateArgs<ExtArgs>>): Prisma__ToolkitToolClient<$Result.GetResult<Prisma.$ToolkitToolPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ToolkitTools.
     * @param {ToolkitToolCreateManyArgs} args - Arguments to create many ToolkitTools.
     * @example
     * // Create many ToolkitTools
     * const toolkitTool = await prisma.toolkitTool.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ToolkitToolCreateManyArgs>(args?: SelectSubset<T, ToolkitToolCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ToolkitTools and returns the data saved in the database.
     * @param {ToolkitToolCreateManyAndReturnArgs} args - Arguments to create many ToolkitTools.
     * @example
     * // Create many ToolkitTools
     * const toolkitTool = await prisma.toolkitTool.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ToolkitTools and only return the `toolkitId`
     * const toolkitToolWithToolkitIdOnly = await prisma.toolkitTool.createManyAndReturn({
     *   select: { toolkitId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ToolkitToolCreateManyAndReturnArgs>(args?: SelectSubset<T, ToolkitToolCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ToolkitToolPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ToolkitTool.
     * @param {ToolkitToolDeleteArgs} args - Arguments to delete one ToolkitTool.
     * @example
     * // Delete one ToolkitTool
     * const ToolkitTool = await prisma.toolkitTool.delete({
     *   where: {
     *     // ... filter to delete one ToolkitTool
     *   }
     * })
     * 
     */
    delete<T extends ToolkitToolDeleteArgs>(args: SelectSubset<T, ToolkitToolDeleteArgs<ExtArgs>>): Prisma__ToolkitToolClient<$Result.GetResult<Prisma.$ToolkitToolPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ToolkitTool.
     * @param {ToolkitToolUpdateArgs} args - Arguments to update one ToolkitTool.
     * @example
     * // Update one ToolkitTool
     * const toolkitTool = await prisma.toolkitTool.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ToolkitToolUpdateArgs>(args: SelectSubset<T, ToolkitToolUpdateArgs<ExtArgs>>): Prisma__ToolkitToolClient<$Result.GetResult<Prisma.$ToolkitToolPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ToolkitTools.
     * @param {ToolkitToolDeleteManyArgs} args - Arguments to filter ToolkitTools to delete.
     * @example
     * // Delete a few ToolkitTools
     * const { count } = await prisma.toolkitTool.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ToolkitToolDeleteManyArgs>(args?: SelectSubset<T, ToolkitToolDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ToolkitTools.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToolkitToolUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ToolkitTools
     * const toolkitTool = await prisma.toolkitTool.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ToolkitToolUpdateManyArgs>(args: SelectSubset<T, ToolkitToolUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ToolkitTools and returns the data updated in the database.
     * @param {ToolkitToolUpdateManyAndReturnArgs} args - Arguments to update many ToolkitTools.
     * @example
     * // Update many ToolkitTools
     * const toolkitTool = await prisma.toolkitTool.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ToolkitTools and only return the `toolkitId`
     * const toolkitToolWithToolkitIdOnly = await prisma.toolkitTool.updateManyAndReturn({
     *   select: { toolkitId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ToolkitToolUpdateManyAndReturnArgs>(args: SelectSubset<T, ToolkitToolUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ToolkitToolPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ToolkitTool.
     * @param {ToolkitToolUpsertArgs} args - Arguments to update or create a ToolkitTool.
     * @example
     * // Update or create a ToolkitTool
     * const toolkitTool = await prisma.toolkitTool.upsert({
     *   create: {
     *     // ... data to create a ToolkitTool
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ToolkitTool we want to update
     *   }
     * })
     */
    upsert<T extends ToolkitToolUpsertArgs>(args: SelectSubset<T, ToolkitToolUpsertArgs<ExtArgs>>): Prisma__ToolkitToolClient<$Result.GetResult<Prisma.$ToolkitToolPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ToolkitTools.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToolkitToolCountArgs} args - Arguments to filter ToolkitTools to count.
     * @example
     * // Count the number of ToolkitTools
     * const count = await prisma.toolkitTool.count({
     *   where: {
     *     // ... the filter for the ToolkitTools we want to count
     *   }
     * })
    **/
    count<T extends ToolkitToolCountArgs>(
      args?: Subset<T, ToolkitToolCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ToolkitToolCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ToolkitTool.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToolkitToolAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ToolkitToolAggregateArgs>(args: Subset<T, ToolkitToolAggregateArgs>): Prisma.PrismaPromise<GetToolkitToolAggregateType<T>>

    /**
     * Group by ToolkitTool.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToolkitToolGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ToolkitToolGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ToolkitToolGroupByArgs['orderBy'] }
        : { orderBy?: ToolkitToolGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ToolkitToolGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetToolkitToolGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ToolkitTool model
   */
  readonly fields: ToolkitToolFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ToolkitTool.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ToolkitToolClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    toolkit<T extends ToolkitDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ToolkitDefaultArgs<ExtArgs>>): Prisma__ToolkitClient<$Result.GetResult<Prisma.$ToolkitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tool<T extends ToolDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ToolDefaultArgs<ExtArgs>>): Prisma__ToolClient<$Result.GetResult<Prisma.$ToolPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ToolkitTool model
   */
  interface ToolkitToolFieldRefs {
    readonly toolkitId: FieldRef<"ToolkitTool", 'String'>
    readonly toolId: FieldRef<"ToolkitTool", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ToolkitTool findUnique
   */
  export type ToolkitToolFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToolkitTool
     */
    select?: ToolkitToolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToolkitTool
     */
    omit?: ToolkitToolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolkitToolInclude<ExtArgs> | null
    /**
     * Filter, which ToolkitTool to fetch.
     */
    where: ToolkitToolWhereUniqueInput
  }

  /**
   * ToolkitTool findUniqueOrThrow
   */
  export type ToolkitToolFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToolkitTool
     */
    select?: ToolkitToolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToolkitTool
     */
    omit?: ToolkitToolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolkitToolInclude<ExtArgs> | null
    /**
     * Filter, which ToolkitTool to fetch.
     */
    where: ToolkitToolWhereUniqueInput
  }

  /**
   * ToolkitTool findFirst
   */
  export type ToolkitToolFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToolkitTool
     */
    select?: ToolkitToolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToolkitTool
     */
    omit?: ToolkitToolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolkitToolInclude<ExtArgs> | null
    /**
     * Filter, which ToolkitTool to fetch.
     */
    where?: ToolkitToolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ToolkitTools to fetch.
     */
    orderBy?: ToolkitToolOrderByWithRelationInput | ToolkitToolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ToolkitTools.
     */
    cursor?: ToolkitToolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ToolkitTools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ToolkitTools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ToolkitTools.
     */
    distinct?: ToolkitToolScalarFieldEnum | ToolkitToolScalarFieldEnum[]
  }

  /**
   * ToolkitTool findFirstOrThrow
   */
  export type ToolkitToolFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToolkitTool
     */
    select?: ToolkitToolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToolkitTool
     */
    omit?: ToolkitToolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolkitToolInclude<ExtArgs> | null
    /**
     * Filter, which ToolkitTool to fetch.
     */
    where?: ToolkitToolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ToolkitTools to fetch.
     */
    orderBy?: ToolkitToolOrderByWithRelationInput | ToolkitToolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ToolkitTools.
     */
    cursor?: ToolkitToolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ToolkitTools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ToolkitTools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ToolkitTools.
     */
    distinct?: ToolkitToolScalarFieldEnum | ToolkitToolScalarFieldEnum[]
  }

  /**
   * ToolkitTool findMany
   */
  export type ToolkitToolFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToolkitTool
     */
    select?: ToolkitToolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToolkitTool
     */
    omit?: ToolkitToolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolkitToolInclude<ExtArgs> | null
    /**
     * Filter, which ToolkitTools to fetch.
     */
    where?: ToolkitToolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ToolkitTools to fetch.
     */
    orderBy?: ToolkitToolOrderByWithRelationInput | ToolkitToolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ToolkitTools.
     */
    cursor?: ToolkitToolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ToolkitTools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ToolkitTools.
     */
    skip?: number
    distinct?: ToolkitToolScalarFieldEnum | ToolkitToolScalarFieldEnum[]
  }

  /**
   * ToolkitTool create
   */
  export type ToolkitToolCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToolkitTool
     */
    select?: ToolkitToolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToolkitTool
     */
    omit?: ToolkitToolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolkitToolInclude<ExtArgs> | null
    /**
     * The data needed to create a ToolkitTool.
     */
    data: XOR<ToolkitToolCreateInput, ToolkitToolUncheckedCreateInput>
  }

  /**
   * ToolkitTool createMany
   */
  export type ToolkitToolCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ToolkitTools.
     */
    data: ToolkitToolCreateManyInput | ToolkitToolCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ToolkitTool createManyAndReturn
   */
  export type ToolkitToolCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToolkitTool
     */
    select?: ToolkitToolSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ToolkitTool
     */
    omit?: ToolkitToolOmit<ExtArgs> | null
    /**
     * The data used to create many ToolkitTools.
     */
    data: ToolkitToolCreateManyInput | ToolkitToolCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolkitToolIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ToolkitTool update
   */
  export type ToolkitToolUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToolkitTool
     */
    select?: ToolkitToolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToolkitTool
     */
    omit?: ToolkitToolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolkitToolInclude<ExtArgs> | null
    /**
     * The data needed to update a ToolkitTool.
     */
    data: XOR<ToolkitToolUpdateInput, ToolkitToolUncheckedUpdateInput>
    /**
     * Choose, which ToolkitTool to update.
     */
    where: ToolkitToolWhereUniqueInput
  }

  /**
   * ToolkitTool updateMany
   */
  export type ToolkitToolUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ToolkitTools.
     */
    data: XOR<ToolkitToolUpdateManyMutationInput, ToolkitToolUncheckedUpdateManyInput>
    /**
     * Filter which ToolkitTools to update
     */
    where?: ToolkitToolWhereInput
    /**
     * Limit how many ToolkitTools to update.
     */
    limit?: number
  }

  /**
   * ToolkitTool updateManyAndReturn
   */
  export type ToolkitToolUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToolkitTool
     */
    select?: ToolkitToolSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ToolkitTool
     */
    omit?: ToolkitToolOmit<ExtArgs> | null
    /**
     * The data used to update ToolkitTools.
     */
    data: XOR<ToolkitToolUpdateManyMutationInput, ToolkitToolUncheckedUpdateManyInput>
    /**
     * Filter which ToolkitTools to update
     */
    where?: ToolkitToolWhereInput
    /**
     * Limit how many ToolkitTools to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolkitToolIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ToolkitTool upsert
   */
  export type ToolkitToolUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToolkitTool
     */
    select?: ToolkitToolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToolkitTool
     */
    omit?: ToolkitToolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolkitToolInclude<ExtArgs> | null
    /**
     * The filter to search for the ToolkitTool to update in case it exists.
     */
    where: ToolkitToolWhereUniqueInput
    /**
     * In case the ToolkitTool found by the `where` argument doesn't exist, create a new ToolkitTool with this data.
     */
    create: XOR<ToolkitToolCreateInput, ToolkitToolUncheckedCreateInput>
    /**
     * In case the ToolkitTool was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ToolkitToolUpdateInput, ToolkitToolUncheckedUpdateInput>
  }

  /**
   * ToolkitTool delete
   */
  export type ToolkitToolDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToolkitTool
     */
    select?: ToolkitToolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToolkitTool
     */
    omit?: ToolkitToolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolkitToolInclude<ExtArgs> | null
    /**
     * Filter which ToolkitTool to delete.
     */
    where: ToolkitToolWhereUniqueInput
  }

  /**
   * ToolkitTool deleteMany
   */
  export type ToolkitToolDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ToolkitTools to delete
     */
    where?: ToolkitToolWhereInput
    /**
     * Limit how many ToolkitTools to delete.
     */
    limit?: number
  }

  /**
   * ToolkitTool without action
   */
  export type ToolkitToolDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToolkitTool
     */
    select?: ToolkitToolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToolkitTool
     */
    omit?: ToolkitToolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolkitToolInclude<ExtArgs> | null
  }


  /**
   * Model SurveyResponse
   */

  export type AggregateSurveyResponse = {
    _count: SurveyResponseCountAggregateOutputType | null
    _avg: SurveyResponseAvgAggregateOutputType | null
    _sum: SurveyResponseSumAggregateOutputType | null
    _min: SurveyResponseMinAggregateOutputType | null
    _max: SurveyResponseMaxAggregateOutputType | null
  }

  export type SurveyResponseAvgAggregateOutputType = {
    developmentPercentage: number | null
    terminalImportance: number | null
    batteryLifeImportance: number | null
    matchScore: number | null
  }

  export type SurveyResponseSumAggregateOutputType = {
    developmentPercentage: number | null
    terminalImportance: number | null
    batteryLifeImportance: number | null
    matchScore: number | null
  }

  export type SurveyResponseMinAggregateOutputType = {
    id: string | null
    submittedAt: Date | null
    name: string | null
    email: string | null
    position: string | null
    primaryRole: string | null
    developmentPercentage: number | null
    primaryOS: string | null
    preferredOS: string | null
    osPreferenceReason: string | null
    otherLanguages: string | null
    otherDevelopmentType: string | null
    resourceIntensiveEnvironments: boolean | null
    multipleEnvironments: boolean | null
    terminalImportance: number | null
    clientPresentationFrequency: string | null
    largeDataModels: boolean | null
    specializedSoftware: boolean | null
    specializedSoftwareList: string | null
    batteryLifeImportance: number | null
    remoteWorkFrequency: string | null
    otherTools: string | null
    simultaneousApplications: string | null
    multipleWorkspaces: boolean | null
    typicalBrowserTabs: string | null
    externalDisplays: string | null
    resourceIntensiveApps: boolean | null
    resourceIntensiveAppsList: string | null
    matchedToolkitId: string | null
    matchScore: number | null
  }

  export type SurveyResponseMaxAggregateOutputType = {
    id: string | null
    submittedAt: Date | null
    name: string | null
    email: string | null
    position: string | null
    primaryRole: string | null
    developmentPercentage: number | null
    primaryOS: string | null
    preferredOS: string | null
    osPreferenceReason: string | null
    otherLanguages: string | null
    otherDevelopmentType: string | null
    resourceIntensiveEnvironments: boolean | null
    multipleEnvironments: boolean | null
    terminalImportance: number | null
    clientPresentationFrequency: string | null
    largeDataModels: boolean | null
    specializedSoftware: boolean | null
    specializedSoftwareList: string | null
    batteryLifeImportance: number | null
    remoteWorkFrequency: string | null
    otherTools: string | null
    simultaneousApplications: string | null
    multipleWorkspaces: boolean | null
    typicalBrowserTabs: string | null
    externalDisplays: string | null
    resourceIntensiveApps: boolean | null
    resourceIntensiveAppsList: string | null
    matchedToolkitId: string | null
    matchScore: number | null
  }

  export type SurveyResponseCountAggregateOutputType = {
    id: number
    submittedAt: number
    name: number
    email: number
    position: number
    primaryRole: number
    developmentPercentage: number
    primaryOS: number
    experienceWithOtherOS: number
    preferredOS: number
    osPreferenceReason: number
    programmingLanguages: number
    otherLanguages: number
    developmentType: number
    otherDevelopmentType: number
    resourceIntensiveEnvironments: number
    multipleEnvironments: number
    terminalImportance: number
    clientPresentationFrequency: number
    largeDataModels: number
    specializedSoftware: number
    specializedSoftwareList: number
    batteryLifeImportance: number
    remoteWorkFrequency: number
    selectedTools: number
    otherTools: number
    simultaneousApplications: number
    multipleWorkspaces: number
    typicalBrowserTabs: number
    externalDisplays: number
    resourceIntensiveApps: number
    resourceIntensiveAppsList: number
    matchedToolkitId: number
    matchScore: number
    _all: number
  }


  export type SurveyResponseAvgAggregateInputType = {
    developmentPercentage?: true
    terminalImportance?: true
    batteryLifeImportance?: true
    matchScore?: true
  }

  export type SurveyResponseSumAggregateInputType = {
    developmentPercentage?: true
    terminalImportance?: true
    batteryLifeImportance?: true
    matchScore?: true
  }

  export type SurveyResponseMinAggregateInputType = {
    id?: true
    submittedAt?: true
    name?: true
    email?: true
    position?: true
    primaryRole?: true
    developmentPercentage?: true
    primaryOS?: true
    preferredOS?: true
    osPreferenceReason?: true
    otherLanguages?: true
    otherDevelopmentType?: true
    resourceIntensiveEnvironments?: true
    multipleEnvironments?: true
    terminalImportance?: true
    clientPresentationFrequency?: true
    largeDataModels?: true
    specializedSoftware?: true
    specializedSoftwareList?: true
    batteryLifeImportance?: true
    remoteWorkFrequency?: true
    otherTools?: true
    simultaneousApplications?: true
    multipleWorkspaces?: true
    typicalBrowserTabs?: true
    externalDisplays?: true
    resourceIntensiveApps?: true
    resourceIntensiveAppsList?: true
    matchedToolkitId?: true
    matchScore?: true
  }

  export type SurveyResponseMaxAggregateInputType = {
    id?: true
    submittedAt?: true
    name?: true
    email?: true
    position?: true
    primaryRole?: true
    developmentPercentage?: true
    primaryOS?: true
    preferredOS?: true
    osPreferenceReason?: true
    otherLanguages?: true
    otherDevelopmentType?: true
    resourceIntensiveEnvironments?: true
    multipleEnvironments?: true
    terminalImportance?: true
    clientPresentationFrequency?: true
    largeDataModels?: true
    specializedSoftware?: true
    specializedSoftwareList?: true
    batteryLifeImportance?: true
    remoteWorkFrequency?: true
    otherTools?: true
    simultaneousApplications?: true
    multipleWorkspaces?: true
    typicalBrowserTabs?: true
    externalDisplays?: true
    resourceIntensiveApps?: true
    resourceIntensiveAppsList?: true
    matchedToolkitId?: true
    matchScore?: true
  }

  export type SurveyResponseCountAggregateInputType = {
    id?: true
    submittedAt?: true
    name?: true
    email?: true
    position?: true
    primaryRole?: true
    developmentPercentage?: true
    primaryOS?: true
    experienceWithOtherOS?: true
    preferredOS?: true
    osPreferenceReason?: true
    programmingLanguages?: true
    otherLanguages?: true
    developmentType?: true
    otherDevelopmentType?: true
    resourceIntensiveEnvironments?: true
    multipleEnvironments?: true
    terminalImportance?: true
    clientPresentationFrequency?: true
    largeDataModels?: true
    specializedSoftware?: true
    specializedSoftwareList?: true
    batteryLifeImportance?: true
    remoteWorkFrequency?: true
    selectedTools?: true
    otherTools?: true
    simultaneousApplications?: true
    multipleWorkspaces?: true
    typicalBrowserTabs?: true
    externalDisplays?: true
    resourceIntensiveApps?: true
    resourceIntensiveAppsList?: true
    matchedToolkitId?: true
    matchScore?: true
    _all?: true
  }

  export type SurveyResponseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SurveyResponse to aggregate.
     */
    where?: SurveyResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SurveyResponses to fetch.
     */
    orderBy?: SurveyResponseOrderByWithRelationInput | SurveyResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SurveyResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SurveyResponses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SurveyResponses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SurveyResponses
    **/
    _count?: true | SurveyResponseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SurveyResponseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SurveyResponseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SurveyResponseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SurveyResponseMaxAggregateInputType
  }

  export type GetSurveyResponseAggregateType<T extends SurveyResponseAggregateArgs> = {
        [P in keyof T & keyof AggregateSurveyResponse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSurveyResponse[P]>
      : GetScalarType<T[P], AggregateSurveyResponse[P]>
  }




  export type SurveyResponseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SurveyResponseWhereInput
    orderBy?: SurveyResponseOrderByWithAggregationInput | SurveyResponseOrderByWithAggregationInput[]
    by: SurveyResponseScalarFieldEnum[] | SurveyResponseScalarFieldEnum
    having?: SurveyResponseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SurveyResponseCountAggregateInputType | true
    _avg?: SurveyResponseAvgAggregateInputType
    _sum?: SurveyResponseSumAggregateInputType
    _min?: SurveyResponseMinAggregateInputType
    _max?: SurveyResponseMaxAggregateInputType
  }

  export type SurveyResponseGroupByOutputType = {
    id: string
    submittedAt: Date
    name: string
    email: string
    position: string
    primaryRole: string | null
    developmentPercentage: number | null
    primaryOS: string | null
    experienceWithOtherOS: string[]
    preferredOS: string | null
    osPreferenceReason: string | null
    programmingLanguages: string[]
    otherLanguages: string | null
    developmentType: string[]
    otherDevelopmentType: string | null
    resourceIntensiveEnvironments: boolean | null
    multipleEnvironments: boolean | null
    terminalImportance: number | null
    clientPresentationFrequency: string | null
    largeDataModels: boolean | null
    specializedSoftware: boolean | null
    specializedSoftwareList: string | null
    batteryLifeImportance: number | null
    remoteWorkFrequency: string | null
    selectedTools: string[]
    otherTools: string | null
    simultaneousApplications: string | null
    multipleWorkspaces: boolean | null
    typicalBrowserTabs: string | null
    externalDisplays: string | null
    resourceIntensiveApps: boolean | null
    resourceIntensiveAppsList: string | null
    matchedToolkitId: string | null
    matchScore: number | null
    _count: SurveyResponseCountAggregateOutputType | null
    _avg: SurveyResponseAvgAggregateOutputType | null
    _sum: SurveyResponseSumAggregateOutputType | null
    _min: SurveyResponseMinAggregateOutputType | null
    _max: SurveyResponseMaxAggregateOutputType | null
  }

  type GetSurveyResponseGroupByPayload<T extends SurveyResponseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SurveyResponseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SurveyResponseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SurveyResponseGroupByOutputType[P]>
            : GetScalarType<T[P], SurveyResponseGroupByOutputType[P]>
        }
      >
    >


  export type SurveyResponseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    submittedAt?: boolean
    name?: boolean
    email?: boolean
    position?: boolean
    primaryRole?: boolean
    developmentPercentage?: boolean
    primaryOS?: boolean
    experienceWithOtherOS?: boolean
    preferredOS?: boolean
    osPreferenceReason?: boolean
    programmingLanguages?: boolean
    otherLanguages?: boolean
    developmentType?: boolean
    otherDevelopmentType?: boolean
    resourceIntensiveEnvironments?: boolean
    multipleEnvironments?: boolean
    terminalImportance?: boolean
    clientPresentationFrequency?: boolean
    largeDataModels?: boolean
    specializedSoftware?: boolean
    specializedSoftwareList?: boolean
    batteryLifeImportance?: boolean
    remoteWorkFrequency?: boolean
    selectedTools?: boolean
    otherTools?: boolean
    simultaneousApplications?: boolean
    multipleWorkspaces?: boolean
    typicalBrowserTabs?: boolean
    externalDisplays?: boolean
    resourceIntensiveApps?: boolean
    resourceIntensiveAppsList?: boolean
    matchedToolkitId?: boolean
    matchScore?: boolean
    matchedToolkit?: boolean | SurveyResponse$matchedToolkitArgs<ExtArgs>
  }, ExtArgs["result"]["surveyResponse"]>

  export type SurveyResponseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    submittedAt?: boolean
    name?: boolean
    email?: boolean
    position?: boolean
    primaryRole?: boolean
    developmentPercentage?: boolean
    primaryOS?: boolean
    experienceWithOtherOS?: boolean
    preferredOS?: boolean
    osPreferenceReason?: boolean
    programmingLanguages?: boolean
    otherLanguages?: boolean
    developmentType?: boolean
    otherDevelopmentType?: boolean
    resourceIntensiveEnvironments?: boolean
    multipleEnvironments?: boolean
    terminalImportance?: boolean
    clientPresentationFrequency?: boolean
    largeDataModels?: boolean
    specializedSoftware?: boolean
    specializedSoftwareList?: boolean
    batteryLifeImportance?: boolean
    remoteWorkFrequency?: boolean
    selectedTools?: boolean
    otherTools?: boolean
    simultaneousApplications?: boolean
    multipleWorkspaces?: boolean
    typicalBrowserTabs?: boolean
    externalDisplays?: boolean
    resourceIntensiveApps?: boolean
    resourceIntensiveAppsList?: boolean
    matchedToolkitId?: boolean
    matchScore?: boolean
    matchedToolkit?: boolean | SurveyResponse$matchedToolkitArgs<ExtArgs>
  }, ExtArgs["result"]["surveyResponse"]>

  export type SurveyResponseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    submittedAt?: boolean
    name?: boolean
    email?: boolean
    position?: boolean
    primaryRole?: boolean
    developmentPercentage?: boolean
    primaryOS?: boolean
    experienceWithOtherOS?: boolean
    preferredOS?: boolean
    osPreferenceReason?: boolean
    programmingLanguages?: boolean
    otherLanguages?: boolean
    developmentType?: boolean
    otherDevelopmentType?: boolean
    resourceIntensiveEnvironments?: boolean
    multipleEnvironments?: boolean
    terminalImportance?: boolean
    clientPresentationFrequency?: boolean
    largeDataModels?: boolean
    specializedSoftware?: boolean
    specializedSoftwareList?: boolean
    batteryLifeImportance?: boolean
    remoteWorkFrequency?: boolean
    selectedTools?: boolean
    otherTools?: boolean
    simultaneousApplications?: boolean
    multipleWorkspaces?: boolean
    typicalBrowserTabs?: boolean
    externalDisplays?: boolean
    resourceIntensiveApps?: boolean
    resourceIntensiveAppsList?: boolean
    matchedToolkitId?: boolean
    matchScore?: boolean
    matchedToolkit?: boolean | SurveyResponse$matchedToolkitArgs<ExtArgs>
  }, ExtArgs["result"]["surveyResponse"]>

  export type SurveyResponseSelectScalar = {
    id?: boolean
    submittedAt?: boolean
    name?: boolean
    email?: boolean
    position?: boolean
    primaryRole?: boolean
    developmentPercentage?: boolean
    primaryOS?: boolean
    experienceWithOtherOS?: boolean
    preferredOS?: boolean
    osPreferenceReason?: boolean
    programmingLanguages?: boolean
    otherLanguages?: boolean
    developmentType?: boolean
    otherDevelopmentType?: boolean
    resourceIntensiveEnvironments?: boolean
    multipleEnvironments?: boolean
    terminalImportance?: boolean
    clientPresentationFrequency?: boolean
    largeDataModels?: boolean
    specializedSoftware?: boolean
    specializedSoftwareList?: boolean
    batteryLifeImportance?: boolean
    remoteWorkFrequency?: boolean
    selectedTools?: boolean
    otherTools?: boolean
    simultaneousApplications?: boolean
    multipleWorkspaces?: boolean
    typicalBrowserTabs?: boolean
    externalDisplays?: boolean
    resourceIntensiveApps?: boolean
    resourceIntensiveAppsList?: boolean
    matchedToolkitId?: boolean
    matchScore?: boolean
  }

  export type SurveyResponseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "submittedAt" | "name" | "email" | "position" | "primaryRole" | "developmentPercentage" | "primaryOS" | "experienceWithOtherOS" | "preferredOS" | "osPreferenceReason" | "programmingLanguages" | "otherLanguages" | "developmentType" | "otherDevelopmentType" | "resourceIntensiveEnvironments" | "multipleEnvironments" | "terminalImportance" | "clientPresentationFrequency" | "largeDataModels" | "specializedSoftware" | "specializedSoftwareList" | "batteryLifeImportance" | "remoteWorkFrequency" | "selectedTools" | "otherTools" | "simultaneousApplications" | "multipleWorkspaces" | "typicalBrowserTabs" | "externalDisplays" | "resourceIntensiveApps" | "resourceIntensiveAppsList" | "matchedToolkitId" | "matchScore", ExtArgs["result"]["surveyResponse"]>
  export type SurveyResponseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    matchedToolkit?: boolean | SurveyResponse$matchedToolkitArgs<ExtArgs>
  }
  export type SurveyResponseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    matchedToolkit?: boolean | SurveyResponse$matchedToolkitArgs<ExtArgs>
  }
  export type SurveyResponseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    matchedToolkit?: boolean | SurveyResponse$matchedToolkitArgs<ExtArgs>
  }

  export type $SurveyResponsePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SurveyResponse"
    objects: {
      matchedToolkit: Prisma.$ToolkitPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      submittedAt: Date
      name: string
      email: string
      position: string
      primaryRole: string | null
      developmentPercentage: number | null
      primaryOS: string | null
      experienceWithOtherOS: string[]
      preferredOS: string | null
      osPreferenceReason: string | null
      programmingLanguages: string[]
      otherLanguages: string | null
      developmentType: string[]
      otherDevelopmentType: string | null
      resourceIntensiveEnvironments: boolean | null
      multipleEnvironments: boolean | null
      terminalImportance: number | null
      clientPresentationFrequency: string | null
      largeDataModels: boolean | null
      specializedSoftware: boolean | null
      specializedSoftwareList: string | null
      batteryLifeImportance: number | null
      remoteWorkFrequency: string | null
      selectedTools: string[]
      otherTools: string | null
      simultaneousApplications: string | null
      multipleWorkspaces: boolean | null
      typicalBrowserTabs: string | null
      externalDisplays: string | null
      resourceIntensiveApps: boolean | null
      resourceIntensiveAppsList: string | null
      matchedToolkitId: string | null
      matchScore: number | null
    }, ExtArgs["result"]["surveyResponse"]>
    composites: {}
  }

  type SurveyResponseGetPayload<S extends boolean | null | undefined | SurveyResponseDefaultArgs> = $Result.GetResult<Prisma.$SurveyResponsePayload, S>

  type SurveyResponseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SurveyResponseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SurveyResponseCountAggregateInputType | true
    }

  export interface SurveyResponseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SurveyResponse'], meta: { name: 'SurveyResponse' } }
    /**
     * Find zero or one SurveyResponse that matches the filter.
     * @param {SurveyResponseFindUniqueArgs} args - Arguments to find a SurveyResponse
     * @example
     * // Get one SurveyResponse
     * const surveyResponse = await prisma.surveyResponse.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SurveyResponseFindUniqueArgs>(args: SelectSubset<T, SurveyResponseFindUniqueArgs<ExtArgs>>): Prisma__SurveyResponseClient<$Result.GetResult<Prisma.$SurveyResponsePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SurveyResponse that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SurveyResponseFindUniqueOrThrowArgs} args - Arguments to find a SurveyResponse
     * @example
     * // Get one SurveyResponse
     * const surveyResponse = await prisma.surveyResponse.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SurveyResponseFindUniqueOrThrowArgs>(args: SelectSubset<T, SurveyResponseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SurveyResponseClient<$Result.GetResult<Prisma.$SurveyResponsePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SurveyResponse that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyResponseFindFirstArgs} args - Arguments to find a SurveyResponse
     * @example
     * // Get one SurveyResponse
     * const surveyResponse = await prisma.surveyResponse.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SurveyResponseFindFirstArgs>(args?: SelectSubset<T, SurveyResponseFindFirstArgs<ExtArgs>>): Prisma__SurveyResponseClient<$Result.GetResult<Prisma.$SurveyResponsePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SurveyResponse that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyResponseFindFirstOrThrowArgs} args - Arguments to find a SurveyResponse
     * @example
     * // Get one SurveyResponse
     * const surveyResponse = await prisma.surveyResponse.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SurveyResponseFindFirstOrThrowArgs>(args?: SelectSubset<T, SurveyResponseFindFirstOrThrowArgs<ExtArgs>>): Prisma__SurveyResponseClient<$Result.GetResult<Prisma.$SurveyResponsePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SurveyResponses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyResponseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SurveyResponses
     * const surveyResponses = await prisma.surveyResponse.findMany()
     * 
     * // Get first 10 SurveyResponses
     * const surveyResponses = await prisma.surveyResponse.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const surveyResponseWithIdOnly = await prisma.surveyResponse.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SurveyResponseFindManyArgs>(args?: SelectSubset<T, SurveyResponseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SurveyResponsePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SurveyResponse.
     * @param {SurveyResponseCreateArgs} args - Arguments to create a SurveyResponse.
     * @example
     * // Create one SurveyResponse
     * const SurveyResponse = await prisma.surveyResponse.create({
     *   data: {
     *     // ... data to create a SurveyResponse
     *   }
     * })
     * 
     */
    create<T extends SurveyResponseCreateArgs>(args: SelectSubset<T, SurveyResponseCreateArgs<ExtArgs>>): Prisma__SurveyResponseClient<$Result.GetResult<Prisma.$SurveyResponsePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SurveyResponses.
     * @param {SurveyResponseCreateManyArgs} args - Arguments to create many SurveyResponses.
     * @example
     * // Create many SurveyResponses
     * const surveyResponse = await prisma.surveyResponse.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SurveyResponseCreateManyArgs>(args?: SelectSubset<T, SurveyResponseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SurveyResponses and returns the data saved in the database.
     * @param {SurveyResponseCreateManyAndReturnArgs} args - Arguments to create many SurveyResponses.
     * @example
     * // Create many SurveyResponses
     * const surveyResponse = await prisma.surveyResponse.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SurveyResponses and only return the `id`
     * const surveyResponseWithIdOnly = await prisma.surveyResponse.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SurveyResponseCreateManyAndReturnArgs>(args?: SelectSubset<T, SurveyResponseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SurveyResponsePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SurveyResponse.
     * @param {SurveyResponseDeleteArgs} args - Arguments to delete one SurveyResponse.
     * @example
     * // Delete one SurveyResponse
     * const SurveyResponse = await prisma.surveyResponse.delete({
     *   where: {
     *     // ... filter to delete one SurveyResponse
     *   }
     * })
     * 
     */
    delete<T extends SurveyResponseDeleteArgs>(args: SelectSubset<T, SurveyResponseDeleteArgs<ExtArgs>>): Prisma__SurveyResponseClient<$Result.GetResult<Prisma.$SurveyResponsePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SurveyResponse.
     * @param {SurveyResponseUpdateArgs} args - Arguments to update one SurveyResponse.
     * @example
     * // Update one SurveyResponse
     * const surveyResponse = await prisma.surveyResponse.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SurveyResponseUpdateArgs>(args: SelectSubset<T, SurveyResponseUpdateArgs<ExtArgs>>): Prisma__SurveyResponseClient<$Result.GetResult<Prisma.$SurveyResponsePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SurveyResponses.
     * @param {SurveyResponseDeleteManyArgs} args - Arguments to filter SurveyResponses to delete.
     * @example
     * // Delete a few SurveyResponses
     * const { count } = await prisma.surveyResponse.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SurveyResponseDeleteManyArgs>(args?: SelectSubset<T, SurveyResponseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SurveyResponses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyResponseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SurveyResponses
     * const surveyResponse = await prisma.surveyResponse.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SurveyResponseUpdateManyArgs>(args: SelectSubset<T, SurveyResponseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SurveyResponses and returns the data updated in the database.
     * @param {SurveyResponseUpdateManyAndReturnArgs} args - Arguments to update many SurveyResponses.
     * @example
     * // Update many SurveyResponses
     * const surveyResponse = await prisma.surveyResponse.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SurveyResponses and only return the `id`
     * const surveyResponseWithIdOnly = await prisma.surveyResponse.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SurveyResponseUpdateManyAndReturnArgs>(args: SelectSubset<T, SurveyResponseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SurveyResponsePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SurveyResponse.
     * @param {SurveyResponseUpsertArgs} args - Arguments to update or create a SurveyResponse.
     * @example
     * // Update or create a SurveyResponse
     * const surveyResponse = await prisma.surveyResponse.upsert({
     *   create: {
     *     // ... data to create a SurveyResponse
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SurveyResponse we want to update
     *   }
     * })
     */
    upsert<T extends SurveyResponseUpsertArgs>(args: SelectSubset<T, SurveyResponseUpsertArgs<ExtArgs>>): Prisma__SurveyResponseClient<$Result.GetResult<Prisma.$SurveyResponsePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SurveyResponses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyResponseCountArgs} args - Arguments to filter SurveyResponses to count.
     * @example
     * // Count the number of SurveyResponses
     * const count = await prisma.surveyResponse.count({
     *   where: {
     *     // ... the filter for the SurveyResponses we want to count
     *   }
     * })
    **/
    count<T extends SurveyResponseCountArgs>(
      args?: Subset<T, SurveyResponseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SurveyResponseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SurveyResponse.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyResponseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SurveyResponseAggregateArgs>(args: Subset<T, SurveyResponseAggregateArgs>): Prisma.PrismaPromise<GetSurveyResponseAggregateType<T>>

    /**
     * Group by SurveyResponse.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyResponseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SurveyResponseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SurveyResponseGroupByArgs['orderBy'] }
        : { orderBy?: SurveyResponseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SurveyResponseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSurveyResponseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SurveyResponse model
   */
  readonly fields: SurveyResponseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SurveyResponse.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SurveyResponseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    matchedToolkit<T extends SurveyResponse$matchedToolkitArgs<ExtArgs> = {}>(args?: Subset<T, SurveyResponse$matchedToolkitArgs<ExtArgs>>): Prisma__ToolkitClient<$Result.GetResult<Prisma.$ToolkitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SurveyResponse model
   */
  interface SurveyResponseFieldRefs {
    readonly id: FieldRef<"SurveyResponse", 'String'>
    readonly submittedAt: FieldRef<"SurveyResponse", 'DateTime'>
    readonly name: FieldRef<"SurveyResponse", 'String'>
    readonly email: FieldRef<"SurveyResponse", 'String'>
    readonly position: FieldRef<"SurveyResponse", 'String'>
    readonly primaryRole: FieldRef<"SurveyResponse", 'String'>
    readonly developmentPercentage: FieldRef<"SurveyResponse", 'Int'>
    readonly primaryOS: FieldRef<"SurveyResponse", 'String'>
    readonly experienceWithOtherOS: FieldRef<"SurveyResponse", 'String[]'>
    readonly preferredOS: FieldRef<"SurveyResponse", 'String'>
    readonly osPreferenceReason: FieldRef<"SurveyResponse", 'String'>
    readonly programmingLanguages: FieldRef<"SurveyResponse", 'String[]'>
    readonly otherLanguages: FieldRef<"SurveyResponse", 'String'>
    readonly developmentType: FieldRef<"SurveyResponse", 'String[]'>
    readonly otherDevelopmentType: FieldRef<"SurveyResponse", 'String'>
    readonly resourceIntensiveEnvironments: FieldRef<"SurveyResponse", 'Boolean'>
    readonly multipleEnvironments: FieldRef<"SurveyResponse", 'Boolean'>
    readonly terminalImportance: FieldRef<"SurveyResponse", 'Int'>
    readonly clientPresentationFrequency: FieldRef<"SurveyResponse", 'String'>
    readonly largeDataModels: FieldRef<"SurveyResponse", 'Boolean'>
    readonly specializedSoftware: FieldRef<"SurveyResponse", 'Boolean'>
    readonly specializedSoftwareList: FieldRef<"SurveyResponse", 'String'>
    readonly batteryLifeImportance: FieldRef<"SurveyResponse", 'Int'>
    readonly remoteWorkFrequency: FieldRef<"SurveyResponse", 'String'>
    readonly selectedTools: FieldRef<"SurveyResponse", 'String[]'>
    readonly otherTools: FieldRef<"SurveyResponse", 'String'>
    readonly simultaneousApplications: FieldRef<"SurveyResponse", 'String'>
    readonly multipleWorkspaces: FieldRef<"SurveyResponse", 'Boolean'>
    readonly typicalBrowserTabs: FieldRef<"SurveyResponse", 'String'>
    readonly externalDisplays: FieldRef<"SurveyResponse", 'String'>
    readonly resourceIntensiveApps: FieldRef<"SurveyResponse", 'Boolean'>
    readonly resourceIntensiveAppsList: FieldRef<"SurveyResponse", 'String'>
    readonly matchedToolkitId: FieldRef<"SurveyResponse", 'String'>
    readonly matchScore: FieldRef<"SurveyResponse", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * SurveyResponse findUnique
   */
  export type SurveyResponseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyResponse
     */
    select?: SurveyResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyResponse
     */
    omit?: SurveyResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyResponseInclude<ExtArgs> | null
    /**
     * Filter, which SurveyResponse to fetch.
     */
    where: SurveyResponseWhereUniqueInput
  }

  /**
   * SurveyResponse findUniqueOrThrow
   */
  export type SurveyResponseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyResponse
     */
    select?: SurveyResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyResponse
     */
    omit?: SurveyResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyResponseInclude<ExtArgs> | null
    /**
     * Filter, which SurveyResponse to fetch.
     */
    where: SurveyResponseWhereUniqueInput
  }

  /**
   * SurveyResponse findFirst
   */
  export type SurveyResponseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyResponse
     */
    select?: SurveyResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyResponse
     */
    omit?: SurveyResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyResponseInclude<ExtArgs> | null
    /**
     * Filter, which SurveyResponse to fetch.
     */
    where?: SurveyResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SurveyResponses to fetch.
     */
    orderBy?: SurveyResponseOrderByWithRelationInput | SurveyResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SurveyResponses.
     */
    cursor?: SurveyResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SurveyResponses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SurveyResponses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SurveyResponses.
     */
    distinct?: SurveyResponseScalarFieldEnum | SurveyResponseScalarFieldEnum[]
  }

  /**
   * SurveyResponse findFirstOrThrow
   */
  export type SurveyResponseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyResponse
     */
    select?: SurveyResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyResponse
     */
    omit?: SurveyResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyResponseInclude<ExtArgs> | null
    /**
     * Filter, which SurveyResponse to fetch.
     */
    where?: SurveyResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SurveyResponses to fetch.
     */
    orderBy?: SurveyResponseOrderByWithRelationInput | SurveyResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SurveyResponses.
     */
    cursor?: SurveyResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SurveyResponses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SurveyResponses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SurveyResponses.
     */
    distinct?: SurveyResponseScalarFieldEnum | SurveyResponseScalarFieldEnum[]
  }

  /**
   * SurveyResponse findMany
   */
  export type SurveyResponseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyResponse
     */
    select?: SurveyResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyResponse
     */
    omit?: SurveyResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyResponseInclude<ExtArgs> | null
    /**
     * Filter, which SurveyResponses to fetch.
     */
    where?: SurveyResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SurveyResponses to fetch.
     */
    orderBy?: SurveyResponseOrderByWithRelationInput | SurveyResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SurveyResponses.
     */
    cursor?: SurveyResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SurveyResponses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SurveyResponses.
     */
    skip?: number
    distinct?: SurveyResponseScalarFieldEnum | SurveyResponseScalarFieldEnum[]
  }

  /**
   * SurveyResponse create
   */
  export type SurveyResponseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyResponse
     */
    select?: SurveyResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyResponse
     */
    omit?: SurveyResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyResponseInclude<ExtArgs> | null
    /**
     * The data needed to create a SurveyResponse.
     */
    data: XOR<SurveyResponseCreateInput, SurveyResponseUncheckedCreateInput>
  }

  /**
   * SurveyResponse createMany
   */
  export type SurveyResponseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SurveyResponses.
     */
    data: SurveyResponseCreateManyInput | SurveyResponseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SurveyResponse createManyAndReturn
   */
  export type SurveyResponseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyResponse
     */
    select?: SurveyResponseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyResponse
     */
    omit?: SurveyResponseOmit<ExtArgs> | null
    /**
     * The data used to create many SurveyResponses.
     */
    data: SurveyResponseCreateManyInput | SurveyResponseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyResponseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SurveyResponse update
   */
  export type SurveyResponseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyResponse
     */
    select?: SurveyResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyResponse
     */
    omit?: SurveyResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyResponseInclude<ExtArgs> | null
    /**
     * The data needed to update a SurveyResponse.
     */
    data: XOR<SurveyResponseUpdateInput, SurveyResponseUncheckedUpdateInput>
    /**
     * Choose, which SurveyResponse to update.
     */
    where: SurveyResponseWhereUniqueInput
  }

  /**
   * SurveyResponse updateMany
   */
  export type SurveyResponseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SurveyResponses.
     */
    data: XOR<SurveyResponseUpdateManyMutationInput, SurveyResponseUncheckedUpdateManyInput>
    /**
     * Filter which SurveyResponses to update
     */
    where?: SurveyResponseWhereInput
    /**
     * Limit how many SurveyResponses to update.
     */
    limit?: number
  }

  /**
   * SurveyResponse updateManyAndReturn
   */
  export type SurveyResponseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyResponse
     */
    select?: SurveyResponseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyResponse
     */
    omit?: SurveyResponseOmit<ExtArgs> | null
    /**
     * The data used to update SurveyResponses.
     */
    data: XOR<SurveyResponseUpdateManyMutationInput, SurveyResponseUncheckedUpdateManyInput>
    /**
     * Filter which SurveyResponses to update
     */
    where?: SurveyResponseWhereInput
    /**
     * Limit how many SurveyResponses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyResponseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SurveyResponse upsert
   */
  export type SurveyResponseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyResponse
     */
    select?: SurveyResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyResponse
     */
    omit?: SurveyResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyResponseInclude<ExtArgs> | null
    /**
     * The filter to search for the SurveyResponse to update in case it exists.
     */
    where: SurveyResponseWhereUniqueInput
    /**
     * In case the SurveyResponse found by the `where` argument doesn't exist, create a new SurveyResponse with this data.
     */
    create: XOR<SurveyResponseCreateInput, SurveyResponseUncheckedCreateInput>
    /**
     * In case the SurveyResponse was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SurveyResponseUpdateInput, SurveyResponseUncheckedUpdateInput>
  }

  /**
   * SurveyResponse delete
   */
  export type SurveyResponseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyResponse
     */
    select?: SurveyResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyResponse
     */
    omit?: SurveyResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyResponseInclude<ExtArgs> | null
    /**
     * Filter which SurveyResponse to delete.
     */
    where: SurveyResponseWhereUniqueInput
  }

  /**
   * SurveyResponse deleteMany
   */
  export type SurveyResponseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SurveyResponses to delete
     */
    where?: SurveyResponseWhereInput
    /**
     * Limit how many SurveyResponses to delete.
     */
    limit?: number
  }

  /**
   * SurveyResponse.matchedToolkit
   */
  export type SurveyResponse$matchedToolkitArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Toolkit
     */
    select?: ToolkitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Toolkit
     */
    omit?: ToolkitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolkitInclude<ExtArgs> | null
    where?: ToolkitWhereInput
  }

  /**
   * SurveyResponse without action
   */
  export type SurveyResponseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyResponse
     */
    select?: SurveyResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyResponse
     */
    omit?: SurveyResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyResponseInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PersonScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    department: 'department',
    position: 'position',
    pcReference: 'pcReference',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PersonScalarFieldEnum = (typeof PersonScalarFieldEnum)[keyof typeof PersonScalarFieldEnum]


  export const LaptopScalarFieldEnum: {
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
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LaptopScalarFieldEnum = (typeof LaptopScalarFieldEnum)[keyof typeof LaptopScalarFieldEnum]


  export const LaptopProfileScalarFieldEnum: {
    laptopId: 'laptopId',
    profile: 'profile'
  };

  export type LaptopProfileScalarFieldEnum = (typeof LaptopProfileScalarFieldEnum)[keyof typeof LaptopProfileScalarFieldEnum]


  export const LaptopOSScalarFieldEnum: {
    laptopId: 'laptopId',
    os: 'os'
  };

  export type LaptopOSScalarFieldEnum = (typeof LaptopOSScalarFieldEnum)[keyof typeof LaptopOSScalarFieldEnum]


  export const AccessoryScalarFieldEnum: {
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

  export type AccessoryScalarFieldEnum = (typeof AccessoryScalarFieldEnum)[keyof typeof AccessoryScalarFieldEnum]


  export const PackageScalarFieldEnum: {
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

  export type PackageScalarFieldEnum = (typeof PackageScalarFieldEnum)[keyof typeof PackageScalarFieldEnum]


  export const PackageAccessoryScalarFieldEnum: {
    packageId: 'packageId',
    accessoryId: 'accessoryId'
  };

  export type PackageAccessoryScalarFieldEnum = (typeof PackageAccessoryScalarFieldEnum)[keyof typeof PackageAccessoryScalarFieldEnum]


  export const PackageAssignmentScalarFieldEnum: {
    id: 'id',
    packageId: 'packageId',
    personId: 'personId',
    pcReference: 'pcReference',
    assignedAt: 'assignedAt'
  };

  export type PackageAssignmentScalarFieldEnum = (typeof PackageAssignmentScalarFieldEnum)[keyof typeof PackageAssignmentScalarFieldEnum]


  export const ToolScalarFieldEnum: {
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

  export type ToolScalarFieldEnum = (typeof ToolScalarFieldEnum)[keyof typeof ToolScalarFieldEnum]


  export const ToolAlternativeScalarFieldEnum: {
    toolId: 'toolId',
    alternative: 'alternative'
  };

  export type ToolAlternativeScalarFieldEnum = (typeof ToolAlternativeScalarFieldEnum)[keyof typeof ToolAlternativeScalarFieldEnum]


  export const ToolkitScalarFieldEnum: {
    id: 'id',
    profileName: 'profileName',
    description: 'description',
    operatingSystem: 'operatingSystem',
    icon: 'icon',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ToolkitScalarFieldEnum = (typeof ToolkitScalarFieldEnum)[keyof typeof ToolkitScalarFieldEnum]


  export const ToolkitToolScalarFieldEnum: {
    toolkitId: 'toolkitId',
    toolId: 'toolId'
  };

  export type ToolkitToolScalarFieldEnum = (typeof ToolkitToolScalarFieldEnum)[keyof typeof ToolkitToolScalarFieldEnum]


  export const SurveyResponseScalarFieldEnum: {
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

  export type SurveyResponseScalarFieldEnum = (typeof SurveyResponseScalarFieldEnum)[keyof typeof SurveyResponseScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type PersonWhereInput = {
    AND?: PersonWhereInput | PersonWhereInput[]
    OR?: PersonWhereInput[]
    NOT?: PersonWhereInput | PersonWhereInput[]
    id?: StringFilter<"Person"> | string
    name?: StringFilter<"Person"> | string
    email?: StringNullableFilter<"Person"> | string | null
    department?: StringNullableFilter<"Person"> | string | null
    position?: StringNullableFilter<"Person"> | string | null
    pcReference?: StringNullableFilter<"Person"> | string | null
    createdAt?: DateTimeFilter<"Person"> | Date | string
    updatedAt?: DateTimeFilter<"Person"> | Date | string
    packageAssignments?: PackageAssignmentListRelationFilter
  }

  export type PersonOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    pcReference?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    packageAssignments?: PackageAssignmentOrderByRelationAggregateInput
  }

  export type PersonWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: PersonWhereInput | PersonWhereInput[]
    OR?: PersonWhereInput[]
    NOT?: PersonWhereInput | PersonWhereInput[]
    name?: StringFilter<"Person"> | string
    department?: StringNullableFilter<"Person"> | string | null
    position?: StringNullableFilter<"Person"> | string | null
    pcReference?: StringNullableFilter<"Person"> | string | null
    createdAt?: DateTimeFilter<"Person"> | Date | string
    updatedAt?: DateTimeFilter<"Person"> | Date | string
    packageAssignments?: PackageAssignmentListRelationFilter
  }, "id" | "email">

  export type PersonOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    pcReference?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PersonCountOrderByAggregateInput
    _max?: PersonMaxOrderByAggregateInput
    _min?: PersonMinOrderByAggregateInput
  }

  export type PersonScalarWhereWithAggregatesInput = {
    AND?: PersonScalarWhereWithAggregatesInput | PersonScalarWhereWithAggregatesInput[]
    OR?: PersonScalarWhereWithAggregatesInput[]
    NOT?: PersonScalarWhereWithAggregatesInput | PersonScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Person"> | string
    name?: StringWithAggregatesFilter<"Person"> | string
    email?: StringNullableWithAggregatesFilter<"Person"> | string | null
    department?: StringNullableWithAggregatesFilter<"Person"> | string | null
    position?: StringNullableWithAggregatesFilter<"Person"> | string | null
    pcReference?: StringNullableWithAggregatesFilter<"Person"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Person"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Person"> | Date | string
  }

  export type LaptopWhereInput = {
    AND?: LaptopWhereInput | LaptopWhereInput[]
    OR?: LaptopWhereInput[]
    NOT?: LaptopWhereInput | LaptopWhereInput[]
    id?: StringFilter<"Laptop"> | string
    brand?: StringFilter<"Laptop"> | string
    model?: StringFilter<"Laptop"> | string
    price?: DecimalFilter<"Laptop"> | Decimal | DecimalJsLike | number | string
    priceType?: StringFilter<"Laptop"> | string
    processor?: StringFilter<"Laptop"> | string
    ram?: StringFilter<"Laptop"> | string
    storage?: StringFilter<"Laptop"> | string
    batteryLife?: DecimalFilter<"Laptop"> | Decimal | DecimalJsLike | number | string
    performanceScore?: DecimalFilter<"Laptop"> | Decimal | DecimalJsLike | number | string
    notes?: StringNullableFilter<"Laptop"> | string | null
    createdAt?: DateTimeFilter<"Laptop"> | Date | string
    updatedAt?: DateTimeFilter<"Laptop"> | Date | string
    supportedProfiles?: LaptopProfileListRelationFilter
    supportedOS?: LaptopOSListRelationFilter
    packages?: PackageListRelationFilter
  }

  export type LaptopOrderByWithRelationInput = {
    id?: SortOrder
    brand?: SortOrder
    model?: SortOrder
    price?: SortOrder
    priceType?: SortOrder
    processor?: SortOrder
    ram?: SortOrder
    storage?: SortOrder
    batteryLife?: SortOrder
    performanceScore?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    supportedProfiles?: LaptopProfileOrderByRelationAggregateInput
    supportedOS?: LaptopOSOrderByRelationAggregateInput
    packages?: PackageOrderByRelationAggregateInput
  }

  export type LaptopWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LaptopWhereInput | LaptopWhereInput[]
    OR?: LaptopWhereInput[]
    NOT?: LaptopWhereInput | LaptopWhereInput[]
    brand?: StringFilter<"Laptop"> | string
    model?: StringFilter<"Laptop"> | string
    price?: DecimalFilter<"Laptop"> | Decimal | DecimalJsLike | number | string
    priceType?: StringFilter<"Laptop"> | string
    processor?: StringFilter<"Laptop"> | string
    ram?: StringFilter<"Laptop"> | string
    storage?: StringFilter<"Laptop"> | string
    batteryLife?: DecimalFilter<"Laptop"> | Decimal | DecimalJsLike | number | string
    performanceScore?: DecimalFilter<"Laptop"> | Decimal | DecimalJsLike | number | string
    notes?: StringNullableFilter<"Laptop"> | string | null
    createdAt?: DateTimeFilter<"Laptop"> | Date | string
    updatedAt?: DateTimeFilter<"Laptop"> | Date | string
    supportedProfiles?: LaptopProfileListRelationFilter
    supportedOS?: LaptopOSListRelationFilter
    packages?: PackageListRelationFilter
  }, "id">

  export type LaptopOrderByWithAggregationInput = {
    id?: SortOrder
    brand?: SortOrder
    model?: SortOrder
    price?: SortOrder
    priceType?: SortOrder
    processor?: SortOrder
    ram?: SortOrder
    storage?: SortOrder
    batteryLife?: SortOrder
    performanceScore?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LaptopCountOrderByAggregateInput
    _avg?: LaptopAvgOrderByAggregateInput
    _max?: LaptopMaxOrderByAggregateInput
    _min?: LaptopMinOrderByAggregateInput
    _sum?: LaptopSumOrderByAggregateInput
  }

  export type LaptopScalarWhereWithAggregatesInput = {
    AND?: LaptopScalarWhereWithAggregatesInput | LaptopScalarWhereWithAggregatesInput[]
    OR?: LaptopScalarWhereWithAggregatesInput[]
    NOT?: LaptopScalarWhereWithAggregatesInput | LaptopScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Laptop"> | string
    brand?: StringWithAggregatesFilter<"Laptop"> | string
    model?: StringWithAggregatesFilter<"Laptop"> | string
    price?: DecimalWithAggregatesFilter<"Laptop"> | Decimal | DecimalJsLike | number | string
    priceType?: StringWithAggregatesFilter<"Laptop"> | string
    processor?: StringWithAggregatesFilter<"Laptop"> | string
    ram?: StringWithAggregatesFilter<"Laptop"> | string
    storage?: StringWithAggregatesFilter<"Laptop"> | string
    batteryLife?: DecimalWithAggregatesFilter<"Laptop"> | Decimal | DecimalJsLike | number | string
    performanceScore?: DecimalWithAggregatesFilter<"Laptop"> | Decimal | DecimalJsLike | number | string
    notes?: StringNullableWithAggregatesFilter<"Laptop"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Laptop"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Laptop"> | Date | string
  }

  export type LaptopProfileWhereInput = {
    AND?: LaptopProfileWhereInput | LaptopProfileWhereInput[]
    OR?: LaptopProfileWhereInput[]
    NOT?: LaptopProfileWhereInput | LaptopProfileWhereInput[]
    laptopId?: StringFilter<"LaptopProfile"> | string
    profile?: StringFilter<"LaptopProfile"> | string
    laptop?: XOR<LaptopScalarRelationFilter, LaptopWhereInput>
  }

  export type LaptopProfileOrderByWithRelationInput = {
    laptopId?: SortOrder
    profile?: SortOrder
    laptop?: LaptopOrderByWithRelationInput
  }

  export type LaptopProfileWhereUniqueInput = Prisma.AtLeast<{
    laptopId_profile?: LaptopProfileLaptopIdProfileCompoundUniqueInput
    AND?: LaptopProfileWhereInput | LaptopProfileWhereInput[]
    OR?: LaptopProfileWhereInput[]
    NOT?: LaptopProfileWhereInput | LaptopProfileWhereInput[]
    laptopId?: StringFilter<"LaptopProfile"> | string
    profile?: StringFilter<"LaptopProfile"> | string
    laptop?: XOR<LaptopScalarRelationFilter, LaptopWhereInput>
  }, "laptopId_profile">

  export type LaptopProfileOrderByWithAggregationInput = {
    laptopId?: SortOrder
    profile?: SortOrder
    _count?: LaptopProfileCountOrderByAggregateInput
    _max?: LaptopProfileMaxOrderByAggregateInput
    _min?: LaptopProfileMinOrderByAggregateInput
  }

  export type LaptopProfileScalarWhereWithAggregatesInput = {
    AND?: LaptopProfileScalarWhereWithAggregatesInput | LaptopProfileScalarWhereWithAggregatesInput[]
    OR?: LaptopProfileScalarWhereWithAggregatesInput[]
    NOT?: LaptopProfileScalarWhereWithAggregatesInput | LaptopProfileScalarWhereWithAggregatesInput[]
    laptopId?: StringWithAggregatesFilter<"LaptopProfile"> | string
    profile?: StringWithAggregatesFilter<"LaptopProfile"> | string
  }

  export type LaptopOSWhereInput = {
    AND?: LaptopOSWhereInput | LaptopOSWhereInput[]
    OR?: LaptopOSWhereInput[]
    NOT?: LaptopOSWhereInput | LaptopOSWhereInput[]
    laptopId?: StringFilter<"LaptopOS"> | string
    os?: StringFilter<"LaptopOS"> | string
    laptop?: XOR<LaptopScalarRelationFilter, LaptopWhereInput>
  }

  export type LaptopOSOrderByWithRelationInput = {
    laptopId?: SortOrder
    os?: SortOrder
    laptop?: LaptopOrderByWithRelationInput
  }

  export type LaptopOSWhereUniqueInput = Prisma.AtLeast<{
    laptopId_os?: LaptopOSLaptopIdOsCompoundUniqueInput
    AND?: LaptopOSWhereInput | LaptopOSWhereInput[]
    OR?: LaptopOSWhereInput[]
    NOT?: LaptopOSWhereInput | LaptopOSWhereInput[]
    laptopId?: StringFilter<"LaptopOS"> | string
    os?: StringFilter<"LaptopOS"> | string
    laptop?: XOR<LaptopScalarRelationFilter, LaptopWhereInput>
  }, "laptopId_os">

  export type LaptopOSOrderByWithAggregationInput = {
    laptopId?: SortOrder
    os?: SortOrder
    _count?: LaptopOSCountOrderByAggregateInput
    _max?: LaptopOSMaxOrderByAggregateInput
    _min?: LaptopOSMinOrderByAggregateInput
  }

  export type LaptopOSScalarWhereWithAggregatesInput = {
    AND?: LaptopOSScalarWhereWithAggregatesInput | LaptopOSScalarWhereWithAggregatesInput[]
    OR?: LaptopOSScalarWhereWithAggregatesInput[]
    NOT?: LaptopOSScalarWhereWithAggregatesInput | LaptopOSScalarWhereWithAggregatesInput[]
    laptopId?: StringWithAggregatesFilter<"LaptopOS"> | string
    os?: StringWithAggregatesFilter<"LaptopOS"> | string
  }

  export type AccessoryWhereInput = {
    AND?: AccessoryWhereInput | AccessoryWhereInput[]
    OR?: AccessoryWhereInput[]
    NOT?: AccessoryWhereInput | AccessoryWhereInput[]
    id?: StringFilter<"Accessory"> | string
    name?: StringFilter<"Accessory"> | string
    type?: StringFilter<"Accessory"> | string
    brand?: StringFilter<"Accessory"> | string
    price?: DecimalFilter<"Accessory"> | Decimal | DecimalJsLike | number | string
    priceType?: StringFilter<"Accessory"> | string
    image?: StringNullableFilter<"Accessory"> | string | null
    notes?: StringNullableFilter<"Accessory"> | string | null
    createdAt?: DateTimeFilter<"Accessory"> | Date | string
    updatedAt?: DateTimeFilter<"Accessory"> | Date | string
    packageAccessories?: PackageAccessoryListRelationFilter
  }

  export type AccessoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    brand?: SortOrder
    price?: SortOrder
    priceType?: SortOrder
    image?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    packageAccessories?: PackageAccessoryOrderByRelationAggregateInput
  }

  export type AccessoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AccessoryWhereInput | AccessoryWhereInput[]
    OR?: AccessoryWhereInput[]
    NOT?: AccessoryWhereInput | AccessoryWhereInput[]
    name?: StringFilter<"Accessory"> | string
    type?: StringFilter<"Accessory"> | string
    brand?: StringFilter<"Accessory"> | string
    price?: DecimalFilter<"Accessory"> | Decimal | DecimalJsLike | number | string
    priceType?: StringFilter<"Accessory"> | string
    image?: StringNullableFilter<"Accessory"> | string | null
    notes?: StringNullableFilter<"Accessory"> | string | null
    createdAt?: DateTimeFilter<"Accessory"> | Date | string
    updatedAt?: DateTimeFilter<"Accessory"> | Date | string
    packageAccessories?: PackageAccessoryListRelationFilter
  }, "id">

  export type AccessoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    brand?: SortOrder
    price?: SortOrder
    priceType?: SortOrder
    image?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AccessoryCountOrderByAggregateInput
    _avg?: AccessoryAvgOrderByAggregateInput
    _max?: AccessoryMaxOrderByAggregateInput
    _min?: AccessoryMinOrderByAggregateInput
    _sum?: AccessorySumOrderByAggregateInput
  }

  export type AccessoryScalarWhereWithAggregatesInput = {
    AND?: AccessoryScalarWhereWithAggregatesInput | AccessoryScalarWhereWithAggregatesInput[]
    OR?: AccessoryScalarWhereWithAggregatesInput[]
    NOT?: AccessoryScalarWhereWithAggregatesInput | AccessoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Accessory"> | string
    name?: StringWithAggregatesFilter<"Accessory"> | string
    type?: StringWithAggregatesFilter<"Accessory"> | string
    brand?: StringWithAggregatesFilter<"Accessory"> | string
    price?: DecimalWithAggregatesFilter<"Accessory"> | Decimal | DecimalJsLike | number | string
    priceType?: StringWithAggregatesFilter<"Accessory"> | string
    image?: StringNullableWithAggregatesFilter<"Accessory"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Accessory"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Accessory"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Accessory"> | Date | string
  }

  export type PackageWhereInput = {
    AND?: PackageWhereInput | PackageWhereInput[]
    OR?: PackageWhereInput[]
    NOT?: PackageWhereInput | PackageWhereInput[]
    id?: StringFilter<"Package"> | string
    name?: StringFilter<"Package"> | string
    laptopId?: StringFilter<"Package"> | string
    status?: StringFilter<"Package"> | string
    priceType?: StringFilter<"Package"> | string
    notes?: StringNullableFilter<"Package"> | string | null
    createdAt?: DateTimeFilter<"Package"> | Date | string
    updatedAt?: DateTimeFilter<"Package"> | Date | string
    assignedTo?: StringNullableFilter<"Package"> | string | null
    laptop?: XOR<LaptopScalarRelationFilter, LaptopWhereInput>
    accessories?: PackageAccessoryListRelationFilter
    assignments?: PackageAssignmentListRelationFilter
  }

  export type PackageOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    laptopId?: SortOrder
    status?: SortOrder
    priceType?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    assignedTo?: SortOrderInput | SortOrder
    laptop?: LaptopOrderByWithRelationInput
    accessories?: PackageAccessoryOrderByRelationAggregateInput
    assignments?: PackageAssignmentOrderByRelationAggregateInput
  }

  export type PackageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PackageWhereInput | PackageWhereInput[]
    OR?: PackageWhereInput[]
    NOT?: PackageWhereInput | PackageWhereInput[]
    name?: StringFilter<"Package"> | string
    laptopId?: StringFilter<"Package"> | string
    status?: StringFilter<"Package"> | string
    priceType?: StringFilter<"Package"> | string
    notes?: StringNullableFilter<"Package"> | string | null
    createdAt?: DateTimeFilter<"Package"> | Date | string
    updatedAt?: DateTimeFilter<"Package"> | Date | string
    assignedTo?: StringNullableFilter<"Package"> | string | null
    laptop?: XOR<LaptopScalarRelationFilter, LaptopWhereInput>
    accessories?: PackageAccessoryListRelationFilter
    assignments?: PackageAssignmentListRelationFilter
  }, "id">

  export type PackageOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    laptopId?: SortOrder
    status?: SortOrder
    priceType?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    assignedTo?: SortOrderInput | SortOrder
    _count?: PackageCountOrderByAggregateInput
    _max?: PackageMaxOrderByAggregateInput
    _min?: PackageMinOrderByAggregateInput
  }

  export type PackageScalarWhereWithAggregatesInput = {
    AND?: PackageScalarWhereWithAggregatesInput | PackageScalarWhereWithAggregatesInput[]
    OR?: PackageScalarWhereWithAggregatesInput[]
    NOT?: PackageScalarWhereWithAggregatesInput | PackageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Package"> | string
    name?: StringWithAggregatesFilter<"Package"> | string
    laptopId?: StringWithAggregatesFilter<"Package"> | string
    status?: StringWithAggregatesFilter<"Package"> | string
    priceType?: StringWithAggregatesFilter<"Package"> | string
    notes?: StringNullableWithAggregatesFilter<"Package"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Package"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Package"> | Date | string
    assignedTo?: StringNullableWithAggregatesFilter<"Package"> | string | null
  }

  export type PackageAccessoryWhereInput = {
    AND?: PackageAccessoryWhereInput | PackageAccessoryWhereInput[]
    OR?: PackageAccessoryWhereInput[]
    NOT?: PackageAccessoryWhereInput | PackageAccessoryWhereInput[]
    packageId?: StringFilter<"PackageAccessory"> | string
    accessoryId?: StringFilter<"PackageAccessory"> | string
    package?: XOR<PackageScalarRelationFilter, PackageWhereInput>
    accessory?: XOR<AccessoryScalarRelationFilter, AccessoryWhereInput>
  }

  export type PackageAccessoryOrderByWithRelationInput = {
    packageId?: SortOrder
    accessoryId?: SortOrder
    package?: PackageOrderByWithRelationInput
    accessory?: AccessoryOrderByWithRelationInput
  }

  export type PackageAccessoryWhereUniqueInput = Prisma.AtLeast<{
    packageId_accessoryId?: PackageAccessoryPackageIdAccessoryIdCompoundUniqueInput
    AND?: PackageAccessoryWhereInput | PackageAccessoryWhereInput[]
    OR?: PackageAccessoryWhereInput[]
    NOT?: PackageAccessoryWhereInput | PackageAccessoryWhereInput[]
    packageId?: StringFilter<"PackageAccessory"> | string
    accessoryId?: StringFilter<"PackageAccessory"> | string
    package?: XOR<PackageScalarRelationFilter, PackageWhereInput>
    accessory?: XOR<AccessoryScalarRelationFilter, AccessoryWhereInput>
  }, "packageId_accessoryId">

  export type PackageAccessoryOrderByWithAggregationInput = {
    packageId?: SortOrder
    accessoryId?: SortOrder
    _count?: PackageAccessoryCountOrderByAggregateInput
    _max?: PackageAccessoryMaxOrderByAggregateInput
    _min?: PackageAccessoryMinOrderByAggregateInput
  }

  export type PackageAccessoryScalarWhereWithAggregatesInput = {
    AND?: PackageAccessoryScalarWhereWithAggregatesInput | PackageAccessoryScalarWhereWithAggregatesInput[]
    OR?: PackageAccessoryScalarWhereWithAggregatesInput[]
    NOT?: PackageAccessoryScalarWhereWithAggregatesInput | PackageAccessoryScalarWhereWithAggregatesInput[]
    packageId?: StringWithAggregatesFilter<"PackageAccessory"> | string
    accessoryId?: StringWithAggregatesFilter<"PackageAccessory"> | string
  }

  export type PackageAssignmentWhereInput = {
    AND?: PackageAssignmentWhereInput | PackageAssignmentWhereInput[]
    OR?: PackageAssignmentWhereInput[]
    NOT?: PackageAssignmentWhereInput | PackageAssignmentWhereInput[]
    id?: StringFilter<"PackageAssignment"> | string
    packageId?: StringFilter<"PackageAssignment"> | string
    personId?: StringFilter<"PackageAssignment"> | string
    pcReference?: StringNullableFilter<"PackageAssignment"> | string | null
    assignedAt?: DateTimeFilter<"PackageAssignment"> | Date | string
    package?: XOR<PackageScalarRelationFilter, PackageWhereInput>
    person?: XOR<PersonScalarRelationFilter, PersonWhereInput>
  }

  export type PackageAssignmentOrderByWithRelationInput = {
    id?: SortOrder
    packageId?: SortOrder
    personId?: SortOrder
    pcReference?: SortOrderInput | SortOrder
    assignedAt?: SortOrder
    package?: PackageOrderByWithRelationInput
    person?: PersonOrderByWithRelationInput
  }

  export type PackageAssignmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    packageId_personId?: PackageAssignmentPackageIdPersonIdCompoundUniqueInput
    AND?: PackageAssignmentWhereInput | PackageAssignmentWhereInput[]
    OR?: PackageAssignmentWhereInput[]
    NOT?: PackageAssignmentWhereInput | PackageAssignmentWhereInput[]
    packageId?: StringFilter<"PackageAssignment"> | string
    personId?: StringFilter<"PackageAssignment"> | string
    pcReference?: StringNullableFilter<"PackageAssignment"> | string | null
    assignedAt?: DateTimeFilter<"PackageAssignment"> | Date | string
    package?: XOR<PackageScalarRelationFilter, PackageWhereInput>
    person?: XOR<PersonScalarRelationFilter, PersonWhereInput>
  }, "id" | "packageId_personId">

  export type PackageAssignmentOrderByWithAggregationInput = {
    id?: SortOrder
    packageId?: SortOrder
    personId?: SortOrder
    pcReference?: SortOrderInput | SortOrder
    assignedAt?: SortOrder
    _count?: PackageAssignmentCountOrderByAggregateInput
    _max?: PackageAssignmentMaxOrderByAggregateInput
    _min?: PackageAssignmentMinOrderByAggregateInput
  }

  export type PackageAssignmentScalarWhereWithAggregatesInput = {
    AND?: PackageAssignmentScalarWhereWithAggregatesInput | PackageAssignmentScalarWhereWithAggregatesInput[]
    OR?: PackageAssignmentScalarWhereWithAggregatesInput[]
    NOT?: PackageAssignmentScalarWhereWithAggregatesInput | PackageAssignmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PackageAssignment"> | string
    packageId?: StringWithAggregatesFilter<"PackageAssignment"> | string
    personId?: StringWithAggregatesFilter<"PackageAssignment"> | string
    pcReference?: StringNullableWithAggregatesFilter<"PackageAssignment"> | string | null
    assignedAt?: DateTimeWithAggregatesFilter<"PackageAssignment"> | Date | string
  }

  export type ToolWhereInput = {
    AND?: ToolWhereInput | ToolWhereInput[]
    OR?: ToolWhereInput[]
    NOT?: ToolWhereInput | ToolWhereInput[]
    id?: StringFilter<"Tool"> | string
    name?: StringFilter<"Tool"> | string
    description?: StringNullableFilter<"Tool"> | string | null
    category?: StringFilter<"Tool"> | string
    downloadUrl?: StringNullableFilter<"Tool"> | string | null
    installationNotes?: StringNullableFilter<"Tool"> | string | null
    isRequired?: BoolFilter<"Tool"> | boolean
    icon?: StringNullableFilter<"Tool"> | string | null
    popularity?: IntNullableFilter<"Tool"> | number | null
    usageCount?: IntFilter<"Tool"> | number
    createdAt?: DateTimeFilter<"Tool"> | Date | string
    updatedAt?: DateTimeFilter<"Tool"> | Date | string
    alternatives?: ToolAlternativeListRelationFilter
    toolkits?: ToolkitToolListRelationFilter
  }

  export type ToolOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    category?: SortOrder
    downloadUrl?: SortOrderInput | SortOrder
    installationNotes?: SortOrderInput | SortOrder
    isRequired?: SortOrder
    icon?: SortOrderInput | SortOrder
    popularity?: SortOrderInput | SortOrder
    usageCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    alternatives?: ToolAlternativeOrderByRelationAggregateInput
    toolkits?: ToolkitToolOrderByRelationAggregateInput
  }

  export type ToolWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ToolWhereInput | ToolWhereInput[]
    OR?: ToolWhereInput[]
    NOT?: ToolWhereInput | ToolWhereInput[]
    name?: StringFilter<"Tool"> | string
    description?: StringNullableFilter<"Tool"> | string | null
    category?: StringFilter<"Tool"> | string
    downloadUrl?: StringNullableFilter<"Tool"> | string | null
    installationNotes?: StringNullableFilter<"Tool"> | string | null
    isRequired?: BoolFilter<"Tool"> | boolean
    icon?: StringNullableFilter<"Tool"> | string | null
    popularity?: IntNullableFilter<"Tool"> | number | null
    usageCount?: IntFilter<"Tool"> | number
    createdAt?: DateTimeFilter<"Tool"> | Date | string
    updatedAt?: DateTimeFilter<"Tool"> | Date | string
    alternatives?: ToolAlternativeListRelationFilter
    toolkits?: ToolkitToolListRelationFilter
  }, "id">

  export type ToolOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    category?: SortOrder
    downloadUrl?: SortOrderInput | SortOrder
    installationNotes?: SortOrderInput | SortOrder
    isRequired?: SortOrder
    icon?: SortOrderInput | SortOrder
    popularity?: SortOrderInput | SortOrder
    usageCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ToolCountOrderByAggregateInput
    _avg?: ToolAvgOrderByAggregateInput
    _max?: ToolMaxOrderByAggregateInput
    _min?: ToolMinOrderByAggregateInput
    _sum?: ToolSumOrderByAggregateInput
  }

  export type ToolScalarWhereWithAggregatesInput = {
    AND?: ToolScalarWhereWithAggregatesInput | ToolScalarWhereWithAggregatesInput[]
    OR?: ToolScalarWhereWithAggregatesInput[]
    NOT?: ToolScalarWhereWithAggregatesInput | ToolScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Tool"> | string
    name?: StringWithAggregatesFilter<"Tool"> | string
    description?: StringNullableWithAggregatesFilter<"Tool"> | string | null
    category?: StringWithAggregatesFilter<"Tool"> | string
    downloadUrl?: StringNullableWithAggregatesFilter<"Tool"> | string | null
    installationNotes?: StringNullableWithAggregatesFilter<"Tool"> | string | null
    isRequired?: BoolWithAggregatesFilter<"Tool"> | boolean
    icon?: StringNullableWithAggregatesFilter<"Tool"> | string | null
    popularity?: IntNullableWithAggregatesFilter<"Tool"> | number | null
    usageCount?: IntWithAggregatesFilter<"Tool"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Tool"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Tool"> | Date | string
  }

  export type ToolAlternativeWhereInput = {
    AND?: ToolAlternativeWhereInput | ToolAlternativeWhereInput[]
    OR?: ToolAlternativeWhereInput[]
    NOT?: ToolAlternativeWhereInput | ToolAlternativeWhereInput[]
    toolId?: StringFilter<"ToolAlternative"> | string
    alternative?: StringFilter<"ToolAlternative"> | string
    tool?: XOR<ToolScalarRelationFilter, ToolWhereInput>
  }

  export type ToolAlternativeOrderByWithRelationInput = {
    toolId?: SortOrder
    alternative?: SortOrder
    tool?: ToolOrderByWithRelationInput
  }

  export type ToolAlternativeWhereUniqueInput = Prisma.AtLeast<{
    toolId_alternative?: ToolAlternativeToolIdAlternativeCompoundUniqueInput
    AND?: ToolAlternativeWhereInput | ToolAlternativeWhereInput[]
    OR?: ToolAlternativeWhereInput[]
    NOT?: ToolAlternativeWhereInput | ToolAlternativeWhereInput[]
    toolId?: StringFilter<"ToolAlternative"> | string
    alternative?: StringFilter<"ToolAlternative"> | string
    tool?: XOR<ToolScalarRelationFilter, ToolWhereInput>
  }, "toolId_alternative">

  export type ToolAlternativeOrderByWithAggregationInput = {
    toolId?: SortOrder
    alternative?: SortOrder
    _count?: ToolAlternativeCountOrderByAggregateInput
    _max?: ToolAlternativeMaxOrderByAggregateInput
    _min?: ToolAlternativeMinOrderByAggregateInput
  }

  export type ToolAlternativeScalarWhereWithAggregatesInput = {
    AND?: ToolAlternativeScalarWhereWithAggregatesInput | ToolAlternativeScalarWhereWithAggregatesInput[]
    OR?: ToolAlternativeScalarWhereWithAggregatesInput[]
    NOT?: ToolAlternativeScalarWhereWithAggregatesInput | ToolAlternativeScalarWhereWithAggregatesInput[]
    toolId?: StringWithAggregatesFilter<"ToolAlternative"> | string
    alternative?: StringWithAggregatesFilter<"ToolAlternative"> | string
  }

  export type ToolkitWhereInput = {
    AND?: ToolkitWhereInput | ToolkitWhereInput[]
    OR?: ToolkitWhereInput[]
    NOT?: ToolkitWhereInput | ToolkitWhereInput[]
    id?: StringFilter<"Toolkit"> | string
    profileName?: StringFilter<"Toolkit"> | string
    description?: StringNullableFilter<"Toolkit"> | string | null
    operatingSystem?: StringFilter<"Toolkit"> | string
    icon?: StringNullableFilter<"Toolkit"> | string | null
    createdAt?: DateTimeFilter<"Toolkit"> | Date | string
    updatedAt?: DateTimeFilter<"Toolkit"> | Date | string
    tools?: ToolkitToolListRelationFilter
    surveyMatches?: SurveyResponseListRelationFilter
  }

  export type ToolkitOrderByWithRelationInput = {
    id?: SortOrder
    profileName?: SortOrder
    description?: SortOrderInput | SortOrder
    operatingSystem?: SortOrder
    icon?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tools?: ToolkitToolOrderByRelationAggregateInput
    surveyMatches?: SurveyResponseOrderByRelationAggregateInput
  }

  export type ToolkitWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ToolkitWhereInput | ToolkitWhereInput[]
    OR?: ToolkitWhereInput[]
    NOT?: ToolkitWhereInput | ToolkitWhereInput[]
    profileName?: StringFilter<"Toolkit"> | string
    description?: StringNullableFilter<"Toolkit"> | string | null
    operatingSystem?: StringFilter<"Toolkit"> | string
    icon?: StringNullableFilter<"Toolkit"> | string | null
    createdAt?: DateTimeFilter<"Toolkit"> | Date | string
    updatedAt?: DateTimeFilter<"Toolkit"> | Date | string
    tools?: ToolkitToolListRelationFilter
    surveyMatches?: SurveyResponseListRelationFilter
  }, "id">

  export type ToolkitOrderByWithAggregationInput = {
    id?: SortOrder
    profileName?: SortOrder
    description?: SortOrderInput | SortOrder
    operatingSystem?: SortOrder
    icon?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ToolkitCountOrderByAggregateInput
    _max?: ToolkitMaxOrderByAggregateInput
    _min?: ToolkitMinOrderByAggregateInput
  }

  export type ToolkitScalarWhereWithAggregatesInput = {
    AND?: ToolkitScalarWhereWithAggregatesInput | ToolkitScalarWhereWithAggregatesInput[]
    OR?: ToolkitScalarWhereWithAggregatesInput[]
    NOT?: ToolkitScalarWhereWithAggregatesInput | ToolkitScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Toolkit"> | string
    profileName?: StringWithAggregatesFilter<"Toolkit"> | string
    description?: StringNullableWithAggregatesFilter<"Toolkit"> | string | null
    operatingSystem?: StringWithAggregatesFilter<"Toolkit"> | string
    icon?: StringNullableWithAggregatesFilter<"Toolkit"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Toolkit"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Toolkit"> | Date | string
  }

  export type ToolkitToolWhereInput = {
    AND?: ToolkitToolWhereInput | ToolkitToolWhereInput[]
    OR?: ToolkitToolWhereInput[]
    NOT?: ToolkitToolWhereInput | ToolkitToolWhereInput[]
    toolkitId?: StringFilter<"ToolkitTool"> | string
    toolId?: StringFilter<"ToolkitTool"> | string
    toolkit?: XOR<ToolkitScalarRelationFilter, ToolkitWhereInput>
    tool?: XOR<ToolScalarRelationFilter, ToolWhereInput>
  }

  export type ToolkitToolOrderByWithRelationInput = {
    toolkitId?: SortOrder
    toolId?: SortOrder
    toolkit?: ToolkitOrderByWithRelationInput
    tool?: ToolOrderByWithRelationInput
  }

  export type ToolkitToolWhereUniqueInput = Prisma.AtLeast<{
    toolkitId_toolId?: ToolkitToolToolkitIdToolIdCompoundUniqueInput
    AND?: ToolkitToolWhereInput | ToolkitToolWhereInput[]
    OR?: ToolkitToolWhereInput[]
    NOT?: ToolkitToolWhereInput | ToolkitToolWhereInput[]
    toolkitId?: StringFilter<"ToolkitTool"> | string
    toolId?: StringFilter<"ToolkitTool"> | string
    toolkit?: XOR<ToolkitScalarRelationFilter, ToolkitWhereInput>
    tool?: XOR<ToolScalarRelationFilter, ToolWhereInput>
  }, "toolkitId_toolId">

  export type ToolkitToolOrderByWithAggregationInput = {
    toolkitId?: SortOrder
    toolId?: SortOrder
    _count?: ToolkitToolCountOrderByAggregateInput
    _max?: ToolkitToolMaxOrderByAggregateInput
    _min?: ToolkitToolMinOrderByAggregateInput
  }

  export type ToolkitToolScalarWhereWithAggregatesInput = {
    AND?: ToolkitToolScalarWhereWithAggregatesInput | ToolkitToolScalarWhereWithAggregatesInput[]
    OR?: ToolkitToolScalarWhereWithAggregatesInput[]
    NOT?: ToolkitToolScalarWhereWithAggregatesInput | ToolkitToolScalarWhereWithAggregatesInput[]
    toolkitId?: StringWithAggregatesFilter<"ToolkitTool"> | string
    toolId?: StringWithAggregatesFilter<"ToolkitTool"> | string
  }

  export type SurveyResponseWhereInput = {
    AND?: SurveyResponseWhereInput | SurveyResponseWhereInput[]
    OR?: SurveyResponseWhereInput[]
    NOT?: SurveyResponseWhereInput | SurveyResponseWhereInput[]
    id?: StringFilter<"SurveyResponse"> | string
    submittedAt?: DateTimeFilter<"SurveyResponse"> | Date | string
    name?: StringFilter<"SurveyResponse"> | string
    email?: StringFilter<"SurveyResponse"> | string
    position?: StringFilter<"SurveyResponse"> | string
    primaryRole?: StringNullableFilter<"SurveyResponse"> | string | null
    developmentPercentage?: IntNullableFilter<"SurveyResponse"> | number | null
    primaryOS?: StringNullableFilter<"SurveyResponse"> | string | null
    experienceWithOtherOS?: StringNullableListFilter<"SurveyResponse">
    preferredOS?: StringNullableFilter<"SurveyResponse"> | string | null
    osPreferenceReason?: StringNullableFilter<"SurveyResponse"> | string | null
    programmingLanguages?: StringNullableListFilter<"SurveyResponse">
    otherLanguages?: StringNullableFilter<"SurveyResponse"> | string | null
    developmentType?: StringNullableListFilter<"SurveyResponse">
    otherDevelopmentType?: StringNullableFilter<"SurveyResponse"> | string | null
    resourceIntensiveEnvironments?: BoolNullableFilter<"SurveyResponse"> | boolean | null
    multipleEnvironments?: BoolNullableFilter<"SurveyResponse"> | boolean | null
    terminalImportance?: IntNullableFilter<"SurveyResponse"> | number | null
    clientPresentationFrequency?: StringNullableFilter<"SurveyResponse"> | string | null
    largeDataModels?: BoolNullableFilter<"SurveyResponse"> | boolean | null
    specializedSoftware?: BoolNullableFilter<"SurveyResponse"> | boolean | null
    specializedSoftwareList?: StringNullableFilter<"SurveyResponse"> | string | null
    batteryLifeImportance?: IntNullableFilter<"SurveyResponse"> | number | null
    remoteWorkFrequency?: StringNullableFilter<"SurveyResponse"> | string | null
    selectedTools?: StringNullableListFilter<"SurveyResponse">
    otherTools?: StringNullableFilter<"SurveyResponse"> | string | null
    simultaneousApplications?: StringNullableFilter<"SurveyResponse"> | string | null
    multipleWorkspaces?: BoolNullableFilter<"SurveyResponse"> | boolean | null
    typicalBrowserTabs?: StringNullableFilter<"SurveyResponse"> | string | null
    externalDisplays?: StringNullableFilter<"SurveyResponse"> | string | null
    resourceIntensiveApps?: BoolNullableFilter<"SurveyResponse"> | boolean | null
    resourceIntensiveAppsList?: StringNullableFilter<"SurveyResponse"> | string | null
    matchedToolkitId?: StringNullableFilter<"SurveyResponse"> | string | null
    matchScore?: IntNullableFilter<"SurveyResponse"> | number | null
    matchedToolkit?: XOR<ToolkitNullableScalarRelationFilter, ToolkitWhereInput> | null
  }

  export type SurveyResponseOrderByWithRelationInput = {
    id?: SortOrder
    submittedAt?: SortOrder
    name?: SortOrder
    email?: SortOrder
    position?: SortOrder
    primaryRole?: SortOrderInput | SortOrder
    developmentPercentage?: SortOrderInput | SortOrder
    primaryOS?: SortOrderInput | SortOrder
    experienceWithOtherOS?: SortOrder
    preferredOS?: SortOrderInput | SortOrder
    osPreferenceReason?: SortOrderInput | SortOrder
    programmingLanguages?: SortOrder
    otherLanguages?: SortOrderInput | SortOrder
    developmentType?: SortOrder
    otherDevelopmentType?: SortOrderInput | SortOrder
    resourceIntensiveEnvironments?: SortOrderInput | SortOrder
    multipleEnvironments?: SortOrderInput | SortOrder
    terminalImportance?: SortOrderInput | SortOrder
    clientPresentationFrequency?: SortOrderInput | SortOrder
    largeDataModels?: SortOrderInput | SortOrder
    specializedSoftware?: SortOrderInput | SortOrder
    specializedSoftwareList?: SortOrderInput | SortOrder
    batteryLifeImportance?: SortOrderInput | SortOrder
    remoteWorkFrequency?: SortOrderInput | SortOrder
    selectedTools?: SortOrder
    otherTools?: SortOrderInput | SortOrder
    simultaneousApplications?: SortOrderInput | SortOrder
    multipleWorkspaces?: SortOrderInput | SortOrder
    typicalBrowserTabs?: SortOrderInput | SortOrder
    externalDisplays?: SortOrderInput | SortOrder
    resourceIntensiveApps?: SortOrderInput | SortOrder
    resourceIntensiveAppsList?: SortOrderInput | SortOrder
    matchedToolkitId?: SortOrderInput | SortOrder
    matchScore?: SortOrderInput | SortOrder
    matchedToolkit?: ToolkitOrderByWithRelationInput
  }

  export type SurveyResponseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SurveyResponseWhereInput | SurveyResponseWhereInput[]
    OR?: SurveyResponseWhereInput[]
    NOT?: SurveyResponseWhereInput | SurveyResponseWhereInput[]
    submittedAt?: DateTimeFilter<"SurveyResponse"> | Date | string
    name?: StringFilter<"SurveyResponse"> | string
    email?: StringFilter<"SurveyResponse"> | string
    position?: StringFilter<"SurveyResponse"> | string
    primaryRole?: StringNullableFilter<"SurveyResponse"> | string | null
    developmentPercentage?: IntNullableFilter<"SurveyResponse"> | number | null
    primaryOS?: StringNullableFilter<"SurveyResponse"> | string | null
    experienceWithOtherOS?: StringNullableListFilter<"SurveyResponse">
    preferredOS?: StringNullableFilter<"SurveyResponse"> | string | null
    osPreferenceReason?: StringNullableFilter<"SurveyResponse"> | string | null
    programmingLanguages?: StringNullableListFilter<"SurveyResponse">
    otherLanguages?: StringNullableFilter<"SurveyResponse"> | string | null
    developmentType?: StringNullableListFilter<"SurveyResponse">
    otherDevelopmentType?: StringNullableFilter<"SurveyResponse"> | string | null
    resourceIntensiveEnvironments?: BoolNullableFilter<"SurveyResponse"> | boolean | null
    multipleEnvironments?: BoolNullableFilter<"SurveyResponse"> | boolean | null
    terminalImportance?: IntNullableFilter<"SurveyResponse"> | number | null
    clientPresentationFrequency?: StringNullableFilter<"SurveyResponse"> | string | null
    largeDataModels?: BoolNullableFilter<"SurveyResponse"> | boolean | null
    specializedSoftware?: BoolNullableFilter<"SurveyResponse"> | boolean | null
    specializedSoftwareList?: StringNullableFilter<"SurveyResponse"> | string | null
    batteryLifeImportance?: IntNullableFilter<"SurveyResponse"> | number | null
    remoteWorkFrequency?: StringNullableFilter<"SurveyResponse"> | string | null
    selectedTools?: StringNullableListFilter<"SurveyResponse">
    otherTools?: StringNullableFilter<"SurveyResponse"> | string | null
    simultaneousApplications?: StringNullableFilter<"SurveyResponse"> | string | null
    multipleWorkspaces?: BoolNullableFilter<"SurveyResponse"> | boolean | null
    typicalBrowserTabs?: StringNullableFilter<"SurveyResponse"> | string | null
    externalDisplays?: StringNullableFilter<"SurveyResponse"> | string | null
    resourceIntensiveApps?: BoolNullableFilter<"SurveyResponse"> | boolean | null
    resourceIntensiveAppsList?: StringNullableFilter<"SurveyResponse"> | string | null
    matchedToolkitId?: StringNullableFilter<"SurveyResponse"> | string | null
    matchScore?: IntNullableFilter<"SurveyResponse"> | number | null
    matchedToolkit?: XOR<ToolkitNullableScalarRelationFilter, ToolkitWhereInput> | null
  }, "id">

  export type SurveyResponseOrderByWithAggregationInput = {
    id?: SortOrder
    submittedAt?: SortOrder
    name?: SortOrder
    email?: SortOrder
    position?: SortOrder
    primaryRole?: SortOrderInput | SortOrder
    developmentPercentage?: SortOrderInput | SortOrder
    primaryOS?: SortOrderInput | SortOrder
    experienceWithOtherOS?: SortOrder
    preferredOS?: SortOrderInput | SortOrder
    osPreferenceReason?: SortOrderInput | SortOrder
    programmingLanguages?: SortOrder
    otherLanguages?: SortOrderInput | SortOrder
    developmentType?: SortOrder
    otherDevelopmentType?: SortOrderInput | SortOrder
    resourceIntensiveEnvironments?: SortOrderInput | SortOrder
    multipleEnvironments?: SortOrderInput | SortOrder
    terminalImportance?: SortOrderInput | SortOrder
    clientPresentationFrequency?: SortOrderInput | SortOrder
    largeDataModels?: SortOrderInput | SortOrder
    specializedSoftware?: SortOrderInput | SortOrder
    specializedSoftwareList?: SortOrderInput | SortOrder
    batteryLifeImportance?: SortOrderInput | SortOrder
    remoteWorkFrequency?: SortOrderInput | SortOrder
    selectedTools?: SortOrder
    otherTools?: SortOrderInput | SortOrder
    simultaneousApplications?: SortOrderInput | SortOrder
    multipleWorkspaces?: SortOrderInput | SortOrder
    typicalBrowserTabs?: SortOrderInput | SortOrder
    externalDisplays?: SortOrderInput | SortOrder
    resourceIntensiveApps?: SortOrderInput | SortOrder
    resourceIntensiveAppsList?: SortOrderInput | SortOrder
    matchedToolkitId?: SortOrderInput | SortOrder
    matchScore?: SortOrderInput | SortOrder
    _count?: SurveyResponseCountOrderByAggregateInput
    _avg?: SurveyResponseAvgOrderByAggregateInput
    _max?: SurveyResponseMaxOrderByAggregateInput
    _min?: SurveyResponseMinOrderByAggregateInput
    _sum?: SurveyResponseSumOrderByAggregateInput
  }

  export type SurveyResponseScalarWhereWithAggregatesInput = {
    AND?: SurveyResponseScalarWhereWithAggregatesInput | SurveyResponseScalarWhereWithAggregatesInput[]
    OR?: SurveyResponseScalarWhereWithAggregatesInput[]
    NOT?: SurveyResponseScalarWhereWithAggregatesInput | SurveyResponseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SurveyResponse"> | string
    submittedAt?: DateTimeWithAggregatesFilter<"SurveyResponse"> | Date | string
    name?: StringWithAggregatesFilter<"SurveyResponse"> | string
    email?: StringWithAggregatesFilter<"SurveyResponse"> | string
    position?: StringWithAggregatesFilter<"SurveyResponse"> | string
    primaryRole?: StringNullableWithAggregatesFilter<"SurveyResponse"> | string | null
    developmentPercentage?: IntNullableWithAggregatesFilter<"SurveyResponse"> | number | null
    primaryOS?: StringNullableWithAggregatesFilter<"SurveyResponse"> | string | null
    experienceWithOtherOS?: StringNullableListFilter<"SurveyResponse">
    preferredOS?: StringNullableWithAggregatesFilter<"SurveyResponse"> | string | null
    osPreferenceReason?: StringNullableWithAggregatesFilter<"SurveyResponse"> | string | null
    programmingLanguages?: StringNullableListFilter<"SurveyResponse">
    otherLanguages?: StringNullableWithAggregatesFilter<"SurveyResponse"> | string | null
    developmentType?: StringNullableListFilter<"SurveyResponse">
    otherDevelopmentType?: StringNullableWithAggregatesFilter<"SurveyResponse"> | string | null
    resourceIntensiveEnvironments?: BoolNullableWithAggregatesFilter<"SurveyResponse"> | boolean | null
    multipleEnvironments?: BoolNullableWithAggregatesFilter<"SurveyResponse"> | boolean | null
    terminalImportance?: IntNullableWithAggregatesFilter<"SurveyResponse"> | number | null
    clientPresentationFrequency?: StringNullableWithAggregatesFilter<"SurveyResponse"> | string | null
    largeDataModels?: BoolNullableWithAggregatesFilter<"SurveyResponse"> | boolean | null
    specializedSoftware?: BoolNullableWithAggregatesFilter<"SurveyResponse"> | boolean | null
    specializedSoftwareList?: StringNullableWithAggregatesFilter<"SurveyResponse"> | string | null
    batteryLifeImportance?: IntNullableWithAggregatesFilter<"SurveyResponse"> | number | null
    remoteWorkFrequency?: StringNullableWithAggregatesFilter<"SurveyResponse"> | string | null
    selectedTools?: StringNullableListFilter<"SurveyResponse">
    otherTools?: StringNullableWithAggregatesFilter<"SurveyResponse"> | string | null
    simultaneousApplications?: StringNullableWithAggregatesFilter<"SurveyResponse"> | string | null
    multipleWorkspaces?: BoolNullableWithAggregatesFilter<"SurveyResponse"> | boolean | null
    typicalBrowserTabs?: StringNullableWithAggregatesFilter<"SurveyResponse"> | string | null
    externalDisplays?: StringNullableWithAggregatesFilter<"SurveyResponse"> | string | null
    resourceIntensiveApps?: BoolNullableWithAggregatesFilter<"SurveyResponse"> | boolean | null
    resourceIntensiveAppsList?: StringNullableWithAggregatesFilter<"SurveyResponse"> | string | null
    matchedToolkitId?: StringNullableWithAggregatesFilter<"SurveyResponse"> | string | null
    matchScore?: IntNullableWithAggregatesFilter<"SurveyResponse"> | number | null
  }

  export type PersonCreateInput = {
    id?: string
    name: string
    email?: string | null
    department?: string | null
    position?: string | null
    pcReference?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    packageAssignments?: PackageAssignmentCreateNestedManyWithoutPersonInput
  }

  export type PersonUncheckedCreateInput = {
    id?: string
    name: string
    email?: string | null
    department?: string | null
    position?: string | null
    pcReference?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    packageAssignments?: PackageAssignmentUncheckedCreateNestedManyWithoutPersonInput
  }

  export type PersonUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    pcReference?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    packageAssignments?: PackageAssignmentUpdateManyWithoutPersonNestedInput
  }

  export type PersonUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    pcReference?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    packageAssignments?: PackageAssignmentUncheckedUpdateManyWithoutPersonNestedInput
  }

  export type PersonCreateManyInput = {
    id?: string
    name: string
    email?: string | null
    department?: string | null
    position?: string | null
    pcReference?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PersonUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    pcReference?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PersonUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    pcReference?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LaptopCreateInput = {
    id?: string
    brand: string
    model: string
    price: Decimal | DecimalJsLike | number | string
    priceType: string
    processor: string
    ram: string
    storage: string
    batteryLife: Decimal | DecimalJsLike | number | string
    performanceScore: Decimal | DecimalJsLike | number | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    supportedProfiles?: LaptopProfileCreateNestedManyWithoutLaptopInput
    supportedOS?: LaptopOSCreateNestedManyWithoutLaptopInput
    packages?: PackageCreateNestedManyWithoutLaptopInput
  }

  export type LaptopUncheckedCreateInput = {
    id?: string
    brand: string
    model: string
    price: Decimal | DecimalJsLike | number | string
    priceType: string
    processor: string
    ram: string
    storage: string
    batteryLife: Decimal | DecimalJsLike | number | string
    performanceScore: Decimal | DecimalJsLike | number | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    supportedProfiles?: LaptopProfileUncheckedCreateNestedManyWithoutLaptopInput
    supportedOS?: LaptopOSUncheckedCreateNestedManyWithoutLaptopInput
    packages?: PackageUncheckedCreateNestedManyWithoutLaptopInput
  }

  export type LaptopUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    priceType?: StringFieldUpdateOperationsInput | string
    processor?: StringFieldUpdateOperationsInput | string
    ram?: StringFieldUpdateOperationsInput | string
    storage?: StringFieldUpdateOperationsInput | string
    batteryLife?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    performanceScore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    supportedProfiles?: LaptopProfileUpdateManyWithoutLaptopNestedInput
    supportedOS?: LaptopOSUpdateManyWithoutLaptopNestedInput
    packages?: PackageUpdateManyWithoutLaptopNestedInput
  }

  export type LaptopUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    priceType?: StringFieldUpdateOperationsInput | string
    processor?: StringFieldUpdateOperationsInput | string
    ram?: StringFieldUpdateOperationsInput | string
    storage?: StringFieldUpdateOperationsInput | string
    batteryLife?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    performanceScore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    supportedProfiles?: LaptopProfileUncheckedUpdateManyWithoutLaptopNestedInput
    supportedOS?: LaptopOSUncheckedUpdateManyWithoutLaptopNestedInput
    packages?: PackageUncheckedUpdateManyWithoutLaptopNestedInput
  }

  export type LaptopCreateManyInput = {
    id?: string
    brand: string
    model: string
    price: Decimal | DecimalJsLike | number | string
    priceType: string
    processor: string
    ram: string
    storage: string
    batteryLife: Decimal | DecimalJsLike | number | string
    performanceScore: Decimal | DecimalJsLike | number | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LaptopUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    priceType?: StringFieldUpdateOperationsInput | string
    processor?: StringFieldUpdateOperationsInput | string
    ram?: StringFieldUpdateOperationsInput | string
    storage?: StringFieldUpdateOperationsInput | string
    batteryLife?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    performanceScore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LaptopUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    priceType?: StringFieldUpdateOperationsInput | string
    processor?: StringFieldUpdateOperationsInput | string
    ram?: StringFieldUpdateOperationsInput | string
    storage?: StringFieldUpdateOperationsInput | string
    batteryLife?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    performanceScore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LaptopProfileCreateInput = {
    profile: string
    laptop: LaptopCreateNestedOneWithoutSupportedProfilesInput
  }

  export type LaptopProfileUncheckedCreateInput = {
    laptopId: string
    profile: string
  }

  export type LaptopProfileUpdateInput = {
    profile?: StringFieldUpdateOperationsInput | string
    laptop?: LaptopUpdateOneRequiredWithoutSupportedProfilesNestedInput
  }

  export type LaptopProfileUncheckedUpdateInput = {
    laptopId?: StringFieldUpdateOperationsInput | string
    profile?: StringFieldUpdateOperationsInput | string
  }

  export type LaptopProfileCreateManyInput = {
    laptopId: string
    profile: string
  }

  export type LaptopProfileUpdateManyMutationInput = {
    profile?: StringFieldUpdateOperationsInput | string
  }

  export type LaptopProfileUncheckedUpdateManyInput = {
    laptopId?: StringFieldUpdateOperationsInput | string
    profile?: StringFieldUpdateOperationsInput | string
  }

  export type LaptopOSCreateInput = {
    os: string
    laptop: LaptopCreateNestedOneWithoutSupportedOSInput
  }

  export type LaptopOSUncheckedCreateInput = {
    laptopId: string
    os: string
  }

  export type LaptopOSUpdateInput = {
    os?: StringFieldUpdateOperationsInput | string
    laptop?: LaptopUpdateOneRequiredWithoutSupportedOSNestedInput
  }

  export type LaptopOSUncheckedUpdateInput = {
    laptopId?: StringFieldUpdateOperationsInput | string
    os?: StringFieldUpdateOperationsInput | string
  }

  export type LaptopOSCreateManyInput = {
    laptopId: string
    os: string
  }

  export type LaptopOSUpdateManyMutationInput = {
    os?: StringFieldUpdateOperationsInput | string
  }

  export type LaptopOSUncheckedUpdateManyInput = {
    laptopId?: StringFieldUpdateOperationsInput | string
    os?: StringFieldUpdateOperationsInput | string
  }

  export type AccessoryCreateInput = {
    id?: string
    name: string
    type: string
    brand: string
    price: Decimal | DecimalJsLike | number | string
    priceType: string
    image?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    packageAccessories?: PackageAccessoryCreateNestedManyWithoutAccessoryInput
  }

  export type AccessoryUncheckedCreateInput = {
    id?: string
    name: string
    type: string
    brand: string
    price: Decimal | DecimalJsLike | number | string
    priceType: string
    image?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    packageAccessories?: PackageAccessoryUncheckedCreateNestedManyWithoutAccessoryInput
  }

  export type AccessoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    priceType?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    packageAccessories?: PackageAccessoryUpdateManyWithoutAccessoryNestedInput
  }

  export type AccessoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    priceType?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    packageAccessories?: PackageAccessoryUncheckedUpdateManyWithoutAccessoryNestedInput
  }

  export type AccessoryCreateManyInput = {
    id?: string
    name: string
    type: string
    brand: string
    price: Decimal | DecimalJsLike | number | string
    priceType: string
    image?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccessoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    priceType?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccessoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    priceType?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PackageCreateInput = {
    id?: string
    name: string
    status: string
    priceType: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedTo?: string | null
    laptop: LaptopCreateNestedOneWithoutPackagesInput
    accessories?: PackageAccessoryCreateNestedManyWithoutPackageInput
    assignments?: PackageAssignmentCreateNestedManyWithoutPackageInput
  }

  export type PackageUncheckedCreateInput = {
    id?: string
    name: string
    laptopId: string
    status: string
    priceType: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedTo?: string | null
    accessories?: PackageAccessoryUncheckedCreateNestedManyWithoutPackageInput
    assignments?: PackageAssignmentUncheckedCreateNestedManyWithoutPackageInput
  }

  export type PackageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priceType?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    laptop?: LaptopUpdateOneRequiredWithoutPackagesNestedInput
    accessories?: PackageAccessoryUpdateManyWithoutPackageNestedInput
    assignments?: PackageAssignmentUpdateManyWithoutPackageNestedInput
  }

  export type PackageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    laptopId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priceType?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    accessories?: PackageAccessoryUncheckedUpdateManyWithoutPackageNestedInput
    assignments?: PackageAssignmentUncheckedUpdateManyWithoutPackageNestedInput
  }

  export type PackageCreateManyInput = {
    id?: string
    name: string
    laptopId: string
    status: string
    priceType: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedTo?: string | null
  }

  export type PackageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priceType?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PackageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    laptopId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priceType?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PackageAccessoryCreateInput = {
    package: PackageCreateNestedOneWithoutAccessoriesInput
    accessory: AccessoryCreateNestedOneWithoutPackageAccessoriesInput
  }

  export type PackageAccessoryUncheckedCreateInput = {
    packageId: string
    accessoryId: string
  }

  export type PackageAccessoryUpdateInput = {
    package?: PackageUpdateOneRequiredWithoutAccessoriesNestedInput
    accessory?: AccessoryUpdateOneRequiredWithoutPackageAccessoriesNestedInput
  }

  export type PackageAccessoryUncheckedUpdateInput = {
    packageId?: StringFieldUpdateOperationsInput | string
    accessoryId?: StringFieldUpdateOperationsInput | string
  }

  export type PackageAccessoryCreateManyInput = {
    packageId: string
    accessoryId: string
  }

  export type PackageAccessoryUpdateManyMutationInput = {

  }

  export type PackageAccessoryUncheckedUpdateManyInput = {
    packageId?: StringFieldUpdateOperationsInput | string
    accessoryId?: StringFieldUpdateOperationsInput | string
  }

  export type PackageAssignmentCreateInput = {
    id?: string
    pcReference?: string | null
    assignedAt?: Date | string
    package: PackageCreateNestedOneWithoutAssignmentsInput
    person: PersonCreateNestedOneWithoutPackageAssignmentsInput
  }

  export type PackageAssignmentUncheckedCreateInput = {
    id?: string
    packageId: string
    personId: string
    pcReference?: string | null
    assignedAt?: Date | string
  }

  export type PackageAssignmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    pcReference?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    package?: PackageUpdateOneRequiredWithoutAssignmentsNestedInput
    person?: PersonUpdateOneRequiredWithoutPackageAssignmentsNestedInput
  }

  export type PackageAssignmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    packageId?: StringFieldUpdateOperationsInput | string
    personId?: StringFieldUpdateOperationsInput | string
    pcReference?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PackageAssignmentCreateManyInput = {
    id?: string
    packageId: string
    personId: string
    pcReference?: string | null
    assignedAt?: Date | string
  }

  export type PackageAssignmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    pcReference?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PackageAssignmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    packageId?: StringFieldUpdateOperationsInput | string
    personId?: StringFieldUpdateOperationsInput | string
    pcReference?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ToolCreateInput = {
    id?: string
    name: string
    description?: string | null
    category: string
    downloadUrl?: string | null
    installationNotes?: string | null
    isRequired?: boolean
    icon?: string | null
    popularity?: number | null
    usageCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    alternatives?: ToolAlternativeCreateNestedManyWithoutToolInput
    toolkits?: ToolkitToolCreateNestedManyWithoutToolInput
  }

  export type ToolUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    category: string
    downloadUrl?: string | null
    installationNotes?: string | null
    isRequired?: boolean
    icon?: string | null
    popularity?: number | null
    usageCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    alternatives?: ToolAlternativeUncheckedCreateNestedManyWithoutToolInput
    toolkits?: ToolkitToolUncheckedCreateNestedManyWithoutToolInput
  }

  export type ToolUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    downloadUrl?: NullableStringFieldUpdateOperationsInput | string | null
    installationNotes?: NullableStringFieldUpdateOperationsInput | string | null
    isRequired?: BoolFieldUpdateOperationsInput | boolean
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    popularity?: NullableIntFieldUpdateOperationsInput | number | null
    usageCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    alternatives?: ToolAlternativeUpdateManyWithoutToolNestedInput
    toolkits?: ToolkitToolUpdateManyWithoutToolNestedInput
  }

  export type ToolUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    downloadUrl?: NullableStringFieldUpdateOperationsInput | string | null
    installationNotes?: NullableStringFieldUpdateOperationsInput | string | null
    isRequired?: BoolFieldUpdateOperationsInput | boolean
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    popularity?: NullableIntFieldUpdateOperationsInput | number | null
    usageCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    alternatives?: ToolAlternativeUncheckedUpdateManyWithoutToolNestedInput
    toolkits?: ToolkitToolUncheckedUpdateManyWithoutToolNestedInput
  }

  export type ToolCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    category: string
    downloadUrl?: string | null
    installationNotes?: string | null
    isRequired?: boolean
    icon?: string | null
    popularity?: number | null
    usageCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ToolUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    downloadUrl?: NullableStringFieldUpdateOperationsInput | string | null
    installationNotes?: NullableStringFieldUpdateOperationsInput | string | null
    isRequired?: BoolFieldUpdateOperationsInput | boolean
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    popularity?: NullableIntFieldUpdateOperationsInput | number | null
    usageCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ToolUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    downloadUrl?: NullableStringFieldUpdateOperationsInput | string | null
    installationNotes?: NullableStringFieldUpdateOperationsInput | string | null
    isRequired?: BoolFieldUpdateOperationsInput | boolean
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    popularity?: NullableIntFieldUpdateOperationsInput | number | null
    usageCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ToolAlternativeCreateInput = {
    alternative: string
    tool: ToolCreateNestedOneWithoutAlternativesInput
  }

  export type ToolAlternativeUncheckedCreateInput = {
    toolId: string
    alternative: string
  }

  export type ToolAlternativeUpdateInput = {
    alternative?: StringFieldUpdateOperationsInput | string
    tool?: ToolUpdateOneRequiredWithoutAlternativesNestedInput
  }

  export type ToolAlternativeUncheckedUpdateInput = {
    toolId?: StringFieldUpdateOperationsInput | string
    alternative?: StringFieldUpdateOperationsInput | string
  }

  export type ToolAlternativeCreateManyInput = {
    toolId: string
    alternative: string
  }

  export type ToolAlternativeUpdateManyMutationInput = {
    alternative?: StringFieldUpdateOperationsInput | string
  }

  export type ToolAlternativeUncheckedUpdateManyInput = {
    toolId?: StringFieldUpdateOperationsInput | string
    alternative?: StringFieldUpdateOperationsInput | string
  }

  export type ToolkitCreateInput = {
    id?: string
    profileName: string
    description?: string | null
    operatingSystem: string
    icon?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tools?: ToolkitToolCreateNestedManyWithoutToolkitInput
    surveyMatches?: SurveyResponseCreateNestedManyWithoutMatchedToolkitInput
  }

  export type ToolkitUncheckedCreateInput = {
    id?: string
    profileName: string
    description?: string | null
    operatingSystem: string
    icon?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tools?: ToolkitToolUncheckedCreateNestedManyWithoutToolkitInput
    surveyMatches?: SurveyResponseUncheckedCreateNestedManyWithoutMatchedToolkitInput
  }

  export type ToolkitUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    operatingSystem?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tools?: ToolkitToolUpdateManyWithoutToolkitNestedInput
    surveyMatches?: SurveyResponseUpdateManyWithoutMatchedToolkitNestedInput
  }

  export type ToolkitUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    operatingSystem?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tools?: ToolkitToolUncheckedUpdateManyWithoutToolkitNestedInput
    surveyMatches?: SurveyResponseUncheckedUpdateManyWithoutMatchedToolkitNestedInput
  }

  export type ToolkitCreateManyInput = {
    id?: string
    profileName: string
    description?: string | null
    operatingSystem: string
    icon?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ToolkitUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    operatingSystem?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ToolkitUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    operatingSystem?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ToolkitToolCreateInput = {
    toolkit: ToolkitCreateNestedOneWithoutToolsInput
    tool: ToolCreateNestedOneWithoutToolkitsInput
  }

  export type ToolkitToolUncheckedCreateInput = {
    toolkitId: string
    toolId: string
  }

  export type ToolkitToolUpdateInput = {
    toolkit?: ToolkitUpdateOneRequiredWithoutToolsNestedInput
    tool?: ToolUpdateOneRequiredWithoutToolkitsNestedInput
  }

  export type ToolkitToolUncheckedUpdateInput = {
    toolkitId?: StringFieldUpdateOperationsInput | string
    toolId?: StringFieldUpdateOperationsInput | string
  }

  export type ToolkitToolCreateManyInput = {
    toolkitId: string
    toolId: string
  }

  export type ToolkitToolUpdateManyMutationInput = {

  }

  export type ToolkitToolUncheckedUpdateManyInput = {
    toolkitId?: StringFieldUpdateOperationsInput | string
    toolId?: StringFieldUpdateOperationsInput | string
  }

  export type SurveyResponseCreateInput = {
    id?: string
    submittedAt?: Date | string
    name: string
    email: string
    position: string
    primaryRole?: string | null
    developmentPercentage?: number | null
    primaryOS?: string | null
    experienceWithOtherOS?: SurveyResponseCreateexperienceWithOtherOSInput | string[]
    preferredOS?: string | null
    osPreferenceReason?: string | null
    programmingLanguages?: SurveyResponseCreateprogrammingLanguagesInput | string[]
    otherLanguages?: string | null
    developmentType?: SurveyResponseCreatedevelopmentTypeInput | string[]
    otherDevelopmentType?: string | null
    resourceIntensiveEnvironments?: boolean | null
    multipleEnvironments?: boolean | null
    terminalImportance?: number | null
    clientPresentationFrequency?: string | null
    largeDataModels?: boolean | null
    specializedSoftware?: boolean | null
    specializedSoftwareList?: string | null
    batteryLifeImportance?: number | null
    remoteWorkFrequency?: string | null
    selectedTools?: SurveyResponseCreateselectedToolsInput | string[]
    otherTools?: string | null
    simultaneousApplications?: string | null
    multipleWorkspaces?: boolean | null
    typicalBrowserTabs?: string | null
    externalDisplays?: string | null
    resourceIntensiveApps?: boolean | null
    resourceIntensiveAppsList?: string | null
    matchScore?: number | null
    matchedToolkit?: ToolkitCreateNestedOneWithoutSurveyMatchesInput
  }

  export type SurveyResponseUncheckedCreateInput = {
    id?: string
    submittedAt?: Date | string
    name: string
    email: string
    position: string
    primaryRole?: string | null
    developmentPercentage?: number | null
    primaryOS?: string | null
    experienceWithOtherOS?: SurveyResponseCreateexperienceWithOtherOSInput | string[]
    preferredOS?: string | null
    osPreferenceReason?: string | null
    programmingLanguages?: SurveyResponseCreateprogrammingLanguagesInput | string[]
    otherLanguages?: string | null
    developmentType?: SurveyResponseCreatedevelopmentTypeInput | string[]
    otherDevelopmentType?: string | null
    resourceIntensiveEnvironments?: boolean | null
    multipleEnvironments?: boolean | null
    terminalImportance?: number | null
    clientPresentationFrequency?: string | null
    largeDataModels?: boolean | null
    specializedSoftware?: boolean | null
    specializedSoftwareList?: string | null
    batteryLifeImportance?: number | null
    remoteWorkFrequency?: string | null
    selectedTools?: SurveyResponseCreateselectedToolsInput | string[]
    otherTools?: string | null
    simultaneousApplications?: string | null
    multipleWorkspaces?: boolean | null
    typicalBrowserTabs?: string | null
    externalDisplays?: string | null
    resourceIntensiveApps?: boolean | null
    resourceIntensiveAppsList?: string | null
    matchedToolkitId?: string | null
    matchScore?: number | null
  }

  export type SurveyResponseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    primaryRole?: NullableStringFieldUpdateOperationsInput | string | null
    developmentPercentage?: NullableIntFieldUpdateOperationsInput | number | null
    primaryOS?: NullableStringFieldUpdateOperationsInput | string | null
    experienceWithOtherOS?: SurveyResponseUpdateexperienceWithOtherOSInput | string[]
    preferredOS?: NullableStringFieldUpdateOperationsInput | string | null
    osPreferenceReason?: NullableStringFieldUpdateOperationsInput | string | null
    programmingLanguages?: SurveyResponseUpdateprogrammingLanguagesInput | string[]
    otherLanguages?: NullableStringFieldUpdateOperationsInput | string | null
    developmentType?: SurveyResponseUpdatedevelopmentTypeInput | string[]
    otherDevelopmentType?: NullableStringFieldUpdateOperationsInput | string | null
    resourceIntensiveEnvironments?: NullableBoolFieldUpdateOperationsInput | boolean | null
    multipleEnvironments?: NullableBoolFieldUpdateOperationsInput | boolean | null
    terminalImportance?: NullableIntFieldUpdateOperationsInput | number | null
    clientPresentationFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    largeDataModels?: NullableBoolFieldUpdateOperationsInput | boolean | null
    specializedSoftware?: NullableBoolFieldUpdateOperationsInput | boolean | null
    specializedSoftwareList?: NullableStringFieldUpdateOperationsInput | string | null
    batteryLifeImportance?: NullableIntFieldUpdateOperationsInput | number | null
    remoteWorkFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    selectedTools?: SurveyResponseUpdateselectedToolsInput | string[]
    otherTools?: NullableStringFieldUpdateOperationsInput | string | null
    simultaneousApplications?: NullableStringFieldUpdateOperationsInput | string | null
    multipleWorkspaces?: NullableBoolFieldUpdateOperationsInput | boolean | null
    typicalBrowserTabs?: NullableStringFieldUpdateOperationsInput | string | null
    externalDisplays?: NullableStringFieldUpdateOperationsInput | string | null
    resourceIntensiveApps?: NullableBoolFieldUpdateOperationsInput | boolean | null
    resourceIntensiveAppsList?: NullableStringFieldUpdateOperationsInput | string | null
    matchScore?: NullableIntFieldUpdateOperationsInput | number | null
    matchedToolkit?: ToolkitUpdateOneWithoutSurveyMatchesNestedInput
  }

  export type SurveyResponseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    primaryRole?: NullableStringFieldUpdateOperationsInput | string | null
    developmentPercentage?: NullableIntFieldUpdateOperationsInput | number | null
    primaryOS?: NullableStringFieldUpdateOperationsInput | string | null
    experienceWithOtherOS?: SurveyResponseUpdateexperienceWithOtherOSInput | string[]
    preferredOS?: NullableStringFieldUpdateOperationsInput | string | null
    osPreferenceReason?: NullableStringFieldUpdateOperationsInput | string | null
    programmingLanguages?: SurveyResponseUpdateprogrammingLanguagesInput | string[]
    otherLanguages?: NullableStringFieldUpdateOperationsInput | string | null
    developmentType?: SurveyResponseUpdatedevelopmentTypeInput | string[]
    otherDevelopmentType?: NullableStringFieldUpdateOperationsInput | string | null
    resourceIntensiveEnvironments?: NullableBoolFieldUpdateOperationsInput | boolean | null
    multipleEnvironments?: NullableBoolFieldUpdateOperationsInput | boolean | null
    terminalImportance?: NullableIntFieldUpdateOperationsInput | number | null
    clientPresentationFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    largeDataModels?: NullableBoolFieldUpdateOperationsInput | boolean | null
    specializedSoftware?: NullableBoolFieldUpdateOperationsInput | boolean | null
    specializedSoftwareList?: NullableStringFieldUpdateOperationsInput | string | null
    batteryLifeImportance?: NullableIntFieldUpdateOperationsInput | number | null
    remoteWorkFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    selectedTools?: SurveyResponseUpdateselectedToolsInput | string[]
    otherTools?: NullableStringFieldUpdateOperationsInput | string | null
    simultaneousApplications?: NullableStringFieldUpdateOperationsInput | string | null
    multipleWorkspaces?: NullableBoolFieldUpdateOperationsInput | boolean | null
    typicalBrowserTabs?: NullableStringFieldUpdateOperationsInput | string | null
    externalDisplays?: NullableStringFieldUpdateOperationsInput | string | null
    resourceIntensiveApps?: NullableBoolFieldUpdateOperationsInput | boolean | null
    resourceIntensiveAppsList?: NullableStringFieldUpdateOperationsInput | string | null
    matchedToolkitId?: NullableStringFieldUpdateOperationsInput | string | null
    matchScore?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SurveyResponseCreateManyInput = {
    id?: string
    submittedAt?: Date | string
    name: string
    email: string
    position: string
    primaryRole?: string | null
    developmentPercentage?: number | null
    primaryOS?: string | null
    experienceWithOtherOS?: SurveyResponseCreateexperienceWithOtherOSInput | string[]
    preferredOS?: string | null
    osPreferenceReason?: string | null
    programmingLanguages?: SurveyResponseCreateprogrammingLanguagesInput | string[]
    otherLanguages?: string | null
    developmentType?: SurveyResponseCreatedevelopmentTypeInput | string[]
    otherDevelopmentType?: string | null
    resourceIntensiveEnvironments?: boolean | null
    multipleEnvironments?: boolean | null
    terminalImportance?: number | null
    clientPresentationFrequency?: string | null
    largeDataModels?: boolean | null
    specializedSoftware?: boolean | null
    specializedSoftwareList?: string | null
    batteryLifeImportance?: number | null
    remoteWorkFrequency?: string | null
    selectedTools?: SurveyResponseCreateselectedToolsInput | string[]
    otherTools?: string | null
    simultaneousApplications?: string | null
    multipleWorkspaces?: boolean | null
    typicalBrowserTabs?: string | null
    externalDisplays?: string | null
    resourceIntensiveApps?: boolean | null
    resourceIntensiveAppsList?: string | null
    matchedToolkitId?: string | null
    matchScore?: number | null
  }

  export type SurveyResponseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    primaryRole?: NullableStringFieldUpdateOperationsInput | string | null
    developmentPercentage?: NullableIntFieldUpdateOperationsInput | number | null
    primaryOS?: NullableStringFieldUpdateOperationsInput | string | null
    experienceWithOtherOS?: SurveyResponseUpdateexperienceWithOtherOSInput | string[]
    preferredOS?: NullableStringFieldUpdateOperationsInput | string | null
    osPreferenceReason?: NullableStringFieldUpdateOperationsInput | string | null
    programmingLanguages?: SurveyResponseUpdateprogrammingLanguagesInput | string[]
    otherLanguages?: NullableStringFieldUpdateOperationsInput | string | null
    developmentType?: SurveyResponseUpdatedevelopmentTypeInput | string[]
    otherDevelopmentType?: NullableStringFieldUpdateOperationsInput | string | null
    resourceIntensiveEnvironments?: NullableBoolFieldUpdateOperationsInput | boolean | null
    multipleEnvironments?: NullableBoolFieldUpdateOperationsInput | boolean | null
    terminalImportance?: NullableIntFieldUpdateOperationsInput | number | null
    clientPresentationFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    largeDataModels?: NullableBoolFieldUpdateOperationsInput | boolean | null
    specializedSoftware?: NullableBoolFieldUpdateOperationsInput | boolean | null
    specializedSoftwareList?: NullableStringFieldUpdateOperationsInput | string | null
    batteryLifeImportance?: NullableIntFieldUpdateOperationsInput | number | null
    remoteWorkFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    selectedTools?: SurveyResponseUpdateselectedToolsInput | string[]
    otherTools?: NullableStringFieldUpdateOperationsInput | string | null
    simultaneousApplications?: NullableStringFieldUpdateOperationsInput | string | null
    multipleWorkspaces?: NullableBoolFieldUpdateOperationsInput | boolean | null
    typicalBrowserTabs?: NullableStringFieldUpdateOperationsInput | string | null
    externalDisplays?: NullableStringFieldUpdateOperationsInput | string | null
    resourceIntensiveApps?: NullableBoolFieldUpdateOperationsInput | boolean | null
    resourceIntensiveAppsList?: NullableStringFieldUpdateOperationsInput | string | null
    matchScore?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SurveyResponseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    primaryRole?: NullableStringFieldUpdateOperationsInput | string | null
    developmentPercentage?: NullableIntFieldUpdateOperationsInput | number | null
    primaryOS?: NullableStringFieldUpdateOperationsInput | string | null
    experienceWithOtherOS?: SurveyResponseUpdateexperienceWithOtherOSInput | string[]
    preferredOS?: NullableStringFieldUpdateOperationsInput | string | null
    osPreferenceReason?: NullableStringFieldUpdateOperationsInput | string | null
    programmingLanguages?: SurveyResponseUpdateprogrammingLanguagesInput | string[]
    otherLanguages?: NullableStringFieldUpdateOperationsInput | string | null
    developmentType?: SurveyResponseUpdatedevelopmentTypeInput | string[]
    otherDevelopmentType?: NullableStringFieldUpdateOperationsInput | string | null
    resourceIntensiveEnvironments?: NullableBoolFieldUpdateOperationsInput | boolean | null
    multipleEnvironments?: NullableBoolFieldUpdateOperationsInput | boolean | null
    terminalImportance?: NullableIntFieldUpdateOperationsInput | number | null
    clientPresentationFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    largeDataModels?: NullableBoolFieldUpdateOperationsInput | boolean | null
    specializedSoftware?: NullableBoolFieldUpdateOperationsInput | boolean | null
    specializedSoftwareList?: NullableStringFieldUpdateOperationsInput | string | null
    batteryLifeImportance?: NullableIntFieldUpdateOperationsInput | number | null
    remoteWorkFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    selectedTools?: SurveyResponseUpdateselectedToolsInput | string[]
    otherTools?: NullableStringFieldUpdateOperationsInput | string | null
    simultaneousApplications?: NullableStringFieldUpdateOperationsInput | string | null
    multipleWorkspaces?: NullableBoolFieldUpdateOperationsInput | boolean | null
    typicalBrowserTabs?: NullableStringFieldUpdateOperationsInput | string | null
    externalDisplays?: NullableStringFieldUpdateOperationsInput | string | null
    resourceIntensiveApps?: NullableBoolFieldUpdateOperationsInput | boolean | null
    resourceIntensiveAppsList?: NullableStringFieldUpdateOperationsInput | string | null
    matchedToolkitId?: NullableStringFieldUpdateOperationsInput | string | null
    matchScore?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PackageAssignmentListRelationFilter = {
    every?: PackageAssignmentWhereInput
    some?: PackageAssignmentWhereInput
    none?: PackageAssignmentWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PackageAssignmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PersonCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    department?: SortOrder
    position?: SortOrder
    pcReference?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PersonMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    department?: SortOrder
    position?: SortOrder
    pcReference?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PersonMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    department?: SortOrder
    position?: SortOrder
    pcReference?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type LaptopProfileListRelationFilter = {
    every?: LaptopProfileWhereInput
    some?: LaptopProfileWhereInput
    none?: LaptopProfileWhereInput
  }

  export type LaptopOSListRelationFilter = {
    every?: LaptopOSWhereInput
    some?: LaptopOSWhereInput
    none?: LaptopOSWhereInput
  }

  export type PackageListRelationFilter = {
    every?: PackageWhereInput
    some?: PackageWhereInput
    none?: PackageWhereInput
  }

  export type LaptopProfileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LaptopOSOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PackageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LaptopCountOrderByAggregateInput = {
    id?: SortOrder
    brand?: SortOrder
    model?: SortOrder
    price?: SortOrder
    priceType?: SortOrder
    processor?: SortOrder
    ram?: SortOrder
    storage?: SortOrder
    batteryLife?: SortOrder
    performanceScore?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LaptopAvgOrderByAggregateInput = {
    price?: SortOrder
    batteryLife?: SortOrder
    performanceScore?: SortOrder
  }

  export type LaptopMaxOrderByAggregateInput = {
    id?: SortOrder
    brand?: SortOrder
    model?: SortOrder
    price?: SortOrder
    priceType?: SortOrder
    processor?: SortOrder
    ram?: SortOrder
    storage?: SortOrder
    batteryLife?: SortOrder
    performanceScore?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LaptopMinOrderByAggregateInput = {
    id?: SortOrder
    brand?: SortOrder
    model?: SortOrder
    price?: SortOrder
    priceType?: SortOrder
    processor?: SortOrder
    ram?: SortOrder
    storage?: SortOrder
    batteryLife?: SortOrder
    performanceScore?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LaptopSumOrderByAggregateInput = {
    price?: SortOrder
    batteryLife?: SortOrder
    performanceScore?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type LaptopScalarRelationFilter = {
    is?: LaptopWhereInput
    isNot?: LaptopWhereInput
  }

  export type LaptopProfileLaptopIdProfileCompoundUniqueInput = {
    laptopId: string
    profile: string
  }

  export type LaptopProfileCountOrderByAggregateInput = {
    laptopId?: SortOrder
    profile?: SortOrder
  }

  export type LaptopProfileMaxOrderByAggregateInput = {
    laptopId?: SortOrder
    profile?: SortOrder
  }

  export type LaptopProfileMinOrderByAggregateInput = {
    laptopId?: SortOrder
    profile?: SortOrder
  }

  export type LaptopOSLaptopIdOsCompoundUniqueInput = {
    laptopId: string
    os: string
  }

  export type LaptopOSCountOrderByAggregateInput = {
    laptopId?: SortOrder
    os?: SortOrder
  }

  export type LaptopOSMaxOrderByAggregateInput = {
    laptopId?: SortOrder
    os?: SortOrder
  }

  export type LaptopOSMinOrderByAggregateInput = {
    laptopId?: SortOrder
    os?: SortOrder
  }

  export type PackageAccessoryListRelationFilter = {
    every?: PackageAccessoryWhereInput
    some?: PackageAccessoryWhereInput
    none?: PackageAccessoryWhereInput
  }

  export type PackageAccessoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AccessoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    brand?: SortOrder
    price?: SortOrder
    priceType?: SortOrder
    image?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccessoryAvgOrderByAggregateInput = {
    price?: SortOrder
  }

  export type AccessoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    brand?: SortOrder
    price?: SortOrder
    priceType?: SortOrder
    image?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccessoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    brand?: SortOrder
    price?: SortOrder
    priceType?: SortOrder
    image?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccessorySumOrderByAggregateInput = {
    price?: SortOrder
  }

  export type PackageCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    laptopId?: SortOrder
    status?: SortOrder
    priceType?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    assignedTo?: SortOrder
  }

  export type PackageMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    laptopId?: SortOrder
    status?: SortOrder
    priceType?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    assignedTo?: SortOrder
  }

  export type PackageMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    laptopId?: SortOrder
    status?: SortOrder
    priceType?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    assignedTo?: SortOrder
  }

  export type PackageScalarRelationFilter = {
    is?: PackageWhereInput
    isNot?: PackageWhereInput
  }

  export type AccessoryScalarRelationFilter = {
    is?: AccessoryWhereInput
    isNot?: AccessoryWhereInput
  }

  export type PackageAccessoryPackageIdAccessoryIdCompoundUniqueInput = {
    packageId: string
    accessoryId: string
  }

  export type PackageAccessoryCountOrderByAggregateInput = {
    packageId?: SortOrder
    accessoryId?: SortOrder
  }

  export type PackageAccessoryMaxOrderByAggregateInput = {
    packageId?: SortOrder
    accessoryId?: SortOrder
  }

  export type PackageAccessoryMinOrderByAggregateInput = {
    packageId?: SortOrder
    accessoryId?: SortOrder
  }

  export type PersonScalarRelationFilter = {
    is?: PersonWhereInput
    isNot?: PersonWhereInput
  }

  export type PackageAssignmentPackageIdPersonIdCompoundUniqueInput = {
    packageId: string
    personId: string
  }

  export type PackageAssignmentCountOrderByAggregateInput = {
    id?: SortOrder
    packageId?: SortOrder
    personId?: SortOrder
    pcReference?: SortOrder
    assignedAt?: SortOrder
  }

  export type PackageAssignmentMaxOrderByAggregateInput = {
    id?: SortOrder
    packageId?: SortOrder
    personId?: SortOrder
    pcReference?: SortOrder
    assignedAt?: SortOrder
  }

  export type PackageAssignmentMinOrderByAggregateInput = {
    id?: SortOrder
    packageId?: SortOrder
    personId?: SortOrder
    pcReference?: SortOrder
    assignedAt?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ToolAlternativeListRelationFilter = {
    every?: ToolAlternativeWhereInput
    some?: ToolAlternativeWhereInput
    none?: ToolAlternativeWhereInput
  }

  export type ToolkitToolListRelationFilter = {
    every?: ToolkitToolWhereInput
    some?: ToolkitToolWhereInput
    none?: ToolkitToolWhereInput
  }

  export type ToolAlternativeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ToolkitToolOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ToolCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    downloadUrl?: SortOrder
    installationNotes?: SortOrder
    isRequired?: SortOrder
    icon?: SortOrder
    popularity?: SortOrder
    usageCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ToolAvgOrderByAggregateInput = {
    popularity?: SortOrder
    usageCount?: SortOrder
  }

  export type ToolMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    downloadUrl?: SortOrder
    installationNotes?: SortOrder
    isRequired?: SortOrder
    icon?: SortOrder
    popularity?: SortOrder
    usageCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ToolMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    downloadUrl?: SortOrder
    installationNotes?: SortOrder
    isRequired?: SortOrder
    icon?: SortOrder
    popularity?: SortOrder
    usageCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ToolSumOrderByAggregateInput = {
    popularity?: SortOrder
    usageCount?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type ToolScalarRelationFilter = {
    is?: ToolWhereInput
    isNot?: ToolWhereInput
  }

  export type ToolAlternativeToolIdAlternativeCompoundUniqueInput = {
    toolId: string
    alternative: string
  }

  export type ToolAlternativeCountOrderByAggregateInput = {
    toolId?: SortOrder
    alternative?: SortOrder
  }

  export type ToolAlternativeMaxOrderByAggregateInput = {
    toolId?: SortOrder
    alternative?: SortOrder
  }

  export type ToolAlternativeMinOrderByAggregateInput = {
    toolId?: SortOrder
    alternative?: SortOrder
  }

  export type SurveyResponseListRelationFilter = {
    every?: SurveyResponseWhereInput
    some?: SurveyResponseWhereInput
    none?: SurveyResponseWhereInput
  }

  export type SurveyResponseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ToolkitCountOrderByAggregateInput = {
    id?: SortOrder
    profileName?: SortOrder
    description?: SortOrder
    operatingSystem?: SortOrder
    icon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ToolkitMaxOrderByAggregateInput = {
    id?: SortOrder
    profileName?: SortOrder
    description?: SortOrder
    operatingSystem?: SortOrder
    icon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ToolkitMinOrderByAggregateInput = {
    id?: SortOrder
    profileName?: SortOrder
    description?: SortOrder
    operatingSystem?: SortOrder
    icon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ToolkitScalarRelationFilter = {
    is?: ToolkitWhereInput
    isNot?: ToolkitWhereInput
  }

  export type ToolkitToolToolkitIdToolIdCompoundUniqueInput = {
    toolkitId: string
    toolId: string
  }

  export type ToolkitToolCountOrderByAggregateInput = {
    toolkitId?: SortOrder
    toolId?: SortOrder
  }

  export type ToolkitToolMaxOrderByAggregateInput = {
    toolkitId?: SortOrder
    toolId?: SortOrder
  }

  export type ToolkitToolMinOrderByAggregateInput = {
    toolkitId?: SortOrder
    toolId?: SortOrder
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type ToolkitNullableScalarRelationFilter = {
    is?: ToolkitWhereInput | null
    isNot?: ToolkitWhereInput | null
  }

  export type SurveyResponseCountOrderByAggregateInput = {
    id?: SortOrder
    submittedAt?: SortOrder
    name?: SortOrder
    email?: SortOrder
    position?: SortOrder
    primaryRole?: SortOrder
    developmentPercentage?: SortOrder
    primaryOS?: SortOrder
    experienceWithOtherOS?: SortOrder
    preferredOS?: SortOrder
    osPreferenceReason?: SortOrder
    programmingLanguages?: SortOrder
    otherLanguages?: SortOrder
    developmentType?: SortOrder
    otherDevelopmentType?: SortOrder
    resourceIntensiveEnvironments?: SortOrder
    multipleEnvironments?: SortOrder
    terminalImportance?: SortOrder
    clientPresentationFrequency?: SortOrder
    largeDataModels?: SortOrder
    specializedSoftware?: SortOrder
    specializedSoftwareList?: SortOrder
    batteryLifeImportance?: SortOrder
    remoteWorkFrequency?: SortOrder
    selectedTools?: SortOrder
    otherTools?: SortOrder
    simultaneousApplications?: SortOrder
    multipleWorkspaces?: SortOrder
    typicalBrowserTabs?: SortOrder
    externalDisplays?: SortOrder
    resourceIntensiveApps?: SortOrder
    resourceIntensiveAppsList?: SortOrder
    matchedToolkitId?: SortOrder
    matchScore?: SortOrder
  }

  export type SurveyResponseAvgOrderByAggregateInput = {
    developmentPercentage?: SortOrder
    terminalImportance?: SortOrder
    batteryLifeImportance?: SortOrder
    matchScore?: SortOrder
  }

  export type SurveyResponseMaxOrderByAggregateInput = {
    id?: SortOrder
    submittedAt?: SortOrder
    name?: SortOrder
    email?: SortOrder
    position?: SortOrder
    primaryRole?: SortOrder
    developmentPercentage?: SortOrder
    primaryOS?: SortOrder
    preferredOS?: SortOrder
    osPreferenceReason?: SortOrder
    otherLanguages?: SortOrder
    otherDevelopmentType?: SortOrder
    resourceIntensiveEnvironments?: SortOrder
    multipleEnvironments?: SortOrder
    terminalImportance?: SortOrder
    clientPresentationFrequency?: SortOrder
    largeDataModels?: SortOrder
    specializedSoftware?: SortOrder
    specializedSoftwareList?: SortOrder
    batteryLifeImportance?: SortOrder
    remoteWorkFrequency?: SortOrder
    otherTools?: SortOrder
    simultaneousApplications?: SortOrder
    multipleWorkspaces?: SortOrder
    typicalBrowserTabs?: SortOrder
    externalDisplays?: SortOrder
    resourceIntensiveApps?: SortOrder
    resourceIntensiveAppsList?: SortOrder
    matchedToolkitId?: SortOrder
    matchScore?: SortOrder
  }

  export type SurveyResponseMinOrderByAggregateInput = {
    id?: SortOrder
    submittedAt?: SortOrder
    name?: SortOrder
    email?: SortOrder
    position?: SortOrder
    primaryRole?: SortOrder
    developmentPercentage?: SortOrder
    primaryOS?: SortOrder
    preferredOS?: SortOrder
    osPreferenceReason?: SortOrder
    otherLanguages?: SortOrder
    otherDevelopmentType?: SortOrder
    resourceIntensiveEnvironments?: SortOrder
    multipleEnvironments?: SortOrder
    terminalImportance?: SortOrder
    clientPresentationFrequency?: SortOrder
    largeDataModels?: SortOrder
    specializedSoftware?: SortOrder
    specializedSoftwareList?: SortOrder
    batteryLifeImportance?: SortOrder
    remoteWorkFrequency?: SortOrder
    otherTools?: SortOrder
    simultaneousApplications?: SortOrder
    multipleWorkspaces?: SortOrder
    typicalBrowserTabs?: SortOrder
    externalDisplays?: SortOrder
    resourceIntensiveApps?: SortOrder
    resourceIntensiveAppsList?: SortOrder
    matchedToolkitId?: SortOrder
    matchScore?: SortOrder
  }

  export type SurveyResponseSumOrderByAggregateInput = {
    developmentPercentage?: SortOrder
    terminalImportance?: SortOrder
    batteryLifeImportance?: SortOrder
    matchScore?: SortOrder
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type PackageAssignmentCreateNestedManyWithoutPersonInput = {
    create?: XOR<PackageAssignmentCreateWithoutPersonInput, PackageAssignmentUncheckedCreateWithoutPersonInput> | PackageAssignmentCreateWithoutPersonInput[] | PackageAssignmentUncheckedCreateWithoutPersonInput[]
    connectOrCreate?: PackageAssignmentCreateOrConnectWithoutPersonInput | PackageAssignmentCreateOrConnectWithoutPersonInput[]
    createMany?: PackageAssignmentCreateManyPersonInputEnvelope
    connect?: PackageAssignmentWhereUniqueInput | PackageAssignmentWhereUniqueInput[]
  }

  export type PackageAssignmentUncheckedCreateNestedManyWithoutPersonInput = {
    create?: XOR<PackageAssignmentCreateWithoutPersonInput, PackageAssignmentUncheckedCreateWithoutPersonInput> | PackageAssignmentCreateWithoutPersonInput[] | PackageAssignmentUncheckedCreateWithoutPersonInput[]
    connectOrCreate?: PackageAssignmentCreateOrConnectWithoutPersonInput | PackageAssignmentCreateOrConnectWithoutPersonInput[]
    createMany?: PackageAssignmentCreateManyPersonInputEnvelope
    connect?: PackageAssignmentWhereUniqueInput | PackageAssignmentWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PackageAssignmentUpdateManyWithoutPersonNestedInput = {
    create?: XOR<PackageAssignmentCreateWithoutPersonInput, PackageAssignmentUncheckedCreateWithoutPersonInput> | PackageAssignmentCreateWithoutPersonInput[] | PackageAssignmentUncheckedCreateWithoutPersonInput[]
    connectOrCreate?: PackageAssignmentCreateOrConnectWithoutPersonInput | PackageAssignmentCreateOrConnectWithoutPersonInput[]
    upsert?: PackageAssignmentUpsertWithWhereUniqueWithoutPersonInput | PackageAssignmentUpsertWithWhereUniqueWithoutPersonInput[]
    createMany?: PackageAssignmentCreateManyPersonInputEnvelope
    set?: PackageAssignmentWhereUniqueInput | PackageAssignmentWhereUniqueInput[]
    disconnect?: PackageAssignmentWhereUniqueInput | PackageAssignmentWhereUniqueInput[]
    delete?: PackageAssignmentWhereUniqueInput | PackageAssignmentWhereUniqueInput[]
    connect?: PackageAssignmentWhereUniqueInput | PackageAssignmentWhereUniqueInput[]
    update?: PackageAssignmentUpdateWithWhereUniqueWithoutPersonInput | PackageAssignmentUpdateWithWhereUniqueWithoutPersonInput[]
    updateMany?: PackageAssignmentUpdateManyWithWhereWithoutPersonInput | PackageAssignmentUpdateManyWithWhereWithoutPersonInput[]
    deleteMany?: PackageAssignmentScalarWhereInput | PackageAssignmentScalarWhereInput[]
  }

  export type PackageAssignmentUncheckedUpdateManyWithoutPersonNestedInput = {
    create?: XOR<PackageAssignmentCreateWithoutPersonInput, PackageAssignmentUncheckedCreateWithoutPersonInput> | PackageAssignmentCreateWithoutPersonInput[] | PackageAssignmentUncheckedCreateWithoutPersonInput[]
    connectOrCreate?: PackageAssignmentCreateOrConnectWithoutPersonInput | PackageAssignmentCreateOrConnectWithoutPersonInput[]
    upsert?: PackageAssignmentUpsertWithWhereUniqueWithoutPersonInput | PackageAssignmentUpsertWithWhereUniqueWithoutPersonInput[]
    createMany?: PackageAssignmentCreateManyPersonInputEnvelope
    set?: PackageAssignmentWhereUniqueInput | PackageAssignmentWhereUniqueInput[]
    disconnect?: PackageAssignmentWhereUniqueInput | PackageAssignmentWhereUniqueInput[]
    delete?: PackageAssignmentWhereUniqueInput | PackageAssignmentWhereUniqueInput[]
    connect?: PackageAssignmentWhereUniqueInput | PackageAssignmentWhereUniqueInput[]
    update?: PackageAssignmentUpdateWithWhereUniqueWithoutPersonInput | PackageAssignmentUpdateWithWhereUniqueWithoutPersonInput[]
    updateMany?: PackageAssignmentUpdateManyWithWhereWithoutPersonInput | PackageAssignmentUpdateManyWithWhereWithoutPersonInput[]
    deleteMany?: PackageAssignmentScalarWhereInput | PackageAssignmentScalarWhereInput[]
  }

  export type LaptopProfileCreateNestedManyWithoutLaptopInput = {
    create?: XOR<LaptopProfileCreateWithoutLaptopInput, LaptopProfileUncheckedCreateWithoutLaptopInput> | LaptopProfileCreateWithoutLaptopInput[] | LaptopProfileUncheckedCreateWithoutLaptopInput[]
    connectOrCreate?: LaptopProfileCreateOrConnectWithoutLaptopInput | LaptopProfileCreateOrConnectWithoutLaptopInput[]
    createMany?: LaptopProfileCreateManyLaptopInputEnvelope
    connect?: LaptopProfileWhereUniqueInput | LaptopProfileWhereUniqueInput[]
  }

  export type LaptopOSCreateNestedManyWithoutLaptopInput = {
    create?: XOR<LaptopOSCreateWithoutLaptopInput, LaptopOSUncheckedCreateWithoutLaptopInput> | LaptopOSCreateWithoutLaptopInput[] | LaptopOSUncheckedCreateWithoutLaptopInput[]
    connectOrCreate?: LaptopOSCreateOrConnectWithoutLaptopInput | LaptopOSCreateOrConnectWithoutLaptopInput[]
    createMany?: LaptopOSCreateManyLaptopInputEnvelope
    connect?: LaptopOSWhereUniqueInput | LaptopOSWhereUniqueInput[]
  }

  export type PackageCreateNestedManyWithoutLaptopInput = {
    create?: XOR<PackageCreateWithoutLaptopInput, PackageUncheckedCreateWithoutLaptopInput> | PackageCreateWithoutLaptopInput[] | PackageUncheckedCreateWithoutLaptopInput[]
    connectOrCreate?: PackageCreateOrConnectWithoutLaptopInput | PackageCreateOrConnectWithoutLaptopInput[]
    createMany?: PackageCreateManyLaptopInputEnvelope
    connect?: PackageWhereUniqueInput | PackageWhereUniqueInput[]
  }

  export type LaptopProfileUncheckedCreateNestedManyWithoutLaptopInput = {
    create?: XOR<LaptopProfileCreateWithoutLaptopInput, LaptopProfileUncheckedCreateWithoutLaptopInput> | LaptopProfileCreateWithoutLaptopInput[] | LaptopProfileUncheckedCreateWithoutLaptopInput[]
    connectOrCreate?: LaptopProfileCreateOrConnectWithoutLaptopInput | LaptopProfileCreateOrConnectWithoutLaptopInput[]
    createMany?: LaptopProfileCreateManyLaptopInputEnvelope
    connect?: LaptopProfileWhereUniqueInput | LaptopProfileWhereUniqueInput[]
  }

  export type LaptopOSUncheckedCreateNestedManyWithoutLaptopInput = {
    create?: XOR<LaptopOSCreateWithoutLaptopInput, LaptopOSUncheckedCreateWithoutLaptopInput> | LaptopOSCreateWithoutLaptopInput[] | LaptopOSUncheckedCreateWithoutLaptopInput[]
    connectOrCreate?: LaptopOSCreateOrConnectWithoutLaptopInput | LaptopOSCreateOrConnectWithoutLaptopInput[]
    createMany?: LaptopOSCreateManyLaptopInputEnvelope
    connect?: LaptopOSWhereUniqueInput | LaptopOSWhereUniqueInput[]
  }

  export type PackageUncheckedCreateNestedManyWithoutLaptopInput = {
    create?: XOR<PackageCreateWithoutLaptopInput, PackageUncheckedCreateWithoutLaptopInput> | PackageCreateWithoutLaptopInput[] | PackageUncheckedCreateWithoutLaptopInput[]
    connectOrCreate?: PackageCreateOrConnectWithoutLaptopInput | PackageCreateOrConnectWithoutLaptopInput[]
    createMany?: PackageCreateManyLaptopInputEnvelope
    connect?: PackageWhereUniqueInput | PackageWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type LaptopProfileUpdateManyWithoutLaptopNestedInput = {
    create?: XOR<LaptopProfileCreateWithoutLaptopInput, LaptopProfileUncheckedCreateWithoutLaptopInput> | LaptopProfileCreateWithoutLaptopInput[] | LaptopProfileUncheckedCreateWithoutLaptopInput[]
    connectOrCreate?: LaptopProfileCreateOrConnectWithoutLaptopInput | LaptopProfileCreateOrConnectWithoutLaptopInput[]
    upsert?: LaptopProfileUpsertWithWhereUniqueWithoutLaptopInput | LaptopProfileUpsertWithWhereUniqueWithoutLaptopInput[]
    createMany?: LaptopProfileCreateManyLaptopInputEnvelope
    set?: LaptopProfileWhereUniqueInput | LaptopProfileWhereUniqueInput[]
    disconnect?: LaptopProfileWhereUniqueInput | LaptopProfileWhereUniqueInput[]
    delete?: LaptopProfileWhereUniqueInput | LaptopProfileWhereUniqueInput[]
    connect?: LaptopProfileWhereUniqueInput | LaptopProfileWhereUniqueInput[]
    update?: LaptopProfileUpdateWithWhereUniqueWithoutLaptopInput | LaptopProfileUpdateWithWhereUniqueWithoutLaptopInput[]
    updateMany?: LaptopProfileUpdateManyWithWhereWithoutLaptopInput | LaptopProfileUpdateManyWithWhereWithoutLaptopInput[]
    deleteMany?: LaptopProfileScalarWhereInput | LaptopProfileScalarWhereInput[]
  }

  export type LaptopOSUpdateManyWithoutLaptopNestedInput = {
    create?: XOR<LaptopOSCreateWithoutLaptopInput, LaptopOSUncheckedCreateWithoutLaptopInput> | LaptopOSCreateWithoutLaptopInput[] | LaptopOSUncheckedCreateWithoutLaptopInput[]
    connectOrCreate?: LaptopOSCreateOrConnectWithoutLaptopInput | LaptopOSCreateOrConnectWithoutLaptopInput[]
    upsert?: LaptopOSUpsertWithWhereUniqueWithoutLaptopInput | LaptopOSUpsertWithWhereUniqueWithoutLaptopInput[]
    createMany?: LaptopOSCreateManyLaptopInputEnvelope
    set?: LaptopOSWhereUniqueInput | LaptopOSWhereUniqueInput[]
    disconnect?: LaptopOSWhereUniqueInput | LaptopOSWhereUniqueInput[]
    delete?: LaptopOSWhereUniqueInput | LaptopOSWhereUniqueInput[]
    connect?: LaptopOSWhereUniqueInput | LaptopOSWhereUniqueInput[]
    update?: LaptopOSUpdateWithWhereUniqueWithoutLaptopInput | LaptopOSUpdateWithWhereUniqueWithoutLaptopInput[]
    updateMany?: LaptopOSUpdateManyWithWhereWithoutLaptopInput | LaptopOSUpdateManyWithWhereWithoutLaptopInput[]
    deleteMany?: LaptopOSScalarWhereInput | LaptopOSScalarWhereInput[]
  }

  export type PackageUpdateManyWithoutLaptopNestedInput = {
    create?: XOR<PackageCreateWithoutLaptopInput, PackageUncheckedCreateWithoutLaptopInput> | PackageCreateWithoutLaptopInput[] | PackageUncheckedCreateWithoutLaptopInput[]
    connectOrCreate?: PackageCreateOrConnectWithoutLaptopInput | PackageCreateOrConnectWithoutLaptopInput[]
    upsert?: PackageUpsertWithWhereUniqueWithoutLaptopInput | PackageUpsertWithWhereUniqueWithoutLaptopInput[]
    createMany?: PackageCreateManyLaptopInputEnvelope
    set?: PackageWhereUniqueInput | PackageWhereUniqueInput[]
    disconnect?: PackageWhereUniqueInput | PackageWhereUniqueInput[]
    delete?: PackageWhereUniqueInput | PackageWhereUniqueInput[]
    connect?: PackageWhereUniqueInput | PackageWhereUniqueInput[]
    update?: PackageUpdateWithWhereUniqueWithoutLaptopInput | PackageUpdateWithWhereUniqueWithoutLaptopInput[]
    updateMany?: PackageUpdateManyWithWhereWithoutLaptopInput | PackageUpdateManyWithWhereWithoutLaptopInput[]
    deleteMany?: PackageScalarWhereInput | PackageScalarWhereInput[]
  }

  export type LaptopProfileUncheckedUpdateManyWithoutLaptopNestedInput = {
    create?: XOR<LaptopProfileCreateWithoutLaptopInput, LaptopProfileUncheckedCreateWithoutLaptopInput> | LaptopProfileCreateWithoutLaptopInput[] | LaptopProfileUncheckedCreateWithoutLaptopInput[]
    connectOrCreate?: LaptopProfileCreateOrConnectWithoutLaptopInput | LaptopProfileCreateOrConnectWithoutLaptopInput[]
    upsert?: LaptopProfileUpsertWithWhereUniqueWithoutLaptopInput | LaptopProfileUpsertWithWhereUniqueWithoutLaptopInput[]
    createMany?: LaptopProfileCreateManyLaptopInputEnvelope
    set?: LaptopProfileWhereUniqueInput | LaptopProfileWhereUniqueInput[]
    disconnect?: LaptopProfileWhereUniqueInput | LaptopProfileWhereUniqueInput[]
    delete?: LaptopProfileWhereUniqueInput | LaptopProfileWhereUniqueInput[]
    connect?: LaptopProfileWhereUniqueInput | LaptopProfileWhereUniqueInput[]
    update?: LaptopProfileUpdateWithWhereUniqueWithoutLaptopInput | LaptopProfileUpdateWithWhereUniqueWithoutLaptopInput[]
    updateMany?: LaptopProfileUpdateManyWithWhereWithoutLaptopInput | LaptopProfileUpdateManyWithWhereWithoutLaptopInput[]
    deleteMany?: LaptopProfileScalarWhereInput | LaptopProfileScalarWhereInput[]
  }

  export type LaptopOSUncheckedUpdateManyWithoutLaptopNestedInput = {
    create?: XOR<LaptopOSCreateWithoutLaptopInput, LaptopOSUncheckedCreateWithoutLaptopInput> | LaptopOSCreateWithoutLaptopInput[] | LaptopOSUncheckedCreateWithoutLaptopInput[]
    connectOrCreate?: LaptopOSCreateOrConnectWithoutLaptopInput | LaptopOSCreateOrConnectWithoutLaptopInput[]
    upsert?: LaptopOSUpsertWithWhereUniqueWithoutLaptopInput | LaptopOSUpsertWithWhereUniqueWithoutLaptopInput[]
    createMany?: LaptopOSCreateManyLaptopInputEnvelope
    set?: LaptopOSWhereUniqueInput | LaptopOSWhereUniqueInput[]
    disconnect?: LaptopOSWhereUniqueInput | LaptopOSWhereUniqueInput[]
    delete?: LaptopOSWhereUniqueInput | LaptopOSWhereUniqueInput[]
    connect?: LaptopOSWhereUniqueInput | LaptopOSWhereUniqueInput[]
    update?: LaptopOSUpdateWithWhereUniqueWithoutLaptopInput | LaptopOSUpdateWithWhereUniqueWithoutLaptopInput[]
    updateMany?: LaptopOSUpdateManyWithWhereWithoutLaptopInput | LaptopOSUpdateManyWithWhereWithoutLaptopInput[]
    deleteMany?: LaptopOSScalarWhereInput | LaptopOSScalarWhereInput[]
  }

  export type PackageUncheckedUpdateManyWithoutLaptopNestedInput = {
    create?: XOR<PackageCreateWithoutLaptopInput, PackageUncheckedCreateWithoutLaptopInput> | PackageCreateWithoutLaptopInput[] | PackageUncheckedCreateWithoutLaptopInput[]
    connectOrCreate?: PackageCreateOrConnectWithoutLaptopInput | PackageCreateOrConnectWithoutLaptopInput[]
    upsert?: PackageUpsertWithWhereUniqueWithoutLaptopInput | PackageUpsertWithWhereUniqueWithoutLaptopInput[]
    createMany?: PackageCreateManyLaptopInputEnvelope
    set?: PackageWhereUniqueInput | PackageWhereUniqueInput[]
    disconnect?: PackageWhereUniqueInput | PackageWhereUniqueInput[]
    delete?: PackageWhereUniqueInput | PackageWhereUniqueInput[]
    connect?: PackageWhereUniqueInput | PackageWhereUniqueInput[]
    update?: PackageUpdateWithWhereUniqueWithoutLaptopInput | PackageUpdateWithWhereUniqueWithoutLaptopInput[]
    updateMany?: PackageUpdateManyWithWhereWithoutLaptopInput | PackageUpdateManyWithWhereWithoutLaptopInput[]
    deleteMany?: PackageScalarWhereInput | PackageScalarWhereInput[]
  }

  export type LaptopCreateNestedOneWithoutSupportedProfilesInput = {
    create?: XOR<LaptopCreateWithoutSupportedProfilesInput, LaptopUncheckedCreateWithoutSupportedProfilesInput>
    connectOrCreate?: LaptopCreateOrConnectWithoutSupportedProfilesInput
    connect?: LaptopWhereUniqueInput
  }

  export type LaptopUpdateOneRequiredWithoutSupportedProfilesNestedInput = {
    create?: XOR<LaptopCreateWithoutSupportedProfilesInput, LaptopUncheckedCreateWithoutSupportedProfilesInput>
    connectOrCreate?: LaptopCreateOrConnectWithoutSupportedProfilesInput
    upsert?: LaptopUpsertWithoutSupportedProfilesInput
    connect?: LaptopWhereUniqueInput
    update?: XOR<XOR<LaptopUpdateToOneWithWhereWithoutSupportedProfilesInput, LaptopUpdateWithoutSupportedProfilesInput>, LaptopUncheckedUpdateWithoutSupportedProfilesInput>
  }

  export type LaptopCreateNestedOneWithoutSupportedOSInput = {
    create?: XOR<LaptopCreateWithoutSupportedOSInput, LaptopUncheckedCreateWithoutSupportedOSInput>
    connectOrCreate?: LaptopCreateOrConnectWithoutSupportedOSInput
    connect?: LaptopWhereUniqueInput
  }

  export type LaptopUpdateOneRequiredWithoutSupportedOSNestedInput = {
    create?: XOR<LaptopCreateWithoutSupportedOSInput, LaptopUncheckedCreateWithoutSupportedOSInput>
    connectOrCreate?: LaptopCreateOrConnectWithoutSupportedOSInput
    upsert?: LaptopUpsertWithoutSupportedOSInput
    connect?: LaptopWhereUniqueInput
    update?: XOR<XOR<LaptopUpdateToOneWithWhereWithoutSupportedOSInput, LaptopUpdateWithoutSupportedOSInput>, LaptopUncheckedUpdateWithoutSupportedOSInput>
  }

  export type PackageAccessoryCreateNestedManyWithoutAccessoryInput = {
    create?: XOR<PackageAccessoryCreateWithoutAccessoryInput, PackageAccessoryUncheckedCreateWithoutAccessoryInput> | PackageAccessoryCreateWithoutAccessoryInput[] | PackageAccessoryUncheckedCreateWithoutAccessoryInput[]
    connectOrCreate?: PackageAccessoryCreateOrConnectWithoutAccessoryInput | PackageAccessoryCreateOrConnectWithoutAccessoryInput[]
    createMany?: PackageAccessoryCreateManyAccessoryInputEnvelope
    connect?: PackageAccessoryWhereUniqueInput | PackageAccessoryWhereUniqueInput[]
  }

  export type PackageAccessoryUncheckedCreateNestedManyWithoutAccessoryInput = {
    create?: XOR<PackageAccessoryCreateWithoutAccessoryInput, PackageAccessoryUncheckedCreateWithoutAccessoryInput> | PackageAccessoryCreateWithoutAccessoryInput[] | PackageAccessoryUncheckedCreateWithoutAccessoryInput[]
    connectOrCreate?: PackageAccessoryCreateOrConnectWithoutAccessoryInput | PackageAccessoryCreateOrConnectWithoutAccessoryInput[]
    createMany?: PackageAccessoryCreateManyAccessoryInputEnvelope
    connect?: PackageAccessoryWhereUniqueInput | PackageAccessoryWhereUniqueInput[]
  }

  export type PackageAccessoryUpdateManyWithoutAccessoryNestedInput = {
    create?: XOR<PackageAccessoryCreateWithoutAccessoryInput, PackageAccessoryUncheckedCreateWithoutAccessoryInput> | PackageAccessoryCreateWithoutAccessoryInput[] | PackageAccessoryUncheckedCreateWithoutAccessoryInput[]
    connectOrCreate?: PackageAccessoryCreateOrConnectWithoutAccessoryInput | PackageAccessoryCreateOrConnectWithoutAccessoryInput[]
    upsert?: PackageAccessoryUpsertWithWhereUniqueWithoutAccessoryInput | PackageAccessoryUpsertWithWhereUniqueWithoutAccessoryInput[]
    createMany?: PackageAccessoryCreateManyAccessoryInputEnvelope
    set?: PackageAccessoryWhereUniqueInput | PackageAccessoryWhereUniqueInput[]
    disconnect?: PackageAccessoryWhereUniqueInput | PackageAccessoryWhereUniqueInput[]
    delete?: PackageAccessoryWhereUniqueInput | PackageAccessoryWhereUniqueInput[]
    connect?: PackageAccessoryWhereUniqueInput | PackageAccessoryWhereUniqueInput[]
    update?: PackageAccessoryUpdateWithWhereUniqueWithoutAccessoryInput | PackageAccessoryUpdateWithWhereUniqueWithoutAccessoryInput[]
    updateMany?: PackageAccessoryUpdateManyWithWhereWithoutAccessoryInput | PackageAccessoryUpdateManyWithWhereWithoutAccessoryInput[]
    deleteMany?: PackageAccessoryScalarWhereInput | PackageAccessoryScalarWhereInput[]
  }

  export type PackageAccessoryUncheckedUpdateManyWithoutAccessoryNestedInput = {
    create?: XOR<PackageAccessoryCreateWithoutAccessoryInput, PackageAccessoryUncheckedCreateWithoutAccessoryInput> | PackageAccessoryCreateWithoutAccessoryInput[] | PackageAccessoryUncheckedCreateWithoutAccessoryInput[]
    connectOrCreate?: PackageAccessoryCreateOrConnectWithoutAccessoryInput | PackageAccessoryCreateOrConnectWithoutAccessoryInput[]
    upsert?: PackageAccessoryUpsertWithWhereUniqueWithoutAccessoryInput | PackageAccessoryUpsertWithWhereUniqueWithoutAccessoryInput[]
    createMany?: PackageAccessoryCreateManyAccessoryInputEnvelope
    set?: PackageAccessoryWhereUniqueInput | PackageAccessoryWhereUniqueInput[]
    disconnect?: PackageAccessoryWhereUniqueInput | PackageAccessoryWhereUniqueInput[]
    delete?: PackageAccessoryWhereUniqueInput | PackageAccessoryWhereUniqueInput[]
    connect?: PackageAccessoryWhereUniqueInput | PackageAccessoryWhereUniqueInput[]
    update?: PackageAccessoryUpdateWithWhereUniqueWithoutAccessoryInput | PackageAccessoryUpdateWithWhereUniqueWithoutAccessoryInput[]
    updateMany?: PackageAccessoryUpdateManyWithWhereWithoutAccessoryInput | PackageAccessoryUpdateManyWithWhereWithoutAccessoryInput[]
    deleteMany?: PackageAccessoryScalarWhereInput | PackageAccessoryScalarWhereInput[]
  }

  export type LaptopCreateNestedOneWithoutPackagesInput = {
    create?: XOR<LaptopCreateWithoutPackagesInput, LaptopUncheckedCreateWithoutPackagesInput>
    connectOrCreate?: LaptopCreateOrConnectWithoutPackagesInput
    connect?: LaptopWhereUniqueInput
  }

  export type PackageAccessoryCreateNestedManyWithoutPackageInput = {
    create?: XOR<PackageAccessoryCreateWithoutPackageInput, PackageAccessoryUncheckedCreateWithoutPackageInput> | PackageAccessoryCreateWithoutPackageInput[] | PackageAccessoryUncheckedCreateWithoutPackageInput[]
    connectOrCreate?: PackageAccessoryCreateOrConnectWithoutPackageInput | PackageAccessoryCreateOrConnectWithoutPackageInput[]
    createMany?: PackageAccessoryCreateManyPackageInputEnvelope
    connect?: PackageAccessoryWhereUniqueInput | PackageAccessoryWhereUniqueInput[]
  }

  export type PackageAssignmentCreateNestedManyWithoutPackageInput = {
    create?: XOR<PackageAssignmentCreateWithoutPackageInput, PackageAssignmentUncheckedCreateWithoutPackageInput> | PackageAssignmentCreateWithoutPackageInput[] | PackageAssignmentUncheckedCreateWithoutPackageInput[]
    connectOrCreate?: PackageAssignmentCreateOrConnectWithoutPackageInput | PackageAssignmentCreateOrConnectWithoutPackageInput[]
    createMany?: PackageAssignmentCreateManyPackageInputEnvelope
    connect?: PackageAssignmentWhereUniqueInput | PackageAssignmentWhereUniqueInput[]
  }

  export type PackageAccessoryUncheckedCreateNestedManyWithoutPackageInput = {
    create?: XOR<PackageAccessoryCreateWithoutPackageInput, PackageAccessoryUncheckedCreateWithoutPackageInput> | PackageAccessoryCreateWithoutPackageInput[] | PackageAccessoryUncheckedCreateWithoutPackageInput[]
    connectOrCreate?: PackageAccessoryCreateOrConnectWithoutPackageInput | PackageAccessoryCreateOrConnectWithoutPackageInput[]
    createMany?: PackageAccessoryCreateManyPackageInputEnvelope
    connect?: PackageAccessoryWhereUniqueInput | PackageAccessoryWhereUniqueInput[]
  }

  export type PackageAssignmentUncheckedCreateNestedManyWithoutPackageInput = {
    create?: XOR<PackageAssignmentCreateWithoutPackageInput, PackageAssignmentUncheckedCreateWithoutPackageInput> | PackageAssignmentCreateWithoutPackageInput[] | PackageAssignmentUncheckedCreateWithoutPackageInput[]
    connectOrCreate?: PackageAssignmentCreateOrConnectWithoutPackageInput | PackageAssignmentCreateOrConnectWithoutPackageInput[]
    createMany?: PackageAssignmentCreateManyPackageInputEnvelope
    connect?: PackageAssignmentWhereUniqueInput | PackageAssignmentWhereUniqueInput[]
  }

  export type LaptopUpdateOneRequiredWithoutPackagesNestedInput = {
    create?: XOR<LaptopCreateWithoutPackagesInput, LaptopUncheckedCreateWithoutPackagesInput>
    connectOrCreate?: LaptopCreateOrConnectWithoutPackagesInput
    upsert?: LaptopUpsertWithoutPackagesInput
    connect?: LaptopWhereUniqueInput
    update?: XOR<XOR<LaptopUpdateToOneWithWhereWithoutPackagesInput, LaptopUpdateWithoutPackagesInput>, LaptopUncheckedUpdateWithoutPackagesInput>
  }

  export type PackageAccessoryUpdateManyWithoutPackageNestedInput = {
    create?: XOR<PackageAccessoryCreateWithoutPackageInput, PackageAccessoryUncheckedCreateWithoutPackageInput> | PackageAccessoryCreateWithoutPackageInput[] | PackageAccessoryUncheckedCreateWithoutPackageInput[]
    connectOrCreate?: PackageAccessoryCreateOrConnectWithoutPackageInput | PackageAccessoryCreateOrConnectWithoutPackageInput[]
    upsert?: PackageAccessoryUpsertWithWhereUniqueWithoutPackageInput | PackageAccessoryUpsertWithWhereUniqueWithoutPackageInput[]
    createMany?: PackageAccessoryCreateManyPackageInputEnvelope
    set?: PackageAccessoryWhereUniqueInput | PackageAccessoryWhereUniqueInput[]
    disconnect?: PackageAccessoryWhereUniqueInput | PackageAccessoryWhereUniqueInput[]
    delete?: PackageAccessoryWhereUniqueInput | PackageAccessoryWhereUniqueInput[]
    connect?: PackageAccessoryWhereUniqueInput | PackageAccessoryWhereUniqueInput[]
    update?: PackageAccessoryUpdateWithWhereUniqueWithoutPackageInput | PackageAccessoryUpdateWithWhereUniqueWithoutPackageInput[]
    updateMany?: PackageAccessoryUpdateManyWithWhereWithoutPackageInput | PackageAccessoryUpdateManyWithWhereWithoutPackageInput[]
    deleteMany?: PackageAccessoryScalarWhereInput | PackageAccessoryScalarWhereInput[]
  }

  export type PackageAssignmentUpdateManyWithoutPackageNestedInput = {
    create?: XOR<PackageAssignmentCreateWithoutPackageInput, PackageAssignmentUncheckedCreateWithoutPackageInput> | PackageAssignmentCreateWithoutPackageInput[] | PackageAssignmentUncheckedCreateWithoutPackageInput[]
    connectOrCreate?: PackageAssignmentCreateOrConnectWithoutPackageInput | PackageAssignmentCreateOrConnectWithoutPackageInput[]
    upsert?: PackageAssignmentUpsertWithWhereUniqueWithoutPackageInput | PackageAssignmentUpsertWithWhereUniqueWithoutPackageInput[]
    createMany?: PackageAssignmentCreateManyPackageInputEnvelope
    set?: PackageAssignmentWhereUniqueInput | PackageAssignmentWhereUniqueInput[]
    disconnect?: PackageAssignmentWhereUniqueInput | PackageAssignmentWhereUniqueInput[]
    delete?: PackageAssignmentWhereUniqueInput | PackageAssignmentWhereUniqueInput[]
    connect?: PackageAssignmentWhereUniqueInput | PackageAssignmentWhereUniqueInput[]
    update?: PackageAssignmentUpdateWithWhereUniqueWithoutPackageInput | PackageAssignmentUpdateWithWhereUniqueWithoutPackageInput[]
    updateMany?: PackageAssignmentUpdateManyWithWhereWithoutPackageInput | PackageAssignmentUpdateManyWithWhereWithoutPackageInput[]
    deleteMany?: PackageAssignmentScalarWhereInput | PackageAssignmentScalarWhereInput[]
  }

  export type PackageAccessoryUncheckedUpdateManyWithoutPackageNestedInput = {
    create?: XOR<PackageAccessoryCreateWithoutPackageInput, PackageAccessoryUncheckedCreateWithoutPackageInput> | PackageAccessoryCreateWithoutPackageInput[] | PackageAccessoryUncheckedCreateWithoutPackageInput[]
    connectOrCreate?: PackageAccessoryCreateOrConnectWithoutPackageInput | PackageAccessoryCreateOrConnectWithoutPackageInput[]
    upsert?: PackageAccessoryUpsertWithWhereUniqueWithoutPackageInput | PackageAccessoryUpsertWithWhereUniqueWithoutPackageInput[]
    createMany?: PackageAccessoryCreateManyPackageInputEnvelope
    set?: PackageAccessoryWhereUniqueInput | PackageAccessoryWhereUniqueInput[]
    disconnect?: PackageAccessoryWhereUniqueInput | PackageAccessoryWhereUniqueInput[]
    delete?: PackageAccessoryWhereUniqueInput | PackageAccessoryWhereUniqueInput[]
    connect?: PackageAccessoryWhereUniqueInput | PackageAccessoryWhereUniqueInput[]
    update?: PackageAccessoryUpdateWithWhereUniqueWithoutPackageInput | PackageAccessoryUpdateWithWhereUniqueWithoutPackageInput[]
    updateMany?: PackageAccessoryUpdateManyWithWhereWithoutPackageInput | PackageAccessoryUpdateManyWithWhereWithoutPackageInput[]
    deleteMany?: PackageAccessoryScalarWhereInput | PackageAccessoryScalarWhereInput[]
  }

  export type PackageAssignmentUncheckedUpdateManyWithoutPackageNestedInput = {
    create?: XOR<PackageAssignmentCreateWithoutPackageInput, PackageAssignmentUncheckedCreateWithoutPackageInput> | PackageAssignmentCreateWithoutPackageInput[] | PackageAssignmentUncheckedCreateWithoutPackageInput[]
    connectOrCreate?: PackageAssignmentCreateOrConnectWithoutPackageInput | PackageAssignmentCreateOrConnectWithoutPackageInput[]
    upsert?: PackageAssignmentUpsertWithWhereUniqueWithoutPackageInput | PackageAssignmentUpsertWithWhereUniqueWithoutPackageInput[]
    createMany?: PackageAssignmentCreateManyPackageInputEnvelope
    set?: PackageAssignmentWhereUniqueInput | PackageAssignmentWhereUniqueInput[]
    disconnect?: PackageAssignmentWhereUniqueInput | PackageAssignmentWhereUniqueInput[]
    delete?: PackageAssignmentWhereUniqueInput | PackageAssignmentWhereUniqueInput[]
    connect?: PackageAssignmentWhereUniqueInput | PackageAssignmentWhereUniqueInput[]
    update?: PackageAssignmentUpdateWithWhereUniqueWithoutPackageInput | PackageAssignmentUpdateWithWhereUniqueWithoutPackageInput[]
    updateMany?: PackageAssignmentUpdateManyWithWhereWithoutPackageInput | PackageAssignmentUpdateManyWithWhereWithoutPackageInput[]
    deleteMany?: PackageAssignmentScalarWhereInput | PackageAssignmentScalarWhereInput[]
  }

  export type PackageCreateNestedOneWithoutAccessoriesInput = {
    create?: XOR<PackageCreateWithoutAccessoriesInput, PackageUncheckedCreateWithoutAccessoriesInput>
    connectOrCreate?: PackageCreateOrConnectWithoutAccessoriesInput
    connect?: PackageWhereUniqueInput
  }

  export type AccessoryCreateNestedOneWithoutPackageAccessoriesInput = {
    create?: XOR<AccessoryCreateWithoutPackageAccessoriesInput, AccessoryUncheckedCreateWithoutPackageAccessoriesInput>
    connectOrCreate?: AccessoryCreateOrConnectWithoutPackageAccessoriesInput
    connect?: AccessoryWhereUniqueInput
  }

  export type PackageUpdateOneRequiredWithoutAccessoriesNestedInput = {
    create?: XOR<PackageCreateWithoutAccessoriesInput, PackageUncheckedCreateWithoutAccessoriesInput>
    connectOrCreate?: PackageCreateOrConnectWithoutAccessoriesInput
    upsert?: PackageUpsertWithoutAccessoriesInput
    connect?: PackageWhereUniqueInput
    update?: XOR<XOR<PackageUpdateToOneWithWhereWithoutAccessoriesInput, PackageUpdateWithoutAccessoriesInput>, PackageUncheckedUpdateWithoutAccessoriesInput>
  }

  export type AccessoryUpdateOneRequiredWithoutPackageAccessoriesNestedInput = {
    create?: XOR<AccessoryCreateWithoutPackageAccessoriesInput, AccessoryUncheckedCreateWithoutPackageAccessoriesInput>
    connectOrCreate?: AccessoryCreateOrConnectWithoutPackageAccessoriesInput
    upsert?: AccessoryUpsertWithoutPackageAccessoriesInput
    connect?: AccessoryWhereUniqueInput
    update?: XOR<XOR<AccessoryUpdateToOneWithWhereWithoutPackageAccessoriesInput, AccessoryUpdateWithoutPackageAccessoriesInput>, AccessoryUncheckedUpdateWithoutPackageAccessoriesInput>
  }

  export type PackageCreateNestedOneWithoutAssignmentsInput = {
    create?: XOR<PackageCreateWithoutAssignmentsInput, PackageUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: PackageCreateOrConnectWithoutAssignmentsInput
    connect?: PackageWhereUniqueInput
  }

  export type PersonCreateNestedOneWithoutPackageAssignmentsInput = {
    create?: XOR<PersonCreateWithoutPackageAssignmentsInput, PersonUncheckedCreateWithoutPackageAssignmentsInput>
    connectOrCreate?: PersonCreateOrConnectWithoutPackageAssignmentsInput
    connect?: PersonWhereUniqueInput
  }

  export type PackageUpdateOneRequiredWithoutAssignmentsNestedInput = {
    create?: XOR<PackageCreateWithoutAssignmentsInput, PackageUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: PackageCreateOrConnectWithoutAssignmentsInput
    upsert?: PackageUpsertWithoutAssignmentsInput
    connect?: PackageWhereUniqueInput
    update?: XOR<XOR<PackageUpdateToOneWithWhereWithoutAssignmentsInput, PackageUpdateWithoutAssignmentsInput>, PackageUncheckedUpdateWithoutAssignmentsInput>
  }

  export type PersonUpdateOneRequiredWithoutPackageAssignmentsNestedInput = {
    create?: XOR<PersonCreateWithoutPackageAssignmentsInput, PersonUncheckedCreateWithoutPackageAssignmentsInput>
    connectOrCreate?: PersonCreateOrConnectWithoutPackageAssignmentsInput
    upsert?: PersonUpsertWithoutPackageAssignmentsInput
    connect?: PersonWhereUniqueInput
    update?: XOR<XOR<PersonUpdateToOneWithWhereWithoutPackageAssignmentsInput, PersonUpdateWithoutPackageAssignmentsInput>, PersonUncheckedUpdateWithoutPackageAssignmentsInput>
  }

  export type ToolAlternativeCreateNestedManyWithoutToolInput = {
    create?: XOR<ToolAlternativeCreateWithoutToolInput, ToolAlternativeUncheckedCreateWithoutToolInput> | ToolAlternativeCreateWithoutToolInput[] | ToolAlternativeUncheckedCreateWithoutToolInput[]
    connectOrCreate?: ToolAlternativeCreateOrConnectWithoutToolInput | ToolAlternativeCreateOrConnectWithoutToolInput[]
    createMany?: ToolAlternativeCreateManyToolInputEnvelope
    connect?: ToolAlternativeWhereUniqueInput | ToolAlternativeWhereUniqueInput[]
  }

  export type ToolkitToolCreateNestedManyWithoutToolInput = {
    create?: XOR<ToolkitToolCreateWithoutToolInput, ToolkitToolUncheckedCreateWithoutToolInput> | ToolkitToolCreateWithoutToolInput[] | ToolkitToolUncheckedCreateWithoutToolInput[]
    connectOrCreate?: ToolkitToolCreateOrConnectWithoutToolInput | ToolkitToolCreateOrConnectWithoutToolInput[]
    createMany?: ToolkitToolCreateManyToolInputEnvelope
    connect?: ToolkitToolWhereUniqueInput | ToolkitToolWhereUniqueInput[]
  }

  export type ToolAlternativeUncheckedCreateNestedManyWithoutToolInput = {
    create?: XOR<ToolAlternativeCreateWithoutToolInput, ToolAlternativeUncheckedCreateWithoutToolInput> | ToolAlternativeCreateWithoutToolInput[] | ToolAlternativeUncheckedCreateWithoutToolInput[]
    connectOrCreate?: ToolAlternativeCreateOrConnectWithoutToolInput | ToolAlternativeCreateOrConnectWithoutToolInput[]
    createMany?: ToolAlternativeCreateManyToolInputEnvelope
    connect?: ToolAlternativeWhereUniqueInput | ToolAlternativeWhereUniqueInput[]
  }

  export type ToolkitToolUncheckedCreateNestedManyWithoutToolInput = {
    create?: XOR<ToolkitToolCreateWithoutToolInput, ToolkitToolUncheckedCreateWithoutToolInput> | ToolkitToolCreateWithoutToolInput[] | ToolkitToolUncheckedCreateWithoutToolInput[]
    connectOrCreate?: ToolkitToolCreateOrConnectWithoutToolInput | ToolkitToolCreateOrConnectWithoutToolInput[]
    createMany?: ToolkitToolCreateManyToolInputEnvelope
    connect?: ToolkitToolWhereUniqueInput | ToolkitToolWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ToolAlternativeUpdateManyWithoutToolNestedInput = {
    create?: XOR<ToolAlternativeCreateWithoutToolInput, ToolAlternativeUncheckedCreateWithoutToolInput> | ToolAlternativeCreateWithoutToolInput[] | ToolAlternativeUncheckedCreateWithoutToolInput[]
    connectOrCreate?: ToolAlternativeCreateOrConnectWithoutToolInput | ToolAlternativeCreateOrConnectWithoutToolInput[]
    upsert?: ToolAlternativeUpsertWithWhereUniqueWithoutToolInput | ToolAlternativeUpsertWithWhereUniqueWithoutToolInput[]
    createMany?: ToolAlternativeCreateManyToolInputEnvelope
    set?: ToolAlternativeWhereUniqueInput | ToolAlternativeWhereUniqueInput[]
    disconnect?: ToolAlternativeWhereUniqueInput | ToolAlternativeWhereUniqueInput[]
    delete?: ToolAlternativeWhereUniqueInput | ToolAlternativeWhereUniqueInput[]
    connect?: ToolAlternativeWhereUniqueInput | ToolAlternativeWhereUniqueInput[]
    update?: ToolAlternativeUpdateWithWhereUniqueWithoutToolInput | ToolAlternativeUpdateWithWhereUniqueWithoutToolInput[]
    updateMany?: ToolAlternativeUpdateManyWithWhereWithoutToolInput | ToolAlternativeUpdateManyWithWhereWithoutToolInput[]
    deleteMany?: ToolAlternativeScalarWhereInput | ToolAlternativeScalarWhereInput[]
  }

  export type ToolkitToolUpdateManyWithoutToolNestedInput = {
    create?: XOR<ToolkitToolCreateWithoutToolInput, ToolkitToolUncheckedCreateWithoutToolInput> | ToolkitToolCreateWithoutToolInput[] | ToolkitToolUncheckedCreateWithoutToolInput[]
    connectOrCreate?: ToolkitToolCreateOrConnectWithoutToolInput | ToolkitToolCreateOrConnectWithoutToolInput[]
    upsert?: ToolkitToolUpsertWithWhereUniqueWithoutToolInput | ToolkitToolUpsertWithWhereUniqueWithoutToolInput[]
    createMany?: ToolkitToolCreateManyToolInputEnvelope
    set?: ToolkitToolWhereUniqueInput | ToolkitToolWhereUniqueInput[]
    disconnect?: ToolkitToolWhereUniqueInput | ToolkitToolWhereUniqueInput[]
    delete?: ToolkitToolWhereUniqueInput | ToolkitToolWhereUniqueInput[]
    connect?: ToolkitToolWhereUniqueInput | ToolkitToolWhereUniqueInput[]
    update?: ToolkitToolUpdateWithWhereUniqueWithoutToolInput | ToolkitToolUpdateWithWhereUniqueWithoutToolInput[]
    updateMany?: ToolkitToolUpdateManyWithWhereWithoutToolInput | ToolkitToolUpdateManyWithWhereWithoutToolInput[]
    deleteMany?: ToolkitToolScalarWhereInput | ToolkitToolScalarWhereInput[]
  }

  export type ToolAlternativeUncheckedUpdateManyWithoutToolNestedInput = {
    create?: XOR<ToolAlternativeCreateWithoutToolInput, ToolAlternativeUncheckedCreateWithoutToolInput> | ToolAlternativeCreateWithoutToolInput[] | ToolAlternativeUncheckedCreateWithoutToolInput[]
    connectOrCreate?: ToolAlternativeCreateOrConnectWithoutToolInput | ToolAlternativeCreateOrConnectWithoutToolInput[]
    upsert?: ToolAlternativeUpsertWithWhereUniqueWithoutToolInput | ToolAlternativeUpsertWithWhereUniqueWithoutToolInput[]
    createMany?: ToolAlternativeCreateManyToolInputEnvelope
    set?: ToolAlternativeWhereUniqueInput | ToolAlternativeWhereUniqueInput[]
    disconnect?: ToolAlternativeWhereUniqueInput | ToolAlternativeWhereUniqueInput[]
    delete?: ToolAlternativeWhereUniqueInput | ToolAlternativeWhereUniqueInput[]
    connect?: ToolAlternativeWhereUniqueInput | ToolAlternativeWhereUniqueInput[]
    update?: ToolAlternativeUpdateWithWhereUniqueWithoutToolInput | ToolAlternativeUpdateWithWhereUniqueWithoutToolInput[]
    updateMany?: ToolAlternativeUpdateManyWithWhereWithoutToolInput | ToolAlternativeUpdateManyWithWhereWithoutToolInput[]
    deleteMany?: ToolAlternativeScalarWhereInput | ToolAlternativeScalarWhereInput[]
  }

  export type ToolkitToolUncheckedUpdateManyWithoutToolNestedInput = {
    create?: XOR<ToolkitToolCreateWithoutToolInput, ToolkitToolUncheckedCreateWithoutToolInput> | ToolkitToolCreateWithoutToolInput[] | ToolkitToolUncheckedCreateWithoutToolInput[]
    connectOrCreate?: ToolkitToolCreateOrConnectWithoutToolInput | ToolkitToolCreateOrConnectWithoutToolInput[]
    upsert?: ToolkitToolUpsertWithWhereUniqueWithoutToolInput | ToolkitToolUpsertWithWhereUniqueWithoutToolInput[]
    createMany?: ToolkitToolCreateManyToolInputEnvelope
    set?: ToolkitToolWhereUniqueInput | ToolkitToolWhereUniqueInput[]
    disconnect?: ToolkitToolWhereUniqueInput | ToolkitToolWhereUniqueInput[]
    delete?: ToolkitToolWhereUniqueInput | ToolkitToolWhereUniqueInput[]
    connect?: ToolkitToolWhereUniqueInput | ToolkitToolWhereUniqueInput[]
    update?: ToolkitToolUpdateWithWhereUniqueWithoutToolInput | ToolkitToolUpdateWithWhereUniqueWithoutToolInput[]
    updateMany?: ToolkitToolUpdateManyWithWhereWithoutToolInput | ToolkitToolUpdateManyWithWhereWithoutToolInput[]
    deleteMany?: ToolkitToolScalarWhereInput | ToolkitToolScalarWhereInput[]
  }

  export type ToolCreateNestedOneWithoutAlternativesInput = {
    create?: XOR<ToolCreateWithoutAlternativesInput, ToolUncheckedCreateWithoutAlternativesInput>
    connectOrCreate?: ToolCreateOrConnectWithoutAlternativesInput
    connect?: ToolWhereUniqueInput
  }

  export type ToolUpdateOneRequiredWithoutAlternativesNestedInput = {
    create?: XOR<ToolCreateWithoutAlternativesInput, ToolUncheckedCreateWithoutAlternativesInput>
    connectOrCreate?: ToolCreateOrConnectWithoutAlternativesInput
    upsert?: ToolUpsertWithoutAlternativesInput
    connect?: ToolWhereUniqueInput
    update?: XOR<XOR<ToolUpdateToOneWithWhereWithoutAlternativesInput, ToolUpdateWithoutAlternativesInput>, ToolUncheckedUpdateWithoutAlternativesInput>
  }

  export type ToolkitToolCreateNestedManyWithoutToolkitInput = {
    create?: XOR<ToolkitToolCreateWithoutToolkitInput, ToolkitToolUncheckedCreateWithoutToolkitInput> | ToolkitToolCreateWithoutToolkitInput[] | ToolkitToolUncheckedCreateWithoutToolkitInput[]
    connectOrCreate?: ToolkitToolCreateOrConnectWithoutToolkitInput | ToolkitToolCreateOrConnectWithoutToolkitInput[]
    createMany?: ToolkitToolCreateManyToolkitInputEnvelope
    connect?: ToolkitToolWhereUniqueInput | ToolkitToolWhereUniqueInput[]
  }

  export type SurveyResponseCreateNestedManyWithoutMatchedToolkitInput = {
    create?: XOR<SurveyResponseCreateWithoutMatchedToolkitInput, SurveyResponseUncheckedCreateWithoutMatchedToolkitInput> | SurveyResponseCreateWithoutMatchedToolkitInput[] | SurveyResponseUncheckedCreateWithoutMatchedToolkitInput[]
    connectOrCreate?: SurveyResponseCreateOrConnectWithoutMatchedToolkitInput | SurveyResponseCreateOrConnectWithoutMatchedToolkitInput[]
    createMany?: SurveyResponseCreateManyMatchedToolkitInputEnvelope
    connect?: SurveyResponseWhereUniqueInput | SurveyResponseWhereUniqueInput[]
  }

  export type ToolkitToolUncheckedCreateNestedManyWithoutToolkitInput = {
    create?: XOR<ToolkitToolCreateWithoutToolkitInput, ToolkitToolUncheckedCreateWithoutToolkitInput> | ToolkitToolCreateWithoutToolkitInput[] | ToolkitToolUncheckedCreateWithoutToolkitInput[]
    connectOrCreate?: ToolkitToolCreateOrConnectWithoutToolkitInput | ToolkitToolCreateOrConnectWithoutToolkitInput[]
    createMany?: ToolkitToolCreateManyToolkitInputEnvelope
    connect?: ToolkitToolWhereUniqueInput | ToolkitToolWhereUniqueInput[]
  }

  export type SurveyResponseUncheckedCreateNestedManyWithoutMatchedToolkitInput = {
    create?: XOR<SurveyResponseCreateWithoutMatchedToolkitInput, SurveyResponseUncheckedCreateWithoutMatchedToolkitInput> | SurveyResponseCreateWithoutMatchedToolkitInput[] | SurveyResponseUncheckedCreateWithoutMatchedToolkitInput[]
    connectOrCreate?: SurveyResponseCreateOrConnectWithoutMatchedToolkitInput | SurveyResponseCreateOrConnectWithoutMatchedToolkitInput[]
    createMany?: SurveyResponseCreateManyMatchedToolkitInputEnvelope
    connect?: SurveyResponseWhereUniqueInput | SurveyResponseWhereUniqueInput[]
  }

  export type ToolkitToolUpdateManyWithoutToolkitNestedInput = {
    create?: XOR<ToolkitToolCreateWithoutToolkitInput, ToolkitToolUncheckedCreateWithoutToolkitInput> | ToolkitToolCreateWithoutToolkitInput[] | ToolkitToolUncheckedCreateWithoutToolkitInput[]
    connectOrCreate?: ToolkitToolCreateOrConnectWithoutToolkitInput | ToolkitToolCreateOrConnectWithoutToolkitInput[]
    upsert?: ToolkitToolUpsertWithWhereUniqueWithoutToolkitInput | ToolkitToolUpsertWithWhereUniqueWithoutToolkitInput[]
    createMany?: ToolkitToolCreateManyToolkitInputEnvelope
    set?: ToolkitToolWhereUniqueInput | ToolkitToolWhereUniqueInput[]
    disconnect?: ToolkitToolWhereUniqueInput | ToolkitToolWhereUniqueInput[]
    delete?: ToolkitToolWhereUniqueInput | ToolkitToolWhereUniqueInput[]
    connect?: ToolkitToolWhereUniqueInput | ToolkitToolWhereUniqueInput[]
    update?: ToolkitToolUpdateWithWhereUniqueWithoutToolkitInput | ToolkitToolUpdateWithWhereUniqueWithoutToolkitInput[]
    updateMany?: ToolkitToolUpdateManyWithWhereWithoutToolkitInput | ToolkitToolUpdateManyWithWhereWithoutToolkitInput[]
    deleteMany?: ToolkitToolScalarWhereInput | ToolkitToolScalarWhereInput[]
  }

  export type SurveyResponseUpdateManyWithoutMatchedToolkitNestedInput = {
    create?: XOR<SurveyResponseCreateWithoutMatchedToolkitInput, SurveyResponseUncheckedCreateWithoutMatchedToolkitInput> | SurveyResponseCreateWithoutMatchedToolkitInput[] | SurveyResponseUncheckedCreateWithoutMatchedToolkitInput[]
    connectOrCreate?: SurveyResponseCreateOrConnectWithoutMatchedToolkitInput | SurveyResponseCreateOrConnectWithoutMatchedToolkitInput[]
    upsert?: SurveyResponseUpsertWithWhereUniqueWithoutMatchedToolkitInput | SurveyResponseUpsertWithWhereUniqueWithoutMatchedToolkitInput[]
    createMany?: SurveyResponseCreateManyMatchedToolkitInputEnvelope
    set?: SurveyResponseWhereUniqueInput | SurveyResponseWhereUniqueInput[]
    disconnect?: SurveyResponseWhereUniqueInput | SurveyResponseWhereUniqueInput[]
    delete?: SurveyResponseWhereUniqueInput | SurveyResponseWhereUniqueInput[]
    connect?: SurveyResponseWhereUniqueInput | SurveyResponseWhereUniqueInput[]
    update?: SurveyResponseUpdateWithWhereUniqueWithoutMatchedToolkitInput | SurveyResponseUpdateWithWhereUniqueWithoutMatchedToolkitInput[]
    updateMany?: SurveyResponseUpdateManyWithWhereWithoutMatchedToolkitInput | SurveyResponseUpdateManyWithWhereWithoutMatchedToolkitInput[]
    deleteMany?: SurveyResponseScalarWhereInput | SurveyResponseScalarWhereInput[]
  }

  export type ToolkitToolUncheckedUpdateManyWithoutToolkitNestedInput = {
    create?: XOR<ToolkitToolCreateWithoutToolkitInput, ToolkitToolUncheckedCreateWithoutToolkitInput> | ToolkitToolCreateWithoutToolkitInput[] | ToolkitToolUncheckedCreateWithoutToolkitInput[]
    connectOrCreate?: ToolkitToolCreateOrConnectWithoutToolkitInput | ToolkitToolCreateOrConnectWithoutToolkitInput[]
    upsert?: ToolkitToolUpsertWithWhereUniqueWithoutToolkitInput | ToolkitToolUpsertWithWhereUniqueWithoutToolkitInput[]
    createMany?: ToolkitToolCreateManyToolkitInputEnvelope
    set?: ToolkitToolWhereUniqueInput | ToolkitToolWhereUniqueInput[]
    disconnect?: ToolkitToolWhereUniqueInput | ToolkitToolWhereUniqueInput[]
    delete?: ToolkitToolWhereUniqueInput | ToolkitToolWhereUniqueInput[]
    connect?: ToolkitToolWhereUniqueInput | ToolkitToolWhereUniqueInput[]
    update?: ToolkitToolUpdateWithWhereUniqueWithoutToolkitInput | ToolkitToolUpdateWithWhereUniqueWithoutToolkitInput[]
    updateMany?: ToolkitToolUpdateManyWithWhereWithoutToolkitInput | ToolkitToolUpdateManyWithWhereWithoutToolkitInput[]
    deleteMany?: ToolkitToolScalarWhereInput | ToolkitToolScalarWhereInput[]
  }

  export type SurveyResponseUncheckedUpdateManyWithoutMatchedToolkitNestedInput = {
    create?: XOR<SurveyResponseCreateWithoutMatchedToolkitInput, SurveyResponseUncheckedCreateWithoutMatchedToolkitInput> | SurveyResponseCreateWithoutMatchedToolkitInput[] | SurveyResponseUncheckedCreateWithoutMatchedToolkitInput[]
    connectOrCreate?: SurveyResponseCreateOrConnectWithoutMatchedToolkitInput | SurveyResponseCreateOrConnectWithoutMatchedToolkitInput[]
    upsert?: SurveyResponseUpsertWithWhereUniqueWithoutMatchedToolkitInput | SurveyResponseUpsertWithWhereUniqueWithoutMatchedToolkitInput[]
    createMany?: SurveyResponseCreateManyMatchedToolkitInputEnvelope
    set?: SurveyResponseWhereUniqueInput | SurveyResponseWhereUniqueInput[]
    disconnect?: SurveyResponseWhereUniqueInput | SurveyResponseWhereUniqueInput[]
    delete?: SurveyResponseWhereUniqueInput | SurveyResponseWhereUniqueInput[]
    connect?: SurveyResponseWhereUniqueInput | SurveyResponseWhereUniqueInput[]
    update?: SurveyResponseUpdateWithWhereUniqueWithoutMatchedToolkitInput | SurveyResponseUpdateWithWhereUniqueWithoutMatchedToolkitInput[]
    updateMany?: SurveyResponseUpdateManyWithWhereWithoutMatchedToolkitInput | SurveyResponseUpdateManyWithWhereWithoutMatchedToolkitInput[]
    deleteMany?: SurveyResponseScalarWhereInput | SurveyResponseScalarWhereInput[]
  }

  export type ToolkitCreateNestedOneWithoutToolsInput = {
    create?: XOR<ToolkitCreateWithoutToolsInput, ToolkitUncheckedCreateWithoutToolsInput>
    connectOrCreate?: ToolkitCreateOrConnectWithoutToolsInput
    connect?: ToolkitWhereUniqueInput
  }

  export type ToolCreateNestedOneWithoutToolkitsInput = {
    create?: XOR<ToolCreateWithoutToolkitsInput, ToolUncheckedCreateWithoutToolkitsInput>
    connectOrCreate?: ToolCreateOrConnectWithoutToolkitsInput
    connect?: ToolWhereUniqueInput
  }

  export type ToolkitUpdateOneRequiredWithoutToolsNestedInput = {
    create?: XOR<ToolkitCreateWithoutToolsInput, ToolkitUncheckedCreateWithoutToolsInput>
    connectOrCreate?: ToolkitCreateOrConnectWithoutToolsInput
    upsert?: ToolkitUpsertWithoutToolsInput
    connect?: ToolkitWhereUniqueInput
    update?: XOR<XOR<ToolkitUpdateToOneWithWhereWithoutToolsInput, ToolkitUpdateWithoutToolsInput>, ToolkitUncheckedUpdateWithoutToolsInput>
  }

  export type ToolUpdateOneRequiredWithoutToolkitsNestedInput = {
    create?: XOR<ToolCreateWithoutToolkitsInput, ToolUncheckedCreateWithoutToolkitsInput>
    connectOrCreate?: ToolCreateOrConnectWithoutToolkitsInput
    upsert?: ToolUpsertWithoutToolkitsInput
    connect?: ToolWhereUniqueInput
    update?: XOR<XOR<ToolUpdateToOneWithWhereWithoutToolkitsInput, ToolUpdateWithoutToolkitsInput>, ToolUncheckedUpdateWithoutToolkitsInput>
  }

  export type SurveyResponseCreateexperienceWithOtherOSInput = {
    set: string[]
  }

  export type SurveyResponseCreateprogrammingLanguagesInput = {
    set: string[]
  }

  export type SurveyResponseCreatedevelopmentTypeInput = {
    set: string[]
  }

  export type SurveyResponseCreateselectedToolsInput = {
    set: string[]
  }

  export type ToolkitCreateNestedOneWithoutSurveyMatchesInput = {
    create?: XOR<ToolkitCreateWithoutSurveyMatchesInput, ToolkitUncheckedCreateWithoutSurveyMatchesInput>
    connectOrCreate?: ToolkitCreateOrConnectWithoutSurveyMatchesInput
    connect?: ToolkitWhereUniqueInput
  }

  export type SurveyResponseUpdateexperienceWithOtherOSInput = {
    set?: string[]
    push?: string | string[]
  }

  export type SurveyResponseUpdateprogrammingLanguagesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type SurveyResponseUpdatedevelopmentTypeInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type SurveyResponseUpdateselectedToolsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ToolkitUpdateOneWithoutSurveyMatchesNestedInput = {
    create?: XOR<ToolkitCreateWithoutSurveyMatchesInput, ToolkitUncheckedCreateWithoutSurveyMatchesInput>
    connectOrCreate?: ToolkitCreateOrConnectWithoutSurveyMatchesInput
    upsert?: ToolkitUpsertWithoutSurveyMatchesInput
    disconnect?: ToolkitWhereInput | boolean
    delete?: ToolkitWhereInput | boolean
    connect?: ToolkitWhereUniqueInput
    update?: XOR<XOR<ToolkitUpdateToOneWithWhereWithoutSurveyMatchesInput, ToolkitUpdateWithoutSurveyMatchesInput>, ToolkitUncheckedUpdateWithoutSurveyMatchesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type PackageAssignmentCreateWithoutPersonInput = {
    id?: string
    pcReference?: string | null
    assignedAt?: Date | string
    package: PackageCreateNestedOneWithoutAssignmentsInput
  }

  export type PackageAssignmentUncheckedCreateWithoutPersonInput = {
    id?: string
    packageId: string
    pcReference?: string | null
    assignedAt?: Date | string
  }

  export type PackageAssignmentCreateOrConnectWithoutPersonInput = {
    where: PackageAssignmentWhereUniqueInput
    create: XOR<PackageAssignmentCreateWithoutPersonInput, PackageAssignmentUncheckedCreateWithoutPersonInput>
  }

  export type PackageAssignmentCreateManyPersonInputEnvelope = {
    data: PackageAssignmentCreateManyPersonInput | PackageAssignmentCreateManyPersonInput[]
    skipDuplicates?: boolean
  }

  export type PackageAssignmentUpsertWithWhereUniqueWithoutPersonInput = {
    where: PackageAssignmentWhereUniqueInput
    update: XOR<PackageAssignmentUpdateWithoutPersonInput, PackageAssignmentUncheckedUpdateWithoutPersonInput>
    create: XOR<PackageAssignmentCreateWithoutPersonInput, PackageAssignmentUncheckedCreateWithoutPersonInput>
  }

  export type PackageAssignmentUpdateWithWhereUniqueWithoutPersonInput = {
    where: PackageAssignmentWhereUniqueInput
    data: XOR<PackageAssignmentUpdateWithoutPersonInput, PackageAssignmentUncheckedUpdateWithoutPersonInput>
  }

  export type PackageAssignmentUpdateManyWithWhereWithoutPersonInput = {
    where: PackageAssignmentScalarWhereInput
    data: XOR<PackageAssignmentUpdateManyMutationInput, PackageAssignmentUncheckedUpdateManyWithoutPersonInput>
  }

  export type PackageAssignmentScalarWhereInput = {
    AND?: PackageAssignmentScalarWhereInput | PackageAssignmentScalarWhereInput[]
    OR?: PackageAssignmentScalarWhereInput[]
    NOT?: PackageAssignmentScalarWhereInput | PackageAssignmentScalarWhereInput[]
    id?: StringFilter<"PackageAssignment"> | string
    packageId?: StringFilter<"PackageAssignment"> | string
    personId?: StringFilter<"PackageAssignment"> | string
    pcReference?: StringNullableFilter<"PackageAssignment"> | string | null
    assignedAt?: DateTimeFilter<"PackageAssignment"> | Date | string
  }

  export type LaptopProfileCreateWithoutLaptopInput = {
    profile: string
  }

  export type LaptopProfileUncheckedCreateWithoutLaptopInput = {
    profile: string
  }

  export type LaptopProfileCreateOrConnectWithoutLaptopInput = {
    where: LaptopProfileWhereUniqueInput
    create: XOR<LaptopProfileCreateWithoutLaptopInput, LaptopProfileUncheckedCreateWithoutLaptopInput>
  }

  export type LaptopProfileCreateManyLaptopInputEnvelope = {
    data: LaptopProfileCreateManyLaptopInput | LaptopProfileCreateManyLaptopInput[]
    skipDuplicates?: boolean
  }

  export type LaptopOSCreateWithoutLaptopInput = {
    os: string
  }

  export type LaptopOSUncheckedCreateWithoutLaptopInput = {
    os: string
  }

  export type LaptopOSCreateOrConnectWithoutLaptopInput = {
    where: LaptopOSWhereUniqueInput
    create: XOR<LaptopOSCreateWithoutLaptopInput, LaptopOSUncheckedCreateWithoutLaptopInput>
  }

  export type LaptopOSCreateManyLaptopInputEnvelope = {
    data: LaptopOSCreateManyLaptopInput | LaptopOSCreateManyLaptopInput[]
    skipDuplicates?: boolean
  }

  export type PackageCreateWithoutLaptopInput = {
    id?: string
    name: string
    status: string
    priceType: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedTo?: string | null
    accessories?: PackageAccessoryCreateNestedManyWithoutPackageInput
    assignments?: PackageAssignmentCreateNestedManyWithoutPackageInput
  }

  export type PackageUncheckedCreateWithoutLaptopInput = {
    id?: string
    name: string
    status: string
    priceType: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedTo?: string | null
    accessories?: PackageAccessoryUncheckedCreateNestedManyWithoutPackageInput
    assignments?: PackageAssignmentUncheckedCreateNestedManyWithoutPackageInput
  }

  export type PackageCreateOrConnectWithoutLaptopInput = {
    where: PackageWhereUniqueInput
    create: XOR<PackageCreateWithoutLaptopInput, PackageUncheckedCreateWithoutLaptopInput>
  }

  export type PackageCreateManyLaptopInputEnvelope = {
    data: PackageCreateManyLaptopInput | PackageCreateManyLaptopInput[]
    skipDuplicates?: boolean
  }

  export type LaptopProfileUpsertWithWhereUniqueWithoutLaptopInput = {
    where: LaptopProfileWhereUniqueInput
    update: XOR<LaptopProfileUpdateWithoutLaptopInput, LaptopProfileUncheckedUpdateWithoutLaptopInput>
    create: XOR<LaptopProfileCreateWithoutLaptopInput, LaptopProfileUncheckedCreateWithoutLaptopInput>
  }

  export type LaptopProfileUpdateWithWhereUniqueWithoutLaptopInput = {
    where: LaptopProfileWhereUniqueInput
    data: XOR<LaptopProfileUpdateWithoutLaptopInput, LaptopProfileUncheckedUpdateWithoutLaptopInput>
  }

  export type LaptopProfileUpdateManyWithWhereWithoutLaptopInput = {
    where: LaptopProfileScalarWhereInput
    data: XOR<LaptopProfileUpdateManyMutationInput, LaptopProfileUncheckedUpdateManyWithoutLaptopInput>
  }

  export type LaptopProfileScalarWhereInput = {
    AND?: LaptopProfileScalarWhereInput | LaptopProfileScalarWhereInput[]
    OR?: LaptopProfileScalarWhereInput[]
    NOT?: LaptopProfileScalarWhereInput | LaptopProfileScalarWhereInput[]
    laptopId?: StringFilter<"LaptopProfile"> | string
    profile?: StringFilter<"LaptopProfile"> | string
  }

  export type LaptopOSUpsertWithWhereUniqueWithoutLaptopInput = {
    where: LaptopOSWhereUniqueInput
    update: XOR<LaptopOSUpdateWithoutLaptopInput, LaptopOSUncheckedUpdateWithoutLaptopInput>
    create: XOR<LaptopOSCreateWithoutLaptopInput, LaptopOSUncheckedCreateWithoutLaptopInput>
  }

  export type LaptopOSUpdateWithWhereUniqueWithoutLaptopInput = {
    where: LaptopOSWhereUniqueInput
    data: XOR<LaptopOSUpdateWithoutLaptopInput, LaptopOSUncheckedUpdateWithoutLaptopInput>
  }

  export type LaptopOSUpdateManyWithWhereWithoutLaptopInput = {
    where: LaptopOSScalarWhereInput
    data: XOR<LaptopOSUpdateManyMutationInput, LaptopOSUncheckedUpdateManyWithoutLaptopInput>
  }

  export type LaptopOSScalarWhereInput = {
    AND?: LaptopOSScalarWhereInput | LaptopOSScalarWhereInput[]
    OR?: LaptopOSScalarWhereInput[]
    NOT?: LaptopOSScalarWhereInput | LaptopOSScalarWhereInput[]
    laptopId?: StringFilter<"LaptopOS"> | string
    os?: StringFilter<"LaptopOS"> | string
  }

  export type PackageUpsertWithWhereUniqueWithoutLaptopInput = {
    where: PackageWhereUniqueInput
    update: XOR<PackageUpdateWithoutLaptopInput, PackageUncheckedUpdateWithoutLaptopInput>
    create: XOR<PackageCreateWithoutLaptopInput, PackageUncheckedCreateWithoutLaptopInput>
  }

  export type PackageUpdateWithWhereUniqueWithoutLaptopInput = {
    where: PackageWhereUniqueInput
    data: XOR<PackageUpdateWithoutLaptopInput, PackageUncheckedUpdateWithoutLaptopInput>
  }

  export type PackageUpdateManyWithWhereWithoutLaptopInput = {
    where: PackageScalarWhereInput
    data: XOR<PackageUpdateManyMutationInput, PackageUncheckedUpdateManyWithoutLaptopInput>
  }

  export type PackageScalarWhereInput = {
    AND?: PackageScalarWhereInput | PackageScalarWhereInput[]
    OR?: PackageScalarWhereInput[]
    NOT?: PackageScalarWhereInput | PackageScalarWhereInput[]
    id?: StringFilter<"Package"> | string
    name?: StringFilter<"Package"> | string
    laptopId?: StringFilter<"Package"> | string
    status?: StringFilter<"Package"> | string
    priceType?: StringFilter<"Package"> | string
    notes?: StringNullableFilter<"Package"> | string | null
    createdAt?: DateTimeFilter<"Package"> | Date | string
    updatedAt?: DateTimeFilter<"Package"> | Date | string
    assignedTo?: StringNullableFilter<"Package"> | string | null
  }

  export type LaptopCreateWithoutSupportedProfilesInput = {
    id?: string
    brand: string
    model: string
    price: Decimal | DecimalJsLike | number | string
    priceType: string
    processor: string
    ram: string
    storage: string
    batteryLife: Decimal | DecimalJsLike | number | string
    performanceScore: Decimal | DecimalJsLike | number | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    supportedOS?: LaptopOSCreateNestedManyWithoutLaptopInput
    packages?: PackageCreateNestedManyWithoutLaptopInput
  }

  export type LaptopUncheckedCreateWithoutSupportedProfilesInput = {
    id?: string
    brand: string
    model: string
    price: Decimal | DecimalJsLike | number | string
    priceType: string
    processor: string
    ram: string
    storage: string
    batteryLife: Decimal | DecimalJsLike | number | string
    performanceScore: Decimal | DecimalJsLike | number | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    supportedOS?: LaptopOSUncheckedCreateNestedManyWithoutLaptopInput
    packages?: PackageUncheckedCreateNestedManyWithoutLaptopInput
  }

  export type LaptopCreateOrConnectWithoutSupportedProfilesInput = {
    where: LaptopWhereUniqueInput
    create: XOR<LaptopCreateWithoutSupportedProfilesInput, LaptopUncheckedCreateWithoutSupportedProfilesInput>
  }

  export type LaptopUpsertWithoutSupportedProfilesInput = {
    update: XOR<LaptopUpdateWithoutSupportedProfilesInput, LaptopUncheckedUpdateWithoutSupportedProfilesInput>
    create: XOR<LaptopCreateWithoutSupportedProfilesInput, LaptopUncheckedCreateWithoutSupportedProfilesInput>
    where?: LaptopWhereInput
  }

  export type LaptopUpdateToOneWithWhereWithoutSupportedProfilesInput = {
    where?: LaptopWhereInput
    data: XOR<LaptopUpdateWithoutSupportedProfilesInput, LaptopUncheckedUpdateWithoutSupportedProfilesInput>
  }

  export type LaptopUpdateWithoutSupportedProfilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    priceType?: StringFieldUpdateOperationsInput | string
    processor?: StringFieldUpdateOperationsInput | string
    ram?: StringFieldUpdateOperationsInput | string
    storage?: StringFieldUpdateOperationsInput | string
    batteryLife?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    performanceScore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    supportedOS?: LaptopOSUpdateManyWithoutLaptopNestedInput
    packages?: PackageUpdateManyWithoutLaptopNestedInput
  }

  export type LaptopUncheckedUpdateWithoutSupportedProfilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    priceType?: StringFieldUpdateOperationsInput | string
    processor?: StringFieldUpdateOperationsInput | string
    ram?: StringFieldUpdateOperationsInput | string
    storage?: StringFieldUpdateOperationsInput | string
    batteryLife?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    performanceScore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    supportedOS?: LaptopOSUncheckedUpdateManyWithoutLaptopNestedInput
    packages?: PackageUncheckedUpdateManyWithoutLaptopNestedInput
  }

  export type LaptopCreateWithoutSupportedOSInput = {
    id?: string
    brand: string
    model: string
    price: Decimal | DecimalJsLike | number | string
    priceType: string
    processor: string
    ram: string
    storage: string
    batteryLife: Decimal | DecimalJsLike | number | string
    performanceScore: Decimal | DecimalJsLike | number | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    supportedProfiles?: LaptopProfileCreateNestedManyWithoutLaptopInput
    packages?: PackageCreateNestedManyWithoutLaptopInput
  }

  export type LaptopUncheckedCreateWithoutSupportedOSInput = {
    id?: string
    brand: string
    model: string
    price: Decimal | DecimalJsLike | number | string
    priceType: string
    processor: string
    ram: string
    storage: string
    batteryLife: Decimal | DecimalJsLike | number | string
    performanceScore: Decimal | DecimalJsLike | number | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    supportedProfiles?: LaptopProfileUncheckedCreateNestedManyWithoutLaptopInput
    packages?: PackageUncheckedCreateNestedManyWithoutLaptopInput
  }

  export type LaptopCreateOrConnectWithoutSupportedOSInput = {
    where: LaptopWhereUniqueInput
    create: XOR<LaptopCreateWithoutSupportedOSInput, LaptopUncheckedCreateWithoutSupportedOSInput>
  }

  export type LaptopUpsertWithoutSupportedOSInput = {
    update: XOR<LaptopUpdateWithoutSupportedOSInput, LaptopUncheckedUpdateWithoutSupportedOSInput>
    create: XOR<LaptopCreateWithoutSupportedOSInput, LaptopUncheckedCreateWithoutSupportedOSInput>
    where?: LaptopWhereInput
  }

  export type LaptopUpdateToOneWithWhereWithoutSupportedOSInput = {
    where?: LaptopWhereInput
    data: XOR<LaptopUpdateWithoutSupportedOSInput, LaptopUncheckedUpdateWithoutSupportedOSInput>
  }

  export type LaptopUpdateWithoutSupportedOSInput = {
    id?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    priceType?: StringFieldUpdateOperationsInput | string
    processor?: StringFieldUpdateOperationsInput | string
    ram?: StringFieldUpdateOperationsInput | string
    storage?: StringFieldUpdateOperationsInput | string
    batteryLife?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    performanceScore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    supportedProfiles?: LaptopProfileUpdateManyWithoutLaptopNestedInput
    packages?: PackageUpdateManyWithoutLaptopNestedInput
  }

  export type LaptopUncheckedUpdateWithoutSupportedOSInput = {
    id?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    priceType?: StringFieldUpdateOperationsInput | string
    processor?: StringFieldUpdateOperationsInput | string
    ram?: StringFieldUpdateOperationsInput | string
    storage?: StringFieldUpdateOperationsInput | string
    batteryLife?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    performanceScore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    supportedProfiles?: LaptopProfileUncheckedUpdateManyWithoutLaptopNestedInput
    packages?: PackageUncheckedUpdateManyWithoutLaptopNestedInput
  }

  export type PackageAccessoryCreateWithoutAccessoryInput = {
    package: PackageCreateNestedOneWithoutAccessoriesInput
  }

  export type PackageAccessoryUncheckedCreateWithoutAccessoryInput = {
    packageId: string
  }

  export type PackageAccessoryCreateOrConnectWithoutAccessoryInput = {
    where: PackageAccessoryWhereUniqueInput
    create: XOR<PackageAccessoryCreateWithoutAccessoryInput, PackageAccessoryUncheckedCreateWithoutAccessoryInput>
  }

  export type PackageAccessoryCreateManyAccessoryInputEnvelope = {
    data: PackageAccessoryCreateManyAccessoryInput | PackageAccessoryCreateManyAccessoryInput[]
    skipDuplicates?: boolean
  }

  export type PackageAccessoryUpsertWithWhereUniqueWithoutAccessoryInput = {
    where: PackageAccessoryWhereUniqueInput
    update: XOR<PackageAccessoryUpdateWithoutAccessoryInput, PackageAccessoryUncheckedUpdateWithoutAccessoryInput>
    create: XOR<PackageAccessoryCreateWithoutAccessoryInput, PackageAccessoryUncheckedCreateWithoutAccessoryInput>
  }

  export type PackageAccessoryUpdateWithWhereUniqueWithoutAccessoryInput = {
    where: PackageAccessoryWhereUniqueInput
    data: XOR<PackageAccessoryUpdateWithoutAccessoryInput, PackageAccessoryUncheckedUpdateWithoutAccessoryInput>
  }

  export type PackageAccessoryUpdateManyWithWhereWithoutAccessoryInput = {
    where: PackageAccessoryScalarWhereInput
    data: XOR<PackageAccessoryUpdateManyMutationInput, PackageAccessoryUncheckedUpdateManyWithoutAccessoryInput>
  }

  export type PackageAccessoryScalarWhereInput = {
    AND?: PackageAccessoryScalarWhereInput | PackageAccessoryScalarWhereInput[]
    OR?: PackageAccessoryScalarWhereInput[]
    NOT?: PackageAccessoryScalarWhereInput | PackageAccessoryScalarWhereInput[]
    packageId?: StringFilter<"PackageAccessory"> | string
    accessoryId?: StringFilter<"PackageAccessory"> | string
  }

  export type LaptopCreateWithoutPackagesInput = {
    id?: string
    brand: string
    model: string
    price: Decimal | DecimalJsLike | number | string
    priceType: string
    processor: string
    ram: string
    storage: string
    batteryLife: Decimal | DecimalJsLike | number | string
    performanceScore: Decimal | DecimalJsLike | number | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    supportedProfiles?: LaptopProfileCreateNestedManyWithoutLaptopInput
    supportedOS?: LaptopOSCreateNestedManyWithoutLaptopInput
  }

  export type LaptopUncheckedCreateWithoutPackagesInput = {
    id?: string
    brand: string
    model: string
    price: Decimal | DecimalJsLike | number | string
    priceType: string
    processor: string
    ram: string
    storage: string
    batteryLife: Decimal | DecimalJsLike | number | string
    performanceScore: Decimal | DecimalJsLike | number | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    supportedProfiles?: LaptopProfileUncheckedCreateNestedManyWithoutLaptopInput
    supportedOS?: LaptopOSUncheckedCreateNestedManyWithoutLaptopInput
  }

  export type LaptopCreateOrConnectWithoutPackagesInput = {
    where: LaptopWhereUniqueInput
    create: XOR<LaptopCreateWithoutPackagesInput, LaptopUncheckedCreateWithoutPackagesInput>
  }

  export type PackageAccessoryCreateWithoutPackageInput = {
    accessory: AccessoryCreateNestedOneWithoutPackageAccessoriesInput
  }

  export type PackageAccessoryUncheckedCreateWithoutPackageInput = {
    accessoryId: string
  }

  export type PackageAccessoryCreateOrConnectWithoutPackageInput = {
    where: PackageAccessoryWhereUniqueInput
    create: XOR<PackageAccessoryCreateWithoutPackageInput, PackageAccessoryUncheckedCreateWithoutPackageInput>
  }

  export type PackageAccessoryCreateManyPackageInputEnvelope = {
    data: PackageAccessoryCreateManyPackageInput | PackageAccessoryCreateManyPackageInput[]
    skipDuplicates?: boolean
  }

  export type PackageAssignmentCreateWithoutPackageInput = {
    id?: string
    pcReference?: string | null
    assignedAt?: Date | string
    person: PersonCreateNestedOneWithoutPackageAssignmentsInput
  }

  export type PackageAssignmentUncheckedCreateWithoutPackageInput = {
    id?: string
    personId: string
    pcReference?: string | null
    assignedAt?: Date | string
  }

  export type PackageAssignmentCreateOrConnectWithoutPackageInput = {
    where: PackageAssignmentWhereUniqueInput
    create: XOR<PackageAssignmentCreateWithoutPackageInput, PackageAssignmentUncheckedCreateWithoutPackageInput>
  }

  export type PackageAssignmentCreateManyPackageInputEnvelope = {
    data: PackageAssignmentCreateManyPackageInput | PackageAssignmentCreateManyPackageInput[]
    skipDuplicates?: boolean
  }

  export type LaptopUpsertWithoutPackagesInput = {
    update: XOR<LaptopUpdateWithoutPackagesInput, LaptopUncheckedUpdateWithoutPackagesInput>
    create: XOR<LaptopCreateWithoutPackagesInput, LaptopUncheckedCreateWithoutPackagesInput>
    where?: LaptopWhereInput
  }

  export type LaptopUpdateToOneWithWhereWithoutPackagesInput = {
    where?: LaptopWhereInput
    data: XOR<LaptopUpdateWithoutPackagesInput, LaptopUncheckedUpdateWithoutPackagesInput>
  }

  export type LaptopUpdateWithoutPackagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    priceType?: StringFieldUpdateOperationsInput | string
    processor?: StringFieldUpdateOperationsInput | string
    ram?: StringFieldUpdateOperationsInput | string
    storage?: StringFieldUpdateOperationsInput | string
    batteryLife?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    performanceScore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    supportedProfiles?: LaptopProfileUpdateManyWithoutLaptopNestedInput
    supportedOS?: LaptopOSUpdateManyWithoutLaptopNestedInput
  }

  export type LaptopUncheckedUpdateWithoutPackagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    priceType?: StringFieldUpdateOperationsInput | string
    processor?: StringFieldUpdateOperationsInput | string
    ram?: StringFieldUpdateOperationsInput | string
    storage?: StringFieldUpdateOperationsInput | string
    batteryLife?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    performanceScore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    supportedProfiles?: LaptopProfileUncheckedUpdateManyWithoutLaptopNestedInput
    supportedOS?: LaptopOSUncheckedUpdateManyWithoutLaptopNestedInput
  }

  export type PackageAccessoryUpsertWithWhereUniqueWithoutPackageInput = {
    where: PackageAccessoryWhereUniqueInput
    update: XOR<PackageAccessoryUpdateWithoutPackageInput, PackageAccessoryUncheckedUpdateWithoutPackageInput>
    create: XOR<PackageAccessoryCreateWithoutPackageInput, PackageAccessoryUncheckedCreateWithoutPackageInput>
  }

  export type PackageAccessoryUpdateWithWhereUniqueWithoutPackageInput = {
    where: PackageAccessoryWhereUniqueInput
    data: XOR<PackageAccessoryUpdateWithoutPackageInput, PackageAccessoryUncheckedUpdateWithoutPackageInput>
  }

  export type PackageAccessoryUpdateManyWithWhereWithoutPackageInput = {
    where: PackageAccessoryScalarWhereInput
    data: XOR<PackageAccessoryUpdateManyMutationInput, PackageAccessoryUncheckedUpdateManyWithoutPackageInput>
  }

  export type PackageAssignmentUpsertWithWhereUniqueWithoutPackageInput = {
    where: PackageAssignmentWhereUniqueInput
    update: XOR<PackageAssignmentUpdateWithoutPackageInput, PackageAssignmentUncheckedUpdateWithoutPackageInput>
    create: XOR<PackageAssignmentCreateWithoutPackageInput, PackageAssignmentUncheckedCreateWithoutPackageInput>
  }

  export type PackageAssignmentUpdateWithWhereUniqueWithoutPackageInput = {
    where: PackageAssignmentWhereUniqueInput
    data: XOR<PackageAssignmentUpdateWithoutPackageInput, PackageAssignmentUncheckedUpdateWithoutPackageInput>
  }

  export type PackageAssignmentUpdateManyWithWhereWithoutPackageInput = {
    where: PackageAssignmentScalarWhereInput
    data: XOR<PackageAssignmentUpdateManyMutationInput, PackageAssignmentUncheckedUpdateManyWithoutPackageInput>
  }

  export type PackageCreateWithoutAccessoriesInput = {
    id?: string
    name: string
    status: string
    priceType: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedTo?: string | null
    laptop: LaptopCreateNestedOneWithoutPackagesInput
    assignments?: PackageAssignmentCreateNestedManyWithoutPackageInput
  }

  export type PackageUncheckedCreateWithoutAccessoriesInput = {
    id?: string
    name: string
    laptopId: string
    status: string
    priceType: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedTo?: string | null
    assignments?: PackageAssignmentUncheckedCreateNestedManyWithoutPackageInput
  }

  export type PackageCreateOrConnectWithoutAccessoriesInput = {
    where: PackageWhereUniqueInput
    create: XOR<PackageCreateWithoutAccessoriesInput, PackageUncheckedCreateWithoutAccessoriesInput>
  }

  export type AccessoryCreateWithoutPackageAccessoriesInput = {
    id?: string
    name: string
    type: string
    brand: string
    price: Decimal | DecimalJsLike | number | string
    priceType: string
    image?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccessoryUncheckedCreateWithoutPackageAccessoriesInput = {
    id?: string
    name: string
    type: string
    brand: string
    price: Decimal | DecimalJsLike | number | string
    priceType: string
    image?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccessoryCreateOrConnectWithoutPackageAccessoriesInput = {
    where: AccessoryWhereUniqueInput
    create: XOR<AccessoryCreateWithoutPackageAccessoriesInput, AccessoryUncheckedCreateWithoutPackageAccessoriesInput>
  }

  export type PackageUpsertWithoutAccessoriesInput = {
    update: XOR<PackageUpdateWithoutAccessoriesInput, PackageUncheckedUpdateWithoutAccessoriesInput>
    create: XOR<PackageCreateWithoutAccessoriesInput, PackageUncheckedCreateWithoutAccessoriesInput>
    where?: PackageWhereInput
  }

  export type PackageUpdateToOneWithWhereWithoutAccessoriesInput = {
    where?: PackageWhereInput
    data: XOR<PackageUpdateWithoutAccessoriesInput, PackageUncheckedUpdateWithoutAccessoriesInput>
  }

  export type PackageUpdateWithoutAccessoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priceType?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    laptop?: LaptopUpdateOneRequiredWithoutPackagesNestedInput
    assignments?: PackageAssignmentUpdateManyWithoutPackageNestedInput
  }

  export type PackageUncheckedUpdateWithoutAccessoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    laptopId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priceType?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    assignments?: PackageAssignmentUncheckedUpdateManyWithoutPackageNestedInput
  }

  export type AccessoryUpsertWithoutPackageAccessoriesInput = {
    update: XOR<AccessoryUpdateWithoutPackageAccessoriesInput, AccessoryUncheckedUpdateWithoutPackageAccessoriesInput>
    create: XOR<AccessoryCreateWithoutPackageAccessoriesInput, AccessoryUncheckedCreateWithoutPackageAccessoriesInput>
    where?: AccessoryWhereInput
  }

  export type AccessoryUpdateToOneWithWhereWithoutPackageAccessoriesInput = {
    where?: AccessoryWhereInput
    data: XOR<AccessoryUpdateWithoutPackageAccessoriesInput, AccessoryUncheckedUpdateWithoutPackageAccessoriesInput>
  }

  export type AccessoryUpdateWithoutPackageAccessoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    priceType?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccessoryUncheckedUpdateWithoutPackageAccessoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    priceType?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PackageCreateWithoutAssignmentsInput = {
    id?: string
    name: string
    status: string
    priceType: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedTo?: string | null
    laptop: LaptopCreateNestedOneWithoutPackagesInput
    accessories?: PackageAccessoryCreateNestedManyWithoutPackageInput
  }

  export type PackageUncheckedCreateWithoutAssignmentsInput = {
    id?: string
    name: string
    laptopId: string
    status: string
    priceType: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedTo?: string | null
    accessories?: PackageAccessoryUncheckedCreateNestedManyWithoutPackageInput
  }

  export type PackageCreateOrConnectWithoutAssignmentsInput = {
    where: PackageWhereUniqueInput
    create: XOR<PackageCreateWithoutAssignmentsInput, PackageUncheckedCreateWithoutAssignmentsInput>
  }

  export type PersonCreateWithoutPackageAssignmentsInput = {
    id?: string
    name: string
    email?: string | null
    department?: string | null
    position?: string | null
    pcReference?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PersonUncheckedCreateWithoutPackageAssignmentsInput = {
    id?: string
    name: string
    email?: string | null
    department?: string | null
    position?: string | null
    pcReference?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PersonCreateOrConnectWithoutPackageAssignmentsInput = {
    where: PersonWhereUniqueInput
    create: XOR<PersonCreateWithoutPackageAssignmentsInput, PersonUncheckedCreateWithoutPackageAssignmentsInput>
  }

  export type PackageUpsertWithoutAssignmentsInput = {
    update: XOR<PackageUpdateWithoutAssignmentsInput, PackageUncheckedUpdateWithoutAssignmentsInput>
    create: XOR<PackageCreateWithoutAssignmentsInput, PackageUncheckedCreateWithoutAssignmentsInput>
    where?: PackageWhereInput
  }

  export type PackageUpdateToOneWithWhereWithoutAssignmentsInput = {
    where?: PackageWhereInput
    data: XOR<PackageUpdateWithoutAssignmentsInput, PackageUncheckedUpdateWithoutAssignmentsInput>
  }

  export type PackageUpdateWithoutAssignmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priceType?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    laptop?: LaptopUpdateOneRequiredWithoutPackagesNestedInput
    accessories?: PackageAccessoryUpdateManyWithoutPackageNestedInput
  }

  export type PackageUncheckedUpdateWithoutAssignmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    laptopId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priceType?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    accessories?: PackageAccessoryUncheckedUpdateManyWithoutPackageNestedInput
  }

  export type PersonUpsertWithoutPackageAssignmentsInput = {
    update: XOR<PersonUpdateWithoutPackageAssignmentsInput, PersonUncheckedUpdateWithoutPackageAssignmentsInput>
    create: XOR<PersonCreateWithoutPackageAssignmentsInput, PersonUncheckedCreateWithoutPackageAssignmentsInput>
    where?: PersonWhereInput
  }

  export type PersonUpdateToOneWithWhereWithoutPackageAssignmentsInput = {
    where?: PersonWhereInput
    data: XOR<PersonUpdateWithoutPackageAssignmentsInput, PersonUncheckedUpdateWithoutPackageAssignmentsInput>
  }

  export type PersonUpdateWithoutPackageAssignmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    pcReference?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PersonUncheckedUpdateWithoutPackageAssignmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    pcReference?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ToolAlternativeCreateWithoutToolInput = {
    alternative: string
  }

  export type ToolAlternativeUncheckedCreateWithoutToolInput = {
    alternative: string
  }

  export type ToolAlternativeCreateOrConnectWithoutToolInput = {
    where: ToolAlternativeWhereUniqueInput
    create: XOR<ToolAlternativeCreateWithoutToolInput, ToolAlternativeUncheckedCreateWithoutToolInput>
  }

  export type ToolAlternativeCreateManyToolInputEnvelope = {
    data: ToolAlternativeCreateManyToolInput | ToolAlternativeCreateManyToolInput[]
    skipDuplicates?: boolean
  }

  export type ToolkitToolCreateWithoutToolInput = {
    toolkit: ToolkitCreateNestedOneWithoutToolsInput
  }

  export type ToolkitToolUncheckedCreateWithoutToolInput = {
    toolkitId: string
  }

  export type ToolkitToolCreateOrConnectWithoutToolInput = {
    where: ToolkitToolWhereUniqueInput
    create: XOR<ToolkitToolCreateWithoutToolInput, ToolkitToolUncheckedCreateWithoutToolInput>
  }

  export type ToolkitToolCreateManyToolInputEnvelope = {
    data: ToolkitToolCreateManyToolInput | ToolkitToolCreateManyToolInput[]
    skipDuplicates?: boolean
  }

  export type ToolAlternativeUpsertWithWhereUniqueWithoutToolInput = {
    where: ToolAlternativeWhereUniqueInput
    update: XOR<ToolAlternativeUpdateWithoutToolInput, ToolAlternativeUncheckedUpdateWithoutToolInput>
    create: XOR<ToolAlternativeCreateWithoutToolInput, ToolAlternativeUncheckedCreateWithoutToolInput>
  }

  export type ToolAlternativeUpdateWithWhereUniqueWithoutToolInput = {
    where: ToolAlternativeWhereUniqueInput
    data: XOR<ToolAlternativeUpdateWithoutToolInput, ToolAlternativeUncheckedUpdateWithoutToolInput>
  }

  export type ToolAlternativeUpdateManyWithWhereWithoutToolInput = {
    where: ToolAlternativeScalarWhereInput
    data: XOR<ToolAlternativeUpdateManyMutationInput, ToolAlternativeUncheckedUpdateManyWithoutToolInput>
  }

  export type ToolAlternativeScalarWhereInput = {
    AND?: ToolAlternativeScalarWhereInput | ToolAlternativeScalarWhereInput[]
    OR?: ToolAlternativeScalarWhereInput[]
    NOT?: ToolAlternativeScalarWhereInput | ToolAlternativeScalarWhereInput[]
    toolId?: StringFilter<"ToolAlternative"> | string
    alternative?: StringFilter<"ToolAlternative"> | string
  }

  export type ToolkitToolUpsertWithWhereUniqueWithoutToolInput = {
    where: ToolkitToolWhereUniqueInput
    update: XOR<ToolkitToolUpdateWithoutToolInput, ToolkitToolUncheckedUpdateWithoutToolInput>
    create: XOR<ToolkitToolCreateWithoutToolInput, ToolkitToolUncheckedCreateWithoutToolInput>
  }

  export type ToolkitToolUpdateWithWhereUniqueWithoutToolInput = {
    where: ToolkitToolWhereUniqueInput
    data: XOR<ToolkitToolUpdateWithoutToolInput, ToolkitToolUncheckedUpdateWithoutToolInput>
  }

  export type ToolkitToolUpdateManyWithWhereWithoutToolInput = {
    where: ToolkitToolScalarWhereInput
    data: XOR<ToolkitToolUpdateManyMutationInput, ToolkitToolUncheckedUpdateManyWithoutToolInput>
  }

  export type ToolkitToolScalarWhereInput = {
    AND?: ToolkitToolScalarWhereInput | ToolkitToolScalarWhereInput[]
    OR?: ToolkitToolScalarWhereInput[]
    NOT?: ToolkitToolScalarWhereInput | ToolkitToolScalarWhereInput[]
    toolkitId?: StringFilter<"ToolkitTool"> | string
    toolId?: StringFilter<"ToolkitTool"> | string
  }

  export type ToolCreateWithoutAlternativesInput = {
    id?: string
    name: string
    description?: string | null
    category: string
    downloadUrl?: string | null
    installationNotes?: string | null
    isRequired?: boolean
    icon?: string | null
    popularity?: number | null
    usageCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    toolkits?: ToolkitToolCreateNestedManyWithoutToolInput
  }

  export type ToolUncheckedCreateWithoutAlternativesInput = {
    id?: string
    name: string
    description?: string | null
    category: string
    downloadUrl?: string | null
    installationNotes?: string | null
    isRequired?: boolean
    icon?: string | null
    popularity?: number | null
    usageCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    toolkits?: ToolkitToolUncheckedCreateNestedManyWithoutToolInput
  }

  export type ToolCreateOrConnectWithoutAlternativesInput = {
    where: ToolWhereUniqueInput
    create: XOR<ToolCreateWithoutAlternativesInput, ToolUncheckedCreateWithoutAlternativesInput>
  }

  export type ToolUpsertWithoutAlternativesInput = {
    update: XOR<ToolUpdateWithoutAlternativesInput, ToolUncheckedUpdateWithoutAlternativesInput>
    create: XOR<ToolCreateWithoutAlternativesInput, ToolUncheckedCreateWithoutAlternativesInput>
    where?: ToolWhereInput
  }

  export type ToolUpdateToOneWithWhereWithoutAlternativesInput = {
    where?: ToolWhereInput
    data: XOR<ToolUpdateWithoutAlternativesInput, ToolUncheckedUpdateWithoutAlternativesInput>
  }

  export type ToolUpdateWithoutAlternativesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    downloadUrl?: NullableStringFieldUpdateOperationsInput | string | null
    installationNotes?: NullableStringFieldUpdateOperationsInput | string | null
    isRequired?: BoolFieldUpdateOperationsInput | boolean
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    popularity?: NullableIntFieldUpdateOperationsInput | number | null
    usageCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    toolkits?: ToolkitToolUpdateManyWithoutToolNestedInput
  }

  export type ToolUncheckedUpdateWithoutAlternativesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    downloadUrl?: NullableStringFieldUpdateOperationsInput | string | null
    installationNotes?: NullableStringFieldUpdateOperationsInput | string | null
    isRequired?: BoolFieldUpdateOperationsInput | boolean
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    popularity?: NullableIntFieldUpdateOperationsInput | number | null
    usageCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    toolkits?: ToolkitToolUncheckedUpdateManyWithoutToolNestedInput
  }

  export type ToolkitToolCreateWithoutToolkitInput = {
    tool: ToolCreateNestedOneWithoutToolkitsInput
  }

  export type ToolkitToolUncheckedCreateWithoutToolkitInput = {
    toolId: string
  }

  export type ToolkitToolCreateOrConnectWithoutToolkitInput = {
    where: ToolkitToolWhereUniqueInput
    create: XOR<ToolkitToolCreateWithoutToolkitInput, ToolkitToolUncheckedCreateWithoutToolkitInput>
  }

  export type ToolkitToolCreateManyToolkitInputEnvelope = {
    data: ToolkitToolCreateManyToolkitInput | ToolkitToolCreateManyToolkitInput[]
    skipDuplicates?: boolean
  }

  export type SurveyResponseCreateWithoutMatchedToolkitInput = {
    id?: string
    submittedAt?: Date | string
    name: string
    email: string
    position: string
    primaryRole?: string | null
    developmentPercentage?: number | null
    primaryOS?: string | null
    experienceWithOtherOS?: SurveyResponseCreateexperienceWithOtherOSInput | string[]
    preferredOS?: string | null
    osPreferenceReason?: string | null
    programmingLanguages?: SurveyResponseCreateprogrammingLanguagesInput | string[]
    otherLanguages?: string | null
    developmentType?: SurveyResponseCreatedevelopmentTypeInput | string[]
    otherDevelopmentType?: string | null
    resourceIntensiveEnvironments?: boolean | null
    multipleEnvironments?: boolean | null
    terminalImportance?: number | null
    clientPresentationFrequency?: string | null
    largeDataModels?: boolean | null
    specializedSoftware?: boolean | null
    specializedSoftwareList?: string | null
    batteryLifeImportance?: number | null
    remoteWorkFrequency?: string | null
    selectedTools?: SurveyResponseCreateselectedToolsInput | string[]
    otherTools?: string | null
    simultaneousApplications?: string | null
    multipleWorkspaces?: boolean | null
    typicalBrowserTabs?: string | null
    externalDisplays?: string | null
    resourceIntensiveApps?: boolean | null
    resourceIntensiveAppsList?: string | null
    matchScore?: number | null
  }

  export type SurveyResponseUncheckedCreateWithoutMatchedToolkitInput = {
    id?: string
    submittedAt?: Date | string
    name: string
    email: string
    position: string
    primaryRole?: string | null
    developmentPercentage?: number | null
    primaryOS?: string | null
    experienceWithOtherOS?: SurveyResponseCreateexperienceWithOtherOSInput | string[]
    preferredOS?: string | null
    osPreferenceReason?: string | null
    programmingLanguages?: SurveyResponseCreateprogrammingLanguagesInput | string[]
    otherLanguages?: string | null
    developmentType?: SurveyResponseCreatedevelopmentTypeInput | string[]
    otherDevelopmentType?: string | null
    resourceIntensiveEnvironments?: boolean | null
    multipleEnvironments?: boolean | null
    terminalImportance?: number | null
    clientPresentationFrequency?: string | null
    largeDataModels?: boolean | null
    specializedSoftware?: boolean | null
    specializedSoftwareList?: string | null
    batteryLifeImportance?: number | null
    remoteWorkFrequency?: string | null
    selectedTools?: SurveyResponseCreateselectedToolsInput | string[]
    otherTools?: string | null
    simultaneousApplications?: string | null
    multipleWorkspaces?: boolean | null
    typicalBrowserTabs?: string | null
    externalDisplays?: string | null
    resourceIntensiveApps?: boolean | null
    resourceIntensiveAppsList?: string | null
    matchScore?: number | null
  }

  export type SurveyResponseCreateOrConnectWithoutMatchedToolkitInput = {
    where: SurveyResponseWhereUniqueInput
    create: XOR<SurveyResponseCreateWithoutMatchedToolkitInput, SurveyResponseUncheckedCreateWithoutMatchedToolkitInput>
  }

  export type SurveyResponseCreateManyMatchedToolkitInputEnvelope = {
    data: SurveyResponseCreateManyMatchedToolkitInput | SurveyResponseCreateManyMatchedToolkitInput[]
    skipDuplicates?: boolean
  }

  export type ToolkitToolUpsertWithWhereUniqueWithoutToolkitInput = {
    where: ToolkitToolWhereUniqueInput
    update: XOR<ToolkitToolUpdateWithoutToolkitInput, ToolkitToolUncheckedUpdateWithoutToolkitInput>
    create: XOR<ToolkitToolCreateWithoutToolkitInput, ToolkitToolUncheckedCreateWithoutToolkitInput>
  }

  export type ToolkitToolUpdateWithWhereUniqueWithoutToolkitInput = {
    where: ToolkitToolWhereUniqueInput
    data: XOR<ToolkitToolUpdateWithoutToolkitInput, ToolkitToolUncheckedUpdateWithoutToolkitInput>
  }

  export type ToolkitToolUpdateManyWithWhereWithoutToolkitInput = {
    where: ToolkitToolScalarWhereInput
    data: XOR<ToolkitToolUpdateManyMutationInput, ToolkitToolUncheckedUpdateManyWithoutToolkitInput>
  }

  export type SurveyResponseUpsertWithWhereUniqueWithoutMatchedToolkitInput = {
    where: SurveyResponseWhereUniqueInput
    update: XOR<SurveyResponseUpdateWithoutMatchedToolkitInput, SurveyResponseUncheckedUpdateWithoutMatchedToolkitInput>
    create: XOR<SurveyResponseCreateWithoutMatchedToolkitInput, SurveyResponseUncheckedCreateWithoutMatchedToolkitInput>
  }

  export type SurveyResponseUpdateWithWhereUniqueWithoutMatchedToolkitInput = {
    where: SurveyResponseWhereUniqueInput
    data: XOR<SurveyResponseUpdateWithoutMatchedToolkitInput, SurveyResponseUncheckedUpdateWithoutMatchedToolkitInput>
  }

  export type SurveyResponseUpdateManyWithWhereWithoutMatchedToolkitInput = {
    where: SurveyResponseScalarWhereInput
    data: XOR<SurveyResponseUpdateManyMutationInput, SurveyResponseUncheckedUpdateManyWithoutMatchedToolkitInput>
  }

  export type SurveyResponseScalarWhereInput = {
    AND?: SurveyResponseScalarWhereInput | SurveyResponseScalarWhereInput[]
    OR?: SurveyResponseScalarWhereInput[]
    NOT?: SurveyResponseScalarWhereInput | SurveyResponseScalarWhereInput[]
    id?: StringFilter<"SurveyResponse"> | string
    submittedAt?: DateTimeFilter<"SurveyResponse"> | Date | string
    name?: StringFilter<"SurveyResponse"> | string
    email?: StringFilter<"SurveyResponse"> | string
    position?: StringFilter<"SurveyResponse"> | string
    primaryRole?: StringNullableFilter<"SurveyResponse"> | string | null
    developmentPercentage?: IntNullableFilter<"SurveyResponse"> | number | null
    primaryOS?: StringNullableFilter<"SurveyResponse"> | string | null
    experienceWithOtherOS?: StringNullableListFilter<"SurveyResponse">
    preferredOS?: StringNullableFilter<"SurveyResponse"> | string | null
    osPreferenceReason?: StringNullableFilter<"SurveyResponse"> | string | null
    programmingLanguages?: StringNullableListFilter<"SurveyResponse">
    otherLanguages?: StringNullableFilter<"SurveyResponse"> | string | null
    developmentType?: StringNullableListFilter<"SurveyResponse">
    otherDevelopmentType?: StringNullableFilter<"SurveyResponse"> | string | null
    resourceIntensiveEnvironments?: BoolNullableFilter<"SurveyResponse"> | boolean | null
    multipleEnvironments?: BoolNullableFilter<"SurveyResponse"> | boolean | null
    terminalImportance?: IntNullableFilter<"SurveyResponse"> | number | null
    clientPresentationFrequency?: StringNullableFilter<"SurveyResponse"> | string | null
    largeDataModels?: BoolNullableFilter<"SurveyResponse"> | boolean | null
    specializedSoftware?: BoolNullableFilter<"SurveyResponse"> | boolean | null
    specializedSoftwareList?: StringNullableFilter<"SurveyResponse"> | string | null
    batteryLifeImportance?: IntNullableFilter<"SurveyResponse"> | number | null
    remoteWorkFrequency?: StringNullableFilter<"SurveyResponse"> | string | null
    selectedTools?: StringNullableListFilter<"SurveyResponse">
    otherTools?: StringNullableFilter<"SurveyResponse"> | string | null
    simultaneousApplications?: StringNullableFilter<"SurveyResponse"> | string | null
    multipleWorkspaces?: BoolNullableFilter<"SurveyResponse"> | boolean | null
    typicalBrowserTabs?: StringNullableFilter<"SurveyResponse"> | string | null
    externalDisplays?: StringNullableFilter<"SurveyResponse"> | string | null
    resourceIntensiveApps?: BoolNullableFilter<"SurveyResponse"> | boolean | null
    resourceIntensiveAppsList?: StringNullableFilter<"SurveyResponse"> | string | null
    matchedToolkitId?: StringNullableFilter<"SurveyResponse"> | string | null
    matchScore?: IntNullableFilter<"SurveyResponse"> | number | null
  }

  export type ToolkitCreateWithoutToolsInput = {
    id?: string
    profileName: string
    description?: string | null
    operatingSystem: string
    icon?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    surveyMatches?: SurveyResponseCreateNestedManyWithoutMatchedToolkitInput
  }

  export type ToolkitUncheckedCreateWithoutToolsInput = {
    id?: string
    profileName: string
    description?: string | null
    operatingSystem: string
    icon?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    surveyMatches?: SurveyResponseUncheckedCreateNestedManyWithoutMatchedToolkitInput
  }

  export type ToolkitCreateOrConnectWithoutToolsInput = {
    where: ToolkitWhereUniqueInput
    create: XOR<ToolkitCreateWithoutToolsInput, ToolkitUncheckedCreateWithoutToolsInput>
  }

  export type ToolCreateWithoutToolkitsInput = {
    id?: string
    name: string
    description?: string | null
    category: string
    downloadUrl?: string | null
    installationNotes?: string | null
    isRequired?: boolean
    icon?: string | null
    popularity?: number | null
    usageCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    alternatives?: ToolAlternativeCreateNestedManyWithoutToolInput
  }

  export type ToolUncheckedCreateWithoutToolkitsInput = {
    id?: string
    name: string
    description?: string | null
    category: string
    downloadUrl?: string | null
    installationNotes?: string | null
    isRequired?: boolean
    icon?: string | null
    popularity?: number | null
    usageCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    alternatives?: ToolAlternativeUncheckedCreateNestedManyWithoutToolInput
  }

  export type ToolCreateOrConnectWithoutToolkitsInput = {
    where: ToolWhereUniqueInput
    create: XOR<ToolCreateWithoutToolkitsInput, ToolUncheckedCreateWithoutToolkitsInput>
  }

  export type ToolkitUpsertWithoutToolsInput = {
    update: XOR<ToolkitUpdateWithoutToolsInput, ToolkitUncheckedUpdateWithoutToolsInput>
    create: XOR<ToolkitCreateWithoutToolsInput, ToolkitUncheckedCreateWithoutToolsInput>
    where?: ToolkitWhereInput
  }

  export type ToolkitUpdateToOneWithWhereWithoutToolsInput = {
    where?: ToolkitWhereInput
    data: XOR<ToolkitUpdateWithoutToolsInput, ToolkitUncheckedUpdateWithoutToolsInput>
  }

  export type ToolkitUpdateWithoutToolsInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    operatingSystem?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    surveyMatches?: SurveyResponseUpdateManyWithoutMatchedToolkitNestedInput
  }

  export type ToolkitUncheckedUpdateWithoutToolsInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    operatingSystem?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    surveyMatches?: SurveyResponseUncheckedUpdateManyWithoutMatchedToolkitNestedInput
  }

  export type ToolUpsertWithoutToolkitsInput = {
    update: XOR<ToolUpdateWithoutToolkitsInput, ToolUncheckedUpdateWithoutToolkitsInput>
    create: XOR<ToolCreateWithoutToolkitsInput, ToolUncheckedCreateWithoutToolkitsInput>
    where?: ToolWhereInput
  }

  export type ToolUpdateToOneWithWhereWithoutToolkitsInput = {
    where?: ToolWhereInput
    data: XOR<ToolUpdateWithoutToolkitsInput, ToolUncheckedUpdateWithoutToolkitsInput>
  }

  export type ToolUpdateWithoutToolkitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    downloadUrl?: NullableStringFieldUpdateOperationsInput | string | null
    installationNotes?: NullableStringFieldUpdateOperationsInput | string | null
    isRequired?: BoolFieldUpdateOperationsInput | boolean
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    popularity?: NullableIntFieldUpdateOperationsInput | number | null
    usageCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    alternatives?: ToolAlternativeUpdateManyWithoutToolNestedInput
  }

  export type ToolUncheckedUpdateWithoutToolkitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    downloadUrl?: NullableStringFieldUpdateOperationsInput | string | null
    installationNotes?: NullableStringFieldUpdateOperationsInput | string | null
    isRequired?: BoolFieldUpdateOperationsInput | boolean
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    popularity?: NullableIntFieldUpdateOperationsInput | number | null
    usageCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    alternatives?: ToolAlternativeUncheckedUpdateManyWithoutToolNestedInput
  }

  export type ToolkitCreateWithoutSurveyMatchesInput = {
    id?: string
    profileName: string
    description?: string | null
    operatingSystem: string
    icon?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tools?: ToolkitToolCreateNestedManyWithoutToolkitInput
  }

  export type ToolkitUncheckedCreateWithoutSurveyMatchesInput = {
    id?: string
    profileName: string
    description?: string | null
    operatingSystem: string
    icon?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tools?: ToolkitToolUncheckedCreateNestedManyWithoutToolkitInput
  }

  export type ToolkitCreateOrConnectWithoutSurveyMatchesInput = {
    where: ToolkitWhereUniqueInput
    create: XOR<ToolkitCreateWithoutSurveyMatchesInput, ToolkitUncheckedCreateWithoutSurveyMatchesInput>
  }

  export type ToolkitUpsertWithoutSurveyMatchesInput = {
    update: XOR<ToolkitUpdateWithoutSurveyMatchesInput, ToolkitUncheckedUpdateWithoutSurveyMatchesInput>
    create: XOR<ToolkitCreateWithoutSurveyMatchesInput, ToolkitUncheckedCreateWithoutSurveyMatchesInput>
    where?: ToolkitWhereInput
  }

  export type ToolkitUpdateToOneWithWhereWithoutSurveyMatchesInput = {
    where?: ToolkitWhereInput
    data: XOR<ToolkitUpdateWithoutSurveyMatchesInput, ToolkitUncheckedUpdateWithoutSurveyMatchesInput>
  }

  export type ToolkitUpdateWithoutSurveyMatchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    operatingSystem?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tools?: ToolkitToolUpdateManyWithoutToolkitNestedInput
  }

  export type ToolkitUncheckedUpdateWithoutSurveyMatchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    operatingSystem?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tools?: ToolkitToolUncheckedUpdateManyWithoutToolkitNestedInput
  }

  export type PackageAssignmentCreateManyPersonInput = {
    id?: string
    packageId: string
    pcReference?: string | null
    assignedAt?: Date | string
  }

  export type PackageAssignmentUpdateWithoutPersonInput = {
    id?: StringFieldUpdateOperationsInput | string
    pcReference?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    package?: PackageUpdateOneRequiredWithoutAssignmentsNestedInput
  }

  export type PackageAssignmentUncheckedUpdateWithoutPersonInput = {
    id?: StringFieldUpdateOperationsInput | string
    packageId?: StringFieldUpdateOperationsInput | string
    pcReference?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PackageAssignmentUncheckedUpdateManyWithoutPersonInput = {
    id?: StringFieldUpdateOperationsInput | string
    packageId?: StringFieldUpdateOperationsInput | string
    pcReference?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LaptopProfileCreateManyLaptopInput = {
    profile: string
  }

  export type LaptopOSCreateManyLaptopInput = {
    os: string
  }

  export type PackageCreateManyLaptopInput = {
    id?: string
    name: string
    status: string
    priceType: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedTo?: string | null
  }

  export type LaptopProfileUpdateWithoutLaptopInput = {
    profile?: StringFieldUpdateOperationsInput | string
  }

  export type LaptopProfileUncheckedUpdateWithoutLaptopInput = {
    profile?: StringFieldUpdateOperationsInput | string
  }

  export type LaptopProfileUncheckedUpdateManyWithoutLaptopInput = {
    profile?: StringFieldUpdateOperationsInput | string
  }

  export type LaptopOSUpdateWithoutLaptopInput = {
    os?: StringFieldUpdateOperationsInput | string
  }

  export type LaptopOSUncheckedUpdateWithoutLaptopInput = {
    os?: StringFieldUpdateOperationsInput | string
  }

  export type LaptopOSUncheckedUpdateManyWithoutLaptopInput = {
    os?: StringFieldUpdateOperationsInput | string
  }

  export type PackageUpdateWithoutLaptopInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priceType?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    accessories?: PackageAccessoryUpdateManyWithoutPackageNestedInput
    assignments?: PackageAssignmentUpdateManyWithoutPackageNestedInput
  }

  export type PackageUncheckedUpdateWithoutLaptopInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priceType?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    accessories?: PackageAccessoryUncheckedUpdateManyWithoutPackageNestedInput
    assignments?: PackageAssignmentUncheckedUpdateManyWithoutPackageNestedInput
  }

  export type PackageUncheckedUpdateManyWithoutLaptopInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priceType?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PackageAccessoryCreateManyAccessoryInput = {
    packageId: string
  }

  export type PackageAccessoryUpdateWithoutAccessoryInput = {
    package?: PackageUpdateOneRequiredWithoutAccessoriesNestedInput
  }

  export type PackageAccessoryUncheckedUpdateWithoutAccessoryInput = {
    packageId?: StringFieldUpdateOperationsInput | string
  }

  export type PackageAccessoryUncheckedUpdateManyWithoutAccessoryInput = {
    packageId?: StringFieldUpdateOperationsInput | string
  }

  export type PackageAccessoryCreateManyPackageInput = {
    accessoryId: string
  }

  export type PackageAssignmentCreateManyPackageInput = {
    id?: string
    personId: string
    pcReference?: string | null
    assignedAt?: Date | string
  }

  export type PackageAccessoryUpdateWithoutPackageInput = {
    accessory?: AccessoryUpdateOneRequiredWithoutPackageAccessoriesNestedInput
  }

  export type PackageAccessoryUncheckedUpdateWithoutPackageInput = {
    accessoryId?: StringFieldUpdateOperationsInput | string
  }

  export type PackageAccessoryUncheckedUpdateManyWithoutPackageInput = {
    accessoryId?: StringFieldUpdateOperationsInput | string
  }

  export type PackageAssignmentUpdateWithoutPackageInput = {
    id?: StringFieldUpdateOperationsInput | string
    pcReference?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    person?: PersonUpdateOneRequiredWithoutPackageAssignmentsNestedInput
  }

  export type PackageAssignmentUncheckedUpdateWithoutPackageInput = {
    id?: StringFieldUpdateOperationsInput | string
    personId?: StringFieldUpdateOperationsInput | string
    pcReference?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PackageAssignmentUncheckedUpdateManyWithoutPackageInput = {
    id?: StringFieldUpdateOperationsInput | string
    personId?: StringFieldUpdateOperationsInput | string
    pcReference?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ToolAlternativeCreateManyToolInput = {
    alternative: string
  }

  export type ToolkitToolCreateManyToolInput = {
    toolkitId: string
  }

  export type ToolAlternativeUpdateWithoutToolInput = {
    alternative?: StringFieldUpdateOperationsInput | string
  }

  export type ToolAlternativeUncheckedUpdateWithoutToolInput = {
    alternative?: StringFieldUpdateOperationsInput | string
  }

  export type ToolAlternativeUncheckedUpdateManyWithoutToolInput = {
    alternative?: StringFieldUpdateOperationsInput | string
  }

  export type ToolkitToolUpdateWithoutToolInput = {
    toolkit?: ToolkitUpdateOneRequiredWithoutToolsNestedInput
  }

  export type ToolkitToolUncheckedUpdateWithoutToolInput = {
    toolkitId?: StringFieldUpdateOperationsInput | string
  }

  export type ToolkitToolUncheckedUpdateManyWithoutToolInput = {
    toolkitId?: StringFieldUpdateOperationsInput | string
  }

  export type ToolkitToolCreateManyToolkitInput = {
    toolId: string
  }

  export type SurveyResponseCreateManyMatchedToolkitInput = {
    id?: string
    submittedAt?: Date | string
    name: string
    email: string
    position: string
    primaryRole?: string | null
    developmentPercentage?: number | null
    primaryOS?: string | null
    experienceWithOtherOS?: SurveyResponseCreateexperienceWithOtherOSInput | string[]
    preferredOS?: string | null
    osPreferenceReason?: string | null
    programmingLanguages?: SurveyResponseCreateprogrammingLanguagesInput | string[]
    otherLanguages?: string | null
    developmentType?: SurveyResponseCreatedevelopmentTypeInput | string[]
    otherDevelopmentType?: string | null
    resourceIntensiveEnvironments?: boolean | null
    multipleEnvironments?: boolean | null
    terminalImportance?: number | null
    clientPresentationFrequency?: string | null
    largeDataModels?: boolean | null
    specializedSoftware?: boolean | null
    specializedSoftwareList?: string | null
    batteryLifeImportance?: number | null
    remoteWorkFrequency?: string | null
    selectedTools?: SurveyResponseCreateselectedToolsInput | string[]
    otherTools?: string | null
    simultaneousApplications?: string | null
    multipleWorkspaces?: boolean | null
    typicalBrowserTabs?: string | null
    externalDisplays?: string | null
    resourceIntensiveApps?: boolean | null
    resourceIntensiveAppsList?: string | null
    matchScore?: number | null
  }

  export type ToolkitToolUpdateWithoutToolkitInput = {
    tool?: ToolUpdateOneRequiredWithoutToolkitsNestedInput
  }

  export type ToolkitToolUncheckedUpdateWithoutToolkitInput = {
    toolId?: StringFieldUpdateOperationsInput | string
  }

  export type ToolkitToolUncheckedUpdateManyWithoutToolkitInput = {
    toolId?: StringFieldUpdateOperationsInput | string
  }

  export type SurveyResponseUpdateWithoutMatchedToolkitInput = {
    id?: StringFieldUpdateOperationsInput | string
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    primaryRole?: NullableStringFieldUpdateOperationsInput | string | null
    developmentPercentage?: NullableIntFieldUpdateOperationsInput | number | null
    primaryOS?: NullableStringFieldUpdateOperationsInput | string | null
    experienceWithOtherOS?: SurveyResponseUpdateexperienceWithOtherOSInput | string[]
    preferredOS?: NullableStringFieldUpdateOperationsInput | string | null
    osPreferenceReason?: NullableStringFieldUpdateOperationsInput | string | null
    programmingLanguages?: SurveyResponseUpdateprogrammingLanguagesInput | string[]
    otherLanguages?: NullableStringFieldUpdateOperationsInput | string | null
    developmentType?: SurveyResponseUpdatedevelopmentTypeInput | string[]
    otherDevelopmentType?: NullableStringFieldUpdateOperationsInput | string | null
    resourceIntensiveEnvironments?: NullableBoolFieldUpdateOperationsInput | boolean | null
    multipleEnvironments?: NullableBoolFieldUpdateOperationsInput | boolean | null
    terminalImportance?: NullableIntFieldUpdateOperationsInput | number | null
    clientPresentationFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    largeDataModels?: NullableBoolFieldUpdateOperationsInput | boolean | null
    specializedSoftware?: NullableBoolFieldUpdateOperationsInput | boolean | null
    specializedSoftwareList?: NullableStringFieldUpdateOperationsInput | string | null
    batteryLifeImportance?: NullableIntFieldUpdateOperationsInput | number | null
    remoteWorkFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    selectedTools?: SurveyResponseUpdateselectedToolsInput | string[]
    otherTools?: NullableStringFieldUpdateOperationsInput | string | null
    simultaneousApplications?: NullableStringFieldUpdateOperationsInput | string | null
    multipleWorkspaces?: NullableBoolFieldUpdateOperationsInput | boolean | null
    typicalBrowserTabs?: NullableStringFieldUpdateOperationsInput | string | null
    externalDisplays?: NullableStringFieldUpdateOperationsInput | string | null
    resourceIntensiveApps?: NullableBoolFieldUpdateOperationsInput | boolean | null
    resourceIntensiveAppsList?: NullableStringFieldUpdateOperationsInput | string | null
    matchScore?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SurveyResponseUncheckedUpdateWithoutMatchedToolkitInput = {
    id?: StringFieldUpdateOperationsInput | string
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    primaryRole?: NullableStringFieldUpdateOperationsInput | string | null
    developmentPercentage?: NullableIntFieldUpdateOperationsInput | number | null
    primaryOS?: NullableStringFieldUpdateOperationsInput | string | null
    experienceWithOtherOS?: SurveyResponseUpdateexperienceWithOtherOSInput | string[]
    preferredOS?: NullableStringFieldUpdateOperationsInput | string | null
    osPreferenceReason?: NullableStringFieldUpdateOperationsInput | string | null
    programmingLanguages?: SurveyResponseUpdateprogrammingLanguagesInput | string[]
    otherLanguages?: NullableStringFieldUpdateOperationsInput | string | null
    developmentType?: SurveyResponseUpdatedevelopmentTypeInput | string[]
    otherDevelopmentType?: NullableStringFieldUpdateOperationsInput | string | null
    resourceIntensiveEnvironments?: NullableBoolFieldUpdateOperationsInput | boolean | null
    multipleEnvironments?: NullableBoolFieldUpdateOperationsInput | boolean | null
    terminalImportance?: NullableIntFieldUpdateOperationsInput | number | null
    clientPresentationFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    largeDataModels?: NullableBoolFieldUpdateOperationsInput | boolean | null
    specializedSoftware?: NullableBoolFieldUpdateOperationsInput | boolean | null
    specializedSoftwareList?: NullableStringFieldUpdateOperationsInput | string | null
    batteryLifeImportance?: NullableIntFieldUpdateOperationsInput | number | null
    remoteWorkFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    selectedTools?: SurveyResponseUpdateselectedToolsInput | string[]
    otherTools?: NullableStringFieldUpdateOperationsInput | string | null
    simultaneousApplications?: NullableStringFieldUpdateOperationsInput | string | null
    multipleWorkspaces?: NullableBoolFieldUpdateOperationsInput | boolean | null
    typicalBrowserTabs?: NullableStringFieldUpdateOperationsInput | string | null
    externalDisplays?: NullableStringFieldUpdateOperationsInput | string | null
    resourceIntensiveApps?: NullableBoolFieldUpdateOperationsInput | boolean | null
    resourceIntensiveAppsList?: NullableStringFieldUpdateOperationsInput | string | null
    matchScore?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SurveyResponseUncheckedUpdateManyWithoutMatchedToolkitInput = {
    id?: StringFieldUpdateOperationsInput | string
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    primaryRole?: NullableStringFieldUpdateOperationsInput | string | null
    developmentPercentage?: NullableIntFieldUpdateOperationsInput | number | null
    primaryOS?: NullableStringFieldUpdateOperationsInput | string | null
    experienceWithOtherOS?: SurveyResponseUpdateexperienceWithOtherOSInput | string[]
    preferredOS?: NullableStringFieldUpdateOperationsInput | string | null
    osPreferenceReason?: NullableStringFieldUpdateOperationsInput | string | null
    programmingLanguages?: SurveyResponseUpdateprogrammingLanguagesInput | string[]
    otherLanguages?: NullableStringFieldUpdateOperationsInput | string | null
    developmentType?: SurveyResponseUpdatedevelopmentTypeInput | string[]
    otherDevelopmentType?: NullableStringFieldUpdateOperationsInput | string | null
    resourceIntensiveEnvironments?: NullableBoolFieldUpdateOperationsInput | boolean | null
    multipleEnvironments?: NullableBoolFieldUpdateOperationsInput | boolean | null
    terminalImportance?: NullableIntFieldUpdateOperationsInput | number | null
    clientPresentationFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    largeDataModels?: NullableBoolFieldUpdateOperationsInput | boolean | null
    specializedSoftware?: NullableBoolFieldUpdateOperationsInput | boolean | null
    specializedSoftwareList?: NullableStringFieldUpdateOperationsInput | string | null
    batteryLifeImportance?: NullableIntFieldUpdateOperationsInput | number | null
    remoteWorkFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    selectedTools?: SurveyResponseUpdateselectedToolsInput | string[]
    otherTools?: NullableStringFieldUpdateOperationsInput | string | null
    simultaneousApplications?: NullableStringFieldUpdateOperationsInput | string | null
    multipleWorkspaces?: NullableBoolFieldUpdateOperationsInput | boolean | null
    typicalBrowserTabs?: NullableStringFieldUpdateOperationsInput | string | null
    externalDisplays?: NullableStringFieldUpdateOperationsInput | string | null
    resourceIntensiveApps?: NullableBoolFieldUpdateOperationsInput | boolean | null
    resourceIntensiveAppsList?: NullableStringFieldUpdateOperationsInput | string | null
    matchScore?: NullableIntFieldUpdateOperationsInput | number | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}