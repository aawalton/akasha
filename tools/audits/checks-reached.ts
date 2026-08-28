import { execFileSync } from "node:child_process"
import { existsSync, readFileSync } from "node:fs"
import { requiredReadingForEach } from "../required-reading.ts"
import type { Check, CheckOutcome } from "../lib/check.ts"
import { judge, over } from "../../outcome/outcome.ts"
import { pageTypePathIn } from "../../page/page-types.ts"
import { refusalText } from "../../refusal/refusal.ts"
import { AKASHA, resolveRoots, rootFor } from "../../repo/roots/roots.ts"

const NAME = "checks-reached"

const UNIT = "registered check(s)"

const CODE_CHECK = pageTypePathIn(rootFor(resolveRoots(), AKASHA), "cluster-check")

const REGISTRY_GLOB = "tools/lib/check-workflow/check-configs*.ts"

const LEAST_REGISTERED = 1

const RESTS_ON =
  `\`git ls-files\` answering for \`${REGISTRY_GLOB}\` in the instructions repository, and each ` +
  `registration spelling its \`script:\` value as a double-quoted literal — a shortfall in either ` +
  `takes paths out of the population without saying so, which makes this check quieter, and what ` +
  `it would drop is exactly what it would have refused`

const SCRIPT_LITERAL = /\bscript:\s*"([^"]+)"/g

const SCRIPT_UNREADABLE = /\bscript:\s*[`']/g

const GIT_CEILING_MS = 10_000

const GIT_MAX_BYTES = 32 * 1024 * 1024

function git(root: string, args: readonly string[]): string | null {
  try {
    return execFileSync("git", ["-C", root, ...args], {
      encoding: "utf-8",
      timeout: GIT_CEILING_MS,
      maxBuffer: GIT_MAX_BYTES,
    })
  } catch {
    return null
  }
}

function headOf(root: string): string {
  const said = git(root, ["rev-parse", "HEAD"])
  return said === null ? "a commit this check could not read" : said.trim().slice(0, 7)
}

export function registeredScripts(bodies: readonly string[]): readonly string[] {
  const found = new Set<string>()
  for (const body of bodies) {
    for (const match of body.matchAll(SCRIPT_LITERAL)) {
      const path = match[1]
      if (path !== undefined) found.add(path)
    }
  }
  return [...found].sort()
}

export function unreadableRegistrations(
  sources: readonly string[],
  bodies: readonly string[]
): readonly string[] {
  const said: string[] = []
  for (const [at, relPath] of sources.entries()) {
    const many = [...(bodies[at] ?? "").matchAll(SCRIPT_UNREADABLE)].length
    if (many === 0) continue
    said.push(
      `\`${relPath}\` spells ${many} \`script:\` value as a template or a single-quoted string, ` +
        `which this check reads as no registration at all. Those paths are not reported as ` +
        `unreached — they are never seen, so the population is short by ${many} and reads exactly ` +
        `like a registry with every check reached. Spell the path as a double-quoted literal, or ` +
        `widen what \`tools/audits/checks-reached.ts\` matches so it can see this form.`
    )
  }
  return said
}

export const checksGoverned: Check = (repo) => {
  const root = rootFor(repo.roots, AKASHA)
  const blind = (why: string): CheckOutcome => ({
    ...judge(NAME, `nothing measured — ${why}`, [
      `${NAME} needs at least ${LEAST_REGISTERED} registered check to certify anything and found ` +
        `none, so this verdict covers no check at all: ${why}. It rests on ${RESTS_ON}.`,
    ]),
    population: over(0, UNIT),
  })

  const listed = git(root, ["ls-files", "-z", "--", REGISTRY_GLOB])
  if (listed === null) {
    return blind(`${root} would not answer \`git ls-files\` for \`${REGISTRY_GLOB}\``)
  }

  const sources = listed
    .split("\0")
    .filter((one) => one !== "")
    .sort()
  if (sources.length === 0) {
    return blind(
      `${root} tracks no \`${REGISTRY_GLOB}\`, so nothing here states which checks the \`check\` ` +
        `workflow assembles`
    )
  }

  const bodies: string[] = []
  for (const relPath of sources) {
    try {
      bodies.push(readFileSync(`${root}/${relPath}`, "utf8"))
    } catch {
      return blind(
        `\`${relPath}\` is tracked in ${root} and could not be read, so the registry was only ` +
          `partly seen`
      )
    }
  }

  const scripts = registeredScripts(bodies)
  if (scripts.length < LEAST_REGISTERED) {
    return blind(
      `${sources.length} registry source(s) in ${root} name no \`script:\` path between them`
    )
  }

  const standsHere = (relPath: string): boolean => existsSync(`${root}/${relPath}`)
  const here = scripts.filter(standsHere)
  const there = scripts.filter((one) => !standsHere(one))
  const codeTree = `${root} at ${headOf(root)}`
  const required = new Map<string, readonly string[]>([
    ...requiredReadingForEach(there, root, "code"),
    ...requiredReadingForEach(here, root, "instructions"),
  ])

  const refusals: string[] = []
  for (const relPath of scripts) {
    if ((required.get(relPath) ?? []).includes(CODE_CHECK)) continue
    refusals.push(refusalText("registered-check-unreached", { path: relPath }, root))
  }

  const naming = bodies.filter((body) => [...body.matchAll(SCRIPT_LITERAL)].length > 0).length
  return {
    ...judge(
      NAME,
      `${scripts.length} check(s) registered across ${sources.length} registry source(s) in ` +
        `${root} read as it stands, ${naming} of them naming one; ${here.length} body(ies) stand ` +
        `there and ${there.length} in ${codeTree}, the tree a code-resident ` +
        `body's required reading resolved against; least ${LEAST_REGISTERED}, resting on ${RESTS_ON}`,
      [...unreadableRegistrations(sources, bodies), ...refusals]
    ),
    population: over(scripts.length, UNIT),
  }
}
