import { MAP_PINS } from "akasha/temper/addon/pages/world/map-pins/modules/map-pins-public-api/map-pins-public-api.module.code.ts"
import {
  shouldDisplaySkyshards,
  updateSkyshardsData,
} from "akasha/temper/catalog/world/skyshard/modules/skyshards-console-should-display/skyshards-console-should-display.module.code.ts"
import { CONSOLE_STATE } from "akasha/temper/catalog/world/skyshard/modules/skyshards-console-state/skyshards-console-state.module.code.ts"
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
} from "akasha/temper/catalog/world/skyshard/modules/skyshards-constants/skyshards-constants.module.code.ts"
import type { SkyshardPin } from "akasha/temper/catalog/world/skyshard/modules/skyshards-types/skyshards-types.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/world/map-pins/map-pins-declarations/map-pins-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-13/eso-enums-13.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-05/eso-functions-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-map-ui/eso-map-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"

type MaybeSkyshardPin = SkyshardPin | undefined

export function mapCallbackCreatePins(this: void, pinType: string): undefined {
  if (GetMapType() > MAPTYPE_ZONE) return

  const shouldDisplay = shouldDisplaySkyshards()

  const [zone, subzone] = MAP_PINS.GetZoneAndSubzone(false, true, false)
  if (GetMapTileTexture() !== CONSOLE_STATE.lastZone) {
    updateSkyshardsData(zone ?? "", subzone ?? "")
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
          MAP_PINS.IsEnabled(PINS_COLLECTED)
        ) {
          MAP_PINS.CreatePin(
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
          MAP_PINS.IsEnabled(PINS_UNKNOWN)
        ) {
          MAP_PINS.CreatePin(
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
