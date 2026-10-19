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
]

test.each(SHOWN)("%s under Divines %o shows %d, as the game showed", (stone, pieces, shown) => {
  expect(boon(stone, pieces)).toBe(shown)
})
