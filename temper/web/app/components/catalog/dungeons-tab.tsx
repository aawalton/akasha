"use client"

import { Badge } from "@shared/design-badges/components/badge"
import { PanelCard } from "@shared/design-layout/components/panel-card"
import { ResponsiveColumns } from "@shared/design-layout/components/responsive-columns"
import { Text } from "@shared/design-primitives/components/text"
import { TabsContent } from "@shared/design-patterns/components/tabs"
import { TEMPER_DUNGEONS, TEMPER_QUEST_GIVERS } from "@temper/shared-foundation-misc-dungeons/generated/temper-dungeons.generated"
import { getSoloDifficulty } from "@temper/shared-foundation-misc-dungeons/solo-difficulty"

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
