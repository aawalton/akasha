"use client"

import { Badge } from "@shared/design-badges/components/badge"
import { BadgeToggleGroup, type BadgeToggleGroupItem } from "@shared/design-badges/components/badge-toggle-group"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@shared/design-primitives/components/collapsible"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@shared/design-primitives/components/command"
import { Dialog, DialogBody, DialogContent, DialogHeader, DialogTitle } from "@shared/design-primitives/components/dialog"
import { HorizontalScrollFade } from "@shared/design-primitives/components/horizontal-scroll-fade"
import { useSurface } from "@shared/design-primitives/components/surface-provider"
import { ItemCard } from "@shared/design-patterns/components/item-card"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { cn } from "@shared/design-primitives/utils/cn"
import { formatEffects } from "@temper/game-characters-stats/metrics/format-effects"
import type { Effect } from "@temper/shared-formula-framework/effects-types"
import { Check, ChevronDown, ChevronRight, X } from "lucide-react"
import type * as React from "react"
import type { ReactNode } from "react"
import { useMemo, useState } from "react"

export function FilterableSelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<"button"> & {
  size?: "sm" | "default"
}) {
  const surface = useSurface()
  return (
    <button
      type="button"
      data-slot="filterable-select-trigger"
      data-size={size}
      className={cn(
        "flex w-fit items-center justify-between gap-2 whitespace-nowrap rounded-md px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-[0.38] data-[size=default]:h-9 data-[size=sm]:h-8 focus-visible:[outline-offset:-1px] focus-visible:[outline:1.5px_solid_var(--color-accent)] [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-tertiary [&_svg]:pointer-events-none [&_svg]:shrink-0",
        surfaceClass(surface + 1),
        className
      )}
      {...props}
    >
      {children}
      {!props.disabled && <ChevronDown className="size-4 opacity-50" />}
    </button>
  )
}

export interface FilterableSelectDialogItem {
  id: string
  name: string
  description?: string
  effects?: readonly Effect[]
}

export interface FilterableSelectDialogCategory<T extends FilterableSelectDialogItem> {
  id: string
  label: string
  items: readonly T[]
}

export interface FilterableSelectDialogConfig<T extends FilterableSelectDialogItem> {
  title: string
  searchPlaceholder: string
  emptyMessage: string
  categories: readonly FilterableSelectDialogCategory<T>[]
  allItems: readonly T[]
  sortEffects?: (effects: readonly string[]) => readonly string[]
  filterItem: (item: T, searchTerm: string) => boolean
  renderIcon?: (item: T) => ReactNode
  renderItem?: (params: { item: T; isSelected: boolean; onSelect: () => void }) => ReactNode
  showEffectFilter?: boolean
}

interface FilterableSelectDialogProps<T extends FilterableSelectDialogItem> {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedItemId: string
  onSelect: (itemId: T["id"]) => void
  defaultItem: T
  config: FilterableSelectDialogConfig<T>
}

export function FilterableSelectDialog<T extends FilterableSelectDialogItem>({
  open,
  onOpenChange,
  selectedItemId,
  onSelect,
  defaultItem,
  config,
}: FilterableSelectDialogProps<T>) {
  const showEffectFilter = config.showEffectFilter !== false
  const firstCategoryId = config.categories[0]?.id
  const defaultExpandedGroups =
    firstCategoryId != null
      ? showEffectFilter
        ? ["effects", firstCategoryId]
        : [firstCategoryId]
      : showEffectFilter
        ? ["effects"]
        : []

  const [search, setSearch] = useState("")
  const [selectedEffects, setSelectedEffects] = useState<readonly BadgeToggleGroupItem[]>([])
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(defaultExpandedGroups))

  const filterItems = (
    items: readonly T[],
    searchTerm: string,
    effects: readonly BadgeToggleGroupItem[]
  ) => {
    let filtered = items

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((item) => config.filterItem(item, searchTerm))
    }

    if (effects.length > 0) {
      filtered = filtered.filter((item) => {
        const itemEffects = new Set(formatEffects(item.effects ?? [], { withoutValues: true }))
        return effects.every((effect) => itemEffects.has(effect.value))
      })
    }

    return filtered
  }

  const filteredCategories = useMemo(() => {
    return config.categories
      .map((category: FilterableSelectDialogCategory<T>) => ({
        ...category,
        items: filterItems(category.items, search, selectedEffects),
      }))
      .filter((category: FilterableSelectDialogCategory<T>) => category.items.length > 0)
  }, [config.categories, search, selectedEffects])

  const getAllUniqueEffects = (): readonly string[] => {
    const effectsSet = new Set<string>()

    for (const item of config.allItems) {
      const effectNames = formatEffects(item.effects ?? [], { withoutValues: true })
      for (const effect of effectNames) {
        effectsSet.add(effect)
      }
    }

    const effects = Array.from(effectsSet)
    return config.sortEffects ? config.sortEffects(effects) : effects.sort()
  }

  const allEffects = useMemo(() => getAllUniqueEffects(), [config.allItems])

  const availableEffects = useMemo(() => {
    let effects: readonly string[]

    if (selectedEffects.length === 0) {
      effects = allEffects
    } else {
      const itemsWithSelectedEffects = config.allItems.filter((item: T) => {
        const itemEffects = new Set(formatEffects(item.effects ?? [], { withoutValues: true }))
        return selectedEffects.every((effect: BadgeToggleGroupItem) =>
          itemEffects.has(effect.value)
        )
      })

      const possibleEffects = new Set<string>()
      for (const item of itemsWithSelectedEffects) {
        const effectNames = formatEffects(item.effects ?? [], { withoutValues: true })
        for (const effect of effectNames) {
          possibleEffects.add(effect)
        }
      }

      const effectArray = Array.from(possibleEffects)
      effects = config.sortEffects ? config.sortEffects(effectArray) : effectArray.sort()
    }

    return effects.map((effect) => ({
      value: effect,
      label: effect,
    }))
  }, [selectedEffects, allEffects, config.allItems])

  const handleSelect = (itemId: T["id"]) => {
    const nextId = itemId === selectedItemId ? defaultItem.id : itemId
    onSelect(nextId)
    onOpenChange(false)
    setSearch("")
    setSelectedEffects([])
  }

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(groupId)) {
        newSet.delete(groupId)
      } else {
        if (groupId !== "effects") {
          for (const id of prev) {
            if (id !== "effects") {
              newSet.delete(id)
            }
          }
        }
        newSet.add(groupId)
      }
      return newSet
    })
  }

  const totalFilteredCount = filteredCategories.reduce(
    (sum: number, category: FilterableSelectDialogCategory<T>) => sum + category.items.length,
    0
  )

  const useFlatList = filteredCategories.length === 1

  const renderItem = (item: T) => {
    const isSelected = item.id === selectedItemId
    const onItemSelect = () => handleSelect(item.id)

    if (config.renderItem) {
      return config.renderItem({ item, isSelected, onSelect: onItemSelect })
    }

    const effects = formatEffects(item.effects ?? [])
    const renderIcon = config.renderIcon

    return (
      <CommandItem key={item.id} value={item.id} onSelect={onItemSelect} className="p-0">
        <ItemCard
          renderIcon={renderIcon ? () => renderIcon(item) : undefined}
          renderContent={() =>
            effects.length > 0 ? (
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium">{item.name}</span>
                  {isSelected && <Check className="h-4 w-4 shrink-0 text-accent" />}
                </div>
                <HorizontalScrollFade>
                  <div className="flex gap-1">
                    {effects.map((effect: string, idx: number) => (
                      <Badge
                        key={`${item.id.toString()}-${idx}`}
                        variant="elevation"
                        className="shrink-0 font-normal text-xs"
                      >
                        {effect}
                      </Badge>
                    ))}
                  </div>
                </HorizontalScrollFade>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between gap-2">
                  <div className="font-medium text-sm">{item.name}</div>
                  {isSelected && <Check className="h-4 w-4 shrink-0 text-accent" />}
                </div>
                {item.description != null && (
                  <div className="line-clamp-2 text-secondary text-xs">{item.description}</div>
                )}
              </>
            )
          }
        />
      </CommandItem>
    )
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        onOpenChange(isOpen)
        if (!isOpen) {
          setSearch("")
          setSelectedEffects([])
          setExpandedGroups(new Set(defaultExpandedGroups))
        }
      }}
    >
      <DialogContent className="sm:max-w-panel">
        <DialogHeader>
          <DialogTitle>{config.title}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Command shouldFilter={false} className="space-y-3">
            <CommandInput
              placeholder={config.searchPlaceholder}
              value={search}
              onValueChange={setSearch}
            />

            {}
            <CommandItem
              value={defaultItem.id}
              onSelect={() => handleSelect(defaultItem.id)}
              className="flex w-full items-center gap-2 rounded-md px-2 py-2"
            >
              <X className="h-4 w-4" />
              <span className="font-medium text-sm">{defaultItem.name}</span>
              {selectedItemId === defaultItem.id && (
                <Check className="ml-auto h-4 w-4 shrink-0 text-accent" />
              )}
            </CommandItem>

            {}
            {showEffectFilter && (
              <Collapsible
                open={expandedGroups.has("effects")}
                onOpenChange={() => toggleGroup("effects")}
              >
                <CollapsibleTrigger asChild>
                  <div className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left hover:bg-primary/8">
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 transition-transform",
                        expandedGroups.has("effects") && "rotate-90"
                      )}
                    />
                    <span className="font-medium text-sm">Filter by Effects</span>
                    {selectedEffects.length > 0 && (
                      <>
                        <span className="text-secondary text-xs">
                          ({selectedEffects.length} selected)
                        </span>
                        <button
                          type="button"
                          className="ml-auto flex size-6 items-center justify-center rounded p-0.5 transition-colors hover:bg-primary/[0.08] active:bg-primary/[0.12]"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedEffects([])
                          }}
                          aria-label="Clear all effect filters"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-3">
                  <BadgeToggleGroup
                    items={availableEffects}
                    value={selectedEffects}
                    onSelect={setSelectedEffects}
                    unselectedVariant="elevation"
                  />
                </CollapsibleContent>
              </Collapsible>
            )}

            <CommandList className="h-96 space-y-3">
              {totalFilteredCount === 0 && <CommandEmpty>{config.emptyMessage}</CommandEmpty>}

              {}
              {useFlatList && filteredCategories[0] && (
                <CommandGroup>{filteredCategories[0].items.map(renderItem)}</CommandGroup>
              )}

              {}
              {!useFlatList &&
                filteredCategories.map((category: FilterableSelectDialogCategory<T>) => (
                  <Collapsible
                    key={category.id}
                    open={expandedGroups.has(category.id)}
                    onOpenChange={() => toggleGroup(category.id)}
                  >
                    <CollapsibleTrigger className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left hover:bg-primary/8">
                      <ChevronRight
                        className={cn(
                          "h-4 w-4 transition-transform",
                          expandedGroups.has(category.id) && "rotate-90"
                        )}
                      />
                      <span className="font-medium text-sm">{category.label}</span>
                      <span className="text-secondary text-xs">({category.items.length})</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-3">
                      <CommandGroup>{category.items.map(renderItem)}</CommandGroup>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
            </CommandList>
          </Command>
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}
