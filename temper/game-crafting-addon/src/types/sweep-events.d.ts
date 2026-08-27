interface ZO_SavedVars {
  NewCharacterIdSettings<T extends Record<string, unknown>>(
    savedVariableTable: string,
    version: number,
    namespace: string | undefined,
    defaults: T,
    worldName?: string
  ): T
}

declare var _: string | undefined
