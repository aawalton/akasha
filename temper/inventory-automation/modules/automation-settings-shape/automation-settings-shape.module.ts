import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const automationSettingsShape = {
  id: "01a06038-b7a4-79d6-aa24-39870ef827c8",
  type: "module",
  slug: "automation-settings-shape",
  definition: "what unknown JSON holds to be read as automation settings",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Settings arrive as JSON nobody has vouched for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A toggle with anything other than a boolean is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key no toggle name has is carried through untouched.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Settings written by a newer temper are still read by an older temper.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A map for characters and a map for companions are both required.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The global scope is left out rather than written empty.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Every toggle name is written out again here.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A name missing from this list is caught where the fields are typed.",
    },
  ],
} as const satisfies Module
