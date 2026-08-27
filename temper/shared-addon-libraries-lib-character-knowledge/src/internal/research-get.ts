import { asNumber } from "../casts"
import { LCCC } from "../lccc"
import type { ResearchReverseEntry } from "../shape"
import type { CharId, Server } from "../types"
import {
  asCraftNode,
  GetTraitIndex,
  getReverseLookup,
  getTradeskillLookup,
  getTraitBytes,
  InitializeResearch,
  ITEM_LOOKUPS,
} from "./research"
import { Internal, Public } from "./state"

const TIME_INDEX_SIZE = 2
const TIME_FIELD_SIZE = 4
const TIME_TOTAL_SIZE = 10

type ResearchArgs = [craftingSkillType: number, researchLineIndex: number, traitIndex: number]
function asResearchArgs(value: number[]): ResearchArgs {
  return value as ResearchArgs
}

type TimePairReader = (
  this: void,
  server: Server,
  charId: CharId,
  index?: number
) => LuaMultiReturn<[number?, number?]>
function asTimePairReader(value: unknown): TimePairReader {
  return value as TimePairReader
}

type ReverseEntryTable = Record<string | number, unknown>
function asReverseEntryTable(value: unknown): ReverseEntryTable {
  return value as ReverseEntryTable
}

Internal.ResearchGetTraitKnowledge = function (this: void, server, charId, ...args): number {
  const resolvedServer = server ?? Internal.server
  const resolvedCharId = charId ?? Internal.charId
  if (resolvedServer === Internal.server && resolvedCharId === Internal.charId) {
    const [, , known] = GetSmithingResearchLineTraitInfo(...asResearchArgs(args))
    if (known === true) {
      return Internal.KNOWLEDGE_KNOWN
    } else {
      return Internal.KNOWLEDGE_UNKNOWN
    }
  } else {
    const data = Internal.GetCharRawData(resolvedServer, resolvedCharId, Internal.CATEGORY_RESEARCH)
    if (data === undefined) {
      return Internal.KNOWLEDGE_NODATA
    } else {
      const index = GetTraitIndex(...asResearchArgs(args))
      if (index === undefined || index === false) {
        return Internal.KNOWLEDGE_INVALID
      } else if (LCCC.ReadBitFromEncodedData(LCCC.Unchunk(data), index)) {
        return Internal.KNOWLEDGE_KNOWN
      } else {
        return Internal.KNOWLEDGE_UNKNOWN
      }
    }
  }
}

Internal.ResearchGetMaxSlots = function (this: void, server, charId, craftingSkillType): number {
  const resolvedServer = server ?? Internal.server
  const resolvedCharId = charId ?? Internal.charId
  if (resolvedServer === Internal.server && resolvedCharId === Internal.charId) {
    return GetMaxSimultaneousSmithingResearch(craftingSkillType)
  } else {
    const lookup = getTradeskillLookup()
    let shift: number | undefined
    if (craftingSkillType !== undefined && lookup[craftingSkillType] !== undefined) {
      shift = asCraftNode(lookup[craftingSkillType]).slotsShift
    }
    if (shift === undefined) {
      return 0
    } else if (shift > 4) {
      return 1
    } else {
      const data = Internal.GetCharRawData(
        resolvedServer,
        resolvedCharId,
        Internal.CATEGORY_RESEARCH
      )
      if (data !== undefined) {
        InitializeResearch()
        const [slotsByte] = LCCC.ReadAndDecode(LCCC.Unchunk(data), asNumber(getTraitBytes()) + 1, 1)
        return BitAnd(BitRShift(slotsByte, shift), 3) + 1
      } else {
        return 1
      }
    }
  }
}

Internal.ReadResearchTimes = function (this: void, server, charId, index) {
  const collectAll = index === undefined
  const results: Array<Record<string, unknown>> | undefined = collectAll ? [] : undefined
  const data = Internal.GetCharRawData(server, charId, Internal.CATEGORY_RESEARCH)
  if (data !== undefined) {
    const encoded = LCCC.Unchunk(data)
    const length = zo_strlen(encoded)
    let pos = asNumber(getTraitBytes()) + 2
    while (pos + TIME_TOTAL_SIZE - 1 <= length) {
      const [field, afterIndex] = LCCC.ReadAndDecode(encoded, pos, TIME_INDEX_SIZE)
      pos = afterIndex
      if (results !== undefined || field === index) {
        const entry: Record<string, unknown> = {}
        const [duration, afterDuration] = LCCC.ReadAndDecode(encoded, pos, TIME_FIELD_SIZE)
        entry.duration = duration
        pos = afterDuration
        const [remaining, afterRemaining] = LCCC.ReadAndDecode(encoded, pos, TIME_FIELD_SIZE)
        entry.remaining = remaining
        pos = afterRemaining
        entry.remaining =
          asNumber(entry.remaining) - (GetTimeStamp() - Public.GetLastScanTime(server, charId))
        if (results !== undefined) {
          results.push(LCCC.MergeTables(entry, asReverseEntryTable(getReverseLookup()[field])))
        } else {
          return $multi(asNumber(entry.duration), asNumber(entry.remaining))
        }
      } else {
        pos = pos + TIME_FIELD_SIZE * 2
      }
    }
  }
  return results
}

Internal.ResearchGetTime = function (
  this: void,
  server,
  charId,
  ...args
): LuaMultiReturn<[number?, number?]> {
  const resolvedServer = server ?? Internal.server
  const resolvedCharId = charId ?? Internal.charId
  if (resolvedServer === Internal.server && resolvedCharId === Internal.charId) {
    return GetSmithingResearchLineTraitTimes(...asResearchArgs(args))
  } else {
    const index = GetTraitIndex(...asResearchArgs(args))
    if (index !== undefined && index !== false) {
      return asTimePairReader(Internal.ReadResearchTimes)(resolvedServer, resolvedCharId, index)
    }
    return $multi()
  }
}

Internal.ResearchGetResearchability = function (
  this: void,
  server,
  charId,
  craftingSkillType,
  researchLineIndex,
  traitIndex,
  extendedCheck
): number | boolean {
  const [, remainingNow] = Internal.ResearchGetTime(
    server,
    charId,
    craftingSkillType,
    researchLineIndex,
    traitIndex
  )
  if (
    Internal.ResearchGetTraitKnowledge(
      server,
      charId,
      craftingSkillType,
      researchLineIndex,
      traitIndex
    ) === Internal.KNOWLEDGE_UNKNOWN &&
    remainingNow === undefined
  ) {
    if (extendedCheck) {
      const [, , numLineTraits] = GetSmithingResearchLineInfo(craftingSkillType, researchLineIndex)
      for (let lineTraitIndex = 1; lineTraitIndex <= numLineTraits; lineTraitIndex++) {
        const [, remaining] = Internal.ResearchGetTime(
          server,
          charId,
          craftingSkillType,
          researchLineIndex,
          lineTraitIndex
        )
        if (remaining !== undefined && remaining > 0) {
          return remaining
        }
      }

      let found = 0
      let minTime: number | undefined
      for (
        let slotLineIndex = 1;
        slotLineIndex <= GetNumSmithingResearchLines(craftingSkillType);
        slotLineIndex++
      ) {
        const [, , numSlotTraits] = GetSmithingResearchLineInfo(craftingSkillType, slotLineIndex)
        for (let slotTraitIndex = 1; slotTraitIndex <= numSlotTraits; slotTraitIndex++) {
          const [, remaining] = Internal.ResearchGetTime(
            server,
            charId,
            craftingSkillType,
            slotLineIndex,
            slotTraitIndex
          )
          if (remaining !== undefined && remaining > 0) {
            found = found + 1
            minTime = minTime !== undefined ? zo_min(remaining, minTime) : remaining
          }
        }
      }
      if (
        found >= Internal.ResearchGetMaxSlots(server, charId, craftingSkillType) &&
        minTime !== undefined
      ) {
        return minTime
      }
      return true
    } else {
      return true
    }
  } else {
    return false
  }
}

Internal.ResearchGetIndicesFromItemLink = function (
  this: void,
  itemLink
): LuaMultiReturn<[number?, number?, number?]> {
  const itemTraitInformation = GetItemTraitInformationFromItemLink(itemLink)
  if (
    itemTraitInformation === ITEM_TRAIT_INFORMATION_NONE ||
    itemTraitInformation === ITEM_TRAIT_INFORMATION_CAN_BE_RESEARCHED
  ) {
    const craftingSkillType = GetItemLinkCraftingSkillType(itemLink)
    if (GetNumSmithingResearchLines(craftingSkillType) > 0) {
      const [, , , equipType] = GetItemLinkInfo(itemLink)
      let researchLineIndex: number | undefined = ITEM_LOOKUPS.EQUIP[asNumber(equipType)]
      if (researchLineIndex === -1) {
        researchLineIndex = ITEM_LOOKUPS.WEAPON[GetItemLinkWeaponType(itemLink)]
      } else if (researchLineIndex !== undefined) {
        researchLineIndex =
          researchLineIndex + (ITEM_LOOKUPS.ARMOR_OFFSET[GetItemLinkArmorType(itemLink)] ?? 0)
      }
      const traitIndex = ITEM_LOOKUPS.TRAIT[GetItemLinkTraitType(itemLink)]
      if (researchLineIndex !== undefined && traitIndex !== undefined) {
        return $multi(craftingSkillType, researchLineIndex, traitIndex)
      }
    }
  }
  return $multi()
}
