"use client"

import { Button } from "@shared/design-primitives/components/button"
import { useSurface } from "@shared/design-primitives/components/surface-provider"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { cn } from "@shared/design-primitives/utils/cn"
import { getSkillLineName } from "@temper/game-characters-skills/skill-line-queries"
import type { Skill } from "@temper/game-characters-skills/skills-data"
import { getEsoIconUrl } from "@temper/shared-formula-framework/icon-utils"
import { Plus, X } from "lucide-react"

interface UltimateSlotCardProps {
  ultimate: Skill | undefined
  onClick: () => void
  onClear: () => void
  readOnly?: boolean
}

export function UltimateSlotCard({ ultimate, onClick, onClear, readOnly }: UltimateSlotCardProps) {
  const surface = useSurface()
  const iconUrl = ultimate ? getEsoIconUrl(ultimate.icon) : null

  return (
    <div
      className={cn(
        "flex w-full items-center gap-3 rounded-md p-3 text-left transition-colors hover:bg-primary/8",
        surfaceClass(surface + 1)
      )}
    >
      <button
        onClick={readOnly ? undefined : onClick}
        className={cn(
          "flex min-w-0 flex-1 items-center gap-3 text-left",
          !readOnly && "cursor-pointer"
        )}
        title={ultimate?.name}
        type="button"
      >
        <div
          className={cn(
            "flex size-10 items-center justify-center overflow-hidden rounded",
            surfaceClass(3)
          )}
        >
          {iconUrl != null ? (
            <img
              src={iconUrl !== "" ? iconUrl : "/placeholder.svg"}
              alt={ultimate?.name ?? "Ultimate"}
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          ) : (
            <Plus className="h-4 w-4 text-tertiary" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="truncate font-medium text-sm">
            {ultimate ? ultimate.name : "Empty Ultimate"}
          </div>
          <div className="truncate text-secondary text-xs">
            {ultimate ? getSkillLineName(ultimate.skillLineId) : "Click to select an ultimate"}
          </div>
        </div>
      </button>

      {ultimate && !readOnly ? (
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
      ) : null}
    </div>
  )
}
