import { registerAddonInit } from "akasha/temper/addon-init/modules/addon-init/addon-init.module.code.ts"
import "akasha/temper/collections-addon/collections-addon-global/collections-addon-global.module.code.ts"
import { onAddOnLoaded } from "akasha/temper/collections-addon/collections-addon-loaded/collections-addon-loaded.module.code.ts"
import { ADDON_NAME } from "akasha/temper/collections-addon/collections-addon-names/collections-addon-names.module.code.ts"

registerAddonInit(ADDON_NAME, onAddOnLoaded)
