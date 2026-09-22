import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherSettingsEquipment = {
  id: "01a06381-35cf-70c2-819c-ef562701572b",
  type: "page-type/module",
  slug: "watcher-settings-equipment",
  definition: "an account's target builds read from its pages and the gear those builds want",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Characters and companions come back ordered by the sort order each row carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row carrying no sort order comes back last.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row whose eso character id is no text is left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build page absent leaves the character with no target build hash.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build hash that is no text is taken as no build hash.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One build page is read once however many characters name that build.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A live build is read only where the live build hash is asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller may hand in the reader that reads the pages.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No build hash is decoded here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a page.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "Every page read here refuses.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "`@akasha/page-service` lists no `character-build` page type.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "`@akasha/page-service` lists no `companion-build` page type.",
    },
  ],
} as const satisfies Module
