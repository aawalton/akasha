"use client"

import { ResponsiveColumns } from "akasha/design/interfaces/layout/responsive-columns/responsive-columns.module.code.tsx"
import { getEquippedMythicSetId } from "akasha/temper/characters-equipment/mythic-set-rules/mythic-set-rules.module.code.ts"
import { ArmorPanelCard } from "akasha/temper/web/armor-panel-card/armor-panel-card.module.code.tsx"
import type { EquipmentPanelProps } from "akasha/temper/web/equipment-types/equipment-types.module.code.ts"
import { JewelryPanelCard } from "akasha/temper/web/jewelry-panel-card/jewelry-panel-card.module.code.tsx"
import { WeaponBarPanelCard } from "akasha/temper/web/weapon-bar-panel-card/weapon-bar-panel-card.module.code.tsx"
import { useMemo } from "react"

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
