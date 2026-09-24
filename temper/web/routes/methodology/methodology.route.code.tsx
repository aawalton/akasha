import { PageLayoutSkeleton } from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { tabbedPageSkeleton } from "akasha/design/interface/layout/modules/skeleton-presets/skeleton-presets.module.code.ts"
import { temperWeb } from "akasha/infrastructure/service/akasha-service/web-app/pages/temper-web.web-app.ts"
import {
  SITE_DOCUMENT,
  siteDocumentAt,
} from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/reading/site-document-reading.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { useLoaderFollowing } from "akasha/page/ui/modules/loader-following/loader-following.module.code.ts"
import { MethodologyPageContent } from "akasha/temper/web/modules/methodology-page-content/methodology-page-content.module.code.tsx"
import { tabDefaultFor } from "akasha/temper/web/modules/tab-defaults/tab-defaults.module.code.ts"
import { Suspense } from "react"
import { useSearchParams } from "react-router"

const WEB_APP = namedAs("web-app", temperWeb.slug, null)

const READ = [SITE_DOCUMENT]

export async function loader() {
  return { document: await siteDocumentAt(WEB_APP, "methodology") }
}

type MethodologyLoaderData = Awaited<ReturnType<typeof loader>>

export function meta() {
  return [{ title: "Temper | Methodology" }]
}

export default function MethodologyPage({ loaderData }: { loaderData: MethodologyLoaderData }) {
  useLoaderFollowing(READ)
  const [searchParams] = useSearchParams()
  const tab = searchParams.get("tab") ?? tabDefaultFor("/methodology") ?? "companion-engine"
  return (
    <Suspense
      fallback={
        <PageLayoutSkeleton
          config={tabbedPageSkeleton({
            titleWidth: 160,
            initialTab: tab,
            defaultTab: "companion-engine",
            tabs: ["companion-engine", "known-issues"],
          })}
        />
      }
    >
      <MethodologyPageContent initialTab={tab} sections={loaderData.document.sections} />
    </Suspense>
  )
}
