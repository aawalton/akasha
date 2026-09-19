import { expect, test } from "bun:test"
import type { CompiledOrderedRule } from "akasha/temper/items-rules-core/modules/inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"
import { resolveDestination } from "akasha/temper/items-rules-eval/modules/destination-resolve/destination-resolve.module.code.ts"
import type { ItemFacts } from "akasha/temper/items-rules-eval/modules/item-facts/item-facts.module.code.ts"
import { ctxWith } from "akasha/temper/items-rules-eval/test-fixtures/check-container-fixtures/check-container-fixtures.test-fixture.code.ts"

const FACTS: ItemFacts = {
  itemId: 71779,
  itemName: "Counterfeit Pardon Edict",
  itemLink: "|H1:item:71779|h|h",
}

const GATED_CHAIN_RULE: CompiledOrderedRule = {
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

test("a stock chain resolves to the surplus tier and carries the fill tier's target", () => {
  const ctx = ctxWith({
    getCharacterPriority: () => ["one"],
    getCharacterSkillLineRanks: () => ({ currentRank: 3, maxRank: 20 }),
  })

  expect(resolveDestination(GATED_CHAIN_RULE, FACTS, ctx)).toEqual({
    kind: "resolved",
    concrete: "bank",
    targetQuantity: 10,
  })
})

test("a tier no priority character passes stocks none and still names the surplus", () => {
  const ctx = ctxWith({
    getCharacterPriority: () => ["one"],
    getCharacterSkillLineRanks: () => ({ currentRank: 20, maxRank: 20 }),
  })

  expect(resolveDestination(GATED_CHAIN_RULE, FACTS, ctx)).toEqual({
    kind: "resolved",
    concrete: "bank",
    targetQuantity: 0,
  })
})

test("one eligible character among many is enough to stock the fill target", () => {
  const ranks: Record<string, number> = { one: 20, two: 4 }
  const ctx = ctxWith({
    getCharacterPriority: () => ["one", "two"],
    getCharacterSkillLineRanks: (charId) => ({ currentRank: ranks[charId] ?? 0, maxRank: 20 }),
  })

  expect(resolveDestination(GATED_CHAIN_RULE, FACTS, ctx)).toEqual({
    kind: "resolved",
    concrete: "bank",
    targetQuantity: 10,
  })
})

test("a rank the environment cannot answer leaves the chain indeterminate", () => {
  const ctx = ctxWith({ getCharacterPriority: () => ["one"] })

  expect(resolveDestination(GATED_CHAIN_RULE, FACTS, ctx)).toEqual({
    kind: "indeterminate",
    detail: "stock tier eligibility unknown",
  })
})

test("a tier gating nothing stocks its target without asking about any character", () => {
  const rule: CompiledOrderedRule = {
    categoryId: "potions",
    action: "stock",
    destinationChain: [
      { destination: "character:by-priority", targetQuantity: 200 },
      { destination: "bank" },
    ],
  }

  expect(resolveDestination(rule, FACTS, ctxWith({}))).toEqual({
    kind: "resolved",
    concrete: "bank",
    targetQuantity: 200,
  })
})

test("a chain with no by-priority tier leaves the flat destination to answer", () => {
  const rule: CompiledOrderedRule = {
    categoryId: "tools",
    action: "stock",
    destination: "bank",
    destinationChain: [{ destination: "bank" }],
  }

  expect(resolveDestination(rule, FACTS, ctxWith({}))).toEqual({
    kind: "resolved",
    concrete: "bank",
  })
})

const MASTER_MOTIF_FACTS: ItemFacts = {
  itemId: 16428,
  itemName: "Crafting Motif 3: Wood Elf Style",
  itemLink: "|H1:item:16428|h|h",
  itemKey: { kind: "motif", styleId: 3, chapterId: null },
}

const USE_RULE: CompiledOrderedRule = {
  categoryId: "knowledge",
  action: "use",
  destination: "character:by-priority",
}

test("a master motif goes to the eligible character knowing the fewest chapters", () => {
  const chapters: Record<string, number> = { one: 9, two: 2, three: 5 }
  const ctx = ctxWith({
    getCharacterPriority: () => ["one", "two", "three"],
    isKnownByCharacter: () => false,
    getKnownChapterCountForStyle: (charId) => chapters[charId] ?? 0,
  })

  expect(resolveDestination(USE_RULE, MASTER_MOTIF_FACTS, ctx)).toEqual({
    kind: "resolved",
    concrete: "character:two",
  })
})

test("characters tying on known chapters keep the order priority gave them", () => {
  const ctx = ctxWith({
    getCharacterPriority: () => ["one", "two", "three"],
    isKnownByCharacter: (_itemKey, charId) => charId === "one",
    getKnownChapterCountForStyle: () => 0,
  })

  expect(resolveDestination(USE_RULE, MASTER_MOTIF_FACTS, ctx)).toEqual({
    kind: "resolved",
    concrete: "character:two",
  })
})

test("a chapter count the environment cannot answer leaves a master motif indeterminate", () => {
  const ctx = ctxWith({
    getCharacterPriority: () => ["one"],
    isKnownByCharacter: () => false,
  })

  expect(resolveDestination(USE_RULE, MASTER_MOTIF_FACTS, ctx)).toEqual({
    kind: "indeterminate",
    detail: "known chapter count unknown for one",
  })
})

test("a chain whose fill tier is its last tier has no surplus to name", () => {
  const rule: CompiledOrderedRule = {
    categoryId: "potions",
    action: "stock",
    destinationChain: [{ destination: "character:by-priority", targetQuantity: 50 }],
  }

  expect(resolveDestination(rule, FACTS, ctxWith({}))).toEqual({
    kind: "resolved",
    concrete: "",
    targetQuantity: 50,
  })
})
