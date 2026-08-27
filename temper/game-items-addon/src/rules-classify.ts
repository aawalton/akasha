import { CATEGORY_ROOTS, CATEGORY_TREE } from "./category-tree"
import { hasSignals, type ItemSignals, matchesSignals } from "./generated/rule-classify.generated"
import { ALL_CATEGORIES_ID } from "./generated/rule-types.generated"

export function walkNode(signals: ItemSignals, nodeId: string): string | undefined {
  const node = CATEGORY_TREE[nodeId]
  if (!node) return undefined

  if (hasSignals(node) && !matchesSignals(signals, node)) return undefined

  if (node.childIds) {
    for (const childId of node.childIds) {
      const deeper = walkNode(signals, childId)
      if (deeper !== undefined) return deeper
    }
  }

  if (hasSignals(node)) return nodeId

  return undefined
}

export function classifyItem(signals: ItemSignals): string {
  for (const rootId of CATEGORY_ROOTS) {
    const result = walkNode(signals, rootId)
    if (result !== undefined) return result
  }
  return "other"
}

export function getAncestorChain(nodeId: string): string[] {
  const chain: string[] = [nodeId]
  let current = nodeId
  while (true) {
    const node = CATEGORY_TREE[current]
    if (!node || node.parentId == null) break
    chain.push(node.parentId)
    current = node.parentId
  }
  chain.push(ALL_CATEGORIES_ID)
  return chain
}

export function gatherSignals(_bagId: number, _slotIndex: number, itemLink: string): ItemSignals {
  const [filterTypeBroad, filterTypeSpecific] = GetItemLinkFilterTypeInfo(itemLink)
  const filterType = filterTypeSpecific ?? filterTypeBroad
  const [itemType, specializedItemType] = GetItemLinkItemType(itemLink)
  const equipType = GetItemLinkEquipType(itemLink)
  const weaponType = GetItemLinkWeaponType(itemLink)
  const armorType = GetItemLinkArmorType(itemLink)
  const traitType = GetItemLinkTraitType(itemLink)

  let furnitureCategoryId = 0
  let furnitureSubcategoryId = 0
  if (filterType === 21) {
    const furnitureDataId = GetItemLinkFurnitureDataId(itemLink)
    if (furnitureDataId > 0) {
      const [catId, subcatId] = GetFurnitureDataCategoryInfo(furnitureDataId)
      if (catId !== undefined) furnitureCategoryId = catId
      if (subcatId !== undefined) furnitureSubcategoryId = subcatId
    }
  }

  const itemName = zo_strformat("<<1>>", GetItemLinkName(itemLink))

  return {
    filterType,
    itemType,
    specializedItemType,
    traitType,
    equipType,
    weaponType,
    armorType,
    furnitureCategoryId,
    furnitureSubcategoryId,
    itemName,
  }
}
