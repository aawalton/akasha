import { registerTemperCommand } from "./commands"
import { getHideRegistry } from "./hide-init"
import { isHudBarReady, refreshHudBar, registerHudField } from "./hud-bar"
import type { TemperHudApi } from "./types"

declare global {
  var TemperHud: TemperHudApi | undefined
}

globalThis.TemperHud = {
  registerField: registerHudField,
  registerCommand: registerTemperCommand,
  refresh: refreshHudBar,
  isReady: isHudBarReady,
  registerHideableComponent: (id, resolve, reason) => {
    getHideRegistry().register({ id, resolve, reason })
  },
  setComponentHidden: (id, hidden) => {
    const registry = getHideRegistry()
    registry.setHidden(id, hidden)
    registry.applyOne(id)
  },
}
