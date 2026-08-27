import { ADDON_NAME, ADDON_VERSION } from "./constants"

export interface TemperCombatGlobal extends Record<string, unknown> {
  name: string
  version: string
}

declare global {
  var TemperCombat: TemperCombatGlobal
}

globalThis.TemperCombat = {
  name: ADDON_NAME,
  version: ADDON_VERSION,
}
