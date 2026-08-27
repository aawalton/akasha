import type { ClassifiableItem } from "../item-category-tree-types"

export function item(
  overrides: Partial<ClassifiableItem> & Pick<ClassifiableItem, "filterType" | "itemType">
): ClassifiableItem {
  return overrides
}
