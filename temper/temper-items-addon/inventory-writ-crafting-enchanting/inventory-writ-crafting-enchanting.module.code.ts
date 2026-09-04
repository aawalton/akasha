import { ADDON_NAME } from "../inventory-constants/inventory-constants.module.code.ts"
import { ensureEnchantSoundGuard } from "../inventory-writ-crafting-enchant-sound-guard/inventory-writ-crafting-enchant-sound-guard.module.code.ts"
import {
  GLYPH_TYPES,
  LEVEL_TIERS,
  selectMasterEnchantingRunes,
  selectPotencyRune,
  TA_ITEM_ID,
} from "../inventory-writ-crafting-glyph-table/inventory-writ-crafting-glyph-table.module.code.ts"
import { computeCraftIterations } from "../inventory-writ-crafting-iterations/inventory-writ-crafting-iterations.module.code.ts"
import type { MasterWritSpec } from "../inventory-writ-crafting-master-decode/inventory-writ-crafting-master-decode.module.code.ts"
import { planMasterConsumableNeeded } from "../inventory-writ-crafting-master-plan/inventory-writ-crafting-master-plan.module.code.ts"
import {
  clearWritCraftQueue,
  type WritCraftRequest,
} from "../inventory-writ-crafting-queue/inventory-writ-crafting-queue.module.code.ts"
import {
  newConsumableTrace,
  recordMasterConsumableTrace,
} from "../inventory-writ-master-consumable-trace/inventory-writ-master-consumable-trace.module.code.ts"
export function findItemInBags(itemId: number): { bag: number; slot: number } | undefined {
  const bags = [BAG_BACKPACK, BAG_BANK, BAG_SUBSCRIBER_BANK]
  for (const bagId of bags) {
    const size = GetBagSize(bagId)
    for (let i = 0; i <= size; i++) {
      if (GetItemId(bagId, i) === itemId) {
        return { bag: bagId, slot: i }
      }
    }
  }
  if (GetItemId(BAG_VIRTUAL, itemId) !== 0) {
    return { bag: BAG_VIRTUAL, slot: itemId }
  }
  return undefined
}

export function findEnchantingRunes(
  questIndex: number,
  conditionIndex: number
): { essenceRuneId: number; potencyRuneId: number } | undefined {
  for (const [glyphItemId, essenceRuneId, polarity] of GLYPH_TYPES) {
    for (const [quality, level, additiveId, subtractiveId] of LEVEL_TIERS) {
      const link = string.format(
        "|H1:item:%d:%d:%d:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
        glyphItemId,
        quality,
        level
      )

      if (DoesItemLinkFulfillJournalQuestCondition(link, questIndex, 1, conditionIndex, true)) {
        const [cur, max] = GetJournalQuestConditionValues(questIndex, 1, conditionIndex)
        if (cur < max) {
          const potencyRuneId = selectPotencyRune(polarity, additiveId, subtractiveId)
          return { essenceRuneId, potencyRuneId }
        }
      }
    }
  }
  return undefined
}

export function resolveEnchantingWrit(
  questIndex: number,
  conditionIndex: number
): WritCraftRequest | undefined {
  const runes = findEnchantingRunes(questIndex, conditionIndex)
  if (runes === undefined) return undefined

  const [cur, max] = GetJournalQuestConditionValues(questIndex, 1, conditionIndex)
  return buildEnchantingCraftRequest(
    runes.potencyRuneId,
    runes.essenceRuneId,
    TA_ITEM_ID,
    max - cur,
    questIndex,
    conditionIndex
  )
}

export function resolveEnchantingMasterWrit(
  this: void,
  spec: MasterWritSpec,
  questIndex: number,
  conditionIndex: number
): WritCraftRequest | undefined {
  const runes = selectMasterEnchantingRunes(spec.itemId, spec.targetQuality, spec.materialItemId)
  if (runes === undefined) {
    recordMasterConsumableTrace(newConsumableTrace(spec, 1, "resolve", "unresolved-glyph"))
    d(
      `[${ADDON_NAME}] ERROR: master enchanting writ not auto-crafted — unresolved glyph ${spec.itemId} q${spec.targetQuality} tier ${spec.materialItemId} (unknown glyph, quality, or tier value)`
    )
    return undefined
  }
  const [, current, max] = GetJournalQuestConditionInfo(questIndex, 1, conditionIndex)
  const needed = planMasterConsumableNeeded(current, max)
  return buildEnchantingCraftRequest(
    runes.potencyRuneId,
    runes.essenceRuneId,
    runes.aspectRuneId,
    needed,
    questIndex,
    conditionIndex,
    spec
  )
}

function buildEnchantingCraftRequest(
  this: void,
  potencyRuneId: number,
  essenceRuneId: number,
  aspectRuneId: number,
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

  if (traceSpec !== undefined) {
    const t = newConsumableTrace(traceSpec, needed, "resolve", "enqueued")
    t.potencyRuneId = potencyRuneId
    t.essenceRuneId = essenceRuneId
    t.aspectRuneId = aspectRuneId
    recordMasterConsumableTrace(t)
  }

  return {
    craftType: CRAFTING_TYPE_ENCHANTING,
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

      const potency = findItemInBags(potencyRuneId)
      const essence = findItemInBags(essenceRuneId)
      const aspect = findItemInBags(aspectRuneId)

      if (potency === undefined || essence === undefined || aspect === undefined) {
        if (traceSpec !== undefined) {
          const t = newConsumableTrace(traceSpec, needed, "execute", "missing-ingredients")
          t.interactionType = GetCraftingInteractionType()
          t.potencyRuneId = potencyRuneId
          t.essenceRuneId = essenceRuneId
          t.aspectRuneId = aspectRuneId
          recordMasterConsumableTrace(t)
        }
        d(`[${ADDON_NAME}] Missing runes for enchanting writ`)
        clearWritCraftQueue()
        return
      }

      const [maxIter] = GetMaxIterationsPossibleForEnchantingItem(
        potency.bag,
        potency.slot,
        essence.bag,
        essence.slot,
        aspect.bag,
        aspect.slot
      )
      const iterations = computeCraftIterations(needed, 1, maxIter)
      if (iterations < 1) {
        if (traceSpec !== undefined) {
          const t = newConsumableTrace(traceSpec, needed, "execute", "ingredient-bounded")
          t.interactionType = GetCraftingInteractionType()
          t.maxIter = maxIter
          t.iterations = iterations
          recordMasterConsumableTrace(t)
        }
        d(`[${ADDON_NAME}] Missing runes for enchanting writ`)
        clearWritCraftQueue()
        return
      }

      if (traceSpec !== undefined) {
        const t = newConsumableTrace(traceSpec, needed, "execute", "crafted")
        t.interactionType = GetCraftingInteractionType()
        t.maxIter = maxIter
        t.iterations = iterations
        recordMasterConsumableTrace(t)
      }

      ensureEnchantSoundGuard()
      CraftEnchantingItem(
        potency.bag,
        potency.slot,
        essence.bag,
        essence.slot,
        aspect.bag,
        aspect.slot,
        iterations
      )
    },
  }
}
