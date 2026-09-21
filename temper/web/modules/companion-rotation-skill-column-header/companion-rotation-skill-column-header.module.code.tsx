"use client"

import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "akasha/design/interface/primitive/modules/dialog/dialog.module.code.tsx"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { TableHead } from "akasha/design/interface/primitive/modules/table/table.module.code.tsx"
import type { SkillSlotData } from "akasha/temper/catalog/companion/companions-core/modules/companion-rotation-slot/companion-rotation-slot.module.code.ts"
import type { CompanionFormulaStats } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-formula/companion-skill-formula.module.code.ts"
import { getEsoIconUrl } from "akasha/temper/player/character/formula-framework/modules/eso-icon-url/eso-icon-url.module.code.ts"
import { CompanionSkillDetailContent } from "akasha/temper/web/modules/companion-skill-detail-content/companion-skill-detail-content.module.code.tsx"
import { CompanionSkillSelectDialog } from "akasha/temper/web/modules/companion-skill-select-dialog/companion-skill-select-dialog.module.code.tsx"
import {
  useCompanion,
  useCompanionActions,
} from "akasha/temper/web/modules/use-companion/use-companion.module.code.ts"
import { Plus } from "lucide-react"
import { useState } from "react"

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
