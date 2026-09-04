import type { Module } from "@akasha/code-system/module"

export const debugLoggerConstants = {
  id: "01a06061-408e-7921-b7b9-95d7deb170c4",
  pageTypeSlug: "module",
  slug: "debug-logger-constants",
  definition: "the log levels, entry field positions and callback names the library is built on",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A log level is one letter.",
    },
    {
      invariantKind: "departure",
      statement: "An entry field is reached by its position counting from the first field.",
    },
    {
      invariantKind: "departure",
      statement: "The order of the levels runs from verbose up to error.",
    },
  ],
} as const satisfies Module
