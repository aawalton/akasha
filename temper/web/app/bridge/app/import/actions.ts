type ImportEntityStatus = "created" | "updated" | "unchanged" | "preserved" | "skipped"

interface ImportEntityResult {
  status: ImportEntityStatus
}

interface ImportDiagnostics {
  knownSectionCount: number
  skippedCharacters: number
  skippedCompanions: number
}

export interface ImportResult {
  account: ImportEntityResult & { name: string }
  characters: ReadonlyArray<ImportEntityResult & { esoCharacterId: string; name: string }>
  companions: ReadonlyArray<ImportEntityResult & { companionId: string }>
  diagnostics: ImportDiagnostics
}
