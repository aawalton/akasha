import { ADDON_NAME, ADDON_VERSION } from "./constants"

export interface TemperCollectionsApi {
  ADDON_NAME: typeof ADDON_NAME
  ADDON_VERSION: typeof ADDON_VERSION
}

declare global {
  var TemperCollections: TemperCollectionsApi
}

globalThis.TemperCollections = {
  ADDON_NAME,
  ADDON_VERSION,
}
