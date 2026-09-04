import "../housing-publish/housing-publish.module.code.ts"

import "../housing-init/housing-init.module.code.ts"

import { registerAddonInit } from "@akasha/temper-addon-init/addon-init"
import { ADDON_NAME } from "../housing-addon-names/housing-addon-names.module.code.ts"
import { onAddOnLoaded } from "../housing-load/housing-load.module.code.ts"

registerAddonInit(ADDON_NAME, onAddOnLoaded)
