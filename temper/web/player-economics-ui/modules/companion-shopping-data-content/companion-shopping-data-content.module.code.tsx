"use client"

import {
  BadgeToggleGroup,
  type BadgeToggleGroupItem,
} from "akasha/design/interface/badge/modules/badge-toggle-group/badge-toggle-group.module.code.tsx"
import { PageTabHeader } from "akasha/design/interface/layout/modules/page-tab-header/page-tab-header.module.code.tsx"
import { PanelToggleProvider } from "akasha/design/interface/layout/modules/panel-toggle-provider/panel-toggle-provider.module.code.tsx"
import { ResponsiveColumns } from "akasha/design/interface/layout/modules/responsive-columns/responsive-columns.module.code.tsx"
import { AddFilterButton } from "akasha/design/interface/pattern/modules/add-filter-button/add-filter-button.module.code.tsx"
import { addFilterId } from "akasha/design/interface/pattern/modules/add-filter-id/add-filter-id.module.code.ts"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "akasha/design/interface/pattern/modules/empty/empty.module.code.tsx"
import { FilterButton } from "akasha/design/interface/pattern/modules/filter-button/filter-button.module.code.tsx"
import { FilterGroup } from "akasha/design/interface/pattern/modules/filter-group/filter-group.module.code.tsx"
import { SearchSortFilterRow } from "akasha/design/interface/pattern/modules/search-sort-filter-row/search-sort-filter-row.module.code.tsx"
import {
  Card,
  CardContent,
} from "akasha/design/interface/primitive/modules/card/card.module.code.tsx"
import {
  type CompanionEquipmentQualityId,
  companionEquipmentQualities,
  isCompanionEquipmentQualityId,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-equipment-qualities/companion-equipment-qualities.module.code.ts"
import {
  type Phrase,
  usePhrase,
  usePhraseDescription,
} from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { companionShoppingDataContentAllOwned } from "akasha/temper/web/phrase/pages/companion-shopping-data-content-all-owned.temper-web-phrase.ts"
import { companionShoppingDataContentNoTarget } from "akasha/temper/web/phrase/pages/companion-shopping-data-content-no-target.temper-web-phrase.ts"
import { companionShoppingDataContentOwned } from "akasha/temper/web/phrase/pages/companion-shopping-data-content-owned.temper-web-phrase.ts"
import { companionShoppingDataContentOwnership } from "akasha/temper/web/phrase/pages/companion-shopping-data-content-ownership.temper-web-phrase.ts"
import { companionShoppingDataContentQuality } from "akasha/temper/web/phrase/pages/companion-shopping-data-content-quality.temper-web-phrase.ts"
import { companionShoppingDataContentTitle } from "akasha/temper/web/phrase/pages/companion-shopping-data-content-title.temper-web-phrase.ts"
import { companionShoppingDataContentUnowned } from "akasha/temper/web/phrase/pages/companion-shopping-data-content-unowned.temper-web-phrase.ts"
import { CompanionGearByCompanionPanelCard } from "akasha/temper/web/player-economics-ui/modules/companion-gear-by-companion-panel-card/companion-gear-by-companion-panel-card.module.code.tsx"
import { CompanionGearByPricePanelCard } from "akasha/temper/web/player-economics-ui/modules/companion-gear-by-price-panel-card/companion-gear-by-price-panel-card.module.code.tsx"
import { CompanionGearByTraitPanelCard } from "akasha/temper/web/player-economics-ui/modules/companion-gear-by-trait-panel-card/companion-gear-by-trait-panel-card.module.code.tsx"
import { useCompanionShoppingData } from "akasha/temper/web/player-economics-ui/modules/use-companion-shopping-data/use-companion-shopping-data.module.code.ts"
import type { ShoppingList } from "akasha/temper/web/player-economics-ui/modules/use-shopping-list/use-shopping-list.module.code.ts"
import { PricingRegionNote } from "akasha/temper/web/player-inventory-management-ui/modules/pricing-region-note/pricing-region-note.module.code.tsx"
import { Gamepad2, PackageCheck } from "lucide-react"
import { type ReactNode, useMemo, useState } from "react"

function ownershipItems(phrase: Phrase): BadgeToggleGroupItem[] {
  return [
    { value: "owned", label: phrase(companionShoppingDataContentOwned.slug) },
    { value: "unowned", label: phrase(companionShoppingDataContentUnowned.slug) },
  ]
}

function qualityItems(): Array<BadgeToggleGroupItem & { value: CompanionEquipmentQualityId }> {
  return companionEquipmentQualities().flatMap((q) =>
    q.id === "no-quality" ? [] : [{ value: q.id, label: q.name, variant: q.id }]
  )
}

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

const companionShoppingFilters = (phrase: Phrase): FilterDef[] => [
  {
    id: "ownership",
    label: phrase(companionShoppingDataContentOwnership.slug),
    hasValue: ({ gearOwnership }) => gearOwnership !== null,
    renderGroup: ({ gearOwnership, onFilterChange }) => {
      const items = ownershipItems(phrase)
      const selectedOwnership = items.filter((i) => i.value === gearOwnership)
      return (
        <BadgeToggleGroup
          items={items}
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
    label: phrase(companionShoppingDataContentQuality.slug),
    hasValue: ({ gearQualities }) => gearQualities.length > 0,
    renderGroup: ({ gearQualities, onFilterChange }) => {
      const items = qualityItems()
      const selectedQualities = items.filter((i) => gearQualities.includes(i.value))
      return (
        <BadgeToggleGroup
          items={items}
          value={selectedQualities}
          onSelect={(chosen) =>
            onFilterChange({
              gearQualities: chosen.map((i) => i.value).filter(isCompanionEquipmentQualityId),
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
  const phrase = usePhrase()
  const phraseDescription = usePhraseDescription()
  const filters = useMemo(() => companionShoppingFilters(phrase), [phrase])

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
    for (const f of filters) {
      if (f.hasValue(props)) initial.add(f.id)
    }
    return initial
  })

  const visibleFilters = filters.filter((f) => addedFilters.has(f.id) || f.hasValue(props))

  const availableFilters = filters.filter((f) => !addedFilters.has(f.id) && !f.hasValue(props))

  function handleAdd(id: string) {
    addFilterId(id, isFilterId, setAddedFilters)
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
          <PageTabHeader
            title={phrase(companionShoppingDataContentTitle.slug)}
            subtitle={regionHint}
          />
          <Card>
            <CardContent>
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <Gamepad2 />
                  </EmptyMedia>
                  <EmptyTitle>{phrase(companionShoppingDataContentNoTarget.slug)}</EmptyTitle>
                  <EmptyDescription>
                    {phraseDescription(companionShoppingDataContentNoTarget.slug)}
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
          <PageTabHeader
            title={phrase(companionShoppingDataContentTitle.slug)}
            subtitle={regionHint}
          />
          <Card>
            <CardContent>
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <PackageCheck />
                  </EmptyMedia>
                  <EmptyTitle>{phrase(companionShoppingDataContentAllOwned.slug)}</EmptyTitle>
                  <EmptyDescription>
                    {phraseDescription(companionShoppingDataContentAllOwned.slug)}
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
        <PageTabHeader title={phrase(companionShoppingDataContentTitle.slug)} subtitle={regionHint}>
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
