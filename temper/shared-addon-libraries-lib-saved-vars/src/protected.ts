import {
  asIndexable,
  asLsvTable,
  asManagerClass,
  asManagerInstance,
  asNumber,
  asProtected,
  asSavedVarsInfo,
  asString,
} from "./casts"
import {
  LIBNAME,
  LIBSAVEDVARS_ACCOUNT_KEY,
  LIBSAVEDVARS_CHARACTER_ID_KEY,
  LIBSAVEDVARS_CHARACTER_NAME_KEY,
} from "./constants"
import { MigrateToMegaserverProfiles } from "./protected-migrate"
import { LSV } from "./registry"
import type { LsvTable, ProtectedTable, SavedVarsInfo, SavedVarsManagerInstance } from "./types"

let debugMode = false

function stringifyPath(this: void, path: readonly unknown[]): string[] {
  return path.map((key) => tostring(key))
}

function Debug(this: void, message: string, force?: boolean, ...args: unknown[]): undefined {
  if (force !== true && debugMode !== true) {
    return
  }
  let rendered = message
  if (args.length > 0) {
    const params = args.map((value) => tostring(value))
    rendered = zo_strformat(message, ...params)
  }
  rendered = zo_strformat("|c99CCEF<<1>>|r|cFFFFFF: <<2>>|r", LIBNAME, rendered)
  d(rendered)
}

function SetDebugMode(this: void, enable: boolean): undefined {
  debugMode = enable
}

function CreatePath(
  this: void,
  t: LsvTable,
  path: readonly unknown[]
): LuaMultiReturn<[LsvTable | undefined, LsvTable | undefined, unknown]> {
  Debug(`CreatePath for table ${tostring(t)} ${table.concat(stringifyPath(path), " > ")}`)

  let current: LsvTable | undefined = t
  let container: LsvTable | undefined
  let containerKey: unknown
  for (const key of path) {
    if (key !== undefined) {
      if (current === undefined) {
        Debug(
          `Current is nil for key ${tostring(containerKey)}. How could this happen, since we just initialized?`
        )
        break
      }
      const indexable = asIndexable(current)
      const keyStr = asString(key)
      const existing = indexable[keyStr]
      if (existing === undefined || existing === false) {
        indexable[keyStr] = {}
        Debug(
          `Initialized new empty table ${tostring(indexable[keyStr])} at ${tostring(current)} key ${tostring(key)}`
        )
      }
      container = current
      containerKey = key
      current = asLsvTable(indexable[keyStr])
    }
  }

  return $multi(current, container, containerKey)
}

function GetSavedVarsPath(
  this: void,
  savedVariableTableName: string | LsvTable,
  namespace: string | undefined,
  profile: string | undefined,
  displayName?: string,
  characterName?: string,
  characterId?: number | string,
  characterKeyType?: number
): LuaMultiReturn<[LsvTable, string, string | undefined, unknown, string | undefined]> {
  const savedVariableTable = ValidateSavedVarsTable(savedVariableTableName)

  const profileResolved = profile ?? "Default"
  if (type(profileResolved) !== "string") {
    error("Profile must be a string or nil", 3)
  }

  let playerName: unknown
  if (characterName === undefined) {
    playerName = "$AccountWide"
  } else {
    playerName = characterKeyType === ZO_SAVED_VARS_CHARACTER_NAME_KEY ? characterName : characterId
  }

  Debug(
    `GetSavedVarsPath returning ${table.concat(
      stringifyPath([savedVariableTable, profileResolved, displayName, playerName, namespace]),
      " > "
    )}`
  )

  return $multi(savedVariableTable, profileResolved, displayName, playerName, namespace)
}

function GetSavedVarsTable(
  this: void,
  savedVariableTableName: string | LsvTable,
  namespace: string | undefined,
  profile: string | undefined,
  displayName?: string,
  characterName?: string,
  characterId?: number | string,
  characterKeyType?: number
): LuaMultiReturn<[LsvTable | undefined, LsvTable | undefined, unknown, LsvTable, unknown[]]> {
  const [savedVariableTable, path1, path2, path3, path4] = GetSavedVarsPath(
    savedVariableTableName,
    namespace,
    profile,
    displayName,
    characterName,
    characterId,
    characterKeyType
  )

  const [rawSavedVarsTable, parent, key] = SearchPath(savedVariableTable, [
    path1,
    path2,
    path3,
    path4,
  ])
  return $multi(asLsvTable(rawSavedVarsTable), parent, key, savedVariableTable, [
    path1,
    path2,
    path3,
    path4,
  ])
}

function Invert(this: void, value: unknown): boolean {
  return !(value === true || (value !== undefined && value !== false))
}

function SearchPath(
  this: void,
  t: LsvTable,
  path: readonly unknown[]
): LuaMultiReturn<[unknown, LsvTable | undefined, unknown]> {
  let current: unknown = t
  let parent: LsvTable | undefined
  let lastKey: unknown
  for (const key of path) {
    if (key !== undefined) {
      lastKey = key
      parent = asLsvTable(current)
      if (current === undefined) {
        return $multi(undefined, undefined, undefined)
      }
      current = asIndexable(current)[asString(key)]
    }
  }
  return $multi(current, parent, lastKey)
}

function MaybeSetPath(
  this: void,
  t: LsvTable,
  value: unknown,
  path: readonly unknown[]
): LsvTable | undefined {
  Debug(`MaybeSetPath ${table.concat(stringifyPath(path), " > ")} to ${tostring(value)}`)
  const [, parent, lastKey] = SearchPath(t, path)
  if (parent !== undefined) {
    asIndexable(parent)[asString(lastKey)] = value
    Debug(`${tostring(parent)}[${tostring(lastKey)}] = ${tostring(value)}`)
  }
  return parent
}

function Migrate(
  this: void,
  defaultKeyType: number | SavedVarsInfo | undefined,
  fromSavedVarsInfo: SavedVarsInfo,
  toSavedVarsInfo1?: SavedVarsInfo,
  ...rest: SavedVarsInfo[]
): LuaMultiReturn<[SavedVarsManagerInstance[] | undefined, SavedVarsManagerInstance]> {
  const toSavedVarsInfoList: SavedVarsInfo[] = [...rest]

  Debug("protected.Migrate()")

  let keyTypeDefault = defaultKeyType
  let fromInfo = fromSavedVarsInfo
  let toInfo1 = toSavedVarsInfo1

  if (type(keyTypeDefault) === "table") {
    Debug("defaultKeyType is a table. shift params")
    toSavedVarsInfoList.unshift(asSavedVarsInfo(toInfo1))
    toInfo1 = fromInfo
    fromInfo = asSavedVarsInfo(keyTypeDefault)
    keyTypeDefault = undefined
    Debug("defaultKeyType is now nil")
  }

  if (fromInfo === undefined) {
    error("Missing required parameter 'fromSavedVarsInfo'")
  }
  if (toInfo1 === undefined) {
    error("Missing required parameter 'toSavedVarsInfo1'.")
  }

  const resolvedDefaultKeyType =
    type(keyTypeDefault) === "number" ? asNumber(keyTypeDefault) : LIBSAVEDVARS_CHARACTER_NAME_KEY

  Debug(
    `defaultKeyType: ${
      resolvedDefaultKeyType === LIBSAVEDVARS_ACCOUNT_KEY
        ? "Account-wide"
        : resolvedDefaultKeyType === LIBSAVEDVARS_CHARACTER_ID_KEY
          ? "Character-ID-specific"
          : "Character-Name-specific"
    }`
  )

  if (fromInfo.keyType === undefined) {
    fromInfo.keyType = resolvedDefaultKeyType
    Debug("From saved vars keyType blank. Setting to default key type.")
  }

  const from =
    asManagerClass(getmetatable(fromInfo)) === LSV.manager
      ? asManagerInstance(fromInfo)
      : LSV.manager.New(fromInfo)
  const [_discardedFromRaw] = from.LoadRawTableData()

  if (from.rawSavedVarsTable === undefined) {
    Debug("From raw saved vars table does not exist.  Halt migration.")
    return $multi(undefined, from)
  }

  toSavedVarsInfoList.unshift(asSavedVarsInfo(toInfo1))

  Debug(`#savedVarsInfoList: ${tostring(toSavedVarsInfoList.length)}`)

  const toParams: SavedVarsManagerInstance[] = []
  for (const i of $range(1, toSavedVarsInfoList.length)) {
    const toSavedVarsInfo = asSavedVarsInfo(toSavedVarsInfoList[i - 1])
    if (toSavedVarsInfo.name === undefined) {
      toSavedVarsInfo.name = from.name
    }
    if (toSavedVarsInfo.keyType === undefined) {
      toSavedVarsInfo.keyType = resolvedDefaultKeyType
      Debug(`To saved vars ${tostring(i)} keyType is blank. Setting to default key type.`)
    }
    const to =
      asManagerClass(getmetatable(toSavedVarsInfo)) === LSV.manager
        ? asManagerInstance(toSavedVarsInfo)
        : LSV.manager.New(toSavedVarsInfo)
    const [_discardedToValid] = to.Validate()
    Debug(`To saved vars ${tostring(i)} validated successfully.`)
    toParams.push(to)
  }

  const fromRaw = asIndexable(from.rawSavedVarsTable)
  const fromLibEntry = fromRaw[LIBNAME]
  const alreadyMigrated =
    fromRaw["libSavedVarsMigrated"] !== undefined && fromRaw["libSavedVarsMigrated"] !== false
  const libEntryMigrated =
    fromLibEntry !== undefined &&
    fromLibEntry !== false &&
    asIndexable(fromLibEntry)["migrated"] !== undefined &&
    asIndexable(fromLibEntry)["migrated"] !== false
  if (!alreadyMigrated && !libEntryMigrated) {
    Debug("Raw saved vars table was not previously migrated by LibSavedVars v2 or v3.")

    from.FireMigrateStartCallbacks()

    Debug("Migrate start callbacks fired.")

    for (const i of $range(1, toParams.length)) {
      const to = asManagerInstance(toParams[i - 1])

      Debug(`to (${tostring(to)}).table = ${tostring(to.table)}`)

      const [_discardedToRaw] = to.LoadRawTableData()
      Debug(`To saved vars manager ${tostring(i)} raw table data loaded.`)

      if (to.table === undefined) {
        Debug("To table is nil. How can this be, since we called Validate on it already?")
      }

      if (to.rawSavedVarsTable === undefined) {
        const [, rawSavedVarsTableParent, rawSavedVarsTableKey] = CreatePath(
          asLsvTable(to.table),
          to.rawSavedVarsTablePath ?? []
        )
        to.rawSavedVarsTableParent = rawSavedVarsTableParent
        to.rawSavedVarsTableKey = rawSavedVarsTableKey
        Debug(`To saved vars manager ${tostring(i)} raw table data did not exist.  Created.`)
      }

      if (to.rawSavedVarsTableParent === undefined) {
        Debug("Raw saved vars parent table does not exist.  CreatePath must have failed.")
      } else {
        Debug(
          `Setting to raw saved vars parent table ${tostring(i)} (${tostring(
            to.rawSavedVarsTableParent
          )}) key ${tostring(to.rawSavedVarsTableKey)} to the from raw saved vars table (${tostring(
            from.rawSavedVarsTable
          )})`
        )
        const destination = asIndexable(to.rawSavedVarsTableParent)[
          asString(to.rawSavedVarsTableKey)
        ]
        LSV.lib.DeepSavedVarsCopy(from.rawSavedVarsTable, destination)
        asIndexable(destination)["version"] = asIndexable(from.rawSavedVarsTable)["version"]
      }
    }
  }

  return $multi(toParams, from)
}

function UnsetPath(this: void, t: LsvTable, path: readonly unknown[]): undefined {
  const params: unknown[] = [...path]
  while (params.length > 0) {
    const parent = MaybeSetPath(t, undefined, params)
    if (parent !== undefined) {
      const [firstKey] = next(parent)
      if (firstKey !== undefined) {
        return
      }
    }
    params.pop()
  }
}

function ValidateSavedVarsTable(this: void, savedVariableTable: string | LsvTable): LsvTable {
  Debug(`ValidateSavedVarsTable(${tostring(savedVariableTable)})`)
  let resolved = savedVariableTable
  if (type(resolved) !== "table") {
    const name = asString(resolved)
    if (asIndexable(_G)[name] === undefined) {
      Debug("No global of that name exists. Creating.")
      asIndexable(_G)[name] = {}
    }
    resolved = asLsvTable(asIndexable(_G)[name])
  }

  if (type(resolved) !== "table") {
    error("Can only apply saved variables to a table", 3)
  }
  Debug(`ValidateSavedVarsTable returning ${tostring(resolved)}`)
  return asLsvTable(resolved)
}

export function installProtected(this: void): undefined {
  const [created] = LSV.lib.NewClass("Protected", 1.2)
  if (created === undefined) {
    return undefined
  }

  const members = asProtected(created)
  members.debugMode = debugMode
  members.CreatePath = CreatePath
  members.Debug = Debug
  members.SetDebugMode = SetDebugMode
  members.GetSavedVarsPath = GetSavedVarsPath
  members.GetSavedVarsTable = GetSavedVarsTable
  members.Invert = Invert
  members.SearchPath = SearchPath
  members.MaybeSetPath = MaybeSetPath
  members.Migrate = Migrate
  members.MigrateToMegaserverProfiles = MigrateToMegaserverProfiles
  members.UnsetPath = UnsetPath
  members.ValidateSavedVarsTable = ValidateSavedVarsTable

  LSV.protected = members
  return undefined
}
