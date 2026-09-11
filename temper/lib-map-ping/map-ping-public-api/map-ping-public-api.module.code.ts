import { asGlobalObjectTable } from "akasha/temper/lib-map-ping/map-ping-casts/map-ping-casts.module.code.ts"
import { LIB_IDENTIFIER } from "akasha/temper/lib-map-ping/map-ping-constants/map-ping-constants.module.code.ts"
import { LIB } from "akasha/temper/lib-map-ping/map-ping-lib/map-ping-lib.module.code.ts"

const globals = asGlobalObjectTable(_G)
if (globals[LIB_IDENTIFIER] !== undefined) {
  error(`${LIB_IDENTIFIER} is already loaded`)
}
globals[LIB_IDENTIFIER] = LIB
