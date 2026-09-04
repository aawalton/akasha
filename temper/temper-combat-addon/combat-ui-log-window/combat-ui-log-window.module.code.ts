import { getDb } from "@akasha/temper-combat-addon/combat-saved-variables"
import { addColoredText, type TooltipCarrier } from "@akasha/temper-combat-addon/combat-ui-helpers"
import {
  getCurrentCLPage,
  setCurrentCLPage,
  type UpdatableControl,
} from "@akasha/temper-combat-addon/combat-ui-state"

export interface CombatLogWindowControl extends Control {
  AddColoredText?: typeof addColoredText
}

export function initCombatLog(this: void, control: CombatLogWindowControl): undefined {
  control.AddColoredText = addColoredText

  const buffer = control.GetNamedChild<TextBufferControl & Control>("Buffer")
  const slider = control.GetNamedChild<SliderControl & Control>("Slider")
  if (buffer == null || slider == null) {
    return undefined
  }

  buffer.SetHandler(
    "OnMouseWheel",
    (_self: unknown, delta: unknown, ctrl: unknown, _alt: unknown, shift: unknown) => {
      if (typeof delta !== "number") {
        return
      }
      let offset = delta

      if (shift === true) {
        offset = offset * zo_floor(buffer.GetNumVisibleLines())
      } else if (ctrl === true) {
        offset = offset * buffer.GetNumHistoryLines()
      }

      buffer.SetScrollPosition(
        zo_min(
          buffer.GetScrollPosition() + offset,
          zo_floor(buffer.GetNumHistoryLines() - buffer.GetNumVisibleLines())
        )
      )

      slider.SetValue(slider.GetValue() - offset)
    }
  )

  slider.SetHandler("OnValueChanged", (_self, _value, eventReason) => {
    const numHistoryLines = buffer.GetNumHistoryLines()
    const sliderValue = zo_max(slider.GetValue(), zo_floor(buffer.GetNumVisibleLines() + 1))

    if (eventReason === EVENT_REASON_HARDWARE) {
      buffer.SetScrollPosition(numHistoryLines - sliderValue)
    }
  })

  const scrollUp = slider.GetNamedChild("ScrollUp")
  const scrollDown = slider.GetNamedChild("ScrollDown")
  const scrollEnd = slider.GetNamedChild("ScrollEnd")

  scrollUp?.SetHandler("OnMouseDown", () => {
    buffer.SetScrollPosition(
      zo_min(
        buffer.GetScrollPosition() + 1,
        zo_floor(buffer.GetNumHistoryLines() - buffer.GetNumVisibleLines())
      )
    )
    slider.SetValue(slider.GetValue() - 1)
  })

  scrollDown?.SetHandler("OnMouseDown", () => {
    buffer.SetScrollPosition(buffer.GetScrollPosition() - 1)
    slider.SetValue(slider.GetValue() + 1)
  })

  scrollEnd?.SetHandler("OnMouseDown", () => {
    buffer.SetScrollPosition(0)
    slider.SetValue(buffer.GetNumHistoryLines())
  })
  return undefined
}

export interface CLButtonControl extends Control {
  func?: number | string
  value?: number | string
  texture?: string
  label?: string
}

function buttonPanel(this: void, button: Control): UpdatableControl | undefined {
  return button.GetParent()?.GetParent()?.GetParent<UpdatableControl>()
}

function clNavButtonFunction(this: void, button: CLButtonControl): undefined {
  const raw = button.value ?? (getCurrentCLPage() ?? 1) + (tonumber(button.func) ?? 0)
  setCurrentCLPage(tonumber(raw))
  const panel = buttonPanel(button)
  panel?.Update?.(panel)
  return undefined
}

export function initCLNavButtonRow(this: void, rowControl: Control): undefined {
  for (let i = 1; i <= rowControl.GetNumChildren(); i++) {
    const button = rowControl.GetChild<CLButtonControl & TooltipCarrier>(i)
    if (button == null) {
      continue
    }

    if (button.texture != null) {
      button.GetNamedChild<TextureControl>("Icon")?.SetTexture(button.texture)
    }

    const value = button.value

    if (value != null) {
      button.GetNamedChild<LabelControl>("Label")?.SetText(tostring(value))
      button.tooltip = [zo_strformat(SI_TEMPER_COMBAT_PAGE, value)]
    }

    button.SetHandler("OnMouseUp", () => clNavButtonFunction(button))
  }
  return undefined
}

function clFilterButtonFunction(this: void, button: CLButtonControl): undefined {
  const overlay = button.GetNamedChild<BackdropControl>("Overlay")
  const func = button.func
  if (overlay == null || func == null) {
    return undefined
  }
  const clSelection = getDb().FightReport.CLSelection

  clSelection[func] = !(clSelection[func] === true)

  overlay.SetCenterColor(0, 0, 0, clSelection[func] === true ? 0 : 0.8)
  overlay.SetEdgeColor(1, 1, 1, clSelection[func] === true ? 1 : 0.4)

  if (func !== "CopyPaste" && clSelection["CopyPaste"] === true) {
    const copyPasteButton = button.GetParent()?.GetNamedChild<CLButtonControl>("CopyPaste")
    if (copyPasteButton != null) {
      toggleCopyPaste(copyPasteButton)
    }
  }

  const panel = buttonPanel(button)
  panel?.Update?.(panel)
  return undefined
}

function toggleCopyPaste(this: void, button: CLButtonControl): undefined {
  const combatLog = buttonPanel(button)
  if (combatLog == null) {
    return undefined
  }

  const textWindow = combatLog.GetNamedChild("Window")
  const copyPasteBox = combatLog.GetNamedChild<EditControl & Control>("CopyPasteBox")
  if (textWindow == null || copyPasteBox == null) {
    return undefined
  }
  copyPasteBox.SetFont(
    string.format(
      "%s|%s|%s",
      GetString(SI_TEMPER_COMBAT_STD_FONT),
      (tonumber(GetString(SI_TEMPER_COMBAT_FONT_SIZE)) ?? 0) * getDb().FightReport.scale,
      ""
    )
  )

  if (textWindow.IsHidden()) {
    textWindow.SetHidden(false)
    copyPasteBox.SetHidden(true)
  } else {
    textWindow.SetHidden(true)
    copyPasteBox.SetHidden(false)
  }

  clFilterButtonFunction(button)
  return undefined
}

export function initCLButtonRow(this: void, rowControl: Control): undefined {
  for (let i = 1; i <= rowControl.GetNumChildren(); i++) {
    const button = rowControl.GetChild<CLButtonControl>(i)
    if (button == null || button.func == null) {
      continue
    }

    if (button.texture != null) {
      button.GetNamedChild<TextureControl>("Icon")?.SetTexture(button.texture)
    }
    if (button.label != null) {
      button.GetNamedChild<LabelControl>("Label")?.SetText(button.label)
    }

    const handler = button.func === "CopyPaste" ? toggleCopyPaste : clFilterButtonFunction
    button.SetHandler("OnMouseUp", () => handler(button))

    const clSelection = getDb().FightReport.CLSelection
    clSelection["CopyPaste"] = false
    const selected = clSelection[button.func] === true
    const overlay = button.GetNamedChild<BackdropControl>("Overlay")

    overlay?.SetCenterColor(0, 0, 0, selected ? 0 : 0.8)
    overlay?.SetEdgeColor(1, 1, 1, selected ? 1 : 0.5)
  }
  return undefined
}

TemperCombat.InitCombatLog = initCombatLog
TemperCombat.InitCLNavButtonRow = initCLNavButtonRow
