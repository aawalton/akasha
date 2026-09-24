"use client"

import { stringIn } from "akasha/code/type/narrowing/modules/string-in/string-in.module.code.ts"
import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import { PanelCard } from "akasha/design/interface/layout/modules/panel-card/panel-card.module.code.tsx"
import { ResponsiveColumns } from "akasha/design/interface/layout/modules/responsive-columns/responsive-columns.module.code.tsx"
import { TabsContent } from "akasha/design/interface/pattern/modules/tabs/tabs.module.code.tsx"
import { Text } from "akasha/design/interface/primitive/modules/text-body/text-body.module.code.tsx"
import type { Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { usePages } from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import type { SoloDifficulty } from "akasha/temper/catalog/world/group-dungeon/modules/solo-difficulty/solo-difficulty.module.code.ts"
import { temperDungeon } from "akasha/temper/catalog/world/temper-dungeon/temper-dungeon.page-type.ts"
import { temperQuestGiver } from "akasha/temper/catalog/world/temper-quest-giver/temper-quest-giver.page-type.ts"

const DIFFICULTY_COLOR: Readonly<Record<SoloDifficulty, string>> = {
  easy: "text-jade",
  medium: "text-yellow",
  hard: "text-orange",
  impossible: "text-red",
}

const DIFFICULTIES: readonly SoloDifficulty[] = ["easy", "medium", "hard", "impossible"]

const UNSURE: SoloDifficulty = "hard"

function difficultyOf(dungeon: Page): SoloDifficulty {
  const said = stringIn(dungeon.soloDifficulty)
  return DIFFICULTIES.find((one) => one === said) ?? UNSURE
}

function positionOf(dungeon: Page): number {
  return typeof dungeon.rotationPosition === "number" ? dungeon.rotationPosition : 0
}

function givenBy(giver: Page, dungeons: readonly Page[]): Page[] {
  const address = namedAs(temperQuestGiver.slug, giver.slug ?? "", null)
  return dungeons
    .filter((one) => one.questGiver === address || one.questGiver === giver.id)
    .sort((one, other) => positionOf(one) - positionOf(other))
}

function oldestFirst(one: Page, other: Page): number {
  return one.id < other.id ? -1 : 1
}

export function DungeonsTab() {
  const givers = usePages({ pageTypeSlug: temperQuestGiver.slug }).rows
  const dungeons = usePages({ pageTypeSlug: temperDungeon.slug }).rows
  return (
    <TabsContent value="dungeons">
      <ResponsiveColumns>
        {[...givers].sort(oldestFirst).map((giver) => (
          <PanelCard key={giver.id} id={`dungeons-${giver.title}`} title={giver.title ?? ""}>
            <div className="flex flex-col gap-1.5">
              {givenBy(giver, dungeons).map((dungeon) => {
                const difficulty = difficultyOf(dungeon)
                return (
                  <div
                    key={dungeon.id}
                    className="flex items-center justify-between gap-2 px-4 py-1"
                  >
                    <Text as="span">{dungeon.title}</Text>
                    <Badge variant="elevation" className={DIFFICULTY_COLOR[difficulty]}>
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
