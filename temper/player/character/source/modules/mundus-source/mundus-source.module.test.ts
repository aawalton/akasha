import { expect, test } from "bun:test"
import type { EquipmentQualityId } from "akasha/temper/catalog/gear/equipment/kind/modules/equipment-qualities/equipment-qualities.module.code.ts"
import { calculateDivinesTooltipValue } from "akasha/temper/player/character/characters-equipment/modules/armor-trait-effects/armor-trait-effects.module.code.ts"
import type { ArmorItem } from "akasha/temper/player/character/characters-equipment/modules/item-composites/item-composites.module.code.ts"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"
import { createMundusSource } from "akasha/temper/player/character/source/modules/mundus-source/mundus-source.module.code.ts"

holdSkillCatalogFromCheckout()

type Pieces = Partial<Record<EquipmentQualityId, number>>

function divines(pieces: Pieces): readonly ArmorItem[] {
  return Object.entries(pieces).flatMap(([quality, count]) =>
    Array.from(
      { length: count ?? 0 },
      (): ArmorItem => ({
        type: "chest",
        weight: "heavy",
        trait: "divines",
        enchantment: "no-enchant",
        set: "no-set",
        quality: quality as EquipmentQualityId,
      })
    )
  )
}

function boon(stone: string, pieces: Pieces): unknown {
  return createMundusSource(stone, divines(pieces)).effects[0]?.effectValue
}

const APPLIED: readonly (readonly [string, Pieces, number])[] = [
  ["the-lord", {}, 2225],
  ["the-lord", { normal: 1 }, 2338],
  ["the-lord", { normal: 2 }, 2451],
  ["the-lord", { normal: 3 }, 2565],
  ["the-lord", { normal: 4 }, 2678],
  ["the-lord", { normal: 5 }, 2791],
  ["the-lord", { normal: 6 }, 2906],
  ["the-lord", { normal: 7 }, 3019],
  ["the-lord", { normal: 8 }, 3132],
  ["the-lord", { fine: 1 }, 2360],
  ["the-lord", { fine: 2 }, 2495],
  ["the-lord", { fine: 3 }, 2632],
  ["the-lord", { fine: 4 }, 2767],
  ["the-lord", { fine: 5 }, 2904],
  ["the-lord", { fine: 6 }, 3039],
  ["the-lord", { fine: 7 }, 3174],
  ["the-lord", { fine: 8 }, 3311],
  ["the-lord", { normal: 1, fine: 1 }, 2473],
  ["the-lord", { normal: 2, fine: 1 }, 2587],
  ["the-lord", { normal: 3, fine: 1 }, 2700],
  ["the-lord", { normal: 4, fine: 1 }, 2814],
  ["the-lord", { normal: 5, fine: 1 }, 2928],
  ["the-lord", { normal: 6, fine: 1 }, 3041],
  ["the-lord", { normal: 7, fine: 1 }, 3154],
  ["the-lord", { superior: 1 }, 2382],
  ["the-lord", { superior: 2 }, 2541],
  ["the-lord", { superior: 3 }, 2698],
  ["the-lord", { superior: 4 }, 2856],
  ["the-lord", { superior: 5 }, 3015],
  ["the-lord", { superior: 6 }, 3172],
  ["the-lord", { superior: 7 }, 3330],
  ["the-lord", { superior: 8 }, 3489],
  ["the-mage", {}, 2023],
  ["the-mage", { normal: 1 }, 2126],
  ["the-mage", { normal: 2 }, 2229],
  ["the-mage", { normal: 8 }, 2848],
  ["the-mage", { fine: 1 }, 2146],
  ["the-mage", { fine: 2 }, 2269],
  ["the-mage", { fine: 3 }, 2393],
  ["the-mage", { fine: 4 }, 2516],
  ["the-mage", { fine: 5 }, 2640],
  ["the-mage", { fine: 6 }, 2763],
  ["the-mage", { fine: 7 }, 2886],
  ["the-mage", { fine: 8 }, 3010],
  ["the-mage", { superior: 1 }, 2166],
  ["the-mage", { superior: 2 }, 2310],
  ["the-mage", { superior: 3 }, 2453],
  ["the-mage", { superior: 4 }, 2597],
  ["the-mage", { superior: 5 }, 2741],
  ["the-mage", { superior: 6 }, 2884],
  ["the-mage", { superior: 7 }, 3028],
  ["the-mage", { superior: 8 }, 3172],
  ["the-mage", { epic: 1 }, 2186],
  ["the-mage", { epic: 2 }, 2350],
  ["the-mage", { epic: 3 }, 2514],
  ["the-mage", { epic: 4 }, 2678],
  ["the-mage", { epic: 5 }, 2842],
  ["the-mage", { epic: 6 }, 3006],
  ["the-mage", { epic: 7 }, 3170],
  ["the-mage", { epic: 8 }, 3333],
  ["the-mage", { legendary: 1 }, 2207],
  ["the-mage", { legendary: 2 }, 2391],
  ["the-mage", { legendary: 3 }, 2575],
  ["the-mage", { legendary: 4 }, 2759],
  ["the-mage", { legendary: 5 }, 2943],
  ["the-mage", { legendary: 6 }, 3127],
  ["the-mage", { legendary: 7 }, 3311],
  ["the-lady", { epic: 5, legendary: 1 }, 4102],
  ["the-lady", { epic: 2, legendary: 5 }, 4434],
  ["the-lover", { legendary: 5 }, 3989],
  ["the-lover", { legendary: 6 }, 4239],
  ["the-lover", { legendary: 7 }, 4489],
  ["the-lover", { epic: 1, legendary: 5 }, 4212],
  ["the-lover", { epic: 2, legendary: 5 }, 4434],
  ["the-lover", { epic: 5, legendary: 1 }, 4102],
  ["the-lover", { epic: 5, legendary: 2 }, 4351],
  ["the-ritual", {}, 0.08],
  ["the-ritual", { legendary: 4 }, 0.1],
]

test.each(
  APPLIED
)("%s under Divines %o applies %d, as the game applied", (stone, pieces, applied) => {
  expect(boon(stone, pieces)).toBe(applied)
})

const SHOWN: readonly (readonly [Pieces, number])[] = [
  [{ legendary: 1 }, 2207],
  [{ legendary: 2 }, 2389],
  [{ legendary: 5 }, 2941],
  [{ legendary: 6 }, 3125],
  [{ fine: 6 }, 2761],
  [{ superior: 4 }, 2595],
  [{ epic: 3 }, 2512],
  [{ epic: 1, legendary: 1 }, 2368],
]

test.each(SHOWN)("the Mage's tooltip under Divines %o shows %d", (pieces, shown) => {
  expect(calculateDivinesTooltipValue(2023, divines(pieces))).toBe(shown)
})
