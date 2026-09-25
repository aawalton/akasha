import type { Json } from "akasha/code/type/narrowing/modules/json-value/json-value.module.code.ts"
import {
  type CreatePageArgs,
  createPage,
} from "akasha/page/access/modules/create/create.module.code.ts"
import { deletePageById } from "akasha/page/access/modules/deleting/deleting.module.code.ts"
import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import {
  type PatchPageArgs,
  patchPage,
} from "akasha/page/access/modules/patch/patch.module.code.ts"
import type { Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import type { CompanionState } from "akasha/temper/catalog/companion/companions-core/modules/companion-types/companion-types.module.code.ts"
import { companionValuesOf } from "akasha/temper/catalog/companion/temper-eso-companion/modules/companion-address/companion-address.module.code.ts"
import { buildSlug } from "akasha/temper/player/character/build/build-support/modules/build-slug/build-slug.module.code.ts"
import type {
  BuildHash,
  BuildId,
} from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { buildId as toBuildId } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { accountScopedSlug } from "akasha/temper/player/character/temper-account/modules/account-address/account-address.module.code.ts"
import { extractCompanionMetadata } from "akasha/temper/web/modules/build-metadata/build-metadata.module.code.ts"

const COMPANION_BUILD = "companion-build"

const COMPANION_PROGRESS = "temper-companion-progress"

export interface CompanionBuildPages {
  readonly get: typeof getPages
  readonly create: (args: CreatePageArgs) => Promise<Page>
  readonly patch: (args: PatchPageArgs) => Promise<Page | null>
  readonly remove: typeof deletePageById
}

const LIVE_COMPANION_BUILD_PAGES: CompanionBuildPages = {
  get: getPages,
  create: createPage,
  patch: patchPage,
  remove: deletePageById,
}

export interface FiledCompanionBuild {
  readonly buildId: BuildId
  readonly wrote: boolean
}

async function takenBack(buildId: string, pages: CompanionBuildPages): Promise<string> {
  try {
    await pages.remove({ pageTypeSlug: COMPANION_BUILD, id: buildId })
    return `; the build ${buildId} written before it was taken away`
  } catch (e) {
    const why = e instanceof Error ? e.message : String(e)
    return `; the build ${buildId} written before it is left behind, as taking it away failed: ${why}`
  }
}

async function firstIdOf(
  pages: CompanionBuildPages,
  where: readonly { key: string; eq: Json }[]
): Promise<string | undefined> {
  const { rows } = await pages.get({ pageTypeSlug: COMPANION_BUILD, where, limit: 1 })
  return rows[0]?.id
}

async function filedBefore(
  pages: CompanionBuildPages,
  slug: string,
  accountPage: string,
  hash: BuildHash
): Promise<string | undefined> {
  return (
    (await firstIdOf(pages, [{ key: "slug", eq: slug }])) ??
    (await firstIdOf(pages, [
      { key: "accountPage", eq: accountPage },
      { key: "buildHash", eq: hash },
    ]))
  )
}

async function liveHashOf(
  pages: CompanionBuildPages,
  liveBuildId: string
): Promise<Json | undefined> {
  const { rows } = await pages.get({
    pageTypeSlug: COMPANION_BUILD,
    where: [{ key: "id", eq: liveBuildId }],
    select: ["buildHash"],
    limit: 1,
  })
  return rows[0]?.buildHash
}

async function createBuild(
  pages: CompanionBuildPages,
  slug: string,
  accountPage: string,
  hash: BuildHash,
  build: CompanionState
): Promise<string> {
  const metadata = extractCompanionMetadata(build)
  const created = await pages.create({
    pageTypeSlug: COMPANION_BUILD,
    properties: {
      slug,
      accountPage,
      title: build.name,
      description: metadata.description,
      buildHash: hash,
      visibility: "live",
      ...(metadata.baseRoles ? { baseRoles: [...metadata.baseRoles] } : {}),
      ...(metadata.targetCount != null ? { targetCount: metadata.targetCount } : {}),
    },
  })
  return created.id
}

export async function fileLiveCompanionBuild(
  accountPage: string,
  hash: BuildHash,
  build: CompanionState,
  pages: CompanionBuildPages = LIVE_COMPANION_BUILD_PAGES
): Promise<FiledCompanionBuild> {
  const named = companionValuesOf(build.companion.id)
  const progressWhere = [
    { key: "accountPage", eq: accountPage },
    { key: "companionId", eq: named.companionId },
  ]
  const { rows: progress } = await pages.get({
    pageTypeSlug: COMPANION_PROGRESS,
    where: progressWhere,
    limit: 1,
  })
  const entity = progress[0]
  const liveBuildId = typeof entity?.liveBuildId === "string" ? entity.liveBuildId : undefined

  if (liveBuildId !== undefined && (await liveHashOf(pages, liveBuildId)) === hash) {
    return { buildId: toBuildId(liveBuildId), wrote: false }
  }

  const slug = buildSlug(build.name, `${accountPage}\n${hash}`)
  const existing = await filedBefore(pages, slug, accountPage, hash)
  if (existing !== undefined && existing === liveBuildId) {
    return { buildId: toBuildId(existing), wrote: false }
  }

  const buildId = existing ?? (await createBuild(pages, slug, accountPage, hash, build))
  try {
    if (entity) {
      await pages.patch({
        pageTypeSlug: COMPANION_PROGRESS,
        where: progressWhere,
        set: { liveBuildId: buildId },
      })
    } else {
      await pages.create({
        pageTypeSlug: COMPANION_PROGRESS,
        properties: {
          ...named,
          slug: accountScopedSlug(named.slug, accountPage),
          accountPage,
          liveBuildId: buildId,
        },
      })
    }
  } catch (e) {
    if (existing !== undefined) throw e
    const why = e instanceof Error ? e.message : "Unknown error"
    throw new Error(`${why}${await takenBack(buildId, pages)}`)
  }
  return { buildId: toBuildId(buildId), wrote: true }
}
