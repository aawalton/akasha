import type { Module } from "@akasha/code-system/module"

export const scrollableMenuComboboxBaseNarrate = {
  id: "01a06275-c445-72e9-9f8e-71dcf7af7e19",
  pageTypeSlug: "module",
  slug: "scrollable-menu-combobox-base-narrate",
  definition: "the dispatch of a narration event to the addon callback and then to the reader",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each narration event has its own fixed callback argument signature.",
    },
    {
      invariantKind: "constraint",
      statement: "Narration is skipped entirely while the UI reader is off.",
    },
    {
      invariantKind: "departure",
      statement: "An event with no signature entry is dropped silently.",
    },
    {
      invariantKind: "constraint",
      statement: "The addon callback must return a string for anything to be spoken.",
    },
  ],
} as const satisfies Module
