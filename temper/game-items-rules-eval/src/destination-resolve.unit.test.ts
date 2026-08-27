import { describe, expect, test } from "bun:test"
import type { CompiledOrderedRule } from "@temper/game-items-rules-core/inventory-rule-compiler-types"
import { resolveDestination } from "./destination-resolve"
import type { ClaimMap, EvalContext, EvalEnv, LookupResult } from "./eval-env"
import type { ItemFacts } from "./item-facts"

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

const baseFacts: ItemFacts = {
  itemId: 100,
  itemName: "Sample",
  itemLink: "|H1:item:100|h|h",
}

function makeCtx(env: Partial<EvalEnv>, claimedByCharacter?: ClaimMap): EvalContext {
  return { env: { ...baseEnv, ...env }, claimedByCharacter }
}

const recipeFacts: ItemFacts = {
  ...baseFacts,
  itemKey: { kind: "recipe", resultItemId: 555 },
}

describe("resolveDestination — concrete pass-through", () => {
  test("undefined destination resolves to empty concrete", () => {
    const rule: CompiledOrderedRule = { categoryId: "all", action: "nothing" }
    const r = resolveDestination(rule, baseFacts, makeCtx({}))
    expect(r.kind).toBe("resolved")
    if (r.kind === "resolved") expect(r.concrete).toBe("")
  })

  test("'bank' passes through", () => {
    const rule: CompiledOrderedRule = {
      categoryId: "all",
      action: "move-to",
      destination: "bank",
    }
    const r = resolveDestination(rule, baseFacts, makeCtx({}))
    expect(r.kind).toBe("resolved")
    if (r.kind === "resolved") expect(r.concrete).toBe("bank")
  })

  test("'character:abc123' passes through", () => {
    const rule: CompiledOrderedRule = {
      categoryId: "all",
      action: "use",
      destination: "character:abc123",
    }
    const r = resolveDestination(rule, baseFacts, makeCtx({}))
    expect(r.kind).toBe("resolved")
    if (r.kind === "resolved") expect(r.concrete).toBe("character:abc123")
  })
})

describe("resolveDestination — character:by-priority for use+recipe", () => {
  const useByPriority: CompiledOrderedRule = {
    categoryId: "knowledge",
    action: "use",
    destination: "character:by-priority",
    canUnlock: "can-unlock",
  }

  test("first priority char who doesn't know wins", () => {
    const env: Partial<EvalEnv> = {
      getCharacterPriority: () => ["a", "b", "c"],
      isKnownByCharacter: (_key, charId) => charId === "a",
    }
    const r = resolveDestination(useByPriority, recipeFacts, makeCtx(env))
    expect(r.kind).toBe("resolved")
    if (r.kind === "resolved") expect(r.concrete).toBe("character:b")
  })

  test("all chars know it → no-eligible-target", () => {
    const env: Partial<EvalEnv> = {
      getCharacterPriority: () => ["a", "b"],
      isKnownByCharacter: () => true,
    }
    const r = resolveDestination(useByPriority, recipeFacts, makeCtx(env))
    expect(r.kind).toBe("no-eligible-target")
  })

  test("empty priority → no-eligible-target", () => {
    const env: Partial<EvalEnv> = { getCharacterPriority: () => [] }
    const r = resolveDestination(useByPriority, recipeFacts, makeCtx(env))
    expect(r.kind).toBe("no-eligible-target")
  })

  test("priority unknown → indeterminate", () => {
    const r = resolveDestination(useByPriority, recipeFacts, makeCtx({}))
    expect(r.kind).toBe("indeterminate")
  })

  test("isKnownByCharacter unknown for any char → indeterminate", () => {
    const env: Partial<EvalEnv> = {
      getCharacterPriority: () => ["a", "b"],
      isKnownByCharacter: (_key, charId): LookupResult<boolean> =>
        charId === "a" ? "unknown" : false,
    }
    const r = resolveDestination(useByPriority, recipeFacts, makeCtx(env))
    expect(r.kind).toBe("indeterminate")
  })

  test("missing facts.itemKey → indeterminate", () => {
    const env: Partial<EvalEnv> = { getCharacterPriority: () => ["a"] }
    const r = resolveDestination(useByPriority, baseFacts, makeCtx(env))
    expect(r.kind).toBe("indeterminate")
  })

  test("claim-aware: char with prior claim on same itemKey is skipped", () => {
    const env: Partial<EvalEnv> = {
      getCharacterPriority: () => ["a", "b"],
      isKnownByCharacter: () => false,
    }
    const claimed: ClaimMap = new Map([["a", new Set(["recipe:555"])]])
    const r = resolveDestination(useByPriority, recipeFacts, makeCtx(env, claimed))
    expect(r.kind).toBe("resolved")
    if (r.kind === "resolved") expect(r.concrete).toBe("character:b")
  })

  test("claim-aware: every char already claimed → no-eligible-target", () => {
    const env: Partial<EvalEnv> = {
      getCharacterPriority: () => ["a", "b"],
      isKnownByCharacter: () => false,
    }
    const claimed: ClaimMap = new Map([
      ["a", new Set(["recipe:555"])],
      ["b", new Set(["recipe:555"])],
    ])
    const r = resolveDestination(useByPriority, recipeFacts, makeCtx(env, claimed))
    expect(r.kind).toBe("no-eligible-target")
  })

  test("motif itemKey resolves through hashItemKey", () => {
    const motifFacts: ItemFacts = {
      ...baseFacts,
      itemKey: { kind: "motif", styleId: 4, chapterId: 7 },
    }
    const env: Partial<EvalEnv> = {
      getCharacterPriority: () => ["a"],
      isKnownByCharacter: () => false,
    }
    const r = resolveDestination(useByPriority, motifFacts, makeCtx(env))
    expect(r.kind).toBe("resolved")
    if (r.kind === "resolved") expect(r.concrete).toBe("character:a")
  })

  test("script itemKey resolves through hashItemKey", () => {
    const scriptFacts: ItemFacts = {
      ...baseFacts,
      itemKey: { kind: "script", scriptId: 9001 },
    }
    const env: Partial<EvalEnv> = {
      getCharacterPriority: () => ["a"],
      isKnownByCharacter: () => false,
    }
    const r = resolveDestination(useByPriority, scriptFacts, makeCtx(env))
    expect(r.kind).toBe("resolved")
    if (r.kind === "resolved") expect(r.concrete).toBe("character:a")
  })
})

describe("resolveDestination — character:by-priority for use+consumable", () => {
  const useByPriority: CompiledOrderedRule = {
    categoryId: "all",
    action: "use",
    destination: "character:by-priority",
  }
  const consumableFacts: ItemFacts = {
    ...baseFacts,
    itemKey: { kind: "consumable", itemId: 200 },
  }

  test("first wanter wins (no knowledge / claim check)", () => {
    const env: Partial<EvalEnv> = { getConsumableWanters: () => ["a", "b"] }
    const r = resolveDestination(useByPriority, consumableFacts, makeCtx(env))
    expect(r.kind).toBe("resolved")
    if (r.kind === "resolved") expect(r.concrete).toBe("character:a")
  })

  test("no wanters → no-eligible-target", () => {
    const env: Partial<EvalEnv> = { getConsumableWanters: () => [] }
    const r = resolveDestination(useByPriority, consumableFacts, makeCtx(env))
    expect(r.kind).toBe("no-eligible-target")
  })

  test("getConsumableWanters unknown → indeterminate", () => {
    const r = resolveDestination(useByPriority, consumableFacts, makeCtx({}))
    expect(r.kind).toBe("indeterminate")
  })
})

describe("resolveDestination — character:by-priority for research", () => {
  const researchByPriority: CompiledOrderedRule = {
    categoryId: "all",
    action: "research",
    destination: "character:by-priority",
  }
  const researchableFacts: ItemFacts = {
    ...baseFacts,
    traitType: 4,
    weaponType: 2,
  }

  test("first char who lacks the trait wins", () => {
    const env: Partial<EvalEnv> = {
      getCharacterPriority: () => ["a", "b"],
      isTraitResearched: (charId) => charId === "a",
    }
    const r = resolveDestination(researchByPriority, researchableFacts, makeCtx(env))
    expect(r.kind).toBe("resolved")
    if (r.kind === "resolved") expect(r.concrete).toBe("character:b")
  })

  test("non-researchable item → no-eligible-target", () => {
    const r = resolveDestination(
      researchByPriority,
      baseFacts,
      makeCtx({ getCharacterPriority: () => ["a"] })
    )
    expect(r.kind).toBe("no-eligible-target")
  })

  test("isTraitResearched unknown → indeterminate", () => {
    const env: Partial<EvalEnv> = {
      getCharacterPriority: () => ["a"],
      isTraitResearched: () => "unknown",
    }
    const r = resolveDestination(researchByPriority, researchableFacts, makeCtx(env))
    expect(r.kind).toBe("indeterminate")
  })

  test("every priority char already researched → no-eligible-target", () => {
    const env: Partial<EvalEnv> = {
      getCharacterPriority: () => ["a", "b"],
      isTraitResearched: () => true,
    }
    const r = resolveDestination(researchByPriority, researchableFacts, makeCtx(env))
    expect(r.kind).toBe("no-eligible-target")
  })
})

describe("resolveDestination — character:by-priority for deconstruct", () => {
  const deconByPriority: CompiledOrderedRule = {
    categoryId: "all",
    action: "deconstruct",
    destination: "character:by-priority",
  }
  const deconstructable: ItemFacts = {
    ...baseFacts,
    weaponType: 2,
    armorType: 0,
  }

  test("first char below cap wins", () => {
    const env: Partial<EvalEnv> = {
      getCharacterPriority: () => ["a", "b"],
      isCraftingRankBelowCap: (charId) => charId !== "a",
    }
    const r = resolveDestination(deconByPriority, deconstructable, makeCtx(env))
    expect(r.kind).toBe("resolved")
    if (r.kind === "resolved") expect(r.concrete).toBe("character:b")
  })

  test("uninferrable craft type → no-eligible-target", () => {
    const r = resolveDestination(
      deconByPriority,
      baseFacts,
      makeCtx({ getCharacterPriority: () => ["a"] })
    )
    expect(r.kind).toBe("no-eligible-target")
  })

  test("isCraftingRankBelowCap unknown → indeterminate", () => {
    const env: Partial<EvalEnv> = {
      getCharacterPriority: () => ["a"],
      isCraftingRankBelowCap: () => "unknown",
    }
    const r = resolveDestination(deconByPriority, deconstructable, makeCtx(env))
    expect(r.kind).toBe("indeterminate")
  })

  test("every priority char at cap → no-eligible-target", () => {
    const env: Partial<EvalEnv> = {
      getCharacterPriority: () => ["a", "b"],
      isCraftingRankBelowCap: () => false,
    }
    const r = resolveDestination(deconByPriority, deconstructable, makeCtx(env))
    expect(r.kind).toBe("no-eligible-target")
  })
})

describe("resolveDestination — character-worn:by-priority", () => {
  const moveCharWorn: CompiledOrderedRule = {
    categoryId: "all",
    action: "move-to",
    destination: "character-worn:by-priority",
  }
  const equipFacts: ItemFacts = {
    ...baseFacts,
    equipType: 1,
    traitType: 4,
    quality: 4,
    armorType: 1,
  }

  test("delegates to findCharacterForWantedEquipment", () => {
    const env: Partial<EvalEnv> = { findCharacterForWantedEquipment: () => "char-1" }
    const r = resolveDestination(moveCharWorn, equipFacts, makeCtx(env))
    expect(r.kind).toBe("resolved")
    if (r.kind === "resolved") expect(r.concrete).toBe("character-worn:char-1")
  })

  test("no character wants → no-eligible-target", () => {
    const env: Partial<EvalEnv> = { findCharacterForWantedEquipment: () => undefined }
    const r = resolveDestination(moveCharWorn, equipFacts, makeCtx(env))
    expect(r.kind).toBe("no-eligible-target")
  })

  test("unknown match → indeterminate", () => {
    const r = resolveDestination(moveCharWorn, equipFacts, makeCtx({}))
    expect(r.kind).toBe("indeterminate")
  })

  test("missing equip facts → no-eligible-target", () => {
    const r = resolveDestination(moveCharWorn, baseFacts, makeCtx({}))
    expect(r.kind).toBe("no-eligible-target")
  })
})

describe("resolveDestination — companion-worn:by-priority", () => {
  const moveCompanionWorn: CompiledOrderedRule = {
    categoryId: "all",
    action: "move-to",
    destination: "companion-worn:by-priority",
  }
  const equipFacts: ItemFacts = {
    ...baseFacts,
    equipType: 1,
    traitType: 35,
    quality: 4,
    armorType: 1,
  }

  test("delegates to findCompanionForWantedEquipment", () => {
    const env: Partial<EvalEnv> = { findCompanionForWantedEquipment: () => "Bastian Hallix" }
    const r = resolveDestination(moveCompanionWorn, equipFacts, makeCtx(env))
    expect(r.kind).toBe("resolved")
    if (r.kind === "resolved") expect(r.concrete).toBe("companion-worn:Bastian Hallix")
  })

  test("no companion wants → no-eligible-target", () => {
    const env: Partial<EvalEnv> = { findCompanionForWantedEquipment: () => undefined }
    const r = resolveDestination(moveCompanionWorn, equipFacts, makeCtx(env))
    expect(r.kind).toBe("no-eligible-target")
  })

  test("unknown match → indeterminate", () => {
    const r = resolveDestination(moveCompanionWorn, equipFacts, makeCtx({}))
    expect(r.kind).toBe("indeterminate")
  })
})

describe("resolveDestination — still-unimplemented parameterized destinations", () => {
  test("companion:by-priority → indeterminate", () => {
    const rule: CompiledOrderedRule = {
      categoryId: "all",
      action: "use",
      destination: "companion:by-priority",
    }
    const r = resolveDestination(rule, baseFacts, makeCtx({}))
    expect(r.kind).toBe("indeterminate")
  })
})
