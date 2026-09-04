"use client"

import { Badge } from "@akasha/design-badges/badge"
import { Button } from "@akasha/design-primitives/button"
import { cn } from "@akasha/design-primitives/cn"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@akasha/design-primitives/dialog"
import { Heading } from "@akasha/design-primitives/heading"
import { Input } from "@akasha/design-primitives/input"
import { ScrollArea } from "@akasha/design-primitives/scroll-area"
import { Spinner } from "@akasha/design-primitives/spinner"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import { createPage } from "@akasha/pages-access/create"
import { patchPage } from "@akasha/pages-access/patch"
import { useOptimisticCreatePage } from "@akasha/pages-ui/supabase/mutations/use-optimistic-create-page"
import { useOptimisticPatchPage } from "@akasha/pages-ui/supabase/mutations/use-optimistic-patch-page"
import { useUserId } from "@akasha/pages-ui/use-user-id"
import type { BuildId } from "@akasha/temper-formula-framework/branded-id"
import type { Json } from "@akasha/utils-narrow/json-value"
import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"
import { formatTimeAgo } from "../format-time-ago/format-time-ago.module.code.ts"
import { RestoreConfirmDialog } from "../restore-confirm-dialog/restore-confirm-dialog.module.code.tsx"
import {
  type CharacterVersion,
  getCharacterVersions,
} from "../version-actions/version-actions.module.code.ts"

interface VersionHistoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  buildId: BuildId
  onVersionRestored?: () => void
}

function asJson(value: Record<string, unknown>): Json {
  return value as Json
}

export function VersionHistoryDialog({
  open,
  onOpenChange,
  buildId,
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
        pageTypeSlug: "character-build",
        where: [{ key: "id", eq: args.buildId }],
        set: {
          buildHash: args.buildHash,
          buildMetadata: asJson(args.buildMetadata),
        },
      })
    },
    [optimisticPatch]
  )
  const [versions, setVersions] = useState<CharacterVersion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [checkpointName, setCheckpointName] = useState("")
  const [isCreatingCheckpoint, setIsCreatingCheckpoint] = useState(false)
  const [selectedVersion, setSelectedVersion] = useState<CharacterVersion | null>(null)
  const [showRestoreConfirm, setShowRestoreConfirm] = useState(false)
  const [isRestoring, setIsRestoring] = useState(false)

  const fetchVersions = useCallback(async () => {
    setIsLoading(true)
    const result = await getCharacterVersions(buildId)

    if ("error" in result) {
      toast.error(result.error)
    } else {
      setVersions(result.versions)
    }

    setIsLoading(false)
  }, [buildId])

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

  const handleRestoreClick = (version: CharacterVersion) => {
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
  version: CharacterVersion
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
