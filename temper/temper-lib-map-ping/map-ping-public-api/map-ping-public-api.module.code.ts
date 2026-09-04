import { asGlobalObjectTable } from "../map-ping-casts/map-ping-casts.module.code.ts"
import { LIB_IDENTIFIER } from "../map-ping-constants/map-ping-constants.module.code.ts"
import { LIB } from "../map-ping-lib/map-ping-lib.module.code.ts"

const globals = asGlobalObjectTable(_G)
if (globals[LIB_IDENTIFIER] !== undefined) {
  error(`${LIB_IDENTIFIER} is already loaded`)
}
globals[LIB_IDENTIFIER] = LIB
