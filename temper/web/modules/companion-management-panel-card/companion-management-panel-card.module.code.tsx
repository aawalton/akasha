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
import {
  CompanionDeleteRefused,
  useCompanion,
} from "akasha/temper/web/companions-ui/modules/use-companions/use-companions.module.code.ts"
import { getCompanionVersions } from "akasha/temper/web/modules/companion-version-actions/companion-version-actions.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { VersionHistoryDialog } from "akasha/temper/web/modules/version-history-dialog/version-history-dialog.module.code.tsx"
import { companionManagementPanelCardBuildManagement } from "akasha/temper/web/phrase/pages/companion-management-panel-card-build-management.temper-web-phrase.ts"
import { companionManagementPanelCardCancel } from "akasha/temper/web/phrase/pages/companion-management-panel-card-cancel.temper-web-phrase.ts"
import { companionManagementPanelCardDeleteBuild } from "akasha/temper/web/phrase/pages/companion-management-panel-card-delete-build.temper-web-phrase.ts"
import { companionManagementPanelCardDeleteDescription } from "akasha/temper/web/phrase/pages/companion-management-panel-card-delete-description.temper-web-phrase.ts"
import { companionManagementPanelCardDeleteFailed } from "akasha/temper/web/phrase/pages/companion-management-panel-card-delete-failed.temper-web-phrase.ts"
import { companionManagementPanelCardDeleteTitle } from "akasha/temper/web/phrase/pages/companion-management-panel-card-delete-title.temper-web-phrase.ts"
import { companionManagementPanelCardDeleting } from "akasha/temper/web/phrase/pages/companion-management-panel-card-deleting.temper-web-phrase.ts"
import { companionManagementPanelCardSignedOut } from "akasha/temper/web/phrase/pages/companion-management-panel-card-signed-out.temper-web-phrase.ts"
import { companionManagementPanelCardUnread } from "akasha/temper/web/phrase/pages/companion-management-panel-card-unread.temper-web-phrase.ts"
import { companionManagementPanelCardUntitledBuild } from "akasha/temper/web/phrase/pages/companion-management-panel-card-untitled-build.temper-web-phrase.ts"
import { companionManagementPanelCardVersionHistory } from "akasha/temper/web/phrase/pages/companion-management-panel-card-version-history.temper-web-phrase.ts"
import { useState } from "react"
import { toast } from "sonner"

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
  const phrase = usePhrase()
  const router = usePagesUIRouter()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showVersionHistory, setShowVersionHistory] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { deleteBuild, buildSlug, buildHash, buildMetadata } = useCompanion(buildId)

  const versionMetadata = {
    title: buildMetadata?.name ?? "",
    description: buildMetadata?.description ?? "",
    ...(buildMetadata?.baseRoles ? { baseRoles: [...buildMetadata.baseRoles] } : {}),
    ...(buildMetadata?.targetCount != null ? { targetCount: buildMetadata.targetCount } : {}),
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteBuild()
      router.push("/companion-build")
    } catch (error) {
      toast.error(
        error instanceof CompanionDeleteRefused
          ? phrase(
              error.kind === "signed-out"
                ? companionManagementPanelCardSignedOut.slug
                : companionManagementPanelCardUnread.slug
            )
          : error instanceof Error
            ? error.message
            : phrase(companionManagementPanelCardDeleteFailed.slug)
      )
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
        title={phrase(companionManagementPanelCardBuildManagement.slug)}
        className={className}
      >
        <div className="flex flex-wrap justify-between gap-2">
          <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
            {phrase(companionManagementPanelCardDeleteBuild.slug)}
          </Button>
          <Button variant="secondary" onClick={() => setShowVersionHistory(true)}>
            {phrase(companionManagementPanelCardVersionHistory.slug)}
          </Button>
        </div>
      </PanelCard>

      <VersionHistoryDialog
        open={showVersionHistory}
        onOpenChange={setShowVersionHistory}
        buildId={buildId}
        buildSlug={buildSlug}
        buildPageTypeSlug="companion-build"
        buildHash={buildHash ?? ""}
        buildMetadata={versionMetadata}
        loadVersions={getCompanionVersions}
        onVersionRestored={handleVersionRestored}
      />

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {phrase(companionManagementPanelCardDeleteTitle.slug)}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {phrase(companionManagementPanelCardDeleteDescription.slug, {
                name:
                  buildName !== ""
                    ? buildName
                    : phrase(companionManagementPanelCardUntitledBuild.slug),
              })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-between">
            <AlertDialogAction
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
              className={isDeleting ? "disabled:cursor-wait" : undefined}
            >
              {isDeleting
                ? phrase(companionManagementPanelCardDeleting.slug)
                : phrase(companionManagementPanelCardDeleteBuild.slug)}
            </AlertDialogAction>
            <AlertDialogCancel disabled={isDeleting} className={surfaceClass(surface + 1)}>
              {phrase(companionManagementPanelCardCancel.slug)}
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
