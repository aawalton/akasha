/**
 * The landing: the act that moves Alan's tracked days out of markdown and turns the funnel.
 *
 * This file composes and implements nothing of its own that already stands. The days are read by
 * `tools/daily-tracking-migration/read-days.ts`, turned by `convert.ts`, judged by
 * `tools/daily-tracking-fidelity`, read back by akasha's own `entriesAt`, and the funnel it turns is
 * `tools/lib/tracking/day-place.ts`. What it adds is the three things none of those do: a
 * fingerprint of a corpus that is being appended to while this runs, an order of steps in which
 * stopping between any two leaves a working system, and an undo for every step it took.
 *
 * The order is snapshot, turn, verify, then write — never write then check. A landing that writes
 * first has already spent the thing it was going to check.
 *
 * The corpus moves under this command. Alan's tracking appends a session row while it runs. So the
 * source is fingerprinted before the snapshot, again before the write, again after the write and
 * again after the funnel turns; any difference at any of those points undoes everything and refuses,
 * naming the file and how it changed. The appended row is never lost, because nothing here ever
 * removes or edits a source file — the old corpus is whole at every instant, and taking it away is a
 * later act with its own gate.
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, renameSync, rmSync, statSync, writeFileSync } from "node:fs"
import { join, resolve } from "node:path"
import { uuidVersion7 } from "../../akasha/command-system/value-minting/value-minting.module.code.ts"
import { entriesAt } from "../../akasha/pages-system/page/page-entries/page-entries.module.code.ts"
import { compareCorpora } from "../daily-tracking-fidelity/compare.ts"
import { readAkashaPageCorpus, readMarkdownCorpus } from "../daily-tracking-fidelity/read-corpus.ts"
import { type Converted, convertDay, refused } from "../daily-tracking-migration/convert.ts"
import { readDays } from "../daily-tracking-migration/read-days.ts"
import {
  COMPLETED_TASKS_SLUG,
  DAY_PAGE_TYPE,
  DECLARING_IMPORT,
  ENTRY_EXTENSION,
  PROPERTY_PAGES_NEEDED,
  SESSIONS_SLUG,
} from "../daily-tracking-migration/shape.ts"
import { kebabizeKey } from "../lib/tracking/keys.ts"
import { AKASHA as AKASHA_PLACE, dayPageAt } from "../lib/tracking/day-place.ts"
import { carryIn, carryOut, isAkashaPath } from "./carry.ts"
import { type Declared, declaredIn, pageTypeFilesIn, undeclaredAmong } from "./declared.ts"
import { type Drift, driftBetween, type Fingerprint, fingerprintJson, fingerprintOf } from "./fingerprint.ts"
import { flippedTo, namesNoDay } from "./flip.ts"

const HERE = resolve(import.meta.dir, "..", "..")

const LIVE = join(HERE, "pages", "daily-tracking")

const AKASHA_DIR = join(HERE, "akasha")

const FUNNEL = join(HERE, "tools", "lib", "tracking", "day-place.ts")

const FUNNEL_TEST = join(HERE, "tools", "lib", "tracking", "day-place.test.ts")

/** The assertion in the funnel's test that states the world before this landing. */
const TEST_SAYS_UNMOVED = "expect(MIGRATED_DAYS.size).toBe(0)"

const WRITE_MESSAGE = "Every day Alan tracked stands as an akasha page, with its rows beside it"

const UNDO_MESSAGE = "the landing took its own day pages back, because the corpus moved under it"

const MD_SUFFIX = `.${DAY_PAGE_TYPE}.md`

const SIDECARS = [
  `.${DAY_PAGE_TYPE}.${SESSIONS_SLUG}.${ENTRY_EXTENSION}`,
  `.${DAY_PAGE_TYPE}.${COMPLETED_TASKS_SLUG}.${ENTRY_EXTENSION}`,
]

const HELP = `daily-tracking landing

  bun tools/daily-tracking-landing/land.ts --into <dir> [--from <dir>] [--funnel <file>] [--for-real]

  --from      the corpus to land, defaulting to pages/daily-tracking
  --into      where the day pages and their rows land
  --funnel    the file holding MIGRATED_DAYS, defaulting to tools/lib/tracking/day-place.ts
  --work      where the snapshot and the staged tree are built, defaulting to a fresh temp dir
  --keep      leave the work directory behind
  --for-real  land inside this repository; without it, --into and --funnel must be outside it

  Exit 0 when the day pages stand, every value round-trips and the funnel names every day moved.
  Exit 1 on any refusal, with nothing left changed. Exit 2 on a usage error.
`

function argOf(name: string): string | null {
  const at = process.argv.indexOf(`--${name}`)
  if (at === -1) return null
  const said = process.argv[at + 1]
  if (said === undefined || said.startsWith("--")) {
    process.stderr.write(`--${name} needs a value\n`)
    process.exit(2)
  }
  return said
}

function say(line: string): void {
  process.stdout.write(`${line}\n`)
}

/** Every step this landing took that it knows how to take back, newest first. */
const undo: { readonly what: string; readonly take: () => void }[] = []

function undone(): readonly string[] {
  const said: string[] = []
  for (const one of [...undo].reverse()) {
    try {
      one.take()
      said.push(`  undone  ${one.what}`)
    } catch (error) {
      said.push(`  STUCK   ${one.what} :: ${(error as Error).message}`)
    }
  }
  undo.length = 0
  return said
}

function refuse(step: string, reasons: readonly string[]): never {
  process.stdout.write(`\nREFUSED at ${step}\n`)
  for (const why of reasons) process.stdout.write(`  ${why}\n`)
  if (undo.length > 0) {
    process.stdout.write(`\ntaking back ${String(undo.length)} step(s)\n`)
    for (const line of undone()) process.stdout.write(`${line}\n`)
  }
  process.stdout.write("\nVERDICT refused, and the old corpus is untouched\n")
  process.exit(1)
}

/** Written to a name beside the target and moved onto it, so no half file is ever readable. */
function landFile(at: string, text: string): void {
  const temp = `${at}.landing-${String(process.pid)}`
  writeFileSync(temp, text)
  renameSync(temp, at)
}

function driftSaid(drift: readonly Drift[], when: string): readonly string[] {
  return [
    `the corpus changed ${when}, so what this landing read is no longer what stands there`,
    ...drift.map((one) => `  ${one.name} ${one.kind}: ${one.detail}`),
    "Nothing is lost: every change is in the old markdown corpus, which this landing never writes.",
    "Run it again when tracking is quiet.",
  ]
}

/**
 * The akasha half of the funnel's write verbs.
 *
 * `dayPageAt` refuses for a migrated day until that half is built. Turning `MIGRATED_DAYS` before it
 * is built points every writer at a verb that throws — which is a corpus that refuses rather than a
 * corpus that splits, and still no place for Alan's next session row to go. So the landing asks the
 * funnel itself rather than trusting a note about it.
 */
function funnelWritesToAkasha(): boolean {
  try {
    dayPageAt(AKASHA_PLACE, "write", "2026-01-01")
    return true
  } catch {
    return false
  }
}

function insideRepo(at: string): boolean {
  const said = resolve(at)
  return said === HERE || said.startsWith(`${HERE}/`)
}

type Told = {
  readonly from: string
  readonly into: string
  readonly funnel: string
  readonly work: string
  readonly forReal: boolean
  readonly keep: boolean
}

function told(): Told {
  const from = resolve(argOf("from") ?? LIVE)
  const into = argOf("into")
  if (into === null) {
    process.stderr.write(HELP)
    process.exit(2)
  }
  const work =
    argOf("work") ?? join(process.env["TMPDIR"] ?? "/tmp", `daily-tracking-landing-${String(process.pid)}`)
  return {
    from,
    into: resolve(into),
    funnel: resolve(argOf("funnel") ?? FUNNEL),
    work: resolve(work),
    forReal: process.argv.includes("--for-real"),
    keep: process.argv.includes("--keep"),
  }
}

/** Refusals that need nothing read and no file written, so they cost the corpus nothing. */
async function preconditions(at: Told): Promise<{
  readonly said: readonly string[]
  readonly declared: Declared | null
}> {
  const said: string[] = []
  let declared: Declared | null = null

  if (!existsSync(at.from) || !statSync(at.from).isDirectory()) {
    return { said: [`--from '${at.from}' is no directory`], declared: null }
  }

  const stray = readdirSync(at.from).filter(
    (name) => !name.endsWith(MD_SUFFIX) && !SIDECARS.some((one) => name.endsWith(one))
  )
  if (stray.length > 0) {
    said.push(
      `the corpus holds ${String(stray.length)} file(s) this landing has no turn for, and a file ` +
        `nobody decided about is not one to leave behind: ${stray.slice(0, 8).join(", ")}`
    )
  }

  if (existsSync(at.into)) {
    const already = readdirSync(at.into).filter((name) => name.startsWith("day-"))
    if (already.length > 0) {
      said.push(
        `--into '${at.into}' already holds ${String(already.length)} \`day-\` file(s), so a landing ` +
          "has run here; take them away or name somewhere else, rather than landing over them"
      )
    }
  }

  if (!existsSync(at.funnel)) {
    said.push(`--funnel '${at.funnel}' is not there, and the funnel is what says a day has moved`)
  } else if (!namesNoDay(readFileSync(at.funnel, "utf8"))) {
    said.push(
      `--funnel '${at.funnel}' does not hold the empty \`MIGRATED_DAYS\` declaration verbatim, so ` +
        "either a landing has already turned it or a lane has edited it"
    )
  }

  if (!at.forReal) {
    if (insideRepo(at.into)) {
      said.push(`--into '${at.into}' is inside this repository and --for-real is not stated`)
    }
    if (insideRepo(at.funnel)) {
      said.push(`--funnel '${at.funnel}' is inside this repository and --for-real is not stated`)
    }
  }

  /**
   * What akasha must already declare before a day page can land.
   *
   * These are read in both modes and printed in both, because a rehearsal that does not say what a
   * real landing would refuse over has rehearsed the easy half. They only stop the act for real.
   */
  const owed: string[] = []

  const types = pageTypeFilesIn(AKASHA_DIR)
  if (types.length === 0) {
    owed.push(
      `no \`${DAY_PAGE_TYPE}.page-type.ts\` stands under akasha/, so every page this lands would ` +
        "name a type that is not there"
    )
  } else if (types.length > 1) {
    owed.push(`${String(types.length)} files under akasha/ name this page type: ${types.join(", ")}`)
  } else {
    const read = await declaredIn(join(AKASHA_DIR, types[0] as string))
    if ("refused" in read) {
      owed.push(read.refused)
    } else {
      declared = read
      const absent = undeclaredAmong(read, PROPERTY_PAGES_NEEDED)
      if (absent.length > 0) {
        owed.push(
          `\`${DAY_PAGE_TYPE}\` declares no property for ${String(absent.length)} of ` +
            `${String(PROPERTY_PAGES_NEEDED.length)} keys a day carries: ${absent.join(", ")}`
        )
      }
    }
  }

  try {
    Bun.resolveSync(DECLARING_IMPORT, at.into)
  } catch {
    owed.push(
      `every page this lands states \`import type { ... } from "${DECLARING_IMPORT}"\`, and that ` +
        `names nothing reachable from ${at.into}. A type-only import is stripped before it runs, ` +
        "so the pages would load and the typecheck would not; repoint `DECLARING_IMPORT` in " +
        "tools/daily-tracking-migration/shape.ts at where the type actually stands."
    )
  }

  if (!funnelWritesToAkasha()) {
    owed.push(
      "the akasha half of `dayPageAt` and `sessionRowAt` refuses, so turning the funnel would " +
        "point every write of a day at a verb that throws and Alan's next session row would have " +
        "nowhere to go. Build that half first."
    )
  }
  if (existsSync(FUNNEL_TEST) && readFileSync(FUNNEL_TEST, "utf8").includes(TEST_SAYS_UNMOVED)) {
    owed.push(
      `${FUNNEL_TEST} still states \`${TEST_SAYS_UNMOVED}\`, which is the world before this ` +
        "landing; say what the test is to state after it, in the commit that turns the funnel"
    )
  }

  if (at.forReal) return { said: [...said, ...owed], declared }
  for (const one of owed) say(`  OWED  ${one}`)
  return { said, declared }
}

type Staged = {
  readonly done: readonly Converted[]
  readonly idMap: Record<string, string>
  readonly names: readonly string[]
}

function convertAll(snapshot: string): Staged {
  const read = readDays(snapshot)
  if (read.faults.length > 0) {
    refuse("convert", [
      "the snapshot did not read whole, and a corpus half-read never passes for a corpus turned",
      ...read.faults.map((one) => `  ${one.at} :: ${one.why}`),
    ])
  }
  const done: Converted[] = []
  const stuck: string[] = []
  const idMap: Record<string, string> = {}
  for (const source of read.days) {
    const outcome = convertDay(source, () => uuidVersion7())
    if (refused(outcome)) {
      for (const why of outcome.refused) stuck.push(`  ${outcome.day} :: ${why}`)
      continue
    }
    if (outcome.reminted) idMap[outcome.idWas] = outcome.idIs
    done.push(outcome)
  }
  if (stuck.length > 0) {
    refuse("convert", [`${String(stuck.length)} day(s) refused to turn`, ...stuck])
  }
  const names: string[] = []
  for (const one of done) {
    names.push(one.pageName)
    for (const file of one.entries) names.push(file.name)
  }
  return { done, idMap, names }
}

function stage(staged: string, made: Staged): void {
  mkdirSync(staged, { recursive: true })
  for (const one of made.done) {
    landFile(join(staged, one.pageName), one.pageText)
    for (const file of one.entries) landFile(join(staged, file.name), file.text)
  }
  landFile(join(staged, "id-map.json"), `${JSON.stringify(made.idMap, null, 2)}\n`)
}

/**
 * Every row read back the way akasha reads one: off the page's own declaration, through `besideAt`.
 *
 * The fidelity checker walks the same shape, but it walks it from a list of files. This asks each
 * landed page what it says its rows are in and reads that, which is what a reader of these pages
 * will do, and refuses where the count differs from the rows that went in.
 */
function rowsReadBack(staged: string, made: Staged): readonly string[] {
  const said: string[] = []
  let rows = 0
  let files = 0
  for (const one of made.done) {
    for (const file of one.entries) {
      const slug = file.name.includes(`.${SESSIONS_SLUG}.`) ? SESSIONS_SLUG : COMPLETED_TASKS_SLUG
      const declared = one.value[slug === SESSIONS_SLUG ? "sessions" : "completedTasks"]
      if (typeof declared !== "string") {
        said.push(`${one.pageName} declares no extension for '${slug}', so its rows name no file`)
        continue
      }
      const read = entriesAt(staged, one.pageName, slug, declared)
      if ("refused" in read) {
        said.push(`${one.pageName} :: ${read.refused}`)
        continue
      }
      if (read.entries.length !== file.rows) {
        said.push(
          `${one.pageName} carried ${String(file.rows)} '${slug}' row(s) in and reads ` +
            `${String(read.entries.length)} back`
        )
        continue
      }
      rows += read.entries.length
      files += 1
    }
  }
  say(`  entriesAt      ${String(rows)} row(s) read back out of ${String(files)} file(s)`)
  return said
}

async function main(): Promise<never> {
  if (process.argv.includes("--help")) {
    process.stdout.write(HELP)
    process.exit(0)
  }
  const at = told()

  say(`from           ${at.from}`)
  say(`into           ${at.into}`)
  say(`funnel         ${at.funnel}`)
  say(`work           ${at.work}`)
  say(`mode           ${at.forReal ? "for real" : "rehearsal"}`)

  say("\nstep 1  preconditions")
  const stood = await preconditions(at)
  if (stood.said.length > 0) refuse("preconditions", stood.said)
  say("  every precondition holds")

  say("\nstep 2  snapshot")
  const before = fingerprintOf(at.from)
  const snapshot = join(at.work, "snapshot")
  mkdirSync(snapshot, { recursive: true })
  for (const [name] of before.files) {
    landFile(join(snapshot, name), readFileSync(join(at.from, name), "utf8"))
  }
  const torn = driftBetween(before, fingerprintOf(at.from))
  if (torn.length > 0) refuse("snapshot", driftSaid(torn, "while the snapshot was being copied"))
  const taken = fingerprintOf(snapshot)
  if (taken.digest !== before.digest) {
    refuse("snapshot", [
      "the snapshot is not what was fingerprinted, so the copy is not the corpus",
      `  source   ${before.digest}`,
      `  snapshot ${taken.digest}`,
    ])
  }
  landFile(join(at.work, "snapshot.json"), fingerprintJson(before))
  say(`  files          ${String(before.files.size)}`)
  say(`  bytes          ${String(before.bytes)}`)
  say(`  fingerprint    ${before.digest}`)

  say("\nstep 3  convert")
  const made = convertAll(snapshot)
  const minted = Object.keys(made.idMap).length
  say(`  days           ${String(made.done.length)}`)
  say(`  identities new ${String(minted)}`)
  say(`  files to land  ${String(made.names.length)}`)

  // The static check above weighs the keys this converter knows about. This weighs the keys the 133
  // days actually turned out to carry, which is the only list that binds.
  if (stood.declared !== null) {
    const carried = new Set<string>()
    for (const one of made.done) {
      for (const key of Object.keys(one.value)) carried.add(kebabizeKey(key))
    }
    const undeclared = undeclaredAmong(stood.declared, carried)
    say(`  keys carried   ${String(carried.size)}, of which ${String(undeclared.length)} undeclared`)
    if (undeclared.length > 0 && at.forReal) {
      refuse("convert", [
        `\`${DAY_PAGE_TYPE}\` declares no property for ${String(undeclared.length)} key(s) the ` +
          `turned days carry: ${undeclared.join(", ")}`,
      ])
    }
  }

  say("\nstep 4  stage and verify against the snapshot")
  const staged = join(at.work, "staged")
  stage(staged, made)
  landFile(join(at.work, "id-map.json"), `${JSON.stringify(made.idMap, null, 2)}\n`)
  const verdict = compareCorpora(readMarkdownCorpus(snapshot), await readAkashaPageCorpus(staged), made.idMap)
  say(`  records        ${String(verdict.recordsChecked)}`)
  say(`  values         ${String(verdict.valuesChecked)}`)
  say(`  faults         ${String(verdict.faults.length)}`)
  if (verdict.faults.length > 0) {
    refuse("verify", [
      "the staged corpus does not carry every value the snapshot carried, and nothing is written",
      ...verdict.faults.slice(0, 20).map((one) => `  ${one.kind} ${one.where} ${one.key} :: ${one.detail}`),
    ])
  }
  const unread = rowsReadBack(staged, made)
  if (unread.length > 0) {
    refuse("verify", ["a landed page's rows do not read back through akasha's own reader", ...unread])
  }

  say("\nstep 5  the corpus has not moved")
  const drifted = driftBetween(before, fingerprintOf(at.from))
  if (drifted.length > 0) refuse("write", driftSaid(drifted, "while it was being turned and judged"))
  say("  unmoved since the snapshot")

  say("\nstep 6  write")
  const landed: string[] = []
  if (isAkashaPath(AKASHA_DIR, at.into)) {
    const out = carryIn(HERE, at.into, staged, made.names, WRITE_MESSAGE)
    landFile(join(at.work, "carry-in.argv.json"), `${JSON.stringify(out, null, 2)}\n`)
    say(`  by             ${out.command} write, ${String(made.names.length)} file(s), one commit`)

    /**
     * The write asked, and nothing written.
     *
     * `akasha write` runs the checks and the read gate before it lands, and both can refuse. Asking
     * first costs nothing and writes nothing, and it moves every one of those refusals to before the
     * act rather than into the middle of it — including the reads the gate owes, which are the one
     * thing that cannot be satisfied while a landing is running, since every read is time the corpus
     * has to move under it.
     */
    const asked = Bun.spawnSync([out.command, "write", ...out.args, "--dry-run"], { cwd: HERE })
    if (asked.exitCode !== 0) {
      const why = new TextDecoder().decode(asked.stderr) + new TextDecoder().decode(asked.stdout)
      refuse("write", [
        "`akasha write --dry-run` refuses this landing, so the landing would refuse mid-act",
        ...why.trim().split("\n").slice(0, 40).map((one) => `  ${one}`),
      ])
    }
    say("  asked first    `akasha write --dry-run` holds")
    undo.push({
      what: `the day pages, by \`${out.command} write --remove\``,
      take: () => {
        const back = carryOut(HERE, at.into, made.names, UNDO_MESSAGE)
        const ran = Bun.spawnSync([back.command, "write", ...back.args], { cwd: HERE })
        if (ran.exitCode !== 0) throw new Error(new TextDecoder().decode(ran.stderr))
      },
    })
    const ran = Bun.spawnSync([out.command, "write", ...out.args], { cwd: HERE })
    if (ran.exitCode !== 0) {
      undo.pop()
      refuse("write", [
        "`akasha write` refused the day pages, and it lands or refuses as one, so nothing is there",
        ...new TextDecoder().decode(ran.stderr).trim().split("\n").map((one) => `  ${one}`),
      ])
    }
    landed.push(...made.names)
  } else {
    mkdirSync(at.into, { recursive: true })
    undo.push({
      what: "the day pages and their rows",
      take: () => {
        for (const name of landed) rmSync(join(at.into, name), { force: true })
      },
    })
    for (const name of made.names) {
      landFile(join(at.into, name), readFileSync(join(staged, name), "utf8"))
      landed.push(name)
    }
  }
  say(`  landed         ${String(landed.length)} file(s) in ${at.into}`)

  say("\nstep 7  the corpus did not move while it was being written")
  const after = driftBetween(before, fingerprintOf(at.from))
  if (after.length > 0) refuse("write", driftSaid(after, "while the day pages were being written"))
  say("  unmoved")

  say("\nstep 8  turn the funnel")
  const wasFunnel = readFileSync(at.funnel, "utf8")
  const turned = flippedTo(
    wasFunnel,
    made.done.map((one) => one.day)
  )
  if ("refused" in turned) refuse("flip", [turned.refused])
  undo.push({ what: `the funnel at ${at.funnel}`, take: () => landFile(at.funnel, wasFunnel) })
  landFile(at.funnel, turned.text)
  say(`  MIGRATED_DAYS  names ${String(made.done.length)} day(s)`)

  say("\nstep 9  the corpus did not move while the funnel was turning")
  const last = driftBetween(before, fingerprintOf(at.from))
  if (last.length > 0) refuse("flip", driftSaid(last, "while the funnel was turning"))
  say("  unmoved")

  if (!at.keep) rmSync(join(at.work, "staged"), { recursive: true, force: true })

  say("")
  say(`record         ${at.work}`)
  say(`  snapshot.json  what the corpus held, file by file, at the instant this read it`)
  say(`  id-map.json    every re-minted identity, which the checker needs to judge a later read`)
  say("")
  say(
    `VERDICT landed: ${String(made.done.length)} days, ${String(landed.length)} files, ` +
      `${String(verdict.valuesChecked)} values judged, ${String(minted)} identities re-minted`
  )
  say("The old markdown corpus is untouched. Taking it away is the second act, and it has its own")
  say("gate: nothing is removed until this place has been read from and written to.")
  process.exit(0)
}

await main()
