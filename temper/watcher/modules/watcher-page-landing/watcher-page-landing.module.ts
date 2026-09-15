import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherPageLanding = {
  id: "01a06381-35cf-745a-9478-62105eeced57",
  type: "module",
  slug: "watcher-page-landing",
  definition: "the shared half of landing a page and the jsonl rows beside it from the watcher",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every landing records its commit against one writer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That writer is a name and an address.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path sits under a folder named for the slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page path ends in the page type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A jsonl path ends in the property that has the rows.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file kept beside a page takes the page path with the ending swapped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path that is no page file gives back nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every slug of one page type is asked of the pages in one read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A slug the pages placed no file for is refused rather than passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A read naming no slug leaves the pages unasked.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The export a page body declares is named for the slug in lower camel case.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The type a page body satisfies is the page type slug in upper camel case.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The import a page body opens with names the page type file from the root.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page body ends with a newline.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A jsonl body is the lines joined by newlines with a newline after the last.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A jsonl body with no line is empty rather than one newline.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A blank line in a jsonl body is dropped on the way back out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line that is no JSON reads back as empty text for every key.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line goes in ahead of the first line marked later than it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key told nothing is left out of a jsonl line rather than written as null.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Four attempts are made at the most.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only an attempt after the first waits.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal names how many attempts were spent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller may hand in the calls that reach the store.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller may hand in the call that waits between attempts.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here knows the properties any one page type carries.",
    },
  ],
} as const satisfies Module
