"use client"

import { InputPanelCard } from "akasha/design/interface/pattern/modules/input-panel-card/input-panel-card.module.code.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "akasha/design/interface/primitive/modules/select-control/select-control.module.code.tsx"
import type { RaceId } from "akasha/temper/catalog/character-race/modules/races/races.module.code.ts"
import { classes } from "akasha/temper/modules/character-class/character-class.module.code.ts"
import { getRaceSourceById } from "akasha/temper/player/character/build/modules/race-source/race-source.module.code.ts"
import type { ClassId } from "akasha/temper/player/character/formula-framework/modules/class-id/class-id.module.code.ts"
import {
  type CurseState,
  curses,
} from "akasha/temper/player/character/source/modules/curses/curses.module.code.ts"
import {
  type VampireStageId,
  vampireStages,
} from "akasha/temper/player/character/source/modules/vampire-stages/vampire-stages.module.code.ts"
import { FilterableSelectTrigger } from "akasha/temper/web/modules/filterable-select-trigger/filterable-select-trigger.module.code.tsx"
import { RaceSelectDialog } from "akasha/temper/web/modules/race-select-dialog/race-select-dialog.module.code.tsx"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { identityPanelCardClass } from "akasha/temper/web/phrase/pages/identity-panel-card-class.temper-web-phrase.ts"
import { identityPanelCardCurse } from "akasha/temper/web/phrase/pages/identity-panel-card-curse.temper-web-phrase.ts"
import { identityPanelCardNoClass } from "akasha/temper/web/phrase/pages/identity-panel-card-no-class.temper-web-phrase.ts"
import { identityPanelCardNoRace } from "akasha/temper/web/phrase/pages/identity-panel-card-no-race.temper-web-phrase.ts"
import { identityPanelCardRace } from "akasha/temper/web/phrase/pages/identity-panel-card-race.temper-web-phrase.ts"
import { identityPanelCardSelectClass } from "akasha/temper/web/phrase/pages/identity-panel-card-select-class.temper-web-phrase.ts"
import { identityPanelCardTitle } from "akasha/temper/web/phrase/pages/identity-panel-card-title.temper-web-phrase.ts"
import { useState } from "react"

interface IdentityPanelCardProps {
  character: {
    class: ClassId
    race: RaceId
    curseState: CurseState
    vampireStage?: VampireStageId
  }
  onUpdate: (updates: Partial<IdentityPanelCardProps["character"]>) => void
  className?: string
  readOnly?: boolean
  collapseProtected?: boolean
}

export function IdentityPanelCard({
  character,
  onUpdate,
  className,
  readOnly,
  collapseProtected,
}: IdentityPanelCardProps) {
  const phrase = usePhrase()
  const [isRaceDialogOpen, setIsRaceDialogOpen] = useState(false)
  const selectedRace = getRaceSourceById(character.race)

  return (
    <>
      <InputPanelCard
        id="identity"
        collapsible={true}
        collapseProtected={collapseProtected}
        title={phrase(identityPanelCardTitle.slug)}
        className={className}
      >
        <InputPanelCard.Row label={phrase(identityPanelCardClass.slug)}>
          <Select<ClassId>
            value={character.class || "no-class"}
            onValueChange={(v) => onUpdate({ class: v })}
            disabled={readOnly}
          >
            <SelectTrigger className="w-full min-w-0 max-w-[240px]">
              <SelectValue placeholder={phrase(identityPanelCardSelectClass.slug)} />
            </SelectTrigger>
            <SelectContent
              nullSentinel={{ value: "no-class", label: phrase(identityPanelCardNoClass.slug) }}
            >
              {classes.list
                .filter((cls) => cls.id !== "no-class")
                .map((cls) => (
                  <SelectItem key={cls.id} value={cls.id}>
                    {cls.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </InputPanelCard.Row>

        <InputPanelCard.Row label={phrase(identityPanelCardRace.slug)}>
          <FilterableSelectTrigger
            onClick={() => setIsRaceDialogOpen(true)}
            className="w-full min-w-0 max-w-[240px]"
            disabled={readOnly}
          >
            <span className="truncate">
              {selectedRace?.name ?? phrase(identityPanelCardNoRace.slug)}
            </span>
          </FilterableSelectTrigger>
        </InputPanelCard.Row>

        <InputPanelCard.Row label={phrase(identityPanelCardCurse.slug)}>
          <div className="flex w-full min-w-0 max-w-[240px] items-center justify-end gap-2">
            <Select<CurseState>
              value={character.curseState}
              onValueChange={(v) =>
                onUpdate({
                  curseState: v,
                  vampireStage: v === "vampire" ? "stage-1" : "stage-0",
                })
              }
              disabled={readOnly}
            >
              <SelectTrigger
                className={
                  character.curseState === "vampire"
                    ? "w-full min-w-0 max-w-[116px]"
                    : "w-full min-w-0 max-w-[240px]"
                }
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {curses().list.map((curse) => (
                  <SelectItem key={curse.id} value={curse.id}>
                    {curse.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {character.curseState === "vampire" && (
              <Select<VampireStageId>
                value={character.vampireStage ?? "stage-1"}
                onValueChange={(v) => onUpdate({ vampireStage: v })}
                disabled={readOnly}
              >
                <SelectTrigger className="w-full min-w-0 max-w-[116px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {vampireStages()
                    .list.filter((stage) => stage.stage > 0)
                    .map((stage) => (
                      <SelectItem key={stage.id} value={stage.id}>
                        {stage.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </InputPanelCard.Row>
      </InputPanelCard>

      {!readOnly && (
        <RaceSelectDialog
          open={isRaceDialogOpen}
          onOpenChange={setIsRaceDialogOpen}
          selectedRaceId={character.race || "no-race"}
          onSelect={(raceId) => onUpdate({ race: raceId })}
        />
      )}
    </>
  )
}
