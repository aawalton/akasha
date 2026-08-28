"use client"

import { PanelCard } from "@shared/design-layout/components/panel-card"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@shared/design-primitives/components/alert-dialog"
import { Button } from "@shared/design-primitives/components/button"
import { useSurface } from "@shared/design-primitives/components/surface-provider"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { usePagesUIRouter } from "@shared/pages-ui/router-context"
import { useCharacter } from "@temper/game-characters-character-ui/use-characters"
import type { BuildId } from "@temper/shared-formula-framework/branded"
import { useState } from "react"
import { toast } from "sonner"
import { VersionHistoryDialog } from "@/components/characters/version-history-dialog"

interface CharacterManagementPanelCardProps {
  buildId: BuildId
  buildName: string
  className?: string
}

export function CharacterManagementPanelCard({
  buildId,
  buildName,
  className,
}: CharacterManagementPanelCardProps) {
  const surface = useSurface()
  const router = usePagesUIRouter()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showVersionHistory, setShowVersionHistory] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { deleteBuild } = useCharacter(buildId)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteBuild()
      router.push("/character-builds")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete character")
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
        id="character-management"
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
              This will permanently delete &quot;{buildName !== "" ? buildName : "Untitled Build"}
              &quot;. This action cannot be undone.
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
