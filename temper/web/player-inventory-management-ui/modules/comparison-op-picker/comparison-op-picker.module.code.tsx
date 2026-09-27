"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "akasha/design/interface/primitive/modules/dropdown-menu/dropdown-menu.module.code.tsx"
import {
  type ComparisonOpId,
  comparisonOps,
} from "akasha/temper/items/rules/core/modules/comparison-op-data/comparison-op-data.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { comparisonOpPickerOperatorLabel } from "akasha/temper/web/phrase/pages/comparison-op-picker-operator-label.temper-web-phrase.ts"

interface ComparisonOpPickerProps {
  value: ComparisonOpId
  onChange: (op: ComparisonOpId) => void
}

export function ComparisonOpPicker({ value, onChange }: ComparisonOpPickerProps) {
  const phrase = usePhrase()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span
          role="button"
          tabIndex={0}
          className="cursor-pointer px-0.5 font-medium text-current outline-none focus-visible:[outline-offset:-1px] focus-visible:[outline:1.5px_solid_var(--color-accent)]"
          aria-label={phrase(comparisonOpPickerOperatorLabel.slug, {
            operator: comparisonOps.data[value].name,
          })}
        >
          {comparisonOps.data[value].name}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {comparisonOps.list.map((opt) => (
          <DropdownMenuItem key={opt.id} onClick={() => onChange(opt.id)}>
            {opt.name}
            <span className="text-secondary">{opt.id}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
