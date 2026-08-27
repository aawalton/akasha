import { describe, expect, test } from "bun:test"
import type { CompiledOrderedRule } from "@temper/game-items-rules-core/inventory-rule-compiler-types"
import type { EvalContext, EvalEnv } from "./eval-env"
import { evaluateRule, walkRules } from "./evaluator"
import type { ItemFacts } from "./item-facts"

const stubEnv: EvalEnv = {
  isKnownByCharacter: () => "unknown",
  isKnownByAnyCharacter: () => "unknown",
  isTraitResearched: () => "unknown",
  isCraftingRankBelowCap: () => "unknown",
  matchesWantedEquipment: () => "unknown",
  matchesWantedCompanionEquipment: () => "unknown",
  isCompanionWornSlotFilled: () => "unknown",
  findCharacterForWantedEquipment: () => "unknown",
  findCompanionForWantedEquipment: () => "unknown",
  getConsumableStock: () => "unknown",
  getConsumableWanters: () => "unknown",
  getBankStock: () => "unknown",
  getCooldownGroup: () => "unknown",
  isCooldownExpired: () => "unknown",
  getTransmuteCrystalAmount: () => "unknown",
  getTransmuteCrystalCap: () => "unknown",
  getKnownScripts: () => "unknown",
  getTotalScriptCount: () => "unknown",
  getCharacterPriority: () => "unknown",
  getCurrentCharacter: () => "unknown",
  getAllCharacters: () => "unknown",
}

const stubCtx: EvalContext = { env: stubEnv }

const baseFacts: ItemFacts = {
  itemId: 100,
  itemName: "Sample Item",
  itemLink: "|H1:item:100:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
  categoryNodeIds: ["food-recipes", "recipes", "knowledge", "all"],
}

const allRule: CompiledOrderedRule = {
  categoryId: "all",
  action: "nothing",
}

describe("evaluateRule", () => {
  test("matches when rule.categoryId is in ancestor chain and rule has no conditions", () => {
    const result = evaluateRule({ categoryId: "knowledge", action: "sell" }, 0, baseFacts, stubCtx)
    expect(result.verdict.kind).toBe("matched")
    expect(result.action).toBe("sell")
  })

  test("rejects when rule.categoryId is NOT in ancestor chain", () => {
    const result = evaluateRule({ categoryId: "weapons", action: "sell" }, 0, baseFacts, stubCtx)
    expect(result.verdict.kind).toBe("rejected")
    if (result.verdict.kind === "rejected") {
      expect(result.verdict.reason.kind).toBe("category-mismatch")
    }
  })

  test("indeterminate when item lacks categoryNodeIds", () => {
    const result = evaluateRule(
      { categoryId: "knowledge", action: "sell" },
      0,
      { ...baseFacts, categoryNodeIds: undefined },
      stubCtx
    )
    expect(result.verdict.kind).toBe("indeterminate")
    if (result.verdict.kind === "indeterminate") {
      expect(result.verdict.reason.kind).toBe("category-unknown")
    }
  })

  test("indeterminate when destination is character:by-priority and env priority is unknown", () => {
    const result = evaluateRule(
      { categoryId: "knowledge", action: "use", destination: "character:by-priority" },
      0,
      baseFacts,
      stubCtx
    )
    expect(result.verdict.kind).toBe("indeterminate")
    if (result.verdict.kind === "indeterminate") {
      expect(result.verdict.reason.kind).toBe("destination-unknown")
    }
  })

  test("rejects fence-launder on container with container-skip reason", () => {
    const containerFacts: ItemFacts = { ...baseFacts, isContainer: true }
    const result = evaluateRule(
      { categoryId: "knowledge", action: "fence-launder" },
      0,
      containerFacts,
      stubCtx
    )
    expect(result.verdict.kind).toBe("rejected")
    if (result.verdict.kind === "rejected") {
      expect(result.verdict.reason.kind).toBe("container-skip")
    }
  })

  test("rejects sell on stolen container with container-skip reason", () => {
    const stolenContainer: ItemFacts = { ...baseFacts, isContainer: true, isStolen: true }
    const result = evaluateRule(
      { categoryId: "knowledge", action: "sell" },
      0,
      stolenContainer,
      stubCtx
    )
    expect(result.verdict.kind).toBe("rejected")
    if (result.verdict.kind === "rejected") {
      expect(result.verdict.reason.kind).toBe("container-skip")
    }
  })

  test("non-container fence-sell passes platform block", () => {
    const result = evaluateRule(
      { categoryId: "knowledge", action: "fence-sell" },
      0,
      baseFacts,
      stubCtx
    )
    expect(result.verdict.kind).toBe("matched")
  })

  test("matches with concrete destination passed through", () => {
    const result = evaluateRule(
      { categoryId: "knowledge", action: "move-to", destination: "bank" },
      0,
      baseFacts,
      stubCtx
    )
    expect(result.verdict.kind).toBe("matched")
    expect(result.resolvedDestination).toBe("bank")
  })
})

describe("walkRules", () => {
  test("empty rule list yields implicit-terminal Keep", () => {
    const trace = walkRules([], baseFacts, stubCtx)
    expect(trace.perRule).toHaveLength(0)
    expect(trace.outcome.kind).toBe("implicit-terminal")
    if (trace.outcome.kind === "implicit-terminal") {
      expect(trace.outcome.label).toBe("Keep")
    }
  })

  test("first deterministic match wins; later rules still in trace", () => {
    const trace = walkRules(
      [
        { categoryId: "weapons", action: "sell" },
        { categoryId: "knowledge", action: "sell" },
        allRule,
      ],
      baseFacts,
      stubCtx
    )
    expect(trace.perRule).toHaveLength(3)
    expect(trace.outcome.kind).toBe("matched")
    if (trace.outcome.kind === "matched") {
      expect(trace.outcome.rule.index).toBe(1)
      expect(trace.outcome.action).toBe("sell")
      expect(trace.outcome.label).toBe("Sell")
    }
  })

  test("indeterminate rule before deterministic match yields indeterminate outcome with provisional match", () => {
    const trace = walkRules(
      [
        { categoryId: "knowledge", action: "use", destination: "character:by-priority" },
        { categoryId: "knowledge", action: "sell" },
      ],
      baseFacts,
      stubCtx
    )
    expect(trace.outcome.kind).toBe("indeterminate")
    if (trace.outcome.kind === "indeterminate") {
      expect(trace.outcome.indeterminateRules).toHaveLength(1)
      expect(trace.outcome.indeterminateRules[0]?.index).toBe(0)
      expect(trace.outcome.provisionalMatch?.rule.index).toBe(1)
      expect(trace.outcome.provisionalMatch?.action).toBe("sell")
    }
  })

  test("all rules rejected with no indeterminate yields implicit-terminal", () => {
    const trace = walkRules(
      [
        { categoryId: "weapons", action: "sell" },
        { categoryId: "armor", action: "deconstruct" },
      ],
      baseFacts,
      stubCtx
    )
    expect(trace.outcome.kind).toBe("implicit-terminal")
  })

  test("explicit implicit-terminal in input yields matched outcome (action=nothing)", () => {
    const trace = walkRules([allRule], baseFacts, stubCtx)
    expect(trace.outcome.kind).toBe("matched")
    if (trace.outcome.kind === "matched") {
      expect(trace.outcome.action).toBe("nothing")
      expect(trace.outcome.label).toBe("Keep")
    }
  })
})
