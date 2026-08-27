import {
  composeCharEligibilityPredicate,
  type EligibilityResolvers,
} from "@temper/game-items-rules-core/eligibility-predicate-composer"
import type { CanLevelMorphsCondition } from "@temper/game-items-rules-core/filters/can-level-morphs-filter-types"
import type { RequiredCurseStateCondition } from "@temper/game-items-rules-core/filters/required-curse-state-filter-types"
import type { RequiredSkillLinesCondition } from "@temper/game-items-rules-core/filters/required-skill-lines-filter-types"
import { CharacterId } from "@temper/game-items-rules-core/use-destination-types"
import { buildCompiledCharacterPriority } from "./character-priority"
import { buildGetCharacterCurseState } from "./curse-state"
import { getCompiledConfig } from "./rules-core"
import { findMatchedRule } from "./rules-eval"
import { resolveFlatStockByPriority } from "./rules-eval-allocation"
import type {
  SkillGateCharEval,
  SkillGateLineEval,
  SkillGateRealDispatch,
  SkillGateWalk,
} from "./skill-gate-walk-types"
import { buildGetCharacterSkillLineRanks } from "./skill-line-ranks"
import { canCharacterLevelMorphs } from "./skill-morphs-progress"
import { getTemperCharactersData } from "./temper-characters-data"

interface GatedRuleView {
  action?: string
  destination?: string
  targetQuantity?: number
  requiredSkillLines?: RequiredSkillLinesCondition
  requiredCurseState?: RequiredCurseStateCondition
  canLevelMorphs?: CanLevelMorphsCondition
}

export function buildSkillGateWalk(
  matchedRuleIndex: number,
  timestamp: number,
  slot?: { bagId: number; slotIndex: number; itemId: number }
): SkillGateWalk | undefined {
  const compiled = getCompiledConfig()
  if (!compiled) return undefined
  const rule: GatedRuleView | undefined = compiled.orderedRules[matchedRuleIndex]
  if (rule === undefined) return undefined
  if (rule.action !== "stock" || rule.destination !== "character:by-priority") return undefined
  const cond = rule.requiredSkillLines
  if (cond === undefined || cond.skillLineIds.length === 0) return undefined

  const characters = getTemperCharactersData()
  let tcCharCount = 0
  if (characters !== undefined) {
    for (const _key in characters) {
      tcCharCount++
    }
  }

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
  const priority = buildCompiledCharacterPriority(CharacterId(currentCharId))
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
    const eligible = predicate(CharacterId(charId))
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
    const currentCharEligible = predicate(CharacterId(currentCharId))
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
