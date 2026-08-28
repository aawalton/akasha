"use client"

import { Dialog, DialogBody, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@shared/design-primitives/components/dialog"
import { AlertTriangle } from "lucide-react"

export interface SetTargetEntity {
  entityId: string
  name: string
  subtitle: string
  hasTargetBuild: boolean
  targetManuallyEdited: boolean
}

interface SetTargetDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  entities: readonly SetTargetEntity[]
  onSelect: (entity: SetTargetEntity) => void
  buildType: "character" | "companion"
}

export function SetTargetDialog({
  open,
  onOpenChange,
  entities,
  onSelect,
  buildType,
}: SetTargetDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Set Target Build</DialogTitle>
          <DialogDescription>
            Select a {buildType} to set this build as its target.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          {entities.length === 0 ? (
            <p className="py-4 text-center text-secondary text-sm">
              No matching {buildType}s found.
            </p>
          ) : (
            <div className="flex flex-col gap-1">
              {entities.map((entity) => (
                <button
                  key={entity.entityId}
                  type="button"
                  className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-surface-2"
                  onClick={() => onSelect(entity)}
                >
                  <div className="min-w-0">
                    <div className="truncate font-medium text-sm">{entity.name}</div>
                    <div className="truncate text-secondary text-xs">{entity.subtitle}</div>
                  </div>
                  <div className="shrink-0">
                    {entity.hasTargetBuild && entity.targetManuallyEdited ? (
                      <span className="flex items-center gap-1 text-xs text-yellow">
                        <AlertTriangle className="h-3 w-3" />
                        Edited
                      </span>
                    ) : entity.hasTargetBuild ? (
                      <span className="text-secondary text-xs">Has target</span>
                    ) : (
                      <span className="text-tertiary text-xs">No target</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}
