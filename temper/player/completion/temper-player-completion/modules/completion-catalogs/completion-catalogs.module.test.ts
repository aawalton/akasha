import { expect, test } from "bun:test"
import { accountArenas } from "akasha/temper/catalog/pursuit/temper-achievement-category/pages/account-arenas/account-arenas.temper-achievement-category.ts"
import { alchemy } from "akasha/temper/catalog/pursuit/temper-craft-type/pages/alchemy.temper-craft-type.ts"
import { clothing } from "akasha/temper/catalog/pursuit/temper-craft-type/pages/clothing.temper-craft-type.ts"
import { temperCraftType } from "akasha/temper/catalog/pursuit/temper-craft-type/temper-craft-type.page-type.ts"
import { completionCatalogsFrom } from "akasha/temper/player/completion/temper-player-completion/modules/completion-catalogs/completion-catalogs.module.code.ts"
import { arenas } from "akasha/temper/player/progress/temper-activity-category/pages/arenas.temper-activity-category.ts"

const ACHIEVEMENT_ROW = {
  id: "an-id",
  slug: "account-arenas-maelstrom-arena",
  title: "Maelstrom Arena",
  category: "account",
  displayOrder: 3,
  parent: `temper-achievement-category/${accountArenas.slug}`,
  activity: `temper-activity-category/${arenas.slug}`,
  achievements: [
    {
      id: "an-entry-id",
      esoAchievementId: 1304,
      name: "Maelstrom Arena Champion",
      achievementPoints: 50,
      totalSteps: 1,
    },
  ],
}

test("a catalog row is narrowed to the keys named, and the page it names is a bare name", async () => {
  const catalogs = await completionCatalogsFrom(async (pageType) =>
    pageType === "temper-achievement-category" ? [ACHIEVEMENT_ROW] : []
  )
  expect(catalogs.achievementCategories).toEqual([
    {
      slug: "account-arenas-maelstrom-arena",
      title: "Maelstrom Arena",
      category: "account",
      displayOrder: 3,
      parent: accountArenas.slug,
      activity: arenas.slug,
      achievements: [
        {
          esoAchievementId: 1304,
          name: "Maelstrom Arena Champion",
          achievementPoints: 50,
          totalSteps: 1,
        },
      ],
    },
  ])
  expect(catalogs.questZones).toEqual([])
})

test("a craft type no research line hangs beneath is left out of the craft types", async () => {
  const researched = { slug: clothing.slug, title: clothing.title, esoCraftTypeId: 2 }
  const unresearched = { slug: alchemy.slug, title: alchemy.title, esoCraftTypeId: 4 }
  const line: Record<string, unknown> = {
    slug: "a-line",
    title: "A Line",
    displayOrder: 1,
    parent: `${temperCraftType.slug}/${clothing.slug}`,
  }
  const catalogs = await completionCatalogsFrom(async (pageType) => {
    if (pageType === "temper-craft-type") return [researched, unresearched]
    return pageType === "temper-research-line" ? [line] : []
  })
  expect(catalogs.craftTypes).toEqual([researched])
})
