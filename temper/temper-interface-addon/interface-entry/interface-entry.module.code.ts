import "../interface-global/interface-global.module.code.ts"

import "../quiet-entry/quiet-entry.module.code.ts"
import "../assistant-entry/assistant-entry.module.code.ts"
import "../fco-entry/fco-entry.module.code.ts"

import { registerAddonInit } from "@akasha/temper-addon-init/addon-init"
import { ADDON_NAME } from "../interface-identity/interface-identity.module.code.ts"
import { onAddOnLoaded } from "../interface-load/interface-load.module.code.ts"

registerAddonInit(ADDON_NAME, onAddOnLoaded)
