#!/usr/bin/env bun

import { relative, resolve } from "node:path"
import {
  ADDON_BUNDLE_UNIT,
  type AddonDistBundles,
  collectAddonDistBundles,
  refuseAddonDistPopulation,
} from "./addon-dist-bundles"
import { formatIssue, type RemovedRefIssue, scanBundleFile } from "./addon-removed-refs"
import { parseArgs as parseCliArgs } from "./lib/cli-args"
import { errnoCode, errorMessage } from "./lib/error-message"
import { renderPopulationBound } from "./population-bound"

function parseArgs(argv: readonly string[]): { singleFile: string | null } {
  try {
    const { flags } = parseCliArgs(argv, { file: { kind: "string" } }, { passthrough: true })
    return { singleFile: flags.file ?? null }
  } catch {
    return { singleFile: null }
  }
}

const GATE = "addon-removed-refs"

export interface AddonRemovedRefsOptions {
  readonly singleFile: string | null
}

export function runAddonRemovedRefs({ singleFile }: AddonRemovedRefsOptions): number {
  let files: readonly string[]
  let bundles: AddonDistBundles | null = null
  if (singleFile !== null) {
    files = [resolve(singleFile)]
  } else {
    bundles = collectAddonDistBundles()
    files = bundles.files
    if (files.length === 0) return refuseAddonDistPopulation(GATE, bundles, 0)
  }

  const allIssues: RemovedRefIssue[] = []
  let scanned = 0
  for (const file of files) {
    let issues: readonly RemovedRefIssue[]
    try {
      issues = scanBundleFile(file)
    } catch (err) {
      if (errnoCode(err) === "ENOENT") {
        continue
      }
      console.error(`${GATE}: failed to read ${file}: ${errorMessage(err)}`)
      return 2
    }
    allIssues.push(...issues)
    scanned++
  }
  if (scanned === 0 && bundles !== null) {
    return refuseAddonDistPopulation(GATE, bundles, 0)
  }

  const bound = renderPopulationBound(scanned, files.length, ADDON_BUNDLE_UNIT)
  if (allIssues.length === 0) {
    console.log(`${GATE}: no removed external-addon references ${bound}`)
    return 0
  }

  const cwd = process.cwd()
  for (const issue of allIssues) {
    const displayFile = issue.file.startsWith(cwd) ? relative(cwd, issue.file) : issue.file
    console.error(formatIssue({ ...issue, file: displayFile }))
  }
  console.error("")
  console.error(
    `${GATE}: ${allIssues.length} removed external-addon reference(s) found ${bound} — see project #12106 (gate); each line above names the project that removed its addon`
  )
  return 1
}

export function main(argv: readonly string[] = process.argv.slice(2)): number {
  return runAddonRemovedRefs(parseArgs(argv))
}

if (import.meta.main) {
  process.exit(main())
}
