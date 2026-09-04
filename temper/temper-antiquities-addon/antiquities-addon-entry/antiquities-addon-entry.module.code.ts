import "../antiquities-addon-global/antiquities-addon-global.module.code.ts"

import "../leads-init/leads-init.module.code.ts"

import { registerAddonInit } from "@akasha/temper-addon-init/addon-init"
import { onAddOnLoaded } from "../antiquities-addon-loaded/antiquities-addon-loaded.module.code.ts"
import { ADDON_NAME } from "../antiquities-addon-names/antiquities-addon-names.module.code.ts"

registerAddonInit(ADDON_NAME, onAddOnLoaded)
