import type { SkyShardsDefaults } from "../constants"
import {
  ADDON_NAME,
  buildDefaults,
  PINS_COLLECTED,
  PINS_COMPASS,
  PINS_UNKNOWN,
  pinTextures,
  SAVED_VARIABLES_NAME,
  SKYSHARDS_PINDATA_ACHIEVEMENTID,
  SKYSHARDS_PINDATA_MOREINFO,
  SKYSHARDS_PINDATA_ON_CITY_MAP,
  SKYSHARDS_PINDATA_UNDER_GROUND,
  SKYSHARDS_PINDATA_ZONEGUIDEINDEX,
} from "../constants"
import type { SkyshardPin } from "../data/types"
import { CompassCallback } from "./compass"
import { MapCallbackCreatePins, SetMainworldTint } from "./pins"
import { AlterSkyShardsIndicator, setSSP } from "./skill-panel"
import { consoleState } from "./state"
import { pinTooltipCreator } from "./tooltip"

type MaybeSkyshardPin = SkyshardPin | undefined
type SkillPointProbe = { GetTotalNumSkillPoints?: unknown }

function asSkyshardPin(this: void, value: unknown): SkyshardPin {
  return value as SkyshardPin
}

function asMaybeSkyshardPin(this: void, value: unknown): MaybeSkyshardPin {
  return value as MaybeSkyshardPin
}

function asSkillPointProbe(this: void, value: unknown): SkillPointProbe {
  return value as SkillPointProbe
}

function OnSkyshardsUpdated(this: void): undefined {
  LibMapPins.RefreshPins(PINS_UNKNOWN)
  LibMapPins.RefreshPins(PINS_COLLECTED)
  COMPASS_PINS.RefreshPins(PINS_COMPASS)
}

const clickHandler: Record<number, MapPinClickAction> = {
  [1]: {
    name: GetString(SKYS_SET_WAYPOINT),
    gamepadName: GetString(SKYS_SET_WAYPOINT),
    show: function (this: void, _pin: MapPin): boolean {
      return true
    },
    duplicates: function (this: void, pin1: MapPin, pin2: MapPin): boolean {
      const tag1 = asSkyshardPin(pin1.m_PinTag)
      const tag2 = asSkyshardPin(pin2.m_PinTag)
      return (
        tag1[SKYSHARDS_PINDATA_ACHIEVEMENTID] === tag2[SKYSHARDS_PINDATA_ACHIEVEMENTID] &&
        tag1[SKYSHARDS_PINDATA_ZONEGUIDEINDEX] === tag2[SKYSHARDS_PINDATA_ZONEGUIDEINDEX]
      )
    },
    callback: function (this: void, pin: MapPin): undefined {
      PingMap(
        MAP_PIN_TYPE_PLAYER_WAYPOINT,
        MAP_TYPE_LOCATION_CENTERED,
        pin.normalizedX,
        pin.normalizedY
      )
    },
  },
}

export function OnLoad(this: void, _eventCode: number, addOnName: string): undefined {
  if (addOnName !== ADDON_NAME) return

  EVENT_MANAGER.UnregisterForEvent(ADDON_NAME, EVENT_ADD_ON_LOADED)

  const db: SkyShardsDefaults = ZO_SavedVars.NewCharacterIdSettings(
    SAVED_VARIABLES_NAME,
    4,
    undefined,
    buildDefaults()
  )
  consoleState.db = db
  consoleState.mainworldColor = ZO_ColorDef.New(db.mainworldSkyshards)

  const totalPointsFn = asSkillPointProbe(SKILL_POINT_ALLOCATION_MANAGER).GetTotalNumSkillPoints
  setSSP(totalPointsFn != null)

  const pinTextureType = db.pinTexture.type
  const pinTextureLevel = db.pinTexture.level
  const pinTextureSize = db.pinTexture.size
  const compassMaxDistance = db.compassMaxDistance

  const pinLayoutUnknown: MapPinLayoutData = {
    level: pinTextureLevel,
    texture: pinTextures.unknown[pinTextureType],
    size: pinTextureSize,
    tint: SetMainworldTint,
  }
  const pinLayoutCollected: MapPinLayoutData = {
    level: pinTextureLevel,
    texture: pinTextures.collected[pinTextureType],
    size: pinTextureSize,
    tint: SetMainworldTint,
  }

  const pinLayoutCompassUnknown: CompassPinLayout = {
    maxDistance: compassMaxDistance,
    texture: pinTextures.unknown[pinTextureType],
    sizeCallback: function (
      this: void,
      pin: CompassPin,
      _angle: number,
      normalizedAngle: number
    ): undefined {
      if (zo_abs(normalizedAngle) > 0.25) {
        pin.SetDimensions(54 - 24 * zo_abs(normalizedAngle), 54 - 24 * zo_abs(normalizedAngle))
      } else {
        pin.SetDimensions(48, 48)
      }
    },
    additionalLayout: {
      [CUSTOM_COMPASS_LAYOUT_UPDATE]: function (this: void, pin: CompassPin): undefined {
        const pinTag = asMaybeSkyshardPin(pin.pinTag)
        if (pinTag != null) {
          const moreInfo = pinTag[SKYSHARDS_PINDATA_MOREINFO]
          if (
            moreInfo == null ||
            moreInfo === SKYSHARDS_PINDATA_ON_CITY_MAP ||
            moreInfo === SKYSHARDS_PINDATA_UNDER_GROUND
          ) {
            const icon = pin.GetNamedChild<TextureControl>("Background")
            if (icon != null && consoleState.mainworldColor != null) {
              const [r, g, b, a] = consoleState.mainworldColor.UnpackRGBA()
              icon.SetColor(r, g, b, a)
            }
          }
        }
      },
    },
    mapPinTypeString: PINS_UNKNOWN,
    onToggleCallback: function (this: void, compassPinType: string, enabled: boolean): undefined {
      COMPASS_PINS.SetCompassPinEnabled(compassPinType, enabled)
      COMPASS_PINS.RefreshPins(compassPinType)
    },
  }

  LibMapPins.AddPinType(
    PINS_UNKNOWN,
    function (this: void): undefined {
      MapCallbackCreatePins(PINS_UNKNOWN)
    },
    undefined,
    pinLayoutUnknown,
    pinTooltipCreator
  )
  LibMapPins.AddPinType(
    PINS_COLLECTED,
    function (this: void): undefined {
      MapCallbackCreatePins(PINS_COLLECTED)
    },
    undefined,
    pinLayoutCollected,
    pinTooltipCreator
  )

  LibMapPins.AddPinFilter(PINS_UNKNOWN, GetString(SKYS_FILTER_UNKNOWN), false, db.filters)
  LibMapPins.AddPinFilter(PINS_COLLECTED, GetString(SKYS_FILTER_COLLECTED), false, db.filters)

  LibMapPins.SetClickHandlers(PINS_UNKNOWN, clickHandler)
  LibMapPins.SetClickHandlers(PINS_COLLECTED, clickHandler)

  COMPASS_PINS.AddCustomPin(
    PINS_COMPASS,
    function (this: void): undefined {
      CompassCallback()
    },
    pinLayoutCompassUnknown,
    db.filters
  )
  COMPASS_PINS.RefreshPins(PINS_COMPASS)

  AlterSkyShardsIndicator()

  RedirectTexture(
    "EsoUI/Art/MapPins/skyshard_seen.dds",
    "/esoui/art/icons/heraldrycrests_misc_blank_01.dds"
  )
  RedirectTexture(
    "EsoUI/Art/Compass/skyshard_seen.dds",
    "/esoui/art/icons/heraldrycrests_misc_blank_01.dds"
  )

  EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_SKYSHARDS_UPDATED, OnSkyshardsUpdated)
}
