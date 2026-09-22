import { describe, expect, test } from "bun:test"
import { getCompletionCardTab } from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-tab/completion-card-tab.module.code.ts"
import {
  type AchievementHeading,
  composeCompletionCategoryTree,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-category-tree-composed/completion-category-tree-composed.module.code.ts"

const ACCOUNT_HEADINGS: readonly AchievementHeading[] = [
  { name: "Alliance War", subCategories: [{ name: "Emperor" }] },
  { name: "Imperial City", subCategories: [] },
]

const CHARACTER_HEADINGS: readonly AchievementHeading[] = [
  { name: "Character Quests", subCategories: [{ name: "Main Quest" }] },
]

describe("the tab the static tree answers with", () => {
  test("a card answers for the tab that card is shown under", () => {
    expect(getCompletionCardTab("account-achievements")).toBe("account")
    expect(getCompletionCardTab("character-achievements")).toBe("characters")
    expect(getCompletionCardTab("companion-rapport")).toBe("companions")
  })

  test("an identifier no card and nothing beneath a card carries answers for no tab", () => {
    expect(getCompletionCardTab("nothing-of-the-kind")).toBeUndefined()
  })

  test("a card under a tab the window never shows answers for no tab", () => {
    expect(getCompletionCardTab("guild-sales")).toBeUndefined()
    expect(getCompletionCardTab("dungeon-sets")).toBeUndefined()
  })

  test("an achievement heading answers for no tab while nothing is hung", () => {
    expect(getCompletionCardTab("Alliance War")).toBeUndefined()
    expect(getCompletionCardTab("Character Quests")).toBeUndefined()
  })
})

describe("the tab a composed tree answers with", () => {
  const tree = composeCompletionCategoryTree(ACCOUNT_HEADINGS, CHARACTER_HEADINGS)

  test("an account achievement heading answers for the account tab", () => {
    expect(getCompletionCardTab("Alliance War", tree)).toBe("account")
    expect(getCompletionCardTab("Imperial City", tree)).toBe("account")
  })

  test("a character achievement heading answers for the characters tab", () => {
    expect(getCompletionCardTab("Character Quests", tree)).toBe("characters")
  })

  test("a subheading answers for the tab of the card its heading hangs beneath", () => {
    expect(getCompletionCardTab("Emperor", tree)).toBe("account")
    expect(getCompletionCardTab("Main Quest", tree)).toBe("characters")
  })

  test("every card answers as it did before any heading was hung", () => {
    expect(getCompletionCardTab("account-achievements", tree)).toBe("account")
    expect(getCompletionCardTab("lore-library", tree)).toBe("account")
    expect(getCompletionCardTab("skill-lines", tree)).toBe("characters")
    expect(getCompletionCardTab("companion-level", tree)).toBe("companions")
  })

  test("a heading hung beneath both achievement cards answers for neither tab", () => {
    const shared = composeCompletionCategoryTree(
      [{ name: "Crafting", subCategories: [] }],
      [{ name: "Crafting", subCategories: [] }]
    )
    expect(getCompletionCardTab("Crafting", shared)).toBeUndefined()
  })

  test("an identifier under two tabs in the static tree answers for neither", () => {
    expect(getCompletionCardTab("grimoires")).toBeUndefined()
    expect(getCompletionCardTab("grimoires", tree)).toBeUndefined()
  })

  test("composing leaves the answers the static tree gives alone", () => {
    composeCompletionCategoryTree(ACCOUNT_HEADINGS, CHARACTER_HEADINGS)
    expect(getCompletionCardTab("Alliance War")).toBeUndefined()
    expect(getCompletionCardTab("account-achievements")).toBe("account")
  })
})
