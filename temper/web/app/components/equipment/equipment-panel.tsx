"use client"

import { ResponsiveColumns } from "@shared/design-layout/components/responsive-columns"
import { getEquippedMythicSetId } from "@temper/game-characters-equipment/loadout/mythic-set-rules"
import { useMemo } from "react"
import { ArmorPanelCard } from "@/components/equipment/armor-panel-card"
import type { EquipmentPanelProps } from "@/components/equipment/equipment-types"
import { JewelryPanelCard } from "@/components/equipment/jewelry-panel-card"
import { WeaponBarPanelCard } from "@/components/equipment/weapon-bar-panel-card"

export function EquipmentPanel({
  equipment,
  onUpdate,
  availableSets,
  playerClass,
  columnCount,
  readOnly,
}: EquipmentPanelProps) {
  const equippedMythicSetId = useMemo(
    () => getEquippedMythicSetId(equipment, availableSets),
    [equipment, availableSets]
  )

  return (
    <ResponsiveColumns columnCount={columnCount}>
      <WeaponBarPanelCard
        barId="primary-weapon-bar"
        barLabel="Primary Bar"
        equipment={equipment}
        onUpdate={onUpdate}
        availableSets={availableSets}
        equippedMythicSetId={equippedMythicSetId}
        playerClass={playerClass}
        readOnly={readOnly}
        collapseProtected
      />
      <WeaponBarPanelCard
        barId="backup-weapon-bar"
        barLabel="Backup Bar"
        equipment={equipment}
        onUpdate={onUpdate}
        availableSets={availableSets}
        equippedMythicSetId={equippedMythicSetId}
        playerClass={playerClass}
        readOnly={readOnly}
      />
      <JewelryPanelCard
        equipment={equipment}
        onUpdate={onUpdate}
        availableSets={availableSets}
        equippedMythicSetId={equippedMythicSetId}
        playerClass={playerClass}
        readOnly={readOnly}
      />
      <ArmorPanelCard
        equipment={equipment}
        onUpdate={onUpdate}
        availableSets={availableSets}
        equippedMythicSetId={equippedMythicSetId}
        playerClass={playerClass}
        readOnly={readOnly}
      />
    </ResponsiveColumns>
  )
}
