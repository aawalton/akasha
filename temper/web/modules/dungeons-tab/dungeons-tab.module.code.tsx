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
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { dungeonsTabEasy } from "akasha/temper/web/phrase/pages/dungeons-tab-easy.temper-web-phrase.ts"
import { dungeonsTabHard } from "akasha/temper/web/phrase/pages/dungeons-tab-hard.temper-web-phrase.ts"
import { dungeonsTabImpossible } from "akasha/temper/web/phrase/pages/dungeons-tab-impossible.temper-web-phrase.ts"
import { dungeonsTabMedium } from "akasha/temper/web/phrase/pages/dungeons-tab-medium.temper-web-phrase.ts"

const DIFFICULTY_COLOR: Readonly<Record<SoloDifficulty, string>> = {
  easy: "text-jade",
  medium: "text-yellow",
  hard: "text-orange",
  impossible: "text-red",
}

const DIFFICULTY_PHRASE: Readonly<Record<SoloDifficulty, string>> = {
  easy: dungeonsTabEasy.slug,
  medium: dungeonsTabMedium.slug,
  hard: dungeonsTabHard.slug,
  impossible: dungeonsTabImpossible.slug,
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

interface DungeonListings {
  readonly givers: readonly Page[]
  readonly dungeons: readonly Page[]
  readonly isLoading: boolean
}

export function useDungeonListings(): DungeonListings {
  const givers = usePages({ pageTypeSlug: temperQuestGiver.slug })
  const dungeons = usePages({ pageTypeSlug: temperDungeon.slug })
  return {
    givers: givers.rows,
    dungeons: dungeons.rows,
    isLoading: givers.isLoading || dungeons.isLoading,
  }
}

interface DungeonsTabProps {
  readonly givers: readonly Page[]
  readonly dungeons: readonly Page[]
}

export function DungeonsTab({ givers, dungeons }: DungeonsTabProps) {
  const phrase = usePhrase()
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
                      {phrase(DIFFICULTY_PHRASE[difficulty])}
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
