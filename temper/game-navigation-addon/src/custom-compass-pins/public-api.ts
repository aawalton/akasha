import { asCustomCompassPins } from "./casts"
import {
  CUSTOM_COMPASS_LAYOUT_RESET as LAYOUT_RESET,
  CUSTOM_COMPASS_LAYOUT_UPDATE as LAYOUT_UPDATE,
} from "./constants"
import { lib } from "./lib"

globalThis.COMPASS_PINS = asCustomCompassPins(lib)
globalThis.CUSTOM_COMPASS_LAYOUT_UPDATE = LAYOUT_UPDATE
globalThis.CUSTOM_COMPASS_LAYOUT_RESET = LAYOUT_RESET
