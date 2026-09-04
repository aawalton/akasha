import type { Command } from "@akasha/command-system/command"

export const temperInventoryExplain = {
  id: "01a0603c-c1d2-7c24-8d3d-7d9bb02c2690",
  pageTypeSlug: "command",
  slug: "temper-inventory-explain",
  definition: "the command tracing why an item resolves to the action the rules give it",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "<item>", takes: "the item traced, as a bare item id or as a game item link" },
    {
      said: "--inventory-path <path>",
      takes: "the saved-variables file the holdings are read from",
    },
    {
      said: "--characters-path <path>",
      takes: "the saved-variables file the characters are read from",
    },
    { said: "--char <id>", takes: "the character whose location the bag scan is scoped to" },
    { said: "--json", takes: "give the trace as JSON rather than as tab-separated rows" },
  ],
  helpNotes: [
    "the walk is reported in priority order, so the first rule that matches is the one that decides.",
    "naming no character lets the freshest scan win where one item id sits in more than one place.",
    "recipes, motifs and scripts each carry the knowledge facts the walk turned on.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The walk is reported in priority order.",
    },
    {
      invariantKind: "departure",
      statement: "The first rule that matches decides the action.",
    },
    {
      invariantKind: "departure",
      statement: "Naming no character lets the freshest scan win.",
    },
    {
      invariantKind: "departure",
      statement: "An item no scan holds refuses the call.",
    },
  ],
} as const satisfies Command
