import { expect, test } from "bun:test"
import {
  holdSkillCatalog,
  skillCatalog,
  skillCatalogOf,
  tableView,
} from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.code.ts"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"

test("the skill pages read as a catalogue opening on the empty skill and closing on the scribed", () => {
  const read = holdSkillCatalogFromCheckout()
  expect(read.skills.ids[0]).toBe("no-skill")
  expect(read.scribedSkills.ids.length).toBeGreaterThan(0)
  const tail = read.skills.ids.slice(-read.scribedSkills.ids.length)
  expect(tail.join(" ")).toBe(read.scribedSkills.ids.join(" "))
  expect(skillCatalog()).toBe(read)
})

test("a table read from the catalogue reads whichever catalogue is held when it is read", () => {
  const read = holdSkillCatalogFromCheckout()
  const view = tableView(() => skillCatalog().skills)
  const first = read.skills.list[0]
  if (first === undefined) throw new Error("the checkout holds no skill")
  holdSkillCatalog(skillCatalogOf({ skills: [first], scribedSkills: [] }))
  expect(view.ids).toEqual([first.id])
  holdSkillCatalogFromCheckout()
  expect(view.ids).toEqual(read.skills.ids)
})
