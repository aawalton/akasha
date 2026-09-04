import {
  shouldDisplaySkyshards,
  updateSkyshardsData,
} from "../skyshards-console-should-display/skyshards-console-should-display.module.code.ts"
import { CONSOLE_STATE } from "../skyshards-console-state/skyshards-console-state.module.code.ts"
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
} from "../skyshards-constants/skyshards-constants.module.code.ts"
import type { SkyshardPin } from "../skyshards-types/skyshards-types.module.code.ts"

type MaybeSkyshardPin = SkyshardPin | undefined

export function mapCallbackCreatePins(this: void, pinType: string): undefined {
  if (GetMapType() > MAPTYPE_ZONE) return

  const shouldDisplay = shouldDisplaySkyshards()

  const [zone, subzone] = LibMapPins.GetZoneAndSubzone(false, true, false)
  if (GetMapTileTexture() !== CONSOLE_STATE.lastZone) {
    updateSkyshardsData(zone, subzone)
  }

  const skyshards = CONSOLE_STATE.skyshards
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

export function setMainworldTint(this: void, pin: MapPin): ZoColorDef {
  const pinTag = pin.m_PinTag as MaybeSkyshardPin
  if (pinTag != null) {
    const moreInfo = pinTag[SKYSHARDS_PINDATA_MOREINFO]
    if (
      moreInfo == null ||
      moreInfo === SKYSHARDS_PINDATA_ON_CITY_MAP ||
      moreInfo === SKYSHARDS_PINDATA_UNDER_GROUND
    ) {
      if (CONSOLE_STATE.mainworldColor != null) {
        return CONSOLE_STATE.mainworldColor
      }
    }
  }

  return ZO_SELECTED_TEXT
}
