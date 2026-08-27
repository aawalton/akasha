#!/usr/bin/env bun

import { readFileSync } from "node:fs"
import { relative, resolve } from "node:path"
import { listAllAddons } from "@temper/shared-build-deploy-addons-resolve"
import ts from "typescript"
import { collectDeclSources } from "./check-tstl-colon-dot-self-shift"
import { ESO_BASE_GAME_GLOBALS } from "./eso-base-game-globals.generated"
import { ESO_COLON_METHOD_NAMES } from "./eso-colon-methods.generated"
import { parseArgs as parseCliArgs, REPO_ROOT_FLAG } from "./lib/cli-args"
import { errnoCode, errorMessage } from "./lib/error-message"
import { getRepoRoot } from "./lib/repo-root"
import { renderPopulationBound } from "./population-bound"
import {
  scanThisVoidColonMethods,
  THIS_VOID_COLON_METHOD_HINT,
  type ThisVoidColonMethodFinding,
} from "./tstl-this-void-colon-method"
import { isBaseGameReceiverSurface } from "./tstl-this-void-colon-method.manifest"

const AMBIENT_TYPES_REL = "packages/temper/addons/types"

const RECEIVER_SURFACE_UNIT = "base-game receiver-surface files"

function parseArgs(argv: readonly string[]): { singleFile: string | null; json: boolean } {
  try {
    const { flags } = parseCliArgs(
      argv,
      { file: { kind: "string" }, json: { kind: "boolean" } },
      { passthrough: true }
    )
    return { singleFile: flags.file ?? null, json: flags.json === true }
  } catch {
    return { singleFile: null, json: false }
  }
}

function scanFile(
  abs: string,
  repoRoot: string,
  authority: ReadonlySet<string>,
  baseGameGlobals: ReadonlySet<string>,
  skipMissing: boolean
): { findings: readonly ThisVoidColonMethodFinding[]; error?: string } {
  let text: string
  try {
    text = readFileSync(abs, "utf8")
  } catch (err) {
    if (errnoCode(err) === "ENOENT" && skipMissing) return { findings: [] }
    return { findings: [], error: `${abs}: ${errorMessage(err)}` }
  }
  const rel = relative(repoRoot, abs)
  const sf = ts.createSourceFile(rel, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  return { findings: scanThisVoidColonMethods(sf, authority, baseGameGlobals) }
}

function reportHuman(
  findings: readonly ThisVoidColonMethodFinding[],
  populationBounds: string
): undefined {
  const byFile = new Map<string, ThisVoidColonMethodFinding[]>()
  for (const f of findings) {
    const list = byFile.get(f.file) ?? []
    list.push(f)
    byFile.set(f.file, list)
  }
  console.error(
    `tstl-this-void-colon-method: ${findings.length} \`this: void\` declaration(s) of ESO colon-methods — these lower to self-dropping dot-calls and crash in-client${populationBounds}:\n`
  )
  for (const file of [...byFile.keys()].sort()) {
    console.error(`  ${file}:`)
    for (const f of byFile.get(file) ?? []) {
      console.error(`    - ${f.file}:${f.line}:${f.column} ${f.method}`)
    }
  }
  console.error(`\n${THIS_VOID_COLON_METHOD_HINT}`)
  return
}

export function main(argv: readonly string[] = process.argv.slice(2)): number {
  const { singleFile, json } = parseArgs(argv)
  const authority = ESO_COLON_METHOD_NAMES
  if (authority.size === 0) {
    console.error(
      "tstl-this-void-colon-method: ESO_COLON_METHOD_NAMES authority is empty — regenerate eso-colon-methods.generated.ts"
    )
    return 2
  }
  const baseGameGlobals = ESO_BASE_GAME_GLOBALS
  if (baseGameGlobals.size === 0) {
    console.error(
      "tstl-this-void-colon-method: ESO_BASE_GAME_GLOBALS authority is empty — regenerate eso-base-game-globals.generated.ts"
    )
    return 2
  }
  const repoRoot =
    parseCliArgs(process.argv.slice(2), REPO_ROOT_FLAG, { passthrough: true }).flags.repoRoot ??
    getRepoRoot()

  let files: readonly string[]
  let populationBounds = ""
  if (singleFile !== null) {
    files = [resolve(singleFile)]
  } else {
    const addons = listAllAddons({ repoRoot })
    if (addons.length === 0) {
      console.error(
        "tstl-this-void-colon-method: addon roster is empty — listAllAddons() found no addon.json across the domain tree; the scan would pass vacuously. Check that addon dirs are declared workspace members carrying an addon.json (listExternalAddonRelDirs)."
      )
      return 2
    }
    const ambientTypesAbs = resolve(repoRoot, AMBIENT_TYPES_REL)
    const dedup = new Set<string>()
    const fromAmbientTree = new Set<string>()
    for (const root of [...addons.map((a) => a.dir), ambientTypesAbs]) {
      for (const abs of collectDeclSources(root)) {
        if (!isBaseGameReceiverSurface(relative(repoRoot, abs))) continue
        dedup.add(abs)
        if (root === ambientTypesAbs) fromAmbientTree.add(abs)
      }
    }
    files = [...dedup]
    if (files.length === 0) {
      console.error(
        `tstl-this-void-colon-method: ${renderPopulationBound(0, 0, RECEIVER_SURFACE_UNIT)} — walked ${addons.length} addon(s) and ${AMBIENT_TYPES_REL}, and isBaseGameReceiverSurface selected no file from either, so this run would certify nothing. Check that predicate against the tree's current layout.`
      )
      return 2
    }
    if (fromAmbientTree.size === 0) {
      console.error(
        `tstl-this-void-colon-method: ${AMBIENT_TYPES_REL} contributed no base-game receiver-surface file — the tree moved, or the subtree carrying that surface moved out from under a parent that still resolves; either way base-game coverage silently vanished. Repoint AMBIENT_TYPES_REL at what carries the declarations.`
      )
      return 2
    }
    populationBounds = ` ${renderPopulationBound(addons.length, addons.length, "addons")} ${renderPopulationBound(files.length, files.length, RECEIVER_SURFACE_UNIT)}`
  }

  const findings: ThisVoidColonMethodFinding[] = []
  for (const abs of files) {
    const { findings: fs, error } = scanFile(
      abs,
      repoRoot,
      authority,
      baseGameGlobals,
      singleFile === null
    )
    if (error !== undefined) {
      console.error(`tstl-this-void-colon-method: failed to read ${error}`)
      return 2
    }
    findings.push(...fs)
  }

  if (findings.length === 0) {
    if (!json) {
      console.error(
        `tstl-this-void-colon-method: no \`this: void\` declarations of ESO colon-methods found${populationBounds}`
      )
    }
    return 0
  }

  if (json) {
    for (const f of findings) process.stdout.write(`${JSON.stringify(f)}\n`)
  } else {
    reportHuman(findings, populationBounds)
  }
  return 1
}

if (import.meta.main) {
  try {
    process.exit(main())
  } catch (err) {
    console.error(`tstl-this-void-colon-method: ${errorMessage(err)}`)
    process.exit(2)
  }
}
