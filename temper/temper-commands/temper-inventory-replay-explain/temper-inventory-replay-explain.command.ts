import type { Command } from "@akasha/command-system/command"

export const temperInventoryReplayExplain = {
  id: "01a0603c-c1d6-752a-86f1-3c9eca4b7916",
  pageTypeSlug: "command",
  slug: "temper-inventory-replay-explain",
  definition: "the command giving back the addon's last stored explain trace",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--inventory-path <path>", takes: "the saved-variables file the trace is read from" },
    {
      said: "--itemlink <link>",
      takes: "give the trace back only where its item link is this one",
    },
  ],
  helpNotes: [
    "the trace is the one the addon stored, so nothing is evaluated again here.",
    "naming an item link the stored trace does not carry refuses the call by naming what it does carry.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The trace given back is the one the addon stored.",
    },
    {
      invariantKind: "departure",
      statement: "An item link the stored trace does not carry refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names the item the stored trace carries.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here evaluates a rule.",
    },
  ],
} as const satisfies Command
