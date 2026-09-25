import type { ErrorEntry } from "akasha/temper/capture/error/modules/errors-payload/errors-payload.module.code.ts"
import {
  collectEntries,
  SAVED_VARIABLES_NAME,
} from "akasha/temper/capture/errors-triage/modules/errors-collect/errors-collect.module.code.ts"
import {
  classifyLiveness,
  DEFAULT_STALE_AFTER_HOURS,
} from "akasha/temper/capture/errors-triage/modules/errors-liveness/errors-liveness.module.code.ts"
import { rootSchema } from "akasha/temper/capture/errors-triage/modules/errors-saved-variables/errors-saved-variables.module.code.ts"
import {
  gatherTriage,
  readDeployedBuildId,
} from "akasha/temper/capture/errors-triage/modules/errors-triage-gather/errors-triage-gather.module.code.ts"
import { parseLuaSavedVariablesFile } from "akasha/temper/eso/saved-variable/modules/lua-parser/lua-parser.module.code.ts"
import {
  loadErrorCursor,
  saveErrorCursor,
} from "akasha/temper/watcher/modules/watcher-error-cursor/watcher-error-cursor.module.code.ts"
import {
  decideErrorEmissions,
  type EntryVerdict,
  type ErrorDecision,
  isStaleResidue,
} from "akasha/temper/watcher/modules/watcher-error-emissions/watcher-error-emissions.module.code.ts"
import { log as logToWatcherLog } from "akasha/temper/watcher/modules/watcher-logging/watcher-logging.module.code.ts"

const HOUR_MS = 60 * 60 * 1000

const UNJUDGED_VERDICT: EntryVerdict = { stale: false, triage: "unknown" }

type DeployedBuildIdFor = (folder: string) => Promise<string | undefined>

interface ImportErrorsOptions {
  cursorPath?: string
  deployedFor?: DeployedBuildIdFor
  staleAfterHours?: number
}

function cachingDeployedBuildIdFor(): DeployedBuildIdFor {
  const cache = new Map<string, string | null>()
  return (folder) => readDeployedBuildId(folder, cache)
}

export async function buildVerdicts(
  entries: readonly ErrorEntry[],
  deployedFor: DeployedBuildIdFor = cachingDeployedBuildIdFor(),
  staleAfterHours: number = DEFAULT_STALE_AFTER_HOURS
): Promise<ReadonlyMap<ErrorEntry, EntryVerdict>> {
  const verdicts = new Map<ErrorEntry, EntryVerdict>()
  if (entries.length === 0) return verdicts

  const frontierMs = Math.max(...entries.map((entry) => entry.lastSeenAt * 1000))
  const staleAfterMs = staleAfterHours * HOUR_MS

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

function counted(amount: number, one: string, many: string): string {
  return `${amount} ${amount === 1 ? one : many}`
}

export function errorLogLines(decision: ErrorDecision): readonly string[] {
  const lines: string[] = []

  if (decision.suppressed > 0) {
    const held = counted(decision.suppressed, "stale-residue entry", "stale-residue entries")
    lines.push(`Temper: suppressed ${held}`)
  }

  if (decision.envelopes.length === 0) {
    lines.push("Temper: no new or recurred errors")
    return lines
  }

  for (const envelope of decision.envelopes) {
    lines.push(`Temper: ${JSON.stringify(envelope)}`)
  }
  const recorded = counted(decision.envelopes.length, "error envelope", "error envelopes")
  lines.push(`Temper: recorded ${recorded}`)
  return lines
}

export async function runImportErrors(
  content: string,
  log: (message: string) => void = logToWatcherLog,
  options: ImportErrorsOptions = {}
): Promise<void> {
  const raw = parseLuaSavedVariablesFile(content, SAVED_VARIABLES_NAME)
  const entries = collectEntries(rootSchema.parse(raw))

  const verdicts = await buildVerdicts(entries, options.deployedFor, options.staleAfterHours)
  const decision = decideErrorEmissions(
    loadErrorCursor(options.cursorPath),
    entries,
    (entry) => verdicts.get(entry) ?? UNJUDGED_VERDICT
  )

  saveErrorCursor(decision.nextSeen, options.cursorPath)

  for (const line of errorLogLines(decision)) log(line)
}
