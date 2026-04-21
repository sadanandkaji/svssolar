
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
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model CategoryAttribute
 * 
 */
export type CategoryAttribute = $Result.DefaultSelection<Prisma.$CategoryAttributePayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model ProductAttributeValue
 * 
 */
export type ProductAttributeValue = $Result.DefaultSelection<Prisma.$ProductAttributeValuePayload>
/**
 * Model Warehouse
 * 
 */
export type Warehouse = $Result.DefaultSelection<Prisma.$WarehousePayload>
/**
 * Model InventoryItem
 * 
 */
export type InventoryItem = $Result.DefaultSelection<Prisma.$InventoryItemPayload>
/**
 * Model UniqueBarcode
 * 
 */
export type UniqueBarcode = $Result.DefaultSelection<Prisma.$UniqueBarcodePayload>
/**
 * Model Company
 * 
 */
export type Company = $Result.DefaultSelection<Prisma.$CompanyPayload>
/**
 * Model Quotation
 * 
 */
export type Quotation = $Result.DefaultSelection<Prisma.$QuotationPayload>
/**
 * Model QuotationItem
 * 
 */
export type QuotationItem = $Result.DefaultSelection<Prisma.$QuotationItemPayload>
/**
 * Model QuotationFixedCost
 * 
 */
export type QuotationFixedCost = $Result.DefaultSelection<Prisma.$QuotationFixedCostPayload>
/**
 * Model Employee
 * 
 */
export type Employee = $Result.DefaultSelection<Prisma.$EmployeePayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const AttributeType: {
  TEXT: 'TEXT',
  NUMBER: 'NUMBER',
  SELECT: 'SELECT'
};

export type AttributeType = (typeof AttributeType)[keyof typeof AttributeType]


export const BarcodeHandling: {
  SINGLE: 'SINGLE',
  UNIQUE: 'UNIQUE'
};

export type BarcodeHandling = (typeof BarcodeHandling)[keyof typeof BarcodeHandling]


export const BarcodeType: {
  CODE128: 'CODE128',
  EAN13: 'EAN13',
  UPCA: 'UPCA',
  QRCODE: 'QRCODE'
};

export type BarcodeType = (typeof BarcodeType)[keyof typeof BarcodeType]


export const WarehouseStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
};

export type WarehouseStatus = (typeof WarehouseStatus)[keyof typeof WarehouseStatus]


export const QuotationStatus: {
  DRAFT: 'DRAFT',
  SAVED: 'SAVED',
  APPROVED: 'APPROVED'
};

export type QuotationStatus = (typeof QuotationStatus)[keyof typeof QuotationStatus]


export const EmployeeRole: {
  OWNER: 'OWNER',
  ADMIN: 'ADMIN',
  STAFF: 'STAFF'
};

export type EmployeeRole = (typeof EmployeeRole)[keyof typeof EmployeeRole]

}

export type AttributeType = $Enums.AttributeType

export const AttributeType: typeof $Enums.AttributeType

export type BarcodeHandling = $Enums.BarcodeHandling

export const BarcodeHandling: typeof $Enums.BarcodeHandling

export type BarcodeType = $Enums.BarcodeType

export const BarcodeType: typeof $Enums.BarcodeType

export type WarehouseStatus = $Enums.WarehouseStatus

export const WarehouseStatus: typeof $Enums.WarehouseStatus

export type QuotationStatus = $Enums.QuotationStatus

export const QuotationStatus: typeof $Enums.QuotationStatus

export type EmployeeRole = $Enums.EmployeeRole

export const EmployeeRole: typeof $Enums.EmployeeRole

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Categories
 * const categories = await prisma.category.findMany()
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
   * // Fetch zero or more Categories
   * const categories = await prisma.category.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs>;

  /**
   * `prisma.categoryAttribute`: Exposes CRUD operations for the **CategoryAttribute** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CategoryAttributes
    * const categoryAttributes = await prisma.categoryAttribute.findMany()
    * ```
    */
  get categoryAttribute(): Prisma.CategoryAttributeDelegate<ExtArgs>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs>;

  /**
   * `prisma.productAttributeValue`: Exposes CRUD operations for the **ProductAttributeValue** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductAttributeValues
    * const productAttributeValues = await prisma.productAttributeValue.findMany()
    * ```
    */
  get productAttributeValue(): Prisma.ProductAttributeValueDelegate<ExtArgs>;

  /**
   * `prisma.warehouse`: Exposes CRUD operations for the **Warehouse** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Warehouses
    * const warehouses = await prisma.warehouse.findMany()
    * ```
    */
  get warehouse(): Prisma.WarehouseDelegate<ExtArgs>;

  /**
   * `prisma.inventoryItem`: Exposes CRUD operations for the **InventoryItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InventoryItems
    * const inventoryItems = await prisma.inventoryItem.findMany()
    * ```
    */
  get inventoryItem(): Prisma.InventoryItemDelegate<ExtArgs>;

  /**
   * `prisma.uniqueBarcode`: Exposes CRUD operations for the **UniqueBarcode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UniqueBarcodes
    * const uniqueBarcodes = await prisma.uniqueBarcode.findMany()
    * ```
    */
  get uniqueBarcode(): Prisma.UniqueBarcodeDelegate<ExtArgs>;

  /**
   * `prisma.company`: Exposes CRUD operations for the **Company** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Companies
    * const companies = await prisma.company.findMany()
    * ```
    */
  get company(): Prisma.CompanyDelegate<ExtArgs>;

  /**
   * `prisma.quotation`: Exposes CRUD operations for the **Quotation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Quotations
    * const quotations = await prisma.quotation.findMany()
    * ```
    */
  get quotation(): Prisma.QuotationDelegate<ExtArgs>;

  /**
   * `prisma.quotationItem`: Exposes CRUD operations for the **QuotationItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QuotationItems
    * const quotationItems = await prisma.quotationItem.findMany()
    * ```
    */
  get quotationItem(): Prisma.QuotationItemDelegate<ExtArgs>;

  /**
   * `prisma.quotationFixedCost`: Exposes CRUD operations for the **QuotationFixedCost** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QuotationFixedCosts
    * const quotationFixedCosts = await prisma.quotationFixedCost.findMany()
    * ```
    */
  get quotationFixedCost(): Prisma.QuotationFixedCostDelegate<ExtArgs>;

  /**
   * `prisma.employee`: Exposes CRUD operations for the **Employee** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Employees
    * const employees = await prisma.employee.findMany()
    * ```
    */
  get employee(): Prisma.EmployeeDelegate<ExtArgs>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs>;
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
  export import NotFoundError = runtime.NotFoundError

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
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
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
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
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
    Category: 'Category',
    CategoryAttribute: 'CategoryAttribute',
    Product: 'Product',
    ProductAttributeValue: 'ProductAttributeValue',
    Warehouse: 'Warehouse',
    InventoryItem: 'InventoryItem',
    UniqueBarcode: 'UniqueBarcode',
    Company: 'Company',
    Quotation: 'Quotation',
    QuotationItem: 'QuotationItem',
    QuotationFixedCost: 'QuotationFixedCost',
    Employee: 'Employee',
    Session: 'Session'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "category" | "categoryAttribute" | "product" | "productAttributeValue" | "warehouse" | "inventoryItem" | "uniqueBarcode" | "company" | "quotation" | "quotationItem" | "quotationFixedCost" | "employee" | "session"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      CategoryAttribute: {
        payload: Prisma.$CategoryAttributePayload<ExtArgs>
        fields: Prisma.CategoryAttributeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryAttributeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryAttributePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryAttributeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryAttributePayload>
          }
          findFirst: {
            args: Prisma.CategoryAttributeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryAttributePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryAttributeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryAttributePayload>
          }
          findMany: {
            args: Prisma.CategoryAttributeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryAttributePayload>[]
          }
          create: {
            args: Prisma.CategoryAttributeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryAttributePayload>
          }
          createMany: {
            args: Prisma.CategoryAttributeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryAttributeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryAttributePayload>[]
          }
          delete: {
            args: Prisma.CategoryAttributeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryAttributePayload>
          }
          update: {
            args: Prisma.CategoryAttributeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryAttributePayload>
          }
          deleteMany: {
            args: Prisma.CategoryAttributeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryAttributeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CategoryAttributeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryAttributePayload>
          }
          aggregate: {
            args: Prisma.CategoryAttributeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategoryAttribute>
          }
          groupBy: {
            args: Prisma.CategoryAttributeGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryAttributeGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryAttributeCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryAttributeCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      ProductAttributeValue: {
        payload: Prisma.$ProductAttributeValuePayload<ExtArgs>
        fields: Prisma.ProductAttributeValueFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductAttributeValueFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductAttributeValuePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductAttributeValueFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductAttributeValuePayload>
          }
          findFirst: {
            args: Prisma.ProductAttributeValueFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductAttributeValuePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductAttributeValueFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductAttributeValuePayload>
          }
          findMany: {
            args: Prisma.ProductAttributeValueFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductAttributeValuePayload>[]
          }
          create: {
            args: Prisma.ProductAttributeValueCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductAttributeValuePayload>
          }
          createMany: {
            args: Prisma.ProductAttributeValueCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductAttributeValueCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductAttributeValuePayload>[]
          }
          delete: {
            args: Prisma.ProductAttributeValueDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductAttributeValuePayload>
          }
          update: {
            args: Prisma.ProductAttributeValueUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductAttributeValuePayload>
          }
          deleteMany: {
            args: Prisma.ProductAttributeValueDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductAttributeValueUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductAttributeValueUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductAttributeValuePayload>
          }
          aggregate: {
            args: Prisma.ProductAttributeValueAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductAttributeValue>
          }
          groupBy: {
            args: Prisma.ProductAttributeValueGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductAttributeValueGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductAttributeValueCountArgs<ExtArgs>
            result: $Utils.Optional<ProductAttributeValueCountAggregateOutputType> | number
          }
        }
      }
      Warehouse: {
        payload: Prisma.$WarehousePayload<ExtArgs>
        fields: Prisma.WarehouseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WarehouseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WarehousePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WarehouseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WarehousePayload>
          }
          findFirst: {
            args: Prisma.WarehouseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WarehousePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WarehouseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WarehousePayload>
          }
          findMany: {
            args: Prisma.WarehouseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WarehousePayload>[]
          }
          create: {
            args: Prisma.WarehouseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WarehousePayload>
          }
          createMany: {
            args: Prisma.WarehouseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WarehouseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WarehousePayload>[]
          }
          delete: {
            args: Prisma.WarehouseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WarehousePayload>
          }
          update: {
            args: Prisma.WarehouseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WarehousePayload>
          }
          deleteMany: {
            args: Prisma.WarehouseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WarehouseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WarehouseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WarehousePayload>
          }
          aggregate: {
            args: Prisma.WarehouseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWarehouse>
          }
          groupBy: {
            args: Prisma.WarehouseGroupByArgs<ExtArgs>
            result: $Utils.Optional<WarehouseGroupByOutputType>[]
          }
          count: {
            args: Prisma.WarehouseCountArgs<ExtArgs>
            result: $Utils.Optional<WarehouseCountAggregateOutputType> | number
          }
        }
      }
      InventoryItem: {
        payload: Prisma.$InventoryItemPayload<ExtArgs>
        fields: Prisma.InventoryItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InventoryItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InventoryItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryItemPayload>
          }
          findFirst: {
            args: Prisma.InventoryItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InventoryItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryItemPayload>
          }
          findMany: {
            args: Prisma.InventoryItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryItemPayload>[]
          }
          create: {
            args: Prisma.InventoryItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryItemPayload>
          }
          createMany: {
            args: Prisma.InventoryItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InventoryItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryItemPayload>[]
          }
          delete: {
            args: Prisma.InventoryItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryItemPayload>
          }
          update: {
            args: Prisma.InventoryItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryItemPayload>
          }
          deleteMany: {
            args: Prisma.InventoryItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InventoryItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InventoryItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryItemPayload>
          }
          aggregate: {
            args: Prisma.InventoryItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInventoryItem>
          }
          groupBy: {
            args: Prisma.InventoryItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<InventoryItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.InventoryItemCountArgs<ExtArgs>
            result: $Utils.Optional<InventoryItemCountAggregateOutputType> | number
          }
        }
      }
      UniqueBarcode: {
        payload: Prisma.$UniqueBarcodePayload<ExtArgs>
        fields: Prisma.UniqueBarcodeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UniqueBarcodeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UniqueBarcodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UniqueBarcodeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UniqueBarcodePayload>
          }
          findFirst: {
            args: Prisma.UniqueBarcodeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UniqueBarcodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UniqueBarcodeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UniqueBarcodePayload>
          }
          findMany: {
            args: Prisma.UniqueBarcodeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UniqueBarcodePayload>[]
          }
          create: {
            args: Prisma.UniqueBarcodeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UniqueBarcodePayload>
          }
          createMany: {
            args: Prisma.UniqueBarcodeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UniqueBarcodeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UniqueBarcodePayload>[]
          }
          delete: {
            args: Prisma.UniqueBarcodeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UniqueBarcodePayload>
          }
          update: {
            args: Prisma.UniqueBarcodeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UniqueBarcodePayload>
          }
          deleteMany: {
            args: Prisma.UniqueBarcodeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UniqueBarcodeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UniqueBarcodeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UniqueBarcodePayload>
          }
          aggregate: {
            args: Prisma.UniqueBarcodeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUniqueBarcode>
          }
          groupBy: {
            args: Prisma.UniqueBarcodeGroupByArgs<ExtArgs>
            result: $Utils.Optional<UniqueBarcodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.UniqueBarcodeCountArgs<ExtArgs>
            result: $Utils.Optional<UniqueBarcodeCountAggregateOutputType> | number
          }
        }
      }
      Company: {
        payload: Prisma.$CompanyPayload<ExtArgs>
        fields: Prisma.CompanyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompanyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompanyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findFirst: {
            args: Prisma.CompanyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompanyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findMany: {
            args: Prisma.CompanyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          create: {
            args: Prisma.CompanyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          createMany: {
            args: Prisma.CompanyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompanyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          delete: {
            args: Prisma.CompanyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          update: {
            args: Prisma.CompanyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          deleteMany: {
            args: Prisma.CompanyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompanyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CompanyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          aggregate: {
            args: Prisma.CompanyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompany>
          }
          groupBy: {
            args: Prisma.CompanyGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanyGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompanyCountArgs<ExtArgs>
            result: $Utils.Optional<CompanyCountAggregateOutputType> | number
          }
        }
      }
      Quotation: {
        payload: Prisma.$QuotationPayload<ExtArgs>
        fields: Prisma.QuotationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuotationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuotationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationPayload>
          }
          findFirst: {
            args: Prisma.QuotationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuotationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationPayload>
          }
          findMany: {
            args: Prisma.QuotationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationPayload>[]
          }
          create: {
            args: Prisma.QuotationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationPayload>
          }
          createMany: {
            args: Prisma.QuotationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuotationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationPayload>[]
          }
          delete: {
            args: Prisma.QuotationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationPayload>
          }
          update: {
            args: Prisma.QuotationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationPayload>
          }
          deleteMany: {
            args: Prisma.QuotationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuotationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.QuotationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationPayload>
          }
          aggregate: {
            args: Prisma.QuotationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuotation>
          }
          groupBy: {
            args: Prisma.QuotationGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuotationGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuotationCountArgs<ExtArgs>
            result: $Utils.Optional<QuotationCountAggregateOutputType> | number
          }
        }
      }
      QuotationItem: {
        payload: Prisma.$QuotationItemPayload<ExtArgs>
        fields: Prisma.QuotationItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuotationItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuotationItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationItemPayload>
          }
          findFirst: {
            args: Prisma.QuotationItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuotationItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationItemPayload>
          }
          findMany: {
            args: Prisma.QuotationItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationItemPayload>[]
          }
          create: {
            args: Prisma.QuotationItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationItemPayload>
          }
          createMany: {
            args: Prisma.QuotationItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuotationItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationItemPayload>[]
          }
          delete: {
            args: Prisma.QuotationItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationItemPayload>
          }
          update: {
            args: Prisma.QuotationItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationItemPayload>
          }
          deleteMany: {
            args: Prisma.QuotationItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuotationItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.QuotationItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationItemPayload>
          }
          aggregate: {
            args: Prisma.QuotationItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuotationItem>
          }
          groupBy: {
            args: Prisma.QuotationItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuotationItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuotationItemCountArgs<ExtArgs>
            result: $Utils.Optional<QuotationItemCountAggregateOutputType> | number
          }
        }
      }
      QuotationFixedCost: {
        payload: Prisma.$QuotationFixedCostPayload<ExtArgs>
        fields: Prisma.QuotationFixedCostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuotationFixedCostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationFixedCostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuotationFixedCostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationFixedCostPayload>
          }
          findFirst: {
            args: Prisma.QuotationFixedCostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationFixedCostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuotationFixedCostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationFixedCostPayload>
          }
          findMany: {
            args: Prisma.QuotationFixedCostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationFixedCostPayload>[]
          }
          create: {
            args: Prisma.QuotationFixedCostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationFixedCostPayload>
          }
          createMany: {
            args: Prisma.QuotationFixedCostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuotationFixedCostCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationFixedCostPayload>[]
          }
          delete: {
            args: Prisma.QuotationFixedCostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationFixedCostPayload>
          }
          update: {
            args: Prisma.QuotationFixedCostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationFixedCostPayload>
          }
          deleteMany: {
            args: Prisma.QuotationFixedCostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuotationFixedCostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.QuotationFixedCostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationFixedCostPayload>
          }
          aggregate: {
            args: Prisma.QuotationFixedCostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuotationFixedCost>
          }
          groupBy: {
            args: Prisma.QuotationFixedCostGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuotationFixedCostGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuotationFixedCostCountArgs<ExtArgs>
            result: $Utils.Optional<QuotationFixedCostCountAggregateOutputType> | number
          }
        }
      }
      Employee: {
        payload: Prisma.$EmployeePayload<ExtArgs>
        fields: Prisma.EmployeeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmployeeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmployeeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          findFirst: {
            args: Prisma.EmployeeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmployeeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          findMany: {
            args: Prisma.EmployeeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>[]
          }
          create: {
            args: Prisma.EmployeeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          createMany: {
            args: Prisma.EmployeeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmployeeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>[]
          }
          delete: {
            args: Prisma.EmployeeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          update: {
            args: Prisma.EmployeeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          deleteMany: {
            args: Prisma.EmployeeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmployeeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EmployeeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          aggregate: {
            args: Prisma.EmployeeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmployee>
          }
          groupBy: {
            args: Prisma.EmployeeGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmployeeGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmployeeCountArgs<ExtArgs>
            result: $Utils.Optional<EmployeeCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
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
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    attributes: number
    products: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attributes?: boolean | CategoryCountOutputTypeCountAttributesArgs
    products?: boolean | CategoryCountOutputTypeCountProductsArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountAttributesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryAttributeWhereInput
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
  }


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    attributeValues: number
    inventoryItems: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attributeValues?: boolean | ProductCountOutputTypeCountAttributeValuesArgs
    inventoryItems?: boolean | ProductCountOutputTypeCountInventoryItemsArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountAttributeValuesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductAttributeValueWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountInventoryItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InventoryItemWhereInput
  }


  /**
   * Count Type WarehouseCountOutputType
   */

  export type WarehouseCountOutputType = {
    inventoryItems: number
  }

  export type WarehouseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inventoryItems?: boolean | WarehouseCountOutputTypeCountInventoryItemsArgs
  }

  // Custom InputTypes
  /**
   * WarehouseCountOutputType without action
   */
  export type WarehouseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WarehouseCountOutputType
     */
    select?: WarehouseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WarehouseCountOutputType without action
   */
  export type WarehouseCountOutputTypeCountInventoryItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InventoryItemWhereInput
  }


  /**
   * Count Type InventoryItemCountOutputType
   */

  export type InventoryItemCountOutputType = {
    uniqueBarcodes: number
  }

  export type InventoryItemCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    uniqueBarcodes?: boolean | InventoryItemCountOutputTypeCountUniqueBarcodesArgs
  }

  // Custom InputTypes
  /**
   * InventoryItemCountOutputType without action
   */
  export type InventoryItemCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryItemCountOutputType
     */
    select?: InventoryItemCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * InventoryItemCountOutputType without action
   */
  export type InventoryItemCountOutputTypeCountUniqueBarcodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UniqueBarcodeWhereInput
  }


  /**
   * Count Type CompanyCountOutputType
   */

  export type CompanyCountOutputType = {
    quotations: number
    employees: number
  }

  export type CompanyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quotations?: boolean | CompanyCountOutputTypeCountQuotationsArgs
    employees?: boolean | CompanyCountOutputTypeCountEmployeesArgs
  }

  // Custom InputTypes
  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCountOutputType
     */
    select?: CompanyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountQuotationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuotationWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountEmployeesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeWhereInput
  }


  /**
   * Count Type QuotationCountOutputType
   */

  export type QuotationCountOutputType = {
    items: number
    fixedCosts: number
  }

  export type QuotationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | QuotationCountOutputTypeCountItemsArgs
    fixedCosts?: boolean | QuotationCountOutputTypeCountFixedCostsArgs
  }

  // Custom InputTypes
  /**
   * QuotationCountOutputType without action
   */
  export type QuotationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuotationCountOutputType
     */
    select?: QuotationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * QuotationCountOutputType without action
   */
  export type QuotationCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuotationItemWhereInput
  }

  /**
   * QuotationCountOutputType without action
   */
  export type QuotationCountOutputTypeCountFixedCostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuotationFixedCostWhereInput
  }


  /**
   * Count Type EmployeeCountOutputType
   */

  export type EmployeeCountOutputType = {
    sessions: number
  }

  export type EmployeeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | EmployeeCountOutputTypeCountSessionsArgs
  }

  // Custom InputTypes
  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeCountOutputType
     */
    select?: EmployeeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryAvgAggregateOutputType = {
    id: number | null
  }

  export type CategorySumAggregateOutputType = {
    id: number | null
  }

  export type CategoryMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    hsnCode: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    hsnCode: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    description: number
    hsnCode: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CategoryAvgAggregateInputType = {
    id?: true
  }

  export type CategorySumAggregateInputType = {
    id?: true
  }

  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    hsnCode?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    hsnCode?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    hsnCode?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _avg?: CategoryAvgAggregateInputType
    _sum?: CategorySumAggregateInputType
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: number
    name: string
    description: string | null
    hsnCode: string | null
    createdAt: Date
    updatedAt: Date
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    hsnCode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    attributes?: boolean | Category$attributesArgs<ExtArgs>
    products?: boolean | Category$productsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    hsnCode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    hsnCode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attributes?: boolean | Category$attributesArgs<ExtArgs>
    products?: boolean | Category$productsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      attributes: Prisma.$CategoryAttributePayload<ExtArgs>[]
      products: Prisma.$ProductPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string | null
      hsnCode: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
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
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    attributes<T extends Category$attributesArgs<ExtArgs> = {}>(args?: Subset<T, Category$attributesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryAttributePayload<ExtArgs>, T, "findMany"> | Null>
    products<T extends Category$productsArgs<ExtArgs> = {}>(args?: Subset<T, Category$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Category model
   */ 
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'Int'>
    readonly name: FieldRef<"Category", 'String'>
    readonly description: FieldRef<"Category", 'String'>
    readonly hsnCode: FieldRef<"Category", 'String'>
    readonly createdAt: FieldRef<"Category", 'DateTime'>
    readonly updatedAt: FieldRef<"Category", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
  }

  /**
   * Category.attributes
   */
  export type Category$attributesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryAttribute
     */
    select?: CategoryAttributeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryAttributeInclude<ExtArgs> | null
    where?: CategoryAttributeWhereInput
    orderBy?: CategoryAttributeOrderByWithRelationInput | CategoryAttributeOrderByWithRelationInput[]
    cursor?: CategoryAttributeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CategoryAttributeScalarFieldEnum | CategoryAttributeScalarFieldEnum[]
  }

  /**
   * Category.products
   */
  export type Category$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    cursor?: ProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model CategoryAttribute
   */

  export type AggregateCategoryAttribute = {
    _count: CategoryAttributeCountAggregateOutputType | null
    _avg: CategoryAttributeAvgAggregateOutputType | null
    _sum: CategoryAttributeSumAggregateOutputType | null
    _min: CategoryAttributeMinAggregateOutputType | null
    _max: CategoryAttributeMaxAggregateOutputType | null
  }

  export type CategoryAttributeAvgAggregateOutputType = {
    id: number | null
    categoryId: number | null
    sortOrder: number | null
  }

  export type CategoryAttributeSumAggregateOutputType = {
    id: number | null
    categoryId: number | null
    sortOrder: number | null
  }

  export type CategoryAttributeMinAggregateOutputType = {
    id: number | null
    categoryId: number | null
    name: string | null
    type: $Enums.AttributeType | null
    required: boolean | null
    sortOrder: number | null
  }

  export type CategoryAttributeMaxAggregateOutputType = {
    id: number | null
    categoryId: number | null
    name: string | null
    type: $Enums.AttributeType | null
    required: boolean | null
    sortOrder: number | null
  }

  export type CategoryAttributeCountAggregateOutputType = {
    id: number
    categoryId: number
    name: number
    type: number
    required: number
    sortOrder: number
    _all: number
  }


  export type CategoryAttributeAvgAggregateInputType = {
    id?: true
    categoryId?: true
    sortOrder?: true
  }

  export type CategoryAttributeSumAggregateInputType = {
    id?: true
    categoryId?: true
    sortOrder?: true
  }

  export type CategoryAttributeMinAggregateInputType = {
    id?: true
    categoryId?: true
    name?: true
    type?: true
    required?: true
    sortOrder?: true
  }

  export type CategoryAttributeMaxAggregateInputType = {
    id?: true
    categoryId?: true
    name?: true
    type?: true
    required?: true
    sortOrder?: true
  }

  export type CategoryAttributeCountAggregateInputType = {
    id?: true
    categoryId?: true
    name?: true
    type?: true
    required?: true
    sortOrder?: true
    _all?: true
  }

  export type CategoryAttributeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CategoryAttribute to aggregate.
     */
    where?: CategoryAttributeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CategoryAttributes to fetch.
     */
    orderBy?: CategoryAttributeOrderByWithRelationInput | CategoryAttributeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryAttributeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CategoryAttributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CategoryAttributes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CategoryAttributes
    **/
    _count?: true | CategoryAttributeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoryAttributeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategoryAttributeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryAttributeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryAttributeMaxAggregateInputType
  }

  export type GetCategoryAttributeAggregateType<T extends CategoryAttributeAggregateArgs> = {
        [P in keyof T & keyof AggregateCategoryAttribute]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategoryAttribute[P]>
      : GetScalarType<T[P], AggregateCategoryAttribute[P]>
  }




  export type CategoryAttributeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryAttributeWhereInput
    orderBy?: CategoryAttributeOrderByWithAggregationInput | CategoryAttributeOrderByWithAggregationInput[]
    by: CategoryAttributeScalarFieldEnum[] | CategoryAttributeScalarFieldEnum
    having?: CategoryAttributeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryAttributeCountAggregateInputType | true
    _avg?: CategoryAttributeAvgAggregateInputType
    _sum?: CategoryAttributeSumAggregateInputType
    _min?: CategoryAttributeMinAggregateInputType
    _max?: CategoryAttributeMaxAggregateInputType
  }

  export type CategoryAttributeGroupByOutputType = {
    id: number
    categoryId: number
    name: string
    type: $Enums.AttributeType
    required: boolean
    sortOrder: number
    _count: CategoryAttributeCountAggregateOutputType | null
    _avg: CategoryAttributeAvgAggregateOutputType | null
    _sum: CategoryAttributeSumAggregateOutputType | null
    _min: CategoryAttributeMinAggregateOutputType | null
    _max: CategoryAttributeMaxAggregateOutputType | null
  }

  type GetCategoryAttributeGroupByPayload<T extends CategoryAttributeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryAttributeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryAttributeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryAttributeGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryAttributeGroupByOutputType[P]>
        }
      >
    >


  export type CategoryAttributeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    categoryId?: boolean
    name?: boolean
    type?: boolean
    required?: boolean
    sortOrder?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["categoryAttribute"]>

  export type CategoryAttributeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    categoryId?: boolean
    name?: boolean
    type?: boolean
    required?: boolean
    sortOrder?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["categoryAttribute"]>

  export type CategoryAttributeSelectScalar = {
    id?: boolean
    categoryId?: boolean
    name?: boolean
    type?: boolean
    required?: boolean
    sortOrder?: boolean
  }

  export type CategoryAttributeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }
  export type CategoryAttributeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }

  export type $CategoryAttributePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CategoryAttribute"
    objects: {
      category: Prisma.$CategoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      categoryId: number
      name: string
      type: $Enums.AttributeType
      required: boolean
      sortOrder: number
    }, ExtArgs["result"]["categoryAttribute"]>
    composites: {}
  }

  type CategoryAttributeGetPayload<S extends boolean | null | undefined | CategoryAttributeDefaultArgs> = $Result.GetResult<Prisma.$CategoryAttributePayload, S>

  type CategoryAttributeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CategoryAttributeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CategoryAttributeCountAggregateInputType | true
    }

  export interface CategoryAttributeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CategoryAttribute'], meta: { name: 'CategoryAttribute' } }
    /**
     * Find zero or one CategoryAttribute that matches the filter.
     * @param {CategoryAttributeFindUniqueArgs} args - Arguments to find a CategoryAttribute
     * @example
     * // Get one CategoryAttribute
     * const categoryAttribute = await prisma.categoryAttribute.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryAttributeFindUniqueArgs>(args: SelectSubset<T, CategoryAttributeFindUniqueArgs<ExtArgs>>): Prisma__CategoryAttributeClient<$Result.GetResult<Prisma.$CategoryAttributePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CategoryAttribute that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CategoryAttributeFindUniqueOrThrowArgs} args - Arguments to find a CategoryAttribute
     * @example
     * // Get one CategoryAttribute
     * const categoryAttribute = await prisma.categoryAttribute.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryAttributeFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryAttributeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryAttributeClient<$Result.GetResult<Prisma.$CategoryAttributePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CategoryAttribute that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAttributeFindFirstArgs} args - Arguments to find a CategoryAttribute
     * @example
     * // Get one CategoryAttribute
     * const categoryAttribute = await prisma.categoryAttribute.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryAttributeFindFirstArgs>(args?: SelectSubset<T, CategoryAttributeFindFirstArgs<ExtArgs>>): Prisma__CategoryAttributeClient<$Result.GetResult<Prisma.$CategoryAttributePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CategoryAttribute that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAttributeFindFirstOrThrowArgs} args - Arguments to find a CategoryAttribute
     * @example
     * // Get one CategoryAttribute
     * const categoryAttribute = await prisma.categoryAttribute.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryAttributeFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryAttributeFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryAttributeClient<$Result.GetResult<Prisma.$CategoryAttributePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CategoryAttributes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAttributeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CategoryAttributes
     * const categoryAttributes = await prisma.categoryAttribute.findMany()
     * 
     * // Get first 10 CategoryAttributes
     * const categoryAttributes = await prisma.categoryAttribute.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryAttributeWithIdOnly = await prisma.categoryAttribute.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryAttributeFindManyArgs>(args?: SelectSubset<T, CategoryAttributeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryAttributePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CategoryAttribute.
     * @param {CategoryAttributeCreateArgs} args - Arguments to create a CategoryAttribute.
     * @example
     * // Create one CategoryAttribute
     * const CategoryAttribute = await prisma.categoryAttribute.create({
     *   data: {
     *     // ... data to create a CategoryAttribute
     *   }
     * })
     * 
     */
    create<T extends CategoryAttributeCreateArgs>(args: SelectSubset<T, CategoryAttributeCreateArgs<ExtArgs>>): Prisma__CategoryAttributeClient<$Result.GetResult<Prisma.$CategoryAttributePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CategoryAttributes.
     * @param {CategoryAttributeCreateManyArgs} args - Arguments to create many CategoryAttributes.
     * @example
     * // Create many CategoryAttributes
     * const categoryAttribute = await prisma.categoryAttribute.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryAttributeCreateManyArgs>(args?: SelectSubset<T, CategoryAttributeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CategoryAttributes and returns the data saved in the database.
     * @param {CategoryAttributeCreateManyAndReturnArgs} args - Arguments to create many CategoryAttributes.
     * @example
     * // Create many CategoryAttributes
     * const categoryAttribute = await prisma.categoryAttribute.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CategoryAttributes and only return the `id`
     * const categoryAttributeWithIdOnly = await prisma.categoryAttribute.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryAttributeCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryAttributeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryAttributePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CategoryAttribute.
     * @param {CategoryAttributeDeleteArgs} args - Arguments to delete one CategoryAttribute.
     * @example
     * // Delete one CategoryAttribute
     * const CategoryAttribute = await prisma.categoryAttribute.delete({
     *   where: {
     *     // ... filter to delete one CategoryAttribute
     *   }
     * })
     * 
     */
    delete<T extends CategoryAttributeDeleteArgs>(args: SelectSubset<T, CategoryAttributeDeleteArgs<ExtArgs>>): Prisma__CategoryAttributeClient<$Result.GetResult<Prisma.$CategoryAttributePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CategoryAttribute.
     * @param {CategoryAttributeUpdateArgs} args - Arguments to update one CategoryAttribute.
     * @example
     * // Update one CategoryAttribute
     * const categoryAttribute = await prisma.categoryAttribute.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryAttributeUpdateArgs>(args: SelectSubset<T, CategoryAttributeUpdateArgs<ExtArgs>>): Prisma__CategoryAttributeClient<$Result.GetResult<Prisma.$CategoryAttributePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CategoryAttributes.
     * @param {CategoryAttributeDeleteManyArgs} args - Arguments to filter CategoryAttributes to delete.
     * @example
     * // Delete a few CategoryAttributes
     * const { count } = await prisma.categoryAttribute.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryAttributeDeleteManyArgs>(args?: SelectSubset<T, CategoryAttributeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CategoryAttributes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAttributeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CategoryAttributes
     * const categoryAttribute = await prisma.categoryAttribute.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryAttributeUpdateManyArgs>(args: SelectSubset<T, CategoryAttributeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CategoryAttribute.
     * @param {CategoryAttributeUpsertArgs} args - Arguments to update or create a CategoryAttribute.
     * @example
     * // Update or create a CategoryAttribute
     * const categoryAttribute = await prisma.categoryAttribute.upsert({
     *   create: {
     *     // ... data to create a CategoryAttribute
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CategoryAttribute we want to update
     *   }
     * })
     */
    upsert<T extends CategoryAttributeUpsertArgs>(args: SelectSubset<T, CategoryAttributeUpsertArgs<ExtArgs>>): Prisma__CategoryAttributeClient<$Result.GetResult<Prisma.$CategoryAttributePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CategoryAttributes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAttributeCountArgs} args - Arguments to filter CategoryAttributes to count.
     * @example
     * // Count the number of CategoryAttributes
     * const count = await prisma.categoryAttribute.count({
     *   where: {
     *     // ... the filter for the CategoryAttributes we want to count
     *   }
     * })
    **/
    count<T extends CategoryAttributeCountArgs>(
      args?: Subset<T, CategoryAttributeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryAttributeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CategoryAttribute.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAttributeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CategoryAttributeAggregateArgs>(args: Subset<T, CategoryAttributeAggregateArgs>): Prisma.PrismaPromise<GetCategoryAttributeAggregateType<T>>

    /**
     * Group by CategoryAttribute.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAttributeGroupByArgs} args - Group by arguments.
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
      T extends CategoryAttributeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryAttributeGroupByArgs['orderBy'] }
        : { orderBy?: CategoryAttributeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CategoryAttributeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryAttributeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CategoryAttribute model
   */
  readonly fields: CategoryAttributeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CategoryAttribute.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryAttributeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the CategoryAttribute model
   */ 
  interface CategoryAttributeFieldRefs {
    readonly id: FieldRef<"CategoryAttribute", 'Int'>
    readonly categoryId: FieldRef<"CategoryAttribute", 'Int'>
    readonly name: FieldRef<"CategoryAttribute", 'String'>
    readonly type: FieldRef<"CategoryAttribute", 'AttributeType'>
    readonly required: FieldRef<"CategoryAttribute", 'Boolean'>
    readonly sortOrder: FieldRef<"CategoryAttribute", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * CategoryAttribute findUnique
   */
  export type CategoryAttributeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryAttribute
     */
    select?: CategoryAttributeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryAttributeInclude<ExtArgs> | null
    /**
     * Filter, which CategoryAttribute to fetch.
     */
    where: CategoryAttributeWhereUniqueInput
  }

  /**
   * CategoryAttribute findUniqueOrThrow
   */
  export type CategoryAttributeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryAttribute
     */
    select?: CategoryAttributeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryAttributeInclude<ExtArgs> | null
    /**
     * Filter, which CategoryAttribute to fetch.
     */
    where: CategoryAttributeWhereUniqueInput
  }

  /**
   * CategoryAttribute findFirst
   */
  export type CategoryAttributeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryAttribute
     */
    select?: CategoryAttributeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryAttributeInclude<ExtArgs> | null
    /**
     * Filter, which CategoryAttribute to fetch.
     */
    where?: CategoryAttributeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CategoryAttributes to fetch.
     */
    orderBy?: CategoryAttributeOrderByWithRelationInput | CategoryAttributeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CategoryAttributes.
     */
    cursor?: CategoryAttributeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CategoryAttributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CategoryAttributes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CategoryAttributes.
     */
    distinct?: CategoryAttributeScalarFieldEnum | CategoryAttributeScalarFieldEnum[]
  }

  /**
   * CategoryAttribute findFirstOrThrow
   */
  export type CategoryAttributeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryAttribute
     */
    select?: CategoryAttributeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryAttributeInclude<ExtArgs> | null
    /**
     * Filter, which CategoryAttribute to fetch.
     */
    where?: CategoryAttributeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CategoryAttributes to fetch.
     */
    orderBy?: CategoryAttributeOrderByWithRelationInput | CategoryAttributeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CategoryAttributes.
     */
    cursor?: CategoryAttributeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CategoryAttributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CategoryAttributes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CategoryAttributes.
     */
    distinct?: CategoryAttributeScalarFieldEnum | CategoryAttributeScalarFieldEnum[]
  }

  /**
   * CategoryAttribute findMany
   */
  export type CategoryAttributeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryAttribute
     */
    select?: CategoryAttributeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryAttributeInclude<ExtArgs> | null
    /**
     * Filter, which CategoryAttributes to fetch.
     */
    where?: CategoryAttributeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CategoryAttributes to fetch.
     */
    orderBy?: CategoryAttributeOrderByWithRelationInput | CategoryAttributeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CategoryAttributes.
     */
    cursor?: CategoryAttributeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CategoryAttributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CategoryAttributes.
     */
    skip?: number
    distinct?: CategoryAttributeScalarFieldEnum | CategoryAttributeScalarFieldEnum[]
  }

  /**
   * CategoryAttribute create
   */
  export type CategoryAttributeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryAttribute
     */
    select?: CategoryAttributeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryAttributeInclude<ExtArgs> | null
    /**
     * The data needed to create a CategoryAttribute.
     */
    data: XOR<CategoryAttributeCreateInput, CategoryAttributeUncheckedCreateInput>
  }

  /**
   * CategoryAttribute createMany
   */
  export type CategoryAttributeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CategoryAttributes.
     */
    data: CategoryAttributeCreateManyInput | CategoryAttributeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CategoryAttribute createManyAndReturn
   */
  export type CategoryAttributeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryAttribute
     */
    select?: CategoryAttributeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CategoryAttributes.
     */
    data: CategoryAttributeCreateManyInput | CategoryAttributeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryAttributeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CategoryAttribute update
   */
  export type CategoryAttributeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryAttribute
     */
    select?: CategoryAttributeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryAttributeInclude<ExtArgs> | null
    /**
     * The data needed to update a CategoryAttribute.
     */
    data: XOR<CategoryAttributeUpdateInput, CategoryAttributeUncheckedUpdateInput>
    /**
     * Choose, which CategoryAttribute to update.
     */
    where: CategoryAttributeWhereUniqueInput
  }

  /**
   * CategoryAttribute updateMany
   */
  export type CategoryAttributeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CategoryAttributes.
     */
    data: XOR<CategoryAttributeUpdateManyMutationInput, CategoryAttributeUncheckedUpdateManyInput>
    /**
     * Filter which CategoryAttributes to update
     */
    where?: CategoryAttributeWhereInput
  }

  /**
   * CategoryAttribute upsert
   */
  export type CategoryAttributeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryAttribute
     */
    select?: CategoryAttributeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryAttributeInclude<ExtArgs> | null
    /**
     * The filter to search for the CategoryAttribute to update in case it exists.
     */
    where: CategoryAttributeWhereUniqueInput
    /**
     * In case the CategoryAttribute found by the `where` argument doesn't exist, create a new CategoryAttribute with this data.
     */
    create: XOR<CategoryAttributeCreateInput, CategoryAttributeUncheckedCreateInput>
    /**
     * In case the CategoryAttribute was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryAttributeUpdateInput, CategoryAttributeUncheckedUpdateInput>
  }

  /**
   * CategoryAttribute delete
   */
  export type CategoryAttributeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryAttribute
     */
    select?: CategoryAttributeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryAttributeInclude<ExtArgs> | null
    /**
     * Filter which CategoryAttribute to delete.
     */
    where: CategoryAttributeWhereUniqueInput
  }

  /**
   * CategoryAttribute deleteMany
   */
  export type CategoryAttributeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CategoryAttributes to delete
     */
    where?: CategoryAttributeWhereInput
  }

  /**
   * CategoryAttribute without action
   */
  export type CategoryAttributeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryAttribute
     */
    select?: CategoryAttributeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryAttributeInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    id: number | null
    categoryId: number | null
    basePrice: Decimal | null
    gstRate: Decimal | null
  }

  export type ProductSumAggregateOutputType = {
    id: number | null
    categoryId: number | null
    basePrice: Decimal | null
    gstRate: Decimal | null
  }

  export type ProductMinAggregateOutputType = {
    id: number | null
    sku: string | null
    name: string | null
    manufacturer: string | null
    categoryId: number | null
    basePrice: Decimal | null
    gstRate: Decimal | null
    barcodeHandling: $Enums.BarcodeHandling | null
    barcode: string | null
    barcodeType: $Enums.BarcodeType | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductMaxAggregateOutputType = {
    id: number | null
    sku: string | null
    name: string | null
    manufacturer: string | null
    categoryId: number | null
    basePrice: Decimal | null
    gstRate: Decimal | null
    barcodeHandling: $Enums.BarcodeHandling | null
    barcode: string | null
    barcodeType: $Enums.BarcodeType | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    sku: number
    name: number
    manufacturer: number
    categoryId: number
    basePrice: number
    gstRate: number
    barcodeHandling: number
    barcode: number
    barcodeType: number
    description: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    id?: true
    categoryId?: true
    basePrice?: true
    gstRate?: true
  }

  export type ProductSumAggregateInputType = {
    id?: true
    categoryId?: true
    basePrice?: true
    gstRate?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    sku?: true
    name?: true
    manufacturer?: true
    categoryId?: true
    basePrice?: true
    gstRate?: true
    barcodeHandling?: true
    barcode?: true
    barcodeType?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    sku?: true
    name?: true
    manufacturer?: true
    categoryId?: true
    basePrice?: true
    gstRate?: true
    barcodeHandling?: true
    barcode?: true
    barcodeType?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    sku?: true
    name?: true
    manufacturer?: true
    categoryId?: true
    basePrice?: true
    gstRate?: true
    barcodeHandling?: true
    barcode?: true
    barcodeType?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: number
    sku: string
    name: string
    manufacturer: string | null
    categoryId: number
    basePrice: Decimal
    gstRate: Decimal
    barcodeHandling: $Enums.BarcodeHandling
    barcode: string | null
    barcodeType: $Enums.BarcodeType
    description: string | null
    createdAt: Date
    updatedAt: Date
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sku?: boolean
    name?: boolean
    manufacturer?: boolean
    categoryId?: boolean
    basePrice?: boolean
    gstRate?: boolean
    barcodeHandling?: boolean
    barcode?: boolean
    barcodeType?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    attributeValues?: boolean | Product$attributeValuesArgs<ExtArgs>
    inventoryItems?: boolean | Product$inventoryItemsArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sku?: boolean
    name?: boolean
    manufacturer?: boolean
    categoryId?: boolean
    basePrice?: boolean
    gstRate?: boolean
    barcodeHandling?: boolean
    barcode?: boolean
    barcodeType?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    id?: boolean
    sku?: boolean
    name?: boolean
    manufacturer?: boolean
    categoryId?: boolean
    basePrice?: boolean
    gstRate?: boolean
    barcodeHandling?: boolean
    barcode?: boolean
    barcodeType?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    attributeValues?: boolean | Product$attributeValuesArgs<ExtArgs>
    inventoryItems?: boolean | Product$inventoryItemsArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      category: Prisma.$CategoryPayload<ExtArgs>
      attributeValues: Prisma.$ProductAttributeValuePayload<ExtArgs>[]
      inventoryItems: Prisma.$InventoryItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      sku: string
      name: string
      manufacturer: string | null
      categoryId: number
      basePrice: Prisma.Decimal
      gstRate: Prisma.Decimal
      barcodeHandling: $Enums.BarcodeHandling
      barcode: string | null
      barcodeType: $Enums.BarcodeType
      description: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
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
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    attributeValues<T extends Product$attributeValuesArgs<ExtArgs> = {}>(args?: Subset<T, Product$attributeValuesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductAttributeValuePayload<ExtArgs>, T, "findMany"> | Null>
    inventoryItems<T extends Product$inventoryItemsArgs<ExtArgs> = {}>(args?: Subset<T, Product$inventoryItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InventoryItemPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Product model
   */ 
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'Int'>
    readonly sku: FieldRef<"Product", 'String'>
    readonly name: FieldRef<"Product", 'String'>
    readonly manufacturer: FieldRef<"Product", 'String'>
    readonly categoryId: FieldRef<"Product", 'Int'>
    readonly basePrice: FieldRef<"Product", 'Decimal'>
    readonly gstRate: FieldRef<"Product", 'Decimal'>
    readonly barcodeHandling: FieldRef<"Product", 'BarcodeHandling'>
    readonly barcode: FieldRef<"Product", 'String'>
    readonly barcodeType: FieldRef<"Product", 'BarcodeType'>
    readonly description: FieldRef<"Product", 'String'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
    readonly updatedAt: FieldRef<"Product", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
  }

  /**
   * Product.attributeValues
   */
  export type Product$attributeValuesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttributeValue
     */
    select?: ProductAttributeValueSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeValueInclude<ExtArgs> | null
    where?: ProductAttributeValueWhereInput
    orderBy?: ProductAttributeValueOrderByWithRelationInput | ProductAttributeValueOrderByWithRelationInput[]
    cursor?: ProductAttributeValueWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductAttributeValueScalarFieldEnum | ProductAttributeValueScalarFieldEnum[]
  }

  /**
   * Product.inventoryItems
   */
  export type Product$inventoryItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: InventoryItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryItemInclude<ExtArgs> | null
    where?: InventoryItemWhereInput
    orderBy?: InventoryItemOrderByWithRelationInput | InventoryItemOrderByWithRelationInput[]
    cursor?: InventoryItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InventoryItemScalarFieldEnum | InventoryItemScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model ProductAttributeValue
   */

  export type AggregateProductAttributeValue = {
    _count: ProductAttributeValueCountAggregateOutputType | null
    _avg: ProductAttributeValueAvgAggregateOutputType | null
    _sum: ProductAttributeValueSumAggregateOutputType | null
    _min: ProductAttributeValueMinAggregateOutputType | null
    _max: ProductAttributeValueMaxAggregateOutputType | null
  }

  export type ProductAttributeValueAvgAggregateOutputType = {
    id: number | null
    productId: number | null
    attributeId: number | null
  }

  export type ProductAttributeValueSumAggregateOutputType = {
    id: number | null
    productId: number | null
    attributeId: number | null
  }

  export type ProductAttributeValueMinAggregateOutputType = {
    id: number | null
    productId: number | null
    attributeId: number | null
    value: string | null
  }

  export type ProductAttributeValueMaxAggregateOutputType = {
    id: number | null
    productId: number | null
    attributeId: number | null
    value: string | null
  }

  export type ProductAttributeValueCountAggregateOutputType = {
    id: number
    productId: number
    attributeId: number
    value: number
    _all: number
  }


  export type ProductAttributeValueAvgAggregateInputType = {
    id?: true
    productId?: true
    attributeId?: true
  }

  export type ProductAttributeValueSumAggregateInputType = {
    id?: true
    productId?: true
    attributeId?: true
  }

  export type ProductAttributeValueMinAggregateInputType = {
    id?: true
    productId?: true
    attributeId?: true
    value?: true
  }

  export type ProductAttributeValueMaxAggregateInputType = {
    id?: true
    productId?: true
    attributeId?: true
    value?: true
  }

  export type ProductAttributeValueCountAggregateInputType = {
    id?: true
    productId?: true
    attributeId?: true
    value?: true
    _all?: true
  }

  export type ProductAttributeValueAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductAttributeValue to aggregate.
     */
    where?: ProductAttributeValueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductAttributeValues to fetch.
     */
    orderBy?: ProductAttributeValueOrderByWithRelationInput | ProductAttributeValueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductAttributeValueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductAttributeValues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductAttributeValues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductAttributeValues
    **/
    _count?: true | ProductAttributeValueCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAttributeValueAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductAttributeValueSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductAttributeValueMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductAttributeValueMaxAggregateInputType
  }

  export type GetProductAttributeValueAggregateType<T extends ProductAttributeValueAggregateArgs> = {
        [P in keyof T & keyof AggregateProductAttributeValue]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductAttributeValue[P]>
      : GetScalarType<T[P], AggregateProductAttributeValue[P]>
  }




  export type ProductAttributeValueGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductAttributeValueWhereInput
    orderBy?: ProductAttributeValueOrderByWithAggregationInput | ProductAttributeValueOrderByWithAggregationInput[]
    by: ProductAttributeValueScalarFieldEnum[] | ProductAttributeValueScalarFieldEnum
    having?: ProductAttributeValueScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductAttributeValueCountAggregateInputType | true
    _avg?: ProductAttributeValueAvgAggregateInputType
    _sum?: ProductAttributeValueSumAggregateInputType
    _min?: ProductAttributeValueMinAggregateInputType
    _max?: ProductAttributeValueMaxAggregateInputType
  }

  export type ProductAttributeValueGroupByOutputType = {
    id: number
    productId: number
    attributeId: number
    value: string
    _count: ProductAttributeValueCountAggregateOutputType | null
    _avg: ProductAttributeValueAvgAggregateOutputType | null
    _sum: ProductAttributeValueSumAggregateOutputType | null
    _min: ProductAttributeValueMinAggregateOutputType | null
    _max: ProductAttributeValueMaxAggregateOutputType | null
  }

  type GetProductAttributeValueGroupByPayload<T extends ProductAttributeValueGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductAttributeValueGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductAttributeValueGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductAttributeValueGroupByOutputType[P]>
            : GetScalarType<T[P], ProductAttributeValueGroupByOutputType[P]>
        }
      >
    >


  export type ProductAttributeValueSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    attributeId?: boolean
    value?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productAttributeValue"]>

  export type ProductAttributeValueSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    attributeId?: boolean
    value?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productAttributeValue"]>

  export type ProductAttributeValueSelectScalar = {
    id?: boolean
    productId?: boolean
    attributeId?: boolean
    value?: boolean
  }

  export type ProductAttributeValueInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type ProductAttributeValueIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $ProductAttributeValuePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductAttributeValue"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      productId: number
      attributeId: number
      value: string
    }, ExtArgs["result"]["productAttributeValue"]>
    composites: {}
  }

  type ProductAttributeValueGetPayload<S extends boolean | null | undefined | ProductAttributeValueDefaultArgs> = $Result.GetResult<Prisma.$ProductAttributeValuePayload, S>

  type ProductAttributeValueCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProductAttributeValueFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProductAttributeValueCountAggregateInputType | true
    }

  export interface ProductAttributeValueDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductAttributeValue'], meta: { name: 'ProductAttributeValue' } }
    /**
     * Find zero or one ProductAttributeValue that matches the filter.
     * @param {ProductAttributeValueFindUniqueArgs} args - Arguments to find a ProductAttributeValue
     * @example
     * // Get one ProductAttributeValue
     * const productAttributeValue = await prisma.productAttributeValue.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductAttributeValueFindUniqueArgs>(args: SelectSubset<T, ProductAttributeValueFindUniqueArgs<ExtArgs>>): Prisma__ProductAttributeValueClient<$Result.GetResult<Prisma.$ProductAttributeValuePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ProductAttributeValue that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProductAttributeValueFindUniqueOrThrowArgs} args - Arguments to find a ProductAttributeValue
     * @example
     * // Get one ProductAttributeValue
     * const productAttributeValue = await prisma.productAttributeValue.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductAttributeValueFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductAttributeValueFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductAttributeValueClient<$Result.GetResult<Prisma.$ProductAttributeValuePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ProductAttributeValue that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAttributeValueFindFirstArgs} args - Arguments to find a ProductAttributeValue
     * @example
     * // Get one ProductAttributeValue
     * const productAttributeValue = await prisma.productAttributeValue.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductAttributeValueFindFirstArgs>(args?: SelectSubset<T, ProductAttributeValueFindFirstArgs<ExtArgs>>): Prisma__ProductAttributeValueClient<$Result.GetResult<Prisma.$ProductAttributeValuePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ProductAttributeValue that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAttributeValueFindFirstOrThrowArgs} args - Arguments to find a ProductAttributeValue
     * @example
     * // Get one ProductAttributeValue
     * const productAttributeValue = await prisma.productAttributeValue.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductAttributeValueFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductAttributeValueFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductAttributeValueClient<$Result.GetResult<Prisma.$ProductAttributeValuePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ProductAttributeValues that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAttributeValueFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductAttributeValues
     * const productAttributeValues = await prisma.productAttributeValue.findMany()
     * 
     * // Get first 10 ProductAttributeValues
     * const productAttributeValues = await prisma.productAttributeValue.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productAttributeValueWithIdOnly = await prisma.productAttributeValue.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductAttributeValueFindManyArgs>(args?: SelectSubset<T, ProductAttributeValueFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductAttributeValuePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ProductAttributeValue.
     * @param {ProductAttributeValueCreateArgs} args - Arguments to create a ProductAttributeValue.
     * @example
     * // Create one ProductAttributeValue
     * const ProductAttributeValue = await prisma.productAttributeValue.create({
     *   data: {
     *     // ... data to create a ProductAttributeValue
     *   }
     * })
     * 
     */
    create<T extends ProductAttributeValueCreateArgs>(args: SelectSubset<T, ProductAttributeValueCreateArgs<ExtArgs>>): Prisma__ProductAttributeValueClient<$Result.GetResult<Prisma.$ProductAttributeValuePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ProductAttributeValues.
     * @param {ProductAttributeValueCreateManyArgs} args - Arguments to create many ProductAttributeValues.
     * @example
     * // Create many ProductAttributeValues
     * const productAttributeValue = await prisma.productAttributeValue.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductAttributeValueCreateManyArgs>(args?: SelectSubset<T, ProductAttributeValueCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProductAttributeValues and returns the data saved in the database.
     * @param {ProductAttributeValueCreateManyAndReturnArgs} args - Arguments to create many ProductAttributeValues.
     * @example
     * // Create many ProductAttributeValues
     * const productAttributeValue = await prisma.productAttributeValue.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProductAttributeValues and only return the `id`
     * const productAttributeValueWithIdOnly = await prisma.productAttributeValue.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductAttributeValueCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductAttributeValueCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductAttributeValuePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ProductAttributeValue.
     * @param {ProductAttributeValueDeleteArgs} args - Arguments to delete one ProductAttributeValue.
     * @example
     * // Delete one ProductAttributeValue
     * const ProductAttributeValue = await prisma.productAttributeValue.delete({
     *   where: {
     *     // ... filter to delete one ProductAttributeValue
     *   }
     * })
     * 
     */
    delete<T extends ProductAttributeValueDeleteArgs>(args: SelectSubset<T, ProductAttributeValueDeleteArgs<ExtArgs>>): Prisma__ProductAttributeValueClient<$Result.GetResult<Prisma.$ProductAttributeValuePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ProductAttributeValue.
     * @param {ProductAttributeValueUpdateArgs} args - Arguments to update one ProductAttributeValue.
     * @example
     * // Update one ProductAttributeValue
     * const productAttributeValue = await prisma.productAttributeValue.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductAttributeValueUpdateArgs>(args: SelectSubset<T, ProductAttributeValueUpdateArgs<ExtArgs>>): Prisma__ProductAttributeValueClient<$Result.GetResult<Prisma.$ProductAttributeValuePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ProductAttributeValues.
     * @param {ProductAttributeValueDeleteManyArgs} args - Arguments to filter ProductAttributeValues to delete.
     * @example
     * // Delete a few ProductAttributeValues
     * const { count } = await prisma.productAttributeValue.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductAttributeValueDeleteManyArgs>(args?: SelectSubset<T, ProductAttributeValueDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductAttributeValues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAttributeValueUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductAttributeValues
     * const productAttributeValue = await prisma.productAttributeValue.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductAttributeValueUpdateManyArgs>(args: SelectSubset<T, ProductAttributeValueUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProductAttributeValue.
     * @param {ProductAttributeValueUpsertArgs} args - Arguments to update or create a ProductAttributeValue.
     * @example
     * // Update or create a ProductAttributeValue
     * const productAttributeValue = await prisma.productAttributeValue.upsert({
     *   create: {
     *     // ... data to create a ProductAttributeValue
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductAttributeValue we want to update
     *   }
     * })
     */
    upsert<T extends ProductAttributeValueUpsertArgs>(args: SelectSubset<T, ProductAttributeValueUpsertArgs<ExtArgs>>): Prisma__ProductAttributeValueClient<$Result.GetResult<Prisma.$ProductAttributeValuePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ProductAttributeValues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAttributeValueCountArgs} args - Arguments to filter ProductAttributeValues to count.
     * @example
     * // Count the number of ProductAttributeValues
     * const count = await prisma.productAttributeValue.count({
     *   where: {
     *     // ... the filter for the ProductAttributeValues we want to count
     *   }
     * })
    **/
    count<T extends ProductAttributeValueCountArgs>(
      args?: Subset<T, ProductAttributeValueCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductAttributeValueCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductAttributeValue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAttributeValueAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProductAttributeValueAggregateArgs>(args: Subset<T, ProductAttributeValueAggregateArgs>): Prisma.PrismaPromise<GetProductAttributeValueAggregateType<T>>

    /**
     * Group by ProductAttributeValue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAttributeValueGroupByArgs} args - Group by arguments.
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
      T extends ProductAttributeValueGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductAttributeValueGroupByArgs['orderBy'] }
        : { orderBy?: ProductAttributeValueGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProductAttributeValueGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductAttributeValueGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductAttributeValue model
   */
  readonly fields: ProductAttributeValueFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductAttributeValue.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductAttributeValueClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the ProductAttributeValue model
   */ 
  interface ProductAttributeValueFieldRefs {
    readonly id: FieldRef<"ProductAttributeValue", 'Int'>
    readonly productId: FieldRef<"ProductAttributeValue", 'Int'>
    readonly attributeId: FieldRef<"ProductAttributeValue", 'Int'>
    readonly value: FieldRef<"ProductAttributeValue", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ProductAttributeValue findUnique
   */
  export type ProductAttributeValueFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttributeValue
     */
    select?: ProductAttributeValueSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeValueInclude<ExtArgs> | null
    /**
     * Filter, which ProductAttributeValue to fetch.
     */
    where: ProductAttributeValueWhereUniqueInput
  }

  /**
   * ProductAttributeValue findUniqueOrThrow
   */
  export type ProductAttributeValueFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttributeValue
     */
    select?: ProductAttributeValueSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeValueInclude<ExtArgs> | null
    /**
     * Filter, which ProductAttributeValue to fetch.
     */
    where: ProductAttributeValueWhereUniqueInput
  }

  /**
   * ProductAttributeValue findFirst
   */
  export type ProductAttributeValueFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttributeValue
     */
    select?: ProductAttributeValueSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeValueInclude<ExtArgs> | null
    /**
     * Filter, which ProductAttributeValue to fetch.
     */
    where?: ProductAttributeValueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductAttributeValues to fetch.
     */
    orderBy?: ProductAttributeValueOrderByWithRelationInput | ProductAttributeValueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductAttributeValues.
     */
    cursor?: ProductAttributeValueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductAttributeValues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductAttributeValues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductAttributeValues.
     */
    distinct?: ProductAttributeValueScalarFieldEnum | ProductAttributeValueScalarFieldEnum[]
  }

  /**
   * ProductAttributeValue findFirstOrThrow
   */
  export type ProductAttributeValueFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttributeValue
     */
    select?: ProductAttributeValueSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeValueInclude<ExtArgs> | null
    /**
     * Filter, which ProductAttributeValue to fetch.
     */
    where?: ProductAttributeValueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductAttributeValues to fetch.
     */
    orderBy?: ProductAttributeValueOrderByWithRelationInput | ProductAttributeValueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductAttributeValues.
     */
    cursor?: ProductAttributeValueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductAttributeValues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductAttributeValues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductAttributeValues.
     */
    distinct?: ProductAttributeValueScalarFieldEnum | ProductAttributeValueScalarFieldEnum[]
  }

  /**
   * ProductAttributeValue findMany
   */
  export type ProductAttributeValueFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttributeValue
     */
    select?: ProductAttributeValueSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeValueInclude<ExtArgs> | null
    /**
     * Filter, which ProductAttributeValues to fetch.
     */
    where?: ProductAttributeValueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductAttributeValues to fetch.
     */
    orderBy?: ProductAttributeValueOrderByWithRelationInput | ProductAttributeValueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductAttributeValues.
     */
    cursor?: ProductAttributeValueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductAttributeValues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductAttributeValues.
     */
    skip?: number
    distinct?: ProductAttributeValueScalarFieldEnum | ProductAttributeValueScalarFieldEnum[]
  }

  /**
   * ProductAttributeValue create
   */
  export type ProductAttributeValueCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttributeValue
     */
    select?: ProductAttributeValueSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeValueInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductAttributeValue.
     */
    data: XOR<ProductAttributeValueCreateInput, ProductAttributeValueUncheckedCreateInput>
  }

  /**
   * ProductAttributeValue createMany
   */
  export type ProductAttributeValueCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductAttributeValues.
     */
    data: ProductAttributeValueCreateManyInput | ProductAttributeValueCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductAttributeValue createManyAndReturn
   */
  export type ProductAttributeValueCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttributeValue
     */
    select?: ProductAttributeValueSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ProductAttributeValues.
     */
    data: ProductAttributeValueCreateManyInput | ProductAttributeValueCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeValueIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductAttributeValue update
   */
  export type ProductAttributeValueUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttributeValue
     */
    select?: ProductAttributeValueSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeValueInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductAttributeValue.
     */
    data: XOR<ProductAttributeValueUpdateInput, ProductAttributeValueUncheckedUpdateInput>
    /**
     * Choose, which ProductAttributeValue to update.
     */
    where: ProductAttributeValueWhereUniqueInput
  }

  /**
   * ProductAttributeValue updateMany
   */
  export type ProductAttributeValueUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductAttributeValues.
     */
    data: XOR<ProductAttributeValueUpdateManyMutationInput, ProductAttributeValueUncheckedUpdateManyInput>
    /**
     * Filter which ProductAttributeValues to update
     */
    where?: ProductAttributeValueWhereInput
  }

  /**
   * ProductAttributeValue upsert
   */
  export type ProductAttributeValueUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttributeValue
     */
    select?: ProductAttributeValueSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeValueInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductAttributeValue to update in case it exists.
     */
    where: ProductAttributeValueWhereUniqueInput
    /**
     * In case the ProductAttributeValue found by the `where` argument doesn't exist, create a new ProductAttributeValue with this data.
     */
    create: XOR<ProductAttributeValueCreateInput, ProductAttributeValueUncheckedCreateInput>
    /**
     * In case the ProductAttributeValue was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductAttributeValueUpdateInput, ProductAttributeValueUncheckedUpdateInput>
  }

  /**
   * ProductAttributeValue delete
   */
  export type ProductAttributeValueDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttributeValue
     */
    select?: ProductAttributeValueSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeValueInclude<ExtArgs> | null
    /**
     * Filter which ProductAttributeValue to delete.
     */
    where: ProductAttributeValueWhereUniqueInput
  }

  /**
   * ProductAttributeValue deleteMany
   */
  export type ProductAttributeValueDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductAttributeValues to delete
     */
    where?: ProductAttributeValueWhereInput
  }

  /**
   * ProductAttributeValue without action
   */
  export type ProductAttributeValueDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttributeValue
     */
    select?: ProductAttributeValueSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeValueInclude<ExtArgs> | null
  }


  /**
   * Model Warehouse
   */

  export type AggregateWarehouse = {
    _count: WarehouseCountAggregateOutputType | null
    _avg: WarehouseAvgAggregateOutputType | null
    _sum: WarehouseSumAggregateOutputType | null
    _min: WarehouseMinAggregateOutputType | null
    _max: WarehouseMaxAggregateOutputType | null
  }

  export type WarehouseAvgAggregateOutputType = {
    id: number | null
  }

  export type WarehouseSumAggregateOutputType = {
    id: number | null
  }

  export type WarehouseMinAggregateOutputType = {
    id: number | null
    name: string | null
    location: string | null
    status: $Enums.WarehouseStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WarehouseMaxAggregateOutputType = {
    id: number | null
    name: string | null
    location: string | null
    status: $Enums.WarehouseStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WarehouseCountAggregateOutputType = {
    id: number
    name: number
    location: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WarehouseAvgAggregateInputType = {
    id?: true
  }

  export type WarehouseSumAggregateInputType = {
    id?: true
  }

  export type WarehouseMinAggregateInputType = {
    id?: true
    name?: true
    location?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WarehouseMaxAggregateInputType = {
    id?: true
    name?: true
    location?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WarehouseCountAggregateInputType = {
    id?: true
    name?: true
    location?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WarehouseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Warehouse to aggregate.
     */
    where?: WarehouseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Warehouses to fetch.
     */
    orderBy?: WarehouseOrderByWithRelationInput | WarehouseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WarehouseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Warehouses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Warehouses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Warehouses
    **/
    _count?: true | WarehouseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WarehouseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WarehouseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WarehouseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WarehouseMaxAggregateInputType
  }

  export type GetWarehouseAggregateType<T extends WarehouseAggregateArgs> = {
        [P in keyof T & keyof AggregateWarehouse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWarehouse[P]>
      : GetScalarType<T[P], AggregateWarehouse[P]>
  }




  export type WarehouseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WarehouseWhereInput
    orderBy?: WarehouseOrderByWithAggregationInput | WarehouseOrderByWithAggregationInput[]
    by: WarehouseScalarFieldEnum[] | WarehouseScalarFieldEnum
    having?: WarehouseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WarehouseCountAggregateInputType | true
    _avg?: WarehouseAvgAggregateInputType
    _sum?: WarehouseSumAggregateInputType
    _min?: WarehouseMinAggregateInputType
    _max?: WarehouseMaxAggregateInputType
  }

  export type WarehouseGroupByOutputType = {
    id: number
    name: string
    location: string | null
    status: $Enums.WarehouseStatus
    createdAt: Date
    updatedAt: Date
    _count: WarehouseCountAggregateOutputType | null
    _avg: WarehouseAvgAggregateOutputType | null
    _sum: WarehouseSumAggregateOutputType | null
    _min: WarehouseMinAggregateOutputType | null
    _max: WarehouseMaxAggregateOutputType | null
  }

  type GetWarehouseGroupByPayload<T extends WarehouseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WarehouseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WarehouseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WarehouseGroupByOutputType[P]>
            : GetScalarType<T[P], WarehouseGroupByOutputType[P]>
        }
      >
    >


  export type WarehouseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    location?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    inventoryItems?: boolean | Warehouse$inventoryItemsArgs<ExtArgs>
    _count?: boolean | WarehouseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["warehouse"]>

  export type WarehouseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    location?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["warehouse"]>

  export type WarehouseSelectScalar = {
    id?: boolean
    name?: boolean
    location?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WarehouseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inventoryItems?: boolean | Warehouse$inventoryItemsArgs<ExtArgs>
    _count?: boolean | WarehouseCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WarehouseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $WarehousePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Warehouse"
    objects: {
      inventoryItems: Prisma.$InventoryItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      location: string | null
      status: $Enums.WarehouseStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["warehouse"]>
    composites: {}
  }

  type WarehouseGetPayload<S extends boolean | null | undefined | WarehouseDefaultArgs> = $Result.GetResult<Prisma.$WarehousePayload, S>

  type WarehouseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<WarehouseFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: WarehouseCountAggregateInputType | true
    }

  export interface WarehouseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Warehouse'], meta: { name: 'Warehouse' } }
    /**
     * Find zero or one Warehouse that matches the filter.
     * @param {WarehouseFindUniqueArgs} args - Arguments to find a Warehouse
     * @example
     * // Get one Warehouse
     * const warehouse = await prisma.warehouse.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WarehouseFindUniqueArgs>(args: SelectSubset<T, WarehouseFindUniqueArgs<ExtArgs>>): Prisma__WarehouseClient<$Result.GetResult<Prisma.$WarehousePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Warehouse that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {WarehouseFindUniqueOrThrowArgs} args - Arguments to find a Warehouse
     * @example
     * // Get one Warehouse
     * const warehouse = await prisma.warehouse.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WarehouseFindUniqueOrThrowArgs>(args: SelectSubset<T, WarehouseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WarehouseClient<$Result.GetResult<Prisma.$WarehousePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Warehouse that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WarehouseFindFirstArgs} args - Arguments to find a Warehouse
     * @example
     * // Get one Warehouse
     * const warehouse = await prisma.warehouse.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WarehouseFindFirstArgs>(args?: SelectSubset<T, WarehouseFindFirstArgs<ExtArgs>>): Prisma__WarehouseClient<$Result.GetResult<Prisma.$WarehousePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Warehouse that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WarehouseFindFirstOrThrowArgs} args - Arguments to find a Warehouse
     * @example
     * // Get one Warehouse
     * const warehouse = await prisma.warehouse.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WarehouseFindFirstOrThrowArgs>(args?: SelectSubset<T, WarehouseFindFirstOrThrowArgs<ExtArgs>>): Prisma__WarehouseClient<$Result.GetResult<Prisma.$WarehousePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Warehouses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WarehouseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Warehouses
     * const warehouses = await prisma.warehouse.findMany()
     * 
     * // Get first 10 Warehouses
     * const warehouses = await prisma.warehouse.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const warehouseWithIdOnly = await prisma.warehouse.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WarehouseFindManyArgs>(args?: SelectSubset<T, WarehouseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WarehousePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Warehouse.
     * @param {WarehouseCreateArgs} args - Arguments to create a Warehouse.
     * @example
     * // Create one Warehouse
     * const Warehouse = await prisma.warehouse.create({
     *   data: {
     *     // ... data to create a Warehouse
     *   }
     * })
     * 
     */
    create<T extends WarehouseCreateArgs>(args: SelectSubset<T, WarehouseCreateArgs<ExtArgs>>): Prisma__WarehouseClient<$Result.GetResult<Prisma.$WarehousePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Warehouses.
     * @param {WarehouseCreateManyArgs} args - Arguments to create many Warehouses.
     * @example
     * // Create many Warehouses
     * const warehouse = await prisma.warehouse.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WarehouseCreateManyArgs>(args?: SelectSubset<T, WarehouseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Warehouses and returns the data saved in the database.
     * @param {WarehouseCreateManyAndReturnArgs} args - Arguments to create many Warehouses.
     * @example
     * // Create many Warehouses
     * const warehouse = await prisma.warehouse.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Warehouses and only return the `id`
     * const warehouseWithIdOnly = await prisma.warehouse.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WarehouseCreateManyAndReturnArgs>(args?: SelectSubset<T, WarehouseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WarehousePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Warehouse.
     * @param {WarehouseDeleteArgs} args - Arguments to delete one Warehouse.
     * @example
     * // Delete one Warehouse
     * const Warehouse = await prisma.warehouse.delete({
     *   where: {
     *     // ... filter to delete one Warehouse
     *   }
     * })
     * 
     */
    delete<T extends WarehouseDeleteArgs>(args: SelectSubset<T, WarehouseDeleteArgs<ExtArgs>>): Prisma__WarehouseClient<$Result.GetResult<Prisma.$WarehousePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Warehouse.
     * @param {WarehouseUpdateArgs} args - Arguments to update one Warehouse.
     * @example
     * // Update one Warehouse
     * const warehouse = await prisma.warehouse.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WarehouseUpdateArgs>(args: SelectSubset<T, WarehouseUpdateArgs<ExtArgs>>): Prisma__WarehouseClient<$Result.GetResult<Prisma.$WarehousePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Warehouses.
     * @param {WarehouseDeleteManyArgs} args - Arguments to filter Warehouses to delete.
     * @example
     * // Delete a few Warehouses
     * const { count } = await prisma.warehouse.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WarehouseDeleteManyArgs>(args?: SelectSubset<T, WarehouseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Warehouses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WarehouseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Warehouses
     * const warehouse = await prisma.warehouse.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WarehouseUpdateManyArgs>(args: SelectSubset<T, WarehouseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Warehouse.
     * @param {WarehouseUpsertArgs} args - Arguments to update or create a Warehouse.
     * @example
     * // Update or create a Warehouse
     * const warehouse = await prisma.warehouse.upsert({
     *   create: {
     *     // ... data to create a Warehouse
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Warehouse we want to update
     *   }
     * })
     */
    upsert<T extends WarehouseUpsertArgs>(args: SelectSubset<T, WarehouseUpsertArgs<ExtArgs>>): Prisma__WarehouseClient<$Result.GetResult<Prisma.$WarehousePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Warehouses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WarehouseCountArgs} args - Arguments to filter Warehouses to count.
     * @example
     * // Count the number of Warehouses
     * const count = await prisma.warehouse.count({
     *   where: {
     *     // ... the filter for the Warehouses we want to count
     *   }
     * })
    **/
    count<T extends WarehouseCountArgs>(
      args?: Subset<T, WarehouseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WarehouseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Warehouse.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WarehouseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WarehouseAggregateArgs>(args: Subset<T, WarehouseAggregateArgs>): Prisma.PrismaPromise<GetWarehouseAggregateType<T>>

    /**
     * Group by Warehouse.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WarehouseGroupByArgs} args - Group by arguments.
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
      T extends WarehouseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WarehouseGroupByArgs['orderBy'] }
        : { orderBy?: WarehouseGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, WarehouseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWarehouseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Warehouse model
   */
  readonly fields: WarehouseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Warehouse.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WarehouseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    inventoryItems<T extends Warehouse$inventoryItemsArgs<ExtArgs> = {}>(args?: Subset<T, Warehouse$inventoryItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InventoryItemPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Warehouse model
   */ 
  interface WarehouseFieldRefs {
    readonly id: FieldRef<"Warehouse", 'Int'>
    readonly name: FieldRef<"Warehouse", 'String'>
    readonly location: FieldRef<"Warehouse", 'String'>
    readonly status: FieldRef<"Warehouse", 'WarehouseStatus'>
    readonly createdAt: FieldRef<"Warehouse", 'DateTime'>
    readonly updatedAt: FieldRef<"Warehouse", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Warehouse findUnique
   */
  export type WarehouseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Warehouse
     */
    select?: WarehouseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WarehouseInclude<ExtArgs> | null
    /**
     * Filter, which Warehouse to fetch.
     */
    where: WarehouseWhereUniqueInput
  }

  /**
   * Warehouse findUniqueOrThrow
   */
  export type WarehouseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Warehouse
     */
    select?: WarehouseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WarehouseInclude<ExtArgs> | null
    /**
     * Filter, which Warehouse to fetch.
     */
    where: WarehouseWhereUniqueInput
  }

  /**
   * Warehouse findFirst
   */
  export type WarehouseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Warehouse
     */
    select?: WarehouseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WarehouseInclude<ExtArgs> | null
    /**
     * Filter, which Warehouse to fetch.
     */
    where?: WarehouseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Warehouses to fetch.
     */
    orderBy?: WarehouseOrderByWithRelationInput | WarehouseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Warehouses.
     */
    cursor?: WarehouseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Warehouses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Warehouses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Warehouses.
     */
    distinct?: WarehouseScalarFieldEnum | WarehouseScalarFieldEnum[]
  }

  /**
   * Warehouse findFirstOrThrow
   */
  export type WarehouseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Warehouse
     */
    select?: WarehouseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WarehouseInclude<ExtArgs> | null
    /**
     * Filter, which Warehouse to fetch.
     */
    where?: WarehouseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Warehouses to fetch.
     */
    orderBy?: WarehouseOrderByWithRelationInput | WarehouseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Warehouses.
     */
    cursor?: WarehouseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Warehouses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Warehouses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Warehouses.
     */
    distinct?: WarehouseScalarFieldEnum | WarehouseScalarFieldEnum[]
  }

  /**
   * Warehouse findMany
   */
  export type WarehouseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Warehouse
     */
    select?: WarehouseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WarehouseInclude<ExtArgs> | null
    /**
     * Filter, which Warehouses to fetch.
     */
    where?: WarehouseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Warehouses to fetch.
     */
    orderBy?: WarehouseOrderByWithRelationInput | WarehouseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Warehouses.
     */
    cursor?: WarehouseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Warehouses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Warehouses.
     */
    skip?: number
    distinct?: WarehouseScalarFieldEnum | WarehouseScalarFieldEnum[]
  }

  /**
   * Warehouse create
   */
  export type WarehouseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Warehouse
     */
    select?: WarehouseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WarehouseInclude<ExtArgs> | null
    /**
     * The data needed to create a Warehouse.
     */
    data: XOR<WarehouseCreateInput, WarehouseUncheckedCreateInput>
  }

  /**
   * Warehouse createMany
   */
  export type WarehouseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Warehouses.
     */
    data: WarehouseCreateManyInput | WarehouseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Warehouse createManyAndReturn
   */
  export type WarehouseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Warehouse
     */
    select?: WarehouseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Warehouses.
     */
    data: WarehouseCreateManyInput | WarehouseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Warehouse update
   */
  export type WarehouseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Warehouse
     */
    select?: WarehouseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WarehouseInclude<ExtArgs> | null
    /**
     * The data needed to update a Warehouse.
     */
    data: XOR<WarehouseUpdateInput, WarehouseUncheckedUpdateInput>
    /**
     * Choose, which Warehouse to update.
     */
    where: WarehouseWhereUniqueInput
  }

  /**
   * Warehouse updateMany
   */
  export type WarehouseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Warehouses.
     */
    data: XOR<WarehouseUpdateManyMutationInput, WarehouseUncheckedUpdateManyInput>
    /**
     * Filter which Warehouses to update
     */
    where?: WarehouseWhereInput
  }

  /**
   * Warehouse upsert
   */
  export type WarehouseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Warehouse
     */
    select?: WarehouseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WarehouseInclude<ExtArgs> | null
    /**
     * The filter to search for the Warehouse to update in case it exists.
     */
    where: WarehouseWhereUniqueInput
    /**
     * In case the Warehouse found by the `where` argument doesn't exist, create a new Warehouse with this data.
     */
    create: XOR<WarehouseCreateInput, WarehouseUncheckedCreateInput>
    /**
     * In case the Warehouse was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WarehouseUpdateInput, WarehouseUncheckedUpdateInput>
  }

  /**
   * Warehouse delete
   */
  export type WarehouseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Warehouse
     */
    select?: WarehouseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WarehouseInclude<ExtArgs> | null
    /**
     * Filter which Warehouse to delete.
     */
    where: WarehouseWhereUniqueInput
  }

  /**
   * Warehouse deleteMany
   */
  export type WarehouseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Warehouses to delete
     */
    where?: WarehouseWhereInput
  }

  /**
   * Warehouse.inventoryItems
   */
  export type Warehouse$inventoryItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: InventoryItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryItemInclude<ExtArgs> | null
    where?: InventoryItemWhereInput
    orderBy?: InventoryItemOrderByWithRelationInput | InventoryItemOrderByWithRelationInput[]
    cursor?: InventoryItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InventoryItemScalarFieldEnum | InventoryItemScalarFieldEnum[]
  }

  /**
   * Warehouse without action
   */
  export type WarehouseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Warehouse
     */
    select?: WarehouseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WarehouseInclude<ExtArgs> | null
  }


  /**
   * Model InventoryItem
   */

  export type AggregateInventoryItem = {
    _count: InventoryItemCountAggregateOutputType | null
    _avg: InventoryItemAvgAggregateOutputType | null
    _sum: InventoryItemSumAggregateOutputType | null
    _min: InventoryItemMinAggregateOutputType | null
    _max: InventoryItemMaxAggregateOutputType | null
  }

  export type InventoryItemAvgAggregateOutputType = {
    id: number | null
    productId: number | null
    warehouseId: number | null
    quantity: number | null
    salePrice: Decimal | null
  }

  export type InventoryItemSumAggregateOutputType = {
    id: number | null
    productId: number | null
    warehouseId: number | null
    quantity: number | null
    salePrice: Decimal | null
  }

  export type InventoryItemMinAggregateOutputType = {
    id: number | null
    productId: number | null
    warehouseId: number | null
    quantity: number | null
    salePrice: Decimal | null
    location: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InventoryItemMaxAggregateOutputType = {
    id: number | null
    productId: number | null
    warehouseId: number | null
    quantity: number | null
    salePrice: Decimal | null
    location: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InventoryItemCountAggregateOutputType = {
    id: number
    productId: number
    warehouseId: number
    quantity: number
    salePrice: number
    location: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type InventoryItemAvgAggregateInputType = {
    id?: true
    productId?: true
    warehouseId?: true
    quantity?: true
    salePrice?: true
  }

  export type InventoryItemSumAggregateInputType = {
    id?: true
    productId?: true
    warehouseId?: true
    quantity?: true
    salePrice?: true
  }

  export type InventoryItemMinAggregateInputType = {
    id?: true
    productId?: true
    warehouseId?: true
    quantity?: true
    salePrice?: true
    location?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InventoryItemMaxAggregateInputType = {
    id?: true
    productId?: true
    warehouseId?: true
    quantity?: true
    salePrice?: true
    location?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InventoryItemCountAggregateInputType = {
    id?: true
    productId?: true
    warehouseId?: true
    quantity?: true
    salePrice?: true
    location?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type InventoryItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InventoryItem to aggregate.
     */
    where?: InventoryItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InventoryItems to fetch.
     */
    orderBy?: InventoryItemOrderByWithRelationInput | InventoryItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InventoryItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InventoryItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InventoryItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InventoryItems
    **/
    _count?: true | InventoryItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InventoryItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InventoryItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InventoryItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InventoryItemMaxAggregateInputType
  }

  export type GetInventoryItemAggregateType<T extends InventoryItemAggregateArgs> = {
        [P in keyof T & keyof AggregateInventoryItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInventoryItem[P]>
      : GetScalarType<T[P], AggregateInventoryItem[P]>
  }




  export type InventoryItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InventoryItemWhereInput
    orderBy?: InventoryItemOrderByWithAggregationInput | InventoryItemOrderByWithAggregationInput[]
    by: InventoryItemScalarFieldEnum[] | InventoryItemScalarFieldEnum
    having?: InventoryItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InventoryItemCountAggregateInputType | true
    _avg?: InventoryItemAvgAggregateInputType
    _sum?: InventoryItemSumAggregateInputType
    _min?: InventoryItemMinAggregateInputType
    _max?: InventoryItemMaxAggregateInputType
  }

  export type InventoryItemGroupByOutputType = {
    id: number
    productId: number
    warehouseId: number
    quantity: number
    salePrice: Decimal
    location: string | null
    createdAt: Date
    updatedAt: Date
    _count: InventoryItemCountAggregateOutputType | null
    _avg: InventoryItemAvgAggregateOutputType | null
    _sum: InventoryItemSumAggregateOutputType | null
    _min: InventoryItemMinAggregateOutputType | null
    _max: InventoryItemMaxAggregateOutputType | null
  }

  type GetInventoryItemGroupByPayload<T extends InventoryItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InventoryItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InventoryItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InventoryItemGroupByOutputType[P]>
            : GetScalarType<T[P], InventoryItemGroupByOutputType[P]>
        }
      >
    >


  export type InventoryItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    warehouseId?: boolean
    quantity?: boolean
    salePrice?: boolean
    location?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    warehouse?: boolean | WarehouseDefaultArgs<ExtArgs>
    uniqueBarcodes?: boolean | InventoryItem$uniqueBarcodesArgs<ExtArgs>
    _count?: boolean | InventoryItemCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inventoryItem"]>

  export type InventoryItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    warehouseId?: boolean
    quantity?: boolean
    salePrice?: boolean
    location?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    warehouse?: boolean | WarehouseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inventoryItem"]>

  export type InventoryItemSelectScalar = {
    id?: boolean
    productId?: boolean
    warehouseId?: boolean
    quantity?: boolean
    salePrice?: boolean
    location?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type InventoryItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    warehouse?: boolean | WarehouseDefaultArgs<ExtArgs>
    uniqueBarcodes?: boolean | InventoryItem$uniqueBarcodesArgs<ExtArgs>
    _count?: boolean | InventoryItemCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type InventoryItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    warehouse?: boolean | WarehouseDefaultArgs<ExtArgs>
  }

  export type $InventoryItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InventoryItem"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
      warehouse: Prisma.$WarehousePayload<ExtArgs>
      uniqueBarcodes: Prisma.$UniqueBarcodePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      productId: number
      warehouseId: number
      quantity: number
      salePrice: Prisma.Decimal
      location: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["inventoryItem"]>
    composites: {}
  }

  type InventoryItemGetPayload<S extends boolean | null | undefined | InventoryItemDefaultArgs> = $Result.GetResult<Prisma.$InventoryItemPayload, S>

  type InventoryItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<InventoryItemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: InventoryItemCountAggregateInputType | true
    }

  export interface InventoryItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InventoryItem'], meta: { name: 'InventoryItem' } }
    /**
     * Find zero or one InventoryItem that matches the filter.
     * @param {InventoryItemFindUniqueArgs} args - Arguments to find a InventoryItem
     * @example
     * // Get one InventoryItem
     * const inventoryItem = await prisma.inventoryItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InventoryItemFindUniqueArgs>(args: SelectSubset<T, InventoryItemFindUniqueArgs<ExtArgs>>): Prisma__InventoryItemClient<$Result.GetResult<Prisma.$InventoryItemPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one InventoryItem that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {InventoryItemFindUniqueOrThrowArgs} args - Arguments to find a InventoryItem
     * @example
     * // Get one InventoryItem
     * const inventoryItem = await prisma.inventoryItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InventoryItemFindUniqueOrThrowArgs>(args: SelectSubset<T, InventoryItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InventoryItemClient<$Result.GetResult<Prisma.$InventoryItemPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first InventoryItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryItemFindFirstArgs} args - Arguments to find a InventoryItem
     * @example
     * // Get one InventoryItem
     * const inventoryItem = await prisma.inventoryItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InventoryItemFindFirstArgs>(args?: SelectSubset<T, InventoryItemFindFirstArgs<ExtArgs>>): Prisma__InventoryItemClient<$Result.GetResult<Prisma.$InventoryItemPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first InventoryItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryItemFindFirstOrThrowArgs} args - Arguments to find a InventoryItem
     * @example
     * // Get one InventoryItem
     * const inventoryItem = await prisma.inventoryItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InventoryItemFindFirstOrThrowArgs>(args?: SelectSubset<T, InventoryItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__InventoryItemClient<$Result.GetResult<Prisma.$InventoryItemPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more InventoryItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InventoryItems
     * const inventoryItems = await prisma.inventoryItem.findMany()
     * 
     * // Get first 10 InventoryItems
     * const inventoryItems = await prisma.inventoryItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const inventoryItemWithIdOnly = await prisma.inventoryItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InventoryItemFindManyArgs>(args?: SelectSubset<T, InventoryItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InventoryItemPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a InventoryItem.
     * @param {InventoryItemCreateArgs} args - Arguments to create a InventoryItem.
     * @example
     * // Create one InventoryItem
     * const InventoryItem = await prisma.inventoryItem.create({
     *   data: {
     *     // ... data to create a InventoryItem
     *   }
     * })
     * 
     */
    create<T extends InventoryItemCreateArgs>(args: SelectSubset<T, InventoryItemCreateArgs<ExtArgs>>): Prisma__InventoryItemClient<$Result.GetResult<Prisma.$InventoryItemPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many InventoryItems.
     * @param {InventoryItemCreateManyArgs} args - Arguments to create many InventoryItems.
     * @example
     * // Create many InventoryItems
     * const inventoryItem = await prisma.inventoryItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InventoryItemCreateManyArgs>(args?: SelectSubset<T, InventoryItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many InventoryItems and returns the data saved in the database.
     * @param {InventoryItemCreateManyAndReturnArgs} args - Arguments to create many InventoryItems.
     * @example
     * // Create many InventoryItems
     * const inventoryItem = await prisma.inventoryItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many InventoryItems and only return the `id`
     * const inventoryItemWithIdOnly = await prisma.inventoryItem.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InventoryItemCreateManyAndReturnArgs>(args?: SelectSubset<T, InventoryItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InventoryItemPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a InventoryItem.
     * @param {InventoryItemDeleteArgs} args - Arguments to delete one InventoryItem.
     * @example
     * // Delete one InventoryItem
     * const InventoryItem = await prisma.inventoryItem.delete({
     *   where: {
     *     // ... filter to delete one InventoryItem
     *   }
     * })
     * 
     */
    delete<T extends InventoryItemDeleteArgs>(args: SelectSubset<T, InventoryItemDeleteArgs<ExtArgs>>): Prisma__InventoryItemClient<$Result.GetResult<Prisma.$InventoryItemPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one InventoryItem.
     * @param {InventoryItemUpdateArgs} args - Arguments to update one InventoryItem.
     * @example
     * // Update one InventoryItem
     * const inventoryItem = await prisma.inventoryItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InventoryItemUpdateArgs>(args: SelectSubset<T, InventoryItemUpdateArgs<ExtArgs>>): Prisma__InventoryItemClient<$Result.GetResult<Prisma.$InventoryItemPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more InventoryItems.
     * @param {InventoryItemDeleteManyArgs} args - Arguments to filter InventoryItems to delete.
     * @example
     * // Delete a few InventoryItems
     * const { count } = await prisma.inventoryItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InventoryItemDeleteManyArgs>(args?: SelectSubset<T, InventoryItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InventoryItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InventoryItems
     * const inventoryItem = await prisma.inventoryItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InventoryItemUpdateManyArgs>(args: SelectSubset<T, InventoryItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one InventoryItem.
     * @param {InventoryItemUpsertArgs} args - Arguments to update or create a InventoryItem.
     * @example
     * // Update or create a InventoryItem
     * const inventoryItem = await prisma.inventoryItem.upsert({
     *   create: {
     *     // ... data to create a InventoryItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InventoryItem we want to update
     *   }
     * })
     */
    upsert<T extends InventoryItemUpsertArgs>(args: SelectSubset<T, InventoryItemUpsertArgs<ExtArgs>>): Prisma__InventoryItemClient<$Result.GetResult<Prisma.$InventoryItemPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of InventoryItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryItemCountArgs} args - Arguments to filter InventoryItems to count.
     * @example
     * // Count the number of InventoryItems
     * const count = await prisma.inventoryItem.count({
     *   where: {
     *     // ... the filter for the InventoryItems we want to count
     *   }
     * })
    **/
    count<T extends InventoryItemCountArgs>(
      args?: Subset<T, InventoryItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InventoryItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InventoryItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends InventoryItemAggregateArgs>(args: Subset<T, InventoryItemAggregateArgs>): Prisma.PrismaPromise<GetInventoryItemAggregateType<T>>

    /**
     * Group by InventoryItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryItemGroupByArgs} args - Group by arguments.
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
      T extends InventoryItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InventoryItemGroupByArgs['orderBy'] }
        : { orderBy?: InventoryItemGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, InventoryItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInventoryItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InventoryItem model
   */
  readonly fields: InventoryItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InventoryItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InventoryItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    warehouse<T extends WarehouseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WarehouseDefaultArgs<ExtArgs>>): Prisma__WarehouseClient<$Result.GetResult<Prisma.$WarehousePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    uniqueBarcodes<T extends InventoryItem$uniqueBarcodesArgs<ExtArgs> = {}>(args?: Subset<T, InventoryItem$uniqueBarcodesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UniqueBarcodePayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the InventoryItem model
   */ 
  interface InventoryItemFieldRefs {
    readonly id: FieldRef<"InventoryItem", 'Int'>
    readonly productId: FieldRef<"InventoryItem", 'Int'>
    readonly warehouseId: FieldRef<"InventoryItem", 'Int'>
    readonly quantity: FieldRef<"InventoryItem", 'Int'>
    readonly salePrice: FieldRef<"InventoryItem", 'Decimal'>
    readonly location: FieldRef<"InventoryItem", 'String'>
    readonly createdAt: FieldRef<"InventoryItem", 'DateTime'>
    readonly updatedAt: FieldRef<"InventoryItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * InventoryItem findUnique
   */
  export type InventoryItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: InventoryItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryItemInclude<ExtArgs> | null
    /**
     * Filter, which InventoryItem to fetch.
     */
    where: InventoryItemWhereUniqueInput
  }

  /**
   * InventoryItem findUniqueOrThrow
   */
  export type InventoryItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: InventoryItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryItemInclude<ExtArgs> | null
    /**
     * Filter, which InventoryItem to fetch.
     */
    where: InventoryItemWhereUniqueInput
  }

  /**
   * InventoryItem findFirst
   */
  export type InventoryItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: InventoryItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryItemInclude<ExtArgs> | null
    /**
     * Filter, which InventoryItem to fetch.
     */
    where?: InventoryItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InventoryItems to fetch.
     */
    orderBy?: InventoryItemOrderByWithRelationInput | InventoryItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InventoryItems.
     */
    cursor?: InventoryItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InventoryItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InventoryItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InventoryItems.
     */
    distinct?: InventoryItemScalarFieldEnum | InventoryItemScalarFieldEnum[]
  }

  /**
   * InventoryItem findFirstOrThrow
   */
  export type InventoryItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: InventoryItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryItemInclude<ExtArgs> | null
    /**
     * Filter, which InventoryItem to fetch.
     */
    where?: InventoryItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InventoryItems to fetch.
     */
    orderBy?: InventoryItemOrderByWithRelationInput | InventoryItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InventoryItems.
     */
    cursor?: InventoryItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InventoryItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InventoryItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InventoryItems.
     */
    distinct?: InventoryItemScalarFieldEnum | InventoryItemScalarFieldEnum[]
  }

  /**
   * InventoryItem findMany
   */
  export type InventoryItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: InventoryItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryItemInclude<ExtArgs> | null
    /**
     * Filter, which InventoryItems to fetch.
     */
    where?: InventoryItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InventoryItems to fetch.
     */
    orderBy?: InventoryItemOrderByWithRelationInput | InventoryItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InventoryItems.
     */
    cursor?: InventoryItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InventoryItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InventoryItems.
     */
    skip?: number
    distinct?: InventoryItemScalarFieldEnum | InventoryItemScalarFieldEnum[]
  }

  /**
   * InventoryItem create
   */
  export type InventoryItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: InventoryItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryItemInclude<ExtArgs> | null
    /**
     * The data needed to create a InventoryItem.
     */
    data: XOR<InventoryItemCreateInput, InventoryItemUncheckedCreateInput>
  }

  /**
   * InventoryItem createMany
   */
  export type InventoryItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InventoryItems.
     */
    data: InventoryItemCreateManyInput | InventoryItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InventoryItem createManyAndReturn
   */
  export type InventoryItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: InventoryItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many InventoryItems.
     */
    data: InventoryItemCreateManyInput | InventoryItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * InventoryItem update
   */
  export type InventoryItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: InventoryItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryItemInclude<ExtArgs> | null
    /**
     * The data needed to update a InventoryItem.
     */
    data: XOR<InventoryItemUpdateInput, InventoryItemUncheckedUpdateInput>
    /**
     * Choose, which InventoryItem to update.
     */
    where: InventoryItemWhereUniqueInput
  }

  /**
   * InventoryItem updateMany
   */
  export type InventoryItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InventoryItems.
     */
    data: XOR<InventoryItemUpdateManyMutationInput, InventoryItemUncheckedUpdateManyInput>
    /**
     * Filter which InventoryItems to update
     */
    where?: InventoryItemWhereInput
  }

  /**
   * InventoryItem upsert
   */
  export type InventoryItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: InventoryItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryItemInclude<ExtArgs> | null
    /**
     * The filter to search for the InventoryItem to update in case it exists.
     */
    where: InventoryItemWhereUniqueInput
    /**
     * In case the InventoryItem found by the `where` argument doesn't exist, create a new InventoryItem with this data.
     */
    create: XOR<InventoryItemCreateInput, InventoryItemUncheckedCreateInput>
    /**
     * In case the InventoryItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InventoryItemUpdateInput, InventoryItemUncheckedUpdateInput>
  }

  /**
   * InventoryItem delete
   */
  export type InventoryItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: InventoryItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryItemInclude<ExtArgs> | null
    /**
     * Filter which InventoryItem to delete.
     */
    where: InventoryItemWhereUniqueInput
  }

  /**
   * InventoryItem deleteMany
   */
  export type InventoryItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InventoryItems to delete
     */
    where?: InventoryItemWhereInput
  }

  /**
   * InventoryItem.uniqueBarcodes
   */
  export type InventoryItem$uniqueBarcodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UniqueBarcode
     */
    select?: UniqueBarcodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UniqueBarcodeInclude<ExtArgs> | null
    where?: UniqueBarcodeWhereInput
    orderBy?: UniqueBarcodeOrderByWithRelationInput | UniqueBarcodeOrderByWithRelationInput[]
    cursor?: UniqueBarcodeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UniqueBarcodeScalarFieldEnum | UniqueBarcodeScalarFieldEnum[]
  }

  /**
   * InventoryItem without action
   */
  export type InventoryItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: InventoryItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryItemInclude<ExtArgs> | null
  }


  /**
   * Model UniqueBarcode
   */

  export type AggregateUniqueBarcode = {
    _count: UniqueBarcodeCountAggregateOutputType | null
    _avg: UniqueBarcodeAvgAggregateOutputType | null
    _sum: UniqueBarcodeSumAggregateOutputType | null
    _min: UniqueBarcodeMinAggregateOutputType | null
    _max: UniqueBarcodeMaxAggregateOutputType | null
  }

  export type UniqueBarcodeAvgAggregateOutputType = {
    id: number | null
    inventoryItemId: number | null
  }

  export type UniqueBarcodeSumAggregateOutputType = {
    id: number | null
    inventoryItemId: number | null
  }

  export type UniqueBarcodeMinAggregateOutputType = {
    id: number | null
    inventoryItemId: number | null
    barcode: string | null
    createdAt: Date | null
  }

  export type UniqueBarcodeMaxAggregateOutputType = {
    id: number | null
    inventoryItemId: number | null
    barcode: string | null
    createdAt: Date | null
  }

  export type UniqueBarcodeCountAggregateOutputType = {
    id: number
    inventoryItemId: number
    barcode: number
    createdAt: number
    _all: number
  }


  export type UniqueBarcodeAvgAggregateInputType = {
    id?: true
    inventoryItemId?: true
  }

  export type UniqueBarcodeSumAggregateInputType = {
    id?: true
    inventoryItemId?: true
  }

  export type UniqueBarcodeMinAggregateInputType = {
    id?: true
    inventoryItemId?: true
    barcode?: true
    createdAt?: true
  }

  export type UniqueBarcodeMaxAggregateInputType = {
    id?: true
    inventoryItemId?: true
    barcode?: true
    createdAt?: true
  }

  export type UniqueBarcodeCountAggregateInputType = {
    id?: true
    inventoryItemId?: true
    barcode?: true
    createdAt?: true
    _all?: true
  }

  export type UniqueBarcodeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UniqueBarcode to aggregate.
     */
    where?: UniqueBarcodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UniqueBarcodes to fetch.
     */
    orderBy?: UniqueBarcodeOrderByWithRelationInput | UniqueBarcodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UniqueBarcodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UniqueBarcodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UniqueBarcodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UniqueBarcodes
    **/
    _count?: true | UniqueBarcodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UniqueBarcodeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UniqueBarcodeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UniqueBarcodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UniqueBarcodeMaxAggregateInputType
  }

  export type GetUniqueBarcodeAggregateType<T extends UniqueBarcodeAggregateArgs> = {
        [P in keyof T & keyof AggregateUniqueBarcode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUniqueBarcode[P]>
      : GetScalarType<T[P], AggregateUniqueBarcode[P]>
  }




  export type UniqueBarcodeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UniqueBarcodeWhereInput
    orderBy?: UniqueBarcodeOrderByWithAggregationInput | UniqueBarcodeOrderByWithAggregationInput[]
    by: UniqueBarcodeScalarFieldEnum[] | UniqueBarcodeScalarFieldEnum
    having?: UniqueBarcodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UniqueBarcodeCountAggregateInputType | true
    _avg?: UniqueBarcodeAvgAggregateInputType
    _sum?: UniqueBarcodeSumAggregateInputType
    _min?: UniqueBarcodeMinAggregateInputType
    _max?: UniqueBarcodeMaxAggregateInputType
  }

  export type UniqueBarcodeGroupByOutputType = {
    id: number
    inventoryItemId: number
    barcode: string
    createdAt: Date
    _count: UniqueBarcodeCountAggregateOutputType | null
    _avg: UniqueBarcodeAvgAggregateOutputType | null
    _sum: UniqueBarcodeSumAggregateOutputType | null
    _min: UniqueBarcodeMinAggregateOutputType | null
    _max: UniqueBarcodeMaxAggregateOutputType | null
  }

  type GetUniqueBarcodeGroupByPayload<T extends UniqueBarcodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UniqueBarcodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UniqueBarcodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UniqueBarcodeGroupByOutputType[P]>
            : GetScalarType<T[P], UniqueBarcodeGroupByOutputType[P]>
        }
      >
    >


  export type UniqueBarcodeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    inventoryItemId?: boolean
    barcode?: boolean
    createdAt?: boolean
    inventoryItem?: boolean | InventoryItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["uniqueBarcode"]>

  export type UniqueBarcodeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    inventoryItemId?: boolean
    barcode?: boolean
    createdAt?: boolean
    inventoryItem?: boolean | InventoryItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["uniqueBarcode"]>

  export type UniqueBarcodeSelectScalar = {
    id?: boolean
    inventoryItemId?: boolean
    barcode?: boolean
    createdAt?: boolean
  }

  export type UniqueBarcodeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inventoryItem?: boolean | InventoryItemDefaultArgs<ExtArgs>
  }
  export type UniqueBarcodeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inventoryItem?: boolean | InventoryItemDefaultArgs<ExtArgs>
  }

  export type $UniqueBarcodePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UniqueBarcode"
    objects: {
      inventoryItem: Prisma.$InventoryItemPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      inventoryItemId: number
      barcode: string
      createdAt: Date
    }, ExtArgs["result"]["uniqueBarcode"]>
    composites: {}
  }

  type UniqueBarcodeGetPayload<S extends boolean | null | undefined | UniqueBarcodeDefaultArgs> = $Result.GetResult<Prisma.$UniqueBarcodePayload, S>

  type UniqueBarcodeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UniqueBarcodeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UniqueBarcodeCountAggregateInputType | true
    }

  export interface UniqueBarcodeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UniqueBarcode'], meta: { name: 'UniqueBarcode' } }
    /**
     * Find zero or one UniqueBarcode that matches the filter.
     * @param {UniqueBarcodeFindUniqueArgs} args - Arguments to find a UniqueBarcode
     * @example
     * // Get one UniqueBarcode
     * const uniqueBarcode = await prisma.uniqueBarcode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UniqueBarcodeFindUniqueArgs>(args: SelectSubset<T, UniqueBarcodeFindUniqueArgs<ExtArgs>>): Prisma__UniqueBarcodeClient<$Result.GetResult<Prisma.$UniqueBarcodePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one UniqueBarcode that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UniqueBarcodeFindUniqueOrThrowArgs} args - Arguments to find a UniqueBarcode
     * @example
     * // Get one UniqueBarcode
     * const uniqueBarcode = await prisma.uniqueBarcode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UniqueBarcodeFindUniqueOrThrowArgs>(args: SelectSubset<T, UniqueBarcodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UniqueBarcodeClient<$Result.GetResult<Prisma.$UniqueBarcodePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first UniqueBarcode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UniqueBarcodeFindFirstArgs} args - Arguments to find a UniqueBarcode
     * @example
     * // Get one UniqueBarcode
     * const uniqueBarcode = await prisma.uniqueBarcode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UniqueBarcodeFindFirstArgs>(args?: SelectSubset<T, UniqueBarcodeFindFirstArgs<ExtArgs>>): Prisma__UniqueBarcodeClient<$Result.GetResult<Prisma.$UniqueBarcodePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first UniqueBarcode that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UniqueBarcodeFindFirstOrThrowArgs} args - Arguments to find a UniqueBarcode
     * @example
     * // Get one UniqueBarcode
     * const uniqueBarcode = await prisma.uniqueBarcode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UniqueBarcodeFindFirstOrThrowArgs>(args?: SelectSubset<T, UniqueBarcodeFindFirstOrThrowArgs<ExtArgs>>): Prisma__UniqueBarcodeClient<$Result.GetResult<Prisma.$UniqueBarcodePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more UniqueBarcodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UniqueBarcodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UniqueBarcodes
     * const uniqueBarcodes = await prisma.uniqueBarcode.findMany()
     * 
     * // Get first 10 UniqueBarcodes
     * const uniqueBarcodes = await prisma.uniqueBarcode.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const uniqueBarcodeWithIdOnly = await prisma.uniqueBarcode.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UniqueBarcodeFindManyArgs>(args?: SelectSubset<T, UniqueBarcodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UniqueBarcodePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a UniqueBarcode.
     * @param {UniqueBarcodeCreateArgs} args - Arguments to create a UniqueBarcode.
     * @example
     * // Create one UniqueBarcode
     * const UniqueBarcode = await prisma.uniqueBarcode.create({
     *   data: {
     *     // ... data to create a UniqueBarcode
     *   }
     * })
     * 
     */
    create<T extends UniqueBarcodeCreateArgs>(args: SelectSubset<T, UniqueBarcodeCreateArgs<ExtArgs>>): Prisma__UniqueBarcodeClient<$Result.GetResult<Prisma.$UniqueBarcodePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many UniqueBarcodes.
     * @param {UniqueBarcodeCreateManyArgs} args - Arguments to create many UniqueBarcodes.
     * @example
     * // Create many UniqueBarcodes
     * const uniqueBarcode = await prisma.uniqueBarcode.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UniqueBarcodeCreateManyArgs>(args?: SelectSubset<T, UniqueBarcodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UniqueBarcodes and returns the data saved in the database.
     * @param {UniqueBarcodeCreateManyAndReturnArgs} args - Arguments to create many UniqueBarcodes.
     * @example
     * // Create many UniqueBarcodes
     * const uniqueBarcode = await prisma.uniqueBarcode.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UniqueBarcodes and only return the `id`
     * const uniqueBarcodeWithIdOnly = await prisma.uniqueBarcode.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UniqueBarcodeCreateManyAndReturnArgs>(args?: SelectSubset<T, UniqueBarcodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UniqueBarcodePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a UniqueBarcode.
     * @param {UniqueBarcodeDeleteArgs} args - Arguments to delete one UniqueBarcode.
     * @example
     * // Delete one UniqueBarcode
     * const UniqueBarcode = await prisma.uniqueBarcode.delete({
     *   where: {
     *     // ... filter to delete one UniqueBarcode
     *   }
     * })
     * 
     */
    delete<T extends UniqueBarcodeDeleteArgs>(args: SelectSubset<T, UniqueBarcodeDeleteArgs<ExtArgs>>): Prisma__UniqueBarcodeClient<$Result.GetResult<Prisma.$UniqueBarcodePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one UniqueBarcode.
     * @param {UniqueBarcodeUpdateArgs} args - Arguments to update one UniqueBarcode.
     * @example
     * // Update one UniqueBarcode
     * const uniqueBarcode = await prisma.uniqueBarcode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UniqueBarcodeUpdateArgs>(args: SelectSubset<T, UniqueBarcodeUpdateArgs<ExtArgs>>): Prisma__UniqueBarcodeClient<$Result.GetResult<Prisma.$UniqueBarcodePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more UniqueBarcodes.
     * @param {UniqueBarcodeDeleteManyArgs} args - Arguments to filter UniqueBarcodes to delete.
     * @example
     * // Delete a few UniqueBarcodes
     * const { count } = await prisma.uniqueBarcode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UniqueBarcodeDeleteManyArgs>(args?: SelectSubset<T, UniqueBarcodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UniqueBarcodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UniqueBarcodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UniqueBarcodes
     * const uniqueBarcode = await prisma.uniqueBarcode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UniqueBarcodeUpdateManyArgs>(args: SelectSubset<T, UniqueBarcodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UniqueBarcode.
     * @param {UniqueBarcodeUpsertArgs} args - Arguments to update or create a UniqueBarcode.
     * @example
     * // Update or create a UniqueBarcode
     * const uniqueBarcode = await prisma.uniqueBarcode.upsert({
     *   create: {
     *     // ... data to create a UniqueBarcode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UniqueBarcode we want to update
     *   }
     * })
     */
    upsert<T extends UniqueBarcodeUpsertArgs>(args: SelectSubset<T, UniqueBarcodeUpsertArgs<ExtArgs>>): Prisma__UniqueBarcodeClient<$Result.GetResult<Prisma.$UniqueBarcodePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of UniqueBarcodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UniqueBarcodeCountArgs} args - Arguments to filter UniqueBarcodes to count.
     * @example
     * // Count the number of UniqueBarcodes
     * const count = await prisma.uniqueBarcode.count({
     *   where: {
     *     // ... the filter for the UniqueBarcodes we want to count
     *   }
     * })
    **/
    count<T extends UniqueBarcodeCountArgs>(
      args?: Subset<T, UniqueBarcodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UniqueBarcodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UniqueBarcode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UniqueBarcodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UniqueBarcodeAggregateArgs>(args: Subset<T, UniqueBarcodeAggregateArgs>): Prisma.PrismaPromise<GetUniqueBarcodeAggregateType<T>>

    /**
     * Group by UniqueBarcode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UniqueBarcodeGroupByArgs} args - Group by arguments.
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
      T extends UniqueBarcodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UniqueBarcodeGroupByArgs['orderBy'] }
        : { orderBy?: UniqueBarcodeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UniqueBarcodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUniqueBarcodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UniqueBarcode model
   */
  readonly fields: UniqueBarcodeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UniqueBarcode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UniqueBarcodeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    inventoryItem<T extends InventoryItemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InventoryItemDefaultArgs<ExtArgs>>): Prisma__InventoryItemClient<$Result.GetResult<Prisma.$InventoryItemPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the UniqueBarcode model
   */ 
  interface UniqueBarcodeFieldRefs {
    readonly id: FieldRef<"UniqueBarcode", 'Int'>
    readonly inventoryItemId: FieldRef<"UniqueBarcode", 'Int'>
    readonly barcode: FieldRef<"UniqueBarcode", 'String'>
    readonly createdAt: FieldRef<"UniqueBarcode", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UniqueBarcode findUnique
   */
  export type UniqueBarcodeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UniqueBarcode
     */
    select?: UniqueBarcodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UniqueBarcodeInclude<ExtArgs> | null
    /**
     * Filter, which UniqueBarcode to fetch.
     */
    where: UniqueBarcodeWhereUniqueInput
  }

  /**
   * UniqueBarcode findUniqueOrThrow
   */
  export type UniqueBarcodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UniqueBarcode
     */
    select?: UniqueBarcodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UniqueBarcodeInclude<ExtArgs> | null
    /**
     * Filter, which UniqueBarcode to fetch.
     */
    where: UniqueBarcodeWhereUniqueInput
  }

  /**
   * UniqueBarcode findFirst
   */
  export type UniqueBarcodeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UniqueBarcode
     */
    select?: UniqueBarcodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UniqueBarcodeInclude<ExtArgs> | null
    /**
     * Filter, which UniqueBarcode to fetch.
     */
    where?: UniqueBarcodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UniqueBarcodes to fetch.
     */
    orderBy?: UniqueBarcodeOrderByWithRelationInput | UniqueBarcodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UniqueBarcodes.
     */
    cursor?: UniqueBarcodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UniqueBarcodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UniqueBarcodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UniqueBarcodes.
     */
    distinct?: UniqueBarcodeScalarFieldEnum | UniqueBarcodeScalarFieldEnum[]
  }

  /**
   * UniqueBarcode findFirstOrThrow
   */
  export type UniqueBarcodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UniqueBarcode
     */
    select?: UniqueBarcodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UniqueBarcodeInclude<ExtArgs> | null
    /**
     * Filter, which UniqueBarcode to fetch.
     */
    where?: UniqueBarcodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UniqueBarcodes to fetch.
     */
    orderBy?: UniqueBarcodeOrderByWithRelationInput | UniqueBarcodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UniqueBarcodes.
     */
    cursor?: UniqueBarcodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UniqueBarcodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UniqueBarcodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UniqueBarcodes.
     */
    distinct?: UniqueBarcodeScalarFieldEnum | UniqueBarcodeScalarFieldEnum[]
  }

  /**
   * UniqueBarcode findMany
   */
  export type UniqueBarcodeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UniqueBarcode
     */
    select?: UniqueBarcodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UniqueBarcodeInclude<ExtArgs> | null
    /**
     * Filter, which UniqueBarcodes to fetch.
     */
    where?: UniqueBarcodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UniqueBarcodes to fetch.
     */
    orderBy?: UniqueBarcodeOrderByWithRelationInput | UniqueBarcodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UniqueBarcodes.
     */
    cursor?: UniqueBarcodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UniqueBarcodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UniqueBarcodes.
     */
    skip?: number
    distinct?: UniqueBarcodeScalarFieldEnum | UniqueBarcodeScalarFieldEnum[]
  }

  /**
   * UniqueBarcode create
   */
  export type UniqueBarcodeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UniqueBarcode
     */
    select?: UniqueBarcodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UniqueBarcodeInclude<ExtArgs> | null
    /**
     * The data needed to create a UniqueBarcode.
     */
    data: XOR<UniqueBarcodeCreateInput, UniqueBarcodeUncheckedCreateInput>
  }

  /**
   * UniqueBarcode createMany
   */
  export type UniqueBarcodeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UniqueBarcodes.
     */
    data: UniqueBarcodeCreateManyInput | UniqueBarcodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UniqueBarcode createManyAndReturn
   */
  export type UniqueBarcodeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UniqueBarcode
     */
    select?: UniqueBarcodeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many UniqueBarcodes.
     */
    data: UniqueBarcodeCreateManyInput | UniqueBarcodeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UniqueBarcodeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UniqueBarcode update
   */
  export type UniqueBarcodeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UniqueBarcode
     */
    select?: UniqueBarcodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UniqueBarcodeInclude<ExtArgs> | null
    /**
     * The data needed to update a UniqueBarcode.
     */
    data: XOR<UniqueBarcodeUpdateInput, UniqueBarcodeUncheckedUpdateInput>
    /**
     * Choose, which UniqueBarcode to update.
     */
    where: UniqueBarcodeWhereUniqueInput
  }

  /**
   * UniqueBarcode updateMany
   */
  export type UniqueBarcodeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UniqueBarcodes.
     */
    data: XOR<UniqueBarcodeUpdateManyMutationInput, UniqueBarcodeUncheckedUpdateManyInput>
    /**
     * Filter which UniqueBarcodes to update
     */
    where?: UniqueBarcodeWhereInput
  }

  /**
   * UniqueBarcode upsert
   */
  export type UniqueBarcodeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UniqueBarcode
     */
    select?: UniqueBarcodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UniqueBarcodeInclude<ExtArgs> | null
    /**
     * The filter to search for the UniqueBarcode to update in case it exists.
     */
    where: UniqueBarcodeWhereUniqueInput
    /**
     * In case the UniqueBarcode found by the `where` argument doesn't exist, create a new UniqueBarcode with this data.
     */
    create: XOR<UniqueBarcodeCreateInput, UniqueBarcodeUncheckedCreateInput>
    /**
     * In case the UniqueBarcode was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UniqueBarcodeUpdateInput, UniqueBarcodeUncheckedUpdateInput>
  }

  /**
   * UniqueBarcode delete
   */
  export type UniqueBarcodeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UniqueBarcode
     */
    select?: UniqueBarcodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UniqueBarcodeInclude<ExtArgs> | null
    /**
     * Filter which UniqueBarcode to delete.
     */
    where: UniqueBarcodeWhereUniqueInput
  }

  /**
   * UniqueBarcode deleteMany
   */
  export type UniqueBarcodeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UniqueBarcodes to delete
     */
    where?: UniqueBarcodeWhereInput
  }

  /**
   * UniqueBarcode without action
   */
  export type UniqueBarcodeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UniqueBarcode
     */
    select?: UniqueBarcodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UniqueBarcodeInclude<ExtArgs> | null
  }


  /**
   * Model Company
   */

  export type AggregateCompany = {
    _count: CompanyCountAggregateOutputType | null
    _avg: CompanyAvgAggregateOutputType | null
    _sum: CompanySumAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  export type CompanyAvgAggregateOutputType = {
    id: number | null
  }

  export type CompanySumAggregateOutputType = {
    id: number | null
  }

  export type CompanyMinAggregateOutputType = {
    id: number | null
    name: string | null
    ownerName: string | null
    address: string | null
    gstNumber: string | null
    contact: string | null
    email: string | null
    logoUrl: string | null
    bankName: string | null
    branchName: string | null
    accountName: string | null
    accountNumber: string | null
    ifscCode: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CompanyMaxAggregateOutputType = {
    id: number | null
    name: string | null
    ownerName: string | null
    address: string | null
    gstNumber: string | null
    contact: string | null
    email: string | null
    logoUrl: string | null
    bankName: string | null
    branchName: string | null
    accountName: string | null
    accountNumber: string | null
    ifscCode: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CompanyCountAggregateOutputType = {
    id: number
    name: number
    ownerName: number
    address: number
    gstNumber: number
    contact: number
    email: number
    logoUrl: number
    bankName: number
    branchName: number
    accountName: number
    accountNumber: number
    ifscCode: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CompanyAvgAggregateInputType = {
    id?: true
  }

  export type CompanySumAggregateInputType = {
    id?: true
  }

  export type CompanyMinAggregateInputType = {
    id?: true
    name?: true
    ownerName?: true
    address?: true
    gstNumber?: true
    contact?: true
    email?: true
    logoUrl?: true
    bankName?: true
    branchName?: true
    accountName?: true
    accountNumber?: true
    ifscCode?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CompanyMaxAggregateInputType = {
    id?: true
    name?: true
    ownerName?: true
    address?: true
    gstNumber?: true
    contact?: true
    email?: true
    logoUrl?: true
    bankName?: true
    branchName?: true
    accountName?: true
    accountNumber?: true
    ifscCode?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CompanyCountAggregateInputType = {
    id?: true
    name?: true
    ownerName?: true
    address?: true
    gstNumber?: true
    contact?: true
    email?: true
    logoUrl?: true
    bankName?: true
    branchName?: true
    accountName?: true
    accountNumber?: true
    ifscCode?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CompanyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Company to aggregate.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Companies
    **/
    _count?: true | CompanyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CompanyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CompanySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanyMaxAggregateInputType
  }

  export type GetCompanyAggregateType<T extends CompanyAggregateArgs> = {
        [P in keyof T & keyof AggregateCompany]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompany[P]>
      : GetScalarType<T[P], AggregateCompany[P]>
  }




  export type CompanyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyWhereInput
    orderBy?: CompanyOrderByWithAggregationInput | CompanyOrderByWithAggregationInput[]
    by: CompanyScalarFieldEnum[] | CompanyScalarFieldEnum
    having?: CompanyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanyCountAggregateInputType | true
    _avg?: CompanyAvgAggregateInputType
    _sum?: CompanySumAggregateInputType
    _min?: CompanyMinAggregateInputType
    _max?: CompanyMaxAggregateInputType
  }

  export type CompanyGroupByOutputType = {
    id: number
    name: string
    ownerName: string | null
    address: string | null
    gstNumber: string | null
    contact: string | null
    email: string | null
    logoUrl: string | null
    bankName: string | null
    branchName: string | null
    accountName: string | null
    accountNumber: string | null
    ifscCode: string | null
    createdAt: Date
    updatedAt: Date
    _count: CompanyCountAggregateOutputType | null
    _avg: CompanyAvgAggregateOutputType | null
    _sum: CompanySumAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  type GetCompanyGroupByPayload<T extends CompanyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanyGroupByOutputType[P]>
            : GetScalarType<T[P], CompanyGroupByOutputType[P]>
        }
      >
    >


  export type CompanySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    ownerName?: boolean
    address?: boolean
    gstNumber?: boolean
    contact?: boolean
    email?: boolean
    logoUrl?: boolean
    bankName?: boolean
    branchName?: boolean
    accountName?: boolean
    accountNumber?: boolean
    ifscCode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    quotations?: boolean | Company$quotationsArgs<ExtArgs>
    employees?: boolean | Company$employeesArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["company"]>

  export type CompanySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    ownerName?: boolean
    address?: boolean
    gstNumber?: boolean
    contact?: boolean
    email?: boolean
    logoUrl?: boolean
    bankName?: boolean
    branchName?: boolean
    accountName?: boolean
    accountNumber?: boolean
    ifscCode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["company"]>

  export type CompanySelectScalar = {
    id?: boolean
    name?: boolean
    ownerName?: boolean
    address?: boolean
    gstNumber?: boolean
    contact?: boolean
    email?: boolean
    logoUrl?: boolean
    bankName?: boolean
    branchName?: boolean
    accountName?: boolean
    accountNumber?: boolean
    ifscCode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CompanyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quotations?: boolean | Company$quotationsArgs<ExtArgs>
    employees?: boolean | Company$employeesArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CompanyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CompanyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Company"
    objects: {
      quotations: Prisma.$QuotationPayload<ExtArgs>[]
      employees: Prisma.$EmployeePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      ownerName: string | null
      address: string | null
      gstNumber: string | null
      contact: string | null
      email: string | null
      logoUrl: string | null
      bankName: string | null
      branchName: string | null
      accountName: string | null
      accountNumber: string | null
      ifscCode: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["company"]>
    composites: {}
  }

  type CompanyGetPayload<S extends boolean | null | undefined | CompanyDefaultArgs> = $Result.GetResult<Prisma.$CompanyPayload, S>

  type CompanyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CompanyFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CompanyCountAggregateInputType | true
    }

  export interface CompanyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Company'], meta: { name: 'Company' } }
    /**
     * Find zero or one Company that matches the filter.
     * @param {CompanyFindUniqueArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompanyFindUniqueArgs>(args: SelectSubset<T, CompanyFindUniqueArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Company that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CompanyFindUniqueOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompanyFindUniqueOrThrowArgs>(args: SelectSubset<T, CompanyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Company that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompanyFindFirstArgs>(args?: SelectSubset<T, CompanyFindFirstArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Company that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompanyFindFirstOrThrowArgs>(args?: SelectSubset<T, CompanyFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Companies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Companies
     * const companies = await prisma.company.findMany()
     * 
     * // Get first 10 Companies
     * const companies = await prisma.company.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const companyWithIdOnly = await prisma.company.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompanyFindManyArgs>(args?: SelectSubset<T, CompanyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Company.
     * @param {CompanyCreateArgs} args - Arguments to create a Company.
     * @example
     * // Create one Company
     * const Company = await prisma.company.create({
     *   data: {
     *     // ... data to create a Company
     *   }
     * })
     * 
     */
    create<T extends CompanyCreateArgs>(args: SelectSubset<T, CompanyCreateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Companies.
     * @param {CompanyCreateManyArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompanyCreateManyArgs>(args?: SelectSubset<T, CompanyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Companies and returns the data saved in the database.
     * @param {CompanyCreateManyAndReturnArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Companies and only return the `id`
     * const companyWithIdOnly = await prisma.company.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompanyCreateManyAndReturnArgs>(args?: SelectSubset<T, CompanyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Company.
     * @param {CompanyDeleteArgs} args - Arguments to delete one Company.
     * @example
     * // Delete one Company
     * const Company = await prisma.company.delete({
     *   where: {
     *     // ... filter to delete one Company
     *   }
     * })
     * 
     */
    delete<T extends CompanyDeleteArgs>(args: SelectSubset<T, CompanyDeleteArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Company.
     * @param {CompanyUpdateArgs} args - Arguments to update one Company.
     * @example
     * // Update one Company
     * const company = await prisma.company.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompanyUpdateArgs>(args: SelectSubset<T, CompanyUpdateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Companies.
     * @param {CompanyDeleteManyArgs} args - Arguments to filter Companies to delete.
     * @example
     * // Delete a few Companies
     * const { count } = await prisma.company.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompanyDeleteManyArgs>(args?: SelectSubset<T, CompanyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompanyUpdateManyArgs>(args: SelectSubset<T, CompanyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Company.
     * @param {CompanyUpsertArgs} args - Arguments to update or create a Company.
     * @example
     * // Update or create a Company
     * const company = await prisma.company.upsert({
     *   create: {
     *     // ... data to create a Company
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Company we want to update
     *   }
     * })
     */
    upsert<T extends CompanyUpsertArgs>(args: SelectSubset<T, CompanyUpsertArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyCountArgs} args - Arguments to filter Companies to count.
     * @example
     * // Count the number of Companies
     * const count = await prisma.company.count({
     *   where: {
     *     // ... the filter for the Companies we want to count
     *   }
     * })
    **/
    count<T extends CompanyCountArgs>(
      args?: Subset<T, CompanyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CompanyAggregateArgs>(args: Subset<T, CompanyAggregateArgs>): Prisma.PrismaPromise<GetCompanyAggregateType<T>>

    /**
     * Group by Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyGroupByArgs} args - Group by arguments.
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
      T extends CompanyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanyGroupByArgs['orderBy'] }
        : { orderBy?: CompanyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CompanyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Company model
   */
  readonly fields: CompanyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Company.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompanyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    quotations<T extends Company$quotationsArgs<ExtArgs> = {}>(args?: Subset<T, Company$quotationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuotationPayload<ExtArgs>, T, "findMany"> | Null>
    employees<T extends Company$employeesArgs<ExtArgs> = {}>(args?: Subset<T, Company$employeesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Company model
   */ 
  interface CompanyFieldRefs {
    readonly id: FieldRef<"Company", 'Int'>
    readonly name: FieldRef<"Company", 'String'>
    readonly ownerName: FieldRef<"Company", 'String'>
    readonly address: FieldRef<"Company", 'String'>
    readonly gstNumber: FieldRef<"Company", 'String'>
    readonly contact: FieldRef<"Company", 'String'>
    readonly email: FieldRef<"Company", 'String'>
    readonly logoUrl: FieldRef<"Company", 'String'>
    readonly bankName: FieldRef<"Company", 'String'>
    readonly branchName: FieldRef<"Company", 'String'>
    readonly accountName: FieldRef<"Company", 'String'>
    readonly accountNumber: FieldRef<"Company", 'String'>
    readonly ifscCode: FieldRef<"Company", 'String'>
    readonly createdAt: FieldRef<"Company", 'DateTime'>
    readonly updatedAt: FieldRef<"Company", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Company findUnique
   */
  export type CompanyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findUniqueOrThrow
   */
  export type CompanyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findFirst
   */
  export type CompanyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findFirstOrThrow
   */
  export type CompanyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findMany
   */
  export type CompanyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Companies to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company create
   */
  export type CompanyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to create a Company.
     */
    data: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
  }

  /**
   * Company createMany
   */
  export type CompanyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Company createManyAndReturn
   */
  export type CompanyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Company update
   */
  export type CompanyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to update a Company.
     */
    data: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
    /**
     * Choose, which Company to update.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company updateMany
   */
  export type CompanyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Companies.
     */
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompanyWhereInput
  }

  /**
   * Company upsert
   */
  export type CompanyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The filter to search for the Company to update in case it exists.
     */
    where: CompanyWhereUniqueInput
    /**
     * In case the Company found by the `where` argument doesn't exist, create a new Company with this data.
     */
    create: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
    /**
     * In case the Company was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
  }

  /**
   * Company delete
   */
  export type CompanyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter which Company to delete.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company deleteMany
   */
  export type CompanyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Companies to delete
     */
    where?: CompanyWhereInput
  }

  /**
   * Company.quotations
   */
  export type Company$quotationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quotation
     */
    select?: QuotationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationInclude<ExtArgs> | null
    where?: QuotationWhereInput
    orderBy?: QuotationOrderByWithRelationInput | QuotationOrderByWithRelationInput[]
    cursor?: QuotationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuotationScalarFieldEnum | QuotationScalarFieldEnum[]
  }

  /**
   * Company.employees
   */
  export type Company$employeesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    where?: EmployeeWhereInput
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    cursor?: EmployeeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Company without action
   */
  export type CompanyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
  }


  /**
   * Model Quotation
   */

  export type AggregateQuotation = {
    _count: QuotationCountAggregateOutputType | null
    _avg: QuotationAvgAggregateOutputType | null
    _sum: QuotationSumAggregateOutputType | null
    _min: QuotationMinAggregateOutputType | null
    _max: QuotationMaxAggregateOutputType | null
  }

  export type QuotationAvgAggregateOutputType = {
    id: number | null
    companyId: number | null
    systemSizeKw: Decimal | null
    panelWattage: number | null
    panelCount: number | null
    outputWattageKw: Decimal | null
    subtotal: Decimal | null
    totalGst: Decimal | null
    discountPercent: Decimal | null
    discountAmount: Decimal | null
    finalPrice: Decimal | null
    roundedPrice: Decimal | null
    advancePayment: Decimal | null
    balanceDue: Decimal | null
  }

  export type QuotationSumAggregateOutputType = {
    id: number | null
    companyId: number | null
    systemSizeKw: Decimal | null
    panelWattage: number | null
    panelCount: number | null
    outputWattageKw: Decimal | null
    subtotal: Decimal | null
    totalGst: Decimal | null
    discountPercent: Decimal | null
    discountAmount: Decimal | null
    finalPrice: Decimal | null
    roundedPrice: Decimal | null
    advancePayment: Decimal | null
    balanceDue: Decimal | null
  }

  export type QuotationMinAggregateOutputType = {
    id: number | null
    quoteNumber: string | null
    quoteDate: Date | null
    companyId: number | null
    customerName: string | null
    customerAddress: string | null
    customerContact: string | null
    customerEmail: string | null
    systemType: string | null
    systemSizeKw: Decimal | null
    panelType: string | null
    panelWattage: number | null
    panelCount: number | null
    outputWattageKw: Decimal | null
    phase: string | null
    subtotal: Decimal | null
    totalGst: Decimal | null
    discountPercent: Decimal | null
    discountAmount: Decimal | null
    finalPrice: Decimal | null
    roundedPrice: Decimal | null
    advancePayment: Decimal | null
    balanceDue: Decimal | null
    paymentType: string | null
    receiverName: string | null
    remarks: string | null
    preparedBy: string | null
    status: $Enums.QuotationStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type QuotationMaxAggregateOutputType = {
    id: number | null
    quoteNumber: string | null
    quoteDate: Date | null
    companyId: number | null
    customerName: string | null
    customerAddress: string | null
    customerContact: string | null
    customerEmail: string | null
    systemType: string | null
    systemSizeKw: Decimal | null
    panelType: string | null
    panelWattage: number | null
    panelCount: number | null
    outputWattageKw: Decimal | null
    phase: string | null
    subtotal: Decimal | null
    totalGst: Decimal | null
    discountPercent: Decimal | null
    discountAmount: Decimal | null
    finalPrice: Decimal | null
    roundedPrice: Decimal | null
    advancePayment: Decimal | null
    balanceDue: Decimal | null
    paymentType: string | null
    receiverName: string | null
    remarks: string | null
    preparedBy: string | null
    status: $Enums.QuotationStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type QuotationCountAggregateOutputType = {
    id: number
    quoteNumber: number
    quoteDate: number
    companyId: number
    customerName: number
    customerAddress: number
    customerContact: number
    customerEmail: number
    systemType: number
    systemSizeKw: number
    panelType: number
    panelWattage: number
    panelCount: number
    outputWattageKw: number
    phase: number
    subtotal: number
    totalGst: number
    discountPercent: number
    discountAmount: number
    finalPrice: number
    roundedPrice: number
    advancePayment: number
    balanceDue: number
    paymentType: number
    receiverName: number
    remarks: number
    preparedBy: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type QuotationAvgAggregateInputType = {
    id?: true
    companyId?: true
    systemSizeKw?: true
    panelWattage?: true
    panelCount?: true
    outputWattageKw?: true
    subtotal?: true
    totalGst?: true
    discountPercent?: true
    discountAmount?: true
    finalPrice?: true
    roundedPrice?: true
    advancePayment?: true
    balanceDue?: true
  }

  export type QuotationSumAggregateInputType = {
    id?: true
    companyId?: true
    systemSizeKw?: true
    panelWattage?: true
    panelCount?: true
    outputWattageKw?: true
    subtotal?: true
    totalGst?: true
    discountPercent?: true
    discountAmount?: true
    finalPrice?: true
    roundedPrice?: true
    advancePayment?: true
    balanceDue?: true
  }

  export type QuotationMinAggregateInputType = {
    id?: true
    quoteNumber?: true
    quoteDate?: true
    companyId?: true
    customerName?: true
    customerAddress?: true
    customerContact?: true
    customerEmail?: true
    systemType?: true
    systemSizeKw?: true
    panelType?: true
    panelWattage?: true
    panelCount?: true
    outputWattageKw?: true
    phase?: true
    subtotal?: true
    totalGst?: true
    discountPercent?: true
    discountAmount?: true
    finalPrice?: true
    roundedPrice?: true
    advancePayment?: true
    balanceDue?: true
    paymentType?: true
    receiverName?: true
    remarks?: true
    preparedBy?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type QuotationMaxAggregateInputType = {
    id?: true
    quoteNumber?: true
    quoteDate?: true
    companyId?: true
    customerName?: true
    customerAddress?: true
    customerContact?: true
    customerEmail?: true
    systemType?: true
    systemSizeKw?: true
    panelType?: true
    panelWattage?: true
    panelCount?: true
    outputWattageKw?: true
    phase?: true
    subtotal?: true
    totalGst?: true
    discountPercent?: true
    discountAmount?: true
    finalPrice?: true
    roundedPrice?: true
    advancePayment?: true
    balanceDue?: true
    paymentType?: true
    receiverName?: true
    remarks?: true
    preparedBy?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type QuotationCountAggregateInputType = {
    id?: true
    quoteNumber?: true
    quoteDate?: true
    companyId?: true
    customerName?: true
    customerAddress?: true
    customerContact?: true
    customerEmail?: true
    systemType?: true
    systemSizeKw?: true
    panelType?: true
    panelWattage?: true
    panelCount?: true
    outputWattageKw?: true
    phase?: true
    subtotal?: true
    totalGst?: true
    discountPercent?: true
    discountAmount?: true
    finalPrice?: true
    roundedPrice?: true
    advancePayment?: true
    balanceDue?: true
    paymentType?: true
    receiverName?: true
    remarks?: true
    preparedBy?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type QuotationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Quotation to aggregate.
     */
    where?: QuotationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quotations to fetch.
     */
    orderBy?: QuotationOrderByWithRelationInput | QuotationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuotationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quotations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quotations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Quotations
    **/
    _count?: true | QuotationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QuotationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QuotationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuotationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuotationMaxAggregateInputType
  }

  export type GetQuotationAggregateType<T extends QuotationAggregateArgs> = {
        [P in keyof T & keyof AggregateQuotation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuotation[P]>
      : GetScalarType<T[P], AggregateQuotation[P]>
  }




  export type QuotationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuotationWhereInput
    orderBy?: QuotationOrderByWithAggregationInput | QuotationOrderByWithAggregationInput[]
    by: QuotationScalarFieldEnum[] | QuotationScalarFieldEnum
    having?: QuotationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuotationCountAggregateInputType | true
    _avg?: QuotationAvgAggregateInputType
    _sum?: QuotationSumAggregateInputType
    _min?: QuotationMinAggregateInputType
    _max?: QuotationMaxAggregateInputType
  }

  export type QuotationGroupByOutputType = {
    id: number
    quoteNumber: string
    quoteDate: Date
    companyId: number
    customerName: string
    customerAddress: string | null
    customerContact: string | null
    customerEmail: string | null
    systemType: string | null
    systemSizeKw: Decimal | null
    panelType: string | null
    panelWattage: number | null
    panelCount: number | null
    outputWattageKw: Decimal | null
    phase: string | null
    subtotal: Decimal
    totalGst: Decimal
    discountPercent: Decimal
    discountAmount: Decimal
    finalPrice: Decimal
    roundedPrice: Decimal
    advancePayment: Decimal
    balanceDue: Decimal
    paymentType: string | null
    receiverName: string | null
    remarks: string | null
    preparedBy: string | null
    status: $Enums.QuotationStatus
    createdAt: Date
    updatedAt: Date
    _count: QuotationCountAggregateOutputType | null
    _avg: QuotationAvgAggregateOutputType | null
    _sum: QuotationSumAggregateOutputType | null
    _min: QuotationMinAggregateOutputType | null
    _max: QuotationMaxAggregateOutputType | null
  }

  type GetQuotationGroupByPayload<T extends QuotationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuotationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuotationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuotationGroupByOutputType[P]>
            : GetScalarType<T[P], QuotationGroupByOutputType[P]>
        }
      >
    >


  export type QuotationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quoteNumber?: boolean
    quoteDate?: boolean
    companyId?: boolean
    customerName?: boolean
    customerAddress?: boolean
    customerContact?: boolean
    customerEmail?: boolean
    systemType?: boolean
    systemSizeKw?: boolean
    panelType?: boolean
    panelWattage?: boolean
    panelCount?: boolean
    outputWattageKw?: boolean
    phase?: boolean
    subtotal?: boolean
    totalGst?: boolean
    discountPercent?: boolean
    discountAmount?: boolean
    finalPrice?: boolean
    roundedPrice?: boolean
    advancePayment?: boolean
    balanceDue?: boolean
    paymentType?: boolean
    receiverName?: boolean
    remarks?: boolean
    preparedBy?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    items?: boolean | Quotation$itemsArgs<ExtArgs>
    fixedCosts?: boolean | Quotation$fixedCostsArgs<ExtArgs>
    _count?: boolean | QuotationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quotation"]>

  export type QuotationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quoteNumber?: boolean
    quoteDate?: boolean
    companyId?: boolean
    customerName?: boolean
    customerAddress?: boolean
    customerContact?: boolean
    customerEmail?: boolean
    systemType?: boolean
    systemSizeKw?: boolean
    panelType?: boolean
    panelWattage?: boolean
    panelCount?: boolean
    outputWattageKw?: boolean
    phase?: boolean
    subtotal?: boolean
    totalGst?: boolean
    discountPercent?: boolean
    discountAmount?: boolean
    finalPrice?: boolean
    roundedPrice?: boolean
    advancePayment?: boolean
    balanceDue?: boolean
    paymentType?: boolean
    receiverName?: boolean
    remarks?: boolean
    preparedBy?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quotation"]>

  export type QuotationSelectScalar = {
    id?: boolean
    quoteNumber?: boolean
    quoteDate?: boolean
    companyId?: boolean
    customerName?: boolean
    customerAddress?: boolean
    customerContact?: boolean
    customerEmail?: boolean
    systemType?: boolean
    systemSizeKw?: boolean
    panelType?: boolean
    panelWattage?: boolean
    panelCount?: boolean
    outputWattageKw?: boolean
    phase?: boolean
    subtotal?: boolean
    totalGst?: boolean
    discountPercent?: boolean
    discountAmount?: boolean
    finalPrice?: boolean
    roundedPrice?: boolean
    advancePayment?: boolean
    balanceDue?: boolean
    paymentType?: boolean
    receiverName?: boolean
    remarks?: boolean
    preparedBy?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type QuotationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    items?: boolean | Quotation$itemsArgs<ExtArgs>
    fixedCosts?: boolean | Quotation$fixedCostsArgs<ExtArgs>
    _count?: boolean | QuotationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type QuotationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $QuotationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Quotation"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
      items: Prisma.$QuotationItemPayload<ExtArgs>[]
      fixedCosts: Prisma.$QuotationFixedCostPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      quoteNumber: string
      quoteDate: Date
      companyId: number
      customerName: string
      customerAddress: string | null
      customerContact: string | null
      customerEmail: string | null
      systemType: string | null
      systemSizeKw: Prisma.Decimal | null
      panelType: string | null
      panelWattage: number | null
      panelCount: number | null
      outputWattageKw: Prisma.Decimal | null
      phase: string | null
      subtotal: Prisma.Decimal
      totalGst: Prisma.Decimal
      discountPercent: Prisma.Decimal
      discountAmount: Prisma.Decimal
      finalPrice: Prisma.Decimal
      roundedPrice: Prisma.Decimal
      advancePayment: Prisma.Decimal
      balanceDue: Prisma.Decimal
      paymentType: string | null
      receiverName: string | null
      remarks: string | null
      preparedBy: string | null
      status: $Enums.QuotationStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["quotation"]>
    composites: {}
  }

  type QuotationGetPayload<S extends boolean | null | undefined | QuotationDefaultArgs> = $Result.GetResult<Prisma.$QuotationPayload, S>

  type QuotationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<QuotationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: QuotationCountAggregateInputType | true
    }

  export interface QuotationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Quotation'], meta: { name: 'Quotation' } }
    /**
     * Find zero or one Quotation that matches the filter.
     * @param {QuotationFindUniqueArgs} args - Arguments to find a Quotation
     * @example
     * // Get one Quotation
     * const quotation = await prisma.quotation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuotationFindUniqueArgs>(args: SelectSubset<T, QuotationFindUniqueArgs<ExtArgs>>): Prisma__QuotationClient<$Result.GetResult<Prisma.$QuotationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Quotation that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {QuotationFindUniqueOrThrowArgs} args - Arguments to find a Quotation
     * @example
     * // Get one Quotation
     * const quotation = await prisma.quotation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuotationFindUniqueOrThrowArgs>(args: SelectSubset<T, QuotationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuotationClient<$Result.GetResult<Prisma.$QuotationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Quotation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuotationFindFirstArgs} args - Arguments to find a Quotation
     * @example
     * // Get one Quotation
     * const quotation = await prisma.quotation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuotationFindFirstArgs>(args?: SelectSubset<T, QuotationFindFirstArgs<ExtArgs>>): Prisma__QuotationClient<$Result.GetResult<Prisma.$QuotationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Quotation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuotationFindFirstOrThrowArgs} args - Arguments to find a Quotation
     * @example
     * // Get one Quotation
     * const quotation = await prisma.quotation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuotationFindFirstOrThrowArgs>(args?: SelectSubset<T, QuotationFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuotationClient<$Result.GetResult<Prisma.$QuotationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Quotations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuotationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Quotations
     * const quotations = await prisma.quotation.findMany()
     * 
     * // Get first 10 Quotations
     * const quotations = await prisma.quotation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const quotationWithIdOnly = await prisma.quotation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuotationFindManyArgs>(args?: SelectSubset<T, QuotationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuotationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Quotation.
     * @param {QuotationCreateArgs} args - Arguments to create a Quotation.
     * @example
     * // Create one Quotation
     * const Quotation = await prisma.quotation.create({
     *   data: {
     *     // ... data to create a Quotation
     *   }
     * })
     * 
     */
    create<T extends QuotationCreateArgs>(args: SelectSubset<T, QuotationCreateArgs<ExtArgs>>): Prisma__QuotationClient<$Result.GetResult<Prisma.$QuotationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Quotations.
     * @param {QuotationCreateManyArgs} args - Arguments to create many Quotations.
     * @example
     * // Create many Quotations
     * const quotation = await prisma.quotation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuotationCreateManyArgs>(args?: SelectSubset<T, QuotationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Quotations and returns the data saved in the database.
     * @param {QuotationCreateManyAndReturnArgs} args - Arguments to create many Quotations.
     * @example
     * // Create many Quotations
     * const quotation = await prisma.quotation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Quotations and only return the `id`
     * const quotationWithIdOnly = await prisma.quotation.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuotationCreateManyAndReturnArgs>(args?: SelectSubset<T, QuotationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuotationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Quotation.
     * @param {QuotationDeleteArgs} args - Arguments to delete one Quotation.
     * @example
     * // Delete one Quotation
     * const Quotation = await prisma.quotation.delete({
     *   where: {
     *     // ... filter to delete one Quotation
     *   }
     * })
     * 
     */
    delete<T extends QuotationDeleteArgs>(args: SelectSubset<T, QuotationDeleteArgs<ExtArgs>>): Prisma__QuotationClient<$Result.GetResult<Prisma.$QuotationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Quotation.
     * @param {QuotationUpdateArgs} args - Arguments to update one Quotation.
     * @example
     * // Update one Quotation
     * const quotation = await prisma.quotation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuotationUpdateArgs>(args: SelectSubset<T, QuotationUpdateArgs<ExtArgs>>): Prisma__QuotationClient<$Result.GetResult<Prisma.$QuotationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Quotations.
     * @param {QuotationDeleteManyArgs} args - Arguments to filter Quotations to delete.
     * @example
     * // Delete a few Quotations
     * const { count } = await prisma.quotation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuotationDeleteManyArgs>(args?: SelectSubset<T, QuotationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Quotations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuotationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Quotations
     * const quotation = await prisma.quotation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuotationUpdateManyArgs>(args: SelectSubset<T, QuotationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Quotation.
     * @param {QuotationUpsertArgs} args - Arguments to update or create a Quotation.
     * @example
     * // Update or create a Quotation
     * const quotation = await prisma.quotation.upsert({
     *   create: {
     *     // ... data to create a Quotation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Quotation we want to update
     *   }
     * })
     */
    upsert<T extends QuotationUpsertArgs>(args: SelectSubset<T, QuotationUpsertArgs<ExtArgs>>): Prisma__QuotationClient<$Result.GetResult<Prisma.$QuotationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Quotations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuotationCountArgs} args - Arguments to filter Quotations to count.
     * @example
     * // Count the number of Quotations
     * const count = await prisma.quotation.count({
     *   where: {
     *     // ... the filter for the Quotations we want to count
     *   }
     * })
    **/
    count<T extends QuotationCountArgs>(
      args?: Subset<T, QuotationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuotationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Quotation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuotationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends QuotationAggregateArgs>(args: Subset<T, QuotationAggregateArgs>): Prisma.PrismaPromise<GetQuotationAggregateType<T>>

    /**
     * Group by Quotation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuotationGroupByArgs} args - Group by arguments.
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
      T extends QuotationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuotationGroupByArgs['orderBy'] }
        : { orderBy?: QuotationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, QuotationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuotationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Quotation model
   */
  readonly fields: QuotationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Quotation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuotationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    items<T extends Quotation$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Quotation$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuotationItemPayload<ExtArgs>, T, "findMany"> | Null>
    fixedCosts<T extends Quotation$fixedCostsArgs<ExtArgs> = {}>(args?: Subset<T, Quotation$fixedCostsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuotationFixedCostPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Quotation model
   */ 
  interface QuotationFieldRefs {
    readonly id: FieldRef<"Quotation", 'Int'>
    readonly quoteNumber: FieldRef<"Quotation", 'String'>
    readonly quoteDate: FieldRef<"Quotation", 'DateTime'>
    readonly companyId: FieldRef<"Quotation", 'Int'>
    readonly customerName: FieldRef<"Quotation", 'String'>
    readonly customerAddress: FieldRef<"Quotation", 'String'>
    readonly customerContact: FieldRef<"Quotation", 'String'>
    readonly customerEmail: FieldRef<"Quotation", 'String'>
    readonly systemType: FieldRef<"Quotation", 'String'>
    readonly systemSizeKw: FieldRef<"Quotation", 'Decimal'>
    readonly panelType: FieldRef<"Quotation", 'String'>
    readonly panelWattage: FieldRef<"Quotation", 'Int'>
    readonly panelCount: FieldRef<"Quotation", 'Int'>
    readonly outputWattageKw: FieldRef<"Quotation", 'Decimal'>
    readonly phase: FieldRef<"Quotation", 'String'>
    readonly subtotal: FieldRef<"Quotation", 'Decimal'>
    readonly totalGst: FieldRef<"Quotation", 'Decimal'>
    readonly discountPercent: FieldRef<"Quotation", 'Decimal'>
    readonly discountAmount: FieldRef<"Quotation", 'Decimal'>
    readonly finalPrice: FieldRef<"Quotation", 'Decimal'>
    readonly roundedPrice: FieldRef<"Quotation", 'Decimal'>
    readonly advancePayment: FieldRef<"Quotation", 'Decimal'>
    readonly balanceDue: FieldRef<"Quotation", 'Decimal'>
    readonly paymentType: FieldRef<"Quotation", 'String'>
    readonly receiverName: FieldRef<"Quotation", 'String'>
    readonly remarks: FieldRef<"Quotation", 'String'>
    readonly preparedBy: FieldRef<"Quotation", 'String'>
    readonly status: FieldRef<"Quotation", 'QuotationStatus'>
    readonly createdAt: FieldRef<"Quotation", 'DateTime'>
    readonly updatedAt: FieldRef<"Quotation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Quotation findUnique
   */
  export type QuotationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quotation
     */
    select?: QuotationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationInclude<ExtArgs> | null
    /**
     * Filter, which Quotation to fetch.
     */
    where: QuotationWhereUniqueInput
  }

  /**
   * Quotation findUniqueOrThrow
   */
  export type QuotationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quotation
     */
    select?: QuotationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationInclude<ExtArgs> | null
    /**
     * Filter, which Quotation to fetch.
     */
    where: QuotationWhereUniqueInput
  }

  /**
   * Quotation findFirst
   */
  export type QuotationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quotation
     */
    select?: QuotationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationInclude<ExtArgs> | null
    /**
     * Filter, which Quotation to fetch.
     */
    where?: QuotationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quotations to fetch.
     */
    orderBy?: QuotationOrderByWithRelationInput | QuotationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Quotations.
     */
    cursor?: QuotationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quotations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quotations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Quotations.
     */
    distinct?: QuotationScalarFieldEnum | QuotationScalarFieldEnum[]
  }

  /**
   * Quotation findFirstOrThrow
   */
  export type QuotationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quotation
     */
    select?: QuotationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationInclude<ExtArgs> | null
    /**
     * Filter, which Quotation to fetch.
     */
    where?: QuotationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quotations to fetch.
     */
    orderBy?: QuotationOrderByWithRelationInput | QuotationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Quotations.
     */
    cursor?: QuotationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quotations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quotations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Quotations.
     */
    distinct?: QuotationScalarFieldEnum | QuotationScalarFieldEnum[]
  }

  /**
   * Quotation findMany
   */
  export type QuotationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quotation
     */
    select?: QuotationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationInclude<ExtArgs> | null
    /**
     * Filter, which Quotations to fetch.
     */
    where?: QuotationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quotations to fetch.
     */
    orderBy?: QuotationOrderByWithRelationInput | QuotationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Quotations.
     */
    cursor?: QuotationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quotations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quotations.
     */
    skip?: number
    distinct?: QuotationScalarFieldEnum | QuotationScalarFieldEnum[]
  }

  /**
   * Quotation create
   */
  export type QuotationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quotation
     */
    select?: QuotationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationInclude<ExtArgs> | null
    /**
     * The data needed to create a Quotation.
     */
    data: XOR<QuotationCreateInput, QuotationUncheckedCreateInput>
  }

  /**
   * Quotation createMany
   */
  export type QuotationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Quotations.
     */
    data: QuotationCreateManyInput | QuotationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Quotation createManyAndReturn
   */
  export type QuotationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quotation
     */
    select?: QuotationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Quotations.
     */
    data: QuotationCreateManyInput | QuotationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Quotation update
   */
  export type QuotationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quotation
     */
    select?: QuotationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationInclude<ExtArgs> | null
    /**
     * The data needed to update a Quotation.
     */
    data: XOR<QuotationUpdateInput, QuotationUncheckedUpdateInput>
    /**
     * Choose, which Quotation to update.
     */
    where: QuotationWhereUniqueInput
  }

  /**
   * Quotation updateMany
   */
  export type QuotationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Quotations.
     */
    data: XOR<QuotationUpdateManyMutationInput, QuotationUncheckedUpdateManyInput>
    /**
     * Filter which Quotations to update
     */
    where?: QuotationWhereInput
  }

  /**
   * Quotation upsert
   */
  export type QuotationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quotation
     */
    select?: QuotationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationInclude<ExtArgs> | null
    /**
     * The filter to search for the Quotation to update in case it exists.
     */
    where: QuotationWhereUniqueInput
    /**
     * In case the Quotation found by the `where` argument doesn't exist, create a new Quotation with this data.
     */
    create: XOR<QuotationCreateInput, QuotationUncheckedCreateInput>
    /**
     * In case the Quotation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuotationUpdateInput, QuotationUncheckedUpdateInput>
  }

  /**
   * Quotation delete
   */
  export type QuotationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quotation
     */
    select?: QuotationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationInclude<ExtArgs> | null
    /**
     * Filter which Quotation to delete.
     */
    where: QuotationWhereUniqueInput
  }

  /**
   * Quotation deleteMany
   */
  export type QuotationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Quotations to delete
     */
    where?: QuotationWhereInput
  }

  /**
   * Quotation.items
   */
  export type Quotation$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuotationItem
     */
    select?: QuotationItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationItemInclude<ExtArgs> | null
    where?: QuotationItemWhereInput
    orderBy?: QuotationItemOrderByWithRelationInput | QuotationItemOrderByWithRelationInput[]
    cursor?: QuotationItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuotationItemScalarFieldEnum | QuotationItemScalarFieldEnum[]
  }

  /**
   * Quotation.fixedCosts
   */
  export type Quotation$fixedCostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuotationFixedCost
     */
    select?: QuotationFixedCostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationFixedCostInclude<ExtArgs> | null
    where?: QuotationFixedCostWhereInput
    orderBy?: QuotationFixedCostOrderByWithRelationInput | QuotationFixedCostOrderByWithRelationInput[]
    cursor?: QuotationFixedCostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuotationFixedCostScalarFieldEnum | QuotationFixedCostScalarFieldEnum[]
  }

  /**
   * Quotation without action
   */
  export type QuotationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quotation
     */
    select?: QuotationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationInclude<ExtArgs> | null
  }


  /**
   * Model QuotationItem
   */

  export type AggregateQuotationItem = {
    _count: QuotationItemCountAggregateOutputType | null
    _avg: QuotationItemAvgAggregateOutputType | null
    _sum: QuotationItemSumAggregateOutputType | null
    _min: QuotationItemMinAggregateOutputType | null
    _max: QuotationItemMaxAggregateOutputType | null
  }

  export type QuotationItemAvgAggregateOutputType = {
    id: number | null
    quotationId: number | null
    unitPrice: Decimal | null
    quantity: Decimal | null
    gstRate: Decimal | null
    totalPrice: Decimal | null
    sortOrder: number | null
  }

  export type QuotationItemSumAggregateOutputType = {
    id: number | null
    quotationId: number | null
    unitPrice: Decimal | null
    quantity: Decimal | null
    gstRate: Decimal | null
    totalPrice: Decimal | null
    sortOrder: number | null
  }

  export type QuotationItemMinAggregateOutputType = {
    id: number | null
    quotationId: number | null
    categoryName: string | null
    productName: string | null
    hsnCode: string | null
    description: string | null
    unitPrice: Decimal | null
    quantity: Decimal | null
    gstRate: Decimal | null
    totalPrice: Decimal | null
    sortOrder: number | null
  }

  export type QuotationItemMaxAggregateOutputType = {
    id: number | null
    quotationId: number | null
    categoryName: string | null
    productName: string | null
    hsnCode: string | null
    description: string | null
    unitPrice: Decimal | null
    quantity: Decimal | null
    gstRate: Decimal | null
    totalPrice: Decimal | null
    sortOrder: number | null
  }

  export type QuotationItemCountAggregateOutputType = {
    id: number
    quotationId: number
    categoryName: number
    productName: number
    hsnCode: number
    description: number
    unitPrice: number
    quantity: number
    gstRate: number
    totalPrice: number
    sortOrder: number
    _all: number
  }


  export type QuotationItemAvgAggregateInputType = {
    id?: true
    quotationId?: true
    unitPrice?: true
    quantity?: true
    gstRate?: true
    totalPrice?: true
    sortOrder?: true
  }

  export type QuotationItemSumAggregateInputType = {
    id?: true
    quotationId?: true
    unitPrice?: true
    quantity?: true
    gstRate?: true
    totalPrice?: true
    sortOrder?: true
  }

  export type QuotationItemMinAggregateInputType = {
    id?: true
    quotationId?: true
    categoryName?: true
    productName?: true
    hsnCode?: true
    description?: true
    unitPrice?: true
    quantity?: true
    gstRate?: true
    totalPrice?: true
    sortOrder?: true
  }

  export type QuotationItemMaxAggregateInputType = {
    id?: true
    quotationId?: true
    categoryName?: true
    productName?: true
    hsnCode?: true
    description?: true
    unitPrice?: true
    quantity?: true
    gstRate?: true
    totalPrice?: true
    sortOrder?: true
  }

  export type QuotationItemCountAggregateInputType = {
    id?: true
    quotationId?: true
    categoryName?: true
    productName?: true
    hsnCode?: true
    description?: true
    unitPrice?: true
    quantity?: true
    gstRate?: true
    totalPrice?: true
    sortOrder?: true
    _all?: true
  }

  export type QuotationItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuotationItem to aggregate.
     */
    where?: QuotationItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuotationItems to fetch.
     */
    orderBy?: QuotationItemOrderByWithRelationInput | QuotationItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuotationItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuotationItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuotationItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QuotationItems
    **/
    _count?: true | QuotationItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QuotationItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QuotationItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuotationItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuotationItemMaxAggregateInputType
  }

  export type GetQuotationItemAggregateType<T extends QuotationItemAggregateArgs> = {
        [P in keyof T & keyof AggregateQuotationItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuotationItem[P]>
      : GetScalarType<T[P], AggregateQuotationItem[P]>
  }




  export type QuotationItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuotationItemWhereInput
    orderBy?: QuotationItemOrderByWithAggregationInput | QuotationItemOrderByWithAggregationInput[]
    by: QuotationItemScalarFieldEnum[] | QuotationItemScalarFieldEnum
    having?: QuotationItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuotationItemCountAggregateInputType | true
    _avg?: QuotationItemAvgAggregateInputType
    _sum?: QuotationItemSumAggregateInputType
    _min?: QuotationItemMinAggregateInputType
    _max?: QuotationItemMaxAggregateInputType
  }

  export type QuotationItemGroupByOutputType = {
    id: number
    quotationId: number
    categoryName: string | null
    productName: string
    hsnCode: string | null
    description: string | null
    unitPrice: Decimal
    quantity: Decimal
    gstRate: Decimal
    totalPrice: Decimal
    sortOrder: number
    _count: QuotationItemCountAggregateOutputType | null
    _avg: QuotationItemAvgAggregateOutputType | null
    _sum: QuotationItemSumAggregateOutputType | null
    _min: QuotationItemMinAggregateOutputType | null
    _max: QuotationItemMaxAggregateOutputType | null
  }

  type GetQuotationItemGroupByPayload<T extends QuotationItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuotationItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuotationItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuotationItemGroupByOutputType[P]>
            : GetScalarType<T[P], QuotationItemGroupByOutputType[P]>
        }
      >
    >


  export type QuotationItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quotationId?: boolean
    categoryName?: boolean
    productName?: boolean
    hsnCode?: boolean
    description?: boolean
    unitPrice?: boolean
    quantity?: boolean
    gstRate?: boolean
    totalPrice?: boolean
    sortOrder?: boolean
    quotation?: boolean | QuotationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quotationItem"]>

  export type QuotationItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quotationId?: boolean
    categoryName?: boolean
    productName?: boolean
    hsnCode?: boolean
    description?: boolean
    unitPrice?: boolean
    quantity?: boolean
    gstRate?: boolean
    totalPrice?: boolean
    sortOrder?: boolean
    quotation?: boolean | QuotationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quotationItem"]>

  export type QuotationItemSelectScalar = {
    id?: boolean
    quotationId?: boolean
    categoryName?: boolean
    productName?: boolean
    hsnCode?: boolean
    description?: boolean
    unitPrice?: boolean
    quantity?: boolean
    gstRate?: boolean
    totalPrice?: boolean
    sortOrder?: boolean
  }

  export type QuotationItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quotation?: boolean | QuotationDefaultArgs<ExtArgs>
  }
  export type QuotationItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quotation?: boolean | QuotationDefaultArgs<ExtArgs>
  }

  export type $QuotationItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QuotationItem"
    objects: {
      quotation: Prisma.$QuotationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      quotationId: number
      categoryName: string | null
      productName: string
      hsnCode: string | null
      description: string | null
      unitPrice: Prisma.Decimal
      quantity: Prisma.Decimal
      gstRate: Prisma.Decimal
      totalPrice: Prisma.Decimal
      sortOrder: number
    }, ExtArgs["result"]["quotationItem"]>
    composites: {}
  }

  type QuotationItemGetPayload<S extends boolean | null | undefined | QuotationItemDefaultArgs> = $Result.GetResult<Prisma.$QuotationItemPayload, S>

  type QuotationItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<QuotationItemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: QuotationItemCountAggregateInputType | true
    }

  export interface QuotationItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QuotationItem'], meta: { name: 'QuotationItem' } }
    /**
     * Find zero or one QuotationItem that matches the filter.
     * @param {QuotationItemFindUniqueArgs} args - Arguments to find a QuotationItem
     * @example
     * // Get one QuotationItem
     * const quotationItem = await prisma.quotationItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuotationItemFindUniqueArgs>(args: SelectSubset<T, QuotationItemFindUniqueArgs<ExtArgs>>): Prisma__QuotationItemClient<$Result.GetResult<Prisma.$QuotationItemPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one QuotationItem that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {QuotationItemFindUniqueOrThrowArgs} args - Arguments to find a QuotationItem
     * @example
     * // Get one QuotationItem
     * const quotationItem = await prisma.quotationItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuotationItemFindUniqueOrThrowArgs>(args: SelectSubset<T, QuotationItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuotationItemClient<$Result.GetResult<Prisma.$QuotationItemPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first QuotationItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuotationItemFindFirstArgs} args - Arguments to find a QuotationItem
     * @example
     * // Get one QuotationItem
     * const quotationItem = await prisma.quotationItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuotationItemFindFirstArgs>(args?: SelectSubset<T, QuotationItemFindFirstArgs<ExtArgs>>): Prisma__QuotationItemClient<$Result.GetResult<Prisma.$QuotationItemPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first QuotationItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuotationItemFindFirstOrThrowArgs} args - Arguments to find a QuotationItem
     * @example
     * // Get one QuotationItem
     * const quotationItem = await prisma.quotationItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuotationItemFindFirstOrThrowArgs>(args?: SelectSubset<T, QuotationItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuotationItemClient<$Result.GetResult<Prisma.$QuotationItemPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more QuotationItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuotationItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QuotationItems
     * const quotationItems = await prisma.quotationItem.findMany()
     * 
     * // Get first 10 QuotationItems
     * const quotationItems = await prisma.quotationItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const quotationItemWithIdOnly = await prisma.quotationItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuotationItemFindManyArgs>(args?: SelectSubset<T, QuotationItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuotationItemPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a QuotationItem.
     * @param {QuotationItemCreateArgs} args - Arguments to create a QuotationItem.
     * @example
     * // Create one QuotationItem
     * const QuotationItem = await prisma.quotationItem.create({
     *   data: {
     *     // ... data to create a QuotationItem
     *   }
     * })
     * 
     */
    create<T extends QuotationItemCreateArgs>(args: SelectSubset<T, QuotationItemCreateArgs<ExtArgs>>): Prisma__QuotationItemClient<$Result.GetResult<Prisma.$QuotationItemPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many QuotationItems.
     * @param {QuotationItemCreateManyArgs} args - Arguments to create many QuotationItems.
     * @example
     * // Create many QuotationItems
     * const quotationItem = await prisma.quotationItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuotationItemCreateManyArgs>(args?: SelectSubset<T, QuotationItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QuotationItems and returns the data saved in the database.
     * @param {QuotationItemCreateManyAndReturnArgs} args - Arguments to create many QuotationItems.
     * @example
     * // Create many QuotationItems
     * const quotationItem = await prisma.quotationItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QuotationItems and only return the `id`
     * const quotationItemWithIdOnly = await prisma.quotationItem.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuotationItemCreateManyAndReturnArgs>(args?: SelectSubset<T, QuotationItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuotationItemPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a QuotationItem.
     * @param {QuotationItemDeleteArgs} args - Arguments to delete one QuotationItem.
     * @example
     * // Delete one QuotationItem
     * const QuotationItem = await prisma.quotationItem.delete({
     *   where: {
     *     // ... filter to delete one QuotationItem
     *   }
     * })
     * 
     */
    delete<T extends QuotationItemDeleteArgs>(args: SelectSubset<T, QuotationItemDeleteArgs<ExtArgs>>): Prisma__QuotationItemClient<$Result.GetResult<Prisma.$QuotationItemPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one QuotationItem.
     * @param {QuotationItemUpdateArgs} args - Arguments to update one QuotationItem.
     * @example
     * // Update one QuotationItem
     * const quotationItem = await prisma.quotationItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuotationItemUpdateArgs>(args: SelectSubset<T, QuotationItemUpdateArgs<ExtArgs>>): Prisma__QuotationItemClient<$Result.GetResult<Prisma.$QuotationItemPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more QuotationItems.
     * @param {QuotationItemDeleteManyArgs} args - Arguments to filter QuotationItems to delete.
     * @example
     * // Delete a few QuotationItems
     * const { count } = await prisma.quotationItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuotationItemDeleteManyArgs>(args?: SelectSubset<T, QuotationItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuotationItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuotationItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QuotationItems
     * const quotationItem = await prisma.quotationItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuotationItemUpdateManyArgs>(args: SelectSubset<T, QuotationItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one QuotationItem.
     * @param {QuotationItemUpsertArgs} args - Arguments to update or create a QuotationItem.
     * @example
     * // Update or create a QuotationItem
     * const quotationItem = await prisma.quotationItem.upsert({
     *   create: {
     *     // ... data to create a QuotationItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QuotationItem we want to update
     *   }
     * })
     */
    upsert<T extends QuotationItemUpsertArgs>(args: SelectSubset<T, QuotationItemUpsertArgs<ExtArgs>>): Prisma__QuotationItemClient<$Result.GetResult<Prisma.$QuotationItemPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of QuotationItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuotationItemCountArgs} args - Arguments to filter QuotationItems to count.
     * @example
     * // Count the number of QuotationItems
     * const count = await prisma.quotationItem.count({
     *   where: {
     *     // ... the filter for the QuotationItems we want to count
     *   }
     * })
    **/
    count<T extends QuotationItemCountArgs>(
      args?: Subset<T, QuotationItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuotationItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QuotationItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuotationItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends QuotationItemAggregateArgs>(args: Subset<T, QuotationItemAggregateArgs>): Prisma.PrismaPromise<GetQuotationItemAggregateType<T>>

    /**
     * Group by QuotationItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuotationItemGroupByArgs} args - Group by arguments.
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
      T extends QuotationItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuotationItemGroupByArgs['orderBy'] }
        : { orderBy?: QuotationItemGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, QuotationItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuotationItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QuotationItem model
   */
  readonly fields: QuotationItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QuotationItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuotationItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    quotation<T extends QuotationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuotationDefaultArgs<ExtArgs>>): Prisma__QuotationClient<$Result.GetResult<Prisma.$QuotationPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the QuotationItem model
   */ 
  interface QuotationItemFieldRefs {
    readonly id: FieldRef<"QuotationItem", 'Int'>
    readonly quotationId: FieldRef<"QuotationItem", 'Int'>
    readonly categoryName: FieldRef<"QuotationItem", 'String'>
    readonly productName: FieldRef<"QuotationItem", 'String'>
    readonly hsnCode: FieldRef<"QuotationItem", 'String'>
    readonly description: FieldRef<"QuotationItem", 'String'>
    readonly unitPrice: FieldRef<"QuotationItem", 'Decimal'>
    readonly quantity: FieldRef<"QuotationItem", 'Decimal'>
    readonly gstRate: FieldRef<"QuotationItem", 'Decimal'>
    readonly totalPrice: FieldRef<"QuotationItem", 'Decimal'>
    readonly sortOrder: FieldRef<"QuotationItem", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * QuotationItem findUnique
   */
  export type QuotationItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuotationItem
     */
    select?: QuotationItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationItemInclude<ExtArgs> | null
    /**
     * Filter, which QuotationItem to fetch.
     */
    where: QuotationItemWhereUniqueInput
  }

  /**
   * QuotationItem findUniqueOrThrow
   */
  export type QuotationItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuotationItem
     */
    select?: QuotationItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationItemInclude<ExtArgs> | null
    /**
     * Filter, which QuotationItem to fetch.
     */
    where: QuotationItemWhereUniqueInput
  }

  /**
   * QuotationItem findFirst
   */
  export type QuotationItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuotationItem
     */
    select?: QuotationItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationItemInclude<ExtArgs> | null
    /**
     * Filter, which QuotationItem to fetch.
     */
    where?: QuotationItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuotationItems to fetch.
     */
    orderBy?: QuotationItemOrderByWithRelationInput | QuotationItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuotationItems.
     */
    cursor?: QuotationItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuotationItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuotationItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuotationItems.
     */
    distinct?: QuotationItemScalarFieldEnum | QuotationItemScalarFieldEnum[]
  }

  /**
   * QuotationItem findFirstOrThrow
   */
  export type QuotationItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuotationItem
     */
    select?: QuotationItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationItemInclude<ExtArgs> | null
    /**
     * Filter, which QuotationItem to fetch.
     */
    where?: QuotationItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuotationItems to fetch.
     */
    orderBy?: QuotationItemOrderByWithRelationInput | QuotationItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuotationItems.
     */
    cursor?: QuotationItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuotationItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuotationItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuotationItems.
     */
    distinct?: QuotationItemScalarFieldEnum | QuotationItemScalarFieldEnum[]
  }

  /**
   * QuotationItem findMany
   */
  export type QuotationItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuotationItem
     */
    select?: QuotationItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationItemInclude<ExtArgs> | null
    /**
     * Filter, which QuotationItems to fetch.
     */
    where?: QuotationItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuotationItems to fetch.
     */
    orderBy?: QuotationItemOrderByWithRelationInput | QuotationItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QuotationItems.
     */
    cursor?: QuotationItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuotationItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuotationItems.
     */
    skip?: number
    distinct?: QuotationItemScalarFieldEnum | QuotationItemScalarFieldEnum[]
  }

  /**
   * QuotationItem create
   */
  export type QuotationItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuotationItem
     */
    select?: QuotationItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationItemInclude<ExtArgs> | null
    /**
     * The data needed to create a QuotationItem.
     */
    data: XOR<QuotationItemCreateInput, QuotationItemUncheckedCreateInput>
  }

  /**
   * QuotationItem createMany
   */
  export type QuotationItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QuotationItems.
     */
    data: QuotationItemCreateManyInput | QuotationItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QuotationItem createManyAndReturn
   */
  export type QuotationItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuotationItem
     */
    select?: QuotationItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many QuotationItems.
     */
    data: QuotationItemCreateManyInput | QuotationItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * QuotationItem update
   */
  export type QuotationItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuotationItem
     */
    select?: QuotationItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationItemInclude<ExtArgs> | null
    /**
     * The data needed to update a QuotationItem.
     */
    data: XOR<QuotationItemUpdateInput, QuotationItemUncheckedUpdateInput>
    /**
     * Choose, which QuotationItem to update.
     */
    where: QuotationItemWhereUniqueInput
  }

  /**
   * QuotationItem updateMany
   */
  export type QuotationItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QuotationItems.
     */
    data: XOR<QuotationItemUpdateManyMutationInput, QuotationItemUncheckedUpdateManyInput>
    /**
     * Filter which QuotationItems to update
     */
    where?: QuotationItemWhereInput
  }

  /**
   * QuotationItem upsert
   */
  export type QuotationItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuotationItem
     */
    select?: QuotationItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationItemInclude<ExtArgs> | null
    /**
     * The filter to search for the QuotationItem to update in case it exists.
     */
    where: QuotationItemWhereUniqueInput
    /**
     * In case the QuotationItem found by the `where` argument doesn't exist, create a new QuotationItem with this data.
     */
    create: XOR<QuotationItemCreateInput, QuotationItemUncheckedCreateInput>
    /**
     * In case the QuotationItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuotationItemUpdateInput, QuotationItemUncheckedUpdateInput>
  }

  /**
   * QuotationItem delete
   */
  export type QuotationItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuotationItem
     */
    select?: QuotationItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationItemInclude<ExtArgs> | null
    /**
     * Filter which QuotationItem to delete.
     */
    where: QuotationItemWhereUniqueInput
  }

  /**
   * QuotationItem deleteMany
   */
  export type QuotationItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuotationItems to delete
     */
    where?: QuotationItemWhereInput
  }

  /**
   * QuotationItem without action
   */
  export type QuotationItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuotationItem
     */
    select?: QuotationItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationItemInclude<ExtArgs> | null
  }


  /**
   * Model QuotationFixedCost
   */

  export type AggregateQuotationFixedCost = {
    _count: QuotationFixedCostCountAggregateOutputType | null
    _avg: QuotationFixedCostAvgAggregateOutputType | null
    _sum: QuotationFixedCostSumAggregateOutputType | null
    _min: QuotationFixedCostMinAggregateOutputType | null
    _max: QuotationFixedCostMaxAggregateOutputType | null
  }

  export type QuotationFixedCostAvgAggregateOutputType = {
    id: number | null
    quotationId: number | null
    cost: Decimal | null
    gstRate: Decimal | null
    total: Decimal | null
    sortOrder: number | null
  }

  export type QuotationFixedCostSumAggregateOutputType = {
    id: number | null
    quotationId: number | null
    cost: Decimal | null
    gstRate: Decimal | null
    total: Decimal | null
    sortOrder: number | null
  }

  export type QuotationFixedCostMinAggregateOutputType = {
    id: number | null
    quotationId: number | null
    label: string | null
    cost: Decimal | null
    rateNote: string | null
    hsnCode: string | null
    gstRate: Decimal | null
    total: Decimal | null
    included: boolean | null
    sortOrder: number | null
  }

  export type QuotationFixedCostMaxAggregateOutputType = {
    id: number | null
    quotationId: number | null
    label: string | null
    cost: Decimal | null
    rateNote: string | null
    hsnCode: string | null
    gstRate: Decimal | null
    total: Decimal | null
    included: boolean | null
    sortOrder: number | null
  }

  export type QuotationFixedCostCountAggregateOutputType = {
    id: number
    quotationId: number
    label: number
    cost: number
    rateNote: number
    hsnCode: number
    gstRate: number
    total: number
    included: number
    sortOrder: number
    _all: number
  }


  export type QuotationFixedCostAvgAggregateInputType = {
    id?: true
    quotationId?: true
    cost?: true
    gstRate?: true
    total?: true
    sortOrder?: true
  }

  export type QuotationFixedCostSumAggregateInputType = {
    id?: true
    quotationId?: true
    cost?: true
    gstRate?: true
    total?: true
    sortOrder?: true
  }

  export type QuotationFixedCostMinAggregateInputType = {
    id?: true
    quotationId?: true
    label?: true
    cost?: true
    rateNote?: true
    hsnCode?: true
    gstRate?: true
    total?: true
    included?: true
    sortOrder?: true
  }

  export type QuotationFixedCostMaxAggregateInputType = {
    id?: true
    quotationId?: true
    label?: true
    cost?: true
    rateNote?: true
    hsnCode?: true
    gstRate?: true
    total?: true
    included?: true
    sortOrder?: true
  }

  export type QuotationFixedCostCountAggregateInputType = {
    id?: true
    quotationId?: true
    label?: true
    cost?: true
    rateNote?: true
    hsnCode?: true
    gstRate?: true
    total?: true
    included?: true
    sortOrder?: true
    _all?: true
  }

  export type QuotationFixedCostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuotationFixedCost to aggregate.
     */
    where?: QuotationFixedCostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuotationFixedCosts to fetch.
     */
    orderBy?: QuotationFixedCostOrderByWithRelationInput | QuotationFixedCostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuotationFixedCostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuotationFixedCosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuotationFixedCosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QuotationFixedCosts
    **/
    _count?: true | QuotationFixedCostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QuotationFixedCostAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QuotationFixedCostSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuotationFixedCostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuotationFixedCostMaxAggregateInputType
  }

  export type GetQuotationFixedCostAggregateType<T extends QuotationFixedCostAggregateArgs> = {
        [P in keyof T & keyof AggregateQuotationFixedCost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuotationFixedCost[P]>
      : GetScalarType<T[P], AggregateQuotationFixedCost[P]>
  }




  export type QuotationFixedCostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuotationFixedCostWhereInput
    orderBy?: QuotationFixedCostOrderByWithAggregationInput | QuotationFixedCostOrderByWithAggregationInput[]
    by: QuotationFixedCostScalarFieldEnum[] | QuotationFixedCostScalarFieldEnum
    having?: QuotationFixedCostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuotationFixedCostCountAggregateInputType | true
    _avg?: QuotationFixedCostAvgAggregateInputType
    _sum?: QuotationFixedCostSumAggregateInputType
    _min?: QuotationFixedCostMinAggregateInputType
    _max?: QuotationFixedCostMaxAggregateInputType
  }

  export type QuotationFixedCostGroupByOutputType = {
    id: number
    quotationId: number
    label: string
    cost: Decimal
    rateNote: string | null
    hsnCode: string | null
    gstRate: Decimal
    total: Decimal
    included: boolean
    sortOrder: number
    _count: QuotationFixedCostCountAggregateOutputType | null
    _avg: QuotationFixedCostAvgAggregateOutputType | null
    _sum: QuotationFixedCostSumAggregateOutputType | null
    _min: QuotationFixedCostMinAggregateOutputType | null
    _max: QuotationFixedCostMaxAggregateOutputType | null
  }

  type GetQuotationFixedCostGroupByPayload<T extends QuotationFixedCostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuotationFixedCostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuotationFixedCostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuotationFixedCostGroupByOutputType[P]>
            : GetScalarType<T[P], QuotationFixedCostGroupByOutputType[P]>
        }
      >
    >


  export type QuotationFixedCostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quotationId?: boolean
    label?: boolean
    cost?: boolean
    rateNote?: boolean
    hsnCode?: boolean
    gstRate?: boolean
    total?: boolean
    included?: boolean
    sortOrder?: boolean
    quotation?: boolean | QuotationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quotationFixedCost"]>

  export type QuotationFixedCostSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quotationId?: boolean
    label?: boolean
    cost?: boolean
    rateNote?: boolean
    hsnCode?: boolean
    gstRate?: boolean
    total?: boolean
    included?: boolean
    sortOrder?: boolean
    quotation?: boolean | QuotationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quotationFixedCost"]>

  export type QuotationFixedCostSelectScalar = {
    id?: boolean
    quotationId?: boolean
    label?: boolean
    cost?: boolean
    rateNote?: boolean
    hsnCode?: boolean
    gstRate?: boolean
    total?: boolean
    included?: boolean
    sortOrder?: boolean
  }

  export type QuotationFixedCostInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quotation?: boolean | QuotationDefaultArgs<ExtArgs>
  }
  export type QuotationFixedCostIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quotation?: boolean | QuotationDefaultArgs<ExtArgs>
  }

  export type $QuotationFixedCostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QuotationFixedCost"
    objects: {
      quotation: Prisma.$QuotationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      quotationId: number
      label: string
      cost: Prisma.Decimal
      rateNote: string | null
      hsnCode: string | null
      gstRate: Prisma.Decimal
      total: Prisma.Decimal
      included: boolean
      sortOrder: number
    }, ExtArgs["result"]["quotationFixedCost"]>
    composites: {}
  }

  type QuotationFixedCostGetPayload<S extends boolean | null | undefined | QuotationFixedCostDefaultArgs> = $Result.GetResult<Prisma.$QuotationFixedCostPayload, S>

  type QuotationFixedCostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<QuotationFixedCostFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: QuotationFixedCostCountAggregateInputType | true
    }

  export interface QuotationFixedCostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QuotationFixedCost'], meta: { name: 'QuotationFixedCost' } }
    /**
     * Find zero or one QuotationFixedCost that matches the filter.
     * @param {QuotationFixedCostFindUniqueArgs} args - Arguments to find a QuotationFixedCost
     * @example
     * // Get one QuotationFixedCost
     * const quotationFixedCost = await prisma.quotationFixedCost.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuotationFixedCostFindUniqueArgs>(args: SelectSubset<T, QuotationFixedCostFindUniqueArgs<ExtArgs>>): Prisma__QuotationFixedCostClient<$Result.GetResult<Prisma.$QuotationFixedCostPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one QuotationFixedCost that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {QuotationFixedCostFindUniqueOrThrowArgs} args - Arguments to find a QuotationFixedCost
     * @example
     * // Get one QuotationFixedCost
     * const quotationFixedCost = await prisma.quotationFixedCost.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuotationFixedCostFindUniqueOrThrowArgs>(args: SelectSubset<T, QuotationFixedCostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuotationFixedCostClient<$Result.GetResult<Prisma.$QuotationFixedCostPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first QuotationFixedCost that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuotationFixedCostFindFirstArgs} args - Arguments to find a QuotationFixedCost
     * @example
     * // Get one QuotationFixedCost
     * const quotationFixedCost = await prisma.quotationFixedCost.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuotationFixedCostFindFirstArgs>(args?: SelectSubset<T, QuotationFixedCostFindFirstArgs<ExtArgs>>): Prisma__QuotationFixedCostClient<$Result.GetResult<Prisma.$QuotationFixedCostPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first QuotationFixedCost that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuotationFixedCostFindFirstOrThrowArgs} args - Arguments to find a QuotationFixedCost
     * @example
     * // Get one QuotationFixedCost
     * const quotationFixedCost = await prisma.quotationFixedCost.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuotationFixedCostFindFirstOrThrowArgs>(args?: SelectSubset<T, QuotationFixedCostFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuotationFixedCostClient<$Result.GetResult<Prisma.$QuotationFixedCostPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more QuotationFixedCosts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuotationFixedCostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QuotationFixedCosts
     * const quotationFixedCosts = await prisma.quotationFixedCost.findMany()
     * 
     * // Get first 10 QuotationFixedCosts
     * const quotationFixedCosts = await prisma.quotationFixedCost.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const quotationFixedCostWithIdOnly = await prisma.quotationFixedCost.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuotationFixedCostFindManyArgs>(args?: SelectSubset<T, QuotationFixedCostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuotationFixedCostPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a QuotationFixedCost.
     * @param {QuotationFixedCostCreateArgs} args - Arguments to create a QuotationFixedCost.
     * @example
     * // Create one QuotationFixedCost
     * const QuotationFixedCost = await prisma.quotationFixedCost.create({
     *   data: {
     *     // ... data to create a QuotationFixedCost
     *   }
     * })
     * 
     */
    create<T extends QuotationFixedCostCreateArgs>(args: SelectSubset<T, QuotationFixedCostCreateArgs<ExtArgs>>): Prisma__QuotationFixedCostClient<$Result.GetResult<Prisma.$QuotationFixedCostPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many QuotationFixedCosts.
     * @param {QuotationFixedCostCreateManyArgs} args - Arguments to create many QuotationFixedCosts.
     * @example
     * // Create many QuotationFixedCosts
     * const quotationFixedCost = await prisma.quotationFixedCost.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuotationFixedCostCreateManyArgs>(args?: SelectSubset<T, QuotationFixedCostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QuotationFixedCosts and returns the data saved in the database.
     * @param {QuotationFixedCostCreateManyAndReturnArgs} args - Arguments to create many QuotationFixedCosts.
     * @example
     * // Create many QuotationFixedCosts
     * const quotationFixedCost = await prisma.quotationFixedCost.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QuotationFixedCosts and only return the `id`
     * const quotationFixedCostWithIdOnly = await prisma.quotationFixedCost.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuotationFixedCostCreateManyAndReturnArgs>(args?: SelectSubset<T, QuotationFixedCostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuotationFixedCostPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a QuotationFixedCost.
     * @param {QuotationFixedCostDeleteArgs} args - Arguments to delete one QuotationFixedCost.
     * @example
     * // Delete one QuotationFixedCost
     * const QuotationFixedCost = await prisma.quotationFixedCost.delete({
     *   where: {
     *     // ... filter to delete one QuotationFixedCost
     *   }
     * })
     * 
     */
    delete<T extends QuotationFixedCostDeleteArgs>(args: SelectSubset<T, QuotationFixedCostDeleteArgs<ExtArgs>>): Prisma__QuotationFixedCostClient<$Result.GetResult<Prisma.$QuotationFixedCostPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one QuotationFixedCost.
     * @param {QuotationFixedCostUpdateArgs} args - Arguments to update one QuotationFixedCost.
     * @example
     * // Update one QuotationFixedCost
     * const quotationFixedCost = await prisma.quotationFixedCost.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuotationFixedCostUpdateArgs>(args: SelectSubset<T, QuotationFixedCostUpdateArgs<ExtArgs>>): Prisma__QuotationFixedCostClient<$Result.GetResult<Prisma.$QuotationFixedCostPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more QuotationFixedCosts.
     * @param {QuotationFixedCostDeleteManyArgs} args - Arguments to filter QuotationFixedCosts to delete.
     * @example
     * // Delete a few QuotationFixedCosts
     * const { count } = await prisma.quotationFixedCost.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuotationFixedCostDeleteManyArgs>(args?: SelectSubset<T, QuotationFixedCostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuotationFixedCosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuotationFixedCostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QuotationFixedCosts
     * const quotationFixedCost = await prisma.quotationFixedCost.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuotationFixedCostUpdateManyArgs>(args: SelectSubset<T, QuotationFixedCostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one QuotationFixedCost.
     * @param {QuotationFixedCostUpsertArgs} args - Arguments to update or create a QuotationFixedCost.
     * @example
     * // Update or create a QuotationFixedCost
     * const quotationFixedCost = await prisma.quotationFixedCost.upsert({
     *   create: {
     *     // ... data to create a QuotationFixedCost
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QuotationFixedCost we want to update
     *   }
     * })
     */
    upsert<T extends QuotationFixedCostUpsertArgs>(args: SelectSubset<T, QuotationFixedCostUpsertArgs<ExtArgs>>): Prisma__QuotationFixedCostClient<$Result.GetResult<Prisma.$QuotationFixedCostPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of QuotationFixedCosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuotationFixedCostCountArgs} args - Arguments to filter QuotationFixedCosts to count.
     * @example
     * // Count the number of QuotationFixedCosts
     * const count = await prisma.quotationFixedCost.count({
     *   where: {
     *     // ... the filter for the QuotationFixedCosts we want to count
     *   }
     * })
    **/
    count<T extends QuotationFixedCostCountArgs>(
      args?: Subset<T, QuotationFixedCostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuotationFixedCostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QuotationFixedCost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuotationFixedCostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends QuotationFixedCostAggregateArgs>(args: Subset<T, QuotationFixedCostAggregateArgs>): Prisma.PrismaPromise<GetQuotationFixedCostAggregateType<T>>

    /**
     * Group by QuotationFixedCost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuotationFixedCostGroupByArgs} args - Group by arguments.
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
      T extends QuotationFixedCostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuotationFixedCostGroupByArgs['orderBy'] }
        : { orderBy?: QuotationFixedCostGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, QuotationFixedCostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuotationFixedCostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QuotationFixedCost model
   */
  readonly fields: QuotationFixedCostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QuotationFixedCost.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuotationFixedCostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    quotation<T extends QuotationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuotationDefaultArgs<ExtArgs>>): Prisma__QuotationClient<$Result.GetResult<Prisma.$QuotationPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the QuotationFixedCost model
   */ 
  interface QuotationFixedCostFieldRefs {
    readonly id: FieldRef<"QuotationFixedCost", 'Int'>
    readonly quotationId: FieldRef<"QuotationFixedCost", 'Int'>
    readonly label: FieldRef<"QuotationFixedCost", 'String'>
    readonly cost: FieldRef<"QuotationFixedCost", 'Decimal'>
    readonly rateNote: FieldRef<"QuotationFixedCost", 'String'>
    readonly hsnCode: FieldRef<"QuotationFixedCost", 'String'>
    readonly gstRate: FieldRef<"QuotationFixedCost", 'Decimal'>
    readonly total: FieldRef<"QuotationFixedCost", 'Decimal'>
    readonly included: FieldRef<"QuotationFixedCost", 'Boolean'>
    readonly sortOrder: FieldRef<"QuotationFixedCost", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * QuotationFixedCost findUnique
   */
  export type QuotationFixedCostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuotationFixedCost
     */
    select?: QuotationFixedCostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationFixedCostInclude<ExtArgs> | null
    /**
     * Filter, which QuotationFixedCost to fetch.
     */
    where: QuotationFixedCostWhereUniqueInput
  }

  /**
   * QuotationFixedCost findUniqueOrThrow
   */
  export type QuotationFixedCostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuotationFixedCost
     */
    select?: QuotationFixedCostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationFixedCostInclude<ExtArgs> | null
    /**
     * Filter, which QuotationFixedCost to fetch.
     */
    where: QuotationFixedCostWhereUniqueInput
  }

  /**
   * QuotationFixedCost findFirst
   */
  export type QuotationFixedCostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuotationFixedCost
     */
    select?: QuotationFixedCostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationFixedCostInclude<ExtArgs> | null
    /**
     * Filter, which QuotationFixedCost to fetch.
     */
    where?: QuotationFixedCostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuotationFixedCosts to fetch.
     */
    orderBy?: QuotationFixedCostOrderByWithRelationInput | QuotationFixedCostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuotationFixedCosts.
     */
    cursor?: QuotationFixedCostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuotationFixedCosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuotationFixedCosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuotationFixedCosts.
     */
    distinct?: QuotationFixedCostScalarFieldEnum | QuotationFixedCostScalarFieldEnum[]
  }

  /**
   * QuotationFixedCost findFirstOrThrow
   */
  export type QuotationFixedCostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuotationFixedCost
     */
    select?: QuotationFixedCostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationFixedCostInclude<ExtArgs> | null
    /**
     * Filter, which QuotationFixedCost to fetch.
     */
    where?: QuotationFixedCostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuotationFixedCosts to fetch.
     */
    orderBy?: QuotationFixedCostOrderByWithRelationInput | QuotationFixedCostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuotationFixedCosts.
     */
    cursor?: QuotationFixedCostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuotationFixedCosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuotationFixedCosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuotationFixedCosts.
     */
    distinct?: QuotationFixedCostScalarFieldEnum | QuotationFixedCostScalarFieldEnum[]
  }

  /**
   * QuotationFixedCost findMany
   */
  export type QuotationFixedCostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuotationFixedCost
     */
    select?: QuotationFixedCostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationFixedCostInclude<ExtArgs> | null
    /**
     * Filter, which QuotationFixedCosts to fetch.
     */
    where?: QuotationFixedCostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuotationFixedCosts to fetch.
     */
    orderBy?: QuotationFixedCostOrderByWithRelationInput | QuotationFixedCostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QuotationFixedCosts.
     */
    cursor?: QuotationFixedCostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuotationFixedCosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuotationFixedCosts.
     */
    skip?: number
    distinct?: QuotationFixedCostScalarFieldEnum | QuotationFixedCostScalarFieldEnum[]
  }

  /**
   * QuotationFixedCost create
   */
  export type QuotationFixedCostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuotationFixedCost
     */
    select?: QuotationFixedCostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationFixedCostInclude<ExtArgs> | null
    /**
     * The data needed to create a QuotationFixedCost.
     */
    data: XOR<QuotationFixedCostCreateInput, QuotationFixedCostUncheckedCreateInput>
  }

  /**
   * QuotationFixedCost createMany
   */
  export type QuotationFixedCostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QuotationFixedCosts.
     */
    data: QuotationFixedCostCreateManyInput | QuotationFixedCostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QuotationFixedCost createManyAndReturn
   */
  export type QuotationFixedCostCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuotationFixedCost
     */
    select?: QuotationFixedCostSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many QuotationFixedCosts.
     */
    data: QuotationFixedCostCreateManyInput | QuotationFixedCostCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationFixedCostIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * QuotationFixedCost update
   */
  export type QuotationFixedCostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuotationFixedCost
     */
    select?: QuotationFixedCostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationFixedCostInclude<ExtArgs> | null
    /**
     * The data needed to update a QuotationFixedCost.
     */
    data: XOR<QuotationFixedCostUpdateInput, QuotationFixedCostUncheckedUpdateInput>
    /**
     * Choose, which QuotationFixedCost to update.
     */
    where: QuotationFixedCostWhereUniqueInput
  }

  /**
   * QuotationFixedCost updateMany
   */
  export type QuotationFixedCostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QuotationFixedCosts.
     */
    data: XOR<QuotationFixedCostUpdateManyMutationInput, QuotationFixedCostUncheckedUpdateManyInput>
    /**
     * Filter which QuotationFixedCosts to update
     */
    where?: QuotationFixedCostWhereInput
  }

  /**
   * QuotationFixedCost upsert
   */
  export type QuotationFixedCostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuotationFixedCost
     */
    select?: QuotationFixedCostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationFixedCostInclude<ExtArgs> | null
    /**
     * The filter to search for the QuotationFixedCost to update in case it exists.
     */
    where: QuotationFixedCostWhereUniqueInput
    /**
     * In case the QuotationFixedCost found by the `where` argument doesn't exist, create a new QuotationFixedCost with this data.
     */
    create: XOR<QuotationFixedCostCreateInput, QuotationFixedCostUncheckedCreateInput>
    /**
     * In case the QuotationFixedCost was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuotationFixedCostUpdateInput, QuotationFixedCostUncheckedUpdateInput>
  }

  /**
   * QuotationFixedCost delete
   */
  export type QuotationFixedCostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuotationFixedCost
     */
    select?: QuotationFixedCostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationFixedCostInclude<ExtArgs> | null
    /**
     * Filter which QuotationFixedCost to delete.
     */
    where: QuotationFixedCostWhereUniqueInput
  }

  /**
   * QuotationFixedCost deleteMany
   */
  export type QuotationFixedCostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuotationFixedCosts to delete
     */
    where?: QuotationFixedCostWhereInput
  }

  /**
   * QuotationFixedCost without action
   */
  export type QuotationFixedCostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuotationFixedCost
     */
    select?: QuotationFixedCostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationFixedCostInclude<ExtArgs> | null
  }


  /**
   * Model Employee
   */

  export type AggregateEmployee = {
    _count: EmployeeCountAggregateOutputType | null
    _avg: EmployeeAvgAggregateOutputType | null
    _sum: EmployeeSumAggregateOutputType | null
    _min: EmployeeMinAggregateOutputType | null
    _max: EmployeeMaxAggregateOutputType | null
  }

  export type EmployeeAvgAggregateOutputType = {
    id: number | null
    companyId: number | null
  }

  export type EmployeeSumAggregateOutputType = {
    id: number | null
    companyId: number | null
  }

  export type EmployeeMinAggregateOutputType = {
    id: number | null
    companyId: number | null
    name: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.EmployeeRole | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmployeeMaxAggregateOutputType = {
    id: number | null
    companyId: number | null
    name: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.EmployeeRole | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmployeeCountAggregateOutputType = {
    id: number
    companyId: number
    name: number
    email: number
    passwordHash: number
    role: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EmployeeAvgAggregateInputType = {
    id?: true
    companyId?: true
  }

  export type EmployeeSumAggregateInputType = {
    id?: true
    companyId?: true
  }

  export type EmployeeMinAggregateInputType = {
    id?: true
    companyId?: true
    name?: true
    email?: true
    passwordHash?: true
    role?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmployeeMaxAggregateInputType = {
    id?: true
    companyId?: true
    name?: true
    email?: true
    passwordHash?: true
    role?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmployeeCountAggregateInputType = {
    id?: true
    companyId?: true
    name?: true
    email?: true
    passwordHash?: true
    role?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EmployeeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Employee to aggregate.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Employees
    **/
    _count?: true | EmployeeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmployeeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmployeeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmployeeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmployeeMaxAggregateInputType
  }

  export type GetEmployeeAggregateType<T extends EmployeeAggregateArgs> = {
        [P in keyof T & keyof AggregateEmployee]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployee[P]>
      : GetScalarType<T[P], AggregateEmployee[P]>
  }




  export type EmployeeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeWhereInput
    orderBy?: EmployeeOrderByWithAggregationInput | EmployeeOrderByWithAggregationInput[]
    by: EmployeeScalarFieldEnum[] | EmployeeScalarFieldEnum
    having?: EmployeeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmployeeCountAggregateInputType | true
    _avg?: EmployeeAvgAggregateInputType
    _sum?: EmployeeSumAggregateInputType
    _min?: EmployeeMinAggregateInputType
    _max?: EmployeeMaxAggregateInputType
  }

  export type EmployeeGroupByOutputType = {
    id: number
    companyId: number
    name: string
    email: string
    passwordHash: string
    role: $Enums.EmployeeRole
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: EmployeeCountAggregateOutputType | null
    _avg: EmployeeAvgAggregateOutputType | null
    _sum: EmployeeSumAggregateOutputType | null
    _min: EmployeeMinAggregateOutputType | null
    _max: EmployeeMaxAggregateOutputType | null
  }

  type GetEmployeeGroupByPayload<T extends EmployeeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmployeeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmployeeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmployeeGroupByOutputType[P]>
            : GetScalarType<T[P], EmployeeGroupByOutputType[P]>
        }
      >
    >


  export type EmployeeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    sessions?: boolean | Employee$sessionsArgs<ExtArgs>
    _count?: boolean | EmployeeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employee"]>

  export type EmployeeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employee"]>

  export type EmployeeSelectScalar = {
    id?: boolean
    companyId?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EmployeeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    sessions?: boolean | Employee$sessionsArgs<ExtArgs>
    _count?: boolean | EmployeeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EmployeeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $EmployeePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Employee"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
      sessions: Prisma.$SessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      companyId: number
      name: string
      email: string
      passwordHash: string
      role: $Enums.EmployeeRole
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["employee"]>
    composites: {}
  }

  type EmployeeGetPayload<S extends boolean | null | undefined | EmployeeDefaultArgs> = $Result.GetResult<Prisma.$EmployeePayload, S>

  type EmployeeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<EmployeeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: EmployeeCountAggregateInputType | true
    }

  export interface EmployeeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Employee'], meta: { name: 'Employee' } }
    /**
     * Find zero or one Employee that matches the filter.
     * @param {EmployeeFindUniqueArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmployeeFindUniqueArgs>(args: SelectSubset<T, EmployeeFindUniqueArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Employee that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {EmployeeFindUniqueOrThrowArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmployeeFindUniqueOrThrowArgs>(args: SelectSubset<T, EmployeeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Employee that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindFirstArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmployeeFindFirstArgs>(args?: SelectSubset<T, EmployeeFindFirstArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Employee that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindFirstOrThrowArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmployeeFindFirstOrThrowArgs>(args?: SelectSubset<T, EmployeeFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Employees that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Employees
     * const employees = await prisma.employee.findMany()
     * 
     * // Get first 10 Employees
     * const employees = await prisma.employee.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const employeeWithIdOnly = await prisma.employee.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmployeeFindManyArgs>(args?: SelectSubset<T, EmployeeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Employee.
     * @param {EmployeeCreateArgs} args - Arguments to create a Employee.
     * @example
     * // Create one Employee
     * const Employee = await prisma.employee.create({
     *   data: {
     *     // ... data to create a Employee
     *   }
     * })
     * 
     */
    create<T extends EmployeeCreateArgs>(args: SelectSubset<T, EmployeeCreateArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Employees.
     * @param {EmployeeCreateManyArgs} args - Arguments to create many Employees.
     * @example
     * // Create many Employees
     * const employee = await prisma.employee.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmployeeCreateManyArgs>(args?: SelectSubset<T, EmployeeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Employees and returns the data saved in the database.
     * @param {EmployeeCreateManyAndReturnArgs} args - Arguments to create many Employees.
     * @example
     * // Create many Employees
     * const employee = await prisma.employee.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Employees and only return the `id`
     * const employeeWithIdOnly = await prisma.employee.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmployeeCreateManyAndReturnArgs>(args?: SelectSubset<T, EmployeeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Employee.
     * @param {EmployeeDeleteArgs} args - Arguments to delete one Employee.
     * @example
     * // Delete one Employee
     * const Employee = await prisma.employee.delete({
     *   where: {
     *     // ... filter to delete one Employee
     *   }
     * })
     * 
     */
    delete<T extends EmployeeDeleteArgs>(args: SelectSubset<T, EmployeeDeleteArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Employee.
     * @param {EmployeeUpdateArgs} args - Arguments to update one Employee.
     * @example
     * // Update one Employee
     * const employee = await prisma.employee.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmployeeUpdateArgs>(args: SelectSubset<T, EmployeeUpdateArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Employees.
     * @param {EmployeeDeleteManyArgs} args - Arguments to filter Employees to delete.
     * @example
     * // Delete a few Employees
     * const { count } = await prisma.employee.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmployeeDeleteManyArgs>(args?: SelectSubset<T, EmployeeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Employees
     * const employee = await prisma.employee.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmployeeUpdateManyArgs>(args: SelectSubset<T, EmployeeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Employee.
     * @param {EmployeeUpsertArgs} args - Arguments to update or create a Employee.
     * @example
     * // Update or create a Employee
     * const employee = await prisma.employee.upsert({
     *   create: {
     *     // ... data to create a Employee
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Employee we want to update
     *   }
     * })
     */
    upsert<T extends EmployeeUpsertArgs>(args: SelectSubset<T, EmployeeUpsertArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeCountArgs} args - Arguments to filter Employees to count.
     * @example
     * // Count the number of Employees
     * const count = await prisma.employee.count({
     *   where: {
     *     // ... the filter for the Employees we want to count
     *   }
     * })
    **/
    count<T extends EmployeeCountArgs>(
      args?: Subset<T, EmployeeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployeeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Employee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EmployeeAggregateArgs>(args: Subset<T, EmployeeAggregateArgs>): Prisma.PrismaPromise<GetEmployeeAggregateType<T>>

    /**
     * Group by Employee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeGroupByArgs} args - Group by arguments.
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
      T extends EmployeeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmployeeGroupByArgs['orderBy'] }
        : { orderBy?: EmployeeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EmployeeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployeeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Employee model
   */
  readonly fields: EmployeeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Employee.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmployeeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    sessions<T extends Employee$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, Employee$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Employee model
   */ 
  interface EmployeeFieldRefs {
    readonly id: FieldRef<"Employee", 'Int'>
    readonly companyId: FieldRef<"Employee", 'Int'>
    readonly name: FieldRef<"Employee", 'String'>
    readonly email: FieldRef<"Employee", 'String'>
    readonly passwordHash: FieldRef<"Employee", 'String'>
    readonly role: FieldRef<"Employee", 'EmployeeRole'>
    readonly isActive: FieldRef<"Employee", 'Boolean'>
    readonly createdAt: FieldRef<"Employee", 'DateTime'>
    readonly updatedAt: FieldRef<"Employee", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Employee findUnique
   */
  export type EmployeeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee findUniqueOrThrow
   */
  export type EmployeeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee findFirst
   */
  export type EmployeeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employees.
     */
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee findFirstOrThrow
   */
  export type EmployeeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employees.
     */
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee findMany
   */
  export type EmployeeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employees to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee create
   */
  export type EmployeeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The data needed to create a Employee.
     */
    data: XOR<EmployeeCreateInput, EmployeeUncheckedCreateInput>
  }

  /**
   * Employee createMany
   */
  export type EmployeeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Employees.
     */
    data: EmployeeCreateManyInput | EmployeeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Employee createManyAndReturn
   */
  export type EmployeeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Employees.
     */
    data: EmployeeCreateManyInput | EmployeeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Employee update
   */
  export type EmployeeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The data needed to update a Employee.
     */
    data: XOR<EmployeeUpdateInput, EmployeeUncheckedUpdateInput>
    /**
     * Choose, which Employee to update.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee updateMany
   */
  export type EmployeeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Employees.
     */
    data: XOR<EmployeeUpdateManyMutationInput, EmployeeUncheckedUpdateManyInput>
    /**
     * Filter which Employees to update
     */
    where?: EmployeeWhereInput
  }

  /**
   * Employee upsert
   */
  export type EmployeeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The filter to search for the Employee to update in case it exists.
     */
    where: EmployeeWhereUniqueInput
    /**
     * In case the Employee found by the `where` argument doesn't exist, create a new Employee with this data.
     */
    create: XOR<EmployeeCreateInput, EmployeeUncheckedCreateInput>
    /**
     * In case the Employee was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmployeeUpdateInput, EmployeeUncheckedUpdateInput>
  }

  /**
   * Employee delete
   */
  export type EmployeeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter which Employee to delete.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee deleteMany
   */
  export type EmployeeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Employees to delete
     */
    where?: EmployeeWhereInput
  }

  /**
   * Employee.sessions
   */
  export type Employee$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Employee without action
   */
  export type EmployeeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _avg: SessionAvgAggregateOutputType | null
    _sum: SessionSumAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionAvgAggregateOutputType = {
    employeeId: number | null
  }

  export type SessionSumAggregateOutputType = {
    employeeId: number | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    employeeId: number | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    employeeId: number | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    employeeId: number
    expiresAt: number
    createdAt: number
    _all: number
  }


  export type SessionAvgAggregateInputType = {
    employeeId?: true
  }

  export type SessionSumAggregateInputType = {
    employeeId?: true
  }

  export type SessionMinAggregateInputType = {
    id?: true
    employeeId?: true
    expiresAt?: true
    createdAt?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    employeeId?: true
    expiresAt?: true
    createdAt?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    employeeId?: true
    expiresAt?: true
    createdAt?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _avg?: SessionAvgAggregateInputType
    _sum?: SessionSumAggregateInputType
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    employeeId: number
    expiresAt: Date
    createdAt: Date
    _count: SessionCountAggregateOutputType | null
    _avg: SessionAvgAggregateOutputType | null
    _sum: SessionSumAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    employeeId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }

  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      employee: Prisma.$EmployeePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employeeId: number
      expiresAt: Date
      createdAt: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
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
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employee<T extends EmployeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeDefaultArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the Session model
   */ 
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly employeeId: FieldRef<"Session", 'Int'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
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


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    hsnCode: 'hsnCode',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const CategoryAttributeScalarFieldEnum: {
    id: 'id',
    categoryId: 'categoryId',
    name: 'name',
    type: 'type',
    required: 'required',
    sortOrder: 'sortOrder'
  };

  export type CategoryAttributeScalarFieldEnum = (typeof CategoryAttributeScalarFieldEnum)[keyof typeof CategoryAttributeScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    sku: 'sku',
    name: 'name',
    manufacturer: 'manufacturer',
    categoryId: 'categoryId',
    basePrice: 'basePrice',
    gstRate: 'gstRate',
    barcodeHandling: 'barcodeHandling',
    barcode: 'barcode',
    barcodeType: 'barcodeType',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const ProductAttributeValueScalarFieldEnum: {
    id: 'id',
    productId: 'productId',
    attributeId: 'attributeId',
    value: 'value'
  };

  export type ProductAttributeValueScalarFieldEnum = (typeof ProductAttributeValueScalarFieldEnum)[keyof typeof ProductAttributeValueScalarFieldEnum]


  export const WarehouseScalarFieldEnum: {
    id: 'id',
    name: 'name',
    location: 'location',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WarehouseScalarFieldEnum = (typeof WarehouseScalarFieldEnum)[keyof typeof WarehouseScalarFieldEnum]


  export const InventoryItemScalarFieldEnum: {
    id: 'id',
    productId: 'productId',
    warehouseId: 'warehouseId',
    quantity: 'quantity',
    salePrice: 'salePrice',
    location: 'location',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type InventoryItemScalarFieldEnum = (typeof InventoryItemScalarFieldEnum)[keyof typeof InventoryItemScalarFieldEnum]


  export const UniqueBarcodeScalarFieldEnum: {
    id: 'id',
    inventoryItemId: 'inventoryItemId',
    barcode: 'barcode',
    createdAt: 'createdAt'
  };

  export type UniqueBarcodeScalarFieldEnum = (typeof UniqueBarcodeScalarFieldEnum)[keyof typeof UniqueBarcodeScalarFieldEnum]


  export const CompanyScalarFieldEnum: {
    id: 'id',
    name: 'name',
    ownerName: 'ownerName',
    address: 'address',
    gstNumber: 'gstNumber',
    contact: 'contact',
    email: 'email',
    logoUrl: 'logoUrl',
    bankName: 'bankName',
    branchName: 'branchName',
    accountName: 'accountName',
    accountNumber: 'accountNumber',
    ifscCode: 'ifscCode',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CompanyScalarFieldEnum = (typeof CompanyScalarFieldEnum)[keyof typeof CompanyScalarFieldEnum]


  export const QuotationScalarFieldEnum: {
    id: 'id',
    quoteNumber: 'quoteNumber',
    quoteDate: 'quoteDate',
    companyId: 'companyId',
    customerName: 'customerName',
    customerAddress: 'customerAddress',
    customerContact: 'customerContact',
    customerEmail: 'customerEmail',
    systemType: 'systemType',
    systemSizeKw: 'systemSizeKw',
    panelType: 'panelType',
    panelWattage: 'panelWattage',
    panelCount: 'panelCount',
    outputWattageKw: 'outputWattageKw',
    phase: 'phase',
    subtotal: 'subtotal',
    totalGst: 'totalGst',
    discountPercent: 'discountPercent',
    discountAmount: 'discountAmount',
    finalPrice: 'finalPrice',
    roundedPrice: 'roundedPrice',
    advancePayment: 'advancePayment',
    balanceDue: 'balanceDue',
    paymentType: 'paymentType',
    receiverName: 'receiverName',
    remarks: 'remarks',
    preparedBy: 'preparedBy',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type QuotationScalarFieldEnum = (typeof QuotationScalarFieldEnum)[keyof typeof QuotationScalarFieldEnum]


  export const QuotationItemScalarFieldEnum: {
    id: 'id',
    quotationId: 'quotationId',
    categoryName: 'categoryName',
    productName: 'productName',
    hsnCode: 'hsnCode',
    description: 'description',
    unitPrice: 'unitPrice',
    quantity: 'quantity',
    gstRate: 'gstRate',
    totalPrice: 'totalPrice',
    sortOrder: 'sortOrder'
  };

  export type QuotationItemScalarFieldEnum = (typeof QuotationItemScalarFieldEnum)[keyof typeof QuotationItemScalarFieldEnum]


  export const QuotationFixedCostScalarFieldEnum: {
    id: 'id',
    quotationId: 'quotationId',
    label: 'label',
    cost: 'cost',
    rateNote: 'rateNote',
    hsnCode: 'hsnCode',
    gstRate: 'gstRate',
    total: 'total',
    included: 'included',
    sortOrder: 'sortOrder'
  };

  export type QuotationFixedCostScalarFieldEnum = (typeof QuotationFixedCostScalarFieldEnum)[keyof typeof QuotationFixedCostScalarFieldEnum]


  export const EmployeeScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    name: 'name',
    email: 'email',
    passwordHash: 'passwordHash',
    role: 'role',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EmployeeScalarFieldEnum = (typeof EmployeeScalarFieldEnum)[keyof typeof EmployeeScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    employeeId: 'employeeId',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


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
   * Reference to a field of type 'AttributeType'
   */
  export type EnumAttributeTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AttributeType'>
    


  /**
   * Reference to a field of type 'AttributeType[]'
   */
  export type ListEnumAttributeTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AttributeType[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'BarcodeHandling'
   */
  export type EnumBarcodeHandlingFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BarcodeHandling'>
    


  /**
   * Reference to a field of type 'BarcodeHandling[]'
   */
  export type ListEnumBarcodeHandlingFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BarcodeHandling[]'>
    


  /**
   * Reference to a field of type 'BarcodeType'
   */
  export type EnumBarcodeTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BarcodeType'>
    


  /**
   * Reference to a field of type 'BarcodeType[]'
   */
  export type ListEnumBarcodeTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BarcodeType[]'>
    


  /**
   * Reference to a field of type 'WarehouseStatus'
   */
  export type EnumWarehouseStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WarehouseStatus'>
    


  /**
   * Reference to a field of type 'WarehouseStatus[]'
   */
  export type ListEnumWarehouseStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WarehouseStatus[]'>
    


  /**
   * Reference to a field of type 'QuotationStatus'
   */
  export type EnumQuotationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QuotationStatus'>
    


  /**
   * Reference to a field of type 'QuotationStatus[]'
   */
  export type ListEnumQuotationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QuotationStatus[]'>
    


  /**
   * Reference to a field of type 'EmployeeRole'
   */
  export type EnumEmployeeRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EmployeeRole'>
    


  /**
   * Reference to a field of type 'EmployeeRole[]'
   */
  export type ListEnumEmployeeRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EmployeeRole[]'>
    


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


  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: IntFilter<"Category"> | number
    name?: StringFilter<"Category"> | string
    description?: StringNullableFilter<"Category"> | string | null
    hsnCode?: StringNullableFilter<"Category"> | string | null
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    attributes?: CategoryAttributeListRelationFilter
    products?: ProductListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    hsnCode?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    attributes?: CategoryAttributeOrderByRelationAggregateInput
    products?: ProductOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    description?: StringNullableFilter<"Category"> | string | null
    hsnCode?: StringNullableFilter<"Category"> | string | null
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    attributes?: CategoryAttributeListRelationFilter
    products?: ProductListRelationFilter
  }, "id" | "name">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    hsnCode?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _avg?: CategoryAvgOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
    _sum?: CategorySumOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Category"> | number
    name?: StringWithAggregatesFilter<"Category"> | string
    description?: StringNullableWithAggregatesFilter<"Category"> | string | null
    hsnCode?: StringNullableWithAggregatesFilter<"Category"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
  }

  export type CategoryAttributeWhereInput = {
    AND?: CategoryAttributeWhereInput | CategoryAttributeWhereInput[]
    OR?: CategoryAttributeWhereInput[]
    NOT?: CategoryAttributeWhereInput | CategoryAttributeWhereInput[]
    id?: IntFilter<"CategoryAttribute"> | number
    categoryId?: IntFilter<"CategoryAttribute"> | number
    name?: StringFilter<"CategoryAttribute"> | string
    type?: EnumAttributeTypeFilter<"CategoryAttribute"> | $Enums.AttributeType
    required?: BoolFilter<"CategoryAttribute"> | boolean
    sortOrder?: IntFilter<"CategoryAttribute"> | number
    category?: XOR<CategoryRelationFilter, CategoryWhereInput>
  }

  export type CategoryAttributeOrderByWithRelationInput = {
    id?: SortOrder
    categoryId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    required?: SortOrder
    sortOrder?: SortOrder
    category?: CategoryOrderByWithRelationInput
  }

  export type CategoryAttributeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    categoryId_name?: CategoryAttributeCategoryIdNameCompoundUniqueInput
    AND?: CategoryAttributeWhereInput | CategoryAttributeWhereInput[]
    OR?: CategoryAttributeWhereInput[]
    NOT?: CategoryAttributeWhereInput | CategoryAttributeWhereInput[]
    categoryId?: IntFilter<"CategoryAttribute"> | number
    name?: StringFilter<"CategoryAttribute"> | string
    type?: EnumAttributeTypeFilter<"CategoryAttribute"> | $Enums.AttributeType
    required?: BoolFilter<"CategoryAttribute"> | boolean
    sortOrder?: IntFilter<"CategoryAttribute"> | number
    category?: XOR<CategoryRelationFilter, CategoryWhereInput>
  }, "id" | "categoryId_name">

  export type CategoryAttributeOrderByWithAggregationInput = {
    id?: SortOrder
    categoryId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    required?: SortOrder
    sortOrder?: SortOrder
    _count?: CategoryAttributeCountOrderByAggregateInput
    _avg?: CategoryAttributeAvgOrderByAggregateInput
    _max?: CategoryAttributeMaxOrderByAggregateInput
    _min?: CategoryAttributeMinOrderByAggregateInput
    _sum?: CategoryAttributeSumOrderByAggregateInput
  }

  export type CategoryAttributeScalarWhereWithAggregatesInput = {
    AND?: CategoryAttributeScalarWhereWithAggregatesInput | CategoryAttributeScalarWhereWithAggregatesInput[]
    OR?: CategoryAttributeScalarWhereWithAggregatesInput[]
    NOT?: CategoryAttributeScalarWhereWithAggregatesInput | CategoryAttributeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CategoryAttribute"> | number
    categoryId?: IntWithAggregatesFilter<"CategoryAttribute"> | number
    name?: StringWithAggregatesFilter<"CategoryAttribute"> | string
    type?: EnumAttributeTypeWithAggregatesFilter<"CategoryAttribute"> | $Enums.AttributeType
    required?: BoolWithAggregatesFilter<"CategoryAttribute"> | boolean
    sortOrder?: IntWithAggregatesFilter<"CategoryAttribute"> | number
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: IntFilter<"Product"> | number
    sku?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    manufacturer?: StringNullableFilter<"Product"> | string | null
    categoryId?: IntFilter<"Product"> | number
    basePrice?: DecimalFilter<"Product"> | Decimal | DecimalJsLike | number | string
    gstRate?: DecimalFilter<"Product"> | Decimal | DecimalJsLike | number | string
    barcodeHandling?: EnumBarcodeHandlingFilter<"Product"> | $Enums.BarcodeHandling
    barcode?: StringNullableFilter<"Product"> | string | null
    barcodeType?: EnumBarcodeTypeFilter<"Product"> | $Enums.BarcodeType
    description?: StringNullableFilter<"Product"> | string | null
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    category?: XOR<CategoryRelationFilter, CategoryWhereInput>
    attributeValues?: ProductAttributeValueListRelationFilter
    inventoryItems?: InventoryItemListRelationFilter
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    sku?: SortOrder
    name?: SortOrder
    manufacturer?: SortOrderInput | SortOrder
    categoryId?: SortOrder
    basePrice?: SortOrder
    gstRate?: SortOrder
    barcodeHandling?: SortOrder
    barcode?: SortOrderInput | SortOrder
    barcodeType?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    category?: CategoryOrderByWithRelationInput
    attributeValues?: ProductAttributeValueOrderByRelationAggregateInput
    inventoryItems?: InventoryItemOrderByRelationAggregateInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    sku?: string
    barcode?: string
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    name?: StringFilter<"Product"> | string
    manufacturer?: StringNullableFilter<"Product"> | string | null
    categoryId?: IntFilter<"Product"> | number
    basePrice?: DecimalFilter<"Product"> | Decimal | DecimalJsLike | number | string
    gstRate?: DecimalFilter<"Product"> | Decimal | DecimalJsLike | number | string
    barcodeHandling?: EnumBarcodeHandlingFilter<"Product"> | $Enums.BarcodeHandling
    barcodeType?: EnumBarcodeTypeFilter<"Product"> | $Enums.BarcodeType
    description?: StringNullableFilter<"Product"> | string | null
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    category?: XOR<CategoryRelationFilter, CategoryWhereInput>
    attributeValues?: ProductAttributeValueListRelationFilter
    inventoryItems?: InventoryItemListRelationFilter
  }, "id" | "sku" | "barcode">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    sku?: SortOrder
    name?: SortOrder
    manufacturer?: SortOrderInput | SortOrder
    categoryId?: SortOrder
    basePrice?: SortOrder
    gstRate?: SortOrder
    barcodeHandling?: SortOrder
    barcode?: SortOrderInput | SortOrder
    barcodeType?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Product"> | number
    sku?: StringWithAggregatesFilter<"Product"> | string
    name?: StringWithAggregatesFilter<"Product"> | string
    manufacturer?: StringNullableWithAggregatesFilter<"Product"> | string | null
    categoryId?: IntWithAggregatesFilter<"Product"> | number
    basePrice?: DecimalWithAggregatesFilter<"Product"> | Decimal | DecimalJsLike | number | string
    gstRate?: DecimalWithAggregatesFilter<"Product"> | Decimal | DecimalJsLike | number | string
    barcodeHandling?: EnumBarcodeHandlingWithAggregatesFilter<"Product"> | $Enums.BarcodeHandling
    barcode?: StringNullableWithAggregatesFilter<"Product"> | string | null
    barcodeType?: EnumBarcodeTypeWithAggregatesFilter<"Product"> | $Enums.BarcodeType
    description?: StringNullableWithAggregatesFilter<"Product"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
  }

  export type ProductAttributeValueWhereInput = {
    AND?: ProductAttributeValueWhereInput | ProductAttributeValueWhereInput[]
    OR?: ProductAttributeValueWhereInput[]
    NOT?: ProductAttributeValueWhereInput | ProductAttributeValueWhereInput[]
    id?: IntFilter<"ProductAttributeValue"> | number
    productId?: IntFilter<"ProductAttributeValue"> | number
    attributeId?: IntFilter<"ProductAttributeValue"> | number
    value?: StringFilter<"ProductAttributeValue"> | string
    product?: XOR<ProductRelationFilter, ProductWhereInput>
  }

  export type ProductAttributeValueOrderByWithRelationInput = {
    id?: SortOrder
    productId?: SortOrder
    attributeId?: SortOrder
    value?: SortOrder
    product?: ProductOrderByWithRelationInput
  }

  export type ProductAttributeValueWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    productId_attributeId?: ProductAttributeValueProductIdAttributeIdCompoundUniqueInput
    AND?: ProductAttributeValueWhereInput | ProductAttributeValueWhereInput[]
    OR?: ProductAttributeValueWhereInput[]
    NOT?: ProductAttributeValueWhereInput | ProductAttributeValueWhereInput[]
    productId?: IntFilter<"ProductAttributeValue"> | number
    attributeId?: IntFilter<"ProductAttributeValue"> | number
    value?: StringFilter<"ProductAttributeValue"> | string
    product?: XOR<ProductRelationFilter, ProductWhereInput>
  }, "id" | "productId_attributeId">

  export type ProductAttributeValueOrderByWithAggregationInput = {
    id?: SortOrder
    productId?: SortOrder
    attributeId?: SortOrder
    value?: SortOrder
    _count?: ProductAttributeValueCountOrderByAggregateInput
    _avg?: ProductAttributeValueAvgOrderByAggregateInput
    _max?: ProductAttributeValueMaxOrderByAggregateInput
    _min?: ProductAttributeValueMinOrderByAggregateInput
    _sum?: ProductAttributeValueSumOrderByAggregateInput
  }

  export type ProductAttributeValueScalarWhereWithAggregatesInput = {
    AND?: ProductAttributeValueScalarWhereWithAggregatesInput | ProductAttributeValueScalarWhereWithAggregatesInput[]
    OR?: ProductAttributeValueScalarWhereWithAggregatesInput[]
    NOT?: ProductAttributeValueScalarWhereWithAggregatesInput | ProductAttributeValueScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ProductAttributeValue"> | number
    productId?: IntWithAggregatesFilter<"ProductAttributeValue"> | number
    attributeId?: IntWithAggregatesFilter<"ProductAttributeValue"> | number
    value?: StringWithAggregatesFilter<"ProductAttributeValue"> | string
  }

  export type WarehouseWhereInput = {
    AND?: WarehouseWhereInput | WarehouseWhereInput[]
    OR?: WarehouseWhereInput[]
    NOT?: WarehouseWhereInput | WarehouseWhereInput[]
    id?: IntFilter<"Warehouse"> | number
    name?: StringFilter<"Warehouse"> | string
    location?: StringNullableFilter<"Warehouse"> | string | null
    status?: EnumWarehouseStatusFilter<"Warehouse"> | $Enums.WarehouseStatus
    createdAt?: DateTimeFilter<"Warehouse"> | Date | string
    updatedAt?: DateTimeFilter<"Warehouse"> | Date | string
    inventoryItems?: InventoryItemListRelationFilter
  }

  export type WarehouseOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    inventoryItems?: InventoryItemOrderByRelationAggregateInput
  }

  export type WarehouseWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: WarehouseWhereInput | WarehouseWhereInput[]
    OR?: WarehouseWhereInput[]
    NOT?: WarehouseWhereInput | WarehouseWhereInput[]
    location?: StringNullableFilter<"Warehouse"> | string | null
    status?: EnumWarehouseStatusFilter<"Warehouse"> | $Enums.WarehouseStatus
    createdAt?: DateTimeFilter<"Warehouse"> | Date | string
    updatedAt?: DateTimeFilter<"Warehouse"> | Date | string
    inventoryItems?: InventoryItemListRelationFilter
  }, "id" | "name">

  export type WarehouseOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WarehouseCountOrderByAggregateInput
    _avg?: WarehouseAvgOrderByAggregateInput
    _max?: WarehouseMaxOrderByAggregateInput
    _min?: WarehouseMinOrderByAggregateInput
    _sum?: WarehouseSumOrderByAggregateInput
  }

  export type WarehouseScalarWhereWithAggregatesInput = {
    AND?: WarehouseScalarWhereWithAggregatesInput | WarehouseScalarWhereWithAggregatesInput[]
    OR?: WarehouseScalarWhereWithAggregatesInput[]
    NOT?: WarehouseScalarWhereWithAggregatesInput | WarehouseScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Warehouse"> | number
    name?: StringWithAggregatesFilter<"Warehouse"> | string
    location?: StringNullableWithAggregatesFilter<"Warehouse"> | string | null
    status?: EnumWarehouseStatusWithAggregatesFilter<"Warehouse"> | $Enums.WarehouseStatus
    createdAt?: DateTimeWithAggregatesFilter<"Warehouse"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Warehouse"> | Date | string
  }

  export type InventoryItemWhereInput = {
    AND?: InventoryItemWhereInput | InventoryItemWhereInput[]
    OR?: InventoryItemWhereInput[]
    NOT?: InventoryItemWhereInput | InventoryItemWhereInput[]
    id?: IntFilter<"InventoryItem"> | number
    productId?: IntFilter<"InventoryItem"> | number
    warehouseId?: IntFilter<"InventoryItem"> | number
    quantity?: IntFilter<"InventoryItem"> | number
    salePrice?: DecimalFilter<"InventoryItem"> | Decimal | DecimalJsLike | number | string
    location?: StringNullableFilter<"InventoryItem"> | string | null
    createdAt?: DateTimeFilter<"InventoryItem"> | Date | string
    updatedAt?: DateTimeFilter<"InventoryItem"> | Date | string
    product?: XOR<ProductRelationFilter, ProductWhereInput>
    warehouse?: XOR<WarehouseRelationFilter, WarehouseWhereInput>
    uniqueBarcodes?: UniqueBarcodeListRelationFilter
  }

  export type InventoryItemOrderByWithRelationInput = {
    id?: SortOrder
    productId?: SortOrder
    warehouseId?: SortOrder
    quantity?: SortOrder
    salePrice?: SortOrder
    location?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    product?: ProductOrderByWithRelationInput
    warehouse?: WarehouseOrderByWithRelationInput
    uniqueBarcodes?: UniqueBarcodeOrderByRelationAggregateInput
  }

  export type InventoryItemWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: InventoryItemWhereInput | InventoryItemWhereInput[]
    OR?: InventoryItemWhereInput[]
    NOT?: InventoryItemWhereInput | InventoryItemWhereInput[]
    productId?: IntFilter<"InventoryItem"> | number
    warehouseId?: IntFilter<"InventoryItem"> | number
    quantity?: IntFilter<"InventoryItem"> | number
    salePrice?: DecimalFilter<"InventoryItem"> | Decimal | DecimalJsLike | number | string
    location?: StringNullableFilter<"InventoryItem"> | string | null
    createdAt?: DateTimeFilter<"InventoryItem"> | Date | string
    updatedAt?: DateTimeFilter<"InventoryItem"> | Date | string
    product?: XOR<ProductRelationFilter, ProductWhereInput>
    warehouse?: XOR<WarehouseRelationFilter, WarehouseWhereInput>
    uniqueBarcodes?: UniqueBarcodeListRelationFilter
  }, "id">

  export type InventoryItemOrderByWithAggregationInput = {
    id?: SortOrder
    productId?: SortOrder
    warehouseId?: SortOrder
    quantity?: SortOrder
    salePrice?: SortOrder
    location?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: InventoryItemCountOrderByAggregateInput
    _avg?: InventoryItemAvgOrderByAggregateInput
    _max?: InventoryItemMaxOrderByAggregateInput
    _min?: InventoryItemMinOrderByAggregateInput
    _sum?: InventoryItemSumOrderByAggregateInput
  }

  export type InventoryItemScalarWhereWithAggregatesInput = {
    AND?: InventoryItemScalarWhereWithAggregatesInput | InventoryItemScalarWhereWithAggregatesInput[]
    OR?: InventoryItemScalarWhereWithAggregatesInput[]
    NOT?: InventoryItemScalarWhereWithAggregatesInput | InventoryItemScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"InventoryItem"> | number
    productId?: IntWithAggregatesFilter<"InventoryItem"> | number
    warehouseId?: IntWithAggregatesFilter<"InventoryItem"> | number
    quantity?: IntWithAggregatesFilter<"InventoryItem"> | number
    salePrice?: DecimalWithAggregatesFilter<"InventoryItem"> | Decimal | DecimalJsLike | number | string
    location?: StringNullableWithAggregatesFilter<"InventoryItem"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"InventoryItem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"InventoryItem"> | Date | string
  }

  export type UniqueBarcodeWhereInput = {
    AND?: UniqueBarcodeWhereInput | UniqueBarcodeWhereInput[]
    OR?: UniqueBarcodeWhereInput[]
    NOT?: UniqueBarcodeWhereInput | UniqueBarcodeWhereInput[]
    id?: IntFilter<"UniqueBarcode"> | number
    inventoryItemId?: IntFilter<"UniqueBarcode"> | number
    barcode?: StringFilter<"UniqueBarcode"> | string
    createdAt?: DateTimeFilter<"UniqueBarcode"> | Date | string
    inventoryItem?: XOR<InventoryItemRelationFilter, InventoryItemWhereInput>
  }

  export type UniqueBarcodeOrderByWithRelationInput = {
    id?: SortOrder
    inventoryItemId?: SortOrder
    barcode?: SortOrder
    createdAt?: SortOrder
    inventoryItem?: InventoryItemOrderByWithRelationInput
  }

  export type UniqueBarcodeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    barcode?: string
    AND?: UniqueBarcodeWhereInput | UniqueBarcodeWhereInput[]
    OR?: UniqueBarcodeWhereInput[]
    NOT?: UniqueBarcodeWhereInput | UniqueBarcodeWhereInput[]
    inventoryItemId?: IntFilter<"UniqueBarcode"> | number
    createdAt?: DateTimeFilter<"UniqueBarcode"> | Date | string
    inventoryItem?: XOR<InventoryItemRelationFilter, InventoryItemWhereInput>
  }, "id" | "barcode">

  export type UniqueBarcodeOrderByWithAggregationInput = {
    id?: SortOrder
    inventoryItemId?: SortOrder
    barcode?: SortOrder
    createdAt?: SortOrder
    _count?: UniqueBarcodeCountOrderByAggregateInput
    _avg?: UniqueBarcodeAvgOrderByAggregateInput
    _max?: UniqueBarcodeMaxOrderByAggregateInput
    _min?: UniqueBarcodeMinOrderByAggregateInput
    _sum?: UniqueBarcodeSumOrderByAggregateInput
  }

  export type UniqueBarcodeScalarWhereWithAggregatesInput = {
    AND?: UniqueBarcodeScalarWhereWithAggregatesInput | UniqueBarcodeScalarWhereWithAggregatesInput[]
    OR?: UniqueBarcodeScalarWhereWithAggregatesInput[]
    NOT?: UniqueBarcodeScalarWhereWithAggregatesInput | UniqueBarcodeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UniqueBarcode"> | number
    inventoryItemId?: IntWithAggregatesFilter<"UniqueBarcode"> | number
    barcode?: StringWithAggregatesFilter<"UniqueBarcode"> | string
    createdAt?: DateTimeWithAggregatesFilter<"UniqueBarcode"> | Date | string
  }

  export type CompanyWhereInput = {
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    id?: IntFilter<"Company"> | number
    name?: StringFilter<"Company"> | string
    ownerName?: StringNullableFilter<"Company"> | string | null
    address?: StringNullableFilter<"Company"> | string | null
    gstNumber?: StringNullableFilter<"Company"> | string | null
    contact?: StringNullableFilter<"Company"> | string | null
    email?: StringNullableFilter<"Company"> | string | null
    logoUrl?: StringNullableFilter<"Company"> | string | null
    bankName?: StringNullableFilter<"Company"> | string | null
    branchName?: StringNullableFilter<"Company"> | string | null
    accountName?: StringNullableFilter<"Company"> | string | null
    accountNumber?: StringNullableFilter<"Company"> | string | null
    ifscCode?: StringNullableFilter<"Company"> | string | null
    createdAt?: DateTimeFilter<"Company"> | Date | string
    updatedAt?: DateTimeFilter<"Company"> | Date | string
    quotations?: QuotationListRelationFilter
    employees?: EmployeeListRelationFilter
  }

  export type CompanyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    ownerName?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    gstNumber?: SortOrderInput | SortOrder
    contact?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    logoUrl?: SortOrderInput | SortOrder
    bankName?: SortOrderInput | SortOrder
    branchName?: SortOrderInput | SortOrder
    accountName?: SortOrderInput | SortOrder
    accountNumber?: SortOrderInput | SortOrder
    ifscCode?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    quotations?: QuotationOrderByRelationAggregateInput
    employees?: EmployeeOrderByRelationAggregateInput
  }

  export type CompanyWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    ownerName?: StringNullableFilter<"Company"> | string | null
    address?: StringNullableFilter<"Company"> | string | null
    gstNumber?: StringNullableFilter<"Company"> | string | null
    contact?: StringNullableFilter<"Company"> | string | null
    email?: StringNullableFilter<"Company"> | string | null
    logoUrl?: StringNullableFilter<"Company"> | string | null
    bankName?: StringNullableFilter<"Company"> | string | null
    branchName?: StringNullableFilter<"Company"> | string | null
    accountName?: StringNullableFilter<"Company"> | string | null
    accountNumber?: StringNullableFilter<"Company"> | string | null
    ifscCode?: StringNullableFilter<"Company"> | string | null
    createdAt?: DateTimeFilter<"Company"> | Date | string
    updatedAt?: DateTimeFilter<"Company"> | Date | string
    quotations?: QuotationListRelationFilter
    employees?: EmployeeListRelationFilter
  }, "id" | "name">

  export type CompanyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    ownerName?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    gstNumber?: SortOrderInput | SortOrder
    contact?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    logoUrl?: SortOrderInput | SortOrder
    bankName?: SortOrderInput | SortOrder
    branchName?: SortOrderInput | SortOrder
    accountName?: SortOrderInput | SortOrder
    accountNumber?: SortOrderInput | SortOrder
    ifscCode?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CompanyCountOrderByAggregateInput
    _avg?: CompanyAvgOrderByAggregateInput
    _max?: CompanyMaxOrderByAggregateInput
    _min?: CompanyMinOrderByAggregateInput
    _sum?: CompanySumOrderByAggregateInput
  }

  export type CompanyScalarWhereWithAggregatesInput = {
    AND?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    OR?: CompanyScalarWhereWithAggregatesInput[]
    NOT?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Company"> | number
    name?: StringWithAggregatesFilter<"Company"> | string
    ownerName?: StringNullableWithAggregatesFilter<"Company"> | string | null
    address?: StringNullableWithAggregatesFilter<"Company"> | string | null
    gstNumber?: StringNullableWithAggregatesFilter<"Company"> | string | null
    contact?: StringNullableWithAggregatesFilter<"Company"> | string | null
    email?: StringNullableWithAggregatesFilter<"Company"> | string | null
    logoUrl?: StringNullableWithAggregatesFilter<"Company"> | string | null
    bankName?: StringNullableWithAggregatesFilter<"Company"> | string | null
    branchName?: StringNullableWithAggregatesFilter<"Company"> | string | null
    accountName?: StringNullableWithAggregatesFilter<"Company"> | string | null
    accountNumber?: StringNullableWithAggregatesFilter<"Company"> | string | null
    ifscCode?: StringNullableWithAggregatesFilter<"Company"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Company"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Company"> | Date | string
  }

  export type QuotationWhereInput = {
    AND?: QuotationWhereInput | QuotationWhereInput[]
    OR?: QuotationWhereInput[]
    NOT?: QuotationWhereInput | QuotationWhereInput[]
    id?: IntFilter<"Quotation"> | number
    quoteNumber?: StringFilter<"Quotation"> | string
    quoteDate?: DateTimeFilter<"Quotation"> | Date | string
    companyId?: IntFilter<"Quotation"> | number
    customerName?: StringFilter<"Quotation"> | string
    customerAddress?: StringNullableFilter<"Quotation"> | string | null
    customerContact?: StringNullableFilter<"Quotation"> | string | null
    customerEmail?: StringNullableFilter<"Quotation"> | string | null
    systemType?: StringNullableFilter<"Quotation"> | string | null
    systemSizeKw?: DecimalNullableFilter<"Quotation"> | Decimal | DecimalJsLike | number | string | null
    panelType?: StringNullableFilter<"Quotation"> | string | null
    panelWattage?: IntNullableFilter<"Quotation"> | number | null
    panelCount?: IntNullableFilter<"Quotation"> | number | null
    outputWattageKw?: DecimalNullableFilter<"Quotation"> | Decimal | DecimalJsLike | number | string | null
    phase?: StringNullableFilter<"Quotation"> | string | null
    subtotal?: DecimalFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    totalGst?: DecimalFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    discountPercent?: DecimalFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    finalPrice?: DecimalFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    roundedPrice?: DecimalFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    advancePayment?: DecimalFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    balanceDue?: DecimalFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    paymentType?: StringNullableFilter<"Quotation"> | string | null
    receiverName?: StringNullableFilter<"Quotation"> | string | null
    remarks?: StringNullableFilter<"Quotation"> | string | null
    preparedBy?: StringNullableFilter<"Quotation"> | string | null
    status?: EnumQuotationStatusFilter<"Quotation"> | $Enums.QuotationStatus
    createdAt?: DateTimeFilter<"Quotation"> | Date | string
    updatedAt?: DateTimeFilter<"Quotation"> | Date | string
    company?: XOR<CompanyRelationFilter, CompanyWhereInput>
    items?: QuotationItemListRelationFilter
    fixedCosts?: QuotationFixedCostListRelationFilter
  }

  export type QuotationOrderByWithRelationInput = {
    id?: SortOrder
    quoteNumber?: SortOrder
    quoteDate?: SortOrder
    companyId?: SortOrder
    customerName?: SortOrder
    customerAddress?: SortOrderInput | SortOrder
    customerContact?: SortOrderInput | SortOrder
    customerEmail?: SortOrderInput | SortOrder
    systemType?: SortOrderInput | SortOrder
    systemSizeKw?: SortOrderInput | SortOrder
    panelType?: SortOrderInput | SortOrder
    panelWattage?: SortOrderInput | SortOrder
    panelCount?: SortOrderInput | SortOrder
    outputWattageKw?: SortOrderInput | SortOrder
    phase?: SortOrderInput | SortOrder
    subtotal?: SortOrder
    totalGst?: SortOrder
    discountPercent?: SortOrder
    discountAmount?: SortOrder
    finalPrice?: SortOrder
    roundedPrice?: SortOrder
    advancePayment?: SortOrder
    balanceDue?: SortOrder
    paymentType?: SortOrderInput | SortOrder
    receiverName?: SortOrderInput | SortOrder
    remarks?: SortOrderInput | SortOrder
    preparedBy?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    company?: CompanyOrderByWithRelationInput
    items?: QuotationItemOrderByRelationAggregateInput
    fixedCosts?: QuotationFixedCostOrderByRelationAggregateInput
  }

  export type QuotationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    quoteNumber?: string
    AND?: QuotationWhereInput | QuotationWhereInput[]
    OR?: QuotationWhereInput[]
    NOT?: QuotationWhereInput | QuotationWhereInput[]
    quoteDate?: DateTimeFilter<"Quotation"> | Date | string
    companyId?: IntFilter<"Quotation"> | number
    customerName?: StringFilter<"Quotation"> | string
    customerAddress?: StringNullableFilter<"Quotation"> | string | null
    customerContact?: StringNullableFilter<"Quotation"> | string | null
    customerEmail?: StringNullableFilter<"Quotation"> | string | null
    systemType?: StringNullableFilter<"Quotation"> | string | null
    systemSizeKw?: DecimalNullableFilter<"Quotation"> | Decimal | DecimalJsLike | number | string | null
    panelType?: StringNullableFilter<"Quotation"> | string | null
    panelWattage?: IntNullableFilter<"Quotation"> | number | null
    panelCount?: IntNullableFilter<"Quotation"> | number | null
    outputWattageKw?: DecimalNullableFilter<"Quotation"> | Decimal | DecimalJsLike | number | string | null
    phase?: StringNullableFilter<"Quotation"> | string | null
    subtotal?: DecimalFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    totalGst?: DecimalFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    discountPercent?: DecimalFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    finalPrice?: DecimalFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    roundedPrice?: DecimalFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    advancePayment?: DecimalFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    balanceDue?: DecimalFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    paymentType?: StringNullableFilter<"Quotation"> | string | null
    receiverName?: StringNullableFilter<"Quotation"> | string | null
    remarks?: StringNullableFilter<"Quotation"> | string | null
    preparedBy?: StringNullableFilter<"Quotation"> | string | null
    status?: EnumQuotationStatusFilter<"Quotation"> | $Enums.QuotationStatus
    createdAt?: DateTimeFilter<"Quotation"> | Date | string
    updatedAt?: DateTimeFilter<"Quotation"> | Date | string
    company?: XOR<CompanyRelationFilter, CompanyWhereInput>
    items?: QuotationItemListRelationFilter
    fixedCosts?: QuotationFixedCostListRelationFilter
  }, "id" | "quoteNumber">

  export type QuotationOrderByWithAggregationInput = {
    id?: SortOrder
    quoteNumber?: SortOrder
    quoteDate?: SortOrder
    companyId?: SortOrder
    customerName?: SortOrder
    customerAddress?: SortOrderInput | SortOrder
    customerContact?: SortOrderInput | SortOrder
    customerEmail?: SortOrderInput | SortOrder
    systemType?: SortOrderInput | SortOrder
    systemSizeKw?: SortOrderInput | SortOrder
    panelType?: SortOrderInput | SortOrder
    panelWattage?: SortOrderInput | SortOrder
    panelCount?: SortOrderInput | SortOrder
    outputWattageKw?: SortOrderInput | SortOrder
    phase?: SortOrderInput | SortOrder
    subtotal?: SortOrder
    totalGst?: SortOrder
    discountPercent?: SortOrder
    discountAmount?: SortOrder
    finalPrice?: SortOrder
    roundedPrice?: SortOrder
    advancePayment?: SortOrder
    balanceDue?: SortOrder
    paymentType?: SortOrderInput | SortOrder
    receiverName?: SortOrderInput | SortOrder
    remarks?: SortOrderInput | SortOrder
    preparedBy?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: QuotationCountOrderByAggregateInput
    _avg?: QuotationAvgOrderByAggregateInput
    _max?: QuotationMaxOrderByAggregateInput
    _min?: QuotationMinOrderByAggregateInput
    _sum?: QuotationSumOrderByAggregateInput
  }

  export type QuotationScalarWhereWithAggregatesInput = {
    AND?: QuotationScalarWhereWithAggregatesInput | QuotationScalarWhereWithAggregatesInput[]
    OR?: QuotationScalarWhereWithAggregatesInput[]
    NOT?: QuotationScalarWhereWithAggregatesInput | QuotationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Quotation"> | number
    quoteNumber?: StringWithAggregatesFilter<"Quotation"> | string
    quoteDate?: DateTimeWithAggregatesFilter<"Quotation"> | Date | string
    companyId?: IntWithAggregatesFilter<"Quotation"> | number
    customerName?: StringWithAggregatesFilter<"Quotation"> | string
    customerAddress?: StringNullableWithAggregatesFilter<"Quotation"> | string | null
    customerContact?: StringNullableWithAggregatesFilter<"Quotation"> | string | null
    customerEmail?: StringNullableWithAggregatesFilter<"Quotation"> | string | null
    systemType?: StringNullableWithAggregatesFilter<"Quotation"> | string | null
    systemSizeKw?: DecimalNullableWithAggregatesFilter<"Quotation"> | Decimal | DecimalJsLike | number | string | null
    panelType?: StringNullableWithAggregatesFilter<"Quotation"> | string | null
    panelWattage?: IntNullableWithAggregatesFilter<"Quotation"> | number | null
    panelCount?: IntNullableWithAggregatesFilter<"Quotation"> | number | null
    outputWattageKw?: DecimalNullableWithAggregatesFilter<"Quotation"> | Decimal | DecimalJsLike | number | string | null
    phase?: StringNullableWithAggregatesFilter<"Quotation"> | string | null
    subtotal?: DecimalWithAggregatesFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    totalGst?: DecimalWithAggregatesFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    discountPercent?: DecimalWithAggregatesFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalWithAggregatesFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    finalPrice?: DecimalWithAggregatesFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    roundedPrice?: DecimalWithAggregatesFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    advancePayment?: DecimalWithAggregatesFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    balanceDue?: DecimalWithAggregatesFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    paymentType?: StringNullableWithAggregatesFilter<"Quotation"> | string | null
    receiverName?: StringNullableWithAggregatesFilter<"Quotation"> | string | null
    remarks?: StringNullableWithAggregatesFilter<"Quotation"> | string | null
    preparedBy?: StringNullableWithAggregatesFilter<"Quotation"> | string | null
    status?: EnumQuotationStatusWithAggregatesFilter<"Quotation"> | $Enums.QuotationStatus
    createdAt?: DateTimeWithAggregatesFilter<"Quotation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Quotation"> | Date | string
  }

  export type QuotationItemWhereInput = {
    AND?: QuotationItemWhereInput | QuotationItemWhereInput[]
    OR?: QuotationItemWhereInput[]
    NOT?: QuotationItemWhereInput | QuotationItemWhereInput[]
    id?: IntFilter<"QuotationItem"> | number
    quotationId?: IntFilter<"QuotationItem"> | number
    categoryName?: StringNullableFilter<"QuotationItem"> | string | null
    productName?: StringFilter<"QuotationItem"> | string
    hsnCode?: StringNullableFilter<"QuotationItem"> | string | null
    description?: StringNullableFilter<"QuotationItem"> | string | null
    unitPrice?: DecimalFilter<"QuotationItem"> | Decimal | DecimalJsLike | number | string
    quantity?: DecimalFilter<"QuotationItem"> | Decimal | DecimalJsLike | number | string
    gstRate?: DecimalFilter<"QuotationItem"> | Decimal | DecimalJsLike | number | string
    totalPrice?: DecimalFilter<"QuotationItem"> | Decimal | DecimalJsLike | number | string
    sortOrder?: IntFilter<"QuotationItem"> | number
    quotation?: XOR<QuotationRelationFilter, QuotationWhereInput>
  }

  export type QuotationItemOrderByWithRelationInput = {
    id?: SortOrder
    quotationId?: SortOrder
    categoryName?: SortOrderInput | SortOrder
    productName?: SortOrder
    hsnCode?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    unitPrice?: SortOrder
    quantity?: SortOrder
    gstRate?: SortOrder
    totalPrice?: SortOrder
    sortOrder?: SortOrder
    quotation?: QuotationOrderByWithRelationInput
  }

  export type QuotationItemWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: QuotationItemWhereInput | QuotationItemWhereInput[]
    OR?: QuotationItemWhereInput[]
    NOT?: QuotationItemWhereInput | QuotationItemWhereInput[]
    quotationId?: IntFilter<"QuotationItem"> | number
    categoryName?: StringNullableFilter<"QuotationItem"> | string | null
    productName?: StringFilter<"QuotationItem"> | string
    hsnCode?: StringNullableFilter<"QuotationItem"> | string | null
    description?: StringNullableFilter<"QuotationItem"> | string | null
    unitPrice?: DecimalFilter<"QuotationItem"> | Decimal | DecimalJsLike | number | string
    quantity?: DecimalFilter<"QuotationItem"> | Decimal | DecimalJsLike | number | string
    gstRate?: DecimalFilter<"QuotationItem"> | Decimal | DecimalJsLike | number | string
    totalPrice?: DecimalFilter<"QuotationItem"> | Decimal | DecimalJsLike | number | string
    sortOrder?: IntFilter<"QuotationItem"> | number
    quotation?: XOR<QuotationRelationFilter, QuotationWhereInput>
  }, "id">

  export type QuotationItemOrderByWithAggregationInput = {
    id?: SortOrder
    quotationId?: SortOrder
    categoryName?: SortOrderInput | SortOrder
    productName?: SortOrder
    hsnCode?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    unitPrice?: SortOrder
    quantity?: SortOrder
    gstRate?: SortOrder
    totalPrice?: SortOrder
    sortOrder?: SortOrder
    _count?: QuotationItemCountOrderByAggregateInput
    _avg?: QuotationItemAvgOrderByAggregateInput
    _max?: QuotationItemMaxOrderByAggregateInput
    _min?: QuotationItemMinOrderByAggregateInput
    _sum?: QuotationItemSumOrderByAggregateInput
  }

  export type QuotationItemScalarWhereWithAggregatesInput = {
    AND?: QuotationItemScalarWhereWithAggregatesInput | QuotationItemScalarWhereWithAggregatesInput[]
    OR?: QuotationItemScalarWhereWithAggregatesInput[]
    NOT?: QuotationItemScalarWhereWithAggregatesInput | QuotationItemScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"QuotationItem"> | number
    quotationId?: IntWithAggregatesFilter<"QuotationItem"> | number
    categoryName?: StringNullableWithAggregatesFilter<"QuotationItem"> | string | null
    productName?: StringWithAggregatesFilter<"QuotationItem"> | string
    hsnCode?: StringNullableWithAggregatesFilter<"QuotationItem"> | string | null
    description?: StringNullableWithAggregatesFilter<"QuotationItem"> | string | null
    unitPrice?: DecimalWithAggregatesFilter<"QuotationItem"> | Decimal | DecimalJsLike | number | string
    quantity?: DecimalWithAggregatesFilter<"QuotationItem"> | Decimal | DecimalJsLike | number | string
    gstRate?: DecimalWithAggregatesFilter<"QuotationItem"> | Decimal | DecimalJsLike | number | string
    totalPrice?: DecimalWithAggregatesFilter<"QuotationItem"> | Decimal | DecimalJsLike | number | string
    sortOrder?: IntWithAggregatesFilter<"QuotationItem"> | number
  }

  export type QuotationFixedCostWhereInput = {
    AND?: QuotationFixedCostWhereInput | QuotationFixedCostWhereInput[]
    OR?: QuotationFixedCostWhereInput[]
    NOT?: QuotationFixedCostWhereInput | QuotationFixedCostWhereInput[]
    id?: IntFilter<"QuotationFixedCost"> | number
    quotationId?: IntFilter<"QuotationFixedCost"> | number
    label?: StringFilter<"QuotationFixedCost"> | string
    cost?: DecimalFilter<"QuotationFixedCost"> | Decimal | DecimalJsLike | number | string
    rateNote?: StringNullableFilter<"QuotationFixedCost"> | string | null
    hsnCode?: StringNullableFilter<"QuotationFixedCost"> | string | null
    gstRate?: DecimalFilter<"QuotationFixedCost"> | Decimal | DecimalJsLike | number | string
    total?: DecimalFilter<"QuotationFixedCost"> | Decimal | DecimalJsLike | number | string
    included?: BoolFilter<"QuotationFixedCost"> | boolean
    sortOrder?: IntFilter<"QuotationFixedCost"> | number
    quotation?: XOR<QuotationRelationFilter, QuotationWhereInput>
  }

  export type QuotationFixedCostOrderByWithRelationInput = {
    id?: SortOrder
    quotationId?: SortOrder
    label?: SortOrder
    cost?: SortOrder
    rateNote?: SortOrderInput | SortOrder
    hsnCode?: SortOrderInput | SortOrder
    gstRate?: SortOrder
    total?: SortOrder
    included?: SortOrder
    sortOrder?: SortOrder
    quotation?: QuotationOrderByWithRelationInput
  }

  export type QuotationFixedCostWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: QuotationFixedCostWhereInput | QuotationFixedCostWhereInput[]
    OR?: QuotationFixedCostWhereInput[]
    NOT?: QuotationFixedCostWhereInput | QuotationFixedCostWhereInput[]
    quotationId?: IntFilter<"QuotationFixedCost"> | number
    label?: StringFilter<"QuotationFixedCost"> | string
    cost?: DecimalFilter<"QuotationFixedCost"> | Decimal | DecimalJsLike | number | string
    rateNote?: StringNullableFilter<"QuotationFixedCost"> | string | null
    hsnCode?: StringNullableFilter<"QuotationFixedCost"> | string | null
    gstRate?: DecimalFilter<"QuotationFixedCost"> | Decimal | DecimalJsLike | number | string
    total?: DecimalFilter<"QuotationFixedCost"> | Decimal | DecimalJsLike | number | string
    included?: BoolFilter<"QuotationFixedCost"> | boolean
    sortOrder?: IntFilter<"QuotationFixedCost"> | number
    quotation?: XOR<QuotationRelationFilter, QuotationWhereInput>
  }, "id">

  export type QuotationFixedCostOrderByWithAggregationInput = {
    id?: SortOrder
    quotationId?: SortOrder
    label?: SortOrder
    cost?: SortOrder
    rateNote?: SortOrderInput | SortOrder
    hsnCode?: SortOrderInput | SortOrder
    gstRate?: SortOrder
    total?: SortOrder
    included?: SortOrder
    sortOrder?: SortOrder
    _count?: QuotationFixedCostCountOrderByAggregateInput
    _avg?: QuotationFixedCostAvgOrderByAggregateInput
    _max?: QuotationFixedCostMaxOrderByAggregateInput
    _min?: QuotationFixedCostMinOrderByAggregateInput
    _sum?: QuotationFixedCostSumOrderByAggregateInput
  }

  export type QuotationFixedCostScalarWhereWithAggregatesInput = {
    AND?: QuotationFixedCostScalarWhereWithAggregatesInput | QuotationFixedCostScalarWhereWithAggregatesInput[]
    OR?: QuotationFixedCostScalarWhereWithAggregatesInput[]
    NOT?: QuotationFixedCostScalarWhereWithAggregatesInput | QuotationFixedCostScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"QuotationFixedCost"> | number
    quotationId?: IntWithAggregatesFilter<"QuotationFixedCost"> | number
    label?: StringWithAggregatesFilter<"QuotationFixedCost"> | string
    cost?: DecimalWithAggregatesFilter<"QuotationFixedCost"> | Decimal | DecimalJsLike | number | string
    rateNote?: StringNullableWithAggregatesFilter<"QuotationFixedCost"> | string | null
    hsnCode?: StringNullableWithAggregatesFilter<"QuotationFixedCost"> | string | null
    gstRate?: DecimalWithAggregatesFilter<"QuotationFixedCost"> | Decimal | DecimalJsLike | number | string
    total?: DecimalWithAggregatesFilter<"QuotationFixedCost"> | Decimal | DecimalJsLike | number | string
    included?: BoolWithAggregatesFilter<"QuotationFixedCost"> | boolean
    sortOrder?: IntWithAggregatesFilter<"QuotationFixedCost"> | number
  }

  export type EmployeeWhereInput = {
    AND?: EmployeeWhereInput | EmployeeWhereInput[]
    OR?: EmployeeWhereInput[]
    NOT?: EmployeeWhereInput | EmployeeWhereInput[]
    id?: IntFilter<"Employee"> | number
    companyId?: IntFilter<"Employee"> | number
    name?: StringFilter<"Employee"> | string
    email?: StringFilter<"Employee"> | string
    passwordHash?: StringFilter<"Employee"> | string
    role?: EnumEmployeeRoleFilter<"Employee"> | $Enums.EmployeeRole
    isActive?: BoolFilter<"Employee"> | boolean
    createdAt?: DateTimeFilter<"Employee"> | Date | string
    updatedAt?: DateTimeFilter<"Employee"> | Date | string
    company?: XOR<CompanyRelationFilter, CompanyWhereInput>
    sessions?: SessionListRelationFilter
  }

  export type EmployeeOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    company?: CompanyOrderByWithRelationInput
    sessions?: SessionOrderByRelationAggregateInput
  }

  export type EmployeeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: EmployeeWhereInput | EmployeeWhereInput[]
    OR?: EmployeeWhereInput[]
    NOT?: EmployeeWhereInput | EmployeeWhereInput[]
    companyId?: IntFilter<"Employee"> | number
    name?: StringFilter<"Employee"> | string
    passwordHash?: StringFilter<"Employee"> | string
    role?: EnumEmployeeRoleFilter<"Employee"> | $Enums.EmployeeRole
    isActive?: BoolFilter<"Employee"> | boolean
    createdAt?: DateTimeFilter<"Employee"> | Date | string
    updatedAt?: DateTimeFilter<"Employee"> | Date | string
    company?: XOR<CompanyRelationFilter, CompanyWhereInput>
    sessions?: SessionListRelationFilter
  }, "id" | "email">

  export type EmployeeOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EmployeeCountOrderByAggregateInput
    _avg?: EmployeeAvgOrderByAggregateInput
    _max?: EmployeeMaxOrderByAggregateInput
    _min?: EmployeeMinOrderByAggregateInput
    _sum?: EmployeeSumOrderByAggregateInput
  }

  export type EmployeeScalarWhereWithAggregatesInput = {
    AND?: EmployeeScalarWhereWithAggregatesInput | EmployeeScalarWhereWithAggregatesInput[]
    OR?: EmployeeScalarWhereWithAggregatesInput[]
    NOT?: EmployeeScalarWhereWithAggregatesInput | EmployeeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Employee"> | number
    companyId?: IntWithAggregatesFilter<"Employee"> | number
    name?: StringWithAggregatesFilter<"Employee"> | string
    email?: StringWithAggregatesFilter<"Employee"> | string
    passwordHash?: StringWithAggregatesFilter<"Employee"> | string
    role?: EnumEmployeeRoleWithAggregatesFilter<"Employee"> | $Enums.EmployeeRole
    isActive?: BoolWithAggregatesFilter<"Employee"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Employee"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Employee"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    employeeId?: IntFilter<"Session"> | number
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    employee?: XOR<EmployeeRelationFilter, EmployeeWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    employeeId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    employee?: EmployeeOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    employeeId?: IntFilter<"Session"> | number
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    employee?: XOR<EmployeeRelationFilter, EmployeeWhereInput>
  }, "id">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    employeeId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _avg?: SessionAvgOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
    _sum?: SessionSumOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    employeeId?: IntWithAggregatesFilter<"Session"> | number
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type CategoryCreateInput = {
    name: string
    description?: string | null
    hsnCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attributes?: CategoryAttributeCreateNestedManyWithoutCategoryInput
    products?: ProductCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: number
    name: string
    description?: string | null
    hsnCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attributes?: CategoryAttributeUncheckedCreateNestedManyWithoutCategoryInput
    products?: ProductUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    hsnCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attributes?: CategoryAttributeUpdateManyWithoutCategoryNestedInput
    products?: ProductUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    hsnCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attributes?: CategoryAttributeUncheckedUpdateManyWithoutCategoryNestedInput
    products?: ProductUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: number
    name: string
    description?: string | null
    hsnCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    hsnCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    hsnCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryAttributeCreateInput = {
    name: string
    type?: $Enums.AttributeType
    required?: boolean
    sortOrder?: number
    category: CategoryCreateNestedOneWithoutAttributesInput
  }

  export type CategoryAttributeUncheckedCreateInput = {
    id?: number
    categoryId: number
    name: string
    type?: $Enums.AttributeType
    required?: boolean
    sortOrder?: number
  }

  export type CategoryAttributeUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAttributeTypeFieldUpdateOperationsInput | $Enums.AttributeType
    required?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    category?: CategoryUpdateOneRequiredWithoutAttributesNestedInput
  }

  export type CategoryAttributeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAttributeTypeFieldUpdateOperationsInput | $Enums.AttributeType
    required?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type CategoryAttributeCreateManyInput = {
    id?: number
    categoryId: number
    name: string
    type?: $Enums.AttributeType
    required?: boolean
    sortOrder?: number
  }

  export type CategoryAttributeUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAttributeTypeFieldUpdateOperationsInput | $Enums.AttributeType
    required?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type CategoryAttributeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAttributeTypeFieldUpdateOperationsInput | $Enums.AttributeType
    required?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type ProductCreateInput = {
    sku: string
    name: string
    manufacturer?: string | null
    basePrice?: Decimal | DecimalJsLike | number | string
    gstRate?: Decimal | DecimalJsLike | number | string
    barcodeHandling?: $Enums.BarcodeHandling
    barcode?: string | null
    barcodeType?: $Enums.BarcodeType
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutProductsInput
    attributeValues?: ProductAttributeValueCreateNestedManyWithoutProductInput
    inventoryItems?: InventoryItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    id?: number
    sku: string
    name: string
    manufacturer?: string | null
    categoryId: number
    basePrice?: Decimal | DecimalJsLike | number | string
    gstRate?: Decimal | DecimalJsLike | number | string
    barcodeHandling?: $Enums.BarcodeHandling
    barcode?: string | null
    barcodeType?: $Enums.BarcodeType
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attributeValues?: ProductAttributeValueUncheckedCreateNestedManyWithoutProductInput
    inventoryItems?: InventoryItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    manufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    basePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gstRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    barcodeHandling?: EnumBarcodeHandlingFieldUpdateOperationsInput | $Enums.BarcodeHandling
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    barcodeType?: EnumBarcodeTypeFieldUpdateOperationsInput | $Enums.BarcodeType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    attributeValues?: ProductAttributeValueUpdateManyWithoutProductNestedInput
    inventoryItems?: InventoryItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    manufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: IntFieldUpdateOperationsInput | number
    basePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gstRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    barcodeHandling?: EnumBarcodeHandlingFieldUpdateOperationsInput | $Enums.BarcodeHandling
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    barcodeType?: EnumBarcodeTypeFieldUpdateOperationsInput | $Enums.BarcodeType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attributeValues?: ProductAttributeValueUncheckedUpdateManyWithoutProductNestedInput
    inventoryItems?: InventoryItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id?: number
    sku: string
    name: string
    manufacturer?: string | null
    categoryId: number
    basePrice?: Decimal | DecimalJsLike | number | string
    gstRate?: Decimal | DecimalJsLike | number | string
    barcodeHandling?: $Enums.BarcodeHandling
    barcode?: string | null
    barcodeType?: $Enums.BarcodeType
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductUpdateManyMutationInput = {
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    manufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    basePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gstRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    barcodeHandling?: EnumBarcodeHandlingFieldUpdateOperationsInput | $Enums.BarcodeHandling
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    barcodeType?: EnumBarcodeTypeFieldUpdateOperationsInput | $Enums.BarcodeType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    manufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: IntFieldUpdateOperationsInput | number
    basePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gstRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    barcodeHandling?: EnumBarcodeHandlingFieldUpdateOperationsInput | $Enums.BarcodeHandling
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    barcodeType?: EnumBarcodeTypeFieldUpdateOperationsInput | $Enums.BarcodeType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductAttributeValueCreateInput = {
    attributeId: number
    value: string
    product: ProductCreateNestedOneWithoutAttributeValuesInput
  }

  export type ProductAttributeValueUncheckedCreateInput = {
    id?: number
    productId: number
    attributeId: number
    value: string
  }

  export type ProductAttributeValueUpdateInput = {
    attributeId?: IntFieldUpdateOperationsInput | number
    value?: StringFieldUpdateOperationsInput | string
    product?: ProductUpdateOneRequiredWithoutAttributeValuesNestedInput
  }

  export type ProductAttributeValueUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    attributeId?: IntFieldUpdateOperationsInput | number
    value?: StringFieldUpdateOperationsInput | string
  }

  export type ProductAttributeValueCreateManyInput = {
    id?: number
    productId: number
    attributeId: number
    value: string
  }

  export type ProductAttributeValueUpdateManyMutationInput = {
    attributeId?: IntFieldUpdateOperationsInput | number
    value?: StringFieldUpdateOperationsInput | string
  }

  export type ProductAttributeValueUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    attributeId?: IntFieldUpdateOperationsInput | number
    value?: StringFieldUpdateOperationsInput | string
  }

  export type WarehouseCreateInput = {
    name: string
    location?: string | null
    status?: $Enums.WarehouseStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    inventoryItems?: InventoryItemCreateNestedManyWithoutWarehouseInput
  }

  export type WarehouseUncheckedCreateInput = {
    id?: number
    name: string
    location?: string | null
    status?: $Enums.WarehouseStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    inventoryItems?: InventoryItemUncheckedCreateNestedManyWithoutWarehouseInput
  }

  export type WarehouseUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumWarehouseStatusFieldUpdateOperationsInput | $Enums.WarehouseStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inventoryItems?: InventoryItemUpdateManyWithoutWarehouseNestedInput
  }

  export type WarehouseUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumWarehouseStatusFieldUpdateOperationsInput | $Enums.WarehouseStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inventoryItems?: InventoryItemUncheckedUpdateManyWithoutWarehouseNestedInput
  }

  export type WarehouseCreateManyInput = {
    id?: number
    name: string
    location?: string | null
    status?: $Enums.WarehouseStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WarehouseUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumWarehouseStatusFieldUpdateOperationsInput | $Enums.WarehouseStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WarehouseUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumWarehouseStatusFieldUpdateOperationsInput | $Enums.WarehouseStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InventoryItemCreateInput = {
    quantity?: number
    salePrice?: Decimal | DecimalJsLike | number | string
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutInventoryItemsInput
    warehouse: WarehouseCreateNestedOneWithoutInventoryItemsInput
    uniqueBarcodes?: UniqueBarcodeCreateNestedManyWithoutInventoryItemInput
  }

  export type InventoryItemUncheckedCreateInput = {
    id?: number
    productId: number
    warehouseId: number
    quantity?: number
    salePrice?: Decimal | DecimalJsLike | number | string
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    uniqueBarcodes?: UniqueBarcodeUncheckedCreateNestedManyWithoutInventoryItemInput
  }

  export type InventoryItemUpdateInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    salePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutInventoryItemsNestedInput
    warehouse?: WarehouseUpdateOneRequiredWithoutInventoryItemsNestedInput
    uniqueBarcodes?: UniqueBarcodeUpdateManyWithoutInventoryItemNestedInput
  }

  export type InventoryItemUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    warehouseId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    salePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uniqueBarcodes?: UniqueBarcodeUncheckedUpdateManyWithoutInventoryItemNestedInput
  }

  export type InventoryItemCreateManyInput = {
    id?: number
    productId: number
    warehouseId: number
    quantity?: number
    salePrice?: Decimal | DecimalJsLike | number | string
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InventoryItemUpdateManyMutationInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    salePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InventoryItemUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    warehouseId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    salePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UniqueBarcodeCreateInput = {
    barcode: string
    createdAt?: Date | string
    inventoryItem: InventoryItemCreateNestedOneWithoutUniqueBarcodesInput
  }

  export type UniqueBarcodeUncheckedCreateInput = {
    id?: number
    inventoryItemId: number
    barcode: string
    createdAt?: Date | string
  }

  export type UniqueBarcodeUpdateInput = {
    barcode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inventoryItem?: InventoryItemUpdateOneRequiredWithoutUniqueBarcodesNestedInput
  }

  export type UniqueBarcodeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    inventoryItemId?: IntFieldUpdateOperationsInput | number
    barcode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UniqueBarcodeCreateManyInput = {
    id?: number
    inventoryItemId: number
    barcode: string
    createdAt?: Date | string
  }

  export type UniqueBarcodeUpdateManyMutationInput = {
    barcode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UniqueBarcodeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    inventoryItemId?: IntFieldUpdateOperationsInput | number
    barcode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyCreateInput = {
    name: string
    ownerName?: string | null
    address?: string | null
    gstNumber?: string | null
    contact?: string | null
    email?: string | null
    logoUrl?: string | null
    bankName?: string | null
    branchName?: string | null
    accountName?: string | null
    accountNumber?: string | null
    ifscCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    quotations?: QuotationCreateNestedManyWithoutCompanyInput
    employees?: EmployeeCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateInput = {
    id?: number
    name: string
    ownerName?: string | null
    address?: string | null
    gstNumber?: string | null
    contact?: string | null
    email?: string | null
    logoUrl?: string | null
    bankName?: string | null
    branchName?: string | null
    accountName?: string | null
    accountNumber?: string | null
    ifscCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    quotations?: QuotationUncheckedCreateNestedManyWithoutCompanyInput
    employees?: EmployeeUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    ownerName?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    gstNumber?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    branchName?: NullableStringFieldUpdateOperationsInput | string | null
    accountName?: NullableStringFieldUpdateOperationsInput | string | null
    accountNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ifscCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quotations?: QuotationUpdateManyWithoutCompanyNestedInput
    employees?: EmployeeUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    ownerName?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    gstNumber?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    branchName?: NullableStringFieldUpdateOperationsInput | string | null
    accountName?: NullableStringFieldUpdateOperationsInput | string | null
    accountNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ifscCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quotations?: QuotationUncheckedUpdateManyWithoutCompanyNestedInput
    employees?: EmployeeUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCreateManyInput = {
    id?: number
    name: string
    ownerName?: string | null
    address?: string | null
    gstNumber?: string | null
    contact?: string | null
    email?: string | null
    logoUrl?: string | null
    bankName?: string | null
    branchName?: string | null
    accountName?: string | null
    accountNumber?: string | null
    ifscCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompanyUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    ownerName?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    gstNumber?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    branchName?: NullableStringFieldUpdateOperationsInput | string | null
    accountName?: NullableStringFieldUpdateOperationsInput | string | null
    accountNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ifscCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    ownerName?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    gstNumber?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    branchName?: NullableStringFieldUpdateOperationsInput | string | null
    accountName?: NullableStringFieldUpdateOperationsInput | string | null
    accountNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ifscCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuotationCreateInput = {
    quoteNumber: string
    quoteDate?: Date | string
    customerName: string
    customerAddress?: string | null
    customerContact?: string | null
    customerEmail?: string | null
    systemType?: string | null
    systemSizeKw?: Decimal | DecimalJsLike | number | string | null
    panelType?: string | null
    panelWattage?: number | null
    panelCount?: number | null
    outputWattageKw?: Decimal | DecimalJsLike | number | string | null
    phase?: string | null
    subtotal?: Decimal | DecimalJsLike | number | string
    totalGst?: Decimal | DecimalJsLike | number | string
    discountPercent?: Decimal | DecimalJsLike | number | string
    discountAmount?: Decimal | DecimalJsLike | number | string
    finalPrice?: Decimal | DecimalJsLike | number | string
    roundedPrice?: Decimal | DecimalJsLike | number | string
    advancePayment?: Decimal | DecimalJsLike | number | string
    balanceDue?: Decimal | DecimalJsLike | number | string
    paymentType?: string | null
    receiverName?: string | null
    remarks?: string | null
    preparedBy?: string | null
    status?: $Enums.QuotationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutQuotationsInput
    items?: QuotationItemCreateNestedManyWithoutQuotationInput
    fixedCosts?: QuotationFixedCostCreateNestedManyWithoutQuotationInput
  }

  export type QuotationUncheckedCreateInput = {
    id?: number
    quoteNumber: string
    quoteDate?: Date | string
    companyId: number
    customerName: string
    customerAddress?: string | null
    customerContact?: string | null
    customerEmail?: string | null
    systemType?: string | null
    systemSizeKw?: Decimal | DecimalJsLike | number | string | null
    panelType?: string | null
    panelWattage?: number | null
    panelCount?: number | null
    outputWattageKw?: Decimal | DecimalJsLike | number | string | null
    phase?: string | null
    subtotal?: Decimal | DecimalJsLike | number | string
    totalGst?: Decimal | DecimalJsLike | number | string
    discountPercent?: Decimal | DecimalJsLike | number | string
    discountAmount?: Decimal | DecimalJsLike | number | string
    finalPrice?: Decimal | DecimalJsLike | number | string
    roundedPrice?: Decimal | DecimalJsLike | number | string
    advancePayment?: Decimal | DecimalJsLike | number | string
    balanceDue?: Decimal | DecimalJsLike | number | string
    paymentType?: string | null
    receiverName?: string | null
    remarks?: string | null
    preparedBy?: string | null
    status?: $Enums.QuotationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: QuotationItemUncheckedCreateNestedManyWithoutQuotationInput
    fixedCosts?: QuotationFixedCostUncheckedCreateNestedManyWithoutQuotationInput
  }

  export type QuotationUpdateInput = {
    quoteNumber?: StringFieldUpdateOperationsInput | string
    quoteDate?: DateTimeFieldUpdateOperationsInput | Date | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerAddress?: NullableStringFieldUpdateOperationsInput | string | null
    customerContact?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    systemType?: NullableStringFieldUpdateOperationsInput | string | null
    systemSizeKw?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    panelType?: NullableStringFieldUpdateOperationsInput | string | null
    panelWattage?: NullableIntFieldUpdateOperationsInput | number | null
    panelCount?: NullableIntFieldUpdateOperationsInput | number | null
    outputWattageKw?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    phase?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalGst?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountPercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    finalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    roundedPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    advancePayment?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentType?: NullableStringFieldUpdateOperationsInput | string | null
    receiverName?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    preparedBy?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumQuotationStatusFieldUpdateOperationsInput | $Enums.QuotationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutQuotationsNestedInput
    items?: QuotationItemUpdateManyWithoutQuotationNestedInput
    fixedCosts?: QuotationFixedCostUpdateManyWithoutQuotationNestedInput
  }

  export type QuotationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    quoteNumber?: StringFieldUpdateOperationsInput | string
    quoteDate?: DateTimeFieldUpdateOperationsInput | Date | string
    companyId?: IntFieldUpdateOperationsInput | number
    customerName?: StringFieldUpdateOperationsInput | string
    customerAddress?: NullableStringFieldUpdateOperationsInput | string | null
    customerContact?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    systemType?: NullableStringFieldUpdateOperationsInput | string | null
    systemSizeKw?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    panelType?: NullableStringFieldUpdateOperationsInput | string | null
    panelWattage?: NullableIntFieldUpdateOperationsInput | number | null
    panelCount?: NullableIntFieldUpdateOperationsInput | number | null
    outputWattageKw?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    phase?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalGst?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountPercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    finalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    roundedPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    advancePayment?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentType?: NullableStringFieldUpdateOperationsInput | string | null
    receiverName?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    preparedBy?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumQuotationStatusFieldUpdateOperationsInput | $Enums.QuotationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: QuotationItemUncheckedUpdateManyWithoutQuotationNestedInput
    fixedCosts?: QuotationFixedCostUncheckedUpdateManyWithoutQuotationNestedInput
  }

  export type QuotationCreateManyInput = {
    id?: number
    quoteNumber: string
    quoteDate?: Date | string
    companyId: number
    customerName: string
    customerAddress?: string | null
    customerContact?: string | null
    customerEmail?: string | null
    systemType?: string | null
    systemSizeKw?: Decimal | DecimalJsLike | number | string | null
    panelType?: string | null
    panelWattage?: number | null
    panelCount?: number | null
    outputWattageKw?: Decimal | DecimalJsLike | number | string | null
    phase?: string | null
    subtotal?: Decimal | DecimalJsLike | number | string
    totalGst?: Decimal | DecimalJsLike | number | string
    discountPercent?: Decimal | DecimalJsLike | number | string
    discountAmount?: Decimal | DecimalJsLike | number | string
    finalPrice?: Decimal | DecimalJsLike | number | string
    roundedPrice?: Decimal | DecimalJsLike | number | string
    advancePayment?: Decimal | DecimalJsLike | number | string
    balanceDue?: Decimal | DecimalJsLike | number | string
    paymentType?: string | null
    receiverName?: string | null
    remarks?: string | null
    preparedBy?: string | null
    status?: $Enums.QuotationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QuotationUpdateManyMutationInput = {
    quoteNumber?: StringFieldUpdateOperationsInput | string
    quoteDate?: DateTimeFieldUpdateOperationsInput | Date | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerAddress?: NullableStringFieldUpdateOperationsInput | string | null
    customerContact?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    systemType?: NullableStringFieldUpdateOperationsInput | string | null
    systemSizeKw?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    panelType?: NullableStringFieldUpdateOperationsInput | string | null
    panelWattage?: NullableIntFieldUpdateOperationsInput | number | null
    panelCount?: NullableIntFieldUpdateOperationsInput | number | null
    outputWattageKw?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    phase?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalGst?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountPercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    finalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    roundedPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    advancePayment?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentType?: NullableStringFieldUpdateOperationsInput | string | null
    receiverName?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    preparedBy?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumQuotationStatusFieldUpdateOperationsInput | $Enums.QuotationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuotationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    quoteNumber?: StringFieldUpdateOperationsInput | string
    quoteDate?: DateTimeFieldUpdateOperationsInput | Date | string
    companyId?: IntFieldUpdateOperationsInput | number
    customerName?: StringFieldUpdateOperationsInput | string
    customerAddress?: NullableStringFieldUpdateOperationsInput | string | null
    customerContact?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    systemType?: NullableStringFieldUpdateOperationsInput | string | null
    systemSizeKw?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    panelType?: NullableStringFieldUpdateOperationsInput | string | null
    panelWattage?: NullableIntFieldUpdateOperationsInput | number | null
    panelCount?: NullableIntFieldUpdateOperationsInput | number | null
    outputWattageKw?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    phase?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalGst?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountPercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    finalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    roundedPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    advancePayment?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentType?: NullableStringFieldUpdateOperationsInput | string | null
    receiverName?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    preparedBy?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumQuotationStatusFieldUpdateOperationsInput | $Enums.QuotationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuotationItemCreateInput = {
    categoryName?: string | null
    productName: string
    hsnCode?: string | null
    description?: string | null
    unitPrice: Decimal | DecimalJsLike | number | string
    quantity?: Decimal | DecimalJsLike | number | string
    gstRate?: Decimal | DecimalJsLike | number | string
    totalPrice: Decimal | DecimalJsLike | number | string
    sortOrder?: number
    quotation: QuotationCreateNestedOneWithoutItemsInput
  }

  export type QuotationItemUncheckedCreateInput = {
    id?: number
    quotationId: number
    categoryName?: string | null
    productName: string
    hsnCode?: string | null
    description?: string | null
    unitPrice: Decimal | DecimalJsLike | number | string
    quantity?: Decimal | DecimalJsLike | number | string
    gstRate?: Decimal | DecimalJsLike | number | string
    totalPrice: Decimal | DecimalJsLike | number | string
    sortOrder?: number
  }

  export type QuotationItemUpdateInput = {
    categoryName?: NullableStringFieldUpdateOperationsInput | string | null
    productName?: StringFieldUpdateOperationsInput | string
    hsnCode?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gstRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    quotation?: QuotationUpdateOneRequiredWithoutItemsNestedInput
  }

  export type QuotationItemUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    quotationId?: IntFieldUpdateOperationsInput | number
    categoryName?: NullableStringFieldUpdateOperationsInput | string | null
    productName?: StringFieldUpdateOperationsInput | string
    hsnCode?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gstRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type QuotationItemCreateManyInput = {
    id?: number
    quotationId: number
    categoryName?: string | null
    productName: string
    hsnCode?: string | null
    description?: string | null
    unitPrice: Decimal | DecimalJsLike | number | string
    quantity?: Decimal | DecimalJsLike | number | string
    gstRate?: Decimal | DecimalJsLike | number | string
    totalPrice: Decimal | DecimalJsLike | number | string
    sortOrder?: number
  }

  export type QuotationItemUpdateManyMutationInput = {
    categoryName?: NullableStringFieldUpdateOperationsInput | string | null
    productName?: StringFieldUpdateOperationsInput | string
    hsnCode?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gstRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type QuotationItemUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    quotationId?: IntFieldUpdateOperationsInput | number
    categoryName?: NullableStringFieldUpdateOperationsInput | string | null
    productName?: StringFieldUpdateOperationsInput | string
    hsnCode?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gstRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type QuotationFixedCostCreateInput = {
    label: string
    cost?: Decimal | DecimalJsLike | number | string
    rateNote?: string | null
    hsnCode?: string | null
    gstRate?: Decimal | DecimalJsLike | number | string
    total?: Decimal | DecimalJsLike | number | string
    included?: boolean
    sortOrder?: number
    quotation: QuotationCreateNestedOneWithoutFixedCostsInput
  }

  export type QuotationFixedCostUncheckedCreateInput = {
    id?: number
    quotationId: number
    label: string
    cost?: Decimal | DecimalJsLike | number | string
    rateNote?: string | null
    hsnCode?: string | null
    gstRate?: Decimal | DecimalJsLike | number | string
    total?: Decimal | DecimalJsLike | number | string
    included?: boolean
    sortOrder?: number
  }

  export type QuotationFixedCostUpdateInput = {
    label?: StringFieldUpdateOperationsInput | string
    cost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rateNote?: NullableStringFieldUpdateOperationsInput | string | null
    hsnCode?: NullableStringFieldUpdateOperationsInput | string | null
    gstRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    included?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    quotation?: QuotationUpdateOneRequiredWithoutFixedCostsNestedInput
  }

  export type QuotationFixedCostUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    quotationId?: IntFieldUpdateOperationsInput | number
    label?: StringFieldUpdateOperationsInput | string
    cost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rateNote?: NullableStringFieldUpdateOperationsInput | string | null
    hsnCode?: NullableStringFieldUpdateOperationsInput | string | null
    gstRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    included?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type QuotationFixedCostCreateManyInput = {
    id?: number
    quotationId: number
    label: string
    cost?: Decimal | DecimalJsLike | number | string
    rateNote?: string | null
    hsnCode?: string | null
    gstRate?: Decimal | DecimalJsLike | number | string
    total?: Decimal | DecimalJsLike | number | string
    included?: boolean
    sortOrder?: number
  }

  export type QuotationFixedCostUpdateManyMutationInput = {
    label?: StringFieldUpdateOperationsInput | string
    cost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rateNote?: NullableStringFieldUpdateOperationsInput | string | null
    hsnCode?: NullableStringFieldUpdateOperationsInput | string | null
    gstRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    included?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type QuotationFixedCostUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    quotationId?: IntFieldUpdateOperationsInput | number
    label?: StringFieldUpdateOperationsInput | string
    cost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rateNote?: NullableStringFieldUpdateOperationsInput | string | null
    hsnCode?: NullableStringFieldUpdateOperationsInput | string | null
    gstRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    included?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type EmployeeCreateInput = {
    name: string
    email: string
    passwordHash: string
    role?: $Enums.EmployeeRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutEmployeesInput
    sessions?: SessionCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateInput = {
    id?: number
    companyId: number
    name: string
    email: string
    passwordHash: string
    role?: $Enums.EmployeeRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumEmployeeRoleFieldUpdateOperationsInput | $Enums.EmployeeRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutEmployeesNestedInput
    sessions?: SessionUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumEmployeeRoleFieldUpdateOperationsInput | $Enums.EmployeeRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeCreateManyInput = {
    id?: number
    companyId: number
    name: string
    email: string
    passwordHash: string
    role?: $Enums.EmployeeRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumEmployeeRoleFieldUpdateOperationsInput | $Enums.EmployeeRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumEmployeeRoleFieldUpdateOperationsInput | $Enums.EmployeeRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    id?: string
    expiresAt: Date | string
    createdAt?: Date | string
    employee: EmployeeCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    employeeId: number
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employee?: EmployeeUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: IntFieldUpdateOperationsInput | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    employeeId: number
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: IntFieldUpdateOperationsInput | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type CategoryAttributeListRelationFilter = {
    every?: CategoryAttributeWhereInput
    some?: CategoryAttributeWhereInput
    none?: CategoryAttributeWhereInput
  }

  export type ProductListRelationFilter = {
    every?: ProductWhereInput
    some?: ProductWhereInput
    none?: ProductWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CategoryAttributeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    hsnCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    hsnCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    hsnCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategorySumOrderByAggregateInput = {
    id?: SortOrder
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

  export type EnumAttributeTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AttributeType | EnumAttributeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AttributeType[] | ListEnumAttributeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AttributeType[] | ListEnumAttributeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAttributeTypeFilter<$PrismaModel> | $Enums.AttributeType
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type CategoryRelationFilter = {
    is?: CategoryWhereInput
    isNot?: CategoryWhereInput
  }

  export type CategoryAttributeCategoryIdNameCompoundUniqueInput = {
    categoryId: number
    name: string
  }

  export type CategoryAttributeCountOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    required?: SortOrder
    sortOrder?: SortOrder
  }

  export type CategoryAttributeAvgOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
    sortOrder?: SortOrder
  }

  export type CategoryAttributeMaxOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    required?: SortOrder
    sortOrder?: SortOrder
  }

  export type CategoryAttributeMinOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    required?: SortOrder
    sortOrder?: SortOrder
  }

  export type CategoryAttributeSumOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
    sortOrder?: SortOrder
  }

  export type EnumAttributeTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AttributeType | EnumAttributeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AttributeType[] | ListEnumAttributeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AttributeType[] | ListEnumAttributeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAttributeTypeWithAggregatesFilter<$PrismaModel> | $Enums.AttributeType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAttributeTypeFilter<$PrismaModel>
    _max?: NestedEnumAttributeTypeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type EnumBarcodeHandlingFilter<$PrismaModel = never> = {
    equals?: $Enums.BarcodeHandling | EnumBarcodeHandlingFieldRefInput<$PrismaModel>
    in?: $Enums.BarcodeHandling[] | ListEnumBarcodeHandlingFieldRefInput<$PrismaModel>
    notIn?: $Enums.BarcodeHandling[] | ListEnumBarcodeHandlingFieldRefInput<$PrismaModel>
    not?: NestedEnumBarcodeHandlingFilter<$PrismaModel> | $Enums.BarcodeHandling
  }

  export type EnumBarcodeTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.BarcodeType | EnumBarcodeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BarcodeType[] | ListEnumBarcodeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BarcodeType[] | ListEnumBarcodeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBarcodeTypeFilter<$PrismaModel> | $Enums.BarcodeType
  }

  export type ProductAttributeValueListRelationFilter = {
    every?: ProductAttributeValueWhereInput
    some?: ProductAttributeValueWhereInput
    none?: ProductAttributeValueWhereInput
  }

  export type InventoryItemListRelationFilter = {
    every?: InventoryItemWhereInput
    some?: InventoryItemWhereInput
    none?: InventoryItemWhereInput
  }

  export type ProductAttributeValueOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InventoryItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    sku?: SortOrder
    name?: SortOrder
    manufacturer?: SortOrder
    categoryId?: SortOrder
    basePrice?: SortOrder
    gstRate?: SortOrder
    barcodeHandling?: SortOrder
    barcode?: SortOrder
    barcodeType?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
    basePrice?: SortOrder
    gstRate?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    sku?: SortOrder
    name?: SortOrder
    manufacturer?: SortOrder
    categoryId?: SortOrder
    basePrice?: SortOrder
    gstRate?: SortOrder
    barcodeHandling?: SortOrder
    barcode?: SortOrder
    barcodeType?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    sku?: SortOrder
    name?: SortOrder
    manufacturer?: SortOrder
    categoryId?: SortOrder
    basePrice?: SortOrder
    gstRate?: SortOrder
    barcodeHandling?: SortOrder
    barcode?: SortOrder
    barcodeType?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
    basePrice?: SortOrder
    gstRate?: SortOrder
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

  export type EnumBarcodeHandlingWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BarcodeHandling | EnumBarcodeHandlingFieldRefInput<$PrismaModel>
    in?: $Enums.BarcodeHandling[] | ListEnumBarcodeHandlingFieldRefInput<$PrismaModel>
    notIn?: $Enums.BarcodeHandling[] | ListEnumBarcodeHandlingFieldRefInput<$PrismaModel>
    not?: NestedEnumBarcodeHandlingWithAggregatesFilter<$PrismaModel> | $Enums.BarcodeHandling
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBarcodeHandlingFilter<$PrismaModel>
    _max?: NestedEnumBarcodeHandlingFilter<$PrismaModel>
  }

  export type EnumBarcodeTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BarcodeType | EnumBarcodeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BarcodeType[] | ListEnumBarcodeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BarcodeType[] | ListEnumBarcodeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBarcodeTypeWithAggregatesFilter<$PrismaModel> | $Enums.BarcodeType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBarcodeTypeFilter<$PrismaModel>
    _max?: NestedEnumBarcodeTypeFilter<$PrismaModel>
  }

  export type ProductRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type ProductAttributeValueProductIdAttributeIdCompoundUniqueInput = {
    productId: number
    attributeId: number
  }

  export type ProductAttributeValueCountOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    attributeId?: SortOrder
    value?: SortOrder
  }

  export type ProductAttributeValueAvgOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    attributeId?: SortOrder
  }

  export type ProductAttributeValueMaxOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    attributeId?: SortOrder
    value?: SortOrder
  }

  export type ProductAttributeValueMinOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    attributeId?: SortOrder
    value?: SortOrder
  }

  export type ProductAttributeValueSumOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    attributeId?: SortOrder
  }

  export type EnumWarehouseStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WarehouseStatus | EnumWarehouseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WarehouseStatus[] | ListEnumWarehouseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WarehouseStatus[] | ListEnumWarehouseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWarehouseStatusFilter<$PrismaModel> | $Enums.WarehouseStatus
  }

  export type WarehouseCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WarehouseAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type WarehouseMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WarehouseMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WarehouseSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumWarehouseStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WarehouseStatus | EnumWarehouseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WarehouseStatus[] | ListEnumWarehouseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WarehouseStatus[] | ListEnumWarehouseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWarehouseStatusWithAggregatesFilter<$PrismaModel> | $Enums.WarehouseStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWarehouseStatusFilter<$PrismaModel>
    _max?: NestedEnumWarehouseStatusFilter<$PrismaModel>
  }

  export type WarehouseRelationFilter = {
    is?: WarehouseWhereInput
    isNot?: WarehouseWhereInput
  }

  export type UniqueBarcodeListRelationFilter = {
    every?: UniqueBarcodeWhereInput
    some?: UniqueBarcodeWhereInput
    none?: UniqueBarcodeWhereInput
  }

  export type UniqueBarcodeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InventoryItemCountOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    warehouseId?: SortOrder
    quantity?: SortOrder
    salePrice?: SortOrder
    location?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InventoryItemAvgOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    warehouseId?: SortOrder
    quantity?: SortOrder
    salePrice?: SortOrder
  }

  export type InventoryItemMaxOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    warehouseId?: SortOrder
    quantity?: SortOrder
    salePrice?: SortOrder
    location?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InventoryItemMinOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    warehouseId?: SortOrder
    quantity?: SortOrder
    salePrice?: SortOrder
    location?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InventoryItemSumOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    warehouseId?: SortOrder
    quantity?: SortOrder
    salePrice?: SortOrder
  }

  export type InventoryItemRelationFilter = {
    is?: InventoryItemWhereInput
    isNot?: InventoryItemWhereInput
  }

  export type UniqueBarcodeCountOrderByAggregateInput = {
    id?: SortOrder
    inventoryItemId?: SortOrder
    barcode?: SortOrder
    createdAt?: SortOrder
  }

  export type UniqueBarcodeAvgOrderByAggregateInput = {
    id?: SortOrder
    inventoryItemId?: SortOrder
  }

  export type UniqueBarcodeMaxOrderByAggregateInput = {
    id?: SortOrder
    inventoryItemId?: SortOrder
    barcode?: SortOrder
    createdAt?: SortOrder
  }

  export type UniqueBarcodeMinOrderByAggregateInput = {
    id?: SortOrder
    inventoryItemId?: SortOrder
    barcode?: SortOrder
    createdAt?: SortOrder
  }

  export type UniqueBarcodeSumOrderByAggregateInput = {
    id?: SortOrder
    inventoryItemId?: SortOrder
  }

  export type QuotationListRelationFilter = {
    every?: QuotationWhereInput
    some?: QuotationWhereInput
    none?: QuotationWhereInput
  }

  export type EmployeeListRelationFilter = {
    every?: EmployeeWhereInput
    some?: EmployeeWhereInput
    none?: EmployeeWhereInput
  }

  export type QuotationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmployeeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CompanyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    ownerName?: SortOrder
    address?: SortOrder
    gstNumber?: SortOrder
    contact?: SortOrder
    email?: SortOrder
    logoUrl?: SortOrder
    bankName?: SortOrder
    branchName?: SortOrder
    accountName?: SortOrder
    accountNumber?: SortOrder
    ifscCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanyAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CompanyMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    ownerName?: SortOrder
    address?: SortOrder
    gstNumber?: SortOrder
    contact?: SortOrder
    email?: SortOrder
    logoUrl?: SortOrder
    bankName?: SortOrder
    branchName?: SortOrder
    accountName?: SortOrder
    accountNumber?: SortOrder
    ifscCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    ownerName?: SortOrder
    address?: SortOrder
    gstNumber?: SortOrder
    contact?: SortOrder
    email?: SortOrder
    logoUrl?: SortOrder
    bankName?: SortOrder
    branchName?: SortOrder
    accountName?: SortOrder
    accountNumber?: SortOrder
    ifscCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
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

  export type EnumQuotationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.QuotationStatus | EnumQuotationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.QuotationStatus[] | ListEnumQuotationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuotationStatus[] | ListEnumQuotationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumQuotationStatusFilter<$PrismaModel> | $Enums.QuotationStatus
  }

  export type CompanyRelationFilter = {
    is?: CompanyWhereInput
    isNot?: CompanyWhereInput
  }

  export type QuotationItemListRelationFilter = {
    every?: QuotationItemWhereInput
    some?: QuotationItemWhereInput
    none?: QuotationItemWhereInput
  }

  export type QuotationFixedCostListRelationFilter = {
    every?: QuotationFixedCostWhereInput
    some?: QuotationFixedCostWhereInput
    none?: QuotationFixedCostWhereInput
  }

  export type QuotationItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type QuotationFixedCostOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type QuotationCountOrderByAggregateInput = {
    id?: SortOrder
    quoteNumber?: SortOrder
    quoteDate?: SortOrder
    companyId?: SortOrder
    customerName?: SortOrder
    customerAddress?: SortOrder
    customerContact?: SortOrder
    customerEmail?: SortOrder
    systemType?: SortOrder
    systemSizeKw?: SortOrder
    panelType?: SortOrder
    panelWattage?: SortOrder
    panelCount?: SortOrder
    outputWattageKw?: SortOrder
    phase?: SortOrder
    subtotal?: SortOrder
    totalGst?: SortOrder
    discountPercent?: SortOrder
    discountAmount?: SortOrder
    finalPrice?: SortOrder
    roundedPrice?: SortOrder
    advancePayment?: SortOrder
    balanceDue?: SortOrder
    paymentType?: SortOrder
    receiverName?: SortOrder
    remarks?: SortOrder
    preparedBy?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QuotationAvgOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    systemSizeKw?: SortOrder
    panelWattage?: SortOrder
    panelCount?: SortOrder
    outputWattageKw?: SortOrder
    subtotal?: SortOrder
    totalGst?: SortOrder
    discountPercent?: SortOrder
    discountAmount?: SortOrder
    finalPrice?: SortOrder
    roundedPrice?: SortOrder
    advancePayment?: SortOrder
    balanceDue?: SortOrder
  }

  export type QuotationMaxOrderByAggregateInput = {
    id?: SortOrder
    quoteNumber?: SortOrder
    quoteDate?: SortOrder
    companyId?: SortOrder
    customerName?: SortOrder
    customerAddress?: SortOrder
    customerContact?: SortOrder
    customerEmail?: SortOrder
    systemType?: SortOrder
    systemSizeKw?: SortOrder
    panelType?: SortOrder
    panelWattage?: SortOrder
    panelCount?: SortOrder
    outputWattageKw?: SortOrder
    phase?: SortOrder
    subtotal?: SortOrder
    totalGst?: SortOrder
    discountPercent?: SortOrder
    discountAmount?: SortOrder
    finalPrice?: SortOrder
    roundedPrice?: SortOrder
    advancePayment?: SortOrder
    balanceDue?: SortOrder
    paymentType?: SortOrder
    receiverName?: SortOrder
    remarks?: SortOrder
    preparedBy?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QuotationMinOrderByAggregateInput = {
    id?: SortOrder
    quoteNumber?: SortOrder
    quoteDate?: SortOrder
    companyId?: SortOrder
    customerName?: SortOrder
    customerAddress?: SortOrder
    customerContact?: SortOrder
    customerEmail?: SortOrder
    systemType?: SortOrder
    systemSizeKw?: SortOrder
    panelType?: SortOrder
    panelWattage?: SortOrder
    panelCount?: SortOrder
    outputWattageKw?: SortOrder
    phase?: SortOrder
    subtotal?: SortOrder
    totalGst?: SortOrder
    discountPercent?: SortOrder
    discountAmount?: SortOrder
    finalPrice?: SortOrder
    roundedPrice?: SortOrder
    advancePayment?: SortOrder
    balanceDue?: SortOrder
    paymentType?: SortOrder
    receiverName?: SortOrder
    remarks?: SortOrder
    preparedBy?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QuotationSumOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    systemSizeKw?: SortOrder
    panelWattage?: SortOrder
    panelCount?: SortOrder
    outputWattageKw?: SortOrder
    subtotal?: SortOrder
    totalGst?: SortOrder
    discountPercent?: SortOrder
    discountAmount?: SortOrder
    finalPrice?: SortOrder
    roundedPrice?: SortOrder
    advancePayment?: SortOrder
    balanceDue?: SortOrder
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
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

  export type EnumQuotationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuotationStatus | EnumQuotationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.QuotationStatus[] | ListEnumQuotationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuotationStatus[] | ListEnumQuotationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumQuotationStatusWithAggregatesFilter<$PrismaModel> | $Enums.QuotationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumQuotationStatusFilter<$PrismaModel>
    _max?: NestedEnumQuotationStatusFilter<$PrismaModel>
  }

  export type QuotationRelationFilter = {
    is?: QuotationWhereInput
    isNot?: QuotationWhereInput
  }

  export type QuotationItemCountOrderByAggregateInput = {
    id?: SortOrder
    quotationId?: SortOrder
    categoryName?: SortOrder
    productName?: SortOrder
    hsnCode?: SortOrder
    description?: SortOrder
    unitPrice?: SortOrder
    quantity?: SortOrder
    gstRate?: SortOrder
    totalPrice?: SortOrder
    sortOrder?: SortOrder
  }

  export type QuotationItemAvgOrderByAggregateInput = {
    id?: SortOrder
    quotationId?: SortOrder
    unitPrice?: SortOrder
    quantity?: SortOrder
    gstRate?: SortOrder
    totalPrice?: SortOrder
    sortOrder?: SortOrder
  }

  export type QuotationItemMaxOrderByAggregateInput = {
    id?: SortOrder
    quotationId?: SortOrder
    categoryName?: SortOrder
    productName?: SortOrder
    hsnCode?: SortOrder
    description?: SortOrder
    unitPrice?: SortOrder
    quantity?: SortOrder
    gstRate?: SortOrder
    totalPrice?: SortOrder
    sortOrder?: SortOrder
  }

  export type QuotationItemMinOrderByAggregateInput = {
    id?: SortOrder
    quotationId?: SortOrder
    categoryName?: SortOrder
    productName?: SortOrder
    hsnCode?: SortOrder
    description?: SortOrder
    unitPrice?: SortOrder
    quantity?: SortOrder
    gstRate?: SortOrder
    totalPrice?: SortOrder
    sortOrder?: SortOrder
  }

  export type QuotationItemSumOrderByAggregateInput = {
    id?: SortOrder
    quotationId?: SortOrder
    unitPrice?: SortOrder
    quantity?: SortOrder
    gstRate?: SortOrder
    totalPrice?: SortOrder
    sortOrder?: SortOrder
  }

  export type QuotationFixedCostCountOrderByAggregateInput = {
    id?: SortOrder
    quotationId?: SortOrder
    label?: SortOrder
    cost?: SortOrder
    rateNote?: SortOrder
    hsnCode?: SortOrder
    gstRate?: SortOrder
    total?: SortOrder
    included?: SortOrder
    sortOrder?: SortOrder
  }

  export type QuotationFixedCostAvgOrderByAggregateInput = {
    id?: SortOrder
    quotationId?: SortOrder
    cost?: SortOrder
    gstRate?: SortOrder
    total?: SortOrder
    sortOrder?: SortOrder
  }

  export type QuotationFixedCostMaxOrderByAggregateInput = {
    id?: SortOrder
    quotationId?: SortOrder
    label?: SortOrder
    cost?: SortOrder
    rateNote?: SortOrder
    hsnCode?: SortOrder
    gstRate?: SortOrder
    total?: SortOrder
    included?: SortOrder
    sortOrder?: SortOrder
  }

  export type QuotationFixedCostMinOrderByAggregateInput = {
    id?: SortOrder
    quotationId?: SortOrder
    label?: SortOrder
    cost?: SortOrder
    rateNote?: SortOrder
    hsnCode?: SortOrder
    gstRate?: SortOrder
    total?: SortOrder
    included?: SortOrder
    sortOrder?: SortOrder
  }

  export type QuotationFixedCostSumOrderByAggregateInput = {
    id?: SortOrder
    quotationId?: SortOrder
    cost?: SortOrder
    gstRate?: SortOrder
    total?: SortOrder
    sortOrder?: SortOrder
  }

  export type EnumEmployeeRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.EmployeeRole | EnumEmployeeRoleFieldRefInput<$PrismaModel>
    in?: $Enums.EmployeeRole[] | ListEnumEmployeeRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmployeeRole[] | ListEnumEmployeeRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumEmployeeRoleFilter<$PrismaModel> | $Enums.EmployeeRole
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmployeeCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmployeeAvgOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
  }

  export type EmployeeMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmployeeMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmployeeSumOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
  }

  export type EnumEmployeeRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EmployeeRole | EnumEmployeeRoleFieldRefInput<$PrismaModel>
    in?: $Enums.EmployeeRole[] | ListEnumEmployeeRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmployeeRole[] | ListEnumEmployeeRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumEmployeeRoleWithAggregatesFilter<$PrismaModel> | $Enums.EmployeeRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEmployeeRoleFilter<$PrismaModel>
    _max?: NestedEnumEmployeeRoleFilter<$PrismaModel>
  }

  export type EmployeeRelationFilter = {
    is?: EmployeeWhereInput
    isNot?: EmployeeWhereInput
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionAvgOrderByAggregateInput = {
    employeeId?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionSumOrderByAggregateInput = {
    employeeId?: SortOrder
  }

  export type CategoryAttributeCreateNestedManyWithoutCategoryInput = {
    create?: XOR<CategoryAttributeCreateWithoutCategoryInput, CategoryAttributeUncheckedCreateWithoutCategoryInput> | CategoryAttributeCreateWithoutCategoryInput[] | CategoryAttributeUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: CategoryAttributeCreateOrConnectWithoutCategoryInput | CategoryAttributeCreateOrConnectWithoutCategoryInput[]
    createMany?: CategoryAttributeCreateManyCategoryInputEnvelope
    connect?: CategoryAttributeWhereUniqueInput | CategoryAttributeWhereUniqueInput[]
  }

  export type ProductCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type CategoryAttributeUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<CategoryAttributeCreateWithoutCategoryInput, CategoryAttributeUncheckedCreateWithoutCategoryInput> | CategoryAttributeCreateWithoutCategoryInput[] | CategoryAttributeUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: CategoryAttributeCreateOrConnectWithoutCategoryInput | CategoryAttributeCreateOrConnectWithoutCategoryInput[]
    createMany?: CategoryAttributeCreateManyCategoryInputEnvelope
    connect?: CategoryAttributeWhereUniqueInput | CategoryAttributeWhereUniqueInput[]
  }

  export type ProductUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
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

  export type CategoryAttributeUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<CategoryAttributeCreateWithoutCategoryInput, CategoryAttributeUncheckedCreateWithoutCategoryInput> | CategoryAttributeCreateWithoutCategoryInput[] | CategoryAttributeUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: CategoryAttributeCreateOrConnectWithoutCategoryInput | CategoryAttributeCreateOrConnectWithoutCategoryInput[]
    upsert?: CategoryAttributeUpsertWithWhereUniqueWithoutCategoryInput | CategoryAttributeUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: CategoryAttributeCreateManyCategoryInputEnvelope
    set?: CategoryAttributeWhereUniqueInput | CategoryAttributeWhereUniqueInput[]
    disconnect?: CategoryAttributeWhereUniqueInput | CategoryAttributeWhereUniqueInput[]
    delete?: CategoryAttributeWhereUniqueInput | CategoryAttributeWhereUniqueInput[]
    connect?: CategoryAttributeWhereUniqueInput | CategoryAttributeWhereUniqueInput[]
    update?: CategoryAttributeUpdateWithWhereUniqueWithoutCategoryInput | CategoryAttributeUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: CategoryAttributeUpdateManyWithWhereWithoutCategoryInput | CategoryAttributeUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: CategoryAttributeScalarWhereInput | CategoryAttributeScalarWhereInput[]
  }

  export type ProductUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput | ProductUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCategoryInput | ProductUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCategoryInput | ProductUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CategoryAttributeUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<CategoryAttributeCreateWithoutCategoryInput, CategoryAttributeUncheckedCreateWithoutCategoryInput> | CategoryAttributeCreateWithoutCategoryInput[] | CategoryAttributeUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: CategoryAttributeCreateOrConnectWithoutCategoryInput | CategoryAttributeCreateOrConnectWithoutCategoryInput[]
    upsert?: CategoryAttributeUpsertWithWhereUniqueWithoutCategoryInput | CategoryAttributeUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: CategoryAttributeCreateManyCategoryInputEnvelope
    set?: CategoryAttributeWhereUniqueInput | CategoryAttributeWhereUniqueInput[]
    disconnect?: CategoryAttributeWhereUniqueInput | CategoryAttributeWhereUniqueInput[]
    delete?: CategoryAttributeWhereUniqueInput | CategoryAttributeWhereUniqueInput[]
    connect?: CategoryAttributeWhereUniqueInput | CategoryAttributeWhereUniqueInput[]
    update?: CategoryAttributeUpdateWithWhereUniqueWithoutCategoryInput | CategoryAttributeUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: CategoryAttributeUpdateManyWithWhereWithoutCategoryInput | CategoryAttributeUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: CategoryAttributeScalarWhereInput | CategoryAttributeScalarWhereInput[]
  }

  export type ProductUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput | ProductUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCategoryInput | ProductUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCategoryInput | ProductUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type CategoryCreateNestedOneWithoutAttributesInput = {
    create?: XOR<CategoryCreateWithoutAttributesInput, CategoryUncheckedCreateWithoutAttributesInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutAttributesInput
    connect?: CategoryWhereUniqueInput
  }

  export type EnumAttributeTypeFieldUpdateOperationsInput = {
    set?: $Enums.AttributeType
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type CategoryUpdateOneRequiredWithoutAttributesNestedInput = {
    create?: XOR<CategoryCreateWithoutAttributesInput, CategoryUncheckedCreateWithoutAttributesInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutAttributesInput
    upsert?: CategoryUpsertWithoutAttributesInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutAttributesInput, CategoryUpdateWithoutAttributesInput>, CategoryUncheckedUpdateWithoutAttributesInput>
  }

  export type CategoryCreateNestedOneWithoutProductsInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    connect?: CategoryWhereUniqueInput
  }

  export type ProductAttributeValueCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductAttributeValueCreateWithoutProductInput, ProductAttributeValueUncheckedCreateWithoutProductInput> | ProductAttributeValueCreateWithoutProductInput[] | ProductAttributeValueUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductAttributeValueCreateOrConnectWithoutProductInput | ProductAttributeValueCreateOrConnectWithoutProductInput[]
    createMany?: ProductAttributeValueCreateManyProductInputEnvelope
    connect?: ProductAttributeValueWhereUniqueInput | ProductAttributeValueWhereUniqueInput[]
  }

  export type InventoryItemCreateNestedManyWithoutProductInput = {
    create?: XOR<InventoryItemCreateWithoutProductInput, InventoryItemUncheckedCreateWithoutProductInput> | InventoryItemCreateWithoutProductInput[] | InventoryItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: InventoryItemCreateOrConnectWithoutProductInput | InventoryItemCreateOrConnectWithoutProductInput[]
    createMany?: InventoryItemCreateManyProductInputEnvelope
    connect?: InventoryItemWhereUniqueInput | InventoryItemWhereUniqueInput[]
  }

  export type ProductAttributeValueUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductAttributeValueCreateWithoutProductInput, ProductAttributeValueUncheckedCreateWithoutProductInput> | ProductAttributeValueCreateWithoutProductInput[] | ProductAttributeValueUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductAttributeValueCreateOrConnectWithoutProductInput | ProductAttributeValueCreateOrConnectWithoutProductInput[]
    createMany?: ProductAttributeValueCreateManyProductInputEnvelope
    connect?: ProductAttributeValueWhereUniqueInput | ProductAttributeValueWhereUniqueInput[]
  }

  export type InventoryItemUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<InventoryItemCreateWithoutProductInput, InventoryItemUncheckedCreateWithoutProductInput> | InventoryItemCreateWithoutProductInput[] | InventoryItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: InventoryItemCreateOrConnectWithoutProductInput | InventoryItemCreateOrConnectWithoutProductInput[]
    createMany?: InventoryItemCreateManyProductInputEnvelope
    connect?: InventoryItemWhereUniqueInput | InventoryItemWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type EnumBarcodeHandlingFieldUpdateOperationsInput = {
    set?: $Enums.BarcodeHandling
  }

  export type EnumBarcodeTypeFieldUpdateOperationsInput = {
    set?: $Enums.BarcodeType
  }

  export type CategoryUpdateOneRequiredWithoutProductsNestedInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    upsert?: CategoryUpsertWithoutProductsInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutProductsInput, CategoryUpdateWithoutProductsInput>, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type ProductAttributeValueUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductAttributeValueCreateWithoutProductInput, ProductAttributeValueUncheckedCreateWithoutProductInput> | ProductAttributeValueCreateWithoutProductInput[] | ProductAttributeValueUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductAttributeValueCreateOrConnectWithoutProductInput | ProductAttributeValueCreateOrConnectWithoutProductInput[]
    upsert?: ProductAttributeValueUpsertWithWhereUniqueWithoutProductInput | ProductAttributeValueUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductAttributeValueCreateManyProductInputEnvelope
    set?: ProductAttributeValueWhereUniqueInput | ProductAttributeValueWhereUniqueInput[]
    disconnect?: ProductAttributeValueWhereUniqueInput | ProductAttributeValueWhereUniqueInput[]
    delete?: ProductAttributeValueWhereUniqueInput | ProductAttributeValueWhereUniqueInput[]
    connect?: ProductAttributeValueWhereUniqueInput | ProductAttributeValueWhereUniqueInput[]
    update?: ProductAttributeValueUpdateWithWhereUniqueWithoutProductInput | ProductAttributeValueUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductAttributeValueUpdateManyWithWhereWithoutProductInput | ProductAttributeValueUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductAttributeValueScalarWhereInput | ProductAttributeValueScalarWhereInput[]
  }

  export type InventoryItemUpdateManyWithoutProductNestedInput = {
    create?: XOR<InventoryItemCreateWithoutProductInput, InventoryItemUncheckedCreateWithoutProductInput> | InventoryItemCreateWithoutProductInput[] | InventoryItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: InventoryItemCreateOrConnectWithoutProductInput | InventoryItemCreateOrConnectWithoutProductInput[]
    upsert?: InventoryItemUpsertWithWhereUniqueWithoutProductInput | InventoryItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: InventoryItemCreateManyProductInputEnvelope
    set?: InventoryItemWhereUniqueInput | InventoryItemWhereUniqueInput[]
    disconnect?: InventoryItemWhereUniqueInput | InventoryItemWhereUniqueInput[]
    delete?: InventoryItemWhereUniqueInput | InventoryItemWhereUniqueInput[]
    connect?: InventoryItemWhereUniqueInput | InventoryItemWhereUniqueInput[]
    update?: InventoryItemUpdateWithWhereUniqueWithoutProductInput | InventoryItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: InventoryItemUpdateManyWithWhereWithoutProductInput | InventoryItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: InventoryItemScalarWhereInput | InventoryItemScalarWhereInput[]
  }

  export type ProductAttributeValueUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductAttributeValueCreateWithoutProductInput, ProductAttributeValueUncheckedCreateWithoutProductInput> | ProductAttributeValueCreateWithoutProductInput[] | ProductAttributeValueUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductAttributeValueCreateOrConnectWithoutProductInput | ProductAttributeValueCreateOrConnectWithoutProductInput[]
    upsert?: ProductAttributeValueUpsertWithWhereUniqueWithoutProductInput | ProductAttributeValueUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductAttributeValueCreateManyProductInputEnvelope
    set?: ProductAttributeValueWhereUniqueInput | ProductAttributeValueWhereUniqueInput[]
    disconnect?: ProductAttributeValueWhereUniqueInput | ProductAttributeValueWhereUniqueInput[]
    delete?: ProductAttributeValueWhereUniqueInput | ProductAttributeValueWhereUniqueInput[]
    connect?: ProductAttributeValueWhereUniqueInput | ProductAttributeValueWhereUniqueInput[]
    update?: ProductAttributeValueUpdateWithWhereUniqueWithoutProductInput | ProductAttributeValueUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductAttributeValueUpdateManyWithWhereWithoutProductInput | ProductAttributeValueUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductAttributeValueScalarWhereInput | ProductAttributeValueScalarWhereInput[]
  }

  export type InventoryItemUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<InventoryItemCreateWithoutProductInput, InventoryItemUncheckedCreateWithoutProductInput> | InventoryItemCreateWithoutProductInput[] | InventoryItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: InventoryItemCreateOrConnectWithoutProductInput | InventoryItemCreateOrConnectWithoutProductInput[]
    upsert?: InventoryItemUpsertWithWhereUniqueWithoutProductInput | InventoryItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: InventoryItemCreateManyProductInputEnvelope
    set?: InventoryItemWhereUniqueInput | InventoryItemWhereUniqueInput[]
    disconnect?: InventoryItemWhereUniqueInput | InventoryItemWhereUniqueInput[]
    delete?: InventoryItemWhereUniqueInput | InventoryItemWhereUniqueInput[]
    connect?: InventoryItemWhereUniqueInput | InventoryItemWhereUniqueInput[]
    update?: InventoryItemUpdateWithWhereUniqueWithoutProductInput | InventoryItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: InventoryItemUpdateManyWithWhereWithoutProductInput | InventoryItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: InventoryItemScalarWhereInput | InventoryItemScalarWhereInput[]
  }

  export type ProductCreateNestedOneWithoutAttributeValuesInput = {
    create?: XOR<ProductCreateWithoutAttributeValuesInput, ProductUncheckedCreateWithoutAttributeValuesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutAttributeValuesInput
    connect?: ProductWhereUniqueInput
  }

  export type ProductUpdateOneRequiredWithoutAttributeValuesNestedInput = {
    create?: XOR<ProductCreateWithoutAttributeValuesInput, ProductUncheckedCreateWithoutAttributeValuesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutAttributeValuesInput
    upsert?: ProductUpsertWithoutAttributeValuesInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutAttributeValuesInput, ProductUpdateWithoutAttributeValuesInput>, ProductUncheckedUpdateWithoutAttributeValuesInput>
  }

  export type InventoryItemCreateNestedManyWithoutWarehouseInput = {
    create?: XOR<InventoryItemCreateWithoutWarehouseInput, InventoryItemUncheckedCreateWithoutWarehouseInput> | InventoryItemCreateWithoutWarehouseInput[] | InventoryItemUncheckedCreateWithoutWarehouseInput[]
    connectOrCreate?: InventoryItemCreateOrConnectWithoutWarehouseInput | InventoryItemCreateOrConnectWithoutWarehouseInput[]
    createMany?: InventoryItemCreateManyWarehouseInputEnvelope
    connect?: InventoryItemWhereUniqueInput | InventoryItemWhereUniqueInput[]
  }

  export type InventoryItemUncheckedCreateNestedManyWithoutWarehouseInput = {
    create?: XOR<InventoryItemCreateWithoutWarehouseInput, InventoryItemUncheckedCreateWithoutWarehouseInput> | InventoryItemCreateWithoutWarehouseInput[] | InventoryItemUncheckedCreateWithoutWarehouseInput[]
    connectOrCreate?: InventoryItemCreateOrConnectWithoutWarehouseInput | InventoryItemCreateOrConnectWithoutWarehouseInput[]
    createMany?: InventoryItemCreateManyWarehouseInputEnvelope
    connect?: InventoryItemWhereUniqueInput | InventoryItemWhereUniqueInput[]
  }

  export type EnumWarehouseStatusFieldUpdateOperationsInput = {
    set?: $Enums.WarehouseStatus
  }

  export type InventoryItemUpdateManyWithoutWarehouseNestedInput = {
    create?: XOR<InventoryItemCreateWithoutWarehouseInput, InventoryItemUncheckedCreateWithoutWarehouseInput> | InventoryItemCreateWithoutWarehouseInput[] | InventoryItemUncheckedCreateWithoutWarehouseInput[]
    connectOrCreate?: InventoryItemCreateOrConnectWithoutWarehouseInput | InventoryItemCreateOrConnectWithoutWarehouseInput[]
    upsert?: InventoryItemUpsertWithWhereUniqueWithoutWarehouseInput | InventoryItemUpsertWithWhereUniqueWithoutWarehouseInput[]
    createMany?: InventoryItemCreateManyWarehouseInputEnvelope
    set?: InventoryItemWhereUniqueInput | InventoryItemWhereUniqueInput[]
    disconnect?: InventoryItemWhereUniqueInput | InventoryItemWhereUniqueInput[]
    delete?: InventoryItemWhereUniqueInput | InventoryItemWhereUniqueInput[]
    connect?: InventoryItemWhereUniqueInput | InventoryItemWhereUniqueInput[]
    update?: InventoryItemUpdateWithWhereUniqueWithoutWarehouseInput | InventoryItemUpdateWithWhereUniqueWithoutWarehouseInput[]
    updateMany?: InventoryItemUpdateManyWithWhereWithoutWarehouseInput | InventoryItemUpdateManyWithWhereWithoutWarehouseInput[]
    deleteMany?: InventoryItemScalarWhereInput | InventoryItemScalarWhereInput[]
  }

  export type InventoryItemUncheckedUpdateManyWithoutWarehouseNestedInput = {
    create?: XOR<InventoryItemCreateWithoutWarehouseInput, InventoryItemUncheckedCreateWithoutWarehouseInput> | InventoryItemCreateWithoutWarehouseInput[] | InventoryItemUncheckedCreateWithoutWarehouseInput[]
    connectOrCreate?: InventoryItemCreateOrConnectWithoutWarehouseInput | InventoryItemCreateOrConnectWithoutWarehouseInput[]
    upsert?: InventoryItemUpsertWithWhereUniqueWithoutWarehouseInput | InventoryItemUpsertWithWhereUniqueWithoutWarehouseInput[]
    createMany?: InventoryItemCreateManyWarehouseInputEnvelope
    set?: InventoryItemWhereUniqueInput | InventoryItemWhereUniqueInput[]
    disconnect?: InventoryItemWhereUniqueInput | InventoryItemWhereUniqueInput[]
    delete?: InventoryItemWhereUniqueInput | InventoryItemWhereUniqueInput[]
    connect?: InventoryItemWhereUniqueInput | InventoryItemWhereUniqueInput[]
    update?: InventoryItemUpdateWithWhereUniqueWithoutWarehouseInput | InventoryItemUpdateWithWhereUniqueWithoutWarehouseInput[]
    updateMany?: InventoryItemUpdateManyWithWhereWithoutWarehouseInput | InventoryItemUpdateManyWithWhereWithoutWarehouseInput[]
    deleteMany?: InventoryItemScalarWhereInput | InventoryItemScalarWhereInput[]
  }

  export type ProductCreateNestedOneWithoutInventoryItemsInput = {
    create?: XOR<ProductCreateWithoutInventoryItemsInput, ProductUncheckedCreateWithoutInventoryItemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutInventoryItemsInput
    connect?: ProductWhereUniqueInput
  }

  export type WarehouseCreateNestedOneWithoutInventoryItemsInput = {
    create?: XOR<WarehouseCreateWithoutInventoryItemsInput, WarehouseUncheckedCreateWithoutInventoryItemsInput>
    connectOrCreate?: WarehouseCreateOrConnectWithoutInventoryItemsInput
    connect?: WarehouseWhereUniqueInput
  }

  export type UniqueBarcodeCreateNestedManyWithoutInventoryItemInput = {
    create?: XOR<UniqueBarcodeCreateWithoutInventoryItemInput, UniqueBarcodeUncheckedCreateWithoutInventoryItemInput> | UniqueBarcodeCreateWithoutInventoryItemInput[] | UniqueBarcodeUncheckedCreateWithoutInventoryItemInput[]
    connectOrCreate?: UniqueBarcodeCreateOrConnectWithoutInventoryItemInput | UniqueBarcodeCreateOrConnectWithoutInventoryItemInput[]
    createMany?: UniqueBarcodeCreateManyInventoryItemInputEnvelope
    connect?: UniqueBarcodeWhereUniqueInput | UniqueBarcodeWhereUniqueInput[]
  }

  export type UniqueBarcodeUncheckedCreateNestedManyWithoutInventoryItemInput = {
    create?: XOR<UniqueBarcodeCreateWithoutInventoryItemInput, UniqueBarcodeUncheckedCreateWithoutInventoryItemInput> | UniqueBarcodeCreateWithoutInventoryItemInput[] | UniqueBarcodeUncheckedCreateWithoutInventoryItemInput[]
    connectOrCreate?: UniqueBarcodeCreateOrConnectWithoutInventoryItemInput | UniqueBarcodeCreateOrConnectWithoutInventoryItemInput[]
    createMany?: UniqueBarcodeCreateManyInventoryItemInputEnvelope
    connect?: UniqueBarcodeWhereUniqueInput | UniqueBarcodeWhereUniqueInput[]
  }

  export type ProductUpdateOneRequiredWithoutInventoryItemsNestedInput = {
    create?: XOR<ProductCreateWithoutInventoryItemsInput, ProductUncheckedCreateWithoutInventoryItemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutInventoryItemsInput
    upsert?: ProductUpsertWithoutInventoryItemsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutInventoryItemsInput, ProductUpdateWithoutInventoryItemsInput>, ProductUncheckedUpdateWithoutInventoryItemsInput>
  }

  export type WarehouseUpdateOneRequiredWithoutInventoryItemsNestedInput = {
    create?: XOR<WarehouseCreateWithoutInventoryItemsInput, WarehouseUncheckedCreateWithoutInventoryItemsInput>
    connectOrCreate?: WarehouseCreateOrConnectWithoutInventoryItemsInput
    upsert?: WarehouseUpsertWithoutInventoryItemsInput
    connect?: WarehouseWhereUniqueInput
    update?: XOR<XOR<WarehouseUpdateToOneWithWhereWithoutInventoryItemsInput, WarehouseUpdateWithoutInventoryItemsInput>, WarehouseUncheckedUpdateWithoutInventoryItemsInput>
  }

  export type UniqueBarcodeUpdateManyWithoutInventoryItemNestedInput = {
    create?: XOR<UniqueBarcodeCreateWithoutInventoryItemInput, UniqueBarcodeUncheckedCreateWithoutInventoryItemInput> | UniqueBarcodeCreateWithoutInventoryItemInput[] | UniqueBarcodeUncheckedCreateWithoutInventoryItemInput[]
    connectOrCreate?: UniqueBarcodeCreateOrConnectWithoutInventoryItemInput | UniqueBarcodeCreateOrConnectWithoutInventoryItemInput[]
    upsert?: UniqueBarcodeUpsertWithWhereUniqueWithoutInventoryItemInput | UniqueBarcodeUpsertWithWhereUniqueWithoutInventoryItemInput[]
    createMany?: UniqueBarcodeCreateManyInventoryItemInputEnvelope
    set?: UniqueBarcodeWhereUniqueInput | UniqueBarcodeWhereUniqueInput[]
    disconnect?: UniqueBarcodeWhereUniqueInput | UniqueBarcodeWhereUniqueInput[]
    delete?: UniqueBarcodeWhereUniqueInput | UniqueBarcodeWhereUniqueInput[]
    connect?: UniqueBarcodeWhereUniqueInput | UniqueBarcodeWhereUniqueInput[]
    update?: UniqueBarcodeUpdateWithWhereUniqueWithoutInventoryItemInput | UniqueBarcodeUpdateWithWhereUniqueWithoutInventoryItemInput[]
    updateMany?: UniqueBarcodeUpdateManyWithWhereWithoutInventoryItemInput | UniqueBarcodeUpdateManyWithWhereWithoutInventoryItemInput[]
    deleteMany?: UniqueBarcodeScalarWhereInput | UniqueBarcodeScalarWhereInput[]
  }

  export type UniqueBarcodeUncheckedUpdateManyWithoutInventoryItemNestedInput = {
    create?: XOR<UniqueBarcodeCreateWithoutInventoryItemInput, UniqueBarcodeUncheckedCreateWithoutInventoryItemInput> | UniqueBarcodeCreateWithoutInventoryItemInput[] | UniqueBarcodeUncheckedCreateWithoutInventoryItemInput[]
    connectOrCreate?: UniqueBarcodeCreateOrConnectWithoutInventoryItemInput | UniqueBarcodeCreateOrConnectWithoutInventoryItemInput[]
    upsert?: UniqueBarcodeUpsertWithWhereUniqueWithoutInventoryItemInput | UniqueBarcodeUpsertWithWhereUniqueWithoutInventoryItemInput[]
    createMany?: UniqueBarcodeCreateManyInventoryItemInputEnvelope
    set?: UniqueBarcodeWhereUniqueInput | UniqueBarcodeWhereUniqueInput[]
    disconnect?: UniqueBarcodeWhereUniqueInput | UniqueBarcodeWhereUniqueInput[]
    delete?: UniqueBarcodeWhereUniqueInput | UniqueBarcodeWhereUniqueInput[]
    connect?: UniqueBarcodeWhereUniqueInput | UniqueBarcodeWhereUniqueInput[]
    update?: UniqueBarcodeUpdateWithWhereUniqueWithoutInventoryItemInput | UniqueBarcodeUpdateWithWhereUniqueWithoutInventoryItemInput[]
    updateMany?: UniqueBarcodeUpdateManyWithWhereWithoutInventoryItemInput | UniqueBarcodeUpdateManyWithWhereWithoutInventoryItemInput[]
    deleteMany?: UniqueBarcodeScalarWhereInput | UniqueBarcodeScalarWhereInput[]
  }

  export type InventoryItemCreateNestedOneWithoutUniqueBarcodesInput = {
    create?: XOR<InventoryItemCreateWithoutUniqueBarcodesInput, InventoryItemUncheckedCreateWithoutUniqueBarcodesInput>
    connectOrCreate?: InventoryItemCreateOrConnectWithoutUniqueBarcodesInput
    connect?: InventoryItemWhereUniqueInput
  }

  export type InventoryItemUpdateOneRequiredWithoutUniqueBarcodesNestedInput = {
    create?: XOR<InventoryItemCreateWithoutUniqueBarcodesInput, InventoryItemUncheckedCreateWithoutUniqueBarcodesInput>
    connectOrCreate?: InventoryItemCreateOrConnectWithoutUniqueBarcodesInput
    upsert?: InventoryItemUpsertWithoutUniqueBarcodesInput
    connect?: InventoryItemWhereUniqueInput
    update?: XOR<XOR<InventoryItemUpdateToOneWithWhereWithoutUniqueBarcodesInput, InventoryItemUpdateWithoutUniqueBarcodesInput>, InventoryItemUncheckedUpdateWithoutUniqueBarcodesInput>
  }

  export type QuotationCreateNestedManyWithoutCompanyInput = {
    create?: XOR<QuotationCreateWithoutCompanyInput, QuotationUncheckedCreateWithoutCompanyInput> | QuotationCreateWithoutCompanyInput[] | QuotationUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: QuotationCreateOrConnectWithoutCompanyInput | QuotationCreateOrConnectWithoutCompanyInput[]
    createMany?: QuotationCreateManyCompanyInputEnvelope
    connect?: QuotationWhereUniqueInput | QuotationWhereUniqueInput[]
  }

  export type EmployeeCreateNestedManyWithoutCompanyInput = {
    create?: XOR<EmployeeCreateWithoutCompanyInput, EmployeeUncheckedCreateWithoutCompanyInput> | EmployeeCreateWithoutCompanyInput[] | EmployeeUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutCompanyInput | EmployeeCreateOrConnectWithoutCompanyInput[]
    createMany?: EmployeeCreateManyCompanyInputEnvelope
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
  }

  export type QuotationUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<QuotationCreateWithoutCompanyInput, QuotationUncheckedCreateWithoutCompanyInput> | QuotationCreateWithoutCompanyInput[] | QuotationUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: QuotationCreateOrConnectWithoutCompanyInput | QuotationCreateOrConnectWithoutCompanyInput[]
    createMany?: QuotationCreateManyCompanyInputEnvelope
    connect?: QuotationWhereUniqueInput | QuotationWhereUniqueInput[]
  }

  export type EmployeeUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<EmployeeCreateWithoutCompanyInput, EmployeeUncheckedCreateWithoutCompanyInput> | EmployeeCreateWithoutCompanyInput[] | EmployeeUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutCompanyInput | EmployeeCreateOrConnectWithoutCompanyInput[]
    createMany?: EmployeeCreateManyCompanyInputEnvelope
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
  }

  export type QuotationUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<QuotationCreateWithoutCompanyInput, QuotationUncheckedCreateWithoutCompanyInput> | QuotationCreateWithoutCompanyInput[] | QuotationUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: QuotationCreateOrConnectWithoutCompanyInput | QuotationCreateOrConnectWithoutCompanyInput[]
    upsert?: QuotationUpsertWithWhereUniqueWithoutCompanyInput | QuotationUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: QuotationCreateManyCompanyInputEnvelope
    set?: QuotationWhereUniqueInput | QuotationWhereUniqueInput[]
    disconnect?: QuotationWhereUniqueInput | QuotationWhereUniqueInput[]
    delete?: QuotationWhereUniqueInput | QuotationWhereUniqueInput[]
    connect?: QuotationWhereUniqueInput | QuotationWhereUniqueInput[]
    update?: QuotationUpdateWithWhereUniqueWithoutCompanyInput | QuotationUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: QuotationUpdateManyWithWhereWithoutCompanyInput | QuotationUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: QuotationScalarWhereInput | QuotationScalarWhereInput[]
  }

  export type EmployeeUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<EmployeeCreateWithoutCompanyInput, EmployeeUncheckedCreateWithoutCompanyInput> | EmployeeCreateWithoutCompanyInput[] | EmployeeUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutCompanyInput | EmployeeCreateOrConnectWithoutCompanyInput[]
    upsert?: EmployeeUpsertWithWhereUniqueWithoutCompanyInput | EmployeeUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: EmployeeCreateManyCompanyInputEnvelope
    set?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    disconnect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    delete?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    update?: EmployeeUpdateWithWhereUniqueWithoutCompanyInput | EmployeeUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: EmployeeUpdateManyWithWhereWithoutCompanyInput | EmployeeUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: EmployeeScalarWhereInput | EmployeeScalarWhereInput[]
  }

  export type QuotationUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<QuotationCreateWithoutCompanyInput, QuotationUncheckedCreateWithoutCompanyInput> | QuotationCreateWithoutCompanyInput[] | QuotationUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: QuotationCreateOrConnectWithoutCompanyInput | QuotationCreateOrConnectWithoutCompanyInput[]
    upsert?: QuotationUpsertWithWhereUniqueWithoutCompanyInput | QuotationUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: QuotationCreateManyCompanyInputEnvelope
    set?: QuotationWhereUniqueInput | QuotationWhereUniqueInput[]
    disconnect?: QuotationWhereUniqueInput | QuotationWhereUniqueInput[]
    delete?: QuotationWhereUniqueInput | QuotationWhereUniqueInput[]
    connect?: QuotationWhereUniqueInput | QuotationWhereUniqueInput[]
    update?: QuotationUpdateWithWhereUniqueWithoutCompanyInput | QuotationUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: QuotationUpdateManyWithWhereWithoutCompanyInput | QuotationUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: QuotationScalarWhereInput | QuotationScalarWhereInput[]
  }

  export type EmployeeUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<EmployeeCreateWithoutCompanyInput, EmployeeUncheckedCreateWithoutCompanyInput> | EmployeeCreateWithoutCompanyInput[] | EmployeeUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutCompanyInput | EmployeeCreateOrConnectWithoutCompanyInput[]
    upsert?: EmployeeUpsertWithWhereUniqueWithoutCompanyInput | EmployeeUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: EmployeeCreateManyCompanyInputEnvelope
    set?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    disconnect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    delete?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    update?: EmployeeUpdateWithWhereUniqueWithoutCompanyInput | EmployeeUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: EmployeeUpdateManyWithWhereWithoutCompanyInput | EmployeeUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: EmployeeScalarWhereInput | EmployeeScalarWhereInput[]
  }

  export type CompanyCreateNestedOneWithoutQuotationsInput = {
    create?: XOR<CompanyCreateWithoutQuotationsInput, CompanyUncheckedCreateWithoutQuotationsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutQuotationsInput
    connect?: CompanyWhereUniqueInput
  }

  export type QuotationItemCreateNestedManyWithoutQuotationInput = {
    create?: XOR<QuotationItemCreateWithoutQuotationInput, QuotationItemUncheckedCreateWithoutQuotationInput> | QuotationItemCreateWithoutQuotationInput[] | QuotationItemUncheckedCreateWithoutQuotationInput[]
    connectOrCreate?: QuotationItemCreateOrConnectWithoutQuotationInput | QuotationItemCreateOrConnectWithoutQuotationInput[]
    createMany?: QuotationItemCreateManyQuotationInputEnvelope
    connect?: QuotationItemWhereUniqueInput | QuotationItemWhereUniqueInput[]
  }

  export type QuotationFixedCostCreateNestedManyWithoutQuotationInput = {
    create?: XOR<QuotationFixedCostCreateWithoutQuotationInput, QuotationFixedCostUncheckedCreateWithoutQuotationInput> | QuotationFixedCostCreateWithoutQuotationInput[] | QuotationFixedCostUncheckedCreateWithoutQuotationInput[]
    connectOrCreate?: QuotationFixedCostCreateOrConnectWithoutQuotationInput | QuotationFixedCostCreateOrConnectWithoutQuotationInput[]
    createMany?: QuotationFixedCostCreateManyQuotationInputEnvelope
    connect?: QuotationFixedCostWhereUniqueInput | QuotationFixedCostWhereUniqueInput[]
  }

  export type QuotationItemUncheckedCreateNestedManyWithoutQuotationInput = {
    create?: XOR<QuotationItemCreateWithoutQuotationInput, QuotationItemUncheckedCreateWithoutQuotationInput> | QuotationItemCreateWithoutQuotationInput[] | QuotationItemUncheckedCreateWithoutQuotationInput[]
    connectOrCreate?: QuotationItemCreateOrConnectWithoutQuotationInput | QuotationItemCreateOrConnectWithoutQuotationInput[]
    createMany?: QuotationItemCreateManyQuotationInputEnvelope
    connect?: QuotationItemWhereUniqueInput | QuotationItemWhereUniqueInput[]
  }

  export type QuotationFixedCostUncheckedCreateNestedManyWithoutQuotationInput = {
    create?: XOR<QuotationFixedCostCreateWithoutQuotationInput, QuotationFixedCostUncheckedCreateWithoutQuotationInput> | QuotationFixedCostCreateWithoutQuotationInput[] | QuotationFixedCostUncheckedCreateWithoutQuotationInput[]
    connectOrCreate?: QuotationFixedCostCreateOrConnectWithoutQuotationInput | QuotationFixedCostCreateOrConnectWithoutQuotationInput[]
    createMany?: QuotationFixedCostCreateManyQuotationInputEnvelope
    connect?: QuotationFixedCostWhereUniqueInput | QuotationFixedCostWhereUniqueInput[]
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumQuotationStatusFieldUpdateOperationsInput = {
    set?: $Enums.QuotationStatus
  }

  export type CompanyUpdateOneRequiredWithoutQuotationsNestedInput = {
    create?: XOR<CompanyCreateWithoutQuotationsInput, CompanyUncheckedCreateWithoutQuotationsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutQuotationsInput
    upsert?: CompanyUpsertWithoutQuotationsInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutQuotationsInput, CompanyUpdateWithoutQuotationsInput>, CompanyUncheckedUpdateWithoutQuotationsInput>
  }

  export type QuotationItemUpdateManyWithoutQuotationNestedInput = {
    create?: XOR<QuotationItemCreateWithoutQuotationInput, QuotationItemUncheckedCreateWithoutQuotationInput> | QuotationItemCreateWithoutQuotationInput[] | QuotationItemUncheckedCreateWithoutQuotationInput[]
    connectOrCreate?: QuotationItemCreateOrConnectWithoutQuotationInput | QuotationItemCreateOrConnectWithoutQuotationInput[]
    upsert?: QuotationItemUpsertWithWhereUniqueWithoutQuotationInput | QuotationItemUpsertWithWhereUniqueWithoutQuotationInput[]
    createMany?: QuotationItemCreateManyQuotationInputEnvelope
    set?: QuotationItemWhereUniqueInput | QuotationItemWhereUniqueInput[]
    disconnect?: QuotationItemWhereUniqueInput | QuotationItemWhereUniqueInput[]
    delete?: QuotationItemWhereUniqueInput | QuotationItemWhereUniqueInput[]
    connect?: QuotationItemWhereUniqueInput | QuotationItemWhereUniqueInput[]
    update?: QuotationItemUpdateWithWhereUniqueWithoutQuotationInput | QuotationItemUpdateWithWhereUniqueWithoutQuotationInput[]
    updateMany?: QuotationItemUpdateManyWithWhereWithoutQuotationInput | QuotationItemUpdateManyWithWhereWithoutQuotationInput[]
    deleteMany?: QuotationItemScalarWhereInput | QuotationItemScalarWhereInput[]
  }

  export type QuotationFixedCostUpdateManyWithoutQuotationNestedInput = {
    create?: XOR<QuotationFixedCostCreateWithoutQuotationInput, QuotationFixedCostUncheckedCreateWithoutQuotationInput> | QuotationFixedCostCreateWithoutQuotationInput[] | QuotationFixedCostUncheckedCreateWithoutQuotationInput[]
    connectOrCreate?: QuotationFixedCostCreateOrConnectWithoutQuotationInput | QuotationFixedCostCreateOrConnectWithoutQuotationInput[]
    upsert?: QuotationFixedCostUpsertWithWhereUniqueWithoutQuotationInput | QuotationFixedCostUpsertWithWhereUniqueWithoutQuotationInput[]
    createMany?: QuotationFixedCostCreateManyQuotationInputEnvelope
    set?: QuotationFixedCostWhereUniqueInput | QuotationFixedCostWhereUniqueInput[]
    disconnect?: QuotationFixedCostWhereUniqueInput | QuotationFixedCostWhereUniqueInput[]
    delete?: QuotationFixedCostWhereUniqueInput | QuotationFixedCostWhereUniqueInput[]
    connect?: QuotationFixedCostWhereUniqueInput | QuotationFixedCostWhereUniqueInput[]
    update?: QuotationFixedCostUpdateWithWhereUniqueWithoutQuotationInput | QuotationFixedCostUpdateWithWhereUniqueWithoutQuotationInput[]
    updateMany?: QuotationFixedCostUpdateManyWithWhereWithoutQuotationInput | QuotationFixedCostUpdateManyWithWhereWithoutQuotationInput[]
    deleteMany?: QuotationFixedCostScalarWhereInput | QuotationFixedCostScalarWhereInput[]
  }

  export type QuotationItemUncheckedUpdateManyWithoutQuotationNestedInput = {
    create?: XOR<QuotationItemCreateWithoutQuotationInput, QuotationItemUncheckedCreateWithoutQuotationInput> | QuotationItemCreateWithoutQuotationInput[] | QuotationItemUncheckedCreateWithoutQuotationInput[]
    connectOrCreate?: QuotationItemCreateOrConnectWithoutQuotationInput | QuotationItemCreateOrConnectWithoutQuotationInput[]
    upsert?: QuotationItemUpsertWithWhereUniqueWithoutQuotationInput | QuotationItemUpsertWithWhereUniqueWithoutQuotationInput[]
    createMany?: QuotationItemCreateManyQuotationInputEnvelope
    set?: QuotationItemWhereUniqueInput | QuotationItemWhereUniqueInput[]
    disconnect?: QuotationItemWhereUniqueInput | QuotationItemWhereUniqueInput[]
    delete?: QuotationItemWhereUniqueInput | QuotationItemWhereUniqueInput[]
    connect?: QuotationItemWhereUniqueInput | QuotationItemWhereUniqueInput[]
    update?: QuotationItemUpdateWithWhereUniqueWithoutQuotationInput | QuotationItemUpdateWithWhereUniqueWithoutQuotationInput[]
    updateMany?: QuotationItemUpdateManyWithWhereWithoutQuotationInput | QuotationItemUpdateManyWithWhereWithoutQuotationInput[]
    deleteMany?: QuotationItemScalarWhereInput | QuotationItemScalarWhereInput[]
  }

  export type QuotationFixedCostUncheckedUpdateManyWithoutQuotationNestedInput = {
    create?: XOR<QuotationFixedCostCreateWithoutQuotationInput, QuotationFixedCostUncheckedCreateWithoutQuotationInput> | QuotationFixedCostCreateWithoutQuotationInput[] | QuotationFixedCostUncheckedCreateWithoutQuotationInput[]
    connectOrCreate?: QuotationFixedCostCreateOrConnectWithoutQuotationInput | QuotationFixedCostCreateOrConnectWithoutQuotationInput[]
    upsert?: QuotationFixedCostUpsertWithWhereUniqueWithoutQuotationInput | QuotationFixedCostUpsertWithWhereUniqueWithoutQuotationInput[]
    createMany?: QuotationFixedCostCreateManyQuotationInputEnvelope
    set?: QuotationFixedCostWhereUniqueInput | QuotationFixedCostWhereUniqueInput[]
    disconnect?: QuotationFixedCostWhereUniqueInput | QuotationFixedCostWhereUniqueInput[]
    delete?: QuotationFixedCostWhereUniqueInput | QuotationFixedCostWhereUniqueInput[]
    connect?: QuotationFixedCostWhereUniqueInput | QuotationFixedCostWhereUniqueInput[]
    update?: QuotationFixedCostUpdateWithWhereUniqueWithoutQuotationInput | QuotationFixedCostUpdateWithWhereUniqueWithoutQuotationInput[]
    updateMany?: QuotationFixedCostUpdateManyWithWhereWithoutQuotationInput | QuotationFixedCostUpdateManyWithWhereWithoutQuotationInput[]
    deleteMany?: QuotationFixedCostScalarWhereInput | QuotationFixedCostScalarWhereInput[]
  }

  export type QuotationCreateNestedOneWithoutItemsInput = {
    create?: XOR<QuotationCreateWithoutItemsInput, QuotationUncheckedCreateWithoutItemsInput>
    connectOrCreate?: QuotationCreateOrConnectWithoutItemsInput
    connect?: QuotationWhereUniqueInput
  }

  export type QuotationUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<QuotationCreateWithoutItemsInput, QuotationUncheckedCreateWithoutItemsInput>
    connectOrCreate?: QuotationCreateOrConnectWithoutItemsInput
    upsert?: QuotationUpsertWithoutItemsInput
    connect?: QuotationWhereUniqueInput
    update?: XOR<XOR<QuotationUpdateToOneWithWhereWithoutItemsInput, QuotationUpdateWithoutItemsInput>, QuotationUncheckedUpdateWithoutItemsInput>
  }

  export type QuotationCreateNestedOneWithoutFixedCostsInput = {
    create?: XOR<QuotationCreateWithoutFixedCostsInput, QuotationUncheckedCreateWithoutFixedCostsInput>
    connectOrCreate?: QuotationCreateOrConnectWithoutFixedCostsInput
    connect?: QuotationWhereUniqueInput
  }

  export type QuotationUpdateOneRequiredWithoutFixedCostsNestedInput = {
    create?: XOR<QuotationCreateWithoutFixedCostsInput, QuotationUncheckedCreateWithoutFixedCostsInput>
    connectOrCreate?: QuotationCreateOrConnectWithoutFixedCostsInput
    upsert?: QuotationUpsertWithoutFixedCostsInput
    connect?: QuotationWhereUniqueInput
    update?: XOR<XOR<QuotationUpdateToOneWithWhereWithoutFixedCostsInput, QuotationUpdateWithoutFixedCostsInput>, QuotationUncheckedUpdateWithoutFixedCostsInput>
  }

  export type CompanyCreateNestedOneWithoutEmployeesInput = {
    create?: XOR<CompanyCreateWithoutEmployeesInput, CompanyUncheckedCreateWithoutEmployeesInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutEmployeesInput
    connect?: CompanyWhereUniqueInput
  }

  export type SessionCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<SessionCreateWithoutEmployeeInput, SessionUncheckedCreateWithoutEmployeeInput> | SessionCreateWithoutEmployeeInput[] | SessionUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutEmployeeInput | SessionCreateOrConnectWithoutEmployeeInput[]
    createMany?: SessionCreateManyEmployeeInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<SessionCreateWithoutEmployeeInput, SessionUncheckedCreateWithoutEmployeeInput> | SessionCreateWithoutEmployeeInput[] | SessionUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutEmployeeInput | SessionCreateOrConnectWithoutEmployeeInput[]
    createMany?: SessionCreateManyEmployeeInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type EnumEmployeeRoleFieldUpdateOperationsInput = {
    set?: $Enums.EmployeeRole
  }

  export type CompanyUpdateOneRequiredWithoutEmployeesNestedInput = {
    create?: XOR<CompanyCreateWithoutEmployeesInput, CompanyUncheckedCreateWithoutEmployeesInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutEmployeesInput
    upsert?: CompanyUpsertWithoutEmployeesInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutEmployeesInput, CompanyUpdateWithoutEmployeesInput>, CompanyUncheckedUpdateWithoutEmployeesInput>
  }

  export type SessionUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<SessionCreateWithoutEmployeeInput, SessionUncheckedCreateWithoutEmployeeInput> | SessionCreateWithoutEmployeeInput[] | SessionUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutEmployeeInput | SessionCreateOrConnectWithoutEmployeeInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutEmployeeInput | SessionUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: SessionCreateManyEmployeeInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutEmployeeInput | SessionUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutEmployeeInput | SessionUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<SessionCreateWithoutEmployeeInput, SessionUncheckedCreateWithoutEmployeeInput> | SessionCreateWithoutEmployeeInput[] | SessionUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutEmployeeInput | SessionCreateOrConnectWithoutEmployeeInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutEmployeeInput | SessionUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: SessionCreateManyEmployeeInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutEmployeeInput | SessionUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutEmployeeInput | SessionUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type EmployeeCreateNestedOneWithoutSessionsInput = {
    create?: XOR<EmployeeCreateWithoutSessionsInput, EmployeeUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutSessionsInput
    connect?: EmployeeWhereUniqueInput
  }

  export type EmployeeUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<EmployeeCreateWithoutSessionsInput, EmployeeUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutSessionsInput
    upsert?: EmployeeUpsertWithoutSessionsInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutSessionsInput, EmployeeUpdateWithoutSessionsInput>, EmployeeUncheckedUpdateWithoutSessionsInput>
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

  export type NestedEnumAttributeTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AttributeType | EnumAttributeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AttributeType[] | ListEnumAttributeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AttributeType[] | ListEnumAttributeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAttributeTypeFilter<$PrismaModel> | $Enums.AttributeType
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumAttributeTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AttributeType | EnumAttributeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AttributeType[] | ListEnumAttributeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AttributeType[] | ListEnumAttributeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAttributeTypeWithAggregatesFilter<$PrismaModel> | $Enums.AttributeType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAttributeTypeFilter<$PrismaModel>
    _max?: NestedEnumAttributeTypeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedEnumBarcodeHandlingFilter<$PrismaModel = never> = {
    equals?: $Enums.BarcodeHandling | EnumBarcodeHandlingFieldRefInput<$PrismaModel>
    in?: $Enums.BarcodeHandling[] | ListEnumBarcodeHandlingFieldRefInput<$PrismaModel>
    notIn?: $Enums.BarcodeHandling[] | ListEnumBarcodeHandlingFieldRefInput<$PrismaModel>
    not?: NestedEnumBarcodeHandlingFilter<$PrismaModel> | $Enums.BarcodeHandling
  }

  export type NestedEnumBarcodeTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.BarcodeType | EnumBarcodeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BarcodeType[] | ListEnumBarcodeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BarcodeType[] | ListEnumBarcodeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBarcodeTypeFilter<$PrismaModel> | $Enums.BarcodeType
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

  export type NestedEnumBarcodeHandlingWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BarcodeHandling | EnumBarcodeHandlingFieldRefInput<$PrismaModel>
    in?: $Enums.BarcodeHandling[] | ListEnumBarcodeHandlingFieldRefInput<$PrismaModel>
    notIn?: $Enums.BarcodeHandling[] | ListEnumBarcodeHandlingFieldRefInput<$PrismaModel>
    not?: NestedEnumBarcodeHandlingWithAggregatesFilter<$PrismaModel> | $Enums.BarcodeHandling
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBarcodeHandlingFilter<$PrismaModel>
    _max?: NestedEnumBarcodeHandlingFilter<$PrismaModel>
  }

  export type NestedEnumBarcodeTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BarcodeType | EnumBarcodeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BarcodeType[] | ListEnumBarcodeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BarcodeType[] | ListEnumBarcodeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBarcodeTypeWithAggregatesFilter<$PrismaModel> | $Enums.BarcodeType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBarcodeTypeFilter<$PrismaModel>
    _max?: NestedEnumBarcodeTypeFilter<$PrismaModel>
  }

  export type NestedEnumWarehouseStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WarehouseStatus | EnumWarehouseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WarehouseStatus[] | ListEnumWarehouseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WarehouseStatus[] | ListEnumWarehouseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWarehouseStatusFilter<$PrismaModel> | $Enums.WarehouseStatus
  }

  export type NestedEnumWarehouseStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WarehouseStatus | EnumWarehouseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WarehouseStatus[] | ListEnumWarehouseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WarehouseStatus[] | ListEnumWarehouseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWarehouseStatusWithAggregatesFilter<$PrismaModel> | $Enums.WarehouseStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWarehouseStatusFilter<$PrismaModel>
    _max?: NestedEnumWarehouseStatusFilter<$PrismaModel>
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedEnumQuotationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.QuotationStatus | EnumQuotationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.QuotationStatus[] | ListEnumQuotationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuotationStatus[] | ListEnumQuotationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumQuotationStatusFilter<$PrismaModel> | $Enums.QuotationStatus
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
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

  export type NestedEnumQuotationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuotationStatus | EnumQuotationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.QuotationStatus[] | ListEnumQuotationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuotationStatus[] | ListEnumQuotationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumQuotationStatusWithAggregatesFilter<$PrismaModel> | $Enums.QuotationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumQuotationStatusFilter<$PrismaModel>
    _max?: NestedEnumQuotationStatusFilter<$PrismaModel>
  }

  export type NestedEnumEmployeeRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.EmployeeRole | EnumEmployeeRoleFieldRefInput<$PrismaModel>
    in?: $Enums.EmployeeRole[] | ListEnumEmployeeRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmployeeRole[] | ListEnumEmployeeRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumEmployeeRoleFilter<$PrismaModel> | $Enums.EmployeeRole
  }

  export type NestedEnumEmployeeRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EmployeeRole | EnumEmployeeRoleFieldRefInput<$PrismaModel>
    in?: $Enums.EmployeeRole[] | ListEnumEmployeeRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmployeeRole[] | ListEnumEmployeeRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumEmployeeRoleWithAggregatesFilter<$PrismaModel> | $Enums.EmployeeRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEmployeeRoleFilter<$PrismaModel>
    _max?: NestedEnumEmployeeRoleFilter<$PrismaModel>
  }

  export type CategoryAttributeCreateWithoutCategoryInput = {
    name: string
    type?: $Enums.AttributeType
    required?: boolean
    sortOrder?: number
  }

  export type CategoryAttributeUncheckedCreateWithoutCategoryInput = {
    id?: number
    name: string
    type?: $Enums.AttributeType
    required?: boolean
    sortOrder?: number
  }

  export type CategoryAttributeCreateOrConnectWithoutCategoryInput = {
    where: CategoryAttributeWhereUniqueInput
    create: XOR<CategoryAttributeCreateWithoutCategoryInput, CategoryAttributeUncheckedCreateWithoutCategoryInput>
  }

  export type CategoryAttributeCreateManyCategoryInputEnvelope = {
    data: CategoryAttributeCreateManyCategoryInput | CategoryAttributeCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type ProductCreateWithoutCategoryInput = {
    sku: string
    name: string
    manufacturer?: string | null
    basePrice?: Decimal | DecimalJsLike | number | string
    gstRate?: Decimal | DecimalJsLike | number | string
    barcodeHandling?: $Enums.BarcodeHandling
    barcode?: string | null
    barcodeType?: $Enums.BarcodeType
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attributeValues?: ProductAttributeValueCreateNestedManyWithoutProductInput
    inventoryItems?: InventoryItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutCategoryInput = {
    id?: number
    sku: string
    name: string
    manufacturer?: string | null
    basePrice?: Decimal | DecimalJsLike | number | string
    gstRate?: Decimal | DecimalJsLike | number | string
    barcodeHandling?: $Enums.BarcodeHandling
    barcode?: string | null
    barcodeType?: $Enums.BarcodeType
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attributeValues?: ProductAttributeValueUncheckedCreateNestedManyWithoutProductInput
    inventoryItems?: InventoryItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput>
  }

  export type ProductCreateManyCategoryInputEnvelope = {
    data: ProductCreateManyCategoryInput | ProductCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type CategoryAttributeUpsertWithWhereUniqueWithoutCategoryInput = {
    where: CategoryAttributeWhereUniqueInput
    update: XOR<CategoryAttributeUpdateWithoutCategoryInput, CategoryAttributeUncheckedUpdateWithoutCategoryInput>
    create: XOR<CategoryAttributeCreateWithoutCategoryInput, CategoryAttributeUncheckedCreateWithoutCategoryInput>
  }

  export type CategoryAttributeUpdateWithWhereUniqueWithoutCategoryInput = {
    where: CategoryAttributeWhereUniqueInput
    data: XOR<CategoryAttributeUpdateWithoutCategoryInput, CategoryAttributeUncheckedUpdateWithoutCategoryInput>
  }

  export type CategoryAttributeUpdateManyWithWhereWithoutCategoryInput = {
    where: CategoryAttributeScalarWhereInput
    data: XOR<CategoryAttributeUpdateManyMutationInput, CategoryAttributeUncheckedUpdateManyWithoutCategoryInput>
  }

  export type CategoryAttributeScalarWhereInput = {
    AND?: CategoryAttributeScalarWhereInput | CategoryAttributeScalarWhereInput[]
    OR?: CategoryAttributeScalarWhereInput[]
    NOT?: CategoryAttributeScalarWhereInput | CategoryAttributeScalarWhereInput[]
    id?: IntFilter<"CategoryAttribute"> | number
    categoryId?: IntFilter<"CategoryAttribute"> | number
    name?: StringFilter<"CategoryAttribute"> | string
    type?: EnumAttributeTypeFilter<"CategoryAttribute"> | $Enums.AttributeType
    required?: BoolFilter<"CategoryAttribute"> | boolean
    sortOrder?: IntFilter<"CategoryAttribute"> | number
  }

  export type ProductUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutCategoryInput, ProductUncheckedUpdateWithoutCategoryInput>
    create: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutCategoryInput, ProductUncheckedUpdateWithoutCategoryInput>
  }

  export type ProductUpdateManyWithWhereWithoutCategoryInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutCategoryInput>
  }

  export type ProductScalarWhereInput = {
    AND?: ProductScalarWhereInput | ProductScalarWhereInput[]
    OR?: ProductScalarWhereInput[]
    NOT?: ProductScalarWhereInput | ProductScalarWhereInput[]
    id?: IntFilter<"Product"> | number
    sku?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    manufacturer?: StringNullableFilter<"Product"> | string | null
    categoryId?: IntFilter<"Product"> | number
    basePrice?: DecimalFilter<"Product"> | Decimal | DecimalJsLike | number | string
    gstRate?: DecimalFilter<"Product"> | Decimal | DecimalJsLike | number | string
    barcodeHandling?: EnumBarcodeHandlingFilter<"Product"> | $Enums.BarcodeHandling
    barcode?: StringNullableFilter<"Product"> | string | null
    barcodeType?: EnumBarcodeTypeFilter<"Product"> | $Enums.BarcodeType
    description?: StringNullableFilter<"Product"> | string | null
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
  }

  export type CategoryCreateWithoutAttributesInput = {
    name: string
    description?: string | null
    hsnCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutAttributesInput = {
    id?: number
    name: string
    description?: string | null
    hsnCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutAttributesInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutAttributesInput, CategoryUncheckedCreateWithoutAttributesInput>
  }

  export type CategoryUpsertWithoutAttributesInput = {
    update: XOR<CategoryUpdateWithoutAttributesInput, CategoryUncheckedUpdateWithoutAttributesInput>
    create: XOR<CategoryCreateWithoutAttributesInput, CategoryUncheckedCreateWithoutAttributesInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutAttributesInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutAttributesInput, CategoryUncheckedUpdateWithoutAttributesInput>
  }

  export type CategoryUpdateWithoutAttributesInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    hsnCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutAttributesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    hsnCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateWithoutProductsInput = {
    name: string
    description?: string | null
    hsnCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attributes?: CategoryAttributeCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutProductsInput = {
    id?: number
    name: string
    description?: string | null
    hsnCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attributes?: CategoryAttributeUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutProductsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
  }

  export type ProductAttributeValueCreateWithoutProductInput = {
    attributeId: number
    value: string
  }

  export type ProductAttributeValueUncheckedCreateWithoutProductInput = {
    id?: number
    attributeId: number
    value: string
  }

  export type ProductAttributeValueCreateOrConnectWithoutProductInput = {
    where: ProductAttributeValueWhereUniqueInput
    create: XOR<ProductAttributeValueCreateWithoutProductInput, ProductAttributeValueUncheckedCreateWithoutProductInput>
  }

  export type ProductAttributeValueCreateManyProductInputEnvelope = {
    data: ProductAttributeValueCreateManyProductInput | ProductAttributeValueCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type InventoryItemCreateWithoutProductInput = {
    quantity?: number
    salePrice?: Decimal | DecimalJsLike | number | string
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    warehouse: WarehouseCreateNestedOneWithoutInventoryItemsInput
    uniqueBarcodes?: UniqueBarcodeCreateNestedManyWithoutInventoryItemInput
  }

  export type InventoryItemUncheckedCreateWithoutProductInput = {
    id?: number
    warehouseId: number
    quantity?: number
    salePrice?: Decimal | DecimalJsLike | number | string
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    uniqueBarcodes?: UniqueBarcodeUncheckedCreateNestedManyWithoutInventoryItemInput
  }

  export type InventoryItemCreateOrConnectWithoutProductInput = {
    where: InventoryItemWhereUniqueInput
    create: XOR<InventoryItemCreateWithoutProductInput, InventoryItemUncheckedCreateWithoutProductInput>
  }

  export type InventoryItemCreateManyProductInputEnvelope = {
    data: InventoryItemCreateManyProductInput | InventoryItemCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type CategoryUpsertWithoutProductsInput = {
    update: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutProductsInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type CategoryUpdateWithoutProductsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    hsnCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attributes?: CategoryAttributeUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutProductsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    hsnCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attributes?: CategoryAttributeUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type ProductAttributeValueUpsertWithWhereUniqueWithoutProductInput = {
    where: ProductAttributeValueWhereUniqueInput
    update: XOR<ProductAttributeValueUpdateWithoutProductInput, ProductAttributeValueUncheckedUpdateWithoutProductInput>
    create: XOR<ProductAttributeValueCreateWithoutProductInput, ProductAttributeValueUncheckedCreateWithoutProductInput>
  }

  export type ProductAttributeValueUpdateWithWhereUniqueWithoutProductInput = {
    where: ProductAttributeValueWhereUniqueInput
    data: XOR<ProductAttributeValueUpdateWithoutProductInput, ProductAttributeValueUncheckedUpdateWithoutProductInput>
  }

  export type ProductAttributeValueUpdateManyWithWhereWithoutProductInput = {
    where: ProductAttributeValueScalarWhereInput
    data: XOR<ProductAttributeValueUpdateManyMutationInput, ProductAttributeValueUncheckedUpdateManyWithoutProductInput>
  }

  export type ProductAttributeValueScalarWhereInput = {
    AND?: ProductAttributeValueScalarWhereInput | ProductAttributeValueScalarWhereInput[]
    OR?: ProductAttributeValueScalarWhereInput[]
    NOT?: ProductAttributeValueScalarWhereInput | ProductAttributeValueScalarWhereInput[]
    id?: IntFilter<"ProductAttributeValue"> | number
    productId?: IntFilter<"ProductAttributeValue"> | number
    attributeId?: IntFilter<"ProductAttributeValue"> | number
    value?: StringFilter<"ProductAttributeValue"> | string
  }

  export type InventoryItemUpsertWithWhereUniqueWithoutProductInput = {
    where: InventoryItemWhereUniqueInput
    update: XOR<InventoryItemUpdateWithoutProductInput, InventoryItemUncheckedUpdateWithoutProductInput>
    create: XOR<InventoryItemCreateWithoutProductInput, InventoryItemUncheckedCreateWithoutProductInput>
  }

  export type InventoryItemUpdateWithWhereUniqueWithoutProductInput = {
    where: InventoryItemWhereUniqueInput
    data: XOR<InventoryItemUpdateWithoutProductInput, InventoryItemUncheckedUpdateWithoutProductInput>
  }

  export type InventoryItemUpdateManyWithWhereWithoutProductInput = {
    where: InventoryItemScalarWhereInput
    data: XOR<InventoryItemUpdateManyMutationInput, InventoryItemUncheckedUpdateManyWithoutProductInput>
  }

  export type InventoryItemScalarWhereInput = {
    AND?: InventoryItemScalarWhereInput | InventoryItemScalarWhereInput[]
    OR?: InventoryItemScalarWhereInput[]
    NOT?: InventoryItemScalarWhereInput | InventoryItemScalarWhereInput[]
    id?: IntFilter<"InventoryItem"> | number
    productId?: IntFilter<"InventoryItem"> | number
    warehouseId?: IntFilter<"InventoryItem"> | number
    quantity?: IntFilter<"InventoryItem"> | number
    salePrice?: DecimalFilter<"InventoryItem"> | Decimal | DecimalJsLike | number | string
    location?: StringNullableFilter<"InventoryItem"> | string | null
    createdAt?: DateTimeFilter<"InventoryItem"> | Date | string
    updatedAt?: DateTimeFilter<"InventoryItem"> | Date | string
  }

  export type ProductCreateWithoutAttributeValuesInput = {
    sku: string
    name: string
    manufacturer?: string | null
    basePrice?: Decimal | DecimalJsLike | number | string
    gstRate?: Decimal | DecimalJsLike | number | string
    barcodeHandling?: $Enums.BarcodeHandling
    barcode?: string | null
    barcodeType?: $Enums.BarcodeType
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutProductsInput
    inventoryItems?: InventoryItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutAttributeValuesInput = {
    id?: number
    sku: string
    name: string
    manufacturer?: string | null
    categoryId: number
    basePrice?: Decimal | DecimalJsLike | number | string
    gstRate?: Decimal | DecimalJsLike | number | string
    barcodeHandling?: $Enums.BarcodeHandling
    barcode?: string | null
    barcodeType?: $Enums.BarcodeType
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    inventoryItems?: InventoryItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutAttributeValuesInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutAttributeValuesInput, ProductUncheckedCreateWithoutAttributeValuesInput>
  }

  export type ProductUpsertWithoutAttributeValuesInput = {
    update: XOR<ProductUpdateWithoutAttributeValuesInput, ProductUncheckedUpdateWithoutAttributeValuesInput>
    create: XOR<ProductCreateWithoutAttributeValuesInput, ProductUncheckedCreateWithoutAttributeValuesInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutAttributeValuesInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutAttributeValuesInput, ProductUncheckedUpdateWithoutAttributeValuesInput>
  }

  export type ProductUpdateWithoutAttributeValuesInput = {
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    manufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    basePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gstRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    barcodeHandling?: EnumBarcodeHandlingFieldUpdateOperationsInput | $Enums.BarcodeHandling
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    barcodeType?: EnumBarcodeTypeFieldUpdateOperationsInput | $Enums.BarcodeType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    inventoryItems?: InventoryItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutAttributeValuesInput = {
    id?: IntFieldUpdateOperationsInput | number
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    manufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: IntFieldUpdateOperationsInput | number
    basePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gstRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    barcodeHandling?: EnumBarcodeHandlingFieldUpdateOperationsInput | $Enums.BarcodeHandling
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    barcodeType?: EnumBarcodeTypeFieldUpdateOperationsInput | $Enums.BarcodeType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inventoryItems?: InventoryItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type InventoryItemCreateWithoutWarehouseInput = {
    quantity?: number
    salePrice?: Decimal | DecimalJsLike | number | string
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutInventoryItemsInput
    uniqueBarcodes?: UniqueBarcodeCreateNestedManyWithoutInventoryItemInput
  }

  export type InventoryItemUncheckedCreateWithoutWarehouseInput = {
    id?: number
    productId: number
    quantity?: number
    salePrice?: Decimal | DecimalJsLike | number | string
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    uniqueBarcodes?: UniqueBarcodeUncheckedCreateNestedManyWithoutInventoryItemInput
  }

  export type InventoryItemCreateOrConnectWithoutWarehouseInput = {
    where: InventoryItemWhereUniqueInput
    create: XOR<InventoryItemCreateWithoutWarehouseInput, InventoryItemUncheckedCreateWithoutWarehouseInput>
  }

  export type InventoryItemCreateManyWarehouseInputEnvelope = {
    data: InventoryItemCreateManyWarehouseInput | InventoryItemCreateManyWarehouseInput[]
    skipDuplicates?: boolean
  }

  export type InventoryItemUpsertWithWhereUniqueWithoutWarehouseInput = {
    where: InventoryItemWhereUniqueInput
    update: XOR<InventoryItemUpdateWithoutWarehouseInput, InventoryItemUncheckedUpdateWithoutWarehouseInput>
    create: XOR<InventoryItemCreateWithoutWarehouseInput, InventoryItemUncheckedCreateWithoutWarehouseInput>
  }

  export type InventoryItemUpdateWithWhereUniqueWithoutWarehouseInput = {
    where: InventoryItemWhereUniqueInput
    data: XOR<InventoryItemUpdateWithoutWarehouseInput, InventoryItemUncheckedUpdateWithoutWarehouseInput>
  }

  export type InventoryItemUpdateManyWithWhereWithoutWarehouseInput = {
    where: InventoryItemScalarWhereInput
    data: XOR<InventoryItemUpdateManyMutationInput, InventoryItemUncheckedUpdateManyWithoutWarehouseInput>
  }

  export type ProductCreateWithoutInventoryItemsInput = {
    sku: string
    name: string
    manufacturer?: string | null
    basePrice?: Decimal | DecimalJsLike | number | string
    gstRate?: Decimal | DecimalJsLike | number | string
    barcodeHandling?: $Enums.BarcodeHandling
    barcode?: string | null
    barcodeType?: $Enums.BarcodeType
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutProductsInput
    attributeValues?: ProductAttributeValueCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutInventoryItemsInput = {
    id?: number
    sku: string
    name: string
    manufacturer?: string | null
    categoryId: number
    basePrice?: Decimal | DecimalJsLike | number | string
    gstRate?: Decimal | DecimalJsLike | number | string
    barcodeHandling?: $Enums.BarcodeHandling
    barcode?: string | null
    barcodeType?: $Enums.BarcodeType
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attributeValues?: ProductAttributeValueUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutInventoryItemsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutInventoryItemsInput, ProductUncheckedCreateWithoutInventoryItemsInput>
  }

  export type WarehouseCreateWithoutInventoryItemsInput = {
    name: string
    location?: string | null
    status?: $Enums.WarehouseStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WarehouseUncheckedCreateWithoutInventoryItemsInput = {
    id?: number
    name: string
    location?: string | null
    status?: $Enums.WarehouseStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WarehouseCreateOrConnectWithoutInventoryItemsInput = {
    where: WarehouseWhereUniqueInput
    create: XOR<WarehouseCreateWithoutInventoryItemsInput, WarehouseUncheckedCreateWithoutInventoryItemsInput>
  }

  export type UniqueBarcodeCreateWithoutInventoryItemInput = {
    barcode: string
    createdAt?: Date | string
  }

  export type UniqueBarcodeUncheckedCreateWithoutInventoryItemInput = {
    id?: number
    barcode: string
    createdAt?: Date | string
  }

  export type UniqueBarcodeCreateOrConnectWithoutInventoryItemInput = {
    where: UniqueBarcodeWhereUniqueInput
    create: XOR<UniqueBarcodeCreateWithoutInventoryItemInput, UniqueBarcodeUncheckedCreateWithoutInventoryItemInput>
  }

  export type UniqueBarcodeCreateManyInventoryItemInputEnvelope = {
    data: UniqueBarcodeCreateManyInventoryItemInput | UniqueBarcodeCreateManyInventoryItemInput[]
    skipDuplicates?: boolean
  }

  export type ProductUpsertWithoutInventoryItemsInput = {
    update: XOR<ProductUpdateWithoutInventoryItemsInput, ProductUncheckedUpdateWithoutInventoryItemsInput>
    create: XOR<ProductCreateWithoutInventoryItemsInput, ProductUncheckedCreateWithoutInventoryItemsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutInventoryItemsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutInventoryItemsInput, ProductUncheckedUpdateWithoutInventoryItemsInput>
  }

  export type ProductUpdateWithoutInventoryItemsInput = {
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    manufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    basePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gstRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    barcodeHandling?: EnumBarcodeHandlingFieldUpdateOperationsInput | $Enums.BarcodeHandling
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    barcodeType?: EnumBarcodeTypeFieldUpdateOperationsInput | $Enums.BarcodeType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    attributeValues?: ProductAttributeValueUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutInventoryItemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    manufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: IntFieldUpdateOperationsInput | number
    basePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gstRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    barcodeHandling?: EnumBarcodeHandlingFieldUpdateOperationsInput | $Enums.BarcodeHandling
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    barcodeType?: EnumBarcodeTypeFieldUpdateOperationsInput | $Enums.BarcodeType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attributeValues?: ProductAttributeValueUncheckedUpdateManyWithoutProductNestedInput
  }

  export type WarehouseUpsertWithoutInventoryItemsInput = {
    update: XOR<WarehouseUpdateWithoutInventoryItemsInput, WarehouseUncheckedUpdateWithoutInventoryItemsInput>
    create: XOR<WarehouseCreateWithoutInventoryItemsInput, WarehouseUncheckedCreateWithoutInventoryItemsInput>
    where?: WarehouseWhereInput
  }

  export type WarehouseUpdateToOneWithWhereWithoutInventoryItemsInput = {
    where?: WarehouseWhereInput
    data: XOR<WarehouseUpdateWithoutInventoryItemsInput, WarehouseUncheckedUpdateWithoutInventoryItemsInput>
  }

  export type WarehouseUpdateWithoutInventoryItemsInput = {
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumWarehouseStatusFieldUpdateOperationsInput | $Enums.WarehouseStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WarehouseUncheckedUpdateWithoutInventoryItemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumWarehouseStatusFieldUpdateOperationsInput | $Enums.WarehouseStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UniqueBarcodeUpsertWithWhereUniqueWithoutInventoryItemInput = {
    where: UniqueBarcodeWhereUniqueInput
    update: XOR<UniqueBarcodeUpdateWithoutInventoryItemInput, UniqueBarcodeUncheckedUpdateWithoutInventoryItemInput>
    create: XOR<UniqueBarcodeCreateWithoutInventoryItemInput, UniqueBarcodeUncheckedCreateWithoutInventoryItemInput>
  }

  export type UniqueBarcodeUpdateWithWhereUniqueWithoutInventoryItemInput = {
    where: UniqueBarcodeWhereUniqueInput
    data: XOR<UniqueBarcodeUpdateWithoutInventoryItemInput, UniqueBarcodeUncheckedUpdateWithoutInventoryItemInput>
  }

  export type UniqueBarcodeUpdateManyWithWhereWithoutInventoryItemInput = {
    where: UniqueBarcodeScalarWhereInput
    data: XOR<UniqueBarcodeUpdateManyMutationInput, UniqueBarcodeUncheckedUpdateManyWithoutInventoryItemInput>
  }

  export type UniqueBarcodeScalarWhereInput = {
    AND?: UniqueBarcodeScalarWhereInput | UniqueBarcodeScalarWhereInput[]
    OR?: UniqueBarcodeScalarWhereInput[]
    NOT?: UniqueBarcodeScalarWhereInput | UniqueBarcodeScalarWhereInput[]
    id?: IntFilter<"UniqueBarcode"> | number
    inventoryItemId?: IntFilter<"UniqueBarcode"> | number
    barcode?: StringFilter<"UniqueBarcode"> | string
    createdAt?: DateTimeFilter<"UniqueBarcode"> | Date | string
  }

  export type InventoryItemCreateWithoutUniqueBarcodesInput = {
    quantity?: number
    salePrice?: Decimal | DecimalJsLike | number | string
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutInventoryItemsInput
    warehouse: WarehouseCreateNestedOneWithoutInventoryItemsInput
  }

  export type InventoryItemUncheckedCreateWithoutUniqueBarcodesInput = {
    id?: number
    productId: number
    warehouseId: number
    quantity?: number
    salePrice?: Decimal | DecimalJsLike | number | string
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InventoryItemCreateOrConnectWithoutUniqueBarcodesInput = {
    where: InventoryItemWhereUniqueInput
    create: XOR<InventoryItemCreateWithoutUniqueBarcodesInput, InventoryItemUncheckedCreateWithoutUniqueBarcodesInput>
  }

  export type InventoryItemUpsertWithoutUniqueBarcodesInput = {
    update: XOR<InventoryItemUpdateWithoutUniqueBarcodesInput, InventoryItemUncheckedUpdateWithoutUniqueBarcodesInput>
    create: XOR<InventoryItemCreateWithoutUniqueBarcodesInput, InventoryItemUncheckedCreateWithoutUniqueBarcodesInput>
    where?: InventoryItemWhereInput
  }

  export type InventoryItemUpdateToOneWithWhereWithoutUniqueBarcodesInput = {
    where?: InventoryItemWhereInput
    data: XOR<InventoryItemUpdateWithoutUniqueBarcodesInput, InventoryItemUncheckedUpdateWithoutUniqueBarcodesInput>
  }

  export type InventoryItemUpdateWithoutUniqueBarcodesInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    salePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutInventoryItemsNestedInput
    warehouse?: WarehouseUpdateOneRequiredWithoutInventoryItemsNestedInput
  }

  export type InventoryItemUncheckedUpdateWithoutUniqueBarcodesInput = {
    id?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    warehouseId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    salePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuotationCreateWithoutCompanyInput = {
    quoteNumber: string
    quoteDate?: Date | string
    customerName: string
    customerAddress?: string | null
    customerContact?: string | null
    customerEmail?: string | null
    systemType?: string | null
    systemSizeKw?: Decimal | DecimalJsLike | number | string | null
    panelType?: string | null
    panelWattage?: number | null
    panelCount?: number | null
    outputWattageKw?: Decimal | DecimalJsLike | number | string | null
    phase?: string | null
    subtotal?: Decimal | DecimalJsLike | number | string
    totalGst?: Decimal | DecimalJsLike | number | string
    discountPercent?: Decimal | DecimalJsLike | number | string
    discountAmount?: Decimal | DecimalJsLike | number | string
    finalPrice?: Decimal | DecimalJsLike | number | string
    roundedPrice?: Decimal | DecimalJsLike | number | string
    advancePayment?: Decimal | DecimalJsLike | number | string
    balanceDue?: Decimal | DecimalJsLike | number | string
    paymentType?: string | null
    receiverName?: string | null
    remarks?: string | null
    preparedBy?: string | null
    status?: $Enums.QuotationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: QuotationItemCreateNestedManyWithoutQuotationInput
    fixedCosts?: QuotationFixedCostCreateNestedManyWithoutQuotationInput
  }

  export type QuotationUncheckedCreateWithoutCompanyInput = {
    id?: number
    quoteNumber: string
    quoteDate?: Date | string
    customerName: string
    customerAddress?: string | null
    customerContact?: string | null
    customerEmail?: string | null
    systemType?: string | null
    systemSizeKw?: Decimal | DecimalJsLike | number | string | null
    panelType?: string | null
    panelWattage?: number | null
    panelCount?: number | null
    outputWattageKw?: Decimal | DecimalJsLike | number | string | null
    phase?: string | null
    subtotal?: Decimal | DecimalJsLike | number | string
    totalGst?: Decimal | DecimalJsLike | number | string
    discountPercent?: Decimal | DecimalJsLike | number | string
    discountAmount?: Decimal | DecimalJsLike | number | string
    finalPrice?: Decimal | DecimalJsLike | number | string
    roundedPrice?: Decimal | DecimalJsLike | number | string
    advancePayment?: Decimal | DecimalJsLike | number | string
    balanceDue?: Decimal | DecimalJsLike | number | string
    paymentType?: string | null
    receiverName?: string | null
    remarks?: string | null
    preparedBy?: string | null
    status?: $Enums.QuotationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: QuotationItemUncheckedCreateNestedManyWithoutQuotationInput
    fixedCosts?: QuotationFixedCostUncheckedCreateNestedManyWithoutQuotationInput
  }

  export type QuotationCreateOrConnectWithoutCompanyInput = {
    where: QuotationWhereUniqueInput
    create: XOR<QuotationCreateWithoutCompanyInput, QuotationUncheckedCreateWithoutCompanyInput>
  }

  export type QuotationCreateManyCompanyInputEnvelope = {
    data: QuotationCreateManyCompanyInput | QuotationCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type EmployeeCreateWithoutCompanyInput = {
    name: string
    email: string
    passwordHash: string
    role?: $Enums.EmployeeRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutCompanyInput = {
    id?: number
    name: string
    email: string
    passwordHash: string
    role?: $Enums.EmployeeRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutCompanyInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutCompanyInput, EmployeeUncheckedCreateWithoutCompanyInput>
  }

  export type EmployeeCreateManyCompanyInputEnvelope = {
    data: EmployeeCreateManyCompanyInput | EmployeeCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type QuotationUpsertWithWhereUniqueWithoutCompanyInput = {
    where: QuotationWhereUniqueInput
    update: XOR<QuotationUpdateWithoutCompanyInput, QuotationUncheckedUpdateWithoutCompanyInput>
    create: XOR<QuotationCreateWithoutCompanyInput, QuotationUncheckedCreateWithoutCompanyInput>
  }

  export type QuotationUpdateWithWhereUniqueWithoutCompanyInput = {
    where: QuotationWhereUniqueInput
    data: XOR<QuotationUpdateWithoutCompanyInput, QuotationUncheckedUpdateWithoutCompanyInput>
  }

  export type QuotationUpdateManyWithWhereWithoutCompanyInput = {
    where: QuotationScalarWhereInput
    data: XOR<QuotationUpdateManyMutationInput, QuotationUncheckedUpdateManyWithoutCompanyInput>
  }

  export type QuotationScalarWhereInput = {
    AND?: QuotationScalarWhereInput | QuotationScalarWhereInput[]
    OR?: QuotationScalarWhereInput[]
    NOT?: QuotationScalarWhereInput | QuotationScalarWhereInput[]
    id?: IntFilter<"Quotation"> | number
    quoteNumber?: StringFilter<"Quotation"> | string
    quoteDate?: DateTimeFilter<"Quotation"> | Date | string
    companyId?: IntFilter<"Quotation"> | number
    customerName?: StringFilter<"Quotation"> | string
    customerAddress?: StringNullableFilter<"Quotation"> | string | null
    customerContact?: StringNullableFilter<"Quotation"> | string | null
    customerEmail?: StringNullableFilter<"Quotation"> | string | null
    systemType?: StringNullableFilter<"Quotation"> | string | null
    systemSizeKw?: DecimalNullableFilter<"Quotation"> | Decimal | DecimalJsLike | number | string | null
    panelType?: StringNullableFilter<"Quotation"> | string | null
    panelWattage?: IntNullableFilter<"Quotation"> | number | null
    panelCount?: IntNullableFilter<"Quotation"> | number | null
    outputWattageKw?: DecimalNullableFilter<"Quotation"> | Decimal | DecimalJsLike | number | string | null
    phase?: StringNullableFilter<"Quotation"> | string | null
    subtotal?: DecimalFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    totalGst?: DecimalFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    discountPercent?: DecimalFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    finalPrice?: DecimalFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    roundedPrice?: DecimalFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    advancePayment?: DecimalFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    balanceDue?: DecimalFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    paymentType?: StringNullableFilter<"Quotation"> | string | null
    receiverName?: StringNullableFilter<"Quotation"> | string | null
    remarks?: StringNullableFilter<"Quotation"> | string | null
    preparedBy?: StringNullableFilter<"Quotation"> | string | null
    status?: EnumQuotationStatusFilter<"Quotation"> | $Enums.QuotationStatus
    createdAt?: DateTimeFilter<"Quotation"> | Date | string
    updatedAt?: DateTimeFilter<"Quotation"> | Date | string
  }

  export type EmployeeUpsertWithWhereUniqueWithoutCompanyInput = {
    where: EmployeeWhereUniqueInput
    update: XOR<EmployeeUpdateWithoutCompanyInput, EmployeeUncheckedUpdateWithoutCompanyInput>
    create: XOR<EmployeeCreateWithoutCompanyInput, EmployeeUncheckedCreateWithoutCompanyInput>
  }

  export type EmployeeUpdateWithWhereUniqueWithoutCompanyInput = {
    where: EmployeeWhereUniqueInput
    data: XOR<EmployeeUpdateWithoutCompanyInput, EmployeeUncheckedUpdateWithoutCompanyInput>
  }

  export type EmployeeUpdateManyWithWhereWithoutCompanyInput = {
    where: EmployeeScalarWhereInput
    data: XOR<EmployeeUpdateManyMutationInput, EmployeeUncheckedUpdateManyWithoutCompanyInput>
  }

  export type EmployeeScalarWhereInput = {
    AND?: EmployeeScalarWhereInput | EmployeeScalarWhereInput[]
    OR?: EmployeeScalarWhereInput[]
    NOT?: EmployeeScalarWhereInput | EmployeeScalarWhereInput[]
    id?: IntFilter<"Employee"> | number
    companyId?: IntFilter<"Employee"> | number
    name?: StringFilter<"Employee"> | string
    email?: StringFilter<"Employee"> | string
    passwordHash?: StringFilter<"Employee"> | string
    role?: EnumEmployeeRoleFilter<"Employee"> | $Enums.EmployeeRole
    isActive?: BoolFilter<"Employee"> | boolean
    createdAt?: DateTimeFilter<"Employee"> | Date | string
    updatedAt?: DateTimeFilter<"Employee"> | Date | string
  }

  export type CompanyCreateWithoutQuotationsInput = {
    name: string
    ownerName?: string | null
    address?: string | null
    gstNumber?: string | null
    contact?: string | null
    email?: string | null
    logoUrl?: string | null
    bankName?: string | null
    branchName?: string | null
    accountName?: string | null
    accountNumber?: string | null
    ifscCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    employees?: EmployeeCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutQuotationsInput = {
    id?: number
    name: string
    ownerName?: string | null
    address?: string | null
    gstNumber?: string | null
    contact?: string | null
    email?: string | null
    logoUrl?: string | null
    bankName?: string | null
    branchName?: string | null
    accountName?: string | null
    accountNumber?: string | null
    ifscCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    employees?: EmployeeUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutQuotationsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutQuotationsInput, CompanyUncheckedCreateWithoutQuotationsInput>
  }

  export type QuotationItemCreateWithoutQuotationInput = {
    categoryName?: string | null
    productName: string
    hsnCode?: string | null
    description?: string | null
    unitPrice: Decimal | DecimalJsLike | number | string
    quantity?: Decimal | DecimalJsLike | number | string
    gstRate?: Decimal | DecimalJsLike | number | string
    totalPrice: Decimal | DecimalJsLike | number | string
    sortOrder?: number
  }

  export type QuotationItemUncheckedCreateWithoutQuotationInput = {
    id?: number
    categoryName?: string | null
    productName: string
    hsnCode?: string | null
    description?: string | null
    unitPrice: Decimal | DecimalJsLike | number | string
    quantity?: Decimal | DecimalJsLike | number | string
    gstRate?: Decimal | DecimalJsLike | number | string
    totalPrice: Decimal | DecimalJsLike | number | string
    sortOrder?: number
  }

  export type QuotationItemCreateOrConnectWithoutQuotationInput = {
    where: QuotationItemWhereUniqueInput
    create: XOR<QuotationItemCreateWithoutQuotationInput, QuotationItemUncheckedCreateWithoutQuotationInput>
  }

  export type QuotationItemCreateManyQuotationInputEnvelope = {
    data: QuotationItemCreateManyQuotationInput | QuotationItemCreateManyQuotationInput[]
    skipDuplicates?: boolean
  }

  export type QuotationFixedCostCreateWithoutQuotationInput = {
    label: string
    cost?: Decimal | DecimalJsLike | number | string
    rateNote?: string | null
    hsnCode?: string | null
    gstRate?: Decimal | DecimalJsLike | number | string
    total?: Decimal | DecimalJsLike | number | string
    included?: boolean
    sortOrder?: number
  }

  export type QuotationFixedCostUncheckedCreateWithoutQuotationInput = {
    id?: number
    label: string
    cost?: Decimal | DecimalJsLike | number | string
    rateNote?: string | null
    hsnCode?: string | null
    gstRate?: Decimal | DecimalJsLike | number | string
    total?: Decimal | DecimalJsLike | number | string
    included?: boolean
    sortOrder?: number
  }

  export type QuotationFixedCostCreateOrConnectWithoutQuotationInput = {
    where: QuotationFixedCostWhereUniqueInput
    create: XOR<QuotationFixedCostCreateWithoutQuotationInput, QuotationFixedCostUncheckedCreateWithoutQuotationInput>
  }

  export type QuotationFixedCostCreateManyQuotationInputEnvelope = {
    data: QuotationFixedCostCreateManyQuotationInput | QuotationFixedCostCreateManyQuotationInput[]
    skipDuplicates?: boolean
  }

  export type CompanyUpsertWithoutQuotationsInput = {
    update: XOR<CompanyUpdateWithoutQuotationsInput, CompanyUncheckedUpdateWithoutQuotationsInput>
    create: XOR<CompanyCreateWithoutQuotationsInput, CompanyUncheckedCreateWithoutQuotationsInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutQuotationsInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutQuotationsInput, CompanyUncheckedUpdateWithoutQuotationsInput>
  }

  export type CompanyUpdateWithoutQuotationsInput = {
    name?: StringFieldUpdateOperationsInput | string
    ownerName?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    gstNumber?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    branchName?: NullableStringFieldUpdateOperationsInput | string | null
    accountName?: NullableStringFieldUpdateOperationsInput | string | null
    accountNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ifscCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employees?: EmployeeUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutQuotationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    ownerName?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    gstNumber?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    branchName?: NullableStringFieldUpdateOperationsInput | string | null
    accountName?: NullableStringFieldUpdateOperationsInput | string | null
    accountNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ifscCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employees?: EmployeeUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type QuotationItemUpsertWithWhereUniqueWithoutQuotationInput = {
    where: QuotationItemWhereUniqueInput
    update: XOR<QuotationItemUpdateWithoutQuotationInput, QuotationItemUncheckedUpdateWithoutQuotationInput>
    create: XOR<QuotationItemCreateWithoutQuotationInput, QuotationItemUncheckedCreateWithoutQuotationInput>
  }

  export type QuotationItemUpdateWithWhereUniqueWithoutQuotationInput = {
    where: QuotationItemWhereUniqueInput
    data: XOR<QuotationItemUpdateWithoutQuotationInput, QuotationItemUncheckedUpdateWithoutQuotationInput>
  }

  export type QuotationItemUpdateManyWithWhereWithoutQuotationInput = {
    where: QuotationItemScalarWhereInput
    data: XOR<QuotationItemUpdateManyMutationInput, QuotationItemUncheckedUpdateManyWithoutQuotationInput>
  }

  export type QuotationItemScalarWhereInput = {
    AND?: QuotationItemScalarWhereInput | QuotationItemScalarWhereInput[]
    OR?: QuotationItemScalarWhereInput[]
    NOT?: QuotationItemScalarWhereInput | QuotationItemScalarWhereInput[]
    id?: IntFilter<"QuotationItem"> | number
    quotationId?: IntFilter<"QuotationItem"> | number
    categoryName?: StringNullableFilter<"QuotationItem"> | string | null
    productName?: StringFilter<"QuotationItem"> | string
    hsnCode?: StringNullableFilter<"QuotationItem"> | string | null
    description?: StringNullableFilter<"QuotationItem"> | string | null
    unitPrice?: DecimalFilter<"QuotationItem"> | Decimal | DecimalJsLike | number | string
    quantity?: DecimalFilter<"QuotationItem"> | Decimal | DecimalJsLike | number | string
    gstRate?: DecimalFilter<"QuotationItem"> | Decimal | DecimalJsLike | number | string
    totalPrice?: DecimalFilter<"QuotationItem"> | Decimal | DecimalJsLike | number | string
    sortOrder?: IntFilter<"QuotationItem"> | number
  }

  export type QuotationFixedCostUpsertWithWhereUniqueWithoutQuotationInput = {
    where: QuotationFixedCostWhereUniqueInput
    update: XOR<QuotationFixedCostUpdateWithoutQuotationInput, QuotationFixedCostUncheckedUpdateWithoutQuotationInput>
    create: XOR<QuotationFixedCostCreateWithoutQuotationInput, QuotationFixedCostUncheckedCreateWithoutQuotationInput>
  }

  export type QuotationFixedCostUpdateWithWhereUniqueWithoutQuotationInput = {
    where: QuotationFixedCostWhereUniqueInput
    data: XOR<QuotationFixedCostUpdateWithoutQuotationInput, QuotationFixedCostUncheckedUpdateWithoutQuotationInput>
  }

  export type QuotationFixedCostUpdateManyWithWhereWithoutQuotationInput = {
    where: QuotationFixedCostScalarWhereInput
    data: XOR<QuotationFixedCostUpdateManyMutationInput, QuotationFixedCostUncheckedUpdateManyWithoutQuotationInput>
  }

  export type QuotationFixedCostScalarWhereInput = {
    AND?: QuotationFixedCostScalarWhereInput | QuotationFixedCostScalarWhereInput[]
    OR?: QuotationFixedCostScalarWhereInput[]
    NOT?: QuotationFixedCostScalarWhereInput | QuotationFixedCostScalarWhereInput[]
    id?: IntFilter<"QuotationFixedCost"> | number
    quotationId?: IntFilter<"QuotationFixedCost"> | number
    label?: StringFilter<"QuotationFixedCost"> | string
    cost?: DecimalFilter<"QuotationFixedCost"> | Decimal | DecimalJsLike | number | string
    rateNote?: StringNullableFilter<"QuotationFixedCost"> | string | null
    hsnCode?: StringNullableFilter<"QuotationFixedCost"> | string | null
    gstRate?: DecimalFilter<"QuotationFixedCost"> | Decimal | DecimalJsLike | number | string
    total?: DecimalFilter<"QuotationFixedCost"> | Decimal | DecimalJsLike | number | string
    included?: BoolFilter<"QuotationFixedCost"> | boolean
    sortOrder?: IntFilter<"QuotationFixedCost"> | number
  }

  export type QuotationCreateWithoutItemsInput = {
    quoteNumber: string
    quoteDate?: Date | string
    customerName: string
    customerAddress?: string | null
    customerContact?: string | null
    customerEmail?: string | null
    systemType?: string | null
    systemSizeKw?: Decimal | DecimalJsLike | number | string | null
    panelType?: string | null
    panelWattage?: number | null
    panelCount?: number | null
    outputWattageKw?: Decimal | DecimalJsLike | number | string | null
    phase?: string | null
    subtotal?: Decimal | DecimalJsLike | number | string
    totalGst?: Decimal | DecimalJsLike | number | string
    discountPercent?: Decimal | DecimalJsLike | number | string
    discountAmount?: Decimal | DecimalJsLike | number | string
    finalPrice?: Decimal | DecimalJsLike | number | string
    roundedPrice?: Decimal | DecimalJsLike | number | string
    advancePayment?: Decimal | DecimalJsLike | number | string
    balanceDue?: Decimal | DecimalJsLike | number | string
    paymentType?: string | null
    receiverName?: string | null
    remarks?: string | null
    preparedBy?: string | null
    status?: $Enums.QuotationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutQuotationsInput
    fixedCosts?: QuotationFixedCostCreateNestedManyWithoutQuotationInput
  }

  export type QuotationUncheckedCreateWithoutItemsInput = {
    id?: number
    quoteNumber: string
    quoteDate?: Date | string
    companyId: number
    customerName: string
    customerAddress?: string | null
    customerContact?: string | null
    customerEmail?: string | null
    systemType?: string | null
    systemSizeKw?: Decimal | DecimalJsLike | number | string | null
    panelType?: string | null
    panelWattage?: number | null
    panelCount?: number | null
    outputWattageKw?: Decimal | DecimalJsLike | number | string | null
    phase?: string | null
    subtotal?: Decimal | DecimalJsLike | number | string
    totalGst?: Decimal | DecimalJsLike | number | string
    discountPercent?: Decimal | DecimalJsLike | number | string
    discountAmount?: Decimal | DecimalJsLike | number | string
    finalPrice?: Decimal | DecimalJsLike | number | string
    roundedPrice?: Decimal | DecimalJsLike | number | string
    advancePayment?: Decimal | DecimalJsLike | number | string
    balanceDue?: Decimal | DecimalJsLike | number | string
    paymentType?: string | null
    receiverName?: string | null
    remarks?: string | null
    preparedBy?: string | null
    status?: $Enums.QuotationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    fixedCosts?: QuotationFixedCostUncheckedCreateNestedManyWithoutQuotationInput
  }

  export type QuotationCreateOrConnectWithoutItemsInput = {
    where: QuotationWhereUniqueInput
    create: XOR<QuotationCreateWithoutItemsInput, QuotationUncheckedCreateWithoutItemsInput>
  }

  export type QuotationUpsertWithoutItemsInput = {
    update: XOR<QuotationUpdateWithoutItemsInput, QuotationUncheckedUpdateWithoutItemsInput>
    create: XOR<QuotationCreateWithoutItemsInput, QuotationUncheckedCreateWithoutItemsInput>
    where?: QuotationWhereInput
  }

  export type QuotationUpdateToOneWithWhereWithoutItemsInput = {
    where?: QuotationWhereInput
    data: XOR<QuotationUpdateWithoutItemsInput, QuotationUncheckedUpdateWithoutItemsInput>
  }

  export type QuotationUpdateWithoutItemsInput = {
    quoteNumber?: StringFieldUpdateOperationsInput | string
    quoteDate?: DateTimeFieldUpdateOperationsInput | Date | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerAddress?: NullableStringFieldUpdateOperationsInput | string | null
    customerContact?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    systemType?: NullableStringFieldUpdateOperationsInput | string | null
    systemSizeKw?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    panelType?: NullableStringFieldUpdateOperationsInput | string | null
    panelWattage?: NullableIntFieldUpdateOperationsInput | number | null
    panelCount?: NullableIntFieldUpdateOperationsInput | number | null
    outputWattageKw?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    phase?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalGst?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountPercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    finalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    roundedPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    advancePayment?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentType?: NullableStringFieldUpdateOperationsInput | string | null
    receiverName?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    preparedBy?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumQuotationStatusFieldUpdateOperationsInput | $Enums.QuotationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutQuotationsNestedInput
    fixedCosts?: QuotationFixedCostUpdateManyWithoutQuotationNestedInput
  }

  export type QuotationUncheckedUpdateWithoutItemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    quoteNumber?: StringFieldUpdateOperationsInput | string
    quoteDate?: DateTimeFieldUpdateOperationsInput | Date | string
    companyId?: IntFieldUpdateOperationsInput | number
    customerName?: StringFieldUpdateOperationsInput | string
    customerAddress?: NullableStringFieldUpdateOperationsInput | string | null
    customerContact?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    systemType?: NullableStringFieldUpdateOperationsInput | string | null
    systemSizeKw?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    panelType?: NullableStringFieldUpdateOperationsInput | string | null
    panelWattage?: NullableIntFieldUpdateOperationsInput | number | null
    panelCount?: NullableIntFieldUpdateOperationsInput | number | null
    outputWattageKw?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    phase?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalGst?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountPercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    finalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    roundedPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    advancePayment?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentType?: NullableStringFieldUpdateOperationsInput | string | null
    receiverName?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    preparedBy?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumQuotationStatusFieldUpdateOperationsInput | $Enums.QuotationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fixedCosts?: QuotationFixedCostUncheckedUpdateManyWithoutQuotationNestedInput
  }

  export type QuotationCreateWithoutFixedCostsInput = {
    quoteNumber: string
    quoteDate?: Date | string
    customerName: string
    customerAddress?: string | null
    customerContact?: string | null
    customerEmail?: string | null
    systemType?: string | null
    systemSizeKw?: Decimal | DecimalJsLike | number | string | null
    panelType?: string | null
    panelWattage?: number | null
    panelCount?: number | null
    outputWattageKw?: Decimal | DecimalJsLike | number | string | null
    phase?: string | null
    subtotal?: Decimal | DecimalJsLike | number | string
    totalGst?: Decimal | DecimalJsLike | number | string
    discountPercent?: Decimal | DecimalJsLike | number | string
    discountAmount?: Decimal | DecimalJsLike | number | string
    finalPrice?: Decimal | DecimalJsLike | number | string
    roundedPrice?: Decimal | DecimalJsLike | number | string
    advancePayment?: Decimal | DecimalJsLike | number | string
    balanceDue?: Decimal | DecimalJsLike | number | string
    paymentType?: string | null
    receiverName?: string | null
    remarks?: string | null
    preparedBy?: string | null
    status?: $Enums.QuotationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutQuotationsInput
    items?: QuotationItemCreateNestedManyWithoutQuotationInput
  }

  export type QuotationUncheckedCreateWithoutFixedCostsInput = {
    id?: number
    quoteNumber: string
    quoteDate?: Date | string
    companyId: number
    customerName: string
    customerAddress?: string | null
    customerContact?: string | null
    customerEmail?: string | null
    systemType?: string | null
    systemSizeKw?: Decimal | DecimalJsLike | number | string | null
    panelType?: string | null
    panelWattage?: number | null
    panelCount?: number | null
    outputWattageKw?: Decimal | DecimalJsLike | number | string | null
    phase?: string | null
    subtotal?: Decimal | DecimalJsLike | number | string
    totalGst?: Decimal | DecimalJsLike | number | string
    discountPercent?: Decimal | DecimalJsLike | number | string
    discountAmount?: Decimal | DecimalJsLike | number | string
    finalPrice?: Decimal | DecimalJsLike | number | string
    roundedPrice?: Decimal | DecimalJsLike | number | string
    advancePayment?: Decimal | DecimalJsLike | number | string
    balanceDue?: Decimal | DecimalJsLike | number | string
    paymentType?: string | null
    receiverName?: string | null
    remarks?: string | null
    preparedBy?: string | null
    status?: $Enums.QuotationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: QuotationItemUncheckedCreateNestedManyWithoutQuotationInput
  }

  export type QuotationCreateOrConnectWithoutFixedCostsInput = {
    where: QuotationWhereUniqueInput
    create: XOR<QuotationCreateWithoutFixedCostsInput, QuotationUncheckedCreateWithoutFixedCostsInput>
  }

  export type QuotationUpsertWithoutFixedCostsInput = {
    update: XOR<QuotationUpdateWithoutFixedCostsInput, QuotationUncheckedUpdateWithoutFixedCostsInput>
    create: XOR<QuotationCreateWithoutFixedCostsInput, QuotationUncheckedCreateWithoutFixedCostsInput>
    where?: QuotationWhereInput
  }

  export type QuotationUpdateToOneWithWhereWithoutFixedCostsInput = {
    where?: QuotationWhereInput
    data: XOR<QuotationUpdateWithoutFixedCostsInput, QuotationUncheckedUpdateWithoutFixedCostsInput>
  }

  export type QuotationUpdateWithoutFixedCostsInput = {
    quoteNumber?: StringFieldUpdateOperationsInput | string
    quoteDate?: DateTimeFieldUpdateOperationsInput | Date | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerAddress?: NullableStringFieldUpdateOperationsInput | string | null
    customerContact?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    systemType?: NullableStringFieldUpdateOperationsInput | string | null
    systemSizeKw?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    panelType?: NullableStringFieldUpdateOperationsInput | string | null
    panelWattage?: NullableIntFieldUpdateOperationsInput | number | null
    panelCount?: NullableIntFieldUpdateOperationsInput | number | null
    outputWattageKw?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    phase?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalGst?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountPercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    finalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    roundedPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    advancePayment?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentType?: NullableStringFieldUpdateOperationsInput | string | null
    receiverName?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    preparedBy?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumQuotationStatusFieldUpdateOperationsInput | $Enums.QuotationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutQuotationsNestedInput
    items?: QuotationItemUpdateManyWithoutQuotationNestedInput
  }

  export type QuotationUncheckedUpdateWithoutFixedCostsInput = {
    id?: IntFieldUpdateOperationsInput | number
    quoteNumber?: StringFieldUpdateOperationsInput | string
    quoteDate?: DateTimeFieldUpdateOperationsInput | Date | string
    companyId?: IntFieldUpdateOperationsInput | number
    customerName?: StringFieldUpdateOperationsInput | string
    customerAddress?: NullableStringFieldUpdateOperationsInput | string | null
    customerContact?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    systemType?: NullableStringFieldUpdateOperationsInput | string | null
    systemSizeKw?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    panelType?: NullableStringFieldUpdateOperationsInput | string | null
    panelWattage?: NullableIntFieldUpdateOperationsInput | number | null
    panelCount?: NullableIntFieldUpdateOperationsInput | number | null
    outputWattageKw?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    phase?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalGst?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountPercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    finalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    roundedPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    advancePayment?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentType?: NullableStringFieldUpdateOperationsInput | string | null
    receiverName?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    preparedBy?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumQuotationStatusFieldUpdateOperationsInput | $Enums.QuotationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: QuotationItemUncheckedUpdateManyWithoutQuotationNestedInput
  }

  export type CompanyCreateWithoutEmployeesInput = {
    name: string
    ownerName?: string | null
    address?: string | null
    gstNumber?: string | null
    contact?: string | null
    email?: string | null
    logoUrl?: string | null
    bankName?: string | null
    branchName?: string | null
    accountName?: string | null
    accountNumber?: string | null
    ifscCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    quotations?: QuotationCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutEmployeesInput = {
    id?: number
    name: string
    ownerName?: string | null
    address?: string | null
    gstNumber?: string | null
    contact?: string | null
    email?: string | null
    logoUrl?: string | null
    bankName?: string | null
    branchName?: string | null
    accountName?: string | null
    accountNumber?: string | null
    ifscCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    quotations?: QuotationUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutEmployeesInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutEmployeesInput, CompanyUncheckedCreateWithoutEmployeesInput>
  }

  export type SessionCreateWithoutEmployeeInput = {
    id?: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type SessionUncheckedCreateWithoutEmployeeInput = {
    id?: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type SessionCreateOrConnectWithoutEmployeeInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutEmployeeInput, SessionUncheckedCreateWithoutEmployeeInput>
  }

  export type SessionCreateManyEmployeeInputEnvelope = {
    data: SessionCreateManyEmployeeInput | SessionCreateManyEmployeeInput[]
    skipDuplicates?: boolean
  }

  export type CompanyUpsertWithoutEmployeesInput = {
    update: XOR<CompanyUpdateWithoutEmployeesInput, CompanyUncheckedUpdateWithoutEmployeesInput>
    create: XOR<CompanyCreateWithoutEmployeesInput, CompanyUncheckedCreateWithoutEmployeesInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutEmployeesInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutEmployeesInput, CompanyUncheckedUpdateWithoutEmployeesInput>
  }

  export type CompanyUpdateWithoutEmployeesInput = {
    name?: StringFieldUpdateOperationsInput | string
    ownerName?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    gstNumber?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    branchName?: NullableStringFieldUpdateOperationsInput | string | null
    accountName?: NullableStringFieldUpdateOperationsInput | string | null
    accountNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ifscCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quotations?: QuotationUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutEmployeesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    ownerName?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    gstNumber?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    branchName?: NullableStringFieldUpdateOperationsInput | string | null
    accountName?: NullableStringFieldUpdateOperationsInput | string | null
    accountNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ifscCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quotations?: QuotationUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type SessionUpsertWithWhereUniqueWithoutEmployeeInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutEmployeeInput, SessionUncheckedUpdateWithoutEmployeeInput>
    create: XOR<SessionCreateWithoutEmployeeInput, SessionUncheckedCreateWithoutEmployeeInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutEmployeeInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutEmployeeInput, SessionUncheckedUpdateWithoutEmployeeInput>
  }

  export type SessionUpdateManyWithWhereWithoutEmployeeInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutEmployeeInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    employeeId?: IntFilter<"Session"> | number
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
  }

  export type EmployeeCreateWithoutSessionsInput = {
    name: string
    email: string
    passwordHash: string
    role?: $Enums.EmployeeRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutEmployeesInput
  }

  export type EmployeeUncheckedCreateWithoutSessionsInput = {
    id?: number
    companyId: number
    name: string
    email: string
    passwordHash: string
    role?: $Enums.EmployeeRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeCreateOrConnectWithoutSessionsInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutSessionsInput, EmployeeUncheckedCreateWithoutSessionsInput>
  }

  export type EmployeeUpsertWithoutSessionsInput = {
    update: XOR<EmployeeUpdateWithoutSessionsInput, EmployeeUncheckedUpdateWithoutSessionsInput>
    create: XOR<EmployeeCreateWithoutSessionsInput, EmployeeUncheckedCreateWithoutSessionsInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutSessionsInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutSessionsInput, EmployeeUncheckedUpdateWithoutSessionsInput>
  }

  export type EmployeeUpdateWithoutSessionsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumEmployeeRoleFieldUpdateOperationsInput | $Enums.EmployeeRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutEmployeesNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutSessionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumEmployeeRoleFieldUpdateOperationsInput | $Enums.EmployeeRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryAttributeCreateManyCategoryInput = {
    id?: number
    name: string
    type?: $Enums.AttributeType
    required?: boolean
    sortOrder?: number
  }

  export type ProductCreateManyCategoryInput = {
    id?: number
    sku: string
    name: string
    manufacturer?: string | null
    basePrice?: Decimal | DecimalJsLike | number | string
    gstRate?: Decimal | DecimalJsLike | number | string
    barcodeHandling?: $Enums.BarcodeHandling
    barcode?: string | null
    barcodeType?: $Enums.BarcodeType
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryAttributeUpdateWithoutCategoryInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAttributeTypeFieldUpdateOperationsInput | $Enums.AttributeType
    required?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type CategoryAttributeUncheckedUpdateWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAttributeTypeFieldUpdateOperationsInput | $Enums.AttributeType
    required?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type CategoryAttributeUncheckedUpdateManyWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAttributeTypeFieldUpdateOperationsInput | $Enums.AttributeType
    required?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type ProductUpdateWithoutCategoryInput = {
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    manufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    basePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gstRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    barcodeHandling?: EnumBarcodeHandlingFieldUpdateOperationsInput | $Enums.BarcodeHandling
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    barcodeType?: EnumBarcodeTypeFieldUpdateOperationsInput | $Enums.BarcodeType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attributeValues?: ProductAttributeValueUpdateManyWithoutProductNestedInput
    inventoryItems?: InventoryItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    manufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    basePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gstRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    barcodeHandling?: EnumBarcodeHandlingFieldUpdateOperationsInput | $Enums.BarcodeHandling
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    barcodeType?: EnumBarcodeTypeFieldUpdateOperationsInput | $Enums.BarcodeType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attributeValues?: ProductAttributeValueUncheckedUpdateManyWithoutProductNestedInput
    inventoryItems?: InventoryItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateManyWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    manufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    basePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gstRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    barcodeHandling?: EnumBarcodeHandlingFieldUpdateOperationsInput | $Enums.BarcodeHandling
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    barcodeType?: EnumBarcodeTypeFieldUpdateOperationsInput | $Enums.BarcodeType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductAttributeValueCreateManyProductInput = {
    id?: number
    attributeId: number
    value: string
  }

  export type InventoryItemCreateManyProductInput = {
    id?: number
    warehouseId: number
    quantity?: number
    salePrice?: Decimal | DecimalJsLike | number | string
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductAttributeValueUpdateWithoutProductInput = {
    attributeId?: IntFieldUpdateOperationsInput | number
    value?: StringFieldUpdateOperationsInput | string
  }

  export type ProductAttributeValueUncheckedUpdateWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    attributeId?: IntFieldUpdateOperationsInput | number
    value?: StringFieldUpdateOperationsInput | string
  }

  export type ProductAttributeValueUncheckedUpdateManyWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    attributeId?: IntFieldUpdateOperationsInput | number
    value?: StringFieldUpdateOperationsInput | string
  }

  export type InventoryItemUpdateWithoutProductInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    salePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    warehouse?: WarehouseUpdateOneRequiredWithoutInventoryItemsNestedInput
    uniqueBarcodes?: UniqueBarcodeUpdateManyWithoutInventoryItemNestedInput
  }

  export type InventoryItemUncheckedUpdateWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    warehouseId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    salePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uniqueBarcodes?: UniqueBarcodeUncheckedUpdateManyWithoutInventoryItemNestedInput
  }

  export type InventoryItemUncheckedUpdateManyWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    warehouseId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    salePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InventoryItemCreateManyWarehouseInput = {
    id?: number
    productId: number
    quantity?: number
    salePrice?: Decimal | DecimalJsLike | number | string
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InventoryItemUpdateWithoutWarehouseInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    salePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutInventoryItemsNestedInput
    uniqueBarcodes?: UniqueBarcodeUpdateManyWithoutInventoryItemNestedInput
  }

  export type InventoryItemUncheckedUpdateWithoutWarehouseInput = {
    id?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    salePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uniqueBarcodes?: UniqueBarcodeUncheckedUpdateManyWithoutInventoryItemNestedInput
  }

  export type InventoryItemUncheckedUpdateManyWithoutWarehouseInput = {
    id?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    salePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UniqueBarcodeCreateManyInventoryItemInput = {
    id?: number
    barcode: string
    createdAt?: Date | string
  }

  export type UniqueBarcodeUpdateWithoutInventoryItemInput = {
    barcode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UniqueBarcodeUncheckedUpdateWithoutInventoryItemInput = {
    id?: IntFieldUpdateOperationsInput | number
    barcode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UniqueBarcodeUncheckedUpdateManyWithoutInventoryItemInput = {
    id?: IntFieldUpdateOperationsInput | number
    barcode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuotationCreateManyCompanyInput = {
    id?: number
    quoteNumber: string
    quoteDate?: Date | string
    customerName: string
    customerAddress?: string | null
    customerContact?: string | null
    customerEmail?: string | null
    systemType?: string | null
    systemSizeKw?: Decimal | DecimalJsLike | number | string | null
    panelType?: string | null
    panelWattage?: number | null
    panelCount?: number | null
    outputWattageKw?: Decimal | DecimalJsLike | number | string | null
    phase?: string | null
    subtotal?: Decimal | DecimalJsLike | number | string
    totalGst?: Decimal | DecimalJsLike | number | string
    discountPercent?: Decimal | DecimalJsLike | number | string
    discountAmount?: Decimal | DecimalJsLike | number | string
    finalPrice?: Decimal | DecimalJsLike | number | string
    roundedPrice?: Decimal | DecimalJsLike | number | string
    advancePayment?: Decimal | DecimalJsLike | number | string
    balanceDue?: Decimal | DecimalJsLike | number | string
    paymentType?: string | null
    receiverName?: string | null
    remarks?: string | null
    preparedBy?: string | null
    status?: $Enums.QuotationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeCreateManyCompanyInput = {
    id?: number
    name: string
    email: string
    passwordHash: string
    role?: $Enums.EmployeeRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QuotationUpdateWithoutCompanyInput = {
    quoteNumber?: StringFieldUpdateOperationsInput | string
    quoteDate?: DateTimeFieldUpdateOperationsInput | Date | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerAddress?: NullableStringFieldUpdateOperationsInput | string | null
    customerContact?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    systemType?: NullableStringFieldUpdateOperationsInput | string | null
    systemSizeKw?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    panelType?: NullableStringFieldUpdateOperationsInput | string | null
    panelWattage?: NullableIntFieldUpdateOperationsInput | number | null
    panelCount?: NullableIntFieldUpdateOperationsInput | number | null
    outputWattageKw?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    phase?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalGst?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountPercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    finalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    roundedPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    advancePayment?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentType?: NullableStringFieldUpdateOperationsInput | string | null
    receiverName?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    preparedBy?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumQuotationStatusFieldUpdateOperationsInput | $Enums.QuotationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: QuotationItemUpdateManyWithoutQuotationNestedInput
    fixedCosts?: QuotationFixedCostUpdateManyWithoutQuotationNestedInput
  }

  export type QuotationUncheckedUpdateWithoutCompanyInput = {
    id?: IntFieldUpdateOperationsInput | number
    quoteNumber?: StringFieldUpdateOperationsInput | string
    quoteDate?: DateTimeFieldUpdateOperationsInput | Date | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerAddress?: NullableStringFieldUpdateOperationsInput | string | null
    customerContact?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    systemType?: NullableStringFieldUpdateOperationsInput | string | null
    systemSizeKw?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    panelType?: NullableStringFieldUpdateOperationsInput | string | null
    panelWattage?: NullableIntFieldUpdateOperationsInput | number | null
    panelCount?: NullableIntFieldUpdateOperationsInput | number | null
    outputWattageKw?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    phase?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalGst?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountPercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    finalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    roundedPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    advancePayment?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentType?: NullableStringFieldUpdateOperationsInput | string | null
    receiverName?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    preparedBy?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumQuotationStatusFieldUpdateOperationsInput | $Enums.QuotationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: QuotationItemUncheckedUpdateManyWithoutQuotationNestedInput
    fixedCosts?: QuotationFixedCostUncheckedUpdateManyWithoutQuotationNestedInput
  }

  export type QuotationUncheckedUpdateManyWithoutCompanyInput = {
    id?: IntFieldUpdateOperationsInput | number
    quoteNumber?: StringFieldUpdateOperationsInput | string
    quoteDate?: DateTimeFieldUpdateOperationsInput | Date | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerAddress?: NullableStringFieldUpdateOperationsInput | string | null
    customerContact?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    systemType?: NullableStringFieldUpdateOperationsInput | string | null
    systemSizeKw?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    panelType?: NullableStringFieldUpdateOperationsInput | string | null
    panelWattage?: NullableIntFieldUpdateOperationsInput | number | null
    panelCount?: NullableIntFieldUpdateOperationsInput | number | null
    outputWattageKw?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    phase?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalGst?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountPercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    finalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    roundedPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    advancePayment?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentType?: NullableStringFieldUpdateOperationsInput | string | null
    receiverName?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    preparedBy?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumQuotationStatusFieldUpdateOperationsInput | $Enums.QuotationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeUpdateWithoutCompanyInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumEmployeeRoleFieldUpdateOperationsInput | $Enums.EmployeeRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutCompanyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumEmployeeRoleFieldUpdateOperationsInput | $Enums.EmployeeRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateManyWithoutCompanyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumEmployeeRoleFieldUpdateOperationsInput | $Enums.EmployeeRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuotationItemCreateManyQuotationInput = {
    id?: number
    categoryName?: string | null
    productName: string
    hsnCode?: string | null
    description?: string | null
    unitPrice: Decimal | DecimalJsLike | number | string
    quantity?: Decimal | DecimalJsLike | number | string
    gstRate?: Decimal | DecimalJsLike | number | string
    totalPrice: Decimal | DecimalJsLike | number | string
    sortOrder?: number
  }

  export type QuotationFixedCostCreateManyQuotationInput = {
    id?: number
    label: string
    cost?: Decimal | DecimalJsLike | number | string
    rateNote?: string | null
    hsnCode?: string | null
    gstRate?: Decimal | DecimalJsLike | number | string
    total?: Decimal | DecimalJsLike | number | string
    included?: boolean
    sortOrder?: number
  }

  export type QuotationItemUpdateWithoutQuotationInput = {
    categoryName?: NullableStringFieldUpdateOperationsInput | string | null
    productName?: StringFieldUpdateOperationsInput | string
    hsnCode?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gstRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type QuotationItemUncheckedUpdateWithoutQuotationInput = {
    id?: IntFieldUpdateOperationsInput | number
    categoryName?: NullableStringFieldUpdateOperationsInput | string | null
    productName?: StringFieldUpdateOperationsInput | string
    hsnCode?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gstRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type QuotationItemUncheckedUpdateManyWithoutQuotationInput = {
    id?: IntFieldUpdateOperationsInput | number
    categoryName?: NullableStringFieldUpdateOperationsInput | string | null
    productName?: StringFieldUpdateOperationsInput | string
    hsnCode?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gstRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type QuotationFixedCostUpdateWithoutQuotationInput = {
    label?: StringFieldUpdateOperationsInput | string
    cost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rateNote?: NullableStringFieldUpdateOperationsInput | string | null
    hsnCode?: NullableStringFieldUpdateOperationsInput | string | null
    gstRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    included?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type QuotationFixedCostUncheckedUpdateWithoutQuotationInput = {
    id?: IntFieldUpdateOperationsInput | number
    label?: StringFieldUpdateOperationsInput | string
    cost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rateNote?: NullableStringFieldUpdateOperationsInput | string | null
    hsnCode?: NullableStringFieldUpdateOperationsInput | string | null
    gstRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    included?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type QuotationFixedCostUncheckedUpdateManyWithoutQuotationInput = {
    id?: IntFieldUpdateOperationsInput | number
    label?: StringFieldUpdateOperationsInput | string
    cost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rateNote?: NullableStringFieldUpdateOperationsInput | string | null
    hsnCode?: NullableStringFieldUpdateOperationsInput | string | null
    gstRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    included?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type SessionCreateManyEmployeeInput = {
    id?: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type SessionUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use CategoryCountOutputTypeDefaultArgs instead
     */
    export type CategoryCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CategoryCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductCountOutputTypeDefaultArgs instead
     */
    export type ProductCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WarehouseCountOutputTypeDefaultArgs instead
     */
    export type WarehouseCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WarehouseCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InventoryItemCountOutputTypeDefaultArgs instead
     */
    export type InventoryItemCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InventoryItemCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CompanyCountOutputTypeDefaultArgs instead
     */
    export type CompanyCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CompanyCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use QuotationCountOutputTypeDefaultArgs instead
     */
    export type QuotationCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = QuotationCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EmployeeCountOutputTypeDefaultArgs instead
     */
    export type EmployeeCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EmployeeCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CategoryDefaultArgs instead
     */
    export type CategoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CategoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CategoryAttributeDefaultArgs instead
     */
    export type CategoryAttributeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CategoryAttributeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductDefaultArgs instead
     */
    export type ProductArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductAttributeValueDefaultArgs instead
     */
    export type ProductAttributeValueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductAttributeValueDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WarehouseDefaultArgs instead
     */
    export type WarehouseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WarehouseDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InventoryItemDefaultArgs instead
     */
    export type InventoryItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InventoryItemDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UniqueBarcodeDefaultArgs instead
     */
    export type UniqueBarcodeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UniqueBarcodeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CompanyDefaultArgs instead
     */
    export type CompanyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CompanyDefaultArgs<ExtArgs>
    /**
     * @deprecated Use QuotationDefaultArgs instead
     */
    export type QuotationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = QuotationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use QuotationItemDefaultArgs instead
     */
    export type QuotationItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = QuotationItemDefaultArgs<ExtArgs>
    /**
     * @deprecated Use QuotationFixedCostDefaultArgs instead
     */
    export type QuotationFixedCostArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = QuotationFixedCostDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EmployeeDefaultArgs instead
     */
    export type EmployeeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EmployeeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SessionDefaultArgs instead
     */
    export type SessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SessionDefaultArgs<ExtArgs>

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