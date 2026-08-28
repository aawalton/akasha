"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@shared/design-primitives/components/dropdown-menu"
import {
  type ComparisonOpId,
  comparisonOps,
} from "@temper/game-items-rules-core/filters/comparison-op-data"

interface ComparisonOpPickerProps {
  value: ComparisonOpId
  onChange: (op: ComparisonOpId) => void
}

export function ComparisonOpPicker({ value, onChange }: ComparisonOpPickerProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span
          role="button"
          tabIndex={0}
          className="cursor-pointer px-0.5 font-medium text-current outline-none focus-visible:[outline-offset:-1px] focus-visible:[outline:1.5px_solid_var(--color-accent)]"
          aria-label={`Comparison operator: ${comparisonOps.data[value].name}`}
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
