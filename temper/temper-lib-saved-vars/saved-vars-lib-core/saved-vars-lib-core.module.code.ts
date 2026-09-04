import {
  asIndexable,
  asLibSavedVarsTable,
  asLsvTable,
  asProtected,
  asStringArray,
} from "../saved-vars-casts/saved-vars-casts.module.code.ts"
import {
  LIBSAVEDVARS_ACCOUNT_KEY,
  LIBSAVEDVARS_CHARACTER_ID_KEY,
  LIBSAVEDVARS_CHARACTER_NAME_KEY,
  LIBSAVEDVARS_VERSION,
} from "../saved-vars-constants/saved-vars-constants.module.code.ts"
import { LIB_STATE } from "../saved-vars-lib-state/saved-vars-lib-state.module.code.ts"
import { LSV } from "../saved-vars-registry/saved-vars-registry.module.code.ts"
import type {
  AccountAndProfile,
  DataInstance,
  LibSavedVarsTable,
  LsvTable,
  ProtectedTable,
  RegisteredSavedVarsInfo,
  SavedVarsInfo,
  SavedVarsManagerInstance,
} from "../saved-vars-types/saved-vars-types.module.code.ts"

const WORLDS: { live: string[]; pts: string[] } = {
  live: ["NA Megaserver", "EU Megaserver"],
  pts: ["PTS"],
}

const CLASS_VERSIONS: Record<string, number> = {}

function getRawDataTable(this: void, _self: LibSavedVarsTable, savedVars: unknown): LsvTable {
  const meta = getmetatable(asLsvTable(savedVars))
  if (meta !== undefined) {
    const index = asIndexable(meta).__index
    if (index !== undefined && index !== false) {
      return asLsvTable(index)
    }
  }
  return asLsvTable(savedVars)
}

function clearSavedVars(this: void, self: LibSavedVarsTable, savedVars: unknown): undefined {
  const dataTable = getRawDataTable(self, savedVars)
  const writable = asIndexable(savedVars)
  for (const [key, value] of pairs(dataTable)) {
    if (key !== "version" && type(value) !== "function") {
      writable[key] = undefined
    }
  }
}

function deepSavedVarsCopy(
  this: void,
  self: LibSavedVarsTable,
  source: unknown,
  destination: unknown,
  doNotOverwrite?: boolean
): undefined {
  const src = getRawDataTable(self, source)
  const dest = getRawDataTable(self, destination)
  for (const [key, value] of pairs(src)) {
    if (type(value) === "table") {
      if (type(dest[key]) !== "table") {
        dest[key] = {}
      }
      deepSavedVarsCopy(self, value, dest[key], doNotOverwrite)
    } else if (key !== "version" && type(value) !== "function") {
      if (doNotOverwrite !== true || dest[key] === undefined) {
        dest[key] = value
      }
    }
  }
}

function getAccountsAndProfiles(
  this: void,
  _self: LibSavedVarsTable,
  savedVarName: string
): AccountAndProfile[] {
  const savedVariableTable = asIndexable(_G)[savedVarName]
  if (type(savedVariableTable) !== "table") {
    error("Can only apply saved variables to a table")
  }
  const accountsAndProfiles: AccountAndProfile[] = []
  for (const [key1, value1] of pairs(asLsvTable(savedVariableTable))) {
    if (type(value1) === "table") {
      if (string.sub(key1, 1, 1) === "@") {
        accountsAndProfiles.push({ account: key1 })
      } else {
        for (const [key2, value2] of pairs(asLsvTable(value1))) {
          if (type(value2) === "table" && string.sub(key1, 1, 1) === "@") {
            accountsAndProfiles.push({ account: key2, profile: key1 })
          }
        }
      }
    }
  }
  return accountsAndProfiles
}

function getInfo(
  this: void,
  _self: LibSavedVarsTable,
  savedVars: unknown
): RegisteredSavedVarsInfo | undefined {
  if (savedVars === undefined) {
    return undefined
  }
  return LIB_STATE.savedVarRegistry.get(asLsvTable(savedVars))
}

function getWorldNames(this: void, _self: LibSavedVarsTable, environment?: string): string[] {
  if (environment === "*") {
    return [...WORLDS.live, ...WORLDS.pts]
  }
  let env = environment
  if (env === undefined) {
    env = GetWorldName() === "PTS" ? "pts" : "live"
  }
  return asStringArray(asIndexable(WORLDS)[env])
}

function isZoSavedVars(this: void, _self: LibSavedVarsTable, input: unknown): boolean {
  return type(input) === "table" && type(asIndexable(input).GetInterfaceForCharacter) === "function"
}

function migrate(
  this: void,
  _self: LibSavedVarsTable,
  defaultKeyType: number | SavedVarsInfo | undefined,
  fromSavedVarsInfo: SavedVarsInfo,
  toSavedVarsInfo1?: SavedVarsInfo,
  ...rest: SavedVarsInfo[]
): SavedVarsManagerInstance[] | undefined {
  const [toParams, from] = LSV.protected.Migrate(
    defaultKeyType,
    fromSavedVarsInfo,
    toSavedVarsInfo1,
    ...rest
  )
  LSV.protected.UnsetPath(asLsvTable(from.table), from.rawSavedVarsTablePath ?? [])
  return toParams
}

function migrateAccountWide(
  this: void,
  self: LibSavedVarsTable,
  fromSavedVarsInfo: SavedVarsInfo,
  toSavedVarsInfo1?: SavedVarsInfo,
  ...rest: SavedVarsInfo[]
): SavedVarsManagerInstance[] | undefined {
  return migrate(self, LIBSAVEDVARS_ACCOUNT_KEY, fromSavedVarsInfo, toSavedVarsInfo1, ...rest)
}

function migrateCharacterId(
  this: void,
  self: LibSavedVarsTable,
  fromSavedVarsInfo: SavedVarsInfo,
  toSavedVarsInfo1?: SavedVarsInfo,
  ...rest: SavedVarsInfo[]
): SavedVarsManagerInstance[] | undefined {
  return migrate(self, LIBSAVEDVARS_CHARACTER_ID_KEY, fromSavedVarsInfo, toSavedVarsInfo1, ...rest)
}

function migrateCharacterName(
  this: void,
  self: LibSavedVarsTable,
  fromSavedVarsInfo: SavedVarsInfo,
  toSavedVarsInfo1?: SavedVarsInfo,
  ...rest: SavedVarsInfo[]
): SavedVarsManagerInstance[] | undefined {
  return migrate(
    self,
    LIBSAVEDVARS_CHARACTER_NAME_KEY,
    fromSavedVarsInfo,
    toSavedVarsInfo1,
    ...rest
  )
}

function migrateCharacterNameToId(
  this: void,
  self: LibSavedVarsTable,
  fromSavedVarsInfo: SavedVarsInfo,
  toSavedVarsInfo1?: SavedVarsInfo,
  ...rest: SavedVarsInfo[]
): SavedVarsManagerInstance[] | undefined {
  fromSavedVarsInfo.keyType = LIBSAVEDVARS_CHARACTER_NAME_KEY
  return migrate(self, LIBSAVEDVARS_CHARACTER_ID_KEY, fromSavedVarsInfo, toSavedVarsInfo1, ...rest)
}

function migrateToMegaserverProfiles(
  this: void,
  _self: LibSavedVarsTable,
  defaultKeyType: number | undefined,
  fromSavedVarsInfo: SavedVarsInfo,
  copyToAllServers: boolean | undefined,
  toSavedVarsInfo: SavedVarsInfo | undefined
): Record<string, SavedVarsManagerInstance> | undefined {
  const [toParams, from] = LSV.protected.MigrateToMegaserverProfiles(
    defaultKeyType,
    fromSavedVarsInfo,
    copyToAllServers,
    toSavedVarsInfo
  )
  LSV.protected.UnsetPath(asLsvTable(from.table), from.rawSavedVarsTablePath ?? [])
  return toParams
}

function newAccountWide(
  this: void,
  _self: LibSavedVarsTable,
  savedVariableTable: string,
  version?: number | string | LsvTable,
  namespace?: string | LsvTable,
  defaults?: LsvTable,
  profile?: string,
  displayName?: string
): DataInstance {
  return LSV.data.NewAccountWide(
    savedVariableTable,
    version,
    namespace,
    defaults,
    profile,
    displayName
  )
}

function newCharacterSettings(
  this: void,
  _self: LibSavedVarsTable,
  savedVariableTable: string,
  version?: number | string | LsvTable,
  namespace?: string | LsvTable,
  defaults?: LsvTable,
  profile?: string,
  displayName?: string,
  characterName?: string,
  characterId?: number | string,
  characterKeyType?: number
): DataInstance {
  return LSV.data.NewCharacterSettings(
    savedVariableTable,
    version,
    namespace,
    defaults,
    profile,
    displayName,
    characterName,
    characterId,
    characterKeyType
  )
}

function setDebugMode(this: void, _self: LibSavedVarsTable, enable: boolean): undefined {
  LSV.protected.SetDebugMode(enable)
}

function newClass(
  this: void,
  _self: LibSavedVarsTable,
  name: string,
  version: number
): LuaMultiReturn<[LsvTable | undefined, ProtectedTable | undefined]> {
  const existing = CLASS_VERSIONS[name]
  if (existing === undefined || existing < version) {
    CLASS_VERSIONS[name] = version
    const created: LsvTable = {}
    if (name === "Protected") {
      return $multi(created, asProtected(created))
    }
    return $multi(created, LSV.protected)
  }
  return $multi(undefined, undefined)
}

export function installLibCore(this: void): undefined {
  const libTable = asLibSavedVarsTable({ version: LIBSAVEDVARS_VERSION })
  const members = asIndexable(libTable)
  members.ClearSavedVars = clearSavedVars
  members.DeepSavedVarsCopy = deepSavedVarsCopy
  members.GetAccountsAndProfiles = getAccountsAndProfiles
  members.GetInfo = getInfo
  members.GetRawDataTable = getRawDataTable
  members.GetWorldNames = getWorldNames
  members.IsZOSavedVars = isZoSavedVars
  members.Migrate = migrate
  members.MigrateAccountWide = migrateAccountWide
  members.MigrateCharacterId = migrateCharacterId
  members.MigrateCharacterName = migrateCharacterName
  members.MigrateCharacterNameToId = migrateCharacterNameToId
  members.MigrateToMegaserverProfiles = migrateToMegaserverProfiles
  members.NewAccountWide = newAccountWide
  members.NewCharacterSettings = newCharacterSettings
  members.NewCharacterIdSettings = newCharacterSettings
  members.NewClass = newClass
  members.SetDebugMode = setDebugMode

  LSV.lib = libTable
  return undefined
}
