type AnyTable = Record<PropertyKey, unknown>
type AnyNotNil = {}

declare interface LuaExtension<TBrand extends string> {
  readonly __tstlExtension: TBrand
}

declare interface LuaIterationExtension<TBrand extends string> {
  readonly __tstlIterable: TBrand
}

declare const $multi: (<T extends unknown[]>(...values: T) => LuaMultiReturn<T>) &
  LuaExtension<"MultiFunction">

declare type LuaMultiReturn<T extends unknown[]> = T & {
  readonly __tstlMultiReturn: unknown
}

declare const $range: ((start: number, limit: number, step?: number) => Iterable<number>) &
  LuaExtension<"RangeFunction">

declare const $vararg: string[] & LuaExtension<"VarargConstant">

declare type LuaIterator<TValue, TState> = TState extends undefined
  ? (this: void) => TValue
  : LuaMultiReturn<
      [
        (
          this: void,
          state: TState,
          lastValue: TValue extends LuaMultiReturn<infer TTuple> ? TTuple[0] : TValue
        ) => TValue,
        TState,
        TValue extends LuaMultiReturn<infer TTuple> ? TTuple[0] : TValue,
      ]
    >

declare type LuaIterable<TValue, TState = undefined> = Iterable<TValue> &
  LuaIterator<TValue, TState> &
  LuaIterationExtension<"Iterable">

declare type LuaPairsIterable<TKey extends AnyNotNil, TValue> = Iterable<[TKey, TValue]> &
  LuaIterationExtension<"Pairs">

declare type LuaPairsKeyIterable<TKey extends AnyNotNil> = Iterable<TKey> &
  LuaIterationExtension<"PairsKey">

declare type LuaTableGetMethod<TKey extends AnyNotNil, TValue> = ((key: TKey) => TValue) &
  LuaExtension<"TableGetMethod">

declare type LuaTableSetMethod<TKey extends AnyNotNil, TValue> = ((
  key: TKey,
  value: TValue
) => void) &
  LuaExtension<"TableSetMethod">

declare type LuaTableAddKeyMethod<TKey extends AnyNotNil> = ((key: TKey) => void) &
  LuaExtension<"TableAddKeyMethod">

declare type LuaTableHasMethod<TKey extends AnyNotNil> = ((key: TKey) => boolean) &
  LuaExtension<"TableHasMethod">

declare type LuaTableDeleteMethod<TKey extends AnyNotNil> = ((key: TKey) => boolean) &
  LuaExtension<"TableDeleteMethod">

declare type LuaTableIsEmptyMethod = (() => boolean) & LuaExtension<"TableIsEmptyMethod">

declare type LuaLengthMethod<TReturn> = (() => TReturn) & LuaExtension<"LengthMethod">

declare interface LuaTable<TKey extends AnyNotNil = AnyNotNil, TValue = unknown>
  extends LuaPairsIterable<TKey, TValue> {
  length: LuaLengthMethod<number>
  get: LuaTableGetMethod<TKey, TValue>
  set: LuaTableSetMethod<TKey, TValue>
  has: LuaTableHasMethod<TKey>
  delete: LuaTableDeleteMethod<TKey>
  isEmpty: LuaTableIsEmptyMethod
}

declare type LuaTableConstructor = (new <
  TKey extends AnyNotNil = AnyNotNil,
  TValue = unknown,
>() => LuaTable<TKey, TValue>) &
  LuaExtension<"TableNew">

declare const LuaTable: LuaTableConstructor

declare interface LuaMap<K extends AnyNotNil = AnyNotNil, V = unknown>
  extends LuaPairsIterable<K, V> {
  get: LuaTableGetMethod<K, V | undefined>
  set: LuaTableSetMethod<K, V>
  has: LuaTableHasMethod<K>
  delete: LuaTableDeleteMethod<K>
  isEmpty: LuaTableIsEmptyMethod
}

declare const LuaMap: (new <K extends AnyNotNil = AnyNotNil, V = unknown>() => LuaMap<K, V>) &
  LuaExtension<"TableNew">

declare interface LuaSet<T extends AnyNotNil = AnyNotNil> extends LuaPairsKeyIterable<T> {
  add: LuaTableAddKeyMethod<T>
  has: LuaTableHasMethod<T>
  delete: LuaTableDeleteMethod<T>
  isEmpty: LuaTableIsEmptyMethod
}

declare const LuaSet: (new <T extends AnyNotNil = AnyNotNil>() => LuaSet<T>) &
  LuaExtension<"TableNew">

interface ObjectConstructor {
  keys: <K extends AnyNotNil>(o: LuaPairsIterable<K, unknown> | LuaPairsKeyIterable<K>) => K[]

  values: <V>(o: LuaPairsIterable<AnyNotNil, V>) => V[]

  entries: <K extends AnyNotNil, V>(o: LuaPairsIterable<K, V>) => Array<[K, V]>
}
