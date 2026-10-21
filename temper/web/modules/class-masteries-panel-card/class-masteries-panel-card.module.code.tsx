"use client"

import { PanelCard } from "akasha/design/interface/layout/modules/panel-card/panel-card.module.code.tsx"
import { temperClass } from "akasha/temper/catalog/skill/temper-class/temper-class.page-type.ts"
import { skillCatalog } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.code.ts"
import { useKeyedTitles } from "akasha/temper/web/modules/use-keyed-titles/use-keyed-titles.module.code.tsx"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { classMasteriesPanelCardTitle } from "akasha/temper/web/phrase/pages/class-masteries-panel-card-title.temper-web-phrase.ts"

interface ClassMasteriesPanelCardProps {
  masteries: readonly string[]
}

export function ClassMasteriesPanelCard({ masteries }: ClassMasteriesPanelCardProps) {
  const phrase = usePhrase()
  const classTitles = useKeyedTitles(temperClass.slug)
  if (masteries.length === 0) return null
  const table = skillCatalog().classMasteries
  return (
    <PanelCard id="class-masteries" collapsible title={phrase(classMasteriesPanelCardTitle.slug)}>
      <div className="space-y-3 px-2 py-1">
        {masteries.map((id) => {
          const mastery = table.data[id]
          if (mastery === undefined) return null
          return (
            <div key={id} className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-sm">{mastery.name}</span>
                <span className="text-secondary text-xs">
                  {classTitles?.titles.get(mastery.classId) ?? ""}
                </span>
              </div>
              <p className="whitespace-pre-line text-secondary text-xs">{mastery.description}</p>
            </div>
          )
        })}
      </div>
    </PanelCard>
  )
}
