import type { Module } from "@akasha/code-system/module"

export const questsTrace = {
  id: "01a0635f-391c-7cbf-b863-31301fafd0d9",
  pageTypeSlug: "module",
  slug: "quests-trace",
  definition: "what the addon saw and what it decided, written down where it can be read back",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A menu is written down once however often the menu is read.",
    },
    {
      invariantKind: "departure",
      statement: "The same decision twice running is written down once.",
    },
    {
      invariantKind: "departure",
      statement: "Leaving the dialogue is written down even where the decision repeats.",
    },
    {
      invariantKind: "departure",
      statement: "An option code is written down beside the name the game gives that code.",
    },
    {
      invariantKind: "departure",
      statement: "Turning tracing on again clears what was written before.",
    },
  ],
} as const satisfies Module
