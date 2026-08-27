import {
  DEST_PIN_TEXT_COLOR_BRAWL,
  DEST_PIN_TEXT_COLOR_BRAWL_DONE,
  DEST_PIN_TEXT_COLOR_EARTHLYPOS,
  DEST_PIN_TEXT_COLOR_EARTHLYPOS_DONE,
  DEST_PIN_TEXT_COLOR_MAIQ,
  DEST_PIN_TEXT_COLOR_MAIQ_DONE,
  DEST_PIN_TEXT_COLOR_NOSEDIVER,
  DEST_PIN_TEXT_COLOR_NOSEDIVER_DONE,
  DEST_PIN_TEXT_COLOR_ONME,
  DEST_PIN_TEXT_COLOR_ONME_DONE,
  DEST_PIN_TEXT_COLOR_PATRON,
  DEST_PIN_TEXT_COLOR_PATRON_DONE,
  DEST_PIN_TEXT_COLOR_PEACEMAKER,
  DEST_PIN_TEXT_COLOR_PEACEMAKER_DONE,
  DEST_PIN_TEXT_COLOR_WROTHGARJUMPER,
  DEST_PIN_TEXT_COLOR_WROTHGARJUMPER_DONE,
} from "../colors"
import { PIN_TYPES } from "../pin-type-constants"
import { drtv } from "../runtime-variables"
import { getCharacterSavedVariables } from "../saved-variables"
import { getMapTextureName, mapState } from "./map-context"
import { zoneToAchievementCriterion } from "./poi-types"
import { AchIDs, AchIndex, type AchRow, AchStore, rowNumber } from "./stores"

export const achState: { mapData: AchRow[] | undefined } = { mapData: undefined }

export function sharedAchievementsPinData(): undefined {
  achState.mapData = undefined
  mapState.mapTextureName = undefined
  mapState.zoneTextureName = undefined
  mapState.mapId = undefined
  mapState.zoneId = undefined
  const pinName = drtv.pinName
  if (pinName === undefined) return
  if (LibMapPins.IsEnabled(pinName) && getCharacterSavedVariables().filters[pinName] === true) {
    getMapTextureName()
    achState.mapData =
      mapState.mapTextureName !== undefined ? AchStore[mapState.mapTextureName] : undefined
  }
}

interface SimpleAchievementPinConfig {
  pinName: string
  matchType: number
  achievementId: number
  color: ZoColorDef
  done: boolean
  zoneMapId?: number
}

function makeSimpleAchievementCallback(
  config: SimpleAchievementPinConfig
): (this: void) => undefined {
  return () => {
    if (GetMapType() >= MAPTYPE_WORLD) return
    drtv.pinName = config.pinName
    sharedAchievementsPinData()
    const mapData = achState.mapData
    if (mapData === undefined) return
    for (const pinData of mapData) {
      drtv.pinType = rowNumber(pinData, AchIndex.TYPE)
      if (drtv.pinType === config.matchType) {
        const comp =
          config.zoneMapId !== undefined
            ? zoneToAchievementCriterion(config.zoneMapId, mapState.zoneTextureName)
            : undefined
        const [, completed, required] = GetAchievementCriterion(config.achievementId, comp)
        drtv.pinTag = []
        if ((completed === required) === config.done) {
          drtv.pinTag.push(
            config.color.Colorize(zo_strformat("<<1>>", AchIDs[config.achievementId]))
          )
          LibMapPins.CreatePin(
            config.pinName,
            drtv.pinTag,
            rowNumber(pinData, AchIndex.X),
            rowNumber(pinData, AchIndex.Y)
          )
        }
      }
    }
  }
}

export const MaiqpinTypeCallback = makeSimpleAchievementCallback({
  pinName: PIN_TYPES.MAIQ,
  matchType: 1,
  achievementId: 872,
  zoneMapId: 872,
  color: DEST_PIN_TEXT_COLOR_MAIQ,
  done: false,
})
export const MaiqpinTypeCallbackDone = makeSimpleAchievementCallback({
  pinName: PIN_TYPES.MAIQ_DONE,
  matchType: 1,
  achievementId: 872,
  zoneMapId: 872,
  color: DEST_PIN_TEXT_COLOR_MAIQ_DONE,
  done: true,
})

export const PeacemakerpinTypeCallback = makeSimpleAchievementCallback({
  pinName: PIN_TYPES.PEACEMAKER,
  matchType: 3,
  achievementId: 716,
  color: DEST_PIN_TEXT_COLOR_PEACEMAKER,
  done: false,
})
export const PeacemakerpinTypeCallbackDone = makeSimpleAchievementCallback({
  pinName: PIN_TYPES.PEACEMAKER_DONE,
  matchType: 3,
  achievementId: 716,
  color: DEST_PIN_TEXT_COLOR_PEACEMAKER_DONE,
  done: true,
})

export const NosediverpinTypeCallback = makeSimpleAchievementCallback({
  pinName: PIN_TYPES.NOSEDIVER,
  matchType: 7,
  achievementId: 406,
  color: DEST_PIN_TEXT_COLOR_NOSEDIVER,
  done: false,
})
export const NosediverpinTypeCallbackDone = makeSimpleAchievementCallback({
  pinName: PIN_TYPES.NOSEDIVER_DONE,
  matchType: 7,
  achievementId: 406,
  color: DEST_PIN_TEXT_COLOR_NOSEDIVER_DONE,
  done: true,
})

export const EarthlyPospinTypeCallback = makeSimpleAchievementCallback({
  pinName: PIN_TYPES.EARTHLYPOS,
  matchType: 8,
  achievementId: 1121,
  color: DEST_PIN_TEXT_COLOR_EARTHLYPOS,
  done: false,
})
export const EarthlyPospinTypeCallbackDone = makeSimpleAchievementCallback({
  pinName: PIN_TYPES.EARTHLYPOS_DONE,
  matchType: 8,
  achievementId: 1121,
  color: DEST_PIN_TEXT_COLOR_EARTHLYPOS_DONE,
  done: true,
})

export const OnMepinTypeCallback = makeSimpleAchievementCallback({
  pinName: PIN_TYPES.ON_ME,
  matchType: 9,
  achievementId: 704,
  zoneMapId: 704,
  color: DEST_PIN_TEXT_COLOR_ONME,
  done: false,
})
export const OnMepinTypeCallbackDone = makeSimpleAchievementCallback({
  pinName: PIN_TYPES.ON_ME_DONE,
  matchType: 9,
  achievementId: 704,
  zoneMapId: 704,
  color: DEST_PIN_TEXT_COLOR_ONME_DONE,
  done: true,
})

export const BrawlpinTypeCallback = makeSimpleAchievementCallback({
  pinName: PIN_TYPES.BRAWL,
  matchType: 10,
  achievementId: 1247,
  color: DEST_PIN_TEXT_COLOR_BRAWL,
  done: false,
})
export const BrawlpinTypeCallbackDone = makeSimpleAchievementCallback({
  pinName: PIN_TYPES.BRAWL_DONE,
  matchType: 10,
  achievementId: 1247,
  color: DEST_PIN_TEXT_COLOR_BRAWL_DONE,
  done: true,
})

export const PatronpinTypeCallback = makeSimpleAchievementCallback({
  pinName: PIN_TYPES.PATRON,
  matchType: 11,
  achievementId: 1316,
  color: DEST_PIN_TEXT_COLOR_PATRON,
  done: false,
})
export const PatronpinTypeCallbackDone = makeSimpleAchievementCallback({
  pinName: PIN_TYPES.PATRON_DONE,
  matchType: 11,
  achievementId: 1316,
  color: DEST_PIN_TEXT_COLOR_PATRON_DONE,
  done: true,
})

export const WrothgarJumperpinTypeCallback = makeSimpleAchievementCallback({
  pinName: PIN_TYPES.WROTHGAR_JUMPER,
  matchType: 12,
  achievementId: 1331,
  color: DEST_PIN_TEXT_COLOR_WROTHGARJUMPER,
  done: false,
})
export const WrothgarJumperpinTypeCallbackDone = makeSimpleAchievementCallback({
  pinName: PIN_TYPES.WROTHGAR_JUMPER_DONE,
  matchType: 12,
  achievementId: 1331,
  color: DEST_PIN_TEXT_COLOR_WROTHGARJUMPER_DONE,
  done: true,
})
