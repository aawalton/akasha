"use client"

import { PanelCard } from "@akasha/design-layout/panel-card"
import { groupByCount } from "@akasha/temper-build-support/row-grouping"
import {
  type ArmorEnchantId,
  armorEnchants,
} from "@akasha/temper-characters-equipment/armor-enchants"
import { standardArmorWeights } from "@akasha/temper-characters-equipment/armor-weights"
import {
  bulkUpdateArmorEnchant,
  bulkUpdateArmorQuality,
  bulkUpdateArmorSet,
  bulkUpdateArmorTrait,
  bulkUpdateArmorWeight,
} from "@akasha/temper-characters-equipment/bulk-update-armor"
import { mergeItemData } from "@akasha/temper-characters-equipment/merge-item-data"
import { getMythicSlots } from "@akasha/temper-characters-equipment/mythic-set-rules"
import {
  AVAILABLE_QUALITY_OPTIONS,
  getQualityVariant,
} from "@akasha/temper-characters-equipment-ui/equipment-quality-rules"
import {
  type ArmorTraitId,
  armorTraitsBuildList,
  armorTraits as armorTraitsData,
} from "@akasha/temper-equipment/armor-traits"
import type { StandardArmorWeightId } from "@akasha/temper-equipment/armor-weight-ids"
import type { SetId as SetsAllId } from "@akasha/temper-equipment/set-ids"
import { type ArmorSlotId, armorSlots } from "@akasha/temper-equipment-kinds/armor-slots"
import type { EquipmentQualityOptionId } from "@akasha/temper-equipment-kinds/equipment-qualities"
import { useMemo } from "react"
import type { ArmorUpdateParams } from "../armor-card/armor-card.module.code.tsx"
import { ArmorCard } from "../armor-card/armor-card.module.code.tsx"
import { BulkEditTag } from "../bulk-edit-tag/bulk-edit-tag.module.code.tsx"
import { BulkSetEditTag } from "../bulk-set-edit-tag/bulk-set-edit-tag.module.code.tsx"
import type { EquipmentSectionProps } from "../equipment-types/equipment-types.module.code.ts"

export function ArmorPanelCard({
  equipment,
  onUpdate,
  availableSets,
  equippedMythicSetId,
  playerClass,
  className,
  readOnly,
}: EquipmentSectionProps) {
  const updateArmorSlot = (slot: ArmorSlotId, updates: ArmorUpdateParams) => {
    const currentSlot = equipment.armor[slot]
    if (currentSlot.itemType === "armor") {
      onUpdate({
        armor: {
          ...equipment.armor,
          [slot]: {
            itemType: "armor",
            data: mergeItemData(currentSlot.data, updates),
          },
        },
      })
    }
  }

  const removeArmorSlot = (slot: ArmorSlotId) => {
    onUpdate({
      armor: {
        ...equipment.armor,
        [slot]: {
          itemType: "armor",
          data: {
            type: slot,
            weight: "no-weight",
            set: "no-set",
            trait: "no-trait",
            enchantment: "no-enchant",
            quality: "no-quality",
          },
        },
      },
    })
  }

  const armorSlotItems = useMemo(
    () => armorSlots.list.map((slot) => equipment.armor[slot.id]),
    [equipment.armor]
  )

  const armorAndShieldSlots = useMemo(
    () => [
      ...armorSlotItems,
      equipment["primary-weapon-bar"]["off-hand"],
      equipment["backup-weapon-bar"]["off-hand"],
    ],
    [
      armorSlotItems,
      equipment["primary-weapon-bar"]["off-hand"],
      equipment["backup-weapon-bar"]["off-hand"],
    ]
  )

  const armorSets = useMemo(
    () =>
      groupByCount(armorSlotItems, (item) =>
        item.itemType === "armor" ? (item.data.set ?? "no-set") : "no-set"
      ),
    [armorSlotItems]
  )

  const armorWeightCounts = useMemo(
    () =>
      groupByCount<(typeof armorSlotItems)[number], StandardArmorWeightId>(
        armorSlotItems,
        (item) => (item.itemType === "armor" ? (item.data.weight ?? "no-weight") : "no-weight")
      ),
    [armorSlotItems]
  )

  const armorTraits = useMemo(
    () =>
      groupByCount<(typeof armorAndShieldSlots)[number], ArmorTraitId>(
        armorAndShieldSlots,
        (item) => {
          if (item.itemType === "armor") return item.data.trait ?? "no-trait"
          if (item.itemType === "shield") return item.data.trait ?? "no-trait"
          return null
        }
      ),
    [armorAndShieldSlots]
  )

  const armorEnchantCounts = useMemo(
    () =>
      groupByCount<(typeof armorAndShieldSlots)[number], ArmorEnchantId>(
        armorAndShieldSlots,
        (item) => {
          if (item.itemType === "armor") return item.data.enchantment ?? "no-enchant"
          if (item.itemType === "shield") return item.data.enchantment ?? "no-enchant"
          return null
        }
      ),
    [armorAndShieldSlots]
  )

  const armorQualityCounts = useMemo(
    () =>
      groupByCount<(typeof armorAndShieldSlots)[number], EquipmentQualityOptionId>(
        armorAndShieldSlots,
        (item) => {
          if (item.itemType === "armor") return item.data.quality ?? "no-quality"
          if (item.itemType === "shield") return item.data.quality ?? "no-quality"
          return null
        }
      ),
    [armorAndShieldSlots]
  )

  const armorMythicSlots = useMemo(
    () => getMythicSlots(equipment.armor, availableSets, armorSlots.list),
    [equipment.armor, availableSets]
  )

  const handleBulkUpdateArmorWeight = (
    oldValue: StandardArmorWeightId | null,
    newValue: StandardArmorWeightId | null
  ) => {
    onUpdate(bulkUpdateArmorWeight(equipment, oldValue, newValue))
  }

  const handleBulkUpdateArmorTrait = (oldValue: ArmorTraitId, newValue: ArmorTraitId) => {
    onUpdate(bulkUpdateArmorTrait(equipment, oldValue, newValue))
  }

  const handleBulkUpdateArmorEnchant = (oldValue: ArmorEnchantId, newValue: ArmorEnchantId) => {
    onUpdate(bulkUpdateArmorEnchant(equipment, oldValue, newValue))
  }

  const handleBulkUpdateArmorQuality = (
    oldValue: EquipmentQualityOptionId,
    newValue: EquipmentQualityOptionId
  ) => {
    onUpdate(bulkUpdateArmorQuality(equipment, oldValue, newValue))
  }

  const handleBulkUpdateArmorSet = (oldValue: SetsAllId, newValue: SetsAllId) => {
    onUpdate(bulkUpdateArmorSet(equipment, oldValue, newValue, availableSets))
  }

  const armorWeightOptions = standardArmorWeights.list

  return (
    <PanelCard
      id="armor"
      collapsible={true}
      title="Armor"
      headerSubtitle={
        !readOnly ? (
          <div className="flex flex-wrap gap-1">
            {armorQualityCounts.map(([quality, count]) => (
              <BulkEditTag<EquipmentQualityOptionId>
                key={`quality-${quality}`}
                currentValue={quality}
                options={AVAILABLE_QUALITY_OPTIONS}
                onSelect={handleBulkUpdateArmorQuality}
                count={count}
                getVariant={(q) => getQualityVariant(q, "elevation-muted")}
              />
            ))}
            {armorSets.map(([setId, count]) => (
              <BulkSetEditTag
                key={`set-${setId}`}
                currentValue={setId}
                availableSets={availableSets}
                onSelect={handleBulkUpdateArmorSet}
                count={count}
                slotType="armor"
                mythicSlot={setId !== "no-set" ? armorMythicSlots[setId] : undefined}
                playerClass={playerClass}
              />
            ))}
            {armorWeightCounts.map(([weight, count]) => (
              <BulkEditTag
                key={`weight-${weight}`}
                currentValue={weight}
                options={armorWeightOptions}
                onSelect={handleBulkUpdateArmorWeight}
                count={count}
              />
            ))}
            {armorTraits.map(([trait, count]) => (
              <BulkEditTag<ArmorTraitId>
                key={`trait-${trait}`}
                currentValue={trait}
                options={
                  armorTraitsBuildList.some((t) => t.id === trait)
                    ? armorTraitsBuildList
                    : armorTraitsData.has(trait)
                      ? [...armorTraitsBuildList, armorTraitsData.data[trait]]
                      : armorTraitsBuildList
                }
                onSelect={handleBulkUpdateArmorTrait}
                count={count}
              />
            ))}
            {armorEnchantCounts.map(([enchant, count]) => (
              <BulkEditTag<ArmorEnchantId>
                key={`enchant-${enchant}`}
                currentValue={enchant}
                options={armorEnchants.list}
                onSelect={handleBulkUpdateArmorEnchant}
                count={count}
              />
            ))}
          </div>
        ) : undefined
      }
      className={className}
    >
      <div className="flex flex-col gap-3">
        {armorSlots.list.map((slotConfig) => (
          <ArmorCard
            key={slotConfig.id}
            slot={slotConfig.id}
            item={equipment.armor[slotConfig.id]}
            availableSets={availableSets}
            equippedMythicSetId={equippedMythicSetId}
            onUpdate={(updates) => updateArmorSlot(slotConfig.id, updates)}
            onRemove={() => removeArmorSlot(slotConfig.id)}
            playerClass={playerClass}
            readOnly={readOnly}
          />
        ))}
      </div>
    </PanelCard>
  )
}
