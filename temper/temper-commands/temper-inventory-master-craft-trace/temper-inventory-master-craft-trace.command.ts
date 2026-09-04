import type { Command } from "@akasha/command-system/command"

export const temperInventoryMasterCraftTrace = {
  id: "01a0603c-c1d5-708e-bb42-aa873ff7864f",
  pageTypeSlug: "command",
  slug: "temper-inventory-master-craft-trace",
  definition: "the command giving back the addon's ring of equipment master-writ craft traces",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--inventory-path <path>", takes: "the saved-variables file the traces are read from" },
    { said: "--json", takes: "give the whole ring as JSON rather than as text" },
  ],
  helpNotes: [
    "each entry carries the station context, the pattern it resolved, what it observed on verifying, and what the craft came to.",
    "the ring holds a bounded count and the oldest entry goes when a new one arrives.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The ring holds a bounded count of traces.",
    },
    {
      invariantKind: "departure",
      statement: "The oldest trace goes when a new one arrives.",
    },
    {
      invariantKind: "departure",
      statement: "Each trace carries what the craft came to.",
    },
  ],
} as const satisfies Command
