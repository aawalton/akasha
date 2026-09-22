import "akasha/temper/eso/type/eso-map-ui/eso-map-ui.type-declaration.d.ts"

export const ADDON_NAME = "TemperSkyShards"
export const SAVED_VARIABLES_NAME = "TemperSkyShards_SavedVariables"
export const ADDON_VERSION = "1.0.0"

export const PINS_UNKNOWN = "SkySMapPin_unknown"
export const PINS_COLLECTED = "SkySMapPin_collected"
export const PINS_COMPASS = "SkySCompassPin_unknown"

export const SKYSHARDS_PINDATA_LOCX = 0
export const SKYSHARDS_PINDATA_LOCY = 1
export const SKYSHARDS_PINDATA_ACHIEVEMENTID = 2
export const SKYSHARDS_PINDATA_ZONEGUIDEINDEX = 3
export const SKYSHARDS_PINDATA_MOREINFO = 4

export const SKYSHARDS_PINDATA_ON_CITY_MAP = 1
export const SKYSHARDS_PINDATA_UNDER_GROUND = 4

export interface SkyShardsDefaults {
  compassMaxDistance: number
  pinTexture: {
    type: number
    size: number
    level: number
  }
  filters: Record<string, boolean>
  mainworldSkyshards: string
  immersiveMode: number
}

export function buildDefaults(this: void): SkyShardsDefaults {
  return {
    compassMaxDistance: 0.05,
    pinTexture: {
      type: 1,
      size: 38,
      level: 80,
    },
    filters: {
      [PINS_COMPASS]: true,
      [PINS_UNKNOWN]: true,
      [PINS_COLLECTED]: true,
    },
    mainworldSkyshards: ZO_SELECTED_TEXT.ToHex(),
    immersiveMode: 1,
  }
}

export const PIN_TEXTURES: {
  unknown: Record<number, string>
  collected: Record<number, string>
} = {
  unknown: {
    [1]: "TemperWorld/Icons/Skyshard-unknown.dds",
    [2]: "TemperWorld/Icons/Skyshard-unknown-alternative.dds",
    [3]: "TemperWorld/Icons/Skyshard-unknown-Esohead.dds",
    [4]: "TemperWorld/Icons/Skyshard-unknown-Rushmik.dds",
    [5]: "TemperWorld/Icons/Skyshard-unknown-Heidra.dds",
  },
  collected: {
    [1]: "TemperWorld/Icons/Skyshard-collected.dds",
    [2]: "TemperWorld/Icons/Skyshard-collected-alternative.dds",
    [3]: "TemperWorld/Icons/Skyshard-collected-Esohead.dds",
    [4]: "TemperWorld/Icons/Skyshard-collected-Rushmik.dds",
    [5]: "TemperWorld/Icons/Skyshard-collected-Heidra.dds",
  },
}
