import { getEsoDayStr, getEsoResetTime } from "@akasha/day/eso-day"
import { instantToMillis } from "@akasha/pages-core/property-types/instant"
import type { Row } from "@akasha/pages-system-service/asking"
import { askingFor } from "@akasha/pages-system-service/calling"
import { advanceRecurrenceDueDate } from "@akasha/recurrence/scheduling"
import { isCumulativeCard } from "@akasha/temper-player-completion/completion-card-reset-behavior"
import { readFirstAccountWide } from "@akasha/temper-saved-variables/account-wide"
import { parseLuaSavedVariablesFile } from "@akasha/temper-saved-variables/lua-parser"
import { asRecord } from "@akasha/utils-narrow/as-record"
import {
  type CompletionValues,
  clearLandedCompletion,
  completedDayOf,
  landCompletion,
} from "../watcher-completed-day-landing/watcher-completed-day-landing.module.code.ts"
import { log, logError } from "../watcher-logging/watcher-logging.module.code.ts"
import {
  type SignedInReader,
  userIdFor,
} from "../watcher-signed-in-user/watcher-signed-in-user.module.code.ts"
import {
  landTaskGone,
  landTaskValues,
  taskProgressPath,
} from "../watcher-task-landing/watcher-task-landing.module.code.ts"

export const TASKS_GLOBAL_NAME = "TemperCharacters_SavedVariables"

export const TASK_PAGE_TYPE_SLUG = "temper-task"

export const COMPLETED_DAY_PAGE_TYPE_SLUG = "temper-completed-day"

export const MILLISECONDS_PER_SECOND = 1000

export const SCOPE_MARK_AT = 36

export type TaskPage = Row & { id: string; slug: string }

export interface ParsedTaskCompletion {
  readonly taskId: string
  readonly timestamp: number
}

export interface ImportTasksSeams {
  readonly now?: () => Date
  readonly mintId?: () => string
  readonly ask?: typeof askingFor
  readonly fileCompletion?: typeof landCompletion
  readonly clearCompletionLine?: typeof clearLandedCompletion
  readonly rollTask?: typeof landTaskValues
  readonly removeTask?: typeof landTaskGone
  readonly report?: (message: string) => void
  readonly reportError?: (message: string) => void
}

export interface ReadySeams {
  readonly now: () => Date
  readonly mintId: () => string
  readonly ask: typeof askingFor
  readonly fileCompletion: typeof landCompletion
  readonly clearCompletionLine: typeof clearLandedCompletion
  readonly rollTask: typeof landTaskValues
  readonly removeTask: typeof landTaskGone
  readonly report: (message: string) => void
  readonly reportError: (message: string) => void
}

export interface ImportTasksOptions extends ImportTasksSeams {
  readonly userId?: string
}

export type CompletionOutcome =
  | { readonly action: "completed"; readonly recurring: boolean }
  | { readonly action: "skip"; readonly reason: string }

export type ClearOutcome =
  | { readonly action: "cleared" }
  | { readonly action: "skip"; readonly reason: string }

export function seamsReady(seams: ImportTasksSeams = {}): ReadySeams {
  return {
    now: seams.now ?? (() => new Date()),
    mintId: seams.mintId ?? (() => Bun.randomUUIDv7()),
    ask: seams.ask ?? askingFor,
    fileCompletion: seams.fileCompletion ?? landCompletion,
    clearCompletionLine: seams.clearCompletionLine ?? clearLandedCompletion,
    rollTask: seams.rollTask ?? landTaskValues,
    removeTask: seams.removeTask ?? landTaskGone,
    report: seams.report ?? log,
    reportError: seams.reportError ?? logError,
  }
}

export function asBoolean(value: unknown): boolean {
  if (typeof value === "boolean") return value
  return value === "true"
}

export function asText(value: unknown): string | undefined {
  return typeof value === "string" && value !== "" ? value : undefined
}

export function asInstant(value: unknown): string | number | undefined {
  if (typeof value === "number") return value
  return asText(value)
}

export function asPath(value: unknown): readonly string[] | undefined {
  if (!Array.isArray(value) || value.length === 0) return undefined
  return value.map(String)
}

export function namesWholeTask(key: string): boolean {
  return key.indexOf(":", SCOPE_MARK_AT) < 0
}

export function parseTaskCompletions(content: string): readonly ParsedTaskCompletion[] {
  const root = parseLuaSavedVariablesFile(content, TASKS_GLOBAL_NAME)
  const defaultTable = asRecord(root.Default)
  if (!defaultTable) {
    throw new Error(`${TASKS_GLOBAL_NAME} carries no Default table`)
  }
  const accountWide = readFirstAccountWide(defaultTable)
  if (!accountWide) {
    throw new Error(
      `no account key under ${TASKS_GLOBAL_NAME}.Default carries a $AccountWide table`
    )
  }
  const completionsTable = asRecord(accountWide.completions) ?? {}
  const entries: ParsedTaskCompletion[] = []
  for (const [key, value] of Object.entries(completionsTable)) {
    if (typeof value !== "number") continue
    if (!namesWholeTask(key)) continue
    entries.push({ taskId: key, timestamp: value })
  }
  return entries
}

export function rolledDueDate(task: TaskPage, completedAtMs: number, at: Date): string | undefined {
  const rule = asText(task.rruleRule)
  if (rule === undefined) return undefined
  const anchor = asBoolean(task.rruleAnchorFromCompletion)
    ? getEsoDayStr(new Date(completedAtMs))
    : (asText(task.dueDate) ?? null)
  const next = advanceRecurrenceDueDate(
    { dueDate: anchor, dueTime: null, rrule: rule },
    at,
    getEsoResetTime
  )
  return next?.dueDate
}

export function isCompleteForever(task: TaskPage): boolean {
  if (task.rruleRule == null) return false
  const cardId = typeof task.completionCardId === "string" ? task.completionCardId : undefined
  if (!isCumulativeCard(cardId)) return false
  const current = task.progressCurrent
  const total = task.progressTotal
  if (typeof current !== "number" || typeof total !== "number") return false
  return total > 0 && current >= total
}

export function completionValuesFor(
  task: TaskPage,
  completedAt: string,
  completedAtMs: number,
  mintId: () => string
): CompletionValues {
  const slug = asText(task.slug)
  if (slug === undefined) {
    throw new Error(
      `the task ${String(task.id)} names no slug, so a completion of it would name nothing`
    )
  }
  const title = asText(task.title)
  if (title === undefined) {
    throw new Error(`the task ${slug} carries no title, so a completion of it would name nothing`)
  }
  if (!Number.isFinite(completedAtMs) || completedAtMs <= 0) {
    throw new Error(
      `the completion of ${slug} carries no instant, and ${String(completedAtMs)} is no instant`
    )
  }
  return {
    id: mintId(),
    completedAt,
    task: slug,
    title,
    character: asText(task.character),
    esoCharacterId: asText(task.esoCharacterId),
    dueDate: asText(task.dueDate),
    completionCardId: asText(task.completionCardId),
    completionItemPath: asPath(task.completionItemPath),
  }
}

export async function applyCompletion(
  task: TaskPage,
  completedAtMs: number,
  seams: ReadySeams
): Promise<CompletionOutcome> {
  const isRecurring = task.rruleRule != null
  const lastMs = isRecurring ? instantToMillis(asInstant(task.lastCompletedAt)) : null
  if (lastMs !== null && getEsoDayStr(new Date(lastMs)) === getEsoDayStr(new Date(completedAtMs))) {
    return { action: "skip", reason: "already completed this logical day" }
  }

  const completedAt = new Date(completedAtMs).toISOString()
  const values = completionValuesFor(task, completedAt, completedAtMs, seams.mintId)
  const filed = await seams.fileCompletion(values, seams.mintId)
  if (filed.outcome === "refused") {
    const day = `${COMPLETED_DAY_PAGE_TYPE_SLUG}/day-${completedDayOf(completedAt)}`
    throw new Error(
      `the completion of ${task.slug} at ${completedAt} never reached ${day} — ${filed.why}`
    )
  }
  if (filed.outcome === "already") return { action: "skip", reason: "already imported" }

  if (isRecurring && !isCompleteForever(task)) {
    const nextDue = rolledDueDate(task, completedAtMs, seams.now())
    const rolled = await seams.rollTask(
      task.slug,
      { lastCompletedAt: completedAt, ...(nextDue === undefined ? {} : { dueDate: nextDue }) },
      `temper: ${task.slug} was completed at ${completedAt}`
    )
    if (rolled.outcome === "refused") {
      throw new Error(`the task ${task.slug} kept its old due date — ${rolled.why}`)
    }
    return { action: "completed", recurring: true }
  }

  const gone = await seams.removeTask(
    task.slug,
    [taskProgressPath(task.slug)],
    `temper: ${task.slug} was completed at ${completedAt} and does not come round again`
  )
  if (gone.outcome === "refused") {
    throw new Error(`the task ${task.slug} was not taken away — ${gone.why}`)
  }
  return { action: "completed", recurring: false }
}

export async function clearCompletion(task: TaskPage, seams: ReadySeams): Promise<ClearOutcome> {
  const asked = await seams.ask({
    pageTypeSlug: COMPLETED_DAY_PAGE_TYPE_SLUG,
    sortBy: "day",
    descending: true,
  })
  if ("refused" in asked) {
    return { action: "skip", reason: `the days went unread — ${asked.refused}` }
  }
  for (const day of asked.rows) {
    const held = day.completions
    if (!Array.isArray(held)) continue
    const lines: Record<string, unknown>[] = []
    for (const one of held) {
      const line = asRecord(one)
      if (line === undefined || line.task !== task.slug) continue
      lines.push(line)
    }
    const last = lines[lines.length - 1]
    if (last === undefined) continue
    const id = asText(last.id)
    const on = asText(day.day)
    if (id === undefined || on === undefined) continue
    const cleared = await seams.clearCompletionLine(on, id)
    if (cleared.outcome === "refused") {
      return { action: "skip", reason: `the completion did not clear — ${cleared.why}` }
    }
    return { action: "cleared" }
  }
  return { action: "skip", reason: "no completion to clear" }
}

export async function readTaskPages(
  userId: string,
  seams: ReadySeams
): Promise<readonly TaskPage[]> {
  const asked = await seams.ask({
    pageTypeSlug: TASK_PAGE_TYPE_SLUG,
    where: { accountPage: { is: userId } },
  })
  if ("refused" in asked) {
    throw new Error(`the ${TASK_PAGE_TYPE_SLUG} pages went unread — ${asked.refused}`)
  }
  return asked.rows.filter(
    (row): row is TaskPage => typeof row.id === "string" && typeof row.slug === "string"
  )
}

export function tasksByName(tasks: readonly TaskPage[]): Map<string, TaskPage> {
  const byName = new Map<string, TaskPage>()
  for (const task of tasks) {
    byName.set(task.id, task)
    byName.set(task.slug, task)
  }
  return byName
}

export async function runImportTasks(
  content: string,
  supabase: SignedInReader,
  options: ImportTasksOptions = {}
): Promise<void> {
  const seams = seamsReady(options)
  const entries = parseTaskCompletions(content)
  seams.report(`Task import: ${entries.length} task completion(s) captured.`)

  const userId = await userIdFor(supabase, options.userId, "import these completions")
  const tasks = await readTaskPages(userId, seams)
  const byName = tasksByName(tasks)

  let completed = 0
  let cleared = 0
  let skipped = 0
  const goneAlready = new Set<string>()

  for (const entry of entries) {
    const task = byName.get(entry.taskId)
    if (task === undefined) {
      seams.reportError(`Task ${entry.taskId}: no such task, skipping`)
      skipped++
      continue
    }

    if (entry.timestamp > 0) {
      const done = await applyCompletion(task, entry.timestamp * MILLISECONDS_PER_SECOND, seams)
      if (done.action === "skip") {
        seams.report(`Task ${entry.taskId}: ${done.reason}, skipping`)
        skipped++
        continue
      }
      if (!done.recurring) goneAlready.add(task.slug)
      const what = done.recurring ? ", dueDate advanced" : " and taken away"
      seams.report(`Task ${entry.taskId}: completed${what}`)
      completed++
      continue
    }

    const undone = await clearCompletion(task, seams)
    if (undone.action === "skip") {
      seams.report(`Task ${entry.taskId}: ${undone.reason}, skipping`)
      skipped++
      continue
    }
    seams.report(`Task ${entry.taskId}: cleared completion`)
    cleared++
  }

  let sweptForever = 0
  for (const task of tasks) {
    if (goneAlready.has(task.slug)) continue
    if (!isCompleteForever(task)) continue
    const gone = await seams.removeTask(
      task.slug,
      [taskProgressPath(task.slug)],
      `temper: ${task.slug} reached its cumulative cap and does not come round again`
    )
    if (gone.outcome === "refused") {
      throw new Error(`the task ${task.slug} reached its cap and was not taken away — ${gone.why}`)
    }
    goneAlready.add(task.slug)
    sweptForever++
    seams.report(`Task ${task.slug}: cumulative cap reached, taken away`)
  }

  seams.report(
    `Task import: ${completed} completed, ${cleared} cleared, ${sweptForever} swept, ${skipped} skipped.`
  )
}
