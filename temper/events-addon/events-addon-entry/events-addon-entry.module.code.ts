import { registerAddonInit } from "@akasha/temper-addon-init/addon-init"
import "../events-addon-global/events-addon-global.module.code.ts"
import { onAddOnLoaded } from "../events-addon-loaded/events-addon-loaded.module.code.ts"
import { ADDON_NAME } from "../events-addon-names/events-addon-names.module.code.ts"

registerAddonInit(ADDON_NAME, onAddOnLoaded)
