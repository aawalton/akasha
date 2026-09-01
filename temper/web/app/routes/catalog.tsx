import { PageLayoutSkeleton } from "@akasha/design-layout/page-layout"
import { tabbedPageSkeleton } from "@akasha/design-layout/skeleton-presets"
import { Suspense } from "react"
import { useSearchParams } from "react-router"
import { CatalogPageContent } from "@/components/catalog/catalog-page-content"

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
