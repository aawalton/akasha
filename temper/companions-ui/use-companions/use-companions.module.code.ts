"use client"

import { deletePage } from "akasha/pages/access/deleting/deleting.module.code.ts"
import { createPage } from "akasha/pages/access/modules/create/create.module.code.ts"
import { patchPage } from "akasha/pages/access/patch/patch.module.code.ts"
import { NEVER_MATCH_VALUE } from "akasha/pages/access/sentinels/sentinels.module.code.ts"
import { usePagesUIRouter } from "akasha/pages/ui/navigation-context/navigation-context.module.code.tsx"
import { useOptimisticCreatePage } from "akasha/pages/ui/supabase/mutations/use-optimistic-create-page/use-optimistic-create-page.module.code.ts"
import { useOptimisticDeletePage } from "akasha/pages/ui/supabase/mutations/use-optimistic-delete-page/use-optimistic-delete-page.module.code.ts"
import { useOptimisticPatchPage } from "akasha/pages/ui/supabase/mutations/use-optimistic-patch-page/use-optimistic-patch-page.module.code.ts"
import { usePages } from "akasha/pages/ui/supabase/use-pages/use-pages.module.code.ts"
import { useUserId } from "akasha/pages/ui/use-user-id/use-user-id.module.code.tsx"
import {
  type CompanionBuildMetadata,
  extractCompanionMetadata,
} from "akasha/temper/build-metadata/modules/build-metadata/build-metadata.module.code.ts"
import {
  type BuildRow,
  mapBuildRow,
} from "akasha/temper/build-support/modules/build-row/build-row.module.code.ts"
import { companionUrl } from "akasha/temper/build-support/modules/build-url/build-url.module.code.ts"
import type { SettableBuildVisibility } from "akasha/temper/build-support/modules/build-visibility/build-visibility.module.code.ts"
import { encodeCompanion } from "akasha/temper/companion-codec/modules/companion-codec/companion-codec.module.code.ts"
import {
  type CompanionBaseRoleId,
  companionBaseRoles,
} from "akasha/temper/companions-core/modules/companion-base-roles/companion-base-roles.module.code.ts"
import { createNewCompanion } from "akasha/temper/companions-core/modules/companion-factory/companion-factory.module.code.ts"
import {
  type CompanionRoleId,
  companionRoles,
} from "akasha/temper/companions-core/modules/companion-roles/companion-roles.module.code.ts"
import { buildId as toBuildId } from "akasha/temper/formula-framework/modules/branded-id/branded-id.module.code.ts"
import type { Json } from "akasha/utils/narrow/json-value/json-value.module.code.ts"
import { useMemo, useState } from "react"
import { toast } from "sonner"

const COMPANION_BUILD_PAGE_TYPE_SLUG = "companion-build"

export type CompanionBuildRow = BuildRow<CompanionBuildMetadata>

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
  const userId = useUserId()
  const { rows, isLoading, error } = usePages({
    pageTypeSlug: COMPANION_BUILD_PAGE_TYPE_SLUG,
    where:
      userId != null
        ? [{ key: "accountPage", eq: userId }]
        : [{ key: "accountPage", eq: NEVER_MATCH_VALUE }],
    order: [{ by: "updatedAt", dir: "desc" }],
    limit: 500,
  })

  const builds = useMemo<CompanionBuildRow[]>(() => {
    if (userId == null) return []
    return rows.map((row) => mapBuildRow(row, parseBuildMetadata))
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
  const userId = useUserId()
  const { rows, isLoading, error } = usePages({
    pageTypeSlug: COMPANION_BUILD_PAGE_TYPE_SLUG,
    where: [{ key: "id", eq: buildId }],
    limit: 1,
  })

  const runPatch = useOptimisticPatchPage((args) => patchPage(args))
  const runDelete = useOptimisticDeletePage((args) => deletePage(args))

  const build = useMemo<CompanionBuildRow | undefined>(() => {
    const row = rows[0]
    if (!row) return undefined
    return mapBuildRow(row, parseBuildMetadata)
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

  const setVisibility = async (visibility: SettableBuildVisibility) => {
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
  const userId = useUserId()
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

export function useNewCompanion() {
  const [isCreating, setIsCreating] = useState(false)
  const router = usePagesUIRouter()
  const userId = useUserId()
  const { createNew } = useCompanionLifecycle()

  const handleCreate = async () => {
    if (userId == null) return
    setIsCreating(true)
    try {
      const build = createNewCompanion()
      const buildHash = encodeCompanion(build)
      const buildMetadata = extractCompanionMetadata(build)
      const id = crypto.randomUUID()
      await createNew({ id, userId, buildHash, buildMetadata })
      router.push(`${companionUrl(toBuildId(id), build.name)}?tab=companion`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create companion")
      setIsCreating(false)
    }
  }

  return { isCreating, handleCreate }
}

export function useAllCompanionList(userId: string | null) {
  const userRead = usePages({
    pageTypeSlug: COMPANION_BUILD_PAGE_TYPE_SLUG,
    where:
      userId != null
        ? [{ key: "accountPage", eq: userId }]
        : [{ key: "accountPage", eq: NEVER_MATCH_VALUE }],
    order: [{ by: "updatedAt", dir: "desc" }],
    limit: 500,
  })
  const publicRead = usePages({
    pageTypeSlug: COMPANION_BUILD_PAGE_TYPE_SLUG,
    where: [{ key: "visibility", eq: "public" }],
    order: [{ by: "updatedAt", dir: "desc" }],
    limit: 500,
  })

  const isLoading = userRead.isLoading || publicRead.isLoading

  const userBuilds = userRead.rows.map((row) => mapBuildRow(row, parseBuildMetadata))
  const publicBuilds = publicRead.rows.map((row) => mapBuildRow(row, parseBuildMetadata))
  const userBuildIds = new Set(userBuilds.map((b) => b.id))
  const merged = [...userBuilds, ...publicBuilds.filter((b) => !userBuildIds.has(b.id))]
  return { builds: merged, isLoading }
}
