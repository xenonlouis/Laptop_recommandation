
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
 * // Fetch zero or more SurveyResponses
 * const surveyResponses = await prisma.surveyResponse.findMany()
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
   * // Fetch zero or more SurveyResponses
   * const surveyResponses = await prisma.surveyResponse.findMany()
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
      modelProps: "surveyResponse"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
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
   * Models
   */

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

  export type $SurveyResponsePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SurveyResponse"
    objects: {}
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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


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
  }

  export type SurveyResponseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: SurveyResponseWhereInput | SurveyResponseWhereInput[]
    OR?: SurveyResponseWhereInput[]
    NOT?: SurveyResponseWhereInput | SurveyResponseWhereInput[]
    submittedAt?: DateTimeFilter<"SurveyResponse"> | Date | string
    name?: StringFilter<"SurveyResponse"> | string
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
  }, "id" | "email">

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
    matchedToolkitId?: string | null
    matchScore?: number | null
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
    matchedToolkitId?: NullableStringFieldUpdateOperationsInput | string | null
    matchScore?: NullableIntFieldUpdateOperationsInput | number | null
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
    matchedToolkitId?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
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

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
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

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
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

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
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

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
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