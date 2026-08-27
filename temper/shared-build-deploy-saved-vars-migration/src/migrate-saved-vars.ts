import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { assertNever } from "@shared/utils-narrow/assert-never"

function escapeRegExp(literal: string): string {
  return literal.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

const TOP_LEVEL_CLOSE = /^\}/
const TOP_LEVEL_ASSIGN = /^[A-Za-z_][A-Za-z0-9_]*[ \t]*=/

export interface RenameResult {
  readonly content: string
  readonly renamedCount: number
}

export function renameGlobals(
  content: string,
  renames: readonly (readonly [RegExp, string])[]
): RenameResult {
  let renamed = content
  let renamedCount = 0
  for (const [pattern, replacement] of renames) {
    const next = renamed.replace(pattern, replacement)
    if (next !== renamed) renamedCount += 1
    renamed = next
  }
  return { content: renamed, renamedCount }
}

export function extractTopLevelBlock(content: string, global: string): string | null {
  const lines = content.split("\n")
  const startRe = new RegExp(`^${escapeRegExp(global)}[ \\t]*=`)
  const startIdx = lines.findIndex((line) => startRe.test(line))
  if (startIdx === -1) return null
  for (let i = startIdx + 1; i < lines.length; i += 1) {
    const line = lines[i] ?? ""
    if (TOP_LEVEL_CLOSE.test(line)) return lines.slice(startIdx, i + 1).join("\n")
    if (TOP_LEVEL_ASSIGN.test(line)) return lines.slice(startIdx, i).join("\n")
  }
  return lines.slice(startIdx).join("\n")
}

export type AppendResult =
  | { readonly kind: "appended"; readonly content: string }
  | { readonly kind: "already-appended" }
  | { readonly kind: "absorbed-global-absent" }

export function appendGlobalToTarget(
  absorbedContent: string,
  absorbedGlobal: string,
  targetContent: string
): AppendResult {
  const absorbedBlock = extractTopLevelBlock(absorbedContent, absorbedGlobal)
  if (absorbedBlock === null) return { kind: "absorbed-global-absent" }

  const presentRe = new RegExp(`^${escapeRegExp(absorbedGlobal)}[ \\t]*=`, "m")
  if (presentRe.test(targetContent)) return { kind: "already-appended" }

  const eol = targetContent.includes("\r\n") ? "\r\n" : "\n"
  const base = targetContent.endsWith(eol) ? targetContent : `${targetContent}${eol}`
  return { kind: "appended", content: `${base}${absorbedBlock}${eol}` }
}

export interface SavedVarsIo {
  readonly savedVarsDir: string
}

export type RenameMigrationOutcome =
  | {
      readonly kind: "renamed"
      readonly from: string
      readonly to: string
      readonly renamedCount: number
    }
  | { readonly kind: "skip-already-renamed"; readonly to: string }
  | { readonly kind: "skip-no-source"; readonly from: string }
  | { readonly kind: "skip-no-globals"; readonly from: string; readonly to: string }

export function migrateAddonSavedVars(
  oldFileBase: string,
  newFileBase: string,
  renames: readonly (readonly [RegExp, string])[],
  io: SavedVarsIo
): RenameMigrationOutcome {
  const oldFile = join(io.savedVarsDir, `${oldFileBase}.lua`)
  const newFile = join(io.savedVarsDir, `${newFileBase}.lua`)
  if (existsSync(newFile)) return { kind: "skip-already-renamed", to: newFileBase }
  if (!existsSync(oldFile)) return { kind: "skip-no-source", from: oldFileBase }

  const { content, renamedCount } = renameGlobals(readFileSync(oldFile, "utf-8"), renames)
  if (renamedCount === 0) return { kind: "skip-no-globals", from: oldFileBase, to: newFileBase }

  writeFileSync(newFile, content)
  return { kind: "renamed", from: oldFileBase, to: newFileBase, renamedCount }
}

export type AppendMigrationOutcome =
  | { readonly kind: "appended"; readonly absorbed: string; readonly target: string }
  | { readonly kind: "skip-already-appended"; readonly target: string }
  | { readonly kind: "skip-no-source"; readonly absorbed: string }
  | { readonly kind: "skip-no-target"; readonly target: string }
  | { readonly kind: "skip-absorbed-global-absent"; readonly absorbed: string }

export interface AppendSpec {
  readonly absorbedFileBase: string
  readonly absorbedGlobal: string
  readonly targetFileBase: string
}

export function appendAddonSavedVars(spec: AppendSpec, io: SavedVarsIo): AppendMigrationOutcome {
  const absorbedFile = join(io.savedVarsDir, `${spec.absorbedFileBase}.lua`)
  const targetFile = join(io.savedVarsDir, `${spec.targetFileBase}.lua`)
  if (!existsSync(absorbedFile)) return { kind: "skip-no-source", absorbed: spec.absorbedFileBase }
  if (!existsSync(targetFile)) return { kind: "skip-no-target", target: spec.targetFileBase }

  const result = appendGlobalToTarget(
    readFileSync(absorbedFile, "utf-8"),
    spec.absorbedGlobal,
    readFileSync(targetFile, "utf-8")
  )
  switch (result.kind) {
    case "already-appended":
      return { kind: "skip-already-appended", target: spec.targetFileBase }
    case "absorbed-global-absent":
      return { kind: "skip-absorbed-global-absent", absorbed: spec.absorbedFileBase }
    case "appended": {
      const bak = join(io.savedVarsDir, `${spec.targetFileBase}.lua.pre-consolidation.bak`)
      if (!existsSync(bak)) writeFileSync(bak, readFileSync(targetFile))
      writeFileSync(targetFile, result.content)
      return { kind: "appended", absorbed: spec.absorbedFileBase, target: spec.targetFileBase }
    }
    default:
      return assertNever(result)
  }
}

export type ConsolidationMigration =
  | {
      readonly mode: "rename"
      readonly runFor: string
      readonly oldFileBase: string
      readonly newFileBase: string
      readonly renames: readonly (readonly [RegExp, string])[]
    }
  | { readonly mode: "append"; readonly runFor: string; readonly spec: AppendSpec }

export function applyConsolidationMigrations(
  canonicalName: string,
  migrations: readonly ConsolidationMigration[],
  io: SavedVarsIo
): undefined {
  for (const migration of migrations) {
    if (migration.runFor !== canonicalName) continue
    switch (migration.mode) {
      case "rename":
        logConsolidationMigration(
          migrateAddonSavedVars(migration.oldFileBase, migration.newFileBase, migration.renames, io)
        )
        break
      case "append":
        logConsolidationMigration(appendAddonSavedVars(migration.spec, io))
        break
      default:
        assertNever(migration)
    }
  }
  return undefined
}

export function logConsolidationMigration(
  outcome: RenameMigrationOutcome | AppendMigrationOutcome
): undefined {
  if (outcome.kind === "renamed") {
    console.log(
      `✓ Migrated SavedVariables: ${outcome.from}.lua → ${outcome.to}.lua (${outcome.renamedCount} global(s) renamed)`
    )
  } else if (outcome.kind === "appended") {
    console.log(
      `✓ Appended SavedVariables: ${outcome.absorbed}.lua → ${outcome.target}.lua (top-level global)`
    )
  }
  return undefined
}
