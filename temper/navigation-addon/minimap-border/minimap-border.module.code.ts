import { asMiniMapControl } from "../minimap-casts/minimap-casts.module.code.ts"
import { holder, type VotansMiniMap } from "../minimap-holder/minimap-holder.module.code.ts"
import { applyModeStyle } from "../minimap-mode/minimap-mode.module.code.ts"
import { getScene, noGamepad } from "../minimap-shared/minimap-shared.module.code.ts"

holder.UpdateBorder = function (this: VotansMiniMap): undefined {
  const control = asMiniMapControl(this.background)
  const inMiniMap = !getScene().IsShowing()
  if (inMiniMap) {
    if (this.lastTitleFont !== this.account.titleFont) {
      this.lastTitleFont = this.account.titleFont
      if (this.account.titleFont != null && this.account.titleFont.length > 0) {
        let font: string
        let scale: number
        const face = this.fontFaces[this.account.titleFont]
        if (face == null) {
          font = this.account.titleFont
          scale = 1
        } else if (typeof face === "string") {
          font = face
          scale = 1
        } else {
          ;[font, scale] = unpack(face)
        }
        const sizePx = math.floor(this.account.titleFontSize * scale)
        ZO_WorldMapTitle.SetFont(font + "|" + tostring(sizePx) + "|soft-shadow-thick")
      }
    }
    const item = this.GetFontSizeBySizeName(this.account.titleFontSize)
    ZO_WorldMapTitle.ClearAnchors()
    if (this.account.titleAtTop) {
      ZO_WorldMapTitle.SetAnchor(TOP, undefined, TOP, 0, item != null ? item.data.offsetY : 0)
    } else {
      ZO_WorldMapTitle.SetAnchor(
        TOP,
        ZO_WorldMapMapFrame,
        BOTTOM,
        0,
        item != null ? item.data.offsetY : 0
      )
    }
    ZO_WorldMapButtons.ClearAnchors()
    if (this.account.titleAtTop) {
      ZO_WorldMapButtons.SetAnchor(BOTTOMLEFT, undefined, BOTTOMLEFT, 4, -4)
      ZO_WorldMapButtons.SetAnchor(BOTTOMRIGHT, undefined, BOTTOMRIGHT, -4, -4)
    } else {
      const offsetY = this.account.showClock ? ZO_WorldMapTitle.GetHeight() : 0
      ZO_WorldMapButtons.SetAnchor(TOPLEFT, ZO_WorldMapMapFrame, BOTTOMLEFT, 0, offsetY)
      ZO_WorldMapButtons.SetAnchor(TOPRIGHT, ZO_WorldMapMapFrame, BOTTOMRIGHT, 0, offsetY)
    }

    if (this.titleColor != null) {
      const [r, g, b] = this.titleColor.UnpackRGB()
      ZO_WorldMapTitle.SetColor(r, g, b)
    }
    ZO_WorldMapTitle.SetHidden(
      !(this.account.titleFont != null && this.account.titleFont.length > 0)
    )
    const enable = !(this.account.lockWindow || IsInGamepadPreferredMode())
    ZO_WorldMapButtonsBG.SetMouseEnabled(enable)
    ZO_WorldMapTitleBar.SetMouseEnabled(enable)
    ZO_WorldMap.SetMouseEnabled(enable)

    this.UpdateCompass()
    if (IsInGamepadPreferredMode()) {
      noGamepad(applyModeStyle)
    }
    this.UpdateDrawLevel()

    const style = this.GetStyleByName(this.account.frameStyle)
    if (style != null && style.data.setup != null) {
      style.data.setup(this.account, control, ZO_WorldMapMapFrame)
      return
    }
  } else {
    ZO_WorldMapTitle.SetHidden(false)
    const style = this.GetStyleByName(this.account.frameStyle)
    if (style != null && style.data.reset != null) {
      style.data.reset(this.account, control, ZO_WorldMapMapFrame)
    }
    applyModeStyle()
    ZO_WorldMap.SetMouseEnabled(true)
    ZO_WorldMap.SetDrawLayer(DL_BACKGROUND)
    ZO_WorldMap.SetDrawLevel(10000)
  }
  control.SetCenterColor(0, 0, 0, 0)
  control.SetEdgeColor(0, 0, 0, 0)
  control.SetCenterTexture("")
  control.SetInsets(0, 0, 0, 0, 0)
  ZO_WorldMapMapFrame.SetEdgeTexture("/esoui/art/worldmap/worldmap_frame_edge.dds", 128, 16, 0)
  ZO_WorldMapMapFrame.SetAlpha(1)
  ZO_WorldMapMapFrame.SetHidden(false)
  ZO_WorldMapTitle.SetHidden(true)
}

holder.UpdateCompass = function (this: VotansMiniMap): undefined {
  if (this.account.enableCompass !== this.compassMode.Untouched) {
    const hidden = this.account.showHUD && this.account.enableCompass !== this.compassMode.Shown

    ZO_CompassCenterOverPinLabel.SetHidden(hidden)
    ZO_CompassContainer.SetHidden(hidden)
    ZO_CompassFrameLeft.SetHidden(hidden)
    ZO_CompassFrameCenter.SetHidden(hidden)
    ZO_CompassFrameRight.SetHidden(hidden)
  }
}

holder.UpdateDrawLevel = function (this: VotansMiniMap): undefined {
  ZO_WorldMap.SetDrawLayer(this.account.showOnTop ? DL_CONTROLS : DL_BACKGROUND)
  ZO_WorldMap.SetDrawLevel(this.account.showOnTop ? 1000 : 0)
}
