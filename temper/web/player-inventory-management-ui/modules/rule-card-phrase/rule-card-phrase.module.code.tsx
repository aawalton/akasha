"use client"

import {
  type KeyedTitles,
  titleOf,
} from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import type { FilterId } from "akasha/temper/items/rules/core/modules/rule-filter-types/rule-filter-types.module.code.ts"
import { temperItemAction } from "akasha/temper/player/progress/temper-item-action/temper-item-action.page-type.ts"
import { useKeyedTitles } from "akasha/temper/web/modules/use-keyed-titles/use-keyed-titles.module.code.tsx"
import {
  titleOfFilter,
  useConditionFieldTitles,
} from "akasha/temper/web/player-inventory-management-ui/modules/use-condition-field-titles/use-condition-field-titles.module.code.tsx"
import { temperRuleCardPhrase } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/temper-rule-card-phrase.page-type.ts"
import { useMemo } from "react"

export type RuleCardPhrases = KeyedTitles

export function useRuleCardPhrases(): RuleCardPhrases | null {
  return useKeyedTitles(temperRuleCardPhrase.slug)
}

export function phraseOf(
  phrases: RuleCardPhrases,
  key: string,
  fills: Readonly<Record<string, string>> = {}
): string {
  return Object.entries(fills).reduce(
    (text, [name, fill]) => text.split(`{${name}}`).join(fill),
    titleOf(phrases, key)
  )
}

type RemoveFilterLabel = (filter: FilterId) => string

export function useRemoveFilterLabel(): RemoveFilterLabel | null {
  const phrases = useRuleCardPhrases()
  const fields = useConditionFieldTitles()
  return useMemo(
    () =>
      phrases === null || fields === null
        ? null
        : (filter) => phraseOf(phrases, "remove-filter", { filter: titleOfFilter(fields, filter) }),
    [phrases, fields]
  )
}

type LockReason = (
  phraseKey: string,
  action: string,
  filter: FilterId,
  fills?: Readonly<Record<string, string>>
) => string

export function useLockReason(): LockReason | null {
  const phrases = useRuleCardPhrases()
  const actions = useKeyedTitles(temperItemAction.slug)
  const fields = useConditionFieldTitles()
  return useMemo(
    () =>
      phrases === null || actions === null || fields === null
        ? null
        : (phraseKey, action, filter, fills = {}) =>
            phraseOf(phrases, phraseKey, {
              action: titleOf(actions, action),
              filter: titleOfFilter(fields, filter),
              ...fills,
            }),
    [phrases, actions, fields]
  )
}
