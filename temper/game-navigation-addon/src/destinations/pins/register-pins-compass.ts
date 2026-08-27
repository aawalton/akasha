import { PIN_TYPES } from "../pin-type-constants"
import { getCharacterSavedVariables } from "../saved-variables"
import { AddAchievementCompassPins } from "./compass/achievement-pins"
import { CollectibleFishCompassPins } from "./compass/collectible-fish-pins"
import { AddMiscCompassPins } from "./compass/misc-pins"
import type { DestinationsPinLayouts } from "./pin-layouts"

export function AddCompassPins(layouts: DestinationsPinLayouts): undefined {
  const filters = getCharacterSavedVariables().filters
  COMPASS_PINS.AddCustomPin(PIN_TYPES.LB_GTTP_CP, AddAchievementCompassPins, layouts.other, filters)
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.LB_GTTP_CP_DONE,
    AddAchievementCompassPins,
    layouts.other_Done,
    filters
  )
  COMPASS_PINS.AddCustomPin(PIN_TYPES.MAIQ, AddAchievementCompassPins, layouts.Maiq, filters)
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.MAIQ_DONE,
    AddAchievementCompassPins,
    layouts.Maiq_Done,
    filters
  )
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.PEACEMAKER,
    AddAchievementCompassPins,
    layouts.Peacemaker,
    filters
  )
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.PEACEMAKER_DONE,
    AddAchievementCompassPins,
    layouts.Peacemaker_Done,
    filters
  )
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.NOSEDIVER,
    AddAchievementCompassPins,
    layouts.Nosediver,
    filters
  )
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.NOSEDIVER_DONE,
    AddAchievementCompassPins,
    layouts.Nosediver_Done,
    filters
  )
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.EARTHLYPOS,
    AddAchievementCompassPins,
    layouts.EarthlyPos,
    filters
  )
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.EARTHLYPOS_DONE,
    AddAchievementCompassPins,
    layouts.EarthlyPos_Done,
    filters
  )
  COMPASS_PINS.AddCustomPin(PIN_TYPES.ON_ME, AddAchievementCompassPins, layouts.OnMe, filters)
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.ON_ME_DONE,
    AddAchievementCompassPins,
    layouts.OnMe_Done,
    filters
  )
  COMPASS_PINS.AddCustomPin(PIN_TYPES.BRAWL, AddAchievementCompassPins, layouts.Brawl, filters)
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.BRAWL_DONE,
    AddAchievementCompassPins,
    layouts.Brawl_Done,
    filters
  )
  COMPASS_PINS.AddCustomPin(PIN_TYPES.PATRON, AddAchievementCompassPins, layouts.Patron, filters)
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.PATRON_DONE,
    AddAchievementCompassPins,
    layouts.Patron_Done,
    filters
  )
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.WROTHGAR_JUMPER,
    AddAchievementCompassPins,
    layouts.WrothgarJumper,
    filters
  )
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.WROTHGAR_JUMPER_DONE,
    AddAchievementCompassPins,
    layouts.WrothgarJumper_Done,
    filters
  )
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.RELIC_HUNTER,
    AddAchievementCompassPins,
    layouts.RelicHunter,
    filters
  )
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.RELIC_HUNTER_DONE,
    AddAchievementCompassPins,
    layouts.RelicHunter_Done,
    filters
  )
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.CHAMPION,
    AddAchievementCompassPins,
    layouts.Champion,
    filters
  )
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.CHAMPION_DONE,
    AddAchievementCompassPins,
    layouts.Champion_Done,
    filters
  )
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.BREAKING,
    AddAchievementCompassPins,
    layouts.Breaking,
    filters
  )
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.BREAKING_DONE,
    AddAchievementCompassPins,
    layouts.Breaking_Done,
    filters
  )
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.CUTPURSE,
    AddAchievementCompassPins,
    layouts.Cutpurse,
    filters
  )
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.CUTPURSE_DONE,
    AddAchievementCompassPins,
    layouts.Cutpurse_Done,
    filters
  )
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.COLLECTIBLES,
    CollectibleFishCompassPins,
    layouts.Collectible,
    filters
  )
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.COLLECTIBLESDONE,
    CollectibleFishCompassPins,
    layouts.CollectibleDone,
    filters
  )
  COMPASS_PINS.AddCustomPin(PIN_TYPES.FISHING, CollectibleFishCompassPins, layouts.Fish, filters)
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.FISHINGDONE,
    CollectibleFishCompassPins,
    layouts.FishDone,
    filters
  )
  COMPASS_PINS.AddCustomPin(PIN_TYPES.AYLEID, AddMiscCompassPins, layouts.Ayleid, filters)
  COMPASS_PINS.AddCustomPin(PIN_TYPES.DEADLANDS, AddMiscCompassPins, layouts.Deadlands, filters)
  COMPASS_PINS.AddCustomPin(PIN_TYPES.HIGHISLE, AddMiscCompassPins, layouts.HighIsle, filters)
  COMPASS_PINS.AddCustomPin(PIN_TYPES.WWVAMP, AddMiscCompassPins, layouts.WWVamp, filters)
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.VAMPIRE_ALTAR,
    AddMiscCompassPins,
    layouts.VampireAltar,
    filters
  )
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.WEREWOLF_SHRINE,
    AddMiscCompassPins,
    layouts.WereWolfShrine,
    filters
  )
  COMPASS_PINS.AddCustomPin(PIN_TYPES.DWEMER, AddMiscCompassPins, layouts.Dwemer, filters)
}
