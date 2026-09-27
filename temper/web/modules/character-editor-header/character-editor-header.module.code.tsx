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
import { characterEditorHeaderBrowse } from "akasha/temper/web/phrase/pages/character-editor-header-browse.temper-web-phrase.ts"
import { characterEditorHeaderGoToLive } from "akasha/temper/web/phrase/pages/character-editor-header-go-to-live.temper-web-phrase.ts"
import { characterEditorHeaderGoToTarget } from "akasha/temper/web/phrase/pages/character-editor-header-go-to-target.temper-web-phrase.ts"
import { characterEditorHeaderLive } from "akasha/temper/web/phrase/pages/character-editor-header-live.temper-web-phrase.ts"
import { characterEditorHeaderNameRequired } from "akasha/temper/web/phrase/pages/character-editor-header-name-required.temper-web-phrase.ts"
import { characterEditorHeaderRemix } from "akasha/temper/web/phrase/pages/character-editor-header-remix.temper-web-phrase.ts"
import { characterEditorHeaderSetTarget } from "akasha/temper/web/phrase/pages/character-editor-header-set-target.temper-web-phrase.ts"
import { characterEditorHeaderTarget } from "akasha/temper/web/phrase/pages/character-editor-header-target.temper-web-phrase.ts"
import { characterEditorHeaderUntitled } from "akasha/temper/web/phrase/pages/character-editor-header-untitled.temper-web-phrase.ts"
import { characterEditorHeaderViewOnly } from "akasha/temper/web/phrase/pages/character-editor-header-view-only.temper-web-phrase.ts"
import { ChevronLeft, Copy, Eye, Search, Target } from "lucide-react"

interface CharacterEditorHeaderProps {
  name: string
  nameReadOnly: boolean
  visibility: BuildVisibility
  partnerBuildUrl: string | undefined
  isOwner: boolean
  readOnly: boolean
  browseHref: string | undefined
  isAuthenticated: boolean
  isSettingTarget: boolean
  onUpdateMeta: (updates: { name: string }) => void
  onSetTarget: () => void
  onRemix: () => void
  remixDisabled?: boolean
}

export function CharacterEditorHeader({
  name,
  nameReadOnly,
  visibility,
  partnerBuildUrl,
  isOwner,
  readOnly,
  browseHref,
  isAuthenticated,
  isSettingTarget,
  onUpdateMeta,
  onSetTarget,
  onRemix,
  remixDisabled,
}: CharacterEditorHeaderProps) {
  const phrase = usePhrase()
  const untitled = phrase(characterEditorHeaderUntitled.slug)
  const badgeText = phrase(
    visibility === "live" ? characterEditorHeaderLive.slug : characterEditorHeaderTarget.slug
  )
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-4">
        <Button variant="tertiary" size="icon-sm" asChild className="min-[584px]:hidden">
          <Link href="/character-build">
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
                v.trim().length === 0 ? phrase(characterEditorHeaderNameRequired.slug) : null
              }
              className={PAGE_TITLE_CLASSES}
            />
          )}
          {visibility === "live" || visibility === "target" ? (
            partnerBuildUrl != null ? (
              <Badge variant="elevation" className="shrink-0 cursor-pointer" asChild>
                <Link
                  href={partnerBuildUrl}
                  title={phrase(
                    visibility === "live"
                      ? characterEditorHeaderGoToTarget.slug
                      : characterEditorHeaderGoToLive.slug
                  )}
                >
                  {badgeText}
                </Link>
              </Badge>
            ) : (
              <Badge variant="elevation" className="shrink-0">
                {badgeText}
              </Badge>
            )
          ) : !isOwner ? (
            <Badge variant="elevation-muted" className="shrink-0 gap-1">
              <Eye className="h-3 w-3" />
              {phrase(characterEditorHeaderViewOnly.slug)}
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
                  {phrase(characterEditorHeaderBrowse.slug)}
                </span>
              </Link>
            </Button>
          )}
          {isAuthenticated && visibility !== "live" && visibility !== "target" && (
            <Button
              variant="secondary"
              size="sm"
              className={cn("gap-2", surfaceClass(1), isSettingTarget && "cursor-wait")}
              disabled={isSettingTarget}
              onClick={onSetTarget}
            >
              <Target className="h-4 w-4" />
              <span className="@[1016px]:inline hidden">
                {phrase(characterEditorHeaderSetTarget.slug)}
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
              {phrase(characterEditorHeaderRemix.slug)}
            </span>
          </Button>
        </div>
      ) : (
        <BuildActionButtons
          onRemix={onRemix}
          browseHref={browseHref}
          remixDisabled={remixDisabled}
          onSetTarget={isAuthenticated && visibility !== "target" ? onSetTarget : undefined}
        />
      )}
    </div>
  )
}
