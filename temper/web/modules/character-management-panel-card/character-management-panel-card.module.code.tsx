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
  CharacterDeleteRefused,
  useCharacter,
} from "akasha/temper/web/characters-character-ui/modules/use-characters/use-characters.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { getCharacterVersions } from "akasha/temper/web/modules/version-actions/version-actions.module.code.ts"
import { VersionHistoryDialog } from "akasha/temper/web/modules/version-history-dialog/version-history-dialog.module.code.tsx"
import { characterManagementPanelCardBuildManagement } from "akasha/temper/web/phrase/pages/character-management-panel-card-build-management.temper-web-phrase.ts"
import { characterManagementPanelCardCancel } from "akasha/temper/web/phrase/pages/character-management-panel-card-cancel.temper-web-phrase.ts"
import { characterManagementPanelCardDeleteBuild } from "akasha/temper/web/phrase/pages/character-management-panel-card-delete-build.temper-web-phrase.ts"
import { characterManagementPanelCardDeleteBuildQuestion } from "akasha/temper/web/phrase/pages/character-management-panel-card-delete-build-question.temper-web-phrase.ts"
import { characterManagementPanelCardDeleteFailed } from "akasha/temper/web/phrase/pages/character-management-panel-card-delete-failed.temper-web-phrase.ts"
import { characterManagementPanelCardDeleteWarning } from "akasha/temper/web/phrase/pages/character-management-panel-card-delete-warning.temper-web-phrase.ts"
import { characterManagementPanelCardDeleting } from "akasha/temper/web/phrase/pages/character-management-panel-card-deleting.temper-web-phrase.ts"
import { characterManagementPanelCardSignedOut } from "akasha/temper/web/phrase/pages/character-management-panel-card-signed-out.temper-web-phrase.ts"
import { characterManagementPanelCardUnread } from "akasha/temper/web/phrase/pages/character-management-panel-card-unread.temper-web-phrase.ts"
import { characterManagementPanelCardUntitledBuild } from "akasha/temper/web/phrase/pages/character-management-panel-card-untitled-build.temper-web-phrase.ts"
import { characterManagementPanelCardVersionHistory } from "akasha/temper/web/phrase/pages/character-management-panel-card-version-history.temper-web-phrase.ts"
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
  const phrase = usePhrase()
  const router = usePagesUIRouter()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showVersionHistory, setShowVersionHistory] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { deleteBuild, buildSlug, buildHash, buildMetadata } = useCharacter(buildId)

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
      toast.error(
        error instanceof CharacterDeleteRefused
          ? phrase(
              error.kind === "signed-out"
                ? characterManagementPanelCardSignedOut.slug
                : characterManagementPanelCardUnread.slug
            )
          : error instanceof Error
            ? error.message
            : phrase(characterManagementPanelCardDeleteFailed.slug)
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
        id="character-management"
        collapsible
        title={phrase(characterManagementPanelCardBuildManagement.slug)}
        className={className}
      >
        <div className="flex flex-wrap justify-between gap-2">
          <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
            {phrase(characterManagementPanelCardDeleteBuild.slug)}
          </Button>
          <Button variant="secondary" onClick={() => setShowVersionHistory(true)}>
            {phrase(characterManagementPanelCardVersionHistory.slug)}
          </Button>
        </div>
      </PanelCard>

      <VersionHistoryDialog
        open={showVersionHistory}
        onOpenChange={setShowVersionHistory}
        buildId={buildId}
        buildSlug={buildSlug}
        buildPageTypeSlug="character-build"
        buildHash={buildHash ?? ""}
        buildMetadata={versionMetadata}
        loadVersions={getCharacterVersions}
        onVersionRestored={handleVersionRestored}
      />

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {phrase(characterManagementPanelCardDeleteBuildQuestion.slug)}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {phrase(characterManagementPanelCardDeleteWarning.slug, {
                name:
                  buildName !== ""
                    ? buildName
                    : phrase(characterManagementPanelCardUntitledBuild.slug),
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
                ? phrase(characterManagementPanelCardDeleting.slug)
                : phrase(characterManagementPanelCardDeleteBuild.slug)}
            </AlertDialogAction>
            <AlertDialogCancel disabled={isDeleting} className={surfaceClass(surface + 1)}>
              {phrase(characterManagementPanelCardCancel.slug)}
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
