import "akasha/temper/interface-addon/interface-global/interface-global.module.code.ts"

import "akasha/temper/interface-addon/quiet-entry/quiet-entry.module.code.ts"
import "akasha/temper/interface-addon/assistant-entry/assistant-entry.module.code.ts"
import "akasha/temper/interface-addon/fco-entry/fco-entry.module.code.ts"

import { registerAddonInit } from "akasha/temper/addon-init/modules/addon-init/addon-init.module.code.ts"
import { ADDON_NAME } from "akasha/temper/interface-addon/interface-identity/interface-identity.module.code.ts"
import { onAddOnLoaded } from "akasha/temper/interface-addon/interface-load/interface-load.module.code.ts"

registerAddonInit(ADDON_NAME, onAddOnLoaded)
