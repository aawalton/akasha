import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { asking } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import {
  holdItemCategories,
  type ItemCategories,
  itemCategoriesOf,
} from "akasha/temper/items/core/modules/item-category-tree/item-category-tree.module.code.ts"
import { ITEM_CATEGORY_FIELDS } from "akasha/temper/items/core/modules/item-category-tree-reading/item-category-tree-reading.module.code.ts"
import { temperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.ts"

export function holdItemCategoryTreeFromCheckout(): ItemCategories {
  const asked = asking(akashaRoot(), {
    pageTypeSlug: temperItemCategoryTree.slug,
    keys: ITEM_CATEGORY_FIELDS,
  } as never)
  if ("refused" in asked) throw new Error(asked.refused)
  return holdItemCategories(itemCategoriesOf(asked.rows as readonly Value[]))
}
