import { existsSync, readFileSync, statSync } from "node:fs"
import { canonicalize } from "../../repo/path/path"

const GITDIR_PREFIX = "gitdir:"

export function expandHome(path: string): string {
  const home = process.env.HOME
  if (home === undefined || home === "") return path
  if (path === "~") return home
  return path.startsWith("~/") ? `${home}${path.slice(1)}` : path
}

export function codeCheckoutOf(absolute: string, codeRoot: string): string | null {
  const gitDir = canonicalize(`${codeRoot}/.git`)
  const segments = canonicalize(absolute)
    .split("/")
    .filter((segment) => segment !== "")
  for (let depth = segments.length - 1; depth > 0; depth -= 1) {
    const at = `/${segments.slice(0, depth).join("/")}`
    const dotGit = `${at}/.git`
    if (!existsSync(dotGit)) continue
    if (statSync(dotGit).isDirectory()) return canonicalize(dotGit) === gitDir ? at : null
    const pointer = readFileSync(dotGit, "utf8").trim()
    if (!pointer.startsWith(GITDIR_PREFIX)) return null
    const named = canonicalize(pointer.slice(GITDIR_PREFIX.length).trim())
    return named === gitDir || named.startsWith(`${gitDir}/`) ? at : null
  }
  return null
}
