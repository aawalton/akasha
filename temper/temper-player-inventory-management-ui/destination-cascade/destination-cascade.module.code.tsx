"use client"

import { Badge } from "@akasha/design-badges/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@akasha/design-primitives/select-control"
import type { MoveToDestination } from "@akasha/temper-items-rules-core/inventory-rule-types"
import { ChevronRight } from "lucide-react"
import type { ActionVariant } from "../action-options/action-options.module.code.ts"
import type { DestinationOptions } from "../use-destination-options/use-destination-options.module.code.ts"

interface DestinationCascadeProps {
  destination: MoveToDestination
  options: DestinationOptions
  onChange: (value: MoveToDestination) => void
  variant?: ActionVariant
}

export function DestinationCascade({
  destination,
  options,
  onChange,
  variant = "green",
}: DestinationCascadeProps) {
  const currentCategory = options.getCategoryFor(destination)
  const currentGroup = options.groups.find((g) => g.category === currentCategory)

  if (!currentGroup) {
    return (
      <div className="flex items-center gap-1">
        <ChevronRight className="size-3 text-tertiary" />
        <Badge variant={variant} className="shrink-0">
          {destination}
        </Badge>
      </div>
    )
  }

  const hasItems = currentGroup.items.length > 0

  const isSentinel = destination === "house-storage" || destination === "guild-bank"
  const itemValue = hasItems || isSentinel ? destination : undefined
  const itemLabel = isSentinel
    ? destination === "house-storage"
      ? "Any Housing Storage"
      : "Any Guild Bank"
    : currentGroup.items.find((i) => i.value === destination)?.label

  function handleCategoryChange(value: string) {
    const group = options.groups.find((g) => g.category === value)
    if (!group) return
    onChange(options.getDefaultForCategory(group.category))
  }

  const handleItemChange = (value: string) => {
    if (value === "house-storage" || value === "guild-bank") {
      onChange(value)
      return
    }
    const item = currentGroup.items.find((i) => i.value === value)
    if (!item) return
    onChange(item.value)
  }

  return (
    <>
      {}
      <div className="flex items-center gap-1">
        <ChevronRight className="size-3 text-tertiary" />
        <Select value={currentCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger hideChevron>
            <Badge variant={variant} className="shrink-0">
              <SelectValue />
            </Badge>
          </SelectTrigger>
          <SelectContent>
            {options.groups.map((group) => (
              <SelectItem key={group.category} value={group.category}>
                {group.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {}
      {(hasItems || isSentinel) && (
        <div className="flex items-center gap-1">
          <ChevronRight className="size-3 text-tertiary" />
          <Select value={itemValue} onValueChange={handleItemChange}>
            <SelectTrigger hideChevron>
              <Badge variant={variant} className="shrink-0">
                <SelectValue>{itemLabel}</SelectValue>
              </Badge>
            </SelectTrigger>
            <SelectContent
              nullSentinel={
                currentGroup.category === "housing-storage"
                  ? { value: "house-storage", label: "Any Housing Storage" }
                  : currentGroup.category === "guild-bank"
                    ? { value: "guild-bank", label: "Any Guild Bank" }
                    : undefined
              }
            >
              {currentGroup.items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </>
  )
}
