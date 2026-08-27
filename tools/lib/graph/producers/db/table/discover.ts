import type { Repo } from "../../../../../../page/document/types.ts"
import { readRepoFile } from "../../../repos.ts"
import type { BuildContext } from "../../../types.ts"
import { repoFiles } from "../../lib/repo-files.ts"

export const SKIP_DIRS: ReadonlySet<string> = new Set([
  "node_modules",
  ".git",
  "dist",
  ".next",
  ".turbo",
  ".cache",
  "build",
  "coverage",
  "__fixtures__",
  "generated",
  "_generated",
])

const FK_FILE_NAME = "_fk_constraints.sql"
const SQL_SUFFIX = ".sql"
const TABLES_DIR = "tables"
const SCHEMA_DIR_NAME = "schema"

export type DiscoveredTableFile = {
  readonly relPath: string
  readonly schema: string
  readonly table: string
  readonly content: string
}

export type DiscoveredFkFile = {
  readonly relPath: string
  readonly schema: string
  readonly content: string
}

const stripDotSql = (name: string): string =>
  name.endsWith(SQL_SUFFIX) ? name.slice(0, -SQL_SUFFIX.length) : name

type RawHit =
  | {
      readonly kind: "table"
      readonly relPath: string
      readonly schema: string
      readonly table: string
    }
  | { readonly kind: "fk"; readonly relPath: string; readonly schema: string }

const skipped = (rel: string): boolean => rel.split("/").some((segment) => SKIP_DIRS.has(segment))

const hitOf = (rel: string): RawHit | null => {
  const parts = rel.split("/")
  const fileName = parts[parts.length - 1] ?? ""
  const parentName = parts[parts.length - 2] ?? ""
  const grandparentName = parts[parts.length - 3] ?? ""
  const greatGrandparentName = parts[parts.length - 4] ?? ""
  if (fileName === "") return null

  if (
    parentName === TABLES_DIR &&
    greatGrandparentName === SCHEMA_DIR_NAME &&
    fileName.endsWith(SQL_SUFFIX) &&
    grandparentName !== ""
  ) {
    return { kind: "table", relPath: rel, schema: grandparentName, table: stripDotSql(fileName) }
  }

  if (fileName === FK_FILE_NAME && grandparentName === SCHEMA_DIR_NAME && parentName !== "") {
    return { kind: "fk", relPath: rel, schema: parentName }
  }

  return null
}

const hitsIn = (ctx: BuildContext, repo: Repo): readonly RawHit[] => {
  const out: RawHit[] = []
  for (const rel of repoFiles(ctx, repo)) {
    if (skipped(rel)) continue
    const hit = hitOf(rel)
    if (hit === null) continue
    out.push(hit)
  }
  return out
}

const sortByRelPath = <T extends { relPath: string }>(arr: readonly T[]): readonly T[] =>
  [...arr].sort((a, b) => (a.relPath < b.relPath ? -1 : a.relPath > b.relPath ? 1 : 0))

export const discoverTableFiles = (
  ctx: BuildContext,
  repo: Repo
): readonly DiscoveredTableFile[] => {
  const out: DiscoveredTableFile[] = []
  for (const hit of hitsIn(ctx, repo)) {
    if (hit.kind !== "table") continue
    const content = readRepoFile(ctx, repo, hit.relPath)
    if (content === null) continue
    out.push({ relPath: hit.relPath, schema: hit.schema, table: hit.table, content })
  }
  return sortByRelPath(out)
}

export const discoverFkConstraintFiles = (
  ctx: BuildContext,
  repo: Repo
): readonly DiscoveredFkFile[] => {
  const out: DiscoveredFkFile[] = []
  for (const hit of hitsIn(ctx, repo)) {
    if (hit.kind !== "fk") continue
    const content = readRepoFile(ctx, repo, hit.relPath)
    if (content === null) continue
    out.push({ relPath: hit.relPath, schema: hit.schema, content })
  }
  return sortByRelPath(out)
}
