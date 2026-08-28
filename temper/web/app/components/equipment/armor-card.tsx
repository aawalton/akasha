"use client"
import { Badge } from "@shared/design-badges/components/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/design-primitives/components/select"
import { ItemCard } from "@shared/design-patterns/components/item-card"
import type { CharacterState } from "@temper/game-characters-character/build-types"
import type { ClassId } from "@temper/game-characters-classes/classes-data"
import {
  type ArmorSlotId,
  armorSlots,
} from "@temper/game-characters-equipment/armor/armor-slots-data"
import {
  type StandardArmorWeightId,
  standardArmorWeights,
} from "@temper/game-characters-equipment/armor/armor-weights-data"
import {
  type ArmorEnchantId,
  armorEnchants,
} from "@temper/game-characters-equipment/enchants/armor-enchants-data"
import type { EquipmentQualityOptionId } from "@temper/game-characters-equipment/quality-data"
import {
  convertIconPathToUrl,
  getEquipmentIcon,
} from "@temper/game-characters-equipment/sets/get-equipment-icon"
import {
  getValidSetsForArmorSlot,
  getValidWeightsForSet,
} from "@temper/game-characters-equipment/sets/pattern-matcher"
import type { SetsAll, SetsAllId } from "@temper/game-characters-equipment/sets/sets-all-data"
import {
  type ArmorTraitId,
  armorTraits,
  armorTraitsBuildList,
} from "@temper/game-characters-equipment/traits/armor-traits-data"
import { EquipmentIcon } from "@temper/game-characters-equipment-ui/equipment-icon"
import { AVAILABLE_QUALITY_OPTIONS, getQualityClassName, getQualityLabel, getQualityVariant } from "@temper/game-characters-equipment-ui/equipment-quality-helpers"
import { useMemo, useState } from "react"
import { getSetById, SetSelectDialog } from "@/components/equipment/set-select-dialog"

export interface ArmorUpdateParams {
  set?: SetsAllId
  weight?: StandardArmorWeightId
  trait?: ArmorTraitId
  enchantment?: ArmorEnchantId
  quality?: EquipmentQualityOptionId
}

interface ArmorCardProps {
  slot: ArmorSlotId
  item: CharacterState["equipment"]["armor"][ArmorSlotId]
  availableSets: readonly SetsAll[]
  equippedMythicSetId: string | null
  onUpdate: (updates: ArmorUpdateParams) => void
  onRemove: () => void
  playerClass?: ClassId | null
  readOnly?: boolean
}

export function ArmorCard({
  slot,
  item,
  availableSets,
  equippedMythicSetId,
  onUpdate,
  onRemove,
  playerClass,
  readOnly,
}: ArmorCardProps) {
  const [isSetDialogOpen, setIsSetDialogOpen] = useState(false)

  const itemData = item.itemType === "armor" ? item.data : null
  const currentSetId = itemData?.set ?? "no-set"
  const selectedSet = getSetById(currentSetId, availableSets) ?? null

  const hasValues =
    (itemData?.set != null && itemData.set !== "no-set") ||
    (itemData?.weight != null && itemData.weight !== "no-weight") ||
    (itemData?.trait != null && itemData.trait !== "no-trait") ||
    (itemData?.enchantment != null && itemData.enchantment !== "no-enchant")

  const armorWeightId = itemData?.weight
  const setIconPath = getEquipmentIcon(selectedSet, slot, armorWeightId)
  const iconPath = convertIconPathToUrl(setIconPath)

  const name = armorSlots.list.find((s) => s.id === slot)?.name ?? slot

  const setsValidForSlot = useMemo(() => {
    return getValidSetsForArmorSlot(availableSets, slot)
  }, [availableSets, slot])

  const validWeightOptions = useMemo(() => {
    if (!selectedSet) {
      return standardArmorWeights.list
    }
    const validWeightIds = getValidWeightsForSet(selectedSet, slot)
    if (validWeightIds.length === 1) {
      return standardArmorWeights.list.filter((w) => validWeightIds.includes(w.id))
    }
    return standardArmorWeights.list.filter(
      (w) => w.id === "no-weight" || validWeightIds.includes(w.id)
    )
  }, [selectedSet, slot])

  const handleSetSelect = (setId: SetsAllId) => {
    const newSet = getSetById(setId, availableSets)
    let updatedWeight: StandardArmorWeightId | undefined = armorWeightId ?? "no-weight"
    const quality: EquipmentQualityOptionId | undefined =
      newSet?.subcategoryId === "mythic" ? "mythic" : undefined

    if (newSet) {
      const validWeights = getValidWeightsForSet(newSet, slot)

      if (
        armorWeightId != null &&
        armorWeightId !== "no-weight" &&
        !validWeights.includes(armorWeightId)
      ) {
        updatedWeight = "no-weight"
      }

      if (validWeights.length === 1) {
        updatedWeight = validWeights[0]
      }
    }

    onUpdate({ set: setId, weight: updatedWeight, ...(quality != null && { quality }) })
  }

  return (
    <>
      <ItemCard
        renderIcon={() => (
          <EquipmentIcon
            primarySrc={iconPath}
            fallbackSrc={armorSlots.data[slot].icon}
            alt={slot}
          />
        )}
        renderContent={() => (
          <div className="space-y-1">
            <div className="font-medium text-sm">{name}</div>
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
                <Select<StandardArmorWeightId>
                  value={armorWeightId ?? "no-weight"}
                  onValueChange={(v) => onUpdate({ weight: v })}
                  disabled={readOnly}
                >
                  <SelectTrigger hideChevron>
                    <Badge variant="elevation-muted" className="shrink-0">
                      <SelectValue placeholder="No Weight" />
                    </Badge>
                  </SelectTrigger>
                  <SelectContent nullSentinel={{ value: "no-weight", label: "No Weight" }}>
                    {validWeightOptions
                      .filter((option) => option.id !== "no-weight")
                      .map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <Select<ArmorTraitId>
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
                      const traitOptions = armorTraitsBuildList.some((t) => t.id === currentTrait)
                        ? armorTraitsBuildList
                        : armorTraits.has(currentTrait)
                          ? [...armorTraitsBuildList, armorTraits.data[currentTrait]]
                          : armorTraitsBuildList
                      return traitOptions
                        .filter((option) => option.id !== "no-trait")
                        .map((option) => (
                          <SelectItem key={option.id} value={option.id}>
                            {option.name}
                          </SelectItem>
                        ))
                    })()}
                  </SelectContent>
                </Select>
                <Select<ArmorEnchantId>
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
                    {armorEnchants.list
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
        removeLabel={`Remove ${name}`}
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
