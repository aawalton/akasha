import { asGlobalObjectTable } from "../zone-casts/zone-casts.module.code.ts"
import { LIB_NAME } from "../zone-constants/zone-constants.module.code.ts"
import { lib } from "../zone-lib-state/zone-lib-state.module.code.ts"
import { UI_STRINGS_EN } from "../zone-ui-strings/zone-ui-strings.module.code.ts"

const globals = asGlobalObjectTable(_G)
assert(
  globals[LIB_NAME] === undefined,
  string.format(UI_STRINGS_EN.LibraryAlreadyLoaded ?? "", LIB_NAME)
)[0]
globals[LIB_NAME] = lib
