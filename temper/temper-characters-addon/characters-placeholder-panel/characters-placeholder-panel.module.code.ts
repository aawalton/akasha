import { TEXT_PRIMARY } from "@akasha/design-tokens/text-color"

export function createPlaceholderPanel(parentWindow: Control): Control {
  const panel = WINDOW_MANAGER.CreateControl(undefined, parentWindow, CT_CONTROL)
  panel.SetAnchorFill()

  const label = WINDOW_MANAGER.CreateControl(undefined, panel, CT_LABEL)
  label.SetAnchor(CENTER)
  label.SetFont("ZoFontGame")
  label.SetColor(TEXT_PRIMARY[0], TEXT_PRIMARY[1], TEXT_PRIMARY[2], 1)
  label.SetText("Coming Soon")

  panel.SetHidden(true)

  return panel
}
