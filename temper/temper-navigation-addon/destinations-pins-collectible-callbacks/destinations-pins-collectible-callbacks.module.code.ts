import {
  DEST_PIN_TEXT_COLOR_COLLECTIBLE,
  DEST_PIN_TEXT_COLOR_COLLECTIBLE_DONE,
  DEST_PIN_TEXT_COLORTITLE_COLLECTIBLE,
} from "../destinations-colors/destinations-colors.module.code.ts"
import { PIN_TYPES } from "../destinations-pin-type-constants/destinations-pin-type-constants.module.code.ts"
import {
  ACH_STATE,
  sharedAchievementsPinData,
} from "../destinations-pins-ach-callbacks/destinations-pins-ach-callbacks.module.code.ts"
import {
  AchIndex,
  CollectibleIDs,
  CollectibleIndex,
  CollectibleStore,
  rowNumber,
  rowString,
} from "../destinations-pins-stores/destinations-pins-stores.module.code.ts"
import { DRTV } from "../destinations-runtime-variables/destinations-runtime-variables.module.code.ts"
import { getSavedVariables } from "../destinations-saved-variables/destinations-saved-variables.module.code.ts"

function mobNumberForCriterion(i: number): string {
  if (i === 10) return "A"
  if (i === 11) return "B"
  if (i === 12) return "C"
  return tostring(i)
}

export function collectiblepinTypeCallback(this: void): undefined {
  if (GetMapType() >= MAPTYPE_WORLD) return
  DRTV.pinName = PIN_TYPES.COLLECTIBLES
  sharedAchievementsPinData()
  const mapData = ACH_STATE.mapData
  if (mapData === undefined) return
  const sv = getSavedVariables()
  for (const pinData of mapData) {
    DRTV.pinType = rowNumber(pinData, AchIndex.TYPE)
    if (DRTV.pinType === 30) {
      const collectibleID = rowNumber(pinData, AchIndex.ID)
      const collectibleCode = rowString(pinData, AchIndex.KEYCODE)
      let completedTotal = 0
      const requiredTotal = GetAchievementNumCriteria(collectibleID)
      for (let i = 1; i <= requiredTotal; i++) {
        const [, completed] = GetAchievementCriterion(collectibleID, i)
        if (completed === 1) {
          completedTotal = completedTotal + 1
        }
      }
      DRTV.pinTag = []
      let countCN = 0
      let countCND = 0
      if (completedTotal !== requiredTotal) {
        DRTV.pinTag.push(
          DEST_PIN_TEXT_COLORTITLE_COLLECTIBLE.Colorize(
            zo_strformat("<<1>>", CollectibleIDs[collectibleID])
          )
        )
        const collectibledata = CollectibleStore[collectibleID] ?? []
        for (let i = 1; i <= requiredTotal; i++) {
          for (const collectibleEntry of collectibledata) {
            const collectibleNumber = rowNumber(collectibleEntry, CollectibleIndex.NUMBER)
            const collectibleMobNumber = mobNumberForCriterion(i)
            if (collectibleNumber === i) {
              const [findStart] = string.find(collectibleCode, collectibleMobNumber)
              if (findStart !== undefined) {
                const [, completed] = GetAchievementCriterion(collectibleID, i)
                if (completed === 0) {
                  countCN = countCN + 1
                } else if (LibMapPins.IsEnabled(PIN_TYPES.COLLECTIBLESDONE)) {
                  countCND = countCND + 1
                }
              }
            }
          }
        }
        if (
          sv.filters[PIN_TYPES.COLLECTIBLES_SHOW_MOBNAME] === true ||
          sv.filters[PIN_TYPES.COLLECTIBLES_SHOW_ITEM] === true
        ) {
          for (let i = 1; i <= requiredTotal; i++) {
            for (const collectibleEntry of collectibledata) {
              const collectibleNumber = rowNumber(collectibleEntry, CollectibleIndex.NUMBER)
              const collectibleName = rowString(collectibleEntry, CollectibleIndex.NAME)
              const collectibleMobNumber = mobNumberForCriterion(i)
              if (collectibleNumber === i) {
                const [findStart] = string.find(collectibleCode, collectibleMobNumber)
                if (findStart !== undefined) {
                  const [collectibleItem, completed] = GetAchievementCriterion(collectibleID, i)
                  if (completed === 0) {
                    if (sv.filters[PIN_TYPES.COLLECTIBLES_SHOW_MOBNAME] === true) {
                      DRTV.pinTag.push(
                        DEST_PIN_TEXT_COLOR_COLLECTIBLE.Colorize(
                          zo_strformat("<<1>>", "[" + collectibleName + "]")
                        )
                      )
                    }
                    if (sv.filters[PIN_TYPES.COLLECTIBLES_SHOW_ITEM] === true) {
                      DRTV.pinTag.push(
                        DEST_PIN_TEXT_COLOR_COLLECTIBLE.Colorize(
                          zo_strformat("<<1>>", "<" + collectibleItem + ">")
                        )
                      )
                    }
                  } else if (LibMapPins.IsEnabled(PIN_TYPES.COLLECTIBLESDONE)) {
                    if (sv.filters[PIN_TYPES.COLLECTIBLES_SHOW_MOBNAME] === true) {
                      DRTV.pinTag.push(
                        DEST_PIN_TEXT_COLOR_COLLECTIBLE.Colorize(
                          zo_strformat("<<1>>", "[" + collectibleName + "]")
                        )
                      )
                    }
                    if (sv.filters[PIN_TYPES.COLLECTIBLES_SHOW_ITEM] === true) {
                      DRTV.pinTag.push(
                        DEST_PIN_TEXT_COLOR_COLLECTIBLE.Colorize(
                          zo_strformat("<<1>>", "<" + collectibleItem + ">")
                        )
                      )
                    }
                  }
                }
              }
            }
          }
        }
        if (countCN >= 1 && countCND === 0) {
          LibMapPins.CreatePin(
            PIN_TYPES.COLLECTIBLES,
            DRTV.pinTag,
            rowNumber(pinData, AchIndex.X),
            rowNumber(pinData, AchIndex.Y)
          )
        }
      }
    }
  }
}

export function collectibleDonepinTypeCallback(this: void): undefined {
  if (GetMapType() >= MAPTYPE_WORLD) return
  DRTV.pinName = PIN_TYPES.COLLECTIBLESDONE
  sharedAchievementsPinData()
  const mapData = ACH_STATE.mapData
  if (mapData === undefined) return
  const sv = getSavedVariables()
  for (const pinData of mapData) {
    DRTV.pinType = rowNumber(pinData, AchIndex.TYPE)
    if (DRTV.pinType === 30) {
      const collectibleID = rowNumber(pinData, AchIndex.ID)
      const collectibleCode = rowString(pinData, AchIndex.KEYCODE)
      let completedTotal = 0
      const requiredTotal = GetAchievementNumCriteria(collectibleID)
      for (let i = 1; i <= requiredTotal; i++) {
        const [, completed] = GetAchievementCriterion(collectibleID, i)
        if (completed === 1) {
          completedTotal = completedTotal + 1
        }
      }
      DRTV.pinTag = []
      let countCN = 0
      DRTV.pinTag.push(
        DEST_PIN_TEXT_COLORTITLE_COLLECTIBLE.Colorize(
          zo_strformat("<<1>>", CollectibleIDs[collectibleID])
        )
      )
      const collectibledata = CollectibleStore[collectibleID] ?? []
      for (let i = 1; i <= requiredTotal; i++) {
        for (const collectibleEntry of collectibledata) {
          const collectibleNumber = rowNumber(collectibleEntry, CollectibleIndex.NUMBER)
          if (collectibleNumber === i) {
            const [findStart] = string.find(collectibleCode, tostring(i))
            if (findStart !== undefined) {
              const [, completed] = GetAchievementCriterion(collectibleID, i)
              if (completed === 1) {
                countCN = countCN + 1
              }
            }
          }
        }
      }
      if (
        sv.filters[PIN_TYPES.COLLECTIBLES_SHOW_MOBNAME] === true ||
        sv.filters[PIN_TYPES.COLLECTIBLES_SHOW_ITEM] === true
      ) {
        for (let i = 1; i <= requiredTotal; i++) {
          for (const collectibleEntry of collectibledata) {
            const collectibleNumber = rowNumber(collectibleEntry, CollectibleIndex.NUMBER)
            const collectibleName = rowString(collectibleEntry, CollectibleIndex.NAME)
            if (collectibleNumber === i) {
              const [findStart] = string.find(collectibleCode, tostring(i))
              if (findStart !== undefined) {
                const [collectibleItem, completed] = GetAchievementCriterion(collectibleID, i)
                if (completed === 1) {
                  if (sv.filters[PIN_TYPES.COLLECTIBLES_SHOW_MOBNAME] === true) {
                    DRTV.pinTag.push(
                      DEST_PIN_TEXT_COLOR_COLLECTIBLE_DONE.Colorize(
                        zo_strformat("<<1>>", "[" + collectibleName + "]")
                      )
                    )
                  }
                  if (sv.filters[PIN_TYPES.COLLECTIBLES_SHOW_ITEM] === true) {
                    DRTV.pinTag.push(
                      DEST_PIN_TEXT_COLOR_COLLECTIBLE_DONE.Colorize(
                        zo_strformat("<<1>>", "<" + collectibleItem + ">")
                      )
                    )
                  }
                }
              }
            }
          }
        }
      }
      if (countCN >= 1) {
        LibMapPins.CreatePin(
          PIN_TYPES.COLLECTIBLESDONE,
          DRTV.pinTag,
          rowNumber(pinData, AchIndex.X),
          rowNumber(pinData, AchIndex.Y)
        )
      }
    }
  }
}
