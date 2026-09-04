"use client"

import {
  applyCompanionMetadata,
  type CompanionBuildMetadata,
} from "@akasha/temper-build-metadata/build-metadata"
import { decodeCompanion, encodeCompanion } from "@akasha/temper-companion-codec/companion-codec"
import {
  type CompanionState,
  type CompanionVisibility,
  toVisibility,
} from "@akasha/temper-companions-core/companion-types"
import { useCompanion as useCompanionZero } from "@akasha/temper-companions-ui/use-companions"
import type { BuildId } from "@akasha/temper-formula-framework/branded-id"
import { buildHash as toBuildHash } from "@akasha/temper-formula-framework/branded-id"
import { type ReactNode, useCallback, useReducer } from "react"
import type { CompanionAction } from "../companion-actions/companion-actions.module.code.ts"
import { COMPANION_ACTIONS } from "../companion-actions/companion-actions.module.code.ts"
import {
  CompanionDispatchContext,
  type CompanionMetadata,
  CompanionMetadataContext,
  CompanionStateContext,
} from "../companion-contexts/companion-contexts.module.code.ts"
import { companionReducer } from "../companion-reducer/companion-reducer.module.code.ts"
import { CompanionStatsProvider } from "../companion-stats-context/companion-stats-context.module.code.tsx"
import { useBuildSync } from "../use-build-sync/use-build-sync.module.code.ts"

interface CompanionProviderProps {
  children: ReactNode
  initialBuild: CompanionState
  initialBuildHash: string
  buildId: BuildId
  isOwner: boolean
  initialVisibility: CompanionVisibility
  isTargetBuild: boolean
}

const noopUpdateBuild = async () => {}
const noopSetVisibility = () => {}
const noopUpdateMeta = () => {}

export function CompanionProvider({
  children,
  initialBuild,
  initialBuildHash,
  buildId,
  isOwner,
  initialVisibility,
  isTargetBuild,
}: CompanionProviderProps) {
  const [build, dispatch] = useReducer(companionReducer, initialBuild)

  const {
    build: zeroRow,
    buildHash: zeroBuildHash,
    buildMetadata: zeroBuildMetadata,
    updateBuild: zeroUpdateBuild,
    updateMeta: zeroUpdateMeta,
    setVisibility: zeroSetVisibility,
  } = useCompanionZero(buildId)

  const createResetAction = useCallback(
    (payload: CompanionState) =>
      ({ type: COMPANION_ACTIONS.RESET, payload }) satisfies CompanionAction,
    []
  )

  const decodeForSync = useCallback(
    (hash: string, metadata: CompanionBuildMetadata): CompanionState => {
      const decoded = decodeCompanion(toBuildHash(hash))
      if (!decoded) return initialBuild
      return applyCompanionMetadata(decoded, metadata)
    },
    [initialBuild]
  )

  const updateRemote = useCallback(
    async (hash: string, metadata: CompanionBuildMetadata) => {
      if (isOwner) {
        await zeroUpdateBuild(hash, metadata)
      }
    },
    [isOwner, zeroUpdateBuild]
  )

  const extractMetadataForSync = useCallback(
    (build: CompanionState): CompanionBuildMetadata => ({
      name: zeroBuildMetadata?.name ?? build.name,
      description: zeroBuildMetadata?.description ?? build.description,
      baseRoles: zeroBuildMetadata?.baseRoles ?? build.companion.baseRoles,
      roleId: zeroBuildMetadata?.roleId,
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
    encode: encodeCompanion,
    decode: decodeForSync,
    extractMetadata: extractMetadataForSync,
  })

  const visibility = zeroRow ? toVisibility(zeroRow.visibility) : initialVisibility
  const name = zeroBuildMetadata?.name ?? initialBuild.name
  const description = zeroBuildMetadata?.description ?? initialBuild.description

  const metadata: CompanionMetadata = {
    buildId,
    isOwner,
    visibility,
    isTargetBuild,
    name,
    description,
    setVisibility: isOwner ? zeroSetVisibility : noopSetVisibility,
    updateMeta: isOwner ? zeroUpdateMeta : noopUpdateMeta,
  }

  return (
    <CompanionMetadataContext.Provider value={metadata}>
      <CompanionDispatchContext.Provider value={dispatch}>
        <CompanionStateContext.Provider value={build}>
          <CompanionStatsProvider>{children}</CompanionStatsProvider>
        </CompanionStateContext.Provider>
      </CompanionDispatchContext.Provider>
    </CompanionMetadataContext.Provider>
  )
}
