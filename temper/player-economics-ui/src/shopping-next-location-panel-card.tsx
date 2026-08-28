"use client"

import { scrollToCard } from "@shared/design-layout/utils/scroll-to-card"
import { ButtonBadge } from "@shared/design-badges/components/button-badge"
import { PanelCard } from "@shared/design-layout/components/panel-card"
import { Button } from "@shared/design-primitives/components/button"
import { CardTitleBadges } from "@shared/design-primitives/components/card"
import { ItemRow } from "@shared/design-patterns/components/item-row"
import { cn } from "@shared/design-primitives/utils/cn"
import { companionTraits } from "@temper/game-companions-core/equipment/companion-traits-data"
import { kioskLocationName } from "@temper/game-trading-pricing/ttc-kiosk-locations-data"
import { TTC_QUALITY_TEXT_CLASSES } from "@temper/player-economics-core/ttc-quality-text-classes"
import { ChevronRight } from "lucide-react"
import { Fragment, useEffect, useMemo, useState } from "react"
import { formatGold } from "./companion-gear-pricing-helpers"
import type { LocationPurchase } from "./shopping-optimizer-types"

interface ShoppingNextLocationPanelCardProps {
  location: string
  stopNumber: number
  totalStops: number
  locationCost: number
  locationPurchases: readonly LocationPurchase[]
  purchasedCount: number
  initialPurchaseCount: number
  spentTotal: number
  onPurchased: (key: string) => void
  onNotAvailable: (key: string) => void
  onAdvance: () => void
}

export function ShoppingNextLocationPanelCard({
  location,
  stopNumber,
  totalStops,
  locationCost,
  locationPurchases,
  purchasedCount,
  initialPurchaseCount,
  spentTotal,
  onPurchased,
  onNotAvailable,
  onAdvance,
}: ShoppingNextLocationPanelCardProps) {
  const allGuildNames = locationPurchases.map((g) => g.guildName)
  const guildKey = useMemo(() => allGuildNames.join("\0"), [locationPurchases])
  const [expandedGuilds, setExpandedGuilds] = useState<Set<string>>(() => new Set(allGuildNames))

  useEffect(() => {
    setExpandedGuilds(new Set(locationPurchases.map((g) => g.guildName)))
  }, [guildKey])

  const totalItems = locationPurchases.reduce((sum, g) => sum + g.purchases.length, 0)
  const isLastStop = stopNumber >= totalStops

  return (
    <PanelCard
      id="shopping-next-location"
      collapsible
      defaultOpen
      title={kioskLocationName(location)}
      headerSubtitle={
        <CardTitleBadges>
          <ButtonBadge
            variant="elevation-muted"
            onClick={(e) => {
              e.stopPropagation()
              scrollToCard("shopping-route", false)
            }}
          >
            Stop {stopNumber} of {totalStops}
          </ButtonBadge>
          <ButtonBadge
            variant="elevation-muted"
            onClick={(e) => {
              e.stopPropagation()
              scrollToCard("shopping-list", false)
            }}
          >
            {purchasedCount}/{initialPurchaseCount} items
          </ButtonBadge>
        </CardTitleBadges>
      }
    >
      <div className="flex flex-col gap-1.5">
        <ItemRow
          label="Total List Price"
          quantity={totalItems}
          value={locationCost > 0 ? `${formatGold(locationCost)}g` : undefined}
          accent
          actionButtonCount={2}
        />
        {spentTotal > 0 && (
          <ItemRow
            label="Spent So Far"
            value={`${formatGold(spentTotal)}g`}
            accent
            actionButtonCount={2}
          />
        )}
        {locationPurchases.map((group) => {
          const isExpanded = expandedGuilds.has(group.guildName)
          const guildCost = group.purchases.reduce((sum, p) => sum + p.unitPrice, 0)

          return (
            <Fragment key={group.guildName}>
              <ItemRow
                label={group.guildName}
                quantity={group.purchases.length}
                value={`${formatGold(guildCost)}g`}
                actionButtonCount={2}
                onRemove={() => {
                  for (const p of group.purchases) onNotAvailable(p.key)
                }}
                expanded={isExpanded}
                onToggle={() =>
                  setExpandedGuilds((prev) => {
                    const next = new Set(prev)
                    if (next.has(group.guildName)) next.delete(group.guildName)
                    else next.add(group.guildName)
                    return next
                  })
                }
              />
              {isExpanded &&
                group.purchases
                  .toSorted((a, b) =>
                    a.listing.TradeAsset.Item.Name.localeCompare(b.listing.TradeAsset.Item.Name)
                  )
                  .map((purchase) => {
                    const qualityClass =
                      TTC_QUALITY_TEXT_CLASSES[purchase.listing.TradeAsset.Item.QualityID]
                    const itemName = purchase.listing.TradeAsset.Item.Name
                    const trait = purchase.key.split(":")[2]
                    const traitName =
                      trait != null && companionTraits.has(trait)
                        ? companionTraits.data[trait].name
                        : trait

                    return (
                      <ItemRow
                        key={purchase.key}
                        label={
                          <span className={cn(qualityClass)}>
                            {itemName} ({traitName})
                          </span>
                        }
                        value={`${formatGold(purchase.unitPrice)}g`}
                        depth={1}
                        actionButtonCount={2}
                        onRemove={() => onNotAvailable(purchase.key)}
                        onAccept={() => onPurchased(purchase.key)}
                      />
                    )
                  })}
            </Fragment>
          )
        })}
      </div>
      {totalItems === 0 && !isLastStop && (
        <div className="flex justify-end pt-1.5">
          <Button variant="secondary" size="sm" onClick={onAdvance}>
            Next Stop
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}
    </PanelCard>
  )
}
