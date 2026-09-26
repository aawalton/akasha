import { expect, test } from "bun:test"
import { skillCatalog } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.code.ts"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"

test("the skill pages read as the catalogue the tables hold, place for place", () => {
  const tables = skillCatalog()
  const pages = holdSkillCatalogFromCheckout()
  expect(pages.skills.ids).toEqual(tables.skills.ids)
  expect(pages.skills.data).toEqual(tables.skills.data)
  expect(pages.scribedSkills.ids).toEqual(tables.scribedSkills.ids)
  expect(pages.scribedSkills.data).toEqual(tables.scribedSkills.data)
})
