"use client"

import type {
  CompanionState,
  CompanionVisibility,
} from "@akasha/temper-companions-core/companion-types"
import type { BuildId } from "@akasha/temper-formula-framework/branded-id"
import { CompanionProvider } from "../companion-context/companion-context.module.code.tsx"
import { CompanionEditorContent } from "../companion-editor-content/companion-editor-content.module.code.tsx"

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
