"use client"

import type {
  CompanionState,
  CompanionVisibility,
} from "@temper/game-companions-core/companion-types"
import type { BuildId } from "@temper/shared-formula-framework/branded"
import { createContext } from "react"
import type { CompanionAction } from "./companion-actions"

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
