import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const catalogCapture = {
  id: "01a15534-88cc-7d06-aa5f-8a7b97cb4550",
  type: "page-type/file-property",
  slug: "catalog-capture",
  propertySlug: "catalog-capture",
  definition: "what the game held for a catalog domain when the catalog addon last collected it",
  extensions: ["json"],
  runsFileLength: false,
  generated: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The watcher writes this file from the catalog saved variables.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The file is the table the addon collected, kept as JSON.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A generator reading a catalog domain reads it here rather than in the game.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The file is kept outside the commit.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No author writes this file by hand.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-19T17:27:48.683Z",
  updatedAt: "2026-10-19T17:27:48.683Z",
} as const satisfies FileProperty
