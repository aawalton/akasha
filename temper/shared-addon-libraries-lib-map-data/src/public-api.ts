import { asGlobalObjectTable } from "./casts"
import { INTERNAL_IDENTIFIER, LIB_IDENTIFIER } from "./constants"
import { PSEUDO_MAP_INDICES } from "./generated/map-data.generated"
import { internal, lib } from "./lib-state"

const globals = asGlobalObjectTable(_G)
globals[LIB_IDENTIFIER] = lib
globals[INTERNAL_IDENTIFIER] = internal

for (const [pseudoName, pseudoIndex] of pairs(PSEUDO_MAP_INDICES)) {
  globals[pseudoName] = pseudoIndex
}
