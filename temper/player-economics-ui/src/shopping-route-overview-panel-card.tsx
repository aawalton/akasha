"use client"

import { scrollToCard } from "@shared/design-layout/utils/scroll-to-card"
import { ButtonBadge } from "@shared/design-badges/components/button-badge"
import { PanelCard } from "@shared/design-layout/components/panel-card"
import { CardTitleBadges } from "@shared/design-primitives/components/card"
import { ItemRow } from "@shared/design-patterns/components/item-row"
import { companionTraits } from "@temper/game-companions-core/equipment/companion-traits-data"
import { kioskLocationName } from "@temper/game-trading-pricing/ttc-kiosk-locations-data"
import { TTC_QUALITY_TEXT_CLASSES } from "@temper/player-economics-core/ttc-quality-text-classes"
import { type PurchaseRecommendation } from "@temper/player-economics-core/ttc-shopping-types"
import { Fragment, useMemo, useState } from "react"
import { formatGold } from "./companion-gear-pricing-helpers"
import type { LocationSummary } from "./shopping-optimizer-types"

export interface MissingItemDisplay {
  displayKey: string
  itemName: string
  traitName: string
  qualityClass: string | undefined
  count: number
}

interface GuildGroup {
  guildName: string
  purchases: readonly PurchaseRecommendation[]
  cost: number
}

interface LocationDetail {
  location: string
  guilds: readonly GuildGroup[]
}

interface ShoppingRouteOverviewPanelCardProps {
  purchases: readonly PurchaseRecommendation[]
  routeSummary: readonly LocationSummary[]
  totalCost: number
  totalItems: number
  currentLocationIndex: number
  stopNumber: number
  totalStops: number
  missingItems: readonly MissingItemDisplay[]
  spentTotal?: number
}

export function ShoppingRouteOverviewPanelCard({
  purchases,
  routeSummary,
  totalCost,
  totalItems,
  currentLocationIndex,
  stopNumber,
  totalStops,
  missingItems,
  spentTotal,
}: ShoppingRouteOverviewPanelCardProps) {
  const [collapsedLocations, setCollapsedLocations] = useState<Set<string>>(new Set())
  const [collapsedGuilds, setCollapsedGuilds] = useState<Set<string>>(new Set())
  const [missingExpanded, setMissingExpanded] = useState(false)
  const missingCount = missingItems.reduce((sum, item) => sum + item.count, 0)

  const locationDetails = useMemo((): readonly LocationDetail[] => {
    const locationMap = new Map<string, Map<string, PurchaseRecommendation[]>>()

    for (const loc of routeSummary) {
      locationMap.set(loc.location, new Map())
    }

    for (const purchase of purchases) {
      const loc = String(purchase.listing.GuildKioskLocationID)
      let guildMap = locationMap.get(loc)
      if (!guildMap) {
        guildMap = new Map()
        locationMap.set(loc, guildMap)
      }
      const guild = purchase.listing.GuildName
      let arr = guildMap.get(guild)
      if (!arr) {
        arr = []
        guildMap.set(guild, arr)
      }
      arr.push(purchase)
    }

    const result: LocationDetail[] = []
    for (const loc of routeSummary) {
      const guildMap = locationMap.get(loc.location)
      if (!guildMap || guildMap.size === 0) continue

      const guilds: GuildGroup[] = []
      for (const [guildName, guildPurchases] of guildMap) {
        guilds.push({
          guildName,
          purchases: guildPurchases,
          cost: guildPurchases.reduce((sum, p) => sum + p.unitPrice, 0),
        })
      }
      guilds.sort((a, b) => a.guildName.localeCompare(b.guildName))

      result.push({ location: loc.location, guilds })
    }
    return result
  }, [purchases, routeSummary])

  const toggleLocation = (loc: string) =>
    setCollapsedLocations((prev) => {
      const next = new Set(prev)
      if (next.has(loc)) next.delete(loc)
      else next.add(loc)
      return next
    })

  const toggleGuild = (key: string) =>
    setCollapsedGuilds((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })

  return (
    <PanelCard
      id="shopping-route"
      collapsible
      title="Route"
      headerSubtitle={
        <CardTitleBadges>
          <ButtonBadge
            variant="elevation-muted"
            onClick={(e) => {
              e.stopPropagation()
              scrollToCard("shopping-next-location", false)
            }}
          >
            Stop {stopNumber} of {totalStops}
          </ButtonBadge>
        </CardTitleBadges>
      }
    >
      <div className="flex flex-col gap-1.5">
        <ItemRow
          label="Total List Price"
          quantity={totalItems}
          value={totalCost > 0 ? `${formatGold(totalCost)}g` : undefined}
          accent
          actionButtonCount={1}
        />
        {spentTotal != null && spentTotal > 0 && (
          <ItemRow
            label="Spent So Far"
            value={`${formatGold(spentTotal)}g`}
            accent
            actionButtonCount={1}
          />
        )}
        {locationDetails.map((loc) => {
          const locIndex = routeSummary.findIndex((s) => s.location === loc.location)
          const summary = routeSummary[locIndex]
          if (!summary) return null
          const isLocationExpanded = !collapsedLocations.has(loc.location)

          return (
            <Fragment key={loc.location}>
              <ItemRow
                label={
                  locIndex === currentLocationIndex ? (
                    kioskLocationName(loc.location)
                  ) : (
                    <span className="text-tertiary">{kioskLocationName(loc.location)}</span>
                  )
                }
                quantity={summary.itemCount}
                value={`${formatGold(summary.cost)}g`}
                actionButtonCount={1}
                expanded={isLocationExpanded}
                onToggle={() => toggleLocation(loc.location)}
              />
              {isLocationExpanded &&
                loc.guilds.map((guild) => {
                  const guildKey = `${loc.location}:${guild.guildName}`
                  const isGuildExpanded = !collapsedGuilds.has(guildKey)

                  return (
                    <Fragment key={guildKey}>
                      <ItemRow
                        label={guild.guildName}
                        quantity={guild.purchases.length}
                        value={`${formatGold(guild.cost)}g`}
                        depth={1}
                        actionButtonCount={1}
                        expanded={isGuildExpanded}
                        onToggle={() => toggleGuild(guildKey)}
                      />
                      {isGuildExpanded &&
                        guild.purchases
                          .toSorted((a, b) =>
                            a.listing.TradeAsset.Item.Name.localeCompare(
                              b.listing.TradeAsset.Item.Name
                            )
                          )
                          .map((purchase) => {
                            const qualityClass =
                              TTC_QUALITY_TEXT_CLASSES[purchase.listing.TradeAsset.Item.QualityID]
                            const trait = purchase.key.split(":")[2]
                            const traitName =
                              trait != null && companionTraits.has(trait)
                                ? companionTraits.data[trait].name
                                : trait
                            return (
                              <ItemRow
                                key={purchase.key}
                                label={
                                  <span className={qualityClass}>
                                    {purchase.listing.TradeAsset.Item.Name} ({traitName})
                                  </span>
                                }
                                value={`${formatGold(purchase.unitPrice)}g`}
                                depth={2}
                                actionButtonCount={1}
                              />
                            )
                          })}
                    </Fragment>
                  )
                })}
            </Fragment>
          )
        })}
        {missingCount > 0 && (
          <>
            <ItemRow
              label="Not in Route"
              subtitle="No listing found, or you marked every listing unavailable"
              quantity={missingCount}
              actionButtonCount={1}
              expanded={missingExpanded}
              onToggle={() => setMissingExpanded((prev) => !prev)}
            />
            {missingExpanded &&
              missingItems
                .toSorted((a, b) =>
                  `${a.itemName} (${a.traitName})`.localeCompare(`${b.itemName} (${b.traitName})`)
                )
                .map((item) => (
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
                    depth={1}
                    actionButtonCount={1}
                  />
                ))}
          </>
        )}
      </div>
    </PanelCard>
  )
}
