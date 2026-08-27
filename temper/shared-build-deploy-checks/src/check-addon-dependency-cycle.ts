#!/usr/bin/env bun

import { readFileSync } from "node:fs"
import { join } from "node:path"
import { type AddonInfo, listAllAddons } from "@temper/shared-build-deploy-addons-resolve"
import { z } from "zod"
import {
  type AddonDepInput,
  type DependencyCycleViolation,
  findDependencyCycles,
} from "./addon-dependency-cycle"
import { EMPTY_ADDON_ROSTER_HINT } from "./addon-roster-guard"
import { parseArgs as parseCliArgs, REPO_ROOT_FLAG } from "./lib/cli-args"
import { errorMessage } from "./lib/error-message"
import { getRepoRoot } from "./lib/repo-root"
import { renderPopulationBound } from "./population-bound"

const PREFIX = "[addon-dependency-cycle]"

const AddonJsonSchema = z
  .object({
    name: z.string().optional(),
    dependsOn: z.array(z.string()).optional(),
    optionalDependsOn: z.array(z.string()).optional(),
  })
  .passthrough()

function readDeps(addonDir: string): readonly string[] {
  const raw = readFileSync(join(addonDir, "addon.json"), "utf8")
  const parsed = AddonJsonSchema.parse(JSON.parse(raw))
  return [...(parsed.dependsOn ?? []), ...(parsed.optionalDependsOn ?? [])]
}

function buildInputs(roster: readonly AddonInfo[]): readonly AddonDepInput[] {
  const inputs: AddonDepInput[] = []
  for (const addon of roster) {
    inputs.push({ addonName: addon.canonicalName, deps: readDeps(addon.dir) })
  }
  return inputs
}

function reportHuman(
  violations: readonly DependencyCycleViolation[],
  addonsExamined: number
): undefined {
  const bound = renderPopulationBound(addonsExamined, addonsExamined, "addons")
  if (violations.length === 0) {
    process.stdout.write(`${PREFIX} the addon dependency graph is acyclic. ${bound}\n`)
    return
  }
  process.stdout.write(
    `${PREFIX} circular addon load dependencies — ${violations.length} cycle(s):\n\n`
  )
  for (const v of violations) {
    process.stdout.write(`  - ${v.message}\n`)
  }
  process.stdout.write(`\n${PREFIX} ${violations.length} cycle(s) found ${bound}\n`)
}

function main(): 0 | 1 | 2 {
  let asJson = false
  try {
    const { flags } = parseCliArgs(
      process.argv.slice(2),
      { json: { kind: "boolean" } },
      { passthrough: true }
    )
    asJson = flags.json ?? false
  } catch {
    asJson = false
  }

  let violations: readonly DependencyCycleViolation[]
  let addonsExamined = 0
  try {
    const repoRoot =
      parseCliArgs(process.argv.slice(2), REPO_ROOT_FLAG, { passthrough: true }).flags.repoRoot ??
      getRepoRoot()
    const roster = listAllAddons({ repoRoot })
    if (roster.length === 0) {
      process.stderr.write(`${PREFIX} ${EMPTY_ADDON_ROSTER_HINT}\n`)
      return 2
    }
    const inputs = buildInputs(roster)
    addonsExamined = inputs.length
    violations = findDependencyCycles(inputs)
  } catch (err) {
    process.stderr.write(`${PREFIX} tool error: ${errorMessage(err)}\n`)
    return 2
  }

  if (asJson) {
    for (const v of violations) process.stdout.write(`${JSON.stringify(v)}\n`)
  } else {
    reportHuman(violations, addonsExamined)
  }
  return violations.length === 0 ? 0 : 1
}

if (import.meta.main) {
  process.exit(main())
}
