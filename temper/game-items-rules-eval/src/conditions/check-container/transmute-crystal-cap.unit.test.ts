import { describe, expect, test } from "bun:test"
import type { ItemFacts } from "../../item-facts"
import { checkContainer } from "../check-container"
import { baseFacts, canOpenRule, containerFacts, ctxWith } from "./fixtures"

describe("checkContainer — canOpen transmute-crystal cap guard", () => {
  const transmuteContainerFacts: ItemFacts = {
    ...baseFacts,
    itemName: "Transmutation Geode",
    isContainer: true,
    specializedItemType: 875,
  }

  test("transmute container at cap (amount >= cap) → fail", () => {
    const result = checkContainer(
      canOpenRule,
      transmuteContainerFacts,
      ctxWith({
        getCooldownGroup: () => null,
        getTransmuteCrystalAmount: () => 1000,
        getTransmuteCrystalCap: () => 1000,
      })
    )
    expect(result.kind).toBe("fail")
    if (result.kind === "fail") {
      expect(result.conditionKind).toBe("canOpen")
    }
  })

  test("transmute container below cap → pass", () => {
    const result = checkContainer(
      canOpenRule,
      transmuteContainerFacts,
      ctxWith({
        getCooldownGroup: () => null,
        getTransmuteCrystalAmount: () => 500,
        getTransmuteCrystalCap: () => 1000,
      })
    )
    expect(result.kind).toBe("pass")
  })

  test("transmute container, amount unknown → indeterminate(missingSignal=transmuteCrystalAmount)", () => {
    const result = checkContainer(
      canOpenRule,
      transmuteContainerFacts,
      ctxWith({
        getCooldownGroup: () => null,
        getTransmuteCrystalCap: () => 1000,
      })
    )
    expect(result.kind).toBe("indeterminate")
    if (result.kind === "indeterminate") {
      expect(result.conditionKind).toBe("canOpen")
      expect(result.missingSignal).toBe("transmuteCrystalAmount")
    }
  })

  test("transmute container, cap unknown → indeterminate(missingSignal=transmuteCrystalCap)", () => {
    const result = checkContainer(
      canOpenRule,
      transmuteContainerFacts,
      ctxWith({
        getCooldownGroup: () => null,
        getTransmuteCrystalAmount: () => 500,
      })
    )
    expect(result.kind).toBe("indeterminate")
    if (result.kind === "indeterminate") {
      expect(result.conditionKind).toBe("canOpen")
      expect(result.missingSignal).toBe("transmuteCrystalCap")
    }
  })

  test("non-currency container at transmute cap → pass (guard does not apply)", () => {
    const result = checkContainer(
      canOpenRule,
      containerFacts,
      ctxWith({
        getCooldownGroup: () => null,
        getTransmuteCrystalAmount: () => 1000,
        getTransmuteCrystalCap: () => 1000,
      })
    )
    expect(result.kind).toBe("pass")
  })

  test("currency container without 'Transmute' in name at transmute cap → pass (not a transmute container)", () => {
    const goldCofferFacts: ItemFacts = {
      ...baseFacts,
      itemName: "Gold Coffer",
      isContainer: true,
      specializedItemType: 875,
    }
    const result = checkContainer(
      canOpenRule,
      goldCofferFacts,
      ctxWith({
        getCooldownGroup: () => null,
        getTransmuteCrystalAmount: () => 1000,
        getTransmuteCrystalCap: () => 1000,
      })
    )
    expect(result.kind).toBe("pass")
  })
})
