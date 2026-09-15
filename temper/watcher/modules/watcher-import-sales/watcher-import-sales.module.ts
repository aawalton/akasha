import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherImportSales = {
  id: "01a06381-35cf-78ce-991d-bad7964dc536",
  type: "module",
  slug: "watcher-import-sales",
  definition: "a sales capture read into one plan of sale page writes under an account page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The sales capture reaches this module as text rather than as a path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sale entry with a key the sale shape does not name refuses the import.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sale entry with no sale id refuses the import.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sale entry with an empty sale id refuses the import.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sale entry omitting its item name, its price or its tax refuses the import.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal names the key the sale it refused sat under.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The net payout is the price less the tax.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sale's slug is the sale id in lower case.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every run of characters outside a-z and 0-9 becomes one dash.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A dash at either end of a sale's slug is dropped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sale id reducing to nothing takes the bare sale slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A saved-variables file with no Default table refuses the import.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A saved-variables file with no account-wide table refuses the import.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An account-wide table whose sales are no table of sales refuses the import.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An account-wide table naming no sales at all plans no sale write.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An empty plan asks the session for nothing and writes nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The account page is written before the first sale is written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sale with no sold-at time is written with no sold-at value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sold-at time counted in seconds is written as a UTC timestamp.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reaches the clock.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A sale write refuses before reaching a file.",
    },
  ],
} as const satisfies Module
