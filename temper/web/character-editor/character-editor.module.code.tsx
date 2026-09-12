"use client"

import type { BuildVisibility } from "akasha/temper/build-support/build-visibility/build-visibility.module.code.ts"
import type { CharacterState } from "akasha/temper/character-build/build-types/build-types.module.code.ts"
import type { Skill } from "akasha/temper/character-skills/character-skills/character-skills.module.code.ts"
import type { SetTemplate as SetsAll } from "akasha/temper/equipment/set-template/set-template.module.code.ts"
import type { BuildId } from "akasha/temper/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { CharacterProvider } from "akasha/temper/web/character-context/character-context.module.code.tsx"
import { CharacterEditorContent } from "akasha/temper/web/character-editor-content/character-editor-content.module.code.tsx"

interface CharacterEditorProps {
  buildId: BuildId
  initialTab?: string
  initialBuild: CharacterState
  initialBuildHash: string
  isOwner: boolean
  initialVisibility: BuildVisibility
  isTargetBuild: boolean
  availableSkills: readonly Skill[]
  availableSets: readonly SetsAll[]
}

export function CharacterEditor({
  buildId,
  initialTab,
  initialBuild,
  initialBuildHash,
  isOwner,
  initialVisibility,
  isTargetBuild,
  availableSkills,
  availableSets,
}: CharacterEditorProps) {
  return (
    <CharacterProvider
      initialBuild={initialBuild}
      initialBuildHash={initialBuildHash}
      buildId={buildId}
      isOwner={isOwner}
      initialVisibility={initialVisibility}
      isTargetBuild={isTargetBuild}
      availableSkills={availableSkills}
      availableSets={availableSets}
    >
      <CharacterEditorContent initialTab={initialTab} />
    </CharacterProvider>
  )
}
