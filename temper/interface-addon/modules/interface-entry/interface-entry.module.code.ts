import "akasha/temper/interface-addon/modules/interface-global/interface-global.module.code.ts"

import "akasha/temper/interface-addon/modules/quiet-entry/quiet-entry.module.code.ts"
import "akasha/temper/interface-addon/modules/assistant-entry/assistant-entry.module.code.ts"
import "akasha/temper/interface-addon/modules/fco-entry/fco-entry.module.code.ts"

import { ADDON_NAME } from "akasha/temper/interface-addon/modules/interface-identity/interface-identity.module.code.ts"
import { onAddOnLoaded } from "akasha/temper/interface-addon/modules/interface-load/interface-load.module.code.ts"
import { registerAddonInit } from "akasha/temper/modules/addon-init/addon-init.module.code.ts"

registerAddonInit(ADDON_NAME, onAddOnLoaded)
