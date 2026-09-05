import type { Command } from "@akasha/command-system/command"

export const temperInventoryKnowledge = {
  id: "01a0603c-c1d4-7896-b651-fa71ab764327",
  pageTypeSlug: "command",
  slug: "temper-inventory-knowledge",
  definition: "the command giving back what each character knows of recipes, motifs and scripts",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--char <id>", takes: "the one character reported" },
    {
      said: "--item-key <kind>:<args>",
      takes: "ask instead whether each character knows one recipe, motif or script",
    },
    {
      said: "--characters-path <path>",
      takes: "the saved-variables file the characters are read from",
    },
    { said: "--json", takes: "give the answer as JSON rather than as tab-separated rows" },
  ],
  helpNotes: [
    "an item key is `recipe:<resultItemId>`, `motif:<styleId>:<chapterId>` or `script:<scriptId>`.",
    "a motif chapter may be said as `master` rather than as a number.",
    "naming an item key turns the whole answer into who knows it.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Naming an item key turns the answer into who knows that item.",
    },
    {
      invariantKind: "departure",
      statement: "A key naming no kind this command holds refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "A character the capture does not hold refuses the call.",
    },
  ],
} as const satisfies Command
