import { asLua1Based, asNumber, asString } from "../casts"
import { LCCC } from "../lccc"
import type { ScribingType } from "../shape"
import { Internal } from "./state"

function asScribingType(value: ScribingType | undefined): ScribingType {
  return value as ScribingType
}

const BITS = 6

function GetMaxScribingId(
  this: void,
  checkFn: (this: void, id: number) => number,
  checkRet: number
): number {
  const MAX_CONSECUTIVE_INVALID_IDS = 10
  let currentId = 1
  let invalidCount = 0
  let lastValidId = 0

  do {
    if (checkFn(currentId) === checkRet) {
      invalidCount = invalidCount + 1
    } else {
      invalidCount = 0
      lastValidId = currentId
    }
    currentId = currentId + 1
  } while (!(invalidCount >= MAX_CONSECUTIVE_INVALID_IDS))

  return lastValidId
}

Internal.ScribingScanAndEncode = function (this: void): string {
  const results: string[] = []

  for (const [key, data] of pairs(Internal.ScribingTypes)) {
    let result = ""

    const maxId = zo_ceil(asNumber(Internal.maxIds[key]) / BITS) * BITS

    let field = 0
    for (let currentId = 1; currentId <= maxId; currentId++) {
      field = field * 2
      if (data.know(currentId)) {
        field = field + 1
      }
      if (currentId % BITS === 0) {
        result = result + LCCC.Encode(field, 1)
        field = 0
      }
    }

    results[data.order - 1] = result
  }

  return table.concat(results, ":")
}

Internal.ScribingGetKnowledge = function (this: void, server, charId, key, id) {
  const resolvedServer = server ?? Internal.server
  const resolvedCharId = charId ?? Internal.charId

  if (resolvedServer === Internal.server && resolvedCharId === Internal.charId) {
    if (asScribingType(Internal.ScribingTypes[key]).know(id)) {
      return Internal.KNOWLEDGE_KNOWN
    } else {
      return Internal.KNOWLEDGE_UNKNOWN
    }
  } else {
    const data = Internal.GetCharRawData(resolvedServer, resolvedCharId, Internal.CATEGORY_SCRIBING)
    if (data === undefined) {
      return Internal.KNOWLEDGE_NODATA
    } else {
      const unpacked = asLua1Based([...zo_strsplit(":", LCCC.Unchunk(data))])
      if (
        LCCC.ReadBitFromEncodedData(
          asString(unpacked[asScribingType(Internal.ScribingTypes[key]).order]),
          id
        )
      ) {
        return Internal.KNOWLEDGE_KNOWN
      } else {
        return Internal.KNOWLEDGE_UNKNOWN
      }
    }
  }
}

asScribingType(Internal.ScribingTypes[Internal.SCRIBE_GRIMOIRE]).max = function (
  this: void
): number {
  return GetMaxScribingId(GetSkillTypeForCraftedAbilityId, SKILL_TYPE_NONE)
}

asScribingType(Internal.ScribingTypes[Internal.SCRIBE_SCRIPT]).max = function (this: void): number {
  return GetMaxScribingId(GetCraftedAbilityScriptScribingSlot, SCRIBING_SLOT_NONE)
}
