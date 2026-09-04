import type { Module } from "@akasha/code-system/module"

export const debugLoggerApi = {
  id: "01a06061-408c-7ae0-8ee1-8ec6defab7e7",
  pageTypeSlug: "module",
  slug: "debug-logger-api",
  definition: "the functions the library hands to every other addon",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Calling the library table itself makes a logger.",
    },
    {
      invariantKind: "departure",
      statement:
        "A caller may hand the library table in as the first argument or leave the argument out.",
    },
    {
      invariantKind: "departure",
      statement: "The API version this states is two.",
    },
  ],
} as const satisfies Module
