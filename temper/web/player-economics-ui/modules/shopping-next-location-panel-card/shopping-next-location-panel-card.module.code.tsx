"use client"

import { ButtonBadge } from "akasha/design/interface/badge/modules/button-badge/button-badge.module.code.tsx"
import { PanelCard } from "akasha/design/interface/layout/modules/panel-card/panel-card.module.code.tsx"
import { scrollToCard } from "akasha/design/interface/layout/modules/scroll-to-card/scroll-to-card.module.code.ts"
import { ItemRow } from "akasha/design/interface/pattern/modules/item-row/item-row.module.code.tsx"
import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { CardTitleBadges } from "akasha/design/interface/primitive/modules/card/card.module.code.tsx"
import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import { companionTraits } from "akasha/temper/catalog/companion/companions-core/modules/companion-traits/companion-traits.module.code.ts"
import { TTC_QUALITY_TEXT_CLASSES } from "akasha/temper/economy/shopping/modules/ttc-quality-text-classes/ttc-quality-text-classes.module.code.ts"
import { kioskLocationName } from "akasha/temper/economy/trading/pricing/modules/kiosk-location-name/kiosk-location-name.module.code.ts"
import { useKioskNames } from "akasha/temper/web/modules/use-kiosk-names/use-kiosk-names.module.code.tsx"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { shoppingNextLocationPanelCardBoughtItem } from "akasha/temper/web/phrase/pages/shopping-next-location-panel-card-bought-item.temper-web-phrase.ts"
import { shoppingNextLocationPanelCardBoughtItems } from "akasha/temper/web/phrase/pages/shopping-next-location-panel-card-bought-items.temper-web-phrase.ts"
import { shoppingNextLocationPanelCardNextStop } from "akasha/temper/web/phrase/pages/shopping-next-location-panel-card-next-stop.temper-web-phrase.ts"
import { shoppingNextLocationPanelCardSpentSoFar } from "akasha/temper/web/phrase/pages/shopping-next-location-panel-card-spent-so-far.temper-web-phrase.ts"
import { shoppingNextLocationPanelCardStop } from "akasha/temper/web/phrase/pages/shopping-next-location-panel-card-stop.temper-web-phrase.ts"
import { shoppingNextLocationPanelCardTotalListPrice } from "akasha/temper/web/phrase/pages/shopping-next-location-panel-card-total-list-price.temper-web-phrase.ts"
import { goldIn } from "akasha/temper/web/player-economics-ui/modules/companion-gear-pricing-rules/companion-gear-pricing-rules.module.code.ts"
import type { LocationPurchase } from "akasha/temper/web/player-economics-ui/modules/shopping-optimizer-types/shopping-optimizer-types.module.code.ts"
import { ChevronRight } from "lucide-react"
import { Fragment, useEffect, useMemo, useState } from "react"

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
  const kioskNames = useKioskNames()
  const phrase = usePhrase()
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
      title={kioskLocationName(kioskNames, location)}
      headerSubtitle={
        <CardTitleBadges>
          <ButtonBadge
            variant="elevation-muted"
            onClick={(e) => {
              e.stopPropagation()
              scrollToCard("shopping-route", false)
            }}
          >
            {phrase(shoppingNextLocationPanelCardStop.slug, {
              stop: stopNumber,
              stops: totalStops,
            })}
          </ButtonBadge>
          <ButtonBadge
            variant="elevation-muted"
            onClick={(e) => {
              e.stopPropagation()
              scrollToCard("shopping-list", false)
            }}
          >
            {phrase(
              initialPurchaseCount === 1
                ? shoppingNextLocationPanelCardBoughtItem.slug
                : shoppingNextLocationPanelCardBoughtItems.slug,
              { bought: purchasedCount, count: initialPurchaseCount }
            )}
          </ButtonBadge>
        </CardTitleBadges>
      }
    >
      <div className="flex flex-col gap-1.5">
        <ItemRow
          label={phrase(shoppingNextLocationPanelCardTotalListPrice.slug)}
          quantity={totalItems}
          value={locationCost > 0 ? goldIn(phrase, locationCost) : undefined}
          accent
          actionButtonCount={2}
        />
        {spentTotal > 0 && (
          <ItemRow
            label={phrase(shoppingNextLocationPanelCardSpentSoFar.slug)}
            value={goldIn(phrase, spentTotal)}
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
                value={goldIn(phrase, guildCost)}
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
                      trait != null ? (companionTraits().data[trait]?.name ?? trait) : trait

                    return (
                      <ItemRow
                        key={purchase.key}
                        label={
                          <span className={cn(qualityClass)}>
                            {itemName} ({traitName})
                          </span>
                        }
                        value={goldIn(phrase, purchase.unitPrice)}
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
            {phrase(shoppingNextLocationPanelCardNextStop.slug)}
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}
    </PanelCard>
  )
}
