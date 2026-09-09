import {
  asNumber,
  asNumberArray,
  asRecord,
} from "../knowledge-casts/knowledge-casts.module.code.ts"
import { LCCC } from "../knowledge-lccc/knowledge-lccc.module.code.ts"
import { INTERNAL, PUBLIC } from "../knowledge-state/knowledge-state.module.code.ts"

type KnowFn = (this: void, itemLink: string) => boolean
function asKnowFn(value: unknown): KnowFn {
  return value as KnowFn
}

const DIAGNOSTICS = INTERNAL.diagnostics

INTERNAL.ScanKnowledge = function (this: void): undefined {
  if (INTERNAL.initialized) {
    DIAGNOSTICS.Stopwatch(true)
  }

  if (INTERNAL.CanSave()) {
    const caches = INTERNAL.GetCaches(INTERNAL.server, INTERNAL.charId)
    for (const [, category] of ipairs(INTERNAL.Categories)) {
      caches[category] = INTERNAL.ScanAndEncodeKnowledgeCategory(
        INTERNAL.server,
        INTERNAL.charId,
        category
      )
    }
    const charRecord = asRecord(asRecord(INTERNAL.characters[INTERNAL.server])[INTERNAL.charId])
    charRecord[INTERNAL.CATEGORY_SCRIBING] = LCCC.Chunk(INTERNAL.ScribingScanAndEncode())
    charRecord[INTERNAL.CATEGORY_RESEARCH] = LCCC.Chunk(INTERNAL.ResearchScanAndEncode())
    charRecord["timestamp"] = GetTimeStamp()
  }

  if (!INTERNAL.initialized) {
    INTERNAL.initialized = true
    DIAGNOSTICS.Stopwatch()
    INTERNAL.FireCallbacks(PUBLIC.EVENT_INITIALIZED)
    DIAGNOSTICS.LogTime("initialization")
  } else {
    INTERNAL.NotifyRefresh(false)
    DIAGNOSTICS.LogTime("refresh")
  }
}

INTERNAL.ScanAndEncodeKnowledgeCategory = function (this: void, server, charId, category, cache) {
  const idList = asNumberArray(INTERNAL.ids[category])

  let knownCache: Record<number, boolean>
  if (cache === undefined) {
    knownCache = {}

    knownCache[asNumber(idList[0])] = false

    for (const [, id] of ipairs(idList)) {
      if (asKnowFn(INTERNAL.KnowFunctions[category])(INTERNAL.GetItemLink(id))) {
        knownCache[id] = true
      }
    }

    if (category === INTERNAL.CATEGORY_MOTIF) {
      INTERNAL.FixIncorrectMotifBookKnowledge(knownCache)
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

    if (i % INTERNAL.FIELD_BITS === 0) {
      bitfields.push(LCCC.Encode(bitfield, INTERNAL.FIELD_BYTES))
      bitfield = 0
    }
  }

  const remainder = idList.length % INTERNAL.FIELD_BITS
  if (remainder > 0) {
    bitfields.push(
      LCCC.Encode(BitLShift(bitfield, INTERNAL.FIELD_BITS - remainder), INTERNAL.FIELD_BYTES)
    )
  }

  asRecord(asRecord(INTERNAL.characters[server])[charId])[category] = LCCC.Chunk(
    table.concat(bitfields, "")
  )

  return knownCache
}

INTERNAL.FixIncorrectMotifBookKnowledge = function (this: void, cache): undefined {
  const overrides: number[] = []

  for (const [, styleId] of ipairs(asNumberArray(INTERNAL.GetStyleIds()))) {
    const data = INTERNAL.GetStyleMotifItems(styleId)

    if (data !== undefined) {
      const chapters = asNumberArray(data.chapters)
      if (chapters.length > 0) {
        let complete = true
        for (const [, itemId] of ipairs(chapters)) {
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
    if (DIAGNOSTICS.vars.bookCorrections === undefined) {
      DIAGNOSTICS.vars.bookCorrections = {}
    }
    DIAGNOSTICS.vars.bookCorrections[INTERNAL.charId] = table.concat(overrides, ",")
  }
}
