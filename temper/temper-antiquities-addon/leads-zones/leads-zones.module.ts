import type { Module } from "@akasha/code-system/module"

export const leadsZones = {
  id: "01a06274-b08a-7704-bb73-1995a9337535",
  pageTypeSlug: "module",
  slug: "leads-zones",
  definition: "the zones a lead is grouped under, the game's own and the invented ones",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An invented zone id sits above the highest id the game itself uses.",
    },
  ],
} as const satisfies Module
