"use client"

import {
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { usePages } from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import { temperRuleGoal } from "akasha/temper/player/progress/temper-rule-goal/temper-rule-goal.page-type.ts"
import { useMemo } from "react"

const EVERY = 100

export type RuleGoalTitles = ReadonlyMap<string, string>

let held: RuleGoalTitles | null = null

export function heldRuleGoalTitles(): RuleGoalTitles | null {
  return held
}

function titlesFrom(rows: readonly Value[]): RuleGoalTitles {
  const titles = new Map<string, string>()
  for (const row of rows) {
    const slug = textAt(row, "slug")
    const title = textAt(row, "title")
    if (slug === null || title === null) {
      throw new Error("useRuleGoalTitles: a temper-rule-goal page states no slug or no title")
    }
    titles.set(slug, title)
  }
  return titles
}

export function useRuleGoalTitles(): RuleGoalTitles | null {
  const pages = usePages({ pageTypeSlug: temperRuleGoal.slug, limit: EVERY })
  const titles = useMemo(() => {
    if (pages.isLoading) return null
    held = titlesFrom(pages.rows)
    return held
  }, [pages.isLoading, pages.rows])
  if (pages.error !== null) throw pages.error
  return titles
}

export function goalTitleIn(titles: RuleGoalTitles | null, goal: string): string {
  return titles?.get(goal) ?? ""
}
