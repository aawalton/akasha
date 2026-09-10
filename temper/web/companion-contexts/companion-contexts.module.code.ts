"use client"

import type {
  CompanionState,
  CompanionVisibility,
} from "akasha/temper/companions-core/companion-types/companion-types.module.code.ts"
import { createContext } from "react"
import type { BuildId } from "../../formula-framework/branded-id/branded-id.module.code.ts"
import type { CompanionAction } from "../companion-actions/companion-actions.module.code.ts"

export const CompanionStateContext = createContext<CompanionState | null>(null)

export const CompanionDispatchContext = createContext<React.Dispatch<CompanionAction> | null>(null)

export interface CompanionMetadata {
  buildId: BuildId
  isOwner: boolean
  visibility: CompanionVisibility
  isTargetBuild: boolean
  name: string
  description: string
  setVisibility: (v: Exclude<CompanionVisibility, "live" | "target">) => void
  updateMeta: (meta: { name?: string; description?: string; targetCount?: number }) => void
}

export const CompanionMetadataContext = createContext<CompanionMetadata | null>(null)
