interface LibSavedVarsMiniMap {
  enabled: boolean
  anchor: unknown
  size: number
  deletionDelay: number
}

interface LibSavedVarsMining {
  APIVersion: number
  APITimeStamp: number
  data: Record<number, unknown[]>
}

interface LibSavedVarsMisc {
  hasNewIconPath: boolean
}

interface LibSavedVarsInstance {
  GetLibAddonMenuAccountCheckbox: () => Record<string, unknown>
  EnableDefaultsTrimming: () => void
  pinTypes: Record<string, Record<string, unknown>>
  miniMap: LibSavedVarsMiniMap
  notifications: unknown[]
  mining: LibSavedVarsMining
  misc: LibSavedVarsMisc
  [key: string]: unknown
}

interface LibSavedVarsBuilder {
  AddCharacterSettingsToggle: (savedVariableTable: string) => LibSavedVarsBuilder
  RemoveSettings: (
    version: number,
    keys: string | string[],
    ...rest: string[]
  ) => LibSavedVarsBuilder
  RenameSettings: (version: number, renameMap: Record<string, string>) => LibSavedVarsBuilder
  Version: (
    version: number,
    onVersionUpdate: (this: void, savedVarsTable: Record<string, unknown>) => void
  ) => LibSavedVarsInstance & LibSavedVarsBuilder
}

interface LSVDataClass {
  EnableDefaultsTrimming?: unknown
  [key: string]: unknown
}
declare const LSV_Data: LSVDataClass

interface LibSavedVars {
  NewAccountWide: (
    savedVariableTable: string,
    defaults: Record<string, unknown>
  ) => LibSavedVarsBuilder
}

declare const LibSavedVars: LibSavedVars

declare const SI_LSV_ACCOUNT_WIDE: number
declare const SI_LSV_ACCOUNT_WIDE_TT: number
