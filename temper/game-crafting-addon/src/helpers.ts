import { Furnisher } from "./data/furnisher"
import { RawItemTypes } from "./data/item-types"
import { state } from "./state"

export function SplitLink(link: string, nr: number): number | false | undefined {
  const split: Record<number, string> = [...SplitString(":", link)]
  if (split[nr] !== undefined) {
    return tonumber(split[nr])
  } else {
    return false
  }
}

export function ToChat(message: string): undefined {
  const chat = CHAT_SYSTEM.textEntry.GetText()
  StartChatInput(chat + message)
}

export function toSet(list: (string | number)[]): Record<string | number, true> {
  const set: Record<string | number, true> = {}
  for (const [, l] of ipairs(list)) {
    set[l] = true
  }
  return set
}

export function StripLink(link: string): string {
  if (CanItemLinkBeVirtual(link)) {
    return NakedLink(link)
  }

  const parts: (string | number)[] = [...SplitString(":", link)]
  const split: Record<number, string | number> = parts
  if (split[1] !== undefined) {
    split[1] = "|H0"
  }
  if (split[19] !== undefined) {
    split[19] = 0
  }
  if (split[20] !== undefined) {
    split[20] = 0
  }
  if (split[21] !== undefined) {
    split[21] = 0
  }
  if (split[22] !== undefined) {
    split[22] = "0"
  }
  return table.concat(parts, ":")
}

export function NakedLink(link: string): string {
  const split: Record<number, string> = [...SplitString(":", link)]
  return "|H0:item:" + split[3] + ":0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h"
}

export function Texture(link: string, width?: number, height?: number): string {
  width = width === undefined ? 18 : width
  height = height === undefined ? width : height
  return "|t" + width + ":" + height + ":" + link + "|t"
}

export function UpdateMatsInfo(link: string): undefined {
  const account = state.Account
  const [itemType] = GetItemLinkItemType(link)
  if (RawItemTypes[itemType] === true && account.materials[link] === undefined) {
    const refinedLink = NakedLink(GetItemLinkRefinedMaterialItemLink(link, 0))
    account.materials[link] = { raw: true, link: refinedLink }
    account.materials[refinedLink] = { raw: false, link: link }
  }
}

export function NilCheck(
  root: object,
  defaultValue: unknown,
  ...args: (string | number)[]
): unknown {
  let current = istable(root) ? root : error("NilCheck: root is not a table")
  for (const [i, key] of ipairs(args)) {
    const next = current[key]
    if (next === undefined) {
      return defaultValue
    }
    if (i === args.length) {
      return next
    }
    current = istable(next) ? next : error("NilCheck: intermediate value is not a table")
  }

  return current
}

export function NilCheckSet(root: object, set: unknown, ...args: (string | number)[]): unknown {
  let current = istable(root) ? root : error("NilCheckSet: root is not a table")
  for (const [i, key] of ipairs(args)) {
    if (current[key] === undefined) {
      current[key] = i !== args.length ? {} : set
    }
    if (i === args.length) {
      current[key] = set
      return current[key]
    }
    const next = current[key]
    current = istable(next) ? next : error("NilCheckSet: intermediate value is not a table")
  }

  return current
}

export function NilCheckSetIfNil(
  root: object,
  defaultValue: unknown,
  ...args: (string | number)[]
): unknown {
  let current = istable(root) ? root : error("NilCheckSetIfNil: root is not a table")
  for (const [i, key] of ipairs(args)) {
    if (current[key] === undefined) {
      current[key] = i !== args.length ? {} : defaultValue
    }
    if (i === args.length) {
      return current[key]
    }
    const next = current[key]
    current = istable(next) ? next : error("NilCheckSetIfNil: intermediate value is not a table")
  }

  return current
}

export function IsPublishedItem(itemId: number): boolean {
  const itemName: string | undefined = GetItemLinkName(
    string.format("|H1:item:%u:6:1:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h", itemId)
  )
  return itemName !== undefined && itemName !== ""
}

export function IsPublishedAchievement(achievementId: number): boolean {
  const achievementName: string | undefined = GetAchievementName(achievementId)
  return achievementName !== undefined && achievementName !== ""
}

export function FilterPublishedItems(itemIds: Record<number, number>): number[] {
  const publishedItemIds: number[] = []
  for (const [, itemId] of pairs(itemIds)) {
    if (IsPublishedItem(itemId)) {
      publishedItemIds.push(itemId)
    }
  }
  return publishedItemIds
}

if (LibChatMessage !== undefined) {
  state.Chat = LibChatMessage("Temper Crafting", "TC")
}

export const Chat: ChatProxy = {
  Print(str) {
    state.Chat.Print(str)
  },
}

export function FindUnidentifiedFurnishingRecipes(startIndex: number, endIndex: number): undefined {
  const exists: Record<number, true> = {}
  for (const [, recipeId] of ipairs(Furnisher.recipelist)) {
    exists[recipeId] = true
  }

  const unknown: number[] = []

  const suffix = ":" + 364 + ":" + 50 + ":0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:10000:0|h|h"

  d("Searching in range " + startIndex + " .. " + endIndex)

  for (let i = startIndex; i <= endIndex; i++) {
    let isUnknown = false
    let link = ""
    if (exists[i] === undefined) {
      link = "|H1:item:" + i + suffix
      const name = GetItemLinkName(link)
      if (string.find(name, "Praxis:")[0] !== undefined) {
        isUnknown = true
      } else if (string.find(name, "Blueprint:")[0] !== undefined) {
        isUnknown = true
      } else if (string.find(name, "Diagram:")[0] !== undefined) {
        isUnknown = true
      } else if (string.find(name, "Pattern:")[0] !== undefined) {
        isUnknown = true
      } else if (string.find(name, "Formula:")[0] !== undefined) {
        isUnknown = true
      } else if (string.find(name, "Sketch:")[0] !== undefined) {
        isUnknown = true
      } else if (string.find(name, "Design:")[0] !== undefined) {
        isUnknown = true
      } else if (string.find(name, "Recipe:")[0] !== undefined) {
        isUnknown = true
      }
    }
    if (isUnknown) {
      d(i + " - " + link)
      unknown.push(i)
    }
  }
  if (unknown.length > 1) {
    let unknownIds = ""
    for (const [, id] of ipairs(unknown)) {
      unknownIds = unknownIds + id + ","
    }
    d(unknownIds)
  } else {
    d("No unknown furnishing recipes found in range.")
  }
}

export function ListWayshrines(startIndex?: number, endIndex?: number): undefined {
  startIndex = startIndex === undefined ? 1 : startIndex
  endIndex = endIndex === undefined ? GetNumFastTravelNodes() : endIndex
  if (endIndex > GetNumFastTravelNodes()) {
    endIndex = GetNumFastTravelNodes()
  }
  for (let i = startIndex; i <= endIndex; i++) {
    const [, name] = GetFastTravelNodeInfo(i)
    d(i + ": " + name)
  }
}

export function HideControl(controlName: string): undefined {
  const control = WINDOW_MANAGER.GetControlByName(controlName)
  if (control !== undefined) {
    control.SetHidden(true)
    control.ClearAnchors()
  }
}
