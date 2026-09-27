"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "akasha/design/interface/primitive/modules/dropdown-menu/dropdown-menu.module.code.tsx"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { usePages } from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import {
  COMPARISON_OP_IDS,
  type ComparisonOpId,
} from "akasha/temper/items/rules/core/modules/comparison-op-data/comparison-op-data.module.code.ts"
import { temperComparisonOp } from "akasha/temper/player/progress/temper-comparison-op/temper-comparison-op.page-type.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { comparisonOpPickerOperatorLabel } from "akasha/temper/web/phrase/pages/comparison-op-picker-operator-label.temper-web-phrase.ts"
import { useMemo } from "react"

const EVERY_OP = 50

interface ComparisonOpPickerProps {
  value: ComparisonOpId
  onChange: (op: ComparisonOpId) => void
}

export function useOperatorTitles(): ReadonlyMap<string, string> {
  const pages = usePages({ pageTypeSlug: temperComparisonOp.slug, limit: EVERY_OP })
  const titles = useMemo(() => {
    const byKey = new Map<string, string>()
    for (const row of pages.rows) {
      const key = textAt(row, "key")
      const title = textAt(row, "title")
      if (key !== null && title !== null) byKey.set(key, title)
    }
    return byKey
  }, [pages.rows])
  if (pages.error !== null) throw pages.error
  return titles
}

export function ComparisonOpPicker({ value, onChange }: ComparisonOpPickerProps) {
  const phrase = usePhrase()
  const operators = useOperatorTitles()
  const shown = operators.get(value) ?? ""
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span
          role="button"
          tabIndex={0}
          className="cursor-pointer px-0.5 font-medium text-current outline-none focus-visible:[outline-offset:-1px] focus-visible:[outline:1.5px_solid_var(--color-accent)]"
          aria-label={phrase(comparisonOpPickerOperatorLabel.slug, { operator: shown })}
        >
          {shown}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {COMPARISON_OP_IDS.map((id) => (
          <DropdownMenuItem key={id} onClick={() => onChange(id)}>
            {operators.get(id) ?? ""}
            <span className="text-secondary">{id}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
