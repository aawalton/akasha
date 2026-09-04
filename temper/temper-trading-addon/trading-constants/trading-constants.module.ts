import type { Module } from "@akasha/code-system/module"

export const tradingConstants = {
  id: "01a06160-2a5a-7eb0-829f-642f1db7b6b9",
  pageTypeSlug: "module",
  slug: "trading-constants",
  definition: "the add-on's name and the key its saved variables answer to",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The add-on name is the one key every event name and every saved variables read is built from.",
    },
  ],
} as const satisfies Module
