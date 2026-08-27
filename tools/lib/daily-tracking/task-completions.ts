import { askComposed, getEsoDayWindow, textOf } from "./tracking-modules.ts"

const COMPLETED_TASK_PAGE_TYPE_SLUG = "completed-task"
const TO_DO_PAGE_TYPE_SLUG = "to-do"
const HEALTH_VALUE_SLUG = "health"

export const DIFFICULTY_POINTS: Record<string, number> = {
  trivial: 25,
  light: 50,
  hard: 100,
  major: 250,
}

export function pointsForDifficulty(difficulty: unknown): number {
  if (typeof difficulty !== "string") return 0
  return DIFFICULTY_POINTS[difficulty] ?? 0
}

export function sumTaskPoints(difficulties: readonly unknown[]): number {
  let total = 0
  for (const difficulty of difficulties) total += pointsForDifficulty(difficulty)
  return total
}

export type TaskCompletion = {
  readonly toDoSlug: string
  readonly completedAt: string
}

export function collapseToOncePerTask(
  completions: readonly TaskCompletion[]
): readonly TaskCompletion[] {
  const seen = new Set<string>()
  const out: TaskCompletion[] = []
  for (const completion of completions) {
    if (seen.has(completion.toDoSlug)) continue
    seen.add(completion.toDoSlug)
    out.push(completion)
  }
  return out
}

export function filterCompletionsToWindow(
  completions: readonly TaskCompletion[],
  startIso: string,
  endIso: string
): readonly TaskCompletion[] {
  const startMs = Date.parse(startIso)
  const endMs = Date.parse(endIso)
  return completions.filter((c) => {
    const t = Date.parse(c.completedAt)
    return Number.isFinite(t) && t >= startMs && t < endMs
  })
}

type RollupRow = { readonly [key: string]: unknown }

export interface HealthRollupRows {
  readonly activeSources: readonly RollupRow[]
  readonly snapshots: readonly RollupRow[]
  readonly difficultyPool: readonly RollupRow[]
}

export function computeHealthTaskPointsForWindow(
  rows: HealthRollupRows,
  startIso: string,
  endIso: string
): number {
  const difficultyByToDo = new Map<string, unknown>()
  for (const row of rows.difficultyPool) {
    const slug = textOf(row.slug)
    if (slug !== undefined) difficultyByToDo.set(slug, row.difficulty)
  }
  const completions: TaskCompletion[] = []
  for (const row of rows.activeSources) {
    const slug = textOf(row.slug)
    const completedAt = textOf(row.completedAt)
    if (slug !== undefined && completedAt !== undefined) {
      completions.push({ toDoSlug: slug, completedAt })
    }
  }
  for (const row of rows.snapshots) {
    const slug = textOf(row.toDoSlug)
    const completedAt = textOf(row.completedAt)
    if (slug !== undefined && slug !== "none" && completedAt !== undefined) {
      completions.push({ toDoSlug: slug, completedAt })
    }
  }
  const windowed = filterCompletionsToWindow(completions, startIso, endIso)
  const unique = collapseToOncePerTask(windowed)
  return sumTaskPoints(unique.map((c) => difficultyByToDo.get(c.toDoSlug)))
}

export async function loadDayHealthTaskPoints(dayStr: string): Promise<number> {
  const window = getEsoDayWindow(dayStr)
  const startIso = window.start.toISOString()
  const endIso = window.end.toISOString()
  const windowWhere = {
    "value-slug": { is: HEALTH_VALUE_SLUG },
    "completed-at": { "at-or-after": startIso, before: endIso },
  }

  const [snapshotsAsked, poolAsked] = await Promise.all([
    askComposed({
      "page-type": COMPLETED_TASK_PAGE_TYPE_SLUG,
      where: windowWhere,
      keys: ["to-do-slug", "completed-at"],
    }),
    askComposed({
      "page-type": TO_DO_PAGE_TYPE_SLUG,
      keys: ["slug", "difficulty", "value-slug", "last-completed-at"],
    }),
  ])
  if (!snapshotsAsked.ok) throw new Error(`loadDayHealthTaskPoints: ${snapshotsAsked.why}`)
  if (!poolAsked.ok) throw new Error(`loadDayHealthTaskPoints: ${poolAsked.why}`)
  const toDos = poolAsked.answer.rows.map((r) => r.values)

  return computeHealthTaskPointsForWindow(
    {
      activeSources: toDos
        .filter((values) => values["value-slug"] === HEALTH_VALUE_SLUG)
        .map((values) => ({
          slug: values.slug,
          completedAt: values["last-completed-at"],
        })),
      snapshots: snapshotsAsked.answer.rows.map((r) => ({
        toDoSlug: r.values["to-do-slug"],
        completedAt: r.values["completed-at"],
      })),
      difficultyPool: toDos.map((values) => ({
        slug: values.slug,
        difficulty: values.difficulty,
      })),
    },
    startIso,
    endIso
  )
}
