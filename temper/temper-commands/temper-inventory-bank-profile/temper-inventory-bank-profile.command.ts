import type { Command } from "@akasha/command-system/command"

export const temperInventoryBankProfile = {
  id: "01a0603c-c1ce-74dd-8c14-84a8dc5bd418",
  pageTypeSlug: "command",
  slug: "temper-inventory-bank-profile",
  definition: "the command giving back the profiler capture from the addon's last banking session",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--inventory-path <path>", takes: "the saved-variables file the capture is read from" },
    { said: "--json", takes: "give the whole capture as JSON rather than as text" },
  ],
  helpNotes: [
    "the capture rolls up cost by source and names the costliest closures by inclusive and by self time.",
    "the total time in Lua is reported beside the time spent collecting garbage.",
    "a file holding no capture is refused rather than read as an empty one.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The capture read is the most recent one.",
    },
    {
      invariantKind: "departure",
      statement: "Time in Lua is reported apart from time collecting garbage.",
    },
    {
      invariantKind: "departure",
      statement: "A file holding no capture refuses the call.",
    },
  ],
} as const satisfies Command
