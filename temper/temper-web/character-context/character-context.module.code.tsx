"use client"

import { decodeBuild, encodeBuild } from "@akasha/temper-build-codec/build-codec"
import {
  applyCharacterMetadata,
  type CharacterBuildMetadata,
} from "@akasha/temper-build-metadata/build-metadata"
import {
  type CharacterState,
  type CharacterVisibility,
  toCharacterVisibility,
} from "@akasha/temper-character-build/build-types"
import type { Skill } from "@akasha/temper-character-skills/character-skills"
import { useCharacter as useCharacterZero } from "@akasha/temper-characters-character-ui/use-characters"
import type { SetTemplate as SetsAll } from "@akasha/temper-equipment/set-template"
import type { BuildId } from "@akasha/temper-formula-framework/branded-id"
import { buildHash as toBuildHash } from "@akasha/temper-formula-framework/branded-id"
import { createContext, type ReactNode, useCallback, useReducer } from "react"
import type { CharacterAction } from "../character-actions/character-actions.module.code.ts"
import { CHARACTER_ACTIONS } from "../character-actions/character-actions.module.code.ts"
import { characterReducer } from "../character-reducer/character-reducer.module.code.ts"
import { useBuildSync } from "../use-build-sync/use-build-sync.module.code.ts"

export const CharacterStateContext = createContext<CharacterState | null>(null)

export const CharacterDispatchContext = createContext<React.Dispatch<CharacterAction> | null>(null)

export interface CharacterMetadata {
  buildId: BuildId
  isOwner: boolean
  visibility: CharacterVisibility
  isTargetBuild: boolean
  name: string
  description: string
  setVisibility: (v: Exclude<CharacterVisibility, "live" | "target">) => void
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
  initialVisibility: CharacterVisibility
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

  const visibility = zeroRow ? toCharacterVisibility(zeroRow.visibility) : initialVisibility
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
