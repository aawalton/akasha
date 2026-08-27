import {
  DEST_PIN_TEXT_COLOR_AYLEID,
  DEST_PIN_TEXT_COLOR_DEADLANDS,
  DEST_PIN_TEXT_COLOR_DWEMER,
  DEST_PIN_TEXT_COLOR_HIGHISLE,
  DEST_PIN_TEXT_COLOR_VAMPALTAR,
  DEST_PIN_TEXT_COLOR_WWSHRINE,
  DEST_PIN_TEXT_COLOR_WWVAMP,
} from "../colors"
import { PIN_TYPES } from "../pin-type-constants"
import { drtv } from "../runtime-variables"
import { achState, sharedAchievementsPinData } from "./ach-callbacks"
import { GetAchTypeName } from "./poi-types"
import { AchIndex, rowNumber } from "./stores"

function makeMiscPoiCallback(
  pinName: string,
  matchType: number,
  color: ZoColorDef
): (this: void) => undefined {
  return () => {
    if (GetMapType() >= MAPTYPE_WORLD) return
    drtv.pinName = pinName
    sharedAchievementsPinData()
    const mapData = achState.mapData
    if (mapData === undefined) return
    for (const pinData of mapData) {
      drtv.pinType = rowNumber(pinData, AchIndex.TYPE)
      drtv.pinTypeName = GetAchTypeName(drtv.pinType)
      if (drtv.pinType === matchType) {
        drtv.pinTag = [color.Colorize(zo_strformat("<<1>>", drtv.pinTypeName))]
        LibMapPins.CreatePin(
          pinName,
          drtv.pinTag,
          rowNumber(pinData, AchIndex.X),
          rowNumber(pinData, AchIndex.Y)
        )
      }
    }
  }
}

export const AyleidpinTypeCallback = makeMiscPoiCallback(
  PIN_TYPES.AYLEID,
  20,
  DEST_PIN_TEXT_COLOR_AYLEID
)
export const DeadlandspinTypeCallback = makeMiscPoiCallback(
  PIN_TYPES.DEADLANDS,
  25,
  DEST_PIN_TEXT_COLOR_DEADLANDS
)
export const HighIslepinTypeCallback = makeMiscPoiCallback(
  PIN_TYPES.HIGHISLE,
  26,
  DEST_PIN_TEXT_COLOR_HIGHISLE
)
export const DwemerRuinpinTypeCallback = makeMiscPoiCallback(
  PIN_TYPES.DWEMER,
  23,
  DEST_PIN_TEXT_COLOR_DWEMER
)
export const WWVamppinTypeCallback = makeMiscPoiCallback(
  PIN_TYPES.WWVAMP,
  21,
  DEST_PIN_TEXT_COLOR_WWVAMP
)
export const VampireAltarpinTypeCallback = makeMiscPoiCallback(
  PIN_TYPES.VAMPIRE_ALTAR,
  22,
  DEST_PIN_TEXT_COLOR_VAMPALTAR
)
export const WerewolfShrinepinTypeCallback = makeMiscPoiCallback(
  PIN_TYPES.WEREWOLF_SHRINE,
  24,
  DEST_PIN_TEXT_COLOR_WWSHRINE
)
