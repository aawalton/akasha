import type { CompanionArmorSlotId } from "../companion-armor-slots/companion-armor-slots.module.code.ts"
import { companionArmorSlots } from "../companion-armor-slots/companion-armor-slots.module.code.ts"
import {
  countEmptyTraitSlots,
  setNextEmptyTrait,
} from "../companion-equipment-slots/companion-equipment-slots.module.code.ts"
import type { CompanionJewelrySlotId } from "../companion-jewelry-slots/companion-jewelry-slots.module.code.ts"
import { companionJewelrySlots } from "../companion-jewelry-slots/companion-jewelry-slots.module.code.ts"
import type { CompanionTraitId } from "../companion-traits/companion-traits.module.code.ts"
import type { CompanionState } from "../companion-types/companion-types.module.code.ts"
import type { CompanionWeaponSlotId } from "../companion-weapon-slots/companion-weapon-slots.module.code.ts"
import { companionWeaponSlots } from "../companion-weapon-slots/companion-weapon-slots.module.code.ts"

const GOLD_SLOT_IDS = new Set<CompanionJewelrySlotId>(["ring-1", "ring-2"])

interface TraitOptimizeResult {
  state: CompanionState
  actions: readonly { type: "select-traits"; slotKey: string; traitId: CompanionTraitId }[]
  value: number
}

function getIrTraitIds(validTraitIds: readonly CompanionTraitId[]): readonly CompanionTraitId[] {
  const ir: CompanionTraitId[] = []
  if (validTraitIds.includes("quickened")) ir.push("quickened")

  if (validTraitIds.includes("focused")) ir.push("focused")
  return ir
}

function fillSlots(
  state: CompanionState,
  traitId: CompanionTraitId,
  count: number
): { state: CompanionState; actions: TraitOptimizeResult["actions"] } {
  let current = state
  const newActions: { type: "select-traits"; slotKey: string; traitId: CompanionTraitId }[] = []
  for (let i = 0; i < count; i++) {
    const { slotKey, state: next } = setNextEmptyTrait(current, traitId)
    newActions.push({ type: "select-traits", slotKey, traitId })
    current = next
  }
  return { state: current, actions: newActions }
}

function greedyFillLinear(
  state: CompanionState,
  linearTraits: readonly CompanionTraitId[],
  remaining: number,
  evaluateFn: (state: CompanionState) => number
): { state: CompanionState; value: number; actions: TraitOptimizeResult["actions"] } {
  let current = state
  let lastBestScore = -Infinity
  const newActions: { type: "select-traits"; slotKey: string; traitId: CompanionTraitId }[] = []

  for (let i = 0; i < remaining; i++) {
    let bestTraitId: CompanionTraitId | null = null
    let bestScore = -Infinity

    for (const traitId of linearTraits) {
      const { state: candidate } = setNextEmptyTrait(current, traitId)
      const score = evaluateFn(candidate)
      if (score > bestScore) {
        bestScore = score
        bestTraitId = traitId
      }
    }

    if (bestTraitId == null) break

    const { slotKey, state: next } = setNextEmptyTrait(current, bestTraitId)
    newActions.push({ type: "select-traits", slotKey, traitId: bestTraitId })
    current = next
    lastBestScore = bestScore
  }

  return { state: current, value: lastBestScore, actions: newActions }
}

function* irCountTuples(
  irTraits: readonly CompanionTraitId[],
  maxTotal: number
): Generator<number[]> {
  const counts = new Array<number>(irTraits.length).fill(0)

  function* enumerate(index: number, remaining: number): Generator<number[]> {
    if (index === irTraits.length) {
      yield counts
      return
    }
    for (let c = 0; c <= remaining; c++) {
      counts[index] = c
      yield* enumerate(index + 1, remaining - c)
    }
  }

  yield* enumerate(0, maxTotal)
}

function swapGoldSlots(
  state: CompanionState,
  evaluateFn: (state: CompanionState) => number
): { state: CompanionState; value: number } {
  type JewelrySlotRef = { category: "jewelry"; slotId: CompanionJewelrySlotId }
  type SlotRef =
    | { category: "armor"; slotId: CompanionArmorSlotId }
    | JewelrySlotRef
    | { category: "weapon"; slotId: CompanionWeaponSlotId }

  const goldSlots: { ref: JewelrySlotRef; trait: CompanionTraitId }[] = []
  const nonGoldSlots: { ref: SlotRef; trait: CompanionTraitId }[] = []

  for (const slotId of companionJewelrySlots.ids) {
    const slot = state.equipment.jewelry[slotId]
    if (slot.itemType !== "jewelry" || slot.data.trait === "no-trait") continue
    const entry = { ref: { category: "jewelry" as const, slotId }, trait: slot.data.trait }
    if (GOLD_SLOT_IDS.has(slotId)) goldSlots.push(entry)
    else nonGoldSlots.push(entry)
  }
  for (const slotId of companionArmorSlots.ids) {
    const slot = state.equipment.armor[slotId]
    if (slot.itemType !== "armor" || slot.data.trait === "no-trait") continue
    nonGoldSlots.push({ ref: { category: "armor", slotId }, trait: slot.data.trait })
  }
  for (const slotId of companionWeaponSlots.ids) {
    const slot = state.equipment.weapons[slotId]
    if (slot.itemType !== "weapon" || slot.data.trait === "no-trait") continue
    nonGoldSlots.push({ ref: { category: "weapon", slotId }, trait: slot.data.trait })
  }

  if (goldSlots.length === 0 || nonGoldSlots.length === 0) {
    return { state, value: evaluateFn(state) }
  }

  let current = state
  let currentValue = evaluateFn(current)
  let improved = true

  while (improved) {
    improved = false
    for (const gold of goldSlots) {
      for (const other of nonGoldSlots) {
        if (gold.trait === other.trait) continue

        let swapped = current
        const goldSlot = swapped.equipment.jewelry[gold.ref.slotId]
        if (goldSlot.itemType !== "jewelry") continue
        const newJewelry = {
          ...swapped.equipment.jewelry,
          [gold.ref.slotId]: { ...goldSlot, data: { ...goldSlot.data, trait: other.trait } },
        }

        let newArmor = swapped.equipment.armor
        let newWeapons = swapped.equipment.weapons
        if (other.ref.category === "armor") {
          const otherSlot = swapped.equipment.armor[other.ref.slotId]
          if (otherSlot.itemType !== "armor") continue
          newArmor = {
            ...newArmor,
            [other.ref.slotId]: { ...otherSlot, data: { ...otherSlot.data, trait: gold.trait } },
          }
        } else if (other.ref.category === "jewelry") {
          const otherJewelrySlotId = other.ref.slotId
          newJewelry[otherJewelrySlotId] = (() => {
            const otherSlot = swapped.equipment.jewelry[otherJewelrySlotId]
            if (otherSlot.itemType !== "jewelry") return otherSlot
            return { ...otherSlot, data: { ...otherSlot.data, trait: gold.trait } }
          })()
        } else {
          const otherSlot = swapped.equipment.weapons[other.ref.slotId]
          if (otherSlot.itemType !== "weapon") continue
          newWeapons = {
            ...newWeapons,
            [other.ref.slotId]: { ...otherSlot, data: { ...otherSlot.data, trait: gold.trait } },
          }
        }

        swapped = {
          ...swapped,
          equipment: {
            ...swapped.equipment,
            jewelry: newJewelry,
            armor: newArmor,
            weapons: newWeapons,
          },
        }

        const swapValue = evaluateFn(swapped)
        if (swapValue > currentValue) {
          current = swapped
          currentValue = swapValue
          const oldGoldTrait = gold.trait
          gold.trait = other.trait
          other.trait = oldGoldTrait
          improved = true
        }
      }
    }
  }

  return { state: current, value: currentValue }
}

export function optimizeTraits(
  state: CompanionState,
  validTraitIds: readonly CompanionTraitId[],
  evaluateFn: (state: CompanionState) => number
): TraitOptimizeResult {
  const totalSlots = countEmptyTraitSlots(state)

  if (totalSlots === 0) {
    return { state, actions: [], value: evaluateFn(state) }
  }

  const irTraits = getIrTraitIds(validTraitIds)
  const irSet = new Set(irTraits)
  const linearTraits = validTraitIds.filter((id) => !irSet.has(id))

  let bestScore = -Infinity
  let bestState = state
  let bestActions: TraitOptimizeResult["actions"] = []

  for (const counts of irCountTuples(irTraits, totalSlots)) {
    const actions: { type: "select-traits"; slotKey: string; traitId: CompanionTraitId }[] = []
    let irTotal = 0

    let current = state
    for (const [i, traitId] of irTraits.entries()) {
      const count = counts[i] ?? 0
      const filled = fillSlots(current, traitId, count)
      current = filled.state
      actions.push(...filled.actions)
      irTotal += count
    }

    const remaining = totalSlots - irTotal
    let score: number
    if (remaining > 0 && linearTraits.length > 0) {
      const result = greedyFillLinear(current, linearTraits, remaining, evaluateFn)
      current = result.state
      score = result.value
      actions.push(...result.actions)
    } else {
      score = evaluateFn(current)
    }
    if (score > bestScore) {
      bestScore = score
      bestState = current
      bestActions = actions
    }
  }

  const swapResult = swapGoldSlots(bestState, evaluateFn)
  if (swapResult.value > bestScore) {
    return { state: swapResult.state, actions: bestActions, value: swapResult.value }
  }

  return { state: bestState, actions: bestActions, value: bestScore }
}
