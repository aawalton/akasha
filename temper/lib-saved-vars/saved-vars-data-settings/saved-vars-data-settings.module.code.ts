import {
  asIndexable,
  asLsvTable,
  asManagerInstance,
  asRenameCallback,
  asSettingsList,
  asVersionUpdateFn,
  type RenameCallbackFn,
  type VersionUpdateFn,
} from "../saved-vars-casts/saved-vars-casts.module.code.ts"
import {
  LIBNAME,
  LIBSAVEDVARS_ACCOUNT_KEY,
} from "../saved-vars-constants/saved-vars-constants.module.code.ts"
import {
  getAccountSavedVarsActive,
  getSavedVarsManagers,
  loadAllSavedVars,
} from "../saved-vars-data-active/saved-vars-data-active.module.code.ts"
import {
  tableDiffKeys,
  validateScope,
} from "../saved-vars-data-helpers/saved-vars-data-helpers.module.code.ts"
import {
  DATA_STATE,
  DO_NOT_OVERWRITE,
  rawipairs,
} from "../saved-vars-data-state/saved-vars-data-state.module.code.ts"
import { LSV } from "../saved-vars-registry/saved-vars-registry.module.code.ts"
import type { DataInstance, LsvTable } from "../saved-vars-types/saved-vars-types.module.code.ts"

export function setAccountSavedVarsActive(
  this: void,
  self: DataInstance | undefined,
  accountActive: boolean,
  initializeCharacterWithAccount?: boolean
): DataInstance | undefined {
  if (self === undefined) {
    return undefined
  }
  LSV.protected.Debug(
    "LSV_Data:SetAccountSavedVarsActive(<<1>>, <<2>>)",
    DATA_STATE.debugMode,
    accountActive,
    initializeCharacterWithAccount
  )

  const ds = self.__dataSource
  if (
    ds.character === undefined ||
    ds.account === undefined ||
    asIndexable(ds.character.savedVars)[LIBNAME] === undefined
  ) {
    return self
  }

  asIndexable(asIndexable(ds.character.savedVars)[LIBNAME]).accountSavedVarsActive = accountActive

  const initWithAccount = initializeCharacterWithAccount === true || ds.defaultToAccount

  if (accountActive) {
    ds.active = ds.account
    return self
  }

  ds.active = ds.character

  const [characterRawDataTable] = ds.character.LoadRawTableData()

  if (initWithAccount && ds.account.savedVars !== undefined) {
    const [accountRaw] = ds.account.LoadRawTableData()
    let accountVars: LsvTable | undefined = accountRaw
    if (ds.pinnedAccountKeys !== undefined) {
      accountVars = tableDiffKeys(asLsvTable(accountVars), ds.pinnedAccountKeys)
    }

    LSV.protected.Debug(
      "Copying the following settings from account-wide scope to character settings:",
      DATA_STATE.debugMode
    )
    for (const [key, value] of pairs(asLsvTable(accountVars))) {
      LSV.protected.Debug("<<1>>: <<2>>", DATA_STATE.debugMode, key, tostring(value))
    }

    LSV.lib.DeepSavedVarsCopy(accountVars, characterRawDataTable, DO_NOT_OVERWRITE)
  } else {
    LSV.lib.DeepSavedVarsCopy(ds.character.defaults, characterRawDataTable, DO_NOT_OVERWRITE)
  }

  return self
}

export function getLibAddonMenuAccountCheckbox(
  this: void,
  self: DataInstance | undefined,
  initializeCharacterWithAccount?: boolean
): LsvTable | undefined {
  if (self === undefined) {
    return undefined
  }
  LSV.protected.Debug(
    "LSV_Data:GetLibAddonMenuAccountCheckbox(<<1>>)",
    DATA_STATE.debugMode,
    initializeCharacterWithAccount
  )

  let initWithAccount = initializeCharacterWithAccount
  if (initWithAccount === undefined) {
    initWithAccount = true
  }

  return {
    type: "checkbox",
    name: GetString(SI_LSV_ACCOUNT_WIDE),
    tooltip: GetString(SI_LSV_ACCOUNT_WIDE_TT),
    getFunc: (): boolean | undefined => {
      loadAllSavedVars(self)
      return getAccountSavedVarsActive(self)
    },
    setFunc: (value: boolean): undefined => {
      loadAllSavedVars(self)
      setAccountSavedVarsActive(self, value, initWithAccount)
    },
    default: (): boolean => {
      const active = self.__dataSource.active
      if (active !== undefined && rawget(active, "savedVars") !== undefined) {
        return rawget(active, "keyType") === LIBSAVEDVARS_ACCOUNT_KEY
      }
      return self.__dataSource.defaultToAccount
    },
  }
}

export function version(
  this: void,
  self: DataInstance,
  versionNum: number,
  scope?: unknown,
  onVersionUpdate?: VersionUpdateFn
): DataInstance {
  let scopeArg: unknown = scope
  let onUpdate = onVersionUpdate
  if (type(scopeArg) === "function") {
    onUpdate = asVersionUpdateFn(scopeArg)
    scopeArg = undefined
  }
  LSV.protected.Debug(
    "LSV_Data:Version(<<1>>, <<2>>, <<3>>)",
    DATA_STATE.debugMode,
    versionNum,
    scopeArg,
    onUpdate
  )
  validateScope(scopeArg)
  const svManagers = getSavedVarsManagers(self, scopeArg)
  for (const [, svManager] of rawipairs(svManagers)) {
    asManagerInstance(svManager).Version(versionNum, asVersionUpdateFn(onUpdate))
  }
  return self
}

export function removeSettings(
  this: void,
  self: DataInstance,
  versionNum: number,
  scope?: unknown,
  settingsToRemove?: unknown,
  ...rest: string[]
): DataInstance {
  if (type(versionNum) !== "number") {
    error(
      `Invalid type for argument 'version'. Expected 'number'. Got '${type(versionNum)}' instead.`
    )
  }
  const params: unknown[] = [...rest]
  let scopeArg: unknown = scope
  let settings: unknown = settingsToRemove
  if (scopeArg !== undefined && type(scopeArg) !== "number") {
    params.unshift(settings)
    settings = scopeArg
    scopeArg = undefined
  }
  if (type(settings) === "string") {
    params.unshift(settings)
    settings = params
  }

  LSV.protected.Debug(
    "LSV_Data:RemoveSettings(<<1>>, <<2>>, <<3>> (<<4>>))",
    DATA_STATE.debugMode,
    versionNum,
    scopeArg,
    tostring(settings),
    settings !== undefined ? asSettingsList(settings).length : undefined
  )
  validateScope(scopeArg)
  const svManagers = getSavedVarsManagers(self, scopeArg)
  for (const [, svManager] of rawipairs(svManagers)) {
    asManagerInstance(svManager).RemoveSettings(versionNum, asSettingsList(settings))
  }

  return self
}

export function renameSettings(
  this: void,
  self: DataInstance,
  versionNum: number,
  scope?: unknown,
  renameMap?: LsvTable,
  callback?: RenameCallbackFn
): DataInstance {
  let scopeArg: unknown = scope
  let map = renameMap
  let cb = callback
  if (scopeArg !== undefined && type(scopeArg) !== "number") {
    cb = asRenameCallback(map)
    map = asLsvTable(scopeArg)
    scopeArg = undefined
  }
  LSV.protected.Debug(
    "LSV_Data:RenameSettings(<<1>>, <<2>>, <<3>>, <<4>>)",
    DATA_STATE.debugMode,
    versionNum,
    scopeArg,
    tostring(map),
    tostring(cb)
  )
  validateScope(scopeArg)
  const svManagers = getSavedVarsManagers(self, scopeArg)
  for (const [, svManager] of rawipairs(svManagers)) {
    asManagerInstance(svManager).RenameSettings(versionNum, map, cb)
  }

  return self
}

export function renameSettingsAndInvert(
  this: void,
  self: DataInstance,
  versionNum: number,
  scope?: unknown,
  renameMap?: LsvTable
): DataInstance {
  LSV.protected.Debug(
    "LSV_Data:RenameSettingsAndInvert(<<1>>, <<2>>, <<3>>)",
    DATA_STATE.debugMode,
    versionNum,
    scope,
    tostring(renameMap)
  )
  return renameSettings(self, versionNum, scope, renameMap, LSV.protected.Invert)
}
