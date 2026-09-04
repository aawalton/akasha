import type { Module } from "@akasha/code-system/module"

export const watcherPageLanding = {
  id: "01a06381-35cf-745a-9478-62105eeced57",
  pageTypeSlug: "module",
  slug: "watcher-page-landing",
  definition: "the shared half of landing a page and the jsonl rows beside it from the watcher",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every landing records its commit against one writer.",
    },
    {
      invariantKind: "departure",
      statement: "That writer is a name and an address.",
    },
    {
      invariantKind: "departure",
      statement: "A path sits under a folder named for the slug.",
    },
    {
      invariantKind: "departure",
      statement: "A page path ends in the page type.",
    },
    {
      invariantKind: "departure",
      statement: "A jsonl path ends in the property that holds the rows.",
    },
    {
      invariantKind: "departure",
      statement: "The export a page body declares is named for the slug in lower camel case.",
    },
    {
      invariantKind: "departure",
      statement: "The type a page body satisfies is the page type slug in upper camel case.",
    },
    {
      invariantKind: "departure",
      statement: "The import a page body opens with is derived from the page type slug.",
    },
    {
      invariantKind: "departure",
      statement: "A page body ends with a newline.",
    },
    {
      invariantKind: "departure",
      statement: "A jsonl body is the lines joined by newlines with a newline after the last.",
    },
    {
      invariantKind: "departure",
      statement: "A jsonl body holding no line is empty rather than one newline.",
    },
    {
      invariantKind: "departure",
      statement: "A blank line in a jsonl body is dropped on the way back out.",
    },
    {
      invariantKind: "departure",
      statement: "A line that is no JSON reads back as empty text for every key.",
    },
    {
      invariantKind: "departure",
      statement: "A line goes in ahead of the first line marked later than it.",
    },
    {
      invariantKind: "departure",
      statement: "A key told nothing is left out of a jsonl line rather than written as null.",
    },
    {
      invariantKind: "constraint",
      statement: "Four attempts are made at the most.",
    },
    {
      invariantKind: "departure",
      statement: "Only an attempt after the first waits.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names how many attempts were spent.",
    },
    {
      invariantKind: "departure",
      statement: "A caller may hand in what reaches the store.",
    },
    {
      invariantKind: "departure",
      statement: "A caller may hand in what waits between attempts.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows what any one page type carries.",
    },
  ],
} as const satisfies Module
