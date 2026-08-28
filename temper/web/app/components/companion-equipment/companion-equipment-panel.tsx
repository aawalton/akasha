"use client"

import { ResponsiveColumns } from "@shared/design-layout/components/responsive-columns"
import { CompanionArmorPanelCard } from "@/components/companion-equipment/companion-armor-panel-card"
import { CompanionJewelryPanelCard } from "@/components/companion-equipment/companion-jewelry-panel-card"
import { CompanionWeaponBarPanelCard } from "@/components/companion-equipment/companion-weapon-bar-panel-card"
import type { CompanionEquipmentPanelProps } from "./companion-equipment-panel-types"

interface Props extends CompanionEquipmentPanelProps {
  columnCount: 1 | 2
}

export function CompanionEquipmentPanel({ equipment, onUpdate, readOnly, columnCount }: Props) {
  return (
    <ResponsiveColumns columnCount={columnCount}>
      <CompanionWeaponBarPanelCard equipment={equipment} onUpdate={onUpdate} readOnly={readOnly} />
      <CompanionJewelryPanelCard equipment={equipment} onUpdate={onUpdate} readOnly={readOnly} />
      <CompanionArmorPanelCard equipment={equipment} onUpdate={onUpdate} readOnly={readOnly} />
    </ResponsiveColumns>
  )
}
