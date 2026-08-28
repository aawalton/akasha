// The old graph is gone. This module is a stub so its callers still resolve.
// Every value here refuses; the callers are waiting to be migrated onto `graph/ask.ts`.

export type SourceTree = {
  readonly files: readonly string[]
  readonly read: (path: string) => string | null
}
