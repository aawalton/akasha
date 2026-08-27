import type { Repo } from "../../../../../page/document/types.ts"
import { UNRESOLVED } from "./workflow-commands.ts"

const CODE_REPO: Repo = "code"

const INSTRUCTIONS_REPO: Repo = "instructions"

const CODE_CHECKOUT_VARIABLES: readonly string[] = ["$WS/", "$WORKSPACE/"]

const INSTRUCTIONS_VARIABLES: readonly string[] = ["$INSTRUCTIONS_ROOT/"]

const CODE_CHECKOUT_DIR = "/ci-storage/checkouts/"

const INSTRUCTIONS_TREE_DIR = "/ci-storage/instructions/"

const VENDOR_DIR = "node_modules"

const BREAKS = /[\s"'`|&;()<>=,:!*?[\]{}\\]+/

const UNSPELLED = ["$", "-", "/"]

export type NamedPath = {
  readonly repo: Repo
  readonly path: string
}

export const tokensIn = (command: string): readonly string[] =>
  command
    .split(UNRESOLVED)
    .join(" ")
    .split(BREAKS)
    .filter((token) => token !== "")

const sound = (path: string): boolean => {
  if (!path.includes("/")) return false
  if (path.startsWith("/") || path.startsWith(".")) return false
  if (path.includes("//") || path.includes("..")) return false
  if (path.includes("$") || path.includes("~")) return false
  return !path.split("/").includes(VENDOR_DIR)
}

const standing = (repo: Repo, path: string): NamedPath | null =>
  sound(path) ? { repo, path } : null

const beneath = (dir: string, token: string): string | null => {
  const rest = token.slice(dir.length)
  const at = rest.indexOf("/")
  return at <= 0 ? null : rest.slice(at + 1)
}

export const namedIn = (token: string): NamedPath | null => {
  for (const spelling of CODE_CHECKOUT_VARIABLES) {
    if (token.startsWith(spelling)) return standing(CODE_REPO, token.slice(spelling.length))
  }
  for (const spelling of INSTRUCTIONS_VARIABLES) {
    if (token.startsWith(spelling)) return standing(INSTRUCTIONS_REPO, token.slice(spelling.length))
  }
  if (token.startsWith(CODE_CHECKOUT_DIR)) {
    const rest = beneath(CODE_CHECKOUT_DIR, token)
    return rest === null ? null : standing(CODE_REPO, rest)
  }
  if (token.startsWith(INSTRUCTIONS_TREE_DIR)) {
    const rest = beneath(INSTRUCTIONS_TREE_DIR, token)
    return rest === null ? null : standing(INSTRUCTIONS_REPO, rest)
  }
  if (UNSPELLED.some((mark) => token.startsWith(mark))) return null
  return standing(CODE_REPO, token)
}

export const pathsNamedIn = (commands: readonly string[]): readonly NamedPath[] => {
  const found = new Map<string, NamedPath>()
  for (const command of commands) {
    for (const token of tokensIn(command)) {
      const named = namedIn(token)
      if (named === null) continue
      found.set(`${named.repo}:${named.path}`, named)
    }
  }
  return [...found.values()]
}
