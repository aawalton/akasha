#!/usr/bin/env bun

import { readdirSync, readFileSync, statSync } from "node:fs"
import { join, relative } from "node:path"
import { listAllAddons } from "@temper/shared-build-deploy-addons-resolve"
import {
  collectDeferredPublishedFields,
  collectHookEagerCaptureIssues,
  type HookEagerCaptureIssue,
  parseAddonSource,
} from "./addon-hook-eager-capture"
import { addonRosterIsEmpty, EMPTY_ADDON_ROSTER_HINT } from "./addon-roster-guard"
import { parseArgs as parseCliArgs, REPO_ROOT_FLAG } from "./lib/cli-args"
import { errorMessage } from "./lib/error-message"
import { getRepoRoot } from "./lib/repo-root"
import { renderPopulationBound } from "./population-bound"

const PREFIX = "[addon-hook-eager-capture]"

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

function buildIssues(repoRoot: string): {
  readonly issues: readonly HookEagerCaptureIssue[]
  readonly filesExamined: number
} {
  const issues: HookEagerCaptureIssue[] = []
  let filesExamined = 0
  for (const addon of listAllAddons({ repoRoot })) {
    const srcDir = join(addon.dir, "src")
    const parsed = collectSourceFiles(srcDir).map((file) =>
      parseAddonSource(readFileSync(file, "utf8"), relative(repoRoot, file))
    )
    filesExamined += parsed.length
    const deferred = new Set<string>()
    for (const sf of parsed) {
      for (const key of collectDeferredPublishedFields(sf)) deferred.add(key)
    }
    for (const sf of parsed) {
      issues.push(...collectHookEagerCaptureIssues(sf, deferred))
    }
  }
  return { issues, filesExamined }
}

function reportHuman(issues: readonly HookEagerCaptureIssue[], filesExamined: number): undefined {
  const bound = renderPopulationBound(filesExamined, filesExamined, "files")
  if (issues.length === 0) {
    process.stdout.write(
      `${PREFIX} no load-installed hook closes over an eager mutable-field capture. ${bound}\n`
    )
    return
  }
  process.stdout.write(
    `${PREFIX} load-time hook eager-capture trap — ${issues.length} finding(s):\n\n`
  )
  for (const i of issues) {
    process.stdout.write(`  - ${i.message}\n`)
  }
  process.stdout.write(`\n${PREFIX} ${issues.length} finding(s) ${bound}\n`)
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

  let issues: readonly HookEagerCaptureIssue[]
  let filesExamined = 0
  try {
    const repoRoot =
      parseCliArgs(process.argv.slice(2), REPO_ROOT_FLAG, { passthrough: true }).flags.repoRoot ??
      getRepoRoot()
    if (addonRosterIsEmpty(repoRoot)) {
      process.stderr.write(`${PREFIX} ${EMPTY_ADDON_ROSTER_HINT}\n`)
      return 2
    }
    const built = buildIssues(repoRoot)
    issues = built.issues
    filesExamined = built.filesExamined
  } catch (err) {
    process.stderr.write(`${PREFIX} tool error: ${errorMessage(err)}\n`)
    return 2
  }

  if (asJson) {
    for (const i of issues) process.stdout.write(`${JSON.stringify(i)}\n`)
  } else {
    reportHuman(issues, filesExamined)
  }
  return issues.length === 0 ? 0 : 1
}

if (import.meta.main) {
  process.exit(main())
}
