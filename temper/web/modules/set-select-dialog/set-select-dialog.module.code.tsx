"use client"

import type { Slug } from "akasha/page/properties/slug.text-property.types.ts"
import type { SetTemplate as SetsAll } from "akasha/temper/catalog/gear/equipment/modules/set-template/set-template.module.code.ts"
import { convertIconPathToUrl } from "akasha/temper/player/character/characters-equipment/modules/get-equipment-icon/get-equipment-icon.module.code.ts"
import { canClassEquipSet } from "akasha/temper/player/character/characters-equipment/modules/set-class-restrictions/set-class-restrictions.module.code.ts"
import {
  createSetSelectConfig,
  getMaxBonusPieceCount,
  NO_SET_SOURCE,
} from "akasha/temper/player/character/characters-equipment/modules/set-select-helpers/set-select-helpers.module.code.ts"
import {
  isSetSourceId,
  type SetSource,
  type SetSourceId,
} from "akasha/temper/player/character/characters-equipment/modules/set-source/set-source.module.code.ts"
import { isSetsAllId } from "akasha/temper/player/character/characters-equipment/modules/sets-all/sets-all.module.code.ts"
import type { ClassId } from "akasha/temper/player/character/formula-framework/modules/class-id/class-id.module.code.ts"
import { typedPartialRecordKeys } from "akasha/temper/player/character/formula-framework/modules/record-parts/record-parts.module.code.ts"
import { EquipmentIcon } from "akasha/temper/web/characters-equipment-ui/modules/equipment-icon/equipment-icon.module.code.tsx"
import { FilterableSelectDialog } from "akasha/temper/web/modules/filterable-select-dialog/filterable-select-dialog.module.code.tsx"
import { Shield } from "lucide-react"
import { useMemo } from "react"

interface SetSelectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedSetId: Slug
  onSelect: (setId: Slug) => void
  availableSets: readonly SetsAll[]
  playerClass?: ClassId | null
  equippedMythicSetId?: string | null
}

export function getSetById(id: Slug, sets: readonly SetsAll[]): SetsAll | undefined {
  if (id === "no-set") return undefined
  return sets.find((s) => s.id === id)
}

export function SetSelectDialog({
  open,
  onOpenChange,
  selectedSetId,
  onSelect,
  availableSets,
  playerClass = null,
  equippedMythicSetId = null,
}: SetSelectDialogProps) {
  const classFilteredSets = useMemo(() => {
    return availableSets.filter((set) => {
      if (set.subcategoryId === "none") {
        return false
      }
      if (playerClass != null && !canClassEquipSet(set, playerClass)) {
        return false
      }
      if (
        set.subcategoryId === "mythic" &&
        equippedMythicSetId != null &&
        equippedMythicSetId !== selectedSetId
      ) {
        return false
      }
      return true
    })
  }, [availableSets, playerClass, equippedMythicSetId, selectedSetId])

  const selectedSetSourceId = useMemo<SetSourceId>(() => {
    const selectedSet = availableSets.find((s) => s.id === selectedSetId)
    const pieceCount = selectedSet ? getMaxBonusPieceCount(selectedSet) : 1
    const candidate = `set-${selectedSetId}-${pieceCount}`
    return isSetSourceId(candidate) ? candidate : NO_SET_SOURCE.id
  }, [selectedSetId, availableSets])

  const extractSetId = (setSourceId: SetSourceId): Slug => {
    const stripped = setSourceId.replace(/^set-/, "").replace(/-\d+$/, "")
    return isSetsAllId(stripped) ? stripped : selectedSetId
  }

  const handleSelect = (setSourceId: SetSourceId) => {
    const setId = extractSetId(setSourceId)
    onSelect(setId)
  }

  const config = useMemo(() => {
    const baseConfig = createSetSelectConfig(classFilteredSets)
    return {
      ...baseConfig,
      renderIcon: (item: SetSource) => {
        const originalSet = availableSets.find((set) => set.id === item.setId)

        if (!originalSet || !("icons" in originalSet) || !originalSet.icons) {
          return <Shield className="h-5 w-5" />
        }

        const firstSlot = [...typedPartialRecordKeys(originalSet.icons)].sort()[0]
        const iconPath =
          originalSet.icons["*"] ??
          originalSet.icons["weapon:*"] ??
          originalSet.icons["armor:*"] ??
          (firstSlot === undefined ? undefined : originalSet.icons[firstSlot])

        if (iconPath == null) {
          return <Shield className="h-5 w-5" />
        }

        const iconUrl = convertIconPathToUrl(iconPath)

        return <EquipmentIcon primarySrc={iconUrl} fallbackSrc={null} alt={item.name} size={40} />
      },
    }
  }, [classFilteredSets, availableSets])

  return (
    <FilterableSelectDialog<SetSource>
      open={open}
      onOpenChange={onOpenChange}
      selectedItemId={selectedSetSourceId}
      onSelect={handleSelect}
      defaultItem={NO_SET_SOURCE}
      config={config}
    />
  )
}
