import { asMapNamesTable } from "./casts"
import { internalState } from "./internal-state"
import { lib } from "./lib-state"
import type { Lib } from "./types"

function getCurrentZoneAndGroupStatus(
  this: void
): LuaMultiReturn<[boolean, boolean, boolean, boolean, boolean, boolean, number]> {
  let isInPublicDungeon = false
  let isInGroupDungeon = false
  const playerVar = "player"

  const isInPVP = IsPlayerInAvAWorld()
  let isInAnyDungeon = IsAnyGroupMemberInDungeon()
  const isInGroup = IsUnitGrouped(playerVar)
  const groupSize = GetGroupSize()
  const isInRaid = IsPlayerInRaid()
  const isNotInRaidChecks = !isInRaid && groupSize <= SMALL_GROUP_SIZE_THRESHOLD
  let isInDelve = false

  if (!isInAnyDungeon) {
    isInAnyDungeon = IsUnitInDungeon(playerVar) || GetMapContentType() === MAP_CONTENT_DUNGEON
  }

  if (isInAnyDungeon && isNotInRaidChecks) {
    const dungeonDifficulty = ZO_WorldMap_GetMapDungeonDifficulty()
    if (dungeonDifficulty > DUNGEON_DIFFICULTY_NONE) {
      isInGroupDungeon = true
    } else {
      const [, , , , mapId] = lib.GetCurrentZoneIds()
      isInPublicDungeon = lib.publicDungeonMapIds[mapId] ?? false
      isInDelve = !isInPublicDungeon
    }
  }

  return $multi(
    isInPVP,
    isInDelve,
    isInPublicDungeon,
    isInGroupDungeon,
    isInRaid,
    isInGroup,
    groupSize
  )
}

export function initDungeonStatus(this: void): undefined {
  lib.GetCurrentZoneAndGroupStatus = function (
    this: Lib
  ): LuaMultiReturn<[boolean, boolean, boolean, boolean, boolean, boolean, number]> {
    return getCurrentZoneAndGroupStatus()
  }

  lib.IsInDelve = function (this: Lib): boolean {
    const [, isInDelve] = getCurrentZoneAndGroupStatus()
    return isInDelve
  }

  lib.IsInPublicDungeon = function (this: Lib): boolean {
    const [, , isInPublicDungeon] = getCurrentZoneAndGroupStatus()
    return isInPublicDungeon
  }

  lib.IsInGroupDungeon = function (this: Lib): boolean {
    const [, , , isInGroupDungeon] = getCurrentZoneAndGroupStatus()
    return isInGroupDungeon
  }

  lib.IsInTrial = function (this: Lib): boolean {
    const [, , , , isInRaid] = getCurrentZoneAndGroupStatus()
    return isInRaid
  }

  lib.IsInAnyDungeon = function (this: Lib): boolean {
    const [, isInDelve, isInPublicDungeon, isInGroupDungeon, isInRaid] =
      getCurrentZoneAndGroupStatus()
    return isInDelve || isInPublicDungeon || isInGroupDungeon || isInRaid
  }

  lib.GetCurrentDungeonType = function (
    this: Lib
  ): LuaMultiReturn<[boolean, boolean, boolean, boolean]> {
    const [, isInDelve, isInPublicDungeon, isInGroupDungeon, isInRaid] =
      getCurrentZoneAndGroupStatus()
    return $multi(isInDelve, isInPublicDungeon, isInGroupDungeon, isInRaid)
  }

  lib.IsInHouse = function (this: Lib): boolean {
    const currentHouseOwner = GetCurrentHouseOwner()
    const inHouse = currentHouseOwner !== "" && GetCurrentZoneHouseId() !== 0
    if (!inHouse) {
      const [x, y, z, rotRad] = GetPlayerWorldPositionInHouse()
      if (x === 0 && y === 0 && z === 0 && rotRad === 0) {
        return false
      }
    }
    return true
  }

  lib.IsInCyrodiil = function (this: Lib): boolean {
    return IsInCyrodiil()
  }

  lib.IsInImperialCity = function (this: Lib): boolean {
    return IsInImperialCity()
  }

  lib.IsInBattleground = function (this: Lib): boolean {
    return IsActiveWorldBattleground()
  }

  lib.IsInPVP = function (this: Lib): boolean {
    return IsPlayerInAvAWorld()
  }

  lib.GetMapNames = function (this: Lib, override?: boolean): Record<number, string> {
    const doOverride = override ?? false
    if (internalState.mapNamesWereBuild && !doOverride) return lib.mapId2Name
    for (const mapId of $range(1, lib.maxMapIds)) {
      const mapName = ZO_CachedStrFormat("<<C:1>>", GetMapNameById(mapId))
      if (mapName !== "") {
        lib.mapId2Name[mapId] = mapName
      }
    }
    internalState.mapNamesWereBuild = true
    if (internalState.isAddonDevOfLibZone) {
      const localizedZoneData = lib.localizedZoneData
      const mapNames = asMapNamesTable(localizedZoneData.mapNames ?? {})
      localizedZoneData.mapNames = mapNames
      const apiV = lib.currentAPIVersion
      mapNames[apiV] = mapNames[apiV] ?? {}
      mapNames[apiV][lib.currentClientLanguage] = lib.mapId2Name
    }
    return lib.mapId2Name
  }
}
