import { z } from "zod"
import type { TTCListingEntry } from "../ttc-listing-types/ttc-listing-types.module.code.ts"

type ValidatedListingEntry = Pick<
  TTCListingEntry,
  "PlayerID" | "GuildName" | "GuildKioskLocationID" | "ID"
> & {
  TradeAsset: Pick<TTCListingEntry["TradeAsset"], "UnitPrice" | "Amount"> & {
    Item: Pick<TTCListingEntry["TradeAsset"]["Item"], "Name" | "ID" | "QualityID">
  }
}

const ttcListingItemSchema = z
  .object({
    Name: z.string(),
    ID: z.number(),
    QualityID: z.number(),
  })
  .passthrough()

const ttcListingAssetSchema = z
  .object({
    UnitPrice: z.number().finite(),
    Amount: z.number(),
    Item: ttcListingItemSchema,
  })
  .passthrough()

export const ttcListingEntrySchema = z
  .object({
    TradeAsset: ttcListingAssetSchema,
    PlayerID: z.string(),
    GuildName: z.string(),
    GuildKioskLocationID: z.number(),
    ID: z.number(),
  })
  .passthrough() satisfies z.ZodType<ValidatedListingEntry>

const ttcListingPageSchema = z
  .object({
    TradeDetails: z.array(z.unknown()),
    CurrentPage: z.number().catch(1),
    TotalPageCount: z.number().catch(1),
    TotalMatchCount: z.number().catch(0),
  })
  .passthrough()

export const ttcListingResponseSchema = z
  .object({
    IsSuccess: z.boolean(),
    Code: z.number().catch(0),
    TradeListPageModel: ttcListingPageSchema.nullish(),
  })
  .passthrough()

function asTTCListingEntry(value: unknown): TTCListingEntry {
  return value as TTCListingEntry
}

export function parseValidListings(raw: unknown): readonly TTCListingEntry[] {
  const arr: readonly unknown[] = Array.isArray(raw) ? raw : []
  const valid: TTCListingEntry[] = []
  for (const item of arr) {
    if (ttcListingEntrySchema.safeParse(item).success) {
      valid.push(asTTCListingEntry(item))
    }
  }
  return valid
}
