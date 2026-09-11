import type { ByteCount } from "akasha/temper/holdings-sets/temper-inventory-chunks/properties/byte-count.number-property.types.ts"
import type { ChunkIndex } from "akasha/temper/holdings-sets/temper-inventory-chunks/properties/chunk-index.number-property.types.ts"
import type { Inventory } from "akasha/temper/holdings-sets/temper-inventory-chunks/properties/inventory.relation-property.types.ts"
import type { AccountPage } from "akasha/temper/things/properties/account-page.text-property.types.ts"
import type { TemperThing } from "akasha/temper/things/temper-thing.page-type.types.ts"

export type TemperInventoryChunk = TemperThing & {
  accountPage: AccountPage
  inventory: Inventory
  chunkIndex: ChunkIndex
  byteCount: ByteCount
}
