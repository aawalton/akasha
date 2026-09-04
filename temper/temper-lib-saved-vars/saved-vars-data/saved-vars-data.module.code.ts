import {
  asDataClass,
  asDataInstance,
  asIndexable,
  asUnknownArray,
} from "../saved-vars-casts/saved-vars-casts.module.code.ts"
import {
  enableDefaultsTrimming,
  getAccountSavedVarsActive,
  getActiveSavedVars,
  getSavedVarsManagers,
  loadAllSavedVars,
  setDebugMode,
} from "../saved-vars-data-active/saved-vars-data-active.module.code.ts"
import {
  addAccountWideToggle,
  addCharacterSettingsToggle,
  newAccountWide,
  newCharacterSettings,
} from "../saved-vars-data-constructors/saved-vars-data-constructors.module.code.ts"
import {
  getIterator,
  getLength,
} from "../saved-vars-data-iterator/saved-vars-data-iterator.module.code.ts"
import {
  migrateFrom,
  migrateFromAccountWide,
  migrateFromCharacterId,
  migrateFromCharacterName,
} from "../saved-vars-data-migrate/saved-vars-data-migrate.module.code.ts"
import {
  getLibAddonMenuAccountCheckbox,
  removeSettings,
  renameSettings,
  renameSettingsAndInvert,
  setAccountSavedVarsActive,
  version,
} from "../saved-vars-data-settings/saved-vars-data-settings.module.code.ts"
import { DATA_STATE } from "../saved-vars-data-state/saved-vars-data-state.module.code.ts"
import { LSV } from "../saved-vars-registry/saved-vars-registry.module.code.ts"
import type { DataInstance, NextFn } from "../saved-vars-types/saved-vars-types.module.code.ts"

const CLASSNAME = "Data"
const CLASSVERSION = 1.8

function dataIndex(this: void, data: DataInstance | undefined, key: string): unknown {
  LSV.protected.Debug("LSV_Data.__index(<<1>>, <<2>>)", DATA_STATE.debugMode, data, key)

  if (data === undefined) {
    return undefined
  }

  const meta = getmetatable(asDataInstance(data))
  const metaFields = asIndexable(meta)
  if (meta !== undefined && type(metaFields[key]) === "function") {
    return metaFields[key]
  }

  const savedVars = getActiveSavedVars(data, key)
  if (savedVars !== undefined) {
    const value = asIndexable(savedVars)[key]
    if (value !== undefined) {
      return value
    }
  }

  if (meta !== undefined) {
    return metaFields[key]
  }
  return undefined
}

function dataNewIndex(
  this: void,
  data: DataInstance | undefined,
  key: string,
  value: unknown
): undefined {
  LSV.protected.Debug(
    "LSV_Data.__newindex(<<1>>, <<2>>, <<3>>)",
    DATA_STATE.debugMode,
    data,
    key,
    value
  )

  if (data === undefined) {
    return
  }

  const savedVars = getActiveSavedVars(data, key)
  if (savedVars !== undefined) {
    asIndexable(savedVars)[key] = value
  }
}

function dataIpairs(
  this: void,
  data: DataInstance | undefined
): LuaIterable<LuaMultiReturn<[number, unknown]>> | undefined {
  LSV.protected.Debug("LSV_Data.__ipairs(<<1>>, <<2>>)", DATA_STATE.debugMode, data)

  if (data === undefined) {
    return undefined
  }

  const savedVars = getActiveSavedVars(data)
  if (savedVars !== undefined) {
    const rawDataTable = LSV.lib.GetRawDataTable(savedVars)
    return ipairs(asUnknownArray(rawDataTable))
  }
  return undefined
}

function dataPairs(
  this: void,
  data: DataInstance
): LuaMultiReturn<[NextFn, DataInstance, undefined]> {
  LSV.protected.Debug("LSV_Data.__pairs(<<1>>)", DATA_STATE.debugMode, data)

  const [iterator, iterData] = getIterator(data)
  return $multi(iterator, asDataInstance(iterData), undefined)
}

export function installData(this: void): undefined {
  const [created] = LSV.lib.NewClass(CLASSNAME, CLASSVERSION)
  if (created === undefined) {
    return undefined
  }

  const cls = asDataClass(created)
  const members = asIndexable(cls)
  members.NewAccountWide = newAccountWide
  members.NewCharacterSettings = newCharacterSettings
  members.AddAccountWideToggle = addAccountWideToggle
  members.AddCharacterSettingsToggle = addCharacterSettingsToggle
  members.EnableDefaultsTrimming = enableDefaultsTrimming
  members.GetAccountSavedVarsActive = getAccountSavedVarsActive
  members.GetActiveSavedVars = getActiveSavedVars
  members.GetIterator = getIterator
  members.GetLength = getLength
  members.GetLibAddonMenuAccountCheckbox = getLibAddonMenuAccountCheckbox
  members.GetSavedVarsManagers = getSavedVarsManagers
  members.LoadAllSavedVars = loadAllSavedVars
  members.MigrateFrom = migrateFrom
  members.MigrateFromAccountWide = migrateFromAccountWide
  members.MigrateFromCharacterId = migrateFromCharacterId
  members.MigrateFromCharacterName = migrateFromCharacterName
  members.RemoveSettings = removeSettings
  members.RenameSettings = renameSettings
  members.RenameSettingsAndInvert = renameSettingsAndInvert
  members.SetAccountSavedVarsActive = setAccountSavedVarsActive
  members.SetDebugMode = setDebugMode
  members.Version = version
  members.__index = dataIndex
  members.__newindex = dataNewIndex
  if (LibLua52 !== undefined) {
    members.__ipairs = dataIpairs
    members.__pairs = dataPairs
  }

  LSV.data = cls

  DATA_STATE.emptyObject = asDataInstance(setmetatable(asDataInstance({ __dataSource: {} }), cls))

  return undefined
}
