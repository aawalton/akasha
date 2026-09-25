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
import { encodeBuild } from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import {
  type BuildRow,
  mapBuildRow,
} from "akasha/temper/player/character/build/build-support/modules/build-row/build-row.module.code.ts"
import { buildSlug } from "akasha/temper/player/character/build/build-support/modules/build-slug/build-slug.module.code.ts"
import { characterUrl } from "akasha/temper/player/character/build/build-support/modules/build-url/build-url.module.code.ts"
import type { SettableBuildVisibility } from "akasha/temper/player/character/build/build-support/modules/build-visibility/build-visibility.module.code.ts"
import { createNewCharacter } from "akasha/temper/player/character/build/modules/build-factory/build-factory.module.code.ts"
import { buildId as toBuildId } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import {
  type RoleId,
  characterRoles as roles,
} from "akasha/temper/player/character/source/modules/character-roles/character-roles.module.code.ts"
import {
  type CharacterBuildMetadata,
  extractCharacterMetadata,
} from "akasha/temper/web/modules/build-metadata/build-metadata.module.code.ts"
import {
  buildAddressOf,
  buildVersionPageTypeOf,
} from "akasha/temper/web/modules/build-version-page-type/build-version-page-type.module.code.ts"
import {
  ownerOf,
  useAccountAddress,
} from "akasha/temper/web/modules/use-account-address/use-account-address.module.code.ts"
import { useMemo, useState } from "react"
import { toast } from "sonner"

const CHARACTER_BUILD_PAGE_TYPE_SLUG = "character-build"

export type CharacterBuildRow = BuildRow<CharacterBuildMetadata>

function buildMetadataOf(row: Record<string, unknown>): CharacterBuildMetadata {
  const validRoleIds = new Set<string>(roles.ids)
  const validatedRoles = Array.isArray(row.roles)
    ? row.roles.filter((r): r is RoleId => typeof r === "string" && validRoleIds.has(r))
    : undefined
  return {
    name: parseString(row.title),
    description: parseString(row.description),
    characterName: parseString(row.characterName),
    ...(validatedRoles ? { baseRoles: validatedRoles } : {}),
    ...(typeof row.targetCount === "number" ? { targetCount: row.targetCount } : {}),
  }
}

function buildMetadataProperties(meta: CharacterBuildMetadata): Record<string, Json> {
  return {
    title: meta.name,
    description: meta.description,
    characterName: meta.characterName,
    ...(meta.baseRoles ? { roles: [...meta.baseRoles] } : {}),
    ...(meta.targetCount != null ? { targetCount: meta.targetCount } : {}),
  }
}

export function useCharacterList() {
  const userId = useUserId()
  const account = useAccountAddress(userId)
  const { rows, isLoading, error } = usePages({
    pageTypeSlug: CHARACTER_BUILD_PAGE_TYPE_SLUG,
    where:
      account.address != null
        ? [{ key: "accountPage", eq: account.address }]
        : [{ key: "accountPage", eq: NEVER_MATCH_VALUE }],
    order: [{ by: "updatedAt", dir: "desc" }],
    limit: 500,
  })

  const builds = useMemo<CharacterBuildRow[]>(() => {
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

export function useCharacter(buildId: string) {
  const userId = useUserId()
  const { rows, isLoading, error } = usePages({
    pageTypeSlug: CHARACTER_BUILD_PAGE_TYPE_SLUG,
    where: [{ key: "id", eq: buildId }],
    limit: 1,
  })

  const runPatch = useOptimisticPatchPage((args) => patchPage(args))
  const runDelete = useOptimisticDeletePage((args) => deletePage(args))

  const build = useMemo<CharacterBuildRow | undefined>(() => {
    const row = rows[0]
    if (!row) return undefined
    return mapBuildRow(row, buildMetadataOf)
  }, [rows])

  const buildSlug = typeof rows[0]?.slug === "string" ? rows[0].slug : null

  const updateBuild = async (buildHash: string, buildMetadata: CharacterBuildMetadata) => {
    await runPatch({
      pageTypeSlug: CHARACTER_BUILD_PAGE_TYPE_SLUG,
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
    characterName?: string
    targetCount?: number
  }) => {
    if (!build) return
    const base: CharacterBuildMetadata = build.buildMetadata ?? {
      name: "",
      description: "",
      characterName: "",
    }
    const next: CharacterBuildMetadata = { ...base, ...meta }
    await runPatch({
      pageTypeSlug: CHARACTER_BUILD_PAGE_TYPE_SLUG,
      where: [{ key: "id", eq: buildId }],
      set: buildMetadataProperties(next),
    })
  }

  const deleteBuild = async () => {
    if (userId == null) throw new Error("Not authenticated")
    if (buildSlug == null) throw new Error("The build is not read yet")
    await deletePages({
      pageTypeSlug: buildVersionPageTypeOf(CHARACTER_BUILD_PAGE_TYPE_SLUG),
      where: [{ key: "build", eq: buildAddressOf(CHARACTER_BUILD_PAGE_TYPE_SLUG, buildSlug) }],
    })
    await runDelete({
      pageTypeSlug: CHARACTER_BUILD_PAGE_TYPE_SLUG,
      where: [{ key: "id", eq: buildId }],
    })
  }

  const setVisibility = async (visibility: SettableBuildVisibility) => {
    await runPatch({
      pageTypeSlug: CHARACTER_BUILD_PAGE_TYPE_SLUG,
      where: [{ key: "id", eq: buildId }],
      set: { visibility },
    })
  }

  return {
    build,
    buildSlug,
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

export function useCharacterLifecycle() {
  const userId = useUserId()
  const account = useAccountAddress(userId)
  const runCreate = useOptimisticCreatePage((args) => createPage(args))
  const runPatch = useOptimisticPatchPage((args) => patchPage(args))

  const createNew = async (args: {
    id: string
    buildHash: string
    buildMetadata: CharacterBuildMetadata
    encodedBuild?: string
  }) => {
    await runCreate({
      id: args.id,
      pageTypeSlug: CHARACTER_BUILD_PAGE_TYPE_SLUG,
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
    newBuildMetadata: CharacterBuildMetadata
  }) => {
    const accountPage = ownerOf(userId, account.address)
    await runCreate({
      id: args.newId,
      pageTypeSlug: CHARACTER_BUILD_PAGE_TYPE_SLUG,
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
    buildMetadata: CharacterBuildMetadata
    esoCharacterId?: string
    entityId?: string
    liveBuildId?: string
    targetBuildId?: string
    newTargetId?: string
  }) => {
    const accountPage = ownerOf(userId, account.address)
    const created = await runCreate({
      pageTypeSlug: CHARACTER_BUILD_PAGE_TYPE_SLUG,
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
    if (args.esoCharacterId != null) {
      await runPatch({
        pageTypeSlug: "temper-account-character",
        where: [
          { key: "accountPage", eq: accountPage },
          { key: "esoCharacterId", eq: args.esoCharacterId },
        ],
        set: { liveBuildId: newBuildId },
      })
    }
  }

  const createTargetBuild = async (args: {
    entityId: string
    newBuildId: string
    buildHash: string
    buildMetadata: CharacterBuildMetadata
  }) => {
    const accountPage = ownerOf(userId, account.address)
    await runCreate({
      pageTypeSlug: CHARACTER_BUILD_PAGE_TYPE_SLUG,
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
    esoCharacterId: string
    newBuildId?: string
    buildHash: string
    buildMetadata: CharacterBuildMetadata
    updateExistingTargetId?: string
  }) => {
    const accountPage = ownerOf(userId, account.address)
    let targetBuildId = args.updateExistingTargetId ?? args.newBuildId
    if (args.updateExistingTargetId != null) {
      await runPatch({
        pageTypeSlug: CHARACTER_BUILD_PAGE_TYPE_SLUG,
        where: [{ key: "id", eq: args.updateExistingTargetId }],
        set: {
          buildHash: args.buildHash,
          ...buildMetadataProperties(args.buildMetadata),
        },
      })
    } else if (args.newBuildId != null) {
      const created = await runCreate({
        pageTypeSlug: CHARACTER_BUILD_PAGE_TYPE_SLUG,
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
        pageTypeSlug: "temper-account-character",
        where: [
          { key: "accountPage", eq: accountPage },
          { key: "esoCharacterId", eq: args.esoCharacterId },
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

export function useNewCharacter() {
  const [isCreating, setIsCreating] = useState(false)
  const router = usePagesUIRouter()
  const userId = useUserId()
  const { createNew } = useCharacterLifecycle()

  const handleCreate = async () => {
    if (userId == null) return
    setIsCreating(true)
    try {
      const build = createNewCharacter()
      const buildHash = encodeBuild(build)
      const buildMetadata = extractCharacterMetadata(build)
      const id = uuidVersion7()
      await createNew({ id, buildHash, buildMetadata })
      router.push(`${characterUrl(toBuildId(id), build.name)}?tab=character`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create build")
      setIsCreating(false)
    }
  }

  return { isCreating, handleCreate }
}

export function useAllCharacterList(userId: string | null) {
  const account = useAccountAddress(userId)
  const userRead = usePages({
    pageTypeSlug: CHARACTER_BUILD_PAGE_TYPE_SLUG,
    where:
      account.address != null
        ? [{ key: "accountPage", eq: account.address }]
        : [{ key: "accountPage", eq: NEVER_MATCH_VALUE }],
    order: [{ by: "updatedAt", dir: "desc" }],
    limit: 500,
  })
  const publicRead = usePages({
    pageTypeSlug: CHARACTER_BUILD_PAGE_TYPE_SLUG,
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
