"use client"

import { TabsContent } from "@akasha/design-patterns/tabs"
import { Text } from "@akasha/design-primitives/text-body"
import { Badge } from "akasha/design/badges/badge/badge.module.code.tsx"
import { PanelCard } from "akasha/design/layout/panel-card/panel-card.module.code.tsx"
import { ResponsiveColumns } from "akasha/design/layout/responsive-columns/responsive-columns.module.code.tsx"
import {
  TEMPER_DUNGEONS,
  TEMPER_QUEST_GIVERS,
} from "akasha/temper/dungeons/dungeon-data/dungeon-data.module.code.ts"
import { getSoloDifficulty } from "akasha/temper/dungeons/solo-difficulty/solo-difficulty.module.code.ts"

const DIFFICULTY_VARIANT = {
  easy: "elevation",
  medium: "elevation",
  hard: "elevation",
  impossible: "elevation",
} as const

const DIFFICULTY_COLOR = {
  easy: "text-jade",
  medium: "text-yellow",
  hard: "text-orange",
  impossible: "text-red",
} as const

const ROTATIONS_BY_GIVER = TEMPER_QUEST_GIVERS.map((giver) => ({
  giver,
  dungeons: TEMPER_DUNGEONS.filter((d) => d.questGiverId === giver.id)
    .slice()
    .sort((a, b) => (a.rotationPosition ?? 0) - (b.rotationPosition ?? 0)),
}))

export function DungeonsTab() {
  return (
    <TabsContent value="dungeons">
      <ResponsiveColumns>
        {ROTATIONS_BY_GIVER.map(({ giver, dungeons }) => (
          <PanelCard key={giver.name} id={`dungeons-${giver.name}`} title={giver.name}>
            <div className="flex flex-col gap-1.5">
              {dungeons.map((d) => {
                const difficulty = getSoloDifficulty(TEMPER_DUNGEONS, d.key)
                return (
                  <div key={d.key} className="flex items-center justify-between gap-2 px-4 py-1">
                    <Text as="span">{d.label}</Text>
                    <Badge
                      variant={DIFFICULTY_VARIANT[difficulty]}
                      className={DIFFICULTY_COLOR[difficulty]}
                    >
                      {difficulty}
                    </Badge>
                  </div>
                )
              })}
            </div>
          </PanelCard>
        ))}
      </ResponsiveColumns>
    </TabsContent>
  )
}
