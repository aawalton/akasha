import { expect, test } from "bun:test"
import { POTION_EFFECTS_OPTIONS } from "akasha/temper/items/rules/core/modules/potion-effects-filter/potion-effects-filter.module.code.ts"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"

holdSkillCatalogFromCheckout()

test("the potion effect options keep the values saved rules hold, labelled by the restore pages", () => {
  expect(POTION_EFFECTS_OPTIONS).toEqual([
    { value: "health-restore", label: "Restore Health" },
    { value: "magicka-restore", label: "Restore Magicka" },
    { value: "stamina-restore", label: "Restore Stamina" },
  ])
})
