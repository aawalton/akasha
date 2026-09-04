import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const automationSettings = {
  id: "01a0609f-53f9-741e-ad0d-f6c482c8057e",
  pageTypeSlug: "module",
  slug: "automation-settings",
  definition: "which chores are done for a character or companion without being asked for",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A toggle set on one character outranks the same toggle set across all characters.",
    },
    {
      invariantKind: "departure",
      statement: "A toggle set nowhere is off.",
    },
    {
      invariantKind: "departure",
      statement: "A character carries a toggle for each crafting writ the game gives out.",
    },
    {
      invariantKind: "departure",
      statement: "A companion carries fewer toggles than a character.",
    },
  ],
} as const satisfies Module
