import { describe, expect, it } from "bun:test"
import { skillLines } from "@temper/game-characters-skill-lines/skill-lines-data"
import { compileCategoryRuleToOrdered } from "@temper/game-items-rules-core/inventory-rule-compiler"
import {
  ALL_CATEGORIES_ID,
  type CategoryRule,
  IMPLICIT_TERMINAL_RULE_ID,
} from "@temper/game-items-rules-core/inventory-rule-types"
import type { RuleMatcherContext } from "@temper/game-items-rules-core/rule-matcher-context-types"
import fc from "fast-check"
import { computeAllRuleAffectedItems } from "./inventory-rule-matcher"
import { recipeCI } from "./inventory-rule-matcher-property-fixtures"

const KNOWN_LINE = skillLines.list.find((l) => l.esoSkillLineId > 0)
if (KNOWN_LINE === undefined) {
  throw new Error("test fixture: no skill line with esoSkillLineId > 0")
}
const KNOWN_LINE_ID = KNOWN_LINE.id
const KNOWN_LINE_MAX_RANK = KNOWN_LINE.maxRank

const charIdArb: fc.Arbitrary<string> = fc.constantFrom("1001", "1002", "1003", "1004")

function buildContext(
  canLevelMap: ReadonlyMap<string, boolean>,
  passSkillLineMap: ReadonlyMap<string, boolean>
): RuleMatcherContext {
  const charIds = new Set([...canLevelMap.keys(), ...passSkillLineMap.keys()])
  const baseCtx: RuleMatcherContext = {
    wantedEquipment: [],
    wantedCompanionEquipment: [],
    wantedConsumables: new Map(),
    consumableStock: new Map(),
    bankStock: new Map(),
    characterLevels: new Map(),
    knownRecipesByCharacter: new Map(),
    knownMotifsByCharacter: new Map(),
    knownMotifsByStyleIdByCharacter: new Map(),
    knownScriptsByCharacter: new Map(),
    researchedTraitsByCharacter: new Map(),
    characterPriority: [...charIds].sort(),
    craftingLevels: new Map(),
    openCooldowns: new Map(),
    transmuteCrystalCap: undefined,
    transmuteCrystalAmount: undefined,
    getCharacterSkillLineRanks: (charId, skillLineId) => {
      if (skillLineId !== KNOWN_LINE_ID) return undefined
      if (!charIds.has(charId)) return undefined
      const passing = passSkillLineMap.get(charId) ?? false
      return {
        currentRank: passing ? KNOWN_LINE_MAX_RANK : 0,
        maxRank: KNOWN_LINE_MAX_RANK,
      }
    },
  }
  return {
    ...baseCtx,
    getCharacterCanLevelMorphs: (charId: string) => canLevelMap.get(charId) ?? false,
  }
}

function admittedChars(
  result: ReturnType<typeof computeAllRuleAffectedItems>,
  ruleId: string
): Set<string> {
  const bucket = result.ruleMap.get(ruleId) ?? []
  const out = new Set<string>()
  for (const a of bucket) {
    for (const c of a.useAllocation ?? []) out.add(c)
  }
  return out
}

describe("matcher — canLevelMorphs filter (predicate semantics)", () => {
  it("(f) admits exactly the chars whose getCharacterCanLevelMorphs reports true", () => {
    fc.assert(
      fc.property(
        fc.dictionary(charIdArb, fc.boolean(), { minKeys: 1, maxKeys: 4 }),
        (canLevelDict) => {
          const canLevelMap = new Map(Object.entries(canLevelDict))
          const passSkillLineMap = new Map<string, boolean>()
          const ctx = buildContext(canLevelMap, passSkillLineMap)

          const useRule: CategoryRule = {
            id: "use",
            categoryId: ALL_CATEGORIES_ID,
            action: "use",
            destination: "character:by-priority",
            conditions: { canLevelMorphs: { mode: "can-level" } },
            active: true,
          }
          const ci = recipeCI(8)
          const result = computeAllRuleAffectedItems(
            [useRule].map(compileCategoryRuleToOrdered),
            [ci],
            ctx
          )

          const expected = new Set<string>(
            [...canLevelMap.entries()].filter(([, v]) => v).map(([k]) => k)
          )
          const admitted = admittedChars(result, "use")
          for (const id of expected) expect(admitted.has(id)).toBe(true)
          for (const id of admitted) expect(expected.has(id)).toBe(true)

          const terminal = result.ruleMap.get(IMPLICIT_TERMINAL_RULE_ID) ?? []
          expect(terminal.length).toBeGreaterThanOrEqual(0)
        }
      ),
      { numRuns: 40 }
    )
  })
})

describe("matcher — canLevelMorphs ∧ requiredSkillLines composition", () => {
  it("(g) admits exactly the chars passing both predicates", () => {
    fc.assert(
      fc.property(
        fc.dictionary(charIdArb, fc.boolean(), { minKeys: 1, maxKeys: 4 }),
        fc.dictionary(charIdArb, fc.boolean(), { minKeys: 1, maxKeys: 4 }),
        (canLevelDict, passSkillDict) => {
          const canLevelMap = new Map(Object.entries(canLevelDict))
          const passSkillLineMap = new Map(Object.entries(passSkillDict))
          const ctx = buildContext(canLevelMap, passSkillLineMap)

          const useRule: CategoryRule = {
            id: "use",
            categoryId: ALL_CATEGORIES_ID,
            action: "use",
            destination: "character:by-priority",
            conditions: {
              requiredSkillLines: {
                skillLineIds: [KNOWN_LINE_ID],
                mode: "all-maxed",
              },
              canLevelMorphs: { mode: "can-level" },
            },
            active: true,
          }
          const ci = recipeCI(8)
          const result = computeAllRuleAffectedItems(
            [useRule].map(compileCategoryRuleToOrdered),
            [ci],
            ctx
          )

          const allCharIds = new Set([...canLevelMap.keys(), ...passSkillLineMap.keys()])
          const expected = new Set<string>(
            [...allCharIds].filter(
              (id) => (canLevelMap.get(id) ?? false) && (passSkillLineMap.get(id) ?? false)
            )
          )
          const admitted = admittedChars(result, "use")
          for (const id of expected) expect(admitted.has(id)).toBe(true)
          for (const id of admitted) expect(expected.has(id)).toBe(true)
        }
      ),
      { numRuns: 40 }
    )
  })
})
