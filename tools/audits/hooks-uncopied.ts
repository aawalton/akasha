import { AKASHA, rootFor } from "../../repo/roots/roots.ts"
import type { Check } from "../lib/check.ts"
import { judge, over, skip } from "../../outcome/outcome"
import { refusalText } from "../../refusal/refusal.ts"
import { commandsIn, SETTINGS_PATH, tokensIn } from "../lib/hook-settings.ts"

const NAME = "hooks-uncopied"

const HOME_PREFIXES = ["$HOME/", "${HOME}/", "~/"] as const

const REPOS_DIR = "repos/"

const HERE = `${AKASHA}/`

export function homeRelative(token: string): string | null {
  for (const prefix of HOME_PREFIXES) {
    if (!token.startsWith(prefix)) continue
    const tail = token.slice(prefix.length)
    return tail.startsWith(REPOS_DIR) ? tail.slice(REPOS_DIR.length) : tail
  }
  return null
}

export function basename(path: string): string {
  return path.split("/").pop() ?? path
}

export function registeredHooks(document: unknown): Map<string, string> {
  const commands: string[] = []
  commandsIn(document, commands)
  const found = new Map<string, string>()
  for (const command of commands) {
    for (const token of tokensIn(command)) {
      const tail = homeRelative(token)
      if (tail === null) continue
      // THE `instructions` AND `code` REPOSITORIES ARE GONE, absorbed into akasha, so every hook the
      // fleet fires is registered under `akasha/`. This tested the two old names, which no
      // registration carries any more: it matched nothing, and a fleet firing no hook at all reads
      // exactly like one whose every hook is uncopied.
      if (!tail.startsWith(HERE)) continue
      const name = basename(tail)
      if (!found.has(name)) found.set(name, tail)
    }
  }
  return found
}

function trackedInCode(root: string): readonly string[] | null {
  try {
    const run = Bun.spawnSync(["git", "-C", root, "ls-files", "-z"], {
      stdout: "pipe",
      stderr: "pipe",
    })
    if (run.exitCode !== 0) return null
    return new TextDecoder()
      .decode(run.stdout)
      .split("\0")
      .filter((one) => one !== "")
  } catch {
    return null
  }
}

export const hooksUncopied: Check = (repo) => {
  const root = rootFor(repo.roots, AKASHA)
  const nothing = over(0, "hook(s) the fleet fires")
  if (!repo.exists(`${root}/${SETTINGS_PATH}`)) {
    return {
      ...skip(NAME, `${SETTINGS_PATH} is not there, so this repository registers no hook to check`),
      population: nothing,
    }
  }
  let document: unknown
  try {
    document = JSON.parse(repo.read(SETTINGS_PATH))
  } catch {
    return {
      ...skip(
        NAME,
        `${SETTINGS_PATH} is not readable JSON, so which hooks it registers cannot be known`
      ),
      population: nothing,
    }
  }

  const hooks = registeredHooks(document)
  if (hooks.size === 0) {
    return {
      ...skip(
        NAME,
        `${SETTINGS_PATH} registers no hook script, so there is nothing a copy could shadow`
      ),
      population: nothing,
    }
  }

  // THE `code` REPOSITORY IS GONE, absorbed into akasha, so the tree a stray copy would be tracked
  // in is this one. This read `repo.roots.code`, which answers `undefined` for a repository nothing
  // has cloned, and skipped over a population of zero — a verdict `tools/run-checks.ts` counts as
  // not-refused, so no hook was compared against anything and the suite still wrote green.
  const codeRoot = root

  const tracked = trackedInCode(codeRoot)
  if (tracked === null) {
    return {
      ...skip(
        NAME,
        `${codeRoot} could not be listed as a git repository, so whether any of ` +
          `${hooks.size} registered hook(s) has a copy there is unknown rather than answered`
      ),
      population: nothing,
    }
  }

  const byName = new Map<string, string[]>()
  for (const relPath of tracked) {
    const name = basename(relPath)
    const already = byName.get(name)
    if (already === undefined) byName.set(name, [relPath])
    else already.push(relPath)
  }

  const refusals: string[] = []
  for (const [name, registeredAs] of [...hooks].sort()) {
    // THE HOOK'S OWN FILE IS NOT A COPY OF ITSELF. The two repositories being one now, the file a
    // registration names is tracked in the very tree being listed, so a match on name alone reported
    // every registered hook as its own twin.
    const own = registeredAs.slice(HERE.length)
    for (const relPath of byName.get(name) ?? []) {
      if (relPath === own) continue
      refusals.push(
        refusalText(
          "hook-copied-into-code",
          { name, registered: registeredAs, path: relPath },
          root
        )
      )
    }
  }

  return {
    ...judge(
      NAME,
      `${hooks.size} hook(s) the fleet fires, against ${tracked.length} file(s) tracked in ${codeRoot}`,
      refusals
    ),
    population: over(hooks.size, "hook(s) the fleet fires"),
  }
}
