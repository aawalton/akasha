
export function refuse(message: string): never {
  process.stderr.write(`error: ${message}\n`)
  process.exit(1)
}

const STDIN_CEILING_MS = 5_000

export async function question(subject: string): Promise<unknown> {
  let ceiling: ReturnType<typeof setTimeout> | undefined
  const text = await Promise.race([
    Bun.stdin.text(),
    new Promise<never>((_, reject) => {
      ceiling = setTimeout(
        () =>
          reject(
            new Error(
              `${subject}: nothing had arrived on stdin after ${STDIN_CEILING_MS}ms, so there is ` +
                "no question to answer. The payload is written to this command's stdin and the pipe " +
                "is then closed; a caller that leaves it open waits here rather than being told."
            )
          ),
        STDIN_CEILING_MS
      )
    }),
  ]).catch((err: unknown) => refuse(err instanceof Error ? err.message : String(err)))
  clearTimeout(ceiling)

  if (text.trim().length === 0) {
    refuse(
      `${subject}: stdin was empty, so there is no question to answer. This command takes its ` +
        "payload as JSON on stdin rather than on argv."
    )
  }
  try {
    return JSON.parse(text)
  } catch (cause) {
    refuse(
      `${subject}: the payload on stdin is not JSON, so nothing it asks can be read. ` +
        `${cause instanceof Error ? cause.message : String(cause)}`
    )
  }
}

export function listAt(payload: unknown, key: string, subject: string): readonly unknown[] {
  if (typeof payload !== "object" || payload === null) {
    refuse(`${subject}: the payload is not an object, so it carries no '${key}' to answer.`)
  }
  const value = (payload as Record<string, unknown>)[key]
  if (!Array.isArray(value)) {
    refuse(
      `${subject}: the payload's '${key}' is ${value === undefined ? "absent" : "not a list"}. ` +
        "This command answers a list of questions with a list of verdicts, one for one."
    )
  }
  return value
}

export function answer(value: unknown): void {
  process.stdout.write(`${JSON.stringify(value)}\n`)
}

export function fieldsOf(value: unknown, subject: string, what: string): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    refuse(`${subject}: ${what} is ${value === null ? "null" : typeof value}, where an object is read.`)
  }
  return value as Record<string, unknown>
}

function present(row: Record<string, unknown>, field: string, subject: string, what: string): unknown {
  if (!(field in row)) {
    refuse(
      `${subject}: ${what} carries no '${field}'. Absent is refused rather than read as null, ` +
        "because null is a positive answer in this rule and a forgotten key is not."
    )
  }
  return row[field]
}

export function stringAt(row: Record<string, unknown>, field: string, subject: string, what: string): string {
  const value = present(row, field, subject, what)
  if (typeof value !== "string") {
    refuse(`${subject}: ${what}'s '${field}' is ${typeof value}, where a string is read.`)
  }
  return value
}

export function nullableStringAt(row: Record<string, unknown>, field: string, subject: string, what: string): string | null {
  const value = present(row, field, subject, what)
  if (value !== null && typeof value !== "string") {
    refuse(`${subject}: ${what}'s '${field}' is ${typeof value}, where a string or null is read.`)
  }
  return value as string | null
}

export function nullableNumberAt(row: Record<string, unknown>, field: string, subject: string, what: string): number | null {
  const value = present(row, field, subject, what)
  if (value !== null && (typeof value !== "number" || !Number.isFinite(value))) {
    refuse(`${subject}: ${what}'s '${field}' is ${typeof value}, where a number or null is read.`)
  }
  return value as number | null
}

export function booleanAt(row: Record<string, unknown>, field: string, subject: string, what: string): boolean {
  const value = present(row, field, subject, what)
  if (typeof value !== "boolean") {
    refuse(
      `${subject}: ${what}'s '${field}' is ${typeof value}, where a boolean is read. This is the ` +
        "field an absent key answers quietly and wrongly, so it is the one held hardest."
    )
  }
  return value
}
