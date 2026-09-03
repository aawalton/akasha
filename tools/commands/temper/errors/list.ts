export const summary =
  "List captured ESO Lua errors from TemperErrors.lua (TSV by default; --json for full ErrorEntry[])"

import { readFile } from "node:fs/promises"
import * as addonsModule from "@akasha/temper-addons-resolve/addon-roster"
import type { ErrorEntry } from "@akasha/temper-capture-errors/errors-payload"
import * as collect from "@akasha/temper-errors-triage/errors-collect"
import type { Ownership } from "@akasha/temper-errors-triage/errors-liveness"
import * as livenessModule from "@akasha/temper-errors-triage/errors-liveness"
import * as schema from "@akasha/temper-errors-triage/errors-saved-variables"
import type { InferredCulprit } from "@akasha/temper-errors-triage/errors-triage"
import * as triageGatherModule from "@akasha/temper-errors-triage/errors-triage-gather"
import * as luaParser from "@akasha/temper-saved-variables/lua-parser"
import { dataError } from "../../../lib/exit.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import type { CommandHelp } from "../../../ops/surface.ts"

type AddonsResolve = typeof addonsModule
type Liveness = typeof livenessModule
type TriageGather = typeof triageGatherModule

// The verdict this command hangs on an entry before it renders one. Nothing
// under akasha carries it, because nothing but this rendering needs it.
interface ClassifiedEntry {
  readonly entry: ErrorEntry
  readonly verdict: string
  readonly reason: unknown
  readonly triage: string
  readonly triageReason: unknown
  readonly inferred?: InferredCulprit
}

import { savedVarsFile } from "../../../lib/temper-inventory-paths.ts"

const MESSAGE_PREVIEW_MAX = 120

const CALLSTACK_PREVIEW_MAX = 200

const HOUR_MS = 60 * 60 * 1000

export const help: CommandHelp = {
  flags: [
    {
      name: "--errors-path",
      argLabel: "<path>",
      valueShape: "token",
      description: `Path to TemperErrors.lua (default: /home/walton/.steam/steam/steamapps/compatdata/306130/pfx/drive_c/users/steamuser/Documents/Elder Scrolls Online/live/SavedVariables/TemperErrors.lua)`,
    },
    {
      name: "--json",
      description: "Emit a JSON array of ErrorEntry objects (+ liveness fields) instead of TSV",
    },
    {
      name: "--include-stale",
      aliases: ["--all"],
      description: "Show stale (phantom-residue) entries too, with the liveness column",
    },
    {
      name: "--stale-after-hours",
      argLabel: "<n>",
      valueShape: "token",
      default: "24",
      description:
        "Recency window: an entry more than <n>h behind the log frontier is stale " +
        "(default 24)",
    },
  ],
  examples: [
    "ops temper errors list",
    "ops temper errors list --include-stale",
    "ops temper errors list --json --all",
    "ops temper errors list --stale-after-hours 48",
    "ops temper errors list --errors-path ./TemperErrors.lua",
  ],
}

function buildMessagePreview(message: string): string {
  const firstLine = message.split("\n", 1)[0] ?? ""
  if (firstLine.length <= MESSAGE_PREVIEW_MAX) return firstLine
  return `${firstLine.slice(0, MESSAGE_PREVIEW_MAX)}…`
}

function buildCallstackPreview(traceback: string | null | undefined): string {
  if (traceback === null || traceback === undefined || traceback.length === 0) {
    return "(no callstack)"
  }
  const flattened = traceback
    .replace(/^stack traceback:\s*/, "")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join(" <- ")
  if (flattened.length <= CALLSTACK_PREVIEW_MAX) return flattened
  return `${flattened.slice(0, CALLSTACK_PREVIEW_MAX)}…`
}

async function runGit(
  args: readonly string[],
  cwd: string
): Promise<{ ok: boolean; stdout: string }> {
  const proc = Bun.spawn(["git", ...args], { cwd, stdout: "pipe", stderr: "pipe" })
  const stdout = await new Response(proc.stdout).text()
  await proc.exited
  return { ok: proc.exitCode === 0, stdout }
}

async function resolveRepoRoot(): Promise<string | null> {
  try {
    const r = await runGit(["rev-parse", "--show-toplevel"], process.cwd())
    const root = r.stdout.trim()
    return r.ok && root.length > 0 ? root : null
  } catch {
    return null
  }
}

function buildRoster(repoRoot: string, addons: AddonsResolve): ReadonlyMap<string, string> {
  const map = new Map<string, string>()
  try {
    for (const addon of addons.listAllAddons({ repoRoot })) {
      if (!map.has(addon.canonicalName)) map.set(addon.canonicalName, addon.repoRelDir)
    }
  } catch {
    return map
  }
  return map
}

async function latestFixMs(
  repoRoot: string,
  repoRelDir: string,
  cache: Map<string, number | null>
): Promise<number | null> {
  const cached = cache.get(repoRelDir)
  if (cached !== undefined) return cached
  let result: number | null = null
  try {
    const r = await runGit(["log", "-1", "--format=%cI", "--", repoRelDir], repoRoot)
    const iso = r.stdout.trim()
    if (r.ok && iso.length > 0) {
      const ms = Date.parse(iso)
      result = Number.isNaN(ms) ? null : ms
    }
  } catch {
    result = null
  }
  cache.set(repoRelDir, result)
  return result
}

async function resolveOwnership(
  traceback: string | null | undefined,
  roster: ReadonlyMap<string, string>,
  repoRoot: string | null,
  cache: Map<string, number | null>,
  liveness: Liveness
): Promise<Ownership> {
  for (const candidate of liveness.extractOwningAddonCandidates(traceback)) {
    const repoRelDir = roster.get(candidate)
    if (repoRelDir !== undefined) {
      const fix = repoRoot !== null ? await latestFixMs(repoRoot, repoRelDir, cache) : null
      return { kind: "in-repo", repoRelDir, latestFixMs: fix }
    }
  }
  return { kind: "external" }
}

async function classifyEntries(
  entries: readonly ErrorEntry[],
  staleAfterMs: number,
  addons: AddonsResolve,
  liveness: Liveness,
  triageGather: TriageGather
): Promise<readonly ClassifiedEntry[]> {
  const frontierMs = Math.max(...entries.map((e) => e.lastSeenAt * 1000))
  const repoRoot = await resolveRepoRoot()
  const roster = repoRoot !== null ? buildRoster(repoRoot, addons) : new Map<string, string>()
  const fixCache = new Map<string, number | null>()
  const buildIdCache = new Map<string, string | null>()

  const classified: ClassifiedEntry[] = []
  for (const entry of entries) {
    const ownership = await resolveOwnership(entry.traceback, roster, repoRoot, fixCache, liveness)
    const { verdict, reason } = liveness.classifyLiveness({
      lastSeenAtMs: entry.lastSeenAt * 1000,
      frontierMs,
      staleAfterMs,
      ownership,
    })
    const {
      triage,
      reason: triageReason,
      inferred,
    } = await triageGather.gatherTriage(entry, (folder) =>
      triageGather.readDeployedBuildId(folder, buildIdCache)
    )
    classified.push({ entry, verdict, reason, triage, triageReason, inferred })
  }
  return classified
}

function buildIdCell(entry: ErrorEntry, inferred: InferredCulprit | undefined): string {
  if (entry.attributedAddon !== undefined) {
    return `${entry.attributedAddon}@${entry.attributedBuildId ?? "?"}`
  }
  if (inferred !== undefined) {
    return `~${inferred.addon}@${inferred.loadedBuildId ?? "?"}`
  }
  return "-"
}

function renderTsv(shown: readonly ClassifiedEntry[]): string {
  const rows: string[] = [
    "liveness\tlastSeenAt\tcount\tcharacter\tworld\tapiVersion\tbuild\ttriage\tmessagePreview\tcallstack",
  ]
  for (const { entry, verdict, triage, inferred } of shown) {
    const isoLastSeen = new Date(entry.lastSeenAt * 1000).toISOString()
    const preview = buildMessagePreview(entry.message)
    const callstack = buildCallstackPreview(entry.traceback)
    const build = buildIdCell(entry, inferred)
    rows.push(
      `${verdict}\t${isoLastSeen}\t${entry.count}\t${entry.character}\t${entry.world}\t${entry.apiVersion}\t${build}\t${triage}\t${preview}\t${callstack}`
    )
  }
  return rows.join("\n")
}

export default async function errorsList(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const addons = addonsModule
  const liveness = livenessModule
  const triageGather = triageGatherModule

  const errorsPath = parsed.string("--errors-path") ?? (await savedVarsFile("TemperErrors.lua"))
  const includeStale = parsed.boolean("--include-stale") || parsed.boolean("--all")
  const staleAfterHours =
    parsed.nonNegativeInt("--stale-after-hours") ?? liveness.DEFAULT_STALE_AFTER_HOURS
  const staleAfterMs = staleAfterHours * HOUR_MS
  const asJson = parsed.boolean("--json")

  let content: string
  try {
    content = await readFile(errorsPath, "utf8")
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err)
    throw dataError(
      `no captured errors yet — TemperErrors.lua not found at ${errorsPath}: ${reason}`
    )
  }

  const raw = luaParser.parseLuaSavedVariablesFile(content, collect.SAVED_VARIABLES_NAME)
  const root = schema.rootSchema.parse(raw)
  const entries = collect.collectEntries(root)

  if (entries.length === 0) {
    process.stdout.write("(no errors captured)\n")
    return
  }

  const classified = await classifyEntries(entries, staleAfterMs, addons, liveness, triageGather)
  const shown = includeStale ? classified : classified.filter((c) => c.verdict === "live")
  const suppressed = classified.length - shown.length

  if (asJson) {
    const out = shown.map((c) => ({
      ...c.entry,
      liveness: c.verdict,
      livenessReason: c.reason,
      triage: c.triage,
      triageReason: c.triageReason,
      ...(c.inferred !== undefined ? { inferredCulprit: c.inferred } : {}),
    }))
    process.stdout.write(`${JSON.stringify(out)}\n`)
  } else if (shown.length === 0) {
    process.stdout.write("(no live errors)\n")
  } else {
    process.stdout.write(`${renderTsv(shown)}\n`)
  }

  if (suppressed > 0 && !includeStale) {
    process.stderr.write(`${suppressed} stale suppressed (--include-stale to show)\n`)
  }
}
