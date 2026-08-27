import {
  PINS_COMPASS,
  SKYSHARDS_PINDATA_ACHIEVEMENTID,
  SKYSHARDS_PINDATA_LOCX,
  SKYSHARDS_PINDATA_LOCY,
  SKYSHARDS_PINDATA_ZONEGUIDEINDEX,
} from "../constants"
import { ShouldDisplaySkyshards } from "./should-display"
import { consoleState, getDb } from "./state"

export function CompassCallback(this: void): undefined {
  if (GetMapType() > MAPTYPE_ZONE) return

  if (!getDb().filters[PINS_COMPASS]) return

  const shouldDisplay = ShouldDisplaySkyshards()

  const skyshards = consoleState.skyshards
  if (skyshards != null) {
    for (const [, pinData] of ipairs(skyshards)) {
      const zoneId = GetSkyshardAchievementZoneId(pinData[SKYSHARDS_PINDATA_ACHIEVEMENTID])
      const shardId = GetZoneSkyshardId(zoneId, pinData[SKYSHARDS_PINDATA_ZONEGUIDEINDEX])
      const shardStatus = GetSkyshardDiscoveryStatus(shardId)
      if (
        shouldDisplay &&
        (shardStatus === SKYSHARD_DISCOVERY_STATUS_DISCOVERED ||
          shardStatus === SKYSHARD_DISCOVERY_STATUS_UNDISCOVERED)
      ) {
        COMPASS_PINS.pinManager.CreatePin(
          PINS_COMPASS,
          pinData,
          pinData[SKYSHARDS_PINDATA_LOCX],
          pinData[SKYSHARDS_PINDATA_LOCY]
        )
      }
    }
  }
}
