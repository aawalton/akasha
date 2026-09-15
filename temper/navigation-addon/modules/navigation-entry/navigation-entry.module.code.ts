import "akasha/temper/navigation-addon/modules/navigation-global/navigation-global.module.code.ts"

import "akasha/temper/navigation-addon/modules/compass-pins-start/compass-pins-start.module.code.ts"
import "akasha/temper/navigation-addon/modules/map-pins-start/map-pins-start.module.code.ts"
import "akasha/temper/navigation-addon/modules/destinations-start/destinations-start.module.code.ts"
import "akasha/temper/navigation-addon/modules/minimap-start/minimap-start.module.code.ts"

import { registerAddonInit } from "akasha/temper/modules/addon-init/addon-init.module.code.ts"
import { onAddOnLoaded } from "akasha/temper/navigation-addon/modules/navigation-loaded/navigation-loaded.module.code.ts"
import { ADDON_NAME } from "akasha/temper/navigation-addon/modules/navigation-names/navigation-names.module.code.ts"

registerAddonInit(ADDON_NAME, onAddOnLoaded)
