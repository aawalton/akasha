import { asIndexable, asManagerInstance, asSavedVarsInfo, asString } from "./casts"
import {
  LIBSAVEDVARS_ACCOUNT_KEY,
  LIBSAVEDVARS_CHARACTER_ID_KEY,
  LIBSAVEDVARS_CHARACTER_NAME_KEY,
} from "./constants"
import { LSV } from "./registry"
import type { SavedVarsInfo, SavedVarsManagerInstance } from "./types"

function stringifyPath(this: void, path: readonly unknown[]): string[] {
  return path.map((key) => tostring(key))
}

export function MigrateToMegaserverProfiles(
  this: void,
  defaultKeyType: number | undefined,
  fromSavedVarsInfo: SavedVarsInfo,
  copyToAllServers: boolean | undefined,
  toSavedVarsInfo: SavedVarsInfo | undefined
): LuaMultiReturn<
  [Record<string, SavedVarsManagerInstance> | undefined, SavedVarsManagerInstance]
> {
  let keyTypeDefault = defaultKeyType
  let toInfo = toSavedVarsInfo

  if (keyTypeDefault === undefined) {
    if (fromSavedVarsInfo.keyType === undefined) {
      keyTypeDefault = LIBSAVEDVARS_CHARACTER_NAME_KEY
      fromSavedVarsInfo.keyType = LIBSAVEDVARS_CHARACTER_NAME_KEY
    } else {
      keyTypeDefault = fromSavedVarsInfo.keyType
    }
  }

  if (toInfo !== undefined) {
    if (toInfo.keyType === undefined) {
      toInfo.keyType = keyTypeDefault
    }
  } else {
    toInfo = asSavedVarsInfo(ZO_DeepTableCopy(fromSavedVarsInfo))
    toInfo.keyType = keyTypeDefault
  }

  const isAccountWide = toInfo.keyType === LIBSAVEDVARS_ACCOUNT_KEY

  LSV.protected.Debug(
    `MigrateToMegaserverProfiles performing migration to ${
      isAccountWide
        ? "account-wide"
        : toInfo.keyType === LIBSAVEDVARS_CHARACTER_ID_KEY
          ? "character-ID-specific"
          : "character-name-specific"
    } settings.`
  )

  let profiles: string[]
  if (isAccountWide && (copyToAllServers === undefined || copyToAllServers)) {
    profiles = LSV.lib.GetWorldNames()
  } else {
    profiles = [GetWorldName()]
  }
  if (toInfo.profile === undefined) {
    toInfo.profile = GetWorldName()
  } else if (!ZO_IsElementInNumericallyIndexedTable(profiles, toInfo.profile)) {
    profiles.unshift(toInfo.profile)
  }

  LSV.protected.Debug(`#profiles: ${tostring(profiles.length)}`)

  const toSavedVarsInfoList: SavedVarsInfo[] = []
  for (const profile of profiles) {
    LSV.protected.Debug(`profile: ${tostring(profile)}`)
    const toProfileSavedVarsInfo = asSavedVarsInfo({})
    ZO_ShallowTableCopy(toInfo, toProfileSavedVarsInfo)
    setmetatable(toProfileSavedVarsInfo, getmetatable(toInfo))
    toProfileSavedVarsInfo.profile = profile
    toSavedVarsInfoList.push(toProfileSavedVarsInfo)
  }

  LSV.protected.Debug(`#toSavedVarsInfoList: ${tostring(toSavedVarsInfoList.length)}`)

  const [toSavedVarsManagers, from] = LSV.protected.Migrate(
    keyTypeDefault,
    fromSavedVarsInfo,
    toSavedVarsInfoList[0],
    ...toSavedVarsInfoList.slice(1)
  )

  if (toSavedVarsManagers === undefined) {
    LSV.protected.Debug("toSavedVarsManagers is nil. Exiting MegaServer profiles migration.")
    return $multi(undefined, from)
  }
  const toSavedVarsManagersByProfile: Record<string, SavedVarsManagerInstance> = {}
  for (const i of $range(1, toSavedVarsManagers.length)) {
    const to = asManagerInstance(toSavedVarsManagers[i - 1])
    const profile = asString(asSavedVarsInfo(toSavedVarsInfoList[i - 1]).profile)
    toSavedVarsManagersByProfile[profile] = to

    LSV.protected.Debug(
      `Saved vars manager detected for ${tostring(to.name)} (${tostring(
        to.name === undefined ? undefined : asIndexable(_G)[to.name]
      )}) profile ${tostring(profile)}: path ${
        to.rawSavedVarsTablePath !== undefined
          ? table.concat(stringifyPath(to.rawSavedVarsTablePath), " > ")
          : ""
      } at index ${tostring(i)}`
    )
  }
  return $multi(toSavedVarsManagersByProfile, from)
}
