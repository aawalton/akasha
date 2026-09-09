import {
  asInternalTable,
  asNumber,
  asNumberArray,
  asPublicTable,
  asTable,
} from "../knowledge-casts/knowledge-casts.module.code.ts"
import { LCCC } from "../knowledge-lccc/knowledge-lccc.module.code.ts"
import type { Diagnostics as DiagnosticsShape } from "../knowledge-shape/knowledge-shape.module.code.ts"

export const PUBLIC = asPublicTable({})

export const INTERNAL = asInternalTable({
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

const DIAGNOSTICS: DiagnosticsShape = INTERNAL.diagnostics

DIAGNOSTICS.Stopwatch = function (this: void, start?: boolean): undefined {
  const tick = GetGameTimeMilliseconds()
  if (start === true) {
    DIAGNOSTICS.times = []
  } else {
    asNumberArray(DIAGNOSTICS.times).push(tick - asNumber(DIAGNOSTICS.tick))
  }
  DIAGNOSTICS.tick = tick
}

DIAGNOSTICS.LogTime = function (this: void, name: string): undefined {
  DIAGNOSTICS.Stopwatch()

  if (DIAGNOSTICS.vars[name] === undefined) {
    DIAGNOSTICS.vars[name] = { next: 1 }
  }
  const history = asTable(DIAGNOSTICS.vars[name])
  const slot = asNumber(history.next)

  const times = asNumberArray(DIAGNOSTICS.times)
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
