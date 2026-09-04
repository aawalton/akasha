const ITEM_ID_FIELD_INDEX = 0
const SUB_TYPE_FIELD_INDEX = 1
const LEVEL_FIELD_INDEX = 2
const ENCHANT_ID_FIELD_INDEX = 3
const ENCHANT_SUB_TYPE_FIELD_INDEX = 4
const ENCHANT_LEVEL_FIELD_INDEX = 5
const TRAIT_TYPE_FIELD_INDEX = 6
const FLAGS_FIELD_INDEX = 14
const STYLE_FIELD_INDEX = 15
const CRAFTED_FIELD_INDEX = 16
const BOUND_FIELD_INDEX = 17
const STOLEN_FIELD_INDEX = 18
const CHARGES_FIELD_INDEX = 19
const POTION_DATA_FIELD_INDEX = 20

const MINIMUM_FIELD_COUNT = 21

export interface ParsedItemLink {
  itemId: number
  subType: number
  level: number
  enchantId: number
  enchantSubType: number
  enchantLevel: number
  traitType: number
  flags: number
  style: number
  crafted: boolean
  bound: boolean
  stolen: boolean
  charges: number
  potionData: number
}

function extractItemLinkPayload(link: string): string | null {
  const markers = ["|H0:item:", "|H1:item:"]
  for (const marker of markers) {
    const markerIndex = link.indexOf(marker)
    if (markerIndex === -1) {
      continue
    }
    const fieldsStart = markerIndex + marker.length
    const payloadEnd = link.indexOf("|", fieldsStart)
    if (payloadEnd === -1 || payloadEnd === fieldsStart) {
      return null
    }
    return link.substring(fieldsStart, payloadEnd)
  }
  return null
}

export function parseItemLink(link: string): ParsedItemLink | null {
  if (link === "" || link.trim() === "") {
    return null
  }

  const payload = extractItemLinkPayload(link)
  if (payload === null) {
    return null
  }

  const fields = payload.split(":")

  if (fields.length < MINIMUM_FIELD_COUNT) {
    return null
  }

  const at = (i: number): string => {
    const v = fields[i]
    if (v === undefined) throw new Error(`item link field ${i} missing after length check`)
    return v
  }

  const intAt = (i: number): number => {
    const n = parseInt(at(i), 10)
    return Number.isNaN(n) ? 0 : n
  }

  return {
    itemId: intAt(ITEM_ID_FIELD_INDEX),
    subType: intAt(SUB_TYPE_FIELD_INDEX),
    level: intAt(LEVEL_FIELD_INDEX),
    enchantId: intAt(ENCHANT_ID_FIELD_INDEX),
    enchantSubType: intAt(ENCHANT_SUB_TYPE_FIELD_INDEX),
    enchantLevel: intAt(ENCHANT_LEVEL_FIELD_INDEX),
    traitType: intAt(TRAIT_TYPE_FIELD_INDEX),
    flags: intAt(FLAGS_FIELD_INDEX),
    style: intAt(STYLE_FIELD_INDEX),
    crafted: at(CRAFTED_FIELD_INDEX) === "1",
    bound: at(BOUND_FIELD_INDEX) === "1",
    stolen: at(STOLEN_FIELD_INDEX) === "1",
    charges: intAt(CHARGES_FIELD_INDEX),
    potionData: intAt(POTION_DATA_FIELD_INDEX),
  }
}
