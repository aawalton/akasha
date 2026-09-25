import { MAP_PINS } from "akasha/temper/addon/pages/world/map-pins/modules/map-pins-public-api/map-pins-public-api.module.code.ts"
import {
  PIN_TEXTURES,
  PINS_COLLECTED,
  PINS_UNKNOWN,
  SKYSHARDS_PINDATA_ACHIEVEMENTID,
  SKYSHARDS_PINDATA_LOCX,
  SKYSHARDS_PINDATA_LOCY,
  SKYSHARDS_PINDATA_MOREINFO,
  SKYSHARDS_PINDATA_ON_CITY_MAP,
  SKYSHARDS_PINDATA_UNDER_GROUND,
  SKYSHARDS_PINDATA_ZONEGUIDEINDEX,
} from "akasha/temper/catalog/world/skyshard/modules/skyshards-constants/skyshards-constants.module.code.ts"
import { shouldDisplaySkyshards } from "akasha/temper/catalog/world/skyshard/modules/skyshards-pc-immersive/skyshards-pc-immersive.module.code.ts"
import {
  field,
  getCurrentSkyshards,
  getLastZone,
  optionalField,
  resolveShardId,
  updateSkyshardsData,
} from "akasha/temper/catalog/world/skyshard/modules/skyshards-pc-pin-data/skyshards-pc-pin-data.module.code.ts"
import {
  getDb,
  getMainworldColor,
} from "akasha/temper/catalog/world/skyshard/modules/skyshards-pc-state/skyshards-pc-state.module.code.ts"
import { PIN_TOOLTIP_CREATOR } from "akasha/temper/catalog/world/skyshard/modules/skyshards-pc-tooltip/skyshards-pc-tooltip.module.code.ts"
import type { SkyshardPin } from "akasha/temper/catalog/world/skyshard/modules/skyshards-types/skyshards-types.module.code.ts"
import "akasha/temper/addon/pages/world/map-pins/map-pins-declarations/map-pins-declarations.type-declaration.d.ts"
import "akasha/temper/catalog/world/skyshard/skyshards-string-ids/skyshards-string-ids.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-13/eso-enums-13.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-18/eso-enums-18.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-04/eso-functions-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-map-ui/eso-map-ui.type-declaration.d.ts"

function setMainworldTint(this: void, pin: MapPin): unknown {
  if (pin.m_PinTag != null) {
    const pinTag = pin.m_PinTag as SkyshardPin
    const moreInfo = optionalField(pinTag, SKYSHARDS_PINDATA_MOREINFO)
    if (
      moreInfo == null ||
      moreInfo === SKYSHARDS_PINDATA_ON_CITY_MAP ||
      moreInfo === SKYSHARDS_PINDATA_UNDER_GROUND
    ) {
      return getMainworldColor()
    }
  }

  return ZO_SELECTED_TEXT
}

function mapCallbackCreatePins(this: void, pinType: string): undefined {
  if (GetMapType() > MAPTYPE_ZONE) return

  const shouldDisplay = shouldDisplaySkyshards()

  const [zone, subzone] = MAP_PINS.GetZoneAndSubzone(false, true, false)
  if (GetMapTileTexture() !== getLastZone()) {
    updateSkyshardsData(zone ?? "", subzone ?? "")
  }

  const skyshards = getCurrentSkyshards()
  if (skyshards != null) {
    for (const pinData of skyshards) {
      const shardId = resolveShardId(pinData)
      if (shardId != null) {
        const shardStatus = GetSkyshardDiscoveryStatus(shardId)
        if (pinType === PINS_COLLECTED) {
          if (
            shardStatus === SKYSHARD_DISCOVERY_STATUS_ACQUIRED &&
            MAP_PINS.IsEnabled(PINS_COLLECTED)
          ) {
            MAP_PINS.CreatePin(
              PINS_COLLECTED,
              pinData,
              field(pinData, SKYSHARDS_PINDATA_LOCX),
              field(pinData, SKYSHARDS_PINDATA_LOCY)
            )
          }
        }

        if (pinType === PINS_UNKNOWN) {
          if (
            shouldDisplay &&
            (shardStatus === SKYSHARD_DISCOVERY_STATUS_DISCOVERED ||
              shardStatus === SKYSHARD_DISCOVERY_STATUS_UNDISCOVERED) &&
            MAP_PINS.IsEnabled(PINS_UNKNOWN)
          ) {
            MAP_PINS.CreatePin(
              PINS_UNKNOWN,
              pinData,
              field(pinData, SKYSHARDS_PINDATA_LOCX),
              field(pinData, SKYSHARDS_PINDATA_LOCY)
            )
          }
        }
      }
    }
  }
}

interface SkyShardsMapPinLayouts {
  unknown: MapPinLayoutData
  collected: MapPinLayoutData
}

export function buildMapPinLayouts(this: void): SkyShardsMapPinLayouts {
  const db = getDb()
  const pinTextureType = db.pinTexture.type
  const pinTextureLevel = db.pinTexture.level
  const pinTextureSize = db.pinTexture.size
  return {
    unknown: {
      level: pinTextureLevel,
      texture: PIN_TEXTURES.unknown[pinTextureType],
      size: pinTextureSize,
      tint: setMainworldTint,
    },
    collected: {
      level: pinTextureLevel,
      texture: PIN_TEXTURES.collected[pinTextureType],
      size: pinTextureSize,
      tint: setMainworldTint,
    },
  }
}

const CLICK_HANDLER: Record<number, MapPinClickAction> = {
  [1]: {
    name: GetString(SI_TEMPER_SKYSHARDS_SET_WAYPOINT),
    gamepadName: GetString(SI_TEMPER_SKYSHARDS_SET_WAYPOINT),
    show: function (this: void, _pin: MapPin): boolean {
      return true
    },
    duplicates: function (this: void, pin1: MapPin, pin2: MapPin): boolean {
      const tag1 = pin1.m_PinTag as SkyshardPin
      const tag2 = pin2.m_PinTag as SkyshardPin
      return (
        field(tag1, SKYSHARDS_PINDATA_ACHIEVEMENTID) ===
          field(tag2, SKYSHARDS_PINDATA_ACHIEVEMENTID) &&
        field(tag1, SKYSHARDS_PINDATA_ZONEGUIDEINDEX) ===
          field(tag2, SKYSHARDS_PINDATA_ZONEGUIDEINDEX)
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

export function registerMapPins(this: void, layouts: SkyShardsMapPinLayouts): undefined {
  const db = getDb()

  MAP_PINS.AddPinType(
    PINS_UNKNOWN,
    function (this: void): undefined {
      mapCallbackCreatePins(PINS_UNKNOWN)
    },
    undefined,
    layouts.unknown,
    PIN_TOOLTIP_CREATOR
  )
  MAP_PINS.AddPinType(
    PINS_COLLECTED,
    function (this: void): undefined {
      mapCallbackCreatePins(PINS_COLLECTED)
    },
    undefined,
    layouts.collected,
    PIN_TOOLTIP_CREATOR
  )

  MAP_PINS.AddPinFilter(
    PINS_UNKNOWN,
    GetString(SI_TEMPER_SKYSHARDS_FILTER_UNKNOWN),
    undefined,
    db.filters
  )
  MAP_PINS.AddPinFilter(
    PINS_COLLECTED,
    GetString(SI_TEMPER_SKYSHARDS_FILTER_COLLECTED),
    undefined,
    db.filters
  )

  MAP_PINS.SetClickHandlers(PINS_UNKNOWN, CLICK_HANDLER)
  MAP_PINS.SetClickHandlers(PINS_COLLECTED, CLICK_HANDLER)
}
