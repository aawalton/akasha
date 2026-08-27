import { LIB_IDENTIFIER } from "./constants"
import { internal, lib } from "./lib-state"
import type { Internal } from "./types"

function requireGps(this: void): LibGps3 {
  if (LibGPS3 === undefined) {
    error(`${LIB_IDENTIFIER} requires LibGPS`)
  }
  return LibGPS3
}

export function initMapUpdate(this: void): undefined {
  internal.FireCallbackEventZoneChanged = function (this: Internal): undefined {
    internal.dm("Debug", "Fire LMD Callback EVENT_ZONE_CHANGED")
    lib.callbackObject.FireCallbacks(lib.callbackType.EVENT_ZONE_CHANGED)
  }

  internal.FireCallbackWorldPositionChanged = function (this: Internal): undefined {
    internal.dm("Debug", "Fire LMD Callback EVENT_LINKED_WORLD_POSITION_CHANGED")
    lib.callbackObject.FireCallbacks(lib.callbackType.EVENT_LINKED_WORLD_POSITION_CHANGED)
  }

  internal.FireCallbackEventPlayerActivated = function (this: Internal): undefined {
    internal.dm("Debug", "Fire LMD Callback EVENT_PLAYER_ACTIVATED")
    lib.callbackObject.FireCallbacks(lib.callbackType.EVENT_PLAYER_ACTIVATED)
  }

  internal.FireCallbackOnWorldMapChanged = function (this: Internal): undefined {
    internal.dm("Debug", "Fire LMD Callback OnWorldMapChanged")
    lib.callbackObject.FireCallbacks(lib.callbackType.OnWorldMapChanged)
  }

  internal.FireCallbackWorldMapSceneStateChange = function (this: Internal): undefined {
    internal.dm("Debug", "Fire LMD Callback WorldMapSceneStateChange")
    lib.callbackObject.FireCallbacks(lib.callbackType.WorldMapSceneStateChange)
  }

  internal.SetWasSetMapToPlayerLocationCalledFalse = function (this: Internal): undefined {
    if (lib.wasSetMapToPlayerLocationCalled) {
      lib.wasSetMapToPlayerLocationCalled = false
      return
    }
    if (!lib.wasSetMapToPlayerLocationCalled) {
      return
    }
  }

  internal.MapTextureMapIdUpdated = function (this: Internal): boolean {
    const unchanged = lib.mapId === lib.lastMapId && lib.mapTexture === lib.lastMapTexture
    return !unchanged
  }

  internal.CheckSetPlayerLocationQueue = function (this: Internal): undefined {
    if (ZO_WorldMap_IsWorldMapShowing()) return
    lib.setMapToPlayerLocationQueueInProgress = true

    const timeElapsed = GetTimeStamp() - lib.SetMapToPlayerLocationQueueStart
    if (timeElapsed > lib.MAX_ATTEMPT_MAP_UPDATE_SECONDS) {
      lib.SetMapToPlayerLocationQueueStart = 0
      lib.setMapToPlayerLocationQueueInProgress = false
      internal.UpdateMapInfo()
    } else {
      const result = SetMapToPlayerLocation()
      if (result === SET_MAP_RESULT_MAP_CHANGED) {
        CALLBACK_MANAGER.FireCallbacks("OnWorldMapChanged")
      } else {
        zo_callLater(() => {
          internal.CheckSetPlayerLocationQueue()
        }, 1000)
      }
    }
  }

  internal.SetUpSetPlayerLocationQueue = function (this: Internal): undefined {
    if (ZO_WorldMap_IsWorldMapShowing()) return
    if (lib.onPrepareForJumpInProgress) return
    if (lib.setMapToPlayerLocationQueueInProgress) return
    if (lib.onAddonLoadInProgress) return
    lib.SetMapToPlayerLocationQueueStart = GetTimeStamp()
    internal.CheckSetPlayerLocationQueue()
  }

  internal.UpdateMapInfo = function (this: Internal): undefined {
    let mapType = MAPTYPE_NONE
    const mapTypeFound = GetMapType()
    if (mapTypeFound !== undefined) mapType = mapTypeFound

    const zoneIndex = GetCurrentMapZoneIndex()
    lib.zoneIndex = zoneIndex
    lib.mapIndex = GetCurrentMapIndex()
    lib.SetMapIdFromAPI()
    const mapId = lib.mapId ?? GetCurrentMapId()

    const [currentFloor, numFloors] = GetMapFloorInfo()
    lib.currentFloor = currentFloor
    lib.numFloors = numFloors

    const [zoneId, worldX, worldY, worldZ] = GetUnitWorldPosition("player")
    lib.zoneId = zoneId
    lib.worldX = worldX
    lib.worldY = worldY
    lib.worldZ = worldZ

    const [normalizedX, normalizedY] = GetNormalizedWorldPosition(zoneId, worldX, worldY, worldZ)
    lib.normalizedX = normalizedX
    lib.normalizedY = normalizedY

    const [libGPSX, libGPSY] = requireGps().LocalToGlobal(normalizedX, normalizedY)
    lib.libGPSX = libGPSX
    lib.libGPSY = libGPSY

    lib.parentZoneMapId = lib.GetParentMapIdFromZoneId(zoneId)
    lib.mapType = mapType

    lib.GetMapTileTextureFromMapId(mapId)

    const [, , mapContentType] = GetMapInfoById(mapId)
    lib.isMainZone = mapType === MAPTYPE_ZONE
    lib.isSubzone = mapType === MAPTYPE_SUBZONE
    const isWorld = mapType === MAPTYPE_WORLD
    const isCosmic = mapType === MAPTYPE_COSMIC
    lib.isWorld = isWorld
    lib.isCosmic = isCosmic
    lib.isMacroMap = isWorld || isCosmic
    lib.isDungeon = mapContentType === MAP_CONTENT_DUNGEON

    lib.zoneName = GetZoneNameByIndex(zoneIndex)
    lib.mapName = GetMapNameById(mapId)

    const subzoneName = GetPlayerActiveSubzoneName()
    lib.subzoneName = subzoneName === "" ? undefined : subzoneName
  }
}
