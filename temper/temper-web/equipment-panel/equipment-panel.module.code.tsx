"use client"

import { ResponsiveColumns } from "@akasha/design-layout/responsive-columns"
import { getEquippedMythicSetId } from "@akasha/temper-characters-equipment/mythic-set-rules"
import { useMemo } from "react"
import { ArmorPanelCard } from "../armor-panel-card/armor-panel-card.module.code.tsx"
import type { EquipmentPanelProps } from "../equipment-types/equipment-types.module.code.ts"
import { JewelryPanelCard } from "../jewelry-panel-card/jewelry-panel-card.module.code.tsx"
import { WeaponBarPanelCard } from "../weapon-bar-panel-card/weapon-bar-panel-card.module.code.tsx"

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
