import { lib } from "./lib"
import type { Lib } from "./types"

declare global {
  var LibSlashCommander: Lib
}

globalThis.LibSlashCommander = lib
