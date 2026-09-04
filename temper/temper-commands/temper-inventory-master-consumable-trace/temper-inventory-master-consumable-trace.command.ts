import type { Command } from "@akasha/command-system/command"

export const temperInventoryMasterConsumableTrace = {
  id: "01a0603c-c1d5-7627-a06a-0889a2e23e44",
  pageTypeSlug: "command",
  slug: "temper-inventory-master-consumable-trace",
  definition: "the command giving back the addon's ring of consumable master-writ traces",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--inventory-path <path>", takes: "the saved-variables file the traces are read from" },
    { said: "--json", takes: "give the whole ring as JSON rather than as text" },
  ],
  helpNotes: [
    "alchemy, enchanting and provisioning each carry their own facts alongside the shared ones.",
    "each entry carries the resolve decision, the execute decision, and what the writ came to.",
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
      statement: "Each trace carries what the writ came to.",
    },
  ],
} as const satisfies Command
