import {
  asAnyTable,
  asAnyTableMember,
  asBoolean,
  asMiniMapControl,
  asMiniMapScene,
  asNumber,
} from "../casts"
import { holder, type VotansMiniMap } from "../holder"
import { installHandlers } from "./minimap-handlers"
import { state } from "./minimap-state"
import {
  installCallbackPump,
  installUpdateHandler,
  installVisibility,
  installZoomOverrides,
} from "./minimap-update"
import { NoGamepad, NoOp } from "./shared"

const em = EVENT_MANAGER

holder.InitMiniMap = function (this: VotansMiniMap): undefined {
  const self = this

  {
    const orgZO_WorldMap_GetMapDimensions = ZO_WorldMap_GetMapDimensions
    ZO_WorldMap_GetMapDimensions = function (this: void): LuaMultiReturn<[number, number]> {
      if (WORLD_MAP_MANAGER.IsInMode(MAP_MODE_VOTANS_MINIMAP)) {
        return ZO_WorldMapContainer.GetDimensions()
      } else {
        return orgZO_WorldMap_GetMapDimensions()
      }
    }
  }
  state.orgUpdateSize = asAnyTable(ZO_MapPin).UpdateSize

  state.scale = 1
  state.limitedScale = 1
  const blacklistedPins: Record<number, boolean> = {}
  for (const [, list] of pairs([asAnyTable(ZO_MapPin).UNIT_PIN_TYPES])) {
    for (const [pinType] of pairs(asAnyTable(list))) {
      blacklistedPins[asNumber(pinType)] = true
    }
  }
  state.blacklistedPins = blacklistedPins

  const vars = asAnyTable(self.mapVars)
  let myMode: AnyTable | undefined = vars[MAP_MODE_VOTANS_MINIMAP]
  if (myMode == null) {
    myMode = asAnyTable(ZO_DeepTableCopy(vars[MAP_MODE_SMALL_CUSTOM]))
    vars[MAP_MODE_VOTANS_MINIMAP] = asAnyTableMember(myMode)
    myMode.width = asAnyTableMember(301)
    myMode.height = asAnyTableMember(363)
  }
  myMode.mapSize = asAnyTableMember(2)

  const filters = asAnyTable(vars[MAP_MODE_LARGE_CUSTOM]).filters
  for (const [index, filter] of ipairs(asAnyTable(filters))) {
    asAnyTable(myMode.filters)[index] = asAnyTableMember(filter)
  }

  self.modeData = myMode
  if (self.account.keepSquare != null) {
    asAnyTable(self.modeData).keepSquare = asAnyTableMember(self.account.keepSquare)
  } else {
    self.account.keepSquare = asBoolean(asAnyTable(self.modeData).keepSquare)
  }

  ZO_WorldMapTitleBarBG.SetColor(0, 0, 0, 0)
  ZO_WorldMapButtonsBG.SetColor(0, 0, 0, 0)
  ZO_WorldMapButtonsBG.SetHandler("OnDragStart", ZO_WorldMapTitleBar_OnDragStart)
  ZO_WorldMapButtonsBG.SetHandler(
    "OnMouseUp",
    function (this: void, _control: unknown, button: unknown, upInside: unknown): undefined {
      ZO_WorldMapTitleBar_OnMouseUp(button, upInside)
    }
  )

  const wm = GetWindowManager()
  let control: MiniMapControl = wm.CreateControl("VotanMiniMapBg", ZO_WorldMap, CT_BACKDROP)
  control.SetAnchor(TOPLEFT, undefined, TOPLEFT, -8, -4)
  control.SetAnchor(BOTTOMRIGHT, ZO_WorldMapButtons, BOTTOMRIGHT, 8, 4)
  control.SetExcludeFromResizeToFitExtents(true)
  self.background = control
  self.UpdateBorder()
  asMiniMapScene(WORLD_MAP_FRAGMENT).SetAllowShowHideTimeUpdates(true)
  WORLD_MAP_FRAGMENT.alwaysAnimate = asAnyTableMember(true)
  WORLD_MAP_FRAGMENT.duration = asAnyTableMember(0)

  ZO_WorldMap.SetClampedToScreenInsets(3, 29, -3, -40)

  const isConsoleUI = ZO_IsConsoleOrGameCoreUI()
  control = asMiniMapControl(CreateControl("$(parent)ClockRealTime", self.background, CT_LABEL))
  self.clockRealTime = control
  control.SetFont(isConsoleUI ? "ZoFontGamepadBold34" : "ZoFontWindowTitle")
  control.SetDimensionConstraints(66, 37, 0, 0)
  control.SetAnchor(BOTTOMLEFT, undefined, BOTTOMLEFT, 14, -4)

  control = asMiniMapControl(CreateControl("$(parent)ClockInGame", self.background, CT_LABEL))
  self.clockInGame = control
  control.SetFont(isConsoleUI ? "ZoFontGamepadBold20" : "ZoFontWindowSubtitle")
  control.SetDimensionConstraints(66, 32, 0, 0)
  control.SetAnchor(BOTTOMLEFT, self.clockRealTime, BOTTOMRIGHT, 6, -3)
  control.SetVerticalAlignment(BOTTOM)

  self.cameraAngleRad = 0

  if (self.account.showCameraAngle) {
    self.InitCameraAngle()
  }

  function PlayerActivated(this: void): undefined {
    self.UpdateVisibility()
    self.cameraAngle = 0
    self.GoMiniMapMode(true)
  }
  function PlayerDeactivated(this: void): undefined {
    self.StopFollowPlayer()
    if (GetKeepFastTravelInteraction() !== undefined) {
      EndInteraction(INTERACTION_FAST_TRAVEL_KEEP)
    }
    WORLD_MAP_MANAGER.PopSpecialMode()
  }
  em.RegisterForEvent(self.name, EVENT_PLAYER_ACTIVATED, PlayerActivated)
  em.RegisterForEvent(self.name, EVENT_PLAYER_DEACTIVATED, PlayerDeactivated)

  holder.RestorePosition = function (this: VotansMiniMap): undefined {
    const orgZO_WorldMap_UpdateMap = ZO_WorldMap_UpdateMap
    ZO_WorldMap_UpdateMap = NoOp

    ZO_WorldMap_OnResizeStart(ZO_WorldMap)

    const sv = asAnyTable(this.modeData)
    const [UIWidth, UIHeight] = GuiRoot.GetDimensions()

    ZO_WorldMap.ClearAnchors()
    ZO_WorldMap.SetDimensionConstraints(128, 144, UIWidth, UIHeight)
    ZO_WorldMap.SetAnchor(
      CENTER,
      undefined,
      CENTER,
      this.account.x ?? UIWidth / 2 - 304,
      this.account.y ?? UIHeight / 2 - 368
    )
    ZO_WorldMap.SetDimensions(
      this.account.width ?? asNumber(sv.width ?? 304),
      this.account.height ?? asNumber(sv.height ?? 368)
    )

    ZO_WorldMap_OnResizeStop(ZO_WorldMap)
    ZO_WorldMap_UpdateMap = orgZO_WorldMap_UpdateMap
  }

  function StateChanged(this: void): undefined {
    self.UpdateVisibility()
  }
  em.RegisterForEvent(self.name, EVENT_PLAYER_COMBAT_STATE, StateChanged)

  em.RegisterForEvent(
    self.name,
    EVENT_GAMEPAD_PREFERRED_MODE_CHANGED,
    function (this: void): undefined {
      state.lastZoom = -1
      state.lastW = -1
      state.lastH = -1
      ZO_WorldMap_InteractKeybindForceHidden(true)
      self.UpdateVisibility()
      self.UpdateBorder()
      if (IsInGamepadPreferredMode()) {
        self.RestorePosition()
        const ZO_MapPanAndZoom = asAnyTable(ZO_WorldMap_GetPanAndZoom())
        const setZoomInternal = ZO_MapPanAndZoom.SetCurrentNormalizedZoomInternal
        if (setZoomInternal != null) {
          NoGamepad(setZoomInternal, ZO_MapPanAndZoom, ZO_MapPanAndZoom.currentNormalizedZoom)
        }
      }
    }
  )
  em.RegisterForEvent(self.name, EVENT_SCREEN_RESIZED, function (this: void): undefined {
    if (IsInGamepadPreferredMode() && !ZO_WorldMap_IsWorldMapShowing()) {
      ZO_WorldMap_UpdateMap()
    }
  })

  installZoomOverrides()
  installCallbackPump()
  installUpdateHandler()
  installMouseDown()
  installVisibility()
  installHandlers(self)
}

function installMouseDown(this: void): undefined {
  const self = holder
  function toggleMapPoint(
    this: void,
    pinTypeId: number,
    getPositionFunc: (this: void) => LuaMultiReturn<[number, number]>,
    removeFunc: (this: void) => unknown
  ): unknown {
    const [x, y] = NormalizeMousePositionToControl(ZO_WorldMapContainer)
    const [cx, cy] = getPositionFunc()
    if (cx !== 0 && cy !== 0) {
      const distance = zo_distance3D(x, y, 0, cx, cy, 0) * self.GetCurrentZoom()
      if (distance <= 0.023) {
        return removeFunc()
      }
    }
    return PingMap(pinTypeId, MAP_TYPE_LOCATION_CENTERED, x, y, ZO_WorldMap)
  }
  const orgZO_WorldMap_MouseDown = ZO_WorldMap_MouseDown
  ZO_WorldMap_MouseDown = function (this: void, ...args: unknown[]): unknown {
    if (WORLD_MAP_MANAGER.IsInMode(MAP_MODE_VOTANS_MINIMAP)) {
      const button = args[0]
      const ctrl = args[1]
      const alt = args[2]
      const shift = args[3]
      if (button === MOUSE_BUTTON_INDEX_LEFT && !shift && !alt && ctrl != null && ctrl !== false) {
        return toggleMapPoint(
          MAP_PIN_TYPE_PLAYER_WAYPOINT,
          GetMapPlayerWaypoint,
          ZO_WorldMap_RemovePlayerWaypoint
        )
      }
    }
    return orgZO_WorldMap_MouseDown(...args)
  }
}
