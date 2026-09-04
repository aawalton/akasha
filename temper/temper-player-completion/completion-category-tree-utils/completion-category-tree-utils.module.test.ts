import { describe, expect, test } from "bun:test"
import { COMPLETION_CATEGORY_TREE_STATIC } from "../completion-category-tree/completion-category-tree.module.code.ts"
import {
  ACCOUNT_ACHIEVEMENTS_CARD_ID,
  type AchievementHeading,
  composeCompletionCategoryTree,
} from "../completion-category-tree-composed/completion-category-tree-composed.module.code.ts"
import type { CompletionCategoryTree } from "../completion-category-tree-types/completion-category-tree-types.module.code.ts"
import {
  getCompletionNodeChildren,
  getCompletionNodePath,
} from "./completion-category-tree-utils.module.code.ts"

const ACCOUNT_HEADINGS: readonly AchievementHeading[] = [
  { name: "Crafting", subCategories: [{ name: "Enchanting" }, { name: "Provisioning" }] },
]

const CHARACTER_HEADINGS: readonly AchievementHeading[] = [
  { name: "Crafting", subCategories: [{ name: "Enchanting" }] },
]

const TREE: CompletionCategoryTree = composeCompletionCategoryTree(
  ACCOUNT_HEADINGS,
  CHARACTER_HEADINGS
)

describe("the tree these readings are taken over", () => {
  test("the scribing card sits under both account and characters with the same child ids", () => {
    const account = TREE.account.find((card) => card.id === "account-scribing-knowledge")
    const characters = TREE.characters.find((card) => card.id === "scribing-knowledge")
    expect(account?.children?.map((child) => child.id)).toEqual(["grimoires", "scripts"])
    expect(characters?.children?.map((child) => child.id)).toEqual(["grimoires", "scripts"])
  })

  test("the account cards are not held in the order their names would sort to", () => {
    const names = TREE.account.map((card) => card.name)
    expect(names).not.toEqual([...names].sort((a, b) => a.localeCompare(b)))
  })
})

describe("getCompletionNodePath", () => {
  test("a card is its own whole path", () => {
    expect(getCompletionNodePath("lore-library", TREE)).toEqual([
      { id: "lore-library", name: "Lore Library" },
    ])
  })

  test("a path runs from the card down through every ancestor to the node itself", () => {
    expect(getCompletionNodePath("focusScripts", TREE)).toEqual([
      { id: "account-scribing-knowledge", name: "Skill Scribing" },
      { id: "scripts", name: "Scripts" },
      { id: "focusScripts", name: "Focus Scripts" },
    ])
  })

  test("an identifier under two tabs is answered under account, the first tab", () => {
    const path = getCompletionNodePath("scripts", TREE)
    expect(path[0]?.id).toBe("account-scribing-knowledge")
    expect(path).toHaveLength(2)
  })

  test("a node under characters alone is found there", () => {
    expect(getCompletionNodePath("skyshards", TREE)).toEqual([
      { id: "skill-points", name: "Skill Points" },
      { id: "skyshards", name: "Skyshards" },
    ])
  })

  test("a card under companions is found there", () => {
    expect(getCompletionNodePath("companion-rapport", TREE)).toEqual([
      { id: "companion-rapport", name: "Companion Rapport" },
    ])
  })

  test("a node absent from the tree has no path", () => {
    expect(getCompletionNodePath("no-such-node", TREE)).toEqual([])
  })

  test("the empty identifier matches nothing rather than the first card", () => {
    expect(getCompletionNodePath("", TREE)).toEqual([])
  })

  test("a step of a path carries its id and its name and nothing else", () => {
    const [card] = getCompletionNodePath("account-scribing-knowledge", TREE)
    expect(Object.keys(card ?? {}).sort()).toEqual(["id", "name"])
  })

  test("an achievement heading is reachable only once the headings are hung", () => {
    expect(getCompletionNodePath("Crafting", TREE)).toEqual([
      { id: "account-achievements", name: "Achievements" },
      { id: "Crafting", name: "Crafting" },
    ])
    expect(getCompletionNodePath("Crafting", composeCompletionCategoryTree([], []))).toEqual([])
  })

  test("an achievement subheading is reached three deep", () => {
    expect(getCompletionNodePath("Provisioning", TREE)).toEqual([
      { id: "account-achievements", name: "Achievements" },
      { id: "Crafting", name: "Crafting" },
      { id: "Provisioning", name: "Provisioning" },
    ])
  })
})

describe("getCompletionNodeChildren", () => {
  test("naming no node asks for the cards the tab itself holds, in the tree's order", () => {
    expect(getCompletionNodeChildren(undefined, "account", TREE).map((ref) => ref.id)).toEqual(
      COMPLETION_CATEGORY_TREE_STATIC.account.map((card) => card.id)
    )
    expect(getCompletionNodeChildren(undefined, "companions", TREE).map((ref) => ref.id)).toEqual(
      COMPLETION_CATEGORY_TREE_STATIC.companions.map((card) => card.id)
    )
  })

  test("the cards a tab holds are not answered in the order their names sort to", () => {
    const names = getCompletionNodeChildren(undefined, "account", TREE).map((ref) => ref.name)
    expect(names).not.toEqual([...names].sort((a, b) => a.localeCompare(b)))
  })

  test("a card holding children answers them in the tree's order", () => {
    expect(getCompletionNodeChildren("account-scribing-knowledge", "account", TREE)).toEqual([
      { id: "grimoires", name: "Grimoires" },
      { id: "scripts", name: "Scripts" },
    ])
  })

  test("a node below a card answers its own children, unsorted", () => {
    expect(getCompletionNodeChildren("scripts", "account", TREE).map((ref) => ref.name)).toEqual([
      "Focus Scripts",
      "Signature Scripts",
      "Affix Scripts",
    ])
  })

  test("a card holding no children answers an empty list", () => {
    expect(getCompletionNodeChildren("lore-library", "account", TREE)).toEqual([])
  })

  test("a leaf below a card answers an empty list", () => {
    expect(getCompletionNodeChildren("focusScripts", "account", TREE)).toEqual([])
  })

  test("a node absent from the tab answers an empty list though another tab holds it", () => {
    expect(getCompletionNodeChildren("skill-points", "characters", TREE)).toHaveLength(5)
    expect(getCompletionNodeChildren("skill-points", "account", TREE)).toEqual([])
    expect(getCompletionNodeChildren("companion-level", "account", TREE)).toEqual([])
  })

  test("a node absent from the whole tree answers an empty list", () => {
    expect(getCompletionNodeChildren("no-such-node", "account", TREE)).toEqual([])
  })

  test("a child carries its id and its name and nothing else", () => {
    const [child] = getCompletionNodeChildren("account-scribing-knowledge", "account", TREE)
    expect(Object.keys(child ?? {}).sort()).toEqual(["id", "name"])
  })

  test("a child holding children of its own is answered without them", () => {
    const children = getCompletionNodeChildren("account-scribing-knowledge", "account", TREE)
    const scripts = children.find((ref) => ref.id === "scripts")
    expect(scripts).toEqual({ id: "scripts", name: "Scripts" })
  })

  test("the achievement card answers the headings hung on it, under its own tab", () => {
    expect(getCompletionNodeChildren(ACCOUNT_ACHIEVEMENTS_CARD_ID, "account", TREE)).toEqual([
      { id: "Crafting", name: "Crafting" },
    ])
  })

  test("the achievement card answers nothing before the headings are hung", () => {
    const bare = composeCompletionCategoryTree([], [])
    expect(getCompletionNodeChildren(ACCOUNT_ACHIEVEMENTS_CARD_ID, "account", bare)).toEqual([])
  })

  test("a heading under one tab answers its own subheadings rather than the other tab's", () => {
    expect(getCompletionNodeChildren("Crafting", "account", TREE).map((ref) => ref.id)).toEqual([
      "Enchanting",
      "Provisioning",
    ])
    expect(getCompletionNodeChildren("Crafting", "characters", TREE).map((ref) => ref.id)).toEqual([
      "Enchanting",
    ])
  })
})
