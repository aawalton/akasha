"use client"

import {
  type KeyedTitles,
  titleOf,
} from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import { useKeyedTitles } from "akasha/temper/web/modules/use-keyed-titles/use-keyed-titles.module.code.tsx"
import { temperRuleCardPhrase } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/temper-rule-card-phrase.page-type.ts"

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
