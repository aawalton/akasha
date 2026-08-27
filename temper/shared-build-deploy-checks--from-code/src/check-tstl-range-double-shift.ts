#!/usr/bin/env bun

import { readFileSync } from "node:fs"
import { relative, resolve } from "node:path"
import {
  ADDON_BUNDLE_UNIT,
  type AddonDistBundles,
  collectAddonDistBundles,
  refuseAddonDistPopulation,
} from "./addon-dist-bundles"
import { parseArgs as parseCliArgs } from "./lib/cli-args"
import { errnoCode, errorMessage } from "./lib/error-message"
import { renderPopulationBound } from "./population-bound"
import { type RangeDoubleShiftIssue, scanBundle } from "./tstl-range-double-shift"

const GATE = "tstl-range-double-shift"
const PREFIX = `[${GATE}]`

function parseFlags(argv: readonly string[]): { singleFile: string | null; asJson: boolean } {
  try {
    const { flags } = parseCliArgs(
      argv,
      { file: { kind: "string" }, json: { kind: "boolean" } },
      { passthrough: true }
    )
    return { singleFile: flags.file ?? null, asJson: flags.json ?? false }
  } catch {
    return { singleFile: null, asJson: false }
  }
}

function main(): 0 | 1 | 2 {
  const { singleFile, asJson } = parseFlags(process.argv.slice(2))

  let files: readonly string[]
  let bundles: AddonDistBundles | null = null
  if (singleFile !== null) {
    files = [resolve(singleFile)]
  } else {
    bundles = collectAddonDistBundles()
    files = bundles.files
    if (files.length === 0) return refuseAddonDistPopulation(GATE, bundles, 0)
  }

  const cwd = process.cwd()
  const issues: RangeDoubleShiftIssue[] = []
  let scanned = 0
  for (const file of files) {
    let text: string
    try {
      text = readFileSync(file, "utf8")
    } catch (err) {
      if (errnoCode(err) === "ENOENT" && bundles !== null) continue
      process.stderr.write(`${PREFIX} failed to read ${file}: ${errorMessage(err)}\n`)
      return 2
    }
    const display = file.startsWith(cwd) ? relative(cwd, file) : file
    issues.push(...scanBundle(text, display))
    scanned++
  }
  if (scanned === 0 && bundles !== null) {
    return refuseAddonDistPopulation(GATE, bundles, 0)
  }

  const bound = renderPopulationBound(scanned, files.length, ADDON_BUNDLE_UNIT)

  if (asJson) {
    for (const i of issues) process.stdout.write(`${JSON.stringify(i)}\n`)
  } else if (issues.length === 0) {
    process.stdout.write(`${PREFIX} no 1-based-loop double-shifts ${bound}\n`)
  } else {
    process.stdout.write(`${PREFIX} TSTL 1-based double-shift — ${issues.length} finding(s):\n\n`)
    for (const i of issues) process.stdout.write(`  - ${i.message}\n`)
    process.stdout.write(`\n${PREFIX} ${issues.length} finding(s) ${bound}\n`)
  }
  return issues.length === 0 ? 0 : 1
}

if (import.meta.main) {
  process.exit(main())
}
