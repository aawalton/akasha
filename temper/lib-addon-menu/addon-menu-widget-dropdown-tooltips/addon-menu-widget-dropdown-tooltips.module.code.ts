import { asControl, asZoComboBoxRow } from "../addon-menu-casts/addon-menu-casts.module.code.ts"
import type { Valued } from "../addon-menu-types/addon-menu-types.module.code.ts"
import { getStringFromValue } from "../addon-menu-util/addon-menu-util.module.code.ts"

function doShowTooltip(
  this: void,
  control: Control,
  tooltip: Valued<string | number> | undefined
): undefined {
  if (tooltip === undefined) {
    return
  }
  const tooltipText = getStringFromValue(tooltip)
  if (tooltipText !== "") {
    InitializeTooltip(InformationTooltip, control, TOPLEFT, 0, 0, BOTTOMRIGHT)
    SetTooltipText(InformationTooltip, tostring(tooltipText))
    InformationTooltipTopLevel.BringWindowToTop()
  }
}

function showTooltip(this: void, control: ZoComboBoxRow): undefined {
  doShowTooltip(control, control.dataEntry?.data?.tooltip)
}

function hideTooltip(this: void): undefined {
  ClearTooltip(InformationTooltip)
}

export function setupTooltips(this: void, comboBox: ZoComboBox): undefined {
  SecurePostHook(
    asControl(ZO_ComboBoxDropdown_Keyboard),
    "OnEntryMouseEnter",
    (...args: never[]) => {
      const comboBoxRowCtrl = asZoComboBoxRow(args[0])
      const lComboBox = comboBoxRowCtrl.m_owner
      if (lComboBox !== undefined && lComboBox === comboBox) {
        showTooltip(comboBoxRowCtrl)
      }
    }
  )

  SecurePostHook(asControl(ZO_ComboBoxDropdown_Keyboard), "OnEntryMouseExit", () => {
    hideTooltip()
  })
}
