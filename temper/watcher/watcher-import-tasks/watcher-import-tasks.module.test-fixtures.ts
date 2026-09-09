import type { SignedInReader } from "../watcher-signed-in-user/watcher-signed-in-user.module.code.ts"
import {
  applyCompletion,
  type CompletionOutcome,
  type ImportTasksOptions,
  type ReadySeams,
  seamsReady,
  type TaskPage,
} from "./watcher-import-tasks.module.code.ts"

export const NO_CLIENT: SignedInReader = {
  auth: {
    getUser: async () => {
      throw new Error("the test states a user id, so the session is never asked")
    },
  },
}

export const ONE_OFF_ID = "11111111-1111-7000-8000-000000000001"

export const RECURRING_ID = "11111111-1111-7000-8000-000000000002"

export const UNKNOWN_ID = "22222222-2222-7000-8000-000000000009"

export const COMPLETED_AT_S = 1_700_000_000

export const COMPLETED_AT_MS = COMPLETED_AT_S * 1000

export const COMPLETED_AT_ISO = new Date(COMPLETED_AT_MS).toISOString()

export const NOW = new Date("2024-03-15T18:00:00.000Z")

export const NOW_ISO = NOW.toISOString()

export const LANDED = { outcome: "landed", at: "c0" } as const

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

export function taskOf(values: Record<string, unknown>): TaskPage {
  return { id: ONE_OFF_ID, slug: "one-off-task", title: "One Off Task", ...values } as TaskPage
}

export const SAME_DAY_MS = Date.UTC(2023, 10, 14, 18, 0, 0)

export const OTHER_DAY_MS = Date.UTC(2023, 10, 12, 18, 0, 0)

export interface Landing {
  readonly slug: string
  readonly values: Readonly<Record<string, unknown>>
}

export interface Tally {
  readonly landed: Landing[]
  readonly seams: ReadySeams
  outcome?: CompletionOutcome
}

export function tallying(over: ImportTasksOptions = {}): Tally {
  const landed: Landing[] = []
  return {
    landed,
    seams: seamsReady(
      landing({
        landTask: async (slug, values) => {
          landed.push({ slug, values })
          return LANDED
        },
        ...over,
      })
    ),
  }
}

export async function applied(
  values: Record<string, unknown>,
  over: ImportTasksOptions = {}
): Promise<Tally> {
  const it = tallying(over)
  it.outcome = await applyCompletion(taskOf(values), COMPLETED_AT_MS, it.seams)
  return it
}

export function landing(seams: ImportTasksOptions = {}): ImportTasksOptions {
  return {
    now: () => NOW,
    ask: async () => ({ rows: [], n: 0 }),
    landTask: async () => LANDED,
    refreshProgress: async () => 0,
    report: () => undefined,
    reportError: () => undefined,
    ...seams,
  }
}
