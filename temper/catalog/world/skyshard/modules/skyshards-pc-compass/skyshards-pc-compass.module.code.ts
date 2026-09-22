import { CUSTOM_COMPASS_LAYOUT_UPDATE } from "akasha/temper/addon/pages/world/navigation/modules/compass-pins-constants/compass-pins-constants.module.code.ts"
import { COMPASS_PINS } from "akasha/temper/addon/pages/world/navigation/modules/compass-pins-global/compass-pins-global.module.code.ts"
import {
  PIN_TEXTURES,
  PINS_COMPASS,
  PINS_UNKNOWN,
  SKYSHARDS_PINDATA_LOCX,
  SKYSHARDS_PINDATA_LOCY,
  SKYSHARDS_PINDATA_MOREINFO,
  SKYSHARDS_PINDATA_ON_CITY_MAP,
  SKYSHARDS_PINDATA_UNDER_GROUND,
} from "akasha/temper/catalog/world/skyshard/modules/skyshards-constants/skyshards-constants.module.code.ts"
import { shouldDisplaySkyshards } from "akasha/temper/catalog/world/skyshard/modules/skyshards-pc-immersive/skyshards-pc-immersive.module.code.ts"
import {
  field,
  getCurrentSkyshards,
  optionalField,
  resolveShardId,
} from "akasha/temper/catalog/world/skyshard/modules/skyshards-pc-pin-data/skyshards-pc-pin-data.module.code.ts"
import {
  getDb,
  getMainworldColor,
} from "akasha/temper/catalog/world/skyshard/modules/skyshards-pc-state/skyshards-pc-state.module.code.ts"
import type { SkyshardPin } from "akasha/temper/catalog/world/skyshard/modules/skyshards-types/skyshards-types.module.code.ts"
import "akasha/temper/addon/type/custom-compass-pins/custom-compass-pins.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-13/eso-enums-13.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

function compassCallback(this: void): undefined {
  if (GetMapType() > MAPTYPE_ZONE) return

  const db = getDb()
  if (!db.filters[PINS_COMPASS]) return

  const shouldDisplay = shouldDisplaySkyshards()

  const skyshards = getCurrentSkyshards()
  if (skyshards != null) {
    for (const pinData of skyshards) {
      const shardId = resolveShardId(pinData)
      if (shardId != null) {
        const shardStatus = GetSkyshardDiscoveryStatus(shardId)
        if (
          shouldDisplay &&
          (shardStatus === SKYSHARD_DISCOVERY_STATUS_DISCOVERED ||
            shardStatus === SKYSHARD_DISCOVERY_STATUS_UNDISCOVERED)
        ) {
          COMPASS_PINS.pinManager.CreatePin(
            PINS_COMPASS,
            pinData,
            field(pinData, SKYSHARDS_PINDATA_LOCX),
            field(pinData, SKYSHARDS_PINDATA_LOCY)
          )
        }
      }
    }
  }
}

function buildCompassLayout(this: void): CompassPinLayout {
  const db = getDb()
  return {
    maxDistance: db.compassMaxDistance,
    texture: PIN_TEXTURES.unknown[db.pinTexture.type],
    sizeCallback: function (
      this: void,
      pin: CompassPin,
      _angle: number,
      normalizedAngle: number,
      _normalizedDistance: number
    ): undefined {
      if (zo_abs(normalizedAngle) > 0.25) {
        pin.SetDimensions(54 - 24 * zo_abs(normalizedAngle), 54 - 24 * zo_abs(normalizedAngle))
      } else {
        pin.SetDimensions(48, 48)
      }
    },
    additionalLayout: {
      [CUSTOM_COMPASS_LAYOUT_UPDATE]: function (this: void, pin: CompassPin): undefined {
        if (pin.pinTag != null) {
          const pinTag = pin.pinTag as SkyshardPin
          const moreInfo = optionalField(pinTag, SKYSHARDS_PINDATA_MOREINFO)
          if (
            moreInfo == null ||
            moreInfo === SKYSHARDS_PINDATA_ON_CITY_MAP ||
            moreInfo === SKYSHARDS_PINDATA_UNDER_GROUND
          ) {
            const icon = pin.GetNamedChild<TextureControl>("Background")
            if (icon != null) {
              const [r, g, b, a] = getMainworldColor().UnpackRGBA()
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
}

export function registerCompassPins(this: void): undefined {
  const db = getDb()
  COMPASS_PINS.AddCustomPin(PINS_COMPASS, compassCallback, buildCompassLayout(), db.filters)
  COMPASS_PINS.RefreshPins(PINS_COMPASS)
}
