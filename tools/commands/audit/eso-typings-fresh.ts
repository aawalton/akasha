export const summary =
  "Every clone-derived ESO artifact committed to this repository whose stamped API version has fallen behind the `~/esoui` clone it was generated from, taken over the tree as it stands. Was the drift arm of `check-eso-typings-fresh`, which compared committed stamps against `$HOME/esoui/ESOUIDocumentation.txt` — a tree no code-repo change can move, and one CI has never had, since CI runs with `HOME=/tmp` and acquires no clone, so that arm silently dropped on every CI run while the check still printed green. The stamp-integrity arm stayed a check, being answerable from this repository alone. Reports and never refuses on a finding: a stale stamp may want regenerating or may want the clone updated first, and only a reading tells which. Refuses where it could not look — no clone doc, no version header in it, or no clone-derived artifact found — because a run with no clone to compare against must not print like a run that found no drift (--repo-root, --eso-doc, --json)"

import { existsSync, readFileSync, realpathSync } from "node:fs"
import { resolve } from "node:path"
import { codeModule } from "../../lib/code-import.ts"
import { operationalError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { renderAuditReading, summarizeAudit } from "../../lib/audit-reading.ts"
import { codeRoot } from "../../lib/code-root.ts"
import type { CommandHelp } from "../../ops/surface.ts"

const ESO_PATHS = "@temper/shared-foundation-misc-eso-paths"
const CLONE_ARTIFACTS = "packages/temper/shared/build-deploy/checks/src/eso-clone-artifacts.ts"

const SUBJECT = "clone-derived ESO artifacts stamped behind the ~/esoui clone"

const MAX_REPORTED = 20

export const help: CommandHelp = {
  flags: [
    {
      name: "--repo-root",
      argLabel: "<path>",
      valueShape: "token",
      description:
        "Which checkout to read committed ESO artifacts from; defaults to $CODE_ROOT, else this repository",
    },
    {
      name: "--eso-doc",
      argLabel: "<path>",
      valueShape: "token",
      description:
        "Which ESOUIDocumentation.txt to read the clone's API version from; defaults to $ESOUI_SRC_DIR/ESOUIDocumentation.txt or $HOME/esoui/ESOUIDocumentation.txt",
    },
    {
      name: "--json",
      description: "Emit the audit as single-line JSON instead of the human report",
    },
  ],
  exits: [
    { code: 0, meaning: "the audit ran and printed its reading, findings or none" },
    {
      code: 3,
      meaning:
        "operational error — no clone documentation to read, no version header in it, or no clone-derived artifact found, so no comparison was made",
    },
  ],
  examples: [
    "ops audit eso-typings-fresh",
    "ops audit eso-typings-fresh --eso-doc ~/esoui/ESOUIDocumentation.txt --json",
  ],
}

interface EsoPathsModule {
  readonly esouiDocPath: () => string
  readonly parseEsoDocApiVersion: (docText: string) => number
}

interface StampedArtifact {
  readonly label: string
  readonly version: number | null
  readonly generator: string
  readonly generatorAt?: string
  readonly generatorPresent: boolean
}

interface CloneArtifactsModule {
  readonly WALK_ROOT: string
  readonly buildEsoClonePopulation: (repoRoot: string) => {
    readonly artifacts: readonly StampedArtifact[]
    readonly filesScanned: number
  }
}

function messageOf(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}

function realOrGiven(path: string): string {
  try {
    return realpathSync(path)
  } catch {
    return path
  }
}

export default async function auditEsoTypingsFresh(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)

  const [esoPaths, cloneArtifacts] = await Promise.all([
    codeModule<EsoPathsModule>(ESO_PATHS),
    codeModule<CloneArtifactsModule>(CLONE_ARTIFACTS),
  ])

  const repoRootFlag = parsed.string("--repo-root")
  const repoRoot = realOrGiven(repoRootFlag === undefined ? codeRoot() : resolve(repoRootFlag))

  const docFlag = parsed.string("--eso-doc")
  const docPath = realOrGiven(docFlag === undefined ? esoPaths.esouiDocPath() : resolve(docFlag))

  if (!existsSync(docPath)) {
    throw operationalError(
      `${docPath} is not there, so there was no clone version to compare any committed stamp ` +
        "against and nothing was measured. The clone is the whole other side of this reading — " +
        "restore it with `git clone https://github.com/esoui/esoui.git ~/esoui`, or name another " +
        "copy with --eso-doc. This is the condition the check it came from swallowed, dropping " +
        "to a weaker comparison and still exiting 0"
    )
  }

  let docText: string
  try {
    docText = readFileSync(docPath, "utf8")
  } catch (error) {
    throw operationalError(
      `${docPath} could not be read, so no clone version was acquired — ${messageOf(error)}`
    )
  }

  let cloneApiVersion: number
  try {
    cloneApiVersion = esoPaths.parseEsoDocApiVersion(docText)
  } catch (error) {
    throw operationalError(
      `${docPath} yielded no API version, so every committed stamp would read as agreeing with ` +
        `nothing rather than being weighed against the clone — ${messageOf(error)}`
    )
  }

  let population: { readonly artifacts: readonly StampedArtifact[]; readonly filesScanned: number }
  try {
    population = cloneArtifacts.buildEsoClonePopulation(repoRoot)
  } catch (error) {
    throw operationalError(
      `the walk over ${cloneArtifacts.WALK_ROOT} in ${repoRoot} did not complete, so no ` +
        `population of clone-derived artifacts was acquired — ${messageOf(error)}`
    )
  }

  const { artifacts, filesScanned } = population

  if (artifacts.length === 0) {
    throw operationalError(
      `none of the ${String(filesScanned)} generated file(s) under ${cloneArtifacts.WALK_ROOT} in ` +
        `${repoRoot} carries a clone provenance line, so no artifact was compared against the ` +
        "clone. Every clone-derived artifact carries one, so an empty population means the walk " +
        "lost them rather than that they are all current"
    )
  }

  const unstamped = artifacts.filter((one) => one.version === null).map((one) => one.label)
  const stamped = artifacts.filter(
    (one): one is StampedArtifact & { version: number } => one.version !== null
  )

  if (stamped.length === 0) {
    throw operationalError(
      `all ${String(artifacts.length)} clone-derived artifact(s) in ${repoRoot} carry no ` +
        "ESO-API-Version stamp, so none could be weighed against the clone and a clean run would " +
        "say only that nothing was looked at. `check-eso-typings-fresh` is what reports an " +
        "unstamped artifact as a violation"
    )
  }

  const findings = stamped
    .filter((one) => one.version !== cloneApiVersion)
    .map((one) => ({
      label: one.label,
      stamped: one.version,
      generator: one.generator,
      generatorAt: one.generatorAt,
    }))
    .sort((one, other) => one.label.localeCompare(other.label))

  const generators = new Set(artifacts.map((one) => one.generator)).size

  const audit = {
    reading: summarizeAudit({
      scanned: artifacts.length,
      compared: stamped.length,
      findings: findings.length,
      coverage: "complete" as const,
    }),
    repoRoot,
    docPath,
    cloneApiVersion,
    walkRoot: cloneArtifacts.WALK_ROOT,
    filesScanned,
    generators,
    artifacts: artifacts.length,
    unstamped,
    compared: stamped.length,
    findings,
    observedAtMs: Date.now(),
  }

  if (parsed.boolean("--json")) {
    process.stdout.write(`${JSON.stringify(audit)}\n`)
    return
  }

  const lines = [...renderAuditReading(SUBJECT, audit.reading)]
  lines.push(
    `  POPULATION: ${String(artifacts.length)} clone-derived artifact(s) of ${String(filesScanned)} ` +
      `generated file(s) under ${cloneArtifacts.WALK_ROOT} in ${repoRoot}, by ${String(generators)} ` +
      `generator(s), against clone API version ${String(cloneApiVersion)} from ${docPath}.`
  )
  lines.push(
    `  DENOMINATOR: ${String(stamped.length)} artifact(s) were compared, after ${String(unstamped.length)} ` +
      "set aside carrying no ESO-API-Version stamp to compare."
  )
  for (const label of unstamped.slice(0, MAX_REPORTED)) {
    lines.push(`    ${label} — unstamped, so nothing here weighs it; check-eso-typings-fresh does`)
  }
  if (findings.length === 0) {
    lines.push(
      `    Every artifact compared is stamped ${String(cloneApiVersion)}, current with the clone.`
    )
  } else {
    lines.push(
      `  BEHIND THE CLONE: ${String(findings.length)} of ${String(stamped.length)} artifact(s) compared.`
    )
    for (const one of findings.slice(0, MAX_REPORTED)) {
      lines.push(
        `    ${one.label} — stamped ${String(one.stamped)}, clone at ${String(cloneApiVersion)}; ` +
          `regenerate with \`bun ${one.generatorAt ?? one.generator}\``
      )
    }
    if (findings.length > MAX_REPORTED) {
      lines.push(
        `    and ${String(findings.length - MAX_REPORTED)} more, not listed; --json carries every one`
      )
    }
  }
  process.stdout.write(`${lines.join("\n")}\n`)
}
