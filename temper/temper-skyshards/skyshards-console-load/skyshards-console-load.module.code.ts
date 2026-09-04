import { compassCallback } from "../skyshards-console-compass/skyshards-console-compass.module.code.ts"
import {
  mapCallbackCreatePins,
  setMainworldTint,
} from "../skyshards-console-pins/skyshards-console-pins.module.code.ts"
import {
  alterSkyShardsIndicator,
  setSSP,
} from "../skyshards-console-skill-panel/skyshards-console-skill-panel.module.code.ts"
import { CONSOLE_STATE } from "../skyshards-console-state/skyshards-console-state.module.code.ts"
import { PIN_TOOLTIP_CREATOR } from "../skyshards-console-tooltip/skyshards-console-tooltip.module.code.ts"
import type { SkyShardsDefaults } from "../skyshards-constants/skyshards-constants.module.code.ts"
import {
  ADDON_NAME,
  buildDefaults,
  PIN_TEXTURES,
  PINS_COLLECTED,
  PINS_COMPASS,
  PINS_UNKNOWN,
  SAVED_VARIABLES_NAME,
  SKYSHARDS_PINDATA_ACHIEVEMENTID,
  SKYSHARDS_PINDATA_MOREINFO,
  SKYSHARDS_PINDATA_ON_CITY_MAP,
  SKYSHARDS_PINDATA_UNDER_GROUND,
  SKYSHARDS_PINDATA_ZONEGUIDEINDEX,
} from "../skyshards-constants/skyshards-constants.module.code.ts"
import type { SkyshardPin } from "../skyshards-types/skyshards-types.module.code.ts"

type MaybeSkyshardPin = SkyshardPin | undefined
type SkillPointProbe = { GetTotalNumSkillPoints?: unknown }

function onSkyshardsUpdated(this: void): undefined {
  LibMapPins.RefreshPins(PINS_UNKNOWN)
  LibMapPins.RefreshPins(PINS_COLLECTED)
  COMPASS_PINS.RefreshPins(PINS_COMPASS)
}

const CLICK_HANDLER: Record<number, MapPinClickAction> = {
  [1]: {
    name: GetString(SKYS_SET_WAYPOINT),
    gamepadName: GetString(SKYS_SET_WAYPOINT),
    show: function (this: void, _pin: MapPin): boolean {
      return true
    },
    duplicates: function (this: void, pin1: MapPin, pin2: MapPin): boolean {
      const tag1 = pin1.m_PinTag as SkyshardPin
      const tag2 = pin2.m_PinTag as SkyshardPin
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

export function onLoad(this: void, _eventCode: number, addOnName: string): undefined {
  if (addOnName !== ADDON_NAME) return

  EVENT_MANAGER.UnregisterForEvent(ADDON_NAME, EVENT_ADD_ON_LOADED)

  const db: SkyShardsDefaults = ZO_SavedVars.NewCharacterIdSettings(
    SAVED_VARIABLES_NAME,
    4,
    undefined,
    buildDefaults()
  )
  CONSOLE_STATE.db = db
  CONSOLE_STATE.mainworldColor = ZO_ColorDef.New(db.mainworldSkyshards)

  const totalPointsFn = (SKILL_POINT_ALLOCATION_MANAGER as SkillPointProbe).GetTotalNumSkillPoints
  setSSP(totalPointsFn != null)

  const pinTextureType = db.pinTexture.type
  const pinTextureLevel = db.pinTexture.level
  const pinTextureSize = db.pinTexture.size
  const compassMaxDistance = db.compassMaxDistance

  const pinLayoutUnknown: MapPinLayoutData = {
    level: pinTextureLevel,
    texture: PIN_TEXTURES.unknown[pinTextureType],
    size: pinTextureSize,
    tint: setMainworldTint,
  }
  const pinLayoutCollected: MapPinLayoutData = {
    level: pinTextureLevel,
    texture: PIN_TEXTURES.collected[pinTextureType],
    size: pinTextureSize,
    tint: setMainworldTint,
  }

  const pinLayoutCompassUnknown: CompassPinLayout = {
    maxDistance: compassMaxDistance,
    texture: PIN_TEXTURES.unknown[pinTextureType],
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
        const pinTag = pin.pinTag as MaybeSkyshardPin
        if (pinTag != null) {
          const moreInfo = pinTag[SKYSHARDS_PINDATA_MOREINFO]
          if (
            moreInfo == null ||
            moreInfo === SKYSHARDS_PINDATA_ON_CITY_MAP ||
            moreInfo === SKYSHARDS_PINDATA_UNDER_GROUND
          ) {
            const icon = pin.GetNamedChild<TextureControl>("Background")
            if (icon != null && CONSOLE_STATE.mainworldColor != null) {
              const [r, g, b, a] = CONSOLE_STATE.mainworldColor.UnpackRGBA()
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
      mapCallbackCreatePins(PINS_UNKNOWN)
    },
    undefined,
    pinLayoutUnknown,
    PIN_TOOLTIP_CREATOR
  )
  LibMapPins.AddPinType(
    PINS_COLLECTED,
    function (this: void): undefined {
      mapCallbackCreatePins(PINS_COLLECTED)
    },
    undefined,
    pinLayoutCollected,
    PIN_TOOLTIP_CREATOR
  )

  LibMapPins.AddPinFilter(PINS_UNKNOWN, GetString(SKYS_FILTER_UNKNOWN), false, db.filters)
  LibMapPins.AddPinFilter(PINS_COLLECTED, GetString(SKYS_FILTER_COLLECTED), false, db.filters)

  LibMapPins.SetClickHandlers(PINS_UNKNOWN, CLICK_HANDLER)
  LibMapPins.SetClickHandlers(PINS_COLLECTED, CLICK_HANDLER)

  COMPASS_PINS.AddCustomPin(
    PINS_COMPASS,
    function (this: void): undefined {
      compassCallback()
    },
    pinLayoutCompassUnknown,
    db.filters
  )
  COMPASS_PINS.RefreshPins(PINS_COMPASS)

  alterSkyShardsIndicator()

  RedirectTexture(
    "EsoUI/Art/MapPins/skyshard_seen.dds",
    "/esoui/art/icons/heraldrycrests_misc_blank_01.dds"
  )
  RedirectTexture(
    "EsoUI/Art/Compass/skyshard_seen.dds",
    "/esoui/art/icons/heraldrycrests_misc_blank_01.dds"
  )

  EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_SKYSHARDS_UPDATED, onSkyshardsUpdated)
}
