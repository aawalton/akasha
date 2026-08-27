import { describe, expect, test } from "bun:test"
import type { CompiledOrderedRule } from "@temper/game-items-rules-core/inventory-rule-compiler-types"
import { resolvePotionRestoreMetricIds } from "@temper/game-items-rules-core/potion-restore-resolve"
import type { EvalContext, EvalEnv } from "../eval-env"
import type { ItemFacts } from "../item-facts"
import { checkPotionEffects } from "./check-potion-effects"

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
  itemId: 0,
  itemName: "Sample",
  itemLink: "",
}

const baseRule: CompiledOrderedRule = {
  categoryId: "all",
  action: "nothing",
}

const TRI_STAT = resolvePotionRestoreMetricIds(64710, 0)
const POTENT_STAMINA = resolvePotionRestoreMetricIds(176042, 0)
const POTENT_MAGICKA = resolvePotionRestoreMetricIds(176040, 0)
const POTENT_HEALTH = resolvePotionRestoreMetricIds(176041, 0)

const ALL_THREE = ["health-restore", "magicka-restore", "stamina-restore"] as const

describe("checkPotionEffects — catalog fixtures resolve as expected", () => {
  test("crown tri-restoration (64710) restores all three", () => {
    expect(TRI_STAT).toBeDefined()
    expect([...(TRI_STAT ?? [])].sort()).toEqual([...ALL_THREE].sort())
  })

  test("essence of potent stamina (176042) restores only stamina", () => {
    expect(POTENT_STAMINA).toEqual(["stamina-restore"])
  })

  test("essence of potent magicka (176040) restores only magicka", () => {
    expect(POTENT_MAGICKA).toEqual(["magicka-restore"])
  })

  test("essence of potent health (176041) restores health + magicka", () => {
    expect([...(POTENT_HEALTH ?? [])].sort()).toEqual(["health-restore", "magicka-restore"])
  })
})

describe("checkPotionEffects — skip", () => {
  test("skip when rule declares no potionEffects", () => {
    const result = checkPotionEffects(
      baseRule,
      { ...baseFacts, potionEffectMetricIds: TRI_STAT },
      stubCtx
    )
    expect(result.kind).toBe("skip")
  })

  test("skip when potionEffects is an empty list", () => {
    const result = checkPotionEffects(
      { ...baseRule, potionEffects: [] },
      { ...baseFacts, potionEffectMetricIds: TRI_STAT },
      stubCtx
    )
    expect(result.kind).toBe("skip")
  })
})

describe("checkPotionEffects — mode=all", () => {
  test("tri-stat potion passes all[health,magicka,stamina]", () => {
    const result = checkPotionEffects(
      { ...baseRule, potionEffects: [...ALL_THREE], potionEffectsMode: "all" },
      { ...baseFacts, potionEffectMetricIds: TRI_STAT },
      stubCtx
    )
    expect(result.kind).toBe("pass")
  })

  test("potent health (health+magicka) fails all[health,magicka,stamina]", () => {
    const result = checkPotionEffects(
      { ...baseRule, potionEffects: [...ALL_THREE], potionEffectsMode: "all" },
      { ...baseFacts, potionEffectMetricIds: POTENT_HEALTH },
      stubCtx
    )
    expect(result.kind).toBe("fail")
    if (result.kind === "fail") expect(result.conditionKind).toBe("potion-effects")
  })
})

describe("checkPotionEffects — mode=any (and default)", () => {
  test("potent stamina passes any[stamina-restore]", () => {
    const result = checkPotionEffects(
      { ...baseRule, potionEffects: ["stamina-restore"], potionEffectsMode: "any" },
      { ...baseFacts, potionEffectMetricIds: POTENT_STAMINA },
      stubCtx
    )
    expect(result.kind).toBe("pass")
  })

  test("potent magicka passes any[magicka-restore]", () => {
    const result = checkPotionEffects(
      { ...baseRule, potionEffects: ["magicka-restore"], potionEffectsMode: "any" },
      { ...baseFacts, potionEffectMetricIds: POTENT_MAGICKA },
      stubCtx
    )
    expect(result.kind).toBe("pass")
  })

  test("potent health passes any[magicka-restore] (has health + magicka)", () => {
    const result = checkPotionEffects(
      { ...baseRule, potionEffects: ["magicka-restore"], potionEffectsMode: "any" },
      { ...baseFacts, potionEffectMetricIds: POTENT_HEALTH },
      stubCtx
    )
    expect(result.kind).toBe("pass")
  })

  test("default mode is any — potent stamina passes [stamina-restore] without explicit mode", () => {
    const result = checkPotionEffects(
      { ...baseRule, potionEffects: ["stamina-restore"] },
      { ...baseFacts, potionEffectMetricIds: POTENT_STAMINA },
      stubCtx
    )
    expect(result.kind).toBe("pass")
  })

  test("potent stamina fails any[health-restore] (no overlap)", () => {
    const result = checkPotionEffects(
      { ...baseRule, potionEffects: ["health-restore"], potionEffectsMode: "any" },
      { ...baseFacts, potionEffectMetricIds: POTENT_STAMINA },
      stubCtx
    )
    expect(result.kind).toBe("fail")
  })
})

describe("checkPotionEffects — fail-closed on non-potion / unresolvable", () => {
  test("indeterminate when potionEffectMetricIds is undefined (non-potion)", () => {
    const result = checkPotionEffects(
      { ...baseRule, potionEffects: ["health-restore"], potionEffectsMode: "any" },
      { ...baseFacts, potionEffectMetricIds: undefined },
      stubCtx
    )
    expect(result.kind).toBe("indeterminate")
    if (result.kind === "indeterminate") {
      expect(result.conditionKind).toBe("potion-effects")
      expect(result.missingSignal).toBe("potionEffectMetricIds")
    }
  })

  test("a non-potion itemId resolves to undefined", () => {
    expect(resolvePotionRestoreMetricIds(30148, 0)).toBeUndefined()
  })

  test("fail (not pass) on a known potion that lacks the required effect under all", () => {
    const result = checkPotionEffects(
      { ...baseRule, potionEffects: ["stamina-restore"], potionEffectsMode: "all" },
      { ...baseFacts, potionEffectMetricIds: POTENT_MAGICKA },
      stubCtx
    )
    expect(result.kind).toBe("fail")
  })
})
