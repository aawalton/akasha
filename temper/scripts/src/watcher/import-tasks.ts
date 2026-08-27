import { softDeletePageById, undeletePageById } from "@shared/pages-access/delete"
import { getPages } from "@shared/pages-access/get"
import { collectPages } from "@shared/pages-access/iterate"
import { patchPageById } from "@shared/pages-access/patch"
import { type Page } from "@shared/pages-core/page-types"
import { instantToMillis } from "@shared/pages-core/property-types/instant"
import { patchPage as patchFilePage, writeRow } from "@shared/pages-query"
import { getEsoDayStr, getEsoResetTime } from "../../../../day/day"
import { advanceRecurrenceDueDate } from "@shared/recurrence/scheduling"
import type { SupabaseServiceRoleClient } from "../../../../shared/supabase-server/src/service-role"
import { asRecord } from "../../../../shared/utils-narrow/src/as-record"
import { requireFirst } from "../../../../shared/utils-narrow/src/require-first"
import { isCumulativeCard } from "@temper/player-completion/completion-card-reset-behavior"
import { parseLuaSavedVariablesFile } from "@temper/shared-saved-variables/lua-parser"

const COMPLETED_TASK_PAGE_TYPE_SLUG = "temper-completed-task"

const COMPLETED_MONTH_PAGE_TYPE_SLUG = "temper-completed-month"

const COMPLETION_WRITER = "temper-watcher"

const MONTH_LENGTH = 7

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

function withoutEmpty(
  values: Readonly<Record<string, unknown>>
): Readonly<Record<string, unknown>> {
  const out: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(values)) {
    if (value === null || value === undefined || value === "") continue
    out[key] = value
  }
  return out
}

async function standingMonth(month: string): Promise<undefined> {
  const { rows } = await getPages({
    pageTypeSlug: COMPLETED_MONTH_PAGE_TYPE_SLUG,
    where: [{ key: "month", eq: month }],
    limit: 1,
  })
  if (rows.length > 0) return
  const written = await patchFilePage(
    COMPLETED_MONTH_PAGE_TYPE_SLUG,
    month,
    { title: month, month },
    COMPLETION_WRITER
  )
  if (!written.ok) {
    throw new Error(`standingMonth(${month}): the month page did not land — ${written.why}`)
  }
}

async function recordCompletedTask(
  task: TaskPage,
  completedAt: string,
  completedAtMs: number
): Promise<undefined> {
  const slug = asText(task.slug)
  if (slug === undefined) {
    throw new Error(
      `recordCompletedTask(${String(task.id)}): the task states no slug, so this row would record that something unnamed was completed — refusing to file it`
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
  const month = getEsoDayStr(new Date(completedAtMs)).slice(0, MONTH_LENGTH)
  await standingMonth(month)
  const values = withoutEmpty({
    id: Bun.randomUUIDv7(),
    title,
    icon: task.icon,
    description: task.description,
    link: task.link,
    priority: task.priority,
    scope: task.scope,
    "due-date": task.dueDate,
    character: task.character,
    "eso-character-id": task.esoCharacterId,
    "completion-card-id": task.completionCardId,
    "completion-item-path": task.completionItemPath,
    "rrule-rule": task.rruleRule,
    "rrule-anchor-from-completion": asBoolean(task.rruleAnchorFromCompletion),
    task: slug,
    "completed-at": completedAt,
  })
  const written = await writeRow(COMPLETED_TASK_PAGE_TYPE_SLUG, month, values, COMPLETION_WRITER)
  if (!written.ok) {
    throw new Error(
      `recordCompletedTask(${slug}): the completed task did not land — ${written.why}`
    )
  }
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

type TaskPage = Page & { id: string }

function resolveTask(
  taskId: string,
  taskByPgId: Map<string, TaskPage>,
  taskById: Map<string, TaskPage>
): TaskPage | undefined {
  return taskByPgId.get(taskId) ?? taskById.get(taskId)
}

function isCompleteForever(task: TaskPage): boolean {
  if (task.rruleRule == null) return false
  const cardId = typeof task.completionCardId === "string" ? task.completionCardId : undefined
  if (!isCumulativeCard(cardId)) return false
  const progress = task.progress
  if (progress === null || typeof progress !== "object" || Array.isArray(progress)) return false
  const current = "current" in progress ? progress.current : undefined
  const total = "total" in progress ? progress.total : undefined
  if (typeof current !== "number" || typeof total !== "number") return false
  if ("entries" in progress) {
    const entries = progress.entries
    if (entries === null || typeof entries !== "object" || Array.isArray(entries)) return false
    if ("activeEntryKey" in progress) return false
  }
  return total > 0 && current >= total
}

async function applyCompletion(
  task: TaskPage,
  completedAtMs: number
): Promise<{ action: "completed"; recurring: boolean } | { action: "skip"; reason: string }> {
  const isRecurring = task.rruleRule != null
  const taskId = task.id

  const lastCompletedAtMs = isRecurring ? instantToMillis(task.lastCompletedAt) : null
  if (lastCompletedAtMs !== null) {
    if (getEsoDayStr(new Date(lastCompletedAtMs)) === getEsoDayStr(new Date(completedAtMs))) {
      return { action: "skip", reason: "already completed this logical day" }
    }
  }

  const completedAt = new Date(completedAtMs).toISOString()
  const { rows: existing } = await getPages({
    pageTypeSlug: "temper-completed-task",
    where: [
      { key: "task", eq: task.slug },
      {
        or: [
          { key: "completedAt", eq: completedAtMs },
          { key: "completedAt", eq: completedAt },
        ],
      },
    ],
    limit: 1,
  })
  if (existing.length > 0) {
    return { action: "skip", reason: "already imported" }
  }

  await recordCompletedTask(task, completedAt, completedAtMs)

  if (isRecurring && !isCompleteForever(task)) {
    const nextDue = rolledDueDate(task, completedAtMs)
    await patchPageById({
      pageTypeSlug: "temper-task",
      id: taskId,
      set: {
        completedAt: null,
        lastCompletedAt: completedAt,
        ...(nextDue === undefined ? {} : { dueDate: nextDue }),
      },
    })
    return { action: "completed", recurring: true }
  }

  await patchPageById({
    pageTypeSlug: "temper-task",
    id: taskId,
    set: { completedAt },
  })
  await softDeletePageById({
    pageTypeSlug: "temper-task",
    id: taskId,
  })
  return { action: "completed", recurring: false }
}

async function clearCompletion(
  task: TaskPage
): Promise<{ action: "cleared"; recreated: boolean } | { action: "skip"; reason: string }> {
  const taskId = task.id
  const { rows: completed } = await getPages({
    pageTypeSlug: "temper-completed-task",
    where: [{ key: "task", eq: task.slug }],
    order: [{ by: "completedAt", dir: "desc" }],
    limit: 1,
  })

  if (completed.length === 0) {
    return { action: "skip", reason: "no completion to clear" }
  }

  const mostRecent = requireFirst(completed, "completed")
  const completedId = mostRecent.id
  if (typeof completedId !== "string") {
    return { action: "skip", reason: "completion row missing id" }
  }

  await softDeletePageById({
    pageTypeSlug: "temper-completed-task",
    id: completedId,
  })

  const { rows: taskRows } = await getPages({
    pageTypeSlug: "temper-task",
    where: [{ key: "id", eq: taskId }],
    limit: 1,
  })
  const taskRow = taskRows[0]
  if (taskRow?.deletedAt != null) {
    await undeletePageById({
      pageTypeSlug: "temper-task",
      id: taskId,
    })
    await patchPageById({
      pageTypeSlug: "temper-task",
      id: taskId,
      set: { pendingSync: true },
    })
    return { action: "cleared", recreated: true }
  }

  return { action: "cleared", recreated: false }
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

  const rows = await collectPages({
    pageTypeSlug: "temper-task",
    where: [{ key: "account", eq: userId }],
    pageSize: 1000,
  })
  const tasks: TaskPage[] = rows.filter((r): r is TaskPage => typeof r.id === "string")

  const taskByPgId = new Map<string, TaskPage>()
  const taskById = new Map<string, TaskPage>()
  for (const task of tasks) {
    if (typeof task.pgId === "string") taskByPgId.set(task.pgId, task)
    if (typeof task.id === "string") taskById.set(task.id, task)
  }

  let completed = 0
  let cleared = 0
  let skipped = 0

  const deletedThisRun = new Set<string>()

  for (const entry of entries) {
    const task = resolveTask(entry.taskId, taskByPgId, taskById)
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

      if (!result.recurring) deletedThisRun.add(task.id)
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

      console.log(
        `  Task ${entry.taskId}: cleared completion${result.recreated ? ", re-created task" : ""}`
      )
      cleared++
    }
  }

  let sweptForever = 0
  for (const task of tasks) {
    if (task.deletedAt != null) continue
    if (deletedThisRun.has(task.id)) continue
    if (!isCompleteForever(task)) continue
    await softDeletePageById({ pageTypeSlug: "temper-task", id: task.id })
    deletedThisRun.add(task.id)
    sweptForever++
    console.log(`  Task ${task.id}: cumulative cap reached, completed forever (swept)`)
  }

  console.log(`\n=== Summary ===`)
  console.log(`  Completed: ${completed}`)
  if (cleared > 0) console.log(`  Cleared:   ${cleared}`)
  if (sweptForever > 0) console.log(`  Swept:     ${sweptForever}`)
  if (skipped > 0) console.log(`  Skipped:   ${skipped}`)
}
