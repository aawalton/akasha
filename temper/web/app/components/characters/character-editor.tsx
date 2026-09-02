"use client"

import type {
  CharacterState,
  CharacterVisibility,
} from "@akasha/temper-character-build/build-types"
import type { Skill } from "@akasha/temper-character-skills/character-skills"
import type { BuildId } from "@akasha/temper-formula-framework/branded-id"
import type { SetsAll } from "@temper/game-characters-equipment/sets/sets-all-data"
import { CharacterEditorContent } from "@/components/characters/character-editor-content"
import { CharacterProvider } from "@/components/characters/context/character-context"

interface CharacterEditorProps {
  buildId: BuildId
  initialTab?: string
  initialBuild: CharacterState
  initialBuildHash: string
  isOwner: boolean
  initialVisibility: CharacterVisibility
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
