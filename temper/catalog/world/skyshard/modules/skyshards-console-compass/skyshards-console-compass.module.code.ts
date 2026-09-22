import { COMPASS_PINS } from "akasha/temper/addon/pages/world/navigation/modules/compass-pins-global/compass-pins-global.module.code.ts"
import { shouldDisplaySkyshards } from "akasha/temper/catalog/world/skyshard/modules/skyshards-console-should-display/skyshards-console-should-display.module.code.ts"
import {
  CONSOLE_STATE,
  getDb,
} from "akasha/temper/catalog/world/skyshard/modules/skyshards-console-state/skyshards-console-state.module.code.ts"
import {
  PINS_COMPASS,
  SKYSHARDS_PINDATA_ACHIEVEMENTID,
  SKYSHARDS_PINDATA_LOCX,
  SKYSHARDS_PINDATA_LOCY,
  SKYSHARDS_PINDATA_ZONEGUIDEINDEX,
} from "akasha/temper/catalog/world/skyshard/modules/skyshards-constants/skyshards-constants.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/type/custom-compass-pins/custom-compass-pins.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-13/eso-enums-13.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-05/eso-functions-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"

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
