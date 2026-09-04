import { LIB_IDENTIFIER } from "../map-data-constants/map-data-constants.module.code.ts"
import { INTERNAL, LIB } from "../map-data-lib-state/map-data-lib-state.module.code.ts"
import type { Internal } from "../map-data-types/map-data-types.module.code.ts"

function requireGps(this: void): LibGps3 {
  if (LibGPS3 === undefined) {
    error(`${LIB_IDENTIFIER} requires LibGPS`)
  }
  return LibGPS3
}

export function initMapUpdate(this: void): undefined {
  INTERNAL.FireCallbackEventZoneChanged = function (this: Internal): undefined {
    INTERNAL.dm("Debug", "Fire LMD Callback EVENT_ZONE_CHANGED")
    LIB.callbackObject.FireCallbacks(LIB.callbackType.EVENT_ZONE_CHANGED)
  }

  INTERNAL.FireCallbackWorldPositionChanged = function (this: Internal): undefined {
    INTERNAL.dm("Debug", "Fire LMD Callback EVENT_LINKED_WORLD_POSITION_CHANGED")
    LIB.callbackObject.FireCallbacks(LIB.callbackType.EVENT_LINKED_WORLD_POSITION_CHANGED)
  }

  INTERNAL.FireCallbackEventPlayerActivated = function (this: Internal): undefined {
    INTERNAL.dm("Debug", "Fire LMD Callback EVENT_PLAYER_ACTIVATED")
    LIB.callbackObject.FireCallbacks(LIB.callbackType.EVENT_PLAYER_ACTIVATED)
  }

  INTERNAL.FireCallbackOnWorldMapChanged = function (this: Internal): undefined {
    INTERNAL.dm("Debug", "Fire LMD Callback OnWorldMapChanged")
    LIB.callbackObject.FireCallbacks(LIB.callbackType.OnWorldMapChanged)
  }

  INTERNAL.FireCallbackWorldMapSceneStateChange = function (this: Internal): undefined {
    INTERNAL.dm("Debug", "Fire LMD Callback WorldMapSceneStateChange")
    LIB.callbackObject.FireCallbacks(LIB.callbackType.WorldMapSceneStateChange)
  }

  INTERNAL.SetWasSetMapToPlayerLocationCalledFalse = function (this: Internal): undefined {
    if (LIB.wasSetMapToPlayerLocationCalled) {
      LIB.wasSetMapToPlayerLocationCalled = false
      return
    }
    if (!LIB.wasSetMapToPlayerLocationCalled) {
      return
    }
  }

  INTERNAL.MapTextureMapIdUpdated = function (this: Internal): boolean {
    const unchanged = LIB.mapId === LIB.lastMapId && LIB.mapTexture === LIB.lastMapTexture
    return !unchanged
  }

  INTERNAL.CheckSetPlayerLocationQueue = function (this: Internal): undefined {
    if (ZO_WorldMap_IsWorldMapShowing()) return
    LIB.setMapToPlayerLocationQueueInProgress = true

    const timeElapsed = GetTimeStamp() - LIB.SetMapToPlayerLocationQueueStart
    if (timeElapsed > LIB.MAX_ATTEMPT_MAP_UPDATE_SECONDS) {
      LIB.SetMapToPlayerLocationQueueStart = 0
      LIB.setMapToPlayerLocationQueueInProgress = false
      INTERNAL.UpdateMapInfo()
    } else {
      const result = SetMapToPlayerLocation()
      if (result === SET_MAP_RESULT_MAP_CHANGED) {
        CALLBACK_MANAGER.FireCallbacks("OnWorldMapChanged")
      } else {
        zo_callLater(() => {
          INTERNAL.CheckSetPlayerLocationQueue()
        }, 1000)
      }
    }
  }

  INTERNAL.SetUpSetPlayerLocationQueue = function (this: Internal): undefined {
    if (ZO_WorldMap_IsWorldMapShowing()) return
    if (LIB.onPrepareForJumpInProgress) return
    if (LIB.setMapToPlayerLocationQueueInProgress) return
    if (LIB.onAddonLoadInProgress) return
    LIB.SetMapToPlayerLocationQueueStart = GetTimeStamp()
    INTERNAL.CheckSetPlayerLocationQueue()
  }

  INTERNAL.UpdateMapInfo = function (this: Internal): undefined {
    let mapType = MAPTYPE_NONE
    const mapTypeFound = GetMapType()
    if (mapTypeFound !== undefined) mapType = mapTypeFound

    const zoneIndex = GetCurrentMapZoneIndex()
    LIB.zoneIndex = zoneIndex
    LIB.mapIndex = GetCurrentMapIndex()
    LIB.SetMapIdFromAPI()
    const mapId = LIB.mapId ?? GetCurrentMapId()

    const [currentFloor, numFloors] = GetMapFloorInfo()
    LIB.currentFloor = currentFloor
    LIB.numFloors = numFloors

    const [zoneId, worldX, worldY, worldZ] = GetUnitWorldPosition("player")
    LIB.zoneId = zoneId
    LIB.worldX = worldX
    LIB.worldY = worldY
    LIB.worldZ = worldZ

    const [normalizedX, normalizedY] = GetNormalizedWorldPosition(zoneId, worldX, worldY, worldZ)
    LIB.normalizedX = normalizedX
    LIB.normalizedY = normalizedY

    const [libGPSX, libGPSY] = requireGps().LocalToGlobal(normalizedX, normalizedY)
    LIB.libGPSX = libGPSX
    LIB.libGPSY = libGPSY

    LIB.parentZoneMapId = LIB.GetParentMapIdFromZoneId(zoneId)
    LIB.mapType = mapType

    LIB.GetMapTileTextureFromMapId(mapId)

    const [, , mapContentType] = GetMapInfoById(mapId)
    LIB.isMainZone = mapType === MAPTYPE_ZONE
    LIB.isSubzone = mapType === MAPTYPE_SUBZONE
    const isWorld = mapType === MAPTYPE_WORLD
    const isCosmic = mapType === MAPTYPE_COSMIC
    LIB.isWorld = isWorld
    LIB.isCosmic = isCosmic
    LIB.isMacroMap = isWorld || isCosmic
    LIB.isDungeon = mapContentType === MAP_CONTENT_DUNGEON

    LIB.zoneName = GetZoneNameByIndex(zoneIndex)
    LIB.mapName = GetMapNameById(mapId)

    const subzoneName = GetPlayerActiveSubzoneName()
    LIB.subzoneName = subzoneName === "" ? undefined : subzoneName
  }
}
