import { asGlobalObjectTable } from "../map-data-casts/map-data-casts.module.code.ts"
import {
  INTERNAL_IDENTIFIER,
  LIB_IDENTIFIER,
} from "../map-data-constants/map-data-constants.module.code.ts"
import { INTERNAL, LIB } from "../map-data-lib-state/map-data-lib-state.module.code.ts"
import { PSEUDO_MAP_INDICES } from "../map-data-pseudo-indices/map-data-pseudo-indices.module.code.ts"

const globals = asGlobalObjectTable(_G)
globals[LIB_IDENTIFIER] = LIB
globals[INTERNAL_IDENTIFIER] = INTERNAL

for (const [pseudoName, pseudoIndex] of pairs(PSEUDO_MAP_INDICES)) {
  globals[pseudoName] = pseudoIndex
}
