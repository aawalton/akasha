"use client"

import type { ClassId } from "@temper/game-characters-classes/classes-data"
import { canClassEquipSet } from "@temper/game-characters-equipment/sets/class-restrictions"
import { convertIconPathToUrl } from "@temper/game-characters-equipment/sets/get-equipment-icon"
import {
  createSetSelectConfig,
  getMaxBonusPieceCount,
  NO_SET_SOURCE,
} from "@temper/game-characters-equipment/sets/set-select-helpers"
import {
  isSetSourceId,
  type SetSource,
  type SetSourceId,
} from "@temper/game-characters-equipment/sets/set-source"
import {
  isSetsAllId,
  type SetsAll,
  type SetsAllId,
} from "@temper/game-characters-equipment/sets/sets-all-data"
import { EquipmentIcon } from "@temper/game-characters-equipment-ui/equipment-icon"
import { valuesOf } from "@temper/shared-formula-framework/object-utils"
import { Shield } from "lucide-react"
import { useMemo } from "react"
import { FilterableSelectDialog } from "@/components/ui/filterable-select-dialog"

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

        const iconPath =
          originalSet.icons["*"] ??
          originalSet.icons["weapon:*"] ??
          originalSet.icons["armor:*"] ??
          valuesOf(originalSet.icons)[0]

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
