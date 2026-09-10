import type { AccountPage } from "../../things/properties/account-page.text-property.ts"
import type { TemperThing } from "../../things/temper-thing.page-type.types.ts"
import type { ByteCount } from "./properties/byte-count.number-property.ts"
import type { ChunkIndex } from "./properties/chunk-index.number-property.ts"
import type { Inventory } from "./properties/inventory.relation-property.ts"

export type TemperInventoryChunk = TemperThing & {
  accountPage: AccountPage
  inventory: Inventory
  chunkIndex: ChunkIndex
  byteCount: ByteCount
}
