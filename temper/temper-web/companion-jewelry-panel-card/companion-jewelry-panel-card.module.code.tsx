"use client"

import { Badge } from "@akasha/design-badges/badge"
import { PanelCard } from "@akasha/design-layout/panel-card"
import { ItemCard } from "@akasha/design-patterns/item-card"
import { HorizontalScrollFade } from "@akasha/design-primitives/horizontal-scroll-fade"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@akasha/design-primitives/select-control"
import { groupByCount } from "@akasha/temper-build-support/row-grouping"
import { EquipmentIcon } from "@akasha/temper-characters-equipment-ui/equipment-icon"
import { getCompanionJewelryIcon } from "@akasha/temper-companions-core/companion-equipment-icons"
import type { CompanionEquipmentQualityId } from "@akasha/temper-companions-core/companion-equipment-qualities"
import { companionEquipmentQualities } from "@akasha/temper-companions-core/companion-equipment-qualities"
import {
  capQualityForSlot,
  getAvailableQualityOptions,
  LEGENDARY_QUALITY_OPTIONS,
} from "@akasha/temper-companions-core/companion-equipment-quality-rules"
import {
  type CompanionJewelrySlotId,
  companionJewelrySlots,
} from "@akasha/temper-companions-core/companion-jewelry-slots"
import {
  type CompanionTraitId,
  companionTraits,
} from "@akasha/temper-companions-core/companion-traits"
import type { CompanionJewelrySlotItem } from "@akasha/temper-companions-core/companion-types"
import {
  getQualityClassName,
  getQualityVariant,
} from "@akasha/temper-companions-ui/companion-quality-rules"
import { jewelrySlots } from "@akasha/temper-equipment-kinds/jewelry-slots"
import { useMemo } from "react"
import { BulkEditTag } from "../companion-bulk-edit-tag/companion-bulk-edit-tag.module.code.tsx"
import type { CompanionEquipmentPanelProps } from "../companion-equipment-panel-types/companion-equipment-panel-types.module.code.ts"

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
