import type { Module } from "@akasha/code-system/module"

export const watcherImportSales = {
  id: "01a06381-35cf-78ce-991d-bad7964dc536",
  pageTypeSlug: "module",
  slug: "watcher-import-sales",
  definition: "a sales capture read into one plan of sale page writes under an account page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The sales capture reaches this module as text rather than as a path.",
    },
    {
      invariantKind: "departure",
      statement: "A sale entry carrying a key the sale shape does not name is dropped.",
    },
    {
      invariantKind: "departure",
      statement: "A sale entry with no sale id is dropped.",
    },
    {
      invariantKind: "departure",
      statement: "A sale entry with an empty sale id is dropped.",
    },
    {
      invariantKind: "departure",
      statement: "A price or a tax the entry omits reads as zero.",
    },
    {
      invariantKind: "departure",
      statement: "The net payout is the price less the tax.",
    },
    {
      invariantKind: "departure",
      statement: "A sale's slug is the sale id in lower case.",
    },
    {
      invariantKind: "departure",
      statement: "Every run of characters outside a-z and 0-9 becomes one dash.",
    },
    {
      invariantKind: "departure",
      statement: "A dash at either end of a sale's slug is dropped.",
    },
    {
      invariantKind: "departure",
      statement: "A sale id reducing to nothing takes the bare sale slug.",
    },
    {
      invariantKind: "departure",
      statement: "A saved-variables file holding no account-wide table plans no sale write.",
    },
    {
      invariantKind: "departure",
      statement: "An empty plan asks the session for nothing and writes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The account page is written before the first sale is written.",
    },
    {
      invariantKind: "departure",
      statement: "A sale carrying no sold-at time is written with no sold-at value.",
    },
    {
      invariantKind: "departure",
      statement: "A sold-at time counted in seconds is written as a UTC timestamp.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the clock.",
    },
    {
      invariantKind: "gap",
      statement: "A sale write refuses before reaching a file.",
    },
  ],
} as const satisfies Module
