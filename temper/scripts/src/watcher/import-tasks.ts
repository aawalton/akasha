import { getEsoDayStr, getEsoResetTime } from "@akasha/day/eso-day"
import { instantToMillis } from "@akasha/pages-core/property-types/instant"
import type { Row } from "@akasha/pages-system-service/asking"
import { askingFor } from "@akasha/pages-system-service/calling"
import type { SupabaseServiceRoleClient } from "@akasha/supabase-server/service-role"
import { advanceRecurrenceDueDate } from "@akasha/recurrence/scheduling"
import { parseLuaSavedVariablesFile } from "@akasha/temper-saved-variables/lua-parser"
import { asRecord } from "@akasha/utils-narrow/as-record"
import { isCumulativeCard } from "@temper/player-completion/completion-card-reset-behavior"
import {
  clearLandedCompletion,
  completedDayOf,
  type CompletionValues,
  landCompletion,
} from "./completed-day-landing.ts"
import { landTaskGone, landTaskValues, taskProgressPath } from "./task-page-landing.ts"

const COMPLETED_DAY_PAGE_TYPE_SLUG = "temper-completed-day"

const TASK_PAGE_TYPE_SLUG = "temper-task"

interface ParsedTaskCompletion {
  taskId: string
  timestamp: number
}

function asBoolean(value: unknown): boolean {
  if (typeof value === "boolean") return value
  return value === "true"
}

function asText(value: unknown): string | undefined {
  return typeof value === "string" && value !== "" ? value : undefined
}

function asInstant(value: unknown): string | number | undefined {
  if (typeof value === "number") return value
  return asText(value)
}

function asPath(value: unknown): readonly string[] | undefined {
  if (!Array.isArray(value) || value.length === 0) return undefined
  return value.map(String)
}

/**
 * A completion is one line on the day page for the day it was marked, under
 * `akasha/temper/temper-progress/completed-days`. A line holds what is true of the completion
 * rather than of the task, so what the task says about itself — its rule, its scope, its priority,
 * its icon, its description, its link — is left on the task and read back from there.
 *
 * The validation above the landing refuses to file a completion that names nothing, and that
 * judgement is worth keeping whatever writes these lines.
 */
async function recordCompletedTask(
  task: TaskPage,
  completedAt: string,
  completedAtMs: number
): Promise<"landed" | "already"> {
  const slug = asText(task.slug)
  if (slug === undefined) {
    throw new Error(
      `recordCompletedTask(${String(task.id)}): the task states no slug, so this line would record that something unnamed was completed — refusing to file it`
    )
  }
  const title = asText(task.title)
  if (title === undefined) {
    throw new Error(
      `recordCompletedTask(${slug}): the task states no title — refusing to file a completion that names nothing`
    )
  }
  if (!Number.isFinite(completedAtMs) || completedAtMs <= 0) {
    throw new Error(
      `recordCompletedTask(${slug}): the completion states no instant (${String(completedAtMs)}) — refusing to file it`
    )
  }
  const values: CompletionValues = {
    id: Bun.randomUUIDv7(),
    completedAt,
    task: slug,
    title,
    character: asText(task.character),
    esoCharacterId: asText(task.esoCharacterId),
    dueDate: asText(task.dueDate),
    completionCardId: asText(task.completionCardId),
    completionItemPath: asPath(task.completionItemPath),
  }
  const landed = await landCompletion(values, () => Bun.randomUUIDv7())
  if (landed.outcome === "refused") {
    throw new Error(
      `recordCompletedTask(${slug}): "${title}" completed at ${completedAt} did not land on ` +
        `\`${COMPLETED_DAY_PAGE_TYPE_SLUG}/day-${completedDayOf(completedAt)}\` — ${landed.why}`
    )
  }
  return landed.outcome
}

function rolledDueDate(task: TaskPage, completedAtMs: number): string | undefined {
  const rule = asText(task.rruleRule)
  if (rule === undefined) return undefined
  const anchor = asBoolean(task.rruleAnchorFromCompletion)
    ? getEsoDayStr(new Date(completedAtMs))
    : (asText(task.dueDate) ?? null)
  const next = advanceRecurrenceDueDate(
    { dueDate: anchor, dueTime: null, rrule: rule },
    new Date(),
    getEsoResetTime
  )
  return next?.dueDate
}

function parseSavedVariables(content: string): readonly ParsedTaskCompletion[] {
  const root = parseLuaSavedVariablesFile(content, "TemperCharacters_SavedVariables")

  const defaultTable = asRecord(root.Default)
  if (!defaultTable) {
    throw new Error("Missing Default table in saved variables")
  }

  let accountWide: Record<string, unknown> | undefined
  for (const key of Object.keys(defaultTable)) {
    if (key.startsWith("@")) {
      const accountTable = asRecord(defaultTable[key])
      accountWide = asRecord(accountTable?.["$AccountWide"])
      if (accountWide) break
    }
  }

  if (!accountWide) {
    throw new Error("Could not find $AccountWide in saved variables")
  }

  const completionsTable = asRecord(accountWide.completions) ?? {}

  const entries: ParsedTaskCompletion[] = []

  for (const [key, value] of Object.entries(completionsTable)) {
    if (typeof value !== "number") continue
    const colonIndex = key.indexOf(":", 36)
    if (colonIndex > 0) continue
    entries.push({ taskId: key, timestamp: value })
  }

  return entries
}

type TaskPage = Row & { id: string; slug: string }

/**
 * A task in akasha is reached by its slug, and the identity the addon carries is the identity of
 * the page. An older saved-variables file names a task by an identity the old store minted, so the
 * slug is tried as well and a name the addon carried through is still resolved.
 */
function resolveTask(taskId: string, taskById: Map<string, TaskPage>): TaskPage | undefined {
  return taskById.get(taskId)
}

/**
 * A cumulative card counts toward a cap, and a task that has reached its cap does not come round
 * again whatever its rule says. The totals a task states are the totals of its progress lines added
 * up, so the cap is read off the task rather than off the lines.
 */
function isCompleteForever(task: TaskPage): boolean {
  if (task.rruleRule == null) return false
  const cardId = typeof task.completionCardId === "string" ? task.completionCardId : undefined
  if (!isCumulativeCard(cardId)) return false
  const current = task.progressCurrent
  const total = task.progressTotal
  if (typeof current !== "number" || typeof total !== "number") return false
  return total > 0 && current >= total
}

async function applyCompletion(
  task: TaskPage,
  completedAtMs: number
): Promise<{ action: "completed"; recurring: boolean } | { action: "skip"; reason: string }> {
  const isRecurring = task.rruleRule != null

  const lastCompletedAtMs = isRecurring ? instantToMillis(asInstant(task.lastCompletedAt)) : null
  if (lastCompletedAtMs !== null) {
    if (getEsoDayStr(new Date(lastCompletedAtMs)) === getEsoDayStr(new Date(completedAtMs))) {
      return { action: "skip", reason: "already completed this logical day" }
    }
  }

  const completedAt = new Date(completedAtMs).toISOString()
  const filed = await recordCompletedTask(task, completedAt, completedAtMs)
  if (filed === "already") {
    return { action: "skip", reason: "already imported" }
  }

  if (isRecurring && !isCompleteForever(task)) {
    const nextDue = rolledDueDate(task, completedAtMs)
    const rolled = await landTaskValues(
      task.slug,
      { lastCompletedAt: completedAt, ...(nextDue === undefined ? {} : { dueDate: nextDue }) },
      `temper: ${task.slug} was completed at ${completedAt}`
    )
    if (rolled.outcome === "refused") {
      throw new Error(`applyCompletion(${task.slug}): the task did not roll — ${rolled.why}`)
    }
    return { action: "completed", recurring: true }
  }

  const gone = await landTaskGone(
    task.slug,
    [taskProgressPath(task.slug)],
    `temper: ${task.slug} was completed at ${completedAt} and does not come round again`
  )
  if (gone.outcome === "refused") {
    throw new Error(`applyCompletion(${task.slug}): the task did not go — ${gone.why}`)
  }
  return { action: "completed", recurring: false }
}

/**
 * The completion to clear is the newest line naming this task across the days, so the days are read
 * newest first and the first day holding a line for the task is the day the line comes off.
 */
async function clearCompletion(
  task: TaskPage
): Promise<{ action: "cleared" } | { action: "skip"; reason: string }> {
  const asked = await askingFor({
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
    const lines = held.filter(
      (one): one is Record<string, unknown> =>
        typeof one === "object" && one !== null && asRecord(one)?.task === task.slug
    )
    const last = lines[lines.length - 1]
    if (last === undefined) continue
    const id = asText(last.id)
    const on = asText(day.day)
    if (id === undefined || on === undefined) continue
    const cleared = await clearLandedCompletion(on, id)
    if (cleared.outcome === "refused") {
      return { action: "skip", reason: `the completion did not clear — ${cleared.why}` }
    }
    return { action: "cleared" }
  }
  return { action: "skip", reason: "no completion to clear" }
}

export async function runImportTasks(
  content: string,
  supabase: SupabaseServiceRoleClient,
  options: { userId?: string } = {}
): Promise<void> {
  const entries = parseSavedVariables(content)
  console.log(`Found ${entries.length} task completion(s).\n`)

  let userId = options.userId
  if (userId == null) {
    const userResult = await supabase.auth.getUser()
    if (userResult.error || !userResult.data.user) {
      throw new Error(
        `runImportTasks: not authenticated (${userResult.error?.message ?? "no user"})`
      )
    }
    userId = userResult.data.user.id
  }

  const asked = await askingFor({
    pageTypeSlug: TASK_PAGE_TYPE_SLUG,
    where: { accountPage: { is: userId } },
  })
  if ("refused" in asked) {
    throw new Error(`runImportTasks: the tasks went unread — ${asked.refused}`)
  }
  const tasks: TaskPage[] = asked.rows.filter(
    (row): row is TaskPage => typeof row.id === "string" && typeof row.slug === "string"
  )

  const taskById = new Map<string, TaskPage>()
  for (const task of tasks) {
    taskById.set(task.id, task)
    taskById.set(task.slug, task)
  }

  let completed = 0
  let cleared = 0
  let skipped = 0

  const goneThisRun = new Set<string>()

  for (const entry of entries) {
    const task = resolveTask(entry.taskId, taskById)
    if (!task) {
      console.error(`  Task ${entry.taskId}: not found, skipping`)
      skipped++
      continue
    }

    if (entry.timestamp > 0) {
      const completedAtMs = entry.timestamp * 1000
      const result = await applyCompletion(task, completedAtMs)

      if (result.action === "skip") {
        console.log(`  Task ${entry.taskId}: ${result.reason}, skipping`)
        skipped++
        continue
      }

      if (!result.recurring) goneThisRun.add(task.slug)
      console.log(
        `  Task ${entry.taskId}: completed${result.recurring ? ", dueDate advanced" : " (deleted forever)"}`
      )
      completed++
    } else {
      const result = await clearCompletion(task)

      if (result.action === "skip") {
        console.log(`  Task ${entry.taskId}: ${result.reason}, skipping`)
        skipped++
        continue
      }

      console.log(`  Task ${entry.taskId}: cleared completion`)
      cleared++
    }
  }

  let sweptForever = 0
  for (const task of tasks) {
    if (goneThisRun.has(task.slug)) continue
    if (!isCompleteForever(task)) continue
    const gone = await landTaskGone(
      task.slug,
      [taskProgressPath(task.slug)],
      `temper: ${task.slug} reached its cumulative cap and does not come round again`
    )
    if (gone.outcome === "refused") {
      throw new Error(`runImportTasks(${task.slug}): the swept task did not go — ${gone.why}`)
    }
    goneThisRun.add(task.slug)
    sweptForever++
    console.log(`  Task ${task.slug}: cumulative cap reached, completed forever (swept)`)
  }

  console.log(`\n=== Summary ===`)
  console.log(`  Completed: ${completed}`)
  if (cleared > 0) console.log(`  Cleared:   ${cleared}`)
  if (sweptForever > 0) console.log(`  Swept:     ${sweptForever}`)
  if (skipped > 0) console.log(`  Skipped:   ${skipped}`)
}
