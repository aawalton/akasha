import { PageLayoutSkeleton } from "akasha/design/interfaces/layout/page-layout/page-layout.module.code.tsx"
import { simplePageSkeleton } from "akasha/design/interfaces/layout/skeleton-presets/skeleton-presets.module.code.ts"
import { HomePageContent } from "akasha/temper/web/home-page-content/home-page-content.module.code.tsx"
import { Suspense } from "react"

export function meta() {
  return [{ title: "Temper | Home" }]
}

export default function HomePage() {
  return (
    <Suspense fallback={<PageLayoutSkeleton config={simplePageSkeleton({ titleWidth: 80 })} />}>
      <HomePageContent />
    </Suspense>
  )
}
