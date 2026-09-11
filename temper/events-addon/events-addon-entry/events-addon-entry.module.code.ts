import { registerAddonInit } from "akasha/temper/addon-init/addon-init/addon-init.module.code.ts"
import "akasha/temper/events-addon/events-addon-global/events-addon-global.module.code.ts"
import { onAddOnLoaded } from "akasha/temper/events-addon/events-addon-loaded/events-addon-loaded.module.code.ts"
import { ADDON_NAME } from "akasha/temper/events-addon/events-addon-names/events-addon-names.module.code.ts"

registerAddonInit(ADDON_NAME, onAddOnLoaded)
