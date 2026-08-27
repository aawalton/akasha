import { printLater } from "./messages"
import { lam, lamcc } from "./state"

import "./util"
import "./widgets/panel"
import "./widgets/submenu"
import "./widgets/button"
import "./widgets/checkbox"
import "./widgets/colorpicker"
import "./widgets/custom"
import "./widgets/description"
import "./widgets/divider"
import "./widgets/dropdown"
import "./widgets/editbox"
import "./widgets/header"
import "./widgets/iconpicker"
import "./widgets/slider"
import "./widgets/texture"
import "./settings-window"

if (LAMSettingsPanelCreated !== undefined && LAMCompatibilityWarning !== true) {
  printLater(
    "An old version of LibAddonMenu with compatibility issues was detected. For more information on how to proceed search for LibAddonMenu on esoui.com"
  )
  LAMCompatibilityWarning = true
}

LibAddonMenu2 = lam
LAMCreateControl = lamcc
