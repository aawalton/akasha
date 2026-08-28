"use client"

import { Badge } from "@shared/design-badges/components/badge"
import { PanelCard } from "@shared/design-layout/components/panel-card"
import { HorizontalScrollFade } from "@shared/design-primitives/components/horizontal-scroll-fade"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/design-primitives/components/select"
import { ItemCard } from "@shared/design-patterns/components/item-card"
import { jewelrySlots } from "@temper/game-characters-equipment/jewelry/jewelry-slots-data"
import { EquipmentIcon } from "@temper/game-characters-equipment-ui/equipment-icon"
import type { CompanionJewelrySlotItem } from "@temper/game-companions-core/companion-types"
import { getCompanionJewelryIcon } from "@temper/game-companions-core/equipment/companion-equipment-icons-data"
import type { CompanionEquipmentQualityId } from "@temper/game-companions-core/equipment/companion-equipment-quality-data"
import { companionEquipmentQualities } from "@temper/game-companions-core/generated/temper-companion-equipment-quality.generated"
import {
  capQualityForSlot,
  getAvailableQualityOptions,
  LEGENDARY_QUALITY_OPTIONS,
} from "@temper/game-companions-core/equipment/companion-equipment-quality-rules"
import { type CompanionJewelrySlotId } from "@temper/game-companions-core/equipment/companion-jewelry-slots-data"
import { companionJewelrySlots } from "@temper/game-companions-core/generated/temper-companion-jewelry-slot.generated"
import {
  type CompanionTraitId,
  companionTraits,
} from "@temper/game-companions-core/equipment/companion-traits-data"
import { getQualityClassName, getQualityVariant } from "@temper/game-companions-ui/companion-equipment-quality-helpers"
import { groupByCount } from "@temper/shared-engine/utils"
import { useMemo } from "react"
import { BulkEditTag } from "./companion-bulk-edit-tag"
import type { CompanionEquipmentPanelProps } from "./companion-equipment-panel-types"

export function CompanionJewelryPanelCard({
  equipment,
  onUpdate,
  readOnly,
}: CompanionEquipmentPanelProps) {
  const handleJewelryChange = (
    slotId: CompanionJewelrySlotId,
    field: "trait" | "quality",
    value: string
  ) => {
    const currentSlot = equipment.jewelry[slotId]
    const currentData = currentSlot.itemType === "jewelry" ? currentSlot.data : null

    const newSlot: CompanionJewelrySlotItem = {
      itemType: "jewelry",
      data: {
        type: slotId,
        trait:
          field === "trait" && companionTraits.has(value)
            ? value
            : (currentData?.trait ?? "no-trait"),
        quality:
          field === "quality" && companionEquipmentQualities.has(value)
            ? value
            : (currentData?.quality ?? "no-quality"),
      },
    }

    onUpdate({
      jewelry: {
        ...equipment.jewelry,
        [slotId]: newSlot,
      },
    })
  }

  const jewelrySlotItems = useMemo(
    () => companionJewelrySlots.list.map((slot) => equipment.jewelry[slot.id]),
    [equipment.jewelry]
  )

  const jewelryTraitCounts = useMemo(
    () =>
      groupByCount<(typeof jewelrySlotItems)[number], CompanionTraitId>(jewelrySlotItems, (item) =>
        item.itemType === "jewelry" ? item.data.trait : "no-trait"
      ),
    [jewelrySlotItems]
  )

  const jewelryQualityCounts = useMemo(
    () =>
      groupByCount<(typeof jewelrySlotItems)[number], CompanionEquipmentQualityId>(
        jewelrySlotItems,
        (item) => (item.itemType === "jewelry" ? item.data.quality : "no-quality")
      ),
    [jewelrySlotItems]
  )

  const handleBulkJewelryTraitUpdate = (oldValue: CompanionTraitId, newValue: CompanionTraitId) => {
    const newJewelry = { ...equipment.jewelry }
    for (const slot of companionJewelrySlots.list) {
      const item = newJewelry[slot.id]
      const effectiveTrait = item.itemType === "jewelry" ? item.data.trait : "no-trait"
      if (effectiveTrait === oldValue) {
        newJewelry[slot.id] = {
          itemType: "jewelry",
          data: {
            type: slot.id,
            trait: newValue,
            quality: item.itemType === "jewelry" ? item.data.quality : "no-quality",
          },
        }
      }
    }
    onUpdate({ jewelry: newJewelry })
  }

  const handleBulkJewelryQualityUpdate = (
    oldValue: CompanionEquipmentQualityId,
    newValue: CompanionEquipmentQualityId
  ) => {
    const newJewelry = { ...equipment.jewelry }
    for (const slot of companionJewelrySlots.list) {
      const item = newJewelry[slot.id]
      const effectiveQuality = item.itemType === "jewelry" ? item.data.quality : "no-quality"
      const cappedQuality = capQualityForSlot(slot.id, newValue)
      if (effectiveQuality === oldValue) {
        newJewelry[slot.id] = {
          itemType: "jewelry",
          data: {
            type: slot.id,
            trait: item.itemType === "jewelry" ? item.data.trait : "no-trait",
            quality: cappedQuality,
          },
        }
      }
    }
    onUpdate({ jewelry: newJewelry })
  }

  return (
    <PanelCard
      id="companion-jewelry"
      collapsible
      title="Jewelry"
      headerSubtitle={
        <div className="flex flex-wrap gap-1">
          {jewelryQualityCounts.map(([quality, count]) => (
            <BulkEditTag
              key={`quality-${quality}`}
              currentValue={quality}
              options={LEGENDARY_QUALITY_OPTIONS}
              onSelect={handleBulkJewelryQualityUpdate}
              count={count}
              disabled={readOnly}
              getVariant={(q) => getQualityVariant(q, "elevation-muted")}
              getItemClassName={getQualityClassName}
            />
          ))}
          {jewelryTraitCounts.map(([trait, count]) => (
            <BulkEditTag
              key={`trait-${trait}`}
              currentValue={trait}
              options={companionTraits.list}
              onSelect={handleBulkJewelryTraitUpdate}
              count={count}
              disabled={readOnly}
            />
          ))}
        </div>
      }
    >
      <div className="flex flex-col gap-3">
        {companionJewelrySlots.list.map((slot) => {
          const jewelrySlot = equipment.jewelry[slot.id]
          const jewelryData = jewelrySlot.itemType === "jewelry" ? jewelrySlot.data : null

          return (
            <ItemCard
              key={slot.id}
              renderIcon={() => (
                <EquipmentIcon
                  primarySrc={getCompanionJewelryIcon(
                    slot.id,
                    jewelryData?.quality ?? "no-quality"
                  )}
                  fallbackSrc={
                    jewelrySlots.has(slot.id) ? jewelrySlots.data[slot.id].icon : undefined
                  }
                  alt={slot.name}
                />
              )}
              renderContent={() => (
                <div className="space-y-1">
                  <div className="font-medium text-sm">{slot.name}</div>
                  <HorizontalScrollFade>
                    <div className="flex gap-1">
                      <Select
                        value={jewelryData?.quality ?? "no-quality"}
                        onValueChange={(value) => handleJewelryChange(slot.id, "quality", value)}
                        disabled={readOnly}
                      >
                        <SelectTrigger hideChevron>
                          <Badge variant={getQualityVariant(jewelryData?.quality ?? "no-quality")}>
                            <SelectValue placeholder="No Quality" />
                          </Badge>
                        </SelectTrigger>
                        <SelectContent nullSentinel={{ value: "no-quality", label: "No Quality" }}>
                          {getAvailableQualityOptions(slot.id)
                            .filter((quality) => quality.id !== "no-quality")
                            .map((quality) => (
                              <SelectItem
                                key={quality.id}
                                value={quality.id}
                                className={getQualityClassName(quality.id)}
                              >
                                {quality.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <Select
                        value={jewelryData?.trait ?? "no-trait"}
                        onValueChange={(value) => handleJewelryChange(slot.id, "trait", value)}
                        disabled={readOnly}
                      >
                        <SelectTrigger hideChevron>
                          <Badge variant="elevation-muted">
                            <SelectValue placeholder="No Trait" />
                          </Badge>
                        </SelectTrigger>
                        <SelectContent
                          nullSentinel={{ value: "no-trait", label: "No Trait" }}
                          sorted
                        >
                          {companionTraits.list
                            .filter((trait) => trait.id !== "no-trait")
                            .map((trait) => (
                              <SelectItem key={trait.id} value={trait.id}>
                                {trait.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </HorizontalScrollFade>
                </div>
              )}
            />
          )
        })}
      </div>
    </PanelCard>
  )
}
