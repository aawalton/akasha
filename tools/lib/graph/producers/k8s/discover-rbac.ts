import { posix } from "node:path"
import ts from "typescript"
import type { Repo } from "../../../../../page/document/types.ts"
import { readRepoFile } from "../../repos.ts"
import type { BuildContext, Graph } from "../../types.ts"
import { repoFiles } from "../lib/repo-files.ts"
import { extractRbacProfiles } from "./extract-rbac.ts"
import type { RbacData } from "./rbac-types.ts"
import { collectTopLevelStringConsts } from "./ts-literals.ts"

export const RBAC_REPO: Repo = "instructions"

export const RBAC_DIR = "tools/lib/rbac"

const PACKAGE_NAME_EXPORT = "packageName"

const isProfileSource = (relPath: string): boolean =>
  relPath.startsWith(`${RBAC_DIR}/`) &&
  posix.extname(relPath) === ".ts" &&
  !relPath.endsWith(".test.ts")

const declaredPackageName = (relPath: string, text: string): string | null => {
  const sf = ts.createSourceFile(relPath, text, ts.ScriptTarget.Latest, true)
  return collectTopLevelStringConsts(sf).get(PACKAGE_NAME_EXPORT) ?? null
}

export const discoverRbacProfiles = (ctx: BuildContext, _upstream: Graph): readonly RbacData[] => {
  const results: RbacData[] = []
  const unreadable: string[] = []
  let seen = 0

  for (const relPath of repoFiles(ctx, RBAC_REPO)) {
    if (!isProfileSource(relPath)) continue
    seen += 1
    const text = readRepoFile(ctx, RBAC_REPO, relPath)
    if (text === null) {
      unreadable.push(`${relPath} — the snapshot listed it but could not read it`)
      continue
    }
    const packageName = declaredPackageName(relPath, text)
    if (packageName === null) {
      unreadable.push(
        `${relPath} — it exports no \`packageName\`, and which package a profile belongs to is not ` +
          `recoverable from where the file sits`
      )
      continue
    }
    const extraction = extractRbacProfiles(relPath, text)
    if (extraction.unreadable !== null) {
      unreadable.push(`${relPath} — ${extraction.unreadable}`)
      continue
    }
    results.push({ repo: RBAC_REPO, packageName, sourcePath: relPath, profiles: extraction.profiles })
  }

  if (unreadable.length > 0) {
    throw new Error(
      `graph: the profiles could not be read out of ${unreadable.length} RBAC file(s), and ` +
        `dropping them would leave the graph reporting roles nobody declared:\n  ` +
        unreadable.join("\n  ")
    )
  }

  if (seen === 0) {
    throw new Error(
      `graph: no RBAC profile source stands under ${RBAC_DIR} in the ${RBAC_REPO} repository, ` +
        `and every namespace role is declared in one of them, so reading none would leave the ` +
        `graph asserting that nothing grants anything rather than failing`
    )
  }

  return results
}
