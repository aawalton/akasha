import type { Command } from "@akasha/command-system/command"

export const temperCommunityAddonUpdate = {
  id: "01a0603c-c1cd-7290-b641-179d70de4bc2",
  pageTypeSlug: "command",
  slug: "temper-community-addon-update",
  definition:
    "the command installing the published updates for the third-party game addons already here",
  code: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    { said: "--only <dir>", takes: "restrict the run to one addon folder, said once per folder" },
    {
      said: "--force",
      takes: "download and install every matched addon rather than only the outdated ones",
    },
    { said: "--addons-dir <path>", takes: "the game's addon directory read and written" },
    { said: "--repo-root <path>", takes: "the checkout the deploy-owned roster is read from" },
    { said: "--json", takes: "give the outcome as JSON rather than as tab-separated rows" },
  ],
  helpNotes: [
    "an `--only` folder that is no installable addon is refused by name.",
    "each addon is downloaded, verified and extracted, and one that fails leaves the rest reported.",
    "a folder the deploy pipeline owns is never touched here.",
    "what would be updated is named by the listing command rather than by a run of this one.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only the outdated addons are updated unless the call forces every one.",
    },
    {
      invariantKind: "departure",
      statement: "An `--only` folder that is no installable addon is refused by name.",
    },
    {
      invariantKind: "departure",
      statement: "One addon that fails does not stop the rest.",
    },
    {
      invariantKind: "departure",
      statement: "Every addon that failed is named in the refusal rather than counted alone.",
    },
    {
      invariantKind: "departure",
      statement: "A folder the deploy pipeline owns is never touched.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reports a change without making it.",
    },
  ],
} as const satisfies Command
