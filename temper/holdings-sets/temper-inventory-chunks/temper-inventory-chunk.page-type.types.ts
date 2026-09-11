import type { AccountPage } from "../../things/properties/account-page.text-property.types.ts"
import type { TemperThing } from "../../things/temper-thing.page-type.types.ts"
import type { ByteCount } from "./properties/byte-count.number-property.types.ts"
import type { ChunkIndex } from "./properties/chunk-index.number-property.types.ts"
import type { Inventory } from "./properties/inventory.relation-property.types.ts"

export type TemperInventoryChunk = TemperThing & {
  accountPage: AccountPage
  inventory: Inventory
  chunkIndex: ChunkIndex
  byteCount: ByteCount
}
