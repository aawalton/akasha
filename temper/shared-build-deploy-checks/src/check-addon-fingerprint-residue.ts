#!/usr/bin/env bun

import { readdirSync, readFileSync, statSync } from "node:fs"
import { join, relative } from "node:path"
import { listAllAddons } from "@temper/shared-build-deploy-addons-resolve"
import {
  type FingerprintFile,
  type FingerprintFinding,
  findFingerprintResidue,
  formatFinding,
} from "./addon-fingerprint-residue"
import {
  KEEP_NAME_EXCEPTIONS,
  RETIRED_FINGERPRINT_TOKENS,
} from "./addon-fingerprint-residue.manifest"
import { addonRosterIsEmpty, EMPTY_ADDON_ROSTER_HINT } from "./addon-roster-guard"
import { parseArgs as parseCliArgs, REPO_ROOT_FLAG } from "./lib/cli-args"
import { errorMessage } from "./lib/error-message"
import { getRepoRoot } from "./lib/repo-root"
import { renderPopulationBound } from "./population-bound"

const PREFIX = "[addon-fingerprint-residue]"

function collectTsFiles(dir: string): readonly string[] {
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
      out.push(...collectTsFiles(p))
      continue
    }
    if (!p.endsWith(".ts")) continue
    if (p.endsWith(".generated.ts")) continue
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

function collectFindings(repoRoot: string): {
  readonly findings: readonly FingerprintFinding[]
  readonly filesExamined: number
} {
  const findings: FingerprintFinding[] = []
  let filesExamined = 0
  for (const addon of listAllAddons({ repoRoot })) {
    const retiredTokens = RETIRED_FINGERPRINT_TOKENS[addon.canonicalName]
    if (retiredTokens === undefined || retiredTokens.length === 0) continue

    const files: FingerprintFile[] = []
    for (const file of collectTsFiles(join(addon.dir, "src"))) {
      files.push({ path: relative(repoRoot, file), content: readFileSync(file, "utf8") })
      filesExamined += 1
    }
    for (const file of collectXmlFiles(addon.dir)) {
      files.push({ path: relative(repoRoot, file), content: readFileSync(file, "utf8") })
      filesExamined += 1
    }
    const keepNames = (KEEP_NAME_EXCEPTIONS[addon.canonicalName] ?? []).map((k) => k.name)
    findings.push(
      ...findFingerprintResidue({
        addonName: addon.canonicalName,
        retiredTokens,
        keepNames,
        files,
      })
    )
  }
  return { findings, filesExamined }
}

function reportHuman(findings: readonly FingerprintFinding[], filesExamined: number): undefined {
  const bound = renderPopulationBound(filesExamined, filesExamined, "files")
  if (findings.length === 0) {
    process.stdout.write(
      `${PREFIX} no retired fingerprint token survives in any addon source. ${bound}\n`
    )
    return
  }
  process.stdout.write(
    `${PREFIX} retired fingerprint-token residue (a partial rename) — ${findings.length} finding(s):\n\n`
  )
  for (const f of findings) process.stdout.write(`  - ${formatFinding(f)}\n`)
  process.stdout.write(
    `\n${PREFIX} ${findings.length} residue site(s) found → finish the rename (the retired token's bytes must go, compounds included), or, if the name is a live published contract that must not be renamed, add it with its consumer to KEEP_NAME_EXCEPTIONS in addon-fingerprint-residue.manifest.ts, which this check reads ${bound}\n`
  )
  return undefined
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

  let findings: readonly FingerprintFinding[]
  let filesExamined = 0
  try {
    const repoRoot =
      parseCliArgs(process.argv.slice(2), REPO_ROOT_FLAG, { passthrough: true }).flags.repoRoot ??
      getRepoRoot()
    if (addonRosterIsEmpty(repoRoot)) {
      process.stderr.write(`${PREFIX} ${EMPTY_ADDON_ROSTER_HINT}\n`)
      return 2
    }
    const collected = collectFindings(repoRoot)
    findings = collected.findings
    filesExamined = collected.filesExamined
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
