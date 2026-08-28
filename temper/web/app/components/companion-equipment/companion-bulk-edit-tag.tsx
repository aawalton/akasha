"use client"

import { Badge } from "@shared/design-badges/components/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/design-primitives/components/select"

interface BulkEditTagOption<T extends string> {
  id: T
  name: string
}

type BadgeVariant =
  | "elevation-muted"
  | "normal"
  | "fine"
  | "superior"
  | "epic"
  | "legendary"
  | "mythic"
  | "radiant"

interface BulkEditTagProps<T extends string> {
  currentValue: T
  options: readonly BulkEditTagOption<T>[]
  onSelect: (oldValue: T, newValue: T) => void
  count: number
  disabled?: boolean
  getVariant?: (value: T) => BadgeVariant
  getItemClassName?: (value: T) => string
}

export function BulkEditTag<T extends string>({
  currentValue,
  options,
  onSelect,
  count,
  disabled,
  getVariant,
  getItemClassName,
}: BulkEditTagProps<T>) {
  const variant = getVariant ? getVariant(currentValue) : "elevation-muted"

  return (
    <Select<T>
      value={currentValue}
      onValueChange={(newValue) => {
        onSelect(currentValue, newValue)
      }}
      disabled={disabled}
    >
      <SelectTrigger hideChevron>
        <Badge variant={variant} className="h-[22px]">
          <SelectValue />
          {count > 1 && <span>({count})</span>}
        </Badge>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.id} value={option.id} className={getItemClassName?.(option.id)}>
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
