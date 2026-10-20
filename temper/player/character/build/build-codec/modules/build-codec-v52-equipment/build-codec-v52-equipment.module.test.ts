import { expect, test } from "bun:test"
import {
  decodeBuild,
  encodeBuild,
} from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import {
  getArmorEnchantId,
  getArmorTraitId,
  getArmorWeightId,
  getSetId,
} from "akasha/temper/player/character/build/build-codec/modules/build-codec-indices/build-codec-indices.module.code.ts"
import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import type { ItemLevel } from "akasha/temper/player/character/characters-equipment/modules/item-composites/item-composites.module.code.ts"
import type { ArmorSlotItem } from "akasha/temper/player/character/characters-equipment/modules/loadout-types/loadout-types.module.code.ts"
import { holdSetCatalogFromCheckout } from "akasha/temper/player/character/characters-equipment/modules/sets-all/sets-all.module.test-fixtures.ts"
import { buildHash } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"

holdSetCatalogFromCheckout()
holdSkillCatalogFromCheckout()

const WEARING_NOTHING =
  "ATQHgAAAAABgAAf__AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALG0AAAAAAAAAKAAAAAAAAyA"

function headPiece(level: ItemLevel, enchantmentLevel: number): ArmorSlotItem {
  return {
    itemType: "armor",
    data: {
      type: "head",
      weight: getArmorWeightId(1),
      trait: getArmorTraitId(1),
      enchantment: getArmorEnchantId(1),
      set: getSetId(40),
      quality: "legendary",
      enchantmentSubtype: 20,
      enchantmentLevel,
      level,
    },
  }
}

function wearing(head: ArmorSlotItem): CharacterState {
  const bare = decodeBuild(buildHash(WEARING_NOTHING))
  if (bare === null) throw new Error("the bare build decodes")
  return {
    ...bare,
    equipment: { ...bare.equipment, armor: { ...bare.equipment.armor, head } },
  }
}

test("a piece's item level and glyph level are read back beside its glyph subtype", () => {
  const head = decodeBuild(encodeBuild(wearing(headPiece(26, 45))))?.equipment.armor.head.data
  expect(head?.enchantmentSubtype).toBe(20)
  expect(head?.enchantmentLevel).toBe(45)
  expect(head?.level).toBe(26)
})

test("a piece with no glyph level said is read back with none", () => {
  const head = decodeBuild(encodeBuild(wearing(headPiece("CP160", 0))))?.equipment.armor.head.data
  expect(head?.enchantmentLevel).toBeUndefined()
  expect(head?.level).toBe("CP160")
})
