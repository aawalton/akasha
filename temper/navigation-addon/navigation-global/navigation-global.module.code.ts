import {
  ADDON_NAME,
  ADDON_VERSION,
} from "akasha/temper/navigation-addon/navigation-names/navigation-names.module.code.ts"

export interface TemperNavigationApi {
  ADDON_NAME: typeof ADDON_NAME
  ADDON_VERSION: typeof ADDON_VERSION
}

globalThis.TemperNavigation = {
  ADDON_NAME,
  ADDON_VERSION,
}
