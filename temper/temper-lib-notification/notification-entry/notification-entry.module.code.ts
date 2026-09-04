import type { GlobalTable } from "../notification-casts/notification-casts.module.code.ts"

import { LIB_ALIAS, LIB_NAME } from "../notification-names/notification-names.module.code.ts"
import { NOTIFICATION_LIB } from "../notification-provider-link/notification-provider-link.module.code.ts"
import { installOverrides } from "../notification-row-overrides/notification-row-overrides.module.code.ts"

const GLOBALS = globalThis as GlobalTable
if (GLOBALS[LIB_NAME] !== undefined) {
  error(`${LIB_NAME} is already loaded`)
}

GLOBALS[LIB_NAME] = NOTIFICATION_LIB
GLOBALS[LIB_ALIAS] = NOTIFICATION_LIB

installOverrides()
