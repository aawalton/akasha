// The old graph is gone. This module is a stub so its callers still resolve.
// Every value here refuses; the callers are waiting to be migrated onto `graph/ask.ts`.

export const WALK_SKIP_DIRS: ReadonlySet<string> = new Set([
  "node_modules",
  ".next",
  "dist",
  ".turbo",
  "__fixtures__",
])
