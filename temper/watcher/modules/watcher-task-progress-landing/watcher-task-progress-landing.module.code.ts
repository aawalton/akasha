import { asRecord } from "akasha/code/type/narrowing/modules/as-record/as-record.module.code.ts"
import {
  readFiles,
  readPages,
  writeFiles,
} from "akasha/page/query/modules/store-writing/store-writing.module.code.ts"
import type { Row } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import { askingFor } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import type {
  AccountCompletion,
  CharacterCompletion,
} from "akasha/temper/player/completion/modules/completion-progress/completion-progress.module.code.ts"
import { applyCompletionOverrides } from "akasha/temper/player/completion/temper-player-completion/modules/apply-completion-overrides/apply-completion-overrides.module.code.ts"
import { isUnmeasuredCard } from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-task-progress/completion-card-task-progress.module.code.ts"
import type { CompletionCharacterEntry } from "akasha/temper/player/completion/temper-player-completion/modules/completion-next-character/completion-next-character.module.code.ts"
import type { CompletionOverride } from "akasha/temper/player/completion/temper-player-completion/modules/completion-override/completion-override.module.code.ts"
import { parseCompletionOverrideRow } from "akasha/temper/player/completion/temper-player-completion/modules/completion-override-row/completion-override-row.module.code.ts"
import {
  buildCrossCharacterCompletionIndex,
  type NamedPath,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-progress-index/completion-progress-index.module.code.ts"
import { log } from "akasha/temper/watcher/modules/watcher-logging/watcher-logging.module.code.ts"
import {
  besidePathOf,
  besidePathsFor,
  contentIn,
  PAGE_LANDING_WRITER,
  type ReadFiles,
  type ReadPages,
  type WriteFiles,
} from "akasha/temper/watcher/modules/watcher-page-landing/watcher-page-landing.module.code.ts"
import { taskBodyWith } from "akasha/temper/watcher/modules/watcher-task-landing/watcher-task-landing.module.code.ts"
import {
  bodyOfRows,
  pathKeyFor,
  refreshedFor,
  rotatesOverCharacters,
  type TaskFacts,
} from "akasha/temper/watcher/modules/watcher-task-progress/watcher-task-progress.module.code.ts"

const CHARACTER_TYPE = "temper-account-character"

const ACCOUNT_TYPE = "temper-account"

const OVERRIDE_TYPE = "temper-completion-override"

const TASK_TYPE = "temper-task"

const COMPLETION_PROPERTY = "completion"

const COMPLETION_ENDING = "json"

const PROGRESS_PROPERTY = "progress"

const PROGRESS_ENDING = "jsonl"

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

function readyFor(deps: ProgressDeps = {}): ProgressReady {
  return {
    ask: deps.ask ?? askingFor,
    pages: deps.pages ?? readPages,
    files: deps.files ?? readFiles,
    write: deps.write ?? writeFiles,
    report: deps.report ?? log,
  }
}

export function unreadCompletionWhy(path: string): string {
  return `the completion file at ${path} holds no JSON object, so the character it belongs to would drop out of the progress rows this run commits`
}

export function completionIn<T>(path: string, text: string | null): T | null {
  if (text === null || text.trim() === "") return null
  let parsed: unknown
  try {
    parsed = JSON.parse(text)
  } catch {
    throw new Error(unreadCompletionWhy(path))
  }
  const completion = asRecord(parsed)
  if (completion === undefined) throw new Error(unreadCompletionWhy(path))
  return completion as T
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
  for (const [slug, path] of beside) {
    held.set(slug, completionIn<T>(path, contentIn(found.bodies, path)))
  }
  return held
}

async function floorsBySlug(
  ready: ProgressReady,
  userId: string
): Promise<ReadonlyMap<string, readonly CompletionOverride[]>> {
  const by = new Map<string, CompletionOverride[]>()
  for (const row of await askedRows(ready, OVERRIDE_TYPE, userId)) {
    const one = parseCompletionOverrideRow(row)
    if (one === null) continue
    const already = by.get(one.characterId)
    if (already === undefined) by.set(one.characterId, [one.override])
    else already.push(one.override)
  }
  return by
}

export function overridden(
  held: ReadonlyMap<string, CharacterCompletion | null>,
  floors: ReadonlyMap<string, readonly CompletionOverride[]>
): ReadonlyMap<string, CharacterCompletion | null> {
  const out = new Map<string, CharacterCompletion | null>()
  for (const [slug, completion] of held) {
    const over = floors.get(slug)
    out.set(
      slug,
      completion === null || over === undefined
        ? completion
        : applyCompletionOverrides(completion, over)
    )
  }
  return out
}

export function namedPathsOf(tasks: readonly TaskFacts[]): readonly NamedPath[] {
  const found: NamedPath[] = []
  for (const task of tasks) {
    const cardId = task.completionCardId
    const itemPath = task.completionItemPath
    if (cardId === undefined || cardId === "") continue
    if (itemPath === undefined || itemPath.length === 0) continue
    found.push({ cardId, itemPath })
  }
  return found
}

async function indexFor(ready: ProgressReady, userId: string, named: readonly NamedPath[]) {
  const characters = await askedRows(ready, CHARACTER_TYPE, userId)
  const slugs = characters.map((row) => textOf(row, "slug")).filter((one) => one !== "")
  const completions = await heldBeside<CharacterCompletion>(ready, CHARACTER_TYPE, slugs)
  const floors = await floorsBySlug(ready, userId)
  const accounts = await askedRows(ready, ACCOUNT_TYPE, userId)
  const accountSlugs = accounts.map((row) => textOf(row, "slug")).filter((one) => one !== "")
  const held = await heldBeside<AccountCompletion>(ready, ACCOUNT_TYPE, accountSlugs)
  const account = accountSlugs[0] === undefined ? null : (held.get(accountSlugs[0]) ?? null)
  return buildCrossCharacterCompletionIndex(
    rosterFrom(characters, overridden(completions, floors)),
    account,
    named
  )
}

export function unworkedWhy(slug: string, pathKey: string): string {
  return `Task ${slug}: no progress was worked out for \`${pathKey}\`, so its lines were left as they are`
}

export function putsFor(
  tasks: readonly TaskFacts[],
  index: unknown,
  paths: ReadonlyMap<string, string>,
  bodies: readonly { readonly path: string; readonly content: string | null }[],
  noting: ((said: string) => void) | null = null
): readonly Put[] {
  const puts: Put[] = []
  for (const task of tasks) {
    const page = paths.get(task.slug)
    if (page === undefined) continue
    const rowsPath = besidePathOf(page, PROGRESS_PROPERTY, PROGRESS_ENDING)
    if (rowsPath === null) continue
    const done = refreshedFor(task, index, contentIn(bodies, rowsPath) ?? "")
    if (done === null) {
      const key = pathKeyFor(task)
      if (noting !== null && key !== null && !isUnmeasuredCard(task.completionCardId)) {
        noting(unworkedWhy(task.slug, key))
      }
      continue
    }
    const rows = bodyOfRows(done.rows)
    if (rows !== contentIn(bodies, rowsPath)) puts.push({ path: rowsPath, content: rows })
    const held = contentIn(bodies, page)
    if (held === null) continue
    const falls = done.effectiveCharacter
    const named = falls === null ? null : `${CHARACTER_TYPE}/${falls}`
    const body = taskBodyWith(held, {
      progress: PROGRESS_ENDING,
      progressCurrent: done.progressCurrent,
      progressTotal: done.progressTotal,
      effectiveCharacter: named,
      ...(named !== null && rotatesOverCharacters(task) ? { character: named } : {}),
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
  const index = await indexFor(ready, userId, namedPathsOf(tasks))
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
  const puts = putsFor(tasks, index, paths, [...found.bodies, ...rows.bodies], ready.report)
  if (puts.length === 0) return 0
  const message = `temper: progress for ${puts.length} file(s) across the roster`
  const landed = await ready.write(puts, PAGE_LANDING_WRITER, message)
  if (!landed.ok) throw new Error(`the task progress did not land — ${landed.why}`)
  ready.report(`Task progress: ${puts.length} file(s) landed as one commit.`)
  return puts.length
}
