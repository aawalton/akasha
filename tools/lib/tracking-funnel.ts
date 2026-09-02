import { type Dirent, readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { DAILY_TRACKING, SESSION_TRACKING } from "./tracking/day-place.ts"

/**
 * Where this scanner looks: everything under `tools/`.
 *
 * It used to look under three folders and answer `coverage=complete`, which asserted a census of
 * the repository while weighing 38 of its 1800 files. Every reader of one of Alan's days that
 * lives elsewhere — `lib/daily-tracking`, `lib/surplus-fall` — was outside the population and so
 * could never be a finding. The population is now the tree, and which files in it are weighed is
 * decided by what each file does rather than by where it sits.
 */
export const SCAN_UNDER = "tools"

/**
 * The folders whose files may not spell a day page type at all, even where they touch no store.
 *
 * This is the older and stricter of the two rules, and it is kept exactly as it was. Widening it
 * to the tree would be worse than useless: the folder `lib/daily-tracking` and its four siblings
 * are themselves named `daily-tracking`, one module holds `WRITER = "daily-tracking"` as a git
 * identity, and the reference key a session row carries to name its day is also spelled
 * `daily-tracking`. Roughly nine in ten of the literals under `tools/` are one of those. Inside
 * the funnel's own folders the literal means what the rule says it means; outside them the reach
 * rule below carries the weight, and it is precise because it asks what the file does as well.
 */
export const FUNNEL_DIRS = ["lib/tracking", "commands/tracking", "lib/inbox-tracking"] as const

/**
 * The files permitted to reach the page store while naming a day.
 *
 * `day-place.ts` is the funnel. `activities.ts` and `email-entry.ts` write pages that are not days,
 * so they reach the page store without deciding where a day is kept.
 *
 * These are also the nodes a reach does not travel through. Importing `day-place.ts` is the thing
 * every caller is supposed to do, so if the funnel counted as a road to the store then asking the
 * funnel would itself be the finding, and `lib/wake-day.ts` — which asks `derivedDayOf` exactly as
 * it should — would be refused for it.
 */
export const ALLOWED_TO_REACH = [
  "lib/tracking/day-place.ts",
  "lib/tracking/activities.ts",
  "lib/inbox-tracking/email-entry.ts",
] as const

/**
 * The scanner itself, which spells every verb and page type below as a literal.
 *
 * It used to be kept out of the population by living outside the three scanned folders. Now that
 * the population is the tree it has to be named, or it is the first thing it refuses.
 */
export const THE_SCANNER = ["lib/tracking-funnel.ts", "commands/audit/tracking-funnel.ts"] as const

/** Verbs of the page store that put something into it. */
export const WRITE_VERBS = [
  "pageLanding",
  "patchPage",
  "rowLanding",
  "rowsLanding",
  "removeRow",
  "writePage",
  "patchState",
  "writeFiles",
] as const

/**
 * Verbs of the page store that take something out of it.
 *
 * These were absent, and their absence is why the audit had never once reported a finding: it
 * looked only for writes, so every read of a day around the funnel was invisible to it. A read is
 * the same fault as a write. The query engine answers out of the markdown half; once a day moves,
 * an unfunnelled read answers that the day is empty and raises nothing — `commands/tracking/
 * edit.ts` would report "session not found", which is a wrong statement rather than a refusal.
 */
export const READ_VERBS = ["askComposed", "askTaking", "askingFor", "readFiles"] as const

export const STORE_VERBS = [...WRITE_VERBS, ...READ_VERBS] as const

/**
 * Every module that is the page store, whatever name it answers to.
 *
 * The old scan knew one road, `page-query-client.ts`, and there are four. Two of them are packages
 * rather than files, and both are re-exported through a barrel — `lib/daily-tracking/
 * tracking-modules.ts` hands out `askComposed` from `@shared/pages-query/ask` under the same name
 * the local client uses. That barrel carries a comment recording that this exact shape had already
 * hidden six permanently-refusing calls, because no search for the package named any of the six.
 * The same shape then hid two of the loudest reads of a day from this audit.
 */
export const CLIENT_ROADS = [
  "lib/page-query-client.ts",
  "lib/page-query-landing.ts",
  "lib/page-write.ts",
  "lib/page-rows-write.ts",
] as const

export const CLIENT_PACKAGES = ["@shared/pages-query", "@akasha/pages-system-service"] as const

export const NAMES_THE_FUNNEL = "lib/tracking/day-place.ts"

/** The names the funnel exports for the two day page types. */
export const DAY_CONSTANTS = ["DAILY_TRACKING", "SESSION_TRACKING"] as const

const TS = ".ts"

const TEST_TS = ".test.ts"

const DECLARATION_TS = ".d.ts"

const NOT_WALKED: ReadonlySet<string> = new Set(["node_modules", ".git", "dist", "coverage"])

/** `import { a, b } from "./x.ts"`, `export { a } from "./x.ts"`, and their `type` forms. */
const NAMED_IMPORT = /(?:import|export)\s+(type\s+)?\{([^}]*)\}\s*from\s*"([^"]+)"/g

/** `import * as x from "./y.ts"` — which bindings are taken cannot be read off it. */
const STAR_IMPORT = /(?:import|export)\s+(?:type\s+)?\*(?:\s+as\s+\w+)?\s*from\s*"([^"]+)"/g

/** `await import("./x.ts")` — nor off this. */
const DYNAMIC_IMPORT = /\bimport\s*\(\s*"([^"]+)"\s*\)/g

/**
 * A backtick is not one of these on purpose.
 *
 * Every doc comment in this tree writes a code span in backticks, so `` `daily-tracking` `` in
 * prose is the commonest spelling of the slug there is. Counting it flagged
 * `lib/tracking/akasha-day.ts:83` and `lib/daily-tracking/value-points.ts:108`, both of which only
 * talk about a day. Every string literal in this tree is written with a double quote.
 */
const QUOTES = ['"', "'"] as const

/** The module a page type is handed to that does not query it, so passing through is no reach. */
export const NOT_A_DAY_ROAD = ["lib/tracking/held-row.ts"] as const

export type BypassKind = "write" | "read" | "carried" | "opaque" | "names"

export interface Bypass {
  readonly path: string
  readonly kind: BypassKind
  /** The line the reach is taken on — the import, or the literal. */
  readonly line: number
  /** The lines the verb is called on, where a verb was found to look for. */
  readonly at: readonly number[]
  /** The module the reach was taken from, and how many hops that is off the store. */
  readonly via: string
  readonly hops: number
  readonly reason: string
}

/** A file or folder the scanner named and could not read, so nothing about it is known. */
export interface Unread {
  readonly path: string
  readonly why: string
}

export interface Reading {
  readonly scanned: readonly string[]
  readonly weighed: readonly string[]
  /** Every file that can reach the page store, at any number of hops. */
  readonly reachers: readonly string[]
  /** Every file that names one of the two day page types. */
  readonly namers: readonly string[]
  readonly bypasses: readonly Bypass[]
  readonly unread: readonly Unread[]
  readonly hops: number
  readonly coverage: "complete" | "truncated"
}

interface Taken {
  readonly module: string
  readonly values: readonly string[]
  readonly line: number
}

interface Opaque {
  readonly module: string
  readonly line: number
}

interface Imports {
  readonly taken: readonly Taken[]
  readonly opaque: readonly Opaque[]
}

function lineOf(text: string, index: number): number {
  let line = 1
  for (let each = 0; each < index; each += 1) if (text[each] === "\n") line += 1
  return line
}

/**
 * Every `.ts` file under `tools/`, and every folder that could not be listed.
 *
 * The folders it could not list used to be swallowed: `readdirSync` threw, the catch answered an
 * empty list, and a renamed folder took its files out of the population without taking anything
 * off the count or off the word `complete`. That is the fault this audit exists to catch, in the
 * audit itself.
 */
function filesUnder(at: string, prefix: string, unread: Unread[]): readonly string[] {
  let entries: readonly Dirent[]
  try {
    entries = readdirSync(at, { withFileTypes: true })
  } catch (thrown) {
    const named = prefix === "" ? "." : prefix
    unread.push({ path: named, why: `could not be listed: ${String(thrown)}` })
    return []
  }
  const found: string[] = []
  for (const entry of entries) {
    const relPath = prefix === "" ? entry.name : `${prefix}/${entry.name}`
    if (entry.isDirectory()) {
      if (NOT_WALKED.has(entry.name)) continue
      found.push(...filesUnder(join(at, entry.name), relPath, unread))
    } else if (entry.name.endsWith(TS)) found.push(relPath)
  }
  return found.sort()
}

export function funnelFilesIn(repoRoot: string, unread: Unread[] = []): readonly string[] {
  return filesUnder(join(repoRoot, SCAN_UNDER), "", unread)
}

/**
 * What a specifier names: a path relative to `tools/`, or the package as it was written.
 *
 * A package is kept whole because two of the four roads to the store are packages, and a scan that
 * dropped everything it could not resolve to a file would drop both.
 */
export function moduleOf(fromRel: string, specifier: string): string {
  if (!specifier.startsWith(".")) return specifier
  const parts = fromRel.split("/").slice(0, -1)
  for (const step of specifier.split("/")) {
    if (step === ".") continue
    if (step === "..") {
      parts.pop()
      continue
    }
    parts.push(step)
  }
  return parts.join("/")
}

export function isClientRoad(module: string): boolean {
  if ((CLIENT_ROADS as readonly string[]).includes(module)) return true
  return CLIENT_PACKAGES.some((one) => module === one || module.startsWith(`${one}/`))
}

function importsOf(relPath: string, text: string): Imports {
  const taken: Taken[] = []
  const opaque: Opaque[] = []
  for (const found of text.matchAll(NAMED_IMPORT)) {
    const named = (found[2] as string)
      .split(",")
      .map((each) => each.trim())
      .filter((each) => each !== "")
    const values =
      found[1] === undefined
        ? named
            .filter((each) => !each.startsWith("type "))
            .map((each) => each.split(/\s+as\s+/)[0] as string)
        : []
    const module = moduleOf(relPath, found[3] as string)
    taken.push({ module, values, line: lineOf(text, found.index) })
  }
  for (const found of [...text.matchAll(STAR_IMPORT), ...text.matchAll(DYNAMIC_IMPORT)]) {
    opaque.push({ module: moduleOf(relPath, found[1] as string), line: lineOf(text, found.index) })
  }
  return { taken, opaque }
}

function calledAt(text: string, verb: string): readonly number[] {
  const found: number[] = []
  for (const hit of text.matchAll(new RegExp(`\\b${verb}\\s*\\(`, "g"))) {
    found.push(lineOf(text, hit.index))
  }
  return found
}

/** Where a file spells one of the two day page types as a whole quoted literal, and on what line. */
function spellsDayType(text: string): ReadonlyMap<string, number> {
  const found = new Map<string, number>()
  for (const slug of [DAILY_TRACKING, SESSION_TRACKING]) {
    for (const quote of QUOTES) {
      const at = text.indexOf(`${quote}${slug}${quote}`)
      if (at >= 0 && !found.has(slug)) found.set(slug, lineOf(text, at))
    }
  }
  return found
}

/** Whether a file names a day at all — by the literal, or by taking the constant off the funnel. */
function namesADay(imports: Imports, spelled: ReadonlyMap<string, number>): boolean {
  if (spelled.size > 0) return true
  for (const one of imports.taken) {
    for (const name of one.values) {
      if ((DAY_CONSTANTS as readonly string[]).includes(name)) return true
    }
  }
  return false
}

function under(relPath: string, dir: string): boolean {
  return relPath.startsWith(`${dir}/`)
}

function inTheFunnelDirs(relPath: string): boolean {
  for (const dir of FUNNEL_DIRS) if (under(relPath, dir)) return true
  return false
}

function exempt(relPath: string): boolean {
  return (
    (ALLOWED_TO_REACH as readonly string[]).includes(relPath) ||
    (THE_SCANNER as readonly string[]).includes(relPath)
  )
}

export interface Reach {
  /** The module the store was taken from, which is the store itself at one hop. */
  readonly via: string
  readonly names: readonly string[]
  readonly line: number
  readonly hops: number
}

/**
 * Every file that can reach the page store, and by which module.
 *
 * This is a closure rather than one hop, because the command layer is three modules off the store:
 * `commands/tracking/edit.ts` takes `pagesAccess` from `lib/tracking-capability.ts`, which takes
 * `getPage` from `lib/tracking/pages.ts`, which takes `askComposed` from `page-query-client.ts`.
 * Nothing in `edit.ts` names the client, so no scan of direct imports could ever have seen it.
 *
 * The closure does not travel through the files in `ALLOWED_TO_REACH`. Taking `dayPlaceOf` off the
 * funnel is what every caller is supposed to do; if the funnel were a road then asking it would be
 * the finding.
 */
export function reachersIn(
  importsFor: (relPath: string) => Imports,
  files: readonly string[]
): { readonly found: ReadonlyMap<string, Reach>; readonly hops: number } {
  const found = new Map<string, Reach>()
  let hops = 0
  for (let round = 1; ; round += 1) {
    let moved = false
    for (const relPath of files) {
      if (found.has(relPath) || exempt(relPath)) continue
      const reach = reachOf(importsFor(relPath), found, round)
      if (reach === null) continue
      found.set(relPath, reach)
      hops = Math.max(hops, reach.hops)
      moved = true
    }
    if (!moved) return { found, hops }
  }
}

function reachOf(
  imports: Imports,
  found: ReadonlyMap<string, Reach>,
  round: number
): Reach | null {
  for (const one of imports.taken) {
    if (one.values.length === 0) continue
    if (isClientRoad(one.module)) {
      return { via: one.module, names: one.values, line: one.line, hops: 1 }
    }
  }
  if (round === 1) return null
  for (const one of imports.taken) {
    if (one.values.length === 0) continue
    const behind = found.get(one.module)
    if (behind === undefined) continue
    return { via: one.module, names: one.values, line: one.line, hops: behind.hops + 1 }
  }
  return null
}

function kindOf(verb: string): BypassKind {
  return (WRITE_VERBS as readonly string[]).includes(verb) ? "write" : "read"
}

function farOff(hops: number): string {
  return hops <= 1
    ? ""
    : ` — ${String(hops)} hops off the store, so no search for the client names this file`
}

function verbReason(verb: string, via: string, hops: number, kind: BypassKind): string {
  const how =
    kind === "write"
      ? "which writes the page store around the funnel; land the write through"
      : "which reads the page store around the funnel, so it answers out of the markdown half " +
        "whatever `dayPlaceOf` says about the day; ask through"
  return (
    `names a day page type and takes \`${verb}\` from \`${via}\`, ${how} ` +
    `\`tools/${NAMES_THE_FUNNEL}\` instead${farOff(hops)}`
  )
}

function carriedReason(via: string, hops: number): string {
  return (
    `hands a day page type into \`tools/${via}\`, which reaches the page store; which verb it ` +
    "ends at cannot be read off this file, so the reach is counted rather than cleared. Ask " +
    `through \`tools/${NAMES_THE_FUNNEL}\` instead${farOff(hops)}`
  )
}

/** The lines a file names a day page type on, which is where a carried reach hands it over. */
function namedAt(text: string, imports: Imports): readonly number[] {
  const taken = new Set(imports.taken.map((one) => one.line))
  const found = new Set<number>()
  for (const slug of [DAILY_TRACKING, SESSION_TRACKING]) {
    for (const quote of QUOTES) {
      for (const hit of text.matchAll(new RegExp(`${quote}${slug}${quote}`, "g"))) {
        found.add(lineOf(text, hit.index))
      }
    }
  }
  for (const name of DAY_CONSTANTS) {
    for (const hit of text.matchAll(new RegExp(`\\b${name}\\b`, "g"))) {
      const line = lineOf(text, hit.index)
      if (!taken.has(line)) found.add(line)
    }
  }
  return [...found].sort((one, two) => one - two)
}

export function readingOf(
  repoRoot: string,
  readFile: (relPath: string) => string = (relPath) =>
    readFileSync(join(repoRoot, SCAN_UNDER, relPath), "utf8")
): Reading {
  const unread: Unread[] = []
  const scanned = funnelFilesIn(repoRoot, unread)

  const text = new Map<string, string>()
  const weighed: string[] = []
  for (const relPath of scanned) {
    if (relPath.endsWith(TEST_TS) || relPath.endsWith(DECLARATION_TS)) continue
    try {
      text.set(relPath, readFile(relPath))
      weighed.push(relPath)
    } catch (thrown) {
      unread.push({ path: relPath, why: `could not be read: ${String(thrown)}` })
    }
  }

  const parsed = new Map<string, Imports>()
  const importsFor = (relPath: string): Imports => {
    const held = parsed.get(relPath)
    if (held !== undefined) return held
    const made = importsOf(relPath, text.get(relPath) ?? "")
    parsed.set(relPath, made)
    return made
  }

  const { found: reaches, hops } = reachersIn(importsFor, weighed)

  const namers = new Set<string>()
  const spelling = new Map<string, ReadonlyMap<string, number>>()
  for (const relPath of weighed) {
    const spelled = spellsDayType(text.get(relPath) as string)
    spelling.set(relPath, spelled)
    if (namesADay(importsFor(relPath), spelled)) namers.add(relPath)
  }

  const road = (module: string): number | null => {
    if (isClientRoad(module)) return 1
    const behind = reaches.get(module)
    return behind === undefined ? null : behind.hops + 1
  }

  const bypasses: Bypass[] = []
  for (const relPath of weighed) {
    if (!namers.has(relPath) || exempt(relPath)) continue
    const body = text.get(relPath) as string
    const imports = importsFor(relPath)

    const took = verbsTaken(imports, road)
    for (const one of took) {
      const kind = kindOf(one.verb)
      bypasses.push({
        path: relPath,
        kind,
        line: one.line,
        at: calledAt(body, one.verb),
        via: one.via,
        hops: one.hops,
        reason: verbReason(one.verb, one.via, one.hops, kind),
      })
    }
    if (took.length === 0) {
      const carried = carriedBy(imports, road, namers)
      if (carried !== null) {
        bypasses.push({
          path: relPath,
          kind: "carried",
          line: carried.line,
          at: namedAt(body, imports),
          via: carried.via,
          hops: carried.hops,
          reason: carriedReason(carried.via, carried.hops),
        })
      }
    }
    if (relPath !== NAMES_THE_FUNNEL && inTheFunnelDirs(relPath)) {
      bypasses.push(...namesTheDayTypes(relPath, spelling.get(relPath) ?? new Map()))
    }
    for (const one of imports.opaque) {
      if (!isClientRoad(one.module)) continue
      bypasses.push({
        path: relPath,
        kind: "opaque",
        line: one.line,
        at: [],
        via: one.module,
        hops: 1,
        reason:
          `names a day page type and takes \`${one.module}\` whole, so which verbs it reaches ` +
          "with cannot be read off the file; this reach is counted rather than cleared",
      })
    }
  }

  const coverage = unread.length === 0 ? "complete" : "truncated"
  return {
    scanned,
    weighed,
    reachers: [...reaches.keys()].sort(),
    namers: [...namers].sort(),
    bypasses,
    unread,
    hops,
    coverage,
  }
}

interface Took {
  readonly verb: string
  readonly via: string
  readonly hops: number
  readonly line: number
}

/**
 * Every store verb the file takes by name, from the store or from anything that re-exports it.
 *
 * The name is the evidence, so this holds however far off the store the module is:
 * `lib/daily-tracking/breathing-sets.ts` takes `askComposed` from a barrel two hops away, and it
 * is the same `askComposed`.
 */
function verbsTaken(imports: Imports, road: (module: string) => number | null): readonly Took[] {
  const found: Took[] = []
  for (const one of imports.taken) {
    const hops = road(one.module)
    if (hops === null) continue
    for (const verb of one.values) {
      if (!(STORE_VERBS as readonly string[]).includes(verb)) continue
      found.push({ verb, via: one.module, hops, line: one.line })
    }
  }
  return found
}

/**
 * The one module a file hands a day page type into without naming a verb.
 *
 * This is how the command layer reaches a session row: `commands/tracking/edit.ts` takes
 * `pagesAccess` off a barrel, which hands out `getPage`, which fills `page-type` from whatever its
 * caller passed. Nothing in `edit.ts` names a store verb, so the tier above cannot see it.
 *
 * It does not travel through a module that itself names a day, because that module is already a
 * finding of its own and the fix belongs there rather than at everyone who calls it — otherwise
 * `lib/inbox-tracking/persist.ts`, which asks `askDayByDate` exactly as it should, is refused for
 * calling `resolve.ts`. One per file, because a barrel hands out a dozen names and the file
 * reaches the store once.
 */
function carriedBy(
  imports: Imports,
  road: (module: string) => number | null,
  namers: ReadonlySet<string>
): Took | null {
  for (const one of imports.taken) {
    if (one.values.length === 0) continue
    if (namers.has(one.module)) continue
    if ((NOT_A_DAY_ROAD as readonly string[]).includes(one.module)) continue
    const hops = road(one.module)
    if (hops === null) continue
    return { verb: one.values[0] as string, via: one.module, hops, line: one.line }
  }
  return null
}

function namesTheDayTypes(
  relPath: string,
  spelled: ReadonlyMap<string, number>
): readonly Bypass[] {
  const found: Bypass[] = []
  for (const [slug, line] of spelled) {
    found.push({
      path: relPath,
      kind: "names",
      line,
      at: [],
      via: relPath,
      hops: 0,
      reason:
        `spells the page type \`${slug}\`, so it decides for itself where a day is kept; take ` +
        `the page type from \`tools/${NAMES_THE_FUNNEL}\` instead`,
    })
  }
  return found
}
