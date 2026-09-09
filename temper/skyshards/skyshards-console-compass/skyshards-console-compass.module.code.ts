import { shouldDisplaySkyshards } from "../skyshards-console-should-display/skyshards-console-should-display.module.code.ts"
import {
  CONSOLE_STATE,
  getDb,
} from "../skyshards-console-state/skyshards-console-state.module.code.ts"
import {
  PINS_COMPASS,
  SKYSHARDS_PINDATA_ACHIEVEMENTID,
  SKYSHARDS_PINDATA_LOCX,
  SKYSHARDS_PINDATA_LOCY,
  SKYSHARDS_PINDATA_ZONEGUIDEINDEX,
} from "../skyshards-constants/skyshards-constants.module.code.ts"

export function compassCallback(this: void): undefined {
  if (GetMapType() > MAPTYPE_ZONE) return

  if (!getDb().filters[PINS_COMPASS]) return

  const shouldDisplay = shouldDisplaySkyshards()

  const skyshards = CONSOLE_STATE.skyshards
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
