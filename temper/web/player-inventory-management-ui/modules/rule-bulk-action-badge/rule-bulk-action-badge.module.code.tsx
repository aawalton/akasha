"use client"

import type { badgeVariants } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import { ButtonBadge } from "akasha/design/interface/badge/modules/button-badge/button-badge.module.code.tsx"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "akasha/design/interface/primitive/modules/alert-dialog/alert-dialog.module.code.tsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "akasha/design/interface/primitive/modules/dropdown-menu/dropdown-menu.module.code.tsx"
import { ScrollArea } from "akasha/design/interface/primitive/modules/scroll-area/scroll-area.module.code.tsx"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { ruleBulkActionBadgeCancel } from "akasha/temper/web/phrase/pages/rule-bulk-action-badge-cancel.temper-web-phrase.ts"
import { ruleBulkActionBadgeDelete } from "akasha/temper/web/phrase/pages/rule-bulk-action-badge-delete.temper-web-phrase.ts"
import { ruleBulkActionBadgeDeleteBodyMany } from "akasha/temper/web/phrase/pages/rule-bulk-action-badge-delete-body-many.temper-web-phrase.ts"
import { ruleBulkActionBadgeDeleteBodyOne } from "akasha/temper/web/phrase/pages/rule-bulk-action-badge-delete-body-one.temper-web-phrase.ts"
import { ruleBulkActionBadgeDeleteRule } from "akasha/temper/web/phrase/pages/rule-bulk-action-badge-delete-rule.temper-web-phrase.ts"
import { ruleBulkActionBadgeDeleteRules } from "akasha/temper/web/phrase/pages/rule-bulk-action-badge-delete-rules.temper-web-phrase.ts"
import { ruleBulkActionBadgeDeleteTitleMany } from "akasha/temper/web/phrase/pages/rule-bulk-action-badge-delete-title-many.temper-web-phrase.ts"
import { ruleBulkActionBadgeDeleteTitleOne } from "akasha/temper/web/phrase/pages/rule-bulk-action-badge-delete-title-one.temper-web-phrase.ts"
import { ruleBulkActionBadgeLock } from "akasha/temper/web/phrase/pages/rule-bulk-action-badge-lock.temper-web-phrase.ts"
import { ruleBulkActionBadgeSetActive } from "akasha/temper/web/phrase/pages/rule-bulk-action-badge-set-active.temper-web-phrase.ts"
import { ruleBulkActionBadgeSetInactive } from "akasha/temper/web/phrase/pages/rule-bulk-action-badge-set-inactive.temper-web-phrase.ts"
import { ruleBulkActionBadgeShow } from "akasha/temper/web/phrase/pages/rule-bulk-action-badge-show.temper-web-phrase.ts"
import { ruleBulkActionBadgeUnlock } from "akasha/temper/web/phrase/pages/rule-bulk-action-badge-unlock.temper-web-phrase.ts"
import type { VariantProps } from "class-variance-authority"
import { useState } from "react"

type BadgeVariant = VariantProps<typeof badgeVariants>["variant"]

interface RuleBulkActionBadgeProps {
  label: string
  count: number
  variant: BadgeVariant
  ruleDescriptions?: readonly string[]
  onShow?: () => void
  onSetActive?: () => void
  onSetInactive?: () => void
  onLock?: () => void
  onUnlock?: () => void
  onDelete?: () => void
}

export function RuleBulkActionBadge({
  label,
  count,
  variant,
  ruleDescriptions,
  onShow,
  onSetActive,
  onSetInactive,
  onLock,
  onUnlock,
  onDelete,
}: RuleBulkActionBadgeProps) {
  const surface = useSurface()
  const phrase = usePhrase()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const one = count === 1
  const deleteFills = { count, status: label.toLowerCase() }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <ButtonBadge variant={variant} onClick={(e) => e.stopPropagation()}>
            {count} {label}
          </ButtonBadge>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {onShow && (
            <DropdownMenuItem onClick={onShow}>
              {phrase(ruleBulkActionBadgeShow.slug)}
            </DropdownMenuItem>
          )}
          {onShow && (onSetActive || onSetInactive || onLock || onUnlock || onDelete) && (
            <DropdownMenuSeparator />
          )}
          {onSetActive && (
            <DropdownMenuItem onClick={onSetActive}>
              {phrase(ruleBulkActionBadgeSetActive.slug)}
            </DropdownMenuItem>
          )}
          {onSetInactive && (
            <DropdownMenuItem onClick={onSetInactive}>
              {phrase(ruleBulkActionBadgeSetInactive.slug)}
            </DropdownMenuItem>
          )}
          {onLock && (
            <DropdownMenuItem onClick={onLock}>
              {phrase(ruleBulkActionBadgeLock.slug)}
            </DropdownMenuItem>
          )}
          {onUnlock && (
            <DropdownMenuItem onClick={onUnlock}>
              {phrase(ruleBulkActionBadgeUnlock.slug)}
            </DropdownMenuItem>
          )}
          {onDelete && (
            <DropdownMenuItem variant="destructive" onClick={() => setShowDeleteDialog(true)}>
              {phrase(ruleBulkActionBadgeDelete.slug)}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {onDelete && (
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {phrase(
                  one
                    ? ruleBulkActionBadgeDeleteTitleOne.slug
                    : ruleBulkActionBadgeDeleteTitleMany.slug,
                  { count, status: label }
                )}
              </AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div className="space-y-3 text-secondary text-sm">
                  <div>
                    {phrase(
                      one
                        ? ruleBulkActionBadgeDeleteBodyOne.slug
                        : ruleBulkActionBadgeDeleteBodyMany.slug,
                      deleteFills
                    )}
                  </div>
                  {ruleDescriptions && ruleDescriptions.length > 0 && (
                    <ScrollArea className="max-h-[20vh]">
                      <div
                        className={`flex flex-col gap-0.5 rounded-md ${surfaceClass(surface + 1)} px-3 py-2`}
                      >
                        {ruleDescriptions.map((desc, i) => (
                          <span key={`${i}-${desc}`} className="text-primary text-sm">
                            {desc}
                          </span>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction variant="destructive" onClick={onDelete}>
                {phrase(
                  one ? ruleBulkActionBadgeDeleteRule.slug : ruleBulkActionBadgeDeleteRules.slug
                )}
              </AlertDialogAction>
              <AlertDialogCancel>{phrase(ruleBulkActionBadgeCancel.slug)}</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  )
}
