#!/usr/bin/env bun

import { readdirSync, readFileSync, statSync } from "node:fs"
import { join, relative } from "node:path"
import { listAllAddons } from "@temper/shared-build-deploy-addons-resolve"
import { z } from "zod"
import {
  type AddonSourceFile,
  type CollisionFinding,
  findControlNameGlobalCollisions,
} from "./addon-control-name-global-collision"
import {
  type AddonOwnershipInput,
  collectGlobalWritesFromSourceFile,
  findOwnershipViolations,
  OWNED_GLOBAL_REMEDY,
  type OwnershipViolation,
  parseAddonSource,
} from "./addon-global-ownership"
import { addonRosterIsEmpty, EMPTY_ADDON_ROSTER_HINT } from "./addon-roster-guard"
import { parseArgs as parseCliArgs, REPO_ROOT_FLAG } from "./lib/cli-args"
import { errorMessage } from "./lib/error-message"
import { getRepoRoot } from "./lib/repo-root"
import { renderPopulationBound } from "./population-bound"

const PREFIX = "[addon-owned-global-clobber]"

const AddonJsonSchema = z.object({ savedVariables: z.array(z.string()).optional() }).passthrough()

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

function readSavedVariables(addonDir: string): readonly string[] {
  const raw = readFileSync(join(addonDir, "addon.json"), "utf8")
  const parsed = AddonJsonSchema.parse(JSON.parse(raw))
  return parsed.savedVariables ?? []
}

interface Scan {
  readonly violations: readonly OwnershipViolation[]
  readonly collisions: readonly CollisionFinding[]
  readonly filesExamined: number
}

function scanCorpus(repoRoot: string): Scan {
  const ownershipInputs: AddonOwnershipInput[] = []
  const collisions: CollisionFinding[] = []
  let filesExamined = 0

  for (const addon of listAllAddons({ repoRoot })) {
    const written = new Set<string>()
    const files: AddonSourceFile[] = []
    const srcDir = join(addon.dir, "src")
    for (const file of collectSourceFiles(srcDir)) {
      const rel = relative(repoRoot, file)
      const parsed = parseAddonSource(rel, readFileSync(file, "utf8"))
      filesExamined += 1
      files.push(parsed)
      for (const name of collectGlobalWritesFromSourceFile(parsed.sf)) written.add(name)
    }
    const savedVariables = readSavedVariables(addon.dir)
    ownershipInputs.push({
      addonName: addon.canonicalName,
      writtenGlobals: [...written].sort(),
      savedVariables,
    })
    collisions.push(
      ...findControlNameGlobalCollisions({
        addonName: addon.canonicalName,
        protectedGlobals: [...new Set([...written, ...savedVariables])],
        files,
      })
    )
  }

  return { violations: findOwnershipViolations(ownershipInputs), collisions, filesExamined }
}

const CONTROL_NAME_REMEDY = [
  "keep the registered name and restore the owned global on the statement right after the registration,",
  "with no yield in between: `globalThis.<name> = <the addon's API table>`.",
  "That is the act that held in #13375. Renaming the panel id was that incident's first fix, and it",
  "stopped the crashes and stopped the crafting window rendering — the render path binds on the registry name.",
  "Whether a rename is safe for a given name is what this answers, before you choose one:",
  "ops temper addon global-name-dependents --global <name>",
].join(" ")

function reportHuman(scan: Scan): undefined {
  const bound = renderPopulationBound(scan.filesExamined, scan.filesExamined, "files")

  if (scan.violations.length === 0 && scan.collisions.length === 0) {
    process.stdout.write(
      `${PREFIX} every addon global is owned by exactly one port, and no port names a control after one of its own globals. ${bound}\n`
    )
    return
  }

  if (scan.violations.length > 0) {
    process.stdout.write(
      `${PREFIX} cross-addon owned-global redeclaration — ${scan.violations.length} finding(s):\n\n`
    )
    for (const v of scan.violations) process.stdout.write(`  - ${v.message}\n`)
    process.stdout.write(`\n${PREFIX} ${OWNED_GLOBAL_REMEDY}\n\n`)
  }

  if (scan.collisions.length > 0) {
    process.stdout.write(
      `${PREFIX} control-name vs owned-global clobber — ${scan.collisions.length} finding(s):\n\n`
    )
    for (const f of scan.collisions) {
      process.stdout.write(
        `  - ${f.file}:${f.line}:${f.column} ${f.addonName}: ${f.fn}("${f.name}") clobbers \`_G.${f.global}\` (the addon's own global) — ESO auto-assigns _G[name]=control, overwriting the API table\n`
      )
    }
    process.stdout.write(`\n${PREFIX} ${CONTROL_NAME_REMEDY}\n\n`)
  }

  process.stdout.write(
    `${PREFIX} ${scan.violations.length + scan.collisions.length} finding(s) found ${bound}\n`
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

  let scan: Scan
  try {
    const repoRoot =
      parseCliArgs(process.argv.slice(2), REPO_ROOT_FLAG, { passthrough: true }).flags.repoRoot ??
      getRepoRoot()
    if (addonRosterIsEmpty(repoRoot)) {
      process.stderr.write(`${PREFIX} ${EMPTY_ADDON_ROSTER_HINT}\n`)
      return 2
    }
    scan = scanCorpus(repoRoot)
  } catch (err) {
    process.stderr.write(`${PREFIX} tool error: ${errorMessage(err)}\n`)
    return 2
  }

  if (asJson) {
    for (const v of scan.violations) process.stdout.write(`${JSON.stringify(v)}\n`)
    for (const f of scan.collisions) {
      process.stdout.write(`${JSON.stringify({ ...f, remedy: CONTROL_NAME_REMEDY })}\n`)
    }
  } else {
    reportHuman(scan)
  }

  return scan.violations.length === 0 && scan.collisions.length === 0 ? 0 : 1
}

if (import.meta.main) {
  process.exit(main())
}
