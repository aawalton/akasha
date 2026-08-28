import type { Roots } from "../../page/page"
import { canonicalize, isInside } from "../../repo/path/path"
import { AKASHA, isAddressable, rootFor } from "../../repo/roots/roots"

export const SETTINGS_PATH = "settings/agents.json"

export const HOOK_DIR = "tools/hooks"

const HOME_PREFIXES = ["$HOME/", "${HOME}/", "~/"] as const

const REPOS_DIR = "repos/"

export function commandsIn(node: unknown, into: string[]): void {
  if (Array.isArray(node)) {
    for (const child of node) commandsIn(child, into)
    return
  }
  if (node === null || typeof node !== "object") return
  for (const [key, value] of Object.entries(node)) {
    if (key === "command" && typeof value === "string") into.push(value)
    else commandsIn(value, into)
  }
}

export function tokensIn(command: string): readonly string[] {
  return command.split(/\s+/).map((word) => word.replace(/^['"]+|['"]+$/g, ""))
}

/**
 * The absolute path a token names, or `null` where it names none here.
 *
 * A `$HOME`-SPELLED TOKEN CARRIES A REPOSITORY'S NAME WHERE AN ABSOLUTE ONE CARRIES ITS ROOT. The
 * name is read off the head of the token and answered from the roots, which are built from the
 * `*.repo.md` pages, so which names resolve is data rather than a name written in here.
 *
 * A head addressing no repository, or one this machine has not cloned, names no path here.
 */
function absoluteFor(token: string, roots: Roots): string | null {
  for (const prefix of HOME_PREFIXES) {
    if (!token.startsWith(prefix)) continue
    const tail = token.slice(prefix.length)
    const under = tail.startsWith(REPOS_DIR) ? tail.slice(REPOS_DIR.length) : tail
    const cut = under.indexOf("/")
    const named = cut === -1 ? under : under.slice(0, cut)
    const rest = cut === -1 ? "" : under.slice(cut + 1)
    if (!isAddressable(named)) return null
    const root = roots[named]
    if (root === undefined) return null
    return rest === "" ? root : `${root}/${rest}`
  }
  return token.startsWith("/") ? token : null
}

/**
 * Where a token stands under this repository, or `null` where it stands outside it.
 *
 * BOTH SPELLINGS TRAVEL ONE JUDGEMENT. A `$HOME`-spelled token is turned into the absolute path it
 * names and then measured against the akasha root exactly as an absolute token is, so two spellings
 * of one file answer alike. A file in another repository stands outside this one under either
 * spelling, every caller joining what comes back to the akasha root.
 */
export function repoRelative(token: string, roots: Roots): string | null {
  const absolute = absoluteFor(token, roots)
  if (absolute === null) return null
  const akasha = rootFor(roots, AKASHA)
  if (!isInside(akasha, absolute)) return null
  const root = canonicalize(akasha)
  const resolved = canonicalize(absolute)
  return resolved === root ? null : resolved.slice(root.length + 1)
}

export function byScript(document: unknown, roots: Roots): Map<string, string> {
  const commands: string[] = []
  commandsIn(document, commands)
  const found = new Map<string, string>()
  for (const command of commands) {
    for (const token of tokensIn(command)) {
      const relPath = repoRelative(token, roots)
      if (relPath !== null && !found.has(relPath)) found.set(relPath, command)
    }
  }
  return found
}
