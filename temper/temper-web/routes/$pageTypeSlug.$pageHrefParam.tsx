import { getPageByIdSuffix, getPages } from "@akasha/pages-access/get"
import { PageDetailContent } from "@akasha/pages-ui-components/page-detail-content"
import { ViewPageContent } from "@akasha/pages-ui-components/view-page-content"
import { parsePageHrefParam } from "@akasha/pages-url/page-href"
import { toPageTypeSlug } from "@akasha/pages-url/page-type-slug"
import { getUser } from "@akasha/supabase-rr/auth-server"
import { createServerClient } from "@akasha/supabase-rr/server-client"
import { decodeBuild, encodeBuild } from "@akasha/temper-build-codec/build-codec"
import type {
  CharacterBuildMetadata,
  CompanionBuildMetadata,
} from "@akasha/temper-build-metadata/build-metadata"
import {
  applyCharacterMetadata,
  applyCompanionMetadata,
} from "@akasha/temper-build-metadata/build-metadata"
import { createEmptyCharacter } from "@akasha/temper-character-build/build-factory"
import type { CharacterState } from "@akasha/temper-character-build/build-types"
import { toCharacterVisibility } from "@akasha/temper-character-build/build-types"
import { skills } from "@akasha/temper-character-skills/character-skills"
import { setsAll } from "@akasha/temper-characters-equipment/sets-all"
import { decodeCompanion, encodeCompanion } from "@akasha/temper-companion-codec/companion-codec"
import { createEmptyCompanion } from "@akasha/temper-companions-core/companion-factory"
import { toVisibility } from "@akasha/temper-companions-core/companion-types"
import {
  buildHash as toBuildHash,
  buildId as toBuildId,
} from "@akasha/temper-formula-framework/branded-id"
import { useEffect } from "react"
import { data, useSearchParams } from "react-router"
import { toast } from "sonner"
import { CharacterEditor } from "../character-editor/character-editor.module.code.tsx"
import { CompanionEditor } from "../companion-editor/companion-editor.module.code.tsx"
import type { Route } from "./+types/$pageTypeSlug.$pageHrefParam"

const NAV_SLUG = "nav"

interface CharacterPageRow {
  id: string
  userId?: string
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
  userId?: string
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
    return data(
      {
        kind: "nav" as const,
        pageTypeSlug,
        pageHrefParam,
        faviconIdSuffix: parsed.idSuffix,
      },
      { headers: new Headers() }
    )
  }

  const brandedSlug = toPageTypeSlug(pageTypeSlug)
  const { headers } = createServerClient(request)
  const page = await getPageByIdSuffix({
    pageTypeSlug: brandedSlug,
    idSuffix: parsed.idSuffix,
    slug: parsed.slug ?? undefined,
  })
  if (!page || typeof page.id !== "string") {
    throw new Response("Not Found", { status: 404 })
  }

  if (pageTypeSlug === "character-build") {
    const characterData = await loadCharacterDetail(page, request)
    for (const [k, v] of characterData.headers) {
      if (k.toLowerCase() === "set-cookie") headers.append("set-cookie", v)
    }
    return data(
      {
        kind: "character" as const,
        pageTypeSlug,
        faviconIdSuffix: null,
        ...characterData.body,
      },
      { headers }
    )
  }
  if (pageTypeSlug === "companion-build") {
    const companionData = await loadCompanionDetail(page, request)
    for (const [k, v] of companionData.headers) {
      if (k.toLowerCase() === "set-cookie") headers.append("set-cookie", v)
    }
    return data(
      {
        kind: "companion" as const,
        pageTypeSlug,
        faviconIdSuffix: null,
        ...companionData.body,
      },
      { headers }
    )
  }

  return data(
    {
      kind: "detail" as const,
      pageTypeSlug,
      id: page.id,
      faviconIdSuffix: null,
    },
    { headers }
  )
}

async function loadCharacterDetail(page: Record<string, unknown>, request: Request) {
  const r = asCharacterPageRow(page)
  const buildId = r.id
  const { user, headers } = await getUser(request)

  const buildUserId = r.userId ?? ""
  const isOwner = user !== null && user.id === buildUserId

  let isTargetBuild = false
  if (user) {
    const { rows } = await getPages({
      pageTypeSlug: "temper-account-character",
      where: [
        { key: "userId", eq: user.id },
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
    body: {
      buildId,
      initialBuild,
      initialBuildHash,
      isOwner,
      initialVisibility: toCharacterVisibility(visibility),
      isTargetBuild,
      decodeFailed,
    },
    headers,
  }
}

async function loadCompanionDetail(page: Record<string, unknown>, request: Request) {
  const r = asCompanionPageRow(page)
  const buildId = r.id
  const { user, headers } = await getUser(request)

  const buildUserId = r.userId ?? ""
  const isOwner = user !== null && buildUserId === user.id

  let isTargetBuild = false
  if (user) {
    const { rows } = await getPages({
      pageTypeSlug: "temper-companion-progress",
      where: [
        { key: "userId", eq: user.id },
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
    body: {
      buildId,
      initialBuild,
      initialBuildHash,
      isOwner,
      initialVisibility: toVisibility(visibility),
      isTargetBuild,
      decodeFailed,
    },
    headers,
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
