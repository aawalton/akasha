import { PageLayoutSkeleton } from "akasha/design/interfaces/layout/page-layout/page-layout.module.code.tsx"
import { tabbedPageSkeleton } from "akasha/design/interfaces/layout/skeleton-presets/skeleton-presets.module.code.ts"
import { CatalogPageContent } from "akasha/temper/web/catalog-page-content/catalog-page-content.module.code.tsx"
import { Suspense } from "react"
import { useSearchParams } from "react-router"

export function meta() {
  return [{ title: "Temper | Catalog" }]
}

export default function CatalogPage() {
  const [searchParams] = useSearchParams()
  const tab = searchParams.get("tab") ?? undefined
  return (
    <Suspense
      fallback={
        <PageLayoutSkeleton
          config={tabbedPageSkeleton({
            initialTab: "dungeons",
            defaultTab: "dungeons",
            tabs: ["dungeons"],
            titleWidth: 108,
          })}
        />
      }
    >
      <CatalogPageContent initialTab={tab} />
    </Suspense>
  )
}
