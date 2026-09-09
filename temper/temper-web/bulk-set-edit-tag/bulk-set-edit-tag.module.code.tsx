"use client"

import { Badge } from "akasha/design/badges/badge/badge.module.code.tsx"
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
import { useMemo, useState } from "react"
import type { ClassId } from "../../formula-framework/class-id/class-id.module.code.ts"
import { FilterableSelectDialog } from "../filterable-select-dialog/filterable-select-dialog.module.code.tsx"

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
