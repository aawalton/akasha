import "../navigation-global/navigation-global.module.code.ts"

import "../compass-pins-start/compass-pins-start.module.code.ts"
import "../map-pins-start/map-pins-start.module.code.ts"
import "../destinations-start/destinations-start.module.code.ts"
import "../minimap-start/minimap-start.module.code.ts"

import { registerAddonInit } from "@akasha/temper-addon-init/addon-init"
import { onAddOnLoaded } from "../navigation-loaded/navigation-loaded.module.code.ts"
import { ADDON_NAME } from "../navigation-names/navigation-names.module.code.ts"

registerAddonInit(ADDON_NAME, onAddOnLoaded)
