import { asNumber, asNumberArray, asRecord, asString } from "../casts"
import { LCCC } from "../lccc"
import type { CharacterListEntry, CharId, Server } from "../types"
import { Internal, Public } from "./state"

type BooleanOrNil = boolean | undefined
function asBooleanOrNil(value: unknown): BooleanOrNil {
  return value as BooleanOrNil
}

type KnowFn = (this: void, itemLink: string) => boolean
function asKnowFn(value: unknown): KnowFn {
  return value as KnowFn
}

Internal.GetItemKnowledge = function (
  this: void,
  server: Server,
  charId: CharId,
  category: string | false | undefined,
  itemId: number,
  itemLink?: string,
  styleId?: number
): number {
  if (itemId === 0 && styleId !== undefined) {
    const data = Internal.GetStyleMotifItems(styleId)
    if (data !== undefined && asNumberArray(data.chapters).length > 0) {
      for (const [_index, chapter] of ipairs(asNumberArray(data.chapters))) {
        const [tItemId, tItemLink, tStyleId] = Internal.TranslateItem(chapter)
        const result = Internal.GetItemKnowledge(
          server,
          charId,
          category,
          tItemId,
          tItemLink,
          tStyleId
        )
        if (result !== Internal.KNOWLEDGE_KNOWN) {
          return result
        }
      }
      return Internal.KNOWLEDGE_KNOWN
    } else {
      return Internal.KNOWLEDGE_INVALID
    }
  } else if (category === Internal.CATEGORY_SCRIBING) {
    const [itemType] = GetItemLinkItemType(asString(itemLink))
    const scribeKey =
      itemType === ITEMTYPE_CRAFTED_ABILITY ? Internal.SCRIBE_GRIMOIRE : Internal.SCRIBE_SCRIPT
    return Internal.ScribingGetKnowledge(
      server,
      charId,
      scribeKey,
      GetItemLinkItemUseReferenceId(asString(itemLink))
    )
  } else if (category !== false && category !== undefined) {
    let fallback: number = Internal.KNOWLEDGE_NODATA

    if ((server === undefined || server === Internal.server) && charId === Internal.charId) {
      if (asKnowFn(Internal.KnowFunctions[category])(asString(itemLink))) {
        return Internal.KNOWLEDGE_KNOWN
      } else if (category !== Internal.CATEGORY_MOTIF) {
        return Internal.KNOWLEDGE_UNKNOWN
      } else {
        fallback = Internal.KNOWLEDGE_UNKNOWN
      }
    }

    const cache = Internal.GetKnowledge(server, charId, category)
    const [firstKey] = next(cache)
    if (firstKey === undefined) {
      return fallback
    } else if (cache[itemId] === true) {
      return Internal.KNOWLEDGE_KNOWN
    } else {
      return Internal.KNOWLEDGE_UNKNOWN
    }
  } else {
    return Internal.KNOWLEDGE_INVALID
  }
}

function IsSet(this: void, value: unknown): boolean {
  return value !== undefined && value !== 0
}

Internal.IsCharacterEnabled = function (this: void, server: Server, charId: CharId): boolean {
  let result: number | undefined
  const serverChars = Internal.characters[server]
  const char = serverChars !== undefined ? serverChars[charId] : undefined
  if (char !== undefined) {
    result = char.settings !== undefined ? char.settings.enabled : undefined
    if (!IsSet(result)) {
      const serverAccounts = Internal.accounts[server]
      const account = serverAccounts !== undefined ? serverAccounts[char.account] : undefined
      result = account !== undefined ? account.enabled : undefined
    }
  }
  return !(result === 2)
}

Internal.GetEffectiveParameterValue = function (
  this: void,
  server: Server,
  charId: CharId,
  param: string
): number {
  const serverChars = Internal.characters[server]
  const char = serverChars !== undefined ? serverChars[charId] : undefined
  if (char !== undefined) {
    if (char.settings !== undefined && IsSet(asRecord(char.settings)[param])) {
      return asNumber(asRecord(char.settings)[param])
    } else if (Internal.accounts[server] !== undefined) {
      const serverAccounts = asRecord(Internal.accounts[server])
      const account = serverAccounts[char.account] ?? serverAccounts["defaults"]
      if (account !== undefined && IsSet(asRecord(account)[param])) {
        return asNumber(asRecord(account)[param])
      }
    }
  }
  return asNumber(asRecord(Internal.vars.defaults)[param])
}

Internal.GetCharacterParams = function (this: void, server: Server, charId: CharId): unknown {
  let results: unknown
  const serverChars = Internal.characters[server]
  const char = serverChars !== undefined ? serverChars[charId] : undefined
  if (char !== undefined) {
    const tracking: Record<string, number> = {}
    results = {
      enabled: Internal.IsCharacterEnabled(server, charId),
      priority: Internal.GetEffectiveParameterValue(server, charId, "priority"),
      tracking: tracking,
    }
    for (const [_index, category] of ipairs(Internal.DataStores)) {
      tracking[category] = Internal.GetEffectiveParameterValue(server, charId, category)
    }
  }
  return results
}

Internal.Sort = function (
  this: void,
  server: Server,
  charIds: CharId[],
  usePriority?: boolean
): undefined {
  if (usePriority === true) {
    table.sort(charIds, (a: CharId, b: CharId): boolean => {
      const pa = Internal.GetEffectiveParameterValue(server, a, "priority")
      const pb = Internal.GetEffectiveParameterValue(server, b, "priority")
      if (pa === pb) {
        return LCCC.CompareCharIds(a, b)
      } else {
        return pa < pb
      }
    })
  } else {
    table.sort(charIds, LCCC.CompareCharIds)
  }
}

Internal.AccountFilter = function (
  this: void,
  accountFilter: unknown,
  character: CharacterListEntry
): boolean | undefined {
  if (accountFilter === undefined || accountFilter === false) {
    return true
  } else if (type(accountFilter) === "string") {
    return asString(accountFilter) === character.account
  } else if (type(accountFilter) === "table") {
    return asBooleanOrNil(asRecord(accountFilter)[character.account])
  }
  return undefined
}

Internal.NotifyRefresh = function (this: void, invalidateCharacterList?: boolean): undefined {
  if (invalidateCharacterList === true) {
    Internal.cachedFilteredServerList = undefined
    Internal.cachedCharLists = {}
  }
  Internal.FireCallbacks(Public.EVENT_UPDATE_REFRESH, invalidateCharacterList)
}
