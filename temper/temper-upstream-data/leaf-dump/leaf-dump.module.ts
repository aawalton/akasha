import type { Module } from "@akasha/code-system/module"

export const leafDump = {
  id: "01a06282-dfc3-7f7d-baf2-78aa71fd248e",
  pageTypeSlug: "module",
  slug: "leaf-dump",
  definition: "a nested table written out as one line per leaf, and the reading telling two apart",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A leaf is written as one line.",
    },
    {
      invariantKind: "departure",
      statement: "A leaf line holds the path to that leaf.",
    },
    {
      invariantKind: "departure",
      statement: "A leaf line holds the type of that leaf.",
    },
    {
      invariantKind: "departure",
      statement: "A leaf line holds the value of that leaf.",
    },
    {
      invariantKind: "departure",
      statement: "A table is walked in TypeScript by one set of rules.",
    },
    {
      invariantKind: "departure",
      statement: "A table is walked in Lua by the same rules.",
    },
    {
      invariantKind: "departure",
      statement: "A table's number keys are walked ahead of that table's word keys.",
    },
    {
      invariantKind: "departure",
      statement: "A table's number keys are walked in number order.",
    },
    {
      invariantKind: "departure",
      statement: "A number is written by the rule Lua writes that number by.",
    },
    {
      invariantKind: "departure",
      statement: "Two dumps are told apart leaf by leaf rather than by a digest.",
    },
    {
      invariantKind: "departure",
      statement: "Every leaf of the upstream dump is walked in path order.",
    },
    {
      invariantKind: "departure",
      statement: "Every leaf of the ported dump is walked in path order.",
    },
    {
      invariantKind: "departure",
      statement: "A leaf the upstream dump alone carries is named as upstream's own.",
    },
    {
      invariantKind: "departure",
      statement: "A leaf the ported dump alone carries is named as the port's own.",
    },
    {
      invariantKind: "departure",
      statement: "A leaf whose value differs is named apart from a leaf one dump alone carries.",
    },
    {
      invariantKind: "departure",
      statement: "An agreement says how many leaves agreed.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens a file.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes to a stream.",
    },
  ],
} as const satisfies Module
