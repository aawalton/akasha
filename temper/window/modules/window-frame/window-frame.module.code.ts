import { TEXT_PRIMARY } from "akasha/design/interface/token/modules/text-color/text-color.module.code.ts"
import { drawSurface } from "akasha/temper/modules/surface-backdrop/surface-backdrop.module.code.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

export interface WindowFrame {
  header: Control
  body: Control
}

const PADDING = 24

const TITLE_GAP = 16

const TITLE_SIZE = 18

export const FRAME_PADDING = PADDING

export const FRAME_TOP = PADDING + TITLE_SIZE + TITLE_GAP

const TITLE_FONT = `$(BOLD_FONT)|${TITLE_SIZE}`

const CLOSE_SIZE = 16

const CLOSE_RESTING = 0.7

const CLOSE_OVER = 1

const CLOSE_TEXTURE = "/esoui/art/buttons/decline_up.dds"

const CLOSE_TEXTURE_OVER = "/esoui/art/buttons/decline_over.dds"

const CLOSE_TEXTURE_DOWN = "/esoui/art/buttons/decline_down.dds"

const OPAQUE = 1

const WINDOW_LEVEL = 1

function drawClose(window: TopLevelWindow, onClose: (this: void) => undefined): undefined {
  const close = WINDOW_MANAGER.CreateControl("$(parent)FrameClose", window, CT_BUTTON)
  close.SetDimensions(CLOSE_SIZE, CLOSE_SIZE)
  close.SetAnchor(TOPRIGHT, window, TOPRIGHT, -PADDING, PADDING)
  close.SetNormalTexture(CLOSE_TEXTURE)
  close.SetMouseOverTexture(CLOSE_TEXTURE_OVER)
  close.SetPressedTexture(CLOSE_TEXTURE_DOWN)
  close.SetAlpha(CLOSE_RESTING)
  close.SetHandler("OnMouseEnter", function (this: void): undefined {
    close.SetAlpha(CLOSE_OVER)
  })
  close.SetHandler("OnMouseExit", function (this: void): undefined {
    close.SetAlpha(CLOSE_RESTING)
  })
  close.SetHandler("OnClicked", function (this: void): undefined {
    onClose()
  })
  return undefined
}

export function frameWindow(
  window: TopLevelWindow,
  titled: string,
  onClose?: (this: void) => undefined
): WindowFrame {
  drawSurface(window, WINDOW_LEVEL)
  const header = WINDOW_MANAGER.CreateControl("$(parent)FrameHeader", window, CT_CONTROL)
  header.SetAnchor(TOPLEFT, window, TOPLEFT, 0, 0)
  header.SetAnchor(TOPRIGHT, window, TOPRIGHT, 0, 0)
  header.SetHeight(FRAME_TOP)
  const title = WINDOW_MANAGER.CreateControl("$(parent)FrameTitle", window, CT_LABEL)
  title.SetAnchor(TOPLEFT, window, TOPLEFT, PADDING, PADDING)
  title.SetFont(TITLE_FONT)
  const [red, green, blue] = TEXT_PRIMARY
  title.SetColor(red, green, blue, OPAQUE)
  title.SetText(titled)
  if (onClose !== undefined) drawClose(window, onClose)
  const body = WINDOW_MANAGER.CreateControl("$(parent)FrameBody", window, CT_CONTROL)
  body.SetAnchor(TOPLEFT, window, TOPLEFT, PADDING, FRAME_TOP)
  body.SetAnchor(BOTTOMRIGHT, window, BOTTOMRIGHT, -PADDING, -PADDING)
  return { header, body }
}
