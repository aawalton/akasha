"use client"

import { groupByCount } from "@akasha/temper-build-support/row-grouping"
import { companionArmorSlots } from "@akasha/temper-companions-core/companion-armor-slots"
import {
  bulkUpdateAllCompanionQualities,
  bulkUpdateAllCompanionTraits,
} from "@akasha/temper-companions-core/companion-bulk-update-equipment"
import type { CompanionEquipmentQualityId } from "@akasha/temper-companions-core/companion-equipment-qualities"
import { LEGENDARY_QUALITY_OPTIONS } from "@akasha/temper-companions-core/companion-equipment-quality-rules"
import { companionJewelrySlots } from "@akasha/temper-companions-core/companion-jewelry-slots"
import {
  type CompanionTraitId,
  companionTraits,
} from "@akasha/temper-companions-core/companion-traits"
import type { CompanionState } from "@akasha/temper-companions-core/companion-types"
import { companionWeaponSlots } from "@akasha/temper-companions-core/companion-weapon-slots"
import { companionWeaponTypes } from "@akasha/temper-companions-core/companion-weapon-types"
import {
  getQualityClassName,
  getQualityVariant,
} from "@akasha/temper-companions-ui/companion-quality-rules"
import { useMemo } from "react"
import { BulkEditTag } from "../companion-bulk-edit-tag/companion-bulk-edit-tag.module.code.tsx"

interface GlobalCompanionBulkEditTagsProps {
  equipment: CompanionState["equipment"]
  onUpdate: (updates: Partial<CompanionState["equipment"]>) => void
}

export function GlobalCompanionBulkEditTags({
  equipment,
  onUpdate,
}: GlobalCompanionBulkEditTagsProps) {
  const isMainHandTwoHanded = useMemo(() => {
    const mainHandSlot = equipment.weapons["main-hand"]
    const mainHandType = mainHandSlot.itemType === "weapon" ? mainHandSlot.data.type : "no-type"
    return mainHandType !== "no-type" && companionWeaponTypes.data[mainHandType].isTwoHanded
  }, [equipment.weapons])

  const allItems = useMemo(() => {
    const items: { trait: CompanionTraitId; quality: CompanionEquipmentQualityId }[] = []

    for (const slot of companionArmorSlots.list) {
      const item = equipment.armor[slot.id]
      if (item.itemType === "armor") {
        items.push({ trait: item.data.trait, quality: item.data.quality })
      }
    }

    for (const slot of companionJewelrySlots.list) {
      const item = equipment.jewelry[slot.id]
      if (item.itemType === "jewelry") {
        items.push({ trait: item.data.trait, quality: item.data.quality })
      }
    }

    for (const slot of companionWeaponSlots.list) {
      if (slot.id === "off-hand" && isMainHandTwoHanded) continue
      const item = equipment.weapons[slot.id]
      if (item.itemType === "weapon") {
        items.push({ trait: item.data.trait, quality: item.data.quality })
        if (slot.id === "main-hand" && isMainHandTwoHanded) {
          items.push({ trait: item.data.trait, quality: item.data.quality })
        }
      }
    }

    return items
  }, [equipment, isMainHandTwoHanded])

  const traitCounts = useMemo(() => groupByCount(allItems, (item) => item.trait), [allItems])

  const qualityCounts = useMemo(() => groupByCount(allItems, (item) => item.quality), [allItems])

  const handleBulkTraitUpdate = (oldValue: CompanionTraitId, newValue: CompanionTraitId) => {
    onUpdate(bulkUpdateAllCompanionTraits(equipment, oldValue, newValue))
  }

  const handleBulkQualityUpdate = (
    oldValue: CompanionEquipmentQualityId,
    newValue: CompanionEquipmentQualityId
  ) => {
    onUpdate(bulkUpdateAllCompanionQualities(equipment, oldValue, newValue))
  }

  if (traitCounts.length === 0 && qualityCounts.length === 0) return null

  return (
    <div className="flex flex-wrap gap-1">
      {qualityCounts.map(([quality, count]) => (
        <BulkEditTag
          key={`quality-${quality}`}
          currentValue={quality}
          options={LEGENDARY_QUALITY_OPTIONS}
          onSelect={handleBulkQualityUpdate}
          count={count}
          getVariant={(q) => getQualityVariant(q, "elevation-muted")}
          getItemClassName={getQualityClassName}
        />
      ))}
      {traitCounts.map(([trait, count]) => (
        <BulkEditTag
          key={`trait-${trait}`}
          currentValue={trait}
          options={companionTraits.list}
          onSelect={handleBulkTraitUpdate}
          count={count}
        />
      ))}
    </div>
  )
}
