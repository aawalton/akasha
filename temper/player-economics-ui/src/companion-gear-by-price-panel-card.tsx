"use client"

import { ButtonBadge } from "@shared/design-badges/components/button-badge"
import { PanelCard } from "@shared/design-layout/components/panel-card"
import { CardTitleBadges } from "@shared/design-primitives/components/card"
import { ItemRow } from "@shared/design-patterns/components/item-row"
import { requireGet } from "@shared/utils-narrow/require-get"
import { companionTraits } from "@temper/game-companions-core/equipment/companion-traits-data"
import { getQualityClassName } from "@temper/game-companions-ui/companion-equipment-quality-helpers"
import type { CompanionGearNeed } from "@temper/game-items-core/companion-gear-diff"
import type { PricingData } from "@temper/game-trading-pricing/pricing-types"
import { needToShoppingKey } from "@temper/player-economics-core/companion-gear-shopping-bridge"
import { useMemo, useState } from "react"
import {
  buildBlendedPriceMap,
  buildSlotPriceMap,
  computeTotalCost,
  formatGold,
  getCompanionGearItemName,
  resolveNeedPrice,
} from "./companion-gear-pricing-helpers"
import type { ShoppingList } from "./use-shopping-list"

interface PriceBucket {
  label: string
  min: number
  max: number
}

const PRICE_BUCKETS: PriceBucket[] = [
  { label: "< 100g", min: 0, max: 99 },
  { label: "< 1,000g", min: 100, max: 999 },
  { label: "< 10,000g", min: 1_000, max: 9_999 },
  { label: "< 100,000g", min: 10_000, max: 99_999 },
  { label: "< 1,000,000g", min: 100_000, max: 999_999 },
  { label: "1,000,000g+", min: 1_000_000, max: Number.POSITIVE_INFINITY },
]

interface BucketGroup {
  bucket: PriceBucket | null
  label: string
  items: readonly { need: CompanionGearNeed; index: number; price: number | null; key: string }[]
  subtotal: number
}

interface CompanionGearByPricePanelCardProps {
  needs: readonly CompanionGearNeed[]
  pricing: PricingData | null
  shoppingList?: ShoppingList
}

export function CompanionGearByPricePanelCard({
  needs,
  pricing,
  shoppingList,
}: CompanionGearByPricePanelCardProps) {
  const eligibleKeys = useMemo(
    () => needs.filter((n) => !n.owned).map((n) => needToShoppingKey(n)),
    [needs]
  )
  const allInList =
    shoppingList !== undefined &&
    eligibleKeys.length > 0 &&
    eligibleKeys.every((k) => shoppingList.has(k))

  const slotPriceMap = useMemo(() => {
    if (!pricing) return null
    return buildSlotPriceMap(needs, pricing)
  }, [needs, pricing])

  const blendedPriceMap = useMemo(() => {
    if (!pricing) return null
    return buildBlendedPriceMap(needs, pricing)
  }, [needs, pricing])

  const totalCost = useMemo(() => {
    if (!slotPriceMap || !blendedPriceMap) return null
    return computeTotalCost(needs, slotPriceMap, blendedPriceMap)
  }, [needs, slotPriceMap, blendedPriceMap])

  const bucketGroups = useMemo(() => {
    const bucketMap = new Map<string, BucketGroup>()
    type BucketItem = { need: CompanionGearNeed; index: number; price: number | null; key: string }
    const itemsByLabel = new Map<string, BucketItem[]>()

    function makeBucket(label: string, bucket: PriceBucket | null): undefined {
      const items: BucketItem[] = []
      itemsByLabel.set(label, items)
      bucketMap.set(label, { bucket, label, items, subtotal: 0 })
    }

    makeBucket("Owned", null)
    for (const bucket of PRICE_BUCKETS) {
      makeBucket(bucket.label, bucket)
    }
    makeBucket("Unknown", null)

    for (const [i, need] of needs.entries()) {
      const key = needToShoppingKey(need)
      if (need.owned) {
        const items = requireGet(itemsByLabel, "Owned", "itemsByLabel")
        items.push({ need, index: i, price: null, key })
        continue
      }

      const priceResult =
        slotPriceMap && blendedPriceMap
          ? resolveNeedPrice(need, i, slotPriceMap, blendedPriceMap)
          : null
      const cost = priceResult?.estimatedCost ?? null

      if (cost === null) {
        const items = requireGet(itemsByLabel, "Unknown", "itemsByLabel")
        items.push({ need, index: i, price: null, key })
      } else {
        const matchingBucket = PRICE_BUCKETS.find((b) => cost >= b.min && cost <= b.max)
        const bucketKey = matchingBucket?.label ?? "Unknown"
        const items = requireGet(itemsByLabel, bucketKey, "itemsByLabel")
        items.push({ need, index: i, price: cost, key })
        const group = requireGet(bucketMap, bucketKey, "bucketMap")
        group.subtotal += cost
      }
    }

    const result: BucketGroup[] = []
    const owned = requireGet(bucketMap, "Owned", "bucketMap")
    if (owned.items.length > 0) result.push(owned)
    for (const bucket of PRICE_BUCKETS) {
      const group = requireGet(bucketMap, bucket.label, "bucketMap")
      if (group.items.length > 0) result.push(group)
    }
    const unknown = requireGet(bucketMap, "Unknown", "bucketMap")
    if (unknown.items.length > 0) result.push(unknown)

    return result
  }, [needs, slotPriceMap, blendedPriceMap])

  if (needs.length === 0) return null

  return (
    <PanelCard
      id="companion-gear-by-price"
      collapsible
      title="Companion Gear by Price"
      headerSubtitle={
        shoppingList && eligibleKeys.length > 0 ? (
          <CardTitleBadges>
            <ButtonBadge
              variant="elevation-muted"
              onClick={(e) => {
                e.stopPropagation()
                if (allInList) shoppingList.removeAll(eligibleKeys)
                else shoppingList.addAll(eligibleKeys)
              }}
            >
              {allInList ? "Remove All" : "Add All"}
            </ButtonBadge>
          </CardTitleBadges>
        ) : undefined
      }
    >
      <div className="flex flex-col gap-1.5">
        <ItemRow
          label="Total"
          quantity={needs.length}
          value={totalCost !== null ? `${formatGold(totalCost)}g` : undefined}
          accent
          actionButtonCount={1}
        />
        {bucketGroups.map((group) => (
          <PriceBucketRow key={group.label} group={group} shoppingList={shoppingList} />
        ))}
      </div>
    </PanelCard>
  )
}

function PriceBucketRow({
  group,
  shoppingList,
}: {
  group: BucketGroup
  shoppingList?: ShoppingList
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div>
      <ItemRow
        label={group.label}
        quantity={group.items.length}
        value={group.subtotal > 0 ? `${formatGold(group.subtotal)}g` : undefined}
        actionButtonCount={1}
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
      />

      {expanded && (
        <div className="flex flex-col py-1">
          {group.items
            .toSorted((a, b) =>
              getCompanionGearItemName(a.need).localeCompare(getCompanionGearItemName(b.need))
            )
            .map(({ need, index, price, key }) => {
              const qualityClass = getQualityClassName(need.quality)
              const itemName = getCompanionGearItemName(need)
              const traitName = companionTraits.has(need.trait)
                ? companionTraits.data[need.trait].name
                : need.trait
              const inList = shoppingList?.has(key) ?? false

              return (
                <ItemRow
                  key={`${need.companionId}-${need.slotId}-${index}`}
                  label={
                    qualityClass !== "" ? (
                      <span className={qualityClass}>
                        {itemName} ({traitName})
                      </span>
                    ) : (
                      `${itemName} (${traitName})`
                    )
                  }
                  value={price !== null && !need.owned ? `${formatGold(price)}g` : undefined}
                  depth={1}
                  actionButtonCount={1}
                  onAccept={
                    shoppingList && !need.owned && !inList
                      ? () => shoppingList.toggle(key)
                      : undefined
                  }
                  onRemove={
                    shoppingList && !need.owned && inList
                      ? () => shoppingList.toggle(key)
                      : undefined
                  }
                />
              )
            })}
        </div>
      )}
    </div>
  )
}
