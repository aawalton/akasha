import { getPageByIdSuffix, getPages } from "@shared/pages-access/get"
import { PageDetailContent } from "@shared/pages-ui/components/page-detail-content"
import { ViewPageContent } from "@shared/pages-ui/components/view-page-content"
import { PageTypeSlug, parsePageHrefParam } from "@shared/pages-url"
import { getUser } from "@shared/supabase-rr/auth/server"
import { createServerClient } from "@shared/supabase-rr/server"
import type {
  CharacterBuildMetadata,
  CompanionBuildMetadata,
} from "@temper/game-characters/build-metadata"
import {
  applyCharacterMetadata,
  applyCompanionMetadata,
} from "@temper/game-characters/build-metadata"
import { createEmptyCharacter } from "@temper/game-characters-character/build-factory"
import type { CharacterState } from "@temper/game-characters-character/build-types"
import { toCharacterVisibility } from "@temper/game-characters-character/build-types"
import { setsAll } from "@temper/game-characters-equipment/sets/sets-all-data"
import { skills } from "@temper/game-characters-skills/skills-data"
import { decodeBuild, encodeBuild } from "@temper/game-codec/character/build-codec"
import { decodeCompanion, encodeCompanion } from "@temper/game-codec/companions/companion-codec"
import { createEmptyCompanion } from "@temper/game-companions-core/companion-factory"
import { toVisibility } from "@temper/game-companions-core/companion-types"
import { BuildHash, BuildId } from "@temper/shared-formula-framework/branded"
import { useEffect } from "react"
import { data, useSearchParams } from "react-router"
import { toast } from "sonner"
import { CharacterEditor } from "@/components/characters/character-editor"
import { CompanionEditor } from "@/components/companions/companion-editor"
import type { Route } from "./+types/$pageTypeSlug.$pageHrefParam"

const NAV_SLUG = "nav"

interface CharacterPageRow {
  id: string
  userId?: string
  buildHash?: string
  buildMetadata?: CharacterBuildMetadata
  visibility?: string
}

function asCharacterPageRow(row: unknown): CharacterPageRow {
  return row as CharacterPageRow
}

interface CompanionPageRow {
  id: string
  userId?: string
  buildHash?: string
  buildMetadata?: CompanionBuildMetadata
  visibility?: string
}

function asCompanionPageRow(row: unknown): CompanionPageRow {
  return row as CompanionPageRow
}

const EMPTY_CHARACTER_METADATA: CharacterBuildMetadata = {
  name: "",
  description: "",
  characterName: "",
}

const EMPTY_COMPANION_METADATA: CompanionBuildMetadata = {
  name: "",
  description: "",
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

  const brandedSlug = PageTypeSlug(pageTypeSlug)
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
  const metadata = r.buildMetadata
  let initialBuild: CharacterState
  let initialBuildHash = buildHash
  let decodeFailed = false
  if (buildHash !== "") {
    const decoded = decodeBuild(BuildHash(buildHash))
    if (decoded) {
      initialBuild = applyCharacterMetadata(decoded, metadata ?? EMPTY_CHARACTER_METADATA)
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
  const metadata = r.buildMetadata
  let initialBuild = createEmptyCompanion()
  let initialBuildHash = buildHash
  let decodeFailed = false
  if (buildHash !== "") {
    const decoded = decodeCompanion(BuildHash(buildHash))
    if (decoded) {
      initialBuild = applyCompanionMetadata(decoded, metadata ?? EMPTY_COMPANION_METADATA)
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
        buildId={BuildId(loaderData.buildId)}
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
        buildId={BuildId(loaderData.buildId)}
        initialTab={tab}
        initialBuild={loaderData.initialBuild}
        initialBuildHash={loaderData.initialBuildHash}
        isOwner={loaderData.isOwner}
        initialVisibility={loaderData.initialVisibility}
        isTargetBuild={loaderData.isTargetBuild}
      />
    )
  }

  const brandedSlug = PageTypeSlug(loaderData.pageTypeSlug)
  return <PageDetailContent pageTypeSlug={brandedSlug} id={loaderData.id} />
}
