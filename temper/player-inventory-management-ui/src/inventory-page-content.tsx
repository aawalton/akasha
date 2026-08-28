"use client"

import { ListContentSkeleton } from "@shared/design-layout/components/list-content-skeleton"
import { PageLayout, PageTitle } from "@shared/design-layout/components/page-layout"
import { tabbedPageSkeleton } from "@shared/design-layout/components/skeleton-presets"
import { QueryErrorBoundary } from "@shared/design-patterns/components/query-error-boundary"
import { PageTabsTrigger, Tabs, TabsContent, TabsList } from "@shared/design-patterns/components/tabs"
import { useFilterPersistence } from "@shared/design-patterns/hooks/use-filter-persistence"
import { type SortDirection } from "@shared/design-patterns/utils/sort-types"
import { LayoutList, MapPin, Scale, TrendingUp } from "lucide-react"
import { Suspense } from "react"
import {
  type ActiveStatusFilter,
  type FilterValues,
  isValidArmorTraits,
  isValidCompanionTraits,
  isValidJewelryTraits,
  isValidQualities,
  isValidRuleAction,
  isValidRuleCategory,
  isValidRuleGoal,
  isValidRuleLock,
  isValidRuleSortField,
  isValidRuleStatus,
  isValidSortDirection,
  isValidSortField,
  isValidWeaponTraits,
  type LockStatusFilter,
  type RuleSortField,
  type SortField,
} from "./inventory-filter-types"
import { InventoryLocationDataContent } from "./inventory-location-data-content"
import { InventoryRulesTab } from "./inventory-rules-tab"
import { InventoryTrendsTab } from "./inventory-trends-tab"
import { InventoryTypeDataContent } from "./inventory-type-data-content"

type TabValue = "type" | "location" | "trends" | "rules"

function isValidTab(raw: unknown): TabValue | undefined {
  if (raw === "type" || raw === "location" || raw === "trends" || raw === "rules") return raw
  if (raw === "category") return "type"
  return undefined
}

type InventoryFilterValues = FilterValues & {
  tab: TabValue
  ruleStatus: readonly ActiveStatusFilter[]
  ruleLock: readonly LockStatusFilter[]
  ruleGoal: readonly string[]
  ruleAction: string | null
  ruleCategory: string
  ruleLocation: string | null
  ruleSearch: string
  ruleSortBy: RuleSortField
  ruleSortDir: SortDirection
}

interface InventoryPageContentProps {
  initialTab?: string
  initialSearch?: string
  initialSort?: string
  initialDirection?: string
  initialQuality?: string
  initialArmorTrait?: string
  initialWeaponTrait?: string
  initialJewelryTrait?: string
  initialCompanionTrait?: string
  initialStatus?: string
  initialLock?: string
  initialGoal?: string
  initialAction?: string
  initialRuleCategory?: string
  initialRuleSearch?: string
  initialRuleSort?: string
  initialRuleDir?: string
  initialRuleLocation?: string
}

export function InventoryPageContent({
  initialTab,
  initialSearch,
  initialSort,
  initialDirection,
  initialQuality,
  initialArmorTrait,
  initialWeaponTrait,
  initialJewelryTrait,
  initialCompanionTrait,
  initialStatus,
  initialLock,
  initialGoal,
  initialAction,
  initialRuleCategory,
  initialRuleSearch,
  initialRuleSort,
  initialRuleDir,
  initialRuleLocation,
}: InventoryPageContentProps) {
  const { values, deferred, update } = useFilterPersistence<InventoryFilterValues>({
    storageKey: "temper:inventory:filters",
    fields: {
      tab: {
        urlParam: "tab",
        defaultValue: "rules" satisfies TabValue,
        initial: initialTab,
        validate: (raw) => isValidTab(raw),
        toParam: (v) => (v === "rules" ? null : v),
      },
      search: {
        urlParam: "q",
        defaultValue: "",
        initial: initialSearch,
        validate: (raw) => (typeof raw === "string" && raw.length > 0 ? raw : undefined),
        toParam: (v) => (v.length > 0 ? v : null),
      },
      sortBy: {
        urlParam: "sort",
        defaultValue: "name" satisfies SortField,
        initial: initialSort,
        validate: (raw) => (isValidSortField(raw) ? raw : undefined),
        toParam: (v) => (v === "name" ? null : v),
      },
      sortDirection: {
        urlParam: "dir",
        defaultValue: "asc" satisfies SortDirection,
        initial: initialDirection,
        validate: (raw) => (isValidSortDirection(raw) ? raw : undefined),
        toParam: (v) => (v === "asc" ? null : v),
      },
      qualities: {
        urlParam: "quality",
        defaultValue: [],
        initial: initialQuality,
        validate: (raw) => isValidQualities(raw),
        toParam: (v) => (v.length > 0 ? v.join(",") : null),
      },
      armorTraits: {
        urlParam: "at",
        defaultValue: [],
        initial: initialArmorTrait,
        validate: (raw) => isValidArmorTraits(raw),
        toParam: (v) => (v.length > 0 ? v.join(",") : null),
      },
      weaponTraits: {
        urlParam: "wt",
        defaultValue: [],
        initial: initialWeaponTrait,
        validate: (raw) => isValidWeaponTraits(raw),
        toParam: (v) => (v.length > 0 ? v.join(",") : null),
      },
      jewelryTraits: {
        urlParam: "jt",
        defaultValue: [],
        initial: initialJewelryTrait,
        validate: (raw) => isValidJewelryTraits(raw),
        toParam: (v) => (v.length > 0 ? v.join(",") : null),
      },
      companionTraits: {
        urlParam: "ct",
        defaultValue: [],
        initial: initialCompanionTrait,
        validate: (raw) => isValidCompanionTraits(raw),
        toParam: (v) => (v.length > 0 ? v.join(",") : null),
      },
      ruleStatus: {
        urlParam: "status",
        defaultValue: [],
        initial: initialStatus,
        validate: (raw) => isValidRuleStatus(raw),
        toParam: (v) => (v.length > 0 ? v.join(",") : null),
      },
      ruleLock: {
        urlParam: "lock",
        defaultValue: [],
        initial: initialLock,
        validate: (raw) => isValidRuleLock(raw),
        toParam: (v) => (v.length > 0 ? v.join(",") : null),
      },
      ruleGoal: {
        urlParam: "goal",
        defaultValue: [],
        initial: initialGoal,
        validate: (raw) => isValidRuleGoal(raw),
        toParam: (v) => (v.length > 0 ? v.join(",") : null),
      },
      ruleAction: {
        urlParam: "action",
        defaultValue: null,
        initial: initialAction,
        validate: (raw) => isValidRuleAction(raw),
        toParam: (v) => v,
      },
      ruleCategory: {
        urlParam: "rcat",
        defaultValue: "",
        initial: initialRuleCategory,
        validate: (raw) => isValidRuleCategory(raw),
        toParam: (v) => (v.length > 0 ? v : null),
      },
      ruleLocation: {
        urlParam: "rloc",
        defaultValue: null,
        initial: initialRuleLocation,
        validate: (raw) => (typeof raw === "string" && raw.length > 0 ? raw : undefined),
        toParam: (v) => v,
      },
      ruleSearch: {
        urlParam: "rq",
        defaultValue: "",
        initial: initialRuleSearch,
        validate: (raw) => (typeof raw === "string" && raw.length > 0 ? raw : undefined),
        toParam: (v) => (v.length > 0 ? v : null),
      },
      ruleSortBy: {
        urlParam: "rsort",
        defaultValue: "priority" satisfies RuleSortField,
        initial: initialRuleSort,
        validate: (raw) => (isValidRuleSortField(raw) ? raw : undefined),
        toParam: (v) => (v === "priority" ? null : v),
      },
      ruleSortDir: {
        urlParam: "rdir",
        defaultValue: "asc" satisfies SortDirection,
        initial: initialRuleDir,
        validate: (raw) => (isValidSortDirection(raw) ? raw : undefined),
        toParam: (v) => (v === "asc" ? null : v),
      },
    },
  })

  function handleClearFilters() {
    update({
      search: "",
      qualities: [],
      armorTraits: [],
      weaponTraits: [],
      jewelryTraits: [],
      companionTraits: [],
      sortBy: "name",
      sortDirection: "asc",
    })
  }

  return (
    <PageLayout
      skeleton={tabbedPageSkeleton({
        titleWidth: 144,
        initialTab,
        defaultTab: "rules",
        tabs: ["rules", "type", "location", "trends"],
      })}
    >
      <PageLayout.Header>
        <PageTitle>Inventory</PageTitle>
      </PageLayout.Header>

      <Tabs value={values.tab} onValueChange={(v) => update({ tab: isValidTab(v) ?? "rules" })}>
        <PageLayout.Tabs>
          <TabsList className="@[1016px]:grid grid h-18 w-full @[1016px]:grid-cols-4 grid-cols-4 rounded-none min-[584px]:flex min-[584px]:h-9 min-[584px]:rounded-lg">
            <PageTabsTrigger value="rules" icon={<Scale />} label="Rules" />
            <PageTabsTrigger value="type" icon={<LayoutList />} label="By Type" />
            <PageTabsTrigger value="location" icon={<MapPin />} label="By Location" />
            <PageTabsTrigger value="trends" icon={<TrendingUp />} label="Trends" />
          </TabsList>
        </PageLayout.Tabs>
        <PageLayout.Content>
          <TabsContent value="rules">
            <QueryErrorBoundary>
              <Suspense fallback={<ListContentSkeleton showTabTitle={false} />}>
                <InventoryRulesTab
                  ruleStatus={values.ruleStatus}
                  ruleLock={values.ruleLock}
                  ruleGoal={values.ruleGoal}
                  ruleAction={values.ruleAction}
                  ruleCategory={values.ruleCategory}
                  ruleLocation={values.ruleLocation}
                  ruleSearch={values.ruleSearch}
                  ruleSortBy={values.ruleSortBy}
                  ruleSortDir={values.ruleSortDir}
                  onRuleStatusChange={(ruleStatus) => update({ ruleStatus })}
                  onRuleLockChange={(ruleLock) => update({ ruleLock })}
                  onRuleGoalChange={(ruleGoal) => update({ ruleGoal })}
                  onRuleActionChange={(ruleAction) => update({ ruleAction })}
                  onRuleCategoryChange={(ruleCategory) => update({ ruleCategory })}
                  onRuleLocationChange={(ruleLocation) => update({ ruleLocation })}
                  onRuleSearchChange={(ruleSearch) => update({ ruleSearch })}
                  onRuleSortChange={(ruleSortBy, ruleSortDir) =>
                    update({ ruleSortBy, ruleSortDir })
                  }
                  deferred={deferred}
                />
              </Suspense>
            </QueryErrorBoundary>
          </TabsContent>
          <TabsContent value="type">
            <QueryErrorBoundary>
              <Suspense fallback={<ListContentSkeleton showTabTitle={false} />}>
                <InventoryTypeDataContent
                  search={values.search}
                  qualities={values.qualities}
                  onSearchChange={(search) => update({ search })}
                  onQualitiesChange={(qualities) => update({ qualities })}
                  armorTraits={values.armorTraits}
                  onArmorTraitsChange={(armorTraits) => update({ armorTraits })}
                  weaponTraits={values.weaponTraits}
                  onWeaponTraitsChange={(weaponTraits) => update({ weaponTraits })}
                  jewelryTraits={values.jewelryTraits}
                  onJewelryTraitsChange={(jewelryTraits) => update({ jewelryTraits })}
                  companionTraits={values.companionTraits}
                  onCompanionTraitsChange={(companionTraits) => update({ companionTraits })}
                  sortBy={values.sortBy}
                  sortDirection={values.sortDirection}
                  onSortChange={(sortBy, sortDirection) => update({ sortBy, sortDirection })}
                  onClearFilters={handleClearFilters}
                  deferred={deferred}
                />
              </Suspense>
            </QueryErrorBoundary>
          </TabsContent>
          <TabsContent value="location">
            <QueryErrorBoundary>
              <Suspense fallback={<ListContentSkeleton showTabTitle={false} />}>
                <InventoryLocationDataContent
                  search={values.search}
                  qualities={values.qualities}
                  onSearchChange={(search) => update({ search })}
                  onQualitiesChange={(qualities) => update({ qualities })}
                  armorTraits={values.armorTraits}
                  onArmorTraitsChange={(armorTraits) => update({ armorTraits })}
                  weaponTraits={values.weaponTraits}
                  onWeaponTraitsChange={(weaponTraits) => update({ weaponTraits })}
                  jewelryTraits={values.jewelryTraits}
                  onJewelryTraitsChange={(jewelryTraits) => update({ jewelryTraits })}
                  companionTraits={values.companionTraits}
                  onCompanionTraitsChange={(companionTraits) => update({ companionTraits })}
                  sortBy={values.sortBy}
                  sortDirection={values.sortDirection}
                  onSortChange={(sortBy, sortDirection) => update({ sortBy, sortDirection })}
                  onClearFilters={handleClearFilters}
                  deferred={deferred}
                />
              </Suspense>
            </QueryErrorBoundary>
          </TabsContent>
          <TabsContent value="trends">
            <QueryErrorBoundary>
              <Suspense fallback={<ListContentSkeleton showTabTitle={false} />}>
                <InventoryTrendsTab />
              </Suspense>
            </QueryErrorBoundary>
          </TabsContent>
        </PageLayout.Content>
      </Tabs>
    </PageLayout>
  )
}
