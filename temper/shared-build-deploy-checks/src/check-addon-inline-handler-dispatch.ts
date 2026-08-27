#!/usr/bin/env bun

import { readdirSync, readFileSync, statSync } from "node:fs"
import { join, relative } from "node:path"
import { listAllAddons } from "@temper/shared-build-deploy-addons-resolve"
import { type DispatchFinding, detectNonDispatchHandlers } from "./addon-inline-handler-dispatch"
import { addonRosterIsEmpty, EMPTY_ADDON_ROSTER_HINT } from "./addon-roster-guard"
import { parseArgs as parseCliArgs, REPO_ROOT_FLAG } from "./lib/cli-args"
import { errorMessage } from "./lib/error-message"
import { getRepoRoot } from "./lib/repo-root"
import { renderPopulationBound } from "./population-bound"

const PREFIX = "[addon-inline-handler-dispatch]"

const GOVERNED_NAMESPACES: ReadonlySet<string> = new Set(["TemperCrafting"])

function collectXmlFiles(dir: string): readonly string[] {
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
      out.push(...collectXmlFiles(p))
      continue
    }
    if (p.endsWith(".xml")) out.push(p)
  }
  return out
}

interface Scan {
  readonly findings: readonly DispatchFinding[]
  readonly xmlJudged: number
  readonly addonsWalked: number
}

function collectAllFindings(repoRoot: string): Scan {
  const findings: DispatchFinding[] = []
  let xmlJudged = 0
  let addonsWalked = 0
  for (const addon of listAllAddons({ repoRoot })) {
    addonsWalked += 1
    for (const xmlFile of collectXmlFiles(addon.dir)) {
      const xml = readFileSync(xmlFile, "utf8")
      xmlJudged += 1
      findings.push(
        ...detectNonDispatchHandlers({
          xmlPath: relative(repoRoot, xmlFile),
          xml,
          governed: GOVERNED_NAMESPACES,
        })
      )
    }
  }
  return { findings, xmlJudged, addonsWalked }
}

function formatFinding(f: DispatchFinding): string {
  return `${f.xmlPath}:${f.line} <${f.handler}> — ${f.message}\n      body: ${f.snippet}`
}

function reportHuman(scan: Scan): undefined {
  const { findings, xmlJudged, addonsWalked } = scan
  const bound = renderPopulationBound(xmlJudged, xmlJudged, "XML files")
  const walked = `(found by walking ${addonsWalked} addon(s))`
  if (findings.length === 0) {
    process.stdout.write(
      `${PREFIX} all governed-namespace inline XML handlers are single named-global dispatches. ${bound} ${walked}\n`
    )
    return
  }
  process.stdout.write(
    `${PREFIX} non-dispatch governed inline XML handler(s) — ${findings.length} finding(s):\n\n`
  )
  for (const f of findings) process.stdout.write(`  - ${formatFinding(f)}\n`)
  process.stdout.write(`\n${PREFIX} ${findings.length} violation(s) found ${bound} ${walked}\n`)
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

  let scan: Scan
  try {
    const repoRoot =
      parseCliArgs(process.argv.slice(2), REPO_ROOT_FLAG, { passthrough: true }).flags.repoRoot ??
      getRepoRoot()
    if (addonRosterIsEmpty(repoRoot)) {
      process.stderr.write(`${PREFIX} ${EMPTY_ADDON_ROSTER_HINT}\n`)
      return 2
    }
    scan = collectAllFindings(repoRoot)
  } catch (err) {
    process.stderr.write(`${PREFIX} tool error: ${errorMessage(err)}\n`)
    return 2
  }

  if (scan.xmlJudged === 0) {
    process.stderr.write(
      `${PREFIX} ${renderPopulationBound(0, 0, "XML files")} — walked ${scan.addonsWalked} addon(s) and none held markup, so this gate looked at nothing; expected every addon's own \`.xml\` under its addon dir\n`
    )
    return 2
  }

  if (asJson) {
    for (const f of scan.findings) process.stdout.write(`${JSON.stringify(f)}\n`)
  } else {
    reportHuman(scan)
  }
  return scan.findings.length === 0 ? 0 : 1
}

if (import.meta.main) {
  process.exit(main())
}
