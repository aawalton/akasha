import type { runImportTasks } from "../import-tasks"

export async function loadRunImportTasks(key: string): Promise<typeof runImportTasks> {
  const mod = await import(`../import-tasks?t=${Date.now()}-${key}`)
  return mod.runImportTasks
}

export const USER_ID = "u1"
export const COMPLETED_AT_S = 1_700_000_000
const COMPLETED_AT_MS = COMPLETED_AT_S * 1000
export const COMPLETED_AT_ISO = new Date(COMPLETED_AT_MS).toISOString()

export function buildLua(entries: ReadonlyArray<{ taskId: string; timestamp: number }>): string {
  const inner = entries
    .map(({ taskId, timestamp }) => `        ["${taskId}"] = ${timestamp},`)
    .join("\n")
  return `TemperCharacters_SavedVariables =
{
    ["Default"] =
    {
        ["@aawal"] =
        {
            ["$AccountWide"] =
            {
                ["completions"] =
                {
${inner}
                },
            },
        },
    },
}
`
}

export const fakeClient: Parameters<typeof runImportTasks>[1] = Object.create(null)

export const CUMULATIVE_ID = "11111111-1111-7000-8000-000000000003"
export const RESETTING_ID = "11111111-1111-7000-8000-000000000004"
export const ACTIVE_KEY = "11111111-1111-7000-8000-0000000000ff"

export function cumulativeRow(
  progress: unknown,
  overrides: Record<string, unknown> = {}
): Record<string, unknown> {
  return {
    id: CUMULATIVE_ID,
    slug: "cumulative-task",
    title: "Cumulative Task",
    rruleRule: "FREQ=DAILY",
    completionCardId: "skill-lines",
    progress,
    deletedAt: null,
    ...overrides,
  }
}

export function crossProgress(
  current: number,
  total: number,
  activeEntryKey?: string
): Record<string, unknown> {
  const per = total / 16
  const entries: Record<string, unknown> = {}
  for (let i = 0; i < 16; i++) {
    const filled = Math.min(per, Math.max(0, current - per * i))
    entries[`char-${i}`] = { current: filled, total: per, sortOrder: i, label: `C${i}` }
  }
  return activeEntryKey === undefined
    ? { current, total, entries }
    : { current, total, activeEntryKey, entries }
}
