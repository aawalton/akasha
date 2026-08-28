export type Call = { fn: string; args: unknown }

export const calls: Call[] = []

export function resetState(): undefined {
  calls.length = 0
}

export function asPatchSet(args: unknown): object {
  if (args !== null && typeof args === "object" && "set" in args) {
    const set = args.set
    if (set !== null && typeof set === "object" && !Array.isArray(set)) {
      return set
    }
  }
  return {}
}

export function asPageTypeSlug(args: unknown): string | undefined {
  if (args !== null && typeof args === "object" && "pageTypeSlug" in args) {
    return typeof args.pageTypeSlug === "string" ? args.pageTypeSlug : undefined
  }
  return undefined
}

export function asWhereEntries(args: unknown): ReadonlyArray<{ key: string; eq: unknown }> {
  if (args === null || typeof args !== "object" || !("where" in args)) return []
  const where = args.where
  if (!Array.isArray(where)) return []
  const out: Array<{ key: string; eq: unknown }> = []
  for (const w of where) {
    if (
      w !== null &&
      typeof w === "object" &&
      "key" in w &&
      "eq" in w &&
      typeof w.key === "string"
    ) {
      out.push({ key: w.key, eq: w.eq })
    }
  }
  return out
}

export function asRawWhere(args: unknown): readonly unknown[] {
  if (args !== null && typeof args === "object" && "where" in args && Array.isArray(args.where)) {
    return args.where
  }
  return []
}

export const USER_ID = "u1"
export const ONE_OFF_ID = "11111111-1111-7000-8000-000000000001"
export const RECURRING_ID = "11111111-1111-7000-8000-000000000002"
export const ONE_OFF = { id: ONE_OFF_ID, slug: "one-off-task", title: "One Off Task" }
export const COMPLETED_AT_S = 1_700_000_000
export const COMPLETED_AT_MS = COMPLETED_AT_S * 1000
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
