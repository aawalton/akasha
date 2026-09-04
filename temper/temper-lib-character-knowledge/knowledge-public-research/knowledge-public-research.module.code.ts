import {
  asNumber,
  asRecord,
  asString,
  asTable,
} from "../knowledge-casts/knowledge-casts.module.code.ts"
import { LCCC } from "../knowledge-lccc/knowledge-lccc.module.code.ts"
import { INTERNAL, PUBLIC } from "../knowledge-state/knowledge-state.module.code.ts"
import type {
  CharacterListEntry,
  CharId,
  Server,
} from "../knowledge-types/knowledge-types.module.code.ts"

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

PUBLIC.GetMaxSimultaneousSmithingResearchForCharacter = function (
  this: void,
  craftingSkillType,
  server?,
  charId?
): number {
  return INTERNAL.ResearchGetMaxSlots(asString(server), asString(charId), craftingSkillType)
}

PUBLIC.GetSmithingResearchLineTraitInfoForCharacter = function (
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
  let knowledge = INTERNAL.ResearchGetTraitKnowledge(
    asString(server),
    asString(charId),
    craftingSkillType,
    researchLineIndex,
    traitIndex
  )
  if (knowledge === INTERNAL.KNOWLEDGE_UNKNOWN) {
    const [, remaining] = INTERNAL.ResearchGetTime(
      asString(server),
      asString(charId),
      craftingSkillType,
      researchLineIndex,
      traitIndex
    )
    if (remaining !== undefined && remaining <= 0) {
      knowledge = INTERNAL.KNOWLEDGE_KNOWN
    }
  }
  return $multi(traitType, traitDescription, knowledge === INTERNAL.KNOWLEDGE_KNOWN)
}

PUBLIC.GetSmithingResearchLineTraitTimesForCharacter = function (
  this: void,
  craftingSkillType,
  researchLineIndex,
  traitIndex,
  server?,
  charId?
) {
  return INTERNAL.ResearchGetTime(
    asString(server),
    asString(charId),
    craftingSkillType,
    researchLineIndex,
    traitIndex
  )
}

PUBLIC.CanItemLinkBeTraitResearchedByCharacter = function (this: void, itemLink, server?, charId?) {
  const [craftingSkillType, researchLineIndex, traitIndex] =
    PUBLIC.GetSmithingResearchFromItemLink(itemLink)
  if (craftingSkillType !== undefined) {
    return INTERNAL.ResearchGetResearchability(
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

const TRAIT_TABLE: { built?: Record<number, unknown> } = {}

function getTraitTable(this: void): Record<number, unknown> {
  if (TRAIT_TABLE.built === undefined) {
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
    TRAIT_TABLE.built = built
    return built
  }
  return TRAIT_TABLE.built
}

PUBLIC.GetTraitInfo = function (this: void, traitType, researchLineIndex?, traitIndex?): unknown {
  let key = traitType
  if (researchLineIndex !== undefined && traitIndex !== undefined) {
    const [resolvedTraitType] = GetSmithingResearchLineTraitInfo(
      traitType,
      researchLineIndex,
      traitIndex
    )
    key = resolvedTraitType
  }
  return getTraitTable()[key]
}

PUBLIC.GetTraitList = function (this: void): unknown {
  return LCCC.MergeTables(undefined, getTraitTable())
}

PUBLIC.GetSmithingResearchTradeskillTypes = function (this: void): unknown {
  return LCCC.MergeTables(undefined, asTable(INTERNAL.TRADESKILL_TYPES))
}

PUBLIC.GetSmithingResearchFromItemLink = INTERNAL.ResearchGetIndicesFromItemLink

PUBLIC.GetSmithingResearchStatusForCharacter = function (
  this: void,
  craftingSkillType,
  researchLineIndex,
  traitIndex,
  server?,
  charId?
) {
  const [, remaining] = INTERNAL.ResearchGetTime(
    asString(server),
    asString(charId),
    craftingSkillType,
    researchLineIndex,
    traitIndex
  )
  return $multi(
    INTERNAL.ResearchGetTraitKnowledge(
      asString(server),
      asString(charId),
      craftingSkillType,
      researchLineIndex,
      traitIndex
    ),
    remaining
  )
}

PUBLIC.GetSmithingResearchStatusForCharacters = function (
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
    const resolvedServer = server ?? INTERNAL.server

    for (const [, character] of ipairs(PUBLIC.GetCharacterList(resolvedServer))) {
      const included = includedCharIds !== undefined && includedCharIds[character.id] === true
      const qualified =
        included ||
        (INTERNAL.AccountFilter(accountFilter, character) === true &&
          INTERNAL.GetEffectiveParameterValue(
            resolvedServer,
            character.id,
            INTERNAL.CATEGORY_RESEARCH
          ) > 1)
      if (qualified) {
        const [, remaining] = INTERNAL.ResearchGetTime(
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
          knowledge: INTERNAL.ResearchGetTraitKnowledge(
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

PUBLIC.GetSmithingResearchLineKnownTraitCountForCharacter = function (
  this: void,
  craftingSkillType,
  researchLineIndex,
  server?,
  charId?
): number {
  let count = 0
  const [, , numTraits] = GetSmithingResearchLineInfo(craftingSkillType, researchLineIndex)
  for (let traitIndex = 1; traitIndex <= numTraits; traitIndex++) {
    const [, , isKnown] = PUBLIC.GetSmithingResearchLineTraitInfoForCharacter(
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

PUBLIC.CanTraitBeImmediatelyResearchedByCharacter = function (
  this: void,
  craftingSkillType,
  researchLineIndex,
  traitIndex,
  server?,
  charId?
) {
  return INTERNAL.ResearchGetResearchability(
    asString(server),
    asString(charId),
    craftingSkillType,
    researchLineIndex,
    traitIndex,
    true
  )
}

PUBLIC.GetAllActiveResearchItemsList = function (this: void): Array<Record<string, unknown>> {
  const results: Array<Record<string, unknown>> = []
  for (const [, server] of ipairs(PUBLIC.GetServerList())) {
    for (const [, character] of ipairs(PUBLIC.GetCharacterList(server))) {
      if (
        INTERNAL.GetEffectiveParameterValue(server, character.id, INTERNAL.CATEGORY_RESEARCH) > 1
      ) {
        for (const [, item] of ipairs(
          asResearchListReader(INTERNAL.ReadResearchTimes)(server, character.id)
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
