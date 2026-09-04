import type { Command } from "@akasha/command-system/command"

export const temperInventoryMasterWritProbe = {
  id: "01a0603c-c1d5-7ba7-b43c-d88542cae62f",
  pageTypeSlug: "command",
  slug: "temper-inventory-master-writ-probe",
  definition: "the command giving back the addon's last master-writ journal capture",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--inventory-path <path>", takes: "the saved-variables file the capture is read from" },
    { said: "--json", takes: "give the whole capture as JSON rather than as text" },
  ],
  helpNotes: [
    "every step and every condition is carried with the raw fields the game gave for it.",
    "the capture is taken in the game by a slash command rather than here.",
    "a file holding no capture is refused rather than read as an empty one.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The capture read is the most recent one.",
    },
    {
      invariantKind: "departure",
      statement: "Every step carries the raw fields the game gave.",
    },
    {
      invariantKind: "departure",
      statement: "A file holding no capture refuses the call.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here takes a capture.",
    },
  ],
} as const satisfies Command
