"use client"

import { LayoutLink as Link } from "@shared/design-layout/router-context"
import { Badge } from "@shared/design-badges/components/badge"
import { InlineEditableText } from "@shared/design-forms/components/inline-editable-text"
import { Button } from "@shared/design-primitives/components/button"
import { PAGE_TITLE_CLASSES } from "@shared/design-layout/components/page-layout-data"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { cn } from "@shared/design-primitives/utils/cn"
import type { CompanionVisibility } from "@temper/game-companions-core/companion-types"
import { ChevronLeft, Copy, Eye, Search, Target } from "lucide-react"
import { BuildActionButtons } from "@/components/ui/build-action-buttons"

interface CompanionEditorHeaderProps {
  name: string
  nameReadOnly: boolean
  visibility: CompanionVisibility
  partnerBuildUrl: string | undefined
  isOwner: boolean
  readOnly: boolean
  browseHref: string | undefined
  isAuthenticated: boolean
  isSettingTarget: boolean
  hasSetTargetEntities: boolean
  onUpdateMeta: (updates: { name: string }) => void
  onSetTarget: () => void
  onRemix: () => void
  remixDisabled?: boolean
}

export function CompanionEditorHeader({
  name,
  nameReadOnly,
  visibility,
  partnerBuildUrl,
  isOwner,
  readOnly,
  browseHref,
  isAuthenticated,
  isSettingTarget,
  hasSetTargetEntities,
  onUpdateMeta,
  onSetTarget,
  onRemix,
  remixDisabled,
}: CompanionEditorHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-4">
        <Button variant="tertiary" size="icon-sm" asChild className="min-[584px]:hidden">
          <Link href="/companion-builds">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex min-w-0 items-center gap-3">
          {nameReadOnly ? (
            <h1 className={cn(PAGE_TITLE_CLASSES, "truncate")}>
              {name !== "" ? name : "Untitled Build"}
            </h1>
          ) : (
            <InlineEditableText
              value={name}
              onChange={(v) => onUpdateMeta({ name: v })}
              placeholder="Untitled Build"
              validate={(v) => (v.trim().length === 0 ? "Build name is required" : null)}
              className={PAGE_TITLE_CLASSES}
            />
          )}
          {visibility === "live" || visibility === "target" ? (
            partnerBuildUrl != null ? (
              <Badge variant="elevation" className="shrink-0 cursor-pointer" asChild>
                <Link
                  href={partnerBuildUrl}
                  title={visibility === "live" ? "Go to Target build" : "Go to Live build"}
                >
                  {visibility === "live" ? "Live" : "Target"}
                </Link>
              </Badge>
            ) : (
              <Badge variant="elevation" className="shrink-0">
                {visibility === "live" ? "Live" : "Target"}
              </Badge>
            )
          ) : !isOwner ? (
            <Badge variant="elevation-muted" className="shrink-0 gap-1">
              <Eye className="h-3 w-3" />
              View Only
            </Badge>
          ) : null}
        </div>
      </div>
      {readOnly ? (
        <div className="flex shrink-0 items-center gap-2">
          {browseHref != null && (
            <Button variant="secondary" size="sm" className={cn("gap-2", surfaceClass(1))} asChild>
              <Link href={browseHref}>
                <Search className="h-4 w-4" />
                <span className="@[1016px]:inline hidden">Browse</span>
              </Link>
            </Button>
          )}
          {isAuthenticated &&
            visibility !== "live" &&
            visibility !== "target" &&
            hasSetTargetEntities && (
              <Button
                variant="secondary"
                size="sm"
                className={cn("gap-2", surfaceClass(1), isSettingTarget && "cursor-wait")}
                disabled={isSettingTarget}
                onClick={onSetTarget}
              >
                <Target className="h-4 w-4" />
                <span className="@[1016px]:inline hidden">Set Target</span>
              </Button>
            )}
          <Button
            variant="secondary"
            size="sm"
            className={cn("gap-2", surfaceClass(1))}
            disabled={remixDisabled}
            onClick={onRemix}
          >
            <Copy className="h-4 w-4" />
            <span className="@[1016px]:inline hidden">Remix</span>
          </Button>
        </div>
      ) : (
        <BuildActionButtons
          onRemix={onRemix}
          browseHref={browseHref}
          remixDisabled={remixDisabled}
          onSetTarget={
            isAuthenticated && visibility !== "target" && hasSetTargetEntities
              ? onSetTarget
              : undefined
          }
        />
      )}
    </div>
  )
}
