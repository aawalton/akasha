import type { Module } from "@akasha/code-system/module"

export const debugLoggerCallbacks = {
  id: "01a06061-408c-7630-a551-0d8a0513c2b1",
  pageTypeSlug: "module",
  slug: "debug-logger-callbacks",
  definition: "the names a caller registers against to hear the log change",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A callback name is stated once and read from the library table.",
    },
  ],
} as const satisfies Module
