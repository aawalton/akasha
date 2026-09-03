import { getEsoDayWindow } from "@akasha/day/eso-day"
import { runGit } from "@akasha/git/git-answering"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import {
  type WriteOutcome,
  writeIntelligenceWords,
  writeWisdomWords,
} from "./write-daily-points.ts"

/**
 * The first day either word count is a reading of.
 *
 * Alan ruled these counted forward from the day they began, and `aura-harness-drive` carries that
 * as a constraint over every attribute. It is stated here as a day rather than left to whoever
 * calls, because a backfill is not a wrong number that a later run corrects: it writes a figure
 * onto a settled day from a corpus that did not exist as Alan lived it, and nothing afterwards
 * distinguishes it from a figure he earned.
 */
export const WORDS_COUNTED_FROM = "2026-09-03"

/**
 * The files each count is over.
 *
 * Alan's own topics are whole TypeScript pages with no prose beside them, so the page file is the
 * prose. The learn-everything topics keep their prose in markdown beside the page, and the page
 * itself holds numbers and slugs, so the page file is not counted and the five kinds of beside-file
 * are. Both are stated as one glob rather than as a list of the kinds, because a sixth kind of
 * beside-file arriving is prose Alan wrote and a list written here would silently not count it.
 */
const WISDOM_PATHSPEC = ":(glob)akasha/all-about-alan/topics/pages/**/*.all-about-alan-topic.ts"

const INTELLIGENCE_PATHSPEC =
  ":(glob)akasha/alan/library/book-of-everything/learn-everything-topics/pages/**/*.md"

const HUNK = "@@"

const FILE = "diff --git"

export type DayWords = {
  words: number
  shas: readonly string[]
}

function repoRoot(): string {
  return rootFor(resolveRoots(), AKASHA)
}

export function wordsIn(text: string): number {
  let count = 0
  for (const token of text.split(/\s+/)) if (token !== "") count += 1
  return count
}

/**
 * The words a diff added less the words it took away.
 *
 * The hunks are walked rather than the lines filtered, because a line the diff removed can itself
 * open with `---`: a markdown rule or a front-matter fence comes through as `----`, and a filter
 * reading that as the diff's own file header would drop real prose from the count. Inside a hunk
 * every line is an addition or a removal, so the first character settles it with nothing to guess.
 */
export function netWordsInDiff(diff: string): number {
  let added = 0
  let removed = 0
  let inHunk = false
  for (const line of diff.split("\n")) {
    if (line.startsWith(FILE)) {
      inHunk = false
      continue
    }
    if (line.startsWith(HUNK)) {
      inHunk = true
      continue
    }
    if (!inHunk) continue
    if (line.startsWith("+")) added += wordsIn(line.slice(1))
    else if (line.startsWith("-")) removed += wordsIn(line.slice(1))
  }
  return added - removed
}

/**
 * Every commit that landed on one day and touched the files counted.
 *
 * The window is the ESO day, six in the morning New York to six the next, taken from `@akasha/day`
 * rather than from `wakeDayWindow`. A wake window is worked out from recorded sleep and refuses a
 * day whose waking is not known, and a refusal here would turn a day Alan wrote nothing on into a
 * day nothing was measured on. These two counts have no such state: the corpus is the repository,
 * which is always readable, so every day has an answer.
 *
 * A merge carries no words of its own and its diff would count the words of every commit it
 * brought, so merges are left out. The window closes a second before the next day opens, so a
 * commit on the boundary lands on one day rather than on both.
 */
export async function commitsOn(
  root: string,
  dayStr: string,
  pathspec: string
): Promise<readonly string[]> {
  const { start, end } = getEsoDayWindow(dayStr)
  if (start.getTime() === 0 || end.getTime() === 0) {
    throw new Error(`\`${dayStr}\` names no day, so the commits landing on it cannot be asked for`)
  }
  const last = new Date(end.getTime() - 1000)
  const asked = await runGit(
    [
      "log",
      "--no-merges",
      "--format=%H",
      `--since=${start.toISOString()}`,
      `--until=${last.toISOString()}`,
      "HEAD",
      "--",
      pathspec,
    ],
    root
  )
  if (!asked.ok) {
    throw new Error(`the commits on ${dayStr} did not come back: ${asked.stderr}`)
  }
  return asked.stdout.split("\n").filter((line) => line !== "")
}

export async function netWordsInCommit(
  root: string,
  sha: string,
  pathspec: string
): Promise<number> {
  const asked = await runGit(
    ["show", "--format=", "--unified=0", "--no-color", "--no-renames", sha, "--", pathspec],
    root
  )
  if (!asked.ok) {
    throw new Error(`the diff of ${sha} did not come back: ${asked.stderr}`)
  }
  return netWordsInDiff(asked.stdout)
}

/**
 * One day's net words over one set of files.
 *
 * Each commit is floored at zero on its own and the floored figures are summed, which is not the
 * same as flooring the day. A day holding a rewrite that moved 1114 words out and a later commit
 * that wrote 2509 in counts 2509 rather than 1395: the words were written, and a tidy-up landing
 * beside them is not Alan unwriting them. Flooring the day would let one large deletion eat a whole
 * day's work, and never flooring at all would let it eat the days before.
 *
 * A day no commit touched counts zero. That is a reading rather than a gap, because the repository
 * says what was written on every day it holds, and a day with no commits is a day Alan wrote none.
 */
export async function countWordsForDay(
  root: string,
  dayStr: string,
  pathspec: string
): Promise<DayWords> {
  const shas = await commitsOn(root, dayStr, pathspec)
  let words = 0
  for (const sha of shas) {
    const net = await netWordsInCommit(root, sha, pathspec)
    if (net > 0) words += net
  }
  return { words, shas }
}

/**
 * The refusal that keeps either count off a day before Alan began earning it.
 *
 * This throws rather than answering zero. A zero is a reading these counts genuinely take, so
 * answering zero for a day outside the range would land a fabricated measurement that reads exactly
 * like a true one, and no later reader could tell the two apart.
 */
export function refuseBeforeStart(dayStr: string, field: string): void {
  if (dayStr >= WORDS_COUNTED_FROM) return
  throw new Error(
    `${dayStr} is before ${WORDS_COUNTED_FROM}, so it carries no ${field} — Alan ruled these ` +
      "counted forward from the day they began, and writing one onto an earlier day would state a " +
      "figure he never earned as one he did"
  )
}

export async function rollupWisdomWordsForDay(
  dayStr: string
): Promise<{ wisdomWords: number; shas: readonly string[]; outcome: WriteOutcome }> {
  refuseBeforeStart(dayStr, "wisdom words")
  const { words, shas } = await countWordsForDay(repoRoot(), dayStr, WISDOM_PATHSPEC)
  const outcome = await writeWisdomWords(dayStr, words)
  return { wisdomWords: words, shas, outcome }
}

export async function rollupIntelligenceWordsForDay(
  dayStr: string
): Promise<{ intelligenceWords: number; shas: readonly string[]; outcome: WriteOutcome }> {
  refuseBeforeStart(dayStr, "intelligence words")
  const { words, shas } = await countWordsForDay(repoRoot(), dayStr, INTELLIGENCE_PATHSPEC)
  const outcome = await writeIntelligenceWords(dayStr, words)
  return { intelligenceWords: words, shas, outcome }
}

/**
 * The counting laid bare for a caller that must not write, and for checking the instrument.
 *
 * These take a day whatever it is, because the refusal belongs at the write rather than at the
 * count: a reader wanting to know what a day before the range would have held is asking a question
 * about history, and answering it lands nothing on Alan's day.
 */
export function countWisdomWordsForDay(root: string, dayStr: string): Promise<DayWords> {
  return countWordsForDay(root, dayStr, WISDOM_PATHSPEC)
}

export function countIntelligenceWordsForDay(root: string, dayStr: string): Promise<DayWords> {
  return countWordsForDay(root, dayStr, INTELLIGENCE_PATHSPEC)
}
