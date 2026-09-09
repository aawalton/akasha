import {
  asAnyTable,
  asAnyTableMember,
  asMiniMapControl,
  asMiniMapPanAndZoom,
  asMiniMapPinManager,
  asNumber,
} from "../minimap-casts/minimap-casts.module.code.ts"
import { holder, type VotansMiniMap } from "../minimap-holder/minimap-holder.module.code.ts"
import { panZoom, pins } from "../minimap-shared/minimap-shared.module.code.ts"
import type {
  LooseTable,
  MiniMapControl,
} from "../minimap-view-types/minimap-view-types.module.code.ts"

holder.GetCurrentZoom = function (this: VotansMiniMap): number {
  return asNumber(asMiniMapPanAndZoom(panZoom()).GetCurrentNormalizedZoom())
}

holder.SetCurrentZoom = function (this: VotansMiniMap, zoom: number): undefined {
  asMiniMapPanAndZoom(panZoom()).SetCurrentNormalizedZoom(zoom)
}

holder.InitRequiredModifications = function (this: VotansMiniMap): undefined {
  const orgUpdatePinsForMapSizeChange =
    asAnyTable(ZO_WorldMapPins_Manager).UpdatePinsForMapSizeChange
  let lastW = -1
  let lastH = -1
  let lastZone: unknown = -1
  asAnyTable(ZO_WorldMapPins_Manager).UpdatePinsForMapSizeChange = asAnyTableMember(function (
    this: LooseTable
  ): unknown {
    const [dw, dh] = ZO_WorldMapContainer.GetDimensions()
    const w = zo_round(dw)
    const h = zo_round(dh)
    const zone = GetMapTileTexture()
    if (lastW !== w || lastH !== h || lastZone !== zone) {
      lastW = w
      lastH = h
      lastZone = zone
      return orgUpdatePinsForMapSizeChange(this)
    }
    return undefined
  })
}

holder.InitCameraAngle = function (this: VotansMiniMap): undefined {
  const self = this
  if (self.cameraAngleLeft != null) {
    return
  }
  const playerPin = asMiniMapPinManager(pins()).GetPlayerPin()
  const playerControl = playerPin.GetControl()
  const parent = asMiniMapControl(asMiniMapControl(playerControl).GetParent())
  function setupCameraAngle(this: void, control: MiniMapControl): undefined {
    control.SetTexture("TemperNavigation/ViewLimit.dds")
    control.SetDimensions(4, 64)
    control.SetAnchor(BOTTOM, asMiniMapControl(playerControl), CENTER)
    control.SetHidden(!self.account.showCameraAngle)
    control.SetPixelRoundingEnabled(true)
    control.SetDrawLayer(DL_TEXT)
  }
  let control = CreateControl("$(parent)ViewLimitLeft", parent, CT_TEXTURE)
  setupCameraAngle(asMiniMapControl(control))
  self.cameraAngleLeft = control
  control = CreateControl("$(parent)ViewLimitRight", parent, CT_TEXTURE)
  setupCameraAngle(asMiniMapControl(control))
  self.cameraAngleRight = control

  self.cameraAngleRad = self.account.cameraAngle * 0.0174532925199
  const orgSetHidden = playerControl.SetHidden
  function setHiddenPlayerPin(this: void, pin: LooseTable, hidden: boolean): unknown {
    const noViewLimit = hidden || !self.account.showCameraAngle
    asMiniMapControl(self.cameraAngleLeft).SetHidden(noViewLimit)
    asMiniMapControl(self.cameraAngleRight).SetHidden(noViewLimit)
    return orgSetHidden(pin, hidden)
  }
  playerControl.SetHidden = asAnyTableMember(setHiddenPlayerPin)
  const orgSetRotation = playerPin.SetRotation
  playerPin.SetRotation = asAnyTableMember(function (this: void, ...args: unknown[]): unknown {
    if (self.account.showCameraAngle) {
      const pin = args[0]
      const [, , heading] = GetMapPlayerPosition("player")
      return orgSetRotation(pin, heading)
    } else {
      return orgSetRotation(...args)
    }
  })
}
