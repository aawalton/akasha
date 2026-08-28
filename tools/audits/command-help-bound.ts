import { AKASHA, rootFor } from "../../repo/roots/roots.ts"
import { readFileSync, existsSync } from "node:fs"
import { dirname, resolve } from "node:path"
import type { AsyncCheck } from "../lib/check.ts"
import { judge, over } from "../../outcome/outcome"
import { workspacesIn } from "../../workspace-package/manifest-workspaces.ts"
import { refusalText } from "../../refusal/refusal.ts"
import { declaredCommands } from "../ops/declared.ts"
import { forwarderCommands } from "../ops/forwarders.ts"

const NAME = "command-help-bound"

const UNIT = "workspace-package TypeScript file"

const DECLARES = "const [A-Za-z][A-Za-z0-9]*: *CommandHelp"

const FLAG = /name: *"(--[a-z0-9-]+)"/g

const RELATIVE = /from *"(\.[^"]*)"/g

const MENTION = /\bops ((?:[a-z][a-z0-9-]*)(?: +[a-z][a-z0-9-]*)*)/g

function read(at: string): string {
  try {
    return readFileSync(at, "utf8")
  } catch {
    return ""
  }
}

function flagsIn(source: string): Set<string> {
  return new Set([...source.matchAll(FLAG)].map((one) => one[1] as string))
}

function localImport(from: string, spec: string): string | null {
  const base = resolve(dirname(from), spec)
  for (const candidate of [base, `${base}.ts`, `${base}/index.ts`]) {
    if (candidate.endsWith(".ts") && existsSync(candidate)) return candidate
  }
  return null
}

function spellingOf(at: string): Set<string> {
  const found = flagsIn(read(at))
  for (const one of read(at).matchAll(RELATIVE)) {
    const next = localImport(at, one[1] as string)
    if (next === null) continue
    for (const flag of flagsIn(read(next))) found.add(flag)
  }
  return found
}

function lines(
  run: { exitCode: number | null; stdout: Uint8Array },
  ceiling: number
): readonly string[] | null {
  if (run.exitCode !== null && run.exitCode > ceiling) return null
  return new TextDecoder()
    .decode(run.stdout)
    .split("\n")
    .filter((one) => one !== "" && !one.endsWith(".test.ts") && !one.includes("__fixtures__"))
    .sort()
}

/**
 * The pathspecs covering every workspace package's TypeScript.
 *
 * THE `packages/` PREFIX IS GONE. The `code` repository was absorbed into akasha and what stood at
 * `packages/infra/` now stands at `infra/`, `packages/shared/` at `shared/`, and so on for each
 * namespace, so no one prefix names them all any more. The manifest's own `workspaces` array is
 * what says which top-level directories hold packages; deriving from it keeps this in step with a
 * namespace added or dropped, where a list written out here would silently search less than it says.
 *
 * NOTHING NAMED IS NOT AN EMPTY SEARCH: a manifest stating no workspaces answers `null`, which the
 * caller refuses over. Reading it as "no packages" would search nothing and report every help
 * spelling bound.
 */
export function workspacePathspecs(manifest: string): readonly string[] | null {
  const workspaces = workspacesIn(manifest)
  if (workspaces === null || workspaces.length === 0) return null
  const dirs = new Set<string>()
  for (const one of workspaces) {
    const head = one.split("/")[0]
    if (head !== undefined && head !== "") dirs.add(head)
  }
  if (dirs.size === 0) return null
  return [...dirs].sort().flatMap((one) => [`${one}/*.ts`, `${one}/**/*.ts`])
}

function searched(codeRoot: string, specs: readonly string[]): readonly string[] | null {
  try {
    return lines(
      Bun.spawnSync(
        [
          "git",
          "-C",
          codeRoot,
          "ls-files",
          "--cached",
          "--others",
          "--exclude-standard",
          "--",
          ...specs,
        ],
        {
          stdout: "pipe",
          stderr: "pipe",
        }
      ),
      0
    )
  } catch {
    return null
  }
}

function spellers(codeRoot: string, specs: readonly string[]): readonly string[] | null {
  try {
    return lines(
      Bun.spawnSync(
        ["git", "-C", codeRoot, "grep", "--untracked", "-lE", DECLARES, "--", ...specs],
        { stdout: "pipe", stderr: "pipe" }
      ),
      1
    )
  } catch {
    return null
  }
}

function claimedCommand(source: string, commands: ReadonlySet<string>): string | null {
  const tally = new Map<string, number>()
  for (const mention of source.matchAll(MENTION)) {
    const tokens = (mention[1] as string).split(/ +/)
    for (let take = tokens.length; take > 0; take -= 1) {
      const candidate = tokens.slice(0, take).join(" ")
      if (!commands.has(candidate)) continue
      tally.set(candidate, (tally.get(candidate) ?? 0) + 1)
      break
    }
  }
  let best: string | null = null
  let seen = 0
  for (const [candidate, count] of tally) {
    if (count > seen || (count === seen && best !== null && candidate.length > best.length)) {
      best = candidate
      seen = count
    }
  }
  return best
}

export const commandHelpBound: AsyncCheck = async (repo) => {
  // THE `code` REPOSITORY IS GONE, absorbed into akasha, so the tree holding these packages is this
  // one. This read `repo.roots.code`, which answers `undefined` for a repository nothing has cloned,
  // and skipped over a population of zero — a verdict `tools/run-checks.ts` counts as not-refused,
  // so no help spelling anywhere was compared and the suite still wrote green.
  const codeRoot = rootFor(repo.roots, AKASHA)
  const specs = workspacePathspecs(read(`${codeRoot}/package.json`))
  if (specs === null) {
    return {
      ...judge(
        NAME,
        `${codeRoot}/package.json states no \`workspaces\`, so which directories hold packages is unknown`,
        [
          `${NAME} builds its pathspecs from the \`workspaces\` array in ${codeRoot}/package.json and ` +
            `read none, so it searched no file and this verdict covers nothing. The \`packages/\` ` +
            `prefix these once stood under is gone — each namespace sits at the top level now — and ` +
            `that array is the only thing left saying which directories they are.`,
        ]
      ),
      population: over(0, UNIT),
    }
  }
  const scanned = searched(codeRoot, specs)
  const found = scanned === null ? null : spellers(codeRoot, specs)
  if (scanned === null || found === null) {
    return {
      ...judge(NAME, `${codeRoot} could not be searched`, [
        refusalText("command-help-unsearchable", { root: codeRoot }, rootFor(repo.roots, AKASHA)),
      ]),
      population: over(0, UNIT),
    }
  }

  const spelling = new Map<string, Set<string>>()
  for (const one of [
    ...declaredCommands(rootFor(repo.roots, AKASHA)),
    ...forwarderCommands(rootFor(repo.roots, AKASHA)),
  ]) {
    const at = one.source
    if (at === undefined) continue
    spelling.set(one.path.join(" "), spellingOf(at))
  }
  const commands = new Set(spelling.keys())

  const messages: string[] = []
  for (const relative of found) {
    const at = `${codeRoot}/${relative}`
    const source = read(at)
    const command = claimedCommand(source, commands)
    if (command === null) {
      messages.push(
        refusalText(
          "command-help-names-no-command",
          { path: relative },
          rootFor(repo.roots, AKASHA)
        )
      )
      continue
    }
    const theirs = flagsIn(source)
    const ours = spelling.get(command) as Set<string>
    const onlyThere = [...theirs].filter((one) => !ours.has(one)).sort()
    const onlyHere = [...ours].filter((one) => !theirs.has(one)).sort()
    if (onlyThere.length === 0 && onlyHere.length === 0) continue
    const difference =
      `${onlyThere.length > 0 ? `only there ${onlyThere.join(" ")}; ` : ""}` +
      `${onlyHere.length > 0 ? `only here ${onlyHere.join(" ")}` : ""}`.trim()
    messages.push(
      refusalText(
        "command-help-flags-drift",
        { path: relative, command, difference },
        rootFor(repo.roots, AKASHA)
      )
    )
  }

  return {
    ...judge(
      NAME,
      `${scanned.length} workspace-package file(s) searched, ${found.length} declaring a \`CommandHelp\`, ${messages.length} unbound or drifted. ` +
        "This reading is keyed on that declaration, never on whether a file parses a command's flags: " +
        "one that reaches `parseArgs` without declaring a `CommandHelp` is outside the denominator " +
        "and a clean count here says nothing about it.",
      messages
    ),
    population: over(scanned.length, UNIT),
  }
}
