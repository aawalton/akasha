"use client"

import { Dialog, DialogBody, DialogContent, DialogTitle, DialogTrigger } from "@shared/design-primitives/components/dialog"
import { TableHead } from "@shared/design-primitives/components/table"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { cn } from "@shared/design-primitives/utils/cn"
import type { CompanionFormulaStats } from "@temper/game-companions-core/formulas/companion-skill-formula"
import type { SkillSlotData } from "@temper/game-companions-core/stats/companion-rotation-slot-data"
import { getEsoIconUrl } from "@temper/shared-formula-framework/icon-utils"
import { Plus } from "lucide-react"
import { useState } from "react"
import { CompanionSkillDetailContent } from "@/components/companion-skills/companion-skill-detail-content"
import { CompanionSkillSelectDialog } from "@/components/companion-skills/companion-skill-select-dialog"
import { useCompanion, useCompanionActions } from "@/components/companions/context/use-companion"

interface SkillColumnHeaderProps {
  data: SkillSlotData
  stats: CompanionFormulaStats
}

export function SkillColumnHeader({ data, stats }: SkillColumnHeaderProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const build = useCompanion()
  const { updateSkills } = useCompanionActions()
  const { skill, slotId } = data
  const isUltimate = slotId === "ultimate"

  if (!skill) {
    return (
      <TableHead>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setDialogOpen(true)}
            className={cn(
              "flex size-8 cursor-pointer items-center justify-center rounded transition-colors hover:bg-surface-4",
              surfaceClass(3)
            )}
          >
            <Plus className="h-3 w-3 text-tertiary" />
          </button>
        </div>
        <CompanionSkillSelectDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          title={isUltimate ? "Select Ultimate" : "Select Skill"}
          companionId={build.companion.id}
          isUltimate={isUltimate}
          stats={stats}
          equipment={build.equipment}
          selectedSkills={build.skills["skill-bar"]}
          editingSlotId={slotId}
          onSelect={(skillId) => {
            updateSkills({
              "skill-bar": {
                ...build.skills["skill-bar"],
                [slotId]: skillId,
              },
            })
          }}
        />
      </TableHead>
    )
  }

  const iconUrl = getEsoIconUrl(skill.icon)

  return (
    <TableHead>
      <Dialog>
        <DialogTrigger asChild>
          <button type="button" className="mx-auto flex cursor-pointer">
            {iconUrl != null ? (
              <img src={iconUrl} alt={skill.name} width={32} height={32} className="rounded" />
            ) : (
              <div
                className={cn("flex size-8 items-center justify-center rounded", surfaceClass(3))}
              >
                <Plus className="h-3 w-3 text-tertiary" />
              </div>
            )}
          </button>
        </DialogTrigger>
        <DialogContent className="w-auto max-w-none">
          <DialogTitle className="sr-only">{skill.name}</DialogTitle>
          <DialogBody>
            <CompanionSkillDetailContent skill={skill} stats={stats} />
          </DialogBody>
        </DialogContent>
      </Dialog>
    </TableHead>
  )
}
