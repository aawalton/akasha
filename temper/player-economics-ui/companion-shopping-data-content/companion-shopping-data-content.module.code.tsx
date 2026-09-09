"use client"

import {
  BadgeToggleGroup,
  type BadgeToggleGroupItem,
} from "@akasha/design-badges/badge-toggle-group"
import { PageTabHeader } from "@akasha/design-layout/page-tab-header"
import { PanelToggleProvider } from "@akasha/design-layout/panel-toggle-provider"
import { ResponsiveColumns } from "@akasha/design-layout/responsive-columns"
import { AddFilterButton } from "@akasha/design-patterns/add-filter-button"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@akasha/design-patterns/empty"
import { FilterButton } from "@akasha/design-patterns/filter-button"
import { FilterGroup } from "@akasha/design-patterns/filter-group"
import { SearchSortFilterRow } from "@akasha/design-patterns/search-sort-filter-row"
import { Card, CardContent } from "@akasha/design-primitives/card"
import {
  type CompanionEquipmentQualityId,
  companionEquipmentQualities,
} from "@akasha/temper-companions-core/companion-equipment-qualities"
import { PricingRegionNote } from "@akasha/temper-player-inventory-management-ui/pricing-region-note"
import { Gamepad2, PackageCheck } from "lucide-react"
import { type ReactNode, useMemo, useState } from "react"
import { CompanionGearByCompanionPanelCard } from "../companion-gear-by-companion-panel-card/companion-gear-by-companion-panel-card.module.code.tsx"
import { CompanionGearByPricePanelCard } from "../companion-gear-by-price-panel-card/companion-gear-by-price-panel-card.module.code.tsx"
import { CompanionGearByTraitPanelCard } from "../companion-gear-by-trait-panel-card/companion-gear-by-trait-panel-card.module.code.tsx"
import { useCompanionShoppingData } from "../use-companion-shopping-data/use-companion-shopping-data.module.code.ts"
import type { ShoppingList } from "../use-shopping-list/use-shopping-list.module.code.ts"

const OWNERSHIP_ITEMS: BadgeToggleGroupItem[] = [
  { value: "owned", label: "Owned" },
  { value: "unowned", label: "Unowned" },
]

const QUALITY_ITEMS: Array<BadgeToggleGroupItem & { value: CompanionEquipmentQualityId }> =
  companionEquipmentQualities.list
    .filter((q) => q.id !== "no-quality")
    .map((q) => ({
      value: q.id,
      label: q.name,
      variant: q.id,
    }))

type FilterId = "ownership" | "quality"
const FILTER_IDS: ReadonlySet<string> = new Set<FilterId>(["ownership", "quality"])
function isFilterId(id: string): id is FilterId {
  return FILTER_IDS.has(id)
}

interface FilterDef {
  id: FilterId
  label: string
  hasValue: (props: CompanionShoppingDataContentProps) => boolean
  renderGroup: (props: CompanionShoppingDataContentProps) => ReactNode
}

const COMPANION_SHOPPING_FILTERS: FilterDef[] = [
  {
    id: "ownership",
    label: "Ownership",
    hasValue: ({ gearOwnership }) => gearOwnership !== null,
    renderGroup: ({ gearOwnership, onFilterChange }) => {
      const selectedOwnership = OWNERSHIP_ITEMS.filter((i) => i.value === gearOwnership)
      return (
        <BadgeToggleGroup
          items={OWNERSHIP_ITEMS}
          value={selectedOwnership}
          onSelect={(items) => {
            const onlyItem = items.length === 1 ? items[0] : undefined
            onFilterChange({
              gearOwnership: onlyItem ? onlyItem.value : null,
            })
          }}
          unselectedVariant="elevation"
        />
      )
    },
  },
  {
    id: "quality",
    label: "Quality",
    hasValue: ({ gearQualities }) => gearQualities.length > 0,
    renderGroup: ({ gearQualities, onFilterChange }) => {
      const selectedQualities = QUALITY_ITEMS.filter((i) => gearQualities.includes(i.value))
      return (
        <BadgeToggleGroup
          items={QUALITY_ITEMS}
          value={selectedQualities}
          onSelect={(items) =>
            onFilterChange({
              gearQualities: items
                .map((i) => i.value)
                .filter((v): v is CompanionEquipmentQualityId =>
                  companionEquipmentQualities.list.some((q) => q.id === v)
                ),
            })
          }
          unselectedVariant="elevation"
          wrap
        />
      )
    },
  },
]

interface CompanionShoppingDataContentProps {
  userId: string | null
  gearOwnership: string | null
  gearQualities: readonly CompanionEquipmentQualityId[]
  shoppingList: ShoppingList
  onFilterChange: (values: {
    gearOwnership?: string | null
    gearQualities?: readonly CompanionEquipmentQualityId[]
  }) => void
}

export function CompanionShoppingDataContent({
  userId,
  gearOwnership,
  gearQualities,
  shoppingList,
  onFilterChange,
}: CompanionShoppingDataContentProps) {
  const { entityCount, allNeeds, pricing, regionNote, pricingRegion } =
    useCompanionShoppingData(userId)

  const hasActiveFilters = gearOwnership !== null || gearQualities.length > 0

  const filteredNeeds = useMemo(() => {
    let needs = allNeeds
    if (gearOwnership === "owned") needs = needs.filter((n) => n.owned)
    else if (gearOwnership === "unowned") needs = needs.filter((n) => !n.owned)
    if (gearQualities.length > 0) needs = needs.filter((n) => gearQualities.includes(n.quality))
    return needs
  }, [allNeeds, gearOwnership, gearQualities])

  const handleResetFilters = () => onFilterChange({ gearOwnership: null, gearQualities: [] })

  const props = {
    userId,
    gearOwnership,
    gearQualities,
    shoppingList,
    onFilterChange,
  }

  const [addedFilters, setAddedFilters] = useState<Set<FilterId>>(() => {
    const initial = new Set<FilterId>()
    for (const f of COMPANION_SHOPPING_FILTERS) {
      if (f.hasValue(props)) initial.add(f.id)
    }
    return initial
  })

  const visibleFilters = COMPANION_SHOPPING_FILTERS.filter(
    (f) => addedFilters.has(f.id) || f.hasValue(props)
  )

  const availableFilters = COMPANION_SHOPPING_FILTERS.filter(
    (f) => !addedFilters.has(f.id) && !f.hasValue(props)
  )

  function handleAdd(id: string) {
    if (!isFilterId(id)) return
    setAddedFilters((prev) => new Set(prev).add(id))
  }

  function handleRemove(id: FilterId) {
    if (id === "ownership") onFilterChange({ gearOwnership: null })
    else if (id === "quality") onFilterChange({ gearQualities: [] })
    setAddedFilters((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  const regionHint = (
    <PricingRegionNote
      kind={regionNote}
      platform={pricingRegion.platform}
      server={pricingRegion.server}
    />
  )

  if (entityCount === 0) {
    return (
      <PanelToggleProvider>
        <div className="flex flex-col gap-6">
          <PageTabHeader title="Companion" subtitle={regionHint} />
          <Card>
            <CardContent>
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <Gamepad2 />
                  </EmptyMedia>
                  <EmptyTitle>No companion has a target build</EmptyTitle>
                  <EmptyDescription>
                    A shopping list is built from a companion's target build, and none is set.
                    Importing from the game does not create one.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            </CardContent>
          </Card>
        </div>
      </PanelToggleProvider>
    )
  }

  if (!hasActiveFilters && allNeeds.length > 0 && allNeeds.every((n) => n.owned)) {
    return (
      <PanelToggleProvider>
        <div className="flex flex-col gap-6">
          <PageTabHeader title="Companion" subtitle={regionHint} />
          <Card>
            <CardContent>
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <PackageCheck />
                  </EmptyMedia>
                  <EmptyTitle>All companion gear accounted for</EmptyTitle>
                  <EmptyDescription>
                    Every piece in your target builds has a matching item somewhere in your
                    inventory. The match does not check whether that item is already equipped or
                    otherwise tied up, so a piece may still be worth buying.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            </CardContent>
          </Card>
        </div>
      </PanelToggleProvider>
    )
  }

  return (
    <PanelToggleProvider>
      <div className="flex flex-col gap-6">
        <PageTabHeader title="Companion" subtitle={regionHint}>
          <SearchSortFilterRow hasActiveFilters={hasActiveFilters} onReset={handleResetFilters}>
            <FilterButton
              hasActiveFilters={hasActiveFilters || addedFilters.size > 0}
              emptySelectOptions={availableFilters.map((f) => ({ id: f.id, label: f.label }))}
              onEmptySelect={handleAdd}
            >
              <div className="flex flex-col gap-3">
                {visibleFilters.map((filterDef) => (
                  <FilterGroup
                    key={filterDef.id}
                    label={filterDef.label}
                    onRemove={() => handleRemove(filterDef.id)}
                  >
                    {filterDef.renderGroup(props)}
                  </FilterGroup>
                ))}
                <AddFilterButton
                  options={availableFilters.map((f) => ({ id: f.id, label: f.label }))}
                  onAdd={handleAdd}
                />
              </div>
            </FilterButton>
          </SearchSortFilterRow>
        </PageTabHeader>

        <ResponsiveColumns>
          <CompanionGearByCompanionPanelCard
            needs={filteredNeeds}
            pricing={pricing}
            shoppingList={shoppingList}
          />
          <CompanionGearByTraitPanelCard
            needs={filteredNeeds}
            pricing={pricing}
            shoppingList={shoppingList}
          />
          <CompanionGearByPricePanelCard
            needs={filteredNeeds}
            pricing={pricing}
            shoppingList={shoppingList}
          />
        </ResponsiveColumns>
      </div>
    </PanelToggleProvider>
  )
}
