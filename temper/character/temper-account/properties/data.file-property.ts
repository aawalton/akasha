import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const data = {
  id: "01a0b725-59a6-7789-9477-41dbe92b0231",
  type: "page-type/file-property",
  slug: "data",
  propertySlug: "data",
  definition: "the bytes one whole reading was written as",
  extensions: ["json"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A data file is kept byte for byte as the capture handed the bytes over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A data file has one whole JSON document rather than a piece of a document.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "A data file has raw bytes that no page has yet been written for.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "The rows a data file has are being modelled as the reading's own entries.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "A data file goes once a reader can build the whole reading from those entries.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
