"use client"

import { ButtonBadge } from "akasha/design/interface/badge/modules/button-badge/button-badge.module.code.tsx"
import { PanelCard } from "akasha/design/interface/layout/modules/panel-card/panel-card.module.code.tsx"
import { ItemRow } from "akasha/design/interface/pattern/modules/item-row/item-row.module.code.tsx"
import { CardTitleBadges } from "akasha/design/interface/primitive/modules/card/card.module.code.tsx"
import { companionTraits } from "akasha/temper/catalog/companion/companions-core/modules/companion-traits/companion-traits.module.code.ts"
import type { CompanionId } from "akasha/temper/catalog/companion/companions-core/modules/companions/companions.module.code.ts"
import { needToShoppingKey } from "akasha/temper/economy/shopping/modules/companion-gear-shopping-bridge/companion-gear-shopping-bridge.module.code.ts"
import type { CompanionGearPriceResult } from "akasha/temper/economy/trading/pricing/modules/companion-gear-price-lookup/companion-gear-price-lookup.module.code.ts"
import type { PricingData } from "akasha/temper/economy/trading/pricing/modules/pricing-types/pricing-types.module.code.ts"
import type { CompanionGearNeed } from "akasha/temper/items/core/modules/companion-gear-diff/companion-gear-diff.module.code.ts"
import { getQualityClassName } from "akasha/temper/web/companions-ui/modules/companion-quality-rules/companion-quality-rules.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { companionGearByCompanionPanelCardAddAll } from "akasha/temper/web/phrase/pages/companion-gear-by-companion-panel-card-add-all.temper-web-phrase.ts"
import { companionGearByCompanionPanelCardRemoveAll } from "akasha/temper/web/phrase/pages/companion-gear-by-companion-panel-card-remove-all.temper-web-phrase.ts"
import { companionGearByCompanionPanelCardTitle } from "akasha/temper/web/phrase/pages/companion-gear-by-companion-panel-card-title.temper-web-phrase.ts"
import { companionGearByCompanionPanelCardTotal } from "akasha/temper/web/phrase/pages/companion-gear-by-companion-panel-card-total.temper-web-phrase.ts"
import {
  type BlendedPriceKey,
  buildBlendedPriceMap,
  buildSlotPriceMap,
  computeGroupCost,
  computeTotalCost,
  getCompanionGearItemName,
  goldIn,
  resolveNeedPrice,
  type SlotPriceKey,
} from "akasha/temper/web/player-economics-ui/modules/companion-gear-pricing-rules/companion-gear-pricing-rules.module.code.ts"
import type { ShoppingList } from "akasha/temper/web/player-economics-ui/modules/use-shopping-list/use-shopping-list.module.code.ts"
import { useMemo, useState } from "react"

interface CompanionGroup {
  companionId: CompanionId
  companionName: string
  needs: readonly { need: CompanionGearNeed; index: number; key: string }[]
}

interface CompanionGearByCompanionPanelCardProps {
  needs: readonly CompanionGearNeed[]
  pricing: PricingData | null
  shoppingList?: ShoppingList
}

export function CompanionGearByCompanionPanelCard({
  needs,
  pricing,
  shoppingList,
}: CompanionGearByCompanionPanelCardProps) {
  const phrase = usePhrase()
  const eligibleKeys = useMemo(
    () => needs.filter((n) => !n.owned).map((n) => needToShoppingKey(n)),
    [needs]
  )
  const allInList =
    shoppingList !== undefined &&
    eligibleKeys.length > 0 &&
    eligibleKeys.every((k) => shoppingList.has(k))
  const groups = useMemo(() => {
    const map = new Map<CompanionId, CompanionGroup>()
    const buckets = new Map<
      CompanionId,
      { need: CompanionGearNeed; index: number; key: string }[]
    >()

    for (const [i, need] of needs.entries()) {
      let bucket = buckets.get(need.companionId)
      if (!bucket) {
        bucket = []
        buckets.set(need.companionId, bucket)
        map.set(need.companionId, {
          companionId: need.companionId,
          companionName: need.companionName,
          needs: bucket,
        })
      }
      bucket.push({ need, index: i, key: needToShoppingKey(need) })
    }

    return [...map.values()].toSorted((a, b) => a.companionName.localeCompare(b.companionName))
  }, [needs])

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

  if (needs.length === 0) return null

  return (
    <PanelCard
      id="companion-gear-by-companion"
      collapsible
      title={phrase(companionGearByCompanionPanelCardTitle.slug)}
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
                  ? companionGearByCompanionPanelCardRemoveAll.slug
                  : companionGearByCompanionPanelCardAddAll.slug
              )}
            </ButtonBadge>
          </CardTitleBadges>
        ) : undefined
      }
    >
      <div className="flex flex-col gap-1.5">
        <ItemRow
          label={phrase(companionGearByCompanionPanelCardTotal.slug)}
          quantity={needs.length}
          value={totalCost !== null ? goldIn(phrase, totalCost) : undefined}
          accent
          actionButtonCount={1}
        />
        {groups.map((group) => (
          <CompanionGroupRow
            key={group.companionId}
            group={group}
            slotPriceMap={slotPriceMap}
            blendedPriceMap={blendedPriceMap}
            shoppingList={shoppingList}
          />
        ))}
      </div>
    </PanelCard>
  )
}

function CompanionGroupRow({
  group,
  slotPriceMap,
  blendedPriceMap,
  shoppingList,
}: {
  group: CompanionGroup
  slotPriceMap: Map<SlotPriceKey, CompanionGearPriceResult> | null
  blendedPriceMap: Map<BlendedPriceKey, CompanionGearPriceResult> | null
  shoppingList?: ShoppingList
}) {
  const phrase = usePhrase()
  const [expanded, setExpanded] = useState(false)

  const groupCost =
    slotPriceMap && blendedPriceMap
      ? computeGroupCost(group.needs, slotPriceMap, blendedPriceMap)
      : null

  return (
    <div>
      <ItemRow
        label={group.companionName}
        quantity={group.needs.length}
        value={groupCost !== null ? goldIn(phrase, groupCost) : undefined}
        actionButtonCount={1}
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
      />

      {expanded && (
        <div className="flex flex-col py-1">
          {group.needs
            .toSorted((a, b) =>
              getCompanionGearItemName(a.need, phrase).localeCompare(
                getCompanionGearItemName(b.need, phrase)
              )
            )
            .map(({ need, index, key }) => {
              const qualityClass = getQualityClassName(need.quality)
              const itemName = getCompanionGearItemName(need, phrase)
              const traitName = companionTraits().data[need.trait]?.name ?? need.trait
              const price =
                !need.owned && slotPriceMap && blendedPriceMap
                  ? resolveNeedPrice(need, index, slotPriceMap, blendedPriceMap)
                  : null
              const inList = shoppingList?.has(key) ?? false

              return (
                <ItemRow
                  key={`${need.slotId}-${index}`}
                  label={
                    qualityClass !== "" ? (
                      <span className={qualityClass}>
                        {itemName} ({traitName})
                      </span>
                    ) : (
                      `${itemName} (${traitName})`
                    )
                  }
                  value={price ? goldIn(phrase, price.estimatedCost) : undefined}
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
