import { expect, test } from "bun:test"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"
import { classMasteriesOf } from "akasha/temper/player/character/skill/modules/reading-class-masteries/reading-class-masteries.module.code.ts"

holdSkillCatalogFromCheckout()

test("the class passives a reading keys by place name its class masteries in hash place order", () => {
  const classPassives = {
    "1": { abilityId: 263605, name: "Above and Beyond" },
    "2": { abilityId: 45060, name: "Hemorrhage" },
    "3": { abilityId: 263604, name: "An Eye for Exploitation" },
  }
  expect(classMasteriesOf(classPassives)).toEqual(["an-eye-for-exploitation", "above-and-beyond"])
})

test("class passives held as a list name their class masteries alike", () => {
  expect(classMasteriesOf([{ abilityId: 263522 }, { abilityId: 263520 }])).toEqual([
    "wild-adaptation",
    "green-keepers-hide",
  ])
})

test("a reading stating no class passives names no class mastery", () => {
  expect(classMasteriesOf(undefined)).toEqual([])
})
