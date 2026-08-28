export const summary = "Rewrite the System cards on archived Tower chapter pages to the five-ding progression vocabulary"

import { readFile } from "node:fs/promises"
import { parseTowerState } from "@alanwalton/tower-core/state-schema"
import { pageStemOf } from "../../../page/name/name"
import {
  createProgressionState,
  extractSystemCards,
  retrofitChapterText,
} from "@alanwalton/tower/tower/retrofit-system-cards"
import { z } from "zod"
import type { CommandHelp } from "../../ops/surface.ts"
import { dataError, operationalError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { answer } from "../../lib/page-query.ts"
import { textOf } from "../../lib/page-query-values.ts"
import { patchPage } from "../../lib/page-write.ts"
import { resolveRoots } from "../../../repo/roots/roots"

const CHAPTER_PAGE_TYPE = "story-chapter-played"
const BY = "tower-retrofit-system-cards"

export const help: CommandHelp = {
  flags: [
    {
      name: "--slug",
      argLabel: "<story-slug>",
      valueShape: "token",
      required: true,
      description: "Story page slug the chapters stand under (e.g. the-tower)",
    },
    {
      name: "--state",
      argLabel: "<path>",
      valueShape: "token",
      required: true,
      description: "Path to the Tower state.json the display writes",
    },
    {
      name: "--chapter",
      argLabel: "<n>",
      valueShape: "token",
      description: "Restrict to a single chapter number (default: every archived chapter)",
    },
    {
      name: "--dry-run",
      description: "Report the reduction per chapter without writing to pages",
    },
  ],
  positionals: [
    { name: "slug", required: false, aliasOfFlag: "--slug", description: "Story page slug" },
  ],
}

const ArchivedChapterSchema = z
  .object({
    number: z.number(),
    title: z.string(),
    status: z.string(),
  })
  .passthrough()

type ArchivedChapter = z.infer<typeof ArchivedChapterSchema>

interface ChapterPage {
  readonly name: string
  readonly text: string
}

function nameIn(at: string): string {
  return pageStemOf(at.replace(/^[a-z]+:/, ""))
}

export default async function towerRetrofitSystemCards(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const slug = parsed.string("--slug") ?? ""
  const statePath = parsed.requireString("--state")
  const onlyChapter = parsed.nonNegativeInt("--chapter")
  const dryRun = parsed.boolean("--dry-run")

  let raw: string
  try {
    raw = await readFile(statePath, "utf8")
  } catch (err) {
    throw dataError(
      `cannot read state file "${statePath}": ${err instanceof Error ? err.message : String(err)}`
    )
  }

  const state = parseTowerState(raw)
  const archived = state.chapters
    .map((entry) => ArchivedChapterSchema.safeParse(entry))
    .flatMap((result) => (result.success ? [result.data as ArchivedChapter] : []))
    .filter((entry) => entry.status === "archived")
    .sort((a, b) => a.number - b.number)

  const targeted = archived.filter(
    (entry) => onlyChapter === undefined || entry.number === onlyChapter
  )
  if (targeted.length === 0) {
    process.stdout.write("nothing to retrofit (no archived chapter matched)\n")
    return
  }

  const roots = resolveRoots()
  const got = answer(roots, {
    pageType: CHAPTER_PAGE_TYPE,
    where: [{ key: "partOf", is: slug }],
    keys: ["position", "body"],
  })
  if (got === null) {
    throw dataError(`\`${CHAPTER_PAGE_TYPE}\` names no page type whose pages are files`)
  }
  if (got.absent.length > 0) {
    throw dataError(
      `\`${CHAPTER_PAGE_TYPE}\` carries no ${got.absent.map((one) => `\`${one}\``).join(", ")}, so a zero here would say nothing about what matched`
    )
  }

  const byPosition = new Map<number, ChapterPage>()
  for (const row of got.rows) {
    const position = Number(textOf(row.values, "position"))
    const text = textOf(row.values, "body")
    if (!Number.isInteger(position) || text === null) continue
    byPosition.set(position, { name: nameIn(row.at), text })
  }

  const progression = createProgressionState()
  let changedCount = 0

  for (const chapter of archived) {
    const reportThis = onlyChapter === undefined || chapter.number === onlyChapter
    const page = byPosition.get(chapter.number)
    if (page === undefined) {
      if (reportThis)
        process.stdout.write(
          `  chapter ${chapter.number} "${chapter.title}" — page not found, skipped\n`
        )
      continue
    }

    const oldText = page.text
    const { text: newText, wordCount } = retrofitChapterText(oldText, progression)
    const before = extractSystemCards(oldText).length
    const after = extractSystemCards(newText).length
    const changed = newText !== oldText

    if (!reportThis) continue

    process.stdout.write(
      `  chapter ${chapter.number} "${chapter.title}" — ${before} card(s) → ${after}` +
        `${changed ? "" : " (unchanged)"}\n`
    )
    if (dryRun || changed) {
      for (const card of extractSystemCards(newText)) {
        process.stdout.write(`      [${card.heading}]\n`)
        for (const line of card.lines) process.stdout.write(`        ${line}\n`)
      }
    }

    if (dryRun || !changed) continue

    const landed = patchPage(
      roots,
      CHAPTER_PAGE_TYPE,
      page.name,
      { body: newText, ownLength: wordCount },
      BY
    )
    if (landed === null) {
      throw dataError(`\`${CHAPTER_PAGE_TYPE}\` states no repository this can be written to`)
    }
    if (landed.commitError !== null) {
      throw operationalError(
        `the stories write was refused for chapter ${chapter.number}: ${landed.commitError}`
      )
    }
    changedCount += 1
  }

  process.stdout.write(
    dryRun
      ? `dry run: ${targeted.length} chapter(s) inspected, no writes\n`
      : `retrofit complete: ${changedCount} chapter(s) updated\n`
  )
}
