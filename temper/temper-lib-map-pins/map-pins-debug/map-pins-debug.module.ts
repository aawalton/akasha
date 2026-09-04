import type { Module } from "@akasha/code-system/module"

export const mapPinsDebug = {
  id: "01a06062-57df-7190-ad92-66c3202c3227",
  pageTypeSlug: "module",
  slug: "map-pins-debug",
  definition: "the log lines the map pin library writes",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A table already printed is named rather than printed again.",
    },
    {
      invariantKind: "departure",
      statement: "An info line goes to the chat window where no log viewer is loaded.",
    },
    {
      invariantKind: "departure",
      statement: "A line other than info is written only while logging is on.",
    },
  ],
} as const satisfies Module
