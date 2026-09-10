"use client"

import { groupByCount } from "akasha/temper/build-support/row-grouping/row-grouping.module.code.ts"
import type { CharacterState } from "akasha/temper/character-build/build-types/build-types.module.code.ts"
import {
  bulkUpdateAllQuality,
  bulkUpdateAllSets,
} from "akasha/temper/characters-equipment/bulk-update-functions/bulk-update-functions.module.code.ts"
import type { WeaponBars } from "akasha/temper/characters-equipment/loadout-types/loadout-types.module.code.ts"
import {
  getMythicSlots,
  getWeaponMythicSlots,
} from "akasha/temper/characters-equipment/mythic-set-rules/mythic-set-rules.module.code.ts"
import {
  getWeaponItem,
  isShieldSlot,
  isWeaponSlot,
  shouldHideWeaponSlot,
} from "akasha/temper/characters-equipment/weapon-slot-access/weapon-slot-access.module.code.ts"
import { weaponTypes } from "akasha/temper/characters-equipment/weapon-types-data/weapon-types-data.module.code.ts"
import {
  AVAILABLE_QUALITY_OPTIONS,
  getQualityVariant,
} from "akasha/temper/characters-equipment-ui/equipment-quality-rules/equipment-quality-rules.module.code.ts"
import type { SetId as SetsAllId } from "akasha/temper/equipment/set-ids/set-ids.module.code.ts"
import type { SetTemplate as SetsAll } from "akasha/temper/equipment/set-template/set-template.module.code.ts"
import { useMemo } from "react"
import { armorSlots } from "../../equipment-kinds/armor-slots/armor-slots.module.code.ts"
import type { EquipmentQualityOptionId } from "../../equipment-kinds/equipment-qualities/equipment-qualities.module.code.ts"
import { jewelrySlots } from "../../equipment-kinds/jewelry-slots/jewelry-slots.module.code.ts"
import { weaponBars } from "../../equipment-kinds/weapon-bars/weapon-bars.module.code.ts"
import { weaponSlots } from "../../equipment-kinds/weapon-slots/weapon-slots.module.code.ts"
import type { ClassId } from "../../formula-framework/class-id/class-id.module.code.ts"
import { BulkEditTag } from "../bulk-edit-tag/bulk-edit-tag.module.code.tsx"
import { BulkSetEditTag } from "../bulk-set-edit-tag/bulk-set-edit-tag.module.code.tsx"

interface GlobalSetBulkEditTagsProps {
  equipment: CharacterState["equipment"]
  onUpdate: (updates: Partial<CharacterState["equipment"]>) => void
  availableSets: readonly SetsAll[]
  playerClass?: ClassId | null
}

export function GlobalSetBulkEditTags({
  equipment,
  onUpdate,
  availableSets,
  playerClass,
}: GlobalSetBulkEditTagsProps) {
  const allSetIds = useMemo(() => {
    const setIds: SetsAllId[] = []

    for (const slot of armorSlots.list) {
      const item = equipment.armor[slot.id]
      setIds.push(item.itemType === "armor" ? (item.data.set ?? "no-set") : "no-set")
    }

    for (const slot of jewelrySlots.list) {
      const item = equipment.jewelry[slot.id]
      setIds.push(item.itemType === "jewelry" ? (item.data.set ?? "no-set") : "no-set")
    }

    const weaponEquipment: WeaponBars = {
      "primary-weapon-bar": equipment["primary-weapon-bar"],
      "backup-weapon-bar": equipment["backup-weapon-bar"],
    }
    for (const slotConfig of weaponSlots.list) {
      if (slotConfig.id === "poison") continue
      for (const barConfig of weaponBars.list) {
        const slot = getWeaponItem(weaponEquipment, slotConfig.id, barConfig.id)
        const isHidden = shouldHideWeaponSlot(weaponEquipment, slotConfig.id, barConfig.id)
        if (isHidden) continue
        if (isWeaponSlot(slot)) {
          setIds.push(slot.data.set ?? "no-set")
          if (slotConfig.id === "main-hand" && weaponTypes.data[slot.data.type].isTwoHanded) {
            setIds.push(slot.data.set ?? "no-set")
          }
        } else if (isShieldSlot(slot)) {
          setIds.push(slot.data.set ?? "no-set")
        } else {
          setIds.push("no-set")
        }
      }
    }

    return setIds
  }, [equipment])

  const setCounts = useMemo(() => groupByCount(allSetIds, (id) => id), [allSetIds])

  const allQualityIds = useMemo(() => {
    const qualityIds: EquipmentQualityOptionId[] = []

    for (const slot of armorSlots.list) {
      const item = equipment.armor[slot.id]
      qualityIds.push(
        item.itemType === "armor" ? (item.data.quality ?? "no-quality") : "no-quality"
      )
    }

    for (const slot of jewelrySlots.list) {
      const item = equipment.jewelry[slot.id]
      qualityIds.push(
        item.itemType === "jewelry" ? (item.data.quality ?? "no-quality") : "no-quality"
      )
    }

    const weaponEquipment: WeaponBars = {
      "primary-weapon-bar": equipment["primary-weapon-bar"],
      "backup-weapon-bar": equipment["backup-weapon-bar"],
    }
    for (const slotConfig of weaponSlots.list) {
      if (slotConfig.id === "poison") continue
      for (const barConfig of weaponBars.list) {
        const slot = getWeaponItem(weaponEquipment, slotConfig.id, barConfig.id)
        const isHidden = shouldHideWeaponSlot(weaponEquipment, slotConfig.id, barConfig.id)
        if (isHidden) continue
        if (isWeaponSlot(slot)) {
          qualityIds.push(slot.data.quality ?? "no-quality")
          if (slotConfig.id === "main-hand" && weaponTypes.data[slot.data.type].isTwoHanded) {
            qualityIds.push(slot.data.quality ?? "no-quality")
          }
        } else if (isShieldSlot(slot)) {
          qualityIds.push(slot.data.quality ?? "no-quality")
        } else {
          qualityIds.push("no-quality")
        }
      }
    }

    return qualityIds
  }, [equipment])

  const qualityCounts = useMemo(() => groupByCount(allQualityIds, (id) => id), [allQualityIds])

  const combinedMythicSlots = useMemo(() => {
    const armorMythicSlots = getMythicSlots(equipment.armor, availableSets, armorSlots.list)
    const jewelryMythicSlots = getMythicSlots(equipment.jewelry, availableSets, jewelrySlots.list)
    const weaponMythicSlots = getWeaponMythicSlots(
      equipment["primary-weapon-bar"],
      equipment["backup-weapon-bar"],
      availableSets
    )
    return { ...armorMythicSlots, ...jewelryMythicSlots, ...weaponMythicSlots }
  }, [equipment, availableSets])

  const handleBulkUpdateSet = (oldValue: SetsAllId, newValue: SetsAllId) => {
    onUpdate(bulkUpdateAllSets(equipment, oldValue, newValue, availableSets))
  }

  const handleBulkUpdateQuality = (
    oldValue: EquipmentQualityOptionId,
    newValue: EquipmentQualityOptionId
  ) => {
    onUpdate(bulkUpdateAllQuality(equipment, oldValue, newValue))
  }

  return (
    <div className="flex flex-wrap gap-1">
      {qualityCounts.map(([quality, count]) => (
        <BulkEditTag<EquipmentQualityOptionId>
          key={`quality-${quality}`}
          currentValue={quality}
          options={AVAILABLE_QUALITY_OPTIONS}
          onSelect={handleBulkUpdateQuality}
          count={count}
          getVariant={(q) => getQualityVariant(q, "elevation-muted")}
        />
      ))}
      {setCounts.map(([setId, count]) => (
        <BulkSetEditTag
          key={`set-${setId}`}
          currentValue={setId}
          availableSets={availableSets}
          onSelect={handleBulkUpdateSet}
          count={count}
          slotType="armor"
          mythicSlot={setId !== "no-set" ? combinedMythicSlots[setId] : undefined}
          playerClass={playerClass}
        />
      ))}
    </div>
  )
}
