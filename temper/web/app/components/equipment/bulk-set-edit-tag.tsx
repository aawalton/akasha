"use client"

import { Badge } from "@shared/design-badges/components/badge"
import type { ClassId } from "@temper/game-characters-classes/classes-data"
import { canClassEquipSet } from "@temper/game-characters-equipment/sets/class-restrictions"
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
import { useMemo, useState } from "react"
import { FilterableSelectDialog } from "@/components/ui/filterable-select-dialog"

interface BulkSetEditTagProps {
  currentValue: SetsAllId
  availableSets: readonly SetsAll[]
  onSelect: (oldValue: SetsAllId, newValue: SetsAllId) => void
  count: number
  slotType: "armor" | "jewelry" | "weapon"
  mythicSlot?: string | null
  playerClass?: ClassId | null
}

export function BulkSetEditTag({
  currentValue,
  availableSets,
  onSelect,
  count,
  slotType: _slotType,
  mythicSlot,
  playerClass,
}: BulkSetEditTagProps) {
  const [open, setOpen] = useState(false)
  const isNoSet = currentValue === "no-set"

  const selectedSet = useMemo(() => {
    if (isNoSet) return null
    return availableSets.find((s) => s.id === currentValue) || null
  }, [availableSets, currentValue, isNoSet])

  const displayValue = isNoSet ? "No Set" : (selectedSet?.name ?? currentValue)
  const isMythicSet = selectedSet?.subcategoryId === "mythic"

  const filteredSets = useMemo(() => {
    return availableSets.filter((set) => {
      if (set.subcategoryId === "none") {
        return false
      }

      if (playerClass != null && !canClassEquipSet(set, playerClass)) {
        return false
      }

      if (set.subcategoryId === "mythic") {
        if (isMythicSet && mythicSlot != null) {
          return true
        }
        return false
      }

      return true
    })
  }, [availableSets, isMythicSet, mythicSlot, playerClass])

  const config = useMemo(() => createSetSelectConfig(filteredSets), [filteredSets])

  const selectedSetSourceId = useMemo<SetSourceId>(() => {
    const pieceCount = selectedSet ? getMaxBonusPieceCount(selectedSet) : 1
    const candidate = `set-${currentValue}-${pieceCount}`
    return isSetSourceId(candidate) ? candidate : NO_SET_SOURCE.id
  }, [currentValue, selectedSet])

  const extractSetId = (setSourceId: SetSourceId): SetsAllId => {
    const stripped = setSourceId.replace(/^set-/, "").replace(/-\d+$/, "")
    return isSetsAllId(stripped) ? stripped : currentValue
  }

  const handleSelect = (setSourceId: SetSourceId) => {
    const setId = extractSetId(setSourceId)
    onSelect(currentValue, setId)
    setOpen(false)
  }

  return (
    <>
      <button
        type="button"
        className="cursor-pointer outline-none transition-[color,box-shadow] focus-visible:[outline-offset:-1px] focus-visible:[outline:1.5px_solid_var(--color-accent)]"
        onClick={() => setOpen(true)}
      >
        <Badge variant="elevation-muted">
          {displayValue}
          {count > 1 && <span>({count})</span>}
        </Badge>
      </button>
      <FilterableSelectDialog<SetSource>
        open={open}
        onOpenChange={setOpen}
        selectedItemId={selectedSetSourceId}
        onSelect={handleSelect}
        config={config}
        defaultItem={NO_SET_SOURCE}
      />
    </>
  )
}
