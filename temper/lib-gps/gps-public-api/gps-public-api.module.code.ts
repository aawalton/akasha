import { LIB_IDENTIFIER } from "akasha/temper/lib-gps/gps-constants/gps-constants.module.code.ts"
import { lib } from "akasha/temper/lib-gps/gps-lib-state/gps-lib-state.module.code.ts"
import { asGlobalObjectTable } from "akasha/temper/lib-gps/modules/gps-casts/gps-casts.module.code.ts"

const globals = asGlobalObjectTable(_G)
if (globals[LIB_IDENTIFIER] !== undefined) {
  error(LIB_IDENTIFIER + " is already loaded")
}
globals[LIB_IDENTIFIER] = lib
