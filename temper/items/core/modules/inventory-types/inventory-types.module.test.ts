import { expect, test } from "bun:test"
import type {
  InventoryDatabase,
  inventoryDatabaseSchema,
} from "akasha/temper/items/core/modules/inventory-types/inventory-types.module.code.ts"
import { assertSchemaMatchesPayload } from "akasha/temper/modules/assert-schema-matches-payload/assert-schema-matches-payload.module.code.ts"

test("the inventory database schema infers exactly the inventory database shape", () => {
  expect(
    assertSchemaMatchesPayload<typeof inventoryDatabaseSchema, InventoryDatabase>()
  ).toBeUndefined()
})
