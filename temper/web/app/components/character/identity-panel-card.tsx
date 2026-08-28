"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/design-primitives/components/select"
import { type CurseState, curses } from "@temper/game-characters-character/curse-data"
import { getRaceSourceById } from "@temper/game-characters-character/race-source"
import {
  type VampireStageId,
  vampireStages,
} from "@temper/game-characters-character/vampire-stages-data"
import { type ClassId, classes } from "@temper/game-characters-classes/classes-data"
import type { RaceId } from "@temper/game-characters-races/races"
import { useState } from "react"
import { RaceSelectDialog } from "@/components/character/race-select-dialog"
import { FilterableSelectTrigger } from "@/components/ui/filterable-select-dialog"
import { InputPanelCard } from "@shared/design-patterns/components/input-panel-card"

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
  const [isRaceDialogOpen, setIsRaceDialogOpen] = useState(false)
  const selectedRace = getRaceSourceById(character.race)

  return (
    <>
      <InputPanelCard
        id="identity"
        collapsible={true}
        collapseProtected={collapseProtected}
        title="Identity"
        className={className}
      >
        <InputPanelCard.Row label="Class">
          <Select<ClassId>
            value={character.class || "no-class"}
            onValueChange={(v) => onUpdate({ class: v })}
            disabled={readOnly}
          >
            <SelectTrigger className="w-full min-w-0 max-w-[240px]">
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent nullSentinel={{ value: "no-class", label: "No Class" }}>
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

        <InputPanelCard.Row label="Race">
          <FilterableSelectTrigger
            onClick={() => setIsRaceDialogOpen(true)}
            className="w-full min-w-0 max-w-[240px]"
            disabled={readOnly}
          >
            <span className="truncate">{selectedRace?.name ?? "No Race"}</span>
          </FilterableSelectTrigger>
        </InputPanelCard.Row>

        <InputPanelCard.Row label="Curse">
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
                {curses.list.map((curse) => (
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
                  {vampireStages.list
                    .filter((stage) => stage.stage > 0)
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
