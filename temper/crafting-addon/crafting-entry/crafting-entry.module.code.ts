import { registerAddonInit } from "akasha/temper/addon-init/modules/addon-init/addon-init.module.code.ts"
import { ADDON_NAME } from "akasha/temper/crafting-addon/crafting-constants/crafting-constants.module.code.ts"
import { onAddOnLoaded } from "akasha/temper/crafting-addon/crafting-events/crafting-events.module.code.ts"
import "akasha/temper/crafting-addon/crafting-public-api/crafting-public-api.module.code.ts"
import "akasha/temper/crafting-addon/potion-init/potion-init.module.code.ts"
import "akasha/temper/crafting-addon/writ-init/writ-init.module.code.ts"

registerAddonInit(ADDON_NAME, onAddOnLoaded)
