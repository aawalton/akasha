export const summary =
  "Regenerate (--fix) or verify the @infra/checks deriver barrel against discovered *.deriver.ts files"

import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { errorMessage } from "@akasha/temper-build-deploy-checks/error-message"
import { generateBarrel } from "../../akasha/checks/cluster-checks/modules/generate-deriver-barrel/generate-deriver-barrel.module.code.ts"
import { getRepoRoot } from "../../akasha/checks/cluster-checks/modules/repo-root/repo-root.module.code.ts"
import { examinePopulation } from "../lib/check-workflow/population.ts"
import {
  computeExitCode,
  exitOnToolError,
  reportViolations,
} from "../lib/check-workflow/violation-reporter.ts"
import { parseArgs } from "../lib/parse-args.ts"
import type { CommandHelp } from "../ops/surface.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--fix",
      description: "Rewrite the barrel in place instead of failing on drift.",
    },
    {
      name: "--repo-root",
      argLabel: "<dir>",
      valueShape: "token",
      description: "Override the repo root (defaults to git-discovered root).",
    },
  ],
  examples: ["ops check-deriver-barrel", "ops check-deriver-barrel --fix"],
}

const PREFIX = "[deriver-barrel]"

const BARREL_REL_PATH = "packages/infra/checks/src/derivers.generated.ts"

const EXCLUDED_SEGMENTS = new Set([
  "node_modules",
  "dist",
  "build",
  ".next",
  ".turbo",
  "__fixtures__",
  "_generated",
  "generated",
  "coverage",
])

const DERIVER_SUFFIX_RE = /\.(?:node|edge)\.deriver\.ts$/u
const DERIVER_TEST_SUFFIX_RE = /\.(?:node|edge)\.deriver\.(?:[a-z-]+\.)?test\.ts$/u
const BARREL_IMPORT_RE = /^import\s+\S+\s+from\s+"(?:\.\.\/)+(packages\/\S+)"$/u

interface BarrelViolation {
  readonly file: string
  readonly message: string
}

function pathHasExcludedSegment(relPath: string): boolean {
  for (const segment of relPath.split("/")) {
    if (EXCLUDED_SEGMENTS.has(segment)) return true
  }
  return false
}

function discoverDerivers(repoRoot: string): readonly string[] {
  const glob = new Bun.Glob("packages/**/*.deriver.ts")
  const seen = new Set<string>()
  for (const rel of glob.scanSync({ cwd: repoRoot, onlyFiles: true, dot: false })) {
    if (DERIVER_TEST_SUFFIX_RE.test(rel)) continue
    if (!DERIVER_SUFFIX_RE.test(rel)) continue
    if (pathHasExcludedSegment(rel)) continue
    seen.add(rel)
  }
  return [...seen].sort()
}

function deriversNamedByBarrel(barrel: string): readonly string[] {
  const named = new Set<string>()
  for (const line of barrel.split("\n")) {
    const match = BARREL_IMPORT_RE.exec(line.trim())
    const modulePath = match?.[1]
    if (modulePath == null) continue
    if (!DERIVER_SUFFIX_RE.test(`${modulePath}.ts`)) continue
    named.add(`${modulePath}.ts`)
  }
  return [...named].sort()
}

function readOnDiskBarrel(absPath: string): string {
  try {
    return readFileSync(absPath, "utf8")
  } catch (err) {
    if (err instanceof Error && "code" in err && err.code === "ENOENT") return ""
    throw err
  }
}

function writeBarrel(absPath: string, contents: string): undefined {
  mkdirSync(dirname(absPath), { recursive: true })
  writeFileSync(absPath, contents)
}

export default async function checkDeriverBarrel(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const fix = parsed.boolean("--fix")
  const repoRootFlag = parsed.string("--repo-root")

  let repoRoot: string
  try {
    repoRoot = repoRootFlag != null ? resolve(repoRootFlag) : getRepoRoot()
  } catch (err) {
    exitOnToolError({ error: err, prefix: PREFIX })
  }

  let deriverPaths: readonly string[]
  try {
    deriverPaths = discoverDerivers(repoRoot)
  } catch (err) {
    exitOnToolError({ error: `discovery failed: ${errorMessage(err)}`, prefix: PREFIX })
  }

  const expected = generateBarrel(deriverPaths)
  const barrelAbs = resolve(repoRoot, BARREL_REL_PATH)
  const onDisk = readOnDiskBarrel(barrelAbs)

  if (fix) {
    if (onDisk !== expected) {
      try {
        writeBarrel(barrelAbs, expected)
      } catch (err) {
        exitOnToolError({
          error: `failed to write barrel: ${errorMessage(err)}`,
          prefix: PREFIX,
        })
      }
    }
    return
  }

  const onDiskSet = new Set(deriverPaths)
  const members = [...new Set([...deriverPaths, ...deriversNamedByBarrel(onDisk)])].sort()

  const { population, violations: accountedFor } = examinePopulation<string, BarrelViolation>({
    members,
    unit: "deriver files",
    membership: {
      kind: "enumerated",
      because:
        "`discoverDerivers` scans `args.repoRoot` with `Bun.Glob.scanSync`, which raises ENOENT on a root that is not there, and the caller turns any throw into exit 2 above, so fewer paths is fewer `*.deriver.ts` files on disk; the barrel's own import lines add whatever derivers it still names, and the verdict is the whole-text comparison against `generateBarrel` below, which holds whether or not every line of the barrel parsed",
    },
    labelOf: (rel) => rel,
    siteOf: (rel) => resolve(repoRoot, rel),
    examine: (rel) => {
      if (!onDiskSet.has(rel))
        return [{ file: rel, message: "the barrel names it, but no such deriver is on disk" }]
      const stripped = rel.replace(/\.ts$/u, "")
      if (!onDisk.includes(stripped) && !onDisk.includes(rel))
        return [{ file: rel, message: "on disk, but the barrel does not name it" }]
      return []
    },
  })

  const violations =
    onDisk === expected || accountedFor.length > 0
      ? accountedFor
      : [
          ...accountedFor,
          {
            file: BARREL_REL_PATH,
            message:
              "every deriver is accounted for, but the file differs from what `generateBarrel` emits for them",
          },
        ]

  reportViolations(violations, {
    prefix: PREFIX,
    header: "Deriver barrel does not match the derivers on disk",
    successMessage: `OK — ${deriverPaths.length} deriver(s) discovered, and the barrel matches them exactly.`,
    formatViolation: (v) => `${v.file} — ${v.message}`,
    footer: (count) =>
      `${PREFIX} ${count} violation(s) found → regenerate with: ops check-deriver-barrel --fix`,
    population,
  })
  const exitCode = computeExitCode({ violationCount: violations.length, population })
  if (exitCode !== 0) process.exit(exitCode)
}
