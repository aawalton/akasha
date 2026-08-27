import { characterPassesCanLevelMorphs } from "./filters/can-level-morphs-filter"
import type { CanLevelMorphsCondition } from "./filters/can-level-morphs-filter-types"
import { characterPassesRequiredCurseState } from "./filters/required-curse-state-filter"
import type { RequiredCurseStateCondition } from "./filters/required-curse-state-filter-types"
import { characterPassesRequiredSkillLines } from "./filters/required-skill-lines-filter"
import type { RequiredSkillLinesCondition } from "./filters/required-skill-lines-filter-types"
import type { RuleMatcherContext } from "./rule-matcher-context-types"
import type { CharacterId } from "./use-destination-types"

export interface CharEligibilityConditions {
  readonly requiredSkillLines?: RequiredSkillLinesCondition
  readonly requiredCurseState?: RequiredCurseStateCondition
  readonly canLevelMorphs?: CanLevelMorphsCondition
}

export interface EligibilityResolvers {
  readonly getCharacterSkillLineRanks: RuleMatcherContext["getCharacterSkillLineRanks"]
  readonly getCharacterCurseState: RuleMatcherContext["getCharacterCurseState"]
  readonly getCharacterCanLevelMorphs: RuleMatcherContext["getCharacterCanLevelMorphs"]
}

export function composeCharEligibilityPredicate(
  conditions: CharEligibilityConditions | undefined,
  resolvers: EligibilityResolvers
): (charId: CharacterId) => boolean {
  if (conditions === undefined) return () => true

  const skillCond = conditions.requiredSkillLines
  const skillActive = skillCond !== undefined && skillCond.skillLineIds.length > 0

  const curseCond = conditions.requiredCurseState
  const curseActive = curseCond !== undefined

  const morphsCond = conditions.canLevelMorphs
  const morphsActive = morphsCond !== undefined

  if (!skillActive && !curseActive && !morphsActive) return () => true

  return (charId: CharacterId) => {
    if (skillActive && skillCond !== undefined) {
      const resolve = resolvers.getCharacterSkillLineRanks
      if (resolve !== undefined && !characterPassesRequiredSkillLines(charId, skillCond, resolve)) {
        return false
      }
    }
    if (curseActive && curseCond !== undefined) {
      const resolve = resolvers.getCharacterCurseState
      if (resolve !== undefined && !characterPassesRequiredCurseState(charId, curseCond, resolve)) {
        return false
      }
    }
    if (morphsActive && morphsCond !== undefined) {
      const resolve = resolvers.getCharacterCanLevelMorphs
      if (resolve !== undefined && !characterPassesCanLevelMorphs(charId, morphsCond, resolve)) {
        return false
      }
    }
    return true
  }
}
