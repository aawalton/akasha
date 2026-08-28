"use client"

import { Badge } from "@shared/design-badges/components/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/design-primitives/components/select"
import { ItemCard } from "@shared/design-patterns/components/item-card"
import type { ClassId } from "@temper/game-characters-classes/classes-data"
import {
  type ArmorEnchantId,
  armorEnchants,
} from "@temper/game-characters-equipment/enchants/armor-enchants-data"
import {
  type WeaponEnchantmentId,
  weaponEnchantments,
} from "@temper/game-characters-equipment/enchants/weapon-enchants-data"
import type {
  WeaponSlotItem,
  WeaponSlotUpdateParams,
} from "@temper/game-characters-equipment/loadout/loadout-types"
import type { EquipmentQualityOptionId } from "@temper/game-characters-equipment/quality-data"
import {
  convertIconPathToUrl,
  getEquipmentIcon,
} from "@temper/game-characters-equipment/sets/get-equipment-icon"
import {
  getValidSetsForSlot,
  getValidTypesForSet,
  isShieldValidForSet,
} from "@temper/game-characters-equipment/sets/pattern-matcher"
import type { SetsAll, SetsAllId } from "@temper/game-characters-equipment/sets/sets-all-data"
import {
  type ArmorTraitId,
  armorTraits,
  armorTraitsBuildList,
} from "@temper/game-characters-equipment/traits/armor-traits-data"
import {
  type WeaponTraitId,
  weaponTraits,
  weaponTraitsBuildList,
} from "@temper/game-characters-equipment/traits/weapon-traits-data"
import type { WeaponBar } from "@temper/game-characters-equipment/weapons/weapon-bars-data"
import {
  type WeaponSlot,
  weaponSlots,
} from "@temper/game-characters-equipment/weapons/weapon-slots-data"
import {
  type WeaponTypeId,
  weaponTypes,
} from "@temper/game-characters-equipment/weapons/weapon-types-data"
import { EquipmentIcon } from "@temper/game-characters-equipment-ui/equipment-icon"
import { AVAILABLE_QUALITY_OPTIONS, getQualityClassName, getQualityLabel, getQualityVariant } from "@temper/game-characters-equipment-ui/equipment-quality-helpers"
import { useMemo, useState } from "react"
import { getSetById, SetSelectDialog } from "@/components/equipment/set-select-dialog"

interface WeaponCardProps {
  slotId: WeaponSlot
  barId: WeaponBar
  slotName: string
  item: WeaponSlotItem
  availableSets: readonly SetsAll[]
  equippedMythicSetId: string | null
  onUpdate: (updates: WeaponSlotUpdateParams) => void
  onRemove: () => void
  playerClass?: ClassId | null
  offHandHasItem?: boolean
  readOnly?: boolean
}

export function WeaponCard({
  slotId,
  slotName,
  item,
  availableSets,
  equippedMythicSetId,
  onUpdate,
  onRemove,
  playerClass,
  readOnly,
}: WeaponCardProps) {
  const [isSetDialogOpen, setIsSetDialogOpen] = useState(false)

  const slotLabel = slotName

  const itemData =
    item.itemType === "weapon" ? item.data : item.itemType === "shield" ? item.data : null

  const currentSetId = itemData?.set ?? "no-set"
  const selectedSet = getSetById(currentSetId, availableSets) ?? null

  const hasValues =
    item.itemType === "weapon"
      ? item.data.set !== "no-set" ||
        item.data.type !== "no-type" ||
        item.data.trait !== "no-trait" ||
        item.data.enchantment !== "no-enchant"
      : item.itemType === "shield"
        ? item.data.set !== "no-set" ||
          item.data.trait !== "no-trait" ||
          item.data.enchantment !== "no-enchant"
        : false

  const itemType =
    item.itemType === "weapon" ? item.data.type : item.itemType === "shield" ? "shield" : null

  const setIconPath = itemType != null ? getEquipmentIcon(selectedSet, itemType) : null
  const iconPath = convertIconPathToUrl(setIconPath)

  const isShieldType = item.itemType === "shield"
  const enchantOptions = isShieldType ? armorEnchants.list : weaponEnchantments.list

  const setsValidForSlot = useMemo(() => {
    return getValidSetsForSlot(availableSets, slotId, itemType, null)
  }, [availableSets, slotId, itemType])

  const validWeaponTypeOptions = useMemo(() => {
    if (!selectedSet) {
      return weaponTypes.list
    }
    const validTypeIds = getValidTypesForSet(selectedSet, slotId)
    if (validTypeIds.length === 1) {
      return weaponTypes.list.filter((t) => validTypeIds.includes(t.id))
    }
    return weaponTypes.list.filter((t) => t.id === "no-type" || validTypeIds.includes(t.id))
  }, [selectedSet, slotId])

  const handleSetSelect = (setId: SetsAllId) => {
    const newSet = getSetById(setId, availableSets)
    let updatedType: WeaponTypeId | undefined =
      item.itemType === "weapon" ? item.data.type : undefined

    if (newSet) {
      const validTypes = getValidTypesForSet(newSet, slotId)
      const shieldValid = isShieldValidForSet(newSet)

      if (item.itemType === "weapon" && item.data.type !== "no-type") {
        if (!validTypes.includes(item.data.type)) {
          updatedType = "no-type"
        }
      }

      if (item.itemType === "shield" && !shieldValid) {
        updatedType = "no-type"
      }

      if (validTypes.length === 1 && item.itemType === "weapon") {
        updatedType = validTypes[0]
      }
    }

    const quality: EquipmentQualityOptionId | undefined =
      newSet?.subcategoryId === "mythic" ? "mythic" : undefined
    onUpdate({ set: setId, type: updatedType, ...(quality != null && { quality }) })
  }

  return (
    <>
      <ItemCard
        renderIcon={() => (
          <EquipmentIcon
            primarySrc={iconPath}
            fallbackSrc={(() => {
              const ws = weaponSlots.data[slotId]
              return ws && "icon" in ws ? ws.icon : undefined
            })()}
            alt={slotLabel}
          />
        )}
        renderContent={() => (
          <div className="space-y-1">
            <div className="font-medium text-sm">{slotLabel}</div>
            <div>
              <div className="flex flex-wrap items-center gap-1">
                <Select<EquipmentQualityOptionId>
                  value={itemData?.quality ?? "no-quality"}
                  onValueChange={(v) => onUpdate({ quality: v })}
                  disabled={readOnly}
                >
                  <SelectTrigger hideChevron>
                    <Badge
                      variant={getQualityVariant(itemData?.quality ?? "no-quality")}
                      className="shrink-0"
                    >
                      {getQualityLabel(itemData?.quality ?? "no-quality")}
                    </Badge>
                  </SelectTrigger>
                  <SelectContent nullSentinel={{ value: "no-quality", label: "No Quality" }}>
                    {AVAILABLE_QUALITY_OPTIONS.filter((option) => option.id !== "no-quality").map(
                      (option) => (
                        <SelectItem
                          key={option.id}
                          value={option.id}
                          className={getQualityClassName(option.id)}
                        >
                          {option.name}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
                <button
                  type="button"
                  className="cursor-pointer outline-none transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-[var(--state-disabled-content)] focus-visible:[outline-offset:-1px] focus-visible:[outline:1.5px_solid_var(--color-accent)]"
                  onClick={() => setIsSetDialogOpen(true)}
                  disabled={readOnly}
                >
                  <Badge variant="elevation-muted" className="shrink-0">
                    {selectedSet?.name ?? "No Set"}
                  </Badge>
                </button>
                <Select<WeaponTypeId>
                  value={item.itemType === "weapon" ? item.data.type : "no-type"}
                  onValueChange={(v) => onUpdate({ type: v })}
                  disabled={readOnly}
                >
                  <SelectTrigger hideChevron>
                    <Badge variant="elevation-muted" className="shrink-0">
                      <SelectValue placeholder="No Type" />
                    </Badge>
                  </SelectTrigger>
                  <SelectContent nullSentinel={{ value: "no-type", label: "No Type" }}>
                    {validWeaponTypeOptions
                      .filter((option) => option.id !== "no-type")
                      .map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <Select<WeaponTraitId | ArmorTraitId>
                  value={itemData?.trait ?? "no-trait"}
                  onValueChange={(v) => onUpdate({ trait: v })}
                  disabled={readOnly}
                >
                  <SelectTrigger hideChevron>
                    <Badge variant="elevation-muted" className="shrink-0">
                      <SelectValue placeholder="No Trait" />
                    </Badge>
                  </SelectTrigger>
                  <SelectContent nullSentinel={{ value: "no-trait", label: "No Trait" }} sorted>
                    {(() => {
                      const currentTrait = itemData?.trait ?? "no-trait"
                      const buildList = isShieldType ? armorTraitsBuildList : weaponTraitsBuildList
                      const computedOptions = buildList.some((t) => t.id === currentTrait)
                        ? buildList
                        : isShieldType
                          ? armorTraits.has(currentTrait)
                            ? [...armorTraitsBuildList, armorTraits.data[currentTrait]]
                            : armorTraitsBuildList
                          : weaponTraits.has(currentTrait)
                            ? [...weaponTraitsBuildList, weaponTraits.data[currentTrait]]
                            : weaponTraitsBuildList
                      return computedOptions
                        .filter((option) => option.id !== "no-trait")
                        .map((option) => (
                          <SelectItem key={option.id} value={option.id}>
                            {option.name}
                          </SelectItem>
                        ))
                    })()}
                  </SelectContent>
                </Select>
                <Select<WeaponEnchantmentId | ArmorEnchantId>
                  value={itemData?.enchantment ?? "no-enchant"}
                  onValueChange={(v) => onUpdate({ enchantment: v })}
                  disabled={readOnly}
                >
                  <SelectTrigger hideChevron>
                    <Badge variant="elevation-muted" className="shrink-0">
                      <SelectValue placeholder="No Enchant" />
                    </Badge>
                  </SelectTrigger>
                  <SelectContent nullSentinel={{ value: "no-enchant", label: "No Enchant" }} sorted>
                    {enchantOptions
                      .filter((option) => option.id !== "no-enchant")
                      .map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
        onRemove={!readOnly && hasValues ? onRemove : undefined}
        removeLabel={`Remove ${slotLabel}`}
      />

      {!readOnly && (
        <SetSelectDialog
          open={isSetDialogOpen}
          onOpenChange={setIsSetDialogOpen}
          selectedSetId={currentSetId}
          onSelect={handleSetSelect}
          availableSets={setsValidForSlot}
          playerClass={playerClass}
          equippedMythicSetId={equippedMythicSetId}
        />
      )}
    </>
  )
}
