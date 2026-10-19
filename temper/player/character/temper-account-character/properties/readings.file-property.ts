import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const readings = {
  id: "01a1558d-7f40-7d37-a329-70c6cbc0cda7",
  type: "page-type/file-property",
  slug: "readings",
  propertySlug: "readings",
  definition: "the readings the game gave of a character's build, one result to a line",
  extensions: ["jsonl"],
  runsFileLength: false,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A line holds its result's hash, the character, the build, the bar and the reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A result lands once, however often the game reports it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No author writes a line here by hand.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-19T19:04:58.943Z",
  updatedAt: "2026-10-19T19:04:58.943Z",
} as const satisfies FileProperty
