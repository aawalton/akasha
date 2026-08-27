import { asGlobalObjectTable } from "./casts"
import { LIB_NAME } from "./constants"
import { lib } from "./lib-state"
import { UI_STRINGS_EN } from "./ui-strings"

const globals = asGlobalObjectTable(_G)
assert(
  globals[LIB_NAME] === undefined,
  string.format(UI_STRINGS_EN.LibraryAlreadyLoaded ?? "", LIB_NAME)
)[0]
globals[LIB_NAME] = lib
