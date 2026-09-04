import {
  asNumber,
  asNumberArray,
  asRecord,
  asString,
} from "../knowledge-casts/knowledge-casts.module.code.ts"
import { LCCC } from "../knowledge-lccc/knowledge-lccc.module.code.ts"
import { INTERNAL, PUBLIC } from "../knowledge-state/knowledge-state.module.code.ts"
import type {
  CharacterListEntry,
  CharId,
  Server,
} from "../knowledge-types/knowledge-types.module.code.ts"

type BooleanOrNil = boolean | undefined
function asBooleanOrNil(value: unknown): BooleanOrNil {
  return value as BooleanOrNil
}

type KnowFn = (this: void, itemLink: string) => boolean
function asKnowFn(value: unknown): KnowFn {
  return value as KnowFn
}

INTERNAL.GetItemKnowledge = function (
  this: void,
  server: Server,
  charId: CharId,
  category: string | false | undefined,
  itemId: number,
  itemLink?: string,
  styleId?: number
): number {
  if (itemId === 0 && styleId !== undefined) {
    const data = INTERNAL.GetStyleMotifItems(styleId)
    if (data !== undefined && asNumberArray(data.chapters).length > 0) {
      for (const [, chapter] of ipairs(asNumberArray(data.chapters))) {
        const [tItemId, tItemLink, tStyleId] = INTERNAL.TranslateItem(chapter)
        const result = INTERNAL.GetItemKnowledge(
          server,
          charId,
          category,
          tItemId,
          tItemLink,
          tStyleId
        )
        if (result !== INTERNAL.KNOWLEDGE_KNOWN) {
          return result
        }
      }
      return INTERNAL.KNOWLEDGE_KNOWN
    } else {
      return INTERNAL.KNOWLEDGE_INVALID
    }
  } else if (category === INTERNAL.CATEGORY_SCRIBING) {
    const [itemType] = GetItemLinkItemType(asString(itemLink))
    const scribeKey =
      itemType === ITEMTYPE_CRAFTED_ABILITY ? INTERNAL.SCRIBE_GRIMOIRE : INTERNAL.SCRIBE_SCRIPT
    return INTERNAL.ScribingGetKnowledge(
      server,
      charId,
      scribeKey,
      GetItemLinkItemUseReferenceId(asString(itemLink))
    )
  } else if (category !== false && category !== undefined) {
    let fallback: number = INTERNAL.KNOWLEDGE_NODATA

    if ((server === undefined || server === INTERNAL.server) && charId === INTERNAL.charId) {
      if (asKnowFn(INTERNAL.KnowFunctions[category])(asString(itemLink))) {
        return INTERNAL.KNOWLEDGE_KNOWN
      } else if (category !== INTERNAL.CATEGORY_MOTIF) {
        return INTERNAL.KNOWLEDGE_UNKNOWN
      } else {
        fallback = INTERNAL.KNOWLEDGE_UNKNOWN
      }
    }

    const cache = INTERNAL.GetKnowledge(server, charId, category)
    const [firstKey] = next(cache)
    if (firstKey === undefined) {
      return fallback
    } else if (cache[itemId] === true) {
      return INTERNAL.KNOWLEDGE_KNOWN
    } else {
      return INTERNAL.KNOWLEDGE_UNKNOWN
    }
  } else {
    return INTERNAL.KNOWLEDGE_INVALID
  }
}

function isSet(this: void, value: unknown): boolean {
  return value !== undefined && value !== 0
}

INTERNAL.IsCharacterEnabled = function (this: void, server: Server, charId: CharId): boolean {
  let result: number | undefined
  const serverChars = INTERNAL.characters[server]
  const char = serverChars !== undefined ? serverChars[charId] : undefined
  if (char !== undefined) {
    result = char.settings !== undefined ? char.settings.enabled : undefined
    if (!isSet(result)) {
      const serverAccounts = INTERNAL.accounts[server]
      const account = serverAccounts !== undefined ? serverAccounts[char.account] : undefined
      result = account !== undefined ? account.enabled : undefined
    }
  }
  return !(result === 2)
}

INTERNAL.GetEffectiveParameterValue = function (
  this: void,
  server: Server,
  charId: CharId,
  param: string
): number {
  const serverChars = INTERNAL.characters[server]
  const char = serverChars !== undefined ? serverChars[charId] : undefined
  if (char !== undefined) {
    if (char.settings !== undefined && isSet(asRecord(char.settings)[param])) {
      return asNumber(asRecord(char.settings)[param])
    } else if (INTERNAL.accounts[server] !== undefined) {
      const serverAccounts = asRecord(INTERNAL.accounts[server])
      const account = serverAccounts[char.account] ?? serverAccounts["defaults"]
      if (account !== undefined && isSet(asRecord(account)[param])) {
        return asNumber(asRecord(account)[param])
      }
    }
  }
  return asNumber(asRecord(INTERNAL.vars.defaults)[param])
}

INTERNAL.GetCharacterParams = function (this: void, server: Server, charId: CharId): unknown {
  let results: unknown
  const serverChars = INTERNAL.characters[server]
  const char = serverChars !== undefined ? serverChars[charId] : undefined
  if (char !== undefined) {
    const tracking: Record<string, number> = {}
    results = {
      enabled: INTERNAL.IsCharacterEnabled(server, charId),
      priority: INTERNAL.GetEffectiveParameterValue(server, charId, "priority"),
      tracking: tracking,
    }
    for (const [, category] of ipairs(INTERNAL.DataStores)) {
      tracking[category] = INTERNAL.GetEffectiveParameterValue(server, charId, category)
    }
  }
  return results
}

INTERNAL.Sort = function (
  this: void,
  server: Server,
  charIds: CharId[],
  usePriority?: boolean
): undefined {
  if (usePriority === true) {
    table.sort(charIds, (a: CharId, b: CharId): boolean => {
      const pa = INTERNAL.GetEffectiveParameterValue(server, a, "priority")
      const pb = INTERNAL.GetEffectiveParameterValue(server, b, "priority")
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

INTERNAL.AccountFilter = function (
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

INTERNAL.NotifyRefresh = function (this: void, invalidateCharacterList?: boolean): undefined {
  if (invalidateCharacterList === true) {
    INTERNAL.cachedFilteredServerList = undefined
    INTERNAL.cachedCharLists = {}
  }
  INTERNAL.FireCallbacks(PUBLIC.EVENT_UPDATE_REFRESH, invalidateCharacterList)
}
