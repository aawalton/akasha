import { expect, test } from "bun:test"
import type { CompiledOrderedRule } from "akasha/temper/items/rules/core/modules/inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"
import { resolveDestination } from "akasha/temper/items/rules/eval/modules/destination-resolve/destination-resolve.module.code.ts"
import type { ItemFacts } from "akasha/temper/items/rules/eval/modules/item-facts/item-facts.module.code.ts"
import { ctxWith } from "akasha/temper/items/rules/eval/test-fixtures/check-container-fixtures/check-container-fixtures.test-fixture.code.ts"

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

test("a chain whose fill tier names a character resolves to the chest after it", () => {
  const rule: CompiledOrderedRule = {
    categoryId: "consumables",
    action: "stock",
    destinationChain: [
      { destination: "character:8796093022338107", targetQuantity: 20 },
      { destination: "house-storage:4675" },
    ],
  }

  expect(resolveDestination(rule, FACTS, ctxWith({}))).toEqual({
    kind: "resolved",
    concrete: "house-storage:4675",
    targetQuantity: 20,
  })
})

test("a chain with no fill tier leaves the flat destination to answer", () => {
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

const STYLE_PAGE_FACTS: ItemFacts = {
  itemId: 198961,
  itemName: "Bound Style Page: Nobility in Decay Bow",
  itemLink: "|H1:item:198961:124:1:0:0:0:0:0:0:0:0:0:0:0:1:0:0:1:0:0:0|h|h",
  itemType: 34,
  specializedItemType: 82,
  known: false,
}

test("an item with no item key that its holder can learn is used by its holder", () => {
  const ctx = ctxWith({
    getCharacterPriority: () => ["one", "two"],
    getCurrentCharacter: () => "two",
  })

  expect(resolveDestination(USE_RULE, STYLE_PAGE_FACTS, ctx)).toEqual({
    kind: "resolved",
    concrete: "character:two",
  })
})

test("an item with no item key its holder already knows goes to no character", () => {
  const ctx = ctxWith({ getCurrentCharacter: () => "two" })

  expect(resolveDestination(USE_RULE, { ...STYLE_PAGE_FACTS, known: true }, ctx)).toEqual({
    kind: "no-eligible-target",
    detail: "the holder already knows item",
  })
})

test("an item with no item key and an unknown holder is indeterminate", () => {
  expect(resolveDestination(USE_RULE, STYLE_PAGE_FACTS, ctxWith({}))).toEqual({
    kind: "indeterminate",
    detail: "the character holding item is unknown",
  })
})

test("an item with neither an item key nor a known fact is indeterminate", () => {
  const ctx = ctxWith({ getCurrentCharacter: () => "two" })
  const unstated: ItemFacts = {
    itemId: STYLE_PAGE_FACTS.itemId,
    itemName: STYLE_PAGE_FACTS.itemName,
    itemLink: STYLE_PAGE_FACTS.itemLink,
  }

  expect(resolveDestination(USE_RULE, unstated, ctx)).toEqual({
    kind: "indeterminate",
    detail: "character:by-priority requires facts.itemKey",
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
