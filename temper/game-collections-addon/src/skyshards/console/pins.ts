import {
  PINS_COLLECTED,
  PINS_UNKNOWN,
  SKYSHARDS_PINDATA_ACHIEVEMENTID,
  SKYSHARDS_PINDATA_LOCX,
  SKYSHARDS_PINDATA_LOCY,
  SKYSHARDS_PINDATA_MOREINFO,
  SKYSHARDS_PINDATA_ON_CITY_MAP,
  SKYSHARDS_PINDATA_UNDER_GROUND,
  SKYSHARDS_PINDATA_ZONEGUIDEINDEX,
} from "../constants"
import type { SkyshardPin } from "../data/types"
import { ShouldDisplaySkyshards, UpdateSkyshardsData } from "./should-display"
import { consoleState } from "./state"

type MaybeSkyshardPin = SkyshardPin | undefined

function asMaybeSkyshardPin(this: void, value: unknown): MaybeSkyshardPin {
  return value as MaybeSkyshardPin
}

export function MapCallbackCreatePins(this: void, pinType: string): undefined {
  if (GetMapType() > MAPTYPE_ZONE) return

  const shouldDisplay = ShouldDisplaySkyshards()

  const [zone, subzone] = LibMapPins.GetZoneAndSubzone(false, true, false)
  if (GetMapTileTexture() !== consoleState.lastZone) {
    UpdateSkyshardsData(zone, subzone)
  }

  const skyshards = consoleState.skyshards
  if (skyshards != null) {
    for (const [, pinData] of ipairs(skyshards)) {
      const zoneId = GetSkyshardAchievementZoneId(pinData[SKYSHARDS_PINDATA_ACHIEVEMENTID])
      const shardId = GetZoneSkyshardId(zoneId, pinData[SKYSHARDS_PINDATA_ZONEGUIDEINDEX])
      const shardStatus = GetSkyshardDiscoveryStatus(shardId)
      if (pinType === PINS_COLLECTED) {
        if (
          shardStatus === SKYSHARD_DISCOVERY_STATUS_ACQUIRED &&
          LibMapPins.IsEnabled(PINS_COLLECTED)
        ) {
          LibMapPins.CreatePin(
            PINS_COLLECTED,
            pinData,
            pinData[SKYSHARDS_PINDATA_LOCX],
            pinData[SKYSHARDS_PINDATA_LOCY]
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
            pinData[SKYSHARDS_PINDATA_LOCX],
            pinData[SKYSHARDS_PINDATA_LOCY]
          )
        }
      }
    }
  }
}

export function SetMainworldTint(this: void, pin: MapPin): ZoColorDef {
  const pinTag = asMaybeSkyshardPin(pin.m_PinTag)
  if (pinTag != null) {
    const moreInfo = pinTag[SKYSHARDS_PINDATA_MOREINFO]
    if (
      moreInfo == null ||
      moreInfo === SKYSHARDS_PINDATA_ON_CITY_MAP ||
      moreInfo === SKYSHARDS_PINDATA_UNDER_GROUND
    ) {
      if (consoleState.mainworldColor != null) {
        return consoleState.mainworldColor
      }
    }
  }

  return ZO_SELECTED_TEXT
}
