import type { Command } from "@akasha/command-system/command"

export const temperCatalogList = {
  id: "01a06034-110c-7dfa-aceb-1292658c99c3",
  pageTypeSlug: "command",
  slug: "temper-catalog-list",
  definition: "the command naming every catalog domain the game's reference data is collected in",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [{ said: "--json", takes: "give the domains as JSON rather than as tab-separated rows" }],
  helpNotes: [
    "the domains are the ones the catalog addon collects under, and the addon's registry is what settles them.",
    "nothing is read off the workstation here: this names what may be collected rather than what has been.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The domains are read from what the catalog addon registers.",
    },
    {
      invariantKind: "departure",
      statement: "A domain is named once.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the game's saved variables.",
    },
  ],
} as const satisfies Command
