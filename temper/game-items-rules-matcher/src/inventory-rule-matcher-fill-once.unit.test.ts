import { describe, expect, it } from "bun:test"
import { ESO_BAG_BACKPACK, ESO_BAG_WORN } from "@temper/game-items-core/eso-bag-constants"
import type {
  WantedCompanionEquipmentSignature,
  WantedEquipmentSignature,
} from "@temper/game-items-rules-core/inventory-rule-compiler-types"
import type { ClassifiedInventoryItem } from "@temper/game-items-rules-core/inventory-rule-matcher-types"
import { makeItem } from "@temper/game-items-rules-core/inventory-rule-test-utils"
import { applyFillOnceCI, applyFillOnceCompanionCI } from "./inventory-rule-matcher-fill-once"

function ci(overrides: {
  itemId?: number
  equipType: number
  traitType: number
  quality: number
  armorType?: number
  weaponType?: number
  locationKey?: string
  bagId?: number
}): ClassifiedInventoryItem {
  return {
    item: makeItem({
      itemId: overrides.itemId ?? 1,
      equipType: overrides.equipType,
      traitType: overrides.traitType,
      quality: overrides.quality,
      armorType: overrides.armorType,
      weaponType: overrides.weaponType,
    }),
    locationKey: overrides.locationKey ?? "1001",
    locationDisplayName: "Azara",
    nodeIds: ["equipment"],
    bagId: overrides.bagId ?? ESO_BAG_BACKPACK,
  }
}

const sigA: WantedEquipmentSignature = {
  esoCharId: "1001",
  equipType: 1,
  traitType: 16,
  quality: 5,
}
const sigB: WantedEquipmentSignature = {
  esoCharId: "1001",
  equipType: 2,
  traitType: 16,
  quality: 5,
}

const compSigA: WantedCompanionEquipmentSignature = {
  companionName: "Bastian Hallix",
  equipType: 1,
  traitType: 36,
  quality: 5,
}

describe("applyFillOnceCI", () => {
  it("caps included at the number of signatures (one item per slot)", () => {
    const cand = [
      ci({ itemId: 10, equipType: 1, traitType: 16, quality: 5 }),
      ci({ itemId: 11, equipType: 1, traitType: 16, quality: 5 }),
      ci({ itemId: 12, equipType: 1, traitType: 16, quality: 5 }),
    ]
    const { included, preFilled } = applyFillOnceCI(cand, [sigA])

    expect(preFilled).toHaveLength(0)
    expect(included).toHaveLength(1)
    expect(included.length + preFilled.length).toBeLessThanOrEqual(1)
  })

  it("drops candidates that don't match any signature", () => {
    const matching = ci({ itemId: 10, equipType: 1, traitType: 16, quality: 5 })
    const wrongTrait = ci({ itemId: 11, equipType: 1, traitType: 18, quality: 5 })
    const wrongEquip = ci({ itemId: 12, equipType: 9, traitType: 16, quality: 5 })

    const { included, preFilled } = applyFillOnceCI([matching, wrongTrait, wrongEquip], [sigA])

    expect(preFilled).toHaveLength(0)
    expect(included.map((c) => c.item.itemId)).toEqual([10])
  })

  it("pre-fills items already worn at the target character before fill assignment", () => {
    const wornAtTarget = ci({
      itemId: 10,
      equipType: 1,
      traitType: 16,
      quality: 5,
      locationKey: "1001",
      bagId: ESO_BAG_WORN,
    })
    const inBackpack = ci({
      itemId: 11,
      equipType: 1,
      traitType: 16,
      quality: 5,
      locationKey: "1001",
      bagId: ESO_BAG_BACKPACK,
    })

    const { included, preFilled } = applyFillOnceCI([inBackpack, wornAtTarget], [sigA])

    expect(preFilled.map((c) => c.item.itemId)).toEqual([10])
    expect(included).toHaveLength(0)
  })

  it("does not pre-fill items worn on a different character", () => {
    const wornElsewhere = ci({
      itemId: 10,
      equipType: 1,
      traitType: 16,
      quality: 5,
      locationKey: "9999",
      bagId: ESO_BAG_WORN,
    })
    const { included, preFilled } = applyFillOnceCI([wornElsewhere], [sigA])

    expect(preFilled).toHaveLength(0)
    expect(included.map((c) => c.item.itemId)).toEqual([10])
  })

  it("fills multiple distinct signatures — but each at most once", () => {
    const itemA = ci({ itemId: 10, equipType: 1, traitType: 16, quality: 5 })
    const itemB = ci({ itemId: 11, equipType: 2, traitType: 16, quality: 5 })
    const itemBExtra = ci({ itemId: 12, equipType: 2, traitType: 16, quality: 5 })

    const { included, preFilled } = applyFillOnceCI([itemA, itemB, itemBExtra], [sigA, sigB])

    expect(preFilled).toHaveLength(0)
    expect(included.map((c) => c.item.itemId).sort()).toEqual([10, 11])
  })

  it("returns empty results when there are no signatures", () => {
    const candidate = ci({ itemId: 10, equipType: 1, traitType: 16, quality: 5 })
    const { included, preFilled } = applyFillOnceCI([candidate], [])
    expect(included).toHaveLength(0)
    expect(preFilled).toHaveLength(0)
  })
})

describe("applyFillOnceCompanionCI", () => {
  it("caps included at the number of companion signatures", () => {
    const cand = [
      ci({ itemId: 10, equipType: 1, traitType: 36, quality: 5 }),
      ci({ itemId: 11, equipType: 1, traitType: 36, quality: 5 }),
    ]
    const { included, preFilled } = applyFillOnceCompanionCI(cand, [compSigA])

    expect(preFilled).toHaveLength(0)
    expect(included).toHaveLength(1)
  })

  it("pre-fills items already at the target companion's location", () => {
    const atCompanion = ci({
      itemId: 10,
      equipType: 1,
      traitType: 36,
      quality: 5,
      locationKey: "Companion:Bastian Hallix",
    })
    const inBackpack = ci({
      itemId: 11,
      equipType: 1,
      traitType: 36,
      quality: 5,
      locationKey: "1001",
      bagId: ESO_BAG_BACKPACK,
    })

    const { included, preFilled } = applyFillOnceCompanionCI([inBackpack, atCompanion], [compSigA])

    expect(preFilled.map((c) => c.item.itemId)).toEqual([10])
    expect(included).toHaveLength(0)
  })

  it("does not pre-fill items at a different companion's location", () => {
    const otherCompanion = ci({
      itemId: 10,
      equipType: 1,
      traitType: 36,
      quality: 5,
      locationKey: "Companion:Mirri Elendis",
    })

    const { included, preFilled } = applyFillOnceCompanionCI([otherCompanion], [compSigA])

    expect(preFilled).toHaveLength(0)
    expect(included.map((c) => c.item.itemId)).toEqual([10])
  })

  it("returns empty results when there are no companion signatures", () => {
    const candidate = ci({ itemId: 10, equipType: 1, traitType: 36, quality: 5 })
    const { included, preFilled } = applyFillOnceCompanionCI([candidate], [])
    expect(included).toHaveLength(0)
    expect(preFilled).toHaveLength(0)
  })
})
