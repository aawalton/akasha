import { PIN_TYPES } from "../destinations-pin-type-constants/destinations-pin-type-constants.module.code.ts"

export function onPoiUpdated(this: void): undefined {
  LibMapPins.RefreshPins(PIN_TYPES.UNKNOWN)
  LibMapPins.RefreshPins(PIN_TYPES.FAKEKNOWN)
}

function refreshBoth(pinType: string): undefined {
  LibMapPins.RefreshPins(pinType)
  COMPASS_PINS.RefreshPins(pinType)
}

export function onAchievementUpdate(
  this: void,
  _eventCode: number,
  achievementId: number | undefined
): undefined {
  if (achievementId != null) {
    if (achievementId >= 749 && achievementId <= 754) return

    refreshBoth(PIN_TYPES.MAIQ)
    refreshBoth(PIN_TYPES.LB_GTTP_CP)
    refreshBoth(PIN_TYPES.PEACEMAKER)
    refreshBoth(PIN_TYPES.NOSEDIVER)
    refreshBoth(PIN_TYPES.EARTHLYPOS)
    refreshBoth(PIN_TYPES.ON_ME)
    refreshBoth(PIN_TYPES.BRAWL)
    refreshBoth(PIN_TYPES.PATRON)
    refreshBoth(PIN_TYPES.WROTHGAR_JUMPER)
    refreshBoth(PIN_TYPES.RELIC_HUNTER)
    refreshBoth(PIN_TYPES.CHAMPION)
    refreshBoth(PIN_TYPES.MAIQ_DONE)
    refreshBoth(PIN_TYPES.LB_GTTP_CP_DONE)
    refreshBoth(PIN_TYPES.PEACEMAKER_DONE)
    refreshBoth(PIN_TYPES.NOSEDIVER_DONE)
    refreshBoth(PIN_TYPES.EARTHLYPOS_DONE)
    refreshBoth(PIN_TYPES.ON_ME_DONE)
    refreshBoth(PIN_TYPES.BRAWL_DONE)
    refreshBoth(PIN_TYPES.PATRON_DONE)
    refreshBoth(PIN_TYPES.WROTHGAR_JUMPER_DONE)
    refreshBoth(PIN_TYPES.RELIC_HUNTER_DONE)
    refreshBoth(PIN_TYPES.CHAMPION_DONE)
    refreshBoth(PIN_TYPES.FISHING)
    refreshBoth(PIN_TYPES.FISHINGDONE)
  }
}
