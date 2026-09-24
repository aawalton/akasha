"use client"

import { PanelCard } from "akasha/design/interface/layout/modules/panel-card/panel-card.module.code.tsx"
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
import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import { usePagesUIRouter } from "akasha/page/ui/modules/navigation-context/navigation-context.module.code.tsx"
import type { BuildId } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { useCharacter } from "akasha/temper/web/characters-character-ui/modules/use-characters/use-characters.module.code.ts"
import { getCharacterVersions } from "akasha/temper/web/modules/version-actions/version-actions.module.code.ts"
import { VersionHistoryDialog } from "akasha/temper/web/modules/version-history-dialog/version-history-dialog.module.code.tsx"
import { useState } from "react"
import { toast } from "sonner"

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
  const { deleteBuild, buildHash, buildMetadata } = useCharacter(buildId)

  const versionMetadata = {
    title: buildMetadata?.name ?? "",
    description: buildMetadata?.description ?? "",
    characterName: buildMetadata?.characterName ?? "",
    ...(buildMetadata?.baseRoles ? { roles: [...buildMetadata.baseRoles] } : {}),
    ...(buildMetadata?.targetCount != null ? { targetCount: buildMetadata.targetCount } : {}),
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteBuild()
      router.push("/character-build")
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
        buildPageTypeSlug="character-build"
        buildHash={buildHash ?? ""}
        buildMetadata={versionMetadata}
        loadVersions={getCharacterVersions}
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
