"use client"

import { PanelCard } from "@shared/design-layout/components/panel-card"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@shared/design-primitives/components/alert-dialog"
import { Button } from "@shared/design-primitives/components/button"
import { useSurface } from "@shared/design-primitives/components/surface-provider"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { usePagesUIRouter } from "@shared/pages-ui/router-context"
import { useCompanion } from "@temper/game-companions-ui/use-companions"
import type { BuildId } from "@temper/shared-formula-framework/branded"
import { useState } from "react"
import { toast } from "sonner"
import { VersionHistoryDialog } from "@/components/companions/version-history-dialog"

interface CompanionManagementPanelCardProps {
  buildId: BuildId
  buildName: string
  className?: string
}

export function CompanionManagementPanelCard({
  buildId,
  buildName,
  className,
}: CompanionManagementPanelCardProps) {
  const surface = useSurface()
  const router = usePagesUIRouter()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showVersionHistory, setShowVersionHistory] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { deleteBuild } = useCompanion(buildId)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteBuild()
      router.push("/companion-builds")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete companion")
      setIsDeleting(false)
      setShowDeleteDialog(false)
    }
  }

  const handleVersionRestored = () => {
    window.location.reload()
  }

  return (
    <>
      <PanelCard
        id="companion-management"
        collapsible
        title="Build Management"
        className={className}
      >
        <div className="flex flex-wrap justify-between gap-2">
          <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
            Delete Build
          </Button>
          <Button variant="secondary" onClick={() => setShowVersionHistory(true)}>
            Version History
          </Button>
        </div>
      </PanelCard>

      <VersionHistoryDialog
        open={showVersionHistory}
        onOpenChange={setShowVersionHistory}
        buildId={buildId}
        onVersionRestored={handleVersionRestored}
      />

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Build?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete &quot;
              {buildName !== "" ? buildName : "Untitled Build"}&quot;. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-between">
            <AlertDialogAction
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
              className={isDeleting ? "disabled:cursor-wait" : undefined}
            >
              {isDeleting ? "Deleting..." : "Delete Build"}
            </AlertDialogAction>
            <AlertDialogCancel disabled={isDeleting} className={surfaceClass(surface + 1)}>
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
