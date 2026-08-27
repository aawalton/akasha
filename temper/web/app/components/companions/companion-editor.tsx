"use client"

import type {
  CompanionState,
  CompanionVisibility,
} from "@temper/game-companions-core/companion-types"
import type { BuildId } from "@temper/shared-formula-framework/branded"
import { CompanionEditorContent } from "@/components/companions/companion-editor-content"
import { CompanionProvider } from "@/components/companions/context/companion-context"

interface CompanionEditorProps {
  buildId: BuildId
  initialTab?: string
  initialBuild: CompanionState
  initialBuildHash: string
  isOwner: boolean
  initialVisibility: CompanionVisibility
  isTargetBuild: boolean
}

export function CompanionEditor({
  buildId,
  initialTab,
  initialBuild,
  initialBuildHash,
  isOwner,
  initialVisibility,
  isTargetBuild,
}: CompanionEditorProps) {
  return (
    <CompanionProvider
      initialBuild={initialBuild}
      initialBuildHash={initialBuildHash}
      buildId={buildId}
      isOwner={isOwner}
      initialVisibility={initialVisibility}
      isTargetBuild={isTargetBuild}
    >
      <CompanionEditorContent initialTab={initialTab} />
    </CompanionProvider>
  )
}
