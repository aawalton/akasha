import { describe, expect, test } from "bun:test"
import type { CompiledOrderedRule } from "@temper/game-items-rules-core/inventory-rule-compiler-types"
import type { ItemKey } from "@temper/game-items-rules-core/use-destination-types"
import type { EvalContext, EvalEnv, LookupResult } from "../eval-env"
import type { ItemFacts } from "../item-facts"
import { checkKnowledge } from "./check-knowledge"

const baseEnv: EvalEnv = {
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

function makeCtx(overrides: Partial<EvalEnv>): EvalContext {
  return { env: { ...baseEnv, ...overrides } }
}

const recipeKey: ItemKey = { kind: "recipe", resultItemId: 12345 }

const baseFacts: ItemFacts = {
  itemId: 100,
  itemName: "Sample Recipe",
  itemLink: "|H1:item:100:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
  itemKey: recipeKey,
}

const baseRule: CompiledOrderedRule = {
  categoryId: "all",
  action: "nothing",
}

describe("checkKnowledge", () => {
  test("skip when rule declares neither known nor canUnlock", () => {
    const ctx = makeCtx({ getAllCharacters: () => ["c1", "c2"] })
    const result = checkKnowledge(baseRule, baseFacts, ctx)
    expect(result.kind).toBe("skip")
  })

  describe("known", () => {
    test("pass when known='known' and all chars know it", () => {
      const ctx = makeCtx({
        getAllCharacters: () => ["c1", "c2"],
        isKnownByCharacter: () => true,
      })
      const result = checkKnowledge({ ...baseRule, known: "known" }, baseFacts, ctx)
      expect(result.kind).toBe("pass")
    })

    test("fail when known='known' but one char doesn't know", () => {
      const ctx = makeCtx({
        getAllCharacters: () => ["c1", "c2"],
        isKnownByCharacter: (_key, charId): LookupResult<boolean> => charId === "c1",
      })
      const result = checkKnowledge({ ...baseRule, known: "known" }, baseFacts, ctx)
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("known")
    })

    test("pass when known='not-known' and at least one char doesn't know", () => {
      const ctx = makeCtx({
        getAllCharacters: () => ["c1", "c2"],
        isKnownByCharacter: (_key, charId): LookupResult<boolean> => charId === "c1",
      })
      const result = checkKnowledge({ ...baseRule, known: "not-known" }, baseFacts, ctx)
      expect(result.kind).toBe("pass")
    })

    test("fail when known='not-known' but all chars know", () => {
      const ctx = makeCtx({
        getAllCharacters: () => ["c1", "c2"],
        isKnownByCharacter: () => true,
      })
      const result = checkKnowledge({ ...baseRule, known: "not-known" }, baseFacts, ctx)
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("known")
    })
  })

  describe("canUnlock", () => {
    test("pass when canUnlock='can-unlock' and at least one char doesn't know", () => {
      const ctx = makeCtx({
        getAllCharacters: () => ["c1", "c2"],
        isKnownByCharacter: (_key, charId): LookupResult<boolean> => charId === "c1",
      })
      const result = checkKnowledge({ ...baseRule, canUnlock: "can-unlock" }, baseFacts, ctx)
      expect(result.kind).toBe("pass")
    })

    test("fail when canUnlock='can-unlock' but all chars know", () => {
      const ctx = makeCtx({
        getAllCharacters: () => ["c1", "c2"],
        isKnownByCharacter: () => true,
      })
      const result = checkKnowledge({ ...baseRule, canUnlock: "can-unlock" }, baseFacts, ctx)
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("canUnlock")
    })

    test("pass when canUnlock='cannot-unlock' and all chars know", () => {
      const ctx = makeCtx({
        getAllCharacters: () => ["c1", "c2"],
        isKnownByCharacter: () => true,
      })
      const result = checkKnowledge({ ...baseRule, canUnlock: "cannot-unlock" }, baseFacts, ctx)
      expect(result.kind).toBe("pass")
    })

    test("fail when canUnlock='cannot-unlock' but at least one char doesn't know", () => {
      const ctx = makeCtx({
        getAllCharacters: () => ["c1", "c2"],
        isKnownByCharacter: (_key, charId): LookupResult<boolean> => charId === "c1",
      })
      const result = checkKnowledge({ ...baseRule, canUnlock: "cannot-unlock" }, baseFacts, ctx)
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("canUnlock")
    })
  })

  describe("combined known + canUnlock", () => {
    test("pass when both assertions hold (allKnow: known='known' + canUnlock='cannot-unlock')", () => {
      const ctx = makeCtx({
        getAllCharacters: () => ["c1", "c2"],
        isKnownByCharacter: () => true,
      })
      const result = checkKnowledge(
        { ...baseRule, known: "known", canUnlock: "cannot-unlock" },
        baseFacts,
        ctx
      )
      expect(result.kind).toBe("pass")
    })

    test("fail on first violation: known fails, canUnlock not even checked", () => {
      const ctx = makeCtx({
        getAllCharacters: () => ["c1", "c2"],
        isKnownByCharacter: () => true,
      })
      const result = checkKnowledge(
        { ...baseRule, known: "not-known", canUnlock: "can-unlock" },
        baseFacts,
        ctx
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("known")
    })

    test("known passes, canUnlock fails: returns canUnlock fail", () => {
      const ctx = makeCtx({
        getAllCharacters: () => ["c1", "c2"],
        isKnownByCharacter: () => true,
      })
      const result = checkKnowledge(
        { ...baseRule, known: "known", canUnlock: "can-unlock" },
        baseFacts,
        ctx
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("canUnlock")
    })
  })

  describe("indeterminate", () => {
    test("indeterminate when isKnownByCharacter returns 'unknown' for some char", () => {
      const ctx = makeCtx({
        getAllCharacters: () => ["c1", "c2"],
        isKnownByCharacter: (_key, charId): LookupResult<boolean> =>
          charId === "c1" ? true : "unknown",
      })
      const result = checkKnowledge({ ...baseRule, known: "known" }, baseFacts, ctx)
      expect(result.kind).toBe("indeterminate")
      if (result.kind === "indeterminate") {
        expect(result.conditionKind).toBe("known")
        expect(result.missingSignal).toBe("knowledge:c2")
      }
    })

    test("indeterminate when facts.itemKey is undefined (known)", () => {
      const ctx = makeCtx({
        getAllCharacters: () => ["c1"],
        isKnownByCharacter: () => true,
      })
      const result = checkKnowledge(
        { ...baseRule, known: "known" },
        { ...baseFacts, itemKey: undefined },
        ctx
      )
      expect(result.kind).toBe("indeterminate")
      if (result.kind === "indeterminate") {
        expect(result.conditionKind).toBe("known")
        expect(result.missingSignal).toBe("itemKey")
      }
    })

    test("indeterminate when facts.itemKey is undefined (canUnlock-only)", () => {
      const ctx = makeCtx({
        getAllCharacters: () => ["c1"],
        isKnownByCharacter: () => true,
      })
      const result = checkKnowledge(
        { ...baseRule, canUnlock: "can-unlock" },
        { ...baseFacts, itemKey: undefined },
        ctx
      )
      expect(result.kind).toBe("indeterminate")
      if (result.kind === "indeterminate") {
        expect(result.conditionKind).toBe("canUnlock")
        expect(result.missingSignal).toBe("itemKey")
      }
    })

    test("indeterminate when getAllCharacters returns 'unknown'", () => {
      const ctx = makeCtx({ getAllCharacters: () => "unknown" })
      const result = checkKnowledge({ ...baseRule, known: "known" }, baseFacts, ctx)
      expect(result.kind).toBe("indeterminate")
      if (result.kind === "indeterminate") {
        expect(result.conditionKind).toBe("known")
        expect(result.missingSignal).toBe("characters")
      }
    })

    test("indeterminate when itemKey AND facts.known are both undefined", () => {
      const ctx = makeCtx({ getAllCharacters: () => ["c1"] })
      const result = checkKnowledge(
        { ...baseRule, canUnlock: "can-unlock" },
        { ...baseFacts, itemKey: undefined, known: undefined },
        ctx
      )
      expect(result.kind).toBe("indeterminate")
      if (result.kind === "indeterminate") {
        expect(result.missingSignal).toBe("itemKey")
      }
    })
  })

  describe("collectible itemKey-less fallback via facts.known", () => {
    const ctx = makeCtx({})
    const collectibleFacts = (known: boolean): ItemFacts => ({
      ...baseFacts,
      itemName: "Style Page: Bonemold Pauldrons",
      itemKey: undefined,
      known,
    })

    test("learned (known=true) passes canUnlock='cannot-unlock'", () => {
      const result = checkKnowledge(
        { ...baseRule, canUnlock: "cannot-unlock" },
        collectibleFacts(true),
        ctx
      )
      expect(result.kind).toBe("pass")
    })

    test("learned (known=true) fails canUnlock='can-unlock'", () => {
      const result = checkKnowledge(
        { ...baseRule, canUnlock: "can-unlock" },
        collectibleFacts(true),
        ctx
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("canUnlock")
    })

    test("unlearned (known=false) passes canUnlock='can-unlock'", () => {
      const result = checkKnowledge(
        { ...baseRule, canUnlock: "can-unlock" },
        collectibleFacts(false),
        ctx
      )
      expect(result.kind).toBe("pass")
    })

    test("unlearned (known=false) fails canUnlock='cannot-unlock'", () => {
      const result = checkKnowledge(
        { ...baseRule, canUnlock: "cannot-unlock" },
        collectibleFacts(false),
        ctx
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("canUnlock")
    })

    test("learned (known=true) passes known='known'", () => {
      const result = checkKnowledge({ ...baseRule, known: "known" }, collectibleFacts(true), ctx)
      expect(result.kind).toBe("pass")
    })

    test("learned (known=true) fails known='not-known'", () => {
      const result = checkKnowledge(
        { ...baseRule, known: "not-known" },
        collectibleFacts(true),
        ctx
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("known")
    })

    test("unlearned (known=false) passes known='not-known'", () => {
      const result = checkKnowledge(
        { ...baseRule, known: "not-known" },
        collectibleFacts(false),
        ctx
      )
      expect(result.kind).toBe("pass")
    })
  })

  describe("isKnowledgeItem disambiguation (itemKey AND known both absent)", () => {
    const ctx = makeCtx({ getAllCharacters: () => ["c1"] })
    const branchFacts = (isKnowledgeItem: boolean | undefined): ItemFacts => ({
      ...baseFacts,
      itemName: "Generic Reward Box",
      itemKey: undefined,
      known: undefined,
      isKnowledgeItem,
    })

    test("isKnowledgeItem=false → fail for known='known' (generic container falls through)", () => {
      const result = checkKnowledge({ ...baseRule, known: "known" }, branchFacts(false), ctx)
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("known")
    })

    test("isKnowledgeItem=false → fail for canUnlock='cannot-unlock'", () => {
      const result = checkKnowledge(
        { ...baseRule, canUnlock: "cannot-unlock" },
        branchFacts(false),
        ctx
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("canUnlock")
    })

    test("isKnowledgeItem=true → indeterminate (knowledge item, unresolved state)", () => {
      const result = checkKnowledge({ ...baseRule, known: "known" }, branchFacts(true), ctx)
      expect(result.kind).toBe("indeterminate")
      if (result.kind === "indeterminate") expect(result.missingSignal).toBe("itemKey")
    })

    test("isKnowledgeItem=undefined → indeterminate (legacy producer; contract preserved)", () => {
      const result = checkKnowledge(
        { ...baseRule, canUnlock: "can-unlock" },
        branchFacts(undefined),
        ctx
      )
      expect(result.kind).toBe("indeterminate")
      if (result.kind === "indeterminate") expect(result.missingSignal).toBe("itemKey")
    })
  })
})
