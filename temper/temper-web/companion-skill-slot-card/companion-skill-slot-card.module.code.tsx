"use client"

import { Button } from "@akasha/design-primitives/button"
import { cn } from "@akasha/design-primitives/cn"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import type { CompanionSkillTemplate } from "@akasha/temper-companions-core/companion-skill-activation-effect-types"
import type { CompanionFormulaStats } from "@akasha/temper-companions-core/companion-skill-formula"
import { Plus, X } from "lucide-react"
import { CompanionSkillCard } from "../companion-skill-card/companion-skill-card.module.code.tsx"

interface CompanionSkillSlotCardProps {
  skill: CompanionSkillTemplate | undefined
  stats?: CompanionFormulaStats
  onEmptyClick: () => void
  onClear: () => void
  slotLabel: string
  readOnly?: boolean
}

export function CompanionSkillSlotCard({
  skill,
  stats,
  onEmptyClick,
  onClear,
  slotLabel,
  readOnly,
}: CompanionSkillSlotCardProps) {
  const surface = useSurface()
  if (!skill) {
    if (readOnly) {
      return (
        <div
          className={cn("flex w-full items-center gap-3 rounded-lg p-3", surfaceClass(surface + 1))}
        >
          <div
            className={cn(
              "flex size-10 items-center justify-center overflow-hidden rounded",
              surfaceClass(3)
            )}
          >
            <Plus className="h-4 w-4 text-tertiary" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate font-medium text-sm text-tertiary">Empty Slot</div>
          </div>
        </div>
      )
    }

    return (
      <button
        onClick={onEmptyClick}
        className={cn(
          "flex w-full cursor-pointer items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-primary/8",
          surfaceClass(surface + 1)
        )}
        type="button"
      >
        <div
          className={cn(
            "flex size-10 items-center justify-center overflow-hidden rounded",
            surfaceClass(3)
          )}
        >
          <Plus className="h-4 w-4 text-tertiary" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="truncate font-medium text-sm">Empty Slot</div>
          <div className="line-clamp-2 text-secondary text-xs">Click to select a skill</div>
        </div>
      </button>
    )
  }

  return (
    <CompanionSkillCard
      skill={skill}
      stats={stats}
      renderAction={
        readOnly
          ? undefined
          : () => (
              <Button
                variant="tertiary"
                size="icon"
                className="h-9 w-9 shrink-0"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onClear()
                }}
                onPointerDown={(e) => e.stopPropagation()}
                title={`Clear slot ${slotLabel}`}
                aria-label={`Clear slot ${slotLabel}`}
                type="button"
              >
                <X className="h-4 w-4 text-tertiary" />
              </Button>
            )
      }
    />
  )
}
