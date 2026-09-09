import { readFiles, readPages, writeFiles } from "@akasha/pages-query"
import type { Row } from "@akasha/pages-service/asking"
import { askingFor } from "@akasha/pages-service/calling"
import type {
  AccountCompletion,
  CharacterCompletion,
} from "akasha/temper/completion/completion-progress/completion-progress.module.code.ts"
import type { CompletionCharacterEntry } from "akasha/temper/temper-player-completion/completion-next-character/completion-next-character.module.code.ts"
import { buildCrossCharacterCompletionIndex } from "akasha/temper/temper-player-completion/completion-progress-index/completion-progress-index.module.code.ts"
import { log } from "../watcher-logging/watcher-logging.module.code.ts"
import {
  besidePathOf,
  besidePathsFor,
  contentIn,
  PAGE_LANDING_WRITER,
  type ReadFiles,
  type ReadPages,
  type WriteFiles,
} from "../watcher-page-landing/watcher-page-landing.module.code.ts"
import { taskBodyWith } from "../watcher-task-landing/watcher-task-landing.module.code.ts"
import {
  bodyOfRows,
  refreshedFor,
  type TaskFacts,
} from "../watcher-task-progress/watcher-task-progress.module.code.ts"

export const CHARACTER_TYPE = "temper-account-character"

export const ACCOUNT_TYPE = "temper-account"

export const TASK_TYPE = "temper-task"

export const COMPLETION_PROPERTY = "completion"

export const COMPLETION_ENDING = "json"

export const PROGRESS_PROPERTY = "progress"

export const PROGRESS_ENDING = "jsonl"

export type Put = { readonly path: string; readonly content: string }

export type ProgressDeps = {
  readonly ask?: typeof askingFor
  readonly pages?: ReadPages
  readonly files?: ReadFiles
  readonly write?: WriteFiles
  readonly report?: (message: string) => void
}

export type ProgressReady = {
  readonly ask: typeof askingFor
  readonly pages: ReadPages
  readonly files: ReadFiles
  readonly write: WriteFiles
  readonly report: (message: string) => void
}

export function readyFor(deps: ProgressDeps = {}): ProgressReady {
  return {
    ask: deps.ask ?? askingFor,
    pages: deps.pages ?? readPages,
    files: deps.files ?? readFiles,
    write: deps.write ?? writeFiles,
    report: deps.report ?? log,
  }
}

export function completionIn<T>(text: string | null): T | null {
  if (text === null || text.trim() === "") return null
  try {
    return JSON.parse(text) as T
  } catch {
    return null
  }
}

function textOf(row: Row, key: string): string {
  const value = row[key]
  return typeof value === "string" ? value : ""
}

function orderOf(row: Row, key: string): number | null {
  const value = row[key]
  return typeof value === "number" ? value : null
}

export function rosterFrom(
  rows: readonly Row[],
  held: ReadonlyMap<string, CharacterCompletion | null>
): readonly CompletionCharacterEntry[] {
  const roster: CompletionCharacterEntry[] = []
  for (const row of rows) {
    const slug = textOf(row, "slug")
    if (slug === "") continue
    const title = textOf(row, "title")
    const first = textOf(row, "firstName")
    roster.push({
      id: slug,
      name: title === "" ? slug : title,
      firstName: first === "" ? title : first,
      sortOrder: orderOf(row, "displayOrder"),
      completion: held.get(slug) ?? null,
    })
  }
  return roster
}

async function askedRows(ready: ProgressReady, pageTypeSlug: string, userId: string) {
  const asked = await ready.ask({ pageTypeSlug, where: { accountPage: { is: userId } } })
  if ("refused" in asked)
    throw new Error(`the ${pageTypeSlug} pages went unread — ${asked.refused}`)
  return asked.rows
}

async function heldBeside<T>(
  ready: ProgressReady,
  pageTypeSlug: string,
  slugs: readonly string[]
): Promise<ReadonlyMap<string, T | null>> {
  const held = new Map<string, T | null>()
  if (slugs.length === 0) return held
  const beside = await besidePathsFor(
    ready.pages,
    pageTypeSlug,
    slugs,
    COMPLETION_PROPERTY,
    COMPLETION_ENDING
  )
  const found = await ready.files([...beside.values()])
  if (!found.ok) throw new Error(`the ${pageTypeSlug} completion went unread — ${found.why}`)
  for (const [slug, path] of beside) held.set(slug, completionIn<T>(contentIn(found.bodies, path)))
  return held
}

export async function indexFor(ready: ProgressReady, userId: string) {
  const characters = await askedRows(ready, CHARACTER_TYPE, userId)
  const slugs = characters.map((row) => textOf(row, "slug")).filter((one) => one !== "")
  const completions = await heldBeside<CharacterCompletion>(ready, CHARACTER_TYPE, slugs)
  const accounts = await askedRows(ready, ACCOUNT_TYPE, userId)
  const accountSlugs = accounts.map((row) => textOf(row, "slug")).filter((one) => one !== "")
  const held = await heldBeside<AccountCompletion>(ready, ACCOUNT_TYPE, accountSlugs)
  const account = accountSlugs[0] === undefined ? null : (held.get(accountSlugs[0]) ?? null)
  return buildCrossCharacterCompletionIndex(rosterFrom(characters, completions), account)
}

export function putsFor(
  tasks: readonly TaskFacts[],
  index: unknown,
  paths: ReadonlyMap<string, string>,
  bodies: readonly { readonly path: string; readonly content: string | null }[]
): readonly Put[] {
  const puts: Put[] = []
  for (const task of tasks) {
    const page = paths.get(task.slug)
    if (page === undefined) continue
    const rowsPath = besidePathOf(page, PROGRESS_PROPERTY, PROGRESS_ENDING)
    if (rowsPath === null) continue
    const done = refreshedFor(task, index, contentIn(bodies, rowsPath) ?? "")
    if (done === null) continue
    const rows = bodyOfRows(done.rows)
    if (rows !== contentIn(bodies, rowsPath)) puts.push({ path: rowsPath, content: rows })
    const held = contentIn(bodies, page)
    if (held === null) continue
    const body = taskBodyWith(held, {
      progress: PROGRESS_ENDING,
      progressCurrent: done.progressCurrent,
      progressTotal: done.progressTotal,
    })
    if (body !== null) puts.push({ path: page, content: body })
  }
  return puts
}

export async function refreshTaskProgress(
  userId: string,
  tasks: readonly TaskFacts[],
  deps: ProgressDeps = {}
): Promise<number> {
  const ready = readyFor(deps)
  if (tasks.length === 0) return 0
  const index = await indexFor(ready, userId)
  const slugs = tasks.map((one) => one.slug)
  const found = await ready.pages(slugs.map((slug) => ({ pageTypeSlug: TASK_TYPE, slug })))
  if (!found.ok) throw new Error(`the ${TASK_TYPE} pages went unread — ${found.why}`)
  const paths = new Map<string, string>()
  for (const [at, slug] of slugs.entries()) {
    const path = found.bodies[at]?.path
    if (path !== undefined) paths.set(slug, path)
  }
  const beside: string[] = []
  for (const page of paths.values()) {
    const rowsPath = besidePathOf(page, PROGRESS_PROPERTY, PROGRESS_ENDING)
    if (rowsPath !== null) beside.push(rowsPath)
  }
  const rows =
    beside.length === 0
      ? { ok: true as const, at: found.at, bodies: [] }
      : await ready.files(beside)
  if (!rows.ok) throw new Error(`the task progress went unread — ${rows.why}`)
  const puts = putsFor(tasks, index, paths, [...found.bodies, ...rows.bodies])
  if (puts.length === 0) return 0
  const message = `temper: progress for ${puts.length} file(s) across the roster`
  const landed = await ready.write(puts, PAGE_LANDING_WRITER, message)
  if (!landed.ok) throw new Error(`the task progress did not land — ${landed.why}`)
  ready.report(`Task progress: ${puts.length} file(s) landed as one commit.`)
  return puts.length
}
