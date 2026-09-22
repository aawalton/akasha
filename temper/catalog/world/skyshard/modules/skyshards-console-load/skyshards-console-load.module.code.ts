import { MAP_PINS } from "akasha/temper/addon/pages/world/map-pins/modules/map-pins-public-api/map-pins-public-api.module.code.ts"
import { CUSTOM_COMPASS_LAYOUT_UPDATE } from "akasha/temper/addon/pages/world/navigation/modules/compass-pins-constants/compass-pins-constants.module.code.ts"
import { COMPASS_PINS } from "akasha/temper/addon/pages/world/navigation/modules/compass-pins-global/compass-pins-global.module.code.ts"
import { compassCallback } from "akasha/temper/catalog/world/skyshard/modules/skyshards-console-compass/skyshards-console-compass.module.code.ts"
import {
  mapCallbackCreatePins,
  setMainworldTint,
} from "akasha/temper/catalog/world/skyshard/modules/skyshards-console-pins/skyshards-console-pins.module.code.ts"
import { alterSkyShardsIndicator } from "akasha/temper/catalog/world/skyshard/modules/skyshards-console-skill-panel/skyshards-console-skill-panel.module.code.ts"
import { CONSOLE_STATE } from "akasha/temper/catalog/world/skyshard/modules/skyshards-console-state/skyshards-console-state.module.code.ts"
import { PIN_TOOLTIP_CREATOR } from "akasha/temper/catalog/world/skyshard/modules/skyshards-console-tooltip/skyshards-console-tooltip.module.code.ts"
import type { SkyShardsDefaults } from "akasha/temper/catalog/world/skyshard/modules/skyshards-constants/skyshards-constants.module.code.ts"
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
} from "akasha/temper/catalog/world/skyshard/modules/skyshards-constants/skyshards-constants.module.code.ts"
import { SKILL_POINT_TOTAL } from "akasha/temper/catalog/world/skyshard/modules/skyshards-skill-point-total/skyshards-skill-point-total.module.code.ts"
import type { SkyshardPin } from "akasha/temper/catalog/world/skyshard/modules/skyshards-types/skyshards-types.module.code.ts"
import "akasha/temper/addon/type/custom-compass-pins/custom-compass-pins.type-declaration.d.ts"
import "akasha/temper/addon/pages/world/map-pins/map-pins-declarations/map-pins-declarations.type-declaration.d.ts"
import "akasha/temper/catalog/world/skyshard/skyshards-string-ids/skyshards-string-ids.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-18/eso-enums-18.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-04/eso-functions-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-map-ui/eso-map-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

type MaybeSkyshardPin = SkyshardPin | undefined
type SkillPointProbe = { GetTotalNumSkillPoints?: unknown }

function onSkyshardsUpdated(this: void): undefined {
  MAP_PINS.RefreshPins(PINS_UNKNOWN)
  MAP_PINS.RefreshPins(PINS_COLLECTED)
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
  SKILL_POINT_TOTAL.known = totalPointsFn != null

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

  MAP_PINS.AddPinType(
    PINS_UNKNOWN,
    function (this: void): undefined {
      mapCallbackCreatePins(PINS_UNKNOWN)
    },
    undefined,
    pinLayoutUnknown,
    PIN_TOOLTIP_CREATOR
  )
  MAP_PINS.AddPinType(
    PINS_COLLECTED,
    function (this: void): undefined {
      mapCallbackCreatePins(PINS_COLLECTED)
    },
    undefined,
    pinLayoutCollected,
    PIN_TOOLTIP_CREATOR
  )

  MAP_PINS.AddPinFilter(PINS_UNKNOWN, GetString(SKYS_FILTER_UNKNOWN), false, db.filters)
  MAP_PINS.AddPinFilter(PINS_COLLECTED, GetString(SKYS_FILTER_COLLECTED), false, db.filters)

  MAP_PINS.SetClickHandlers(PINS_UNKNOWN, CLICK_HANDLER)
  MAP_PINS.SetClickHandlers(PINS_COLLECTED, CLICK_HANDLER)

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
