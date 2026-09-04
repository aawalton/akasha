import type { StoredTraitItem } from "../craft-account-init/craft-account-init.module.code.ts"
import { getTrait } from "../craft-validation/craft-validation.module.code.ts"
import { nilCheck } from "../crafting-helpers/crafting-helpers.module.code.ts"
import { STATE } from "../crafting-state/crafting-state.module.code.ts"

export function migrateJewelryIdSwap(): undefined {
  const account = STATE.Account

  function linkedItemIsCheaperThanCurrentItemAndShouldReplaceIt(
    link: string,
    craft: number,
    line: number,
    trait: number
  ): boolean {
    const q1 = GetItemLinkQuality(link)
    const l1 = GetItemLinkRequiredLevel(link)
    const v1 = GetItemLinkRequiredChampionPoints(link)

    const freshTable: unknown = {}
    if (nilCheck(account.crafting.stored, {}, craft, line, trait) === freshTable) {
      return true
    }
    const storedLine =
      account.crafting.stored[craft]?.[line] ??
      error("TemperCrafting: stored jewelry line not accessible")
    const storedTrait: StoredTraitItem | undefined = storedLine[trait]
    if (storedTrait === undefined || storedTrait.link === undefined) {
      return true
    } else {
      const q2 = GetItemLinkQuality(storedTrait.link)
      const l2 = GetItemLinkRequiredLevel(storedTrait.link)
      const v2 = GetItemLinkRequiredChampionPoints(storedTrait.link)
      if (q1 < q2) {
        return true
      }
      if (l1 < l2) {
        return true
      }
      if (v1 < v2) {
        return true
      }
      return false
    }
  }

  function deepcopy(orig: string | number): string | number
  function deepcopy(orig: StoredTraitItem): StoredTraitItem
  function deepcopy(
    orig: LuaMetatable<Record<string, unknown>> | undefined
  ): LuaMetatable<Record<string, unknown>> | undefined
  function deepcopy(orig: unknown): unknown
  function deepcopy(orig: unknown): unknown {
    let copy: unknown
    if (istable(orig)) {
      const copyTable: Record<string, unknown> = {}
      for (const [origKey, origValue] of pairs(orig)) {
        copyTable[deepcopy(origKey)] = deepcopy(origValue)
      }
      setmetatable(copyTable, deepcopy(getmetatable(orig)))
      copy = copyTable
    } else {
      copy = orig
    }
    return copy
  }

  function tablelength(t: Record<number, unknown>): number {
    let count = 0
    for (const [key] of pairs(t)) {
      if (key !== undefined) {
        count = count + 1
      }
    }
    return count
  }

  const jewelryCraft = 7

  const jewelryStored = account.crafting.stored[jewelryCraft]
  if (jewelryStored === undefined) {
    zo_callLater(() => {
      CHAT_ROUTER.AddSystemMessage(
        "[TemperCrafting] !!ERROR!! CS.Account.crafting.stored[" +
          tostring(jewelryCraft) +
          "] not accessible. Skipping migration."
      )
    }, 50)
    return
  }

  const oldNecklaceLine = 1
  const oldRingLine = 2
  const newNecklaceLine = 2
  const newRingLine = 1
  let cache: StoredTraitItem | undefined

  const missingLine = "TemperCrafting: stored jewelry line not accessible"
  const oldNecklaceLineTable = jewelryStored[oldNecklaceLine] ?? error(missingLine)
  const oldRingLineTable = jewelryStored[oldRingLine] ?? error(missingLine)
  const newNecklaceLineTable = jewelryStored[newNecklaceLine] ?? error(missingLine)
  const newRingLineTable = jewelryStored[newRingLine] ?? error(missingLine)

  const traitCount = tablelength(oldNecklaceLineTable)

  for (let trait = 1; trait <= traitCount; trait++) {
    const oldNecklaceTraitData =
      oldNecklaceLineTable[trait] ?? error("TemperCrafting: missing jewelry trait entry")
    const oldRingTraitData =
      oldRingLineTable[trait] ?? error("TemperCrafting: missing jewelry trait entry")

    if (STATE.Debug) {
      zo_callLater(() => {
        CHAT_ROUTER.AddSystemMessage("trait " + tostring(trait))
      }, 50)
    }
    let actualLineOfOldNecklaceTraitData: number | false | undefined = 0
    let actualLineOfOldRingTraitData: number | false | undefined = 0

    if (oldNecklaceTraitData.link !== undefined) {
      const [, necklaceLine] = getTrait(oldNecklaceTraitData.link)
      actualLineOfOldNecklaceTraitData = necklaceLine
      if (STATE.Debug) {
        zo_callLater(() => {
          CHAT_ROUTER.AddSystemMessage("line 1: " + tostring(oldNecklaceTraitData.link))
        }, 50)
      }
    } else {
      if (STATE.Debug) {
        zo_callLater(() => {
          CHAT_ROUTER.AddSystemMessage("line 1: {}")
        }, 50)
      }
    }
    if (oldRingTraitData.link !== undefined) {
      const [, ringLine] = getTrait(oldRingTraitData.link)
      actualLineOfOldRingTraitData = ringLine

      if (STATE.Debug) {
        zo_callLater(() => {
          CHAT_ROUTER.AddSystemMessage("line 2: " + tostring(oldRingTraitData.link))
        }, 50)
      }
    } else {
      if (STATE.Debug) {
        zo_callLater(() => {
          CHAT_ROUTER.AddSystemMessage("line 2: {}")
        }, 50)
      }
    }

    if (actualLineOfOldNecklaceTraitData === 0) {
      if (actualLineOfOldRingTraitData === 0) {
        if (STATE.Debug) {
          zo_callLater(() => {
            CHAT_ROUTER.AddSystemMessage("line1 empty and line2 empty, nothing to do")
          }, 50)
        }
      } else {
        if (STATE.Debug) {
          zo_callLater(() => {
            CHAT_ROUTER.AddSystemMessage("line1 empty and line2 not empty")
          }, 50)
        }
        if (actualLineOfOldRingTraitData === newRingLine) {
          if (STATE.Debug) {
            zo_callLater(() => {
              CHAT_ROUTER.AddSystemMessage("line2 wrong")
            }, 50)
            zo_callLater(() => {
              CHAT_ROUTER.AddSystemMessage("moving entry of line2 to line1")
            }, 50)
          }
          newRingLineTable[trait] = deepcopy(oldRingTraitData)
          oldRingLineTable[trait] = {}
        } else {
          if (STATE.Debug) {
            zo_callLater(() => {
              CHAT_ROUTER.AddSystemMessage("line2 correct, nothing to do")
            }, 50)
          }
        }
      }
    } else {
      if (actualLineOfOldRingTraitData === 0) {
        if (STATE.Debug) {
          zo_callLater(() => {
            CHAT_ROUTER.AddSystemMessage("line1 not empty and line2 empty")
          }, 50)
        }
        if (actualLineOfOldNecklaceTraitData === newNecklaceLine) {
          if (STATE.Debug) {
            zo_callLater(() => {
              CHAT_ROUTER.AddSystemMessage("line1 wrong")
            }, 50)

            zo_callLater(() => {
              CHAT_ROUTER.AddSystemMessage("moving entry of line1 to line2")
            }, 50)
          }
          newNecklaceLineTable[trait] = deepcopy(oldNecklaceTraitData)
          oldNecklaceLineTable[trait] = {}
        } else {
          if (STATE.Debug) {
            zo_callLater(() => {
              CHAT_ROUTER.AddSystemMessage("line1 correct, nothing to do")
            }, 50)
          }
        }
      } else {
        if (STATE.Debug) {
          zo_callLater(() => {
            CHAT_ROUTER.AddSystemMessage("line1 not empty and line2 not empty")
          }, 50)
        }
        if (
          actualLineOfOldRingTraitData === newNecklaceLine &&
          actualLineOfOldNecklaceTraitData === newRingLine
        ) {
          if (STATE.Debug) {
            zo_callLater(() => {
              CHAT_ROUTER.AddSystemMessage("line1 wrong and line2 wrong => swap entries")
            }, 50)
          }
          cache = deepcopy(oldNecklaceTraitData)
          newRingLineTable[trait] = deepcopy(oldRingTraitData)
          newNecklaceLineTable[trait] = cache
        } else if (
          actualLineOfOldRingTraitData === newNecklaceLine &&
          actualLineOfOldNecklaceTraitData === newNecklaceLine
        ) {
          if (STATE.Debug) {
            zo_callLater(() => {
              CHAT_ROUTER.AddSystemMessage("line1 wrong and line2 correct")
            }, 50)
          }
          if (
            linkedItemIsCheaperThanCurrentItemAndShouldReplaceIt(
              oldNecklaceTraitData.link ?? error("TemperCrafting: missing jewelry item link"),
              jewelryCraft,
              newNecklaceLine,
              trait
            )
          ) {
            if (STATE.Debug) {
              zo_callLater(() => {
                CHAT_ROUTER.AddSystemMessage(
                  "line1 cheaper than line2, replacing entry of line2 with line1"
                )
              }, 50)
            }
            newNecklaceLineTable[trait] = deepcopy(oldNecklaceTraitData)
          } else {
            if (STATE.Debug) {
              zo_callLater(() => {
                CHAT_ROUTER.AddSystemMessage(
                  "line2 already cheaper or equal than line1, keeping line2"
                )
              }, 50)
            }
          }
          if (STATE.Debug) {
            zo_callLater(() => {
              CHAT_ROUTER.AddSystemMessage("clearing line1")
            }, 50)
          }
          oldNecklaceLineTable[trait] = {}
        } else if (
          actualLineOfOldRingTraitData === newRingLine &&
          actualLineOfOldNecklaceTraitData === newRingLine
        ) {
          if (STATE.Debug) {
            zo_callLater(() => {
              CHAT_ROUTER.AddSystemMessage("line1 correct and line2 wrong")
            }, 50)
          }
          if (
            linkedItemIsCheaperThanCurrentItemAndShouldReplaceIt(
              oldRingTraitData.link ?? error("TemperCrafting: missing jewelry item link"),
              jewelryCraft,
              newRingLine,
              trait
            )
          ) {
            if (STATE.Debug) {
              zo_callLater(() => {
                CHAT_ROUTER.AddSystemMessage(
                  "line2 cheaper than line1, replacing entry of line1 with line2"
                )
              }, 50)
            }
            newRingLineTable[trait] = deepcopy(oldRingTraitData)
          } else {
            if (STATE.Debug) {
              zo_callLater(() => {
                CHAT_ROUTER.AddSystemMessage(
                  "line1 already cheaper or equal than line2, keeping line1"
                )
              }, 50)
            }
          }
          if (STATE.Debug) {
            zo_callLater(() => {
              CHAT_ROUTER.AddSystemMessage("clearing line2")
            }, 50)
          }
          oldRingLineTable[trait] = {}
        } else {
          if (STATE.Debug) {
            zo_callLater(() => {
              CHAT_ROUTER.AddSystemMessage("line1 correct and line2 correct, nothing to do")
            }, 50)
          }
        }
      }
    }
  }
}
