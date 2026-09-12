import "akasha/temper/housing-addon/housing-publish/housing-publish.module.code.ts"

import "akasha/temper/housing-addon/housing-init/housing-init.module.code.ts"

import { registerAddonInit } from "akasha/temper/addon-init/modules/addon-init/addon-init.module.code.ts"
import { ADDON_NAME } from "akasha/temper/housing-addon/housing-addon-names/housing-addon-names.module.code.ts"
import { onAddOnLoaded } from "akasha/temper/housing-addon/housing-load/housing-load.module.code.ts"

registerAddonInit(ADDON_NAME, onAddOnLoaded)
