import { lib } from "./alchemy-station"
import type { Lib } from "./types"

declare global {
  var LibAlchemyStation: Lib
}

globalThis.LibAlchemyStation = lib
