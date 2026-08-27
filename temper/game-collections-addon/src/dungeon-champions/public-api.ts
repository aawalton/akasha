import { ADDON_NAME, ADDON_VERSION } from "./constants"

declare global {
  var TemperDungeonChampions: {
    ADDON_NAME: typeof ADDON_NAME
    ADDON_VERSION: typeof ADDON_VERSION
  }
}

globalThis.TemperDungeonChampions = {
  ADDON_NAME,
  ADDON_VERSION,
}
