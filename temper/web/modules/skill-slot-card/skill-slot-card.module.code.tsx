"use client"

import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import type { Skill } from "akasha/temper/player/character/skill/modules/character-skills/character-skills.module.code.ts"
import { SkillCollapsibleCard } from "akasha/temper/web/modules/skill-collapsible-card/skill-collapsible-card.module.code.tsx"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { skillSlotCardClear } from "akasha/temper/web/phrase/pages/skill-slot-card-clear.temper-web-phrase.ts"
import { skillSlotCardClickToSelect } from "akasha/temper/web/phrase/pages/skill-slot-card-click-to-select.temper-web-phrase.ts"
import { skillSlotCardEmpty } from "akasha/temper/web/phrase/pages/skill-slot-card-empty.temper-web-phrase.ts"
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
  const phrase = usePhrase()
  const clearLabel = phrase(skillSlotCardClear.slug, { slot: slotLabel })
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
            <div className="truncate font-medium text-sm">{phrase(skillSlotCardEmpty.slug)}</div>
            <div className="line-clamp-2 text-secondary text-xs">
              {phrase(skillSlotCardClickToSelect.slug)}
            </div>
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
            title={clearLabel}
            aria-label={clearLabel}
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
                title={clearLabel}
                aria-label={clearLabel}
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
