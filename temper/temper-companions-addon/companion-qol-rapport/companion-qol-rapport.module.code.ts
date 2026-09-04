import "@akasha/temper-eso-types/eso-api"
import "@akasha/temper-eso-types/eso-enums-17"
import "@akasha/temper-eso-types/eso-enums-19"
import "@akasha/temper-eso-types/eso-functions-01"
import "@akasha/temper-eso-types/eso-functions-07"
import "@akasha/temper-eso-types/eso-globals"
import "@akasha/temper-eso-types/eso-ui"
import "@akasha/temper-eso-types/tstl-eso-sandbox"
import { FCOCO } from "../companion-qol-state/companion-qol-state.module.code.ts"

function createRapportValueLabel(
  this: void,
  selfRapportOverviewKeyboard: RapportOverviewKeyboard
): LabelControl | undefined {
  const rapportBar = selfRapportOverviewKeyboard.rapportBar
  let rapportValueLabel: LabelControl | undefined
  if (rapportBar.valueLabel === undefined) {
    const rapportBarControl = rapportBar.control
    const gamePadMode = IsInGamepadPreferredMode()
    rapportValueLabel = WINDOW_MANAGER.CreateControl(
      `${rapportBarControl.GetName()}ValueLabel`,
      rapportBarControl,
      CT_LABEL
    )
    rapportValueLabel.SetFont(gamePadMode ? "ZoFontGamepadBold27" : "ZoFontBookPaper")
    rapportValueLabel.SetColor(0, 0, 0, 1)
    rapportValueLabel.SetScale(gamePadMode ? 0.7 : 0.9)
    rapportValueLabel.SetWrapMode(TEX_MODE_CLAMP)
    rapportValueLabel.SetText("")
    rapportValueLabel.ClearAnchors()
    rapportValueLabel.SetDimensions(
      rapportBarControl.GetWidth() - 4,
      rapportBarControl.GetHeight() - 4
    )
    rapportValueLabel.SetAnchor(CENTER, rapportBarControl, CENTER, 0, -2)
    rapportValueLabel.SetHidden(true)
    rapportValueLabel.SetMouseEnabled(false)
    rapportValueLabel.SetDrawLevel(5)
    rapportValueLabel.SetDrawTier(DT_HIGH)
    rapportValueLabel.SetDrawLayer(DL_OVERLAY)
    rapportValueLabel.SetHorizontalAlignment(TEXT_ALIGN_CENTER)
  }
  return rapportValueLabel
}

if (FCOCO.isCompanionUnlocked) {
  SecurePostHook(
    COMPANION_OVERVIEW_KEYBOARD,
    "RefreshCompanionRapport",
    function (this: void, selfRapportOverviewKeyboard: RapportOverviewKeyboard): undefined {
      if (HasActiveCompanion() && COMPANION_OVERVIEW_KEYBOARD_FRAGMENT.IsShowing()) {
        const rapportValue = GetActiveCompanionRapport()
        const rapportBar = selfRapportOverviewKeyboard.rapportBar
        let valueLabel = rapportBar.valueLabel
        if (valueLabel === undefined) {
          valueLabel = createRapportValueLabel(selfRapportOverviewKeyboard)
          rapportBar.valueLabel = valueLabel
        }
        if (valueLabel !== undefined) {
          valueLabel.SetText(`${tostring(rapportValue)}|cFFF0F0/|r${tostring(GetMaximumRapport())}`)
          valueLabel.SetHidden(false)
        }
      }
      return undefined
    }
  )
}
