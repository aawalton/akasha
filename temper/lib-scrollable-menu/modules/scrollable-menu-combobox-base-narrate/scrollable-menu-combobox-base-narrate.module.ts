import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuComboboxBaseNarrate = {
  id: "01a06275-c445-72e9-9f8e-71dcf7af7e19",
  type: "page-type/module",
  slug: "scrollable-menu-combobox-base-narrate",
  definition: "the dispatch of a narration event to the addon callback and then to the reader",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each narration event has its own fixed callback argument signature.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Narration is skipped entirely while the UI reader is off.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An event with no signature entry is dropped silently.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The addon callback must return a string for anything to be spoken.",
    },
  ],
} as const satisfies Module
