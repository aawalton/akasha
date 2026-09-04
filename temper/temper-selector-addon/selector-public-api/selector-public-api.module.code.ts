import "@akasha/temper-addon-library-types/temper-addons-global"
import "../selector-ui-settings-menu/selector-ui-settings-menu.module.code.ts"

import { reloadUI } from "../selector-addon-manager/selector-addon-manager.module.code.ts"
import {
  assignPackToKeybind,
  loadPackByKeybind,
  removePackFromKeybind,
} from "../selector-keybinds/selector-keybinds.module.code.ts"
import {
  selectAddons,
  toggleCurrentAddonState,
} from "../selector-packs/selector-packs.module.code.ts"
import {
  showActivePackInChat,
  startAddonSearch,
} from "../selector-search/selector-search.module.code.ts"

globalThis.TemperAddons = {
  ReloadTheUI: reloadUI,
  ShowActivePackInChat: showActivePackInChat,
  LoadPackByKeybind: loadPackByKeybind,
  SelectAddons: selectAddons,
  ToggleCurrentAddonState: toggleCurrentAddonState,
  StartAddonSearch: startAddonSearch,
  assignPackToKeybind,
  removePackFromKeybind,
}
