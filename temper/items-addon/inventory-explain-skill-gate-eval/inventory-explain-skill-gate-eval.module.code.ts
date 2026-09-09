import type { CanLevelMorphsCondition } from "@akasha/temper-items-rules-core/can-level-morphs-filter-types"
import {
  composeCharEligibilityPredicate,
  type EligibilityResolvers,
} from "@akasha/temper-items-rules-core/eligibility-predicate-composer"
import type { RequiredCurseStateCondition } from "@akasha/temper-items-rules-core/required-curse-state-filter-types"
import type { RequiredSkillLinesCondition } from "@akasha/temper-items-rules-core/required-skill-lines-filter-types"
import { characterId } from "@akasha/temper-items-rules-core/use-destination-types"
import { buildCompiledCharacterPriority } from "../inventory-character-priority/inventory-character-priority.module.code.ts"
import { buildGetCharacterCurseState } from "../inventory-curse-state/inventory-curse-state.module.code.ts"
import { getCompiledConfig } from "../inventory-rules-core/inventory-rules-core.module.code.ts"
import { findMatchedRule } from "../inventory-rules-eval/inventory-rules-eval.module.code.ts"
import { resolveFlatStockByPriority } from "../inventory-rules-eval-allocation/inventory-rules-eval-allocation.module.code.ts"
import type {
  SkillGateCharEval,
  SkillGateEval,
  SkillGateLineEval,
  SkillGateRealDispatch,
} from "../inventory-skill-gate-eval-types/inventory-skill-gate-eval-types.module.code.ts"
import { buildGetCharacterSkillLineRanks } from "../inventory-skill-line-ranks/inventory-skill-line-ranks.module.code.ts"
import { canCharacterLevelMorphs } from "../inventory-skill-morphs-progress/inventory-skill-morphs-progress.module.code.ts"
import { getTemperCharactersData } from "../inventory-temper-characters-data/inventory-temper-characters-data.module.code.ts"

interface GatedRuleView {
  action?: string
  destination?: string
  targetQuantity?: number
  requiredSkillLines?: RequiredSkillLinesCondition
  requiredCurseState?: RequiredCurseStateCondition
  canLevelMorphs?: CanLevelMorphsCondition
}

export function buildSkillGateEval(
  matchedRuleIndex: number,
  timestamp: number,
  slot?: { bagId: number; slotIndex: number; itemId: number }
): SkillGateEval | undefined {
  const compiled = getCompiledConfig()
  if (!compiled) return undefined
  const rule: GatedRuleView | undefined = compiled.orderedRules[matchedRuleIndex]
  if (rule === undefined) return undefined
  if (rule.action !== "stock" || rule.destination !== "character:by-priority") return undefined
  const cond = rule.requiredSkillLines
  if (cond === undefined || cond.skillLineIds.length === 0) return undefined

  const characters = getTemperCharactersData()
  const tcCharCount = characters === undefined ? 0 : Object.keys(characters).length

  const resolve = buildGetCharacterSkillLineRanks()
  const resolvers: EligibilityResolvers = {
    getCharacterSkillLineRanks: resolve,
    getCharacterCurseState: buildGetCharacterCurseState(),
    getCharacterCanLevelMorphs: canCharacterLevelMorphs,
  }
  const predicate = composeCharEligibilityPredicate(rule, resolvers)
  const currentCharId = tostring(GetCurrentCharacterId())

  const evals: SkillGateCharEval[] = []
  let firstEligible: string | undefined
  const priority = buildCompiledCharacterPriority(characterId(currentCharId))
  for (const rawId of priority) {
    const charId = tostring(rawId)
    const lines: SkillGateLineEval[] = []
    for (const lineId of cond.skillLineIds) {
      const ranks = resolve(charId, lineId)
      lines.push({
        skillLineId: lineId,
        resolved: ranks === undefined ? "undef" : `${ranks.currentRank}/${ranks.maxRank}`,
      })
    }
    const eligible = predicate(characterId(charId))
    if (eligible && firstEligible === undefined) firstEligible = charId
    evals.push({ charId, isCurrent: charId === currentCharId, lines, eligible })
  }

  const skillLineIds: string[] = []
  for (const id of cond.skillLineIds) {
    skillLineIds.push(id)
  }

  let realDispatch: SkillGateRealDispatch | undefined
  if (slot !== undefined) {
    const [stackCount] = GetSlotStackSize(slot.bagId, slot.slotIndex)
    const resolved = resolveFlatStockByPriority(rule)
    const currentCharEligible = predicate(characterId(currentCharId))
    const matched = findMatchedRule(slot.bagId, slot.slotIndex)
    realDispatch = {
      bagId: slot.bagId,
      slotIndex: slot.slotIndex,
      stackCount,
      currentCharEligible,
      resolvedTargetQuantity: resolved.targetQuantity,
      resolvedDestination: resolved.destination,
      findMatched: matched !== undefined,
      findMatchedAction: matched?.action,
      findMatchedDestination: matched?.destination,
      findMatchedRuleIndex: matched?.ruleIndex,
    }
  }

  return {
    schemaVersion: 1,
    timestamp,
    ruleIndex: matchedRuleIndex,
    mode: cond.mode,
    skillLineIds,
    currentCharId,
    tcDataPresent: characters !== undefined,
    tcCharCount,
    evals,
    firstEligible,
    realDispatch,
  }
}
