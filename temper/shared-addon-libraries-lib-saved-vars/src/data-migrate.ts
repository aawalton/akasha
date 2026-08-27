import { asLsvTable, asManagerInstance, asString, asUnknownArray } from "./casts"
import {
  LIBSAVEDVARS_ACCOUNT_KEY,
  LIBSAVEDVARS_CHARACTER_ID_KEY,
  LIBSAVEDVARS_CHARACTER_NAME_KEY,
} from "./constants"
import { dataState } from "./data-state"
import { LSV } from "./registry"
import type { DataInstance, SavedVarsInfo, SavedVarsManagerInstance } from "./types"

export function migrateFrom(
  this: void,
  self: DataInstance,
  fromSavedVarsInfo: SavedVarsInfo,
  copyToAllServers?: boolean
): DataInstance {
  if (fromSavedVarsInfo.keyType === undefined) {
    fromSavedVarsInfo.keyType = LIBSAVEDVARS_CHARACTER_NAME_KEY
  }

  LSV.protected.Debug(
    "LSV_Data:MigrateFrom(<<1>> (<<2>>), <<3>>)",
    dataState.debugMode,
    fromSavedVarsInfo,
    asUnknownArray(fromSavedVarsInfo).length,
    copyToAllServers
  )

  let from: SavedVarsManagerInstance | undefined
  let copyAll = copyToAllServers
  const ds = self.__dataSource

  if (ds.account !== undefined) {
    LSV.protected.Debug("ds.account block entered")
    if (copyAll === undefined) {
      copyAll = ds.account.IsProfileWorldName()
    }
    const profile = ds.account.profile
    const [to, fromResult] = LSV.protected.MigrateToMegaserverProfiles(
      undefined,
      fromSavedVarsInfo,
      copyAll,
      ds.account
    )
    from = fromResult
    if (to !== undefined) {
      LSV.protected.Debug(
        `Saving account saved var manager for profile ${tostring(profile)} as ${tostring(to[asString(profile)])}`,
        dataState.debugMode
      )
      ds.account = to[asString(profile)]
    } else {
      LSV.protected.Debug("toSavedVars was nil", dataState.debugMode)
    }
  }

  if (
    ds.character !== undefined &&
    (fromSavedVarsInfo.keyType !== LIBSAVEDVARS_ACCOUNT_KEY || !ds.defaultToAccount)
  ) {
    LSV.protected.Debug("ds.character block entered")
    const profile = ds.character.profile
    const [to, fromResult] = LSV.protected.MigrateToMegaserverProfiles(
      undefined,
      fromSavedVarsInfo,
      undefined,
      ds.character
    )
    from = fromResult
    if (to !== undefined) {
      LSV.protected.Debug(
        `Saving character saved var manager as ${tostring(to[asString(profile)])}`,
        dataState.debugMode
      )
      ds.character = to[asString(profile)]
    } else {
      LSV.protected.Debug("toSavedVars was nil", dataState.debugMode)
    }
  }

  LSV.protected.Debug("Unsetting from raw saved vars path", dataState.debugMode)

  LSV.protected.UnsetPath(
    asLsvTable(asManagerInstance(from).table),
    asManagerInstance(from).rawSavedVarsTablePath ?? []
  )

  LSV.protected.Debug("Migration complete.", dataState.debugMode)

  return self
}

export function migrateFromAccountWide(
  this: void,
  self: DataInstance,
  fromSavedVarsInfo: SavedVarsInfo,
  copyToAllServers?: boolean
): DataInstance {
  LSV.protected.Debug(
    "LSV_Data:MigrateFromAccountWide(<<1>> (<<2>>), <<3>>)",
    dataState.debugMode,
    fromSavedVarsInfo,
    asUnknownArray(fromSavedVarsInfo).length,
    copyToAllServers
  )
  fromSavedVarsInfo.keyType = LIBSAVEDVARS_ACCOUNT_KEY
  return migrateFrom(self, fromSavedVarsInfo, copyToAllServers)
}

export function migrateFromCharacterId(
  this: void,
  self: DataInstance,
  fromSavedVarsInfo: SavedVarsInfo,
  copyToAllServers?: boolean
): DataInstance {
  LSV.protected.Debug(
    "LSV_Data:MigrateFromCharacterId(<<1>> (<<2>>), <<3>>)",
    dataState.debugMode,
    fromSavedVarsInfo,
    asUnknownArray(fromSavedVarsInfo).length,
    copyToAllServers
  )
  fromSavedVarsInfo.keyType = LIBSAVEDVARS_CHARACTER_ID_KEY
  return migrateFrom(self, fromSavedVarsInfo, copyToAllServers)
}

export function migrateFromCharacterName(
  this: void,
  self: DataInstance,
  fromSavedVarsInfo: SavedVarsInfo,
  copyToAllServers?: boolean
): DataInstance {
  LSV.protected.Debug(
    "LSV_Data:MigrateFromCharacterName(<<1>> (<<2>>), <<3>>)",
    dataState.debugMode,
    fromSavedVarsInfo,
    asUnknownArray(fromSavedVarsInfo).length,
    copyToAllServers
  )
  fromSavedVarsInfo.keyType = LIBSAVEDVARS_CHARACTER_NAME_KEY
  return migrateFrom(self, fromSavedVarsInfo, copyToAllServers)
}
