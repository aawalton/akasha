import type { Command } from "@akasha/command-system/command"

export const temperInventorySnapshot = {
  id: "01a0603c-c1d9-7ef8-acb9-f19095076d6e",
  pageTypeSlug: "command",
  slug: "temper-inventory-snapshot",
  definition: "the command giving back a stored holdings snapshot as one whole record",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "<snapshot>", takes: "the snapshot read, by its page id or by its slug" },
    { said: "--latest", takes: "take the newest snapshot on the account rather than one named" },
    { said: "--out <path>", takes: "the file the record is written to" },
    { said: "--json", takes: "give the record on one line rather than indented" },
  ],
  helpNotes: [
    "the record stands whole in a data file beside the snapshot page, so nothing here rejoins pieces.",
    "the pieces a reading arrived in were rejoined before the snapshot landed.",
    "a snapshot is named or `--latest` is said, never both.",
    "`--latest` reads the newest reading on the account, ordered by when the reading was taken.",
    "a snapshot carrying no data file refuses the call rather than giving back an empty record.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A snapshot's whole record stands in one data file beside its page.",
    },
    {
      invariantKind: "departure",
      statement: "The pieces a reading arrived in were rejoined before the snapshot landed.",
    },
    {
      invariantKind: "departure",
      statement: "A snapshot is reached by its page id or by its slug.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming a snapshot and asking for the newest at once is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The newest snapshot is the one whose reading was taken most recently.",
    },
    {
      invariantKind: "departure",
      statement: "A snapshot carrying no data file refuses the call.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the page store over the network.",
    },
  ],
} as const satisfies Command
