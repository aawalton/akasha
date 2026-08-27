"use client"

import type { CompanionState } from "@temper/game-companions-core/companion-types"
import { companionArmorSlots } from "@temper/game-companions-core/equipment/companion-armor-slots-data"
import {
  bulkUpdateAllCompanionQualities,
  bulkUpdateAllCompanionTraits,
} from "@temper/game-companions-core/equipment/companion-bulk-update-equipment"
import type { CompanionEquipmentQualityId } from "@temper/game-companions-core/equipment/companion-equipment-quality-data"
import { LEGENDARY_QUALITY_OPTIONS } from "@temper/game-companions-core/equipment/companion-equipment-quality-rules"
import { companionJewelrySlots } from "@temper/game-companions-core/generated/temper-companion-jewelry-slot.generated"
import {
  type CompanionTraitId,
  companionTraits,
} from "@temper/game-companions-core/equipment/companion-traits-data"
import { companionWeaponSlots } from "@temper/game-companions-core/equipment/companion-weapon-slots-data"
import { companionWeaponTypes } from "@temper/game-companions-core/generated/temper-companion-weapon-type.generated"
import { getQualityClassName, getQualityVariant } from "@temper/game-companions-ui/companion-equipment-quality-helpers"
import { groupByCount } from "@temper/shared-engine/utils"
import { useMemo } from "react"
import { BulkEditTag } from "./companion-bulk-edit-tag"

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
