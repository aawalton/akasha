"use client"

import {
  PageTabsTrigger,
  TabsList,
} from "akasha/design/interface/pattern/modules/tabs/tabs.module.code.tsx"
import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { editorTabLabelsChampion } from "akasha/temper/web/phrase/pages/editor-tab-labels-champion.temper-web-phrase.ts"
import { editorTabLabelsCharacter } from "akasha/temper/web/phrase/pages/editor-tab-labels-character.temper-web-phrase.ts"
import { editorTabLabelsEquipment } from "akasha/temper/web/phrase/pages/editor-tab-labels-equipment.temper-web-phrase.ts"
import { editorTabLabelsGeneral } from "akasha/temper/web/phrase/pages/editor-tab-labels-general.temper-web-phrase.ts"
import { editorTabLabelsSkills } from "akasha/temper/web/phrase/pages/editor-tab-labels-skills.temper-web-phrase.ts"
import { editorTabLabelsStats } from "akasha/temper/web/phrase/pages/editor-tab-labels-stats.temper-web-phrase.ts"
import { BarChart3, Info, ShieldHalf, Star, Swords, User } from "lucide-react"

interface CharacterEditorTabsListProps {
  cols: number
}

export function CharacterEditorTabsList({ cols }: CharacterEditorTabsListProps) {
  const phrase = usePhrase()
  return (
    <TabsList
      className={cn(
        "grid h-18 w-full rounded-none min-[584px]:flex min-[584px]:h-9 min-[584px]:rounded-lg",
        cols >= 2 ? "grid-cols-5" : "grid-cols-6"
      )}
    >
      <PageTabsTrigger
        value="general"
        icon={<Info />}
        label={phrase(editorTabLabelsGeneral.slug)}
      />
      <PageTabsTrigger
        value="character"
        icon={<User />}
        label={phrase(editorTabLabelsCharacter.slug)}
      />
      <PageTabsTrigger
        value="equipment"
        icon={<ShieldHalf />}
        label={phrase(editorTabLabelsEquipment.slug)}
      />
      <PageTabsTrigger
        value="skills"
        icon={<Swords />}
        label={phrase(editorTabLabelsSkills.slug)}
      />
      <PageTabsTrigger
        value="champion"
        icon={<Star />}
        label={phrase(editorTabLabelsChampion.slug)}
      />
      <PageTabsTrigger
        value="stats"
        icon={<BarChart3 />}
        label={phrase(editorTabLabelsStats.slug)}
        className={cols >= 2 ? "hidden" : undefined}
      />
    </TabsList>
  )
}
