import type { Module } from "@akasha/code-system/module"

export const automationSettingsShape = {
  id: "01a06038-b7a4-79d6-aa24-39870ef827c8",
  pageTypeSlug: "module",
  slug: "automation-settings-shape",
  definition: "what unknown JSON holds to be read as automation settings",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Settings arrive as JSON nobody has vouched for.",
    },
    {
      invariantKind: "departure",
      statement: "A toggle carrying anything other than a boolean is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A key no toggle name holds is carried through untouched.",
    },
    {
      invariantKind: "departure",
      statement: "Settings written by a newer temper are still read by an older temper.",
    },
    {
      invariantKind: "departure",
      statement: "A map for characters and a map for companions are both required.",
    },
    {
      invariantKind: "departure",
      statement: "The global scope is left out rather than written empty.",
    },
    {
      invariantKind: "gap",
      statement: "Every toggle name is written out again here.",
    },
    {
      invariantKind: "gap",
      statement: "A name missing from this list is caught where the fields are typed.",
    },
  ],
} as const satisfies Module
