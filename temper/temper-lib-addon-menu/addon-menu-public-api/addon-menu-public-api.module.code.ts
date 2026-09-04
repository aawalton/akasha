import { printLater } from "../addon-menu-messages/addon-menu-messages.module.code.ts"
import { LAMCC, lam } from "../addon-menu-state/addon-menu-state.module.code.ts"

import "../addon-menu-util/addon-menu-util.module.code.ts"
import "../addon-menu-widget-panel/addon-menu-widget-panel.module.code.ts"
import "../addon-menu-widget-submenu/addon-menu-widget-submenu.module.code.ts"
import "../addon-menu-widget-button/addon-menu-widget-button.module.code.ts"
import "../addon-menu-widget-checkbox/addon-menu-widget-checkbox.module.code.ts"
import "../addon-menu-widget-colorpicker/addon-menu-widget-colorpicker.module.code.ts"
import "../addon-menu-widget-custom/addon-menu-widget-custom.module.code.ts"
import "../addon-menu-widget-description/addon-menu-widget-description.module.code.ts"
import "../addon-menu-widget-divider/addon-menu-widget-divider.module.code.ts"
import "../addon-menu-widget-dropdown/addon-menu-widget-dropdown.module.code.ts"
import "../addon-menu-widget-editbox/addon-menu-widget-editbox.module.code.ts"
import "../addon-menu-widget-header/addon-menu-widget-header.module.code.ts"
import "../addon-menu-widget-iconpicker/addon-menu-widget-iconpicker.module.code.ts"
import "../addon-menu-widget-slider/addon-menu-widget-slider.module.code.ts"
import "../addon-menu-widget-texture/addon-menu-widget-texture.module.code.ts"
import "../addon-menu-settings-window/addon-menu-settings-window.module.code.ts"

if (LAMSettingsPanelCreated !== undefined && LAMCompatibilityWarning !== true) {
  printLater(
    "An old version of LibAddonMenu with compatibility issues was detected. For more information on how to proceed search for LibAddonMenu on esoui.com"
  )
  LAMCompatibilityWarning = true
}

_G.LibAddonMenu2 = lam
_G.LAMCreateControl = LAMCC
