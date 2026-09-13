import { registerAddonInit } from "akasha/temper/addon-init/modules/addon-init/addon-init.module.code.ts"
import { ADDON_NAME } from "akasha/temper/crafting-addon/modules/crafting-constants/crafting-constants.module.code.ts"
import { onAddOnLoaded } from "akasha/temper/crafting-addon/modules/crafting-events/crafting-events.module.code.ts"
import "akasha/temper/crafting-addon/modules/crafting-public-api/crafting-public-api.module.code.ts"
import "akasha/temper/crafting-addon/modules/potion-init/potion-init.module.code.ts"
import "akasha/temper/crafting-addon/modules/writ-init/writ-init.module.code.ts"

registerAddonInit(ADDON_NAME, onAddOnLoaded)
