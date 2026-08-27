#!/usr/bin/env bun

import { readdirSync, readFileSync, statSync } from "node:fs"
import { join, relative } from "node:path"
import { listAllAddons } from "@temper/shared-build-deploy-addons-resolve"
import ts from "typescript"
import {
  calledImports,
  moduleTopCalledImports,
  performsLoadRegistration,
} from "./addon-entry-facts"
import {
  type AddonInitFacts,
  collectFieldAssignmentSteps,
  collectFiresBeforeAssignmentIssues,
  collectHookFieldCalls,
  collectInitOrder,
  collectModuleTopAssignedKeys,
  type HookFieldCall,
  type HookFiresBeforeAssignmentIssue,
  parseAddonSource,
} from "./addon-hook-fires-before-assignment"
import { addonRosterIsEmpty, EMPTY_ADDON_ROSTER_HINT } from "./addon-roster-guard"
import { parseArgs as parseCliArgs, REPO_ROOT_FLAG } from "./lib/cli-args"
import { errorMessage } from "./lib/error-message"
import { getRepoRoot } from "./lib/repo-root"
import { renderPopulationBound } from "./population-bound"

const PREFIX = "[addon-hook-fires-before-assignment]"

interface ParsedSource {
  readonly absPath: string
  readonly sf: ts.SourceFile
}

function collectSourceFiles(dir: string): readonly string[] {
  const out: string[] = []
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === "dist" || entry === "generated") continue
    const p = join(dir, entry)
    if (statSync(p).isDirectory()) {
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

const MODULE_RESOLUTION_HOST: ts.ModuleResolutionHost = {
  fileExists: (f) => ts.sys.fileExists(f),
  readFile: (f) => ts.sys.readFile(f),
  realpath: ts.sys.realpath === undefined ? undefined : (f) => ts.sys.realpath?.(f) ?? f,
  directoryExists: (d) => ts.sys.directoryExists(d),
  getDirectories: (d) => ts.sys.getDirectories(d),
}

const RESOLUTION_OPTIONS: ts.CompilerOptions = {
  moduleResolution: ts.ModuleResolutionKind.Bundler,
}

type SpecifierTarget =
  | { readonly kind: "source"; readonly file: string }
  | { readonly kind: "no-body" }
  | { readonly kind: "unresolved" }

function resolveToSource(specifier: string, fromFile: string): SpecifierTarget {
  const resolved = ts.resolveModuleName(
    specifier,
    fromFile,
    RESOLUTION_OPTIONS,
    MODULE_RESOLUTION_HOST
  ).resolvedModule?.resolvedFileName
  if (resolved === undefined) return { kind: "unresolved" }
  if (!resolved.endsWith(".ts") || resolved.endsWith(".d.ts")) return { kind: "no-body" }
  return { kind: "source", file: resolved }
}

function makeSeamOracle(): (absPath: string) => boolean {
  const settled = new Map<string, boolean>()
  const parsed = new Map<string, ts.SourceFile | undefined>()

  const parseModule = (absPath: string): ts.SourceFile | undefined => {
    const hit = parsed.get(absPath)
    if (hit !== undefined || parsed.has(absPath)) return hit
    let sf: ts.SourceFile | undefined
    try {
      sf = parseAddonSource(absPath, readFileSync(absPath, "utf8"))
    } catch {
      sf = undefined
    }
    parsed.set(absPath, sf)
    return sf
  }

  const onStack = new Set<string>()
  const visit = (absPath: string): { registers: boolean; cut: boolean } => {
    const cached = settled.get(absPath)
    if (cached !== undefined) return { registers: cached, cut: false }
    if (onStack.has(absPath)) return { registers: false, cut: true }

    const sf = parseModule(absPath)
    if (sf === undefined) {
      settled.set(absPath, false)
      return { registers: false, cut: false }
    }
    if (performsLoadRegistration(sf)) {
      settled.set(absPath, true)
      return { registers: true, cut: false }
    }

    onStack.add(absPath)
    let registers = false
    let cut = false
    for (const specifier of calledImports(sf).values()) {
      const target = resolveToSource(specifier, absPath)
      if (target.kind !== "source") continue
      const inner = visit(target.file)
      cut = cut || inner.cut
      if (inner.registers) {
        registers = true
        break
      }
    }
    onStack.delete(absPath)

    if (registers || !cut) settled.set(absPath, registers)
    return { registers, cut }
  }

  return (absPath) => visit(absPath).registers
}

interface EntrySearch {
  readonly entries: readonly ParsedSource[]
  readonly unresolvedSpecifiers: readonly string[]
}

function findEntryFiles(
  sources: readonly ParsedSource[],
  reachesRegistration: (absPath: string) => boolean
): EntrySearch {
  const entries: ParsedSource[] = []
  const unresolvedSpecifiers = new Set<string>()

  for (const source of sources) {
    if (performsLoadRegistration(source.sf)) {
      entries.push(source)
      continue
    }
    for (const specifier of moduleTopCalledImports(source.sf).values()) {
      const target = resolveToSource(specifier, source.absPath)
      if (target.kind === "unresolved") {
        unresolvedSpecifiers.add(specifier)
        continue
      }
      if (target.kind === "source" && reachesRegistration(target.file)) {
        entries.push(source)
        break
      }
    }
  }

  return {
    entries: entries.slice().sort((a, b) => a.sf.fileName.localeCompare(b.sf.fileName)),
    unresolvedSpecifiers: [...unresolvedSpecifiers].sort(),
  }
}

function buildAddonFacts(sources: readonly ParsedSource[], search: EntrySearch): AddonInitFacts {
  const initOrder = new Map<string, number>()
  let base = 0
  for (const entry of search.entries) {
    let maxPos = 0
    for (const call of collectInitOrder(entry.sf)) {
      const order = base + call.pos
      if (!initOrder.has(call.name)) initOrder.set(call.name, order)
      if (call.pos > maxPos) maxPos = call.pos
    }
    base += maxPos + 1
  }

  const assignSteps = new Map<string, Set<string>>()
  const moduleTopAssigned = new Set<string>()
  const hookCalls: HookFieldCall[] = []
  for (const { sf } of sources) {
    for (const fa of collectFieldAssignmentSteps(sf)) {
      const set = assignSteps.get(fa.key) ?? new Set<string>()
      set.add(fa.step)
      assignSteps.set(fa.key, set)
    }
    for (const key of collectModuleTopAssignedKeys(sf)) moduleTopAssigned.add(key)
    hookCalls.push(...collectHookFieldCalls(sf))
  }

  return { initOrder, assignSteps, moduleTopAssigned, hookCalls }
}

interface Population {
  readonly filesScanned: number
  readonly filesMeasured: number
  readonly addonsScanned: number
  readonly addonsMeasured: number
  readonly undecidable: readonly string[]
}

function buildIssues(repoRoot: string): {
  readonly issues: readonly HookFiresBeforeAssignmentIssue[]
  readonly population: Population
} {
  const issues: HookFiresBeforeAssignmentIssue[] = []
  const reachesRegistration = makeSeamOracle()
  const undecidable: string[] = []
  let filesScanned = 0
  let filesMeasured = 0
  let addonsScanned = 0
  let addonsMeasured = 0

  for (const addon of listAllAddons({ repoRoot })) {
    addonsScanned += 1
    const files = collectSourceFiles(join(addon.dir, "src"))
    if (files.length === 0) continue
    const sources: readonly ParsedSource[] = files.map((absPath) => ({
      absPath,
      sf: parseAddonSource(relative(repoRoot, absPath), readFileSync(absPath, "utf8")),
    }))
    filesScanned += sources.length

    const search = findEntryFiles(sources, reachesRegistration)
    const facts = buildAddonFacts(sources, search)
    if (facts.initOrder.size > 0) {
      addonsMeasured += 1
      filesMeasured += sources.length
    } else if (search.unresolvedSpecifiers.length > 0) {
      undecidable.push(
        `${addon.canonicalName} (${search.unresolvedSpecifiers.length} unresolved: ${search.unresolvedSpecifiers.slice(0, 3).join(", ")})`
      )
    }
    issues.push(...collectFiresBeforeAssignmentIssues(facts))
  }

  return {
    issues,
    population: { filesScanned, filesMeasured, addonsScanned, addonsMeasured, undecidable },
  }
}

function renderBound(population: Population): string {
  const bound = renderPopulationBound(population.filesMeasured, population.filesScanned, "files")
  const unmeasured = population.filesScanned - population.filesMeasured
  if (unmeasured <= 0) return bound
  const unmeasuredAddons = population.addonsScanned - population.addonsMeasured
  return `${bound}, every file of ${unmeasuredAddons} of ${population.addonsScanned} addon(s) that register no addon-load handler, so there is no init order to judge them against`
}

function reportHuman(
  issues: readonly HookFiresBeforeAssignmentIssue[],
  population: Population
): undefined {
  const bound = renderBound(population)
  if (issues.length === 0) {
    process.stdout.write(
      `${PREFIX} no load-installed hook fires before its target field is published. ${bound}\n`
    )
    return
  }
  process.stdout.write(
    `${PREFIX} load-window fires-before-assignment trap — ${issues.length} finding(s):\n\n`
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

  let issues: readonly HookFiresBeforeAssignmentIssue[]
  let population: Population
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
    population = built.population
  } catch (err) {
    process.stderr.write(`${PREFIX} tool error: ${errorMessage(err)}\n`)
    return 2
  }

  if (population.undecidable.length > 0) {
    process.stderr.write(
      `${PREFIX} ${population.undecidable.length} addon(s) yielded no init order while some module-top call would not resolve, so this run cannot tell an addon that registers nothing from one whose registration it failed to follow — and reading the second as the first is how the gate would go quiet over addons that DO register. ${population.undecidable.join("; ")}\n`
    )
    return 2
  }

  if (population.filesMeasured === 0) {
    process.stderr.write(
      `${PREFIX} measured 0 of ${population.filesScanned} scanned file(s): not one of the ${population.addonsScanned} addon(s) on the roster yielded an init order, so this run judged nothing and certifies nothing. Either the entry-file test has stopped matching how addons register their initializer, or the roster resolved to something that is not the addon tree.\n`
    )
    return 2
  }

  if (asJson) {
    for (const i of issues) process.stdout.write(`${JSON.stringify(i)}\n`)
  } else {
    reportHuman(issues, population)
  }
  return issues.length === 0 ? 0 : 1
}

if (import.meta.main) {
  process.exit(main())
}
