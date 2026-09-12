"use client"

import { Button } from "akasha/design/interfaces/primitives/modules/button/button.module.code.tsx"
import { cn } from "akasha/design/interfaces/primitives/modules/cn/cn.module.code.ts"
import { surfaceClass } from "akasha/design/interfaces/primitives/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interfaces/primitives/surface-provider/surface-provider.module.code.tsx"
import type { Skill } from "akasha/temper/character-skills/modules/character-skills/character-skills.module.code.ts"
import { SkillCollapsibleCard } from "akasha/temper/web/skill-collapsible-card/skill-collapsible-card.module.code.tsx"
import { Plus, X } from "lucide-react"

interface SkillSlotCardProps {
  skill: Skill | undefined
  onClick: () => void
  onClear: () => void
  slotLabel: string
  readOnly?: boolean
}

export function SkillSlotCard({
  skill,
  onClick,
  onClear,
  slotLabel,
  readOnly,
}: SkillSlotCardProps) {
  const surface = useSurface()
  if (!skill) {
    return (
      <div
        className={cn(
          "flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-primary/8",
          surfaceClass(surface + 1)
        )}
      >
        <button
          onClick={readOnly ? undefined : onClick}
          className={cn(
            "flex min-w-0 flex-1 items-center gap-3 text-left",
            !readOnly && "cursor-pointer"
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

        {!readOnly && (
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
        )}
      </div>
    )
  }

  return (
    <SkillCollapsibleCard
      skill={skill}
      renderAction={
        !readOnly
          ? () => (
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
          : undefined
      }
    />
  )
}
