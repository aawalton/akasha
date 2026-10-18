import {
  paintSurface,
  type SurfaceLevel,
} from "akasha/temper/modules/surface-backdrop/surface-backdrop.module.code.ts"
import {
  colorTextsUnder,
  styleText,
} from "akasha/temper/window/modules/text-style/text-style.module.code.ts"
import { fontOf } from "akasha/temper/window/modules/type-scale/type-scale.module.code.ts"
import { styleControlsUnder } from "akasha/temper/window/modules/window-controls/window-controls.module.code.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

export interface WindowFrame {
  header: Control
  body: Control
  title: LabelControl
  actions: Control
}

const PADDING = 24

const TITLE_ROW = 30

const DIVIDER_GAP = 4

const DIVIDER_HEIGHT = 6

const BODY_GAP = 12

export const FRAME_PADDING = PADDING

export const FRAME_TOP = PADDING + TITLE_ROW + DIVIDER_GAP + DIVIDER_HEIGHT + BODY_GAP

const TITLE_FONT = fontOf(24, "bold", "thick")

const CLOSE_SIZE = 20

const CLOSE_TOP = PADDING + (TITLE_ROW - CLOSE_SIZE) / 2

const ACTION_GAP = 12

const CLOSE_TEMPLATE = "ZO_CloseButton"

const DIVIDER_TEMPLATE = "ZO_DynamicHorizontalDivider"

const WINDOW_LEVEL: SurfaceLevel = 1

const CONTROLS_HANDLER = "TemperFrameControls"

const SURFACE_DRAW_LEVEL = 0

const BACKDROP_OVERHANG = 8

function paintWindow(window: TopLevelWindow): undefined {
  const declared = GetControl<BackdropControl>(window, "FrameSurface")
  const surface =
    declared ?? WINDOW_MANAGER.CreateControl("$(parent)FrameSurface", window, CT_BACKDROP)
  surface.ClearAnchors()
  surface.SetAnchor(TOPLEFT, window, TOPLEFT, -BACKDROP_OVERHANG, -BACKDROP_OVERHANG)
  surface.SetAnchor(BOTTOMRIGHT, window, BOTTOMRIGHT, BACKDROP_OVERHANG, BACKDROP_OVERHANG)
  paintSurface(surface, WINDOW_LEVEL)
  surface.SetDrawLayer(DL_BACKGROUND)
  surface.SetDrawLevel(SURFACE_DRAW_LEVEL)
  return undefined
}

function drawClose(window: TopLevelWindow, onClose: (this: void) => undefined): undefined {
  const close = WINDOW_MANAGER.CreateControlFromVirtual<ButtonControl>(
    "$(parent)FrameClose",
    window,
    CLOSE_TEMPLATE
  )
  close.ClearAnchors()
  close.SetAnchor(TOPRIGHT, window, TOPRIGHT, -PADDING, CLOSE_TOP)
  close.SetHandler("OnClicked", function (this: void): undefined {
    onClose()
  })
  return undefined
}

function drawDivider(window: TopLevelWindow): undefined {
  const divider = WINDOW_MANAGER.CreateControlFromVirtual(
    "$(parent)FrameDivider",
    window,
    DIVIDER_TEMPLATE
  )
  const top = PADDING + TITLE_ROW + DIVIDER_GAP
  divider.SetAnchor(TOPLEFT, window, TOPLEFT, PADDING, top)
  divider.SetAnchor(TOPRIGHT, window, TOPRIGHT, -PADDING, top)
  return undefined
}

export function frameWindow(
  window: TopLevelWindow,
  titled: string,
  onClose?: (this: void) => undefined
): WindowFrame {
  paintWindow(window)
  const header = WINDOW_MANAGER.CreateControl("$(parent)FrameHeader", window, CT_CONTROL)
  header.SetAnchor(TOPLEFT, window, TOPLEFT, 0, 0)
  header.SetAnchor(TOPRIGHT, window, TOPRIGHT, 0, 0)
  header.SetHeight(FRAME_TOP)
  const title = WINDOW_MANAGER.CreateControl("$(parent)FrameTitle", window, CT_LABEL)
  title.SetAnchor(TOPLEFT, window, TOPLEFT, PADDING, PADDING)
  title.SetHeight(TITLE_ROW)
  title.SetVerticalAlignment(TEXT_ALIGN_CENTER)
  styleText(title, "heading")
  title.SetFont(TITLE_FONT)
  title.SetText(titled)
  drawDivider(window)
  if (onClose !== undefined) drawClose(window, onClose)
  const actions = WINDOW_MANAGER.CreateControl("$(parent)FrameActions", window, CT_CONTROL)
  const actionsEnd = onClose === undefined ? PADDING : PADDING + CLOSE_SIZE + ACTION_GAP
  actions.SetDimensions(0, TITLE_ROW)
  actions.SetAnchor(TOPRIGHT, window, TOPRIGHT, -actionsEnd, PADDING)
  const body = WINDOW_MANAGER.CreateControl("$(parent)FrameBody", window, CT_CONTROL)
  body.SetAnchor(TOPLEFT, window, TOPLEFT, PADDING, FRAME_TOP)
  body.SetAnchor(BOTTOMRIGHT, window, BOTTOMRIGHT, -PADDING, -PADDING)
  colorTextsUnder(window)
  styleControlsUnder(window)
  window.SetHandler("OnEffectivelyShown", () => styleControlsUnder(window), CONTROLS_HANDLER)
  return { header, body, title, actions }
}
