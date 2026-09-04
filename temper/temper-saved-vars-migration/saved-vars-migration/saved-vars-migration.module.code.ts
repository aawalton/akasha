import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import {
  appendGlobalToTarget,
  renameGlobals,
} from "../saved-vars-blocks/saved-vars-blocks.module.code.ts"

export type SavedVarsIo = {
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

export type AppendSpec = {
  readonly absorbedFileBase: string
  readonly absorbedGlobal: string
  readonly targetFileBase: string
}

export type AppendMigrationOutcome =
  | { readonly kind: "appended"; readonly absorbed: string; readonly target: string }
  | { readonly kind: "skip-already-appended"; readonly target: string }
  | { readonly kind: "skip-no-source"; readonly absorbed: string }
  | { readonly kind: "skip-no-target"; readonly target: string }
  | { readonly kind: "skip-absorbed-global-absent"; readonly absorbed: string }

export function appendAddonSavedVars(spec: AppendSpec, io: SavedVarsIo): AppendMigrationOutcome {
  const absorbedFile = join(io.savedVarsDir, `${spec.absorbedFileBase}.lua`)
  const targetFile = join(io.savedVarsDir, `${spec.targetFileBase}.lua`)
  if (!existsSync(absorbedFile)) return { kind: "skip-no-source", absorbed: spec.absorbedFileBase }
  if (!existsSync(targetFile)) return { kind: "skip-no-target", target: spec.targetFileBase }

  const done = appendGlobalToTarget(
    readFileSync(absorbedFile, "utf-8"),
    spec.absorbedGlobal,
    readFileSync(targetFile, "utf-8")
  )
  switch (done.kind) {
    case "already-appended":
      return { kind: "skip-already-appended", target: spec.targetFileBase }
    case "absorbed-global-absent":
      return { kind: "skip-absorbed-global-absent", absorbed: spec.absorbedFileBase }
    case "appended": {
      const aside = join(io.savedVarsDir, `${spec.targetFileBase}.lua.pre-consolidation.bak`)
      if (!existsSync(aside)) writeFileSync(aside, readFileSync(targetFile))
      writeFileSync(targetFile, done.content)
      return { kind: "appended", absorbed: spec.absorbedFileBase, target: spec.targetFileBase }
    }
    default:
      return assertNever(done)
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

export function logConsolidationMigration(
  outcome: RenameMigrationOutcome | AppendMigrationOutcome
): undefined {
  if (outcome.kind === "renamed") {
    console.log(
      `Migrated saved variables: ${outcome.from}.lua to ${outcome.to}.lua (${String(outcome.renamedCount)} global(s) renamed)`
    )
  } else if (outcome.kind === "appended") {
    console.log(
      `Appended saved variables: ${outcome.absorbed}.lua to ${outcome.target}.lua (top-level global)`
    )
  }
  return undefined
}

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
