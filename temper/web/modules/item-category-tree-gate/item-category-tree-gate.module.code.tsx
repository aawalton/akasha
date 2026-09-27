"use client"

import {
  type ItemCategories,
  ItemCategoryTreeUnread,
} from "akasha/temper/items/core/modules/item-category-tree/item-category-tree.module.code.ts"
import { useItemCategoryTree } from "akasha/temper/web/modules/use-item-category-tree/use-item-category-tree.module.code.tsx"
import { createContext, type ReactNode, useContext } from "react"

const ItemCategoriesRead = createContext<ItemCategories | null>(null)

export function ItemCategoryTreeGate({
  children,
  fallback,
}: {
  children: () => ReactNode
  fallback: ReactNode
}) {
  const categories = useItemCategoryTree()
  if (categories === null) return <>{fallback}</>
  return <ItemCategoriesRead.Provider value={categories}>{children()}</ItemCategoriesRead.Provider>
}

export function useItemCategories(): ItemCategories {
  const categories = useContext(ItemCategoriesRead)
  if (categories === null) throw new ItemCategoryTreeUnread()
  return categories
}
