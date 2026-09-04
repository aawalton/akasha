export interface Lib {
  version: number

  TableContains: (
    this: Lib,
    origTable: unknown,
    searchValue: unknown,
    keySearch?: boolean
  ) => boolean

  CopyTable: (this: Lib, origTable: unknown) => unknown

  PrintTable: (this: Lib, origTable: unknown) => string

  SortTable: (this: Lib, origTable: unknown, column?: number) => unknown

  DeepPrint: (this: Lib, origTable: unknown) => undefined

  SimpleResetTable: (this: Lib, origTable: unknown, value: unknown) => unknown

  ResetTable: (
    this: Lib,
    origTable: unknown,
    intVal: unknown,
    strVal: unknown,
    boolVal: unknown,
    otherVal: unknown
  ) => unknown
}
