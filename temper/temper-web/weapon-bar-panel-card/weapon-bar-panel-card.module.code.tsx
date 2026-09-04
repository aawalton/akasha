"use client"

import { PanelCard } from "@akasha/design-layout/panel-card"
import { groupByCount } from "@akasha/temper-build-support/row-grouping"
import {
  bulkUpdateWeaponEnchant,
  bulkUpdateWeaponQuality,
  bulkUpdateWeaponSet,
  bulkUpdateWeaponTrait,
} from "@akasha/temper-characters-equipment/bulk-update-weapons"
import type { WeaponBars } from "@akasha/temper-characters-equipment/loadout-types"
import { getWeaponMythicSlots } from "@akasha/temper-characters-equipment/mythic-set-rules"
import {
  type WeaponEnchantmentId,
  weaponEnchantments,
} from "@akasha/temper-characters-equipment/weapon-enchants"
import {
  getWeaponItem,
  isShieldSlot,
  isWeaponSlot,
  shouldHideWeaponSlot,
} from "@akasha/temper-characters-equipment/weapon-slot-access"
import {
  removeWeaponItem,
  updateWeaponItem,
} from "@akasha/temper-characters-equipment/weapon-slot-mutations"
import { weaponTypes } from "@akasha/temper-characters-equipment/weapon-types-data"
import {
  AVAILABLE_QUALITY_OPTIONS,
  getQualityVariant,
} from "@akasha/temper-characters-equipment-ui/equipment-quality-rules"
import type { SetId as SetsAllId } from "@akasha/temper-equipment/set-ids"
import {
  type WeaponTraitId,
  weaponTraitsBuildList,
  weaponTraits as weaponTraitsData,
} from "@akasha/temper-equipment/weapon-traits"
import type { EquipmentQualityOptionId } from "@akasha/temper-equipment-kinds/equipment-qualities"
import { weaponSlots as weaponSlotsData } from "@akasha/temper-equipment-kinds/weapon-slots"
import { useMemo } from "react"
import { BulkEditTag } from "../bulk-edit-tag/bulk-edit-tag.module.code.tsx"
import { BulkSetEditTag } from "../bulk-set-edit-tag/bulk-set-edit-tag.module.code.tsx"
import type { EquipmentSectionProps } from "../equipment-types/equipment-types.module.code.ts"
import { WeaponCard } from "../weapon-card/weapon-card.module.code.tsx"

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
    const equipmentBars: WeaponBars = {
      "primary-weapon-bar": equipment["primary-weapon-bar"],
      "backup-weapon-bar": equipment["backup-weapon-bar"],
    }

    const slots: ReturnType<typeof getWeaponItem>[] = []
    for (const slotConfig of weaponSlotsData.list) {
      if (slotConfig.id === "poison") continue
      const slot = getWeaponItem(equipmentBars, slotConfig.id, barId)
      const isHidden = shouldHideWeaponSlot(equipmentBars, slotConfig.id, barId)
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
