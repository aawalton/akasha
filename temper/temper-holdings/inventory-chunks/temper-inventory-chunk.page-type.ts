import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperThing } from "../../temper-things/temper-thing.page-type.ts"
import type { ByteCount } from "./properties/byte-count.number-property.ts"
import type { ChunkIndex } from "./properties/chunk-index.number-property.ts"
import type { Inventory } from "./properties/inventory.relation-property.ts"

export type TemperInventoryChunk = TemperThing & {
  chunkIndex: ChunkIndex
  inventory: Inventory
  byteCount: ByteCount
}

export const temperInventoryChunk = {
  id: "01a05fcb-fd2f-718b-84ca-d9cdeb890706",
  pageTypeSlug: "page-type",
  slug: "temper-inventory-chunk",
  definition: "one piece of the JSON a reading of an inventory was written as",
  pluralSlug: "temper-inventory-chunks",
  extendsSlug: ["page-type/temper-thing"],
  partSlugs: [
    "number-property/byte-count",
    "number-property/chunk-index",
    "relation-property/inventory",
  ],
  properties: [
    { pagePropertySlug: "account-page", required: true, many: false },
    { pagePropertySlug: "inventory", required: true, many: false },
    { pagePropertySlug: "chunk-index", required: true, many: false },
    { pagePropertySlug: "byte-count", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A slug opens with `at-` ahead of the moment the reading was taken.",
    },
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
      statement: "The file a piece names carries that piece's whole byte count.",
    },
    {
      invariantKind: "departure",
      statement: "The bytes a page here counts stand in the reading's own data file.",
    },
  ],
} as const satisfies PageType
