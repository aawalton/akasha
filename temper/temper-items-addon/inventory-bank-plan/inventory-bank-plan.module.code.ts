import type { CharacterId } from "@akasha/temper-items-rules-core/use-destination-types"
import { resolveCharacterNameById } from "../inventory-character-names/inventory-character-names.module.code.ts"
import { getCompiledConfig } from "../inventory-rules-core/inventory-rules-core.module.code.ts"
import {
  findMatchedRule,
  type MatchedRuleResult,
} from "../inventory-rules-eval/inventory-rules-eval.module.code.ts"
import { isSavedVariablesReady } from "../inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import { addToTally } from "../inventory-tally/inventory-tally.module.code.ts"
export interface BankTransitionSummary {
  totalUnits: number
  characters: Array<{ label: string; count: number }>
}

export function getBankTransitionSummary(bankBag: number): BankTransitionSummary | undefined {
  if (!isSavedVariablesReady()) return undefined
  if (!getCompiledConfig()) return undefined

  if (bankBag !== BAG_BANK && bankBag !== BAG_SUBSCRIBER_BANK) return undefined
  const bags: number[] = IsESOPlusSubscriber() ? [BAG_BANK, BAG_SUBSCRIBER_BANK] : [BAG_BANK]

  const currentCharId = tostring(GetCurrentCharacterId())
  const claims = new Map<CharacterId, Set<string>>()
  const charUnits: Record<string, number> = {}

  for (const bag of bags) {
    const bagSize = GetBagSize(bag)
    for (let slot = 0; slot < bagSize; slot++) {
      const [stackCount] = GetSlotStackSize(bag, slot)
      if (stackCount === 0) continue
      const matched = findMatchedRule(bag, slot, claims)
      if (matched === undefined) continue
      attributeTransition(matched, stackCount, currentCharId, charUnits)
    }
  }

  let totalUnits = 0
  const characters: Array<{ label: string; count: number }> = []
  for (const [charId, count] of Object.entries(charUnits)) {
    if (count <= 0) continue
    totalUnits += count
    characters.push({ label: resolveCharacterNameById(charId) ?? charId, count })
  }
  if (characters.length === 0) return undefined

  table.sort(characters, function (this: void, a, b): boolean {
    return a.count > b.count
  })

  return { totalUnits, characters }
}

function attributeTransition(
  matched: MatchedRuleResult,
  stackCount: number,
  currentCharId: string,
  charUnits: Record<string, number>
): undefined {
  const allocation = matched.useAllocation
  if (allocation !== undefined) {
    if (allocation.currentCharQty > 0)
      addToTally(charUnits, currentCharId, allocation.currentCharQty)
    for (const dep of allocation.otherCharDeposits) {
      addToTally(charUnits, dep.charId, dep.qty)
    }
    return
  }

  const charId = extractCharId(matched.destination)
  if (charId === undefined) return
  addToTally(charUnits, charId, stackCount)
}

function extractCharId(destination: string | undefined): string | undefined {
  if (destination === undefined) return undefined
  if (destination.startsWith("character-worn:")) {
    const id = destination.substring("character-worn:".length)
    return id !== "" ? id : undefined
  }
  if (destination.startsWith("character:")) {
    const id = destination.substring("character:".length)
    return id !== "" ? id : undefined
  }
  return undefined
}
