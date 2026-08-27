import { lib } from "./lib"
import type { LibSurface } from "./types"

declare global {
  var LibDataEncode: LibSurface
}

globalThis.LibDataEncode = lib
