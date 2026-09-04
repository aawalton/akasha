import type { Command } from "@akasha/command-system/command"

export const temperInventoryBankTrace = {
  id: "01a0603c-c1cf-7944-91f2-3c13783517fa",
  pageTypeSlug: "command",
  slug: "temper-inventory-bank-trace",
  definition: "the command giving back the timing trace from the addon's last banking session",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--inventory-path <path>", takes: "the saved-variables file the trace is read from" },
    { said: "--json", takes: "give the whole trace as JSON rather than as text" },
  ],
  helpNotes: [
    "each phase carries its own time bracket, the count of moves it made, and what the net-worth walk cost.",
    "a file holding no trace is refused rather than read as an empty one.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The trace read is the most recent one.",
    },
    {
      invariantKind: "departure",
      statement: "Each phase carries its own time bracket.",
    },
    {
      invariantKind: "departure",
      statement: "A file holding no trace refuses the call.",
    },
  ],
} as const satisfies Command
