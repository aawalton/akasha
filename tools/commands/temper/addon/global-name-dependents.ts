export const summary =
  "Enumerate what already depends on an addon global name, and rule whether renaming it is safe"

import { readdirSync, readFileSync, statSync } from "node:fs"
import { join, relative } from "node:path"
import { codeRoot } from "@akasha/pages-system/code-root"
import {
  type DependentSourceFile,
  enumerateGlobalDependents,
  type GlobalDependentReport,
} from "@akasha/temper-addon-build/global-name-dependents"
import { addonManifestPathIn } from "@akasha/temper-addons-resolve/addon-manifest-file"
import { listAllAddons } from "@akasha/temper-addons-resolve/addon-roster"
// Ownership parses TypeScript with the compiler itself, costing about 110ms to load.
// This is the only command that reads ownership, so only this command pays it.
import { collectGlobalWritesFromSource } from "@akasha/temper-build-deploy-checks/addon-global-ownership"
import { z } from "zod"
import { parseArgs } from "../../../lib/parse-args.ts"
import type { CommandHelp } from "../../../ops/surface.ts"

export const help: CommandHelp = {
  positionals: [
    {
      name: "[global]",
      description: "The global name to enumerate dependents for",
      aliasOfFlag: "--global",
    },
  ],
  flags: [
    {
      name: "--global",
      argLabel: "<name>",
      valueShape: "token",
      description: "The global name to enumerate dependents for",
    },
    {
      name: "--json",
      description: "Emit one JSON report per line instead of prose",
    },
    {
      name: "--repo-root",
      argLabel: "<path>",
      valueShape: "token",
      path: true,
      description: "The checkout to scan. Defaults to $CODE_ROOT, else this repository.",
    },
  ],
  examples: [
    "ops temper addon global-name-dependents TemperCrafting",
    "ops temper addon global-name-dependents --json",
  ],
}

const addonJsonSchema = z.object({ savedVariables: z.array(z.string()).optional() }).passthrough()

function collectFiles(dir: string, keep: (p: string) => boolean): readonly string[] {
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
      out.push(...collectFiles(p, keep))
      continue
    }
    if (keep(p)) out.push(p)
  }
  return out
}

function isTsSource(p: string): boolean {
  if (!p.endsWith(".ts") && !p.endsWith(".tsx")) return false
  if (p.endsWith(".d.ts") || p.endsWith(".generated.ts") || p.endsWith(".generated.tsx")) {
    return false
  }
  if (/\.test\.tsx?$/.test(p)) return false
  return true
}

function readSavedVariables(addonDir: string): readonly string[] {
  const path = addonManifestPathIn(addonDir)
  if (path === null) return []
  let raw: string
  try {
    raw = readFileSync(path, "utf8")
  } catch {
    return []
  }
  return addonJsonSchema.parse(JSON.parse(raw)).savedVariables ?? []
}

function reportOne(report: GlobalDependentReport): undefined {
  const verdictText =
    report.verdict === "rename-safe" ? "rename-safe (no dependents)" : "keep-name-required"
  process.stdout.write(
    `\`${report.global}\` → ${verdictText} — ${report.dependents.length} dependent(s):\n`
  )
  for (const d of report.dependents) {
    process.stdout.write(`  - ${d.file}:${d.line}:${d.column} [${d.kind}] ${d.detail}\n`)
  }
  if (report.verdict === "keep-name-required") {
    process.stdout.write(
      `  → a rename of \`${report.global}\` would break these; keep the name and restore it post-clobber\n`
    )
  }
  return undefined
}

export default async function temperAddonGlobalNameDependents(
  args: readonly string[]
): Promise<void> {
  const parsed = parseArgs(help, args)
  const global = parsed.string("--global")
  const asJson = parsed.boolean("--json")
  const repoRoot = parsed.string("--repo-root") ?? codeRoot()

  const addons = listAllAddons({ repoRoot })

  const addonSourceFiles: DependentSourceFile[] = []
  for (const addon of addons) {
    for (const f of collectFiles(join(addon.dir, "src"), isTsSource)) {
      addonSourceFiles.push({
        path: relative(repoRoot, f),
        source: readFileSync(f, "utf8"),
        lang: "ts",
      })
    }
    for (const f of collectFiles(join(addon.dir, "metadata"), (p) => p.endsWith(".xml"))) {
      addonSourceFiles.push({
        path: relative(repoRoot, f),
        source: readFileSync(f, "utf8"),
        lang: "xml",
      })
    }
  }

  let reports: readonly GlobalDependentReport[]
  if (global !== undefined) {
    reports = [enumerateGlobalDependents({ global, files: addonSourceFiles })]
  } else {
    const owned = new Set<string>()
    for (const addon of addons) {
      for (const f of collectFiles(join(addon.dir, "src"), isTsSource)) {
        const rel = relative(repoRoot, f)
        for (const name of collectGlobalWritesFromSource(readFileSync(f, "utf8"), rel)) {
          owned.add(name)
        }
      }
      for (const sv of readSavedVariables(addon.dir)) owned.add(sv)
    }
    reports = [...owned]
      .sort()
      .map((g) => enumerateGlobalDependents({ global: g, files: addonSourceFiles }))
      .filter((r) => r.dependents.some((d) => d.kind === "lam-topology-binding"))
  }

  if (asJson) {
    for (const r of reports) process.stdout.write(`${JSON.stringify(r)}\n`)
    return
  }
  if (reports.length === 0) {
    process.stdout.write("no colliding global with statically-visible dependents found.\n")
    return
  }
  for (const r of reports) reportOne(r)
}
