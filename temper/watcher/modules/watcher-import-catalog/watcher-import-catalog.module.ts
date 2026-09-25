import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherImportCatalog = {
  id: "01a06381-35cf-7af7-aa60-01ed66da5e3b",
  type: "page-type/module",
  slug: "watcher-import-catalog",
  definition:
    "a catalog capture's game build written onto every catalog domain page that capture has",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The account-wide table is read by the `temper-catalog-host` domain.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every account the saved variables name is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every account captures the same game.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A catalog domain page names no account.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each catalog domain page is given the newest capture holding that domain.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The newest capture has the highest manifestApiVersion, then the highest apiVersion by number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Of captures equally new, the first the saved variables name is taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The domain keys are the list `@akasha/temper-catalog-core` declares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A domain page is reached by the slug its saved-variables key kebab-cases into.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A capture naming no apiVersion or manifestApiVersion changes no page.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A capture with no catalog domain changes no page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A domain key no page has is reported and the other domains still change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Saved variables with no readable account-wide table raise an error.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page one run reaches is given the same capture instant.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller may hand in the clock.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller may hand in the patch that changes a page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller may hand in the reporter.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here opens the saved-variables file.",
    },
  ],
} as const satisfies Module
