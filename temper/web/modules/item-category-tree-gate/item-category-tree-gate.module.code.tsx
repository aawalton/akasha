"use client"

import { useItemCategoryTree } from "akasha/temper/web/modules/use-item-category-tree/use-item-category-tree.module.code.tsx"
import type { ReactNode } from "react"

export function ItemCategoryTreeGate({
  children,
  fallback,
}: {
  children: ReactNode
  fallback: ReactNode
}) {
  return <>{useItemCategoryTree() === null ? fallback : children}</>
}
