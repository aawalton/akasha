"use client"

import { requireGet } from "akasha/code/type/narrowing/modules/require-get/require-get.module.code.ts"
import { ButtonBadge } from "akasha/design/interface/badge/modules/button-badge/button-badge.module.code.tsx"
import { PanelCard } from "akasha/design/interface/layout/modules/panel-card/panel-card.module.code.tsx"
import { ItemRow } from "akasha/design/interface/pattern/modules/item-row/item-row.module.code.tsx"
import { CardTitleBadges } from "akasha/design/interface/primitive/modules/card/card.module.code.tsx"
import { companionTraits } from "akasha/temper/catalog/companion/companions-core/modules/companion-traits/companion-traits.module.code.ts"
import { needToShoppingKey } from "akasha/temper/economy/shopping/modules/companion-gear-shopping-bridge/companion-gear-shopping-bridge.module.code.ts"
import type { PricingData } from "akasha/temper/economy/trading/pricing/modules/pricing-types/pricing-types.module.code.ts"
import type { CompanionGearNeed } from "akasha/temper/items/core/modules/companion-gear-diff/companion-gear-diff.module.code.ts"
import { getQualityClassName } from "akasha/temper/web/companions-ui/modules/companion-quality-rules/companion-quality-rules.module.code.ts"
import {
  type Phrase,
  usePhrase,
} from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { companionGearByPricePanelCardAddAll } from "akasha/temper/web/phrase/pages/companion-gear-by-price-panel-card-add-all.temper-web-phrase.ts"
import { companionGearByPricePanelCardOver } from "akasha/temper/web/phrase/pages/companion-gear-by-price-panel-card-over.temper-web-phrase.ts"
import { companionGearByPricePanelCardOwned } from "akasha/temper/web/phrase/pages/companion-gear-by-price-panel-card-owned.temper-web-phrase.ts"
import { companionGearByPricePanelCardRemoveAll } from "akasha/temper/web/phrase/pages/companion-gear-by-price-panel-card-remove-all.temper-web-phrase.ts"
import { companionGearByPricePanelCardTitle } from "akasha/temper/web/phrase/pages/companion-gear-by-price-panel-card-title.temper-web-phrase.ts"
import { companionGearByPricePanelCardTotal } from "akasha/temper/web/phrase/pages/companion-gear-by-price-panel-card-total.temper-web-phrase.ts"
import { companionGearByPricePanelCardUnder } from "akasha/temper/web/phrase/pages/companion-gear-by-price-panel-card-under.temper-web-phrase.ts"
import { companionGearByPricePanelCardUnknown } from "akasha/temper/web/phrase/pages/companion-gear-by-price-panel-card-unknown.temper-web-phrase.ts"
import {
  buildBlendedPriceMap,
  buildSlotPriceMap,
  computeTotalCost,
  getCompanionGearItemName,
  goldIn,
  resolveNeedPrice,
} from "akasha/temper/web/player-economics-ui/modules/companion-gear-pricing-rules/companion-gear-pricing-rules.module.code.ts"
import type { ShoppingList } from "akasha/temper/web/player-economics-ui/modules/use-shopping-list/use-shopping-list.module.code.ts"
import { useMemo, useState } from "react"

interface PriceBucket {
  id: string
  min: number
  max: number
}

const PRICE_BUCKETS: PriceBucket[] = [
  { id: "under-100", min: 0, max: 99 },
  { id: "under-1000", min: 100, max: 999 },
  { id: "under-10000", min: 1_000, max: 9_999 },
  { id: "under-100000", min: 10_000, max: 99_999 },
  { id: "under-1000000", min: 100_000, max: 999_999 },
  { id: "over-1000000", min: 1_000_000, max: Number.POSITIVE_INFINITY },
]

const OWNED = "owned"
const UNKNOWN = "unknown"

interface BucketGroup {
  bucket: PriceBucket | null
  id: string
  items: readonly { need: CompanionGearNeed; index: number; price: number | null; key: string }[]
  subtotal: number
}

function bucketLabel(group: BucketGroup, phrase: Phrase): string {
  if (group.id === OWNED) return phrase(companionGearByPricePanelCardOwned.slug)
  const bucket = group.bucket
  if (bucket === null) return phrase(companionGearByPricePanelCardUnknown.slug)
  if (Number.isFinite(bucket.max)) {
    return phrase(companionGearByPricePanelCardUnder.slug, { gold: goldIn(phrase, bucket.max + 1) })
  }
  return phrase(companionGearByPricePanelCardOver.slug, { gold: goldIn(phrase, bucket.min) })
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
  const phrase = usePhrase()
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

    function makeBucket(id: string, bucket: PriceBucket | null): undefined {
      const items: BucketItem[] = []
      itemsByLabel.set(id, items)
      bucketMap.set(id, { bucket, id, items, subtotal: 0 })
    }

    makeBucket(OWNED, null)
    for (const bucket of PRICE_BUCKETS) {
      makeBucket(bucket.id, bucket)
    }
    makeBucket(UNKNOWN, null)

    for (const [i, need] of needs.entries()) {
      const key = needToShoppingKey(need)
      if (need.owned) {
        const items = requireGet(itemsByLabel, OWNED, "itemsByLabel")
        items.push({ need, index: i, price: null, key })
        continue
      }

      const priceResult =
        slotPriceMap && blendedPriceMap
          ? resolveNeedPrice(need, i, slotPriceMap, blendedPriceMap)
          : null
      const cost = priceResult?.estimatedCost ?? null

      if (cost === null) {
        const items = requireGet(itemsByLabel, UNKNOWN, "itemsByLabel")
        items.push({ need, index: i, price: null, key })
      } else {
        const matchingBucket = PRICE_BUCKETS.find((b) => cost >= b.min && cost <= b.max)
        const bucketKey = matchingBucket?.id ?? UNKNOWN
        const items = requireGet(itemsByLabel, bucketKey, "itemsByLabel")
        items.push({ need, index: i, price: cost, key })
        const group = requireGet(bucketMap, bucketKey, "bucketMap")
        group.subtotal += cost
      }
    }

    const result: BucketGroup[] = []
    const owned = requireGet(bucketMap, OWNED, "bucketMap")
    if (owned.items.length > 0) result.push(owned)
    for (const bucket of PRICE_BUCKETS) {
      const group = requireGet(bucketMap, bucket.id, "bucketMap")
      if (group.items.length > 0) result.push(group)
    }
    const unknown = requireGet(bucketMap, UNKNOWN, "bucketMap")
    if (unknown.items.length > 0) result.push(unknown)

    return result
  }, [needs, slotPriceMap, blendedPriceMap])

  if (needs.length === 0) return null

  return (
    <PanelCard
      id="companion-gear-by-price"
      collapsible
      title={phrase(companionGearByPricePanelCardTitle.slug)}
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
              {phrase(
                allInList
                  ? companionGearByPricePanelCardRemoveAll.slug
                  : companionGearByPricePanelCardAddAll.slug
              )}
            </ButtonBadge>
          </CardTitleBadges>
        ) : undefined
      }
    >
      <div className="flex flex-col gap-1.5">
        <ItemRow
          label={phrase(companionGearByPricePanelCardTotal.slug)}
          quantity={needs.length}
          value={totalCost !== null ? goldIn(phrase, totalCost) : undefined}
          accent
          actionButtonCount={1}
        />
        {bucketGroups.map((group) => (
          <PriceBucketRow key={group.id} group={group} shoppingList={shoppingList} />
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
  const phrase = usePhrase()
  const [expanded, setExpanded] = useState(false)

  return (
    <div>
      <ItemRow
        label={bucketLabel(group, phrase)}
        quantity={group.items.length}
        value={group.subtotal > 0 ? goldIn(phrase, group.subtotal) : undefined}
        actionButtonCount={1}
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
      />

      {expanded && (
        <div className="flex flex-col py-1">
          {group.items
            .toSorted((a, b) =>
              getCompanionGearItemName(a.need, phrase).localeCompare(
                getCompanionGearItemName(b.need, phrase)
              )
            )
            .map(({ need, index, price, key }) => {
              const qualityClass = getQualityClassName(need.quality)
              const itemName = getCompanionGearItemName(need, phrase)
              const traitName = companionTraits().data[need.trait]?.name ?? need.trait
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
                  value={price !== null && !need.owned ? goldIn(phrase, price) : undefined}
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
