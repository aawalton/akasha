import { asAnyTable, asAnyTableMember, asBoolean, asMiniMapControl, asNumber } from "../casts"
import { holder, type VotansMiniMap } from "../holder"
import { state } from "./minimap-state"
import { GetScene, NoGamepad, NoOp, panZoom } from "./shared"

holder.GoWorldMapMode = function (this: VotansMiniMap, skipPanToPlayer?: boolean): undefined {
  const glob = asAnyTable(globalThis)
  this.StopFollowPlayer()
  if (WORLD_MAP_MANAGER.IsInMode(MAP_MODE_VOTANS_MINIMAP)) {
    state.lastZoom = -1
    state.moveToPlayer = ZO_WorldMap_JumpToPlayer
    asAnyTable(ZO_MapPin).UpdateSize = asAnyTableMember(state.orgUpdateSize)

    const orgZO_WorldMap_UpdateMap = ZO_WorldMap_UpdateMap
    const orgSetMapToPlayerLocation = SetMapToPlayerLocation
    glob.SetMapToPlayerLocation = asAnyTableMember(NoOp)
    ZO_WorldMap_UpdateMap = NoOp

    ZO_WorldMap_ClearCustomZoomLevels()
    WORLD_MAP_MANAGER.SetToMode(MAP_MODE_LARGE_CUSTOM)

    this.SetCurrentZoom(0)
    CALLBACK_MANAGER.FireCallbacks("OnWorldMapChanged", true)
    if (
      this.account.zoomToPlayer &&
      !(skipPanToPlayer != null && skipPanToPlayer !== false) &&
      DoesCurrentMapMatchMapForPlayerLocation()
    ) {
      ZO_WorldMap_JumpToPlayer()
    }

    glob.SetMapToPlayerLocation = asAnyTableMember(orgSetMapToPlayerLocation)
    ZO_WorldMap_UpdateMap = orgZO_WorldMap_UpdateMap

    asMiniMapControl(this.background).SetHidden(true)
  } else {
    if (WORLD_MAP_MANAGER.IsPreventingMapNavigation()) {
      panZoom().pendingInitializeMap = undefined
    }
  }
  this.UpdateBorder()
  WORLD_MAP_MANAGER.UpdateFloorAndLevelNavigation()
  let cachedMapMode: boolean | undefined
  function updateCachedMapMode(this: void): undefined {
    cachedMapMode = asBoolean(WORLD_MAP_MANAGER.IsInMode(MAP_MODE_VOTANS_MINIMAP))
  }

  ZO_PreHook(
    WORLD_MAP_MANAGER,
    "SetToMode",
    function (this: void, _manager: unknown, mode: unknown): undefined {
      if (mode === MAP_MODE_VOTANS_MINIMAP) {
        cachedMapMode = true
      } else if (mode !== MAP_MODE_VOTANS_MINIMAP && cachedMapMode === true) {
        cachedMapMode = false
      }
    }
  )

  updateCachedMapMode()

  ZO_PreHook(WORLD_MAP_MANAGER, "TryShowSpectacleMapHeader", function (this: void): boolean {
    if (cachedMapMode === true) {
      WORLD_MAP_MANAGER.ClearMapHeader()
      return true
    }
    return false
  })
}

{
  const tooltipControl = asAnyTable(GAMEPAD_WORLD_MAP_TOOLTIP_FRAGMENT.control)
  const orgGetLeft = tooltipControl.GetLeft
  tooltipControl.GetLeft = asAnyTableMember(function (this: AnyTable): unknown {
    const mode: unknown = WORLD_MAP_MANAGER.GetMode()
    if (mode !== MAP_MODE_VOTANS_MINIMAP) {
      return orgGetLeft(this)
    } else {
      const right = asNumber(asMiniMapControl(GAMEPAD_WORLD_MAP_INFO_FRAGMENT.control).GetRight())
      const padding = 50
      const width = asNumber(holder.account.width ?? asAnyTable(holder.modeData).width ?? 301)
      return width + right + padding
    }
  })
}

{
  const keybindBg = asAnyTable(ZO_KeybindStripGamepadBackgroundTexture)
  const orgGetHeight = keybindBg.GetHeight
  keybindBg.GetHeight = asAnyTableMember(function (this: AnyTable): unknown {
    const mode: unknown = WORLD_MAP_MANAGER.GetMode()
    if (mode !== MAP_MODE_VOTANS_MINIMAP) {
      return orgGetHeight(this)
    } else {
      return -100
    }
  })
}

{
  const ZO_MapPanAndZoom = panZoom()
  const orgZO_MapPanAndZoomUpdate = ZO_MapPanAndZoom.Update
  ZO_MapPanAndZoom.Update = asAnyTableMember(function (this: void, ...args: unknown[]): unknown {
    if (WORLD_MAP_MANAGER.IsInMode(MAP_MODE_VOTANS_MINIMAP)) {
      return NoGamepad(orgZO_MapPanAndZoomUpdate, ...args)
    }
    return orgZO_MapPanAndZoomUpdate(...args)
  })

  const orgZO_MapPanAndZoomSetCurrentZoom = ZO_MapPanAndZoom.SetCurrentNormalizedZoom
  ZO_MapPanAndZoom.SetCurrentNormalizedZoom = asAnyTableMember(function (
    this: void,
    ...args: unknown[]
  ): unknown {
    if (WORLD_MAP_MANAGER.IsInMode(MAP_MODE_VOTANS_MINIMAP)) {
      return NoGamepad(orgZO_MapPanAndZoomSetCurrentZoom, ...args)
    }
    return orgZO_MapPanAndZoomSetCurrentZoom(...args)
  })

  const orgZO_WorldMap_UpdateMap = ZO_WorldMap_UpdateMap
  ZO_WorldMap_UpdateMap = function (this: void, ...args: unknown[]): unknown {
    if (WORLD_MAP_MANAGER.IsInMode(MAP_MODE_VOTANS_MINIMAP)) {
      return NoGamepad(orgZO_WorldMap_UpdateMap, ...args)
    }
    return orgZO_WorldMap_UpdateMap(...args)
  }
}

export function ApplyModeStyle(this: void): undefined {
  ApplyTemplateToControl(ZO_WorldMapMapFrame, ZO_GetPlatformTemplate("ZO_WorldMapFrame"))
}

ZO_PreHook(WORLD_MAP_MANAGER, "UpdateFloorAndLevelNavigation", function (this: void):
  | boolean
  | undefined {
  if (WORLD_MAP_MANAGER.IsInMode(MAP_MODE_VOTANS_MINIMAP)) {
    ZO_WorldMapButtonsFloors_Keyboard.SetHidden(true)
    ZO_WorldMapButtonsFloors_Gamepad.SetHidden(true)
    ZO_WorldMapButtonsLevels_Gamepad.SetHidden(true)
    return true
  }
  return undefined
})

export { GetScene }
