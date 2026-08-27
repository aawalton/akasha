import "./ui-settings-menu"

import { reloadUI } from "./addon-manager"
import { assignPackToKeybind, loadPackByKeybind, removePackFromKeybind } from "./keybinds"
import { selectAddons, toggleCurrentAddonState } from "./packs"
import { showActivePackInChat, startAddonSearch } from "./search"

interface TemperAddonsApi {
  ReloadTheUI: (this: void) => void
  ShowActivePackInChat: (this: void) => void
  LoadPackByKeybind: (this: void, slot: number) => void
  SelectAddons: (this: void, selectAll: boolean) => void
  ToggleCurrentAddonState: (this: void) => void
  StartAddonSearch: (this: void) => void
  assignPackToKeybind: (this: void, slot: number, packName: string, charName: string) => void
  removePackFromKeybind: (this: void, slot: number) => void
}

declare global {
  var TemperAddons: TemperAddonsApi
}

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
