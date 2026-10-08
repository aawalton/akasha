import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionCadwellLookup = {
  id: "01a06358-4f7c-7d6d-8881-1e898924e3ff",
  type: "page-type/module",
  slug: "completion-cadwell-lookup",
  definition: "which stop of Cadwell's Almanac a character has finished",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The Cadwell catalog arrives as an argument rather than as an imported table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stop is matched by its zone name and its own name taken together.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A level's tier number is the display order its page states.",
    },
  ],
  createdAt: "2026-09-02T18:18:47.036Z",
  updatedAt: "2026-09-21T15:58:08.000Z",
} as const satisfies Module
