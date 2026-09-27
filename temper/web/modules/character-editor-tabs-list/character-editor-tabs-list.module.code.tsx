"use client"

import {
  PageTabsTrigger,
  TabsList,
} from "akasha/design/interface/pattern/modules/tabs/tabs.module.code.tsx"
import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { characterEditorTabsListChampion } from "akasha/temper/web/phrase/pages/character-editor-tabs-list-champion.temper-web-phrase.ts"
import { characterEditorTabsListCharacter } from "akasha/temper/web/phrase/pages/character-editor-tabs-list-character.temper-web-phrase.ts"
import { characterEditorTabsListEquipment } from "akasha/temper/web/phrase/pages/character-editor-tabs-list-equipment.temper-web-phrase.ts"
import { characterEditorTabsListGeneral } from "akasha/temper/web/phrase/pages/character-editor-tabs-list-general.temper-web-phrase.ts"
import { characterEditorTabsListSkills } from "akasha/temper/web/phrase/pages/character-editor-tabs-list-skills.temper-web-phrase.ts"
import { characterEditorTabsListStats } from "akasha/temper/web/phrase/pages/character-editor-tabs-list-stats.temper-web-phrase.ts"
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
        label={phrase(characterEditorTabsListGeneral.slug)}
      />
      <PageTabsTrigger
        value="character"
        icon={<User />}
        label={phrase(characterEditorTabsListCharacter.slug)}
      />
      <PageTabsTrigger
        value="equipment"
        icon={<ShieldHalf />}
        label={phrase(characterEditorTabsListEquipment.slug)}
      />
      <PageTabsTrigger
        value="skills"
        icon={<Swords />}
        label={phrase(characterEditorTabsListSkills.slug)}
      />
      <PageTabsTrigger
        value="champion"
        icon={<Star />}
        label={phrase(characterEditorTabsListChampion.slug)}
      />
      <PageTabsTrigger
        value="stats"
        icon={<BarChart3 />}
        label={phrase(characterEditorTabsListStats.slug)}
        className={cols >= 2 ? "hidden" : undefined}
      />
    </TabsList>
  )
}
