import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const zoneNamesSeeding = {
  id: "01a15067-7e01-755b-9cdd-6a178e3fdd54",
  type: "page-type/module",
  slug: "zone-names-seeding",
  definition: "every zone's name the sandbox answers by the zone's id",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A zone's name is read from the English rows the LibZone tables Temper ships hold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A zone no row names is answered with no name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What the player's own game answered is set later, so it answers first.",
    },
  ],
  createdAt: "2026-10-18T19:05:22.177Z",
  updatedAt: "2026-10-18T19:05:22.177Z",
} as const satisfies Module
