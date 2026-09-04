import {
  asCallbackManagerExt,
  asConcatList,
  asIndexable,
  asLsvTable,
  asManagerClass,
  asNumber,
  asString,
  asTable,
  asUnknownArray,
} from "../saved-vars-casts/saved-vars-casts.module.code.ts"
import { LIBNAME } from "../saved-vars-constants/saved-vars-constants.module.code.ts"
import {
  enableDefaultsTrimming,
  fireMigrateStartCallbacks,
  isProfileWorldName,
  loadRawTableData,
  managerIndex,
  newManager,
  onLogout,
  onLogoutCanceled,
  setDebugMode,
  validate,
} from "../saved-vars-manager-core/saved-vars-manager-core.module.code.ts"
import { MANAGER_STATE } from "../saved-vars-manager-state/saved-vars-manager-state.module.code.ts"
import { LSV } from "../saved-vars-registry/saved-vars-registry.module.code.ts"
import type {
  LsvTable,
  SavedVarsManagerInstance,
} from "../saved-vars-types/saved-vars-types.module.code.ts"

const CLASSNAME = "SavedVarsManager"
const CLASSVERSION = 1.3

const LIBSAVEDVARS_MIGRATE_START_CALLBACK_NAME = `${LIBNAME}MigrateStart`
const LIBSAVEDVARS_LAZY_LOAD_CALLBACK_NAME = `${LIBNAME}LazyLoad`

const DEBUG_MODE = false

const cm = asCallbackManagerExt(CALLBACK_MANAGER)

function pathConcat(this: void, self: SavedVarsManagerInstance): string {
  return table.concat(asConcatList([self.rawSavedVarsTablePath]), " > ")
}

function registerLazyLoadCallback(
  this: void,
  self: SavedVarsManagerInstance,
  callback: (this: void, ...args: never[]) => void,
  param1?: unknown,
  ...rest: unknown[]
): string {
  const scope = `${LIBSAVEDVARS_LAZY_LOAD_CALLBACK_NAME}${self.id}`
  LSV.protected.Debug(`LSV_SavedVarsManager:RegisterLazyLoadCallback() scope=${scope}`, DEBUG_MODE)
  if (rest.length > 0) {
    MANAGER_STATE.extraLazyLoadParams[self.id] = [...rest]
  }
  cm.RegisterCallback(scope, callback, param1)
  return scope
}

function registerMigrateStartCallback(
  this: void,
  self: SavedVarsManagerInstance,
  callback: (this: void, ...args: never[]) => void,
  param1?: unknown,
  ...rest: unknown[]
): undefined {
  const scope = `${LIBSAVEDVARS_MIGRATE_START_CALLBACK_NAME}${self.id}`
  LSV.protected.Debug(
    `LSV_SavedVarsManager:RegisterMigrateStartCallback() scope=${scope}`,
    DEBUG_MODE
  )
  if (rest.length > 0) {
    MANAGER_STATE.extraMigrateParams[self.id] = [...rest]
  }
  cm.RegisterCallback(scope, callback, param1)
}

function removeSettings(
  this: void,
  self: SavedVarsManagerInstance,
  versionNum: number,
  settingsToRemove: string | string[],
  ...rest: string[]
): SavedVarsManagerInstance {
  if (type(versionNum) !== "number") {
    error(
      `Invalid type for argument 'version'. Expected 'number'. Got '${type(versionNum)}' instead.`
    )
  }
  let settings: unknown[]
  if (type(settingsToRemove) === "string") {
    settings = [asString(settingsToRemove), ...rest]
  } else {
    settings = asUnknownArray(settingsToRemove)
  }
  LSV.protected.Debug(
    "LSV_Data:RemoveSettings(<<1>>, <<2>> (<<3>>))",
    DEBUG_MODE,
    versionNum,
    tostring(settings),
    settings.length
  )

  if (self.version === undefined || self.version < versionNum) {
    self.version = versionNum
  }

  const [rawDataTable] = loadRawTableData(self)
  if (rawDataTable === undefined) {
    LSV.protected.Debug(`Saved vars don't exist. Skipping ${pathConcat(self)}`, DEBUG_MODE)
    return self
  }
  const rdtVersion = rawDataTable["version"]
  if (rdtVersion !== undefined && rdtVersion !== false && asNumber(rdtVersion) >= versionNum) {
    LSV.protected.Debug(`Version check passed. Skipping ${pathConcat(self)}`, DEBUG_MODE)
    return self
  }

  LSV.protected.Debug(
    `Raw data table at ${pathConcat(self)} has ${NonContiguousCount(rawDataTable)} items.`,
    DEBUG_MODE
  )
  for (const settingToRemove of settings) {
    LSV.protected.Debug(`Setting rawDataTable['${tostring(settingToRemove)}'] = nil`, DEBUG_MODE)
    rawDataTable[asString(settingToRemove)] = undefined
  }
  LSV.protected.Debug(
    `Raw data table at ${pathConcat(self)} has ${NonContiguousCount(rawDataTable)} items.`,
    DEBUG_MODE
  )
  LSV.protected.Debug(`${tostring(settings.length)} settings removed.`, DEBUG_MODE)

  if (self.pendingVersion === undefined || self.pendingVersion < versionNum) {
    self.pendingVersion = versionNum
    MANAGER_STATE.versionUpdateQueue[self.id] = self
  }

  return self
}

function renameSettings(
  this: void,
  self: SavedVarsManagerInstance,
  version: number | LsvTable,
  renameMap?: LsvTable,
  callback?: (this: void, value: unknown) => unknown
): SavedVarsManagerInstance {
  let versionNum: number | undefined
  let map = renameMap
  if (type(version) === "table") {
    map = asLsvTable(version)
    versionNum = undefined
  } else {
    versionNum = asNumber(version)
  }
  LSV.protected.Debug(
    "LSV_SavedVarsManager:RenameSettings(<<1>>, <<2>>, <<3>>)",
    DEBUG_MODE,
    versionNum,
    map,
    callback
  )

  if (self.version === undefined || self.version < asNumber(versionNum)) {
    self.version = versionNum
  }

  const [rawDataTable] = loadRawTableData(self)
  if (rawDataTable === undefined) {
    LSV.protected.Debug(`Saved vars don't exist. Skipping ${pathConcat(self)}`, DEBUG_MODE)
    return self
  }
  const rdtVersion = rawDataTable["version"]
  if (
    versionNum !== undefined &&
    rdtVersion !== undefined &&
    rdtVersion !== false &&
    asNumber(rdtVersion) >= versionNum
  ) {
    LSV.protected.Debug(`Version check passed. Skipping ${pathConcat(self)}`, DEBUG_MODE)
    return self
  }

  let count = 0
  for (const [oldSetting, newSetting] of pairs(asTable(map))) {
    if (rawDataTable[asString(oldSetting)] !== undefined) {
      let value = rawDataTable[asString(oldSetting)]
      if (callback !== undefined) {
        value = callback(value)
      }
      rawDataTable[asString(newSetting)] = value
      rawDataTable[asString(oldSetting)] = undefined
      count = count + 1
    }
  }
  LSV.protected.Debug(`${tostring(count)} settings renamed.`, DEBUG_MODE)

  if (self.pendingVersion === undefined || self.pendingVersion < asNumber(versionNum)) {
    self.pendingVersion = versionNum
    MANAGER_STATE.versionUpdateQueue[self.id] = self
  }

  return self
}

function renameSettingsAndInvert(
  this: void,
  self: SavedVarsManagerInstance,
  version: number,
  renameMap: LsvTable
): SavedVarsManagerInstance {
  LSV.protected.Debug(
    "LSV_SavedVarsManager:RenameSettingsAndInvert(<<1>>, <<2>>)",
    DEBUG_MODE,
    version,
    renameMap
  )
  return renameSettings(self, version, renameMap, LSV.protected.Invert)
}

function unregisterLazyLoadCallback(
  this: void,
  self: SavedVarsManagerInstance,
  callback: (this: void, ...args: never[]) => void
): undefined {
  const scope = `${LIBSAVEDVARS_LAZY_LOAD_CALLBACK_NAME}${self.id}`
  LSV.protected.Debug(
    `LSV_SavedVarsManager:UnregisterLazyLoadCallback() scope=${scope}`,
    DEBUG_MODE
  )
  cm.UnregisterCallback(scope, callback)
  MANAGER_STATE.extraLazyLoadParams[self.id] = undefined
}

function unregisterMigrateStartCallback(
  this: void,
  self: SavedVarsManagerInstance,
  callback: (this: void, ...args: never[]) => void
): undefined {
  const scope = `${LIBSAVEDVARS_MIGRATE_START_CALLBACK_NAME}${self.id}`
  LSV.protected.Debug(
    `LSV_SavedVarsManager:UnregisterMigrateStartCallback() scope=${scope}`,
    DEBUG_MODE
  )
  cm.UnregisterCallback(scope, callback)
  MANAGER_STATE.extraMigrateParams[self.id] = undefined
}

function version(
  this: void,
  self: SavedVarsManagerInstance,
  versionNum: number,
  onVersionUpdate: (this: void, rawDataTable: LsvTable) => void
): SavedVarsManagerInstance {
  LSV.protected.Debug(
    "LSV_SavedVarsManager:Version(<<1>>, <<2>>)",
    DEBUG_MODE,
    versionNum,
    onVersionUpdate
  )

  if (self.version === undefined || self.version < versionNum) {
    self.version = versionNum
  }

  const [rawDataTable] = loadRawTableData(self)
  if (rawDataTable === undefined) {
    LSV.protected.Debug(`Saved vars don't exist. Skipping ${pathConcat(self)}`, DEBUG_MODE)
    return self
  }
  const rdtVersion = rawDataTable["version"]
  if (rdtVersion !== undefined && rdtVersion !== false && asNumber(rdtVersion) >= versionNum) {
    LSV.protected.Debug("Version check failed. Skipping.", DEBUG_MODE)
    return self
  }

  onVersionUpdate(rawDataTable)

  if (self.pendingVersion === undefined || self.pendingVersion < versionNum) {
    self.pendingVersion = versionNum
    MANAGER_STATE.versionUpdateQueue[self.id] = self
  }

  return self
}

export function installSavedVarsManager(this: void): undefined {
  const [created] = LSV.lib.NewClass(CLASSNAME, CLASSVERSION)
  if (created === undefined) {
    return undefined
  }

  const cls = asManagerClass(created)
  const members = asIndexable(cls)
  members.EnableDefaultsTrimming = enableDefaultsTrimming
  members.IsProfileWorldName = isProfileWorldName
  members.FireMigrateStartCallbacks = fireMigrateStartCallbacks
  members.LoadRawTableData = loadRawTableData
  members.RegisterLazyLoadCallback = registerLazyLoadCallback
  members.RegisterMigrateStartCallback = registerMigrateStartCallback
  members.SetDebugMode = setDebugMode
  members.RemoveSettings = removeSettings
  members.RenameSettings = renameSettings
  members.RenameSettingsAndInvert = renameSettingsAndInvert
  members.UnregisterLazyLoadCallback = unregisterLazyLoadCallback
  members.UnregisterMigrateStartCallback = unregisterMigrateStartCallback
  members.Validate = validate
  members.Version = version
  members.New = newManager
  members.__index = managerIndex

  LSV.manager = cls

  ZO_PreHook("Logout", onLogout)
  ZO_PreHook("Quit", onLogout)
  ZO_PreHook("CancelLogout", onLogoutCanceled)

  return undefined
}
