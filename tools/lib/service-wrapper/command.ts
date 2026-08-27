const NAMED_AT_MOST = 5

export const RESTART_EXIT = 79

export function commandIn(argv: readonly string[]): readonly string[] {
  const mark = argv.indexOf("--")
  return mark === -1 ? argv : argv.slice(mark + 1)
}

export function alsoIn(argv: readonly string[]): readonly string[] {
  const mark = argv.indexOf("--")
  if (mark === -1) return []
  const globs: string[] = []
  const before = argv.slice(0, mark)
  for (let at = 0; at < before.length; at += 1) {
    if (before[at] !== "--also") continue
    const one = before[at + 1]
    if (one !== undefined) globs.push(one)
  }
  return globs
}

export function entryIn(command: readonly string[]): string | null {
  for (const one of command) if (one.endsWith(".ts")) return one
  return null
}

export function namedIn(moved: readonly string[], root: string): string {
  const named = moved.slice(0, NAMED_AT_MOST).map((at) => at.replace(`${root}/`, ""))
  const rest = moved.length > NAMED_AT_MOST ? ` and ${moved.length - NAMED_AT_MOST} more` : ""
  return `${named.join(", ")}${rest}`
}
