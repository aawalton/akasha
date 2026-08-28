"use client"

import { PanelCard } from "@shared/design-layout/components/panel-card"
import {
  type JewelryEnchantId,
  jewelryEnchants,
} from "@temper/game-characters-equipment/enchants/jewelry-enchants-data"
import {
  type JewelrySlotId,
  jewelrySlots,
} from "@temper/game-characters-equipment/jewelry/jewelry-slots-data"
import {
  bulkUpdateJewelryEnchant,
  bulkUpdateJewelryQuality,
  bulkUpdateJewelrySet,
  bulkUpdateJewelryTrait,
} from "@temper/game-characters-equipment/loadout/bulk-update-jewelry"
import { mergeItemData } from "@temper/game-characters-equipment/loadout/merge-item-data"
import { getMythicSlots } from "@temper/game-characters-equipment/loadout/mythic-set-rules"
import type { EquipmentQualityOptionId } from "@temper/game-characters-equipment/quality-data"
import type { SetsAllId } from "@temper/game-characters-equipment/sets/sets-all-data"
import {
  type JewelryTraitId,
  jewelryTraits,
  jewelryTraitsBuildList,
} from "@temper/game-characters-equipment/traits/jewelry-traits-data"
import { AVAILABLE_QUALITY_OPTIONS, getQualityVariant } from "@temper/game-characters-equipment-ui/equipment-quality-helpers"
import { groupByCount } from "@temper/shared-engine/utils"
import { useMemo } from "react"
import { BulkEditTag } from "@/components/equipment/bulk-edit-tag"
import { BulkSetEditTag } from "@/components/equipment/bulk-set-edit-tag"
import type { EquipmentSectionProps } from "@/components/equipment/equipment-types"
import type { JewelryUpdateParams } from "@/components/equipment/jewelry-card"
import { JewelryCard } from "@/components/equipment/jewelry-card"

export function JewelryPanelCard({
  equipment,
  onUpdate,
  availableSets,
  equippedMythicSetId,
  playerClass,
  className,
  readOnly,
}: EquipmentSectionProps) {
  const updateJewelrySlot = (slot: JewelrySlotId, updates: JewelryUpdateParams) => {
    const currentSlot = equipment.jewelry[slot]
    if (currentSlot.itemType === "jewelry") {
      onUpdate({
        jewelry: {
          ...equipment.jewelry,
          [slot]: {
            itemType: "jewelry",
            data: mergeItemData(currentSlot.data, updates),
          },
        },
      })
    }
  }

  const removeJewelrySlot = (slot: JewelrySlotId) => {
    const slotConfig = jewelrySlots.data[slot]
    onUpdate({
      jewelry: {
        ...equipment.jewelry,
        [slot]: {
          itemType: "jewelry",
          data: {
            type: slotConfig.typeId,
            set: "no-set",
            trait: "no-trait",
            enchantment: "no-enchant",
            quality: "no-quality",
          },
        },
      },
    })
  }

  const jewelrySlotItems = useMemo(
    () => jewelrySlots.list.map((slot) => equipment.jewelry[slot.id]),
    [equipment.jewelry]
  )

  const jewelrySets = useMemo(
    () =>
      groupByCount(jewelrySlotItems, (item) =>
        item.itemType === "jewelry" ? (item.data.set ?? "no-set") : "no-set"
      ),
    [jewelrySlotItems]
  )

  const jewelryTraitsGrouped = useMemo(
    () =>
      groupByCount<(typeof jewelrySlotItems)[number], JewelryTraitId>(jewelrySlotItems, (item) =>
        item.itemType === "jewelry" ? (item.data.trait ?? "no-trait") : "no-trait"
      ),
    [jewelrySlotItems]
  )

  const jewelryEnchantsGrouped = useMemo(
    () =>
      groupByCount<(typeof jewelrySlotItems)[number], JewelryEnchantId>(jewelrySlotItems, (item) =>
        item.itemType === "jewelry" ? (item.data.enchantment ?? "no-enchant") : "no-enchant"
      ),
    [jewelrySlotItems]
  )

  const jewelryQualityCounts = useMemo(
    () =>
      groupByCount<(typeof jewelrySlotItems)[number], EquipmentQualityOptionId>(
        jewelrySlotItems,
        (item) => (item.itemType === "jewelry" ? (item.data.quality ?? "no-quality") : "no-quality")
      ),
    [jewelrySlotItems]
  )

  const jewelryMythicSlots = useMemo(
    () => getMythicSlots(equipment.jewelry, availableSets, jewelrySlots.list),
    [equipment.jewelry, availableSets]
  )

  const handleBulkUpdateJewelryTrait = (oldValue: JewelryTraitId, newValue: JewelryTraitId) => {
    onUpdate(bulkUpdateJewelryTrait(equipment, oldValue, newValue))
  }

  const handleBulkUpdateJewelryEnchant = (
    oldValue: JewelryEnchantId,
    newValue: JewelryEnchantId
  ) => {
    onUpdate(bulkUpdateJewelryEnchant(equipment, oldValue, newValue))
  }

  const handleBulkUpdateJewelryQuality = (
    oldValue: EquipmentQualityOptionId,
    newValue: EquipmentQualityOptionId
  ) => {
    onUpdate(bulkUpdateJewelryQuality(equipment, oldValue, newValue))
  }

  const handleBulkUpdateJewelrySet = (oldValue: SetsAllId, newValue: SetsAllId) => {
    onUpdate(bulkUpdateJewelrySet(equipment, oldValue, newValue, availableSets))
  }

  return (
    <PanelCard
      id="jewelry"
      collapsible={true}
      title="Jewelry"
      headerSubtitle={
        !readOnly ? (
          <div className="flex flex-wrap gap-1">
            {jewelryQualityCounts.map(([quality, count]) => (
              <BulkEditTag<EquipmentQualityOptionId>
                key={`quality-${quality}`}
                currentValue={quality}
                options={AVAILABLE_QUALITY_OPTIONS}
                onSelect={handleBulkUpdateJewelryQuality}
                count={count}
                getVariant={(q) => getQualityVariant(q, "elevation-muted")}
              />
            ))}
            {jewelrySets.map(([setId, count]) => (
              <BulkSetEditTag
                key={`set-${setId}`}
                currentValue={setId}
                availableSets={availableSets}
                onSelect={handleBulkUpdateJewelrySet}
                count={count}
                slotType="jewelry"
                mythicSlot={setId !== "no-set" ? jewelryMythicSlots[setId] : undefined}
                playerClass={playerClass}
              />
            ))}
            {jewelryTraitsGrouped.map(([trait, count]) => (
              <BulkEditTag<JewelryTraitId>
                key={`trait-${trait}`}
                currentValue={trait}
                options={
                  jewelryTraitsBuildList.some((t) => t.id === trait)
                    ? jewelryTraitsBuildList
                    : jewelryTraits.has(trait)
                      ? [...jewelryTraitsBuildList, jewelryTraits.data[trait]]
                      : jewelryTraitsBuildList
                }
                onSelect={handleBulkUpdateJewelryTrait}
                count={count}
              />
            ))}
            {jewelryEnchantsGrouped.map(([enchant, count]) => (
              <BulkEditTag<JewelryEnchantId>
                key={`enchant-${enchant}`}
                currentValue={enchant}
                options={jewelryEnchants.list}
                onSelect={handleBulkUpdateJewelryEnchant}
                count={count}
              />
            ))}
          </div>
        ) : undefined
      }
      className={className}
    >
      <div className="flex flex-col gap-3">
        {jewelrySlots.list.map((slotConfig) => (
          <JewelryCard
            key={slotConfig.id}
            slot={slotConfig.id}
            item={equipment.jewelry[slotConfig.id]}
            availableSets={availableSets}
            equippedMythicSetId={equippedMythicSetId}
            onUpdate={(updates) => updateJewelrySlot(slotConfig.id, updates)}
            onRemove={() => removeJewelrySlot(slotConfig.id)}
            playerClass={playerClass}
            readOnly={readOnly}
          />
        ))}
      </div>
    </PanelCard>
  )
}
