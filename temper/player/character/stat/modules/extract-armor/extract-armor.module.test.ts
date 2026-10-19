import { expect, test } from "bun:test"
import { createEmptyCharacter } from "akasha/temper/player/character/build/modules/build-factory/build-factory.module.code.ts"
import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import type { ShieldItem } from "akasha/temper/player/character/characters-equipment/modules/item-composites/item-composites.module.code.ts"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"
import { extractArmor } from "akasha/temper/player/character/stat/modules/extract-armor/extract-armor.module.code.ts"
import { holdMetricCatalogFromCheckout } from "akasha/temper/player/character/stat/modules/metrics/metrics.module.test-fixtures.ts"
import type { TranslationContext } from "akasha/temper/player/character/stat/modules/pipeline-types/pipeline-types.module.code.ts"

holdMetricCatalogFromCheckout()
holdSkillCatalogFromCheckout()

const DIVINES_SHIELD: ShieldItem = {
  type: "shield",
  weight: "shield",
  trait: "divines",
  enchantment: "no-enchant",
  set: "no-set",
  quality: "legendary",
}

function shieldOnFrontBar(): CharacterState {
  const build = createEmptyCharacter()
  const front = build.equipment["primary-weapon-bar"]
  return {
    ...build,
    equipment: {
      ...build.equipment,
      "primary-weapon-bar": { ...front, "off-hand": { itemType: "shield", data: DIVINES_SHIELD } },
    },
  }
}

function piecesCounted(bar: TranslationContext["bar"]): readonly string[] {
  const context: TranslationContext = { bar }
  extractArmor(shieldOnFrontBar(), context)
  return (context.armorItems ?? []).map((piece) => piece.type)
}

test("a shield on the active bar is among the armor a mundus stone's Divines counts", () => {
  expect(piecesCounted("primary-weapon-bar")).toContain("shield")
})

test("a shield on the other bar is not counted", () => {
  expect(piecesCounted("backup-weapon-bar")).not.toContain("shield")
})

test("the seven body pieces are counted on either bar", () => {
  expect(piecesCounted("backup-weapon-bar")).toHaveLength(7)
})
