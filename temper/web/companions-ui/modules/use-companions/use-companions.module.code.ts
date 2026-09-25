"use client"

import type { Json } from "akasha/code/type/narrowing/modules/json-value/json-value.module.code.ts"
import { parseString } from "akasha/code/type/narrowing/modules/parse-string/parse-string.module.code.ts"
import { createPage } from "akasha/page/access/modules/create/create.module.code.ts"
import {
  deletePage,
  deletePages,
} from "akasha/page/access/modules/deleting/deleting.module.code.ts"
import { patchPage } from "akasha/page/access/modules/patch/patch.module.code.ts"
import { NEVER_MATCH_VALUE } from "akasha/page/access/modules/sentinels/sentinels.module.code.ts"
import { uuidVersion7 } from "akasha/page/id/modules/uuid-version-7/uuid-version-7.module.code.ts"
import { usePagesUIRouter } from "akasha/page/ui/modules/navigation-context/navigation-context.module.code.tsx"
import { useUserId } from "akasha/page/ui/modules/use-user-id/use-user-id.module.code.tsx"
import { usePages } from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import { useOptimisticCreatePage } from "akasha/page/ui/supabase/mutation/modules/use-optimistic-create-page/use-optimistic-create-page.module.code.ts"
import { useOptimisticDeletePage } from "akasha/page/ui/supabase/mutation/modules/use-optimistic-delete-page/use-optimistic-delete-page.module.code.ts"
import { useOptimisticPatchPage } from "akasha/page/ui/supabase/mutation/modules/use-optimistic-patch-page/use-optimistic-patch-page.module.code.ts"
import {
  type CompanionBaseRoleId,
  companionBaseRoles,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-base-roles/companion-base-roles.module.code.ts"
import { createNewCompanion } from "akasha/temper/catalog/companion/companions-core/modules/companion-factory/companion-factory.module.code.ts"
import { companionAddressOf } from "akasha/temper/catalog/companion/temper-eso-companion/modules/companion-address/companion-address.module.code.ts"
import {
  type BuildRow,
  mapBuildRow,
} from "akasha/temper/player/character/build/build-support/modules/build-row/build-row.module.code.ts"
import { buildSlug } from "akasha/temper/player/character/build/build-support/modules/build-slug/build-slug.module.code.ts"
import { companionUrl } from "akasha/temper/player/character/build/build-support/modules/build-url/build-url.module.code.ts"
import type { SettableBuildVisibility } from "akasha/temper/player/character/build/build-support/modules/build-visibility/build-visibility.module.code.ts"
import { encodeCompanion } from "akasha/temper/player/character/build/companion-codec/modules/companion-codec/companion-codec.module.code.ts"
import { buildId as toBuildId } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import {
  type CompanionBuildMetadata,
  extractCompanionMetadata,
} from "akasha/temper/web/modules/build-metadata/build-metadata.module.code.ts"
import {
  ownerOf,
  useAccountAddress,
} from "akasha/temper/web/modules/use-account-address/use-account-address.module.code.ts"
import { useMemo, useState } from "react"
import { toast } from "sonner"

const COMPANION_BUILD_PAGE_TYPE_SLUG = "companion-build"

export type CompanionBuildRow = BuildRow<CompanionBuildMetadata>

const VALID_BASE_ROLE_IDS = new Set<string>(companionBaseRoles.ids)

function isCompanionBaseRoleId(value: unknown): value is CompanionBaseRoleId {
  return typeof value === "string" && VALID_BASE_ROLE_IDS.has(value)
}

function buildMetadataOf(row: Record<string, unknown>): CompanionBuildMetadata {
  const validatedBaseRoles = Array.isArray(row.baseRoles)
    ? row.baseRoles.filter(isCompanionBaseRoleId)
    : undefined
  return {
    name: parseString(row.title),
    description: parseString(row.description),
    ...(validatedBaseRoles != null ? { baseRoles: validatedBaseRoles } : {}),
    ...(typeof row.targetCount === "number" ? { targetCount: row.targetCount } : {}),
  }
}

function buildMetadataProperties(meta: CompanionBuildMetadata): Record<string, Json> {
  return {
    title: meta.name,
    description: meta.description,
    ...(meta.baseRoles != null ? { baseRoles: [...meta.baseRoles] } : {}),
    ...(meta.targetCount != null ? { targetCount: meta.targetCount } : {}),
  }
}

export function useCompanionList() {
  const userId = useUserId()
  const account = useAccountAddress(userId)
  const { rows, isLoading, error } = usePages({
    pageTypeSlug: COMPANION_BUILD_PAGE_TYPE_SLUG,
    where:
      account.address != null
        ? [{ key: "accountPage", eq: account.address }]
        : [{ key: "accountPage", eq: NEVER_MATCH_VALUE }],
    order: [{ by: "updatedAt", dir: "desc" }],
    limit: 500,
  })

  const builds = useMemo<CompanionBuildRow[]>(() => {
    if (userId == null) return []
    return rows.map((row) => mapBuildRow(row, buildMetadataOf))
  }, [rows, userId])

  return {
    builds,
    isLoading: userId != null ? account.isLoading || isLoading : false,
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
    return mapBuildRow(row, buildMetadataOf)
  }, [rows])

  const updateBuild = async (buildHash: string, buildMetadata: CompanionBuildMetadata) => {
    await runPatch({
      pageTypeSlug: COMPANION_BUILD_PAGE_TYPE_SLUG,
      where: [{ key: "id", eq: buildId }],
      set: {
        buildHash,
        ...buildMetadataProperties(buildMetadata),
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
      set: buildMetadataProperties(next),
    })
  }

  const deleteBuild = async () => {
    if (userId == null) throw new Error("Not authenticated")
    await runDelete({
      pageTypeSlug: COMPANION_BUILD_PAGE_TYPE_SLUG,
      where: [{ key: "id", eq: buildId }],
    })
    await deletePages({
      pageTypeSlug: "character-build-version",
      where: [{ key: "build", eq: buildId }],
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
  const account = useAccountAddress(userId)
  const runCreate = useOptimisticCreatePage((args) => createPage(args))
  const runPatch = useOptimisticPatchPage((args) => patchPage(args))

  const createNew = async (args: {
    id: string
    buildHash: string
    buildMetadata: CompanionBuildMetadata
    encodedBuild?: string
  }) => {
    await runCreate({
      id: args.id,
      pageTypeSlug: COMPANION_BUILD_PAGE_TYPE_SLUG,
      properties: {
        slug: buildSlug(args.buildMetadata.name, args.id),
        accountPage: ownerOf(userId, account.address),
        buildHash: args.buildHash,
        ...buildMetadataProperties(args.buildMetadata),
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
    const accountPage = ownerOf(userId, account.address)
    await runCreate({
      id: args.newId,
      pageTypeSlug: COMPANION_BUILD_PAGE_TYPE_SLUG,
      properties: {
        slug: buildSlug(args.newBuildMetadata.name, args.newId),
        accountPage,
        buildHash: args.newBuildHash,
        ...buildMetadataProperties(args.newBuildMetadata),
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
    const accountPage = ownerOf(userId, account.address)
    const created = await runCreate({
      pageTypeSlug: COMPANION_BUILD_PAGE_TYPE_SLUG,
      properties: {
        slug: buildSlug(args.buildMetadata.name, args.id),
        accountPage,
        buildHash: args.buildHash,
        ...buildMetadataProperties(args.buildMetadata),
        visibility: "live",
        correlationId: args.id,
      },
    })
    const newBuildId = typeof created.id === "string" ? created.id : args.id
    if (args.companionId != null) {
      await runPatch({
        pageTypeSlug: "temper-companion-progress",
        where: [
          { key: "accountPage", eq: accountPage },
          { key: "companionId", eq: companionAddressOf(args.companionId) },
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
    const accountPage = ownerOf(userId, account.address)
    await runCreate({
      pageTypeSlug: COMPANION_BUILD_PAGE_TYPE_SLUG,
      properties: {
        slug: buildSlug(args.buildMetadata.name, args.newBuildId),
        accountPage,
        buildHash: args.buildHash,
        ...buildMetadataProperties(args.buildMetadata),
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
    const accountPage = ownerOf(userId, account.address)
    let targetBuildId = args.updateExistingTargetId ?? args.newBuildId
    if (args.updateExistingTargetId != null) {
      await runPatch({
        pageTypeSlug: COMPANION_BUILD_PAGE_TYPE_SLUG,
        where: [{ key: "id", eq: args.updateExistingTargetId }],
        set: {
          buildHash: args.buildHash,
          ...buildMetadataProperties(args.buildMetadata),
        },
      })
    } else if (args.newBuildId != null) {
      const created = await runCreate({
        pageTypeSlug: COMPANION_BUILD_PAGE_TYPE_SLUG,
        properties: {
          slug: buildSlug(args.buildMetadata.name, args.newBuildId),
          accountPage,
          buildHash: args.buildHash,
          ...buildMetadataProperties(args.buildMetadata),
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
          { key: "accountPage", eq: accountPage },
          { key: "companionId", eq: companionAddressOf(args.companionId) },
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
      const id = uuidVersion7()
      await createNew({ id, buildHash, buildMetadata })
      router.push(`${companionUrl(toBuildId(id), build.name)}?tab=companion`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create companion")
      setIsCreating(false)
    }
  }

  return { isCreating, handleCreate }
}

export function useAllCompanionList(userId: string | null) {
  const account = useAccountAddress(userId)
  const userRead = usePages({
    pageTypeSlug: COMPANION_BUILD_PAGE_TYPE_SLUG,
    where:
      account.address != null
        ? [{ key: "accountPage", eq: account.address }]
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

  const isLoading = account.isLoading || userRead.isLoading || publicRead.isLoading

  const userBuilds = userRead.rows.map((row) => mapBuildRow(row, buildMetadataOf))
  const publicBuilds = publicRead.rows.map((row) => mapBuildRow(row, buildMetadataOf))
  const userBuildIds = new Set(userBuilds.map((b) => b.id))
  const merged = [...userBuilds, ...publicBuilds.filter((b) => !userBuildIds.has(b.id))]
  return { builds: merged, isLoading }
}
