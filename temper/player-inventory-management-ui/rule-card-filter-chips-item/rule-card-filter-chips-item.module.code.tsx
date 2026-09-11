"use client"

import type { RuleCardFilterChipItemProps } from "akasha/temper/player-inventory-management-ui/rule-card-filter-chips-item-filter-id/rule-card-filter-chips-item-filter-id.module.code.ts"
import { ItemFlagChip } from "akasha/temper/player-inventory-management-ui/rule-card-filter-chips-item-flags/rule-card-filter-chips-item-flags.module.code.tsx"
import {
  LocationChip,
  SetSourcesChip,
  TraitsChip,
} from "akasha/temper/player-inventory-management-ui/rule-card-filter-chips-item-selection-chips/rule-card-filter-chips-item-selection-chips.module.code.tsx"
import {
  BopTradeableChip,
  BoundChip,
  CraftedChip,
  LockedChip,
  QuestRelevantChip,
  StackFullnessChip,
  StolenChip,
} from "akasha/temper/player-inventory-management-ui/rule-card-filter-chips-item-state-chips/rule-card-filter-chips-item-state-chips.module.code.tsx"
import {
  LevelChip,
  QualityChip,
} from "akasha/temper/player-inventory-management-ui/rule-card-filter-chips-item-threshold-chips/rule-card-filter-chips-item-threshold-chips.module.code.tsx"
import { assertNever } from "akasha/utils/narrow/assert-never/assert-never.module.code.ts"
import type { ReactNode } from "react"

export function RuleCardFilterChipItem({ id, state }: RuleCardFilterChipItemProps): ReactNode {
  switch (id) {
    case "quality":
      return <QualityChip state={state} />
    case "traits":
      return <TraitsChip state={state} />
    case "set-sources":
      return <SetSourcesChip state={state} />
    case "location":
      return <LocationChip state={state} />
    case "level":
      return <LevelChip state={state} />
    case "stolen":
      return <StolenChip state={state} />
    case "crafted":
      return <CraftedChip state={state} />
    case "bound":
      return <BoundChip state={state} />
    case "bop-tradeable":
      return <BopTradeableChip state={state} />
    case "quest-relevant":
      return <QuestRelevantChip state={state} />
    case "stack-fullness":
      return <StackFullnessChip state={state} />
    case "locked":
      return <LockedChip state={state} />
    case "reconstructed":
    case "transmuted":
    case "known":
      return <ItemFlagChip id={id} state={state} />
    default:
      return assertNever(id)
  }
}
