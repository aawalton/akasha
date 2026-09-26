"use client"

import { usePages } from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import type { CategoryRule } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import {
  holdRuleTemplates,
  ruleTemplatesFrom,
} from "akasha/temper/player/progress/temper-rule-template/modules/rule-template-catalog/rule-template-catalog.module.code.ts"
import { temperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.ts"
import { useMemo } from "react"

const EVERY = 500

export function useRuleTemplates(): readonly CategoryRule[] | null {
  const templates = usePages({ pageTypeSlug: temperRuleTemplate.slug, limit: EVERY })
  const rules = useMemo(
    () => (templates.isLoading ? null : holdRuleTemplates(ruleTemplatesFrom(templates.rows))),
    [templates.isLoading, templates.rows]
  )
  if (templates.error !== null) throw templates.error
  return rules
}
