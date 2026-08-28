"use client"

import { useAuth } from "@shared/auth/use-auth"
import { createPage } from "@shared/pages-access/create"
import { softDeletePage } from "@shared/pages-access/delete"
import { patchPage } from "@shared/pages-access/patch"
import { NEVER_MATCH_VALUE } from "@shared/pages-access/sentinels"
import { useOptimisticCreatePage } from "@shared/pages-ui/supabase/mutations/use-optimistic-create-page"
import { useOptimisticPatchPage } from "@shared/pages-ui/supabase/mutations/use-optimistic-patch-page"
import { useOptimisticSoftDeletePage } from "@shared/pages-ui/supabase/mutations/use-optimistic-soft-delete-page"
import { usePagesSupabase } from "@shared/pages-ui/supabase/use-pages"
import type { Json } from "../../../shared/supabase-database/src/generated/database"
import type { CompanionBuildMetadata } from "@temper/game-characters/build-metadata"
import { type CompanionRoleId } from "@temper/game-companions-core/companion-roles"
import { companionRoles } from "@temper/game-companions-core/generated/temper-companion-role.generated"
import {
  type CompanionBaseRoleId,
  companionBaseRoles,
} from "@temper/game-companions-core/companion-base-roles-data"
import type { CompanionVisibility } from "@temper/game-companions-core/companion-types"
import { useMemo } from "react"

const COMPANION_BUILD_PAGE_TYPE_SLUG = "companion-build"

export interface CompanionBuildRow {
  id: string
  userId: string
  buildHash: string
  buildMetadata: CompanionBuildMetadata | null
  visibility: string
  correlationId: string | null
  createdAt: number
  updatedAt: number
}

function parseTimestamp(value: unknown): number {
  if (typeof value === "number") return value
  if (typeof value === "string") {
    const parsed = Date.parse(value)
    if (!Number.isNaN(parsed)) return parsed
  }
  return 0
}

function parseString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback
}

function parseStringOrNull(value: unknown): string | null {
  return typeof value === "string" ? value : null
}

const VALID_BASE_ROLE_IDS = new Set<string>(companionBaseRoles.ids)
const VALID_ROLE_IDS = new Set<string>(companionRoles.ids)

function isCompanionBaseRoleId(value: unknown): value is CompanionBaseRoleId {
  return typeof value === "string" && VALID_BASE_ROLE_IDS.has(value)
}

function isCompanionRoleId(value: unknown): value is CompanionRoleId {
  return typeof value === "string" && VALID_ROLE_IDS.has(value)
}

function parseBuildMetadata(value: unknown): CompanionBuildMetadata | null {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return null
  const obj: Record<string, unknown> = { ...value }
  const { name, description, baseRoles, roleId, targetCount } = obj
  if (typeof name !== "string" || typeof description !== "string") return null
  const validatedBaseRoles = Array.isArray(baseRoles)
    ? baseRoles.filter(isCompanionBaseRoleId)
    : undefined
  const validatedRoleId = isCompanionRoleId(roleId) ? roleId : undefined
  return {
    name,
    description,
    ...(validatedBaseRoles != null ? { baseRoles: validatedBaseRoles } : {}),
    ...(validatedRoleId != null ? { roleId: validatedRoleId } : {}),
    ...(typeof targetCount === "number" ? { targetCount } : {}),
  }
}

function mapBuildRow(row: Record<string, unknown>): CompanionBuildRow {
  return {
    id: parseString(row.id),
    userId: parseString(row.userId),
    buildHash: parseString(row.buildHash),
    buildMetadata: parseBuildMetadata(row.buildMetadata),
    visibility: parseString(row.visibility, "private"),
    correlationId: parseStringOrNull(row.correlationId),
    createdAt: parseTimestamp(row.createdAt),
    updatedAt: parseTimestamp(row.updatedAt),
  }
}

function buildMetadataToJson(meta: CompanionBuildMetadata): Json {
  const json: Json = {
    name: meta.name,
    description: meta.description,
    ...(meta.baseRoles != null ? { baseRoles: [...meta.baseRoles] } : {}),
    ...(meta.roleId != null ? { roleId: meta.roleId } : {}),
    ...(meta.targetCount != null ? { targetCount: meta.targetCount } : {}),
  }
  return json
}

export function useCompanionList() {
  const { userId } = useAuth()
  const { rows, isLoading, error } = usePagesSupabase({
    pageTypeSlug: COMPANION_BUILD_PAGE_TYPE_SLUG,
    where:
      userId != null ? [{ key: "userId", eq: userId }] : [{ key: "userId", eq: NEVER_MATCH_VALUE }],
    order: [{ by: "updatedAt", dir: "desc" }],
    limit: 500,
  })

  const builds = useMemo<CompanionBuildRow[]>(() => {
    if (userId == null) return []
    return rows.map(mapBuildRow)
  }, [rows, userId])

  return {
    builds,
    isLoading: userId != null ? isLoading : false,
    isError: error !== null,
    error,
    retry: undefined,
  }
}

export function useCompanion(buildId: string) {
  const { userId } = useAuth()
  const { rows, isLoading, error } = usePagesSupabase({
    pageTypeSlug: COMPANION_BUILD_PAGE_TYPE_SLUG,
    where: [{ key: "id", eq: buildId }],
    limit: 1,
  })

  const runPatch = useOptimisticPatchPage((args) => patchPage(args))
  const runDelete = useOptimisticSoftDeletePage((args) => softDeletePage(args))

  const build = useMemo<CompanionBuildRow | undefined>(() => {
    const row = rows[0]
    if (!row) return undefined
    return mapBuildRow(row)
  }, [rows])

  const updateBuild = async (buildHash: string, buildMetadata: CompanionBuildMetadata) => {
    await runPatch({
      pageTypeSlug: COMPANION_BUILD_PAGE_TYPE_SLUG,
      where: [{ key: "id", eq: buildId }],
      set: {
        buildHash,
        buildMetadata: buildMetadataToJson(buildMetadata),
      },
    })
  }

  const updateMeta = async (meta: {
    name?: string
    description?: string
    targetCount?: number
  }) => {
    if (!build) return
    const base: CompanionBuildMetadata = build.buildMetadata ?? { name: "", description: "" }
    const next: CompanionBuildMetadata = { ...base, ...meta }
    await runPatch({
      pageTypeSlug: COMPANION_BUILD_PAGE_TYPE_SLUG,
      where: [{ key: "id", eq: buildId }],
      set: { buildMetadata: buildMetadataToJson(next) },
    })
  }

  const deleteBuild = async () => {
    if (userId == null) throw new Error("Not authenticated")
    await runDelete({
      pageTypeSlug: COMPANION_BUILD_PAGE_TYPE_SLUG,
      where: [{ key: "id", eq: buildId }],
    })
  }

  const setVisibility = async (visibility: Exclude<CompanionVisibility, "live" | "target">) => {
    await runPatch({
      pageTypeSlug: COMPANION_BUILD_PAGE_TYPE_SLUG,
      where: [{ key: "id", eq: buildId }],
      set: { visibility },
    })
  }

  return {
    build,
    buildHash: build?.buildHash ?? null,
    buildMetadata: build?.buildMetadata ?? null,
    updateBuild,
    updateMeta,
    deleteBuild,
    setVisibility,
    isLoading,
    isError: error !== null,
    error,
    retry: undefined,
  }
}

export function useCompanionLifecycle() {
  const { userId } = useAuth()
  const runCreate = useOptimisticCreatePage((args) => createPage(args))
  const runPatch = useOptimisticPatchPage((args) => patchPage(args))

  const createNew = async (args: {
    id: string
    userId: string
    buildHash: string
    buildMetadata: CompanionBuildMetadata
    encodedBuild?: string
  }) => {
    await runCreate({
      id: args.id,
      pageTypeSlug: COMPANION_BUILD_PAGE_TYPE_SLUG,
      properties: {
        userId: args.userId,
        accountPage: args.userId,
        buildHash: args.buildHash,
        buildMetadata: buildMetadataToJson(args.buildMetadata),
        visibility: "private",
        correlationId: args.id,
      },
    })
  }

  const remix = async (args: {
    sourceId: string
    newId: string
    newBuildHash: string
    newBuildMetadata: CompanionBuildMetadata
  }) => {
    if (userId == null) throw new Error("Not authenticated")
    await runCreate({
      id: args.newId,
      pageTypeSlug: COMPANION_BUILD_PAGE_TYPE_SLUG,
      properties: {
        userId,
        accountPage: userId,
        buildHash: args.newBuildHash,
        buildMetadata: buildMetadataToJson(args.newBuildMetadata),
        visibility: "private",
        correlationId: args.newId,
      },
    })
  }

  const importFromHash = async (args: {
    id: string
    buildHash: string
    buildMetadata: CompanionBuildMetadata
    companionId?: string
    entityId?: string
    liveBuildId?: string
    targetBuildId?: string
    newTargetId?: string
  }) => {
    if (userId == null) throw new Error("Not authenticated")
    const created = await runCreate({
      pageTypeSlug: COMPANION_BUILD_PAGE_TYPE_SLUG,
      properties: {
        userId,
        accountPage: userId,
        buildHash: args.buildHash,
        buildMetadata: buildMetadataToJson(args.buildMetadata),
        visibility: "live",
        correlationId: args.id,
      },
    })
    const newBuildId = typeof created.id === "string" ? created.id : args.id
    if (args.companionId != null) {
      await runPatch({
        pageTypeSlug: "temper-companion-progress",
        where: [
          { key: "accountPage", eq: userId },
          { key: "companionId", eq: args.companionId },
        ],
        set: { liveBuildId: newBuildId },
      })
    }
  }

  const createTargetBuild = async (args: {
    entityId: string
    newBuildId: string
    buildHash: string
    buildMetadata: CompanionBuildMetadata
  }) => {
    if (userId == null) throw new Error("Not authenticated")
    await runCreate({
      pageTypeSlug: COMPANION_BUILD_PAGE_TYPE_SLUG,
      properties: {
        userId,
        accountPage: userId,
        buildHash: args.buildHash,
        buildMetadata: buildMetadataToJson(args.buildMetadata),
        visibility: "target",
        correlationId: args.newBuildId,
      },
    })
  }

  const setTarget = async (args: {
    entityId: string
    companionId: string
    newBuildId?: string
    buildHash: string
    buildMetadata: CompanionBuildMetadata
    updateExistingTargetId?: string
  }) => {
    if (userId == null) throw new Error("Not authenticated")
    let targetBuildId = args.updateExistingTargetId ?? args.newBuildId
    if (args.updateExistingTargetId != null) {
      await runPatch({
        pageTypeSlug: COMPANION_BUILD_PAGE_TYPE_SLUG,
        where: [{ key: "id", eq: args.updateExistingTargetId }],
        set: {
          buildHash: args.buildHash,
          buildMetadata: buildMetadataToJson(args.buildMetadata),
        },
      })
    } else if (args.newBuildId != null) {
      const created = await runCreate({
        pageTypeSlug: COMPANION_BUILD_PAGE_TYPE_SLUG,
        properties: {
          userId,
          accountPage: userId,
          buildHash: args.buildHash,
          buildMetadata: buildMetadataToJson(args.buildMetadata),
          visibility: "target",
          correlationId: args.newBuildId,
        },
      })
      targetBuildId = typeof created.id === "string" ? created.id : args.newBuildId
    }
    if (targetBuildId != null) {
      await runPatch({
        pageTypeSlug: "temper-companion-progress",
        where: [
          { key: "accountPage", eq: userId },
          { key: "companionId", eq: args.companionId },
        ],
        set: { targetBuildId },
      })
    }
  }

  return {
    createNew,
    remix,
    importFromHash,
    createTargetBuild,
    setTarget,
  }
}

export function useAllCompanionList(userId: string | null) {
  const userRead = usePagesSupabase({
    pageTypeSlug: COMPANION_BUILD_PAGE_TYPE_SLUG,
    where:
      userId != null ? [{ key: "userId", eq: userId }] : [{ key: "userId", eq: NEVER_MATCH_VALUE }],
    order: [{ by: "updatedAt", dir: "desc" }],
    limit: 500,
  })
  const publicRead = usePagesSupabase({
    pageTypeSlug: COMPANION_BUILD_PAGE_TYPE_SLUG,
    where: [{ key: "visibility", eq: "public" }],
    order: [{ by: "updatedAt", dir: "desc" }],
    limit: 500,
  })

  const isLoading = userRead.isLoading || publicRead.isLoading

  const userBuilds = userRead.rows.map(mapBuildRow)
  const publicBuilds = publicRead.rows.map(mapBuildRow)
  const userBuildIds = new Set(userBuilds.map((b) => b.id))
  const merged = [...userBuilds, ...publicBuilds.filter((b) => !userBuildIds.has(b.id))]
  return { builds: merged, isLoading }
}
