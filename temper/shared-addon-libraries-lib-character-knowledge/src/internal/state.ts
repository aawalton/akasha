import { asInternalTable, asNumber, asNumberArray, asPublicTable, asTable } from "../casts"
import { LCCC } from "../lccc"
import type { Diagnostics as DiagnosticsShape, InternalTable, PublicTable } from "../shape"

declare global {
  var LibCharacterKnowledge: PublicTable
  var LibCharacterKnowledgeInternal: InternalTable
  var LibCharacterKnowledgeData: unknown
}

export const Public = asPublicTable({})

export const Internal = asInternalTable({
  name: "LibCharacterKnowledge",

  CATEGORY_RECIPE: "recipes",
  CATEGORY_PLAN: "plans",
  CATEGORY_MOTIF: "motifs",
  CATEGORY_SCRIBING: "sc",
  CATEGORY_RESEARCH: "rt",
  CATEGORY_NONE: false,
  CATEGORY_INVALID: undefined,

  SCRIBE_GRIMOIRE: "grimoires",
  SCRIBE_SCRIPT: "scripts",

  QUALITY_LOW: 1,
  QUALITY_MEDIUM: 2,
  QUALITY_HIGH: 3,

  KNOWLEDGE_INVALID: -1,
  KNOWLEDGE_NODATA: 0,
  KNOWLEDGE_KNOWN: 1,
  KNOWLEDGE_UNKNOWN: 2,

  PRIORITY_RANKS: 100,
  PRIORITY_RANK_DEFAULT: 50,

  FORMAT_VERSION: 1,
  ENCODE_BITS: 6,
  FIELD_BITS: 30,
  FIELD_BYTES: 5,

  scanThrottle: 200,

  server: LCCC.GetServerName(),
  userId: GetDisplayName(),
  charId: GetCurrentCharacterId(),

  maxIds: {},
  ids: {},
  idsPublic: {},
  caches: {},
  cachedCharLists: {},
  initialized: false,

  accounts: {},
  characters: {},

  diagnostics: {},
})

const Diagnostics: DiagnosticsShape = Internal.diagnostics

Diagnostics.Stopwatch = function (this: void, start?: boolean): undefined {
  const tick = GetGameTimeMilliseconds()
  if (start === true) {
    Diagnostics.times = []
  } else {
    asNumberArray(Diagnostics.times).push(tick - asNumber(Diagnostics.tick))
  }
  Diagnostics.tick = tick
}

Diagnostics.LogTime = function (this: void, name: string): undefined {
  Diagnostics.Stopwatch()

  if (Diagnostics.vars[name] === undefined) {
    Diagnostics.vars[name] = { next: 1 }
  }
  const history = asTable(Diagnostics.vars[name])
  const slot = asNumber(history.next)

  const times = asNumberArray(Diagnostics.times)
  if (times.length === 1) {
    history[slot] = string.format("%dms", asNumber(times[0]))
  } else {
    let total = 0
    for (const time of times) {
      total = total + time
    }
    history[slot] = string.format("%dms (%s)", total, table.concat(times, "/"))
  }

  history.next = (slot % 4) + 1
}
