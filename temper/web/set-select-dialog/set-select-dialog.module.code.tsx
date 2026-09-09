"use client"

import { EquipmentIcon } from "akasha/temper/characters-equipment-ui/equipment-icon/equipment-icon.module.code.tsx"
import { convertIconPathToUrl } from "akasha/temper/temper-characters-equipment/get-equipment-icon/get-equipment-icon.module.code.ts"
import { canClassEquipSet } from "akasha/temper/temper-characters-equipment/set-class-restrictions/set-class-restrictions.module.code.ts"
import {
  createSetSelectConfig,
  getMaxBonusPieceCount,
  NO_SET_SOURCE,
} from "akasha/temper/temper-characters-equipment/set-select-helpers/set-select-helpers.module.code.ts"
import {
  isSetSourceId,
  type SetSource,
  type SetSourceId,
} from "akasha/temper/temper-characters-equipment/set-source/set-source.module.code.ts"
import { isSetsAllId } from "akasha/temper/temper-characters-equipment/sets-all/sets-all.module.code.ts"
import type { SetId as SetsAllId } from "akasha/temper/temper-equipment/set-ids/set-ids.module.code.ts"
import type { SetTemplate as SetsAll } from "akasha/temper/temper-equipment/set-template/set-template.module.code.ts"
import { Shield } from "lucide-react"
import { useMemo } from "react"
import type { ClassId } from "../../formula-framework/class-id/class-id.module.code.ts"
import { typedPartialRecordKeys } from "../../formula-framework/record-parts/record-parts.module.code.ts"
import { FilterableSelectDialog } from "../filterable-select-dialog/filterable-select-dialog.module.code.tsx"

interface SetSelectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedSetId: SetsAllId
  onSelect: (setId: SetsAllId) => void
  availableSets: readonly SetsAll[]
  playerClass?: ClassId | null
  equippedMythicSetId?: string | null
}

export function getSetById(id: SetsAllId, sets: readonly SetsAll[]): SetsAll | undefined {
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

  const extractSetId = (setSourceId: SetSourceId): SetsAllId => {
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
