"use client"

import { PanelCard } from "@akasha/design-layout/panel-card"
import { groupByCount } from "@akasha/temper-build-support/row-grouping"
import {
  bulkUpdateJewelryEnchant,
  bulkUpdateJewelryQuality,
  bulkUpdateJewelrySet,
  bulkUpdateJewelryTrait,
} from "@akasha/temper-characters-equipment/bulk-update-jewelry"
import {
  type JewelryEnchantId,
  jewelryEnchants,
} from "@akasha/temper-characters-equipment/jewelry-enchants"
import { mergeItemData } from "@akasha/temper-characters-equipment/merge-item-data"
import { getMythicSlots } from "@akasha/temper-characters-equipment/mythic-set-rules"
import {
  AVAILABLE_QUALITY_OPTIONS,
  getQualityVariant,
} from "@akasha/temper-characters-equipment-ui/equipment-quality-rules"
import {
  type JewelryTraitId,
  jewelryTraits,
  jewelryTraitsBuildList,
} from "@akasha/temper-equipment/jewelry-traits"
import type { SetId as SetsAllId } from "@akasha/temper-equipment/set-ids"
import type { EquipmentQualityOptionId } from "@akasha/temper-equipment-kinds/equipment-qualities"
import { type JewelrySlotId, jewelrySlots } from "@akasha/temper-equipment-kinds/jewelry-slots"
import { useMemo } from "react"
import { BulkEditTag } from "../bulk-edit-tag/bulk-edit-tag.module.code.tsx"
import { BulkSetEditTag } from "../bulk-set-edit-tag/bulk-set-edit-tag.module.code.tsx"
import type { EquipmentSectionProps } from "../equipment-types/equipment-types.module.code.ts"
import type { JewelryUpdateParams } from "../jewelry-card/jewelry-card.module.code.tsx"
import { JewelryCard } from "../jewelry-card/jewelry-card.module.code.tsx"

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
