import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionPoiProgress = {
  id: "01a06358-4f7c-7af7-948b-481d215df05c",
  pageTypeSlug: "module",
  slug: "completion-poi-progress",
  definition: "the points of interest a character has found, counted by zone and by kind",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The zone catalog arrives as an argument rather than as an imported table.",
    },
    {
      invariantKind: "departure",
      statement: "A kind is the places of a zone sharing a point of interest type.",
    },
    {
      invariantKind: "departure",
      statement: "The order of the places is the order the zone states.",
    },
    {
      invariantKind: "departure",
      statement: "A wayshrine of Cyrodiil a character has not found is left out of the count.",
    },
    {
      invariantKind: "departure",
      statement: "A kind left holding no place is left out of its zone.",
    },
    {
      invariantKind: "departure",
      statement: "A character never read is left out.",
    },
    {
      invariantKind: "constraint",
      statement: "An empty catalog answers an empty progress.",
    },
  ],
} as const satisfies Module
