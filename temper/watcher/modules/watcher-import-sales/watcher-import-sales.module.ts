import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherImportSales = {
  id: "01a06381-35cf-78ce-991d-bad7964dc536",
  type: "page-type/module",
  slug: "watcher-import-sales",
  definition: "a sales capture turned into one plan of sale page writes under an account page",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The sales capture reaches this module as text rather than as a path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sale entry with a key the sale shape does not name refuses the import.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sale entry with no sale id refuses the import.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sale entry with an empty sale id refuses the import.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sale entry omitting its item name, its price or its tax refuses the import.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names the key the sale it refused sat under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The net payout is the price less the tax.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sale's slug is the sale id in lower case.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every run of characters outside a-z and 0-9 becomes one dash.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A dash at either end of a sale's slug is dropped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sale id reducing to nothing takes the bare sale slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A saved-variables file with no Default table refuses the import.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A saved-variables file with no account-wide table refuses the import.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account-wide table whose sales are no table of sales refuses the import.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account-wide table naming no sales at all plans no sale write.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty plan asks the session for nothing and writes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The account page is written before the first sale is written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sale page names its account by the address of the account page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sale naming a guild but no guild id or no megaserver refuses the import.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sale naming no guild is written with no guild.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every guild the sales name is found or made after the account page and before the first sale.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A guild is found by the slug its megaserver and its name make, and made once where none is found.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A guild found with a guild id other than the sale's refuses the import before any sale is written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sale page names its guild by the address of the guild page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sale with no sold-at time is written with no sold-at value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sold-at time counted in seconds is written as a UTC timestamp.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the clock.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A sale write refuses before reaching a file.",
    },
  ],
} as const satisfies Module
