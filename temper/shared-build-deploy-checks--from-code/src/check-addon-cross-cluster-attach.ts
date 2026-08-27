#!/usr/bin/env bun

import { readdirSync, readFileSync, statSync } from "node:fs"
import { join, relative } from "node:path"
import { listAllAddons } from "@temper/shared-build-deploy-addons-resolve"
import {
  type AddonCrossClusterFile,
  type AddonCrossClusterInput,
  type CrossClusterAttachViolation,
  findUnattachedViewMembers,
  parseAddonSource,
} from "./addon-cross-cluster-attach"
import { collectGlobalWritesFromSourceFile } from "./addon-global-ownership"
import { addonRosterIsEmpty, EMPTY_ADDON_ROSTER_HINT } from "./addon-roster-guard"
import { parseArgs as parseCliArgs, REPO_ROOT_FLAG } from "./lib/cli-args"
import { errorMessage } from "./lib/error-message"
import { getRepoRoot } from "./lib/repo-root"
import { renderPopulationBound } from "./population-bound"

const PREFIX = "[addon-cross-cluster-attach]"

function collectSourceFiles(dir: string): readonly string[] {
  const out: string[] = []
  let entries: readonly string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return out
  }
  for (const entry of entries) {
    if (entry === "node_modules" || entry === "dist" || entry === "generated") continue
    const p = join(dir, entry)
    let isDir = false
    try {
      isDir = statSync(p).isDirectory()
    } catch {
      continue
    }
    if (isDir) {
      out.push(...collectSourceFiles(p))
      continue
    }
    if (!p.endsWith(".ts") && !p.endsWith(".tsx")) continue
    if (p.endsWith(".d.ts") || p.endsWith(".generated.ts") || p.endsWith(".generated.tsx")) continue
    if (/\.test\.tsx?$/.test(p)) continue
    out.push(p)
  }
  return out
}

function buildInputs(repoRoot: string): {
  readonly inputs: readonly AddonCrossClusterInput[]
  readonly filesExamined: number
} {
  const inputs: AddonCrossClusterInput[] = []
  let filesExamined = 0
  for (const addon of listAllAddons({ repoRoot })) {
    const files: AddonCrossClusterFile[] = []
    const owned = new Set<string>()
    const srcDir = join(addon.dir, "src")
    for (const file of collectSourceFiles(srcDir)) {
      const rel = relative(repoRoot, file)
      const parsed = parseAddonSource(rel, readFileSync(file, "utf8"))
      filesExamined += 1
      files.push(parsed)
      for (const name of collectGlobalWritesFromSourceFile(parsed.sf)) owned.add(name)
    }
    inputs.push({
      addonName: addon.canonicalName,
      ownedGlobals: [...owned].sort(),
      files,
    })
  }
  return { inputs, filesExamined }
}

function reportHuman(
  violations: readonly CrossClusterAttachViolation[],
  filesExamined: number
): undefined {
  const bound = renderPopulationBound(filesExamined, filesExamined, "files")
  if (violations.length === 0) {
    process.stdout.write(
      `${PREFIX} every cross-cluster view member is attached onto its global. ${bound}\n`
    )
    return
  }
  process.stdout.write(
    `${PREFIX} unattached cross-cluster view members — ${violations.length} finding(s):\n\n`
  )
  for (const v of violations) {
    process.stdout.write(`  - [${v.addonName}] ${v.message}\n`)
  }
  process.stdout.write(`\n${PREFIX} ${violations.length} violation(s) found ${bound}\n`)
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

  let violations: readonly CrossClusterAttachViolation[]
  let filesExamined = 0
  try {
    const repoRoot =
      parseCliArgs(process.argv.slice(2), REPO_ROOT_FLAG, { passthrough: true }).flags.repoRoot ??
      getRepoRoot()
    if (addonRosterIsEmpty(repoRoot)) {
      process.stderr.write(`${PREFIX} ${EMPTY_ADDON_ROSTER_HINT}\n`)
      return 2
    }
    const built = buildInputs(repoRoot)
    filesExamined = built.filesExamined
    violations = built.inputs.flatMap((input) => findUnattachedViewMembers(input))
  } catch (err) {
    process.stderr.write(`${PREFIX} tool error: ${errorMessage(err)}\n`)
    return 2
  }

  if (asJson) {
    for (const v of violations) process.stdout.write(`${JSON.stringify(v)}\n`)
  } else {
    reportHuman(violations, filesExamined)
  }
  return violations.length === 0 ? 0 : 1
}

if (import.meta.main) {
  process.exit(main())
}
