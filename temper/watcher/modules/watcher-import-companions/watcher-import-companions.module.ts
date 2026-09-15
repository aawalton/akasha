import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherImportCompanions = {
  id: "01a06381-35cf-7e59-9fb8-159808653255",
  type: "module",
  slug: "watcher-import-companions",
  definition: "the companion build hashes an addon saved, read back out and named, one page each",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The companions table is read out of the first account-wide table in the file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A companions table written as a lua array is read as a record whose first key is `1`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An entry with no build hash as text is left out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A definition id no companion in the table carries is reported and left out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A hash that will not decode is reported against its companion and left out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A build name is the companion's name and the name of its base roles sorted.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A build with no base role is named for the `no-role` role.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which companions get a progress page is read off the companion table.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every companion the game gives a definition id gets a page for the account.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A companion the saved file never mentions still gets a progress page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page here is written by `upsertPage` unless the caller states another writer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reported line reaches `console.log` unless the caller states another reporter.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A warning reaches `console.warn` unless the caller states another reporter.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A file holding no `Default` table is refused.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A file with no account-wide table is refused.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here opens the saved-variables file.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "The canonical hash a build reads back as reaches no page.",
    },
  ],
} as const satisfies Module
