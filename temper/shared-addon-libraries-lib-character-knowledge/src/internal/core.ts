import { asNumber, asNumberArray, asRecord, asString } from "../casts"
import { LCCC } from "../lccc"
import type { ChunkedData, ItemDescriptor, ItemInput } from "../types"
import { Internal } from "./state"

function asItemDescriptor(value: ItemInput): ItemDescriptor {
  return value as ItemDescriptor
}

type MaybeChunkedData = ChunkedData | undefined
function asMaybeChunkedData(value: unknown): MaybeChunkedData {
  return value as MaybeChunkedData
}

type StyleIdReturn = number
function asStyleIdReturn(value: number | undefined): StyleIdReturn {
  return value as StyleIdReturn
}

Internal.Msg = function (this: void, text: string): undefined {
  CHAT_ROUTER.AddSystemMessage(text)
}

Internal.MsgTag = function (this: void, text: string): undefined {
  CHAT_ROUTER.AddSystemMessage(string.format("[%s] %s", Internal.name, text))
}

Internal.GetItemLink = function (this: void, itemId: number, linkStyle?: number): string {
  return string.format(
    "|H%d:item:%d:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
    linkStyle ?? LINK_STYLE_DEFAULT,
    itemId
  )
}

Internal.GetCharRawData = function (this: void, server, charId, category) {
  const byServer = Internal.characters[server]
  if (byServer === undefined) {
    return undefined
  }
  const byChar = byServer[charId]
  if (byChar === undefined) {
    return undefined
  }
  return asMaybeChunkedData(asRecord(byChar)[category])
}

Internal.TranslateItem = function (this: void, item: ItemInput) {
  let itemId = 0
  let itemLink = ""
  let styleId = 0
  let styleIdSet = false

  if (type(item) === "number") {
    itemId = asNumber(item)
    itemLink = Internal.GetItemLink(asNumber(item))
  } else if (type(item) === "string") {
    itemId = GetItemLinkItemId(asString(item))
    itemLink = asString(item)
  } else if (type(item) === "table") {
    const desc = asItemDescriptor(item)
    if (type(desc.styleId) === "number") {
      styleId = asNumber(desc.styleId)
      styleIdSet = true
      const data = Internal.GetStyleMotifItems(styleId)
      if (data !== undefined) {
        if (type(desc.chapterId) === "number" && desc.chapterId !== ITEM_STYLE_CHAPTER_ALL) {
          itemId = data.chapters[asNumber(desc.chapterId)] ?? itemId
        } else {
          itemId = data.books[0] ?? itemId
        }
      }
    }
    if (type(desc.itemId) === "number") {
      itemId = asNumber(desc.itemId)
    }
    if (type(desc.itemLink) === "string") {
      itemLink = asString(desc.itemLink)
    }
    if (itemId === 0 && itemLink !== "") {
      itemId = GetItemLinkItemId(itemLink)
    } else if (itemId !== 0 && itemLink === "") {
      itemLink = Internal.GetItemLink(itemId)
    }
  }

  return $multi(itemId, itemLink, asStyleIdReturn(styleIdSet ? styleId : undefined))
}

Internal.GetItemCategoryAndQuality = function (this: void, item: ItemInput) {
  const [itemId, itemLink, styleId] = Internal.TranslateItem(item)
  const [itemType, specializedItemType] = GetItemLinkItemType(itemLink)

  if (itemType === ITEMTYPE_NONE) {
    if (styleId !== undefined) {
      return $multi(Internal.CATEGORY_MOTIF, Internal.GetStyleQuality(styleId))
    } else {
      return $multi(Internal.CATEGORY_INVALID)
    }
  } else if (itemType === ITEMTYPE_RECIPE) {
    const quality = Internal.ItemQualityTranslation[GetItemLinkFunctionalQuality(itemLink)]
    if (
      specializedItemType === SPECIALIZED_ITEMTYPE_RECIPE_PROVISIONING_STANDARD_FOOD ||
      specializedItemType === SPECIALIZED_ITEMTYPE_RECIPE_PROVISIONING_STANDARD_DRINK
    ) {
      return $multi(Internal.CATEGORY_RECIPE, quality)
    } else {
      return $multi(Internal.CATEGORY_PLAN, quality)
    }
  } else if (itemType === ITEMTYPE_RACIAL_STYLE_MOTIF) {
    const [motifStyleId] = Internal.GetMotifStyleAndChapter(itemId)
    return $multi(Internal.CATEGORY_MOTIF, Internal.GetStyleQuality(motifStyleId))
  } else if (
    itemType === ITEMTYPE_CRAFTED_ABILITY ||
    itemType === ITEMTYPE_CRAFTED_ABILITY_SCRIPT
  ) {
    const refId = GetItemLinkItemUseReferenceId(itemLink)
    if (refId > 0) {
      if (itemType === ITEMTYPE_CRAFTED_ABILITY) {
        return $multi(Internal.CATEGORY_SCRIBING, SCRIBING_SLOT_NONE, [itemLink, refId])
      } else {
        return $multi(Internal.CATEGORY_SCRIBING, GetCraftedAbilityScriptScribingSlot(refId), [
          itemLink,
          refId,
        ])
      }
    }
  }

  return $multi(Internal.CATEGORY_NONE)
}

Internal.GetMasterListParam = function (this: void, key: string): number {
  const masterList = Internal.vars.masterList
  if (masterList !== undefined && type(asRecord(masterList)[key]) === "number") {
    return asNumber(asRecord(masterList)[key])
  } else {
    return -1
  }
}

Internal.CanSave = function (this: void, account?: string): boolean {
  const noSave = Internal.vars.noSave
  if (noSave !== undefined && noSave[zo_strlower(account ?? Internal.userId)] === true) {
    return false
  } else {
    return true
  }
}

Internal.GetCaches = function (this: void, server, charId) {
  if (Internal.caches[server] === undefined) {
    Internal.caches[server] = {}
  }
  if (Internal.caches[server][charId] === undefined) {
    Internal.caches[server][charId] = {}
  }
  return Internal.caches[server][charId]
}

Internal.GetKnowledge = function (this: void, server, charId, category) {
  const resolvedServer = server ?? Internal.server

  const caches = Internal.GetCaches(resolvedServer, charId)
  if (caches[category] === undefined) {
    caches[category] = {}
    const data = Internal.GetCharRawData(resolvedServer, charId, category)
    if (data !== undefined) {
      const encoded = LCCC.Unchunk(data)
      let field = 0

      const idList = asNumberArray(Internal.ids[category])

      caches[category][asNumber(idList[0])] = false

      for (const [i, id] of ipairs(idList)) {
        const j = ((i - 1) % Internal.FIELD_BITS) + 1
        if (j === 1) {
          const k = zo_ceil(i / Internal.ENCODE_BITS)
          ;[field] = LCCC.ReadAndDecode(encoded, k, Internal.FIELD_BYTES)
        }
        const bit = BitLShift(1, Internal.FIELD_BITS - j)
        if (BitAnd(field, bit) === bit) {
          caches[category][id] = true
        }
      }
    }
  }
  return caches[category]
}
