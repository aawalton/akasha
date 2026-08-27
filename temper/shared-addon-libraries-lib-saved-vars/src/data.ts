import { asDataClass, asDataInstance, asIndexable, asUnknownArray } from "./casts"
import {
  enableDefaultsTrimming,
  getAccountSavedVarsActive,
  getActiveSavedVars,
  getSavedVarsManagers,
  loadAllSavedVars,
  setDebugMode,
} from "./data-active"
import {
  addAccountWideToggle,
  addCharacterSettingsToggle,
  newAccountWide,
  newCharacterSettings,
} from "./data-constructors"
import { getIterator, getLength } from "./data-iterator"
import {
  migrateFrom,
  migrateFromAccountWide,
  migrateFromCharacterId,
  migrateFromCharacterName,
} from "./data-migrate"
import {
  getLibAddonMenuAccountCheckbox,
  removeSettings,
  renameSettings,
  renameSettingsAndInvert,
  setAccountSavedVarsActive,
  version,
} from "./data-settings"
import { dataState } from "./data-state"
import { LSV } from "./registry"
import type { DataInstance, NextFn } from "./types"

const CLASSNAME = "Data"
const CLASSVERSION = 1.8

function dataIndex(this: void, data: DataInstance | undefined, key: string): unknown {
  LSV.protected.Debug("LSV_Data.__index(<<1>>, <<2>>)", dataState.debugMode, data, key)

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
    dataState.debugMode,
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
  LSV.protected.Debug("LSV_Data.__ipairs(<<1>>, <<2>>)", dataState.debugMode, data)

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
  LSV.protected.Debug("LSV_Data.__pairs(<<1>>)", dataState.debugMode, data)

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

  dataState.emptyObject = asDataInstance(setmetatable(asDataInstance({ __dataSource: {} }), cls))

  return undefined
}
