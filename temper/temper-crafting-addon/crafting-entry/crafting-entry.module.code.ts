import { registerAddonInit } from "@akasha/temper-addon-init/addon-init"
import { ADDON_NAME } from "../crafting-constants/crafting-constants.module.code.ts"
import { onAddOnLoaded } from "../crafting-events/crafting-events.module.code.ts"
import "../crafting-public-api/crafting-public-api.module.code.ts"
import "../potion-init/potion-init.module.code.ts"
import "../writ-init/writ-init.module.code.ts"

registerAddonInit(ADDON_NAME, onAddOnLoaded)
