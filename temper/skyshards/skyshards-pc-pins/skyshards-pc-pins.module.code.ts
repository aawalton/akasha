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
} from "../skyshards-constants/skyshards-constants.module.code.ts"
import { shouldDisplaySkyshards } from "../skyshards-pc-immersive/skyshards-pc-immersive.module.code.ts"
import {
  field,
  getCurrentSkyshards,
  getLastZone,
  optionalField,
  resolveShardId,
  updateSkyshardsData,
} from "../skyshards-pc-pin-data/skyshards-pc-pin-data.module.code.ts"
import { getDb, getMainworldColor } from "../skyshards-pc-state/skyshards-pc-state.module.code.ts"
import { PIN_TOOLTIP_CREATOR } from "../skyshards-pc-tooltip/skyshards-pc-tooltip.module.code.ts"
import type { SkyshardPin } from "../skyshards-types/skyshards-types.module.code.ts"

export function setMainworldTint(this: void, pin: MapPin): unknown {
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

  const [zone, subzone] = LibMapPins.GetZoneAndSubzone(false, true, false)
  if (GetMapTileTexture() !== getLastZone()) {
    updateSkyshardsData(zone, subzone)
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
            LibMapPins.IsEnabled(PINS_COLLECTED)
          ) {
            LibMapPins.CreatePin(
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
            LibMapPins.IsEnabled(PINS_UNKNOWN)
          ) {
            LibMapPins.CreatePin(
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

export interface SkyShardsMapPinLayouts {
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
    name: GetString(SKYS_SET_WAYPOINT),
    gamepadName: GetString(SKYS_SET_WAYPOINT),
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

  LibMapPins.AddPinType(
    PINS_UNKNOWN,
    function (this: void): undefined {
      mapCallbackCreatePins(PINS_UNKNOWN)
    },
    undefined,
    layouts.unknown,
    PIN_TOOLTIP_CREATOR
  )
  LibMapPins.AddPinType(
    PINS_COLLECTED,
    function (this: void): undefined {
      mapCallbackCreatePins(PINS_COLLECTED)
    },
    undefined,
    layouts.collected,
    PIN_TOOLTIP_CREATOR
  )

  LibMapPins.AddPinFilter(PINS_UNKNOWN, GetString(SKYS_FILTER_UNKNOWN), undefined, db.filters)
  LibMapPins.AddPinFilter(PINS_COLLECTED, GetString(SKYS_FILTER_COLLECTED), undefined, db.filters)

  LibMapPins.SetClickHandlers(PINS_UNKNOWN, CLICK_HANDLER)
  LibMapPins.SetClickHandlers(PINS_COLLECTED, CLICK_HANDLER)
}
