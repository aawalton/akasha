"use client"

import { ListContentSkeleton } from "@shared/design-layout/components/list-content-skeleton"
import { PageLayout, PageTitle } from "@shared/design-layout/components/page-layout"
import { tabbedPageSkeleton } from "@shared/design-layout/components/skeleton-presets"
import { QueryErrorBoundary } from "@shared/design-patterns/components/query-error-boundary"
import { PageTabsTrigger, Tabs, TabsContent, TabsList } from "@shared/design-patterns/components/tabs"
import { useFilterPersistence } from "@shared/design-patterns/hooks/use-filter-persistence"
import { type CompanionEquipmentQualityId } from "@temper/game-companions-core/equipment/companion-equipment-quality-data"
import { companionEquipmentQualities } from "@temper/game-companions-core/generated/temper-companion-equipment-quality.generated"
import { Handshake, ShoppingCart } from "lucide-react"
import { Suspense } from "react"
import { CompanionShoppingDataContent } from "./companion-shopping-data-content"
import { ShoppingListTabContent } from "./shopping-list-tab-content"
import type { ShoppingMarks, UpdateShoppingMarks } from "./shopping-optimizer-types"
import { useShoppingList } from "./use-shopping-list"

type TabValue = "list" | "companion"

function isValidTab(raw: unknown): raw is TabValue {
  return raw === "list" || raw === "companion"
}

function isValidGearOwnership(value: unknown): value is "owned" | "unowned" {
  return value === "owned" || value === "unowned"
}

function isValidGearQualities(value: unknown): readonly CompanionEquipmentQualityId[] | undefined {
  if (typeof value === "string") {
    if (value === "") return []
    const arr = value
      .split(",")
      .filter(companionEquipmentQualities.has.bind(companionEquipmentQualities))
      .filter((q) => q !== "no-quality")
    return arr.length > 0 ? arr : undefined
  }
  if (Array.isArray(value)) {
    if (
      value.every(
        (v) => typeof v === "string" && companionEquipmentQualities.has(v) && v !== "no-quality"
      )
    )
      return value
    return undefined
  }
  return undefined
}

type ShoppingFilterValues = {
  tab: TabValue
  gearOwnership: string | null
  gearQualities: readonly CompanionEquipmentQualityId[]
}

interface ShoppingPageContentProps {
  initialTab?: string
  initialGearOwnership?: string
  initialGearQualities?: string
  userId: string | null
  shoppingMarks: ShoppingMarks
  onUpdateShoppingMarks: UpdateShoppingMarks
}

export function ShoppingPageContent({
  initialTab,
  initialGearOwnership,
  initialGearQualities,
  userId,
  shoppingMarks,
  onUpdateShoppingMarks,
}: ShoppingPageContentProps) {
  const shoppingList = useShoppingList(userId)

  const { values, update } = useFilterPersistence<ShoppingFilterValues>({
    storageKey: `temper:shopping:filters:${userId}`,
    fields: {
      tab: {
        urlParam: "tab",
        defaultValue: "list" satisfies TabValue,
        initial: initialTab,
        validate: (raw) => (isValidTab(raw) ? raw : undefined),
        toParam: (v) => (v === "list" ? null : v),
      },
      gearOwnership: {
        urlParam: "gear",
        defaultValue: "unowned",
        initial: initialGearOwnership,
        validate: (raw) => (isValidGearOwnership(raw) ? raw : undefined),
      },
      gearQualities: {
        urlParam: "gear-quality",
        defaultValue: [],
        initial: initialGearQualities,
        validate: (raw) => isValidGearQualities(raw),
        toParam: (v: readonly CompanionEquipmentQualityId[]) => (v.length > 0 ? v.join(",") : null),
      },
    },
  })

  return (
    <PageLayout
      skeleton={tabbedPageSkeleton({
        titleWidth: 130,
        initialTab,
        defaultTab: "list",
        tabs: ["list", "companion"],
      })}
    >
      <PageLayout.Header>
        <PageTitle>Shopping</PageTitle>
      </PageLayout.Header>

      <Tabs value={values.tab} onValueChange={(v) => update({ tab: isValidTab(v) ? v : "list" })}>
        <PageLayout.Tabs>
          <TabsList className="@[1016px]:grid grid h-18 w-full @[1016px]:grid-cols-2 grid-cols-2 rounded-none min-[584px]:flex min-[584px]:h-9 min-[584px]:rounded-lg">
            <PageTabsTrigger value="list" icon={<ShoppingCart />} label="Shopping List" />
            <PageTabsTrigger value="companion" icon={<Handshake />} label="Companion" />
          </TabsList>
        </PageLayout.Tabs>

        <PageLayout.Content>
          <TabsContent value="list">
            <QueryErrorBoundary>
              <Suspense fallback={<ListContentSkeleton showTabTitle={false} />}>
                <ShoppingListTabContent
                  userId={userId}
                  shoppingList={shoppingList}
                  shoppingMarks={shoppingMarks}
                  onUpdateShoppingMarks={onUpdateShoppingMarks}
                />
              </Suspense>
            </QueryErrorBoundary>
          </TabsContent>

          <TabsContent value="companion">
            <QueryErrorBoundary>
              <Suspense fallback={<ListContentSkeleton showTabTitle={false} />}>
                <CompanionShoppingDataContent
                  userId={userId}
                  gearOwnership={values.gearOwnership}
                  gearQualities={values.gearQualities}
                  shoppingList={shoppingList}
                  onFilterChange={update}
                />
              </Suspense>
            </QueryErrorBoundary>
          </TabsContent>
        </PageLayout.Content>
      </Tabs>
    </PageLayout>
  )
}
