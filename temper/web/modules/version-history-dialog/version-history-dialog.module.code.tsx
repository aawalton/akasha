"use client"

import type { Json } from "akasha/code/type/narrowing/modules/json-value/json-value.module.code.ts"
import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "akasha/design/interface/primitive/modules/dialog/dialog.module.code.tsx"
import { Heading } from "akasha/design/interface/primitive/modules/heading/heading.module.code.tsx"
import { Input } from "akasha/design/interface/primitive/modules/input/input.module.code.tsx"
import { ScrollArea } from "akasha/design/interface/primitive/modules/scroll-area/scroll-area.module.code.tsx"
import { Spinner } from "akasha/design/interface/primitive/modules/spinner/spinner.module.code.tsx"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import { createPage } from "akasha/page/access/modules/create/create.module.code.ts"
import { patchPage } from "akasha/page/access/modules/patch/patch.module.code.ts"
import { useUserId } from "akasha/page/ui/modules/use-user-id/use-user-id.module.code.tsx"
import { useOptimisticCreatePage } from "akasha/page/ui/supabase/mutation/modules/use-optimistic-create-page/use-optimistic-create-page.module.code.ts"
import { useOptimisticPatchPage } from "akasha/page/ui/supabase/mutation/modules/use-optimistic-patch-page/use-optimistic-patch-page.module.code.ts"
import type { BuildId } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import {
  type BuildPageTypeSlug,
  buildAddressOf,
  buildVersionPageTypeOf,
} from "akasha/temper/web/modules/build-version-page-type/build-version-page-type.module.code.ts"
import { RestoreConfirmDialog } from "akasha/temper/web/modules/restore-confirm-dialog/restore-confirm-dialog.module.code.tsx"
import { useAccountAddress } from "akasha/temper/web/modules/use-account-address/use-account-address.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import {
  type BuildVersion,
  VersionItem,
} from "akasha/temper/web/modules/version-history-item/version-history-item.module.code.tsx"
import { versionHistoryDialogAccountNotLoaded } from "akasha/temper/web/phrase/pages/version-history-dialog-account-not-loaded.temper-web-phrase.ts"
import { versionHistoryDialogAutoSaved } from "akasha/temper/web/phrase/pages/version-history-dialog-auto-saved.temper-web-phrase.ts"
import { versionHistoryDialogCheckpointCreated } from "akasha/temper/web/phrase/pages/version-history-dialog-checkpoint-created.temper-web-phrase.ts"
import { versionHistoryDialogCheckpointFailed } from "akasha/temper/web/phrase/pages/version-history-dialog-checkpoint-failed.temper-web-phrase.ts"
import { versionHistoryDialogCheckpoints } from "akasha/temper/web/phrase/pages/version-history-dialog-checkpoints.temper-web-phrase.ts"
import { versionHistoryDialogCreating } from "akasha/temper/web/phrase/pages/version-history-dialog-creating.temper-web-phrase.ts"
import { versionHistoryDialogEmpty } from "akasha/temper/web/phrase/pages/version-history-dialog-empty.temper-web-phrase.ts"
import { versionHistoryDialogHeading } from "akasha/temper/web/phrase/pages/version-history-dialog-heading.temper-web-phrase.ts"
import { versionHistoryDialogNameMissing } from "akasha/temper/web/phrase/pages/version-history-dialog-name-missing.temper-web-phrase.ts"
import { versionHistoryDialogNamePlaceholder } from "akasha/temper/web/phrase/pages/version-history-dialog-name-placeholder.temper-web-phrase.ts"
import { versionHistoryDialogRestoreFailed } from "akasha/temper/web/phrase/pages/version-history-dialog-restore-failed.temper-web-phrase.ts"
import { versionHistoryDialogRestored } from "akasha/temper/web/phrase/pages/version-history-dialog-restored.temper-web-phrase.ts"
import { versionHistoryDialogSave } from "akasha/temper/web/phrase/pages/version-history-dialog-save.temper-web-phrase.ts"
import { versionHistoryDialogWaiting } from "akasha/temper/web/phrase/pages/version-history-dialog-waiting.temper-web-phrase.ts"
import { useCallback, useEffect, useRef, useState } from "react"
import { toast } from "sonner"

const ACCOUNT_WAIT_MS = 60_000

interface VersionHistoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  buildId: BuildId
  buildSlug: string | null
  buildPageTypeSlug: BuildPageTypeSlug
  buildHash: string
  buildMetadata: Record<string, unknown>
  loadVersions: (
    buildSlug: string
  ) => Promise<{ versions: readonly BuildVersion[] } | { error: string }>
  onVersionRestored?: () => void
}

function asProperties(value: Record<string, unknown>): Record<string, Json> {
  return value as Record<string, Json>
}

export function VersionHistoryDialog({
  open,
  onOpenChange,
  buildId,
  buildSlug,
  buildPageTypeSlug,
  buildHash,
  buildMetadata,
  loadVersions,
  onVersionRestored,
}: VersionHistoryDialogProps) {
  const surface = useSurface()
  const phrase = usePhrase()
  const userId = useUserId()
  const accountPage = useAccountAddress(userId).address
  const optimisticCreate = useOptimisticCreatePage((args) => createPage(args))
  const optimisticPatch = useOptimisticPatchPage((args) => patchPage(args))
  const createCheckpointMutation = useCallback(
    async (args: { checkpointName: string }) => {
      if (userId == null) throw new Error("Not authenticated")
      if (accountPage == null) {
        throw new Error("The account page of the signed-in user is not read yet")
      }
      if (buildSlug == null) throw new Error("The build is not read yet")
      await optimisticCreate({
        pageTypeSlug: buildVersionPageTypeOf(buildPageTypeSlug),
        properties: {
          build: buildAddressOf(buildPageTypeSlug, buildSlug),
          accountPage,
          buildHash,
          isCheckpoint: true,
          checkpointName: args.checkpointName,
          versionNumber: Date.now(),
          ...asProperties(buildMetadata),
          title: args.checkpointName,
        },
      })
    },
    [optimisticCreate, userId, accountPage, buildSlug, buildPageTypeSlug, buildHash, buildMetadata]
  )
  const restoreFromHashMutation = useCallback(
    async (args: {
      buildId: string
      buildHash: string
      buildMetadata: Record<string, unknown>
    }) => {
      await optimisticPatch({
        pageTypeSlug: buildPageTypeSlug,
        where: [{ key: "id", eq: args.buildId }],
        set: {
          buildHash: args.buildHash,
          ...asProperties(args.buildMetadata),
        },
      })
    },
    [optimisticPatch, buildPageTypeSlug]
  )
  const [versions, setVersions] = useState<readonly BuildVersion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [checkpointName, setCheckpointName] = useState("")
  const [isCreatingCheckpoint, setIsCreatingCheckpoint] = useState(false)
  const [isWaitingForAccount, setIsWaitingForAccount] = useState(false)
  const [selectedVersion, setSelectedVersion] = useState<BuildVersion | null>(null)
  const [showRestoreConfirm, setShowRestoreConfirm] = useState(false)
  const [isRestoring, setIsRestoring] = useState(false)

  const fetchVersions = useCallback(async () => {
    if (buildSlug == null) return
    setIsLoading(true)
    const result = await loadVersions(buildSlug)

    if ("error" in result) {
      toast.error(result.error)
    } else {
      setVersions(result.versions)
    }

    setIsLoading(false)
  }, [buildSlug, loadVersions])

  useEffect(() => {
    if (open) {
      fetchVersions()
    }
  }, [open, fetchVersions])

  const handleCreateCheckpoint = async () => {
    if (checkpointName.trim() === "") {
      toast.error(phrase(versionHistoryDialogNameMissing.slug))
      return
    }
    if (userId != null && accountPage == null) {
      setIsWaitingForAccount(true)
      return
    }

    setIsWaitingForAccount(false)
    setIsCreatingCheckpoint(true)
    try {
      await createCheckpointMutation({ checkpointName: checkpointName.trim() })
      toast.success(phrase(versionHistoryDialogCheckpointCreated.slug))
      setCheckpointName("")
      fetchVersions()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : phrase(versionHistoryDialogCheckpointFailed.slug)
      )
    }
    setIsCreatingCheckpoint(false)
  }

  const saveCheckpoint = useRef(handleCreateCheckpoint)
  saveCheckpoint.current = handleCreateCheckpoint

  useEffect(() => {
    if (!isWaitingForAccount) return
    if (accountPage != null) {
      void saveCheckpoint.current()
      return
    }
    const gaveUp = setTimeout(() => {
      setIsWaitingForAccount(false)
      toast.error(phrase(versionHistoryDialogAccountNotLoaded.slug))
    }, ACCOUNT_WAIT_MS)
    return () => clearTimeout(gaveUp)
  }, [isWaitingForAccount, accountPage, phrase])

  const handleRestoreClick = (version: BuildVersion) => {
    setSelectedVersion(version)
    setShowRestoreConfirm(true)
  }

  const handleRestoreConfirm = async () => {
    if (!selectedVersion) return

    setIsRestoring(true)
    try {
      await restoreFromHashMutation({
        buildId,
        buildHash: selectedVersion.buildHash,
        buildMetadata: selectedVersion.buildMetadata,
      })
      toast.success(phrase(versionHistoryDialogRestored.slug))
      onVersionRestored?.()
      onOpenChange(false)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : phrase(versionHistoryDialogRestoreFailed.slug)
      )
    }
    setIsRestoring(false)
    setShowRestoreConfirm(false)
    setSelectedVersion(null)
  }

  const checkpoints = versions.filter((v) => v.isCheckpoint)
  const autoVersions = versions.filter((v) => !v.isCheckpoint)

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{phrase(versionHistoryDialogHeading.slug)}</DialogTitle>
          </DialogHeader>

          <DialogBody className="space-y-4">
            {}
            <div className={cn("rounded-lg p-3", surfaceClass(surface + 1))}>
              <div className="flex gap-2">
                <Input
                  placeholder={phrase(versionHistoryDialogNamePlaceholder.slug)}
                  value={checkpointName}
                  onChange={(e) => setCheckpointName(e.target.value)}
                  disabled={isCreatingCheckpoint || isWaitingForAccount}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !isCreatingCheckpoint && !isWaitingForAccount) {
                      handleCreateCheckpoint()
                    }
                  }}
                />
                <Button
                  variant="secondary"
                  onClick={handleCreateCheckpoint}
                  disabled={
                    isCreatingCheckpoint || isWaitingForAccount || checkpointName.trim() === ""
                  }
                  className={
                    isCreatingCheckpoint || isWaitingForAccount ? "disabled:cursor-wait" : undefined
                  }
                >
                  {phrase(
                    isCreatingCheckpoint
                      ? versionHistoryDialogCreating.slug
                      : isWaitingForAccount
                        ? versionHistoryDialogWaiting.slug
                        : versionHistoryDialogSave.slug
                  )}
                </Button>
              </div>
            </div>

            {}
            <ScrollArea className="max-h-[360px]">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Spinner className="size-6 text-tertiary" />
                </div>
              ) : versions.length === 0 ? (
                <div className="py-8 text-center text-secondary text-sm">
                  {phrase(versionHistoryDialogEmpty.slug)}
                </div>
              ) : (
                <div className="space-y-4">
                  {}
                  {checkpoints.length > 0 && (
                    <div className="space-y-2">
                      <Heading variant="label" className="px-1">
                        {phrase(versionHistoryDialogCheckpoints.slug)}
                      </Heading>
                      {checkpoints.map((version) => (
                        <VersionItem
                          key={version.id}
                          version={version}
                          onRestore={() => handleRestoreClick(version)}
                        />
                      ))}
                    </div>
                  )}

                  {}
                  {autoVersions.length > 0 && (
                    <div className="space-y-2">
                      <Heading variant="label" className="px-1">
                        {phrase(versionHistoryDialogAutoSaved.slug)}
                      </Heading>
                      {autoVersions.map((version) => (
                        <VersionItem
                          key={version.id}
                          version={version}
                          onRestore={() => handleRestoreClick(version)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </ScrollArea>
          </DialogBody>
        </DialogContent>
      </Dialog>

      <RestoreConfirmDialog
        open={showRestoreConfirm}
        onOpenChange={setShowRestoreConfirm}
        onConfirm={handleRestoreConfirm}
        isRestoring={isRestoring}
      />
    </>
  )
}
