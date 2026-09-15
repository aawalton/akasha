import type { ByteCount } from "akasha/temper/holdings/temper-inventory-chunk/properties/byte-count.number-property.types.ts"
import type { ChunkIndex } from "akasha/temper/holdings/temper-inventory-chunk/properties/chunk-index.number-property.types.ts"
import type { Inventory } from "akasha/temper/holdings/temper-inventory-chunk/properties/inventory.relation-property.types.ts"
import type { AccountPage } from "akasha/temper/thing/properties/account-page.text-property.types.ts"
import type { TemperThing } from "akasha/temper/thing/temper-thing.page-type.types.ts"

export type TemperInventoryChunk = TemperThing & {
  accountPage: AccountPage
  inventory: Inventory
  chunkIndex: ChunkIndex
  byteCount: ByteCount
}
