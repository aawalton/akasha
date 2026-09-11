import type { GlobalTable } from "akasha/temper/lib-main-menu/main-menu-casts/main-menu-casts.module.code.ts"

import { LIB } from "akasha/temper/lib-main-menu/main-menu-library/main-menu-library.module.code.ts"

function publish(): undefined {
  if (IsConsoleUI()) {
    return
  }
  const glob = globalThis as GlobalTable
  if (glob.LibMainMenu2 !== undefined) {
    return
  }
  glob.LibMainMenu2 = LIB
}

publish()
