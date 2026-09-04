"use client"

import { ResponsiveColumns } from "@akasha/design-layout/responsive-columns"
import type { ChampionPointId } from "@akasha/temper-champion-points/champion-point-source"
import type { CharacterState } from "@akasha/temper-character-build/build-types"
import { ConstellationPanelCard } from "../constellation-panel-card/constellation-panel-card.module.code.tsx"

interface ChampionPointsPanelProps {
  championPoints: CharacterState["championPoints"]
  onUpdate: (updates: Partial<CharacterState["championPoints"]>) => void
  columnCount: 1 | 2
  readOnly?: boolean
}

export function ChampionPointsPanel({
  championPoints,
  onUpdate,
  columnCount,
  readOnly,
}: ChampionPointsPanelProps) {
  const handleUpdateConstellation = (
    constellation: "warfare" | "fitness" | "craft",
    slottedStars: readonly ChampionPointId[]
  ) => {
    onUpdate({
      [constellation]: {
        ...championPoints[constellation],
        slotted: slottedStars,
      },
    })
  }

  return (
    <ResponsiveColumns columnCount={columnCount}>
      <ConstellationPanelCard
        constellation="warfare"
        slottedStars={[...championPoints.warfare.slotted]}
        onUpdate={(slotted) => handleUpdateConstellation("warfare", slotted)}
        readOnly={readOnly}
        collapseProtected
      />
      <ConstellationPanelCard
        constellation="fitness"
        slottedStars={[...championPoints.fitness.slotted]}
        onUpdate={(slotted) => handleUpdateConstellation("fitness", slotted)}
        readOnly={readOnly}
      />
      <ConstellationPanelCard
        constellation="craft"
        slottedStars={[...championPoints.craft.slotted]}
        onUpdate={(slotted) => handleUpdateConstellation("craft", slotted)}
        readOnly={readOnly}
      />
    </ResponsiveColumns>
  )
}
