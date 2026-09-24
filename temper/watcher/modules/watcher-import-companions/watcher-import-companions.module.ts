import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherImportCompanions = {
  id: "01a06381-35cf-7e59-9fb8-159808653255",
  type: "page-type/module",
  slug: "watcher-import-companions",
  definition: "the companion build hashes an addon saved, read back out and named, one page each",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The companions table is read out of the first account-wide table in the file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A companions table written as a lua array is read as a record whose first key is `1`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry with no build hash as text is left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A definition id no companion in the table carries is reported and left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hash that will not decode is reported against its companion and left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build name is the companion's name and the name of its base roles sorted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build with no base role is named for the `no-role` role.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which companions get a progress page is read off the companion table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every companion the game gives a definition id gets a page for the account.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A companion the saved file never mentions still gets a progress page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A progress page names its account by the address of the account page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A progress page names its companion by the address of the companion's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A progress page takes the companion's id as its slug and its name as its title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page here is written by `upsertPage` unless the caller states another writer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reported line reaches `console.log` unless the caller states another reporter.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A warning reaches `console.warn` unless the caller states another reporter.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A file holding no `Default` table is refused.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A file with no account-wide table is refused.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here opens the saved-variables file.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "The canonical hash a build reads back as reaches no page.",
    },
  ],
} as const satisfies Module
