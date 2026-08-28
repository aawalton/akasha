"use client"

import { Badge } from "@shared/design-badges/components/badge"
import { ButtonBadge } from "@shared/design-badges/components/button-badge"
import { PanelCard } from "@shared/design-layout/components/panel-card"
import { CardTitleBadges } from "@shared/design-primitives/components/card"
import { ItemRow } from "@shared/design-patterns/components/item-row"
import { companionEquipmentQualities } from "@temper/game-companions-core/generated/temper-companion-equipment-quality.generated"
import { companionTraits } from "@temper/game-companions-core/equipment/companion-traits-data"
import { getQualityClassName, getQualityVariant } from "@temper/game-companions-ui/companion-equipment-quality-helpers"
import {
  aggregateUnfulfilledByTraitQuality,
  type CompanionGearNeed,
  type GearNeededGroup,
} from "@temper/game-items-core/companion-gear-diff"
import type { CompanionGearPriceResult } from "@temper/game-trading-pricing/companion-gear-price-lookup"
import type { PricingData } from "@temper/game-trading-pricing/pricing-types"
import { needToShoppingKey } from "@temper/player-economics-core/companion-gear-shopping-bridge"
import { useMemo, useState } from "react"
import {
  type BlendedPriceKey,
  buildBlendedPriceMap,
  buildSlotPriceMap,
  computeGroupCost,
  computeTotalCost,
  formatGold,
  getCompanionGearItemName,
  resolveNeedPrice,
  type SlotPriceKey,
} from "./companion-gear-pricing-helpers"
import type { ShoppingList } from "./use-shopping-list"

interface CompanionGearByTraitPanelCardProps {
  needs: readonly CompanionGearNeed[]
  pricing: PricingData | null
  shoppingList?: ShoppingList
}

export function CompanionGearByTraitPanelCard({
  needs,
  pricing,
  shoppingList,
}: CompanionGearByTraitPanelCardProps) {
  const eligibleKeys = useMemo(
    () => needs.filter((n) => !n.owned).map((n) => needToShoppingKey(n)),
    [needs]
  )
  const allInList =
    shoppingList !== undefined &&
    eligibleKeys.length > 0 &&
    eligibleKeys.every((k) => shoppingList.has(k))
  const groups = useMemo(() => aggregateUnfulfilledByTraitQuality(needs), [needs])

  const groupNeedsMap = useMemo(() => {
    const map = new Map<string, { need: CompanionGearNeed; index: number; key: string }[]>()
    for (const [i, need] of needs.entries()) {
      const groupKey = `${need.trait}:${need.quality}`
      let arr = map.get(groupKey)
      if (!arr) {
        arr = []
        map.set(groupKey, arr)
      }
      arr.push({ need, index: i, key: needToShoppingKey(need) })
    }
    return map
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
      id="companion-gear-by-trait"
      collapsible
      title="Companion Gear by Trait"
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
        {groups.map((group) => {
          const groupKey = `${group.trait}:${group.quality}`
          return (
            <TraitGroupRow
              key={groupKey}
              group={group}
              groupNeeds={groupNeedsMap.get(groupKey) ?? []}
              slotPriceMap={slotPriceMap}
              blendedPriceMap={blendedPriceMap}
              shoppingList={shoppingList}
            />
          )
        })}
      </div>
    </PanelCard>
  )
}

function TraitGroupRow({
  group,
  groupNeeds,
  slotPriceMap,
  blendedPriceMap,
  shoppingList,
}: {
  group: GearNeededGroup
  groupNeeds: readonly { need: CompanionGearNeed; index: number; key: string }[]
  slotPriceMap: Map<SlotPriceKey, CompanionGearPriceResult> | null
  blendedPriceMap: Map<BlendedPriceKey, CompanionGearPriceResult> | null
  shoppingList?: ShoppingList
}) {
  const [expanded, setExpanded] = useState(false)

  const traitName = companionTraits.has(group.trait)
    ? companionTraits.data[group.trait].name
    : group.trait
  const qualityName = companionEquipmentQualities.has(group.quality)
    ? companionEquipmentQualities.data[group.quality].name
    : group.quality

  const groupCost =
    slotPriceMap && blendedPriceMap
      ? computeGroupCost(groupNeeds, slotPriceMap, blendedPriceMap)
      : null

  return (
    <div>
      <ItemRow
        label={
          <>
            <Badge
              variant={getQualityVariant(group.quality, "elevation-muted")}
              className="shrink-0"
            >
              {qualityName}
            </Badge>
            {traitName}
          </>
        }
        quantity={group.count}
        value={groupCost !== null ? `${formatGold(groupCost)}g` : undefined}
        actionButtonCount={1}
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
      />

      {expanded && (
        <div className="flex flex-col py-1">
          {groupNeeds
            .toSorted((a, b) =>
              getCompanionGearItemName(a.need).localeCompare(getCompanionGearItemName(b.need))
            )
            .map(({ need, index, key }) => {
              const qualityClass = getQualityClassName(need.quality)
              const itemName = getCompanionGearItemName(need)
              const price =
                !need.owned && slotPriceMap && blendedPriceMap
                  ? resolveNeedPrice(need, index, slotPriceMap, blendedPriceMap)
                  : null
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
                  value={price ? `${formatGold(price.estimatedCost)}g` : undefined}
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
