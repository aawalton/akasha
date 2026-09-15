import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const questsTrace = {
  id: "01a0635f-391c-7cbf-b863-31301fafd0d9",
  type: "module",
  slug: "quests-trace",
  definition: "what the addon saw and what it decided, written down where it can be read back",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A menu is written down once however often the menu is read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The same decision twice running is written down once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Leaving the dialogue is written down even where the decision repeats.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An option code is written down beside the name the game gives that code.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Turning tracing on again clears the trace written before.",
    },
  ],
} as const satisfies Module
