import { asNumber, asNumberArray, asRecord } from "../casts"
import { LCCC } from "../lccc"
import { Internal, Public } from "./state"

type KnowFn = (this: void, itemLink: string) => boolean
function asKnowFn(value: unknown): KnowFn {
  return value as KnowFn
}

const Diagnostics = Internal.diagnostics

Internal.ScanKnowledge = function (this: void): undefined {
  if (Internal.initialized) {
    Diagnostics.Stopwatch(true)
  }

  if (Internal.CanSave()) {
    const caches = Internal.GetCaches(Internal.server, Internal.charId)
    for (const [_index, category] of ipairs(Internal.Categories)) {
      caches[category] = Internal.ScanAndEncodeKnowledgeCategory(
        Internal.server,
        Internal.charId,
        category
      )
    }
    const charRecord = asRecord(asRecord(Internal.characters[Internal.server])[Internal.charId])
    charRecord[Internal.CATEGORY_SCRIBING] = LCCC.Chunk(Internal.ScribingScanAndEncode())
    charRecord[Internal.CATEGORY_RESEARCH] = LCCC.Chunk(Internal.ResearchScanAndEncode())
    charRecord["timestamp"] = GetTimeStamp()
  }

  if (!Internal.initialized) {
    Internal.initialized = true
    Diagnostics.Stopwatch()
    Internal.FireCallbacks(Public.EVENT_INITIALIZED)
    Diagnostics.LogTime("initialization")
  } else {
    Internal.NotifyRefresh(false)
    Diagnostics.LogTime("refresh")
  }
}

Internal.ScanAndEncodeKnowledgeCategory = function (this: void, server, charId, category, cache) {
  const idList = asNumberArray(Internal.ids[category])

  let knownCache: Record<number, boolean>
  if (cache === undefined) {
    knownCache = {}

    knownCache[asNumber(idList[0])] = false

    for (const [_index, id] of ipairs(idList)) {
      if (asKnowFn(Internal.KnowFunctions[category])(Internal.GetItemLink(id))) {
        knownCache[id] = true
      }
    }

    if (category === Internal.CATEGORY_MOTIF) {
      Internal.FixIncorrectMotifBookKnowledge(knownCache)
    }
  } else {
    knownCache = cache
  }

  let bitfield = 0
  const bitfields: string[] = []

  for (const [i, id] of ipairs(idList)) {
    bitfield = BitLShift(bitfield, 1)

    if (knownCache[id] === true) {
      bitfield = bitfield + 1
    }

    if (i % Internal.FIELD_BITS === 0) {
      bitfields.push(LCCC.Encode(bitfield, Internal.FIELD_BYTES))
      bitfield = 0
    }
  }

  const remainder = idList.length % Internal.FIELD_BITS
  if (remainder > 0) {
    bitfields.push(
      LCCC.Encode(BitLShift(bitfield, Internal.FIELD_BITS - remainder), Internal.FIELD_BYTES)
    )
  }

  asRecord(asRecord(Internal.characters[server])[charId])[category] = LCCC.Chunk(
    table.concat(bitfields, "")
  )

  return knownCache
}

Internal.FixIncorrectMotifBookKnowledge = function (this: void, cache): undefined {
  const overrides: number[] = []

  for (const [_index, styleId] of ipairs(asNumberArray(Internal.GetStyleIds()))) {
    const data = Internal.GetStyleMotifItems(styleId)

    if (data !== undefined) {
      const chapters = asNumberArray(data.chapters)
      if (chapters.length > 0) {
        let complete = true
        for (const [_ci, itemId] of ipairs(chapters)) {
          if (cache[itemId] !== true) {
            complete = false
            break
          }
        }

        if (complete) {
          for (const itemId of data.books) {
            if (cache[itemId] !== true) {
              cache[itemId] = true
              overrides.push(itemId)
            }
          }
        }
      }
    }
  }

  if (overrides.length > 0) {
    if (Diagnostics.vars.bookCorrections === undefined) {
      Diagnostics.vars.bookCorrections = {}
    }
    Diagnostics.vars.bookCorrections[Internal.charId] = table.concat(overrides, ",")
  }
}
