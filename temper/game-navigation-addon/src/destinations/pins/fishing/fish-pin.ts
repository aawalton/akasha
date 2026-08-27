import {
  DEST_PIN_TEXT_COLOR_FISH,
  DEST_PIN_TEXT_COLOR_FISH_DONE,
  DEST_PIN_TEXT_COLORBAIT_FISH,
  DEST_PIN_TEXT_COLORTITLE_FISH,
  DEST_PIN_TEXT_COLORWATER_FISH,
} from "../../colors"
import { PIN_TYPES } from "../../pin-type-constants"
import { drtv } from "../../runtime-variables"
import { getSavedVariables } from "../../saved-variables"
import { achState, sharedAchievementsPinData } from "../ach-callbacks"
import { AchIndex, FishIDs, FishIndex, FishStore, rowNumber } from "../stores"
import { baitAndWaterForPinType, baitLeftForPinType, scanFishingBait } from "./bait"
import {
  DESTINATIONS_FISH_TYPE_FOUL,
  DESTINATIONS_FISH_TYPE_LAKE,
  DESTINATIONS_FISH_TYPE_OCEAN,
  DESTINATIONS_FISH_TYPE_RIVER,
} from "./fish-types"

export function FishpinTypeCallback(this: void): undefined {
  if (GetMapType() >= MAPTYPE_WORLD) return
  drtv.pinName = PIN_TYPES.FISHING
  sharedAchievementsPinData()
  const mapData = achState.mapData
  if (mapData === undefined) return
  const sv = getSavedVariables()
  if (sv.filters[PIN_TYPES.FISHING_SHOW_BAIT_LEFT] === true) {
    scanFishingBait()
  }
  for (const pinData of mapData) {
    drtv.pinType = rowNumber(pinData, AchIndex.TYPE)
    if (drtv.pinType >= 40 && drtv.pinType <= 44) {
      const pinType = drtv.pinType
      const fishID = rowNumber(pinData, AchIndex.ID)
      let completedTotal = 0
      const requiredTotal = GetAchievementNumCriteria(fishID)
      for (let i = 1; i <= requiredTotal; i++) {
        const [, completed] = GetAchievementCriterion(fishID, i)
        if (completed === 1) {
          completedTotal = completedTotal + 1
        }
      }
      if (completedTotal === requiredTotal) return
      const { fishingBait, waterType } = baitAndWaterForPinType(pinType)
      drtv.pinTag = []
      let countF = 0
      let countL = 0
      let countO = 0
      let countR = 0
      let countFN = 0
      let countLN = 0
      let countON = 0
      let countRN = 0
      const fishdata = FishStore[fishID] ?? []
      for (const fishEntry of fishdata) {
        const fishLoc = rowNumber(fishEntry, FishIndex.LOCATION)
        if (fishLoc === DESTINATIONS_FISH_TYPE_FOUL) {
          countF = countF + 1
        } else if (fishLoc === DESTINATIONS_FISH_TYPE_LAKE) {
          countL = countL + 1
        } else if (fishLoc === DESTINATIONS_FISH_TYPE_OCEAN) {
          countO = countO + 1
        } else if (fishLoc === DESTINATIONS_FISH_TYPE_RIVER) {
          countR = countR + 1
        }
      }
      for (let i = 1; i <= requiredTotal; i++) {
        for (const fishEntry of fishdata) {
          const fishLoc = rowNumber(fishEntry, FishIndex.LOCATION)
          const fishNumber = rowNumber(fishEntry, FishIndex.FISHNUMBER)
          if (fishNumber === i) {
            if (pinType === 40 && fishLoc === DESTINATIONS_FISH_TYPE_FOUL) {
              const [, completed] = GetAchievementCriterion(fishID, i)
              if (completed === 0) countFN = countFN + 1
            } else if (pinType === 41 && fishLoc === DESTINATIONS_FISH_TYPE_RIVER) {
              const [, completed] = GetAchievementCriterion(fishID, i)
              if (completed === 0) countRN = countRN + 1
            } else if (pinType === 42 && fishLoc === DESTINATIONS_FISH_TYPE_OCEAN) {
              const [, completed] = GetAchievementCriterion(fishID, i)
              if (completed === 0) countON = countON + 1
            } else if (pinType === 43 && fishLoc === DESTINATIONS_FISH_TYPE_LAKE) {
              const [, completed] = GetAchievementCriterion(fishID, i)
              if (completed === 0) countLN = countLN + 1
            }
          }
        }
      }
      drtv.pinTag.push(
        DEST_PIN_TEXT_COLORTITLE_FISH.Colorize(zo_strformat("<<1>>", FishIDs[fishID]))
      )
      if (sv.filters[PIN_TYPES.FISHING_SHOW_FISHNAME] === true) {
        for (let i = 1; i <= requiredTotal; i++) {
          for (const fishEntry of fishdata) {
            let fishFound = false
            let fishMiss = false
            const fishLoc = rowNumber(fishEntry, FishIndex.LOCATION)
            const fishNumber = rowNumber(fishEntry, FishIndex.FISHNUMBER)
            const [fishName, completed] = GetAchievementCriterion(fishID, i)
            if (fishNumber === i) {
              if (pinType === 40 && fishLoc === DESTINATIONS_FISH_TYPE_FOUL) {
                if (completed === 0) {
                  fishMiss = true
                } else if (LibMapPins.IsEnabled(PIN_TYPES.FISHINGDONE)) {
                  fishFound = true
                }
              } else if (pinType === 41 && fishLoc === DESTINATIONS_FISH_TYPE_RIVER) {
                if (completed === 0) {
                  fishMiss = true
                } else if (LibMapPins.IsEnabled(PIN_TYPES.FISHINGDONE)) {
                  fishFound = true
                }
              } else if (pinType === 42 && fishLoc === DESTINATIONS_FISH_TYPE_OCEAN) {
                if (completed === 0) {
                  fishMiss = true
                } else if (LibMapPins.IsEnabled(PIN_TYPES.FISHINGDONE)) {
                  fishFound = true
                }
              } else if (pinType === 43 && fishLoc === DESTINATIONS_FISH_TYPE_LAKE) {
                if (completed === 0) {
                  fishMiss = true
                } else if (LibMapPins.IsEnabled(PIN_TYPES.FISHINGDONE)) {
                  fishFound = true
                }
              }
            }
            if (fishMiss) {
              drtv.pinTag.push(
                DEST_PIN_TEXT_COLOR_FISH.Colorize(zo_strformat("<<1>>", "[" + fishName + "]"))
              )
            } else if (fishFound) {
              drtv.pinTag.push(
                DEST_PIN_TEXT_COLOR_FISH_DONE.Colorize(zo_strformat("<<1>>", "[" + fishName + "]"))
              )
            }
            if (pinType === 44 && fishNumber === i) {
              if (completed === 0) {
                drtv.pinTag.push(
                  DEST_PIN_TEXT_COLOR_FISH.Colorize(zo_strformat("<<1>>", "[" + fishName + "]"))
                )
              } else {
                drtv.pinTag.push(
                  DEST_PIN_TEXT_COLOR_FISH_DONE.Colorize(
                    zo_strformat("<<1>>", "[" + fishName + "]")
                  )
                )
              }
            }
          }
        }
      }
      if (fishingBait !== undefined && sv.filters[PIN_TYPES.FISHING_SHOW_BAIT] === true) {
        drtv.pinTag.push(
          DEST_PIN_TEXT_COLORBAIT_FISH.Colorize(zo_strformat("<<1>>", "<" + fishingBait + ">"))
        )
        if (sv.filters[PIN_TYPES.FISHING_SHOW_BAIT_LEFT] === true) {
          const fishingBaitLeft = baitLeftForPinType(pinType)
          if (fishingBaitLeft !== undefined) {
            drtv.pinTag.push(
              DEST_PIN_TEXT_COLORBAIT_FISH.Colorize(
                zo_strformat("<<1>>", "{" + fishingBaitLeft + "}")
              )
            )
          }
        }
      }
      if (waterType !== undefined && sv.filters[PIN_TYPES.FISHING_SHOW_WATER] === true) {
        drtv.pinTag.push(
          DEST_PIN_TEXT_COLORWATER_FISH.Colorize(zo_strformat("<<1>>", "(" + waterType + ")"))
        )
      }
      if (countFN >= 1 || countLN >= 1 || countON >= 1 || countRN >= 1) {
        if (countF >= 1 || countL >= 1 || countO >= 1 || countR >= 1) {
          LibMapPins.CreatePin(
            PIN_TYPES.FISHING,
            drtv.pinTag,
            rowNumber(pinData, AchIndex.X),
            rowNumber(pinData, AchIndex.Y)
          )
        }
      }
    }
  }
}
