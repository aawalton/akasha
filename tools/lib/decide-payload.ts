
export class Refused extends Error {}

export function refuse(path: string, wanted: string): never {
  throw new Refused(`${path}: expected ${wanted}`)
}

export function object(value: unknown, path: string): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) refuse(path, "an object")
  return value as Record<string, unknown>
}

export function at(source: Record<string, unknown>, key: string, path: string): unknown {
  if (!(key in source)) {
    refuse(`${path}.${key}`, "to be present — it is required, and nothing here is defaulted")
  }
  return source[key]
}

export function str(source: Record<string, unknown>, key: string, path: string): string {
  const value = at(source, key, path)
  return typeof value === "string" ? value : refuse(`${path}.${key}`, "a string")
}

export function strOrNull(
  source: Record<string, unknown>,
  key: string,
  path: string
): string | null {
  const value = at(source, key, path)
  if (value === null) return null
  return typeof value === "string" ? value : refuse(`${path}.${key}`, "a string or null")
}

export function numOrNull(
  source: Record<string, unknown>,
  key: string,
  path: string
): number | null {
  const value = at(source, key, path)
  if (value === null) return null
  return typeof value === "number" && Number.isFinite(value)
    ? value
    : refuse(`${path}.${key}`, "a number or null")
}

export function bool(source: Record<string, unknown>, key: string, path: string): boolean {
  const value = at(source, key, path)
  return typeof value === "boolean" ? value : refuse(`${path}.${key}`, "true or false")
}

export async function answerAsked(
  payload: unknown,
  decisions: Readonly<Record<string, (value: unknown, path: string) => unknown | Promise<unknown>>>
): Promise<Record<string, unknown>> {
  const keys = Object.keys(decisions)
  const asked = object(payload, "the payload")
  const names = Object.keys(asked)
  if (names.length === 0) throw new Refused(`the payload asks nothing — this command takes ${keys.join(", ")}`)
  const stray = names.filter((name) => !keys.includes(name))
  if (stray.length > 0) {
    throw new Refused(
      `\`${stray.join("`, `")}\` names no decision this command makes — it takes ${keys.join(", ")}`
    )
  }
  const answers: Record<string, unknown> = {}
  for (const name of names) {
    const decide = decisions[name]
    if (decide !== undefined) answers[name] = await decide(asked[name], name)
  }
  return answers
}

export async function payloadOrHelp(
  argv: readonly string[],
  help: string
): Promise<unknown | null> {
  if (argv.includes("--help") || argv.includes("-h")) {
    process.stdout.write(help)
    return null
  }
  const [first] = argv
  if (first !== undefined) {
    process.stderr.write(
      `error: \`${first}\` is an argument and this command takes none — the whole call is the JSON on stdin\n`
    )
    process.exit(1)
  }
  const text = await Bun.stdin.text()
  if (text.trim() === "") {
    process.stderr.write(
      "error: nothing arrived on stdin. This command answers what a caller asks it, so an empty payload names no decision to make.\n"
    )
    process.exit(1)
  }
  try {
    return JSON.parse(text)
  } catch (err) {
    process.stderr.write(
      `error: stdin is not JSON — ${err instanceof Error ? err.message : String(err)}\n`
    )
    process.exit(1)
  }
}

export async function reply(compute: () => unknown | Promise<unknown>): Promise<void> {
  try {
    process.stdout.write(`${JSON.stringify(await compute())}\n`)
  } catch (err) {
    if (!(err instanceof Refused)) throw err
    process.stderr.write(`error: ${err.message}\n`)
    process.exit(1)
  }
}
