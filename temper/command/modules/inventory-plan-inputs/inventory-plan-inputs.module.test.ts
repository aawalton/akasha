import { expect, test } from "bun:test"
import type { CharacterKnowledge } from "akasha/temper/command/modules/inventory-characters-reading/inventory-characters-reading.module.code.ts"
import type { CompiledInventoryConfig } from "akasha/temper/command/modules/inventory-config-reading/inventory-config-reading.module.code.ts"
import { buildMatcherContext } from "akasha/temper/command/modules/inventory-plan-inputs/inventory-plan-inputs.module.code.ts"
import type { InventoryDatabase } from "akasha/temper/items/core/modules/inventory-types/inventory-types.module.code.ts"
import type { CompiledOrderedRule } from "akasha/temper/items/rules/core/modules/inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"
import { resolveDestination } from "akasha/temper/items/rules/eval/modules/destination-resolve/destination-resolve.module.code.ts"
import type { ItemFacts } from "akasha/temper/items/rules/eval/modules/item-facts/item-facts.module.code.ts"
import { buildWebEvalEnv } from "akasha/temper/items/rules/matcher/modules/web-eval-env/web-eval-env.module.code.ts"

const LEGERDEMAIN_ESO_LINE_ID = 111

const LEGERDEMAIN_MAX_RANK = 20

const CHARACTER = "c1"

function knowing(rank: number): ReadonlyMap<string, CharacterKnowledge> {
  return new Map([
    [
      CHARACTER,
      {
        id: CHARACTER,
        name: "Emberkin",
        recipeResultItemIds: new Set<number>(),
        motifChaptersByStyle: new Map<number, ReadonlySet<number>>(),
        motifKnowledgeByStyle: new Map<number, ReadonlySet<number>>(),
        unlockedScriptIds: new Set<number>(),
        skillLineRanksByEsoLineId: new Map([[LEGERDEMAIN_ESO_LINE_ID, rank]]),
        researchedTraitsByCraftingType: new Map<number, ReadonlyMap<string, boolean>>(),
        curseState: "vampire",
        morphCompletion: undefined,
      },
    ],
  ])
}

const CONFIG: CompiledInventoryConfig = {
  rules: [],
  orderedRules: [],
  itemRules: [],
  wantedConsumables: {},
  wantedEquipment: [],
  wantedCompanionEquipment: [],
  characterPriority: [CHARACTER],
}

const DB: InventoryDatabase = {
  locations: {},
  meta: { displayName: "@aawalton", worldName: "NA Megaserver", lastFullScan: 0 },
}

const GATED_STOCK_RULE: CompiledOrderedRule = {
  id: "scrolls-stock",
  categoryId: "scrolls",
  action: "stock",
  destinationChain: [
    {
      destination: "character:by-priority",
      targetQuantity: 10,
      charEligibility: {
        requiredSkillLines: { skillLineIds: ["world-legerdemain"], mode: "any-not-maxed" },
      },
    },
    { destination: "bank" },
  ],
}

const FACTS: ItemFacts = {
  itemId: 71779,
  itemName: "Counterfeit Pardon Edict",
  itemLink: "",
}

test("a stock chain gated on a skill line resolves rather than going indeterminate", () => {
  const env = buildWebEvalEnv(buildMatcherContext(CONFIG, knowing(5), DB))

  expect(resolveDestination(GATED_STOCK_RULE, FACTS, { env })).toEqual({
    kind: "resolved",
    concrete: "bank",
    targetQuantity: 10,
  })
})

test("a skill line every character has maxed fills none of them and the surplus still lands", () => {
  const env = buildWebEvalEnv(buildMatcherContext(CONFIG, knowing(LEGERDEMAIN_MAX_RANK), DB))

  expect(resolveDestination(GATED_STOCK_RULE, FACTS, { env })).toEqual({
    kind: "resolved",
    concrete: "bank",
    targetQuantity: 0,
  })
})

test("the curse state a character captured reaches the rules a plan runs", () => {
  const env = buildWebEvalEnv(buildMatcherContext(CONFIG, knowing(5), DB))

  expect(env.getCharacterCurseState(CHARACTER)).toBe("vampire")
})
