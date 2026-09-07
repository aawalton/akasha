import type { Module } from "@akasha/code/module"

export const dataEncodeRuntime = {
  id: "01a06061-96a0-7c1f-a7ed-6104c85448b3",
  pageTypeSlug: "module",
  slug: "data-encode-runtime",
  definition: "whether the library is logging and where a log line is sent",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A log line is sent to the debug logger addon where that addon is loaded.",
    },
    {
      invariantKind: "departure",
      statement: "A log line goes nowhere where the library is not in debug.",
    },
    {
      invariantKind: "stopgap",
      statement: "Debug is on for a single named account and for no other account.",
    },
  ],
} as const satisfies Module
