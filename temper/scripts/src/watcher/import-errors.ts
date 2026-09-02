import {
  collectEntries,
  SAVED_VARIABLES_NAME,
} from "@akasha/temper-errors-triage/errors-collect"
import {
  classifyLiveness,
  DEFAULT_STALE_AFTER_HOURS,
} from "@akasha/temper-errors-triage/errors-liveness"
import type { ErrorEntry } from "@akasha/temper-capture-errors/errors-payload"
import { rootSchema } from "@akasha/temper-errors-triage/errors-saved-variables"
import {
  gatherTriage,
  readDeployedBuildId,
} from "@akasha/temper-errors-triage/errors-triage-gather"
import { parseLuaSavedVariablesFile } from "@akasha/temper-saved-variables/lua-parser"
import { loadErrorCursor, saveErrorCursor } from "./import-errors-cursor"
import { decideErrorEmissions, type EntryVerdict, isStaleResidue } from "./import-errors-decide"

const HOUR_MS = 60 * 60 * 1000

export async function runImportErrors(
  content: string,
  log: (message: string) => void
): Promise<void> {
  const raw = parseLuaSavedVariablesFile(content, SAVED_VARIABLES_NAME)
  const root = rootSchema.parse(raw)
  const entries = collectEntries(root)

  const verdicts = await buildVerdicts(entries)
  const verdictFor = (entry: ErrorEntry): EntryVerdict =>
    verdicts.get(entry) ?? { stale: false, triage: "unknown" }

  const priorSeen = loadErrorCursor()
  const { envelopes, nextSeen, suppressed } = decideErrorEmissions(priorSeen, entries, verdictFor)

  saveErrorCursor(nextSeen)

  if (suppressed > 0) {
    log(`TemperErrors: suppressed ${suppressed} stale-residue entr(y/ies)`)
  }

  if (envelopes.length === 0) {
    log("TemperErrors: no new or recurred errors")
    return
  }

  for (const envelope of envelopes) {
    log(`TemperErrors: ${JSON.stringify(envelope)}`)
  }
  log(`TemperErrors: recorded ${envelopes.length} error envelope(s)`)
}

async function buildVerdicts(
  entries: readonly ErrorEntry[]
): Promise<ReadonlyMap<ErrorEntry, EntryVerdict>> {
  const verdicts = new Map<ErrorEntry, EntryVerdict>()
  if (entries.length === 0) return verdicts
  const frontierMs = Math.max(...entries.map((e) => e.lastSeenAt * 1000))
  const staleAfterMs = DEFAULT_STALE_AFTER_HOURS * HOUR_MS
  const buildIdCache = new Map<string, string | null>()
  const deployedFor = (folder: string): Promise<string | undefined> =>
    readDeployedBuildId(folder, buildIdCache)

  for (const entry of entries) {
    const gathered = await gatherTriage(entry, deployedFor)
    const liveness = classifyLiveness({
      lastSeenAtMs: entry.lastSeenAt * 1000,
      frontierMs,
      staleAfterMs,
      ownership: { kind: "external" },
    })
    verdicts.set(entry, {
      stale: isStaleResidue(liveness, { triage: gathered.triage, reason: gathered.reason }),
      triage: gathered.triage,
    })
  }
  return verdicts
}
