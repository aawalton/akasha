"use client"

import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import { InlineEditableText } from "akasha/design/interface/form/modules/inline-editable-text/inline-editable-text.module.code.tsx"
import { PAGE_TITLE_CLASSES } from "akasha/design/interface/layout/modules/page-layout-data/page-layout-data.module.code.ts"
import { LayoutLink as Link } from "akasha/design/interface/layout/modules/router-context/router-context.module.code.tsx"
import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import type { BuildVisibility } from "akasha/temper/player/character/build/build-support/modules/build-visibility/build-visibility.module.code.ts"
import { BuildActionButtons } from "akasha/temper/web/modules/build-action-buttons/build-action-buttons.module.code.tsx"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { companionEditorHeaderBrowse } from "akasha/temper/web/phrase/pages/companion-editor-header-browse.temper-web-phrase.ts"
import { companionEditorHeaderGoToLive } from "akasha/temper/web/phrase/pages/companion-editor-header-go-to-live.temper-web-phrase.ts"
import { companionEditorHeaderGoToTarget } from "akasha/temper/web/phrase/pages/companion-editor-header-go-to-target.temper-web-phrase.ts"
import { companionEditorHeaderLive } from "akasha/temper/web/phrase/pages/companion-editor-header-live.temper-web-phrase.ts"
import { companionEditorHeaderNameRequired } from "akasha/temper/web/phrase/pages/companion-editor-header-name-required.temper-web-phrase.ts"
import { companionEditorHeaderRemix } from "akasha/temper/web/phrase/pages/companion-editor-header-remix.temper-web-phrase.ts"
import { companionEditorHeaderSetTarget } from "akasha/temper/web/phrase/pages/companion-editor-header-set-target.temper-web-phrase.ts"
import { companionEditorHeaderTarget } from "akasha/temper/web/phrase/pages/companion-editor-header-target.temper-web-phrase.ts"
import { companionEditorHeaderUntitledBuild } from "akasha/temper/web/phrase/pages/companion-editor-header-untitled-build.temper-web-phrase.ts"
import { companionEditorHeaderViewOnly } from "akasha/temper/web/phrase/pages/companion-editor-header-view-only.temper-web-phrase.ts"
import { ChevronLeft, Copy, Eye, Search, Target } from "lucide-react"

interface CompanionEditorHeaderProps {
  name: string
  nameReadOnly: boolean
  visibility: BuildVisibility
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
  const phrase = usePhrase()
  const untitled = phrase(companionEditorHeaderUntitledBuild.slug)
  const visibilityLabel =
    visibility === "live"
      ? phrase(companionEditorHeaderLive.slug)
      : phrase(companionEditorHeaderTarget.slug)
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-4">
        <Button variant="tertiary" size="icon-sm" asChild className="min-[584px]:hidden">
          <Link href="/companion-build">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex min-w-0 items-center gap-3">
          {nameReadOnly ? (
            <h1 className={cn(PAGE_TITLE_CLASSES, "truncate")}>{name !== "" ? name : untitled}</h1>
          ) : (
            <InlineEditableText
              value={name}
              onChange={(v) => onUpdateMeta({ name: v })}
              placeholder={untitled}
              validate={(v) =>
                v.trim().length === 0 ? phrase(companionEditorHeaderNameRequired.slug) : null
              }
              className={PAGE_TITLE_CLASSES}
            />
          )}
          {visibility === "live" || visibility === "target" ? (
            partnerBuildUrl != null ? (
              <Badge variant="elevation" className="shrink-0 cursor-pointer" asChild>
                <Link
                  href={partnerBuildUrl}
                  title={
                    visibility === "live"
                      ? phrase(companionEditorHeaderGoToTarget.slug)
                      : phrase(companionEditorHeaderGoToLive.slug)
                  }
                >
                  {visibilityLabel}
                </Link>
              </Badge>
            ) : (
              <Badge variant="elevation" className="shrink-0">
                {visibilityLabel}
              </Badge>
            )
          ) : !isOwner ? (
            <Badge variant="elevation-muted" className="shrink-0 gap-1">
              <Eye className="h-3 w-3" />
              {phrase(companionEditorHeaderViewOnly.slug)}
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
                <span className="@[1016px]:inline hidden">
                  {phrase(companionEditorHeaderBrowse.slug)}
                </span>
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
                <span className="@[1016px]:inline hidden">
                  {phrase(companionEditorHeaderSetTarget.slug)}
                </span>
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
            <span className="@[1016px]:inline hidden">
              {phrase(companionEditorHeaderRemix.slug)}
            </span>
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
