import { expect, test } from "bun:test"
import type { ListingEntry } from "akasha/temper/economy/trading/listing/modules/listing-types/listing-types.module.code.ts"
import { assertSchemaMatchesPayload } from "akasha/temper/modules/assert-schema-matches-payload/assert-schema-matches-payload.module.code.ts"
import { z } from "zod"

const listingEntrySchema = z
  .object({
    itemLink: z.string(),
    itemName: z.string(),
    stackCount: z.number(),
    price: z.number(),
    pricePerUnit: z.number(),
    sellerName: z.string(),
    timeRemaining: z.number(),
    quality: z.number(),
    capturedAt: z.number(),
  })
  .strict()

test("the listing entry schema infers exactly the listing entry shape", () => {
  expect(assertSchemaMatchesPayload<typeof listingEntrySchema, ListingEntry>()).toBeUndefined()
})
