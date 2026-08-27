declare global {
  const ZO_SAVED_VARS_CHARACTER_NAME_KEY: number

  const ZO_SAVED_VARS_CHARACTER_ID_KEY: number

  function ZO_IsElementInNumericallyIndexedTable(
    this: void,
    array: readonly unknown[],
    element: unknown
  ): boolean

  const LibLua52:
    | {
        rawnext: (this: void, table: object, key?: unknown) => LuaMultiReturn<[unknown, unknown]>
        rawipairs: (this: void, table: object) => LuaIterable<LuaMultiReturn<[number, unknown]>>
      }
    | undefined

  const SI_LSV_ACCOUNT_WIDE: number

  const SI_LSV_ACCOUNT_WIDE_TT: number

  function GetString(stringId: number): string
}

export {}
