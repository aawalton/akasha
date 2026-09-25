import { expect, test } from "bun:test"
import { accountArenas } from "akasha/temper/catalog/pursuit/temper-achievement-category/pages/account-arenas/account-arenas.temper-achievement-category.ts"
import { completionCatalogsFrom } from "akasha/temper/player/completion/temper-player-completion/modules/completion-catalogs/completion-catalogs.module.code.ts"

const ACHIEVEMENT_ROW = {
  id: "an-id",
  slug: "account-arenas-maelstrom-arena",
  title: "Maelstrom Arena",
  category: "account",
  displayOrder: 3,
  parent: `temper-achievement-category/${accountArenas.slug}`,
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
