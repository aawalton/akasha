"use client"

import {
  decodeBuild,
  encodeBuild,
} from "akasha/temper/build-codec/build-codec/build-codec.module.code.ts"
import {
  applyCharacterMetadata,
  type CharacterBuildMetadata,
} from "akasha/temper/build-metadata/build-metadata/build-metadata.module.code.ts"
import {
  type BuildVisibility,
  type SettableBuildVisibility,
  toBuildVisibility,
} from "akasha/temper/build-support/build-visibility/build-visibility.module.code.ts"
import type { CharacterState } from "akasha/temper/character-build/build-types/build-types.module.code.ts"
import type { Skill } from "akasha/temper/character-skills/character-skills/character-skills.module.code.ts"
import { useCharacter as useCharacterZero } from "akasha/temper/characters-character-ui/use-characters/use-characters.module.code.ts"
import type { SetTemplate as SetsAll } from "akasha/temper/equipment/set-template/set-template.module.code.ts"
import type { BuildId } from "akasha/temper/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { buildHash as toBuildHash } from "akasha/temper/formula-framework/modules/branded-id/branded-id.module.code.ts"
import type { CharacterAction } from "akasha/temper/web/character-actions/character-actions.module.code.ts"
import { CHARACTER_ACTIONS } from "akasha/temper/web/character-actions/character-actions.module.code.ts"
import { characterReducer } from "akasha/temper/web/character-reducer/character-reducer.module.code.ts"
import { useBuildSync } from "akasha/temper/web/use-build-sync/use-build-sync.module.code.ts"
import { createContext, type ReactNode, useCallback, useReducer } from "react"

export const CharacterStateContext = createContext<CharacterState | null>(null)

export const CharacterDispatchContext = createContext<React.Dispatch<CharacterAction> | null>(null)

export interface CharacterMetadata {
  buildId: BuildId
  isOwner: boolean
  visibility: BuildVisibility
  isTargetBuild: boolean
  name: string
  description: string
  setVisibility: (v: SettableBuildVisibility) => void
  updateMeta: (meta: {
    name?: string
    description?: string
    characterName?: string
    targetCount?: number
  }) => void
  availableSkills: readonly Skill[]
  availableSets: readonly SetsAll[]
}

export const CharacterMetadataContext = createContext<CharacterMetadata | null>(null)

interface CharacterProviderProps {
  children: ReactNode
  initialBuild: CharacterState
  initialBuildHash: string
  buildId: BuildId
  isOwner: boolean
  initialVisibility: BuildVisibility
  isTargetBuild: boolean
  availableSkills: readonly Skill[]
  availableSets: readonly SetsAll[]
}

const noopUpdateBuild = async () => {}
const noopSetVisibility = () => {}
const noopUpdateMeta = () => {}

export function CharacterProvider({
  children,
  initialBuild,
  initialBuildHash,
  buildId,
  isOwner,
  initialVisibility,
  isTargetBuild,
  availableSkills,
  availableSets,
}: CharacterProviderProps) {
  const [build, dispatch] = useReducer(characterReducer, initialBuild)

  const {
    build: zeroRow,
    buildHash: zeroBuildHash,
    buildMetadata: zeroBuildMetadata,
    updateBuild: zeroUpdateBuild,
    updateMeta: zeroUpdateMeta,
    setVisibility: zeroSetVisibility,
  } = useCharacterZero(buildId)

  const createResetAction = useCallback(
    (payload: CharacterState) =>
      ({ type: CHARACTER_ACTIONS.RESET, payload }) satisfies CharacterAction,
    []
  )

  const decodeForSync = useCallback(
    (hash: string, metadata: CharacterBuildMetadata): CharacterState => {
      const decoded = decodeBuild(toBuildHash(hash))
      if (!decoded) return initialBuild
      return applyCharacterMetadata(decoded, metadata)
    },
    [initialBuild]
  )

  const updateRemote = useCallback(
    async (hash: string, metadata: CharacterBuildMetadata) => {
      if (isOwner) {
        await zeroUpdateBuild(hash, metadata)
      }
    },
    [isOwner, zeroUpdateBuild]
  )

  const extractMetadataForSync = useCallback(
    (build: CharacterState): CharacterBuildMetadata => ({
      name: zeroBuildMetadata?.name ?? build.name,
      description: zeroBuildMetadata?.description ?? build.description,
      characterName: zeroBuildMetadata?.characterName ?? build.character.name,
      baseRoles: zeroBuildMetadata?.baseRoles ?? build.character.roles,
      targetCount: zeroBuildMetadata?.targetCount ?? build.target.targetCount,
    }),
    [zeroBuildMetadata]
  )

  useBuildSync({
    localBuild: build,
    zeroBuildHash,
    zeroBuildMetadata,
    updateRemote: isOwner ? updateRemote : noopUpdateBuild,
    dispatch,
    createResetAction,
    initialBuildHash,
    encode: encodeBuild,
    decode: decodeForSync,
    extractMetadata: extractMetadataForSync,
  })

  const visibility = zeroRow ? toBuildVisibility(zeroRow.visibility) : initialVisibility
  const name = zeroBuildMetadata?.name ?? initialBuild.name
  const description = zeroBuildMetadata?.description ?? initialBuild.description

  const metadata: CharacterMetadata = {
    buildId,
    isOwner,
    visibility,
    isTargetBuild,
    name,
    description,
    setVisibility: isOwner ? zeroSetVisibility : noopSetVisibility,
    updateMeta: isOwner ? zeroUpdateMeta : noopUpdateMeta,
    availableSkills,
    availableSets,
  }

  return (
    <CharacterMetadataContext.Provider value={metadata}>
      <CharacterDispatchContext.Provider value={dispatch}>
        <CharacterStateContext.Provider value={build}>{children}</CharacterStateContext.Provider>
      </CharacterDispatchContext.Provider>
    </CharacterMetadataContext.Provider>
  )
}
