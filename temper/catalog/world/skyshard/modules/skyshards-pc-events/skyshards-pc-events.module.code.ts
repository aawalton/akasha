import { MAP_PINS } from "akasha/temper/addon/pages/world/map-pins/modules/map-pins-public-api/map-pins-public-api.module.code.ts"
import { COMPASS_PINS } from "akasha/temper/addon/pages/world/navigation/modules/compass-pins-global/compass-pins-global.module.code.ts"
import {
  ADDON_NAME,
  buildDefaults,
  PINS_COLLECTED,
  PINS_COMPASS,
  PINS_UNKNOWN,
  SAVED_VARIABLES_NAME,
} from "akasha/temper/catalog/world/skyshard/modules/skyshards-constants/skyshards-constants.module.code.ts"
import { registerCompassPins } from "akasha/temper/catalog/world/skyshard/modules/skyshards-pc-compass/skyshards-pc-compass.module.code.ts"
import {
  buildMapPinLayouts,
  registerMapPins,
} from "akasha/temper/catalog/world/skyshard/modules/skyshards-pc-pins/skyshards-pc-pins.module.code.ts"
import { createSettingsMenu } from "akasha/temper/catalog/world/skyshard/modules/skyshards-pc-settings/skyshards-pc-settings.module.code.ts"
import { alterSkyShardsIndicator } from "akasha/temper/catalog/world/skyshard/modules/skyshards-pc-skill-panel/skyshards-pc-skill-panel.module.code.ts"
import {
  setDb,
  setMainworldColor,
} from "akasha/temper/catalog/world/skyshard/modules/skyshards-pc-state/skyshards-pc-state.module.code.ts"
import { SKILL_POINT_TOTAL } from "akasha/temper/catalog/world/skyshard/modules/skyshards-skill-point-total/skyshards-skill-point-total.module.code.ts"
import "akasha/temper/addon/type/custom-compass-pins/custom-compass-pins.type-declaration.d.ts"
import "akasha/temper/addon/pages/world/map-pins/map-pins-declarations/map-pins-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-map-ui/eso-map-ui.type-declaration.d.ts"

function onSkyshardsUpdated(this: void, _eventCode: number): undefined {
  MAP_PINS.RefreshPins(PINS_UNKNOWN)
  MAP_PINS.RefreshPins(PINS_COLLECTED)
  COMPASS_PINS.RefreshPins(PINS_COMPASS)
}

export function onLoad(this: void, _eventCode: number, addOnName: string): undefined {
  if (addOnName !== ADDON_NAME) return

  EVENT_MANAGER.UnregisterForEvent(ADDON_NAME, EVENT_ADD_ON_LOADED)

  const db = ZO_SavedVars.NewCharacterIdSettings(
    SAVED_VARIABLES_NAME,
    4,
    undefined,
    buildDefaults()
  )
  setDb(db)
  setMainworldColor(ZO_ColorDef.New(db.mainworldSkyshards))

  if (
    SKILL_POINT_ALLOCATION_MANAGER != null &&
    SKILL_POINT_ALLOCATION_MANAGER.GetTotalNumSkillPoints != null
  ) {
    SKILL_POINT_TOTAL.known = true
  }

  const layouts = buildMapPinLayouts()
  registerMapPins(layouts)

  registerCompassPins()

  createSettingsMenu()

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
