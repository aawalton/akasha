"use client"

import type { badgeVariants } from "akasha/design/interfaces/badges/badge/badge.module.code.tsx"
import { ButtonBadge } from "akasha/design/interfaces/badges/button-badge/button-badge.module.code.tsx"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "akasha/design/interfaces/primitives/alert-dialog/alert-dialog.module.code.tsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "akasha/design/interfaces/primitives/dropdown-menu/dropdown-menu.module.code.tsx"
import { ScrollArea } from "akasha/design/interfaces/primitives/scroll-area/scroll-area.module.code.tsx"
import { surfaceClass } from "akasha/design/interfaces/primitives/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interfaces/primitives/surface-provider/surface-provider.module.code.tsx"
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
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <ButtonBadge variant={variant} onClick={(e) => e.stopPropagation()}>
            {count} {label}
          </ButtonBadge>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {onShow && <DropdownMenuItem onClick={onShow}>Show</DropdownMenuItem>}
          {onShow && (onSetActive || onSetInactive || onLock || onUnlock || onDelete) && (
            <DropdownMenuSeparator />
          )}
          {onSetActive && <DropdownMenuItem onClick={onSetActive}>Set Active</DropdownMenuItem>}
          {onSetInactive && (
            <DropdownMenuItem onClick={onSetInactive}>Set Inactive</DropdownMenuItem>
          )}
          {onLock && <DropdownMenuItem onClick={onLock}>Lock</DropdownMenuItem>}
          {onUnlock && <DropdownMenuItem onClick={onUnlock}>Unlock</DropdownMenuItem>}
          {onDelete && (
            <DropdownMenuItem variant="destructive" onClick={() => setShowDeleteDialog(true)}>
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {onDelete && (
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Delete {count} {label} {count === 1 ? "Rule" : "Rules"}?
              </AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div className="space-y-3 text-secondary text-sm">
                  <div>
                    This will permanently delete {count} {label.toLowerCase()}{" "}
                    {count === 1 ? "rule" : "rules"}. This action cannot be undone.
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
                Delete {count === 1 ? "Rule" : "Rules"}
              </AlertDialogAction>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  )
}
