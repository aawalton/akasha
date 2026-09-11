"use client"

import type {
  CompanionState,
  CompanionVisibility,
} from "akasha/temper/companions-core/companion-types/companion-types.module.code.ts"
import type { BuildId } from "akasha/temper/formula-framework/branded-id/branded-id.module.code.ts"
import { CompanionProvider } from "akasha/temper/web/companion-context/companion-context.module.code.tsx"
import { CompanionEditorContent } from "akasha/temper/web/companion-editor-content/companion-editor-content.module.code.tsx"

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
