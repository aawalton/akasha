import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const removedReadings = {
  id: "01a15913-8329-74fd-bd1a-dd16a45e62df",
  type: "page-type/file-property",
  slug: "removed-readings",
  propertySlug: "removed-readings",
  definition: "the captures taken out of a character's readings, one capture to a line",
  extensions: ["jsonl"],
  runsFileLength: false,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A line holds the removed line's id, its bar and the instant it was captured.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line is written as its reading is taken out, by the change taking it out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A capture named here never lands in the readings again.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-20T11:30:13.417Z",
  updatedAt: "2026-10-20T11:30:13.417Z",
} as const satisfies FileProperty
