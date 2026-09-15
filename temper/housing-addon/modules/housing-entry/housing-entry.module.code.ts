import "akasha/temper/housing-addon/modules/housing-publish/housing-publish.module.code.ts"

import "akasha/temper/housing-addon/modules/housing-init/housing-init.module.code.ts"

import { ADDON_NAME } from "akasha/temper/housing-addon/modules/housing-addon-names/housing-addon-names.module.code.ts"
import { onAddOnLoaded } from "akasha/temper/housing-addon/modules/housing-load/housing-load.module.code.ts"
import { registerAddonInit } from "akasha/temper/modules/addon-init/addon-init.module.code.ts"

registerAddonInit(ADDON_NAME, onAddOnLoaded)
