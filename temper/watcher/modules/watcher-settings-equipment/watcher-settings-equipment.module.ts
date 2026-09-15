import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherSettingsEquipment = {
  id: "01a06381-35cf-70c2-819c-ef562701572b",
  type: "module",
  slug: "watcher-settings-equipment",
  definition: "an account's target builds read from its pages and the gear those builds want",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Characters and companions come back ordered by the sort order each row carries.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row carrying no sort order comes back last.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row whose eso character id is no text is left out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A build page absent leaves the character with no target build hash.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A build hash that is no text reads as no build hash.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One build page is read once however many characters name that build.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A live build is read only where the live build hash is asked for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller may hand in the reader that reads the pages.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No build hash is decoded here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes a page.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Every page read here refuses.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "`@akasha/page-service` lists no `character-build` page type.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "`@akasha/page-service` lists no `companion-build` page type.",
    },
  ],
} as const satisfies Module
