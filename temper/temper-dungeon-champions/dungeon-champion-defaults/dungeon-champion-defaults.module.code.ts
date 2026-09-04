import {
  PINS_COLLECTED,
  PINS_COMPASS_KNOWN,
  PINS_COMPASS_UNKNOWN,
  PINS_UNKNOWN,
} from "../dungeon-champion-names/dungeon-champion-names.module.code.ts"

export interface PinTextureSettings {
  type: number
  size: number
  level: number
}

export interface DcsDefaults {
  compassMaxDistance: number
  pinTexture: PinTextureSettings
  completeColor: number[]
  incompleteColor: number[]
  filters: Record<string, boolean>
}

export const DEFAULTS: DcsDefaults = {
  compassMaxDistance: 0.05,
  pinTexture: {
    type: 1,
    size: 38,
    level: 40,
  },
  completeColor: [0, 1, 0, 0.7],
  incompleteColor: [1, 0, 0, 0.7],
  filters: {
    [PINS_COMPASS_UNKNOWN]: true,
    [PINS_COMPASS_KNOWN]: true,
    [PINS_UNKNOWN]: true,
    [PINS_COLLECTED]: true,
  },
}
