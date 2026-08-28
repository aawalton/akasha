// The old graph is gone. This module is a stub so its callers still resolve.
// Every value here refuses; the callers are waiting to be migrated onto `graph/ask.ts`.
import { oldGraphGone } from "../../graph-gone.ts"

export type ResolvePackageExportArgs = {
  readonly subPath: string | null
  readonly exports: Record<string, string> | null
  readonly packagePath: string
  readonly bareImportCandidates: readonly string[]
  readonly subPathExtensions: readonly string[]
  readonly acceptResolved: (path: string) => boolean
  readonly exists: (path: string) => boolean
}
export const resolvePackageExport: (args: ResolvePackageExportArgs) => string | null = () =>
  oldGraphGone("resolvePackageExport")
