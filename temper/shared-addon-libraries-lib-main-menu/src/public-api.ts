import { lib } from "./lib"
import type { Lib } from "./types"

declare global {
  var LibMainMenu2: Lib | undefined
}

function publish(): undefined {
  if (IsConsoleUI()) {
    return
  }
  if (globalThis.LibMainMenu2 !== undefined) {
    return
  }
  globalThis.LibMainMenu2 = lib
}

publish()
