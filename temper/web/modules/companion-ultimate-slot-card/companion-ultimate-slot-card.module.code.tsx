"use client"

import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import type { CompanionSkillTemplate } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-activation-effect-types/companion-skill-activation-effect-types.module.code.ts"
import type { CompanionFormulaStats } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-formula/companion-skill-formula.module.code.ts"
import { CompanionSkillCard } from "akasha/temper/web/modules/companion-skill-card/companion-skill-card.module.code.tsx"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { companionUltimateSlotCardClear } from "akasha/temper/web/phrase/pages/companion-ultimate-slot-card-clear.temper-web-phrase.ts"
import { companionUltimateSlotCardClickToSelect } from "akasha/temper/web/phrase/pages/companion-ultimate-slot-card-click-to-select.temper-web-phrase.ts"
import { companionUltimateSlotCardEmpty } from "akasha/temper/web/phrase/pages/companion-ultimate-slot-card-empty.temper-web-phrase.ts"
import { Plus, X } from "lucide-react"

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
  const phrase = usePhrase()
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
            <div className="truncate font-medium text-sm text-tertiary">
              {phrase(companionUltimateSlotCardEmpty.slug)}
            </div>
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
            <div className="truncate font-medium text-sm">
              {phrase(companionUltimateSlotCardEmpty.slug)}
            </div>
            <div className="truncate text-secondary text-xs">
              {phrase(companionUltimateSlotCardClickToSelect.slug)}
            </div>
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
                title={phrase(companionUltimateSlotCardClear.slug)}
                aria-label={phrase(companionUltimateSlotCardClear.slug)}
                type="button"
              >
                <X className="h-4 w-4 text-tertiary" />
              </Button>
            )
      }
    />
  )
}
