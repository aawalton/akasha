import type { PageType } from "@akasha/pages/page-type"

export const temperInventoryChunk = {
  id: "01a05fcb-fd2f-718b-84ca-d9cdeb890706",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-inventory-chunk",
  definition: "one piece of the JSON a reading of an inventory was written as",
  pluralSlug: "temper-inventory-chunks",
  extends: ["page-type/temper-thing"],
  parts: [
    "number-property/byte-count",
    "number-property/chunk-index",
    "relation-property/inventory",
  ],
  properties: [
    { pageProperty: "text-property/account-page", required: true, many: false },
    { pageProperty: "relation-property/inventory", required: true, many: false },
    { pageProperty: "number-property/chunk-index", required: true, many: false },
    { pageProperty: "number-property/byte-count", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The pieces of one reading rejoin in the order the chunk indexes give.",
    },
    {
      invariantKind: "departure",
      statement: "A piece is divided on a byte count rather than on a JSON boundary.",
    },
    {
      invariantKind: "departure",
      statement: "The file a piece names has that piece's whole byte count.",
    },
    {
      invariantKind: "departure",
      statement: "The bytes a page here counts are in the reading's own data file.",
    },
  ],
  types: "ts",
} as const satisfies PageType
