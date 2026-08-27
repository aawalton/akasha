import "./test-eso-load-globals"

import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { isItemKnown, isItemUnlockable, isKnowledgeItemLink } from "./rules-core-overrides"

function getNum(key: string): number {
  const v = Reflect.get(globalThis, key)
  if (typeof v !== "number") throw new Error(`expected numeric global ${key}`)
  return v
}

const STYLE_PAGE_SPEC = getNum("SPECIALIZED_ITEMTYPE_COLLECTIBLE_STYLE_PAGE")
const STYLE_PAGE_COLLECTIBLE_ID = 13982
const NON_RECIPE_ITEMTYPE = 999_999
const STYLE_PAGE_LINK = "|H1:item:219817:124:1:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h"

const STUBBED_FNS = [
  "GetItemLinkItemType",
  "GetItemLinkItemUseType",
  "GetItemLinkContainerCollectibleId",
  "IsCollectibleUnlocked",
] as const

const saved = new Map<string, unknown>()

function installStylePageWorld(opts: { collectibleId: number; unlocked: boolean }): undefined {
  Reflect.set(globalThis, "GetItemLinkItemType", (_l: string): [number, number] => [
    NON_RECIPE_ITEMTYPE,
    STYLE_PAGE_SPEC,
  ])
  Reflect.set(globalThis, "GetItemLinkItemUseType", (_l: string): number => 0)
  Reflect.set(
    globalThis,
    "GetItemLinkContainerCollectibleId",
    (_l: string): number => opts.collectibleId
  )
  Reflect.set(
    globalThis,
    "IsCollectibleUnlocked",
    (id: number): boolean => opts.unlocked && id === opts.collectibleId
  )
}

beforeEach(() => {
  saved.clear()
  for (const key of STUBBED_FNS) saved.set(key, Reflect.get(globalThis, key))
})

afterEach(() => {
  for (const [key, value] of saved) Reflect.set(globalThis, key, value)
})

describe("style-page knowledge resolution", () => {
  test("isKnowledgeItemLink: a style page is a knowledge item", () => {
    installStylePageWorld({ collectibleId: STYLE_PAGE_COLLECTIBLE_ID, unlocked: true })
    expect(isKnowledgeItemLink(STYLE_PAGE_LINK, NON_RECIPE_ITEMTYPE)).toBe(true)
  })

  test("isItemKnown: a collected style page is known", () => {
    installStylePageWorld({ collectibleId: STYLE_PAGE_COLLECTIBLE_ID, unlocked: true })
    expect(isItemKnown(STYLE_PAGE_LINK, NON_RECIPE_ITEMTYPE)).toBe(true)
  })

  test("isItemKnown: an uncollected style page is not known", () => {
    installStylePageWorld({ collectibleId: STYLE_PAGE_COLLECTIBLE_ID, unlocked: false })
    expect(isItemKnown(STYLE_PAGE_LINK, NON_RECIPE_ITEMTYPE)).toBe(false)
  })

  test("isItemKnown: an unresolvable collectible id yields undefined", () => {
    installStylePageWorld({ collectibleId: 0, unlocked: false })
    expect(isItemKnown(STYLE_PAGE_LINK, NON_RECIPE_ITEMTYPE)).toBeUndefined()
  })

  test("isItemUnlockable: a collected style page cannot be unlocked", () => {
    installStylePageWorld({ collectibleId: STYLE_PAGE_COLLECTIBLE_ID, unlocked: true })
    expect(isItemUnlockable(STYLE_PAGE_LINK, NON_RECIPE_ITEMTYPE)).toBe(false)
  })

  test("isItemUnlockable: an uncollected style page can be unlocked", () => {
    installStylePageWorld({ collectibleId: STYLE_PAGE_COLLECTIBLE_ID, unlocked: false })
    expect(isItemUnlockable(STYLE_PAGE_LINK, NON_RECIPE_ITEMTYPE)).toBe(true)
  })
})
