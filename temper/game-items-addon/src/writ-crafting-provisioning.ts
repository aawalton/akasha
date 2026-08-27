import { ADDON_NAME } from "./constants"
import { computeCraftIterations } from "./writ-crafting-iterations"
import type { MasterWritSpec } from "./writ-crafting-master-decode"
import { planMasterConsumableNeeded } from "./writ-crafting-master-plan"
import { clearWritCraftQueue, type WritCraftRequest } from "./writ-crafting-queue"
import { newConsumableTrace, recordMasterConsumableTrace } from "./writ-master-consumable-trace"

export function resolveProvisioningWrit(
  questIndex: number,
  conditionIndex: number
): WritCraftRequest | undefined {
  const [foodId] = GetQuestConditionItemInfo(questIndex, 1, conditionIndex)
  if (foodId === 0) return undefined

  const [_text, current, max, _isFail, isComplete] = GetJournalQuestConditionInfo(
    questIndex,
    1,
    conditionIndex
  )
  if (isComplete || current >= max) return undefined

  return buildProvisioningCraftRequest(foodId, max - current, questIndex, conditionIndex)
}

export function resolveProvisioningMasterWrit(
  this: void,
  spec: MasterWritSpec,
  questIndex: number,
  conditionIndex: number
): WritCraftRequest | undefined {
  const [_text, current, max] = GetJournalQuestConditionInfo(questIndex, 1, conditionIndex)
  const needed = planMasterConsumableNeeded(current, max)
  return buildProvisioningCraftRequest(spec.itemId, needed, questIndex, conditionIndex, spec)
}

function buildProvisioningCraftRequest(
  this: void,
  foodId: number,
  needed: number,
  questIndex: number,
  conditionIndex: number,
  traceSpec?: MasterWritSpec
): WritCraftRequest | undefined {
  if (needed <= 0) {
    if (traceSpec !== undefined) {
      recordMasterConsumableTrace(
        newConsumableTrace(traceSpec, needed, "resolve", "nothing-needed")
      )
    }
    return undefined
  }

  const [_station, recipeListIndex, recipeIndex] = GetRecipeInfoFromItemId(foodId)
  if (recipeListIndex === undefined || recipeIndex === undefined) {
    if (traceSpec !== undefined) {
      recordMasterConsumableTrace(
        newConsumableTrace(traceSpec, needed, "resolve", "unknown-recipe")
      )
    }
    d(`[${ADDON_NAME}] Unknown provisioning recipe for item ${foodId}`)
    return undefined
  }

  const listIdx = recipeListIndex
  const recIdx = recipeIndex

  if (traceSpec !== undefined) {
    const t = newConsumableTrace(traceSpec, needed, "resolve", "enqueued")
    t.recipeListIndex = listIdx
    t.recipeIndex = recIdx
    recordMasterConsumableTrace(t)
  }

  return {
    craftType: CRAFTING_TYPE_PROVISIONING,
    questIndex,
    conditionIndex,
    execute: function (this: void): undefined {
      if (GetCraftingInteractionType() === 0) {
        if (traceSpec !== undefined) {
          const t = newConsumableTrace(traceSpec, needed, "execute", "not-in-interaction")
          t.interactionType = 0
          recordMasterConsumableTrace(t)
        }
        return
      }

      const [maxIter] = GetMaxIterationsPossibleForRecipe(listIdx, recIdx)
      const yieldPerIter = GetRecipeResultQuantity(listIdx, recIdx, 1)
      const iterations = computeCraftIterations(needed, yieldPerIter, maxIter)
      if (iterations < 1) {
        if (traceSpec !== undefined) {
          const t = newConsumableTrace(traceSpec, needed, "execute", "ingredient-bounded")
          t.interactionType = GetCraftingInteractionType()
          t.maxIter = maxIter
          t.yieldPerIter = yieldPerIter
          t.iterations = iterations
          recordMasterConsumableTrace(t)
        }
        d(`[${ADDON_NAME}] Not enough ingredients for provisioning writ`)
        clearWritCraftQueue()
        return
      }

      if (traceSpec !== undefined) {
        const t = newConsumableTrace(traceSpec, needed, "execute", "crafted")
        t.interactionType = GetCraftingInteractionType()
        t.maxIter = maxIter
        t.yieldPerIter = yieldPerIter
        t.iterations = iterations
        recordMasterConsumableTrace(t)
      }
      CraftProvisionerItem(listIdx, recIdx, iterations)
    },
  }
}
