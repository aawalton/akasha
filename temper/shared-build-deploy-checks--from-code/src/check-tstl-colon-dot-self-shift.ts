#!/usr/bin/env bun

import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs"
import { join, relative, resolve } from "node:path"
import { collectAddonDistBundles, refuseAddonDistPopulation } from "./addon-dist-bundles"
import {
  assessDistTreeCurrency,
  describeDistTreeFaults,
  listEmittableLuaBasenames,
  listRosterAddonNames,
  readDistBuildIdStamps,
  resolveHeadBuildId,
} from "./addon-dist-roster"
import { parseArgs as parseCliArgs, REPO_ROOT_FLAG } from "./lib/cli-args"
import { errnoCode, errorMessage } from "./lib/error-message"
import { getRepoRoot } from "./lib/repo-root"
import {
  collectColonMethodNames,
  findForceColonGuardViolations,
  formatIssue,
  type SelfShiftIssue,
  scanBundle,
} from "./tstl-colon-dot-self-shift"
import {
  dedupeSortBaseline,
  findUnreachableBaselineRows,
  partitionBaselined,
  type SelfShiftBaselineEntry,
} from "./tstl-colon-dot-self-shift.baseline"
import { SELF_SHIFT_BASELINE } from "./tstl-colon-dot-self-shift.baseline.generated"
import {
  COLON_DOT_ALLOW,
  DERIVATION_GLOBS,
  FORCE_COLON_METHODS,
  isReservationSource,
} from "./tstl-colon-dot-self-shift.manifest"

function parseArgs(argv: readonly string[]): {
  singleFile: string | null
  writeBaseline: boolean
} {
  try {
    const { flags } = parseCliArgs(
      argv,
      { file: { kind: "string" }, "write-baseline": { kind: "boolean" } },
      { passthrough: true }
    )
    return { singleFile: flags.file ?? null, writeBaseline: flags["write-baseline"] === true }
  } catch {
    return { singleFile: null, writeBaseline: false }
  }
}

export function collectDeclSources(dir: string): readonly string[] {
  const out: string[] = []
  let entries: string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return out
  }
  for (const entry of entries) {
    if (entry === "node_modules" || entry === "dist") continue
    const path = join(dir, entry)
    let st: ReturnType<typeof statSync>
    try {
      st = statSync(path)
    } catch {
      continue
    }
    if (st.isDirectory()) out.push(...collectDeclSources(path))
    else if (st.isFile() && path.endsWith(".ts")) out.push(path)
  }
  return out
}

function deriveColonMethods(repoRoot: string): ReadonlySet<string> {
  const sources: { file: string; text: string; core: boolean }[] = []
  for (const glob of DERIVATION_GLOBS) {
    for (const abs of collectDeclSources(resolve(repoRoot, glob))) {
      try {
        const file = relative(repoRoot, abs)
        sources.push({ file, text: readFileSync(abs, "utf8"), core: isReservationSource(file) })
      } catch {}
    }
  }
  return collectColonMethodNames(sources)
}

const GATE = "tstl-colon-dot-self-shift"

const BASELINE_GENERATED_REL =
  "temper/shared-build-deploy-checks--from-code/src/tstl-colon-dot-self-shift.baseline.generated.ts"

export function renderBaselineModule(rows: readonly SelfShiftBaselineEntry[]): string {
  const bundleCount = new Set(rows.map((r) => r.bundleSuffix.split("/")[0])).size
  const size =
    rows.length === 0
      ? " * THIS BASELINE IS EMPTY: every site is burned down, so the gate now fails on any"
      : ` * IT HOLDS ${rows.length} ROW(S) OVER ${bundleCount} BUNDLE DIRECTORY(IES) as generated. A row accepts one`
  const sizeTail =
    rows.length === 0
      ? " * colon-method dot-call at all."
      : " * (bundleSuffix, method, receiver) triple, so the site count the gate reports can\n * differ from the row count where one row covers a re-emitted bundle path."
  const header = [
    "/**",
    " * AUTO-GENERATED — do not edit by hand.",
    " *",
    " * Grandfather baseline for `check-tstl-colon-dot-self-shift` (#12686). Each entry",
    " * is a pre-existing colon-method dot-call site the strengthened gate flags but",
    " * which is grandfathered (does not fail the gate) until its owning addon's",
    " * sibling burn-down unit fixes it and regenerates this file.",
    " *",
    size,
    sizeTail,
    " *",
    " * Regenerate with: `bun temper/shared-build-deploy-checks--from-code/src/check-tstl-colon-dot-self-shift.ts --write-baseline`",
    " * (run after a full `ops temper addon build --all`).",
    " * Regeneration REFUSES a dist tree it cannot show is complete and current, so a",
    " * run over stale output cannot re-admit a site somebody has already repaired.",
    " *",
    " * Keyed (bundleSuffix, method, receiver); sorted so each addon's rows are",
    " * contiguous and regeneration yields stable diffs.",
    " */",
    "",
    'import type { SelfShiftBaselineEntry } from "./tstl-colon-dot-self-shift.baseline"',
    "",
  ].join("\n")
  if (rows.length === 0) {
    return `${header}\nexport const SELF_SHIFT_BASELINE: readonly SelfShiftBaselineEntry[] = []\n`
  }
  const body = rows
    .map(
      (r) =>
        `  { bundleSuffix: ${JSON.stringify(r.bundleSuffix)}, method: ${JSON.stringify(
          r.method
        )}, receiver: ${JSON.stringify(r.receiver)} },`
    )
    .join("\n")
  return `${header}\nexport const SELF_SHIFT_BASELINE: readonly SelfShiftBaselineEntry[] = [\n${body}\n]\n`
}

export function main(argv: readonly string[] = process.argv.slice(2)): number {
  const { singleFile, writeBaseline } = parseArgs(argv)
  const repoRoot =
    parseCliArgs(process.argv.slice(2), REPO_ROOT_FLAG, { passthrough: true }).flags.repoRoot ??
    getRepoRoot()

  const colonMethods = deriveColonMethods(repoRoot)
  if (colonMethods.size === 0) {
    console.error(
      "tstl-colon-dot-self-shift: derived 0 colon-method names — declaration sources missing, nothing to check"
    )
    return 2
  }

  const bundles = collectAddonDistBundles()
  const distRoot = bundles.distRoot
  let files: readonly string[]
  let fromDist = false
  if (singleFile !== null && !writeBaseline) {
    files = [resolve(singleFile)]
  } else {
    files = bundles.files
    fromDist = true
    if (files.length === 0) return refuseAddonDistPopulation(GATE, bundles, 0)
  }

  const allIssues: SelfShiftIssue[] = []
  const guardViolations: SelfShiftIssue[] = []
  let scanned = 0
  for (const file of files) {
    let text: string
    try {
      text = readFileSync(file, "utf8")
    } catch (err) {
      if (errnoCode(err) === "ENOENT" && fromDist) continue
      console.error(`tstl-colon-dot-self-shift: failed to read ${file}: ${errorMessage(err)}`)
      return 2
    }
    allIssues.push(...scanBundle(text, file, colonMethods, COLON_DOT_ALLOW))
    guardViolations.push(...findForceColonGuardViolations(text, file, FORCE_COLON_METHODS))
    scanned++
  }
  if (scanned === 0 && fromDist) {
    return refuseAddonDistPopulation(GATE, bundles, 0)
  }

  if (!writeBaseline && guardViolations.length > 0) {
    const cwd = process.cwd()
    const names = [...new Set(guardViolations.map((v) => v.method))].sort().join(", ")
    for (const v of guardViolations) {
      const displayFile = v.file.startsWith(cwd) ? relative(cwd, v.file) : v.file
      console.error(formatIssue({ ...v, file: displayFile }))
    }
    console.error("")
    console.error(
      `tstl-colon-dot-self-shift: FORCE_COLON name(s) [${names}] have ${guardViolations.length} dot-call site(s) — a force-colon name must have ZERO (its same-named static must be a bare-callable global). Either colon-call the self-shifts above, or remove the name from FORCE_COLON and seal it with rename-then-reserve. The rule and the two readings behind it are in the docblock of tstl-colon-dot-self-shift.ts, the pure core beside this gate.`
    )
    return 2
  }

  if (!writeBaseline) {
    const unreachable = findUnreachableBaselineRows(
      SELF_SHIFT_BASELINE,
      listEmittableLuaBasenames(repoRoot),
      listRosterAddonNames(repoRoot)
    )
    if (unreachable.length > 0) {
      for (const row of unreachable) {
        console.error(
          `tstl-colon-dot-self-shift: ${BASELINE_GENERATED_REL} accepts ${row.bundleSuffix} (${row.receiver}.${row.method}), which no addon in the roster emits`
        )
      }
      console.error("")
      console.error(
        `tstl-colon-dot-self-shift: ${unreachable.length} grandfather row(s) key on emitted bundles no build can produce, so they accept nothing and overstate the remaining burn-down. Delete them from ${BASELINE_GENERATED_REL}. If the addon was folded into a hub bundle rather than deleted, its sites now emit under the HUB's name and are NEW — fix them or capture them under that name; do not restore the old row.`
      )
      return 2
    }
  }

  if (writeBaseline) {
    const faults = describeDistTreeFaults(
      assessDistTreeCurrency(
        readDistBuildIdStamps(distRoot),
        listRosterAddonNames(repoRoot),
        resolveHeadBuildId(repoRoot)
      )
    )
    if (faults.length > 0) {
      for (const fault of faults) {
        console.error(`tstl-colon-dot-self-shift: ${fault}`)
      }
      console.error("")
      console.error(
        `tstl-colon-dot-self-shift: refusing to regenerate ${BASELINE_GENERATED_REL} from ${distRoot} — capture accepts every site it scans, so over a tree this gate cannot tie to the source in hand it would re-admit sites already repaired and stay green over them. Run \`ops temper addon build --all\` against the commit you mean to capture, then regenerate.`
      )
      return 2
    }
    const captured = allIssues.filter((issue) => !issue.loadScope)
    const excluded = allIssues.length - captured.length
    const rows = dedupeSortBaseline(
      captured.map((issue) => ({
        bundleSuffix: relative(distRoot, issue.file),
        method: issue.method,
        receiver: issue.receiver,
      }))
    )
    const outPath = resolve(repoRoot, BASELINE_GENERATED_REL)
    try {
      writeFileSync(outPath, renderBaselineModule(rows), "utf8")
    } catch (err) {
      console.error(
        `tstl-colon-dot-self-shift: failed to write baseline ${outPath}: ${errorMessage(err)}`
      )
      return 2
    }
    const excludedTail =
      excluded > 0
        ? ` (${excluded} load-scope site(s) excluded — must be fixed, not baselined)`
        : ""
    console.log(
      `tstl-colon-dot-self-shift: wrote ${rows.length} grandfather entry(ies) from ${scanned} bundle(s) to ${BASELINE_GENERATED_REL}${excludedTail}`
    )
    return 0
  }

  const { fresh, grandfathered } = partitionBaselined(allIssues, SELF_SHIFT_BASELINE)

  if (fresh.length === 0) {
    const tail =
      grandfathered.length > 0
        ? ` — ${grandfathered.length} grandfathered site(s) remain (burn-down)`
        : ""
    console.log(
      `tstl-colon-dot-self-shift: ${scanned} addon bundle(s) scanned against ${colonMethods.size} colon-method name(s), no NEW self-shift dot-calls${tail}`
    )
    return 0
  }

  const cwd = process.cwd()
  for (const issue of fresh) {
    const displayFile = issue.file.startsWith(cwd) ? relative(cwd, issue.file) : issue.file
    const tag = issue.loadScope ? " [LOAD-SCOPE — crashes addon load]" : ""
    console.error(`${formatIssue({ ...issue, file: displayFile })}${tag}`)
  }
  console.error("")
  const loadScopeFresh = fresh.filter((i) => i.loadScope)
  if (loadScopeFresh.length > 0) {
    console.error(
      `tstl-colon-dot-self-shift: ${loadScopeFresh.length} of these are LOAD-SCOPE self-shifts (module-body, run at addon load) — they crash the addon at load and are NOT grandfatherable. Fix the receiver typing so the call lowers to a colon-call; regenerating the baseline cannot suppress them. The rule and the two readings behind it are in the docblock of tstl-colon-dot-self-shift.ts, the pure core beside this gate.`
    )
  }
  console.error(
    `tstl-colon-dot-self-shift: ${fresh.length} NEW colon-method dot-call(s) found (${grandfathered.length} grandfathered) across ${scanned} addon bundle(s) scanned against ${colonMethods.size} colon-method name(s) — these are not in the baseline. A dot-call of a colon-only name drops the receiver the body reads as self, so fix each by colon-calling it, or regenerate the baseline if the dot-call is deliberate. The rule and the two readings behind it are in the docblock of tstl-colon-dot-self-shift.ts, the pure core beside this gate.`
  )
  return 1
}

if (import.meta.main) {
  process.exit(main())
}
