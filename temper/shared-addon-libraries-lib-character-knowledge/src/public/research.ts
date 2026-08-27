import { asNumber, asRecord, asString, asTable } from "../casts"
import { Internal, Public } from "../internal/state"
import { LCCC } from "../lccc"
import type { CharacterListEntry, CharId, Server } from "../types"

type ResearchListReader = (
  this: void,
  server: Server,
  charId: CharId
) => Array<Record<string, unknown>>
function asResearchListReader(value: unknown): ResearchListReader {
  return value as ResearchListReader
}

type ResultRow = Record<string, unknown>
function asResultRow(value: Record<string | number, unknown>): ResultRow {
  return value as ResultRow
}

type ResearchRow = { remaining: number }
function asResearchRow(value: Record<string, unknown>): ResearchRow {
  return value as ResearchRow
}

Public.GetMaxSimultaneousSmithingResearchForCharacter = function (
  this: void,
  craftingSkillType,
  server?,
  charId?
): number {
  return Internal.ResearchGetMaxSlots(asString(server), asString(charId), craftingSkillType)
}

Public.GetSmithingResearchLineTraitInfoForCharacter = function (
  this: void,
  craftingSkillType,
  researchLineIndex,
  traitIndex,
  server?,
  charId?
) {
  const [traitType, traitDescription] = GetSmithingResearchLineTraitInfo(
    craftingSkillType,
    researchLineIndex,
    traitIndex
  )
  let knowledge = Internal.ResearchGetTraitKnowledge(
    asString(server),
    asString(charId),
    craftingSkillType,
    researchLineIndex,
    traitIndex
  )
  if (knowledge === Internal.KNOWLEDGE_UNKNOWN) {
    const [, remaining] = Internal.ResearchGetTime(
      asString(server),
      asString(charId),
      craftingSkillType,
      researchLineIndex,
      traitIndex
    )
    if (remaining !== undefined && remaining <= 0) {
      knowledge = Internal.KNOWLEDGE_KNOWN
    }
  }
  return $multi(traitType, traitDescription, knowledge === Internal.KNOWLEDGE_KNOWN)
}

Public.GetSmithingResearchLineTraitTimesForCharacter = function (
  this: void,
  craftingSkillType,
  researchLineIndex,
  traitIndex,
  server?,
  charId?
) {
  return Internal.ResearchGetTime(
    asString(server),
    asString(charId),
    craftingSkillType,
    researchLineIndex,
    traitIndex
  )
}

Public.CanItemLinkBeTraitResearchedByCharacter = function (this: void, itemLink, server?, charId?) {
  const [craftingSkillType, researchLineIndex, traitIndex] =
    Public.GetSmithingResearchFromItemLink(itemLink)
  if (craftingSkillType !== undefined) {
    return Internal.ResearchGetResearchability(
      asString(server),
      asString(charId),
      craftingSkillType,
      asNumber(researchLineIndex),
      asNumber(traitIndex),
      false
    )
  } else {
    return false
  }
}

let traitTable: Record<number, unknown> | undefined

function GetTraitTable(this: void): Record<number, unknown> {
  if (traitTable === undefined) {
    const built: Record<number, unknown> = {}
    for (let traitItemIndex = 1; traitItemIndex <= GetNumSmithingTraitItems(); traitItemIndex++) {
      const [traitType, itemName, icon] = GetSmithingTraitItemInfo(traitItemIndex)
      if (traitType !== undefined) {
        built[traitType] = {
          traitType: traitType,
          traitTypeCategory: GetItemTraitTypeCategory(traitType),
          traitItemIndex: traitItemIndex,
          itemName: itemName,
          icon: icon,
          name: GetString("SI_ITEMTRAITTYPE", traitType),
        }
      }
    }
    traitTable = built
    return built
  }
  return traitTable
}

Public.GetTraitInfo = function (this: void, traitType, researchLineIndex?, traitIndex?): unknown {
  let key = traitType
  if (researchLineIndex !== undefined && traitIndex !== undefined) {
    const [resolvedTraitType] = GetSmithingResearchLineTraitInfo(
      traitType,
      researchLineIndex,
      traitIndex
    )
    key = resolvedTraitType
  }
  return GetTraitTable()[key]
}

Public.GetTraitList = function (this: void): unknown {
  return LCCC.MergeTables(undefined, GetTraitTable())
}

Public.GetSmithingResearchTradeskillTypes = function (this: void): unknown {
  return LCCC.MergeTables(undefined, asTable(Internal.TRADESKILL_TYPES))
}

Public.GetSmithingResearchFromItemLink = Internal.ResearchGetIndicesFromItemLink

Public.GetSmithingResearchStatusForCharacter = function (
  this: void,
  craftingSkillType,
  researchLineIndex,
  traitIndex,
  server?,
  charId?
) {
  const [, remaining] = Internal.ResearchGetTime(
    asString(server),
    asString(charId),
    craftingSkillType,
    researchLineIndex,
    traitIndex
  )
  return $multi(
    Internal.ResearchGetTraitKnowledge(
      asString(server),
      asString(charId),
      craftingSkillType,
      researchLineIndex,
      traitIndex
    ),
    remaining
  )
}

Public.GetSmithingResearchStatusForCharacters = function (
  this: void,
  craftingSkillType,
  researchLineIndex,
  traitIndex,
  server?,
  includedCharIds?,
  accountFilter?
): CharacterListEntry[] {
  const results: CharacterListEntry[] = []

  if (
    craftingSkillType !== undefined &&
    researchLineIndex !== undefined &&
    traitIndex !== undefined
  ) {
    const resolvedServer = server ?? Internal.server

    for (const [_index, character] of ipairs(Public.GetCharacterList(resolvedServer))) {
      const included = includedCharIds !== undefined && includedCharIds[character.id] === true
      const qualified =
        included ||
        (Internal.AccountFilter(accountFilter, character) === true &&
          Internal.GetEffectiveParameterValue(
            resolvedServer,
            character.id,
            Internal.CATEGORY_RESEARCH
          ) > 1)
      if (qualified) {
        const [, remaining] = Internal.ResearchGetTime(
          resolvedServer,
          character.id,
          craftingSkillType,
          researchLineIndex,
          traitIndex
        )
        results.push({
          id: character.id,
          account: character.account,
          name: character.name,
          knowledge: Internal.ResearchGetTraitKnowledge(
            resolvedServer,
            character.id,
            craftingSkillType,
            researchLineIndex,
            traitIndex
          ),
          remaining: remaining,
        })
      }
    }
  }

  return results
}

Public.GetSmithingResearchLineKnownTraitCountForCharacter = function (
  this: void,
  craftingSkillType,
  researchLineIndex,
  server?,
  charId?
): number {
  let count = 0
  const [, , numTraits] = GetSmithingResearchLineInfo(craftingSkillType, researchLineIndex)
  for (let traitIndex = 1; traitIndex <= numTraits; traitIndex++) {
    const [, , isKnown] = Public.GetSmithingResearchLineTraitInfoForCharacter(
      craftingSkillType,
      researchLineIndex,
      traitIndex,
      server,
      charId
    )
    if (isKnown) {
      count = count + 1
    }
  }
  return count
}

Public.CanTraitBeImmediatelyResearchedByCharacter = function (
  this: void,
  craftingSkillType,
  researchLineIndex,
  traitIndex,
  server?,
  charId?
) {
  return Internal.ResearchGetResearchability(
    asString(server),
    asString(charId),
    craftingSkillType,
    researchLineIndex,
    traitIndex,
    true
  )
}

Public.GetAllActiveResearchItemsList = function (this: void): Array<Record<string, unknown>> {
  const results: Array<Record<string, unknown>> = []
  for (const [_si, server] of ipairs(Public.GetServerList())) {
    for (const [_ci, character] of ipairs(Public.GetCharacterList(server))) {
      if (
        Internal.GetEffectiveParameterValue(server, character.id, Internal.CATEGORY_RESEARCH) > 1
      ) {
        for (const [_ii, item] of ipairs(
          asResearchListReader(Internal.ReadResearchTimes)(server, character.id)
        )) {
          asRecord(item).server = server
          results.push(asResultRow(LCCC.MergeTables(item, asTable(character))))
        }
      }
    }
  }
  table.sort(results, (a: Record<string, unknown>, b: Record<string, unknown>): boolean => {
    return asResearchRow(a).remaining < asResearchRow(b).remaining
  })
  return results
}
