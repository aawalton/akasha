/**
 * A tree holding both layouts of Alan's days at once, built so the two can be compared as READ.
 *
 * `tools/daily-tracking-fidelity/derived.ts` is the check that catches what the value checker cannot
 * see: a key nobody stores and everybody reads. `sleep-hours` is summed over the rows filed beside a
 * day rather than written on it, so a landed day that rolled up nothing from its rows passed every
 * value with no fault and read 0 — and 0 is the green rung on Alan's surplus tile, which is the one
 * reading a fault there must never look like.
 *
 * That check needs both halves in ONE tree, because it derives once and pairs each markdown day with
 * its landed twin. The obvious tree is the checkout in the middle of the act, with the pages landed
 * and the corpus not yet gone. This landing does not have that moment and will not make one: the
 * doubled checkout is the state being removed, and a check is no reason to enter it. Three of the
 * five day-based saved queries sum double while it stands, `surplus-hours-on-day` among them, and a
 * doubled surplus reads as a day with twice the night left — so the fall notifier stays silent
 * exactly when it should speak, and it reaches Jenny as well as Alan.
 *
 * So the tree is built here instead, out of things nothing is reading: the snapshot the landing
 * already took, and the staged pages it has not written anywhere. Comparing those two is the same
 * comparison, made of exactly the bytes this act is answerable for, at a point where a difference
 * costs a refusal rather than a rollback.
 *
 * What goes in is `akasha/` and the whole of `pages/`, with the two corpora put in afterwards. Not
 * the least that seemed to work: a tree of `akasha/` and `pages/page-type/` alone derives 35 keys
 * where a whole checkout derives 53, and the eighteen it drops are the rolled-up ones — which are
 * exactly what this check exists to see. A thinner tree does not fail loudly, it agrees on less, and
 * a check that quietly judges two thirds of what it names is worse than no check. So it is copied
 * whole and measured against the number a checkout gives: 133 pairs, 53 keys, 4838 values.
 *
 * That is 3.1 GB, which is a reflink away on a filesystem that has them and a real copy where it is
 * not. The landing runs once.
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import { landFile } from "./take-away.ts"

/** Where a markdown day stands, which is what the day page type's `files:` glob reaches. */
const MARKDOWN_CORPUS = join("pages", "daily-tracking")

/**
 * The folders copied whole, because between them they carry every rule a day is derived by.
 *
 * `pages/` is here entire rather than by the subfolder that looked like enough. Which of its pages a
 * derived key leans on is the deriver's business and it changes; naming a subset here would be this
 * file holding a second, staler answer to that question, and the way it would fail is by judging
 * fewer keys rather than by refusing.
 */
const DECLARED_IN: readonly string[] = ["akasha", "pages"]

export type Built = { readonly at: string } | { readonly refused: string }

function copiedInto(from: string, to: string): string | null {
  const ran = Bun.spawnSync(["cp", "-a", "--reflink=auto", from, to])
  if (ran.exitCode === 0) return null
  return `copying ${from} :: ${new TextDecoder().decode(ran.stderr).trim()}`
}

/**
 * The tree, made of the snapshot and the staged pages rather than of anything live.
 *
 * `dayFolder` is where akasha files a day page, asked of akasha rather than written down here, so
 * this puts the staged pages exactly where the landing is about to put the real ones.
 */
export function bothHalves(
  checkout: string,
  at: string,
  snapshot: string,
  staged: string,
  dayFolder: string
): Built {
  rmSync(at, { recursive: true, force: true })
  mkdirSync(at, { recursive: true })

  for (const one of DECLARED_IN) {
    const from = join(checkout, one)
    if (!existsSync(from)) return { refused: `${from} is not there, so the deriver reads no day type` }
    const why = copiedInto(from, join(at, one))
    if (why !== null) return { refused: why }
  }

  const corpus = join(at, MARKDOWN_CORPUS)
  rmSync(corpus, { recursive: true, force: true })
  mkdirSync(corpus, { recursive: true })
  for (const name of readdirSync(snapshot)) {
    landFile(join(corpus, name), readFileSync(join(snapshot, name), "utf8"))
  }

  const landed = join(at, dayFolder)
  mkdirSync(landed, { recursive: true })
  for (const name of readdirSync(staged)) {
    if (!name.startsWith("day-")) continue
    landFile(join(landed, name), readFileSync(join(staged, name), "utf8"))
  }

  return { at }
}
