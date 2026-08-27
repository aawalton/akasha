#!/usr/bin/env bun

import { readFileSync } from "node:fs"
import { join } from "node:path"
import { type AddonInfo, listAllAddons } from "@temper/shared-build-deploy-addons-resolve"
import { addonManifestSchema } from "@temper/shared-build-deploy-addons-resolve/manifest"
import {
  type AddonFloorInput,
  auditDependencyFloors,
  type DependencyFloorAudit,
} from "./addon-dependency-floor"
import { EMPTY_ADDON_ROSTER_HINT } from "./addon-roster-guard"
import { parseArgs as parseCliArgs, REPO_ROOT_FLAG } from "./lib/cli-args"
import { errorMessage } from "./lib/error-message"
import { getRepoRoot } from "./lib/repo-root"
import { renderPopulationBound } from "./population-bound"

const PREFIX = "[addon-dependency-floor]"

const AddonFloorManifestSchema = addonManifestSchema
  .pick({ addonVersion: true, dependsOn: true, optionalDependsOn: true })
  .passthrough()

function readAddonFloorFields(addonDir: string): {
  addonVersion: number
  dependsOn: readonly string[]
  optionalDependsOn: readonly string[]
} {
  const path = join(addonDir, "addon.json")
  const raw = readFileSync(path, "utf8")
  const parsed = AddonFloorManifestSchema.parse(JSON.parse(raw))
  return {
    addonVersion: parsed.addonVersion,
    dependsOn: parsed.dependsOn,
    optionalDependsOn: parsed.optionalDependsOn ?? [],
  }
}

function buildInputs(roster: readonly AddonInfo[]): readonly AddonFloorInput[] {
  const inputs: AddonFloorInput[] = []
  for (const addon of roster) {
    const { addonVersion, dependsOn, optionalDependsOn } = readAddonFloorFields(addon.dir)
    inputs.push({ addonName: addon.canonicalName, addonVersion, dependsOn, optionalDependsOn })
  }
  return inputs
}

function renderNarrowing(counts: DependencyFloorAudit["counts"]): string {
  return (
    `${counts["unverifiable-external"]} floor(s) against a provider outside the fleet, ` +
    `${counts["no-floor"]} bare name(s) declaring no floor, ` +
    `${counts["unverifiable-constraint"]} non-\`>=\` constraint(s)`
  )
}

function reportHuman(audit: DependencyFloorAudit, addonsExamined: number): undefined {
  const { counts, violations } = audit
  const checked = counts.satisfied + counts.violated
  const bound = renderPopulationBound(addonsExamined, addonsExamined, "addons")
  if (violations.length === 0) {
    process.stdout.write(
      `${PREFIX} every checkable dependency floor is satisfied — ` +
        `${counts.satisfied}/${checked} in-fleet floor(s) met, across ${audit.edges.length} declared edge(s). ${bound}\n`
    )
  } else {
    process.stdout.write(
      `${PREFIX} unsatisfiable addon dependency floors — ${violations.length} violation(s) ` +
        `of ${checked} checked in-fleet floor(s):\n\n`
    )
    for (const v of violations) process.stdout.write(`  - ${v.message}\n`)
    process.stdout.write(`\n${PREFIX} ${violations.length} violation(s) found ${bound}\n`)
  }
  process.stdout.write(`${PREFIX} not checked: ${renderNarrowing(counts)}.\n`)
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

  let audit: DependencyFloorAudit
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
    audit = auditDependencyFloors(inputs)
  } catch (err) {
    process.stderr.write(`${PREFIX} tool error: ${errorMessage(err)}\n`)
    return 2
  }

  if (asJson) {
    for (const v of audit.violations) {
      process.stdout.write(`${JSON.stringify({ kind: "violation", ...v })}\n`)
    }
    process.stdout.write(
      `${JSON.stringify({ kind: "summary", edges: audit.edges.length, counts: audit.counts })}\n`
    )
  } else {
    reportHuman(audit, addonsExamined)
  }
  return audit.violations.length === 0 ? 0 : 1
}

if (import.meta.main) {
  process.exit(main())
}
