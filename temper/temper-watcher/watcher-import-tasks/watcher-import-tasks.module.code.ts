import { instantToMillis } from "@akasha/pages-core/property-types/instant"
import {
  type CompletionShape,
  completionShapeOf,
  completionValues,
  nextDueFor,
  readsAsDone,
  uncompletionValues,
} from "@akasha/pages-core/task-lifecycle"
import type { Row } from "@akasha/pages-service/asking"
import { askingFor } from "@akasha/pages-service/calling"
import { isCumulativeCard } from "@akasha/temper-player-completion/completion-card-reset-behavior"
import { getEsoDayStr } from "akasha/alan/harness/day/eso-day/eso-day.module.code.ts"
import { log, logError } from "../watcher-logging/watcher-logging.module.code.ts"
import {
  type SignedInReader,
  userIdFor,
} from "../watcher-signed-in-user/watcher-signed-in-user.module.code.ts"
import {
  readTaskCompletions,
  type TaskCompletionsRead,
} from "../watcher-task-capture/watcher-task-capture.module.code.ts"
import { landTaskValues } from "../watcher-task-landing/watcher-task-landing.module.code.ts"
import type { TaskFacts } from "../watcher-task-progress/watcher-task-progress.module.code.ts"
import { refreshTaskProgress } from "../watcher-task-progress-landing/watcher-task-progress-landing.module.code.ts"
import { tasksThatRoll } from "../watcher-task-rolling/watcher-task-rolling.module.code.ts"

export const TASK_PAGE_TYPE_SLUG = "temper-task"

export const MILLISECONDS_PER_SECOND = 1000

export const CHARACTER_PAGE_TYPE_SLUG = "temper-account-character"

export type TaskPage = Row & { id: string; slug: string }

export interface ImportTasksSeams {
  readonly now?: () => Date
  readonly ask?: typeof askingFor
  readonly landTask?: typeof landTaskValues
  readonly refreshProgress?: typeof refreshTaskProgress
  readonly report?: (message: string) => void
  readonly reportError?: (message: string) => void
}

export interface ReadySeams {
  readonly now: () => Date
  readonly ask: typeof askingFor
  readonly landTask: typeof landTaskValues
  readonly refreshProgress: typeof refreshTaskProgress
  readonly report: (message: string) => void
  readonly reportError: (message: string) => void
}

export interface ImportTasksOptions extends ImportTasksSeams {
  readonly userId?: string
}

export type CompletionOutcome =
  | { readonly action: "completed"; readonly nextDue: string | null }
  | { readonly action: "skip"; readonly reason: string }

export type ClearOutcome =
  | { readonly action: "cleared" }
  | { readonly action: "skip"; readonly reason: string }

export function seamsReady(seams: ImportTasksSeams = {}): ReadySeams {
  return {
    now: seams.now ?? (() => new Date()),
    ask: seams.ask ?? askingFor,
    landTask: seams.landTask ?? landTaskValues,
    refreshProgress: seams.refreshProgress ?? refreshTaskProgress,
    report: seams.report ?? log,
    reportError: seams.reportError ?? logError,
  }
}

export function taskCompletionShape(): CompletionShape {
  const shape = completionShapeOf(TASK_PAGE_TYPE_SLUG)
  if (shape === null) {
    throw new Error(`no completion shape names \`${TASK_PAGE_TYPE_SLUG}\``)
  }
  return shape
}

export function asText(value: unknown): string | undefined {
  return typeof value === "string" && value !== "" ? value : undefined
}

export function asInstant(value: unknown): string | number | undefined {
  if (typeof value === "number") return value
  return asText(value)
}

export function rolledDueDate(task: TaskPage, completedAtMs: number, at: Date): string | undefined {
  const shape = taskCompletionShape()
  const rule = asText(task[shape.recurrenceKey])
  if (rule === undefined) return undefined
  return nextDueFor(shape, task, rule, completedAtMs, at.getTime()) ?? undefined
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

export function markedDone(shape: CompletionShape, atMs: number): Readonly<Record<string, string>> {
  const stamp = new Date(atMs).toISOString()
  return { [shape.stampKey]: stamp, [shape.doneKey]: stamp }
}

export function completionSet(
  task: TaskPage,
  completedAtMs: number,
  at: Date
): Readonly<Record<string, string>> {
  const shape = taskCompletionShape()
  if (isCompleteForever(task)) return markedDone(shape, completedAtMs)
  return completionValues(shape, task, completedAtMs, at.getTime())
}

export function completedOnThatDay(task: TaskPage, completedAtMs: number): boolean {
  const shape = taskCompletionShape()
  const lastMs = instantToMillis(asInstant(task[shape.stampKey]))
  if (lastMs === null) return false
  return getEsoDayStr(new Date(lastMs)) === getEsoDayStr(new Date(completedAtMs))
}

export async function applyCompletion(
  task: TaskPage,
  completedAtMs: number,
  seams: ReadySeams
): Promise<CompletionOutcome> {
  if (!Number.isFinite(completedAtMs) || completedAtMs <= 0) {
    throw new Error(
      `the completion of ${task.slug} carries no instant, and ${String(completedAtMs)} is no instant`
    )
  }
  if (completedOnThatDay(task, completedAtMs)) {
    return { action: "skip", reason: "already completed this logical day" }
  }

  const shape = taskCompletionShape()
  const completedAt = new Date(completedAtMs).toISOString()
  const values = completionSet(task, completedAtMs, seams.now())
  const landed = await seams.landTask(
    task.slug,
    values,
    `temper: ${task.slug} was completed at ${completedAt}`
  )
  if (landed.outcome === "refused") {
    throw new Error(`the task ${task.slug} was not marked done — ${landed.why}`)
  }
  return { action: "completed", nextDue: values[shape.dueKey] ?? null }
}

export async function clearCompletion(task: TaskPage, seams: ReadySeams): Promise<ClearOutcome> {
  const shape = taskCompletionShape()
  const marked = asText(task[shape.stampKey]) ?? asText(task[shape.doneKey])
  if (marked === undefined) return { action: "skip", reason: "no completion to clear" }
  const cleared = await seams.landTask(
    task.slug,
    uncompletionValues(shape),
    `temper: ${task.slug} was not completed after all`
  )
  if (cleared.outcome === "refused") {
    return { action: "skip", reason: `the completion did not clear — ${cleared.why}` }
  }
  return { action: "cleared" }
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

async function refreshedOrSaid(
  userId: string,
  tasks: readonly TaskPage[],
  seams: ReadySeams
): Promise<number> {
  try {
    return await seams.refreshProgress(userId, tasks.map(taskFactsOf), { report: seams.report })
  } catch (why) {
    const said = why instanceof Error ? why.message : String(why)
    seams.reportError(`Task import: the progress was not recomputed — ${said}`)
    return 0
  }
}

export function taskFactsOf(task: TaskPage): TaskFacts {
  const card = asText(task.completionCardId)
  if (card === undefined) return { slug: task.slug }
  const held = task.completionItemPath
  const path = Array.isArray(held)
    ? held.filter((one): one is string => typeof one === "string")
    : []
  return path.length === 0
    ? { slug: task.slug, completionCardId: card }
    : { slug: task.slug, completionCardId: card, completionItemPath: path }
}

export function tasksByName(tasks: readonly TaskPage[]): Map<string, TaskPage> {
  const byName = new Map<string, TaskPage>()
  for (const task of tasks) {
    byName.set(task.id, task)
    byName.set(task.slug, task)
  }
  return byName
}

export async function rollOnProgress(
  tasks: readonly TaskPage[],
  read: TaskCompletionsRead,
  userId: string,
  seams: ReadySeams
): Promise<number> {
  const asked = await seams.ask({
    pageTypeSlug: CHARACTER_PAGE_TYPE_SLUG,
    where: { accountPage: { is: userId } },
  })
  if ("refused" in asked) {
    throw new Error(`the ${CHARACTER_PAGE_TYPE_SLUG} pages went unread — ${asked.refused}`)
  }
  const roster: string[] = []
  const idBySlug = new Map<string, string>()
  for (const row of asked.rows) {
    const esoId = asText(row.esoCharacterId)
    if (esoId === undefined) continue
    roster.push(esoId)
    const slug = asText(row.slug)
    if (slug !== undefined) idBySlug.set(slug, esoId)
  }

  const shape = taskCompletionShape()
  const at = seams.now()
  const today = getEsoDayStr(at)
  const owed = tasks.filter(
    (task) =>
      task.rruleRule != null &&
      !readsAsDone(shape, task) &&
      (asText(task.dueDate) ?? "9999-99-99") <= today
  )
  const rolling = new Set(
    tasksThatRoll({
      tasks: owed.map((task) => {
        const falls = asText(task.effectiveCharacter)
        return {
          taskId: task.id,
          scope: asText(task.scope),
          effectiveCharacterId: falls === undefined ? undefined : idBySlug.get(falls),
        }
      }),
      completed: read.completed,
      progressed: read.progressed,
      roster,
    })
  )

  let rolled = 0
  for (const task of owed) {
    if (!rolling.has(task.id)) continue
    const nextDue = rolledDueDate(task, at.getTime(), at)
    if (nextDue === undefined) continue
    const done = await seams.landTask(
      task.slug,
      { [shape.dueKey]: nextDue },
      `temper: ${task.slug} came round again on what its characters did`
    )
    if (done.outcome === "refused") {
      seams.reportError(`Task ${task.slug}: the due date did not move — ${done.why}`)
      continue
    }
    seams.report(`Task ${task.slug}: rolled to ${nextDue}`)
    rolled++
  }
  return rolled
}

export async function runImportTasks(
  content: string,
  supabase: SignedInReader,
  options: ImportTasksOptions = {}
): Promise<void> {
  const seams = seamsReady(options)
  const shape = taskCompletionShape()
  const read = readTaskCompletions(content)
  const { entries, heldBack } = read
  seams.report(
    heldBack === 0
      ? `Task import: ${entries.length} task completion(s) captured.`
      : `Task import: ${entries.length} task completion(s) captured, and ${heldBack} held back, each naming one character rather than the whole task.`
  )

  const userId = await userIdFor(supabase, options.userId, "import these completions")
  const tasks = await readTaskPages(userId, seams)
  const byName = tasksByName(tasks)

  let completed = 0
  let cleared = 0
  let skipped = 0
  const marked = new Set<string>()

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
      marked.add(task.slug)
      const what = done.nextDue === null ? " and marked done" : ", dueDate advanced"
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
    if (marked.has(task.slug)) continue
    if (!isCompleteForever(task)) continue
    if (readsAsDone(shape, task)) continue
    const done = await seams.landTask(
      task.slug,
      markedDone(shape, seams.now().getTime()),
      `temper: ${task.slug} reached its cumulative cap and does not come round again`
    )
    if (done.outcome === "refused") {
      throw new Error(`the task ${task.slug} reached its cap and was not marked done — ${done.why}`)
    }
    marked.add(task.slug)
    sweptForever++
    seams.report(`Task ${task.slug}: cumulative cap reached, marked done`)
  }

  const rolled = await rollOnProgress(
    tasks.filter((task) => !marked.has(task.slug)),
    read,
    userId,
    seams
  )

  const refreshed = await refreshedOrSaid(userId, tasks, seams)

  seams.report(
    `Task import: ${completed} completed, ${cleared} cleared, ${sweptForever} swept, ${skipped} skipped, ${rolled} rolled, ${refreshed} progress file(s) landed.`
  )
}
