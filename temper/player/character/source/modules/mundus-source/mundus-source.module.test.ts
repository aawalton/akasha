import { expect, test } from "bun:test"
import type { EquipmentQualityId } from "akasha/temper/catalog/gear/equipment/kind/modules/equipment-qualities/equipment-qualities.module.code.ts"
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

const SHOWN: readonly (readonly [string, Pieces, number])[] = [
  ["the-lady", {}, 2744],
  ["the-lady", { epic: 5, legendary: 1 }, 4102],
  ["the-lady", { legendary: 6 }, 4239],
  ["the-lady", { epic: 7 }, 4297],
  ["the-lady", { epic: 2, legendary: 5 }, 4434],
  ["the-lover", {}, 2744],
  ["the-lover", { legendary: 5 }, 3989],
  ["the-lover", { epic: 5, legendary: 1 }, 4102],
  ["the-lover", { epic: 1, legendary: 5 }, 4212],
  ["the-lover", { legendary: 6 }, 4239],
  ["the-lover", { epic: 5, legendary: 2 }, 4351],
  ["the-lover", { epic: 2, legendary: 5 }, 4434],
  ["the-lover", { legendary: 7 }, 4489],
  ["the-thief", { legendary: 7 }, 1982],
  ["the-warrior", { legendary: 6 }, 367],
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
  ["the-lord", { fine: 6 }, 3037],
  ["the-lord", { fine: 7 }, 3172],
  ["the-lord", { fine: 8 }, 3308],
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
  ["the-lord", { superior: 4 }, 2854],
  ["the-lord", { superior: 5 }, 3012],
  ["the-lord", { superior: 6 }, 3170],
  ["the-lord", { superior: 7 }, 3328],
  ["the-lord", { superior: 8 }, 3487],
  ["the-lord", { epic: 1 }, 2404],
  ["the-lord", { epic: 2 }, 2585],
  ["the-lord", { epic: 3 }, 2763],
  ["the-lord", { epic: 4 }, 2943],
  ["the-lord", { epic: 5 }, 3124],
  ["the-lord", { epic: 6 }, 3304],
  ["the-lord", { epic: 7 }, 3484],
  ["the-lord", { epic: 8 }, 3664],
  ["the-lord", { legendary: 7 }, 3639],
  ["the-lord", { legendary: 8 }, 3842],
]

test.each(SHOWN)("%s under Divines %o shows %d, as the game showed", (stone, pieces, shown) => {
  expect(boon(stone, pieces)).toBe(shown)
})
