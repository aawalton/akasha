import { parseItemLink } from "@akasha/temper-items-core/item-link-parser"

export const ITEMTYPE_WEAPON = 1
export const ITEMTYPE_ARMOR = 2
export const ITEMTYPE_FOOD = 4
export const ITEMTYPE_POTION = 7
export const ITEMTYPE_DRINK = 12
export const ITEMTYPE_GLYPH_WEAPON = 20
export const ITEMTYPE_GLYPH_ARMOR = 21
export const ITEMTYPE_GLYPH_JEWELRY = 26
export const ITEMTYPE_POISON = 30

interface ItemPriceKeyInput {
  readonly itemLink: string
  readonly itemType: number
  readonly hasDifferentQualities: boolean
}

export function getItemPriceKey(input: ItemPriceKeyInput): string {
  const parsed = parseItemLink(input.itemLink)
  if (parsed === null) {
    return input.itemLink
  }

  const itemId = parsed.itemId
  const data4 = parsed.subType
  const data23 = parsed.potionData
  const trait = parsed.traitType
  const level = parsed.level
  const cp = parsed.level

  if (input.itemType === ITEMTYPE_WEAPON || input.itemType === ITEMTYPE_ARMOR) {
    return `${itemId},${data4},${trait},${level},${cp}`
  }

  if (input.itemType === ITEMTYPE_POISON || input.itemType === ITEMTYPE_POTION) {
    return `${itemId},${level},${cp},${data23}`
  }

  if (input.hasDifferentQualities) {
    return `${itemId},${data4}`
  }

  return `${itemId}`
}

type SellPriceSource = "last-sold" | "ttc" | "vendor-multiple"

interface SuggestSellPriceInput {
  readonly lastSoldPpu?: number
  readonly ttcMarketPpu?: number
  readonly vendorValue: number
}

interface SuggestedSellPrice {
  readonly pricePerUnit: number
  readonly source: SellPriceSource
}

const VENDOR_PRICE_MULTIPLE = 3

export function suggestSellPrice(input: SuggestSellPriceInput): SuggestedSellPrice {
  if (input.lastSoldPpu !== undefined && input.lastSoldPpu !== 0) {
    return { pricePerUnit: input.lastSoldPpu, source: "last-sold" }
  }

  if (input.ttcMarketPpu !== undefined && input.ttcMarketPpu !== 0) {
    return { pricePerUnit: input.ttcMarketPpu, source: "ttc" }
  }

  return {
    pricePerUnit: input.vendorValue * VENDOR_PRICE_MULTIPLE,
    source: "vendor-multiple",
  }
}
