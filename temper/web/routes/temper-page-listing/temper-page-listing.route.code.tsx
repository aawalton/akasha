import { signedInAs } from "akasha/alan/harness/handover-rr/modules/handover-session/handover-session.module.code.ts"
import { getPageTypeBySlug } from "akasha/page/access/modules/page-type/page-type.module.code.ts"
import { PagesFilteredContent } from "akasha/page/ui/component/modules/pages-by-relation-content/pages-by-relation-content.module.code.tsx"
import { toPageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import { accountOfContributor } from "akasha/person/modules/enrolment/person-enrolment.module.code.ts"
import { CharactersPageContent } from "akasha/temper/web/modules/characters-page-content/characters-page-content.module.code.tsx"
import { CompanionsPageContent } from "akasha/temper/web/modules/companions-page-content/companions-page-content.module.code.tsx"
import { TEMPER_SITE } from "akasha/temper/web/modules/temper-handover-site/temper-handover-site.module.code.ts"
import { useImportErrorToast } from "akasha/temper/web/modules/use-import-error-toast/use-import-error-toast.module.code.ts"
import { Suspense } from "react"
import { data, useSearchParams } from "react-router"

export async function loader({
  params,
  request,
}: {
  params: { pageTypeSlug: string }
  request: Request
}) {
  const pageTypeSlug = params.pageTypeSlug
  const pageType = await getPageTypeBySlug(pageTypeSlug)
  if (!pageType || typeof pageType.slug !== "string") {
    throw new Response("Not Found", { status: 404 })
  }
  const reader = await signedInAs(TEMPER_SITE, request)
  const reached = reader === null ? null : await accountOfContributor(reader)
  return data({
    slug: pageType.slug,
    userId: reached?.ok === true ? reached.account : null,
  })
}

export default function PagesListingRoute({
  loaderData,
}: {
  loaderData: { slug: string; userId: string | null }
}) {
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
