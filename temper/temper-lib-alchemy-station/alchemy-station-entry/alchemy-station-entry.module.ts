import type { Module } from "@akasha/code-system/module"

export const alchemyStationEntry = {
  id: "01a06054-98bd-734e-9a93-1ddc5661a9bc",
  pageTypeSlug: "module",
  slug: "alchemy-station-entry",
  definition: "the global the game reads the alchemy tabs from once the addon loads",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The bundle the transpiler writes starts here.",
    },
    {
      invariantKind: "departure",
      statement: "The global carries the whole library rather than one call at a time.",
    },
  ],
} as const satisfies Module
