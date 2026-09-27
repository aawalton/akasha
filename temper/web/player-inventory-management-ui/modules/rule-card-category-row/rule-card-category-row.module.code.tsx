"use client"

import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "akasha/design/interface/primitive/modules/select-control/select-control.module.code.tsx"
import { titleIn } from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import {
  ALL_CATEGORIES_ID,
  ALL_CATEGORIES_NODE,
} from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import { getNodeChildren } from "akasha/temper/items/rules/core/modules/item-category-tree-utils/item-category-tree-utils.module.code.ts"
import { useItemCategories } from "akasha/temper/web/modules/item-category-tree-gate/item-category-tree-gate.module.code.tsx"
import {
  phraseOf,
  useRuleCardPhrases,
} from "akasha/temper/web/player-inventory-management-ui/modules/rule-card-phrase/rule-card-phrase.module.code.tsx"
import { ruleCardCategoryRowAll } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-card-category-row-all.temper-rule-card-phrase.ts"
import { ruleCardCategoryRowSelect } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-card-category-row-select.temper-rule-card-phrase.ts"
import { ChevronRight } from "lucide-react"

interface RuleCardCategoryRowProps {
  path: readonly { id: string; name: string }[]
  deepestChildren: readonly { id: string; name: string }[]
  onSelect: (id: string) => void
}

export function RuleCardCategoryRow({ path, deepestChildren, onSelect }: RuleCardCategoryRowProps) {
  const categories = useItemCategories().keyed
  const phrases = useRuleCardPhrases()
  const allOf = (name: string): string =>
    phrases === null ? "" : phraseOf(phrases, ruleCardCategoryRowAll.key, { category: name })
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {}
      {path.map((node, depth) => {
        const parent = depth > 0 ? path[depth - 1] : undefined
        const treeChildren = getNodeChildren(parent?.id, categories)
        const allOption = parent ? { id: parent.id, name: allOf(parent.name) } : ALL_CATEGORIES_NODE
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
            deepest.id === ALL_CATEGORIES_ID ? ALL_CATEGORIES_NODE.name : allOf(deepest.name)
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
  const phrases = useRuleCardPhrases()
  return (
    <div className="flex items-center gap-1">
      {depth > 0 && <ChevronRight className="size-3 text-tertiary" />}
      <Select value={selectedId ?? ""} onValueChange={onSelect}>
        <SelectTrigger hideChevron>
          <Badge variant="elevation-muted" className="shrink-0">
            <SelectValue placeholder={titleIn(phrases, ruleCardCategoryRowSelect.key)} />
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
