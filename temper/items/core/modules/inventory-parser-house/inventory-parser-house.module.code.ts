import { asRecord } from "akasha/code/type/narrowing/modules/as-record/as-record.module.code.ts"
import { parseNumber } from "akasha/code/type/narrowing/modules/parse-number/parse-number.module.code.ts"
import { parseString } from "akasha/code/type/narrowing/modules/parse-string/parse-string.module.code.ts"
import { cleanItemName } from "akasha/temper/items/core/modules/inventory-parser-name/inventory-parser-name.module.code.ts"
import type {
  HouseData,
  HouseFurnishingLimit,
  PlacedFurnishingData,
} from "akasha/temper/items/core/modules/inventory-types/inventory-types.module.code.ts"
import { parseItemLink } from "akasha/temper/items/core/modules/item-link-parser/item-link-parser.module.code.ts"

export function parsePlacedFurnishing(raw: unknown): PlacedFurnishingData | undefined {
  const f = asRecord(raw)
  if (!f) return undefined

  const parsed: PlacedFurnishingData = {
    itemName: cleanItemName(parseString(f.itemName)),
    quality: parseNumber(f.quality) ?? 0,
    itemLink: parseString(f.itemLink),
    collectibleLink: parseString(f.collectibleLink),
  }
  const furnishingLimitType = parseNumber(f.furnishingLimitType)
  if (furnishingLimitType !== undefined) parsed.furnishingLimitType = furnishingLimitType

  if (parsed.itemLink !== "" && !(parseItemLink(parsed.itemLink)?.bound ?? false)) {
    const saleAvg = parseNumber(f.saleAvg)
    const minPrice = parseNumber(f.minPrice)
    const amountCount = parseNumber(f.amountCount)
    const saleAmountCount = parseNumber(f.saleAmountCount)
    const suggestedPrice = parseNumber(f.suggestedPrice)
    const marketValue = parseNumber(f.marketValue) ?? parseNumber(f.estimatedValue)

    if (saleAvg !== undefined) parsed.saleAvg = saleAvg
    if (minPrice !== undefined) parsed.minPrice = minPrice
    if (amountCount !== undefined) parsed.amountCount = amountCount
    if (saleAmountCount !== undefined) parsed.saleAmountCount = saleAmountCount
    if (suggestedPrice !== undefined) parsed.suggestedPrice = suggestedPrice
    if (marketValue !== undefined) parsed.marketValue = marketValue
  }

  return parsed
}

export function parseHouse(raw: unknown): HouseData | undefined {
  const house = asRecord(raw)
  if (!house) return undefined
  const collectibleId = parseNumber(house.collectibleId)
  const houseId = parseNumber(house.houseId)
  if (collectibleId === undefined || houseId === undefined) return undefined
  const furnishingLimits: Record<number, HouseFurnishingLimit> = {}
  for (const [key, value] of Object.entries(asRecord(house.furnishingLimits) ?? {})) {
    const limitType = Number(key)
    const one = asRecord(value)
    if (Number.isNaN(limitType) || !one) continue
    const limit = parseNumber(one.limit)
    const placed = parseNumber(one.placed)
    if (limit === undefined || placed === undefined) continue
    furnishingLimits[limitType] = { limit, placed }
  }
  return { collectibleId, houseId, furnishingLimits }
}
