"use client"

import { Button } from "@akasha/design-primitives/button"
import { cn } from "@akasha/design-primitives/cn"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import type { CompanionSkillTemplate } from "@akasha/temper-companions-core/companion-skill-activation-effect-types"
import type { CompanionFormulaStats } from "@akasha/temper-companions-core/companion-skill-formula"
import { Plus, X } from "lucide-react"
import { CompanionSkillCard } from "../companion-skill-card/companion-skill-card.module.code.tsx"

interface CompanionUltimateSlotCardProps {
  ultimate: CompanionSkillTemplate | undefined
  stats?: CompanionFormulaStats
  onEmptyClick: () => void
  onClear: () => void
  readOnly?: boolean
}

export function CompanionUltimateSlotCard({
  ultimate,
  stats,
  onEmptyClick,
  onClear,
  readOnly,
}: CompanionUltimateSlotCardProps) {
  const surface = useSurface()
  if (!ultimate) {
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
            <div className="truncate font-medium text-sm text-tertiary">Empty Ultimate</div>
          </div>
        </div>
      )
    }

    return (
      <div
        className={cn(
          "flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-primary/8",
          surfaceClass(surface + 1)
        )}
      >
        <button
          onClick={onEmptyClick}
          className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 text-left"
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
            <div className="truncate font-medium text-sm">Empty Ultimate</div>
            <div className="truncate text-secondary text-xs">Click to select an ultimate</div>
          </div>
        </button>
      </div>
    )
  }

  return (
    <CompanionSkillCard
      skill={ultimate}
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
                title="Clear ultimate"
                aria-label="Clear ultimate"
                type="button"
              >
                <X className="h-4 w-4 text-tertiary" />
              </Button>
            )
      }
    />
  )
}
