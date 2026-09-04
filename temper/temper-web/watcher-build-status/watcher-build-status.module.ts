import type { Module } from "@akasha/code-system/module"

export const watcherBuildStatus = {
  id: "01a0640f-8510-74a0-a7e6-a020f4b468ed",
  pageTypeSlug: "module",
  slug: "watcher-build-status",
  definition: "how the build the watcher reports compares with the build it is meant to run",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A stamp that cannot be compared reads as a gap rather than as stale.",
    },
    {
      invariantKind: "departure",
      statement: "A stamp that is blank or whitespace is no stamp.",
    },
    {
      invariantKind: "departure",
      statement: "Never-reported outranks source-build.",
    },
    {
      invariantKind: "departure",
      statement: "Source-build outranks target-unknown.",
    },
    {
      invariantKind: "departure",
      statement: "An instant that cannot be read is unknown rather than the start of the epoch.",
    },
    {
      invariantKind: "absence",
      statement: "A summary states nothing beyond the verdict the summary carries.",
    },
  ],
} as const satisfies Module
