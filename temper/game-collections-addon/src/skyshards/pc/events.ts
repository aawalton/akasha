import {
  ADDON_NAME,
  PINS_COLLECTED,
  PINS_COMPASS,
  PINS_UNKNOWN,
  SAVED_VARIABLES_NAME,
} from "../constants"
import { registerCompassPins } from "./compass"
import { buildMapPinLayouts, registerMapPins } from "./pins"
import { CreateSettingsMenu } from "./settings"
import { AlterSkyShardsIndicator, setSSP } from "./skill-panel"
import { buildDefaults, setDb, setMainworldColor } from "./state"

function OnSkyshardsUpdated(this: void, _eventCode: number): undefined {
  LibMapPins.RefreshPins(PINS_UNKNOWN)
  LibMapPins.RefreshPins(PINS_COLLECTED)
  COMPASS_PINS.RefreshPins(PINS_COMPASS)
}

export function OnLoad(this: void, _eventCode: number, addOnName: string): undefined {
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
    setSSP(true)
  }

  const layouts = buildMapPinLayouts()
  registerMapPins(layouts)

  registerCompassPins()

  CreateSettingsMenu()

  AlterSkyShardsIndicator()

  RedirectTexture(
    "EsoUI/Art/MapPins/skyshard_seen.dds",
    "/esoui/art/icons/heraldrycrests_misc_blank_01.dds"
  )
  RedirectTexture(
    "EsoUI/Art/Compass/skyshard_seen.dds",
    "/esoui/art/icons/heraldrycrests_misc_blank_01.dds"
  )

  EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_SKYSHARDS_UPDATED, OnSkyshardsUpdated)
}
