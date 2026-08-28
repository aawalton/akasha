// The old graph is gone. This module is a stub so its callers still resolve.
// Every value here refuses; the callers are waiting to be migrated onto `graph/ask.ts`.

export type WorkspaceGlobs = {
  readonly project: readonly string[]
  readonly entry: readonly string[]
  readonly ignore: readonly string[]
}
