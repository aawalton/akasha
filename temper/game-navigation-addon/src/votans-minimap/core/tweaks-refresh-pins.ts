import { asAnyTable, asAnyTableMember, asNumber } from "../casts"
import type { VotansMiniMap } from "../holder"
import { createAsyncTask, GetScene, pins } from "./shared"
import { asMiniMapPinManager } from "../casts"
import { type WayshrineCell, zoomDone } from "./tweaks-shared"

export function installRefreshAllPOIs(this: void): undefined {
  const task = createAsyncTask("VOTAN_RefreshAllPOIs")

  let zoneIndex = 0
  let createTag: (this: void, ...args: unknown[]) => unknown

  function DrawPin(this: void, poiIndex: number): undefined {
    const [
      xLoc,
      zLoc,
      iconType,
      icon,
      isShownInCurrentMap,
      linkedCollectibleIsLocked,
      isDiscovered,
      isNearby,
    ] = GetPOIMapInfo(zoneIndex, poiIndex)

    if (
      isShownInCurrentMap &&
      (isDiscovered || isNearby) &&
      asAnyTable(asAnyTable(ZO_MapPin).POI_PIN_TYPES)[iconType] != null
    ) {
      const poiType = GetPOIType(zoneIndex, poiIndex)

      if (iconType !== MAP_PIN_TYPE_POI_SEEN) {
        if (
          poiType === POI_TYPE_WAYSHRINE ||
          poiType === POI_TYPE_HOUSE ||
          poiType === POI_TYPE_GROUP_DUNGEON
        ) {
          return
        }
      }

      const pm = asMiniMapPinManager(pins())
      pm.RemovePins("poi", zoneIndex, poiIndex)
      const worldEventInstanceId = GetPOIWorldEventInstanceId(zoneIndex, poiIndex)
      if (worldEventInstanceId !== 0) {
        pm.RemovePins("worldEventPOI", worldEventInstanceId)
      }

      const tag = createTag(zoneIndex, poiIndex, icon, linkedCollectibleIsLocked)
      pm.CreatePin(iconType, tag, xLoc, zLoc)

      if (worldEventInstanceId !== 0) {
        const worldEventTag = asAnyTable(ZO_MapPin).CreateWorldEventPOIPinTag(
          worldEventInstanceId,
          zoneIndex,
          poiIndex
        )
        pm.CreatePin(MAP_PIN_TYPE_WORLD_EVENT_POI_ACTIVE, worldEventTag, xLoc, zLoc)
      }
    }
  }

  function RemovePins(this: void, asyncTask: AnyAsyncTask): undefined {
    const pm = asMiniMapPinManager(pins())
    pm.RemovePins("poi")
    pm.RemovePins("worldEventPOI")

    zoneIndex = GetCurrentMapZoneIndex()
    if (zoneIndex <= 1 || zoneIndex >= 2147483648) {
      return
    }
    if (!ZO_WorldMap_IsPinGroupShown(MAP_FILTER_OBJECTIVES)) {
      return
    }
    asyncTask.WaitUntil(zoomDone).Then(function (this: void, innerTask: AnyAsyncTask): undefined {
      innerTask.For(1, GetNumPOIs(zoneIndex)).Do(DrawPin)
    })
  }
  ZO_WorldMap_RefreshAllPOIs = function (this: void): undefined {
    createTag = asAnyTable(ZO_MapPin).CreatePOIPinTag
    task.Cancel().StopTimer().Call(RemovePins)
  }

  return undefined
}

export function installRefreshWayshrines(
  this: void,
  self: VotansMiniMap,
  cell: WayshrineCell
): undefined {
  const task = createAsyncTask("VOTAN_RefreshWayshrines")

  function IsShowingCosmicMap(this: void): boolean {
    return GetMapType() === MAPTYPE_COSMIC
  }

  const orgZO_WorldMap_PanToWayshrine = ZO_WorldMap_PanToWayshrine
  let running = false
  function GoPendingWayshrine(this: void): undefined {
    running = false
    if (cell.node != null) {
      orgZO_WorldMap_PanToWayshrine(cell.node)
      cell.node = undefined
    }
  }

  let g_fastTravelNodeIndex: number
  let isShowingWayshrines: boolean
  let isShowingDungeons: boolean
  let isShowingTrials: boolean
  let isShowingHouses: boolean
  let showPriorityFastTravelOnly: boolean
  let priorityWayshrinesByZone: AnyTable

  function DrawPin(this: void, nodeIndex: number): undefined {
    const [
      known,
      _name,
      normalizedX,
      normalizedY,
      icon,
      glowIconArg,
      poiType,
      isLocatedInCurrentMap,
      linkedCollectibleIsLocked,
    ] = GetFastTravelNodeInfo(nodeIndex)
    let glowIcon: string | undefined = glowIconArg
    const [zoneIdx, poiIndex] = GetFastTravelNodePOIIndicies(nodeIndex)
    const instanceType = GetPOIInstanceType(zoneIdx, poiIndex)

    let passesFilter = false
    if (poiType === POI_TYPE_HOUSE) {
      passesFilter = isShowingHouses
    } else if (poiType === POI_TYPE_WAYSHRINE) {
      passesFilter = isShowingWayshrines
    } else if (instanceType === INSTANCE_TYPE_RAID) {
      passesFilter = isShowingTrials
    } else {
      passesFilter = isShowingDungeons
    }

    if (
      passesFilter &&
      known &&
      isLocatedInCurrentMap &&
      ZO_WorldMap_IsNormalizedPointInsideMapBounds(normalizedX, normalizedY)
    ) {
      let suppressPin = false
      if (showPriorityFastTravelOnly) {
        if (poiType === POI_TYPE_HOUSE) {
          const houseId = GetFastTravelNodeHouseId(nodeIndex)
          if (!IsPrimaryHouse(houseId)) {
            const collectibleId = GetCollectibleIdForHouse(houseId)
            const userFlags = GetCollectibleUserFlags(collectibleId)
            if (!ZO_FlagHelpers.MaskHasFlag(userFlags, COLLECTIBLE_USER_FLAG_FAVORITE)) {
              suppressPin = true
            }
          }
        }
      }

      if (!suppressPin) {
        const isCurrentLoc = g_fastTravelNodeIndex === nodeIndex

        if (isCurrentLoc) {
          glowIcon = undefined
        }

        const tag = asAnyTable(ZO_MapPin).CreateTravelNetworkPinTag(
          nodeIndex,
          icon,
          glowIcon,
          linkedCollectibleIsLocked
        )
        const pinType = isCurrentLoc
          ? MAP_PIN_TYPE_FAST_TRAVEL_WAYSHRINE_CURRENT_LOC
          : MAP_PIN_TYPE_FAST_TRAVEL_WAYSHRINE
        let mapPriority: number | undefined
        if (showPriorityFastTravelOnly && poiType === POI_TYPE_WAYSHRINE) {
          mapPriority = GetFastTravelNodeMapPriority(nodeIndex)
        }

        if (mapPriority != null) {
          if (IsFastTravelNodeAutoDiscovered(nodeIndex)) {
            mapPriority = mapPriority + 0.5
          }

          const existing = priorityWayshrinesByZone[zoneIdx]
          const existingInfo = existing != null ? asAnyTable(existing) : undefined

          if (existingInfo == null || asNumber(existingInfo.mapPriority) < mapPriority) {
            const priorityWayshrineInfo = existingInfo ?? asAnyTable({})
            if (existingInfo == null) {
              priorityWayshrinesByZone[zoneIdx] = asAnyTableMember(priorityWayshrineInfo)
            }
            priorityWayshrineInfo.mapPriority = asAnyTableMember(mapPriority)
            priorityWayshrineInfo.pinType = asAnyTableMember(pinType)
            priorityWayshrineInfo.tag = tag
            priorityWayshrineInfo.normalizedX = asAnyTableMember(normalizedX)
            priorityWayshrineInfo.normalizedY = asAnyTableMember(normalizedY)
          }
        } else {
          asMiniMapPinManager(pins()).CreatePin(pinType, tag, normalizedX, normalizedY)
        }
      }
    }
  }
  function RemovePins(this: void, asyncTask: AnyAsyncTask): undefined {
    asMiniMapPinManager(pins()).RemovePins("fastTravelWayshrine")
    if (IsShowingCosmicMap()) {
      return
    }

    isShowingWayshrines = ZO_WorldMap_IsPinGroupShown(MAP_FILTER_WAYSHRINES)
    isShowingDungeons = ZO_WorldMap_IsPinGroupShown(MAP_FILTER_DUNGEONS)
    isShowingTrials = ZO_WorldMap_IsPinGroupShown(MAP_FILTER_TRIALS)
    isShowingHouses = ZO_WorldMap_IsPinGroupShown(MAP_FILTER_HOUSES)
    if (!(isShowingWayshrines || isShowingDungeons || isShowingTrials || isShowingHouses)) {
      return
    }

    showPriorityFastTravelOnly =
      (!self.account.showAllTravelNodes && ShouldMapShowPriorityFastTravelOnly()) || false
    priorityWayshrinesByZone = asAnyTable(showPriorityFastTravelOnly ? {} : false)

    g_fastTravelNodeIndex = ZO_Map_GetFastTravelNode()
    asyncTask.WaitUntil(zoomDone).Then(function (this: void, innerTask: AnyAsyncTask): undefined {
      innerTask.For(1, GetNumFastTravelNodes()).Do(DrawPin)
    })
    if (!showPriorityFastTravelOnly) {
      return
    }
    asyncTask.Then(function (this: void, innerTask: AnyAsyncTask): undefined {
      innerTask.For(pairs(priorityWayshrinesByZone)).Do(function (
        this: void,
        _key: unknown,
        info: AnyTable
      ): undefined {
        const pm = asMiniMapPinManager(pins())
        pm.CreatePin(info.pinType, info.tag, info.normalizedX, info.normalizedY)
      })
    })
  }
  ZO_WorldMap_RefreshWayshrines = function (this: void): undefined {
    running = true
    task.Cancel().Call(RemovePins).Then(GoPendingWayshrine)
  }

  ZO_WorldMap_PanToWayshrine = function (this: void, nodeIndex: number): unknown {
    if (running) {
      cell.node = nodeIndex
      return undefined
    } else {
      cell.node = undefined
      return orgZO_WorldMap_PanToWayshrine(nodeIndex)
    }
  }

  const orgZO_WorldMap_SetMapByIndex = WORLD_MAP_MANAGER.SetMapByIndex
  WORLD_MAP_MANAGER.SetMapByIndex = asAnyTableMember(function (
    this: void,
    manager: unknown,
    mapIndex: number
  ): unknown {
    running = running || GetCurrentMapIndex() !== mapIndex
    return orgZO_WorldMap_SetMapByIndex(manager, mapIndex)
  })

  return undefined
}

export function installRefreshLocations(this: void): undefined {
  if (ZO_MapLocationPins_Manager) {
    const task = createAsyncTask("VOTAN_RefreshLocations")

    let locations: AnyTable
    function DrawPin(this: void, i: number): undefined {
      asMiniMapPinManager(locations).AddLocation(i)
    }
    function releaseAllObjects(this: void): undefined {
      asMiniMapPinManager(locations).ReleaseAllObjects()
    }
    function removePins(this: void, asyncTask: AnyAsyncTask): undefined {
      asMiniMapPinManager(pins()).RemovePins("loc")
      asyncTask.WaitUntil(zoomDone).Then(function (this: void, innerTask: AnyAsyncTask): undefined {
        innerTask.For(1, GetNumMapLocations()).Do(DrawPin)
      })
    }
    function delayStart(this: void, asyncTask: AnyAsyncTask): undefined {
      asyncTask.Call(releaseAllObjects).Then(removePins)
    }
    function start(this: void, asyncTask: AnyAsyncTask): undefined {
      if (GetScene().IsShowing()) {
        asyncTask.Call(delayStart)
      } else {
        asyncTask.Delay(200, delayStart)
      }
    }
    ZO_MapLocationPins_Manager.RefreshLocations = asAnyTableMember(function (
      this: AnyTable
    ): undefined {
      locations = this
      task.Cancel().WaitUntil(zoomDone).Then(start)
    })
  }

  return undefined
}
