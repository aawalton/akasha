"use client"

import { PanelCard } from "@shared/design-layout/components/panel-card"
import {
  type WeaponEnchantmentId,
  weaponEnchantments,
} from "@temper/game-characters-equipment/enchants/weapon-enchants-data"
import {
  bulkUpdateWeaponEnchant,
  bulkUpdateWeaponQuality,
  bulkUpdateWeaponSet,
  bulkUpdateWeaponTrait,
} from "@temper/game-characters-equipment/loadout/bulk-update-weapons"
import type { WeaponBars } from "@temper/game-characters-equipment/loadout/loadout-types"
import { getWeaponMythicSlots } from "@temper/game-characters-equipment/loadout/mythic-set-rules"
import {
  getWeaponItem,
  isShieldSlot,
  isWeaponSlot,
  shouldHideWeaponSlot,
} from "@temper/game-characters-equipment/loadout/weapon-slot-access"
import {
  removeWeaponItem,
  updateWeaponItem,
} from "@temper/game-characters-equipment/loadout/weapon-slot-mutations"
import type { EquipmentQualityOptionId } from "@temper/game-characters-equipment/quality-data"
import type { SetsAllId } from "@temper/game-characters-equipment/sets/sets-all-data"
import {
  type WeaponTraitId,
  weaponTraitsBuildList,
  weaponTraits as weaponTraitsData,
} from "@temper/game-characters-equipment/traits/weapon-traits-data"
import { weaponSlots as weaponSlotsData } from "@temper/game-characters-equipment/weapons/weapon-slots-data"
import { weaponTypes } from "@temper/game-characters-equipment/weapons/weapon-types-data"
import { AVAILABLE_QUALITY_OPTIONS, getQualityVariant } from "@temper/game-characters-equipment-ui/equipment-quality-helpers"
import { groupByCount } from "@temper/shared-engine/utils"
import { useMemo } from "react"
import { BulkEditTag } from "@/components/equipment/bulk-edit-tag"
import { BulkSetEditTag } from "@/components/equipment/bulk-set-edit-tag"
import type { EquipmentSectionProps } from "@/components/equipment/equipment-types"
import { WeaponCard } from "@/components/equipment/weapon-card"

interface WeaponBarPanelCardProps extends EquipmentSectionProps {
  barId: "primary-weapon-bar" | "backup-weapon-bar"
  barLabel: string
  collapseProtected?: boolean
}

export function WeaponBarPanelCard({
  equipment,
  onUpdate,
  availableSets,
  equippedMythicSetId,
  playerClass,
  barId,
  barLabel,
  className,
  readOnly,
  collapseProtected,
}: WeaponBarPanelCardProps) {
  const getOffHandHasItem = () => {
    const offHand = equipment[barId]["off-hand"]
    if (isWeaponSlot(offHand)) {
      return offHand.data.set !== "no-set" || offHand.data.type !== "no-type"
    }
    if (isShieldSlot(offHand)) {
      return offHand.data.set !== "no-set"
    }
    return false
  }

  const weaponSlots = useMemo(() => {
    const equipment_bars: WeaponBars = {
      "primary-weapon-bar": equipment["primary-weapon-bar"],
      "backup-weapon-bar": equipment["backup-weapon-bar"],
    }

    const slots: ReturnType<typeof getWeaponItem>[] = []
    for (const slotConfig of weaponSlotsData.list) {
      if (slotConfig.id === "poison") continue
      const slot = getWeaponItem(equipment_bars, slotConfig.id, barId)
      const isHidden = shouldHideWeaponSlot(equipment_bars, slotConfig.id, barId)
      if (!isHidden) {
        slots.push(slot)
        if (
          slotConfig.id === "main-hand" &&
          isWeaponSlot(slot) &&
          weaponTypes.data[slot.data.type].isTwoHanded
        ) {
          slots.push(slot)
        }
      }
    }
    return slots
  }, [equipment["primary-weapon-bar"], equipment["backup-weapon-bar"], barId])

  const weaponSets = useMemo(
    () =>
      groupByCount(weaponSlots, (item) => {
        if (isWeaponSlot(item)) return item.data.set ?? "no-set"
        if (isShieldSlot(item)) return item.data.set ?? "no-set"
        return "no-set"
      }),
    [weaponSlots]
  )

  const weaponTraits = useMemo(
    () =>
      groupByCount<(typeof weaponSlots)[number], WeaponTraitId>(weaponSlots, (item) =>
        isWeaponSlot(item) ? (item.data.trait ?? "no-trait") : "no-trait"
      ),
    [weaponSlots]
  )

  const weaponEnchants = useMemo(
    () =>
      groupByCount<(typeof weaponSlots)[number], WeaponEnchantmentId>(weaponSlots, (item) =>
        isWeaponSlot(item) ? (item.data.enchantment ?? "no-enchant") : "no-enchant"
      ),
    [weaponSlots]
  )

  const weaponQualityCounts = useMemo(
    () =>
      groupByCount<(typeof weaponSlots)[number], EquipmentQualityOptionId>(weaponSlots, (item) => {
        if (isWeaponSlot(item)) return item.data.quality ?? "no-quality"
        if (isShieldSlot(item)) return item.data.quality ?? "no-quality"
        return "no-quality"
      }),
    [weaponSlots]
  )

  const weaponMythicSlots = useMemo(
    () =>
      getWeaponMythicSlots(
        equipment["primary-weapon-bar"],
        equipment["backup-weapon-bar"],
        availableSets
      ),
    [equipment["primary-weapon-bar"], equipment["backup-weapon-bar"], availableSets]
  )

  const handleBulkUpdateWeaponTrait = (oldValue: WeaponTraitId, newValue: WeaponTraitId) => {
    onUpdate(bulkUpdateWeaponTrait(equipment, oldValue, newValue))
  }

  const handleBulkUpdateWeaponEnchant = (
    oldValue: WeaponEnchantmentId,
    newValue: WeaponEnchantmentId
  ) => {
    onUpdate(bulkUpdateWeaponEnchant(equipment, oldValue, newValue))
  }

  const handleBulkUpdateWeaponQuality = (
    oldValue: EquipmentQualityOptionId,
    newValue: EquipmentQualityOptionId
  ) => {
    onUpdate(bulkUpdateWeaponQuality(equipment, oldValue, newValue))
  }

  const handleBulkUpdateWeaponSet = (oldValue: SetsAllId, newValue: SetsAllId) => {
    onUpdate(bulkUpdateWeaponSet(equipment, oldValue, newValue, availableSets))
  }

  return (
    <PanelCard
      id={barId}
      collapsible={true}
      collapseProtected={collapseProtected}
      title={barLabel}
      headerSubtitle={
        !readOnly ? (
          <div className="flex flex-wrap gap-1">
            {weaponQualityCounts.map(([quality, count]) => (
              <BulkEditTag<EquipmentQualityOptionId>
                key={`quality-${quality}`}
                currentValue={quality}
                options={AVAILABLE_QUALITY_OPTIONS}
                onSelect={handleBulkUpdateWeaponQuality}
                count={count}
                getVariant={(q) => getQualityVariant(q, "elevation-muted")}
              />
            ))}
            {weaponSets.map(([setId, count]) => (
              <BulkSetEditTag
                key={`set-${setId}`}
                currentValue={setId}
                availableSets={availableSets}
                onSelect={handleBulkUpdateWeaponSet}
                count={count}
                slotType="weapon"
                mythicSlot={setId !== "no-set" ? weaponMythicSlots[setId] : undefined}
                playerClass={playerClass}
              />
            ))}
            {weaponTraits.map(([trait, count]) => (
              <BulkEditTag<WeaponTraitId>
                key={`trait-${trait}`}
                currentValue={trait}
                options={
                  weaponTraitsBuildList.some((t) => t.id === trait)
                    ? weaponTraitsBuildList
                    : weaponTraitsData.has(trait)
                      ? [...weaponTraitsBuildList, weaponTraitsData.data[trait]]
                      : weaponTraitsBuildList
                }
                onSelect={handleBulkUpdateWeaponTrait}
                count={count}
              />
            ))}
            {weaponEnchants.map(([enchant, count]) => (
              <BulkEditTag<WeaponEnchantmentId>
                key={`enchant-${enchant}`}
                currentValue={enchant}
                options={weaponEnchantments.list}
                onSelect={handleBulkUpdateWeaponEnchant}
                count={count}
              />
            ))}
          </div>
        ) : undefined
      }
      className={className}
    >
      <div className="flex flex-col gap-3">
        {weaponSlotsData.list.map((slotConfig) => {
          if (slotConfig.id === "poison") {
            return null
          }

          const slotId = slotConfig.id
          const item = getWeaponItem(equipment, slotId, barId)
          const isHidden = shouldHideWeaponSlot(equipment, slotId, barId)

          if (isHidden) {
            return null
          }

          const offHandHasItem = slotId === "main-hand" ? getOffHandHasItem() : false

          return (
            <WeaponCard
              key={`${barId}-${slotId}`}
              slotId={slotId}
              barId={barId}
              slotName={slotConfig.name}
              item={item}
              availableSets={availableSets}
              equippedMythicSetId={equippedMythicSetId}
              onUpdate={(updates) => onUpdate(updateWeaponItem(equipment, slotId, barId, updates))}
              onRemove={() => onUpdate(removeWeaponItem(equipment, slotId, barId))}
              playerClass={playerClass}
              offHandHasItem={offHandHasItem}
              readOnly={readOnly}
            />
          )
        })}
      </div>
    </PanelCard>
  )
}
