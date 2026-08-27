export const summary =
  "Rule that every territory addon with no raw table.insert or table.remove call site is marked ti-clean, and every marked one still has none"

import { readdirSync, readFileSync, statSync } from "node:fs"
import { join, relative } from "node:path"
import { examinePopulation } from "../lib/check-workflow/population.ts"
import {
  readTerritoryMap,
  TERRITORY_MAP_PATH,
  type TerritoryNode,
} from "../lib/check-workflow/territory-map.ts"
import {
  type AddonMarkerFacts,
  findMarkerIssues,
  findRawTableCalls,
  isScannableSourceFile,
} from "../lib/check-workflow/ti-clean-source-zero.ts"
import { exitOnResult, exitOnToolError } from "../lib/check-workflow/violation-reporter.ts"
import { codeRoot } from "../lib/code-root.ts"
import { parseArgs } from "../lib/parse-args.ts"
import { canonicalize, normalizeAbsolute } from "../../repo/path/path"
import type { CommandHelp, HelpFlag } from "../ops/surface.ts"

const PREFIX = "[ti-clean-source-zero]"

const CODE_ROOT_FLAG: HelpFlag = {
  name: "--code-root",
  argLabel: "<dir>",
  valueShape: "token",
  path: true,
  description:
    "The code checkout whose addon sources are scanned (defaults to $CODE_ROOT, else the `code` sibling of this repo).",
}

export const help: CommandHelp = {
  flags: [
    CODE_ROOT_FLAG,
    { name: "--json", description: "Emit one JSON object per violation instead of prose." },
  ],
  exits: [
    { code: 0, meaning: "every marked addon is source-zero and every source-zero addon is marked" },
    { code: 1, meaning: "a marked addon has a raw call site, or an unmarked one has none left" },
    { code: 2, meaning: "an addon's source could not be read, so the run certifies nothing" },
  ],
  examples: [
    "ops check-ti-clean-source-zero",
    "ops check-ti-clean-source-zero --code-root ~/repos/code",
  ],
}

interface Finding {
  readonly file: string
  readonly line?: number
  readonly message: string
}

function scannableFilesUnder(root: string, addon: string, packageDir: string): readonly string[] {
  const out: string[] = []
  const walk = (dir: string): undefined => {
    for (const entry of readdirSync(dir)) {
      if (entry === "node_modules" || entry === "dist") continue
      const at = join(dir, entry)
      if (statSync(at).isDirectory()) {
        walk(at)
        continue
      }
      const rel = relative(root, at)
      if (isScannableSourceFile(rel)) out.push(rel)
    }
  }
  const src = join(packageDir, "src")
  walk(join(root, src))
  if (out.length === 0) {
    throw new Error(
      `${addon}: ${src} holds no scannable source file — this run cannot say whether the addon is source-zero, so it refuses rather than certifying it`
    )
  }
  return out
}

export default async function checkTiCleanSourceZero(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const root = canonicalize(normalizeAbsolute(parsed.string("--code-root") ?? codeRoot()))

  let nodes: readonly TerritoryNode[]
  try {
    nodes = readTerritoryMap().addons
  } catch (err) {
    exitOnToolError({ error: err, prefix: PREFIX })
  }

  const facts: AddonMarkerFacts[] = []
  let filesRead = 0

  const { population, violations } = examinePopulation<TerritoryNode, Finding>({
    members: nodes,
    unit: "territory addons",
    membership: {
      kind: "atLeast",
      members: nodes.length,
      from: `the addon nodes ${TERRITORY_MAP_PATH} names`,
    },
    labelOf: (node) => node.addon,
    siteOf: (node) => join(root, node.package),
    examine: (node) => {
      const files = scannableFilesUnder(root, node.addon, node.package)
      filesRead += files.length
      const found = files.flatMap((rel) =>
        findRawTableCalls(readFileSync(join(root, rel), "utf8"), rel)
      )
      facts.push({
        addon: node.addon,
        tiClean: node.tiClean === true,
        tiCleanBlocked: node.tiCleanBlocked === true,
        siteCount: found.length,
      })
      return node.tiClean === true ? found : []
    },
  })

  let markerFindings: readonly Finding[]
  try {
    markerFindings = findMarkerIssues(facts).map((one) => ({
      file: one.file,
      message: one.message,
    }))
  } catch (err) {
    exitOnToolError({ error: err, prefix: PREFIX })
  }

  exitOnResult<Finding>({
    violations: [...markerFindings, ...violations],
    options: {
      population,
      format: parsed.boolean("--json") ? "json" : "human",
      prefix: PREFIX,
      header: "the ti-clean ratchet and the addon sources disagree",
      successMessage:
        `Every marked addon is source-zero and every source-zero addon is marked. ` +
        `Measured over ${filesRead} source file(s) across ${nodes.length} territory addon(s) in the code tree at ${root}.`,
      formatViolation: (one) => one.message,
    },
  })
}
