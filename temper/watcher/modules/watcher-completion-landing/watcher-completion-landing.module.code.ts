import type { Json } from "akasha/code/type/narrowing/modules/json-value/json-value.module.code.ts"
import type { UpsertPageArgs } from "akasha/page/access/modules/upsert/upsert.module.code.ts"
import type { Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { classifyCompletionImport } from "akasha/temper/player/completion/temper-player-completion/modules/completion-import-outcome/completion-import-outcome.module.code.ts"
import type {
  ReadFiles,
  ReadPages,
  WriteFiles,
} from "akasha/temper/watcher/modules/watcher-page-landing/watcher-page-landing.module.code.ts"
import {
  besidePathsFor,
  contentIn,
  PAGE_LANDING_WRITER,
} from "akasha/temper/watcher/modules/watcher-page-landing/watcher-page-landing.module.code.ts"
import type { z } from "zod"

const COMPLETION_PROPERTY = "completion"

const COMPLETION_ENDING = "json"

export type CompletionPageUpsert = (args: UpsertPageArgs<Record<string, Json>>) => Promise<Page>

type ReportLine = (message: string) => void

export function preservedWhy(label: string, fields: readonly string[]): string {
  return `${label}: the incoming completion was missing ${fields.join(", ")}, and the forward merge kept what was stored. A saved-variables wipe or a parse regression looks like this.`
}

function completionRoadWhy(pageTypeSlug: string, act: string, why: string): string {
  return `the completion files beside the ${pageTypeSlug} pages ${act}: ${why}`
}

export function unparsedCompletionWhy(path: string): string {
  return `the completion file at ${path} holds no completion, so a merge forward from it would lower what the game already counted`
}

export function completionBody(completion: unknown): string {
  return `${JSON.stringify(completion, null, 2)}\n`
}

function storedCompletion<T>(path: string, held: string | null, shape: z.ZodType<T>) {
  if (held === null) return undefined
  try {
    return shape.parse(JSON.parse(held))
  } catch {
    throw new Error(unparsedCompletionWhy(path))
  }
}

type MergeForward<T> = (stored: T | undefined, fresh: T | undefined) => T | undefined

export interface ForwardFold {
  readonly report: ReportLine
  readonly preservedLabels: string[]
}

export interface CompletionRoad {
  readonly readPages: ReadPages
  readonly readFiles: ReadFiles
  readonly writeFiles: WriteFiles
  readonly upsert: CompletionPageUpsert
}

export interface CompletionSubject<T> {
  readonly label: string
  readonly slug: string
  readonly fresh: T | undefined
}

function mergedForward<T>(
  fold: ForwardFold,
  label: string,
  stored: T | undefined,
  fresh: T | undefined,
  mergeForward: MergeForward<T>
): T | undefined {
  const merged = fresh === undefined ? undefined : mergeForward(stored, fresh)
  const verdict = classifyCompletionImport(stored, fresh, merged)
  if (verdict.outcome === "preserved") {
    fold.preservedLabels.push(label)
    fold.report(preservedWhy(label, verdict.preservedFields))
  }
  return merged
}

export async function landCompletions<T>(
  fold: ForwardFold,
  road: CompletionRoad,
  pageTypeSlug: string,
  shape: z.ZodType<T>,
  subjects: readonly CompletionSubject<T>[],
  mergeForward: MergeForward<T>
): Promise<readonly (T | undefined)[]> {
  if (subjects.length === 0) return []
  const beside = await besidePathsFor(
    road.readPages,
    pageTypeSlug,
    subjects.map((one) => one.slug),
    COMPLETION_PROPERTY,
    COMPLETION_ENDING
  )
  const found = await road.readFiles([...beside.values()])
  if (!found.ok) throw new Error(completionRoadWhy(pageTypeSlug, "went unread", found.why))
  const merged: (T | undefined)[] = []
  const puts: { path: string; content: string }[] = []
  const unnamed: string[] = []
  for (const subject of subjects) {
    const path = beside.get(subject.slug) ?? ""
    const held = contentIn(found.bodies, path)
    const one = mergedForward<T>(
      fold,
      subject.label,
      storedCompletion(path, held, shape),
      subject.fresh,
      mergeForward
    )
    merged.push(one)
    if (one === undefined) continue
    const content = completionBody(one)
    if (content === held) continue
    puts.push({ path, content })
    if (held === null) unnamed.push(subject.slug)
  }
  if (puts.length > 0) {
    const landed = await road.writeFiles(
      puts,
      PAGE_LANDING_WRITER,
      `temper: completion for ${puts.length} ${pageTypeSlug} page(s)`,
      undefined,
      undefined,
      found.at
    )
    if (!landed.ok) throw new Error(completionRoadWhy(pageTypeSlug, "did not land", landed.why))
  }
  for (const slug of unnamed) {
    await road.upsert({
      pageTypeSlug,
      where: [{ key: "slug", eq: slug }],
      set: { completion: COMPLETION_ENDING },
      select: ["id"],
    })
  }
  return merged
}
