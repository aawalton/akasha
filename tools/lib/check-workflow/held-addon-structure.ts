export interface Issue {
  readonly addon: string
  readonly file: string
  readonly message: string
}

export interface AddonStructureFacts {
  readonly addon: string
  readonly rosterDir: string | null
  readonly mapPackageDir: string | null
  readonly generatedFiles: readonly string[]
}

const GENERATED_DIR_SEGMENT = "generated"

function isUnderGeneratedDir(repoRelPath: string): boolean {
  const segments = repoRelPath.split("/")
  return segments.slice(0, -1).includes(GENERATED_DIR_SEGMENT)
}

export function scanAddonStructure(facts: readonly AddonStructureFacts[]): readonly Issue[] {
  const issues: Issue[] = []
  for (const f of facts) {
    if (f.rosterDir === null) {
      if (f.mapPackageDir === null) {
        throw new Error(`${f.addon}: fact carries neither a roster directory nor a map entry`)
      }
      issues.push({
        addon: f.addon,
        file: f.mapPackageDir,
        message: `${f.addon}: territory.map.json records package ${f.mapPackageDir}, and the addon roster discovers no addon of this name — the map entry is stale.`,
      })
      continue
    }
    if (f.mapPackageDir !== null && f.mapPackageDir !== f.rosterDir) {
      issues.push({
        addon: f.addon,
        file: f.mapPackageDir,
        message: `${f.addon}: territory.map.json records package ${f.mapPackageDir}, and the addon roster finds it at ${f.rosterDir} — repoint the map entry.`,
      })
    }
    for (const g of f.generatedFiles) {
      if (!isUnderGeneratedDir(g)) {
        issues.push({
          addon: f.addon,
          file: g,
          message: `${f.addon}: generated file ${g} is not under a generated/ directory.`,
        })
      }
    }
  }
  issues.sort((a, b) =>
    a.addon < b.addon ? -1 : a.addon > b.addon ? 1 : a.file < b.file ? -1 : a.file > b.file ? 1 : 0
  )
  return issues
}
