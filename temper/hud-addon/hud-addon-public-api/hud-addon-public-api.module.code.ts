import "../../addon-library-types/temper-hud-global/temper-hud-global.type-declaration.d.ts"

import {
  isHudBarReady,
  refreshHudBar,
  registerHudField,
} from "../hud-addon-bar/hud-addon-bar.module.code.ts"
import { registerTemperCommand } from "../hud-addon-commands/hud-addon-commands.module.code.ts"
import { getHideRegistry } from "../hud-addon-hide-init/hud-addon-hide-init.module.code.ts"

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
