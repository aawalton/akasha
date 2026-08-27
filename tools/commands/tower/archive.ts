export const summary = "Publish every archivable chapter from a Tower state file into akasha and trim its beats out of the live state.json"

import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { parseTowerState, parseTrimDoc, type TrimDoc } from "@alanwalton/tower-core/state-schema"
import { planArchive } from "@alanwalton/tower/tower/plan-archive"
import { renderChapter } from "@alanwalton/tower/tower/render-chapter"
import { loadIllustrations, resolveHeroSrc } from "@alanwalton/tower/tower/resolve-hero"
import { writeFileAtomic } from "@shared/utils-fs/atomic-write"
import { z } from "zod"
import type { CommandHelp } from "../../ops/surface.ts"
import { dataError, operationalError } from "../../lib/exit.ts"
import { composeChapterPage, composeStoryPage, statedIdIn } from "../../lib/story-publish.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { akashaRoot } from "../../../repo/roots/roots.ts"
import {
  playedStoryRelDir,
  storyFileStands,
  type StoryFile,
  worldsHolding,
  writeStoryFiles,
} from "../../lib/stories-write.ts"

const DEFAULT_WORLD = "personas"
const STORY_PAGE_TYPE = "story-played"
const CHAPTER_PAGE_TYPE = "story-chapter-played"

export const help: CommandHelp = {
  flags: [
    {
      name: "--state",
      argLabel: "<path>",
      valueShape: "token",
      required: true,
      description: "Path to the Tower state.json the display writes",
    },
    {
      name: "--slug",
      argLabel: "<story-slug>",
      valueShape: "token",
      required: true,
      description: "Story page slug to publish under (e.g. the-tower)",
    },
    {
      name: "--world",
      argLabel: "<world-slug>",
      valueShape: "token",
      description: `World the story stands under, where no directory already holds it (default: ${DEFAULT_WORLD})`,
    },
    {
      name: "--keep",
      argLabel: "<n>",
      valueShape: "token",
      description: "Keep-window: current open + (n-1) most-recent closed (default: 2)",
    },
    { name: "--dry-run", description: "Report the plan without writing" },
  ],
  positionals: [
    { name: "slug", required: false, aliasOfFlag: "--slug", description: "Story page slug" },
  ],
  exits: [
    { code: 2, meaning: "Missing/malformed state.json, an ambiguous world, or invalid arguments" },
    { code: 3, meaning: "The write was refused, or the atomic rewrite failed" },
  ],
  examples: [
    "ops tower archive --slug the-tower --state /var/tmp/state.json",
    "ops tower archive --slug the-tower --state /var/tmp/state.json --keep 3 --dry-run",
  ],
}

const EntryNumberSchema = z.object({ number: z.number() }).passthrough()

interface ArchivedChapterEntry {
  readonly number: number
  readonly title: string
  readonly floor: number
  readonly status: "archived"
  readonly page: string
  readonly readerLink: string
  readonly heroBeat?: string
}

async function worldFor(slug: string, stated: string | undefined): Promise<string> {
  const holding = worldsHolding(slug)
  if (holding.length > 1) {
    throw dataError(
      `"${slug}" stands under ${holding.length} worlds in ${akashaRoot()} (${holding.join(", ")}) — nothing here says which one this state file belongs to`
    )
  }
  return holding[0] ?? stated ?? DEFAULT_WORLD
}

async function standsAlready(relPath: string, content: string): Promise<boolean> {
  if (!storyFileStands(relPath)) return false
  return (await readFile(join(akashaRoot(), relPath), "utf8")) === content
}

async function standingTextAt(relPath: string): Promise<string | null> {
  if (!storyFileStands(relPath)) return null
  return await readFile(join(akashaRoot(), relPath), "utf8")
}

export default async function towerArchive(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const slug = parsed.requireString("--slug")
  const statePath = parsed.requireString("--state")
  const keepWindow = parsed.nonNegativeInt("--keep") ?? 2
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
  const plans = planArchive(state, keepWindow)
  if (plans.length === 0) {
    process.stdout.write("nothing to archive (no closed chapter outside the keep-window)\n")
    return
  }

  const world = await worldFor(slug, parsed.string("--world"))
  const storyDir = playedStoryRelDir(world, slug)
  const illustrations = await loadIllustrations(statePath)

  const rendered = await Promise.all(
    plans.map(async (plan) => {
      const record = renderChapter(plan.chapter, plan.beats)
      const chapterArgs = {
        pageTypeSlug: CHAPTER_PAGE_TYPE,
        storySlug: slug,
        chapterNumber: plan.chapter.number,
        chapterTitle: plan.chapter.title,
        text: record.text,
        wordCount: record.wordCount,
      }
      const composed = composeChapterPage(chapterArgs)
      const relPath = `${storyDir}/chapters/${composed.fileName}`
      const standingId = statedIdIn(await standingTextAt(relPath))
      const page =
        standingId === null ? composed : composeChapterPage({ ...chapterArgs, standingId })
      return { plan, record, page, relPath }
    })
  )

  if (dryRun) {
    process.stdout.write(`would archive ${plans.length} chapter(s) into ${storyDir}:\n`)
    for (const { plan, record, relPath } of rendered) {
      const heroSrc = resolveHeroSrc(plan.chapter, illustrations)
      process.stdout.write(
        `  chapter ${plan.chapter.number} "${plan.chapter.title}" — ` +
          `${plan.beats.length} beats, ${record.wordCount} words, ` +
          `hero: ${heroSrc ?? "(none)"} → ${relPath}\n`
      )
    }
    return
  }

  for (const { plan, page, relPath } of rendered) {
    const chapter = plan.chapter
    const landing: StoryFile[] = []

    const story = composeStoryPage({
      pageTypeSlug: STORY_PAGE_TYPE,
      storySlug: slug,
      worldSlug: world,
    })
    const storyRelPath = `${storyDir}/${story.fileName}`
    if (!storyFileStands(storyRelPath)) {
      landing.push({ relPath: storyRelPath, content: story.content })
    }
    if (!(await standsAlready(relPath, page.content))) {
      landing.push({ relPath, content: page.content })
    }

    const landed = writeStoryFiles(
      landing,
      `${slug}: chapter ${chapter.number} "${chapter.title}" is archived`
    )
    if (landed.kind === "unwritten") {
      throw operationalError(
        `the write was refused for chapter ${chapter.number}: ${landed.why}`
      )
    }

    let trimDoc: TrimDoc
    try {
      trimDoc = parseTrimDoc(await readFile(statePath, "utf8"))
    } catch (err) {
      throw dataError(
        `cannot re-read/parse state for trim: ${err instanceof Error ? err.message : String(err)}`
      )
    }

    const collapsed: ArchivedChapterEntry = {
      number: chapter.number,
      title: chapter.title,
      floor: chapter.floor,
      status: "archived",
      page: relPath,
      readerLink: `/${CHAPTER_PAGE_TYPE}/${page.slug}`,
      ...(chapter.heroBeat !== undefined ? { heroBeat: chapter.heroBeat } : {}),
    }
    const dropIds = new Set(plan.beats.map((b) => b.id))
    const next = {
      ...trimDoc,
      log: trimDoc.log.filter((b) => !dropIds.has(b.id)),
      chapters: trimDoc.chapters.map((entry) => {
        const matched = EntryNumberSchema.safeParse(entry)
        return matched.success && matched.data.number === chapter.number ? collapsed : entry
      }),
    }

    try {
      await writeFileAtomic(statePath, `${JSON.stringify(next, null, 2)}\n`)
    } catch (err) {
      throw operationalError(
        `atomic rewrite failed after landing chapter ${chapter.number}: ${err instanceof Error ? err.message : String(err)}`
      )
    }

    process.stdout.write(
      `archived chapter ${chapter.number} "${chapter.title}" — ${relPath} (${collapsed.readerLink})\n`
    )
  }
}
