import type { Command } from "@akasha/command-system/command"

export const temperInventoryRules = {
  id: "01a0603c-c1d9-7bdc-8aab-dcc717f3de9b",
  pageTypeSlug: "command",
  slug: "temper-inventory-rules",
  definition: "the command giving back the compiled rule configuration the addon carries",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    {
      said: "--inventory-path <path>",
      takes: "the saved-variables file the configuration is read from",
    },
    {
      said: "--section <section>",
      takes: "which section is given back: rules, consumables, priority or all",
    },
    { said: "--json", takes: "give the section as JSON rather than as tab-separated rows" },
  ],
  helpNotes: [
    "the configuration read is what the addon compiled rather than what the rules were written as.",
    "naming no section gives back every one.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "What is read is the compiled configuration.",
    },
    {
      invariantKind: "departure",
      statement: "Naming no section gives back every section.",
    },
    {
      invariantKind: "departure",
      statement: "A section the configuration does not hold refuses the call.",
    },
  ],
} as const satisfies Command
