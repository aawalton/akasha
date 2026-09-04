import type { Command } from "@akasha/command-system/command"

export const temperErrorsList = {
  id: "01a0603c-c1cd-7e91-9eb8-0b6cf8d8b9e5",
  pageTypeSlug: "command",
  slug: "temper-errors-list",
  definition: "the command naming the game's Lua errors the errors addon captured",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--errors-path <path>", takes: "the saved-variables file the errors are read from" },
    { said: "--json", takes: "give each error as JSON rather than as tab-separated rows" },
    { said: "--include-stale", takes: "show the entries left behind by an older session too" },
    { said: "--all", takes: "the same as `--include-stale`, which it is a second spelling of" },
    {
      said: "--stale-after-hours <n>",
      takes: "how far behind the log frontier an entry is before it counts as stale",
    },
  ],
  helpNotes: [
    "an entry more than the stale window behind the newest log line is residue from a session already gone.",
    "such an entry is left out unless `--include-stale` is said, and shown with its liveness where it is.",
    "how many stale entries were left out is said whether or not any were shown.",
    "the path defaults to the errors addon's saved variables in the workstation's live game install.",
    "a capture holding no entry at all is refused, since a clean run and an unread one read alike.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An entry is stale where it falls more than the window behind the log frontier.",
    },
    {
      invariantKind: "departure",
      statement: "A stale entry is left out unless the call asks for stale entries.",
    },
    {
      invariantKind: "departure",
      statement: "A stale entry shown carries its liveness.",
    },
    {
      invariantKind: "departure",
      statement: "How many stale entries were left out is said rather than left to be counted.",
    },
    {
      invariantKind: "departure",
      statement: "A capture holding no entry is refused rather than reported as a clean run.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the game.",
    },
  ],
} as const satisfies Command
