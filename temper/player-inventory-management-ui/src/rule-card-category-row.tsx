"use client"

import { Badge } from "@akasha/design-badges/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@akasha/design-primitives/select-control"
import { ITEM_CATEGORY_TREE } from "@akasha/temper-items-core/item-category-tree-data"
import {
  ALL_CATEGORIES_ID,
  ALL_CATEGORIES_NODE,
} from "@akasha/temper-items-rules-core/inventory-rule-types"
import { getNodeChildren } from "@akasha/temper-items-rules-core/item-category-tree-utils"
import { ChevronRight } from "lucide-react"

interface RuleCardCategoryRowProps {
  path: readonly { id: string; name: string }[]
  deepestChildren: readonly { id: string; name: string }[]
  onSelect: (id: string) => void
}

export function RuleCardCategoryRow({ path, deepestChildren, onSelect }: RuleCardCategoryRowProps) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {}
      {path.map((node, depth) => {
        const parent = depth > 0 ? path[depth - 1] : undefined
        const treeChildren = getNodeChildren(parent?.id, ITEM_CATEGORY_TREE)
        const allOption = parent
          ? { id: parent.id, name: `All ${parent.name}` }
          : ALL_CATEGORIES_NODE
        const siblings = [allOption, ...treeChildren]
        return (
          <CategoryBadgeSelect
            key={depth}
            depth={depth}
            selectedId={node.id}
            options={siblings}
            onSelect={onSelect}
          />
        )
      })}

      {}
      {deepestChildren.length > 0 &&
        (() => {
          const deepest = path[path.length - 1]
          if (deepest === undefined) return null
          const allName =
            deepest.id === ALL_CATEGORIES_ID ? ALL_CATEGORIES_NODE.name : `All ${deepest.name}`
          return (
            <CategoryBadgeSelect
              depth={path.length}
              selectedId={deepest.id}
              options={[{ id: deepest.id, name: allName }, ...deepestChildren]}
              onSelect={onSelect}
            />
          )
        })()}
    </div>
  )
}

export function CategoryBadgeSelect({
  depth,
  selectedId,
  options,
  onSelect,
}: {
  depth: number
  selectedId?: string
  options: readonly { id: string; name: string }[]
  onSelect: (id: string) => void
}) {
  return (
    <div className="flex items-center gap-1">
      {depth > 0 && <ChevronRight className="size-3 text-tertiary" />}
      <Select value={selectedId ?? ""} onValueChange={onSelect}>
        <SelectTrigger hideChevron>
          <Badge variant="elevation-muted" className="shrink-0">
            <SelectValue placeholder="Select Category" />
          </Badge>
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.id} value={opt.id}>
              {opt.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
