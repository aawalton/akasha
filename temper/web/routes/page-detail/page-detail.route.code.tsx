import { signedInAs } from "akasha/alan/harness/handover-rr/modules/handover-session/handover-session.module.code.ts"
import { getPageByIdSuffix, getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import { PageDetailContent } from "akasha/page/ui/component/modules/page-detail-content/page-detail-content.module.code.tsx"
import { ViewPageContent } from "akasha/page/ui/component/modules/view-page-content/view-page-content.module.code.tsx"
import { parsePageHrefParam } from "akasha/page/url/modules/page-href/page-href.module.code.ts"
import { toPageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import { accountOfContributor } from "akasha/person/modules/enrolment/person-enrolment.module.code.ts"
import { loadCompanionCatalog } from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog-loading/companion-catalog-loading.module.code.ts"
import { createEmptyCompanion } from "akasha/temper/catalog/companion/companions-core/modules/companion-factory/companion-factory.module.code.ts"
import {
  decodeBuild,
  encodeBuild,
} from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import { toBuildVisibility } from "akasha/temper/player/character/build/build-support/modules/build-visibility/build-visibility.module.code.ts"
import {
  decodeCompanion,
  encodeCompanion,
} from "akasha/temper/player/character/build/companion-codec/modules/companion-codec/companion-codec.module.code.ts"
import { createEmptyCharacter } from "akasha/temper/player/character/build/modules/build-factory/build-factory.module.code.ts"
import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import { setsAll } from "akasha/temper/player/character/characters-equipment/modules/sets-all/sets-all.module.code.ts"
import {
  buildHash as toBuildHash,
  buildId as toBuildId,
} from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { skills } from "akasha/temper/player/character/skill/modules/character-skills/character-skills.module.code.ts"
import { findAccountAddress } from "akasha/temper/player/character/temper-account/modules/account-address/account-address.module.code.ts"
import type {
  CharacterBuildMetadata,
  CompanionBuildMetadata,
} from "akasha/temper/web/modules/build-metadata/build-metadata.module.code.ts"
import {
  applyCharacterMetadata,
  applyCompanionMetadata,
} from "akasha/temper/web/modules/build-metadata/build-metadata.module.code.ts"
import { CharacterEditor } from "akasha/temper/web/modules/character-editor/character-editor.module.code.tsx"
import { CompanionEditor } from "akasha/temper/web/modules/companion-editor/companion-editor.module.code.tsx"
import { TEMPER_SITE } from "akasha/temper/web/modules/temper-handover-site/temper-handover-site.module.code.ts"
import { useEffect } from "react"
import { data, useSearchParams } from "react-router"
import { toast } from "sonner"
import type { Route } from "./+types/page-detail.route.code"

const NAV_SLUG = "nav"

interface CharacterPageRow {
  id: string
  accountPage?: string
  buildHash?: string
  title?: string
  description?: string
  targetCount?: number
  visibility?: string
}

function asCharacterPageRow(row: unknown): CharacterPageRow {
  return row as CharacterPageRow
}

interface CompanionPageRow {
  id: string
  accountPage?: string
  buildHash?: string
  title?: string
  description?: string
  targetCount?: number
  baseRoles?: CompanionBuildMetadata["baseRoles"]
  visibility?: string
}

function asCompanionPageRow(row: unknown): CompanionPageRow {
  return row as CompanionPageRow
}

export function meta({ data: loaderData }: Route.MetaArgs) {
  if (loaderData == null || loaderData.faviconIdSuffix == null) return []
  return [
    {
      tagName: "link",
      rel: "icon",
      href: `/api/nav-icon/${loaderData.faviconIdSuffix}`,
      type: "image/svg+xml",
      sizes: "any",
    },
  ]
}

export async function loader({ params, request }: Route.LoaderArgs) {
  const { pageTypeSlug, pageHrefParam } = params

  const parsed = parsePageHrefParam(pageHrefParam)
  if (!parsed) {
    throw new Response("Not Found", { status: 404 })
  }

  if (pageTypeSlug === NAV_SLUG) {
    return data({
      kind: "nav" as const,
      pageTypeSlug,
      pageHrefParam,
      faviconIdSuffix: parsed.idSuffix,
    })
  }

  const brandedSlug = toPageTypeSlug(pageTypeSlug)
  const page = await getPageByIdSuffix({
    pageTypeSlug: brandedSlug,
    idSuffix: parsed.idSuffix,
    slug: parsed.slug ?? undefined,
  })
  if (!page || typeof page.id !== "string") {
    throw new Response("Not Found", { status: 404 })
  }

  if (pageTypeSlug === "character-build") {
    return data({
      kind: "character" as const,
      pageTypeSlug,
      faviconIdSuffix: null,
      ...(await loadCharacterDetail(page, request)),
    })
  }
  if (pageTypeSlug === "companion-build") {
    return data({
      kind: "companion" as const,
      pageTypeSlug,
      faviconIdSuffix: null,
      ...(await loadCompanionDetail(page, request)),
    })
  }

  return data({
    kind: "detail" as const,
    pageTypeSlug,
    id: page.id,
    faviconIdSuffix: null,
  })
}

async function readerAccountPage(request: Request): Promise<string | null> {
  const reader = await signedInAs(TEMPER_SITE, request)
  if (reader === null) return null
  const reached = await accountOfContributor(reader)
  return reached.ok && reached.account !== null ? findAccountAddress(reached.account) : null
}

async function loadCharacterDetail(page: Record<string, unknown>, request: Request) {
  const r = asCharacterPageRow(page)
  const buildId = r.id
  const accountPage = await readerAccountPage(request)

  const buildAccount = r.accountPage ?? ""
  const isOwner = accountPage !== null && accountPage === buildAccount

  let isTargetBuild = false
  if (accountPage !== null) {
    const { rows } = await getPages({
      pageTypeSlug: "temper-account-character",
      where: [
        { key: "accountPage", eq: accountPage },
        { key: "targetBuildId", eq: buildId },
      ],
      select: ["id"],
      limit: 1,
    })
    isTargetBuild = rows.length > 0
  }

  const buildHash = r.buildHash ?? ""
  let initialBuild: CharacterState
  let initialBuildHash = buildHash
  let decodeFailed = false
  if (buildHash !== "") {
    const decoded = decodeBuild(toBuildHash(buildHash))
    if (decoded) {
      const metadata: CharacterBuildMetadata = {
        name: r.title ?? decoded.name,
        description: r.description ?? decoded.description,
        characterName: decoded.character.name,
        ...(typeof r.targetCount === "number" ? { targetCount: r.targetCount } : {}),
      }
      initialBuild = applyCharacterMetadata(decoded, metadata)
    } else {
      initialBuild = createEmptyCharacter()
      initialBuildHash = encodeBuild(initialBuild)
      decodeFailed = true
    }
  } else {
    initialBuild = createEmptyCharacter()
  }

  const visibility = r.visibility ?? "private"

  return {
    buildId,
    initialBuild,
    initialBuildHash,
    isOwner,
    initialVisibility: toBuildVisibility(visibility),
    isTargetBuild,
    decodeFailed,
  }
}

async function loadCompanionDetail(page: Record<string, unknown>, request: Request) {
  await loadCompanionCatalog()
  const r = asCompanionPageRow(page)
  const buildId = r.id
  const accountPage = await readerAccountPage(request)

  const buildAccount = r.accountPage ?? ""
  const isOwner = accountPage !== null && buildAccount === accountPage

  let isTargetBuild = false
  if (accountPage !== null) {
    const { rows } = await getPages({
      pageTypeSlug: "temper-companion-progress",
      where: [
        { key: "accountPage", eq: accountPage },
        { key: "targetBuildId", eq: buildId },
      ],
      select: ["id"],
      limit: 1,
    })
    isTargetBuild = rows.length > 0
  }

  const buildHash = r.buildHash ?? ""
  let initialBuild = createEmptyCompanion()
  let initialBuildHash = buildHash
  let decodeFailed = false
  if (buildHash !== "") {
    const decoded = decodeCompanion(toBuildHash(buildHash))
    if (decoded) {
      const metadata: CompanionBuildMetadata = {
        name: r.title ?? decoded.name,
        description: r.description ?? decoded.description,
        ...(r.baseRoles ? { baseRoles: r.baseRoles } : {}),
        ...(typeof r.targetCount === "number" ? { targetCount: r.targetCount } : {}),
      }
      initialBuild = applyCompanionMetadata(decoded, metadata)
    } else {
      initialBuildHash = encodeCompanion(initialBuild)
      decodeFailed = true
    }
  }

  const visibility = r.visibility ?? "private"

  return {
    buildId,
    initialBuild,
    initialBuildHash,
    isOwner,
    initialVisibility: toBuildVisibility(visibility),
    isTargetBuild,
    decodeFailed,
  }
}

export default function PageDetailRoute({ loaderData }: Route.ComponentProps) {
  const [searchParams] = useSearchParams()
  const tab = searchParams.get("tab") ?? undefined

  const decodeFailed =
    (loaderData.kind === "character" && loaderData.decodeFailed) ||
    (loaderData.kind === "companion" && loaderData.decodeFailed)
  useEffect(() => {
    if (decodeFailed) {
      toast.error("This build couldn't be loaded — it may use an unsupported or outdated format.")
    }
  }, [decodeFailed])

  if (loaderData.kind === "nav") {
    return <ViewPageContent navItemIdParam={loaderData.pageHrefParam} />
  }

  if (loaderData.kind === "character") {
    return (
      <CharacterEditor
        buildId={toBuildId(loaderData.buildId)}
        initialTab={tab}
        initialBuild={loaderData.initialBuild}
        initialBuildHash={loaderData.initialBuildHash}
        isOwner={loaderData.isOwner}
        initialVisibility={loaderData.initialVisibility}
        isTargetBuild={loaderData.isTargetBuild}
        availableSkills={skills.list}
        availableSets={setsAll.list}
      />
    )
  }

  if (loaderData.kind === "companion") {
    return (
      <CompanionEditor
        buildId={toBuildId(loaderData.buildId)}
        initialTab={tab}
        initialBuild={loaderData.initialBuild}
        initialBuildHash={loaderData.initialBuildHash}
        isOwner={loaderData.isOwner}
        initialVisibility={loaderData.initialVisibility}
        isTargetBuild={loaderData.isTargetBuild}
      />
    )
  }

  const brandedSlug = toPageTypeSlug(loaderData.pageTypeSlug)
  return <PageDetailContent pageTypeSlug={brandedSlug} id={loaderData.id} />
}
