#!/usr/bin/env bun

import { readdirSync, readFileSync, statSync } from "node:fs"
import { join, relative } from "node:path"
import { listAllAddons } from "@akasha/temper-addons-resolve/addon-roster"
import { collectSourceSymbols, detectOrphans, type OrphanFinding } from "./addon-orphan-xml-handler"
import { addonRosterIsEmpty, EMPTY_ADDON_ROSTER_HINT } from "./addon-roster-guard"
import { parseArgs as parseCliArgs, REPO_ROOT_FLAG } from "./lib/cli-args"
import { errorMessage } from "./lib/error-message"
import { getRepoRoot } from "./lib/repo-root"
import { renderPopulationBound } from "./population-bound"

const PREFIX = "[addon-orphan-xml-handler]"

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

function collectAllFindings(repoRoot: string): {
  readonly findings: readonly OrphanFinding[]
  readonly filesExamined: number
} {
  const findings: OrphanFinding[] = []
  let filesExamined = 0
  for (const addon of listAllAddons({ repoRoot })) {
    const srcDir = join(addon.dir, "src")
    const sourceFiles = collectSourceFiles(srcDir)

    const namespaces = new Set<string>()
    const memberUniverse = new Set<string>()
    for (const file of sourceFiles) {
      const rel = relative(repoRoot, file)
      const content = readFileSync(file, "utf8")
      filesExamined += 1
      const symbols = collectSourceSymbols(content, rel)
      for (const ns of symbols.namespaces) namespaces.add(ns)
      for (const m of symbols.members) memberUniverse.add(m)
    }
    if (namespaces.size === 0) continue

    for (const xmlFile of collectXmlFiles(addon.dir)) {
      const xml = readFileSync(xmlFile, "utf8")
      filesExamined += 1
      findings.push(
        ...detectOrphans({
          xmlPath: relative(repoRoot, xmlFile),
          xml,
          namespaces,
          memberUniverse,
        })
      )
    }
  }
  return { findings, filesExamined }
}

function formatFinding(f: OrphanFinding): string {
  return `${f.xmlPath}:${f.line} <${f.handler}> — ${f.message}`
}

function reportHuman(findings: readonly OrphanFinding[], filesExamined: number): undefined {
  const bound = renderPopulationBound(filesExamined, filesExamined, "files")
  if (findings.length === 0) {
    process.stdout.write(`${PREFIX} no orphan inline XML handlers in addon source. ${bound}\n`)
    return
  }
  process.stdout.write(
    `${PREFIX} orphan inline XML handler(s) in addon source — ${findings.length} finding(s):\n\n`
  )
  for (const f of findings) process.stdout.write(`  - ${formatFinding(f)}\n`)
  process.stdout.write(`\n${PREFIX} ${findings.length} violation(s) found ${bound}\n`)
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

  let findings: readonly OrphanFinding[]
  let filesExamined = 0
  try {
    const repoRoot =
      parseCliArgs(process.argv.slice(2), REPO_ROOT_FLAG, { passthrough: true }).flags.repoRoot ??
      getRepoRoot()
    if (addonRosterIsEmpty(repoRoot)) {
      process.stderr.write(`${PREFIX} ${EMPTY_ADDON_ROSTER_HINT}\n`)
      return 2
    }
    const collected = collectAllFindings(repoRoot)
    filesExamined = collected.filesExamined
    findings = collected.findings
  } catch (err) {
    process.stderr.write(`${PREFIX} tool error: ${errorMessage(err)}\n`)
    return 2
  }

  if (asJson) {
    for (const f of findings) process.stdout.write(`${JSON.stringify(f)}\n`)
  } else {
    reportHuman(findings, filesExamined)
  }
  return findings.length === 0 ? 0 : 1
}

if (import.meta.main) {
  process.exit(main())
}
