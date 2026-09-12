"use client"

import { Badge } from "akasha/design/interfaces/badges/modules/badge/badge.module.code.tsx"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "akasha/design/interfaces/primitives/dialog/dialog.module.code.tsx"
import { Heading } from "akasha/design/interfaces/primitives/heading/heading.module.code.tsx"
import { Input } from "akasha/design/interfaces/primitives/input/input.module.code.tsx"
import { Button } from "akasha/design/interfaces/primitives/modules/button/button.module.code.tsx"
import { cn } from "akasha/design/interfaces/primitives/modules/cn/cn.module.code.ts"
import { ScrollArea } from "akasha/design/interfaces/primitives/scroll-area/scroll-area.module.code.tsx"
import { Spinner } from "akasha/design/interfaces/primitives/spinner/spinner.module.code.tsx"
import { surfaceClass } from "akasha/design/interfaces/primitives/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interfaces/primitives/surface-provider/surface-provider.module.code.tsx"
import { createPage } from "akasha/pages/access/modules/create/create.module.code.ts"
import { patchPage } from "akasha/pages/access/patch/patch.module.code.ts"
import { useOptimisticCreatePage } from "akasha/pages/ui/supabase/mutations/use-optimistic-create-page/use-optimistic-create-page.module.code.ts"
import { useOptimisticPatchPage } from "akasha/pages/ui/supabase/mutations/use-optimistic-patch-page/use-optimistic-patch-page.module.code.ts"
import { useUserId } from "akasha/pages/ui/use-user-id/use-user-id.module.code.tsx"
import type { BuildId } from "akasha/temper/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { formatTimeAgo } from "akasha/temper/web/format-time-ago/format-time-ago.module.code.ts"
import { RestoreConfirmDialog } from "akasha/temper/web/restore-confirm-dialog/restore-confirm-dialog.module.code.tsx"
import type { Json } from "akasha/utils/narrow/json-value/json-value.module.code.ts"
import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"

export interface BuildVersion {
  id: string
  versionNumber: number
  isCheckpoint: boolean
  checkpointName: string | null
  createdAt: string
  buildHash: string
  buildMetadata: Record<string, unknown>
}

interface VersionHistoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  buildId: BuildId
  buildPageTypeSlug: "character-build" | "companion-build"
  loadVersions: (
    buildId: BuildId
  ) => Promise<{ versions: readonly BuildVersion[] } | { error: string }>
  onVersionRestored?: () => void
}

function asJson(value: Record<string, unknown>): Json {
  return value as Json
}

export function VersionHistoryDialog({
  open,
  onOpenChange,
  buildId,
  buildPageTypeSlug,
  loadVersions,
  onVersionRestored,
}: VersionHistoryDialogProps) {
  const surface = useSurface()
  const userId = useUserId()
  const optimisticCreate = useOptimisticCreatePage((args) => createPage(args))
  const optimisticPatch = useOptimisticPatchPage((args) => patchPage(args))
  const createCheckpointMutation = useCallback(
    async (args: { buildId: string; checkpointName: string }) => {
      if (userId == null) throw new Error("Not authenticated")
      await optimisticCreate({
        pageTypeSlug: "temper-build-version",
        properties: {
          build: args.buildId,
          accountPage: userId,
          isCheckpoint: "true",
          checkpointName: args.checkpointName,
          versionNumber: Date.now(),
        },
      })
    },
    [optimisticCreate, userId]
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
          buildMetadata: asJson(args.buildMetadata),
        },
      })
    },
    [optimisticPatch, buildPageTypeSlug]
  )
  const [versions, setVersions] = useState<readonly BuildVersion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [checkpointName, setCheckpointName] = useState("")
  const [isCreatingCheckpoint, setIsCreatingCheckpoint] = useState(false)
  const [selectedVersion, setSelectedVersion] = useState<BuildVersion | null>(null)
  const [showRestoreConfirm, setShowRestoreConfirm] = useState(false)
  const [isRestoring, setIsRestoring] = useState(false)

  const fetchVersions = useCallback(async () => {
    setIsLoading(true)
    const result = await loadVersions(buildId)

    if ("error" in result) {
      toast.error(result.error)
    } else {
      setVersions(result.versions)
    }

    setIsLoading(false)
  }, [buildId, loadVersions])

  useEffect(() => {
    if (open) {
      fetchVersions()
    }
  }, [open, fetchVersions])

  const handleCreateCheckpoint = async () => {
    if (checkpointName.trim() === "") {
      toast.error("Please enter a checkpoint name")
      return
    }

    setIsCreatingCheckpoint(true)
    try {
      await createCheckpointMutation({
        buildId,
        checkpointName: checkpointName.trim(),
      })
      toast.success("Checkpoint created")
      setCheckpointName("")
      fetchVersions()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create checkpoint")
    }
    setIsCreatingCheckpoint(false)
  }

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
      toast.success("Build restored to selected version")
      onVersionRestored?.()
      onOpenChange(false)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to restore version")
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
            <DialogTitle>Version History</DialogTitle>
          </DialogHeader>

          <DialogBody className="space-y-4">
            {}
            <div className={cn("rounded-lg p-3", surfaceClass(surface + 1))}>
              <div className="flex gap-2">
                <Input
                  placeholder="Checkpoint name"
                  value={checkpointName}
                  onChange={(e) => setCheckpointName(e.target.value)}
                  disabled={isCreatingCheckpoint}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !isCreatingCheckpoint) {
                      handleCreateCheckpoint()
                    }
                  }}
                />
                <Button
                  variant="secondary"
                  onClick={handleCreateCheckpoint}
                  disabled={isCreatingCheckpoint || checkpointName.trim() === ""}
                  className={isCreatingCheckpoint ? "disabled:cursor-wait" : undefined}
                >
                  {isCreatingCheckpoint ? "Creating..." : "Save"}
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
                  No checkpoints yet. Save a checkpoint to capture the current build.
                </div>
              ) : (
                <div className="space-y-4">
                  {}
                  {checkpoints.length > 0 && (
                    <div className="space-y-2">
                      <Heading variant="label" className="px-1">
                        Checkpoints
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
                        Auto-saved
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

interface VersionItemProps {
  version: BuildVersion
  onRestore: () => void
}

function VersionItem({ version, onRestore }: VersionItemProps) {
  const surface = useSurface()
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-lg px-3 py-2",
        surfaceClass(surface + 1)
      )}
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          {version.isCheckpoint ? (
            <Badge variant="accent">{version.checkpointName ?? "Checkpoint"}</Badge>
          ) : (
            <Badge variant="elevation">v{version.versionNumber}</Badge>
          )}
        </div>
        <span className="text-tertiary text-xs">{formatTimeAgo(version.createdAt)}</span>
      </div>
      <Button variant="tertiary" size="sm" onClick={onRestore}>
        Restore
      </Button>
    </div>
  )
}
