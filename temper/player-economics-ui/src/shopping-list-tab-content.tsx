"use client"

import { ButtonBadge } from "@shared/design-badges/components/button-badge"
import { PageTabHeader } from "@shared/design-layout/components/page-tab-header"
import { PanelCard } from "@shared/design-layout/components/panel-card"
import { PanelToggleProvider } from "@shared/design-layout/components/panel-toggle-provider"
import { ResponsiveColumns } from "@shared/design-layout/components/responsive-columns"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@shared/design-primitives/components/alert-dialog"
import { Card, CardContent, CardTitleBadges } from "@shared/design-primitives/components/card"
import { Progress } from "@shared/design-primitives/components/progress"
import { Text } from "@shared/design-primitives/components/text"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@shared/design-patterns/components/empty"
import { ItemRow } from "@shared/design-patterns/components/item-row"
import { needToShoppingItem, needToShoppingKey } from "@temper/player-economics-core/companion-gear-shopping-bridge"
import { isShoppingSettings } from "@temper/player-economics-core/shopping-not-available-types"
import { PricingRegionNote } from "@temper/player-inventory-management-ui/pricing-region-note"
import { ShoppingCart } from "lucide-react"
import { Fragment, useCallback, useMemo, useState } from "react"
import { formatGold } from "./companion-gear-pricing-helpers"
import {
  buildCategoryGroups,
  buildMissingItemDisplays,
  type IndexedNeed,
} from "./shopping-list-grouping"
import { ShoppingNextLocationPanelCard } from "./shopping-next-location-panel-card"
import type { ShoppingMarks, UpdateShoppingMarks } from "./shopping-optimizer-types"
import { ShoppingRouteOverviewPanelCard } from "./shopping-route-overview-panel-card"
import { ShoppingTripCompletePanelCard } from "./shopping-trip-complete-panel-card"
import { useCompanionShoppingData } from "./use-companion-shopping-data"
import type { ShoppingList } from "./use-shopping-list"
import { useShoppingOptimizer } from "./use-shopping-optimizer"

interface ShoppingListTabContentProps {
  userId: string | null
  shoppingList: ShoppingList
  shoppingMarks: ShoppingMarks
  onUpdateShoppingMarks: UpdateShoppingMarks
}

export function ShoppingListTabContent({
  userId,
  shoppingList,
  shoppingMarks,
  onUpdateShoppingMarks,
}: ShoppingListTabContentProps) {
  const { unownedNeeds, pricing, slotPriceMap, blendedPriceMap, regionNote, pricingRegion } =
    useCompanionShoppingData(userId)
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  const rawShoppingSettings = useMemo(() => {
    if (!shoppingMarks) return null
    return isShoppingSettings(shoppingMarks) ? shoppingMarks : null
  }, [shoppingMarks])

  const optimizer = useShoppingOptimizer(
    shoppingList,
    {
      raw: rawShoppingSettings,
      userId,
    },
    onUpdateShoppingMarks
  )

  const listedNeeds = useMemo(() => {
    const result: IndexedNeed[] = []
    for (const [i, need] of unownedNeeds.entries()) {
      const key = needToShoppingKey(need)
      if (shoppingList.has(key)) {
        result.push({ need, index: i, key })
      }
    }
    return result
  }, [unownedNeeds, shoppingList])

  const categories = useMemo(
    () => buildCategoryGroups(listedNeeds, slotPriceMap, blendedPriceMap),
    [listedNeeds, slotPriceMap, blendedPriceMap]
  )

  const totalCost = useMemo(() => {
    let total = 0
    for (const cat of categories) {
      for (const item of cat.items) {
        if (item.unitPrice != null) total += item.unitPrice * item.count
      }
    }
    return total > 0 ? total : null
  }, [categories])

  const allKeys = useMemo(() => listedNeeds.map((n) => n.key), [listedNeeds])

  const missingGroupedItems = useMemo(
    () => buildMissingItemDisplays(optimizer.state.plan, optimizer.state.missingItems, listedNeeds),
    [optimizer.state.plan, optimizer.state.missingItems, listedNeeds]
  )

  const handleFindListings = useCallback(() => {
    const items = listedNeeds
      .map(({ need }) => needToShoppingItem(need, pricing))
      .filter((item): item is NonNullable<typeof item> => item !== null)

    if (items.length > 0) {
      optimizer.actions.findListings(items)
    }
  }, [listedNeeds, pricing, optimizer.actions])

  const { status } = optimizer.state
  const isSearching = status === "searching"
  const isComplete = status === "complete"

  const regionHint = (
    <PricingRegionNote
      kind={regionNote}
      platform={pricingRegion.platform}
      server={pricingRegion.server}
    />
  )

  const tripInProgress = isComplete && optimizer.state.purchasedCount > 0

  const handleClearListClick = () => {
    if (tripInProgress) {
      setShowClearConfirm(true)
    } else {
      shoppingList.removeAll(allKeys)
      if (isComplete) optimizer.actions.reset()
    }
  }
  const handleConfirmClear = () => {
    shoppingList.removeAll(allKeys)
    optimizer.actions.reset()
    setShowClearConfirm(false)
  }

  if (listedNeeds.length === 0 && tripInProgress) {
    return (
      <PanelToggleProvider>
        <div className="flex flex-col gap-6">
          <PageTabHeader title="Shopping List" subtitle={regionHint} />
          <ShoppingTripCompletePanelCard
            spentTotal={optimizer.state.spentTotal}
            purchasedCount={optimizer.state.purchasedCount}
            completedLocationCount={optimizer.state.completedLocationCount}
            onStartOver={optimizer.actions.reset}
          />
        </div>
      </PanelToggleProvider>
    )
  }

  if (listedNeeds.length === 0) {
    return (
      <PanelToggleProvider>
        <div className="flex flex-col gap-6">
          <PageTabHeader title="Shopping List" subtitle={regionHint} />
          <Card>
            <CardContent>
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <ShoppingCart />
                  </EmptyMedia>
                  <EmptyTitle>Shopping list is empty</EmptyTitle>
                  <EmptyDescription>
                    Add items from the Companion tab to start building your shopping list.
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
        <PageTabHeader title="Shopping List" subtitle={regionHint} />
        <ResponsiveColumns hasSummaryPanel>
          <PanelCard
            id="shopping-list"
            collapsible
            title="Shopping List"
            headerSubtitle={
              <CardTitleBadges>
                <ButtonBadge
                  variant="elevation-muted"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (isSearching) {
                      optimizer.actions.reset()
                    } else {
                      handleFindListings()
                    }
                  }}
                  disabled={!isSearching && listedNeeds.length === 0}
                  className="disabled:cursor-not-allowed disabled:opacity-38"
                >
                  {isSearching ? "Stop Search" : "Find Listings"}
                </ButtonBadge>
                <ButtonBadge
                  variant="elevation-muted"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleClearListClick()
                  }}
                >
                  Clear List
                </ButtonBadge>
              </CardTitleBadges>
            }
          >
            <div className="flex flex-col gap-1.5">
              <ItemRow
                label="Total Estimated"
                quantity={listedNeeds.length}
                value={totalCost !== null ? `${formatGold(totalCost)}g` : undefined}
                accent
                actionButtonCount={2}
              />
              {categories.map((cat) => {
                const isExpanded = expandedCategories.has(cat.category)
                return (
                  <Fragment key={cat.category}>
                    <ItemRow
                      label={cat.category}
                      quantity={cat.totalCount}
                      value={cat.totalCost != null ? `${formatGold(cat.totalCost)}g` : undefined}
                      actionButtonCount={2}
                      onRemove={() =>
                        shoppingList.removeAll(cat.items.flatMap((item) => item.keys))
                      }
                      expanded={isExpanded}
                      onToggle={() =>
                        setExpandedCategories((prev) => {
                          const next = new Set(prev)
                          if (next.has(cat.category)) next.delete(cat.category)
                          else next.add(cat.category)
                          return next
                        })
                      }
                    />
                    {isExpanded &&
                      cat.items.map((item) => (
                        <ItemRow
                          key={item.displayKey}
                          label={
                            item.qualityClass != null ? (
                              <span className={item.qualityClass}>
                                {item.itemName} ({item.traitName})
                              </span>
                            ) : (
                              `${item.itemName} (${item.traitName})`
                            )
                          }
                          quantity={item.count > 1 ? item.count : undefined}
                          value={
                            item.unitPrice != null ? `${formatGold(item.unitPrice)}g` : undefined
                          }
                          depth={1}
                          actionButtonCount={2}
                          onRemove={() => shoppingList.removeAll(item.keys)}
                        />
                      ))}
                  </Fragment>
                )
              })}
            </div>
            {isSearching && (
              <div className="flex flex-col gap-2 pt-3">
                <Progress value={optimizer.state.progress} />
                <Text variant="caption">
                  Searching items ({optimizer.state.searchCompleted} / {optimizer.state.searchTotal}
                  )
                </Text>
              </div>
            )}
            {optimizer.state.status === "error" && (
              <Text variant="caption" className="pt-2 text-orange">
                {optimizer.state.error}
              </Text>
            )}
          </PanelCard>
          {isComplete && (
            <ShoppingRouteOverviewPanelCard
              purchases={optimizer.state.plan?.purchases ?? []}
              routeSummary={optimizer.derived.routeSummary}
              totalCost={optimizer.state.plan?.totalCost ?? 0}
              totalItems={optimizer.state.plan?.purchases.length ?? 0}
              currentLocationIndex={optimizer.state.currentLocationIndex}
              stopNumber={optimizer.derived.stopNumber}
              totalStops={optimizer.derived.totalStops}
              missingItems={missingGroupedItems}
              spentTotal={optimizer.state.spentTotal}
            />
          )}
          {isComplete && optimizer.derived.currentLocation != null && (
            <ShoppingNextLocationPanelCard
              location={optimizer.derived.currentLocation}
              stopNumber={optimizer.derived.stopNumber}
              totalStops={optimizer.derived.totalStops}
              locationCost={optimizer.derived.currentLocationCost}
              locationPurchases={optimizer.derived.locationPurchases}
              purchasedCount={optimizer.state.purchasedCount}
              initialPurchaseCount={optimizer.state.initialPurchaseCount}
              spentTotal={optimizer.state.spentTotal}
              onPurchased={optimizer.actions.markPurchased}
              onNotAvailable={optimizer.actions.markNotAvailable}
              onAdvance={optimizer.actions.advanceLocation}
            />
          )}
        </ResponsiveColumns>
        <AlertDialog open={showClearConfirm} onOpenChange={setShowClearConfirm}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Abandon shopping trip?</AlertDialogTitle>
              <AlertDialogDescription>
                You've spent {formatGold(optimizer.state.spentTotal)}g on{" "}
                {optimizer.state.purchasedCount} item(s) so far. Clearing the list discards this
                trip and its progress.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep Trip</AlertDialogCancel>
              <AlertDialogAction variant="destructive" onClick={handleConfirmClear}>
                Clear List
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </PanelToggleProvider>
  )
}
