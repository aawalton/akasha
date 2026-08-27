import { asGlobalObjectTable } from "./casts"
import { LIB_IDENTIFIER } from "./constants"
import { lib } from "./lib-state"

const globals = asGlobalObjectTable(_G)
if (globals[LIB_IDENTIFIER] !== undefined) {
  error(`${LIB_IDENTIFIER} is already loaded`)
}
globals[LIB_IDENTIFIER] = lib
