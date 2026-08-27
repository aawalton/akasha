import { namedIn, type NamedPath } from "./command-paths.ts"

const BUN = "bun"

const BUN_SUFFIX = "/bun"

const SEGMENT_BREAK = /&&|\|\||[;|]/

const WHITESPACE = /\s+/

const QUOTES = /^["'`]|["'`]$/g

const INLINE_CODE: readonly string[] = ["-e", "--eval", "--print", "-p"]

const FLAG_MARK = "-"

const PATH_SHAPE = /^[A-Za-z0-9._@$/-]+$/

const unquoted = (token: string): string => token.replace(QUOTES, "")

const runsBun = (head: string): boolean => head === BUN || head.endsWith(BUN_SUFFIX)

export const bunEntryIn = (segment: string): NamedPath | null => {
  const tokens = segment.trim().split(WHITESPACE).filter((token) => token !== "")
  const [head, ...rest] = tokens
  if (head === undefined || !runsBun(unquoted(head))) return null
  if (rest.some((token) => INLINE_CODE.includes(unquoted(token)))) return null
  for (const token of rest) {
    const bare = unquoted(token)
    if (bare.startsWith(FLAG_MARK)) continue
    if (!PATH_SHAPE.test(bare)) continue
    const named = namedIn(bare)
    if (named !== null) return named
  }
  return null
}

export const bunEntriesIn = (commands: readonly string[]): readonly NamedPath[] => {
  const found = new Map<string, NamedPath>()
  for (const command of commands) {
    for (const segment of command.split(SEGMENT_BREAK)) {
      const named = bunEntryIn(segment)
      if (named === null) continue
      found.set(`${named.repo}:${named.path}`, named)
    }
  }
  return [...found.values()]
}
