import { AKASHA, rootFor } from "../../repo/roots/roots.ts"
import { readdirSync, readFileSync, statSync } from "node:fs"
import type { Check } from "../lib/check.ts"
import { entriesOf, type HookEntry } from "../lib/hook-merge.ts"
import { advise, judge, over, skip } from "../../outcome/outcome"
import { refusalText } from "../../refusal/refusal.ts"
import { type History, historyOf } from "../lib/settings-history.ts"
import { SETTINGS_PATH } from "../lib/hook-settings.ts"

const NAME = "hooks-delivered"

const NUL = String.fromCharCode(0)

export interface Seat {
  readonly pid: string
  readonly settings: string | null
  readonly startedAt: number | null
}

export function seatsUnder(procRoot = "/proc"): readonly Seat[] {
  let listing: readonly string[]
  try {
    listing = readdirSync(procRoot)
  } catch {
    return []
  }
  const seats: Seat[] = []
  for (const pid of listing) {
    if (!/^[0-9]+$/.test(pid)) continue
    let argv: readonly string[]
    try {
      argv = readFileSync(`${procRoot}/${pid}/cmdline`, "utf8")
        .split(NUL)
        .filter((one) => one !== "")
    } catch {
      continue
    }
    const argv0 = argv[0]
    if (argv0 === undefined) continue
    if ((argv0.split("/").pop() ?? "") !== "claude") continue
    let startedAt: number | null
    try {
      startedAt = statSync(`${procRoot}/${pid}`).ctimeMs
    } catch {
      startedAt = null
    }
    const at = argv.indexOf("--settings")
    seats.push({ pid, settings: at === -1 ? null : (argv[at + 1] ?? null), startedAt })
  }
  return seats
}

function key(entry: HookEntry): string {
  return [entry.event, entry.matcher, entry.target].join(NUL)
}

function describe(identifier: string): string {
  const [event, matcher, target] = identifier.split(NUL)
  return `${event} \`${matcher}\` runs ${target}`
}

export function divergences(
  registered: unknown,
  delivered: unknown
): { readonly missing: readonly string[]; readonly extra: readonly string[] } {
  const ours = new Set(entriesOf(registered).map(key))
  const theirs = new Set(entriesOf(delivered).map(key))
  return {
    missing: [...ours].filter((one) => !theirs.has(one)),
    extra: [...theirs].filter((one) => !ours.has(one)),
  }
}

interface Arm {
  readonly real: readonly string[]
  readonly selfClearing: readonly string[]
}

export interface Classified {
  readonly missing: Arm
  readonly extra: Arm
  readonly established: boolean
}

export function classified(registered: unknown, delivered: unknown, atLaunch: unknown): Classified {
  const { missing, extra } = divergences(registered, delivered)
  if (atLaunch === null) {
    return {
      missing: { real: missing, selfClearing: [] },
      extra: { real: extra, selfClearing: [] },
      established: false,
    }
  }
  const then = new Set(entriesOf(atLaunch).map(key))
  return {
    missing: {
      real: missing.filter((one) => then.has(one)),
      selfClearing: missing.filter((one) => !then.has(one)),
    },
    extra: {
      real: extra.filter((one) => !then.has(one)),
      selfClearing: extra.filter((one) => then.has(one)),
    },
    established: true,
  }
}

function parsed(text: string): unknown {
  try {
    return JSON.parse(text) as unknown
  } catch {
    return null
  }
}

function byLaunch(seats: readonly Seat[], history: History): Map<string, Seat[]> {
  const groups = new Map<string, Seat[]>()
  for (const seat of seats) {
    const key = history.revisionAt(seat.startedAt) ?? ""
    const already = groups.get(key)
    if (already === undefined) groups.set(key, [seat])
    else already.push(seat)
  }
  return groups
}

export const hooksDelivered: Check = (repo) => {
  const root = rootFor(repo.roots, AKASHA)
  if (!repo.exists(`${rootFor(repo.roots, AKASHA)}/${SETTINGS_PATH}`)) {
    return {
      ...skip(NAME, `${SETTINGS_PATH} is not there, so this repository registers no hook to check`),
      population: over(0, "live seat(s)"),
    }
  }
  const ours = parsed(repo.read(SETTINGS_PATH))
  if (ours === null) {
    return {
      ...skip(
        NAME,
        `${SETTINGS_PATH} is not readable JSON, so which hooks it registers cannot be known`
      ),
      population: over(0, "live seat(s)"),
    }
  }
  const registered = new Set(entriesOf(ours).map(key)).size

  const seats = seatsUnder()
  const carrying = seats.filter((seat) => seat.settings !== null)
  const onUserTier = seats.length - carrying.length
  if (seats.length === 0) {
    return {
      ...skip(NAME, "no live seat to ask, so nothing here says what any client was handed"),
      population: over(0, "live seat(s)"),
    }
  }
  if (carrying.length === 0) {
    return {
      ...skip(
        NAME,
        `${onUserTier} live seat(s), none carrying \`--settings\`, so every one is reading the user ` +
          "tier — which is hooks-agree's arm rather than this one's"
      ),
      population: over(0, "live seat(s)"),
    }
  }

  const history = historyOf(rootFor(repo.roots, AKASHA), SETTINGS_PATH)
  const refusals: string[] = []
  const notices: string[] = []
  const payloads = [...new Set(carrying.map((seat) => seat.settings as string))].sort()
  for (const path of payloads) {
    const here = carrying.filter((seat) => seat.settings === path)
    let text: string
    try {
      text = readFileSync(path, "utf8")
    } catch {
      refusals.push(
        refusalText(
          "hook-payload-unreadable",
          { path, pids: here.map((seat) => seat.pid).join(", ") },
          root
        )
      )
      continue
    }
    const delivered = parsed(text)
    if (delivered === null) {
      refusals.push(
        refusalText(
          "hook-payload-not-json",
          { path, pids: here.map((seat) => seat.pid).join(", ") },
          root
        )
      )
      continue
    }
    for (const group of byLaunch(here, history).values()) {
      const pids = group.map((seat) => seat.pid).join(", ")
      const { missing, extra, established } = classified(
        ours,
        delivered,
        history.at(group[0]?.startedAt ?? null)
      )
      for (const one of missing.selfClearing) {
        notices.push(
          refusalText("hook-registered-after-launch", { what: describe(one), pids }, root)
        )
      }
      for (const one of missing.real) {
        refusals.push(
          established
            ? refusalText("hook-missing-from-payload", { what: describe(one), path, pids }, root)
            : refusalText(
                "hook-missing-from-payload-unsettled",
                { what: describe(one), path, pids },
                root
              )
        )
      }
      for (const one of extra.selfClearing) {
        notices.push(
          refusalText("hook-dropped-since-launch", { what: describe(one), pids, path }, root)
        )
      }
      for (const one of extra.real) {
        refusals.push(
          established
            ? refusalText("hook-extra-in-payload", { what: describe(one), pids, path }, root)
            : refusalText(
                "hook-extra-in-payload-unsettled",
                { what: describe(one), pids, path },
                root
              )
        )
      }
    }
  }

  const population = over(carrying.length, "live seat(s) carrying a payload")
  const detail =
    `${registered} registration(s) reached ${carrying.length} live seat(s) across ` +
    `${payloads.length} distinct payload(s); ${onUserTier} seat(s) on the user tier instead` +
    (notices.length === 0 ? "" : `; ${notices.length} divergence(s) the launch order explains`)
  if (refusals.length > 0) return { ...judge(NAME, detail, refusals), population }
  return { ...advise(NAME, detail, notices), population }
}
