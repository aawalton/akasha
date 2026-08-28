"use client"

import { PanelCard } from "@shared/design-layout/components/panel-card"
import {
  type ArmorSlotId,
  armorSlots,
} from "@temper/game-characters-equipment/armor/armor-slots-data"
import {
  type StandardArmorWeightId,
  standardArmorWeights,
} from "@temper/game-characters-equipment/armor/armor-weights-data"
import {
  type ArmorEnchantId,
  armorEnchants,
} from "@temper/game-characters-equipment/enchants/armor-enchants-data"
import {
  bulkUpdateArmorEnchant,
  bulkUpdateArmorQuality,
  bulkUpdateArmorSet,
  bulkUpdateArmorTrait,
  bulkUpdateArmorWeight,
} from "@temper/game-characters-equipment/loadout/bulk-update-armor"
import { mergeItemData } from "@temper/game-characters-equipment/loadout/merge-item-data"
import { getMythicSlots } from "@temper/game-characters-equipment/loadout/mythic-set-rules"
import type { EquipmentQualityOptionId } from "@temper/game-characters-equipment/quality-data"
import type { SetsAllId } from "@temper/game-characters-equipment/sets/sets-all-data"
import {
  type ArmorTraitId,
  armorTraitsBuildList,
  armorTraits as armorTraitsData,
} from "@temper/game-characters-equipment/traits/armor-traits-data"
import { AVAILABLE_QUALITY_OPTIONS, getQualityVariant } from "@temper/game-characters-equipment-ui/equipment-quality-helpers"
import { groupByCount } from "@temper/shared-engine/utils"
import { useMemo } from "react"
import type { ArmorUpdateParams } from "@/components/equipment/armor-card"
import { ArmorCard } from "@/components/equipment/armor-card"
import { BulkEditTag } from "@/components/equipment/bulk-edit-tag"
import { BulkSetEditTag } from "@/components/equipment/bulk-set-edit-tag"
import type { EquipmentSectionProps } from "@/components/equipment/equipment-types"

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
