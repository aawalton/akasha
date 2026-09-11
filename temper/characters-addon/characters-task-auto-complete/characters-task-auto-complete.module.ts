import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const charactersTaskAutoComplete = {
  id: "01a06306-f94f-700b-8c39-f425d7ea4a81",
  type: "module",
  slug: "characters-task-auto-complete",
  definition: "a task marked complete from the progress already read into the saved table",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A task naming no completion card is marked by hand alone.",
    },
    {
      invariantKind: "departure",
      statement: "A mark made before the day's reset counts as no mark.",
    },
    {
      invariantKind: "departure",
      statement:
        "A task scoped to every character is marked once every character has its own mark.",
    },
  ],
} as const satisfies Module
