import { asNumber, asNumberArray, asString } from "../casts"
import { Internal, Public } from "../internal/state"
import { LCCC } from "../lccc"
import type { Category, CharacterListEntry, CharacterRecord, Server } from "../types"

function asCharacterRecord(value: CharacterRecord | undefined): CharacterRecord {
  return value as CharacterRecord
}

type CategoryByLuaIndex = Record<number, Category | undefined>
function asCategoryByLuaIndex(value: Category[]): CategoryByLuaIndex {
  return value as CategoryByLuaIndex
}

type ServerList = Server[]
function asServerList(value: Array<string | number>): ServerList {
  return value as ServerList
}

type Timestamp = number | undefined
function asTimestamp(value: unknown): Timestamp {
  return value as Timestamp
}

Public.ITEM_CATEGORY_NONE = 0
Public.ITEM_CATEGORY_RECIPE = 1
Public.ITEM_CATEGORY_PLAN = 2
Public.ITEM_CATEGORY_MOTIF = 3
Public.ITEM_CATEGORY_SCRIBING = 4

Public.ITEM_CATEGORIES = {
  [Public.ITEM_CATEGORY_RECIPE]: asString(Internal.CategoryLabels[Internal.CATEGORY_RECIPE]),
  [Public.ITEM_CATEGORY_PLAN]: asString(Internal.CategoryLabels[Internal.CATEGORY_PLAN]),
  [Public.ITEM_CATEGORY_MOTIF]: asString(Internal.CategoryLabels[Internal.CATEGORY_MOTIF]),
  [Public.ITEM_CATEGORY_SCRIBING]: asString(Internal.CategoryLabels[Internal.CATEGORY_SCRIBING]),
}

Public.KNOWLEDGE_INVALID = Internal.KNOWLEDGE_INVALID
Public.KNOWLEDGE_NODATA = Internal.KNOWLEDGE_NODATA
Public.KNOWLEDGE_KNOWN = Internal.KNOWLEDGE_KNOWN
Public.KNOWLEDGE_UNKNOWN = Internal.KNOWLEDGE_UNKNOWN

Public.EVENT_INITIALIZED = 1
Public.EVENT_UPDATE_REFRESH = 2

Public.GetServerList = function (this: void): Server[] {
  return asServerList(LCCC.GetSortedKeys(Internal.characters, Internal.server))
}

Public.GetFilteredServerList = function (this: void): Server[] {
  if (Internal.cachedFilteredServerList === undefined) {
    const filtered: Server[] = []
    for (const [i, server] of ipairs(Public.GetServerList())) {
      const [firstKey] = next(Public.GetCharacterList(server))
      if (i === 1 || firstKey !== undefined) {
        filtered.push(server)
      }
    }
    Internal.cachedFilteredServerList = filtered
  }
  return Internal.cachedFilteredServerList
}

Public.GetCharacterList = function (this: void, server?: Server): CharacterListEntry[] {
  if (!Internal.initialized) {
    return []
  }

  const resolvedServer = server ?? Internal.server

  if (Internal.cachedCharLists[resolvedServer] === undefined) {
    const results: CharacterListEntry[] = []

    const byServer = Internal.characters[resolvedServer]
    if (byServer !== undefined) {
      const charIds: string[] = []
      for (const [id] of pairs(byServer)) {
        if (Internal.IsCharacterEnabled(resolvedServer, id)) {
          charIds.push(id)
        }
      }
      Internal.Sort(resolvedServer, charIds, true)

      for (const [_index, id] of ipairs(charIds)) {
        const data = asCharacterRecord(byServer[id])
        results.push({
          id: id,
          account: data.account,
          name: data.name,
        })
      }
    }

    Internal.cachedCharLists[resolvedServer] = results
  }

  return Internal.cachedCharLists[resolvedServer]
}

Public.GetItemLinkFromItemId = Internal.GetItemLink

Public.GetItemName = function (this: void, item): string {
  let resolved = item
  if (type(resolved) === "number") {
    resolved = Public.GetItemLinkFromItemId(asNumber(resolved))
  } else if (type(resolved) !== "string") {
    return ""
  }
  return zo_strformat(SI_TOOLTIP_ITEM_NAME, GetItemLinkName(asString(resolved)))
}

const TRANSLATE_CATEGORY: Record<Category, number> = {
  [Internal.CATEGORY_RECIPE]: Public.ITEM_CATEGORY_RECIPE,
  [Internal.CATEGORY_PLAN]: Public.ITEM_CATEGORY_PLAN,
  [Internal.CATEGORY_MOTIF]: Public.ITEM_CATEGORY_MOTIF,
  [Internal.CATEGORY_SCRIBING]: Public.ITEM_CATEGORY_SCRIBING,
}

Public.GetItemCategory = function (this: void, item): number {
  const [category] = Internal.GetItemCategoryAndQuality(item)

  if (category !== false && category !== undefined) {
    return asNumber(TRANSLATE_CATEGORY[category])
  } else {
    return Public.ITEM_CATEGORY_NONE
  }
}

Public.GetItemKnowledgeForCharacter = function (this: void, item, server?, charId?) {
  const [category] = Internal.GetItemCategoryAndQuality(item)
  if (!Internal.initialized) {
    return category !== false && category !== undefined
      ? Public.KNOWLEDGE_NODATA
      : Public.KNOWLEDGE_INVALID
  }
  const [itemId, itemLink, styleId] = Internal.TranslateItem(item)
  return Internal.GetItemKnowledge(
    server ?? Internal.server,
    charId ?? Internal.charId,
    category,
    itemId,
    itemLink,
    styleId
  )
}

Public.GetItemKnowledgeList = function (
  this: void,
  item,
  server?,
  includedCharIds?,
  accountFilter?
) {
  const results: CharacterListEntry[] = []

  const [category, qualityRaw] = Internal.GetItemCategoryAndQuality(item)

  if (category !== false && category !== undefined) {
    const resolvedServer = server ?? Internal.server
    const [itemId, itemLink, styleId] = Internal.TranslateItem(item)

    let quality = qualityRaw
    if (category === Internal.CATEGORY_SCRIBING) {
      quality = 1
    }

    for (const [_index, character] of ipairs(Public.GetCharacterList(resolvedServer))) {
      const included = includedCharIds !== undefined && includedCharIds[character.id] === true
      const qualified =
        included ||
        (Internal.AccountFilter(accountFilter, character) === true &&
          Internal.GetEffectiveParameterValue(resolvedServer, character.id, category) >
            asNumber(quality))
      if (qualified) {
        results.push({
          id: character.id,
          account: character.account,
          name: character.name,
          knowledge: Internal.GetItemKnowledge(
            resolvedServer,
            character.id,
            category,
            itemId,
            itemLink,
            styleId
          ),
        })
      }
    }
  }

  return results
}

Public.IsKnowledgeUsable = function (this: void, knowledge): boolean {
  return knowledge === Public.KNOWLEDGE_KNOWN || knowledge === Public.KNOWLEDGE_UNKNOWN
}

Public.GetItemIdsForCategory = function (this: void, category): number[] {
  if (!Internal.initialized) {
    return []
  }

  const categoryKey: Category | undefined =
    category !== undefined ? asCategoryByLuaIndex(Internal.Categories)[category] : undefined

  if (categoryKey !== undefined) {
    let ids = Internal.idsPublic[categoryKey]
    if (ids === undefined) {
      ids = []
      const blacklist = Internal.InvalidIds
      for (const [_index, id] of ipairs(asNumberArray(Internal.ids[categoryKey]))) {
        if (blacklist[id] !== true) {
          ids.push(id)
        }
      }
      Internal.idsPublic[categoryKey] = ids
    }
    return ids
  } else {
    return []
  }
}

Public.GetSourceItemIdFromResultItem = function (this: void, resultItem): number {
  if (!Internal.initialized) {
    return 0
  }

  if (Internal.cachedResultIds === undefined) {
    const results: Record<number, number> = {}
    for (const [_index, category] of ipairs([
      Public.ITEM_CATEGORY_RECIPE,
      Public.ITEM_CATEGORY_PLAN,
    ])) {
      for (const [_i, itemId] of ipairs(Public.GetItemIdsForCategory(category))) {
        const resultId = GetItemLinkItemId(
          GetItemLinkRecipeResultItemLink(Public.GetItemLinkFromItemId(itemId))
        )
        if (results[resultId] === undefined) {
          results[resultId] = itemId
        }
      }
    }
    Internal.cachedResultIds = results
  }
  const key =
    type(resultItem) === "number" ? asNumber(resultItem) : GetItemLinkItemId(asString(resultItem))
  return Internal.cachedResultIds[key] ?? 0
}

Public.GetMotifStyles = Internal.GetStyleIds

Public.GetStyleAndChapterFromMotif = function (this: void, item) {
  const [itemId, itemLink, styleId] = Internal.TranslateItem(item)
  return Internal.GetMotifStyleAndChapter(itemId, itemLink, styleId)
}

Public.GetMotifItemsFromStyle = Internal.GetStyleMotifItems

Public.GetMotifChapterNames = function (this: void): Array<{ id: number; name: string }> {
  if (Internal.chapters === undefined) {
    const chapters: Array<{ id: number; name: string }> = []

    for (let i = 1; i <= ITEM_STYLE_CHAPTER_MAX_VALUE; i++) {
      chapters.push({
        id: i,
        name: zo_strformat("<<m:1>>", GetString("SI_ITEMSTYLECHAPTER", i), 2),
      })
    }

    table.sort(
      chapters,
      (a: { id: number; name: string }, b: { id: number; name: string }): boolean => {
        return a.name < b.name
      }
    )

    Internal.chapters = chapters
  }

  return Internal.chapters
}

Public.GetMotifStyleQuality = function (this: void, styleId): number {
  return Internal.GetStyleQuality(styleId) + 2
}

Public.GetMotifKnowledgeForCharacter = function (this: void, styleId, chapterId?, ...rest) {
  const resolvedChapterId = chapterId ?? ITEM_STYLE_CHAPTER_ALL

  const items = Public.GetMotifItemsFromStyle(styleId)

  if (type(items) === "table" && items !== undefined) {
    if (
      resolvedChapterId === ITEM_STYLE_CHAPTER_ALL ||
      items.chapters[resolvedChapterId] === undefined
    ) {
      return Public.GetItemKnowledgeForCharacter(asNumber(items.books[0]), ...rest)
    } else {
      return Public.GetItemKnowledgeForCharacter(items.chapters[resolvedChapterId], ...rest)
    }
  } else {
    return Internal.KNOWLEDGE_INVALID
  }
}

Public.GetLastScanTime = function (this: void, server?, charId?): number {
  const resolvedServer = server ?? Internal.server
  const resolvedCharId = charId ?? Internal.charId
  return asTimestamp(Internal.GetCharRawData(resolvedServer, resolvedCharId, "timestamp")) ?? 0
}

Public.GetRawCharacterSettings = function (this: void, server?, charId?) {
  const resolvedServer = server ?? Internal.server
  const resolvedCharId = charId ?? Internal.charId
  return Internal.GetCharacterParams(resolvedServer, resolvedCharId)
}
