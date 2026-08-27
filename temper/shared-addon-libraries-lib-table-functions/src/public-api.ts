import { ltf } from "./table-functions"
import type { Lib } from "./types"

declare global {
  var TemperTableFunctions: Lib
}

globalThis.TemperTableFunctions = ltf
