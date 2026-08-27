const rawItemTypeList: number[] = [
  ITEMTYPE_BLACKSMITHING_RAW_MATERIAL,
  ITEMTYPE_CLOTHIER_RAW_MATERIAL,
  ITEMTYPE_WOODWORKING_RAW_MATERIAL,
  ITEMTYPE_JEWELRYCRAFTING_RAW_MATERIAL,
  ITEMTYPE_JEWELRYCRAFTING_RAW_BOOSTER,
  ITEMTYPE_JEWELRY_RAW_TRAIT,
  ITEMTYPE_RAW_MATERIAL,
]

const rawItemTypes: Record<string | number, true> = {}
for (const [, itemType] of ipairs(rawItemTypeList)) {
  rawItemTypes[itemType] = true
}

export const RawItemTypes: Record<string | number, true> = rawItemTypes
