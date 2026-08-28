"use client"

import { Badge } from "@shared/design-badges/components/badge"
import { PanelCard } from "@shared/design-layout/components/panel-card"
import { HorizontalScrollFade } from "@shared/design-primitives/components/horizontal-scroll-fade"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/design-primitives/components/select"
import { ItemCard } from "@shared/design-patterns/components/item-card"
import { weaponSlots } from "@temper/game-characters-equipment/weapons/weapon-slots-data"
import { EquipmentIcon } from "@temper/game-characters-equipment-ui/equipment-icon"
import type { CompanionWeaponSlotItem } from "@temper/game-companions-core/companion-types"
import { getCompanionWeaponIcon } from "@temper/game-companions-core/equipment/companion-equipment-icons-data"
import type { CompanionEquipmentQualityId } from "@temper/game-companions-core/equipment/companion-equipment-quality-data"
import { companionEquipmentQualities } from "@temper/game-companions-core/generated/temper-companion-equipment-quality.generated"
import { AVAILABLE_QUALITY_OPTIONS } from "@temper/game-companions-core/equipment/companion-equipment-quality-rules"
import {
  type CompanionTraitId,
  companionTraits,
} from "@temper/game-companions-core/equipment/companion-traits-data"
import {
  type CompanionWeaponSlotId,
  companionWeaponSlots,
} from "@temper/game-companions-core/equipment/companion-weapon-slots-data"
import { companionWeaponTypes } from "@temper/game-companions-core/generated/temper-companion-weapon-type.generated"
import { getQualityClassName, getQualityVariant } from "@temper/game-companions-ui/companion-equipment-quality-helpers"
import { groupByCount } from "@temper/shared-engine/utils"
import { useMemo } from "react"
import { BulkEditTag } from "./companion-bulk-edit-tag"
import type { CompanionEquipmentPanelProps } from "./companion-equipment-panel-types"

export function CompanionWeaponBarPanelCard({
  equipment,
  onUpdate,
  readOnly,
}: CompanionEquipmentPanelProps) {
  const mainHandSlot = equipment.weapons["main-hand"]
  const mainHandType = mainHandSlot.itemType === "weapon" ? mainHandSlot.data.type : "no-type"
  const isMainHandTwoHanded =
    mainHandType !== "no-type" && companionWeaponTypes.data[mainHandType].isTwoHanded

  const handleWeaponChange = (
    slotId: CompanionWeaponSlotId,
    field: "type" | "trait" | "quality",
    value: string
  ) => {
    const currentSlot = equipment.weapons[slotId]
    const currentData = currentSlot.itemType === "weapon" ? currentSlot.data : null

    const newType =
      field === "type" && companionWeaponTypes.has(value) ? value : (currentData?.type ?? "no-type")

    const newSlot: CompanionWeaponSlotItem = {
      itemType: "weapon",
      data: {
        slot: slotId,
        type: newType,
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

    if (slotId === "main-hand" && field === "type") {
      const isTwoHanded = newType !== "no-type" && companionWeaponTypes.data[newType].isTwoHanded

      if (isTwoHanded) {
        onUpdate({
          weapons: {
            ...equipment.weapons,
            "main-hand": newSlot,
            "off-hand": {
              itemType: "weapon",
              data: {
                slot: "off-hand",
                type: "no-type",
                trait: "no-trait",
                quality: "no-quality",
              },
            },
          },
        })
        return
      }
    }

    if (slotId === "main-hand") {
      const isNotTwoHanded =
        newType !== "no-type" && !companionWeaponTypes.data[newType].isTwoHanded
      const offHandSlot = equipment.weapons["off-hand"]
      const offHandHasType =
        offHandSlot.itemType === "weapon" && offHandSlot.data.type !== "no-type"
      if (isNotTwoHanded && !offHandHasType) {
        onUpdate({
          weapons: {
            ...equipment.weapons,
            "main-hand": newSlot,
            "off-hand": {
              itemType: "weapon",
              data: { ...newSlot.data, slot: "off-hand" },
            },
          },
        })
        return
      }

      if (newType === "no-type") {
        onUpdate({
          weapons: {
            ...equipment.weapons,
            "main-hand": newSlot,
            "off-hand": {
              itemType: "weapon",
              data: {
                slot: "off-hand",
                type: "no-type",
                trait: "no-trait",
                quality: "no-quality",
              },
            },
          },
        })
        return
      }
    }

    onUpdate({
      weapons: {
        ...equipment.weapons,
        [slotId]: newSlot,
      },
    })
  }

  const weaponSlotItems = useMemo(() => {
    const items: CompanionWeaponSlotItem[] = []
    for (const slot of companionWeaponSlots.list) {
      if (slot.id === "off-hand" && isMainHandTwoHanded) continue
      items.push(equipment.weapons[slot.id])
      if (slot.id === "main-hand" && isMainHandTwoHanded) {
        items.push(equipment.weapons[slot.id])
      }
    }
    return items
  }, [equipment.weapons, isMainHandTwoHanded])

  const weaponTraitCounts = useMemo(
    () =>
      groupByCount<(typeof weaponSlotItems)[number], CompanionTraitId>(weaponSlotItems, (item) =>
        item.itemType === "weapon" ? item.data.trait : "no-trait"
      ),
    [weaponSlotItems]
  )

  const weaponQualityCounts = useMemo(
    () =>
      groupByCount<(typeof weaponSlotItems)[number], CompanionEquipmentQualityId>(
        weaponSlotItems,
        (item) => (item.itemType === "weapon" ? item.data.quality : "no-quality")
      ),
    [weaponSlotItems]
  )

  const handleBulkWeaponTraitUpdate = (oldValue: CompanionTraitId, newValue: CompanionTraitId) => {
    const newWeapons = { ...equipment.weapons }
    for (const slot of companionWeaponSlots.list) {
      if (slot.id === "off-hand" && isMainHandTwoHanded) continue

      const item = newWeapons[slot.id]
      const effectiveTrait = item.itemType === "weapon" ? item.data.trait : "no-trait"
      if (effectiveTrait === oldValue) {
        newWeapons[slot.id] = {
          itemType: "weapon",
          data: {
            slot: slot.id,
            type: item.itemType === "weapon" ? item.data.type : "no-type",
            trait: newValue,
            quality: item.itemType === "weapon" ? item.data.quality : "no-quality",
          },
        }
      }
    }
    onUpdate({ weapons: newWeapons })
  }

  const handleBulkWeaponQualityUpdate = (
    oldValue: CompanionEquipmentQualityId,
    newValue: CompanionEquipmentQualityId
  ) => {
    const newWeapons = { ...equipment.weapons }
    for (const slot of companionWeaponSlots.list) {
      if (slot.id === "off-hand" && isMainHandTwoHanded) continue

      const item = newWeapons[slot.id]
      const effectiveQuality = item.itemType === "weapon" ? item.data.quality : "no-quality"
      if (effectiveQuality === oldValue) {
        newWeapons[slot.id] = {
          itemType: "weapon",
          data: {
            slot: slot.id,
            type: item.itemType === "weapon" ? item.data.type : "no-type",
            trait: item.itemType === "weapon" ? item.data.trait : "no-trait",
            quality: newValue,
          },
        }
      }
    }
    onUpdate({ weapons: newWeapons })
  }

  return (
    <PanelCard
      id="companion-weapons"
      collapsible
      title="Weapons"
      headerSubtitle={
        <div className="flex flex-wrap gap-1">
          {weaponQualityCounts.map(([quality, count]) => (
            <BulkEditTag
              key={`quality-${quality}`}
              currentValue={quality}
              options={AVAILABLE_QUALITY_OPTIONS}
              onSelect={handleBulkWeaponQualityUpdate}
              count={count}
              disabled={readOnly}
              getVariant={(q) => getQualityVariant(q, "elevation-muted")}
              getItemClassName={getQualityClassName}
            />
          ))}
          {weaponTraitCounts.map(([trait, count]) => (
            <BulkEditTag
              key={`trait-${trait}`}
              currentValue={trait}
              options={companionTraits.list}
              onSelect={handleBulkWeaponTraitUpdate}
              count={count}
              disabled={readOnly}
            />
          ))}
        </div>
      }
    >
      <div className="flex flex-col gap-3">
        {companionWeaponSlots.list.map((slot) => {
          if (slot.id === "off-hand" && isMainHandTwoHanded) {
            return null
          }

          const weaponSlot = equipment.weapons[slot.id]
          const weaponData = weaponSlot.itemType === "weapon" ? weaponSlot.data : null

          const availableWeaponTypes = companionWeaponTypes.list.filter((type) => {
            if (type.id === "no-type") return true
            if (slot.id === "main-hand") {
              return type.id !== "shield"
            } else {
              return !type.isTwoHanded
            }
          })

          return (
            <ItemCard
              key={slot.id}
              renderIcon={() => (
                <EquipmentIcon
                  primarySrc={getCompanionWeaponIcon(weaponData?.type ?? "no-type")}
                  fallbackSrc={(() => {
                    if (!weaponSlots.has(slot.id)) return undefined
                    const ws = weaponSlots.list.find((s) => s.id === slot.id)
                    return ws && "icon" in ws ? ws.icon : undefined
                  })()}
                  alt={slot.name}
                />
              )}
              renderContent={() => (
                <div className="space-y-1">
                  <div className="font-medium text-sm">{slot.name}</div>
                  <HorizontalScrollFade>
                    <div className="flex gap-1">
                      <Select
                        value={weaponData?.quality ?? "no-quality"}
                        onValueChange={(value) => handleWeaponChange(slot.id, "quality", value)}
                        disabled={readOnly}
                      >
                        <SelectTrigger hideChevron>
                          <Badge variant={getQualityVariant(weaponData?.quality ?? "no-quality")}>
                            <SelectValue placeholder="No Quality" />
                          </Badge>
                        </SelectTrigger>
                        <SelectContent nullSentinel={{ value: "no-quality", label: "No Quality" }}>
                          {AVAILABLE_QUALITY_OPTIONS.filter(
                            (quality) => quality.id !== "no-quality"
                          ).map((quality) => (
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
                        value={weaponData?.type ?? "no-type"}
                        onValueChange={(value) => handleWeaponChange(slot.id, "type", value)}
                        disabled={readOnly}
                      >
                        <SelectTrigger hideChevron>
                          <Badge variant="elevation-muted">
                            <SelectValue placeholder="No Type" />
                          </Badge>
                        </SelectTrigger>
                        <SelectContent nullSentinel={{ value: "no-type", label: "No Type" }}>
                          {availableWeaponTypes
                            .filter((type) => type.id !== "no-type")
                            .map((type) => (
                              <SelectItem key={type.id} value={type.id}>
                                {type.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <Select
                        value={weaponData?.trait ?? "no-trait"}
                        onValueChange={(value) => handleWeaponChange(slot.id, "trait", value)}
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
