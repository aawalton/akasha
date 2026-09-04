import { getPageTypeByPluralSlug } from "@akasha/pages-access/page-type"
import { PagesFilteredContent } from "@akasha/pages-ui-components/pages-by-relation-content"
import { toPageTypeSlug } from "@akasha/pages-url/page-type-slug"
import { getUser } from "@akasha/supabase-rr/auth-server"
import { createServerClient } from "@akasha/supabase-rr/server-client"
import { Suspense } from "react"
import { data, useSearchParams } from "react-router"
import { CharactersPageContent } from "../characters-page-content/characters-page-content.module.code.tsx"
import { CompanionsPageContent } from "../companions-page-content/companions-page-content.module.code.tsx"
import { useImportErrorToast } from "../use-import-error-toast/use-import-error-toast.module.code.ts"
import type { Route } from "./+types/$pageTypeSlug"

export async function loader({ params, request }: Route.LoaderArgs) {
  const pluralSlug = params.pageTypeSlug
  const { headers } = createServerClient(request)
  const pageType = await getPageTypeByPluralSlug(pluralSlug)
  if (!pageType || typeof pageType.slug !== "string") {
    throw new Response("Not Found", { status: 404 })
  }
  const { user, headers: userHeaders } = await getUser(request)
  for (const [k, v] of userHeaders) {
    if (k.toLowerCase() === "set-cookie") headers.append("set-cookie", v)
  }
  return data({ slug: pageType.slug, userId: user?.id ?? null }, { headers })
}

export default function PagesListingRoute({ loaderData }: Route.ComponentProps) {
  const [searchParams] = useSearchParams()
  useImportErrorToast()
  const slug = loaderData.slug

  if (slug === "character-build") {
    return (
      <CharactersPageContent
        userId={loaderData.userId}
        initialTab={searchParams.get("tab") ?? undefined}
        initialSearch={searchParams.get("q") ?? undefined}
        initialRole={searchParams.get("role") ?? undefined}
        initialClass={searchParams.get("class") ?? undefined}
        initialSort={searchParams.get("sort") ?? undefined}
        initialSortDirection={searchParams.get("dir") ?? undefined}
      />
    )
  }
  if (slug === "companion-build") {
    return (
      <CompanionsPageContent
        userId={loaderData.userId}
        initialTab={searchParams.get("tab") ?? undefined}
        initialSearch={searchParams.get("q") ?? undefined}
        initialRole={searchParams.get("role") ?? undefined}
        initialCompanion={searchParams.get("companion") ?? undefined}
        initialTargetArmor={searchParams.get("armor") ?? undefined}
        initialTargetCount={searchParams.get("targets") ?? undefined}
        initialTargetHealth={searchParams.get("health") ?? undefined}
        initialSort={searchParams.get("sort") ?? undefined}
        initialSortDirection={searchParams.get("dir") ?? undefined}
        initialRankArmor={searchParams.get("rank-armor") ?? undefined}
        initialRankTargets={searchParams.get("rank-targets") ?? undefined}
        initialRankHealth={searchParams.get("rank-health") ?? undefined}
      />
    )
  }

  const filteredSearchParams: Record<string, string> = {}
  for (const [key, value] of searchParams.entries()) {
    filteredSearchParams[key] = value
  }
  const brandedSlug = toPageTypeSlug(slug)
  return (
    <Suspense>
      <PagesFilteredContent pageTypeSlug={brandedSlug} searchParams={filteredSearchParams} />
    </Suspense>
  )
}
