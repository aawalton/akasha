import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherImportCatalog = {
  id: "01a06381-35cf-7af7-aa60-01ed66da5e3b",
  type: "module",
  slug: "watcher-import-catalog",
  definition:
    "a catalog capture's game build written onto every catalog domain page that capture has",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The account-wide table is read by the `temper-catalog-host` domain.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The account a capture is read for is the first the saved variables name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The domain keys are the list `@akasha/temper-catalog-core` declares.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A domain page is reached by the slug its saved-variables key kebab-cases into.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A capture naming no apiVersion or manifestApiVersion changes no page.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A capture with no catalog domain changes no page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A domain key no page has is reported and the other domains still change.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Saved variables with no readable account-wide table raise an error.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every page one run reaches is given the same capture instant.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller may hand in the clock.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller may hand in the patch that changes a page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller may hand in the reporter.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here opens the saved-variables file.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A capture for a second account is read by nothing here.",
    },
  ],
} as const satisfies Module
