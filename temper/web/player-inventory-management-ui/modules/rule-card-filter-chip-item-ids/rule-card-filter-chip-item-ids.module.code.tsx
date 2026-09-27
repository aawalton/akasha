"use client"

import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import { useRemoveFilterLabel } from "akasha/temper/web/player-inventory-management-ui/modules/rule-card-phrase/rule-card-phrase.module.code.tsx"
import type { useRuleCard } from "akasha/temper/web/player-inventory-management-ui/modules/use-rule-card/use-rule-card.module.code.ts"
import { type ReactNode, useEffect, useState } from "react"

type RuleCardState = ReturnType<typeof useRuleCard>

interface RuleCardFilterChipItemIdsProps {
  state: Pick<RuleCardState, "itemIdsValue" | "handleRemoveFilter">
}

interface NamedItem {
  readonly itemId: number
  readonly name: string
}

export function RuleCardFilterChipItemIds({ state }: RuleCardFilterChipItemIdsProps): ReactNode {
  const { itemIdsValue, handleRemoveFilter } = state
  const removeLabel = useRemoveFilterLabel()
  const [names, setNames] = useState<ReadonlyMap<number, string>>(new Map())
  const idsKey = itemIdsValue.join(",")

  useEffect(() => {
    if (idsKey === "") return
    let live = true
    fetch(`/api/items?ids=${idsKey}`)
      .then((response) => (response.ok ? response.json() : []))
      .then((rows: readonly NamedItem[]) => {
        if (live) setNames(new Map(rows.map((row) => [row.itemId, row.name])))
      })
      .catch(() => undefined)
    return () => {
      live = false
    }
  }, [idsKey])

  const said = itemIdsValue.map((id) => names.get(id) ?? String(id)).join(" › ")

  return (
    <Badge
      variant="accent"
      className="shrink-0"
      onRemove={() => handleRemoveFilter("item-ids")}
      removeLabel={removeLabel?.("item-ids")}
    >
      <span>Items: {said}</span>
    </Badge>
  )
}
