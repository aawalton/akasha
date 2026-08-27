import {
  DEST_PIN_TEXT_COLOR_COLLECTIBLE,
  DEST_PIN_TEXT_COLOR_COLLECTIBLE_DONE,
  DEST_PIN_TEXT_COLORTITLE_COLLECTIBLE,
} from "../colors"
import { PIN_TYPES } from "../pin-type-constants"
import { drtv } from "../runtime-variables"
import { getSavedVariables } from "../saved-variables"
import { achState, sharedAchievementsPinData } from "./ach-callbacks"
import {
  AchIndex,
  CollectibleIDs,
  CollectibleIndex,
  CollectibleStore,
  rowNumber,
  rowString,
} from "./stores"

function mobNumberForCriterion(i: number): string {
  if (i === 10) return "A"
  if (i === 11) return "B"
  if (i === 12) return "C"
  return tostring(i)
}

export function CollectiblepinTypeCallback(this: void): undefined {
  if (GetMapType() >= MAPTYPE_WORLD) return
  drtv.pinName = PIN_TYPES.COLLECTIBLES
  sharedAchievementsPinData()
  const mapData = achState.mapData
  if (mapData === undefined) return
  const sv = getSavedVariables()
  for (const pinData of mapData) {
    drtv.pinType = rowNumber(pinData, AchIndex.TYPE)
    if (drtv.pinType === 30) {
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
      drtv.pinTag = []
      let countCN = 0
      let countCND = 0
      if (completedTotal !== requiredTotal) {
        drtv.pinTag.push(
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
                      drtv.pinTag.push(
                        DEST_PIN_TEXT_COLOR_COLLECTIBLE.Colorize(
                          zo_strformat("<<1>>", "[" + collectibleName + "]")
                        )
                      )
                    }
                    if (sv.filters[PIN_TYPES.COLLECTIBLES_SHOW_ITEM] === true) {
                      drtv.pinTag.push(
                        DEST_PIN_TEXT_COLOR_COLLECTIBLE.Colorize(
                          zo_strformat("<<1>>", "<" + collectibleItem + ">")
                        )
                      )
                    }
                  } else if (LibMapPins.IsEnabled(PIN_TYPES.COLLECTIBLESDONE)) {
                    if (sv.filters[PIN_TYPES.COLLECTIBLES_SHOW_MOBNAME] === true) {
                      drtv.pinTag.push(
                        DEST_PIN_TEXT_COLOR_COLLECTIBLE.Colorize(
                          zo_strformat("<<1>>", "[" + collectibleName + "]")
                        )
                      )
                    }
                    if (sv.filters[PIN_TYPES.COLLECTIBLES_SHOW_ITEM] === true) {
                      drtv.pinTag.push(
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
            drtv.pinTag,
            rowNumber(pinData, AchIndex.X),
            rowNumber(pinData, AchIndex.Y)
          )
        }
      }
    }
  }
}

export function CollectibleDonepinTypeCallback(this: void): undefined {
  if (GetMapType() >= MAPTYPE_WORLD) return
  drtv.pinName = PIN_TYPES.COLLECTIBLESDONE
  sharedAchievementsPinData()
  const mapData = achState.mapData
  if (mapData === undefined) return
  const sv = getSavedVariables()
  for (const pinData of mapData) {
    drtv.pinType = rowNumber(pinData, AchIndex.TYPE)
    if (drtv.pinType === 30) {
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
      drtv.pinTag = []
      let countCN = 0
      drtv.pinTag.push(
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
                    drtv.pinTag.push(
                      DEST_PIN_TEXT_COLOR_COLLECTIBLE_DONE.Colorize(
                        zo_strformat("<<1>>", "[" + collectibleName + "]")
                      )
                    )
                  }
                  if (sv.filters[PIN_TYPES.COLLECTIBLES_SHOW_ITEM] === true) {
                    drtv.pinTag.push(
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
          drtv.pinTag,
          rowNumber(pinData, AchIndex.X),
          rowNumber(pinData, AchIndex.Y)
        )
      }
    }
  }
}
