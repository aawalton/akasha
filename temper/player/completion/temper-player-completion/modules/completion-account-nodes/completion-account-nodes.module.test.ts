import { describe, expect, test } from "bun:test"
import { TOTAL_GRAND_MASTER_STATIONS } from "akasha/temper/player/completion/modules/completion-progress/completion-progress.module.code.ts"
import {
  accountAchievementNodes,
  accountCollectibleNodes,
  accountTributeNodes,
  grandMasterStationNodes,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-account-nodes/completion-account-nodes.module.code.ts"
import { progressAt } from "akasha/temper/player/completion/temper-player-completion/modules/completion-progress-nodes/completion-progress-nodes.module.code.ts"

describe("accountAchievementNodes", () => {
  const nodes = accountAchievementNodes({
    earnedPoints: 10,
    totalPoints: 30,
    categories: [
      {
        name: "Dungeons",
        earnedPoints: 10,
        totalPoints: 30,
        subCategories: [
          {
            name: "General",
            earnedPoints: 10,
            totalPoints: 30,
            achievements: [
              { achievementId: 7, name: "Done", points: 10, completedSteps: 3, totalSteps: 3 },
              { achievementId: 8, name: "Half", points: 20, completedSteps: 1, totalSteps: 2 },
            ],
          },
        ],
      },
    ],
  })

  test("counts an achievement's points only once every step is done", () => {
    expect(progressAt(nodes, [])).toEqual({ current: 10, total: 30 })
    expect(progressAt(nodes, ["Dungeons", "General", 8])).toEqual({ current: 0, total: 20 })
  })
})

describe("accountCollectibleNodes", () => {
  const nodes = accountCollectibleNodes({
    unlockedCount: 1,
    totalCount: 3,
    categories: [
      {
        categoryIndex: 4,
        name: "Mounts",
        unlockedCount: 1,
        totalCount: 2,
        subCategories: [
          {
            name: "Mounts",
            unlockedCount: 1,
            totalCount: 2,
            collectibles: [
              { id: 1, name: "Horse", unlocked: true },
              { id: 2, name: "Wolf", unlocked: false },
            ],
          },
        ],
      },
      {
        categoryIndex: 5,
        name: "Pets",
        unlockedCount: 0,
        totalCount: 1,
        subCategories: [
          { name: "Cats", unlockedCount: 0, totalCount: 0, collectibles: [] },
          {
            name: "Dogs",
            unlockedCount: 0,
            totalCount: 1,
            collectibles: [{ id: 3, name: "Hound", unlocked: false }],
          },
        ],
      },
    ],
  })

  test("lifts a lone subcategory's collectibles to the category", () => {
    expect(progressAt(nodes, ["4", "1"])).toEqual({ current: 1, total: 1 })
  })

  test("keeps subcategories where a category has more than one", () => {
    expect(progressAt(nodes, ["5", "Dogs", "3"])).toEqual({ current: 0, total: 1 })
    expect(progressAt(nodes, [])).toEqual({ current: 1, total: 3 })
  })
})

describe("accountTributeNodes", () => {
  test("counts the patron's unlock alongside each card upgrade", () => {
    const nodes = accountTributeNodes({
      completedCount: 2,
      totalCount: 3,
      patrons: [
        {
          patronId: 9,
          name: "Saint",
          collectibleId: 90,
          unlocked: true,
          upgradedCount: 2,
          totalCount: 3,
          cards: [
            { cardIndex: 1, baseCardName: "A", upgradeCardName: "A+", upgraded: true },
            { cardIndex: 2, baseCardName: "B", upgradeCardName: "B+", upgraded: false },
          ],
        },
      ],
    })
    expect(progressAt(nodes, ["9"])).toEqual({ current: 2, total: 3 })
    expect(progressAt(nodes, ["9", "9-unlock"])).toEqual({ current: 1, total: 1 })
  })
})

describe("grandMasterStationNodes", () => {
  test("offers the four crafts at nothing when no station is captured", () => {
    const nodes = grandMasterStationNodes(undefined)
    expect(nodes.map((node) => node.label)).toEqual([
      "Blacksmithing",
      "Clothier",
      "Jewelrycrafting",
      "Woodworking",
    ])
    expect(progressAt(nodes, [])).toEqual({ current: 0, total: 4 * TOTAL_GRAND_MASTER_STATIONS })
  })

  test("counts each craft's unlocked stations, sorted by name", () => {
    const nodes = grandMasterStationNodes({
      2: { name: "Woodworking", unlocked: [1] },
      1: { name: "Clothier", unlocked: [1, 2] },
    })
    expect(nodes.map((node) => [node.label, node.count])).toEqual([
      ["Clothier", 2],
      ["Woodworking", 1],
    ])
  })
})
