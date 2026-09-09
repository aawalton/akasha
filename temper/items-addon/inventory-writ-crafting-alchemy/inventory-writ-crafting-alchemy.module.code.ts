import { ADDON_NAME } from "../inventory-constants/inventory-constants.module.code.ts"
import { captureOrNull } from "../inventory-match-capture/inventory-match-capture.module.code.ts"
import {
  REAGENT_TRAITS,
  solveReagentPairs,
} from "../inventory-writ-crafting-alchemy-solver/inventory-writ-crafting-alchemy-solver.module.code.ts"
import { findItemInBags } from "../inventory-writ-crafting-enchanting/inventory-writ-crafting-enchanting.module.code.ts"
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
export const SOLVENT_ITEM_IDS = [
  883, 1187, 4570, 23265, 23266, 23267, 23268, 64500, 64501, 75364, 75365,
]

export function findSolvent(
  requiredItemId: number,
  materialItemId: number
): { bag: number; slot: number } | undefined {
  const bags = [BAG_BACKPACK, BAG_BANK, BAG_SUBSCRIBER_BANK]
  for (const bagId of bags) {
    const size = GetBagSize(bagId)
    for (let i = 0; i <= size; i++) {
      if (IsAlchemySolventForItemAndMaterialId(bagId, i, requiredItemId, materialItemId)) {
        return { bag: bagId, slot: i }
      }
    }
  }
  for (const sid of SOLVENT_ITEM_IDS) {
    if (GetItemId(BAG_VIRTUAL, sid) !== 0) {
      if (IsAlchemySolventForItemAndMaterialId(BAG_VIRTUAL, sid, requiredItemId, materialItemId)) {
        return { bag: BAG_VIRTUAL, slot: sid }
      }
    }
  }
  return undefined
}

export function resolveAlchemyWrit(
  questIndex: number,
  conditionIndex: number
): WritCraftRequest | undefined {
  const [requiredItemId, materialItemId] = GetQuestConditionItemInfo(questIndex, 1, conditionIndex)
  const [, current, max] = GetJournalQuestConditionInfo(questIndex, 1, conditionIndex)
  if (current >= max) return undefined

  return buildAlchemyCraftRequest(
    requiredItemId,
    materialItemId,
    max - current,
    questIndex,
    conditionIndex
  )
}

export function resolveAlchemyMasterWrit(
  this: void,
  spec: MasterWritSpec,
  questIndex: number,
  conditionIndex: number
): WritCraftRequest | undefined {
  const [, current, max] = GetJournalQuestConditionInfo(questIndex, 1, conditionIndex)
  const needed = planMasterConsumableNeeded(current, max)
  return buildMasterAlchemyCraftRequest(spec, needed, questIndex, conditionIndex)
}

interface ReagentSlot {
  id: number
  bag: number
  slot: number
}

function findCarriedReagents(this: void): ReagentSlot[] {
  const carried: ReagentSlot[] = []
  for (const reagentIdStr of Object.keys(REAGENT_TRAITS)) {
    const id = Number(reagentIdStr)
    const loc = findItemInBags(id)
    if (loc !== undefined) carried.push({ id, bag: loc.bag, slot: loc.slot })
  }
  return carried
}

function parseAlchemyResultLink(
  this: void,
  link: string
): { itemId: number; encodedTraits: number } | undefined {
  if (link === "") return undefined
  const [rawItemId, rawTraits] = string.match(
    link,
    "^|H[^:]+:item:([^:]+):[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:([^|]+)|h"
  )
  const itemIdStr = captureOrNull(rawItemId)
  const traitsStr = captureOrNull(rawTraits)
  if (itemIdStr === null || traitsStr === null) return undefined
  const itemId = tonumber(itemIdStr)
  const encodedTraits = tonumber(traitsStr)
  if (itemId === undefined || encodedTraits === undefined) return undefined
  return { itemId, encodedTraits }
}

function reagentComboMatches(
  this: void,
  spec: MasterWritSpec,
  solvent: { bag: number; slot: number },
  r1: ReagentSlot,
  r2: ReagentSlot,
  r3: ReagentSlot | undefined
): boolean {
  const [link] = GetAlchemyResultingItemLink(
    solvent.bag,
    solvent.slot,
    r1.bag,
    r1.slot,
    r2.bag,
    r2.slot,
    r3?.bag,
    r3?.slot,
    LINK_STYLE_DEFAULT
  )
  const parsed = parseAlchemyResultLink(link)
  if (parsed === undefined) return false
  return parsed.itemId === spec.itemId && parsed.encodedTraits === spec.encodedAlchemyTraits
}

function findMasterAlchemyReagents(
  this: void,
  spec: MasterWritSpec,
  solvent: { bag: number; slot: number }
): { r1: ReagentSlot; r2: ReagentSlot; r3: ReagentSlot | undefined } | undefined {
  const carried = findCarriedReagents()
  const n = carried.length

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const a = carried[i]
      const b = carried[j]
      if (a === undefined || b === undefined) continue
      if (reagentComboMatches(spec, solvent, a, b, undefined)) {
        return { r1: a, r2: b, r3: undefined }
      }
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      for (let k = j + 1; k < n; k++) {
        const a = carried[i]
        const b = carried[j]
        const c = carried[k]
        if (a === undefined || b === undefined || c === undefined) continue
        if (reagentComboMatches(spec, solvent, a, b, c)) {
          return { r1: a, r2: b, r3: c }
        }
      }
    }
  }
  return undefined
}

function diagnoseAlchemyBail(
  this: void,
  spec: MasterWritSpec,
  solvent: { bag: number; slot: number }
): string {
  const carried = findCarriedReagents()
  const n = carried.length
  let tried = 0
  let itemIdHits = 0
  let traitHits = 0
  let bothHits = 0
  let samples = ""
  let sampleCount = 0
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      for (let k = j + 1; k < n; k++) {
        const a = carried[i]
        const b = carried[j]
        const c = carried[k]
        if (a === undefined || b === undefined || c === undefined) continue
        const [link] = GetAlchemyResultingItemLink(
          solvent.bag,
          solvent.slot,
          a.bag,
          a.slot,
          b.bag,
          b.slot,
          c.bag,
          c.slot,
          LINK_STYLE_DEFAULT
        )
        const parsed = parseAlchemyResultLink(link)
        if (parsed === undefined) continue
        tried++
        if (sampleCount < 3) {
          samples = `${samples}${parsed.itemId}/${parsed.encodedTraits} `
          sampleCount++
        }
        const idHit = parsed.itemId === spec.itemId
        const traitHit = parsed.encodedTraits === spec.encodedAlchemyTraits
        if (idHit) itemIdHits++
        if (traitHit) traitHits++
        if (idHit && traitHit) bothHits++
      }
    }
  }
  return (
    `wantId=${spec.itemId} wantTraits=${spec.encodedAlchemyTraits} reagents=${n} tried3=${tried} ` +
    `itemIdHits=${itemIdHits} traitHits=${traitHits} bothHits=${bothHits} samples=[${samples}]`
  )
}

function buildMasterAlchemyCraftRequest(
  this: void,
  spec: MasterWritSpec,
  needed: number,
  questIndex: number,
  conditionIndex: number
): WritCraftRequest | undefined {
  if (needed <= 0) {
    recordMasterConsumableTrace(newConsumableTrace(spec, needed, "resolve", "nothing-needed"))
    return undefined
  }

  const solvent = findSolvent(spec.itemId, spec.materialItemId)
  if (solvent === undefined) {
    const t = newConsumableTrace(spec, needed, "resolve", "no-solvent")
    t.solventFound = false
    recordMasterConsumableTrace(t)
    return undefined
  }

  const combo = findMasterAlchemyReagents(spec, solvent)
  if (combo === undefined) {
    const t = newConsumableTrace(spec, needed, "resolve", "no-reagent-combo")
    t.solventFound = true
    t.diag = diagnoseAlchemyBail(spec, solvent)
    recordMasterConsumableTrace(t)
    return undefined
  }

  const reagent1Id = combo.r1.id
  const reagent2Id = combo.r2.id
  const reagent3Id = combo.r3?.id

  const enq = newConsumableTrace(spec, needed, "resolve", "enqueued")
  enq.solventFound = true
  enq.reagent1Id = reagent1Id
  enq.reagent2Id = reagent2Id
  enq.reagent3Id = reagent3Id
  recordMasterConsumableTrace(enq)

  return {
    craftType: CRAFTING_TYPE_ALCHEMY,
    questIndex,
    conditionIndex,
    execute: function (this: void): undefined {
      if (GetCraftingInteractionType() === 0) {
        const t = newConsumableTrace(spec, needed, "execute", "not-in-interaction")
        t.interactionType = 0
        recordMasterConsumableTrace(t)
        return
      }

      const s = findSolvent(spec.itemId, spec.materialItemId)
      const r1 = findItemInBags(reagent1Id)
      const r2 = findItemInBags(reagent2Id)
      const r3 = reagent3Id === undefined ? undefined : findItemInBags(reagent3Id)
      if (
        s === undefined ||
        r1 === undefined ||
        r2 === undefined ||
        (reagent3Id !== undefined && r3 === undefined)
      ) {
        const t = newConsumableTrace(spec, needed, "execute", "missing-ingredients")
        t.interactionType = GetCraftingInteractionType()
        t.solventFound = s !== undefined
        t.reagent1Id = reagent1Id
        t.reagent2Id = reagent2Id
        t.reagent3Id = reagent3Id
        recordMasterConsumableTrace(t)
        d(`[${ADDON_NAME}] Missing reagents/solvent for master alchemy writ`)
        clearWritCraftQueue()
        return
      }

      const r3Bag = r3?.bag
      const r3Slot = r3?.slot
      const [maxIter] = GetMaxIterationsPossibleForAlchemyItem(
        s.bag,
        s.slot,
        r1.bag,
        r1.slot,
        r2.bag,
        r2.slot,
        r3Bag,
        r3Slot
      )
      const yieldPerIter = GetAlchemyResultQuantity(s.bag, s.slot, 1)
      const iterations = computeCraftIterations(needed, yieldPerIter, maxIter)
      if (iterations < 1) {
        const t = newConsumableTrace(spec, needed, "execute", "ingredient-bounded")
        t.interactionType = GetCraftingInteractionType()
        t.maxIter = maxIter
        t.yieldPerIter = yieldPerIter
        t.iterations = iterations
        recordMasterConsumableTrace(t)
        d(`[${ADDON_NAME}] Cannot craft master alchemy writ (ingredient-bounded)`)
        clearWritCraftQueue()
        return
      }

      const done = newConsumableTrace(spec, needed, "execute", "crafted")
      done.interactionType = GetCraftingInteractionType()
      done.maxIter = maxIter
      done.yieldPerIter = yieldPerIter
      done.iterations = iterations
      recordMasterConsumableTrace(done)
      CraftAlchemyItem(s.bag, s.slot, r1.bag, r1.slot, r2.bag, r2.slot, r3Bag, r3Slot, iterations)
    },
  }
}

function buildAlchemyCraftRequest(
  this: void,
  requiredItemId: number,
  materialItemId: number,
  needed: number,
  questIndex: number,
  conditionIndex: number
): WritCraftRequest | undefined {
  if (needed <= 0) return undefined

  const effectId = GetTraitIdFromBasePotion(requiredItemId)

  let bestR1 = -1
  let bestR2 = -1
  for (const [r1, r2] of solveReagentPairs(effectId)) {
    if (findItemInBags(r1) !== undefined && findItemInBags(r2) !== undefined) {
      bestR1 = r1
      bestR2 = r2
      break
    }
  }

  if (bestR1 === -1) return undefined

  const solvent = findSolvent(requiredItemId, materialItemId)
  if (solvent === undefined) return undefined

  const solventBag = solvent.bag
  const solventSlot = solvent.slot
  const reagent1Id = bestR1
  const reagent2Id = bestR2

  return {
    craftType: CRAFTING_TYPE_ALCHEMY,
    questIndex,
    conditionIndex,
    execute: function (this: void): undefined {
      if (GetCraftingInteractionType() === 0) return

      const r1 = findItemInBags(reagent1Id)
      const r2 = findItemInBags(reagent2Id)
      if (r1 === undefined || r2 === undefined) {
        d(`[${ADDON_NAME}] Missing reagents for alchemy writ`)
        clearWritCraftQueue()
        return
      }

      const [maxIter] = GetMaxIterationsPossibleForAlchemyItem(
        solventBag,
        solventSlot,
        r1.bag,
        r1.slot,
        r2.bag,
        r2.slot,
        undefined,
        undefined
      )
      const yieldPerIter = GetAlchemyResultQuantity(solventBag, solventSlot, 1)
      const iterations = computeCraftIterations(needed, yieldPerIter, maxIter)
      if (iterations < 1) {
        d(`[${ADDON_NAME}] Missing reagents for alchemy writ`)
        clearWritCraftQueue()
        return
      }

      CraftAlchemyItem(
        solventBag,
        solventSlot,
        r1.bag,
        r1.slot,
        r2.bag,
        r2.slot,
        undefined,
        undefined,
        iterations
      )
    },
  }
}
