import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import { heldReading } from "akasha/page/service/modules/held-reading/held-reading.module.code.ts"
import {
  heldItemCategories,
  holdItemCategories,
  type ItemCategories,
  itemCategoriesOf,
} from "akasha/temper/items/core/modules/item-category-tree/item-category-tree.module.code.ts"
import { ITEM_CATEGORY_FIELDS } from "akasha/temper/items/core/modules/item-category-tree-reading/item-category-tree-reading.module.code.ts"
import { temperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.ts"

const EVERY = 5000

async function readItemCategories(): Promise<ItemCategories> {
  const { rows } = await getPages({
    pageTypeSlug: temperItemCategoryTree.slug,
    select: ITEM_CATEGORY_FIELDS,
    limit: EVERY,
  })
  return holdItemCategories(itemCategoriesOf(rows))
}

const kept = heldReading([temperItemCategoryTree.slug], readItemCategories)

export async function loadItemCategoryTree(): Promise<ItemCategories> {
  return heldItemCategories() ?? (await kept())
}
