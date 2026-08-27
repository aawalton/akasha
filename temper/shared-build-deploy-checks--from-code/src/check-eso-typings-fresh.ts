#!/usr/bin/env bun

import { buildEsoClonePopulation, WALK_ROOT } from "./eso-clone-artifacts"
import { evaluateEsoTypingsFreshness, type StampedArtifact } from "./eso-doc-api-version"
import { parseArgs as parseCliArgs, REPO_ROOT_FLAG } from "./lib/cli-args"
import { errorMessage } from "./lib/error-message"
import { getRepoRoot } from "./lib/repo-root"
import { renderPopulationBound } from "./population-bound"

function generatorsCovered(artifacts: readonly StampedArtifact[]): number {
  return new Set(artifacts.map((a) => a.generator)).size
}

function main(): number {
  const repoRoot =
    parseCliArgs(process.argv.slice(2), REPO_ROOT_FLAG, { passthrough: true }).flags.repoRoot ??
    getRepoRoot()
  const { artifacts, filesScanned } = buildEsoClonePopulation(repoRoot)

  const bound = renderPopulationBound(
    artifacts.length,
    artifacts.length,
    "clone-derived ESO artifacts"
  )
  const scan = `from ${filesScanned} generated file(s) under ${WALK_ROOT}, by ${generatorsCovered(artifacts)} generator(s)`

  const result = evaluateEsoTypingsFreshness({ artifacts })
  if (result.ok) {
    process.stdout.write(
      "check-eso-typings-fresh: every clone-derived ESO artifact is stamped, names a generator " +
        `that is still there, and agrees with the others ${bound} ${scan}\n`
    )
    return 0
  }

  for (const violation of result.violations) {
    process.stderr.write(`check-eso-typings-fresh: ${violation}\n`)
  }
  process.stderr.write(
    `check-eso-typings-fresh: ${result.violations.length} stamp defect(s) found ${bound} ${scan} — ` +
      "regenerate with the command each violation above names. Whether these stamps have fallen " +
      "behind the ESO API itself is not asked here, that being a reading of a clone outside this " +
      "repository; a separate audit answers that one\n"
  )
  return 1
}

if (import.meta.main) {
  try {
    process.exit(main())
  } catch (err) {
    process.stderr.write(`check-eso-typings-fresh: ${errorMessage(err)}\n`)
    process.exit(2)
  }
}
