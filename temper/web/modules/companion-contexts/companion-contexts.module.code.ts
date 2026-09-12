"use client"

import type {
  BuildVisibility,
  SettableBuildVisibility,
} from "akasha/temper/build-support/modules/build-visibility/build-visibility.module.code.ts"
import type { CompanionState } from "akasha/temper/companions-core/modules/companion-types/companion-types.module.code.ts"
import type { BuildId } from "akasha/temper/formula-framework/modules/branded-id/branded-id.module.code.ts"
import type { CompanionAction } from "akasha/temper/web/modules/companion-actions/companion-actions.module.code.ts"
import { createContext } from "react"

export const CompanionStateContext = createContext<CompanionState | null>(null)

export const CompanionDispatchContext = createContext<React.Dispatch<CompanionAction> | null>(null)

export interface CompanionMetadata {
  buildId: BuildId
  isOwner: boolean
  visibility: BuildVisibility
  isTargetBuild: boolean
  name: string
  description: string
  setVisibility: (v: SettableBuildVisibility) => void
  updateMeta: (meta: { name?: string; description?: string; targetCount?: number }) => void
}

export const CompanionMetadataContext = createContext<CompanionMetadata | null>(null)
