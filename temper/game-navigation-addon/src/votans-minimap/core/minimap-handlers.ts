import {
  asAnyAsyncTask,
  asAnyTable,
  asAnyTableMember,
  asFocusZoomSlot,
  asMiniMapCallbackManager,
  asMiniMapControl,
  asMiniMapPanAndZoom,
  asMiniMapScene,
  asNumber,
} from "../casts"
import { holder, type VotansMiniMap } from "../holder"
import {
  ClearMouseoverText,
  newUpdateSize,
  SaveMapPosition,
  SetMapTitle,
  SetMapTitleCurrentLocation,
  state,
} from "./minimap-state"
import { exportedUpdateMap } from "./minimap-update"
import { NoOp } from "./shared"

const em = EVENT_MANAGER
const async = LibAsync

export function installHandlers(this: void, self: VotansMiniMap): undefined {
  function ZoneChanged(
    this: void,
    _event: unknown,
    zoneName: string,
    subZoneName: string
  ): undefined {
    if (!WORLD_MAP_MANAGER.IsInMode(MAP_MODE_VOTANS_MINIMAP)) {
      return
    }
    ZO_WorldMapTitle.SetText(SetMapTitle(zoneName, subZoneName))
  }
  em.RegisterForEvent(self.name, EVENT_ZONE_CHANGED, ZoneChanged)

  const orgZO_WorldMap_GetMapTitle = ZO_WorldMap_GetMapTitle
  ZO_WorldMap_GetMapTitle = function (this: void, ...args: unknown[]): unknown {
    if (
      WORLD_MAP_MANAGER.IsInMode(MAP_MODE_VOTANS_MINIMAP) &&
      DoesCurrentMapMatchMapForPlayerLocation()
    ) {
      return SetMapTitleCurrentLocation()
    }
    return orgZO_WorldMap_GetMapTitle(...args)
  }

  {
    const HEADER_INFO: AnyTable = asAnyTable({
      nameText: "",
      descriptionText: "",
      owner: self.name,
      showProgressBar: false,
    })
    holder.SetMapHeader = function (this: VotansMiniMap): undefined {
      if (WORLD_MAP_MANAGER.IsInMode(MAP_MODE_VOTANS_MINIMAP)) {
        WORLD_MAP_MANAGER.SetMapHeader(HEADER_INFO)
      }
    }
    const orgTryShowSpectacleMapHeader = ZO_WorldMapManager.TryShowSpectacleMapHeader
    function newTryShowSpectacleMapHeader(this: void, manager: WorldMapManager): unknown {
      if (asNumber(manager.GetMode()) === MAP_MODE_VOTANS_MINIMAP) {
        return undefined
      } else {
        return orgTryShowSpectacleMapHeader(manager)
      }
    }
    ZO_WorldMapManager.TryShowSpectacleMapHeader = asAnyTableMember(newTryShowSpectacleMapHeader)
  }

  {
    function DoIt(
      this: void,
      orgZO_WorldMap_UpdateMap: (this: void, ...a: unknown[]) => unknown,
      skipWorldMapUpdate?: boolean
    ): undefined {
      asMiniMapCallbackManager(CALLBACK_MANAGER).UnregisterCallback(
        "OnWorldMapModeChanged",
        DoIt,
        orgZO_WorldMap_UpdateMap
      )
      if (WORLD_MAP_MANAGER.inSpecialMode) {
        ZO_WorldMap_UpdateMap = NoOp
        EndInteraction(INTERACTION_FAST_TRAVEL_KEEP)
        EndInteraction(INTERACTION_FAST_TRAVEL)
      }

      asAnyTable(ZO_MapPin).UpdateSize = asAnyTableMember(newUpdateSize)
      ZO_WorldMap_UpdateMap =
        skipWorldMapUpdate != null && skipWorldMapUpdate !== false ? NoOp : orgZO_WorldMap_UpdateMap
      WORLD_MAP_MANAGER.SetToMode(MAP_MODE_VOTANS_MINIMAP)
      ZO_WorldMap_ClearCustomZoomLevels()
      ZO_WorldMap_UpdateMap = orgZO_WorldMap_UpdateMap

      asMiniMapControl(self.background).SetHidden(false)

      ZO_WorldMap.StopMovingOrResizing()
      ZO_WorldMap_MouseUp()
      state.moveToPlayer = ZO_WorldMap_JumpToPlayer
      self.RestorePosition()
      self.UpdateBorder()
      ClearMouseoverText()
      state.lastZoom = -1
      self.SetMapHeader()
    }
    holder.GoMiniMapMode = function (this: VotansMiniMap, skipWorldMapUpdate?: boolean): undefined {
      const orgZO_WorldMap_UpdateMap = ZO_WorldMap_UpdateMap

      const mode = asNumber(WORLD_MAP_MANAGER.GetMode())
      if (mode !== MAP_MODE_VOTANS_MINIMAP) {
        if (WORLD_MAP_MANAGER.inSpecialMode) {
          if (mode !== MAP_MODE_KEEP_TRAVEL && mode !== MAP_MODE_FAST_TRAVEL) {
            ClearMouseoverText()

            ZO_WorldMap_UpdateMap = NoOp
            WORLD_MAP_MANAGER.SetToMode(MAP_MODE_VOTANS_MINIMAP)
            ZO_WorldMap_UpdateMap = orgZO_WorldMap_UpdateMap

            asMiniMapControl(self.background).SetHidden(false)

            this.RestorePosition()
            this.UpdateBorder()
          } else {
            asMiniMapCallbackManager(CALLBACK_MANAGER).RegisterCallback(
              "OnWorldMapModeChanged",
              DoIt,
              orgZO_WorldMap_UpdateMap,
              skipWorldMapUpdate
            )
            EndInteraction(INTERACTION_FAST_TRAVEL_KEEP)
            EndInteraction(INTERACTION_FAST_TRAVEL)
          }
        } else {
          DoIt(orgZO_WorldMap_UpdateMap, skipWorldMapUpdate)
        }
      } else {
        SetMapTitleCurrentLocation()
      }
      WORLD_MAP_MANAGER.UpdateFloorAndLevelNavigation()

      this.StartFollowPlayer()
    }
  }

  {
    const orgZO_WorldMap_OnResizeStop = ZO_WorldMap_OnResizeStop
    ZO_WorldMap_OnResizeStop = function (this: void, ...args: unknown[]): undefined {
      orgZO_WorldMap_OnResizeStop(...args)
      if (WORLD_MAP_MANAGER.IsInMode(MAP_MODE_VOTANS_MINIMAP)) {
        SaveMapPosition()
      }
    }
  }

  {
    const orgZO_WorldMapTitleBar_OnMouseUp = ZO_WorldMapTitleBar_OnMouseUp
    ZO_WorldMapTitleBar_OnMouseUp = function (this: void, ...args: unknown[]): undefined {
      orgZO_WorldMapTitleBar_OnMouseUp(...args)
      SaveMapPosition()
      {
        const [cw, ch] = ZO_WorldMapContainer.GetDimensions()
        ZO_WorldMapContainer.SetDimensions(cw, ch)
      }
      {
        const [sw, sh] = ZO_WorldMapScroll.GetDimensions()
        ZO_WorldMapScroll.SetDimensions(sw, sh)
      }
      exportedUpdateMap.fn(true)
    }
  }

  {
    function WorldMapStateChanged(this: void, _oldState: unknown, newState: unknown): undefined {
      if (newState === SCENE_FRAGMENT_SHOWING) {
        self.GoWorldMapMode()
      } else if (newState === SCENE_FRAGMENT_SHOWN) {
        asAnyTable(WORLD_MAP_FRAGMENT).duration = asAnyTableMember(100)
      } else if (newState === SCENE_FRAGMENT_HIDING) {
        self.GoMiniMapMode(asNumber(WORLD_MAP_MANAGER.GetMode()) <= MAP_MODE_LARGE_CUSTOM)
      } else if (newState === SCENE_FRAGMENT_HIDDEN) {
        asAnyTable(WORLD_MAP_FRAGMENT).duration = asAnyTableMember(0)
      }
    }
    asMiniMapScene(WORLD_MAP_SCENE).RegisterCallback("StateChange", WorldMapStateChanged)
    asMiniMapScene(GAMEPAD_WORLD_MAP_SCENE).RegisterCallback("StateChange", WorldMapStateChanged)
    asMiniMapScene(SCRYING_SCENE).RegisterCallback("StateChange", WorldMapStateChanged)
  }

  {
    function SiegeStateChanged(this: void, _oldState: unknown, newState: unknown): undefined {
      if (newState === SCENE_FRAGMENT_SHOWING) {
        self.GoMiniMapMode(asNumber(WORLD_MAP_MANAGER.GetMode()) <= MAP_MODE_LARGE_CUSTOM)
      }
    }
    asMiniMapScene(SIEGE_BAR_SCENE).RegisterCallback("StateChange", SiegeStateChanged)
  }

  {
    function WorldFragmentStateChanged(
      this: void,
      _oldState: unknown,
      newState: unknown
    ): undefined {
      if (newState === SCENE_FRAGMENT_SHOWING) {
        if (self.account.showClock) {
          em.RegisterForUpdate("VOTAN_MAP_CLOCK", 5000, holder.ShowClock)
          holder.ShowClock()
        }
        self.SetMapHeader()
      } else if (newState === SCENE_FRAGMENT_HIDING) {
        em.UnregisterForUpdate("VOTAN_MAP_CLOCK")
      }
      const hidden = !self.account.showClock
      asMiniMapControl(self.clockRealTime).SetHidden(hidden)
      asMiniMapControl(self.clockInGame).SetHidden(hidden)
    }
    asMiniMapScene(WORLD_MAP_FRAGMENT).RegisterCallback("StateChange", WorldFragmentStateChanged)
  }

  {
    const orgRefreshMapFrameAnchor = ZO_WorldMapManager.RefreshMapFrameAnchor
    function newRefreshMapFrameAnchor(
      this: void,
      manager: WorldMapManager,
      ...args: unknown[]
    ): unknown {
      if (manager.IsInMode(MAP_MODE_VOTANS_MINIMAP)) {
        self.RestorePosition()
        return undefined
      }
      return orgRefreshMapFrameAnchor(manager, ...args)
    }
    ZO_WorldMapManager.RefreshMapFrameAnchor = asAnyTableMember(newRefreshMapFrameAnchor)
  }

  {
    const orgZO_WorldMap_PushSpecialMode = ZO_WorldMapManager.PushSpecialMode
    function newPushSpecialMode(
      this: void,
      manager: AnyTable,
      mode: number,
      ...args: unknown[]
    ): unknown {
      if (manager.inSpecialMode) {
        return orgZO_WorldMap_PushSpecialMode(manager, mode, ...args)
      }
      const zoomOut = mode === MAP_MODE_FAST_TRAVEL || mode === MAP_MODE_KEEP_TRAVEL
      const orgZO_WorldMap_UpdateMap = ZO_WorldMap_UpdateMap
      if (WORLD_MAP_MANAGER.IsInMode(MAP_MODE_VOTANS_MINIMAP)) {
        ZO_WorldMap_UpdateMap = NoOp
        self.GoWorldMapMode(zoomOut)
      }
      if (zoomOut && GetMapType() === MAPTYPE_SUBZONE) {
        asAnyAsyncTask(state.asyncCallbacks).Cancel()
        MapZoomOut()

        ZO_WorldMap_UpdateMap = NoOp
        orgZO_WorldMap_PushSpecialMode(manager, mode, ...args)

        ZO_WorldMap_UpdateMap = orgZO_WorldMap_UpdateMap
        CALLBACK_MANAGER.FireCallbacks("OnWorldMapChanged", true)
        return undefined
      }
      ZO_WorldMap_UpdateMap = orgZO_WorldMap_UpdateMap
      return orgZO_WorldMap_PushSpecialMode(manager, mode, ...args)
    }
    ZO_WorldMapManager.PushSpecialMode = asAnyTableMember(newPushSpecialMode)
  }

  {
    const orgZO_WorldMap_ShowWorldMap = ZO_WorldMap_ShowWorldMap
    ZO_WorldMap_ShowWorldMap = function (this: void, ...args: unknown[]): unknown {
      if (WORLD_MAP_MANAGER.IsInMode(MAP_MODE_VOTANS_MINIMAP)) {
        self.GoWorldMapMode()
      }
      return orgZO_WorldMap_ShowWorldMap(...args)
    }
  }

  {
    function QuestTrackerRefreshedMapPins(this: void): undefined {
      if (!ZO_WorldMap_IsWorldMapShowing() && !DoesCurrentMapMatchMapForPlayerLocation()) {
        if (SetMapToPlayerLocation() === SET_MAP_RESULT_MAP_CHANGED) {
          CALLBACK_MANAGER.FireCallbacks("OnWorldMapChanged")
        }
      }
    }
    asMiniMapScene(FOCUSED_QUEST_TRACKER).RegisterCallback(
      "QuestTrackerRefreshedMapPins",
      QuestTrackerRefreshedMapPins
    )
  }

  {
    const handlers = ZO_AlertText_GetHandlers()
    const orgZoneChange = handlers[EVENT_ZONE_CHANGED]
    function newZoneChangeHandler(this: void, ...args: unknown[]): unknown {
      const mode = self.account.zoneAlertMode
      if (mode === self.zoneAlertMode.Never) {
        return undefined
      }
      if (
        mode === self.zoneAlertMode.MiniMapHidden &&
        asMiniMapScene(WORLD_MAP_FRAGMENT).IsShowing()
      ) {
        return undefined
      }
      return orgZoneChange?.(...args)
    }
    handlers[EVENT_ZONE_CHANGED] = asAnyTableMember(newZoneChangeHandler)
  }

  {
    const ZO_MapPanAndZoom = asAnyTable(
      asAnyTable(getmetatable(ZO_WorldMap_GetPanAndZoom())).__index
    )
    function IsNormalizedPointInsideMapBounds(this: void, x: number, y: number): boolean {
      return x > 0 && x < 1 && y > 0 && y < 1
    }
    function FocusZoomAndOffset(
      this: void,
      panZoomArg: AnyTable,
      normalizedXArg: number | undefined,
      normalizedYArg: number | undefined
    ): LuaMultiReturn<[number, number, number]> | undefined {
      let normalizedX = normalizedXArg
      let normalizedY = normalizedYArg
      const mapId = GetMapTileTexture()
      const fixed = self.account.fixedMaps[mapId]
      if (fixed != null) {
        ;[normalizedX, normalizedY] = unpack(fixed)
      }

      if (
        normalizedX != null &&
        normalizedY != null &&
        IsNormalizedPointInsideMapBounds(normalizedX, normalizedY)
      ) {
        const targetNormalizedZoom = 1
        const curvedTargetZoom = asNumber(
          asMiniMapPanAndZoom(panZoomArg).ComputeCurvedZoom(targetNormalizedZoom)
        )

        const zoomedNX = normalizedX * curvedTargetZoom
        const zoomedNY = normalizedY * curvedTargetZoom
        const borderSizeN = (curvedTargetZoom - 1) * 0.5
        let offsetNX = 0.5 + borderSizeN - zoomedNX
        let offsetNY = 0.5 + borderSizeN - zoomedNY

        const allowPan: unknown = panZoomArg.allowPanPastMapEdge
        if (allowPan == null || allowPan === false) {
          offsetNX = zo_clamp(offsetNX, -borderSizeN, borderSizeN)
          offsetNY = zo_clamp(offsetNY, -borderSizeN, borderSizeN)
        }

        const [units] = ZO_WorldMapScroll.GetDimensions()
        const offsetX = offsetNX * units
        const offsetY = offsetNY * units

        return $multi(targetNormalizedZoom, offsetX, offsetY)
      }
      return undefined
    }
    const panZoomSlot = asFocusZoomSlot(ZO_MapPanAndZoom)
    const orgGetNormalizedPositionFocusZoomAndOffset =
      panZoomSlot.GetNormalizedPositionFocusZoomAndOffset
    function newGetNormalizedPositionFocusZoomAndOffset(
      this: void,
      panZoom: AnyTable,
      normalizedX: number,
      normalizedY: number,
      useCurrentZoom?: unknown
    ): LuaMultiReturn<[number, number, number]> | undefined {
      if (asNumber(WORLD_MAP_MANAGER.GetMode()) !== MAP_MODE_VOTANS_MINIMAP) {
        return orgGetNormalizedPositionFocusZoomAndOffset(
          panZoom,
          normalizedX,
          normalizedY,
          useCurrentZoom
        )
      }
      return FocusZoomAndOffset(panZoom, normalizedX, normalizedY)
    }
    panZoomSlot.GetNormalizedPositionFocusZoomAndOffset = newGetNormalizedPositionFocusZoomAndOffset
  }

  {
    function refreshFragment(this: void): undefined {
      asMiniMapScene(WORLD_MAP_FRAGMENT).Refresh()
    }
    function mountedStateChanged(this: void, _event: unknown, mounted: boolean): undefined {
      self.isMounted = mounted
      async.Call(refreshFragment)
    }
    em.RegisterForEvent(self.name, EVENT_MOUNTED_STATE_CHANGED, mountedStateChanged)
  }
}
