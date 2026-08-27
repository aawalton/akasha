import { mkdirSync, mkdtempSync, realpathSync, rmSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"
import type { Check } from "../lib/check.ts"
import { judge, over, skip } from "../../outcome/outcome"
import { AKASHA, isDirty, isVendored, rootFor } from "../../repo/roots/roots"
import { linkSibling } from "../lib/sibling-link.ts"
import { ABSENT, diagnostics, excludesFor, FROM_DISK, instrument, linkModules, reported, runTsc, writeTsconfig } from "../lib/typecheck-run.ts"

const NAME = "typecheck-repo"

const MAX_REPORTED = 20

const CACHE_ROOT = "/var/tmp/instructions-typecheck-repo"

export const typecheckRepo: Check = (repo) => {
  const found = instrument()
  if (found === null) {
    return {
      ...skip(NAME, `${ABSENT}. Until then NOTHING typechecks this repository whole`),
      population: over(0, "TypeScript file"),
    }
  }

  mkdirSync(CACHE_ROOT, { recursive: true })
  const box = realpathSync(mkdtempSync(`${CACHE_ROOT}/run-`))
  const dir = `${box}/repo`
  mkdirSync(dir, { recursive: true })
  linkSibling(box)
  try {
    const staged: string[] = []
    for (const relPath of new Bun.Glob("**/*.ts").scanSync({
      cwd: rootFor(repo.roots, AKASHA),
      onlyFiles: true,
    })) {
      if (isDirty(relPath) || isVendored(relPath)) continue
      mkdirSync(dirname(`${dir}/${relPath}`), { recursive: true })
      writeFileSync(`${dir}/${relPath}`, repo.read(relPath))
      staged.push(relPath)
    }
    const files = staged.length
    writeTsconfig(dir, found.typeRoot, excludesFor(rootFor(repo.roots, AKASHA), staged, [], FROM_DISK))
    linkModules(dir)

    const run = runTsc(found, dir)
    const errors = diagnostics(run.output, dir)
    if (errors.length === 0 && run.exitCode !== 0) {
      const said = run.output.trim().split("\n")[0] ?? "nothing"
      return {
        ...skip(
          NAME,
          `tsc exited ${run.exitCode} without printing a diagnostic, so nothing was measured — it said: ${said}`
        ),
        population: over(files, "TypeScript file"),
      }
    }

    const touched = new Set(errors.map((e) => e.relPath)).size
    const detail =
      errors.length === 0
        ? `${files} TypeScript files typechecked under strict; no type errors`
        : `${files} TypeScript files typechecked under strict; ${errors.length} errors across ${touched} files`
    return {
      ...judge(NAME, detail, reported(errors, MAX_REPORTED)),
      population: over(files, "TypeScript file"),
    }
  } finally {
    rmSync(box, { recursive: true, force: true })
  }
}
