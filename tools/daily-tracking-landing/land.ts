/**
 * The landing: the act that moves Alan's tracked days out of markdown and turns the funnel.
 *
 * This file composes and implements nothing of its own that already stands. The days are read by
 * `tools/daily-tracking-migration/read-days.ts`, turned by `convert.ts`, judged by
 * `tools/daily-tracking-fidelity`, read back by akasha's own `entriesAt`, and the funnel it turns is
 * `tools/lib/tracking/day-place.ts`. What it adds is the three things none of those do: a
 * fingerprint of a corpus that is being appended to while this runs, an order of steps that puts the
 * one step which can be refused last, and an undo that takes a road the read gate does not stand in.
 *
 * The order is snapshot, turn, verify, then write — never write then check. A landing that writes
 * first has already spent the thing it was going to check.
 *
 * The corpus moves under this command. Alan's tracking appends a session row while it runs. So the
 * source is fingerprinted before the snapshot and again immediately before the point of no return;
 * any difference undoes everything and refuses, naming the file and how it changed.
 *
 * ONE ACT, NOT THREE
 *
 * This landing used to leave the markdown corpus standing and call taking it away a later act. That
 * was measured and it is wrong. Between the two acts every day stands twice — `daily-tracking` names
 * both places in its `files:`, so the deriver reads both halves and every session row of every
 * migrated day is answered twice at exit 0, with no warning. Worse, a session open across the turn
 * is closed in akasha while the markdown row stays open, so `findOpenSession` keeps handing back the
 * stale one: `tracking close` reports success forever and `tracking start` refuses forever. Both
 * were reproduced in an isolated copy. The window was never a place to watch from; it was a corpus
 * that answers wrongly and a tracking system Alan cannot use.
 *
 * So the corpus goes in the same act that lands the pages, and no doubled window ever exists.
 *
 * THE UNGATED HALF GOES FIRST
 *
 * Two things are written: the old corpus and the funnel, which are plain files, and the day pages,
 * which are under `akasha/` and go through `akasha write`. Only the second can be refused for a
 * reading the caller owes, and a refusal has to leave the world as it was.
 *
 * So the ungated half is done first and the gated half last. Taking the act back is then restoring
 * the markdown from the snapshot and writing the funnel's old text — both plain file writes, neither
 * of which the gate stands in. Nothing here ever calls `akasha write --remove`, which is what the
 * old undo did and what could refuse mid-undo and print `STUCK`.
 *
 * Between the two halves the days stand in neither place, so every read answers empty and every
 * write refuses by name. That window is loud and it loses nothing: a refused write is a row Alan
 * writes again. The other order — pages first, corpus second — has a quiet window instead, where
 * reads are doubled and a `tracking close` lands in markdown that this act is about to delete. A
 * quiet window that eats a row is worse than a loud one that refuses it.
 *
 * Once the day pages land, nothing here takes them back. There is no path that removes a landed day,
 * so nothing Alan tracks after this act can be discarded by an undo of it.
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync } from "node:fs"
import { join, resolve } from "node:path"
import { uuidVersion7 } from "../../akasha/command-system/value-minting/value-minting.module.code.ts"
import { entriesAt } from "../../akasha/pages-system/page/page-entries/page-entries.module.code.ts"
import { compareCorpora } from "../daily-tracking-fidelity/compare.ts"
import { derivedVerdict, verdictSaid } from "../daily-tracking-fidelity/derived.ts"
import { readAkashaPageCorpus, readMarkdownCorpus } from "../daily-tracking-fidelity/read-corpus.ts"
import { type Converted, convertDay, refused } from "../daily-tracking-migration/convert.ts"
import { readDays } from "../daily-tracking-migration/read-days.ts"
import { importFor, type Placing, placingFor } from "../daily-tracking-migration/placing.ts"
import {
  COMPLETED_TASKS_SLUG,
  DAY_PAGE_TYPE,
  ENTRY_EXTENSION,
  PROPERTY_PAGES_NEEDED,
  SESSIONS_SLUG,
} from "../daily-tracking-migration/shape.ts"
import { kebabizeKey } from "../lib/tracking/keys.ts"
import { AKASHA as AKASHA_PLACE, dayPageAt, openSession } from "../lib/tracking/day-place.ts"
import { displayTitle } from "../lib/tracking/format.ts"
import { bothHalves } from "./both-halves.ts"
import { carryIn, isAkashaPath } from "./carry.ts"
import { committed, headHere, landFile, putBack, takenAway, untrackedAmong } from "./take-away.ts"
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

/** The commit that ends the markdown half: the old corpus goes and the funnel names every day. */
const TAKE_AWAY_MESSAGE =
  "The days Alan tracked are read from akasha, and the markdown they were kept in is gone"

const RESTORE_MESSAGE = "the landing put the markdown corpus back, because the act did not finish"

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
  --work      where the snapshot, the staged tree and the both-halves tree are built, defaulting to
              a fresh directory beside the checkout — it holds some gigabytes, so not a tmpfs
  --keep      leave the work directory behind
  --for-real  land inside this repository; without it, --into and --funnel must be outside it

  One act: the day pages land, the markdown corpus goes and the funnel turns, or none of it does.
  There is no window in which a day stands in both halves.

  A rehearsal takes nothing away — it says what it would take and leaves the corpus alone. The way to
  rehearse the whole act is an isolated copy of the checkout with --for-real inside it.

  This refuses while a session is open. Close it, run this, start the next one.

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

function driftSaid(drift: readonly Drift[], when: string): readonly string[] {
  return [
    `the corpus changed ${when}, so what this landing read is no longer what stands there`,
    ...drift.map((one) => `  ${one.name} ${one.kind}: ${one.detail}`),
    "Nothing is lost: the change stands in the markdown corpus, which is untouched until the act's",
    "point of no return, and this refusal is before it.",
    "Run it again when tracking is quiet.",
  ]
}

/**
 * The session Alan has open, or nothing, or why the question could not be answered.
 *
 * A landing while a session is open is the case that broke the first design, and it is worth naming
 * rather than handling. The open row is the one row of this corpus that is going to be written again
 * — that is what open means — and the write that closes it decides which half it lands in by asking
 * a funnel this act is in the middle of turning. There is no instant in the act at which that lands
 * where the row will be read from.
 *
 * So the landing refuses, and Alan closes the session first. It costs him one command and it makes
 * the corpus still for the minute this takes. Carrying the open row across instead would mean this
 * act taking responsibility for a row another process is holding a pen over, and the measured cost
 * of getting that subtly wrong is a tracking system that reports success and never closes.
 *
 * A read that fails is a refusal too: nothing here lands on the strength of a question it could not
 * ask.
 */
async function sessionOpen(): Promise<{ readonly title: string } | null | { readonly why: string }> {
  try {
    const open = await openSession()
    if (open === null) return null
    return { title: displayTitle(open) }
  } catch (error) {
    return { why: (error as Error).message }
  }
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
  /**
   * Beside the checkout rather than in `TMPDIR`.
   *
   * The work directory holds the tree both halves are compared in, which is a copy of `akasha/` and
   * `pages/` and runs to some gigabytes. `/tmp` is a tmpfs on this workstation, so the old default
   * put those gigabytes in RAM on a machine that kills agent trees when it runs short of it. Beside
   * the checkout it is on the same filesystem, which is also where a reflink can be taken and the
   * copy costs nothing.
   */
  const work =
    argOf("work") ?? join(HERE, "..", `daily-tracking-landing-${String(process.pid)}`)
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
  readonly placing: Placing | null
}> {
  const said: string[] = []
  let declared: Declared | null = null
  let placing: Placing | null = null

  if (!existsSync(at.from) || !statSync(at.from).isDirectory()) {
    return { said: [`--from '${at.from}' is no directory`], declared: null, placing: null }
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
      if (read.plural === null) {
        owed.push(
          `\`${DAY_PAGE_TYPE}\` states no pluralSlug, so akasha names no folder for a day page and ` +
            "this landing has nowhere to put one"
        )
      } else {
        placing = placingFor(`akasha/${types[0] as string}`, read.plural)
      }
    }
  }

  /**
   * Where the days belong, and what the file each one is says it imports.
   *
   * Both are akasha's own answers: `pathFor` places a page of a type and `importedFrom` says what
   * reaches the type from that place, which is what `composedFor` does for every page the pages
   * system service writes. So there is nothing here to keep in agreement with anything, and the two
   * checks below are about the folder being real and `--into` being that folder — never about a
   * specifier being the right one.
   */
  if (placing !== null) {
    const folder = join(HERE, placing.folder)
    const specifier = importFor(placing, `x.${DAY_PAGE_TYPE}.ts`)
    try {
      Bun.resolveSync(specifier, folder)
    } catch {
      owed.push(
        `every page this lands would state \`import type { ... } from "${specifier}"\`, which is ` +
          `what akasha's own \`importedFrom\` answers for a page in ${placing.folder} reaching ` +
          `${placing.typeAt}, and nothing there resolves. A type-only import is erased before the ` +
          "file runs, so the pages would load and the typecheck would not."
      )
    }
    if (at.forReal && resolve(at.into) !== folder) {
      owed.push(
        `--into '${at.into}' is not where akasha puts a \`${DAY_PAGE_TYPE}\` page. The page type ` +
          `states its pages are filed under '${placing.folder}', which is where the pages system ` +
          "service would write the next day Alan tracks, and a day landed anywhere else would " +
          "declare a different import from the one written beside it later."
      )
    }
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

  /**
   * Every file of the corpus is one git tracks, or this act removes nothing.
   *
   * The landing's own claim is that the markdown corpus is gone from the disk and stands in the
   * commit before. A file git never tracked stands in no commit, so removing it would make that
   * sentence false for the one file it is false about — which is the shape of loss nobody notices.
   */
  if (existsSync(at.from) && statSync(at.from).isDirectory()) {
    const astray = untrackedAmong(HERE, at.from, readdirSync(at.from))
    if (astray.length > 0) {
      owed.push(
        `git tracks ${String(astray.length)} file(s) of the corpus nowhere, and this act says the ` +
          "corpus stands in the commit before it. Commit them and run this again: " +
          astray.slice(0, 8).join(", ")
      )
    }
  }

  const open = await sessionOpen()
  if (open !== null && "why" in open) {
    owed.push(
      `whether a session is open could not be read, and this landing will not move a corpus it ` +
        `cannot see the state of :: ${open.why}`
    )
  } else if (open !== null) {
    owed.push(
      `a session is open: "${open.title}". The row that closes it decides which half of the corpus ` +
        "it lands in by asking the funnel this act turns, so there is no instant in the act at " +
        "which closing it lands where it will be read from. Close it with `ops tracking close`, " +
        "run this, and start the next one after — it takes about a minute."
    )
  }

  if (at.forReal) return { said: [...said, ...owed], declared, placing }
  for (const one of owed) say(`  OWED  ${one}`)
  return { said, declared, placing }
}

type Staged = {
  readonly done: readonly Converted[]
  readonly idMap: Record<string, string>
  readonly names: readonly string[]
}

function convertAll(snapshot: string, placing: Placing): Staged {
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
    const outcome = convertDay(source, () => uuidVersion7(), placing)
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
  if (stood.placing === null) {
    refuse("preconditions", [
      "akasha names no folder for a day page, so where each page belongs and what it imports are " +
        "both unknown, and nothing here will guess at either",
    ])
  }
  say("  every precondition holds")
  say(`  day pages go   ${stood.placing.folder}/`)

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
  const made = convertAll(snapshot, stood.placing)
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

  /**
   * The two halves compared as READ, which is the half of fidelity the value checker cannot see.
   *
   * `compareCorpora` above judges what a day HOLDS, key by key. It is honest and it is narrower than
   * it reads as covering: a property nobody stores is judged by nothing there. `sleep-hours` is
   * summed over the rows beside a day, so a landed day that rolled up nothing from its rows passes
   * every stored value with no fault and reads 0 — the green rung on Alan's surplus tile, which is
   * the one reading a fault there must never look like.
   *
   * This is that comparison, made against a tree built out of the snapshot and the staged pages. It
   * belongs here rather than after the write, because everything it reads is settled before anything
   * is written: the staged bytes do not change by being landed. A difference costs a refusal.
   */
  say("\nstep 5  both halves read alike")
  const both = bothHalves(HERE, join(at.work, "both"), snapshot, staged, stood.placing.folder)
  if ("refused" in both) {
    refuse("verify", [
      "the tree holding both layouts could not be built, and this landing does not skip the check",
      "that says whether a landed day reads as the markdown day read",
      `  ${both.refused}`,
    ])
  }
  const read = derivedVerdict(both.at)
  for (const line of verdictSaid(read)) say(line)
  if (
    read.pairs === 0 ||
    read.differences.length > 0 ||
    read.unpaired.length > 0 ||
    read.faults.length > 0
  ) {
    refuse("verify", [
      "a landed day does not read as the markdown day it was turned from, and nothing is written",
      "This is the check the stored-value comparison above cannot make: a key summed over the rows",
      "beside a day is stored by neither half and read by both.",
    ])
  }
  if (!at.keep) rmSync(both.at, { recursive: true, force: true })

  /**
   * The turn proved before anything is written.
   *
   * `flippedTo` is a function from text to text, so whether the funnel can be turned is answerable
   * without a disk. Answering it here means the one step after the point of no return that could
   * have refused cannot: by the time the funnel is written, the text to write is already in hand.
   */
  say("\nstep 6  the turn holds, and the write is asked")
  const wasFunnel = readFileSync(at.funnel, "utf8")
  const turned = flippedTo(
    wasFunnel,
    made.done.map((one) => one.day)
  )
  if ("refused" in turned) refuse("flip", [turned.refused])
  say(`  MIGRATED_DAYS  would name ${String(made.done.length)} day(s)`)

  const intoAkasha = isAkashaPath(AKASHA_DIR, at.into)
  const out = carryIn(HERE, at.into, staged, made.names, WRITE_MESSAGE)
  if (intoAkasha) {
    landFile(join(at.work, "carry-in.argv.json"), `${JSON.stringify(out, null, 2)}\n`)

    /**
     * The write asked, and nothing written.
     *
     * `akasha write` runs the checks and the read gate before it lands, and both can refuse. Asking
     * first costs nothing and writes nothing, and it moves every one of those refusals to before the
     * act rather than into the middle of it — including the reads the gate owes, which are the one
     * thing that cannot be satisfied while a landing is running, since every read is time the corpus
     * has to move under it.
     *
     * It matters more now than it did, because the gated write is the last step rather than the
     * middle one. What this proves is that the step the act cannot take back is the step least
     * likely to refuse.
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
  }

  say("\nstep 7  the corpus has not moved")
  const drifted = driftBetween(before, fingerprintOf(at.from))
  if (drifted.length > 0) refuse("write", driftSaid(drifted, "while it was being turned and judged"))
  say("  unmoved since the snapshot")
  say("  this is the last instant at which nothing has been written")

  /**
   * The markdown corpus goes and the funnel turns, in one commit, before the day pages land.
   *
   * Both are plain files outside `akasha/`, so this whole step is a file write and a `git commit`
   * and the read gate stands in none of it. Its undo is `putBack` from the snapshot and the funnel's
   * old text — also plain writes, also ungated. That is what makes the undo below always able to run.
   */
  say("\nstep 8  the markdown corpus goes and the funnel turns")
  if (!at.forReal) {
    say(`  rehearsal      would take away ${String(before.files.size)} file(s) from ${at.from}`)
    say("  rehearsal      would turn the funnel and commit both as one")
  } else {
    const names = [...before.files.keys()]
    const paths = [...names.map((name) => join(at.from, name)), at.funnel]

    /**
     * One undo for the whole ungated half, because the ungated half is one act.
     *
     * It was three entries — the corpus, the funnel, the commit — and the undo runs them newest
     * first, so the commit was reverted before the files it names were back on the disk and git saw
     * nothing to commit. The step printed `STUCK` for a reason that was only the order they were
     * listed in. Restoring the disk and telling git about it is not three things that happen to run
     * together; it is one thing, and it is written as one here so nothing can order it wrongly.
     *
     * It is pushed before the corpus is touched, so it stands whatever fails next, and it commits
     * only where HEAD actually moved.
     */
    const headWas = headHere(HERE)
    undo.push({
      what: `the markdown corpus at ${at.from} and the funnel, put back and committed as one`,
      take: () => {
        const back = putBack(at.from, snapshot, names)
        if (!back.ok) throw new Error(back.why)
        landFile(at.funnel, wasFunnel)
        if (headHere(HERE) === headWas) return
        const said = committed(HERE, paths, RESTORE_MESSAGE)
        if (!said.ok) throw new Error(said.why)
      },
    })

    const away = takenAway(at.from, names)
    if (!away.ok) {
      refuse("take-away", ["the old corpus did not come away whole, and it goes back", away.why])
    }
    landFile(at.funnel, turned.text)

    const said = committed(HERE, paths, TAKE_AWAY_MESSAGE)
    if (!said.ok) {
      refuse("take-away", [
        "the commit taking the old corpus away did not land whole, and nothing under `akasha/` has",
        "been written, so the corpus goes back and so does anything this commit did land",
        `  ${said.why}`,
      ])
    }
    say(`  taken away     ${String(before.files.size)} file(s) from ${at.from}`)
    say(`  MIGRATED_DAYS  names ${String(made.done.length)} day(s)`)
    say("  committed      both as one")
  }

  /**
   * The day pages land, and this is the only step the gate stands in.
   *
   * It is last on purpose. `akasha write` lands or refuses as one, so a refusal here leaves nothing
   * under `akasha/` and the undo above puts the markdown corpus back without asking the gate for
   * anything. Nothing after this point can refuse.
   */
  say("\nstep 9  the day pages land")
  const landed: string[] = []
  if (intoAkasha) {
    say(`  by             ${out.command} write, ${String(made.names.length)} file(s), one commit`)
    const ran = Bun.spawnSync([out.command, "write", ...out.args], { cwd: HERE })
    if (ran.exitCode !== 0) {
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

  /**
   * Nothing is taken back from here on.
   *
   * The undo list is emptied rather than run, because every entry in it would now undo a world the
   * day pages are already part of. A landed day is never removed by this command, so a session Alan
   * tracks the instant after this returns cannot be discarded by anything here.
   */
  undo.length = 0

  if (!at.keep) rmSync(join(at.work, "staged"), { recursive: true, force: true })

  say("")
  say(`record         ${at.work}`)
  say(`  snapshot.json  what the corpus held, file by file, at the instant this read it`)
  say(`  id-map.json    every re-minted identity, which the checker needs to judge a later read`)
  say(`  snapshot/      the old corpus, byte for byte, which is also in the commit before this one`)
  say("")
  say(
    `VERDICT landed: ${String(made.done.length)} days, ${String(landed.length)} files, ` +
      `${String(verdict.valuesChecked)} values judged, ${String(minted)} identities re-minted`
  )
  say("One day is one page, and there is one copy of it. The old markdown is off the disk and in")
  say(`git history, in the parent of the commit named '${TAKE_AWAY_MESSAGE}'.`)
  process.exit(0)
}

await main()
